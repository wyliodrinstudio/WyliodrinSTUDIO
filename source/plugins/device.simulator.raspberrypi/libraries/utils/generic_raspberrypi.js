import $ from 'jquery';

import generate_project_json from './generate_project_json.js';
import update_components from './update_components.js';

let generic_raspberrypi = {
	name: 'Raspberry Pi 3 Model B v1.2',

	nameStartingProject: 'testLed',

	// Generic data
	startingNameForTutorials: 'test',
	svgGenericPath: './plugins/device.simulator.raspberrypi/data/schematics/svg/',
	xmlGenericPath: './plugins/device.simulator.raspberrypi/data/schematics/xml/',

	// Data about the project loaded at the moment
	nameLoaded: null,
	svgLoaded: null,
	dataLoaded: null,

	// Data about the project loaded by the user
	ownProject: {
		name: null,
		svg: null,
		xml: null,
	},

	// Generic data about RaspberryPi pins
	vccPins: [0, 1, 3, 16],
	gndPins: [5, 8, 13, 19, 24, 29, 33, 38],
	pwmPins: [31, 32, 34],
	i2cPins: [2, 4],

	// Colors dictionary for HSL format
	ledColors: {
		'red': 0,
		'orange': 37,
		'yellow': 58,
		'green': 117,
		'blue': 230
	},

	// The pins for the RaspberryPi
	pins: {
		0: {
			name: '3.3V',
			states: ['3.3']
		},
		1: {
			name: '5V',
			states: ['5']
		},
		2: {
			name: 'GIPO2',
			states: ['IN', 'OUT', 'I2C_SDA']
		},
		3: {
			name: '5V',
			states: ['5']
		},
		4: {
			name: 'GIPO3',
			states: ['IN', 'OUT', 'I2C_SCL']
		},
		5: {
			name: 'GND',
			states: ['0']
		},
		6: {
			name: 'GIPO4',
			states: ['IN', 'OUT', 'SPI_CLK']
		},
		7: {
			name: 'GIPO14',
			states: ['IN', 'OUT']
		},
		8: {
			name: 'GND',
			states: ['0']
		},
		9: {
			name: 'GIPO15',
			states: ['IN', 'OUT']
		},


		10: {
			name: 'GIPO17',
			states: ['IN', 'OUT']
		},
		11: {
			name: 'GIPO18',
			states: ['IN', 'OUT', 'SPI_CLK', 'PWM']
		},
		12: {
			name: 'GIPO27',
			states: ['IN', 'OUT']
		},
		13: {
			name: 'GND',
			states: ['0']
		},
		14: {
			name: 'GIPO22',
			states: ['IN', 'OUT']
		},
		15: {
			name: 'GIPO23',
			states: ['IN', 'OUT']
		},
		16: {
			name: '3.3V',
			states: ['3.3']
		},
		17: {
			name: 'GIPO24',
			states: ['IN', 'OUT']
		},
		18: {
			name: 'GIPO10',
			states: ['IN', 'OUT', 'SPI_MOSI']
		},
		19: {
			name: 'GND',
			states: ['0']
		},


		20: {
			name: 'GIPO9',
			states: ['IN', 'OUT', 'SPI_MOSI']
		},
		21: {
			name: 'GIPO25',
			states: ['IN', 'OUT']
		},
		22: {
			name: 'GIPO11',
			states: ['IN', 'OUT', 'SPI_CLK']
		},
		23: {
			name: 'GIPO8',
			states: ['IN', 'OUT', 'SPI_SS']
		},
		24: {
			name: 'GND',
			states: ['0']
		},
		25: {
			name: 'GIPO7',
			states: ['IN', 'OUT', 'SPI_SS']
		},
		26: {
			name: 'ID_SD',
			states: ['I2C_SDA']
		},
		27: {
			name: 'ID_SC',
			states: ['I2C_SCL']
		},
		28: {
			name: 'GIPO5',
			states: ['IN', 'OUT', 'SPI_CLK']
		},
		29: {
			name: 'GND',
			states: ['0']
		},


		30: {
			name: 'GIPO6',
			states: ['IN', 'OUT', 'SPI_CLK']
		},
		31: {
			name: 'GIPO12',
			states: ['IN', 'OUT', 'PWM']
		},
		32: {
			name: 'GIPO13',
			states: ['IN', 'OUT', 'PWM']
		},
		33: {
			name: 'GND',
			states: ['0']
		},
		34: {
			name: 'GIPO19',
			states: ['IN', 'OUT', 'PWM']
		},
		35: {
			name: 'GIPO16',
			states: ['IN', 'OUT']
		},
		36: {
			name: 'GIPO26',
			states: ['IN', 'OUT']
		},
		37: {
			name: 'GIPO20',
			states: ['IN', 'OUT']
		},
		38: {
			name: 'GND',
			states: ['0']
		},
		39: {
			name: 'GIPO21',
			states: ['IN', 'OUT']
		}
	},

	/**
	 * Return the GPIO number of the pin
	 * @param  {Integer} pinNumber The pin number on the RaspberryPi
	 */
	parsePinToGpio(pinNumber) {
		return this.pins[pinNumber].name.substr(4);
	},

	/**
	 * Return the number of the pin
	 * @param  {Integer} pinGpio The GPIO pin on the RaspberryPi
	 */
	parseGpioToPin(pinGpio) {
		for (let pin of Object.keys(this.pins)) {
			if (this.pins[pin].name === 'GIPO' + pinGpio.toString()) {
				return pin;
			}
		}
	},

	/**
	 * Set the color and the value of the led
	 * @param  {String} component The id of the led
	 * @param  {Integer} value The value that the led should have, '0' of '1'
	 */
	setLed: function(component, value) {
		if (value) {
			this.dataLoaded.components[component].active = true;
			$(document.querySelector('#raspberrypi_svg').firstElementChild).find('g[partID="' + component + '"] #color_path32').css({ fill: 'hsl(' + this.ledColors[this.dataLoaded.components[component].color] + ', 100%, 50%)' });
		} else {
			this.dataLoaded.components[component].active = false;
			$(document.querySelector('#raspberrypi_svg').firstElementChild).find('g[partID="' + component + '"] #color_path32').css({ fill: 'hsl(' + this.ledColors[this.dataLoaded.components[component].color] + ', 25%, 50%)' });
		}
	},

	/**
	 * Set the functions of the button
	 * @param  {String} component The id of the button
	 */
	setButton: function(component) {
		this.dataLoaded.components[component].active = false;

		// Function for pressing the button
		$(document.querySelector('#raspberrypi_svg').firstElementChild).find('g[partID="' + component + '"]').on('mousedown', () => {
			this.dataLoaded.components[component].active = true;
			update_components();
		});

		// Function for releasing the button
		$(document.querySelector('#raspberrypi_svg').firstElementChild).find('g[partID="' + component + '"]').on('mouseup', () => {
			this.dataLoaded.components[component].active = false;
			update_components();
		});

		// Function for leveaing the area of the button
		$(document.querySelector('#raspberrypi_svg').firstElementChild).find('g[partID="' + component + '"]').on('mouseleave', () => {
			this.dataLoaded.components[component].active = false;
			update_components();
		});

		// Change the cursor style if hover the button
		$(document.querySelector('#raspberrypi_svg').firstElementChild).find('g[partID="' + component + '"]').css('cursor', 'pointer');
	},

	/**
	 * Set the LCD to the initial state
	 * @param  {String} component The id of the LCD
	 */
	setLcd: function(component) {
		this.dataLoaded.components[component].text = '';
		this.dataLoaded.components[component].cursor = true;
		this.dataLoaded.components[component].blink = true;
		this.dataLoaded.components[component].curCol = 0;
		this.dataLoaded.components[component].curRow = 0;
		this.dataLoaded.components[component].shift = 0;
		this.dataLoaded.components[component].segments = [['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']];
	},

	/**
	 * Reset the variables needed to be reseted in the project JSON
	 */
	setDefault: function() {
		this.dataLoaded.assignedPins = [];

		for (let pin of Object.keys(this.dataLoaded.pins)) {

			// Choose only the GPIO pins
			if (pin !== '3v3' && pin !== '5v' && pin !== 'gnd') {
				this.dataLoaded.pins[pin].activeLow = false;
				this.dataLoaded.pins[pin].value = 0;
				this.dataLoaded.pins[pin].state = 'in';

				for (let component of this.dataLoaded.pins[pin].components) {
					this.dataLoaded.components[component].active = false;

					if (this.dataLoaded.components[component].name === 'led') {
						this.setLed(component, 0);
					}
				}
			}
		}

		// Reset the state of the LCD
		for (let component of Object.keys(this.dataLoaded.components)) {
			if (this.dataLoaded.components[component].name === 'lcd') {
				this.setLcd(component);
			}
		}

		update_components();
	},

	/**
	 * Load the SVG, parse the XML and set to default the components
	 * @param  {String} name The name of the project to load
	 */
	loadProject: function(name) {
		try {
			this.nameLoaded = name;

			if (name.indexOf(this.startingNameForTutorials) !== 0) {
				if (document.getElementById('raspberrypi_svg').firstElementChild === null) {
					document.getElementById('raspberrypi_svg').appendChild(this.ownProject.svg);
				} else {
					document.getElementById('raspberrypi_svg').replaceChild(this.ownProject.svg, document.getElementById('raspberrypi_svg').firstElementChild);
				}

				// Save the SVG document
				this.svgLoaded = this.ownProject.svg;
				this.dataLoaded = this.ownProject.xml;
			} else {

				// Load SVG file
				let svgPath = this.svgGenericPath + name + '.svg';
				let xhrSvg = new XMLHttpRequest();

				xhrSvg.open('GET', svgPath, false);
				xhrSvg.overrideMimeType('image/svg+xml');
				xhrSvg.send('');

				// Put SVG file in HTML component
				if (document.getElementById('raspberrypi_svg').firstElementChild === null) {
					document.getElementById('raspberrypi_svg').appendChild(xhrSvg.responseXML.documentElement);
				} else {
					document.getElementById('raspberrypi_svg').replaceChild(xhrSvg.responseXML.documentElement, document.getElementById('raspberrypi_svg').firstElementChild);
				}

				// Save the SVG document
				this.svgLoaded = xhrSvg.responseXML.documentElement;

				// Load XML file
				let xmlPath = this.xmlGenericPath + name + '.xml';
				let xhrXml = new XMLHttpRequest();

				xhrXml.open('GET', xmlPath, false);
				xhrXml.overrideMimeType('image/svg+xml');
				xhrXml.send('');

				// Parse XML file and save the JSON generated
				this.dataLoaded = generate_project_json(xhrXml.responseXML.documentElement);
			}

			// Initialize the components
			for (let component of Object.keys(this.dataLoaded.components)) {
				if (this.dataLoaded.components[component].valid) {
					if (this.dataLoaded.components[component].name === 'led') {
						this.setLed(component, 0);
					} else if (this.dataLoaded.components[component].name === 'button') {
						this.setButton(component);
					} else if (this.dataLoaded.components[component].name === 'lcd') {
						this.setLcd(component);
					}
				}
			}
		} catch(e) {
			console.log(e);
		}
	}
}

export default generic_raspberrypi;