(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[38],{

/***/ 562:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var xml_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(507);
/* harmony import */ var xml_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(xml_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var raw_loader_visual_toolbox_xml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(563);



let studio = null;


let blocks = __webpack_require__ (564);
let code = __webpack_require__ (565);

function setup (options, imports, register)
{
	studio = imports;

	studio.projects.registerLanguagePackage ('python', null, [
		{
			name: 'wyliozero',
			description: 'WyliodrinLab'
		},{
			name: 'RPi.GPIO',
			description: 'A module to control Raspberry Pi GPIO channels.'
		},
	]);

	let toolbox = xml_js__WEBPACK_IMPORTED_MODULE_0___default.a.xml2js (raw_loader_visual_toolbox_xml__WEBPACK_IMPORTED_MODULE_1__["default"]);
	studio.editor_visual.registerBlocksDefinitions ('wyliozero', blocks, code, toolbox, {
		type: 'wyapp', 
		board: 'raspberrypi', 
		visible ()
		{
			let device = studio.workspace.getDevice ();
			if (device.properties.wyliolab) return true;
			else return false;
		}
	});

	register (null, {});
}

/***/ }),

/***/ 563:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<toolbox>\n    <category name=\"Button\" colour=\"0\">\n        <block type=\"variables_set\">\n            <field name=\"VAR\">button</field>\n            <value name=\"VALUE\">\n                <block type=\"wyliozero_button\">\n                    <value name=\"pin_number\">\n                        <block type=\"wyliozero_pin_digital\"/>\n                    </value>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_button_is_pressed\">\n            <value name=\"button\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">button</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_button_wait_for_press\">\n            <value name=\"button\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">button</field>\n                </block>\n            </value>\n        </block>\n        <block type = \"wyliozero_button_wait_for_release\">\n            <value name=\"button\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">button</field>\n                </block>\n            </value>\n        </block>\n        <block type = \"wyliozero_button_held_time\">\n            <value name=\"button\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">button</field>\n                </block>\n            </value>\n        </block>\n        <block type = \"wyliozero_button_when_held\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">button</field>\n                </block>\n            </value>\n        </block>\n        <block type = \"wyliozero_button_when_pressed\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">button</field>\n                </block>\n            </value>\n        </block>\n        <block type = \"wyliozero_button_when_released\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">button</field>\n                </block>\n            </value>\n        </block>\n    </category>\n    <category name=\"Light\" colour=\"40\">\n        <block type=\"variables_set\">\n            <field name=\"VAR\">lightSensor</field>\n            <value name=\"VALUE\">\n                <block type=\"wyliozero_light_sensor\">\n                    <value name=\"pin_number\">\n                        <block type=\"wyliozero_pin_raspberry\"/>\n                    </value>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_light_wait_for_dark\">\n            <value name=\"pin_number\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">lightSensor</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_light_wait_for_light\">\n            <value name=\"pin_number\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">lightSensor</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_light_detected\">\n            <value name=\"pin_number\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">lightSensor</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_light_when_dark\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">lightSensor</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_light_when_light\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">lightSensor</field>\n                </block>\n            </value>\n        </block>\n    </category>\n    <category name=\"DHT Sensor\" colour=\"80\">\n        <block type=\"variables_set\">\n            <field name=\"VAR\">Temp</field>\n            <value name=\"VALUE\">\n                <block type=\"wyliozero_dht_temperature\">\n                    <value name=\"pin_number\">\n                        <block type=\"wyliozero_pin_raspberry\"/>\n                    </value>\n                </block>\n            </value>\n        </block> \n        <block type=\"variables_set\">\n            <field name=\"VAR\">Hum</field>\n            <value name=\"VALUE\">\n                <block type=\"wyliozero_dht_humidity\">\n                    <value name=\"pin_number\">\n                        <block type=\"wyliozero_pin_raspberry\"/>\n                    </value>\n                </block>\n            </value>\n        </block> \n    </category>\n    <!-- <category name=\"Power Meter\" colour=\"160\"></category>\n    <category name=\"Pin Output\" colour=\"100\"></category>\n    <sep /> -->\n    <category name=\"LED\" colour=\"200\">\n        <block type=\"variables_set\">\n            <field name=\"VAR\">ledName</field>\n            <value name=\"VALUE\">\n                <block type=\"wyliozero_led\">\n                    <value name=\"pin\">\n                        <block type=\"wyliozero_pin\">\n                            <field name=\"pin\">R4</field>\n                        </block>\n                    </value>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_led_turn_on\">\n            <value name=\"NAME\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">ledName</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_led_turn_off\">\n            <value name=\"NAME\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">ledName</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_led_toggle\">\n            <value name=\"NAME\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">ledName</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_led_blink\">\n            <value name=\"led\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">ledName</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_led_is_lit\">\n            <value name=\"led\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">ledName</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"variables_set\">\n            <field name=\"VAR\">pwmLedName</field>\n            <value name=\"VALUE\">\n                <block type=\"wyliozero_pwm_led\">\n                    <value name=\"pin\">\n                        <block type=\"wyliozero_pin_digital\"/>\n                    </value>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_pwm_on\">\n            <value name=\"pwm_led\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">pwmLedName</field>\n                </block>\n            </value>\n            <value name=\"value\">\n                <block type=\"math_number\"/>\n            </value>\n        </block>\n        <block type=\"wyliozero_pwm_pulse\">\n            <value name=\"pwm_led\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">pwmLedName</field>\n                </block>\n            </value>\n        </block>\n    </category>\n    <category name=\"Traffic Light\" colour=\"240\">\n        <block type=\"variables_set\">\n            <field name=\"VAR\">trafficLight</field>\n            <value name=\"VALUE\">\n                <block type=\"wyliozero_trafficlight\">\n                    <value name=\"red\">\n                        <block type=\"wyliozero_pin\"/>\n                    </value>\n                    <value name=\"yellow\">\n                        <block type=\"wyliozero_pin\"/>\n                    </value>\n                    <value name=\"green\">\n                        <block type=\"wyliozero_pin\"/>\n                    </value>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_traffic_light_on\">\n            <value name=\"NAME\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">trafficLight</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_traffic_blink\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">trafficLight</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_traffic_close\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">trafficLight</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_traffic_light_off\">\n            <value name=\"NAME\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">trafficLight</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_pwm_pulse\">\n            <value name=\"pwm_led\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">trafficLight</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_led_toggle\">\n            <value name=\"NAME\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">trafficLight</field>\n                </block>\n            </value>\n        </block>\n    </category>\n    <category name=\"LCD\" colour=\"280\">\n        <block type=\"wyliozero_lcd_write\">\n            <value name=\"str\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">Hello World!</field>\n                </block>\n            </value>\n        </block>\n    </category>\n    <category name=\"Buzzer\" colour = \"320\">\n        <block type=\"variables_set\">\n            <field name=\"VAR\">buzzerName</field>\n            <value name=\"VALUE\">\n                <block type=\"wyliozero_buzzer\">\n                    <value name=\"pin\">\n                        <block type=\"wyliozero_pin\">\n                            <field name=\"pin\">R4</field>\n                        </block>\n                    </value>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_buzzer_beep\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">buzzerName</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_buzzer_on\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">buzzerName</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_buzzer_off\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">buzzerName</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_buzzer_toggle\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">buzzerName</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_buzzer_is_active\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">buzzerName</field>\n                </block>\n            </value>\n        </block>\n    </category>\n    <category name=\"Motors\" colour = \"40\">\n        <block type=\"variables_set\">\n            <field name=\"VAR\">servoMotor</field>\n            <value name=\"VALUE\">\n                <block type=\"wyliozero_servo\">\n                    <value name=\"pin\">\n                        <block type=\"wyliozero_pin_digital\"/>\n                    </value>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_servo_detach\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">servoMotor</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_servo_max\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">servoMotor</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_servo_mid\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">servoMotor</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_servo_min\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">servoMotor</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyliozero_servo_value\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">servoMotor</field>\n                </block>\n            </value>\n            <value name=\"value\">\n                <block type=\"math_number\"/>\n            </value>\n        </block>\n    </category>\n    <sep />\n    <category name=\"Advanced\" colour=\"80\">\n        <block type=\"wyliozero_analogread\">\n            <value name=\"pin\">\n                <block type=\"wyliozero_pin_analog\"/>\n            </value>\n        </block>\n        <block type=\"wyliozero_digitalread\">\n            <value name=\"pin\">\n                <block type=\"wyliozero_pin_digital\"/>\n            </value>\n        </block>\n        <block type=\"wyliozero_analogwrite\">\n            <value name=\"pin\">\n                <block type=\"wyliozero_pin_pwm\"/>\n            </value>\n            <value name=\"value\">\n                <block type=\"math_number\"/>\n            </value>\n        </block>\n        <block type=\"wyliozero_digitalwrite\" >\n            <value name=\"pin\">\n                <block type=\"wyliozero_pin_digital\"/>\n            </value>\n            <value name=\"value\">\n                <block type=\"logic_boolean\"/>\n            </value>\n        </block>\n        <block type=\"wyliozero_pinmode\">\n            <value name=\"NAME\">\n                <block type=\"wyliozero_pin_analog\"/>\n            </value>\n        </block>\n        <block type=\"wyliozero_pinmode\">\n            <value name=\"NAME\">\n                <block type=\"wyliozero_pin_digital\"/>\n            </value>\n        </block>\n        <block type=\"pause\" />\n    </category>\n    <sep />\n</toolbox>");

/***/ }),

/***/ 564:
/***/ (function(module, exports) {

// DO NOT EDIT THIS FILE, IT IS AUTMATICALLY GENERATED

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;
	// var goog = blockly.goog;

	Blockly.Blocks['wyliozero_get_message'] = {
		init: function() {
			this.appendValueInput('board')
				.setCheck(null)
				.appendField('message sent by board');
			this.appendValueInput('topic')
				.setCheck(null)
				.appendField('on topic');
			this.setInputsInline(true);
			this.setOutput(true, null);
			this.setColour(120);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['wyliozero_get_message_from_all'] = {
		init: function() {
			this.appendValueInput('topic')
				.setCheck(null)
				.appendField('message sent on topic');
			this.setInputsInline(true);
			this.setOutput(true, null);
			this.setColour(120);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};


	Blockly.Blocks['wyliozero_got_values'] = {
		init: function() {
			this.appendValueInput('var')
				.setCheck(null)
				.appendField(' variable');
			this.appendDummyInput()
				.appendField('has available message.');
			this.setOutput(true, 'Boolean');
			this.setColour(120);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#gpiozero.Button.is_pressed');
		}
	};

	Blockly.Blocks['wyliozero_got_broadcast'] = {
		init: function() {
			this.appendValueInput('var')
				.setCheck(null)
				.appendField(' variable');
			this.appendDummyInput()
				.appendField('has broadcast message.');
			this.setOutput(true, 'Boolean');
			this.setColour(120);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#gpiozero.Button.is_pressed');
		}
	};

	Blockly.Blocks['wyliozero_get_value'] = {
		init: function() {
			this.appendValueInput('var')
				.setCheck(null)
				.appendField('message stored in');
			this.appendDummyInput()
				.appendField('.');
			this.setOutput(true);
			this.setColour(120);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#gpiozero.Button.is_pressed');
		}
	};

	Blockly.Blocks['wyliozero_get_broadcast'] = {
		init: function() {
			
			this.appendDummyInput()
				.appendField('message broadcasted.');
			this.setOutput(true);
			this.setColour(120);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#gpiozero.Button.is_pressed');
		}
	};

	Blockly.Blocks['wyliozero_link'] = {
		init: function() {
			this.appendValueInput('var')
				.setCheck(null)
				.appendField('link to message in');
			this.appendDummyInput()
				.appendField('.');
			this.setOutput(true);
			this.setColour(120);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#gpiozero.Button.is_pressed');
		}
	};

	Blockly.Blocks['wyliozero_lab_network_send_all'] = {
		init: function() {
			this.appendValueInput('message')
				.setCheck(['Number', 'String'])
				.appendField('Broadcast message');
			this.appendDummyInput()
				.appendField('.');
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(120);
			this.setTooltip('');
			this.setHelpUrl('https://github.com/Wyliodrin/wyliozero');
		}
	};

	Blockly.Blocks['wyliozero_lab_network_send_one'] = {
		init: function() {
			
			this.appendValueInput('message')
				.setCheck(['Number', 'String'])
				.appendField('Send message');
			this.appendValueInput('board')
				.appendField('to board');
			this.appendValueInput('topic')
				.setCheck('String')
				.appendField('on topic');
			this.appendDummyInput()
				.appendField('.');
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(120);
			this.setTooltip('');
			this.setHelpUrl('https://github.com/Wyliodrin/wyliozero');
		}
	};

	Blockly.Blocks['wyliozero_lab_network_get_all'] = {
		init: function() {
		
			this.appendValueInput('varname')
				.setCheck(['Number', 'String'])
				.appendField('Make variable');
			this.appendValueInput('topic')
				.setCheck('String')
				.appendField('listen to messages sent to me on topic');
			this.appendDummyInput()
				.appendField('.');
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(120);
			this.setTooltip('');
			this.setHelpUrl('https://github.com/Wyliodrin/wyliozero');
		}
	};

	// Blockly.Blocks['wyliozero_lab_network_get_one'] = {
	//   init: function() {
		
	//     this.appendValueInput('varname')
	//         .setCheck(['Number', 'String'])
	//         .appendField('Make variable');
	//     this.appendValueInput('board')
	//         .setCheck(['Number', 'String'])
	//         .appendField('listen to ALL messages sent by board');
	//     this.appendValueInput('topic')
	//         .setCheck('String')
	//         .appendField('on topic');
	//     this.appendDummyInput()
	//         .appendField('.');
	//     this.setPreviousStatement(true, null);
	//     this.setNextStatement(true, null);
	//     this.setColour(230);
	//  this.setTooltip('');
	//  this.setHelpUrl('https://github.com/Wyliodrin/wyliozero');
	//   }
	// };

	// Blockly.Blocks['wyliozero_lab_network_recieve_all'] = {
	//   init: function() {
	//     this.appendValueInput('var')
	//         .setCheck(null)
	//         .appendField('Make variable');
	//     this.appendValueInput('topic')
	//         .setCheck('String')
	//         .appendField('listen to messages on topic');
	//     this.appendDummyInput()
	//         .appendField('from all lab.');
	//     this.setPreviousStatement(true, null);
	//     this.setNextStatement(true, null);
	//     this.setColour(230);
	//  this.setTooltip('');
	//  this.setHelpUrl('');
	//   }
	// };

	Blockly.Blocks['wyliozero_lab_network_when_changed'] = {
		init: function() {
			this.appendValueInput('msg')
				.setCheck(null)
				.appendField('When');
			this.appendValueInput('variable')
				.setCheck(null)
				.appendField(' received by');
			this.appendDummyInput()
				.appendField('changes, do:');
			this.appendStatementInput('function')
				.setCheck(null);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(200);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};



	Blockly.Blocks['wyliozero_analogread'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck(['String', 'wyliozero_pinNumber_analog'])
				.appendField('analogRead');
			this.setOutput(true, 'Number');
			this.setColour(320);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['wyliozero_digitalread'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck(['String', 'wyliozero_pinNumber_digital'])
				.appendField('digitalRead');
			this.setOutput(true, 'Number');
			this.setColour(320);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['wyliozero_analogwrite'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck(['String', 'wyliozero_pinNumber_pwm'])
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('analogWrite');
			this.appendValueInput('value')
				.setCheck('Number')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('value');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(320);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['wyliozero_digitalwrite'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck(['String', 'wyliozero_pinNumber_digital'])
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('digitalWrite');
			this.appendValueInput('value')
				.setCheck('Boolean', 'Number')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('value');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(320);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['wyliozero_pinmode'] = {
		init: function() {
			this.appendValueInput('NAME')
				.setCheck(['String', 'wyliozero_pinNumber', 'wyliozero_pinNumber_analog', 'wyliozero_pinNumber_digital'])
				.appendField('pinMode');
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([
					['INPUT', 'INPUT'],
					['OUTPUT', 'OUTPUT']
				]), 'mode');
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(320);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['wyliozero_pin'] = {
		init: function() {
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([
					['A0', 'A0'],
					['A1', 'A1'],
					['A2', 'A2'],
					['A3', 'A3'],
					['A4', 'A4'],
					['A5', 'A5'],
					['D2', 'D2'],
					['D3', 'D3'],
					['D4', 'D4'],
					['D5', 'D5'],
					['D6', 'D6'],
					['D7', 'D7'],
					['D8', 'D8'],
					['D9', 'D9'],
					['D10', 'D10'],
					['D11', 'D11'],
					['D12', 'D12'],
					['D13', 'D13'],
					['R4', 'R4'],
					['R17', 'R17'],
					['R27', 'R27'],
					['R22', 'R22'],
					['R10', 'R10'],
					['R9', 'R9'],
					['R11', 'R11'],
					['R18', 'R18'],
					['R23', 'R23'],
					['R8', 'R8'],
					['R7', 'R7'],
					['R13', 'R13'],
					['R19', 'R19'],
					['R20', 'R20'],
					['R21', 'R21']

				]), 'pin');
			this.setOutput(true, 'wyliozero_pinNumber');
			this.setColour(230);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['wyliozero_pin_analog'] = {
		init: function() {
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([
					['A0', 'A0'],
					['A1', 'A1'],
					['A2', 'A2'],
					['A3', 'A3'],
					['A4', 'A4'],
					['A5', 'A5']

				]), 'pin')
				.appendField('(analog)');
			this.setOutput(true, 'wyliozero_pinNumber_analog');
			this.setColour(230);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['wyliozero_pin_pwm'] = {
		init: function() {
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([
					['D3', 'D3'],
					['D5', 'D5'],
					['D6', 'D6'],
					['D9', 'D9'],
					['D10', 'D10'],
					['D11', 'D11']

				]), 'pin')
				.appendField('(pwm)');
			this.setOutput(true, 'wyliozero_pinNumber_pwm');
			this.setColour(230);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['wyliozero_pin_digital'] = {
		init: function() {
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([
					['D2', 'D2'],
					['D3', 'D3'],
					['D4', 'D4'],
					['D5', 'D5'],
					['D6', 'D6'],
					['D7', 'D7'],
					['D8', 'D8'],
					['D9', 'D9'],
					['D10', 'D10'],
					['D11', 'D11'],
					['D12', 'D12'],
					['D13', 'D13'],
					['R4', 'R4'],
					['R17', 'R17'],
					['R27', 'R27'],
					['R22', 'R22'],
					['R10', 'R10'],
					['R9', 'R9'],
					['R11', 'R11'],
					['R18', 'R18'],
					['R23', 'R23'],
					['R8', 'R8'],
					['R7', 'R7'],
					['R13', 'R13'],
					['R19', 'R19'],
					['R20', 'R20'],
					['R21', 'R21']

				]), 'pin')
				.appendField('(digital)');
			this.setOutput(true, 'wyliozero_pinNumber_digital');
			this.setColour(230);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['wyliozero_pin_raspberry'] = {
		init: function() {
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([
					['R4', 'R4'],
					['R17', 'R17'],
					['R27', 'R27'],
					['R22', 'R22'],
					['R10', 'R10'],
					['R9', 'R9'],
					['R11', 'R11'],
					['R18', 'R18'],
					['R23', 'R23'],
					['R8', 'R8'],
					['R7', 'R7'],
					['R13', 'R13'],
					['R19', 'R19'],
					['R20', 'R20'],
					['R21', 'R21']

				]), 'pin')
				.appendField('(digital)');
			this.setOutput(true, 'wyliozero_pinNumber_raspberry');
			this.setColour(230);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};


	Blockly.Blocks['wyliozero_led'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck(['String', 'wyliozero_pinNumber', 'wyliozero_pinNumber_analog', 'wyliozero_pinNumber_digital'])
				.appendField('LED');
			this.setOutput(true, 'LED');
			this.setColour(200);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_output.html#led');
		}
	};

	Blockly.Blocks['wyliozero_servo'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck(['String', 'wyliozero_pinNumber_digital'])
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('Servo Motor');
			this.setInputsInline(true);
			this.setOutput(true, 'servo');
			this.setColour(40);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_output.html#servo');
		}
	};

	// Blockly.Blocks['wyliozero_angular_servo'] = {
	//   init: function() {
	//     this.appendValueInput('pin')
	//         .setCheck(['String', 'wyliozero_pinNumber_digital'])
	//         .setAlign(Blockly.ALIGN_RIGHT)
	//         .appendField('Angular Servo Motor');
	//     this.setInputsInline(true);
	//     this.setOutput(true, 'angular_servo');
	//     this.setColour(105);
	//  this.setTooltip('');
	//  this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_output.html#servo');
	//   }
	// };

	Blockly.Blocks['wyliozero_pwm_led'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck(['String', 'wyliozero_pinNumber_digital'])
				.appendField('PWM LED');
			this.setOutput(true, 'PWM_LED');
			this.setColour(200);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_output.html#pwmled');
		}
	};

	Blockly.Blocks['wyliozero_button'] = {
		init: function() {
			this.appendValueInput('pin_number')
				.setCheck(['String', 'wyliozero_pinNumber_digital'])
				.appendField('Button');
			this.setOutput(true, 'button');
			this.setColour(0);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#button');
		}
	};

	Blockly.Blocks['wyliozero_button_when_held'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck('button')
				.appendField('When button');
			this.appendDummyInput()
				.appendField('is held, do:');
			this.appendStatementInput('function')
				.setCheck(null);
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#gpiozero.Button.when_held');
		}
	};

	Blockly.Blocks['wyliozero_button_when_pressed'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck('button')
				.appendField('When button');
			this.appendDummyInput()
				.appendField('is pressed, do:');
			this.appendStatementInput('function')
				.setCheck(null);
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#gpiozero.Button.when_pressed');
		}
	};

	Blockly.Blocks['wyliozero_button_when_released'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck('button')
				.appendField('When button');
			this.appendDummyInput()
				.appendField('is released, do:');
			this.appendStatementInput('function')
				.setCheck(null);
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#gpiozero.Button.when_released');
		}
	};


	Blockly.Blocks['wyliozero_button_is_pressed'] = {
		init: function() {
			this.appendValueInput('button')
				.setCheck('button')
				.appendField('button');
			this.appendDummyInput()
				.appendField('is pressed');
			this.setOutput(true, 'Boolean');
			this.setColour(0);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#gpiozero.Button.is_pressed');
		}
	};

	Blockly.Blocks['wyliozero_servo_detach'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck('servo')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('Detach Servo Motor');
			this.appendDummyInput()
				.appendField('.');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(40);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_output.html#gpiozero.Servo.detach');
		}
	};

	Blockly.Blocks['wyliozero_servo_max'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck('servo')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('Set Servo Motor');
			this.appendDummyInput()
				.appendField('to its max position.');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(40);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_output.html#gpiozero.Servo.max');
		}
	};

	Blockly.Blocks['wyliozero_servo_mid'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck('servo')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('Set Servo Motor');
			this.appendDummyInput()
				.appendField('to its mid position.');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(40);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_output.html#gpiozero.Servo.mid');
		}
	};

	Blockly.Blocks['wyliozero_servo_min'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck('servo')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('Set Servo Motor');
			this.appendDummyInput()
				.appendField('to its min position.');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(40);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_output.html#gpiozero.Servo.min');
		}
	};

	Blockly.Blocks['wyliozero_servo_value'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck('servo')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('For Servo Motor');
			this.appendValueInput('value')
				.setCheck('Number')
				.appendField('set value');
			this.appendDummyInput()
				.appendField('(between -1 and 1).');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(40);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_output.html#gpiozero.Servo.value');
		}
	};
	Blockly.Blocks['wyliozero_button_wait_for_release'] = {
		init: function() {
			this.appendValueInput('button')
				.setCheck('button')
				.appendField('Wait until button');
			this.appendDummyInput()
				.appendField('is released.');
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#gpiozero.Button.wait_for_release');
		}
	};

	Blockly.Blocks['wyliozero_button_held_time'] = {
		init: function() {
			this.appendValueInput('button')
				.setCheck('button')
				.appendField('how many seconds button');
			this.appendDummyInput()
				.appendField('has been held for.');
			this.setOutput(true, 'math_number');
			this.setColour(0);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#gpiozero.Button.held_time');
		}
	};
	Blockly.Blocks['wyliozero_led_blink'] = {
		init: function() {
			this.appendValueInput('led')
				.setCheck(['PWM_LED', 'LED', 'traffic'])
				.setAlign(Blockly.ALIGN_CENTRE)
				.appendField('Blink LED ');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(200);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['wyliozero_pwm_on'] = {
		init: function() {
			this.appendValueInput('pwm_led')
				.setCheck('PWM_LED')
				.appendField('Turn on PWM LED');
			this.appendValueInput('value')
				.setCheck('Number')
				.appendField('with value');
			//   this.appendDummyInput()
			// 	  .appendField('(between 0 and 255)');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(200);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['wyliozero_button_wait_for_press'] = {
		init: function() {
			this.appendValueInput('button')
				.setCheck('button')
				.appendField('Wait until button');
			this.appendDummyInput()
				.appendField('is pressed');
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['wyliozero_pause'] = {
		init: function() {
			this.appendDummyInput()
				.appendField('Pause');
			this.setPreviousStatement(true, null);
			this.setColour(320);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['wyliozero_trafficlight'] = {
		init: function() {
			this.appendValueInput('red')
				.setCheck(['String', 'wyliozero_pinNumber', 'wyliozero_pinNumber_analog', 'wyliozero_pinNumber_digital'])
				.appendField('Traffic Lights');
			this.appendValueInput('yellow')
				.setCheck(['String', 'wyliozero_pinNumber', 'wyliozero_pinNumber_analog', 'wyliozero_pinNumber_digital']);
			this.appendValueInput('green')
				.setCheck(['String', 'wyliozero_pinNumber', 'wyliozero_pinNumber_analog', 'wyliozero_pinNumber_digital']);
			this.setOutput(true, 'traffic');
			this.setColour(240);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['wyliozero_led_turn_on'] = {
		init: function() {
			this.appendValueInput('NAME')
				.setCheck(['PWM_LED', 'LED', 'traffic'])
				.appendField('Turn on LED');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(200);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['wyliozero_led_turn_off'] = {
		init: function() {
			this.appendValueInput('NAME')
				.setCheck(['PWM_LED', 'LED', 'traffic'])
				.appendField('Turn off LED');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(200);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['wyliozero_led_toggle'] = {
		init: function() {
			this.appendValueInput('NAME')
				.setCheck(['PWM_LED', 'LED', 'traffic'])
				.appendField('Toggle LED');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(200);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['wyliozero_led_is_lit'] = {
		init: function() {
			this.appendValueInput('led')
				.setCheck(['PWM_LED', 'LED'])
				.appendField('led');
			this.appendDummyInput()
				.appendField('is lit.');
			this.setOutput(true, ['Number', 'Boolean']);
			this.setColour(200);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['wyliozero_traffic_light_on'] = {
		init: function() {
			this.appendDummyInput()
				.appendField('Turn on')
				.appendField(new Blockly.FieldDropdown([
					['red', 'red'],
					['yellow', 'yellow'],
					['green', 'green']
				]), 'light');
			this.appendValueInput('NAME')
				.setCheck('traffic')
				.appendField('for Traffic Light');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(240);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['wyliozero_traffic_blink'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck('traffic')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('Blink traffic light');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(240);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_boards.html#gpiozero.TrafficLights.blink');
		}
	};

	Blockly.Blocks['wyliozero_traffic_close'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck('traffic')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('Close traffic light');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(240);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_boards.html#gpiozero.TrafficLights.close');
		}
	};

	Blockly.Blocks['wyliozero_pwm_pulse'] = {
		init: function() {
			this.appendValueInput('pwm_led')
				.setCheck('PWM_LED', 'traffic')
				.appendField('Pulse PWM LED');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(200);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['wyliozero_traffic_light_off'] = {
		init: function() {
			this.appendDummyInput()
				.appendField('Turn off')
				.appendField(new Blockly.FieldDropdown([
					['red', 'red'],
					['yellow', 'yellow'],
					['green', 'green']
				]), 'light');
			this.appendValueInput('NAME')
				.setCheck('traffic')
				.appendField('for Traffic Light');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(240);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['wyliozero_start_labnetwork'] = {
		init: function() {
			this.appendDummyInput()
				.appendField('Start LabNetwork');
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(180);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['wyliozero_lcd_write'] = {
		init: function() {
			this.appendValueInput('str')
				.setCheck('String')
				.appendField('LCD write');
			this.appendDummyInput()
				.appendField('on line');
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([
					['1', '1'],
					['2', '2']
				]), 'line');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(280);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};


	Blockly.Blocks['wyliozero_light_sensor'] = {
		init: function() {
			this.appendValueInput('pin_number')
				.setCheck(['String', 'wyliozero_pinNumber_raspberry'])
				.appendField('Light Sensor');
			this.setOutput(true, 'light_sensor');
			this.setColour(40);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#gpiozero.LightSensor');
		}
	};

	Blockly.Blocks['wyliozero_light_when_dark'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck('light_sensor')
				.appendField('When light sensor');
			this.appendDummyInput()
				.appendField('senses dark, do:');
			this.appendStatementInput('function')
				.setCheck(null);
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(40);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#gpiozero.LightSensor.when_dark');
		}
	};

	Blockly.Blocks['wyliozero_light_when_light'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck('light_sensor')
				.appendField('When light sensor');
			this.appendDummyInput()
				.appendField('senses light, do:');
			this.appendStatementInput('function')
				.setCheck(null);
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(40);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#gpiozero.LightSensor.when_light');
		}
	};

	Blockly.Blocks['wyliozero_light_wait_for_dark'] = {
		init: function() {
			this.appendValueInput('pin_number')
				.setCheck('light_sensor')
				.appendField('Wait until light sensor');
			this.appendDummyInput()
				.appendField('sees dark.');
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(40);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#gpiozero.LightSensor.wait_for_dark');
		}
	};

	Blockly.Blocks['wyliozero_light_wait_for_light'] = {
		init: function() {
			this.appendValueInput('pin_number')
				.setCheck('light_sensor')
				.appendField('Wait until light sensor');
			this.appendDummyInput()
				.appendField('sees light.');
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(40);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#gpiozero.LightSensor.wait_for_light');
		}
	};

	Blockly.Blocks['wyliozero_light_detected'] = {
		init: function() {
			this.appendValueInput('pin_number')
				.setCheck('light_sensor')
				.appendField('sensor');
			this.appendDummyInput()
				.appendField('detects light.');
			this.setOutput(true, ['Boolean', 'Number']);
			this.setColour(40);
			this.setTooltip('');
			this.setHelpUrl('AChttps://gpiozero.readthedocs.io/en/stable/api_input.html#gpiozero.LightSensor.light_detected');
		}
	};

	Blockly.Blocks['wyliozero_buzzer'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck(['String', 'wyliozero_pinNumber', 'wyliozero_pinNumber_analog', 'wyliozero_pinNumber_digital'])
				.appendField('buzzer');
			this.setOutput(true, 'buzzer');
			this.setColour(320);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_output.html#buzzer');
		}
	};

	Blockly.Blocks['wyliozero_buzzer_beep'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck('buzzer')
				.appendField('Beep buzzer');
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(320);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_output.html#gpiozero.Buzzer.beep');
		}
	};

	Blockly.Blocks['wyliozero_buzzer_on'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck('buzzer')
				.appendField('Turn on buzzer');
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(320);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_output.html#gpiozero.Buzzer.on');
		}
	};

	Blockly.Blocks['wyliozero_buzzer_off'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck('buzzer')
				.appendField('Turn off buzzer');
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(320);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_output.html#gpiozero.Buzzer.off');
		}
	};

	Blockly.Blocks['wyliozero_buzzer_toggle'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck('buzzer')
				.appendField('Toggle buzzer');
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(320);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_output.html#gpiozero.Buzzer.toggle');
		}
	};

	Blockly.Blocks['wyliozero_buzzer_is_active'] = {
		init: function() {
			this.appendValueInput('pin')
				.setCheck('buzzer')
				.appendField('buzzer');
			this.appendDummyInput()
				.appendField('is active.');
			this.setOutput(true, ['Number', 'Boolean']);
			this.setColour(320);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_output.html#gpiozero.Buzzer.toggle');
		}
	};

	Blockly.Blocks['wyliozero_dht_temperature'] = {
		init: function() {
			this.appendValueInput('pin_number')
				.setCheck(['String', 'wyliozero_pinNumber_raspberry'])
				.appendField('Temperature sensor');
			this.setOutput(true, 'Boolean');
			this.setColour(120);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['wyliozero_dht_humidity'] = {
		init: function() {
			this.appendValueInput('pin_number')
				.setCheck(['String', 'wyliozero_pinNumber_raspberry'])
				.appendField('Humidity sensor');
			this.setOutput(true, 'Boolean');
			this.setColour(120);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};
};

/***/ }),

/***/ 565:
/***/ (function(module, exports) {

// DO NOT EDIT THIS FILE, IT IS AUTMATICALLY GENERATED

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;
	// var goog = blockly.goog;

	Blockly.Python.wyliozero_setUp = function() {
		if (!Blockly.Python.definitions_['wyliozero_setUp']) {
			Blockly.Python.definitions_['wyliozero_setUp'] = 'from wyliozero import * \n';
		}
	};

	Blockly.Python.wyliozero_importtime = function() {
		if (!Blockly.Python.definitions_['wyliozero_time']) {
			Blockly.Python.definitions_['wyliozero_time'] = 'from time import * \n';
		}
	};

	Blockly.Python.uniqueName = function(string) {
		return Blockly.Python.variableDB_.getDistinctName(string, Blockly.Generator.NAME_TYPE);
	};

	Blockly.Python.wylioLab = function() {
		if (!Blockly.Python.definitions_['wylioLab']) {
			Blockly.Python.definitions_['wylioLab'] = 'myBoard =  LabNetwork()\n';
		}
	};

	Blockly.Python.initMessage = function(name, topic, board) {
		
		Blockly.Python.definitions_[name] = name.toString() + ' = AwayInfo( topic = ' + topic.toString() + ', board = ' + board.toString() + ')\n'; 
	};

	Blockly.Python.initBroadcast = function(){
		if (!Blockly.Python.definitions_['broadcast']) {
			Blockly.Python.definitions_['broadcast'] = 'broadcast = AwayInfo()\n';
		}
	};

	Blockly.Python['wyliozero_get_message'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		Blockly.Python.wylioLab();
		var name = Blockly.Python.uniqueName('message');
		var value_topic = Blockly.Python.valueToCode(block, 'topic', Blockly.Python.ORDER_ATOMIC);
		var value_board = Blockly.Python.valueToCode(block, 'board', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.initMessage(name, value_topic, value_board);

		// TODO: Assemble Python into code variable.
		var code = name + '.getAvailable()\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['wyliozero_get_message_from_all'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		Blockly.Python.wylioLab();
		var name = Blockly.Python.uniqueName('message');
		var value_topic = Blockly.Python.valueToCode(block, 'topic', Blockly.Python.ORDER_ATOMIC);
		var value_board = 'None';
		Blockly.Python.initMessage(name, value_topic, value_board);
		
		// TODO: Assemble Python into code variable.
		var code = name + '.getAvailable()\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['wyliozero_got_values'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_var = Blockly.Python.valueToCode(block, 'var', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_var.toString() + '.isAvailable()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['wyliozero_got_broadcast'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_var = Blockly.Python.valueToCode(block, 'var', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_var.toString() + '.isBroadcastAvailable()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['wyliozero_get_value'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_var = Blockly.Python.valueToCode(block, 'var', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_var.toString() + '.getAvailable()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};



	Blockly.Python['wyliozero_get_broadcast'] = function(/* block */) {
		Blockly.Python.wyliozero_setUp();
		Blockly.Python.initBroadcast();
		// var value_var = Blockly.Python.valueToCode(block, 'var', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'broadcast.getBroadcastAvailable()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['wyliozero_link'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_var = Blockly.Python.valueToCode(block, 'var', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_var.toString() + '.values';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};


	Blockly.Python['wyliozero_lab_network_send_all'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		Blockly.Python.wylioLab();
		var value_message = Blockly.Python.valueToCode(block, 'message', Blockly.Python.ORDER_ATOMIC);
		//var value_topic = Blockly.Python.valueToCode(block, 'topic', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'myBoard.broadcastMessage(' + value_message.toString() + ')\n' ;
		return code;
	};

	Blockly.Python['wyliozero_lab_network_send_one'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		Blockly.Python.wylioLab();
		var value_message = Blockly.Python.valueToCode(block, 'message', Blockly.Python.ORDER_ATOMIC);
		var value_topic = Blockly.Python.valueToCode(block, 'topic', Blockly.Python.ORDER_ATOMIC);
		var value_board = Blockly.Python.valueToCode(block, 'board', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'myBoard.sendMessage(' +  value_message.toString() + ', ' + value_board.toString() + ', ' + value_topic.toString() + ')\n' ;
		return code;
	};

	Blockly.Python['wyliozero_lab_network_get_all'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		Blockly.Python.wylioLab();
		var value_topic = Blockly.Python.valueToCode(block, 'topic', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var varName = Blockly.Python.valueToCode(block, 'varname', Blockly.Python.ORDER_ATOMIC);
		var code = varName.toString() + ' = AwayInfo( topic = ' + value_topic.toString() + ' ) \n';
		return code;
	};

	// Blockly.Python['wyliozero_lab_network_get_one'] = function(block) {
	//   Blockly.Python.wyliozero_setUp();
	//   Blockly.Python.wylioLab();
	//   var value_topic = Blockly.Python.valueToCode(block, 'topic', Blockly.Python.ORDER_ATOMIC);
	//   var value_board = Blockly.Python.valueToCode(block, 'board', Blockly.Python.ORDER_ATOMIC);
	//   // TODO: Assemble Python into code variable.
	//   var varName = Blockly.Python.valueToCode(block, 'varname', Blockly.Python.ORDER_ATOMIC);
	//   var code = varName.toString() + ' = AwayInfo(public = True, who =' + value_board.toString()+' topic = ' + value_topic.toString() + ' ) \n';
	//   return code;
	// };


	//(self, broadcast = False, public = False, private = False, who = None, topic = 'default' )
	// Blockly.Python['wyliozero_lab_network_recieve_all'] = function(block) {
	//   Blockly.Python.wyliozero_setUp();
	//   var value_var = Blockly.Python.valueToCode(block, 'var', Blockly.Python.ORDER_ATOMIC);
	//   var value_topic = Blockly.Python.valueToCode(block, 'topic', Blockly.Python.ORDER_ATOMIC);
	//   // TODO: Assemble Python into code variable.

	//   var code =  value_var.toString() + ' = AwayInfo(private = True, topic = ' + value_topic.toString() + ' ) \n';
	//   return code;
	// };


	Blockly.Python['wyliozero_lab_network_when_changed'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_variable = Blockly.Python.valueToCode(block, 'variable', Blockly.Python.ORDER_ATOMIC);
		var value_msg = Blockly.Python.valueToCode(block, 'msg', Blockly.Python.ORDER_ATOMIC);
		var statements_function = Blockly.Python.statementToCode(block, 'function') || '  pass\n\n';
		var functionName = Blockly.Python.uniqueName('function');
		// TODO: Assemble Python into code variable.
		var code =  'def ' + functionName + '(' + value_msg.toString() + '):\n' + statements_function.toString()
					+ value_variable + '.when_updated = ' + functionName + '\n';
		return code;
	};


	Blockly.Python['wyliozero_analogread'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'analogRead(' + value_pin.toString() + ')\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['wyliozero_digitalread'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'digitalRead(' + value_pin.toString() + ')\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['wyliozero_analogwrite'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'analogWrite(' + value_pin.toString() + ',' + value_value.toString() + ')\n';
		return code;
	};

	Blockly.Python['wyliozero_digitalwrite'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		let valueToWrite = null;
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		if (value_value.toString() === 'True') {
			valueToWrite = 1;
		} else {
			valueToWrite = 0;
		}
		var code = 'digitalWrite(' + value_pin.toString() + ',' + valueToWrite + ')\n';
		return code;
	};

	Blockly.Python['wyliozero_pinmode'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
		var dropdown_mode = block.getFieldValue('mode');
		// TODO: Assemble Python into code variable.
		var code = 'pinMode(' + value_name.toString() + ',' + dropdown_mode.toString() + ')\n';
		return code;
	};

	Blockly.Python['wyliozero_pin_analog'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var dropdown_pin = block.getFieldValue('pin');
		// TODO: Assemble Python into code variable.
		var code = dropdown_pin.toString();
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['wyliozero_pin_pwm'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var dropdown_pin = block.getFieldValue('pin');
		// TODO: Assemble Python into code variable.
		var code = dropdown_pin.toString();
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['wyliozero_pin'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var dropdown_pin = block.getFieldValue('pin');
		// TODO: Assemble Python into code variable.
		var code = dropdown_pin.toString();
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['wyliozero_pin_digital'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var dropdown_pin = block.getFieldValue('pin');
		// TODO: Assemble Python into code variable.
		var code = dropdown_pin.toString();
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['wyliozero_pin_raspberry'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var dropdown_pin = block.getFieldValue('pin');
		// TODO: Assemble Python into code variable.
		var code = dropdown_pin.toString();
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['wyliozero_led'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'LED(' + value_pin.toString() + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['wyliozero_servo'] = function(block) {
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'Servo(' + value_pin.toString() + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['wyliozero_servo_detach'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin.toString() + '.detach() \n';
		return code;
	};

	Blockly.Python['wyliozero_servo_max'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin.toString() + '.max() \n';
		return code;
	};

	Blockly.Python['wyliozero_servo_mid'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin.toString() + '.mid() \n';
		return code;
	};

	Blockly.Python['wyliozero_servo_min'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin.toString() + '.min() \n';
		return code;
	};


	Blockly.Python['wyliozero_servo_value'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var number_name = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin.toString() + '.value = ' + number_name.toString() + '\n';
		return code;
	};
	// Blockly.Python['wyliozero_angular_servo'] = function(block) {
	//   var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
	//   // TODO: Assemble Python into code variable.
	//   var code = 'Servo(' + value_pin.toString() + ')';
	//   // TODO: Change ORDER_NONE to the correct strength.
	//   return [code, Blockly.Python.ORDER_NONE];
	// };

	Blockly.Python['wyliozero_pwm_led'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_led = Blockly.Python.valueToCode(block, 'led', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'PWMLED(' + value_led.toString() + ')\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['wyliozero_button'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin_number = Blockly.Python.valueToCode(block, 'pin_number', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'Button(' + value_pin_number.toString() + ', pull_up = False) \n';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	// Blockly.Python['wyliozero_button_when_held'] = function(block) {
	//     var value_pin_number = Blockly.Python.valueToCode(block, 'pin_number', Blockly.Python.ORDER_ATOMIC);
	//     var value_function = Blockly.Python.valueToCode(block, 'function', Blockly.Python.ORDER_ATOMIC);
	//     // TODO: Assemble Python into code variable.
	//     var code = value_pin_number.toString() + '.when_held = ' + value_function + ' ';
	//     return code;
	// };

	Blockly.Python['wyliozero_button_is_pressed'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_button = Blockly.Python.valueToCode(block, 'button', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_button.toString() + '.is_pressed';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};



	Blockly.Python['wyliozero_button_wait_for_release'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_button = Blockly.Python.valueToCode(block, 'button', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_button.toString() + '.wait_for_release() \n';
		return code;
	};


	Blockly.Python['wyliozero_led_blink'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_led = Blockly.Python.valueToCode(block, 'led', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_led.toString() + '.blink() \n';
		return code;
	};

	Blockly.Python['wyliozero_button_when_held'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var statements_function = Blockly.Python.statementToCode(block, 'function') || '  pass\n\n';
		var functionName = Blockly.Python.uniqueName('function');
		// TODO: Assemble Python into code variable.
		var code =  '\ndef ' + functionName + '():\n' + statements_function.toString()
				+ value_pin + '.when_held = ' + functionName + '\n\n';
		return code;
	};

	Blockly.Python['wyliozero_button_when_pressed'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var statements_function = Blockly.Python.statementToCode(block, 'function') || '  pass\n\n';
		var functionName = Blockly.Python.uniqueName('function');
		// TODO: Assemble Python into code variable.
		var code =  '\ndef ' + functionName + '():\n' + statements_function.toString()
				+ value_pin + '.when_pressed = ' + functionName + '\n\n';
		return code;
	};

	Blockly.Python['wyliozero_button_when_released'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var statements_function = Blockly.Python.statementToCode(block, 'function') || '  pass\n\n';
		var functionName = Blockly.Python.uniqueName('function');
		// TODO: Assemble Python into code variable.
		var code =  '\ndef ' + functionName + '():\n' + statements_function.toString()
				+ value_pin + '.when_released = ' + functionName + '\n';
		return code;
	};

	Blockly.Python['wyliozero_pwm_on'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pwm_led = Blockly.Python.valueToCode(block, 'pwm_led', Blockly.Python.ORDER_ATOMIC);
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pwm_led.toString() + '.value = ' + value_value.toString() + ' / 255.0\n';
		return code;
	};

	Blockly.Python['wyliozero_button_wait_for_press'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_button = Blockly.Python.valueToCode(block, 'button', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_button.toString() + '.wait_for_press() \n';
		return code;
	};

	Blockly.Python['wyliozero_button_held_time'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_button = Blockly.Python.valueToCode(block, 'button', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_button.toString() + '.held_time';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['wyliozero_pause'] = function(/* block */) {
		Blockly.Python.wyliozero_setUp();
		// TODO: Assemble Python into code variable.
		var code = 'pause() \n';
		return code;
	};

	Blockly.Python['wyliozero_trafficlight'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_ATOMIC);
		var value_yellow = Blockly.Python.valueToCode(block, 'yellow', Blockly.Python.ORDER_ATOMIC);
		var value_green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'TrafficLights( ' + value_red.toString() + ', ' + value_yellow.toString() + ', ' + value_green.toString() + ') ';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['wyliozero_led_turn_on'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_FUNCTION_CALL);
		// TODO: Assemble Python into code variable.
		var code = value_name.toString() + '.on()\n';
		return code;
	};

	Blockly.Python['wyliozero_led_turn_off'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_FUNCTION_CALL);
		// TODO: Assemble Python into code variable.
		var code = value_name.toString() + '.off()\n';
		return code;
	};

	Blockly.Python['wyliozero_led_toggle'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_FUNCTION_CALL);
		// TODO: Assemble Python into code variable.
		var code = value_name.toString() + '.toggle()\n';
		return code;
	};

	Blockly.Python['wyliozero_led_is_lit'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_led = Blockly.Python.valueToCode(block, 'led', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_led.toString() + 'is_lit';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['wyliozero_traffic_light_on'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var dropdown_light = block.getFieldValue('light');
		var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_name.toString() + '.' + dropdown_light.toString() + '.on() \n';
		return code;
	};


	Blockly.Python['wyliozero_traffic_blink'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin.toString() + '.blink() \n';
		return code;
	};

	Blockly.Python['wyliozero_traffic_close'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin.toString() + '.close() \n';
		return code;
	};


	Blockly.Python['wyliozero_pwm_pulse'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pwm_led = Blockly.Python.valueToCode(block, 'pwm_led', Blockly.Python.ORDER_FUNCTION_CALL);
		// TODO: Assemble Python into code variable.
		var code = value_pwm_led.toString() + '.pulse() \n';
		return code;
	};

	Blockly.Python['wyliozero_traffic_light_off'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var dropdown_light = block.getFieldValue('light');
		var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_name.toString() + '.' + dropdown_light.toString() + '.off() \n';
		return code;
	};

	Blockly.Python['wyliozero_start_labnetwork'] = function(/* block */) {
		Blockly.Python.wyliozero_setUp();
		// TODO: Assemble Python into code variable.
		var code = '...\n';
		return code;
	};

	Blockly.Python['wyliozero_lcd_write'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_lcd = 'LabLCD()';
		var value_str = Blockly.Python.valueToCode(block, 'str', Blockly.Python.ORDER_ATOMIC);
		var dropdown_line = block.getFieldValue('line');
		// TODO: Assemble Python into code variable.

		var code;
		if (dropdown_line.toString() === '1') {
			code = value_lcd + '.clear()\n' + value_lcd + '.set_cursor(0,0)\n' + value_lcd + '.message(' + value_str.toString() + ')\n';
		} else {
			code = value_lcd + '.clear()\n' + value_lcd + '.set_cursor(0,1)\n' + value_lcd + '.message(' + value_str.toString() + ')\n';
		}
		return code;
	};

	Blockly.Python['wyliozero_light_sensor'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin_number = Blockly.Python.valueToCode(block, 'pin_number', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'LightSensor(' + value_pin_number.toString() + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['wyliozero_light_when_dark'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var statements_function = Blockly.Python.statementToCode(block, 'function') || '  pass\n\n';
		var functionName = Blockly.Python.uniqueName('function');
		// TODO: Assemble Python into code variable.
		var code =  '\ndef ' + functionName + '():\n' + statements_function.toString()
				+ value_pin + '.when_dark = ' + functionName + '\n\n';
		return code;
	};

	Blockly.Python['wyliozero_light_when_light'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var statements_function = Blockly.Python.statementToCode(block, 'function') || '  pass\n\n';
		var functionName = Blockly.Python.uniqueName('function');
		// TODO: Assemble Python into code variable.
		var code =  '\ndef ' + functionName + '():\n' + statements_function.toString()
				+ value_pin + '.when_light = ' + functionName + '\n\n';
		return code;
	};

	Blockly.Python['wyliozero_light_wait_for_dark'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin_number = Blockly.Python.valueToCode(block, 'pin_number', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin_number.toString() + '.wait_for_dark() \n';
		return code;
	};

	Blockly.Python['wyliozero_light_wait_for_light'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin_number = Blockly.Python.valueToCode(block, 'pin_number', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin_number.toString() + '.wait_for_light() \n';
		return code;
	};

	Blockly.Python['wyliozero_light_detected'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin_number = Blockly.Python.valueToCode(block, 'pin_number', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin_number.toString() + '.light_detected';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['wyliozero_buzzer'] = function(block) {
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'Buzzer(' + value_pin.toString() + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['wyliozero_buzzer_beep'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin.toString() + '.beep() \n';
		return code;
	};

	Blockly.Python['wyliozero_buzzer_on'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin.toString() + '.on() \n';
		return code;
	};

	Blockly.Python['wyliozero_buzzer_off'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin.toString() + '.off() \n';
		return code;
	};

	Blockly.Python['wyliozero_buzzer_toggle'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin.toString() + '.toggle() \n';
		return code;
	};

	Blockly.Python['wyliozero_buzzer_is_active'] = function(block) {
		Blockly.Python.wyliozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin.toString() + '.is_active';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['wyliozero_dht_temperature'] = function(block) {
		var value_pin = Blockly.Python.valueToCode(block, 'pin_number', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'temperatureRead(' + value_pin.toString() + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['wyliozero_dht_humidity'] = function(block) {
		var value_pin = Blockly.Python.valueToCode(block, 'pin_number', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'humidityRead(' + value_pin.toString() + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};
};

/***/ })

}]);