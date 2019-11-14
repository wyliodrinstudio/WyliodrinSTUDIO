import generic_raspberrypi from './../libraries/utils/generic_raspberrypi.js';
import update_components from './../libraries/utils/update_components.js';

let studio_n = null;
let device_n = null;
let simulator_n = null;

let onoff_library = {
	/**
	 * It sets the studio, device and simulator objects
	 * @param  {Object} studio The 'studio' object in the platform
	 * @param  {Object} device The 'device' object in the platform
	 * @param  {Object} simulator The 'simulator' object created for informations
	 */
	assign: function(studio, device, simulator) {
		studio_n = studio;
		device_n = device;
		simulator_n = simulator;
	},

	/**
	 * The 'onoff.Gpio.create' function for the JS interpreter
	 * It assign the pin and sets it's state in the JSON of the parsed XML
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 * @param  {String} state The state of the pin, 'in' or 'out'
	 */
	create: function(pin, state) {
		let pinNumber = generic_raspberrypi.parseGpioToPin(pin);

		if (generic_raspberrypi.dataLoaded.assignedPins.includes(pinNumber)) {
			studio_n.console.write(device_n.id, `\r\n----------\r\nERROR: new Gpio(...)\r\nYou can't assign a pin already assigned\r\n----------\r\n`);
			simulator_n.isRunning = false;
			device_n.properties.isRunning = false;
		} else {
			generic_raspberrypi.dataLoaded.assignedPins.push(pinNumber);

			if (generic_raspberrypi.dataLoaded.pins[pinNumber] && state) {
				generic_raspberrypi.dataLoaded.pins[pinNumber].state = state;
			}
		}
	},

	/**
	 * --- NOT YET IMPLEMENTED ---
	 * The 'onoff.Gpio.read' function for the JS interpreter
	 * It returns the value received by the pin (ASYNCHRONOUS)
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 * @param  {String} state The state of the pin, 'in' or 'out'
	 */
	read: function(pin, state) {
		try {
			console.log('read');
		} catch(e) {
			console.log(e);
		}
	},

	/**
	 * The 'onoff.Gpio.readSync' function for the JS interpreter
	 * It returns the value received by the pin (SYNCHRONOUS)
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 * @param  {String} state The state of the pin, 'in' or 'out'
	 */
	readSync: function(pin, state) {
		try {
			let pinNumber = generic_raspberrypi.parseGpioToPin(pin);

			if (state === 'in') {
				let activeCircuit = true;

				for (let component of generic_raspberrypi.dataLoaded.pins[pinNumber].components) {
					if (generic_raspberrypi.dataLoaded.components[component].active === false) {
						activeCircuit = false;
						break;
					}
				}

				if (activeCircuit) {
					if (generic_raspberrypi.dataLoaded.pins[pinNumber].activeLow) {
						return 0;
					} else {
						return 1;
					}
				} else {
					if (generic_raspberrypi.dataLoaded.pins[pinNumber].activeLow) {
						return 1;
					} else {
						return 0;
					}
				}
			} else {
				studio_n.console.write(device_n.id, `\r\n----------\r\nERROR: onoff.Gpio.readSync()\r\nYou can't read from a pin that is assigned as "out"\r\n----------\r\n`);
				simulator_n.isRunning = false;
				device_n.properties.isRunning = false;
			}
		} catch(e) {
			console.log(e);
		}
	},

	/**
	 * --- NOT YET IMPLEMENTED ---
	 * The 'onoff.Gpio.write' function for the JS interpreter
	 * It sets the pin and the other components associated to the value given (ASYNCHRONOUS)
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 * @param  {String} state The state of the pin, 'in' or 'out'
	 * @param  {Integer} value The value to be written, '0' or '1'
	 */
	write: function(pin, state, value) {
		try {
			console.log('write ' + value.toString());
		} catch(e) {
			console.log(e);
		}
	},

	/**
	 * The 'onoff.Gpio.write' function for the JS interpreter
	 * It sets the pin and the other components associated to the value given (SYNCHRONOUS)
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 * @param  {String} state The state of the pin, 'in' or 'out'
	 * @param  {Integer} value The value to be written, '0' or '1'
	 */
	writeSync: function(pin, state, value) {
		try {
			let pinNumber = generic_raspberrypi.parseGpioToPin(pin);

			if (state === 'out') {
				let output = value;

				// Invert values in case of activeLow
				if (generic_raspberrypi.dataLoaded.pins[pinNumber].activeLow) {
					if (output) {
						output = 0;
					} else {
						output = 1;
					}
				}

				generic_raspberrypi.dataLoaded.pins[pinNumber].value = output;
				update_components();
			} else {
				studio_n.console.write(device_n.id, `\r\n----------\r\nERROR: onoff.Gpio.writeSync()\r\nYou can't write on a pin that is assigned as "in"\r\n----------\r\n`);
				simulator_n.isRunning = false;
				device_n.properties.isRunning = false;
			}
		} catch(e) {
			console.log(e);
		}
	},

	/**
	 * --- NOT YET IMPLEMENTED ---
	 * The 'onoff.Gpio.watch' function for the JS interpreter
	 * It watches the change of value of the given pin and make an interruption
	 */
	watch: function() {
		try {
			console.log('watch');
		} catch(e) {
			console.log(e);
		}
	},

	/**
	 * --- NOT YET IMPLEMENTED ---
	 * The 'onoff.Gpio.unwatch' function for the JS interpreter
	 * Itun watches the change of value of the given pin
	 */
	unwatch: function() {
		try {
			console.log('unwatch');
		} catch(e) {
			console.log(e);
		}
	},

	/**
	 * --- NOT YET IMPLEMENTED ---
	 * The 'onoff.Gpio.unwatch' function for the JS interpreter
	 * It unwatches the change of value of all the pins
	 */
	unwatchAll: function() {
		try {
			console.log('unwatchAll');
		} catch(e) {
			console.log(e);
		}
	},

	/**
	 * The 'onoff.Gpio.direction' function for the JS interpreter
	 * It returns the current state of the given pin
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 */
	direction: function(pin) {
		try {
			return generic_raspberrypi.dataLoaded.pins[generic_raspberrypi.parseGpioToPin(pin)].state;
		} catch(e) {
			console.log(e);
		}
	},

	/**
	 * --- NOT YET IMPLEMENTED ---
	 * The 'onoff.Gpio.setDirection' function for the JS interpreter
	 * It sets the new state of the given pin
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 * @param  {String} value The new state of the pin
	 */
	setDirection: function(pin, value) {
		try {
			generic_raspberrypi.dataLoaded.pins[generic_raspberrypi.parseGpioToPin(pin)].state = value;
		} catch(e) {
			console.log(e);
		}
	},

	/**
	 * The 'onoff.Gpio.activeLow' function for the JS interpreter
	 * It returns the value of activeLow of the given pin
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 */
	activeLow: function(pin) {
		try {
			return generic_raspberrypi.dataLoaded.pins[generic_raspberrypi.parseGpioToPin(pin)].activeLow;
		} catch(e) {
			console.log(e);
		}
	},

	/**
	 * The 'onoff.Gpio.setActiveLow' function for the JS interpreter
	 * It sets the value of activeLow to the given pin
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 * @param  {Bool} value The value if the input/output should be inverted
	 */
	setActiveLow: function(pin, value) {
		try {
			let pinNumber = generic_raspberrypi.parseGpioToPin(pin);
			generic_raspberrypi.dataLoaded.pins[pinNumber].activeLow = value;

			if (generic_raspberrypi.dataLoaded.pins[pinNumber].value) {
				generic_raspberrypi.dataLoaded.pins[pinNumber].value = 0;
			} else {
				generic_raspberrypi.dataLoaded.pins[pinNumber].value = 1;
			}

			update_components();
		} catch(e) {
			console.log(e);
		}
	}
}

export default onoff_library;