/* eslint-disable */

/**

Adapted from https://micropython.org/unicorn

 * The MIT License (MIT)

Copyright (c) 2017 Damien P. George

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

 */

import { EventEmitter } from 'events';

let FLASH_ADDRESS = 0x08000000;
let FLASH_SIZE = 0x100000;
let RAM_ADDRESS = 0x20000000;
let MAX_RAM_SIZE = 0x40000;
let PERIPHERAL_ADDRESS = 0x40000000;
let PERIPHERAL_SIZE = 0x10000;
let UART0_TXR = 0x40000000;
let UART0_RXR = 0x40000004;
let UNICORN_CONTROLLER_PENDING = 0x40000100;
let UNICORN_CONTROLLER_EXCEPTION = 0x40000104;
let UNICORN_CONTROLLER_INTR_CHAR = 0x40000108;
let UNICORN_CONTROLLER_RAM_SIZE = 0x4000010c;
let UNICORN_CONTROLLER_STACK_SIZE = 0x40000110;
let UNICORN_CONTROLLER_IDLE = 0x40000114;
let UNICORN_CONTROLLER_INSNS = 0x40000118;
let GPIO_ODR = 0x40000200;
let GPIO_IDR = 0x40000204;
let GPIO_X_ODR = 0x40000208;
let GPIO_X_IDR = 0x4000020c;
let GPIO_Y_ODR = 0x40000210;
let GPIO_Y_IDR = 0x40000214;
let SERVO_1_ANGLE = 0x40000218;
let SERVO_1_TIME = 0x4000021c;
let ADC_X_IDR = 0x40000220;
let ADC_Y_IDR = 0x40000250;
let RTC_TICKS_MS = 0x40000300;
let RTC_TICKS_US = 0x40000304;
let I2C_DATA = 0x40000400;
let I2C_COMMAND = 0x40000404;

let CYCLE_LIMIT = 50000;
// let LCD_WIDTH = 64;
// let LCD_HEIGHT = 32;
let EPSILON = 0.5;
let TICK_INSN_RATIO = 2.5; // The approximate number of clock ticks per instruction found through experimentation
let HARD_I2C_SCL_X = 9;
let HARD_I2C_SDA_X = 10;

let pins_x = 0;
let pins_y = 0;

class I2C {
	constructor(address, scl, sda) {
		this.address = address;
		this.scl_gpio = scl[0];
		this.scl_pin = scl[1];
		this.sda_gpio = sda[0];
		this.sda_pin = sda[1];

		this.active = true;
		this.selected = false;
		this.rw = 0;
		this.data = 0;
		this.recv = 0;
		this.send = -1;
		this.buffer = [];
	}

	write(val) {
		let scl = this.scl_gpio(this.scl_pin);
		let nscl = extract_pin(val, this.scl_pin);
		let sda = this.sda_gpio(this.sda_pin);
		let nsda = extract_pin(val, this.sda_pin);
		if (nsda != sda) {
			if (scl) {
				if (!nsda) { // Start bit
					this.active = true;
					this.selected = false;
					this.recv = 0;
					this.data = 0;
					this.buffer = [];
				} else { // Stop bit
					this.active = false;
					if (this.selected) {
						this.process();
						this.selected = false;
					}
				}
			}
		}
		if (nscl != scl && this.active) {
			if (nscl) {
				if (this.recv < 8) {
					this.data = (this.data << 1) + sda;
					this.recv++;
				} else {
					if (this.selected) { // Receive data
						this.buffer.push(this.data);
						this.send = 0;
						this.data = 0;
						this.recv = 0;
					} else if ((this.data >> 1) == this.address) {
						this.selected = true;
						this.rw = this.data & 1;
						this.send = 0;
						this.data = 0;
						this.recv = 0;
					} else {
						this.active = false;
					}
				}
			} else if (!nscl) {
				this.send = -1;
			}
		}
	}

	read(GPIO, pins) {
		if (this.sda_gpio.name != GPIO || this.send == -1) {
			return pins;
		}
		pins = set_pin(pins, this.sda_pin, this.send);
		return pins;
	}

	process() {
	}
}

// class LCD extends I2C {
// 	process() {
// 		let ctx = lcd_unicorn.getContext('2d');
// 		ctx.fillStyle = 'rgb(255, 255, 255)';
// 		for (let j = 0; j < LCD_HEIGHT; j++) {
// 			for (let i = 0; i < LCD_WIDTH / 8; i++) {
// 				if (this.buffer.length == 0) {
// 					return;
// 				}
// 				let bite = this.buffer.shift();
// 				for (let k = 7; k >= 0; k--) {
// 					if (bite >> k & 1) {
// 						ctx.fillRect(i * 4 * 8 + ((7 - k) * 4), j * 4, 4, 4);
// 					} else {
// 						ctx.clearRect(i * 4 * 8 + ((7 - k) * 4), j * 4, 4, 4);
// 					}
// 				}
// 			}
// 		}
// 	}
// }

// let i2c_devices = new Map([[8, new LCD(8, [X, HARD_I2C_SCL_X], [X, HARD_I2C_SDA_X])]]);

// function write_to_i2c_devices(pins) {
// 	// No X Y split?
// 	for (let key of i2c_devices.keys()) {
// 		i2c_devices.get(key).write(pins);
// 	}
// }

function set_pin(pins, pin_no, val) {
	if (val) {
		return pins | (1 << pin_no);
	} else {
		return pins & ~(1 << pin_no);
	}
}

function hard_i2c_write(scl, sda) {
	let pins = pins_x;
	pins = set_pin(pins, HARD_I2C_SCL_X, scl);
	pins = set_pin(pins, HARD_I2C_SDA_X, sda);
	// write_to_i2c_devices(pins);
	pins_x = pins;
}

function extract_pin(pins, n) {
	return ((pins & (1 << n)) ? 1 : 0);
}

function X(n) {
	return extract_pin(pins_x, n);
}

function Y(n) {
	return extract_pin(pins_y, n);
}

function int_to_bytes(n) {
	return new Uint8Array([n, n >> 8, n >> 16, n >> 24]);
}

export function emulator (uc, firmware) {    
	let user_button_state = 0;
	let epoch;
	let servo_angle = 0;
	let servo_target = 0;
	let servo_speed = 1;
	let emu;
	let events = new EventEmitter ();

	let addr = firmware[4] + (firmware[5] << 8) + (firmware[6] << 16) + (firmware[7] << 24);

	let speed;
	let prev_val;
	let ichr_addr;
	let ichr;
	let keypress;
	let exception;
	let pending = 0;
	let next_char = [];
	let timestamp = new Date();
	let cycles = 0;
	let insns = 0;
	let idle = false;
	let waiting = false;
	let block_output = 0;
	let in_script = false;
	let in_error = false;
	let ram_size = 256*1024;
	let stack_size = 8192;
	let sp = RAM_ADDRESS + ram_size;

	function hook_read(handle, type, addr_lo, addr_hi, size,  value_lo, value_hi, user_data) {
		if (addr_lo == UART0_RXR) {
			if (next_char.length == 0) {
				try {
					emu.emu_stop();
					waiting = true;
					events.emit('killed');
				}
				catch (e){
					console.log(e, '\n');
				}
			} else { 
				let n = next_char.pop();
				emu.mem_write(UART0_RXR, int_to_bytes(n));
			}
		} else if (addr_lo == UNICORN_CONTROLLER_RAM_SIZE) {
			emu.mem_write(UNICORN_CONTROLLER_RAM_SIZE, int_to_bytes(ram_size));
		} else if (addr_lo == UNICORN_CONTROLLER_STACK_SIZE) {
			emu.mem_write(UNICORN_CONTROLLER_STACK_SIZE, int_to_bytes(stack_size));
		} else if (addr_lo == UNICORN_CONTROLLER_INSNS) {
			emu.mem_write(UNICORN_CONTROLLER_INSNS, int_to_bytes(insns));
		} else if (addr_lo == GPIO_IDR) {
			emu.mem_write(GPIO_IDR, int_to_bytes(user_button_state));
		} else if (addr_lo == GPIO_X_IDR) {
			// for (let key of i2c_devices.keys()) {
			// 	pins_x = i2c_devices.get(key).read('X', pins_x);
			// }
			emu.mem_write(GPIO_X_IDR, int_to_bytes(pins_x));
			emu.mem_write(GPIO_X_ODR, int_to_bytes(pins_x));
		} else if (addr_lo == GPIO_Y_IDR) {
			// for (let key of i2c_devices.keys()) {
			// 	pins_y = i2c_devices.get(key).read('Y', pins_y);
			// }
			emu.mem_write(GPIO_Y_IDR, int_to_bytes(pins_y));
			emu.mem_write(GPIO_Y_ODR, int_to_bytes(pins_y));
		} else if (addr_lo == SERVO_1_ANGLE) {
			emu.mem_write(SERVO_1_ANGLE, int_to_bytes(servo_angle));
		} else if (addr_lo >= ADC_X_IDR && addr_lo < ADC_X_IDR + 0x30) {
		} else if (addr_lo >= ADC_Y_IDR && addr_lo < ADC_Y_IDR + 0x30) {
			if (addr_lo == ADC_Y_IDR + (3 * 4)) { //Pin Y4 connected to ADC slider
				/* TODO */
			}
		} else if (addr_lo == RTC_TICKS_MS) {
			emu.mem_write(RTC_TICKS_MS, int_to_bytes(parseInt(window.performance.now() - epoch, 10)));
		} else if (addr_lo == RTC_TICKS_US) {
			emu.mem_write(RTC_TICKS_US, int_to_bytes(parseInt((window.performance.now() - epoch) * 1000, 10)));
		} else if (addr_lo == I2C_DATA) {
			// for (let key of i2c_devices.keys()) {
			// 	pins_x = i2c_devices.get(key).read('X', pins_x);
			// }
			emu.mem_write(I2C_DATA, int_to_bytes(X(HARD_I2C_SDA_X)));
			hard_i2c_write(0, X(HARD_I2C_SDA_X));
		}
		return;
	}

	function hook_write(handle, type, addr_lo, addr_hi, size,  value_lo, value_hi, user_data) {
		if (addr_lo == UART0_TXR) {
			if (value_lo == 4 && in_script) {
				if (in_error == true) {
					block_output = 1;
					in_error = false;
					in_script = false;
				} else {
					in_error = true;
				}
			} else if (block_output > 0) {
				block_output--;
			} else {
				events.emit ('data', String.fromCharCode(value_lo));
			}
		} else if (addr_lo == UNICORN_CONTROLLER_PENDING) {
			pending = value_lo;
		} else if (addr_lo == UNICORN_CONTROLLER_EXCEPTION) {
			exception = int_to_bytes(value_lo);
		} else if (addr_lo == UNICORN_CONTROLLER_INTR_CHAR) {
			ichr_addr = value_lo;
		} else if (addr_lo == UNICORN_CONTROLLER_IDLE) {
			if (idle) {
				idle = false;
				emu.emu_stop();
			} else {
				idle = true;
			}
		} else if (addr_lo == GPIO_ODR) {
			/* TODO */
		} else if (addr_lo == GPIO_X_ODR) {
			// write_to_i2c_devices(value_lo);
			pins_x = value_lo;
			emu.mem_write(GPIO_X_IDR, int_to_bytes(pins_x));
		} else if (addr_lo == GPIO_Y_ODR) {
			// write_to_i2c_devices(value_lo);
			pins_y = value_lo;
			events.emit ('pins', pins_y.toString(2));
			emu.mem_write(GPIO_Y_IDR, int_to_bytes(pins_y));
			emu.mem_write(GPIO_Y_ODR, int_to_bytes(pins_y));
		} else if (addr_lo == SERVO_1_ANGLE) {
			servo_target = value_lo;
			rotate_servo();
		} else if (addr_lo == SERVO_1_TIME) {
			servo_speed = (Math.abs(servo_angle - servo_target) / (value_lo / 1000)) / 60;
		} else if (addr_lo == I2C_DATA) {
			for (let i = 7; i >= 0; i--) {
				let j = (value_lo >> i) & 1;
				for (let k = 0; k < 3; k++) {
					hard_i2c_write(k % 2, j);
				}
			}
			hard_i2c_write(0, 1);
			hard_i2c_write(1, 1);
		} else if (addr_lo == I2C_COMMAND) {
			if (value_lo == 0) {
				hard_i2c_write(1, 1);
				hard_i2c_write(1, 0);
			} else if (value_lo == 1) {
				hard_i2c_write(1, 0);
				hard_i2c_write(1, 1);
			}
		}
		prev_val = value_lo;
		return;
	}

	function execute() {
		try {
			emu.emu_start(addr | 1, FLASH_ADDRESS + FLASH_SIZE, 0, CYCLE_LIMIT);
		}
		catch (er) {
			console.log(er, '\n');
			return 1;
		}
		addr = emu.reg_read_i32(uc.ARM_REG_PC);
		if (!waiting) {
			cycles++;
			insns += CYCLE_LIMIT * TICK_INSN_RATIO;
			requestAnimationFrame(execute);
		}
		return 0;
	}

	function rotate_servo() {
		if (servo_angle != servo_target) {
			servo_angle += servo_angle < servo_target ? servo_speed : -servo_speed;
			if (servo_angle > 90)
				servo_angle = 90;
			if (servo_angle < -90)
				servo_angle = -90;
			if (Math.abs(servo_angle - servo_target) < EPSILON)
				servo_angle = servo_target;
			pin_servo_blade.style.transform = 'rotate(' + servo_angle.toString(10) + 'deg)';
			requestAnimationFrame(rotate_servo);
		} else {
			servo_speed = 1;
		}
	}

	function inject(data) {
		keypress = data.split('').reverse().map(function(i) { return i.charCodeAt(); });
		waiting = false;
		ichr = emu.mem_read(ichr_addr, 4);
		if (keypress[0] == ichr[0]) {
			emu.mem_write(pending, exception);
		} else {
			next_char = keypress.concat(next_char);
		}
		execute();
	}

	let gauge = setInterval(function() {
		let new_timestamp = new Date();
		speed = (cycles * CYCLE_LIMIT * TICK_INSN_RATIO / 1000000) / ((new_timestamp - timestamp) / 1000);
		timestamp = new_timestamp;
		cycles = 0;
	}, 1000);
    
	emu = new uc.Unicorn(uc.ARCH_ARM, uc.MODE_THUMB);

	emu.mem_map(FLASH_ADDRESS, FLASH_SIZE, uc.PROT_ALL);
	emu.mem_map(RAM_ADDRESS, MAX_RAM_SIZE, uc.PROT_ALL);
	emu.mem_map(PERIPHERAL_ADDRESS, PERIPHERAL_SIZE, uc.PROT_ALL);

	emu.mem_write(FLASH_ADDRESS, firmware);
	emu.mem_write(FLASH_ADDRESS, int_to_bytes(sp));

	emu.hook_add(uc.HOOK_MEM_READ, hook_read, null, PERIPHERAL_ADDRESS, PERIPHERAL_ADDRESS + PERIPHERAL_SIZE);
	emu.hook_add(uc.HOOK_MEM_WRITE, hook_write, null, PERIPHERAL_ADDRESS, PERIPHERAL_ADDRESS + PERIPHERAL_SIZE);

	epoch = window.performance.now();

	execute();

	return {
		events,
		inject: inject,
		hook_write: hook_write
	};
}