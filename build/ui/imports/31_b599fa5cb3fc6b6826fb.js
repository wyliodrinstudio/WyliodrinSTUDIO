(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[31],{

/***/ 527:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var xml_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(507);
/* harmony import */ var xml_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(xml_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var raw_loader_visual_toolbox_xml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(528);



let studio = null;


let blocks = __webpack_require__ (529);
let code = __webpack_require__ (530);

function setup (options, imports, register)
{
	studio = imports;

	let toolbox = xml_js__WEBPACK_IMPORTED_MODULE_0___default.a.xml2js (raw_loader_visual_toolbox_xml__WEBPACK_IMPORTED_MODULE_1__["default"]);

	
	studio.projects.registerLanguagePackage ('python', null, [
		{
			name: 'gpiozero',
			description: 'A simple interface to GPIO devices with Raspberry Pi.'
		},
		{
			name: 'RPi.GPIO',
			description: 'A module to control Raspberry Pi GPIO channels.'
		},
	]);

	studio.editor_visual.registerBlocksDefinitions ('gpiozero', blocks, code, toolbox, {
		type: 'wyapp', 
		board: 'raspberrypi', 
		visible ()
		{
			let device = studio.workspace.getDevice ();
			if (!device.properties.wyliolab) return true;
			else return false;
		}
	});

	register (null, {});
}

/***/ }),

/***/ 528:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<toolbox>\n    <category name=\"Button\" colour=\"0\">\n        <block type=\"variables_set\">\n            <field name=\"VAR\">button</field>\n            <value name=\"VALUE\">\n                <block type=\"gpiozero_button\">\n                    <value name=\"pin_number\">\n                        <block type=\"gpiozero_pin\"/>\n                    </value>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_button_is_pressed\">\n            <value name=\"button\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">button</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_button_wait_for_press\">\n            <value name=\"button\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">button</field>\n                </block>\n            </value>\n        </block>\n        <block type = \"gpiozero_button_wait_for_release\">\n            <value name=\"button\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">button</field>\n                </block>\n            </value>\n        </block>\n        <block type = \"gpiozero_button_held_time\">\n            <value name=\"button\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">button</field>\n                </block>\n            </value>\n        </block>\n        <block type = \"gpiozero_button_when_held\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">button</field>\n                </block>\n            </value>\n        </block>\n        <block type = \"gpiozero_button_when_pressed\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">button</field>\n                </block>\n            </value>\n        </block>\n        <block type = \"gpiozero_button_when_released\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">button</field>\n                </block>\n            </value>\n        </block>\n    </category>\n    <category name=\"Light\" colour=\"40\">\n        <block type=\"variables_set\">\n            <field name=\"VAR\">lightSensor</field>\n            <value name=\"VALUE\">\n                <block type=\"gpiozero_light_sensor\">\n                    <value name=\"pin_number\">\n                        <block type=\"gpiozero_pin\"/>\n                    </value>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_light_wait_for_dark\">\n            <value name=\"pin_number\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">lightSensor</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_light_wait_for_light\">\n            <value name=\"pin_number\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">lightSensor</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_light_detected\">\n            <value name=\"pin_number\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">lightSensor</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_light_when_dark\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">lightSensor</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_light_when_light\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">lightSensor</field>\n                </block>\n            </value>\n        </block>\n    </category>\n    <sep />\n    <category name=\"LED\" colour=\"200\">\n        <block type=\"variables_set\">\n            <field name=\"VAR\">ledName</field>\n            <value name=\"VALUE\">\n                <block type=\"gpiozero_led\">\n                    <value name=\"pin\">\n                        <block type=\"gpiozero_pin\">\n                            <field name=\"pin\">0</field>\n                        </block>\n                    </value>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_led_turn_on\">\n            <value name=\"NAME\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">ledName</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_led_turn_off\">\n            <value name=\"NAME\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">ledName</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_led_toggle\">\n            <value name=\"NAME\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">ledName</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_led_blink\">\n            <value name=\"led\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">ledName</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_led_is_lit\">\n            <value name=\"led\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">ledName</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"variables_set\">\n            <field name=\"VAR\">pwmLedName</field>\n            <value name=\"VALUE\">\n                <block type=\"gpiozero_pwm_led\">\n                    <value name=\"pin\">\n                        <block type=\"gpiozero_pin\"/>\n                    </value>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_pwm_on\">\n            <value name=\"pwm_led\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">pwmLedName</field>\n                </block>\n            </value>\n            <value name=\"value\">\n                <block type=\"math_number\"/>\n            </value>\n        </block>\n        <block type=\"gpiozero_pwm_pulse\">\n            <value name=\"pwm_led\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">pwmLedName</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"variables_set\">\n            <field name=\"VAR\">ledName</field>\n            <value name=\"VALUE\">\n                <block type=\"gpiozero_rgb_led\">\n                    <value name=\"color\">\n                        <block type=\"colour_picker\">\n                            <field name=\"COLOUR\">#ff0000</field>\n                        </block>\n                    </value>\n                    <value name=\"red\">\n                        <block type=\"gpiozero_pin\">\n                            <field name=\"pin\">0</field>\n                        </block>\n                    </value>\n                    <value name=\"green\">\n                        <block type=\"gpiozero_pin\">\n                            <field name=\"pin\">1</field>\n                        </block>\n                    </value>\n                    <value name=\"blue\">\n                        <block type=\"gpiozero_pin\">\n                            <field name=\"pin\">2</field>\n                        </block>\n                    </value>\n                </block>\n            </value>\n        </block>\n        <block type=\"variables_set\">\n            <field name=\"VAR\">ledName</field>\n            <value name=\"VALUE\">\n                <block type=\"gpiozero_fine_rgb_led\">\n                    <value name=\"color\">\n                        <block type=\"colour_picker\">\n                            <field name=\"COLOUR\">#ff0000</field>\n                        </block>\n                    </value>\n                    <value name=\"red\">\n                        <block type=\"gpiozero_pin\">\n                            <field name=\"pin\">0</field>\n                        </block>\n                    </value>\n                    <value name=\"green\">\n                        <block type=\"gpiozero_pin\">\n                            <field name=\"pin\">1</field>\n                        </block>\n                    </value>\n                    <value name=\"blue\">\n                        <block type=\"gpiozero_pin\">\n                            <field name=\"pin\">2</field>\n                        </block>\n                    </value>\n                </block>\n            </value>\n        </block>\n    </category>\n    <category name=\"Traffic Light\" colour=\"240\">\n        <block type=\"variables_set\">\n            <field name=\"VAR\">trafficLight</field>\n            <value name=\"VALUE\">\n                <block type=\"gpiozero_trafficlight\">\n                    <value name=\"red\">\n                        <block type=\"gpiozero_pin\"/>\n                    </value>\n                    <value name=\"yellow\">\n                        <block type=\"gpiozero_pin\"/>\n                    </value>\n                    <value name=\"green\">\n                        <block type=\"gpiozero_pin\"/>\n                    </value>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_traffic_light_on\">\n            <value name=\"NAME\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">trafficLight</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_traffic_blink\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">trafficLight</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_traffic_close\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">trafficLight</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_traffic_light_off\">\n            <value name=\"NAME\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">trafficLight</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_pwm_pulse\">\n            <value name=\"pwm_led\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">trafficLight</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_led_toggle\">\n            <value name=\"NAME\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">trafficLight</field>\n                </block>\n            </value>\n        </block>\n    </category>\n    <category name=\"Buzzer\" colour = \"320\">\n        <block type=\"variables_set\">\n            <field name=\"VAR\">buzzerName</field>\n            <value name=\"VALUE\">\n                <block type=\"gpiozero_buzzer\">\n                    <value name=\"pin\">\n                        <block type=\"gpiozero_pin\">\n                            <field name=\"pin\">0</field>\n                        </block>\n                    </value>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_buzzer_beep\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">buzzerName</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_buzzer_on\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">buzzerName</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_buzzer_off\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">buzzerName</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_buzzer_toggle\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">buzzerName</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_buzzer_is_active\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">buzzerName</field>\n                </block>\n            </value>\n        </block>\n    </category>\n    <category name=\"Motors\" colour = \"40\">\n        <block type=\"variables_set\">\n            <field name=\"VAR\">servoMotor</field>\n            <value name=\"VALUE\">\n                <block type=\"gpiozero_servo\">\n                    <value name=\"pin\">\n                        <block type=\"gpiozero_pin\"/>\n                    </value>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_servo_detach\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">servoMotor</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_servo_max\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">servoMotor</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_servo_mid\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">servoMotor</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_servo_min\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">servoMotor</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"gpiozero_servo_value\">\n            <value name=\"pin\">\n                <block type=\"variables_get\">\n                    <field name=\"VAR\">servoMotor</field>\n                </block>\n            </value>\n            <value name=\"value\">\n                <block type=\"math_number\"/>\n            </value>\n        </block>\n    </category>\n    <sep />\n</toolbox>");

/***/ }),

/***/ 529:
/***/ (function(module, exports) {

// DO NOT EDIT THIS FILE, IT IS AUTMATICALLY GENERATED

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;
	// var goog = blockly.goog;

	Blockly.Blocks['gpiozero_pin'] = {
		init: function () {
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([
					['GPIO0', '0'],
					['GPIO1', '1'],
					['GPIO2', '2'],
					['GPIO3', '3'],
					['GPIO4', '4'],
					['GPIO5', '5'],
					['GPIO6', '6'],
					['GPIO7', '7'],
					['GPIO8', '8'],
					['GPIO9', '9'],
					['GPIO10', '10'],
					['GPIO11', '11'],
					['GPIO12', '12'],
					['GPIO13', '13'],
					['GPIO14', '14'],
					['GPIO15', '15'],
					['GPIO16', '16'],
					['GPIO17', '17'],
					['GPIO18', '18'],
					['GPIO19', '19'],
					['GPIO20', '20'],
					['GPIO21', '21'],
					['GPIO22', '22'],
					['GPIO23', '23'],
					['GPIO24', '24'],
					['GPIO25', '25'],
					['GPIO26', '26'],
					['GPIO27', '27'],
				]), 'pin');
			this.setOutput(true, 'gpiozero_pinNumber');
			this.setColour(230);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['gpiozero_led'] = {
		init: function () {
			this.appendValueInput('pin')
				.setCheck(['String', 'gpiozero_pinNumber'])
				.appendField('LED');
			this.setOutput(true, 'LED');
			this.setColour(200);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_output.html#led');
		}
	};

	Blockly.Blocks['gpiozero_rgb_led'] = {
		init: function () {
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_output.html#rgbled');
			this.setColour(200);
			this.appendValueInput('color')
				.appendField('RGB LED')
				.setCheck('Colour');
			this.appendDummyInput()
				.appendField('with pins');
			this.appendValueInput('red')
				.setCheck(['String', 'gpiozero_pinNumber']);
			this.appendValueInput('green')
				.setCheck(['String', 'gpiozero_pinNumber'])
				.appendField('G');
			this.appendValueInput('blue')
				.setCheck(['String', 'gpiozero_pinNumber'])
				.appendField('B');
			this.setInputsInline(true);
			this.setOutput(true, 'RGB_LED');
			this.setTooltip('Set the color on an RGB LED. This will set only the basic colors.');
		}
	};

	Blockly.Blocks['gpiozero_fine_rgb_led'] = {
		init: function () {
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_output.html#rgbled');
			this.setColour(200);
			this.appendValueInput('color')
				.appendField('RGB PWM LED')
				.setCheck('Colour');
			this.appendDummyInput()
				.appendField('with pins');
			this.appendValueInput('red')
				.setCheck(['String', 'gpiozero_pinNumber'])
				.appendField('R');
			this.appendValueInput('green')
				.setCheck(['String', 'gpiozero_pinNumber'])
				.appendField('G');
			this.appendValueInput('blue')
				.setCheck(['String', 'gpiozero_pinNumber'])
				.appendField('B');
			this.setInputsInline(true);
			this.setOutput(true, 'REG_LED');
			this.setTooltip('Set the color on an RGB LED. This will set colors using PWM so the pins need to be able to do that.');
		}
	};

	Blockly.Blocks['gpiozero_servo'] = {
		init: function () {
			this.appendValueInput('pin')
				.setCheck(['String', 'gpiozero_pinNumber'])
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('Servo Motor');
			this.setInputsInline(true);
			this.setOutput(true, 'servo');
			this.setColour(40);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_output.html#servo');
		}
	};

	// Blockly.Blocks['angular_servo'] = {
	//   init: function() {
	//     this.appendValueInput('pin')
	//         .setCheck(['String', 'gpiozero_pinNumber'])
	//         .setAlign(Blockly.ALIGN_RIGHT)
	//         .appendField('Angular Servo Motor');
	//     this.setInputsInline(true);
	//     this.setOutput(true, 'angular_servo');
	//     this.setColour(105);
	//  this.setTooltip('');
	//  this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_output.html#servo');
	//   }
	// };

	Blockly.Blocks['gpiozero_pwm_led'] = {
		init: function () {
			this.appendValueInput('pin')
				.setCheck(['String', 'gpiozero_pinNumber'])
				.appendField('PWM LED');
			this.setOutput(true, 'PWM_LED');
			this.setColour(200);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_output.html#pwmled');
		}
	};

	Blockly.Blocks['gpiozero_button'] = {
		init: function () {
			this.appendValueInput('pin_number')
				.setCheck(['String', 'gpiozero_pinNumber'])
				.appendField('Button');
			this.setOutput(true, 'button');
			this.setColour(0);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#button');
		}
	};

	Blockly.Blocks['gpiozero_button_when_held'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_button_when_pressed'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_button_when_released'] = {
		init: function () {
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


	Blockly.Blocks['gpiozero_button_is_pressed'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_servo_detach'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_servo_max'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_servo_mid'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_servo_min'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_servo_value'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_button_wait_for_release'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_button_held_time'] = {
		init: function () {
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
	Blockly.Blocks['gpiozero_led_blink'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_pwm_on'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_button_wait_for_press'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_pause'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Pause');
			this.setPreviousStatement(true, null);
			this.setColour(320);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['gpiozero_trafficlight'] = {
		init: function () {
			this.appendValueInput('red')
				.setCheck(['String', 'gpiozero_pinNumber'])
				.appendField('Traffic Lights');
			this.appendValueInput('yellow')
				.setCheck(['String', 'gpiozero_pinNumber']);
			this.appendValueInput('green')
				.setCheck(['String', 'gpiozero_pinNumber']);
			this.setOutput(true, 'traffic');
			this.setColour(240);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['gpiozero_led_turn_on'] = {
		init: function () {
			this.appendValueInput('NAME')
				.setCheck(['PWM_LED', 'RGB_LED', 'LED', 'traffic'])
				.appendField('Turn on LED');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(200);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['gpiozero_led_turn_off'] = {
		init: function () {
			this.appendValueInput('NAME')
				.setCheck(['PWM_LED', 'RGB_LED', 'LED', 'traffic'])
				.appendField('Turn off LED');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(200);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['gpiozero_led_toggle'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_led_is_lit'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_traffic_light_on'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_traffic_blink'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_traffic_close'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_pwm_pulse'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_traffic_light_off'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_light_sensor'] = {
		init: function () {
			this.appendValueInput('pin_number')
				.setCheck(['String', 'gpiozero_pinNumber'])
				.appendField('Light Sensor');
			this.setOutput(true, 'light_sensor');
			this.setColour(40);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#gpiozero.LightSensor');
		}
	};

	Blockly.Blocks['gpiozero_light_when_dark'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_light_when_light'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_light_wait_for_dark'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_light_wait_for_light'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_light_detected'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_buzzer'] = {
		init: function () {
			this.appendValueInput('pin')
				.setCheck(['String', 'gpiozero_pinNumber'])
				.appendField('buzzer');
			this.setOutput(true, 'buzzer');
			this.setColour(320);
			this.setTooltip('');
			this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_output.html#buzzer');
		}
	};

	Blockly.Blocks['gpiozero_buzzer_beep'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_buzzer_on'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_buzzer_off'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_buzzer_toggle'] = {
		init: function () {
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

	Blockly.Blocks['gpiozero_buzzer_is_active'] = {
		init: function () {
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
};

/***/ }),

/***/ 530:
/***/ (function(module, exports) {

// DO NOT EDIT THIS FILE, IT IS AUTMATICALLY GENERATED

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;
	// var goog = blockly.goog;

	Blockly.Python.gpiozero_setUp = function() {
		if (!Blockly.Python.definitions_['gpiozero_setUp']) {
			Blockly.Python.definitions_['gpiozero_setUp'] = 'from gpiozero import * \n';
		}
	};

	Blockly.Python.gpiozero_importtime = function() {
		if (!Blockly.Python.definitions_['gpiozero_time']) {
			Blockly.Python.definitions_['gpiozero_time'] = 'from time import * \n';
		}
	};

	Blockly.Python.gpiozero_uniqueName = function(string) {
		return Blockly.Python.variableDB_.getDistinctName(string, Blockly.Generator.NAME_TYPE);
	};

	Blockly.Python['gpiozero_pin'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var dropdown_pin = block.getFieldValue('pin');
		// TODO: Assemble Python into code variable.
		var code = dropdown_pin.toString();
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['gpiozero_led'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'LED(' + value_pin.toString() + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['gpiozero_servo'] = function(block) {
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'Servo(' + value_pin.toString() + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['gpiozero_servo_detach'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin.toString() + '.detach() \n';
		return code;
	};

	Blockly.Python['gpiozero_servo_max'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin.toString() + '.max() \n';
		return code;
	};

	Blockly.Python['gpiozero_servo_mid'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin.toString() + '.mid() \n';
		return code;
	};

	Blockly.Python['gpiozero_servo_min'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin.toString() + '.min() \n';
		return code;
	};


	Blockly.Python['gpiozero_servo_value'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var number_name = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin.toString() + '.value = ' + number_name.toString() + '\n';
		return code;
	};
	// Blockly.Python['gpiozero_angular_servo'] = function(block) {
	//   var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
	//   // TODO: Assemble Python into code variable.
	//   var code = 'Servo(' + value_pin.toString() + ')';
	//   // TODO: Change ORDER_NONE to the correct strength.
	//   return [code, Blockly.Python.ORDER_NONE];
	// };

	Blockly.Python['gpiozero_pwm_led'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_led = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'PWMLED(' + value_led.toString() + ')\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['gpiozero_button'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pin_number = Blockly.Python.valueToCode(block, 'pin_number', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'Button(' + value_pin_number.toString() + ', pull_up = False) \n';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	// Blockly.Python['gpiozero_button_when_held'] = function(block) {
	//     var value_pin_number = Blockly.Python.valueToCode(block, 'pin_number', Blockly.Python.ORDER_ATOMIC);
	//     var value_function = Blockly.Python.valueToCode(block, 'function', Blockly.Python.ORDER_ATOMIC);
	//     // TODO: Assemble Python into code variable.
	//     var code = value_pin_number.toString() + '.when_held = ' + value_function + ' ';
	//     return code;
	// };

	Blockly.Python['gpiozero_button_is_pressed'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_button = Blockly.Python.valueToCode(block, 'button', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_button.toString() + '.is_pressed';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};



	Blockly.Python['gpiozero_button_wait_for_release'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_button = Blockly.Python.valueToCode(block, 'button', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_button.toString() + '.wait_for_release() \n';
		return code;
	};


	Blockly.Python['gpiozero_led_blink'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_led = Blockly.Python.valueToCode(block, 'led', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_led.toString() + '.blink() \n';
		return code;
	};

	Blockly.Python['gpiozero_rgb_led'] = function(block) {
		var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
		var value_red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.setpinmode (value_red, 1);
		var value_green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.setpinmode (value_green, 1);
		var value_blue = Blockly.Python.valueToCode(block, 'blue', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.setpinmode (value_blue, 1);
		// TODO: Assemble Python into code variable.
		// var colorVar = Blockly.Python.variableDB_.getDistinctName(
		// 	'color', Blockly.Variables.NAME_TYPE);
		var code = 'RGBLED ('+value_red+', '+value_green+', '+value_blue+', initial_value=(tuple([int('+value_color+'[i:i + 2], 16) for i in (1, 3, 5)])), pwm=False)';
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['gpiozero_fine_rgb_led'] = function(block) {
		var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
		var value_red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.setpinmode (value_red, 1);
		var value_green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.setpinmode (value_green, 1);
		var value_blue = Blockly.Python.valueToCode(block, 'blue', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.setpinmode (value_blue, 1);
		// TODO: Assemble Python into code variable.
		// var colorVar = Blockly.Python.variableDB_.getDistinctName(
		// 	'color', Blockly.Variables.NAME_TYPE);
		var code = 'RGBLED ('+value_red+', '+value_green+', '+value_blue+', initial_value=(tuple([int('+value_color+'[i:i + 2], 16) for i in (1, 3, 5)])), pwm=True)';
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['gpiozero_button_when_held'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var statements_function = Blockly.Python.statementToCode(block, 'function') || '  pass\n\n';
		var functionName = Blockly.Python.gpiozero_uniqueName('function');
		// TODO: Assemble Python into code variable.
		var code =  '\ndef ' + functionName + '():\n' + statements_function.toString()
				+ value_pin + '.when_held = ' + functionName + '\n\n';
		return code;
	};

	Blockly.Python['gpiozero_button_when_pressed'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var statements_function = Blockly.Python.statementToCode(block, 'function') || '  pass\n\n';
		var functionName = Blockly.Python.gpiozero_uniqueName('function');
		// TODO: Assemble Python into code variable.
		var code =  '\ndef ' + functionName + '():\n' + statements_function.toString()
				+ value_pin + '.when_pressed = ' + functionName + '\n\n';
		return code;
	};

	Blockly.Python['gpiozero_button_when_released'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var statements_function = Blockly.Python.statementToCode(block, 'function') || '  pass\n\n';
		var functionName = Blockly.Python.gpiozero_uniqueName('function');
		// TODO: Assemble Python into code variable.
		var code =  '\ndef ' + functionName + '():\n' + statements_function.toString()
				+ value_pin + '.when_released = ' + functionName + '\n';
		return code;
	};

	Blockly.Python['gpiozero_pwm_on'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pwm_led = Blockly.Python.valueToCode(block, 'pwm_led', Blockly.Python.ORDER_ATOMIC);
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pwm_led.toString() + '.value = ' + value_value.toString() + ' / 255.0\n';
		return code;
	};

	Blockly.Python['gpiozero_button_wait_for_press'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_button = Blockly.Python.valueToCode(block, 'button', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_button.toString() + '.wait_for_press() \n';
		return code;
	};

	Blockly.Python['gpiozero_button_held_time'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_button = Blockly.Python.valueToCode(block, 'button', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_button.toString() + '.held_time';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['gpiozero_pause'] = function(/* block */) {
		Blockly.Python.gpiozero_setUp();
		// TODO: Assemble Python into code variable.
		var code = 'pause() \n';
		return code;
	};

	Blockly.Python['gpiozero_trafficlight'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_ATOMIC);
		var value_yellow = Blockly.Python.valueToCode(block, 'yellow', Blockly.Python.ORDER_ATOMIC);
		var value_green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'TrafficLights( ' + value_red.toString() + ', ' + value_yellow.toString() + ', ' + value_green.toString() + ') ';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['gpiozero_led_turn_on'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_FUNCTION_CALL);
		// TODO: Assemble Python into code variable.
		var code = value_name.toString() + '.on()\n';
		return code;
	};

	Blockly.Python['gpiozero_led_turn_off'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_FUNCTION_CALL);
		// TODO: Assemble Python into code variable.
		var code = value_name.toString() + '.off()\n';
		return code;
	};

	Blockly.Python['gpiozero_led_toggle'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_FUNCTION_CALL);
		// TODO: Assemble Python into code variable.
		var code = value_name.toString() + '.toggle()\n';
		return code;
	};

	Blockly.Python['gpiozero_led_is_lit'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_led = Blockly.Python.valueToCode(block, 'led', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_led.toString() + 'is_lit';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['gpiozero_traffic_light_on'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var dropdown_light = block.getFieldValue('light');
		var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_name.toString() + '.' + dropdown_light.toString() + '.on() \n';
		return code;
	};


	Blockly.Python['gpiozero_traffic_blink'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin.toString() + '.blink() \n';
		return code;
	};

	Blockly.Python['gpiozero_traffic_close'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin.toString() + '.close() \n';
		return code;
	};


	Blockly.Python['gpiozero_pwm_pulse'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pwm_led = Blockly.Python.valueToCode(block, 'pwm_led', Blockly.Python.ORDER_FUNCTION_CALL);
		// TODO: Assemble Python into code variable.
		var code = value_pwm_led.toString() + '.pulse() \n';
		return code;
	};

	Blockly.Python['gpiozero_traffic_light_off'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var dropdown_light = block.getFieldValue('light');
		var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_name.toString() + '.' + dropdown_light.toString() + '.off() \n';
		return code;
	};

	Blockly.Python['gpiozero_start_labnetwork'] = function(/* block */) {
		Blockly.Python.gpiozero_setUp();
		// TODO: Assemble Python into code variable.
		var code = '...\n';
		return code;
	};

	Blockly.Python['gpiozero_lcd_write'] = function(block) {
		Blockly.Python.gpiozero_setUp();
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

	Blockly.Python['gpiozero_light_sensor'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pin_number = Blockly.Python.valueToCode(block, 'pin_number', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'LightSensor(' + value_pin_number.toString() + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['gpiozero_light_when_dark'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var statements_function = Blockly.Python.statementToCode(block, 'function') || '  pass\n\n';
		var functionName = Blockly.Python.gpiozero_uniqueName('function');
		// TODO: Assemble Python into code variable.
		var code =  '\ndef ' + functionName + '():\n' + statements_function.toString()
				+ value_pin + '.when_dark = ' + functionName + '\n\n';
		return code;
	};

	Blockly.Python['gpiozero_light_when_light'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var statements_function = Blockly.Python.statementToCode(block, 'function') || '  pass\n\n';
		var functionName = Blockly.Python.gpiozero_uniqueName('function');
		// TODO: Assemble Python into code variable.
		var code =  '\ndef ' + functionName + '():\n' + statements_function.toString()
				+ value_pin + '.when_light = ' + functionName + '\n\n';
		return code;
	};

	Blockly.Python['gpiozero_light_wait_for_dark'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pin_number = Blockly.Python.valueToCode(block, 'pin_number', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin_number.toString() + '.wait_for_dark() \n';
		return code;
	};

	Blockly.Python['gpiozero_light_wait_for_light'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pin_number = Blockly.Python.valueToCode(block, 'pin_number', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin_number.toString() + '.wait_for_light() \n';
		return code;
	};

	Blockly.Python['gpiozero_light_detected'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pin_number = Blockly.Python.valueToCode(block, 'pin_number', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin_number.toString() + '.light_detected';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['gpiozero_buzzer'] = function(block) {
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'Buzzer(' + value_pin.toString() + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['gpiozero_buzzer_beep'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin.toString() + '.beep() \n';
		return code;
	};

	Blockly.Python['gpiozero_buzzer_on'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin.toString() + '.on() \n';
		return code;
	};

	Blockly.Python['gpiozero_buzzer_off'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin.toString() + '.off() \n';
		return code;
	};

	Blockly.Python['gpiozero_buzzer_toggle'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin.toString() + '.toggle() \n';
		return code;
	};

	Blockly.Python['gpiozero_buzzer_is_active'] = function(block) {
		Blockly.Python.gpiozero_setUp();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin.toString() + '.is_active';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	// Blockly.Python['gpiozero_dht_sensor'] = function(block) {
	//   var dropdown_dropdown = block.getFieldValue('dropdown');
	//   var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
	//   var value_var = Blockly.Python.valueToCode(block, 'var', Blockly.Python.ORDER_ATOMIC);
	//   // TODO: Assemble Python into code variable.
	//   var code = value_var.toString() + ', _ = Adafruit_DHT.read_retry(' + dropdown_dropdown.toString() + ', ' + value_pin.toString() + ')\n';
	//   return code;
	// };


	// //TODO CHANGE TEMP
	// Blockly.Python['gpiozero_dht_sensor_temperature'] = function(block) {
	//   var dropdown_dropdown = block.getFieldValue('dropdown');
	//   var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
	//   var value_var = Blockly.Python.valueToCode(block, 'var', Blockly.Python.ORDER_ATOMIC);
	//   // TODO: Assemble Python into code variable.
	//   var code = ' _, ' + value_var.toString() + ' = Adafruit_DHT.read_retry(' + dropdown_dropdown.toString() + ', ' + value_pin.toString() + ')\n';
	//   return code;
	// };


	Blockly.Python['gpiozero_dht_sensor'] = function(block) {
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'w.DHTsensor(' + value_pin.toString() + ')\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['gpiozero_dht_temperature'] = function(block) {
		var value_dht = Blockly.Python.valueToCode(block, 'dht', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_dht.toString() + '.temperatureRead()\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['gpiozero_dht_humidity'] = function(block) {
		var value_dht = Blockly.Python.valueToCode(block, 'dht', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_dht.toString() + '.humidityRead()\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};
};

/***/ })

}]);