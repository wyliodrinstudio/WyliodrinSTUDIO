(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[32],{

/***/ 531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var xml_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(507);
/* harmony import */ var xml_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(xml_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var raw_loader_visual_toolbox_xml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(532);



let studio = null;


let blocks = __webpack_require__ (533);
let code = __webpack_require__ (534);

let blocks_signals = __webpack_require__ (535);
let code_signals = __webpack_require__ (536);

function setup (options, imports, register)
{
	studio = imports;

	let toolbox = xml_js__WEBPACK_IMPORTED_MODULE_0___default.a.xml2js (raw_loader_visual_toolbox_xml__WEBPACK_IMPORTED_MODULE_1__["default"]);
	studio.editor_visual.registerBlocksDefinitions ('libwyliodrin', [blocks, blocks_signals], [code, code_signals], toolbox, {
		type: 'wyapp', 
		board: 'raspberrypi', 
		visible ()
		{
			let device = studio.workspace.getDevice ();
			if (device.properties.libwyliodrin && !device.properties.wyliolab) return true;
			else return false;
		}
	});

	register (null, {});
}

/***/ }),

/***/ 532:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<toolbox>\n    <category name=\"Timing\" colour=\"17\">\n        <block type=\"wyliodrin_delay\">\n            <value name=\"millis\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">1000</field>\n                </block>\n            </value>\n        </block>\n    </category>\n    <category name=\"Pin Access\" colour=\"17\">\n        <block type=\"pinmode\">\n            <value name=\"pin\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">0</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"digitalwrite\">\n            <value name=\"pin\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">0</field>\n                </block>\n            </value>\n            <value name=\"value\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">0</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"digitalread\">\n            <value name=\"pin\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">0</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"analogwrite\">\n            <value name=\"pin\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">0</field>\n                </block>\n            </value>\n            <value name=\"value\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">0</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"analogread\">\n            <value name=\"pin\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">0</field>\n                </block>\n            </value>\n        </block>\n    </category>\n    <category name= \"Peripherals\">\n        <category name=\"Pins\" colour=\"17\">\n            <block type=\"setpin\">\n                <value name=\"pin\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">0</field>\n                    </block>\n                </value>\n            </block>\n            <block type=\"readpin\">\n                <value name=\"pin\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">0</field>\n                    </block>\n                </value>\n            </block>\n            <block type=\"shiftout\">\n                <value name=\"data_pin\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">0</field>\n                    </block>\n                </value>\n                <value name=\"clock_pin\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">1</field>\n                    </block>\n                </value>\n                <value name=\"value\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">0</field>\n                    </block>\n                </value>\n            </block>\n            <block type=\"shiftin\">\n                <value name=\"data_pin\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">0</field>\n                    </block>\n                </value>\n                <value name=\"clock_pin\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">1</field>\n                    </block>\n                </value>\n            </block>\n        </category>\n        <category name=\"LED\" colour=\"260\">\n            <block type=\"set_led\">\n                <value name=\"pin\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">0</field>\n                    </block>\n                </value>\n            </block>\n            <block type=\"set_rgb_led\">\n                <value name=\"color\">\n                    <block type=\"colour_picker\">\n                        <field name=\"COLOUR\">#ff0000</field>\n                    </block>\n                </value>\n                <value name=\"red\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">0</field>\n                    </block>\n                </value>\n                <value name=\"green\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">1</field>\n                    </block>\n                </value>\n                <value name=\"blue\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">2</field>\n                    </block>\n                </value>\n            </block>\n            <block type=\"set_fine_rgb_led\">\n                <value name=\"color\">\n                    <block type=\"colour_picker\">\n                        <field name=\"COLOUR\">#ff9966</field>\n                    </block>\n                </value>\n                <value name=\"red\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">0</field>\n                    </block>\n                </value>\n                <value name=\"green\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">1</field>\n                    </block>\n                </value>\n                <value name=\"blue\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">2</field>\n                    </block>\n                </value>\n            </block>\n        </category>\n        <category name=\"7 Segment Display\" colour=\"180\">\n            <block type=\"variables_set\" id=\"4\" inline=\"true\" x=\"70\" y=\"47\">\n                <field name=\"VAR\">seg7</field>\n                <value name=\"VALUE\">\n                    <block type=\"sevensegmdispl_setup\">\n                        <value name=\"seg_a\">\n                            <block type=\"math_number\">\n                                <field name=\"NUM\">0</field>\n                            </block>\n                        </value>\n                        <value name=\"seg_b\">\n                            <block type=\"math_number\">\n                                <field name=\"NUM\">1</field>\n                            </block>\n                        </value>\n                        <value name=\"seg_c\">\n                            <block type=\"math_number\">\n                                <field name=\"NUM\">2</field>\n                            </block>\n                        </value>\n                        <value name=\"seg_d\">\n                            <block type=\"math_number\">\n                                <field name=\"NUM\">3</field>\n                            </block>\n                        </value>\n                        <value name=\"seg_e\">\n                            <block type=\"math_number\">\n                                <field name=\"NUM\">4</field>\n                            </block>\n                        </value>\n                        <value name=\"seg_f\">\n                            <block type=\"math_number\">\n                                <field name=\"NUM\">5</field>\n                            </block>\n                        </value>\n                        <value name=\"seg_g\">\n                            <block type=\"math_number\">\n                                <field name=\"NUM\">6</field>\n                            </block>\n                        </value>\n                        <value name=\"seg_dp\">\n                            <block type=\"math_number\">\n                                <field name=\"NUM\">7</field>\n                            </block>\n                        </value>\n                    </block>\n                </value>\n            </block>\n            <block type=\"sevensegmdispl_display\">\n                <value name=\"ssd\">\n                    <block type=\"variables_get\">\n                        <field name=\"VAR\">seg7</field>\n                    </block>\n                </value>\n                <value name=\"tobedispl\">\n                    <block type=\"text\">\n                        <field name=\"TEXT\">0</field>\n                    </block>\n                </value>\n            </block>\n        </category>\n        <category name=\"4x7segment\" colour=\"260\">\n            <block type=\"variables_set\" id=\"4\" inline=\"true\" x=\"70\" y=\"47\">\n                <field name=\"VAR\">4x7segment</field>\n                <value name=\"VALUE\">\n                    <block type=\"adafruit_7segment_begin\">\n                        <value name=\"bus\">\n                            <block type=\"math_number\">\n                                <field name=\"NUM\">112</field>\n                            </block>\n                        </value>\n                    </block>\n                </value>\n            </block>\n            <block type=\"adafruit_7segment_print\">\n                <value name=\"nr\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">100</field>\n                    </block>\n                </value>\n                <value name=\"7seg\">\n                    <block type=\"variables_get\">\n                        <field name=\"VAR\">4x7segment</field>\n                    </block>\n                </value>\n            </block>\n            <block type=\"adafruit_writeDisplay\">\n                <value name=\"adafruit\">\n                    <block type=\"variables_get\">\n                        <field name=\"VAR\">4x7segment</field>\n                    </block>\n                </value>\n            </block>\n        </category>\n        <category name=\"24LedBar\" colour=\"260\">\n            <block type=\"variables_set\" id=\"4\" inline=\"true\" x=\"70\" y=\"47\">\n                <field name=\"VAR\">24LedBar</field>\n                <value name=\"VALUE\">\n                    <block type=\"adafruit_24bar_begin\">\n                        <value name=\"bus\">\n                            <block type=\"math_number\">\n                                <field name=\"NUM\">112</field>\n                            </block>\n                        </value>\n                    </block>\n                </value>\n            </block>\n            <block type=\"adafruit_24bar_color\">\n                <value name=\"led\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">1</field>\n                    </block>\n                </value>\n                <value name=\"24bar\">\n                    <block type=\"variables_get\">\n                        <field name=\"VAR\">24LedBar</field>\n                    </block>\n                </value>\n            </block>\n            <block type=\"adafruit_writeDisplay\">\n                <value name=\"adafruit\">\n                    <block type=\"variables_get\">\n                        <field name=\"VAR\">24LedBar</field>\n                    </block>\n                </value>\n            </block>\n        </category>\n        <category name=\"LCD\" colour=\"260\">\n            <block type=\"init_lcd_i2c\">\n                <field name=\"rows\">2</field>\n                <value name=\"i2caddress\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">32</field>\n                    </block>\n                </value>\n            </block>\n            <block type=\"init_lcd\">\n                <field name=\"rows\">2</field>\n                <value name=\"rs\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">10</field>\n                    </block>\n                </value>\n                <value name=\"strobe\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">11</field>\n                    </block>\n                </value>\n                <value name=\"d0\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">5</field>\n                    </block>\n                </value>\n                <value name=\"d1\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">6</field>\n                    </block>\n                </value>\n                <value name=\"d2\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">7</field>\n                    </block>\n                </value>\n                <value name=\"d3\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">9</field>\n                    </block>\n                </value>\n            </block>\n            <block type=\"clear_lcd\"></block>\n            <block type=\"reset_lcd\"></block>\n            <block type=\"set_position_lcd\">\n                <value name=\"col\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">1</field>\n                    </block>\n                </value>\n                <value name=\"row\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">1</field>\n                    </block>\n                </value>\n            </block>\n            <block type=\"print_lcd\">\n                <value name=\"text\">\n                    <block type=\"text\">\n                        <field name=\"TEXT\">Hey Wyliodrin</field>\n                    </block>\n                </value>\n            </block>\n        </category>\n    </category>\n    <category name=\"Sensors\">\n        <category name=\"Humidity sensor\" colour=\"225\">\n            <block type=\"variables_set\" id=\"4\" inline=\"true\" x=\"70\" y=\"47\">\n                <field name=\"VAR\">humiditySensor</field>\n                <value name=\"VALUE\">\n                    <block type='htu21d_setup'></block>\n                </value>\n            </block>\n            <block type='htu21d_getHum'>\n                <value name=\"humidity\">\n                    <block type=\"variables_get\">\n                        <field name=\"VAR\">humiditySensor</field>\n                    </block>\n                </value>\n            </block>\n            <block type='htu21d_getTem'>\n                <value name=\"hum\">\n                    <block type=\"variables_get\">\n                        <field name=\"VAR\">humiditySensor</field>\n                    </block>\n                </value>\n            </block>\n        </category>\n        <category name=\"Accelerometer\" colour=\"225\">\n            <block type=\"variables_set\" id=\"4\" inline=\"true\" x=\"70\" y=\"47\">\n                <field name=\"VAR\">accelerometer</field>\n                <value name=\"VALUE\">\n                    <block type=\"mpu6050_setup\">\n                        <value name=\"address\">\n                            <block type=\"math_number\">\n                                <field name=\"NUM\">104</field>\n                            </block>\n                        </value>\n                    </block>\n                </value>\n            </block>\n            <block type='mpu6050_getAccX'>\n                <value name=\"accelerom\">\n                    <block type=\"variables_get\">\n                        <field name=\"VAR\">accelerometer</field>\n                    </block>\n                </value>\n            </block>\n            <block type='mpu6050_getAccY'>\n                <value name=\"acceleromy\">\n                    <block type=\"variables_get\">\n                        <field name=\"VAR\">accelerometer</field>\n                    </block>\n                </value>\n            </block>\n            <block type='mpu6050_getAccZ'>\n                <value name=\"acceleromz\">\n                    <block type=\"variables_get\">\n                        <field name=\"VAR\">accelerometer</field>\n                    </block>\n                </value>\n            </block>\n            <block type='mpu6050_getTemp'>\n                <value name=\"acceleromt\">\n                    <block type=\"variables_get\">\n                        <field name=\"VAR\">accelerometer</field>\n                    </block>\n                </value>\n            </block>\n            <block type='mpu6050_getRotX'>\n                <value name=\"acceleromm\">\n                    <block type=\"variables_get\">\n                        <field name=\"VAR\">accelerometer</field>\n                    </block>\n                </value>\n            </block>\n            <block type='mpu6050_getRotY'>\n                <value name=\"accelerommy\">\n                    <block type=\"variables_get\">\n                        <field name=\"VAR\">accelerometer</field>\n                    </block>\n                </value>\n            </block>\n            <block type='mpu6050_getRotZ'>\n                <value name=\"accelerommz\">\n                    <block type=\"variables_get\">\n                        <field name=\"VAR\">accelerometer</field>\n                    </block>\n                </value>\n            </block>\n        </category>\n        <category name=\"Buttons\" colour=\"17\">\n            <block type=\"button_is\">\n                <value name=\"pin\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">0</field>\n                    </block>\n                </value>\n            </block>\n            <block type=\"button_switched\">\n                <value name=\"pin\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">0</field>\n                    </block>\n                </value>\n            </block>\n        </category>\n        <category name=\"Barometer\" colour=\"120\">\n            <block type=\"bmp180_get_pressure\"></block>\n            <block type=\"bmp180_get_temperature\"></block>\n        </category>\n    </category>\n    <category name=\"Signals\" colour=\"330\">\n        <block type=\"send_signals\">\n            <value name=\"value_signal\">\n                <block type=\"text\">\n                    <field name=\"TEXT\"></field>\n                </block>\n            </value>\n            <value name=\"value_value\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">0</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"signal_receivesignal\">\n            <value name=\"signal\">\n                <block type=\"text\">\n                    <field name=\"TEXT\"></field>\n                </block>\n            </value>\n            <value name=\"signalvalue\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">signalvalue</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"sendsignals\">\n            <value name=\"value_signal\">\n                <block type=\"lists_create_with\">\n                    <mutation items=\"1\"/>\n                </block>\n            </value>\n            <value name=\"value_value\">\n                <block type=\"lists_create_with\">\n                    <mutation items=\"1\"/>\n                </block>\n            </value>\n        </block>\n        <block type=\"sendsignalsandflag\">\n            <value name=\"value_signal\">\n                <block type=\"lists_create_with\">\n                    <mutation items=\"1\"/>\n                </block>\n            </value>\n            <value name=\"value_value\">\n                <block type=\"lists_create_with\">\n                    <mutation items=\"1\"/>\n                </block>\n            </value>\n            <value name=\"debug_text\">\n                <block type=\"text\">\n                    <field name=\"TEXT\"></field>\n                </block>\n            </value>\n        </block>\n        <block type=\"signal_sendanddebug\">\n            <value name=\"signal_text\">\n                <block type=\"text\">\n                    <field name=\"TEXT\"></field>\n                </block>\n            </value>\n            <value name=\"signal_value\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">0</field>\n                </block>\n            </value>\n            <value name=\"debug_text\">\n                <block type=\"text\">\n                    <field name=\"TEXT\"></field>\n                </block>\n            </value>\n        </block>\n        <block type=\"signal_putflag\">\n            <value name=\"signal_text\">\n                <block type=\"text\">\n                    <field name=\"TEXT\"></field>\n                </block>\n            </value>\n            <value name=\"flag_text\">\n                <block type=\"text\">\n                    <field name=\"TEXT\"></field>\n                </block>\n            </value>\n        </block>\n        <block type=\"sendcoord\">\n            <value name=\"name\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">...</field>\n                </block>\n            </value>\n            <value name=\"latitudine\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">0</field>\n                </block>\n            </value>\n            <value name=\"longitudine\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">0</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"sendcoordandflag\">\n            <value name=\"name\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">...</field>\n                </block>\n            </value>\n            <value name=\"latitudine\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">0</field>\n                </block>\n            </value>\n            <value name=\"longitudine\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">0</field>\n                </block>\n            </value>\n            <value name=\"flag\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">...</field>\n                </block>\n            </value>\n        </block>\n    </category>\n    <sep />\n</toolbox>");

/***/ }),

/***/ 533:
/***/ (function(module, exports) {

// DO NOT EDIT THIS FILE, IT IS AUTMATICALLY GENERATED

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;
	// var goog = blockly.goog;

	// function pins() {
	// 	var pinslist = [];
	// 	for (var i = 0; i < 25; i++) {
	// 		pinslist.push([i + '', i + '']);
	// 	}
	// 	return pinslist;
	// }

	Blockly.Blocks['setpin'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_pin');
			this.setColour(17);
			this.appendValueInput('pin')
				.setCheck('Number')
				.appendField('Set pin');
			this.appendDummyInput()
				.appendField('To')
				.appendField(new Blockly.FieldDropdown([['HIGH', '1'], ['LOW', '0']]), 'value');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Set a pin HIGH or LOW');
		}
	};

	Blockly.Blocks['readpin'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#read_pin');
			this.setColour(17);
			this.appendValueInput('pin')
				.setCheck('Number')
				.appendField('Read pin');
			this.setInputsInline(true);
			this.setOutput(true, 'Number');
			this.setTooltip('Read the value of a pin');
		}
	};

	Blockly.Blocks['digitalwrite'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#digital_write');
			this.setColour(17);
			this.appendDummyInput()
				.appendField('digitalWrite');
			this.appendValueInput('pin')
				.setCheck('Number')
				.appendField('pin');
			this.appendValueInput('value')
				.setCheck('Number')
				.appendField('value');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Write a value on a pin. Please be careful not to use the same pin for reading and writing.');
		}
	};

	Blockly.Blocks['digitalread'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#digital_read');
			this.setColour(17);
			this.appendDummyInput()
				.appendField('digitalRead');
			this.appendValueInput('pin')
				.setCheck('Number')
				.appendField('pin');
			this.setInputsInline(true);
			this.setOutput(true, 'Number');
			this.setTooltip('Read the value from a pin. Please be careful not to use the same pin for reading and writing.');
		}
	};

	Blockly.Blocks['analogwrite'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#analog_write');
			this.setColour(17);
			this.appendDummyInput()
				.appendField('analogWrite');
			this.appendValueInput('pin')
				.setCheck('Number')
				.appendField('pin');
			this.appendValueInput('value')
				.setCheck('Number')
				.appendField('value');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Write an analog value on a pin using PWM. Please be careful not to use the same pin for reading and writing.');
		}
	};

	Blockly.Blocks['analogread'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#analog_read');
			this.setColour(17);
			this.appendDummyInput()
				.appendField('analogRead');
			this.appendValueInput('pin')
				.setCheck('Number')
				.appendField('pin');
			this.setInputsInline(true);
			this.setOutput(true, 'Number');
			this.setTooltip('Read the value from an ADC pin. Please be careful not to use the same pin for reading and writing.');
		}
	};

	Blockly.Blocks['wyliodrin_delay'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#delay');
			this.setColour(17);
			this.appendValueInput('millis')
				.setCheck('Number')
				.appendField('delay');
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([['milliseconds', '0'], ['microseconds', '1'], ['seconds', '2']]), 'type');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Wait for some specified period.');
		}
	};

	Blockly.Blocks['pinmode'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#pin_mode');
			this.setColour(17);
			this.appendDummyInput()
				.appendField('pinMode');
			this.appendValueInput('pin')
				.setCheck('Number')
				.appendField('pin');
			this.appendDummyInput()
				.appendField('mode')
				.appendField(new Blockly.FieldDropdown([['INPUT', '0'], ['OUTPUT', '1']]), 'mode');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Set the mode of a pin to INPUT or OUTPUT. Please be careful not to set the same pin for INPUT and OUTPUT.');
		}
	};

	Blockly.Blocks['delaymicroseconds'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#delay_microseconds');
			this.setColour(17);
			this.appendValueInput('micros')
				.setCheck('Number')
				.appendField('delay');
			this.appendDummyInput()
				.appendField('microseconds');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Wait for some microseconds.');
		}
	};

	Blockly.Blocks['millis'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#millis');
			this.setColour(17);
			this.appendDummyInput()
				.appendField('milliseconds since start');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('The number of milliseconds since the start of the program.');
		}
	};

	Blockly.Blocks['micros'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#micros');
			this.setColour(17);
			this.appendDummyInput()
				.appendField('microseconds since start');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('The number of microseconds since the start of the program.');
		}
	};

	Blockly.Blocks['print'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#write');
			this.setColour(250);
			this.appendDummyInput()
				.appendField('Write on screen');
			this.appendValueInput('value');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Write the value on the screen and keep the cursor on the same line.');
		}
	};

	Blockly.Blocks['read'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#read');
			this.setColour(250);
			this.appendDummyInput()
				.appendField('Read');
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([['text', '0'], ['integer number', '1'], ['real number', '2']]), 'type');
			this.appendDummyInput()
				.appendField('from keyboard');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('Read a text from the keyboard.');
		}
	};

	Blockly.Blocks['readwrite'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#write_and_read');
			this.setColour(250);
			this.appendDummyInput()
				.appendField('Write on screen');
			this.appendValueInput('value');
			this.appendDummyInput()
				.appendField('and read ');
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([['text', '0'], ['integer number', '1'], ['real number', '2']]), 'type');
			this.appendDummyInput()
				.appendField('from keyboard');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('Write the value on the screen and read a text from the keyboard.');
		}
	};

	Blockly.Blocks['println'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#print');
			this.setColour(250);
			this.appendDummyInput()
				.appendField('Print on screen');
			this.appendValueInput('value');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Print the value on the screen and set the cursor to the next line.');
		}
	};

	Blockly.Blocks['shiftout'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#shift_out');
			this.setColour(17);
			this.appendDummyInput()
				.appendField('Shift Out');
			this.appendValueInput('data_pin')
				.setCheck('Number')
				.appendField('Data Pin');
			this.appendValueInput('clock_pin')
				.setCheck('Number')
				.appendField('Clock Pin');
			this.appendValueInput('value')
				.setCheck('Number')
				.appendField('Value');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Send the value serially on data pin using a clock on clock pin in LSB_ORDER.');
		}
	};

	Blockly.Blocks['shiftin'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#shift_in');
			this.setColour(17);
			this.appendDummyInput()
				.appendField('Shift In');
			this.appendValueInput('data_pin')
				.setCheck('Number')
				.appendField('Data Pin');
			this.appendValueInput('clock_pin')
				.setCheck('Number')
				.appendField('Clock Pin');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('Read serially data pin using a clock on clock pin in LSB_ORDER.');
		}
	};

	Blockly.Blocks['say'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(250);
			this.appendValueInput('string')
				.appendField('Say');
			this.appendDummyInput()
				.appendField('in')
				.appendField(new Blockly.FieldDropdown([['English', 'en'], ['French', 'fr'], ['German', 'de'], ['Dutch', 'nl'], ['Romanian', 'ro'], ['Russian', 'ru'], ['Portuguese', 'pt'], ['Spanish', 'es'], ['Italian', 'it'], ['Hungarian', 'hu'], ['Czech', 'cs'], ['Bulgarian', 'bg'], ['Serbian', 'sr'], ['Turkish', 'tr']]), 'language');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['play'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#play');
			this.setColour(250);
			this.appendDummyInput()
				.appendField('Play');
			this.appendValueInput('url');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Play music from URL');
		}
	};

	Blockly.Blocks['pause'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#pause');
			this.setColour(250);
			this.appendDummyInput()
				.appendField('Pause');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Pause music');
		}
	};

	Blockly.Blocks['stop'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#stop');
			this.setColour(250);
			this.appendDummyInput()
				.appendField('Stop');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Stop music');
		}
	};

	Blockly.Blocks['isplaying'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#is_playing');
			this.setColour(250);
			this.appendDummyInput()
				.appendField('Is Playing');
			this.setInputsInline(true);
			this.setOutput(true, 'Boolean');
			this.setTooltip('Check if music is playing');
		}
	};

	Blockly.Blocks['setvolume'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_volume');
			this.setColour(250);
			this.appendDummyInput()
				.appendField('Set Volume');
			this.appendValueInput('volume')
				.setCheck('Number');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Set the volume');
		}
	};

	Blockly.Blocks['load_audio_stream'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#load');
			this.setColour(225);
			this.appendDummyInput()
				.appendField('Load audio')
				.appendField('stream from');
			this.appendValueInput('filename')
				.setCheck('String')
				.appendField(new Blockly.FieldDropdown([['file', '0'], ['address', '1']]), 'type');
			this.setInputsInline(true);
			this.setOutput(true, 'Audio Stream');
			this.setTooltip('Load an audio stream from a file or an address.');
		}
	};

	Blockly.Blocks['play_audio_stream'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#play');
			this.setColour(225);
			this.appendValueInput('stream')
				.setCheck('Audio Stream')
				.appendField('Play audio stream');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Play a previously loaded audio stream from a variable.');
		}
	};

	Blockly.Blocks['pause_audio_stream'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#pause');
			this.setColour(225);
			this.appendValueInput('stream')
				.setCheck('Audio Stream')
				.appendField('Pause audio stream');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Pause the audio stream from a variable.');
		}
	};

	Blockly.Blocks['stop_audio_stream'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#stop');
			this.setColour(225);
			this.appendValueInput('stream')
				.setCheck('Audio Stream')
				.appendField('Stop audio stream');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Stop the audio stream from a variable.');
		}
	};

	Blockly.Blocks['isplaying_audio_stream'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#is_playing');
			this.setColour(225);
			this.appendValueInput('stream')
				.setCheck('Audio Stream')
				.appendField('Audio stream');
			this.appendDummyInput()
				.appendField('is playing');
			this.setInputsInline(true);
			this.setOutput(true, 'Boolean');
			this.setTooltip('Check if audio stream from a variable is playing');
		}
	};

	Blockly.Blocks['level_audio_stream'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#stream_level');
			this.setColour(225);
			this.appendValueInput('stream')
				.setCheck('Audio Stream')
				.appendField('Stream level');
			this.appendValueInput('scale')
				.setCheck('Number')
				.appendField('scaled to');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('Returns the level of an audio stream from a variable.');
		}
	};

	Blockly.Blocks['level_side_audio_stream'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#stream_level');
			this.setColour(225);
			this.appendValueInput('stream')
				.setCheck('Audio Stream')
				.appendField('Stream level')
				.appendField(new Blockly.FieldDropdown([['left', '"left"'], ['right', '"right"']]), 'side');
			this.appendValueInput('scale')
				.setCheck('Number')
				.appendField('scaled to');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('Returns the level of an audio stream side from a variable.');
		}
	};

	Blockly.Blocks['position_audio_stream'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#position');
			this.setColour(225);
			this.appendValueInput('stream')
				.setCheck('Audio Stream')
				.appendField('Audio stream');
			this.appendDummyInput()
				.appendField('position in')
				.appendField(new Blockly.FieldDropdown([['seconds', '0'], ['bytes', '1']]), 'type');
			this.setInputsInline(true);
			this.setOutput(true, 'Audio Stream');
			this.setTooltip('Returns the position of the audio stream from a variable.');
		}
	};

	Blockly.Blocks['data_audio_stream'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#data');
			this.setColour(225);
			this.appendValueInput('stream')
				.setCheck('Audio Stream')
				.appendField('Audio stream');
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([['Address Title', '0'],]), 'type');
			this.setInputsInline(true);
			this.setOutput(true, 'Audio Stream');
			this.setTooltip('Returns some data of the audio stream from a variable.');
		}
	};

	Blockly.Blocks['set_position_audio_stream'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_position');
			this.setColour(225);
			this.appendValueInput('stream')
				.setCheck('Audio Stream')
				.appendField('Set audio stream');
			this.appendValueInput('pos')
				.appendField('at position');
			this.appendDummyInput()
				.appendField('in')
				.appendField(new Blockly.FieldDropdown([['seconds', '0'], ['bytes', '1']]), 'type');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Set the position of an audio stream from a variable.');
		}
	};

	Blockly.Blocks['volume_audio_stream'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#audio_stream_volume');
			this.setColour(225);
			this.appendValueInput('stream')
				.setCheck('Audio Stream')
				.appendField('Audio stream volume');
			this.setInputsInline(true);
			this.setOutput(true, 'Number');
			this.setTooltip('Returns the volume of an audio stream from a variable.');
		}
	};

	Blockly.Blocks['set_volume_audio_stream'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_audio_stream_volume');
			this.setColour(225);
			this.appendValueInput('stream')
				.setCheck('Audio Stream')
				.appendField('Set audio stream volume');
			this.appendValueInput('vol')
				.setCheck('Number')
				.appendField('at');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Set the volume of an audio stream from a variable.');
		}
	};

	Blockly.Blocks['set_volume_audio'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_volume');
			this.setColour(225);
			this.appendValueInput('vol')
				.setCheck('Number')
				.appendField('Set audio volume');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Set the boards\' audio volume.');
		}
	};

	Blockly.Blocks['get_volume_audio'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#volume');
			this.setColour(225);
			this.appendDummyInput()
				.appendField('Audio volume');
			this.setInputsInline(true);
			this.setOutput(true, 'Number');
			this.setTooltip('Returns the board\' audio volume.');
		}
	};

	Blockly.Blocks['set_led'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_led');
			this.setColour(17);
			this.appendDummyInput()
				.appendField('Set');
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([['On', '1'], ['Off', '0']]), 'value');
			this.appendValueInput('pin')
				.setCheck('Number')
				.appendField('LED on pin');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Set a LED On or Off');
		}
	};

	Blockly.Blocks['set_rgb_led'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_basic_color');
			this.setColour(17);
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

	Blockly.Blocks['set_fine_rgb_led'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_fine_color');
			this.setColour(17);
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

	Blockly.Blocks['init_lcd_i2c'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(260);
			this.appendDummyInput()
				.appendField('Init LCD Columns')
				.appendField(new Blockly.FieldDropdown([['16', '16'], ['20', '20']]), 'cols')
				.appendField('Rows')
				.appendField(new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['4', '4']]), 'rows');
			this.appendValueInput('i2caddress')
				.setCheck('Number')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('i2c Address');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['init_lcd'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(260);
			this.appendDummyInput()
				.appendField('Init LCD Columns')
				.appendField(new Blockly.FieldDropdown([['16', '16'], ['20', '20']]), 'cols')
				.appendField('Rows')
				.appendField(new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['4', '4']]), 'rows');
			this.appendValueInput('rs')
				.setCheck('Number')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('RS Pin');
			this.appendValueInput('strobe')
				.setCheck('Number')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('Enable (E) Pin');
			this.appendValueInput('d0')
				.setCheck('Number')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('DB5');
			this.appendValueInput('d1')
				.setCheck('Number')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('DB6');
			this.appendValueInput('d2')
				.setCheck('Number')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('DB7');
			this.appendValueInput('d3')
				.setCheck('Number')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('DB8');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['clear_lcd'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(260);
			this.appendDummyInput()
				.appendField('Clear LCD');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['reset_lcd'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(260);
			this.appendDummyInput()
				.appendField('Reset Position on LCD');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['set_position_lcd'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(260);
			this.appendDummyInput()
				.appendField('Set LCD Position');
			this.appendValueInput('col')
				.setCheck('Number')
				.appendField('Column');
			this.appendValueInput('row')
				.setCheck('Number')
				.appendField('Row');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['print_lcd'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(260);
			this.appendDummyInput()
				.appendField('Print on LCD');
			this.appendValueInput('text');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['button_is'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#button_is');
			this.setColour(17);
			this.appendValueInput('pin')
				.setCheck('Number')
				.appendField('Button on pin');
			this.appendDummyInput()
				.appendField('is')
				.appendField(new Blockly.FieldDropdown([['Pressed', '1'], ['Released', '0']]), 'type');
			this.setInputsInline(true);
			this.setOutput(true, 'Boolean');
			this.setTooltip('Read the value of a pin');
		}
	};

	Blockly.Blocks['button_switched'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#button_switched');
			this.setColour(17);
			this.appendValueInput('pin')
				.setCheck('Number')
				.appendField('Button on pin');
			this.appendDummyInput()
				.appendField('switched to')
				.appendField(new Blockly.FieldDropdown([['Pressed', '1'], ['Released', '0']]), 'type');
			this.setInputsInline(true);
			this.setOutput(true, 'Boolean');
			this.setTooltip('Read the value of a pin');
		}
	};

	Blockly.Blocks['send_signal'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(17);
			this.appendValueInput('value')
				.setCheck('Number')
				.appendField('Send signal')
				.appendField(new Blockly.FieldTextInput('signal'), 'name');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['rapiro_stop'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(150);
			this.appendDummyInput()
				.appendField('Rapiro Stop');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['rapiro_start_walking'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(150);
			this.appendDummyInput()
				.appendField('Rapiro Start Walking')
				.appendField(new Blockly.FieldDropdown([['forward', '0'], ['backwards', '1']]), 'direction');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['rapiro_start_turning'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(150);
			this.appendDummyInput()
				.appendField('Rapiro Start Turning')
				.appendField(new Blockly.FieldDropdown([['left', '0'], ['right', '1']]), 'direction');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['rapiro_start_waveing_hand'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(150);
			this.appendDummyInput()
				.appendField('Rapiro Start Waveing Your Hand');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['rapiro_walk'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(150);
			this.appendDummyInput()
				.appendField('Rapiro Walk')
				.appendField(new Blockly.FieldDropdown([['forward', '0'], ['backwards', '1']]), 'direction');
			this.appendValueInput('wait')
				.appendField('for');
			this.appendDummyInput()
				.appendField('seconds');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['rapiro_turn'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(150);
			this.appendDummyInput()
				.appendField('Rapiro Turn')
				.appendField(new Blockly.FieldDropdown([['left', '0'], ['right', '1']]), 'direction');
			this.appendValueInput('wait')
				.appendField('for');
			this.appendDummyInput()
				.appendField('seconds');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['rapiro_wave_hand'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(150);
			this.appendDummyInput()
				.appendField('Rapiro Wave your Hand for');
			this.appendValueInput('wait')
				.appendField('for');
			this.appendDummyInput()
				.appendField('seconds');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};
	Blockly.Blocks['rapiro_angle'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(230);
			this.appendDummyInput()
				.appendField(new Blockly.FieldAngle('90'), 'angle');
			this.setOutput(true, 'Angle');
			this.setTooltip('');
		}
	};

	Blockly.Blocks['rapiro_move'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(150);
			this.appendDummyInput()
				.appendField('Rapiro Move')
				.appendField(new Blockly.FieldDropdown([['Head', '0'], ['Waist', '1'], ['Right Shoulder', '2'], ['Right Arm', '3'], ['Right Hand', '4'], ['Left Shoulder', '5'], ['Left Arm', '6'], ['Left Hand', '7'], ['Right Foot Yaw', '8'], ['Right Foot Pitch', '9'], ['Left Foot Yaw', '10'], ['Left Foot Pitch', '11']]), 'motor');
			this.appendValueInput('degrees')
				.setCheck('Angle')
				.appendField('to');
			this.appendValueInput('time')
				.setCheck('Number')
				.appendField('in');
			this.appendDummyInput()
				.appendField('seconds');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['wiringpi_pins'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(120);
			this.appendDummyInput()
				.appendField('Set pins numbering')
				.appendField(new Blockly.FieldDropdown([['WiringPi', ''], ['GPIO', 'GPIO'], ['Physical', 'PHYSICAL']]), 'pins_numbering');
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['rapiro_set_eyes_color'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(150);
			this.appendDummyInput()
				.appendField('Rapiro Set Eyes Color');
			this.appendValueInput('color')
				.setCheck('Color');
			this.appendValueInput('time')
				.setCheck('Number')
				.appendField('in');
			this.appendDummyInput()
				.appendField('seconds');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['sevensegmdispl_setup'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(180);
			this.appendDummyInput()
				.appendField('Setup the 7 segment display');
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([['Common Cathode', '0'], ['Common Anode', '1']]), 'inverse');
			this.appendDummyInput()
				.appendField(new Blockly.FieldImage('http://upload.wikimedia.org/wikipedia/commons/2/22/7_segment_display_labeled.png', 80, 150, '*'));
			this.appendValueInput('seg_a')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('A on pin');
			this.appendValueInput('seg_b')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('B on pin');
			this.appendValueInput('seg_c')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('C on pin');
			this.appendValueInput('seg_d')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('D on pin');
			this.appendValueInput('seg_e')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('E on pin');
			this.appendValueInput('seg_f')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('F on pin');
			this.appendValueInput('seg_g')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('G on pin');
			this.appendValueInput('seg_dp')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('DP on pin');
			this.setOutput(true, 'Seven Segement');
			this.setTooltip('');
		}
	};

	Blockly.Blocks['sevensegmdispl_display'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(180);
			this.appendValueInput('ssd')
				.setCheck('Seven Segment')
				.appendField('Display on');
			this.appendValueInput('tobedispl');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['adafruit_7segment_begin'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(260);
			this.appendValueInput('bus')
				.appendField('adafruit 7 segment on bus')
				.setCheck('Number');
			this.setOutput(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['adafruit_24bar_begin'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(260);
			this.appendValueInput('bus')
				.appendField('adafruit 24 LED bar on bus')
				.setCheck('Number');
			this.setOutput(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['adafruit_24bar_color'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(260);
			this.appendValueInput('24bar')
				.appendField('On');
			this.appendValueInput('led')
				.setCheck('Number')
				.appendField('set led');
			this.appendDummyInput()
				.appendField('to')
				.appendField(new Blockly.FieldDropdown([['red', 'LED_RED'], ['yellow', 'LED_YELLOW'], ['green', 'LED_GREEN'], ['on', 'LED_ON'], ['off', 'LED_OFF']]), 'color');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['adafruit_writeDisplay'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(260);
			this.appendValueInput('adafruit')
				.appendField('Write on display');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['bmp180_get_pressure'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(120);
			this.appendDummyInput()
				.appendField('BMP180 Get Pressure');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['bmp180_get_temperature'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(120);
			this.appendDummyInput()
				.appendField('BMP180 Get Temperature');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['adafruit_7segment_print'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(260);
			this.appendValueInput('7seg')
				.appendField('On');
			this.appendValueInput('nr')
				.setCheck('Number')
				.appendField('print');
			this.appendDummyInput()
				.appendField('as')
				.appendField(new Blockly.FieldDropdown([['Decimal', 'DEC'], ['Hexa', 'HEX'], ['Octal', 'OCT'], ['Binary', 'BIN'], ['Bytes', 'BYTE']]), 'type');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};
	Blockly.Blocks['mpu6050_setup'] = {
		init: function () {
			this.appendValueInput('address')
				.appendField('Init Accelerometer');
			this.setOutput(true);
			this.setColour(225);
			this.setTooltip('');
			this.setHelpUrl('http://www.example.com/');
			this.setInputsInline(true);
		}
	};
	Blockly.Blocks['mpu6050_getAccX'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(225);
			this.appendValueInput('accelerom')
				.setCheck('')
				.appendField('Get acceleration on coord X');

			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};
	Blockly.Blocks['mpu6050_getAccY'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(225);
			this.appendValueInput('acceleromy')
				.setCheck('')
				.appendField('Get acceleration on coord Y');

			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};
	Blockly.Blocks['mpu6050_getAccZ'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(225);
			this.appendValueInput('acceleromz')
				.setCheck('')
				.appendField('Get acceleration on coord Z');

			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};
	Blockly.Blocks['mpu6050_getTemp'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(225);
			this.appendValueInput('acceleromt')
				.setCheck('')
				.appendField('Get temperature');

			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};
	Blockly.Blocks['mpu6050_getRotX'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(225);
			this.appendValueInput('acceleromm')
				.setCheck('')
				.appendField('Get rotation on coord X');

			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};
	Blockly.Blocks['mpu6050_getRotY'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(225);
			this.appendValueInput('accelerommy')
				.setCheck('')
				.appendField('Get rotation on coord Y');

			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};
	Blockly.Blocks['mpu6050_getRotZ'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(225);
			this.appendValueInput('accelerommz')
				.setCheck('')
				.appendField('Get rotation on coord Z');

			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};
	Blockly.Blocks['htu21d_setup'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(225);
			this.appendDummyInput()
				.appendField('init humidity sensor');
			this.setOutput(true);
			this.setTooltip('');
		}
	};
	Blockly.Blocks['htu21d_getHum'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(225);
			this.appendValueInput('humidity')
				.setCheck('')
				.appendField('Get humidity');

			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};
	Blockly.Blocks['htu21d_getTem'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(225);
			this.appendValueInput('hum')
				.setCheck('')
				.appendField('Get temperature');

			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};

};

/***/ }),

/***/ 534:
/***/ (function(module, exports) {

// DO NOT EDIT THIS FILE, IT IS AUTMATICALLY GENERATED

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;
	// var goog = blockly.goog;

	Blockly.Python.wiringpi = function () {
		if (!Blockly.Python.definitions_['import_wiringpi']) {
			Blockly.Python.definitions_['import_wiringpi'] = 'from wyliodrin import *\n';
		}
	};

	Blockly.Python.importtime = function () {
		if (!Blockly.Python.definitions_['import_time']) {
			Blockly.Python.definitions_['import_time'] = 'from time import *\n';
		}
	};

	Blockly.Python.rapiro = function () {
		if (!Blockly.Python.definitions_['import_serial']) {
			Blockly.Python.definitions_['import_serial'] = 'from serial import *\n';
		}
		if (!Blockly.Python.definitions_['import_time']) {
			Blockly.Python.definitions_['import_time'] = 'from time import *\n';
		}
		if (!Blockly.Python.definitions_['rapiro_setup']) {
			var rapiro = Blockly.Python.variableDB_.getDistinctName(
				'rapiro', Blockly.Generator.NAME_TYPE);
			Blockly.Python.rapiro_robot = rapiro;
			Blockly.Python.definitions_['rapiro_setup'] = rapiro + ' = Serial (port=\'/dev/ttyAMA0\', baudrate=57600)\n';//def handler(signum, frame):\n  print \'stopping rapiro\'\n  '+rapiro+'.write (\'#S\')\nsignal.signal(signal.SIGTERM, handler)';
		}
	};

	// function leadingnumbers(number, digits) {
	// 	number = '' + number;
	// 	for (var i = number.length; i < digits; i++) number = '0' + number;
	// 	return number;
	// }

	Blockly.Python.buttons_switched = function () {
		if (!Blockly.Python.definitions_['buttons_switched']) {
			var buttons = Blockly.Python.variableDB_.getDistinctName(
				'buttons', Blockly.Generator.NAME_TYPE);
			Blockly.Python.definitions_['buttons_variable'] = buttons + ' = {}\n';
			Blockly.Python.buttons = buttons;
			Blockly.Python.definitions_['buttons_switched'] = 'def buttonSwitched(button, expectedValue):\n' +
				'  value = digitalRead (button)\n' +
				'  stable = True\n' +
				'  for i in range (100):\n' +
				'    valuenext = digitalRead (button)\n' +
				'    if value != valuenext:\n' +
				'      stable = False\n' +
				'  if stable:\n' +
				'    if button in buttons and value != buttons[button]:\n' +
				'      buttons[button] = value\n' +
				'      return value == expectedValue\n' +
				'    elif not button in buttons:\n' +
				'      buttons[button] = value\n' +
				'      return False\n' +
				'    else:\n' +
				'      return False\n' +
				'  return False\n';
		}
	};

	Blockly.Python.bmp180_init = function () {
		Blockly.Python.wiringpi();
		if (!Blockly.Python.definitions_['bmp180_init']) {
			var bmp180_device = Blockly.Python.variableDB_.getDistinctName(
				'bmp180_device', Blockly.Generator.NAME_TYPE);
			Blockly.Python.bmp180_device = bmp180_device;
			Blockly.Python.definitions_['bmp180_init'] = bmp180_device + ' = Adafruit_BMP085_Unified ()\n' + bmp180_device + '.begin()\n';
		}
	};

	Blockly.Python.buttons_initial_value = function (button) {
		if (!isNaN(parseInt(button))) {
			if (!Blockly.Python.definitions_['buttons_initial_value_' + button]) {
				Blockly.Python.definitions_['buttons_initial_value_' + button] = Blockly.Python.buttons + '[' + button + '] = digitalRead (' + button + ')\n';
			}
		}
	};

	Blockly.Python.titleFromStream = function () {
		if (!Blockly.Python.definitions_['titleFromStream']) {
			Blockly.Python.definitions_['titleFromStream'] = 'def titleFromStream(data):\n  try:\n    return data[data.index("StreamTitle=\'")+13:data.index("\';")]\n  except:\n    return data\n';
		}
	};


	Blockly.Python.colors = function () {
		if (!Blockly.Python.definitions_['import_struct']) {
			Blockly.Python.definitions_['import_struct'] = 'import struct\n';
		}
		if (!Blockly.Python.definitions_['color2rgb']) {
			Blockly.Python.definitions_['color2rgb'] = 'def colorToRGB (color):\n  return struct.unpack (\'BBB\', color[1:].decode(\'hex\'))\n';
		}
		if (!Blockly.Python.definitions_['basic_color']) {
			Blockly.Python.definitions_['basic_color'] = 'def basic_color (color):\n  value = 0\n  if color>=128:\n    value = 1\n  else:\n    value = 0\n  return value\n';
		}

	};


	Blockly.Python.mplayer = function () {
		if (!Blockly.Python.definitions_['import_mplayer']) {
			Blockly.Python.definitions_['import_mplayer'] = 'from mplayer import Player\n';
			var player = Blockly.Python.variableDB_.getDistinctName(
				'player', Blockly.Generator.NAME_TYPE);
			Blockly.Python.player = player;
			Blockly.Python.definitions_['mplayer_variable'] = player + ' = Player()\n';
		}
	};

	Blockly.Python.bass_init = function () {
		if (!Blockly.Python.definitions_['import_pybass']) {
			Blockly.Python.definitions_['import_pybass'] = 'from pybass import *\n';
			Blockly.Python.definitions_['bass_init'] = 'BASS_Init (-1, 44800, 0, 0, 0);\n' +
				'BASS_PluginLoad (\'/usr/local/lib/libbassflac.so\', 0)\n' +
				'BASS_PluginLoad (\'/usr/local/lib/libbass_aac.so\', 0)\n';
		}
	};

	Blockly.Python.hi_lo_words = function () {
		if (!Blockly.Python.definitions_['hi_lo_words']) {
			Blockly.Python.definitions_['hi_lo_words'] = 'def HIWORD (words):\n  return words & 0x0000ffff\n' +
				'def LOWORD (words):\n  return words >> 16\n';
		}
	};

	Blockly.Python.stream_level = function () {
		if (!Blockly.Python.definitions_['stream_level']) {
			Blockly.Python.definitions_['stream_level'] = 'def StreamLevel (stream, scale):\n  level = BASS_ChannelGetLevel (stream)\n  return ((HIWORD(level)+LOWORD(level))/2)*scale/32768';
		}
	};

	Blockly.Python.stream_level_side = function () {
		if (!Blockly.Python.definitions_['stream_level_side']) {
			Blockly.Python.definitions_['stream_level_side'] = 'def StreamLevelSide (stream, side, scale):\n  level = BASS_ChannelGetLevel (stream)\n  return (HIWORD(level) if side == "left" else LOWORD(level))*scale/32768';
		}
	};

	Blockly.Python.setpinmode = function (pin, mode) {
		if (!isNaN(pin) && pin != '') {
			if (Blockly.Python.definitions_['pin_mode_in_' + pin]) throw 'Pin ' + pin + ' is used to input and output.';
			if (!Blockly.Python.definitions_['pin_mode_out_' + pin]) Blockly.Python.definitions_['pin_mode_out_' + pin] = 'pinMode (' + pin + ', ' + mode + ')\n';
			return true;
		}
		else {
			return false;
		}
	};

	Blockly.Python.signalName = function (name) {
		var res = name.match(/[a-zA-Z_0-9]+/);
		return res;
	};


	Blockly.Python['setpin'] = function (block) {
		Blockly.Python.wiringpi();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.setpinmode(value_pin, 1);
		var value_value = block.getFieldValue('value');
		var code = 'digitalWrite (' + value_pin + ', ' + value_value + ')\n';
		return code;
	};

	Blockly.Python['readpin'] = function (block) {
		Blockly.Python.wiringpi();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.setpinmode(value_pin, 0);
		// TODO: Assemble Python into code variable.
		var code = 'digitalRead (' + value_pin + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['digitalwrite'] = function (block) {
		Blockly.Python.wiringpi();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.setpinmode(value_pin, 1);
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'digitalWrite (' + value_pin + ', ' + value_value + ')\n';
		return code;
	};

	Blockly.Python['digitalread'] = function (block) {
		Blockly.Python.wiringpi();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.setpinmode(value_pin, 0);
		// TODO: Assemble Python into code variable.
		var code = 'digitalRead (' + value_pin + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['analogwrite'] = function (block) {
		Blockly.Python.wiringpi();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.setpinmode(value_pin, 1);
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'analogWrite (' + value_pin + ', ' + value_value + ')\n';
		return code;
	};

	Blockly.Python['analogread'] = function (block) {
		Blockly.Python.wiringpi();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.setpinmode(value_pin, 0);
		// TODO: Assemble Python into code variable.
		var code = 'analogRead (' + value_pin + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['wyliodrin_delay'] = function (block) {
		Blockly.Python.wiringpi();
		Blockly.Python.importtime();
		var value_millis = Blockly.Python.valueToCode(block, 'millis', Blockly.Python.ORDER_ATOMIC);
		var type = parseInt(block.getFieldValue('type'));
		if (isNaN(type)) type = 0;
		// TODO: Assemble Python into code variable.
		var code = '';
		if (type == 0) {
			code = 'sleep ((' + value_millis + ')/1000.0' + ')\n';
		}
		else if (type == 1) {
			code = 'delayMicroseconds (' + value_millis + ')\n';
		}
		else {
			code = 'sleep (' + value_millis + ')\n';
		}
		return code;
	};

	Blockly.Python['pinmode'] = function (block) {
		Blockly.Python.wiringpi();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var value_mode = block.getFieldValue('mode');
		if (isNaN(parseInt(value_pin))) {
			if (Blockly.Python.definitions_['pin_mode_in_' + value_pin]) delete Blockly.Python.definitions_['pin_mode_in_' + value_pin];
			if (Blockly.Python.definitions_['pin_mode_out_' + value_pin]) delete Blockly.Python.definitions_['pin_mode_out_' + value_pin];
		}
		// TODO: Assemble Python into code variable.
		var code = 'pinMode (' + value_pin + ', ' + value_mode + ')\n';
		return code;
	};

	Blockly.Python['delaymicroseconds'] = function (block) {
		Blockly.Python.wiringpi();
		var value_micros = Blockly.Python.valueToCode(block, 'micros', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'delayMicroseconds (' + value_micros + ')\n';
		return code;
	};

	Blockly.Python['millis'] = function (/* block */) {
		Blockly.Python.wiringpi();
		// TODO: Assemble Python into code variable.
		var code = 'millis()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['micros'] = function (/* block */) {
		Blockly.Python.wiringpi();
		// TODO: Assemble Python into code variable.
		var code = 'micros()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['print'] = function (block) {
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'print (' + value_value + ')\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return code;
	};

	Blockly.Python['read'] = function (block) {
		// TODO: Assemble Python into code variable.
		var type = parseInt(block.getFieldValue('type'));
		var code;
		if (type == 0) {
			code = 'raw_input ("")';
		}
		else if (type == 1) {
			code = 'int(raw_input (""))';
		}
		else if (type == 2) {
			code = 'float(raw_input (""))';
		}
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['readwrite'] = function (block) {
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var type = parseInt(block.getFieldValue('type'));
		var code;
		if (type == 0) {
			code = 'raw_input (' + value_value + ')';
		}
		else if (type == 1) {
			code = 'int(raw_input (' + value_value + '))';
		}
		else if (type == 2) {
			code = 'float(raw_input (' + value_value + '))';
		}
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['readwritenr'] = function (block) {
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'int(raw_input (' + value_value + '))';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['println'] = function (block) {
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'print(' + value_value + ')\n';
		return code;
	};

	Blockly.Python['shiftout'] = function (block) {
		Blockly.Python.wiringpi();
		var dropdown_data_pin = Blockly.Python.valueToCode(block, 'data_pin', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.setpinmode(dropdown_data_pin, 1);
		var dropdown_clock_pin = Blockly.Python.valueToCode(block, 'clock_pin', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.setpinmode(dropdown_clock_pin, 1);
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'shiftOut (' + dropdown_data_pin + ', ' + dropdown_clock_pin + ', MSBFIRST, ' + value_value + ')\n';
		return code;
	};

	Blockly.Python['shiftin'] = function (block) {
		Blockly.Python.wiringpi();
		var dropdown_data_pin = Blockly.Python.valueToCode(block, 'data_pin', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.setpinmode(dropdown_data_pin, 0);
		var dropdown_clock_pin = Blockly.Python.valueToCode(block, 'clock_pin', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.setpinmode(dropdown_clock_pin, 1);
		// TODO: Assemble Python into code variable.
		var code = 'shiftIn (' + dropdown_data_pin + ', ' + dropdown_clock_pin + ', MSBFIRST)';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['say'] = function (block) {
		var value_string = Blockly.Python.valueToCode(block, 'string', Blockly.Python.ORDER_ATOMIC);
		var dropdown_language = block.getFieldValue('language');
		if (!Blockly.Python.definitions_['import_os']) {
			Blockly.Python.definitions_['import_os'] = 'import os';
		}
		// TODO: Assemble Python into code variable.
		var code = 'os.system (\'say ' + dropdown_language + ' "\'+str(' + value_string + ')+\'"\')\n';
		return code;
	};

	Blockly.Python['play'] = function (block) {
		Blockly.Python.mplayer();
		var value_url = Blockly.Python.valueToCode(block, 'url', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = Blockly.Python.player + '.loadfile(' + value_url + ')\n';
		return code;
	};

	Blockly.Python['pause'] = function (/* block */) {
		Blockly.Python.mplayer();
		// TODO: Assemble Python into code variable.
		var code = Blockly.Python.player + '.pause()\n';
		return code;
	};

	Blockly.Python['stop'] = function (/* block */) {
		Blockly.Python.mplayer();
		// TODO: Assemble Python into code variable.
		var code = Blockly.Python.player + '.stop()\n';
		return code;
	};

	Blockly.Python['isplaying'] = function (/* block */) {
		// var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		// var type = parseInt(block.getFieldValue('type'));
		var code = Blockly.Python.player + '.filename!=None';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['setvolume'] = function (block) {
		Blockly.Python.mplayer();
		var value_volume = Blockly.Python.valueToCode(block, 'volume', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = Blockly.Python.player + '.volume = ' + value_volume + '\n';
		return code;
	};

	Blockly.Python['load_audio_stream'] = function (block) {
		Blockly.Python.bass_init();
		var value_filename = Blockly.Python.valueToCode(block, 'filename', Blockly.Python.ORDER_ATOMIC);
		var dropdown_type = block.getFieldValue('type');
		// TODO: Assemble Python into code variable.
		var code = '';
		if (dropdown_type == 0) {
			code = 'BASS_StreamCreateFile (False, ' + value_filename + ', 0, 0, 0)';
		}
		else if (dropdown_type == 1) {
			code = 'BASS_StreamCreateURL (' + value_filename + ', 0, 0, DOWNLOADPROC(0), 0)';
		}
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['play_audio_stream'] = function (block) {
		Blockly.Python.bass_init();
		var value_stream = Blockly.Python.valueToCode(block, 'stream', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'BASS_ChannelPlay (' + value_stream + ', False)\n';
		return code;
	};

	Blockly.Python['pause_audio_stream'] = function (block) {
		Blockly.Python.bass_init();
		var value_stream = Blockly.Python.valueToCode(block, 'stream', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'BASS_ChannelPause (' + value_stream + ', False)\n';
		return code;
	};

	Blockly.Python['stop_audio_stream'] = function (block) {
		Blockly.Python.bass_init();
		var value_stream = Blockly.Python.valueToCode(block, 'stream', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'BASS_ChannelStop (' + value_stream + ')\n';
		return code;
	};

	Blockly.Python['isplaying_audio_stream'] = function (block) {
		Blockly.Python.bass_init();
		var value_stream = Blockly.Python.valueToCode(block, 'stream', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		let code = 'BASS_ChannelIsActive (' + value_stream + ') == BASS_ACTIVE_PLAYING';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['level_audio_stream'] = function (block) {
		Blockly.Python.bass_init();
		Blockly.Python.hi_lo_words();
		Blockly.Python.stream_level();
		var value_stream = Blockly.Python.valueToCode(block, 'stream', Blockly.Python.ORDER_ATOMIC);
		var value_scale = Blockly.Python.valueToCode(block, 'scale', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'StreamLevel (' + value_stream + ', ' + value_scale + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['level_side_audio_stream'] = function (block) {
		Blockly.Python.bass_init();
		Blockly.Python.hi_lo_words();
		Blockly.Python.stream_level_side();
		var value_stream = Blockly.Python.valueToCode(block, 'stream', Blockly.Python.ORDER_ATOMIC);
		var value_side = block.getFieldValue('side');
		var value_scale = Blockly.Python.valueToCode(block, 'scale', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'StreamLevelSide (' + value_stream + ', ' + value_side + ', ' + value_scale + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['position_audio_stream'] = function (block) {
		Blockly.Python.bass_init();
		var value_stream = Blockly.Python.valueToCode(block, 'stream', Blockly.Python.ORDER_ATOMIC);
		var dropdown_type = block.getFieldValue('type');
		// TODO: Assemble Python into code variable.
		var code = '';
		if (dropdown_type == 0) {
			code = 'BASS_ChannelBytes2Seconds (' + value_stream + ', BASS_ChannelGetPosition (' + value_stream + ', BASS_POS_BYTE))';
		}
		else if (dropdown_type == 1) {
			code = 'BASS_ChannelGetPosition (' + value_stream + ', BASS_POS_BYTE)';
		}
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['data_audio_stream'] = function (block) {
		Blockly.Python.bass_init();
		Blockly.Python.titleFromStream();
		var value_stream = Blockly.Python.valueToCode(block, 'stream', Blockly.Python.ORDER_ATOMIC);
		var dropdown_type = block.getFieldValue('type');
		// TODO: Assemble Python into code variable.
		var code = '';
		if (dropdown_type == 0) {
			code = 'titleFromStream(str(c_char_p (BASS_ChannelGetTags (' + value_stream + ', BASS_TAG_META)).value))';
		}
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['set_position_audio_stream'] = function (block) {
		Blockly.Python.bass_init();
		var value_stream = Blockly.Python.valueToCode(block, 'stream', Blockly.Python.ORDER_ATOMIC);
		var value_pos = Blockly.Python.valueToCode(block, 'pos', Blockly.Python.ORDER_ATOMIC);
		var dropdown_type = block.getFieldValue('type');
		// TODO: Assemble Python into code variable.
		var code = '';
		if (dropdown_type == 0) {
			code = 'BASS_ChannelSetPosition (' + value_stream + ', BASS_ChannelSeconds2Bytes(' + value_stream + ', ' + value_pos + '), BASS_POS_BYTE)\n';
		}
		else if (dropdown_type == 1) {
			code = 'BASS_ChannelSetPosition (' + value_stream + ', ' + value_pos + ', BASS_POS_BYTE)\n';
		}
		return code;
	};

	Blockly.Python['volume_audio_stream'] = function (block) {
		Blockly.Python.bass_init();
		var value_stream = Blockly.Python.valueToCode(block, 'stream', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'int (BASS_ChannelGetAttribute (' + value_stream + ', BASS_ATTRIB_VOL))*100';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['set_volume_audio_stream'] = function (block) {
		Blockly.Python.bass_init();
		var value_stream = Blockly.Python.valueToCode(block, 'stream', Blockly.Python.ORDER_ATOMIC);
		var value_vol = Blockly.Python.valueToCode(block, 'vol', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'BASS_ChannelSetAttribute (' + value_stream + ', BASS_ATTRIB_VOL, ' + value_vol + '/100.0)\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return code;
	};

	Blockly.Python['set_volume_audio'] = function (block) {
		Blockly.Python.bass_init();
		var value_vol = Blockly.Python.valueToCode(block, 'vol', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'BASS_SetVolume (' + value_vol + '/100.0)\n';
		return code;
	};

	Blockly.Python['get_volume_audio'] = function (/* block */) {
		Blockly.Python.bass_init();
		// TODO: Assemble Python into code variable.
		var code = 'int (BASS_GetVolume ())*100';
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['set_led'] = function (block) {
		Blockly.Python.wiringpi();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var value_value = block.getFieldValue('value');
		var code = '';
		if (!Blockly.Python.setpinmode(value_pin, 1)) {
			code = 'pinMode (' + value_pin + ', 1)\n';
		}
		// TODO: Assemble Python into code variable.
		code = code + 'digitalWrite (' + value_pin + ', ' + value_value + ')\n';
		return code;
	};

	Blockly.Python['set_rgb_led'] = function (block) {
		Blockly.Python.wiringpi();
		Blockly.Python.colors();
		var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
		var value_red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.setpinmode(value_red, 1);
		var value_green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.setpinmode(value_green, 1);
		var value_blue = Blockly.Python.valueToCode(block, 'blue', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.setpinmode(value_blue, 1);
		// TODO: Assemble Python into code variable.
		var colorVar = Blockly.Python.variableDB_.getDistinctName(
			'color', Blockly.Variables.NAME_TYPE);
		var code = colorVar + ' = colorToRGB (' + value_color + ')\n' +
			'digitalWrite (' + value_red + ', basic_color(' + colorVar + '[0]))\n' +
			'digitalWrite (' + value_green + ', basic_color(' + colorVar + '[1]))\n' +
			'digitalWrite (' + value_blue + ', basic_color(' + colorVar + '[2]))\n'
			;
		return code;
	};

	Blockly.Python['set_fine_rgb_led'] = function (block) {
		Blockly.Python.wiringpi();
		Blockly.Python.colors();
		var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
		var value_red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.setpinmode(value_red, 1);
		var value_green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.setpinmode(value_green, 1);
		var value_blue = Blockly.Python.valueToCode(block, 'blue', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.setpinmode(value_blue, 1);
		// TODO: Assemble Python into code variable.
		var colorVar = Blockly.Python.variableDB_.getDistinctName(
			'color', Blockly.Variables.NAME_TYPE);
		var code = colorVar + ' = colorToRGB (' + value_color + ')\n' +
			'analogWrite (' + value_red + ', ' + colorVar + '[0])\n' +
			'analogWrite (' + value_green + ', ' + colorVar + '[1])\n' +
			'analogWrite (' + value_blue + ', ' + colorVar + '[2])\n'
			;
		return code;
	};

	Blockly.Python['init_lcd_i2c'] = function (block) {
		Blockly.Python.wiringpi();
		var lcd = Blockly.Python.variableDB_.getDistinctName(
			'lcd', Blockly.Generator.NAME_TYPE);
		var dropdown_rows = block.getFieldValue('rows');
		var dropdown_cols = block.getFieldValue('cols');
		var value_i2caddress = Blockly.Python.valueToCode(block, 'i2caddress', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.lcd = lcd;
		Blockly.Python.definitions_['lcd_variable'] = lcd + ' = LiquidCrystal (' + value_i2caddress + '-32)\n' + lcd + '.begin(' + dropdown_cols + ', ' + dropdown_rows + ')\n';
		// TODO: Assemble Python into code variable.
		var code = '';
		return code;
	};

	Blockly.Python['init_lcd'] = function (block) {
		Blockly.Python.wiringpi();
		var lcd = Blockly.Python.variableDB_.getDistinctName(
			'lcd', Blockly.Generator.NAME_TYPE);
		var dropdown_rows = block.getFieldValue('rows');
		var dropdown_cols = block.getFieldValue('cols');
		var value_rs = Blockly.Python.valueToCode(block, 'rs', Blockly.Python.ORDER_ATOMIC);
		var value_strobe = Blockly.Python.valueToCode(block, 'strobe', Blockly.Python.ORDER_ATOMIC);
		var value_d0 = Blockly.Python.valueToCode(block, 'd0', Blockly.Python.ORDER_ATOMIC);
		var value_d1 = Blockly.Python.valueToCode(block, 'd1', Blockly.Python.ORDER_ATOMIC);
		var value_d2 = Blockly.Python.valueToCode(block, 'd2', Blockly.Python.ORDER_ATOMIC);
		var value_d3 = Blockly.Python.valueToCode(block, 'd3', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.lcd = lcd;
		Blockly.Python.definitions_['lcd_variable'] = lcd + ' = LiquidCrystal (' + value_rs + ', ' + value_strobe + ', ' + value_d0 + ', ' + value_d1 + ', ' + value_d2 + ', ' + value_d3 + ')\n' + lcd + '.begin(' + dropdown_rows + ', ' + dropdown_cols + ')\n';
		// TODO: Assemble Python into code variable.
		var code = '';
		return code;
	};

	Blockly.Python['clear_lcd'] = function (/* block */) {
		if (Blockly.Python.definitions_['lcd_variable']) {
			Blockly.Python.wiringpi();
			// TODO: Assemble Python into code variable.
			var code = Blockly.Python.lcd + '.clear()\n';
			return code;
		}
		else throw 'You must init the LCD before using clear lcd';
	};

	Blockly.Python['reset_lcd'] = function (/* block */) {
		if (Blockly.Python.definitions_['lcd_variable']) {
			Blockly.Python.wiringpi();
			// TODO: Assemble Python into code variable.
			var code = Blockly.Python.lcd + '.home()\n';
			return code;
		}
		else throw 'You must init the LCD before using reset lcd';
	};

	Blockly.Python['set_position_lcd'] = function (block) {
		Blockly.Python.wiringpi();
		if (Blockly.Python.definitions_['lcd_variable']) {
			var value_col = Blockly.Python.valueToCode(block, 'col', Blockly.Python.ORDER_ATOMIC);
			var value_row = Blockly.Python.valueToCode(block, 'row', Blockly.Python.ORDER_ATOMIC);
			// TODO: Assemble Python into code variable.
			var code = Blockly.Python.lcd + '.setCursor(' + value_col + '-1, ' + value_row + '-1)\n';
			return code;
		}
		else throw 'You must init the LCD before using set position lcd';
	};

	Blockly.Python['print_lcd'] = function (block) {
		Blockly.Python.wiringpi();
		if (Blockly.Python.definitions_['lcd_variable']) {
			var value_text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
			// TODO: Assemble Python into code variable.
			var code = Blockly.Python.lcd + '._print (str(' + value_text + '))\n';
			return code;
		}
		else throw 'You must init the LCD before using print lcd';
	};

	Blockly.Python['button_is'] = function (block) {
		Blockly.Python.wiringpi();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var value_type = block.getFieldValue('type');
		Blockly.Python.setpinmode(value_pin, 0);
		// TODO: Assemble Python into code variable.
		var code = 'digitalRead (' + value_pin + ') == ' + value_type;
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['button_event'] = function (block) {
		Blockly.Python.wiringpi();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var value_type = block.getFieldValue('type');
		Blockly.Python.setpinmode(value_pin, 0);
		// TODO: Assemble Python into code variable.
		var code = 'digitalRead (' + value_pin + ') == ' + value_type;
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['button_switched'] = function (block) {
		Blockly.Python.wiringpi();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var value_type = block.getFieldValue('type');
		Blockly.Python.setpinmode(value_pin, 0);
		Blockly.Python.buttons_switched();
		Blockly.Python.buttons_initial_value(value_pin);
		// TODO: Assemble Python into code variable.
		var code = 'buttonSwitched (' + value_pin + ', ' + value_type + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['send_signal'] = function (block) {
		Blockly.Python.wiringpi();
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		var text_name = block.getFieldValue('name');
		// TODO: Assemble Python into code variable.
		var code = 'sendSignal (\'' + Blockly.Python.signalName(text_name) + '\', ' + value_value + ')\n';
		return code;
	};

	Blockly.Python['rapiro_stop'] = function (/* block */) {
		Blockly.Python.rapiro();
		// TODO: Assemble Python into code variable.
		var code = Blockly.Python.rapiro_robot + '.write (\'#M0\')\nsleep(2)\n' + Blockly.Python.rapiro_robot + '.write(\'#S\')\n';
		return code;
	};

	Blockly.Python['wiringpi_pins'] = function (block) {
		var dropdown_pins_numbering = block.getFieldValue('pins_numbering');
		if (!Blockly.Python.definitions_['import_os']) {
			Blockly.Python.definitions_['import_os'] = 'import os';
		}
		Blockly.Python.definitions_['import_os_pins'] = 'os.environ["PINS_NUMBERING"] = "' + dropdown_pins_numbering + '"';
		// TODO: Assemble Python into code variable.
		var code = '';
		return code;
	};

	Blockly.Python['rapiro_walk'] = function (block) {
		Blockly.Python.rapiro();
		var directon = block.getFieldValue('direction');
		var cmd = '';
		if (directon == 0) cmd = '#M1';
		else
		if (directon == 1) cmd = '#M2';
		var wait = Blockly.Python.valueToCode(block, 'wait', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = Blockly.Python.rapiro_robot + '.write (\'' + cmd + '\')\nsleep(' + wait + ')\n';
		return code;
	};

	Blockly.Python['rapiro_turn'] = function (block) {
		Blockly.Python.rapiro();
		var directon = block.getFieldValue('direction');
		var cmd = '';
		if (directon == 0) cmd = '#M3';
		else
		if (directon == 1) cmd = '#M4';
		var wait = Blockly.Python.valueToCode(block, 'wait', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = Blockly.Python.rapiro_robot + '.write (\'' + cmd + '\')\nsleep(' + wait + ')\n';
		return code;
	};

	Blockly.Python['rapiro_wave_hand'] = function (block) {
		Blockly.Python.rapiro();
		// TODO: Assemble Python into code variable.
		var wait = Blockly.Python.valueToCode(block, 'wait', Blockly.Python.ORDER_ATOMIC);
		var code = Blockly.Python.rapiro_robot + '.write (\'#M5\')\nsleep(' + wait + ')\n';
		return code;
	};

	Blockly.Python['rapiro_angle'] = function (block) {
		var angle = block.getFieldValue('angle');
		// TODO: Assemble JavaScript into code variable.
		var code = angle;
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['rapiro_move'] = function (block) {
		Blockly.Python.rapiro();
		var motor = block.getFieldValue('motor');
		var angle = Blockly.Python.valueToCode(block, 'degrees', Blockly.Python.ORDER_ATOMIC);
		var time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC) * 10;
		if (time < 0) time = 0;
		if (time > 255) time = 255;
		// TODO: Assemble Python into code variable.
		var code = Blockly.Python.rapiro_robot + '.write (\'#PS\'+str(' + motor + ').zfill(2)+\'A\'+str(' + angle + ').zfill(3)+\'T\'+str(' + time + ').zfill(3))\nsleep(' + time / 10 + ')\n';
		return code;
	};

	Blockly.Python['rapiro_set_eyes_color'] = function (block) {
		Blockly.Python.colors();
		Blockly.Python.rapiro();
		var color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
		var time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC) * 10;
		var colorVar = Blockly.Python.variableDB_.getDistinctName(
			'color', Blockly.Variables.NAME_TYPE);
		var code = colorVar + ' = colorToRGB (' + color + ')\n' +
			Blockly.Python.rapiro_robot + '.write (\'#PR\'+str(' + colorVar + '[0]).zfill(3)+\'G\'+str(' + colorVar + '[1]).zfill(3)+\'B\'+str(' + colorVar + '[2]).zfill(3)+\'T\'+str(' + time + ').zfill(3))\nsleep(' + time / 10 + ')\n';
		return code;
	};

	Blockly.Python.sevenSegment = function () {
		if (!Blockly.Python.definitions_['sevenSegment']) {
			Blockly.Python.sevenSegmentFunction();
			var valueToBeDispl = Blockly.Python.variableDB_.getDistinctName(
				'valueToDisplay', Blockly.Generator.NAME_TYPE);
			Blockly.Python.valueToDiplay = valueToBeDispl;
			if (!Blockly.Python.definitions_['sevenSegment']) {
				Blockly.Python.definitions_['sevenSegment'] = 'def display(sevenSegment, value):\n' +
					'  if value == "0":\n' +
					'    displaySegment(sevenSegment, 1, 1, 1, 1, 1, 1, 0, 1)\n' +
					'  if value == "1":\n' +
					'    displaySegment(sevenSegment, 0, 1, 1, 0, 0, 0, 0, 1)\n' +
					'  if value == "2":\n' +
					'    displaySegment(sevenSegment, 1, 1, 0, 1, 1, 0, 1, 1)\n' +
					'  if value == "3":\n' +
					'    displaySegment(sevenSegment, 1, 1, 1, 1, 0, 0, 1, 1)\n' +
					'  if value == "4":\n' +
					'    displaySegment(sevenSegment, 0, 1, 1, 0, 0, 1, 1, 1)\n' +
					'  if value == "5":\n' +
					'    displaySegment(sevenSegment, 1, 0, 1, 1, 0, 1, 1, 1)\n' +
					'  if value == "6":\n' +
					'    displaySegment(sevenSegment, 1, 0, 1, 1, 1, 1, 1, 1)\n' +
					'  if value == "7":\n' +
					'    displaySegment(sevenSegment, 1, 1, 1, 0, 0, 0, 0, 1)\n' +
					'  if value == "8":\n' +
					'    displaySegment(sevenSegment, 1, 1, 1, 1, 1, 1, 1, 1)\n' +
					'  if value == "9":\n' +
					'    displaySegment(sevenSegment, 1, 1, 1, 1, 0, 1, 1, 1)\n' +
					'  if value == \'A\':\n' +
					'    displaySegment(sevenSegment, 1, 1, 1, 0, 1, 1, 1, 1)\n' +
					'  if value == "B":\n' +
					'    displaySegment(sevenSegment, 1, 1, 1, 1, 1, 1, 1, 1)\n' +
					'  if value == "C":\n' +
					'    displaySegment(sevenSegment, 1, 0, 0, 1, 1, 1, 0, 1)\n' +
					'  if value == "D":\n' +
					'    displaySegment(sevenSegment, 1, 1, 1, 1, 1, 1, 0, 1)\n' +
					'  if value == "E":\n' +
					'    displaySegment(sevenSegment, 1, 0, 0, 1, 1, 1, 1, 1)\n' +
					'  if value == "F":\n' +
					'    displaySegment(sevenSegment, 1, 0, 0, 0, 1, 1, 1, 1)\n' +
					'  if value == ".":\n' +
					'    displaySegment(sevenSegment, 0, 0, 0, 0, 0, 0, 0, 1)\n'
				;
			}
		}
	};

	Blockly.Python.sevenSegmentFunction = function () {
		if (!Blockly.Python.definitions_['sevenSegmentFunction']) {
			Blockly.Python.definitions_['sevenSegmentFunction'] = 'def displaySegment(sevenSegment, a, b, c, d, e, f, g, dp):\n' +
				'  digitalWrite(sevenSegment[1], abs(sevenSegment[0]-a))\n' +
				'  digitalWrite(sevenSegment[2], abs(sevenSegment[0]-b))\n' +
				'  digitalWrite(sevenSegment[3], abs(sevenSegment[0]-c))\n' +
				'  digitalWrite(sevenSegment[4], abs(sevenSegment[0]-d))\n' +
				'  digitalWrite(sevenSegment[5], abs(sevenSegment[0]-e))\n' +
				'  digitalWrite(sevenSegment[6], abs(sevenSegment[0]-f))\n' +
				'  digitalWrite(sevenSegment[7], abs(sevenSegment[0]-g))\n' +
				'  if len(sevenSegment)>=9: digitalWrite(sevenSegment[8], abs(sevenSegment[0]-dp))\n'
			;
		}
	};

	Blockly.Python.Adafruit_7segment_init = function () {
		if (!Blockly.Python.definitions_['Adafruit_7segment_init']) {
			Blockly.Python.definitions_['Adafruit_7segment_init'] = 'def Adafruit_7segment_init(bus):\n' +
				'  ada_7segm=Adafruit_7segment()\n' +
				'  ada_7segm.begin(bus)\n' +
				'  return ada_7segm';
		}
	};

	Blockly.Python.mpu6050_init = function () {
		if (!Blockly.Python.definitions_['mpu6050_init']) {
			Blockly.Python.definitions_['mpu6050_init'] = 'def mpu6050_init(bus):\n' +
				'  mpu6050=MPU6050(bus)\n' +
				'  mpu6050.initialize()\n' +
				'  return mpu6050';
		}
	};

	Blockly.Python.htu21d_init = function () {
		if (!Blockly.Python.definitions_['htu21d_init']) {
			Blockly.Python.definitions_['htu21d_init'] = 'def htu21d_init():\n' +
				'  htu21d=HTU21D(bus)\n' +
				'  htu21d.initialize()\n' +
				'  return htu21d';
		}
	};

	Blockly.Python.Adafruit_24bar_init = function () {
		if (!Blockly.Python.definitions_['Adafruit_24bar_init']) {
			Blockly.Python.definitions_['Adafruit_24bar_init'] = 'def Adafruit_24bar_init(bus):\n' +
				' ada_24bar=Adafruit_24bargraph()\n' +
				' ada_24bar.begin(bus)\n' +
				' for i in range (0 ,24):\n' +
				'   ada_24bar.setBar(i, LED_OFF)\n' +
				'   ada_24bar.writeDisplay()\n' +
				' return ada_24bar';
		}
	};



	Blockly.Python['sevensegmdispl_setup'] = function (block) {
		Blockly.Python.wiringpi();
		var value_inverse = block.getFieldValue('inverse');
		var value_seg_a = Blockly.Python.valueToCode(block, 'seg_a', Blockly.Python.ORDER_ATOMIC);
		var value_seg_b = Blockly.Python.valueToCode(block, 'seg_b', Blockly.Python.ORDER_ATOMIC);
		var value_seg_c = Blockly.Python.valueToCode(block, 'seg_c', Blockly.Python.ORDER_ATOMIC);
		var value_seg_d = Blockly.Python.valueToCode(block, 'seg_d', Blockly.Python.ORDER_ATOMIC);
		var value_seg_e = Blockly.Python.valueToCode(block, 'seg_e', Blockly.Python.ORDER_ATOMIC);
		var value_seg_f = Blockly.Python.valueToCode(block, 'seg_f', Blockly.Python.ORDER_ATOMIC);
		var value_seg_g = Blockly.Python.valueToCode(block, 'seg_g', Blockly.Python.ORDER_ATOMIC);
		var value_seg_dp = Blockly.Python.valueToCode(block, 'seg_dp', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		Blockly.Python.setpinmode(value_seg_a, 1);
		Blockly.Python.setpinmode(value_seg_b, 1);
		Blockly.Python.setpinmode(value_seg_c, 1);
		Blockly.Python.setpinmode(value_seg_d, 1);
		Blockly.Python.setpinmode(value_seg_e, 1);
		Blockly.Python.setpinmode(value_seg_f, 1);
		Blockly.Python.setpinmode(value_seg_g, 1);
		Blockly.Python.setpinmode(value_seg_dp, 1);
		var code = '[' + value_inverse + ', ' + value_seg_a + ', ' + value_seg_b + ', ' + value_seg_c + ', ' + value_seg_d + ', ' + value_seg_e + ', ' + value_seg_f + ', ' + value_seg_g + ', ' + value_seg_dp + ']';
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['sevensegmdispl_display'] = function (block) {
		Blockly.Python.sevenSegment();
		var value_tobedispl = Blockly.Python.valueToCode(block, 'tobedispl', Blockly.Python.ORDER_ATOMIC);
		var value_ssd = Blockly.Python.valueToCode(block, 'ssd', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'display(' + value_ssd + ', str(' + value_tobedispl + '))' + '\n';
		return code;
	};






	Blockly.Python['adafruit_7segment_begin'] = function (/* block */) {
		Blockly.Python.wiringpi();
		Blockly.Python.Adafruit_7segment_init();
		// TODO: Assemble Python into code variable.
		var code = 'Adafruit_7segment_init(112)';
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['adafruit_24bar_begin'] = function (block) {
		Blockly.Python.wiringpi();
		Blockly.Python.Adafruit_24bar_init();
		var value_bus = Blockly.Python.valueToCode(block, 'bus', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'Adafruit_24bar_init(' + value_bus + ')';
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['adafruit_24bar_color'] = function (block) {
		Blockly.Python.wiringpi();

		var value_24bar = Blockly.Python.valueToCode(block, '24bar', Blockly.Python.ORDER_ATOMIC);
		var value_led = Blockly.Python.valueToCode(block, 'led', Blockly.Python.ORDER_ATOMIC);
		var dropdown_color = block.getFieldValue('color');
		// TODO: Assemble Python into code variable.
		var code = value_24bar + '.setBar(' + value_led + ',' + dropdown_color + ')\n';
		return code;
	};

	Blockly.Python['bmp180_get_pressure'] = function (/* block */) {
		Blockly.Python.bmp180_init();
		// TODO: Assemble Python into code variable.
		var code = Blockly.Python.bmp180_device + '.getPressure()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['bmp180_get_temperature'] = function (/* block */) {
		Blockly.Python.bmp180_init();
		// TODO: Assemble Python into code variable.
		var code = Blockly.Python.bmp180_device + '.getTemperature()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};



	Blockly.Python['adafruit_writeDisplay'] = function (block) {
		var value_adafruit = Blockly.Python.valueToCode(block, 'adafruit', Blockly.Python.ORDER_ATOMIC);

		// TODO: Assemble Python into code variable.
		var code = value_adafruit + '.writeDisplay()\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return code;
	};


	Blockly.Python['adafruit_7segment_print'] = function (block) {
		Blockly.Python.wiringpi();

		var value_7seg = Blockly.Python.valueToCode(block, '7seg', Blockly.Python.ORDER_ATOMIC);
		var value_nr = Blockly.Python.valueToCode(block, 'nr', Blockly.Python.ORDER_ATOMIC);
		var dropdown_type = block.getFieldValue('type');
		// TODO: Assemble Python into code variable.
		var code = value_7seg + '._print(' + value_nr + ',' + dropdown_type + ')\n';
		return code;
	};


	Blockly.Python['mpu6050_setup'] = function (block) {
		Blockly.Python.wiringpi();
		Blockly.Python.mpu6050_init();
		var value_address = Blockly.Python.valueToCode(block, 'address', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'mpu6050_init(' + value_address + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};
	Blockly.Python['mpu6050_getAccX'] = function (block) {
		var value_accelerom = Blockly.Python.valueToCode(block, 'accelerom', Blockly.Python.ORDER_ATOMIC);

		// TODO: Assemble Python into code variable.
		var code = value_accelerom + '.getAccelerationX()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};
	Blockly.Python['mpu6050_getAccY'] = function (block) {
		var value_acceleromy = Blockly.Python.valueToCode(block, 'acceleromy', Blockly.Python.ORDER_ATOMIC);

		// TODO: Assemble Python into code variable.
		var code = value_acceleromy + '.getAccelerationY()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};
	Blockly.Python['mpu6050_getAccZ'] = function (block) {
		var value_acceleromz = Blockly.Python.valueToCode(block, 'acceleromz', Blockly.Python.ORDER_ATOMIC);

		// TODO: Assemble Python into code variable.
		var code = value_acceleromz + '.getAccelerationZ()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};
	Blockly.Python['mpu6050_getTemp'] = function (block) {
		var value_acceleromt = Blockly.Python.valueToCode(block, 'acceleromt', Blockly.Python.ORDER_ATOMIC);

		// TODO: Assemble Python into code variable.
		var code = value_acceleromt + '.getTemperature()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};
	Blockly.Python['mpu6050_getRotX'] = function (block) {
		var value_acceleromm = Blockly.Python.valueToCode(block, 'acceleromm', Blockly.Python.ORDER_ATOMIC);

		// TODO: Assemble Python into code variable.
		var code = value_acceleromm + '.getRotationX()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};
	Blockly.Python['mpu6050_getRotY'] = function (block) {
		var value_accelerommy = Blockly.Python.valueToCode(block, 'accelerommy', Blockly.Python.ORDER_ATOMIC);

		// TODO: Assemble Python into code variable.
		var code = value_accelerommy + '.getRotationY()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};
	Blockly.Python['mpu6050_getRotZ'] = function (block) {
		var value_accelerommz = Blockly.Python.valueToCode(block, 'accelerommz', Blockly.Python.ORDER_ATOMIC);

		// TODO: Assemble Python into code variable.
		var code = value_accelerommz + '.getRotationZ()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};
	Blockly.Python['htu21d_setup'] = function (/* block */) {
		Blockly.Python.wiringpi();
		// TODO: Assemble Python into code variable.
		var code = 'HTU21D()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};
	Blockly.Python['htu21d_getHum'] = function (block) {
		var value_humidity = Blockly.Python.valueToCode(block, 'humidity', Blockly.Python.ORDER_ATOMIC);

		// TODO: Assemble Python into code variable.
		var code = value_humidity + '.readHumidity()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};
	Blockly.Python['htu21d_getTem'] = function (block) {
		var value_hum = Blockly.Python.valueToCode(block, 'hum', Blockly.Python.ORDER_ATOMIC);

		// TODO: Assemble Python into code variable.
		var code = value_hum + '.readTemperature()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};
};

/***/ }),

/***/ 535:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (blockly) {
	var Blockly = blockly.Blockly;

	Blockly.Blocks['send_signals'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(330);
			this.appendValueInput('value_signal')
				.setCheck('String')
				.appendField('Send signal');
			this.appendValueInput('value_value')
				.setCheck('Number')
				.appendField('with value');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};


	Blockly.Blocks['sendsignalsandflag'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(330);
			this.appendValueInput('value_signal')
				.setCheck('Array')
				.appendField('Send signals');
			this.appendValueInput('value_value')
				.setCheck('Array')
				.appendField('with values');
			this.appendValueInput('debug_text')
				.setCheck('String')
				.appendField('and flag');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['sendsignals'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(330);
			this.appendValueInput('value_signal')
				.setCheck('Array')
				.appendField('Send signals');
			this.appendValueInput('value_value')
				.setCheck('Array')
				.appendField('with values');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['signal_sendanddebug'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(330);
			this.appendValueInput('signal_text')
				.setCheck('String')
				.appendField('Send signal');
			this.appendValueInput('signal_value')
				.setCheck('Number')
				.appendField('value');
			this.appendValueInput('debug_text')
				.setCheck('String')
				.appendField('debug message');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['signal_putflag'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(330);
			this.appendValueInput('flag_text')
				.setCheck('String')
				.appendField('Put flag');
			this.appendValueInput('signal_text')
				.setCheck('String')
				.appendField('at signal');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['signal_receivesignal'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(330);
			this.appendValueInput('signal')
				.setCheck('String')
				.appendField('On receive signal');
			this.appendValueInput('signalvalue')
				.setCheck('null')
				.appendField('with signal value');
			this.appendStatementInput('commands')
				.setCheck('null')
				.appendField('Do');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['sendcoord'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(330);
			this.appendValueInput('name')
				.appendField('Send coordinates');
			this.appendValueInput('latitudine')
				.appendField('at latitude');
			this.appendValueInput('longitudine')
				.appendField('and longitude');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['sendcoordandflag'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(330);
			this.appendValueInput('name')
				.appendField('Send coordinates');
			this.appendValueInput('latitudine')
				.appendField('at latitude');
			this.appendValueInput('longitudine')
				.appendField('longitude');
			this.appendValueInput('flag')
				.appendField('and flag');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};
};

/***/ }),

/***/ 536:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (blockly) {
	var Blockly = blockly.Blockly;

	Blockly.Python['send_signals'] = function (block) {
		Blockly.Python.wiringpi();
		var value_value_signal = Blockly.Python.valueToCode(block, 'value_signal', Blockly.Python.ORDER_ATOMIC);
		var value_value_value = Blockly.Python.valueToCode(block, 'value_value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'sendSignal(' + value_value_signal + ', ' + value_value_value + ')\n';
		return code;
	};

	Blockly.Python['signal_sendanddebug'] = function (block) {
		Blockly.Python.wiringpi();
		var value_signal_text = Blockly.Python.valueToCode(block, 'signal_text', Blockly.Python.ORDER_ATOMIC);
		var value_signal_value = Blockly.Python.valueToCode(block, 'signal_value', Blockly.Python.ORDER_ATOMIC);
		var value_debug_text = Blockly.Python.valueToCode(block, 'debug_text', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'sendSignalAndFlag(' + value_debug_text + ', ' + value_signal_text + ', ' + value_signal_value + ')\n';
		return code;
	};

	Blockly.Python['signal_putflag'] = function (block) {
		Blockly.Python.wiringpi();
		var value_signal_text = Blockly.Python.valueToCode(block, 'signal_text', Blockly.Python.ORDER_ATOMIC);
		var value_debug_text = Blockly.Python.valueToCode(block, 'flag_text', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'putFlag(' + value_signal_text + ', ' + value_debug_text + ')\n';
		return code;
	};

	Blockly.Python['signal_receivesignal'] = function (block) {
		Blockly.Python.wiringpi();
		Blockly.Python.importJson();
		var value_signal = Blockly.Python.valueToCode(block, 'signal', Blockly.Python.ORDER_ATOMIC);
		var value_signalvalue = Blockly.Python.valueToCode(block, 'signalvalue', Blockly.Python.ORDER_ATOMIC);
		var statements_commands = Blockly.Python.statementToCode(block, 'commands');
		// TODO: Assemble Python into code variable.
		var function_name = Blockly.Python.variableDB_.getDistinctName('myFunction', Blockly.Generator.NAME_TYPE);
		let code = '';
		if (statements_commands != '') {
			var globals = Blockly.Variables.allVariables(block);
			for (var i = 0; i < globals.length; i++) {
				globals[i] = Blockly.Python.variableDB_.getName(globals[i], Blockly.Variables.NAME_TYPE);
			}
			globals = globals.length ? '  global ' + globals.join(', ') + '\n' : '';
			code = 'def ' + function_name + '(__sender, __channel, __error, __message):\n' +
				globals +
				'  ' + value_signalvalue + ' = int(json.loads(__message))\n' +
				statements_commands + '\n' +
				'openConnection("signal:"' + ' + ' + value_signal + ', ' + function_name + ')\n';
		}
		return code;
	};


	Blockly.Python['sendsignals'] = function (block) {
		Blockly.Python.wiringpi();
		var value_value_signal = Blockly.Python.valueToCode(block, 'value_signal', Blockly.Python.ORDER_ATOMIC);
		var value_value_value = Blockly.Python.valueToCode(block, 'value_value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'sendSignalsList (' + value_value_signal + ', ' +
			value_value_value + ', min(len(' + value_value_signal + '), len(' +
			value_value_value + ')))\n';
		return code;
	};

	Blockly.Python['sendsignalsandflag'] = function (block) {
		Blockly.Python.wiringpi();
		var value_value_signal = Blockly.Python.valueToCode(block, 'value_signal', Blockly.Python.ORDER_ATOMIC);
		var value_value_value = Blockly.Python.valueToCode(block, 'value_value', Blockly.Python.ORDER_ATOMIC);
		var flag = Blockly.Python.valueToCode(block, 'debug_text', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'sendSignalsListAndFlag (' + flag + ', ' + value_value_signal + ', ' +
			value_value_value + ', min(len(' + value_value_signal + '), len(' +
			value_value_value + ')))\n';
		return code;
	};

	Blockly.Python['sendcoord'] = function (block) {
		Blockly.Python.wiringpi();
		var value_name = Blockly.Python.valueToCode(block, 'name', Blockly.Python.ORDER_ATOMIC);
		var value_latitudine = Blockly.Python.valueToCode(block, 'latitudine', Blockly.Python.ORDER_ATOMIC);
		var value_longitudine = Blockly.Python.valueToCode(block, 'longitudine', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'sendCoordinates(' + value_name + ', ' + value_latitudine + ', ' + value_longitudine + ')\n';
		return code;
	};

	Blockly.Python['sendcoordandflag'] = function (block) {
		Blockly.Python.wiringpi();
		var value_name = Blockly.Python.valueToCode(block, 'name', Blockly.Python.ORDER_ATOMIC);
		var value_latitudine = Blockly.Python.valueToCode(block, 'latitudine', Blockly.Python.ORDER_ATOMIC);
		var value_longitudine = Blockly.Python.valueToCode(block, 'longitudine', Blockly.Python.ORDER_ATOMIC);
		var value_flag = Blockly.Python.valueToCode(block, 'flag', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'sendCoordinatesAndFlag(' + value_name + ', ' + value_latitudine + ', ' + value_longitudine + ', ' + value_flag + ')\n';
		return code;
	};
};

/***/ })

}]);