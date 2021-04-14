import generic_raspberrypi from './../libraries/utils/generic_raspberrypi.js';
import update_components from './../libraries/utils/update_components.js';

let studio_n = null;
let device_n = null;
let simulator_n = null;

let lcd_library = {
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
	 * The 'lcd.create' function for the JS interpreter
	 * It assign the pin and sets it's state in the JSON of the parsed XML
	 * @param  {Integer} rs The register-select number pin from the RaspberryPi
	 * @param  {Integer} e The enable number pin from the RaspberryPi
	 * @param  {Object} data Contains the number pins for the data-bus for the LCD
	 */
	create: function(rs, e, data) {
		let rsNumber = generic_raspberrypi.parseGpioToPin(rs);
		let eNumber = generic_raspberrypi.parseGpioToPin(e);
		let dataNumber = [];

		for (let pin of Object.keys(data.properties)) {
			dataNumber.push(generic_raspberrypi.parseGpioToPin(data.properties[pin]));
		}

		let correctPins = true;
		let pins = [];

		for (let pin of dataNumber) {
			pins.push(pin);
		}
		pins.push(rsNumber);
		pins.push(eNumber);

		if ([...new Set(pins)].length === pins.length) { 
			for (let pin of dataNumber) {
				if (generic_raspberrypi.vccPins.indexOf(pin) !== -1 ||
					generic_raspberrypi.gndPins.indexOf(pin) !== -1) {
					correctPins = false;
				}
			}

			if (generic_raspberrypi.vccPins.indexOf(rsNumber) !== -1 ||
				generic_raspberrypi.gndPins.indexOf(rsNumber) !== -1) {
				correctPins = false;
			}

			if (generic_raspberrypi.vccPins.indexOf(eNumber) !== -1 ||
				generic_raspberrypi.gndPins.indexOf(eNumber) !== -1) {
				correctPins = false;
			}
		} else {
			correctPins = false;
		}

		if (correctPins) {
			let createLcd = true;

			for (let pin of Object.keys(dataNumber)) {
				if (generic_raspberrypi.dataLoaded.assignedPins.includes(dataNumber[pin])) {
					createLcd = false;
				}
			}

			if (generic_raspberrypi.dataLoaded.assignedPins.includes(rsNumber)) {
				createLcd = false;
			}

			if (generic_raspberrypi.dataLoaded.assignedPins.includes(eNumber)) {
				createLcd = false;
			}

			if (createLcd) {
				for (let pin of Object.keys(dataNumber)) {
					generic_raspberrypi.dataLoaded.assignedPins.push(dataNumber[pin]);
				}

				generic_raspberrypi.dataLoaded.assignedPins.push(rsNumber);
				generic_raspberrypi.dataLoaded.assignedPins.push(eNumber);

				for (let component of generic_raspberrypi.dataLoaded.pins[rsNumber].components) {
					if (generic_raspberrypi.dataLoaded.components[component].name === 'lcd') {
						generic_raspberrypi.dataLoaded.components[component].valid = true;
					}
				}
			} else {
				studio_n.studio_n.write(device_n.id, '\r\n----------\r\nERROR: new LCD()\r\nYou can\'t assign a pin already assigned\r\n----------\r\n');
				simulator_n.isRunning = false;
				device_n.properties.isRunning = false;
			}
		} else {
			studio_n.studio_n.write(device_n.id, '\r\n----------\r\nERROR: new LCD()\r\nThe pins are not correct\r\n----------\r\n');
			simulator_n.isRunning = false;
			device_n.properties.isRunning = false;
		}
	},

	/**
	 * The 'lcd.print' function for the JS interpreter
	 * It prints a text on LCD
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 * @param  {String} value The text to be written on the LCD
	 */
	print: function(pin, value) {
		try {
			for (let component of generic_raspberrypi.dataLoaded.pins[generic_raspberrypi.parseGpioToPin(pin)].components) {
				if (generic_raspberrypi.dataLoaded.components[component].name === 'lcd' && 
					generic_raspberrypi.dataLoaded.components[component].valid) {
					let curRow = generic_raspberrypi.dataLoaded.components[component].curRow;
					let curCol = generic_raspberrypi.dataLoaded.components[component].curCol;

					for (let i = curCol; i < value.toString().length; i ++) {
						generic_raspberrypi.dataLoaded.components[component].segments[curRow][i] = value.toString()[i];
					}
				}
			}

			update_components();
		} catch(e) {
			// TODO write to some simulator console
			studio_n.workspace.error(e);
		}
	},

	/**
	 * The 'lcd.clear' function for the JS interpreter
	 * It clears the LCD and free-up the memory
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 */
	clear: function(pin) {
		try {
			for (let component of generic_raspberrypi.dataLoaded.pins[generic_raspberrypi.parseGpioToPin(pin)].components) {
				if (generic_raspberrypi.dataLoaded.components[component].name === 'lcd' && 
					generic_raspberrypi.dataLoaded.components[component].valid) {
					for (let i = 0; i < generic_raspberrypi.dataLoaded.components[component].segments[0].length; i ++) {
						generic_raspberrypi.dataLoaded.components[component].segments[0][i] = '';
					}

					for (let i = 0; i < generic_raspberrypi.dataLoaded.components[component].segments[1].length; i ++) {
						generic_raspberrypi.dataLoaded.components[component].segments[1][i] = '';
					}
				}
			}

			update_components();
		} catch(e) {
			// TODO write to some simulator console
			studio_n.workspace.error(e);
		}
	},

	/**
	 * The 'lcd.home' function for the JS interpreter
	 * It sets the cursor to position (0, 0)
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 */
	home: function(pin) {
		try {
			for (let component of generic_raspberrypi.dataLoaded.pins[generic_raspberrypi.parseGpioToPin(pin)].components) {
				if (generic_raspberrypi.dataLoaded.components[component].name === 'lcd' && 
					generic_raspberrypi.dataLoaded.components[component].valid) {
					generic_raspberrypi.dataLoaded.components[component].curCol = 0;
					generic_raspberrypi.dataLoaded.components[component].curRow = 0;
				}
			}
		} catch(e) {
			// TODO write to some simulator console
			studio_n.workspace.error(e);
		}
	},

	/**
	 * The 'lcd.setCursor' function for the JS interpreter
	 * It sets the cursor to a given position
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 * @param  {Integer} row The number of the row of the cursor on the LCD
	 * @param  {Integer} col The number of the colomn of the cursor on the LCD
	 */
	setCursor: function(pin, row, col) {
		try {
			for (let component of generic_raspberrypi.dataLoaded.pins[generic_raspberrypi.parseGpioToPin(pin)].components) {
				if (generic_raspberrypi.dataLoaded.components[component].name === 'lcd' && 
					generic_raspberrypi.dataLoaded.components[component].valid) {
					generic_raspberrypi.dataLoaded.components[component].curCol = col;
					generic_raspberrypi.dataLoaded.components[component].curRow = row;
				}
			}
		} catch(e) {
			// TODO write to some simulator console
			studio_n.workspace.error(e);
		}
	},

	/**
	 * The 'lcd.cursor' function for the JS interpreter
	 * It enables the cursor
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 */
	cursor: function(pin) {
		try {
			for (let component of generic_raspberrypi.dataLoaded.pins[generic_raspberrypi.parseGpioToPin(pin)].components) {
				if (generic_raspberrypi.dataLoaded.components[component].name === 'lcd' && 
					generic_raspberrypi.dataLoaded.components[component].valid) {
					if (generic_raspberrypi.dataLoaded.components[component].cursor === false) {
						generic_raspberrypi.dataLoaded.components[component].cursor = true;
					}
				}
			}

			update_components();
		} catch(e) {
			// TODO write to some simulator console
			studio_n.workspace.error(e);
		}
	},

	/**
	 * The 'lcd.noCursor' function for the JS interpreter
	 * It disables the cursor
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 */
	noCursor: function(pin) {
		try {
			for (let component of generic_raspberrypi.dataLoaded.pins[generic_raspberrypi.parseGpioToPin(pin)].components) {
				if (generic_raspberrypi.dataLoaded.components[component].name === 'lcd' && 
					generic_raspberrypi.dataLoaded.components[component].valid) {
					generic_raspberrypi.dataLoaded.components[component].cursor = false;
				}
			}

			update_components();
		} catch(e) {
			// TODO write to some simulator console
			studio_n.workspace.error(e);
		}
	},

	/**
	 * --- NOT YET IMPLEMENTED ---
	 * The 'lcd.blink' function for the JS interpreter
	 * It enables the cursor blinking
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 */
	blink: function(/* pin */) {
		studio_n.workspace.error ('not implemented');
	},

	/**
	 * --- NOT YET IMPLEMENTED ---
	 * The 'lcd.noBlink' function for the JS interpreter
	 * It disables the cursor blinking
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 */
	noBlink: function(/* pin */) {
		studio_n.workspace.error ('not implemented');
	},

	/**
	 * The 'lcd.scrollDisplayLeft' function for the JS interpreter
	 * It scrolls the LCD to the left
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 */
	scrollDisplayLeft: function(pin) {
		try {
			for (let component of generic_raspberrypi.dataLoaded.pins[generic_raspberrypi.parseGpioToPin(pin)].components) {
				if (generic_raspberrypi.dataLoaded.components[component].name === 'lcd' && 
					generic_raspberrypi.dataLoaded.components[component].valid) {
					generic_raspberrypi.dataLoaded.components[component].shift += 1;
				}
			}

			update_components();
		} catch(e) {
			// TODO write to some simulator console
			studio_n.workspace.error(e);
		}
	},

	/**
	 * The 'lcd.scrollDisplayRight' function for the JS interpreter
	 * It scrolls the LCD to the right
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 */
	scrollDisplayRight: function(pin) {
		try {
			for (let component of generic_raspberrypi.dataLoaded.pins[generic_raspberrypi.parseGpioToPin(pin)].components) {
				if (generic_raspberrypi.dataLoaded.components[component].name === 'lcd' && 
					generic_raspberrypi.dataLoaded.components[component].valid) {
					if (generic_raspberrypi.dataLoaded.components[component].shift > 0) {
						generic_raspberrypi.dataLoaded.components[component].shift -= 1;
					}
				}
			}

			update_components();
		} catch(e) {
			// TODO write to some simulator console
			studio_n.workspace.error(e);
		}
	},

	/**
	 * --- NOT YET IMPLEMENTED ---
	 * The 'lcd.leftToRight' function for the JS interpreter
	 * ---------------------------
	 */
	leftToRight: function() {
		studio_n.workspace.error ('not implemented');
	},

	/**
	 * --- NOT YET IMPLEMENTED ---
	 * The 'lcd.rightToLeft' function for the JS interpreter
	 * ---------------------------
	 */
	rightToLeft: function() {
		studio_n.workspace.error ('not implemented');
	},

	/**
	 * --- NOT YET IMPLEMENTED ---
	 * The 'lcd.autoscroll' function for the JS interpreter
	 * It lets the LCD to autoscroll
	 */
	autoscroll: function() {
		try {
			studio_n.log('autoscroll');
		} catch(e) {
			// TODO write to some simulator console
			studio_n.workspace.error(e);
		}
	},

	/**
	 * --- NOT YET IMPLEMENTED ---
	 * The 'lcd.noAutoscroll' function for the JS interpreter
	 * It stops the autoscroll
	 */
	noAutoscroll: function() {
		try {
			studio_n.log('noAutoscroll');
		} catch(e) {
			// TODO write to some simulator console
			studio_n.workspace.error(e);
		}
	},

	/**
	 * The 'lcd.close' function for the JS interpreter
	 * It closes the LCD
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 */
	close: function(pin) {
		try {
			for (let component of generic_raspberrypi.dataLoaded.pins[generic_raspberrypi.parseGpioToPin(pin)].components) {
				if (generic_raspberrypi.dataLoaded.components[component].name === 'lcd' && 
					generic_raspberrypi.dataLoaded.components[component].valid) {
					for (let pin of Object.keys(generic_raspberrypi.dataLoaded.pins)) {
						if (generic_raspberrypi.dataLoaded.components[generic_raspberrypi.dataLoaded.pins[pin].components[0]].name == 'lcd') {
							let index = generic_raspberrypi.dataLoaded.assignedPins.indexOf(pin);
							generic_raspberrypi.dataLoaded.assignedPins.splice(index, 1);
						}
					}

					generic_raspberrypi.dataLoaded.components[component].valid = false;
				}
			}
		} catch(e) {
			// TODO write to some simulator console
			studio_n.workspace.error(e);
		}
	}
};

export default lcd_library;