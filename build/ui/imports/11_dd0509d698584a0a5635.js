(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var raw_loader_visual_toolbox_xml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(327);
var studio = null;

let firmata_blocks = __webpack_require__ (323);
let firmata_code = __webpack_require__ (324);

let picamera_blocks = __webpack_require__ (325);
let picamera_code = __webpack_require__ (326);



function setup (options, imports, register)
{
	studio = imports;

	imports.events.on ('ready', (imports) => 
	{
		// add optional imports
		studio = imports;

		/* Register Pin Layout */
		if (studio.pin_layout)
		{
			studio.pin_layout.registerPinLayout ('wyapp', 'raspberrypi', (device) => {
				if (device.properties.wyliolab)
				{
					return 'plugins/devices/wyapp/devices/raspberrypi/data/img/pins-wyliozero.png';
				}
				else
				{
					return 'plugins/devices/wyapp/devices/raspberrypi/data/img/pins-raspberrypi.png';
				}
			});
		}
		else
		{
			studio.workspace.warn ('device.wyapp.raspberrypi: pin_layout plugin is not available');
		}
	});

	let raspberrypi = {
		name: 'Raspberry Pi',
		setupOptions: {
			path: '/boot/',
			wifiLink: 'https://wyliodrinstudio.readthedocs.io/en/latest/boards/raspberrypi.html#set-up-wireless',
			link: 'https://wyliodrinstudio.readthedocs.io/en/latest/boards/raspberrypi.html#connecting-via-web'
		},
		priority: 1,
		/** 
		 * Device Icon 
		*/
		iconURL ()
		{
			return 'plugins/devices/wyapp/devices/raspberrypi/data/img/icon-raspberrypi.png';
		},
		/**
		 * Found a device, modify stuff (like icon)
		 * @param {Device} device 
		 */
		found (device)
		{
			device.icon = this.iconURL ();
			if (!device.description) device.description = 'Raspberry Pi';
			device.defaultUsername = 'pi';
			device.defaultPassword = 'raspberry';
		},

		/**
		 * Update a device, modify stuff
		 * @param {Device} device 
		 */
		update (device)
		{
			device.icon = this.iconURL ();
			if (!device.description) device.description = 'Raspberry Pi';
			device.defaultUsername = 'pi';
			device.defaultPassword = 'raspberry';
		},

		/**
		 * Modidify the project before run
		 * @param {Project} project - the project
		 */
		run (/*project*/)
		{
			let retVal = true;
			
			return retVal;
		},

		/**
		 * Modidify the project before deploy
		 * @param {Project} project - the project
		 */
		deploy (project)
		{
			let dockerfile = null;
			if(project.language === 'nodejs')
			{
				dockerfile = 'FROM balenalib/raspberrypi3-debian-node:14';
			}
			else 
			if (project.language === 'python' || project.language === 'visual')
			{
				dockerfile = 'FROM balenalib/raspberrypi3-debian-python:3';
			}
			else
			{
				dockerfile = 'FROM balenalib/raspberrypi3-debian';
			}
			dockerfile += '\nCOPY . .\n';

			dockerfile += studio.projects.getEnvironmentSetup(project);

			return studio.projects.newFile(project,'/Dockerfile', dockerfile);
		}
	};

	/* Register Icon */
	studio.device_wyapp.registerBoard ('raspberrypi', raspberrypi);

	studio.projects.registerLanguagePackage ('nodejs', 'raspberrypi', {
		name: 'onoff',
		description: 'GPIO access and interrupt detection with Node.js on Linux boards like the Raspberry Pi, C.H.I.P. or BeagleBone.'
	});

	studio.projects.registerLanguagePackage ('python', 'raspberrypi', [
		{
			name: 'gpiozero',
			description: 'A simple interface to GPIO devices with Raspberry Pi.'
		},
		{
			name: 'pyFirmata',
			description: 'pyFirmata is a Python interface for the Firmata protocol.'
		},
	]);

	studio.editor_visual.registerBlocksDefinitions ('raspberrypi', [firmata_blocks, picamera_blocks], [firmata_code, picamera_code], raw_loader_visual_toolbox_xml__WEBPACK_IMPORTED_MODULE_0__["default"], 
		{
			type: 'wyapp', 
			board: 'raspberrypi'
		}
	);

	register (null, {});
}

/***/ }),

/***/ 323:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (blockly) {
	let Blockly = blockly.Blockly;

	Blockly.Blocks['firmata_init'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(120);
			this.appendDummyInput()
				.appendField('Start')
				.appendField(new Blockly.FieldDropdown([['Arduino', 'arduino'], ['Arduino Mega', 'arduinomega']]), 'board');
			this.appendValueInput('port')
				.appendField('on port');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['firmata_digitalwrite'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(120);
			this.appendValueInput('digitalPin')
				.setCheck('Number')
				.appendField('Digital write on pin');
			this.appendValueInput('value')
				.appendField('value');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['firmata_digitalread'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(120);
			this.appendValueInput('digitalPin')
				.setCheck('Number')
				.appendField('Digital read pin');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['firmata_analogread'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(120);
			this.appendValueInput('analogPin')
				.setCheck('Number')
				.appendField('Analog read pin');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['firmata_set_rgb_led'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_basic_color');
			this.setColour(120);
			this.appendValueInput('color')
				.setCheck('Colour')
				.appendField('Set basic color');
			this.appendDummyInput()
				.appendField('on RGB LED with pins');
			this.appendValueInput('red')
				.setCheck('Number')
				.appendField('R');
			this.appendValueInput('green')
				.setCheck('Number')
				.appendField('G');
			this.appendValueInput('blue')
				.setCheck('Number')
				.appendField('B');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Set the color on an RGB LED. This will set only the basic colors.');
		}
	};

	Blockly.Blocks['firmata_set_fine_rgb_led'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_fine_color');
			this.setColour(120);
			this.appendValueInput('color')
				.setCheck('Colour')
				.appendField('Set fine color');
			this.appendDummyInput()
				.appendField('on RGB LED with pins');
			this.appendValueInput('red')
				.setCheck('Number')
				.appendField('R');
			this.appendValueInput('green')
				.setCheck('Number')
				.appendField('G');
			this.appendValueInput('blue')
				.setCheck('Number')
				.appendField('B');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Set the color on an RGB LED. This will set colors using PWM so the pins need to be able to do that.');
		}
	};

	Blockly.Blocks['firmata_serial'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(120);
			this.appendDummyInput()
				.appendField('Serial Monitor')
				.appendField(new Blockly.FieldTextInput('auto'), 'port')
				.appendField('with Baud Rate')
				.appendField(new Blockly.FieldDropdown([['300', '300'], ['1200', '1200'], ['2400', '2400'], ['4800', '4800'], ['9600', '9600'], ['14400', '14400'], ['28800', '28800'], ['38400', '38400'], ['57600', '57600'], ['115200', '11500']]), 'baudrate');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['firmata_analogwrite'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(120);
			this.appendValueInput('analogPin')
				.setCheck('Number')
				.appendField('Analog write on pin');
			this.appendValueInput('analogValue')
				.setCheck('Number')
				.appendField('value');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['firmata_servo'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#servo');
			this.setColour(120);
			this.appendValueInput('value_servo')
				.appendField('Set servo angle');
			this.appendValueInput('pin')
				.appendField('on pin');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

};

/***/ }),

/***/ 324:
/***/ (function(module, exports) {

module.exports = function (blockly) {
	let Blockly = blockly.Blockly;

	Blockly.Python.firmataImport = function () {
		if (!Blockly.Python.definitions_['import_firmata']) {
			Blockly.Python.definitions_['import_firmata'] = 'from pyfirmata import Arduino, ArduinoMega\n' +
				'from pyfirmata import util\n';
		}
	};

	Blockly.Python.firmataSetup = function (board_type, board_port) {
		if (!Blockly.Python.definitions_['import_firmata_setup']) {
			var auxBoard = Blockly.Python.variableDB_.getDistinctName('board', Blockly.Generator.NAME_TYPE);
			var auxReader = Blockly.Python.variableDB_.getDistinctName('reader', Blockly.Generator.NAME_TYPE);
			Blockly.Python.board = auxBoard;
			Blockly.Python.reader = auxReader;
			Blockly.Python.definitions_['import_firmata_setup'] = 'def setBoard(boardType, port):\n' +
				'  if boardType == \'arduino\':\n' +
				'    ' + Blockly.Python.board + ' = Arduino(port)\n' +
				'  else:\n' +
				'    ' + Blockly.Python.board + ' = ArduinoMega(port)\n' +
				'  return board\n' +
				Blockly.Python.board + '=setBoard(' + board_type + ', ' + board_port + ')\n' +
				auxReader + ' = util.Iterator(' + auxBoard + ')\n' +
				auxReader + '.start()\n'
			;
		}
	};


	Blockly.Python.pinFunction = function (type, pin, fns) {
		if (!Blockly.Python.board) {
			Blockly.Python.definitions_['pin_function_' + type + ':' + pin] = 'print (\'Please start the Arduino board first\')\n';
			if (!Blockly.Python.pin) {
				Blockly.Python.pin = [];
			}
			Blockly.Python.pin[type + ':' + pin] = 'None';
		}
		else {
			var auxPin = Blockly.Python.variableDB_.getDistinctName('pin_var', Blockly.Generator.NAME_TYPE);
			if (!Blockly.Python.definitions_['pin_function_' + type + ':' + pin]) {
				if (!Blockly.Python.pin) {
					Blockly.Python.pin = [];
				}
				Blockly.Python.pin[type + ':' + pin] = auxPin;
				Blockly.Python.definitions_['pin_function_' + type + ':' + pin] = Blockly.Python.pin[type + ':' + pin] + ' = ' + Blockly.Python.board + '.get_pin(\'' + type + ':' + pin + ':' + fns + '\')\n';
			}
		}
	};


	Blockly.Python.pinSetup = function () {
		var auxAPin = Blockly.Python.variableDB_.getDistinctName('pin', Blockly.Generator.NAME_TYPE);
		Blockly.Python.aPin = auxAPin;
	};

	Blockly.Python['firmata_init'] = function (block) {
		var dropdown_board = block.getFieldValue('board');
		var value_port = Blockly.Python.valueToCode(block, 'port', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.firmataImport();
		Blockly.Python.firmataSetup('\'' + dropdown_board + '\'', value_port);
		// TODO: Assemble Python into code variable.
		var code = '';
		return code;
	};

	Blockly.Python['firmata_digitalwrite'] = function (block) {
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		var value_digitalpin = Blockly.Python.valueToCode(block, 'digitalPin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		Blockly.Python.pinFunction('d', value_digitalpin, 'o');
		var code = Blockly.Python.pin['d:' + value_digitalpin] + '.write(' + value_value + ')\n';
		return code;
	};

	Blockly.Python['firmata_digitalread'] = function (block) {
		var value_digitalpin = Blockly.Python.valueToCode(block, 'digitalPin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		Blockly.Python.pinFunction('d', value_digitalpin, 'i');
		var code = Blockly.Python.pin['d:' + value_digitalpin] + '.read()';
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['firmata_set_rgb_led'] = function (block) {
		Blockly.Python.colors();
		var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
		var value_red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_ATOMIC);
		var value_green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_ATOMIC);
		var value_blue = Blockly.Python.valueToCode(block, 'blue', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.

		Blockly.Python.pinFunction('d', value_red, 'o');
		Blockly.Python.pinFunction('d', value_green, 'o');
		Blockly.Python.pinFunction('d', value_blue, 'o');
		// TODO: Assemble Python into code variable.

		var colorVar = Blockly.Python.variableDB_.getDistinctName(
			'color', Blockly.Variables.NAME_TYPE);
		var code = colorVar + ' = colorToRGB (' + value_color + ')\n' +
			Blockly.Python.pin['d:' + value_red] + '.write(basic_color(' + colorVar + '[0]))\n' +
			Blockly.Python.pin['d:' + value_green] + '.write(basic_color(' + colorVar + '[1]))\n' +
			Blockly.Python.pin['d:' + value_blue] + '.write(basic_color(' + colorVar + '[2]))\n'
			;
		return code;
	};

	Blockly.Python['firmata_set_fine_rgb_led'] = function (block) {
		Blockly.Python.colors();
		var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
		var value_red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_ATOMIC);
		var value_green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_ATOMIC);
		var value_blue = Blockly.Python.valueToCode(block, 'blue', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.pinFunction('d', value_red, 'p');
		Blockly.Python.pinFunction('d', value_green, 'p');
		Blockly.Python.pinFunction('d', value_blue, 'p');
		// TODO: Assemble Python into code variable.
		var colorVar = Blockly.Python.variableDB_.getDistinctName(
			'color', Blockly.Variables.NAME_TYPE);
		var code = colorVar + ' = colorToRGB (' + value_color + ')\n' +
			Blockly.Python.pin['d:' + value_red] + '.write(' + colorVar + '[0]/255.0)\n' +
			Blockly.Python.pin['d:' + value_green] + '.write(' + colorVar + '[1]/255.0)\n' +
			Blockly.Python.pin['d:' + value_blue] + '.write(' + colorVar + '[2]/255.0)\n'
			;
		return code;
	};

	Blockly.Python['firmata_serial'] = function (block) {
		var text_port = block.getFieldValue('port');
		var dropdown_baudrate = block.getFieldValue('baudrate');
		if (!Blockly.Python.definitions_['import_os']) {
			Blockly.Python.definitions_['import_os'] = 'import os';
		}
		// TODO: Assemble Python into code variable.
		var _arguments = '-b ' + dropdown_baudrate;
		if (text_port != 'auto') _arguments += ' -p ' + text_port;
		var code = 'os.system (\'ino serial ' + _arguments + '\')';
		return code;
	};

	Blockly.Python['firmata_analogread'] = function (block) {
		var value_analogpin = Blockly.Python.valueToCode(block, 'analogPin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		Blockly.Python.pinFunction('a', value_analogpin, 'i');
		var code = 'round((' + Blockly.Python.pin['a:' + value_analogpin] + '.read() or 0) * 1023)';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['firmata_analogwrite'] = function (block) {
		var value_analogvalue = Blockly.Python.valueToCode(block, 'analogValue', Blockly.Python.ORDER_ATOMIC);
		var value_analogpin = Blockly.Python.valueToCode(block, 'analogPin', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.pinFunction('d', value_analogpin, 'p');
		// TODO: Assemble Python into code variable.
		var code = Blockly.Python.pin['d:' + value_analogpin] + '.write(' + value_analogvalue + '/255.0)\n';
		return code;
	};

	Blockly.Python['firmata_servo'] = function (block) {
		var value_analogvalue = Blockly.Python.valueToCode(block, 'value_servo', Blockly.Python.ORDER_ATOMIC);
		var value_analogpin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.pinFunction('d', value_analogpin, 's');
		// TODO: Assemble Python into code variable.
		var code = Blockly.Python.pin['d:' + value_analogpin] + '.write(' + value_analogvalue + ')\n';
		return code;
	};
};

/***/ }),

/***/ 325:
/***/ (function(module, exports, __webpack_require__) {

"use strict";



module.exports = function (blockly) {
	let Blockly = blockly.Blockly;

	Blockly.Blocks['picamera_snapshot'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(135);
			this.appendValueInput('filename')
				.setCheck('String')
				.appendField('Pi Camera take snapshot');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['picamera_start_recording'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(135);
			this.appendValueInput('filename')
				.setCheck('String')
				.appendField('Pi Camera start recording');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['picamera_stop_recording'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(135);
			this.appendDummyInput()
				.appendField('Pi Camera stop recording');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

};


/***/ }),

/***/ 326:
/***/ (function(module, exports, __webpack_require__) {

"use strict";



module.exports = function (blockly) {
	let Blockly = blockly.Blockly;

	Blockly.Python.picamera_setup = function () {
		if (!Blockly.Python.definitions_['import_picamera']) {
			var picamera = Blockly.Python.variableDB_.getDistinctName('camera', Blockly.Generator.NAME_TYPE);
			Blockly.Python.picamera = picamera;
			Blockly.Python.definitions_['import_picamera'] = 'from picamera import *\n' +
				Blockly.Python.picamera + ' = PiCamera()\n';
		}
	};

	Blockly.Python['picamera_snapshot'] = function (block) {
		Blockly.Python.picamera_setup();
		var value_filename = Blockly.Python.valueToCode(block, 'filename', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = Blockly.Python.picamera + '.capture (' + value_filename + '+".jpg")\n';
		return code;
	};

	Blockly.Python['picamera_start_recording'] = function (block) {
		Blockly.Python.picamera_setup();
		var value_filename = Blockly.Python.valueToCode(block, 'filename', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = Blockly.Python.picamera + '.start_recording (' + value_filename + '+".h264")\n';
		return code;
	};

	Blockly.Python['picamera_stop_recording'] = function (/* block */) {
		Blockly.Python.picamera_setup();
		// var value_filename = Blockly.Python.valueToCode(block, 'filename', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = Blockly.Python.picamera + '.stop_recording ()\n';
		return code;
	};


};


/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<toolbox>\n\t<category name=\"Pi Camera\" colour=\"135\">\n\t\t<block type=\"picamera_snapshot\">\n\t\t\t<value name=\"filename\">\n\t\t\t\t<block type=\"text\">\n\t\t\t\t\t<field name=\"TEXT\">photo</field>\n\t\t\t\t</block>\n\t\t\t</value>\n\t\t</block>\n\t\t<block type=\"picamera_start_recording\">\n\t\t\t<value name=\"filename\">\n\t\t\t\t<block type=\"text\">\n\t\t\t\t\t<field name=\"TEXT\">photo</field>\n\t\t\t\t</block>\n\t\t\t</value>\n\t\t</block>\n\t\t<block type=\"picamera_stop_recording\"></block>\n\t</category>\n\t<category name=\"Arduino\" colour=\"120\">\n\t\t<block type=\"firmata_serial\"></block>\n\t\t<block type=\"firmata_init\">\n\t\t\t<value name=\"port\">\n\t\t\t\t<block type=\"text\">\n\t\t\t\t\t<field name=\"TEXT\">auto</field>\n\t\t\t\t</block>\n\t\t\t</value>\n\t\t</block>\n\t\t<block type=\"firmata_digitalwrite\">\n\t\t\t<value name=\"digitalPin\">\n\t\t\t\t<block type=\"math_number\">\n\t\t\t\t\t<field name=\"NUM\">0</field>\n\t\t\t\t</block>\n\t\t\t</value>\n\t\t\t<value name=\"value\">\n\t\t\t\t<block type=\"math_number\">\n\t\t\t\t\t<field name=\"NUM\">1</field>\n\t\t\t\t</block>\n\t\t\t</value>\n\t\t</block>\n\t\t<block type=\"firmata_digitalread\">\n\t\t\t<value name=\"digitalPin\">\n\t\t\t\t<block type=\"math_number\">\n\t\t\t\t\t<field name=\"NUM\">0</field>\n\t\t\t\t</block>\n\t\t\t</value>\n\t\t</block>\n\t\t<block type=\"firmata_analogwrite\">\n\t\t\t<value name=\"analogPin\">\n\t\t\t\t<block type=\"math_number\">\n\t\t\t\t\t<field name=\"NUM\">0</field>\n\t\t\t\t</block>\n\t\t\t</value>\n\t\t\t<value name=\"analogValue\">\n\t\t\t\t<block type=\"math_number\">\n\t\t\t\t\t<field name=\"NUM\">255</field>\n\t\t\t\t</block>\n\t\t\t</value>\n\t\t</block>\n\t\t<block type=\"firmata_analogread\">\n\t\t\t<value name=\"analogPin\">\n\t\t\t\t<block type=\"math_number\">\n\t\t\t\t\t<field name=\"NUM\">0</field>\n\t\t\t\t</block>\n\t\t\t</value>\n\t\t</block>\n\t\t<block type=\"firmata_set_rgb_led\">\n\t\t\t<value name=\"color\">\n\t\t\t\t<block type=\"colour_picker\">\n\t\t\t\t\t<field name=\"COLOUR\">#ff0000</field>\n\t\t\t\t</block>\n\t\t\t</value>\n\t\t\t<value name=\"red\">\n\t\t\t\t<block type=\"math_number\">\n\t\t\t\t\t<field name=\"NUM\">0</field>\n\t\t\t\t</block>\n\t\t\t</value>\n\t\t\t<value name=\"green\">\n\t\t\t\t<block type=\"math_number\">\n\t\t\t\t\t<field name=\"NUM\">1</field>\n\t\t\t\t</block>\n\t\t\t</value>\n\t\t\t<value name=\"blue\">\n\t\t\t\t<block type=\"math_number\">\n\t\t\t\t\t<field name=\"NUM\">2</field>\n\t\t\t\t</block>\n\t\t\t</value>\n\t\t</block>\n\t\t<block type=\"firmata_set_fine_rgb_led\">\n\t\t\t<value name=\"color\">\n\t\t\t\t<block type=\"colour_picker\">\n\t\t\t\t\t<field name=\"COLOUR\">#ff9966</field>\n\t\t\t\t</block>\n\t\t\t</value>\n\t\t\t<value name=\"red\">\n\t\t\t\t<block type=\"math_number\">\n\t\t\t\t\t<field name=\"NUM\">0</field>\n\t\t\t\t</block>\n\t\t\t</value>\n\t\t\t<value name=\"green\">\n\t\t\t\t<block type=\"math_number\">\n\t\t\t\t\t<field name=\"NUM\">1</field>\n\t\t\t\t</block>\n\t\t\t</value>\n\t\t\t<value name=\"blue\">\n\t\t\t\t<block type=\"math_number\">\n\t\t\t\t\t<field name=\"NUM\">2</field>\n\t\t\t\t</block>\n\t\t\t</value>\n\t\t</block>\n\t\t<block type=\"firmata_servo\">\n\t\t\t<value name=\"value_servo\">\n\t\t\t\t<block type=\"math_number\">\n\t\t\t\t\t<field name=\"NUM\">0</field>\n\t\t\t\t</block>\n\t\t\t</value>\n\t\t\t<value name=\"pin\">\n\t\t\t\t<block type=\"math_number\">\n\t\t\t\t\t<field name=\"NUM\">0</field>\n\t\t\t\t</block>\n\t\t\t</value>\n\t\t</block>\n\t</category>\n\t<sep />\n</toolbox>");

/***/ })

}]);