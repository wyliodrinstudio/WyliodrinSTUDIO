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

let CYCLE_LIMIT = 50000;
let TICK_INSN_RATIO = 2.5; // The approximate number of clock ticks per instruction found through experimentation


// let pins_x = 0;
// let pins_y = 0;

// class I2C {
// 	constructor(address, scl, sda) {
// 		this.address = address;
// 		this.scl_gpio = scl[0];
// 		this.scl_pin = scl[1];
// 		this.sda_gpio = sda[0];
// 		this.sda_pin = sda[1];

// 		this.active = true;
// 		this.selected = false;
// 		this.rw = 0;
// 		this.data = 0;
// 		this.recv = 0;
// 		this.send = -1;
// 		this.buffer = [];
// 	}

// 	write(val) {
// 		let scl = this.scl_gpio(this.scl_pin);
// 		let nscl = extract_pin(val, this.scl_pin);
// 		let sda = this.sda_gpio(this.sda_pin);
// 		let nsda = extract_pin(val, this.sda_pin);
// 		if (nsda != sda) {
// 			if (scl) {
// 				if (!nsda) { // Start bit
// 					this.active = true;
// 					this.selected = false;
// 					this.recv = 0;
// 					this.data = 0;
// 					this.buffer = [];
// 				} else { // Stop bit
// 					this.active = false;
// 					if (this.selected) {
// 						this.process();
// 						this.selected = false;
// 					}
// 				}
// 			}
// 		}
// 		if (nscl != scl && this.active) {
// 			if (nscl) {
// 				if (this.recv < 8) {
// 					this.data = (this.data << 1) + sda;
// 					this.recv++;
// 				} else {
// 					if (this.selected) { // Receive data
// 						this.buffer.push(this.data);
// 						this.send = 0;
// 						this.data = 0;
// 						this.recv = 0;
// 					} else if ((this.data >> 1) == this.address) {
// 						this.selected = true;
// 						this.rw = this.data & 1;
// 						this.send = 0;
// 						this.data = 0;
// 						this.recv = 0;
// 					} else {
// 						this.active = false;
// 					}
// 				}
// 			} else if (!nscl) {
// 				this.send = -1;
// 			}
// 		}
// 	}

// 	read(GPIO, pins) {
// 		if (this.sda_gpio.name != GPIO || this.send == -1) {
// 			return pins;
// 		}
// 		pins = set_pin(pins, this.sda_pin, this.send);
// 		return pins;
// 	}

// 	process() {
// 	}
// }

// function set_pin(pins, pin_no, val) {
// 	if (val) {
// 		return pins | (1 << pin_no);
// 	} else {
// 		return pins & ~(1 << pin_no);
// 	}
// }

function extract_pin(pins, n) {
	return ((pins & (1 << n)) ? 1 : 0);
}

function int_to_bytes(n) {
	return new Uint8Array([n, n >> 8, n >> 16, n >> 24]);
}

export function emulator (uc, firmware) {    
	let user_button_state = 0;
	let epoch;
	// let servo_angle = 0;
	// let servo_target = 0;
	// let servo_speed = 1;
	let emu;
	let events = new EventEmitter ();

	let addr = firmware[4] + (firmware[5] << 8) + (firmware[6] << 16) + (firmware[7] << 24);

	// let speed;
	let prev_val;
	let ichr_addr;
	let ichr;
	let keypress;
	let exception;
	let pending = 0;
	let next_char = [];
	// let timestamp = new Date();
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
			document.getElementById('red_led').style.display = extract_pin(value_lo, 0) ? 'inline' : 'none';
			document.getElementById('green_led').style.display = extract_pin(value_lo, 1) ? 'inline' : 'none';
			document.getElementById('yellow_led').style.display = extract_pin(value_lo, 2) ? 'inline' : 'none';
			document.getElementById('blue_led').style.display = extract_pin(value_lo, 3) ? 'inline' : 'none';
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
		console.log ('execute '+addr);
		if (!waiting) {
			cycles++;
			insns += CYCLE_LIMIT * TICK_INSN_RATIO;
			requestAnimationFrame(execute);
		}
		return 0;
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
		inject: inject
	};
}