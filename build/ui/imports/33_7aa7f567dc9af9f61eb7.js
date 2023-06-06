(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[33],{

/***/ 537:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var xml_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(507);
/* harmony import */ var xml_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(xml_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var raw_loader_visual_toolbox_xml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(538);



let studio = null;


let blocks = __webpack_require__ (539);
let code = __webpack_require__ (540);

function setup (options, imports, register)
{
	studio = imports;

	let toolbox = xml_js__WEBPACK_IMPORTED_MODULE_0___default.a.xml2js (raw_loader_visual_toolbox_xml__WEBPACK_IMPORTED_MODULE_1__["default"]);

	studio.editor_visual.registerBlocksDefinitions ('micropython', blocks, code, toolbox, {
		type: 'mp',
	});

	register (null, {});
}

/***/ }),

/***/ 538:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<xml id=\"toolbox\" style=\"display: none\">\n    <category name=\"Peripherals\" colour=\"123\">\n      <block type=\"digital_write\" colour=\"123\">\n        <value name=\"pin\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">25</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"led_on\" colour=\"123\">\n      </block>\n      <block type=\"led_off\" colour=\"123\">\n      </block>\n      <block type=\"digital_read_initialize\" colour=\"123\">\n      </block>\n      <block type=\"digital_read_get_value\" colour=\"123\">\n      </block>\n      <block type=\"analog_read_initialize\" colour=\"123\">\n      </block>\n      <block type=\"analog_read_get_value\" colour=\"123\">\n      </block>\n    </category>\n    <category name=\"Time\" colour=\"240\">\n        <block type=\"wait\" colour=\"240\">\n        </block>\n    </category>\n    <category name=\"Wifi\" colour=\"180\">\n        <block type=\"connect_to_wifi\" colour=\"180\">\n            <value name=\"ssid\">\n                <shadow type=\"text\">\n                    <field name=\"ssid_text\">text</field>\n                </shadow>\n            </value>\n            <value name=\"password\">\n                <shadow type=\"text\">\n                    <field name=\"password_text\">text</field>\n                </shadow>\n            </value>\n        </block>\n    </category>\n    <category name=\"Web communication\" colour=\"180\">\n        <block type=\"send_response\" colour=\"180\">\n            <value name=\"message\"></value>\n        </block>\n        <block type=\"send_response_ok\" colour=\"180\">\n        </block>\n        <block type=\"send_response_error\" colour=\"180\">\n        </block>\n        <block type=\"get_request_content\" colour=\"180\">\n        </block>\n        <block type=\"close_connection\" colour=\"180\">\n        </block>\n        <block type=\"initialize_communication\" colour=\"180\">\n            <value>\n                <shadow type=\"text\">\n                    <field name=\"ip\">ip</field>\n                </shadow>\n            </value>\n            <value>\n                <shadow type=\"text\">\n                    <field name=\"port\">port</field>\n                </shadow>\n            </value>\n        </block>\n        <block type=\"initialize_communication_simple\" colour=\"180\">\n        </block>\n        <block type=\"listen_for_connections\" colour=\"180\">\n            <value name=\"value\">\n\t\t\t\t<block type=\"text\">\n\t\t\t\t\t<field name=\"TEXT\" />\n\t\t\t\t</block>\n\t\t\t</value>\n        </block>\n        <block type=\"request_topic\" colour=\"180\">\n            <value name=\"value\">\n\t\t\t\t<shadow type=\"text\">\n\t\t\t\t\t<field name=\"TEXT\" />\n\t\t\t\t</shadow>\n\t\t\t</value>\n        </block>\n    </category>\n    <category name=\"Thermistor\" colour=\"140\">\n        <block type=\"read_temperature_initialize\" colour=\"140\">\n        </block>\n        <block type=\"get_temperature\" colour=\"140\">\n        </block>\n    </category>\n    <category name=\"Servo\" colour=\"100\">\n        <block type=\"initialize_servo\" colour=\"100\">\n        </block>\n        <block type=\"initialize_servo_multiple\" colour=\"100\">\n        </block>\n        <block type=\"set_angle\" colour=\"100\">\n        </block>\n        <block type=\"set_angle_multiple\" colour=\"100\">\n        </block>\n    </category>\n    <category name=\"Distance measurement\" colour=\"45\">\n        <block type=\"distance_initialize\" colour=\"45\">\n        </block>\n        <block type=\"get_distance\" colour=\"45\">\n        </block>\n    </category>\n    <category name=\"Weather Data\" colour=\"200\">\n        <block type=\"open_weather_initialize\" colour=\"200\">\n            <value name=\"value\">\n                <block type=\"text\">\n                    <field name=\"city_value\">text</field>\n                    <field name=\"api_key_value\">text</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"open_weather_get_data\" colour=\"200\">\n\t    </block>\n  </category>\n</xml>");

/***/ }),

/***/ 539:
/***/ (function(module, exports) {

// DO NOT EDIT THIS FILE, IT IS AUTMATICALLY GENERATED

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;
	// var goog = blockly.goog;

	//Thermistor

	Blockly.Blocks['read_temperature_initialize'] = {
		init:function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(140);
			this.appendDummyInput()
				.appendField('Read temperature from thermistor');
			this.appendValueInput('pin')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('Thermistor pin');
			this.appendValueInput('resistance')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('With resistance');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Initialize thermistor sensor by adding the imports and setting up the pin.');
		}
	};

	Blockly.Blocks['get_temperature'] = {
		init:function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(140);
			this.appendDummyInput()
				.appendField('Get temperature from thermistor in');
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([['celsius', 'c'], ['fahrenheit', 'f']]), 'degrees_type');
			this.setOutput(true);
			this.setTooltip('Return the read temperature value based on the measurement unit selected.');
		}
	};
	
	//Servo

	Blockly.Blocks['initialize_servo'] = {
		init: function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(100);
			this.appendDummyInput()
				.appendField('Initialize SG90 servo');
			this.appendValueInput('pin')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('Servo pin');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Initialize the servo motor by adding the imports and setting up the pins.');
		}
	};

	Blockly.Blocks['initialize_servo_multiple'] = {
		init: function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(100);
			this.appendDummyInput()
				.appendField('Initialize SG90 servo');
			this.appendValueInput('pin')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('Servo pin');
			this.appendDummyInput()
				.appendField('Servo name')
				.appendField(new Blockly.FieldTextInput('servoName1'), 'servo_name');
			this.setInputsInline(false);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Initialize thermistor sensor by adding the imports, setting up the pins and providing a name to indentify the servo motor. This should be used when using multiple servo motors.');
		}
	};

	Blockly.Blocks['set_angle'] = {
		init: function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(100);
			this.appendDummyInput()
				.appendField('Set position to ');
			this.appendValueInput('angle');
			this.appendDummyInput()
				.appendField('degrees');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Sets the position of the servo motor');
		}
	};

	Blockly.Blocks['set_angle_multiple'] = {
		init: function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(100);
			this.appendDummyInput()
				.appendField('Set position of')
				.appendField(new Blockly.FieldTextInput('servoName1'), 'servo_name')
				.appendField('to')
				.appendField(new Blockly.FieldTextInput('degrees'), 'angle')
				.appendField('degrees');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Sets the angle of the given servo motor, identified by it\'s name. This should be used when using multiple servo motors.');
		}
	};

	//Distance measurement
	
	Blockly.Blocks['distance_initialize'] = {
		init: function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(45);
			this.appendDummyInput()
				.appendField('Initialize HCSR04 distance sensor');
			this.appendValueInput('trigger_pin')
				.appendField('Trigger pin')
				.setAlign(Blockly.ALIGN_RIGHT);
			this.appendValueInput('echo_pin')
				.appendField('Echo pin')
				.setAlign(Blockly.ALIGN_RIGHT);		
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Initialize the distance sensor by adding the imports and setting up the pins.');	
		}
	};

	Blockly.Blocks['get_distance'] = {
		init: function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(45);
			this.appendDummyInput()
				.appendField('Get distance in')
				.appendField(new Blockly.FieldDropdown([['mm', 'mm'], ['cm', 'cm']]), 'unit');
			this.setOutput(true);
			this.setTooltip('Returns the distance read value based on the measurement unit selected.');
		}
	};

	//Weather

	Blockly.Blocks['open_weather_initialize'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#write');
			this.setColour(200);
			this.appendDummyInput()
				.appendField('Initialize Open Weather App');
			this.appendDummyInput()
				.appendField('City')
				.appendField(new Blockly.FieldTextInput('city'), 'city_value');
			// this.appendDummyInput()
			// 	.appendField('Country code')
			// 	.appendField(new Blockly.FieldTextInput('country_code'), 'country_code_value');
			this.appendDummyInput()
				.appendField('API key')
				.appendField(new Blockly.FieldTextInput('api_key'), 'api_key_value');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Initializes connection to OpenWeatherMap');
		}
	};
	
	Blockly.Blocks['open_weather_get_data'] = {
		init: function () {
			this.setColour(200);
			this.appendDummyInput()
				.appendField('Get');
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([['coordinates','coord'],['temperature', 'temp'], ['feel-like temperature', 'temp_feels'], ['weather description', 'weather_desc'], ['weather icon name', 'weather_icon']]), 'type');
			this.appendDummyInput()
				.appendField('from OpenWeatherMap');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('Returns the information based on the selected type');
		}
	};

	//Peripheral

	Blockly.Blocks['analog_read_initialize'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(123);
			this.appendValueInput('pin')
				.appendField('Initialize analog input pin');
			this.appendDummyInput()
				.appendField('with pin name')
				.appendField(new Blockly.FieldTextInput('pinName1'), 'pin_name');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setInputsInline(false);
			this.setTooltip('Initialize pin for analog read');
		}
	};

	Blockly.Blocks['analog_read_get_value'] = {
		init: function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(123);
			this.appendDummyInput()
				.appendField('Get analog value from pin')
				.appendField(new Blockly.FieldTextInput('pinName1'), 'pin_name');
			this.setOutput(true);
			this.setTooltip('Analog read on pin');
		}
	};

	Blockly.Blocks['digital_write'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(123);
			this.appendDummyInput()
				.appendField('Set ');
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([['LOW', '0'], ['HIGH', '1']]), 'mode');
			this.appendDummyInput()
				.appendField('pin');
			this.appendValueInput('pin');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setInputsInline(true);
			this.setTooltip('Digital write on pin');
		}
	};

	Blockly.Blocks['digital_read_initialize'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(123);
			this.appendValueInput('pin')
				.appendField('Initialize digital input pin');
			this.appendDummyInput()
				.appendField('with pull')
				.appendField(new Blockly.FieldDropdown([['up', 'up'],['down','down']]),'resistor_type')
				.appendField('resistor');
			this.appendDummyInput()
				.appendField('and pin name')
				.appendField(new Blockly.FieldTextInput('pinName1'), 'pin_name');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setInputsInline(false);
			this.setTooltip('Initialize pin for digital read');
		}
	};

	Blockly.Blocks['digital_read_get_value'] = {
		init: function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(123);
			this.appendDummyInput()
				.appendField('Get digital value from pin')
				.appendField(new Blockly.FieldTextInput('pinName1'), 'pin_name');
			this.setOutput(true);
			this.setTooltip('Digital read on pin');
		}
	};

	Blockly.Blocks['led_on'] = {
		init: function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(123);
			this.appendDummyInput()
				.appendField('LED ON');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Turn on the board\'s led');
		}
	};

	Blockly.Blocks['led_off'] = {
		init: function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(123);
			this.appendDummyInput()
				.appendField('LED OFF');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Turn off the board\'s led');
		}
	};

	//TIME

	Blockly.Blocks['wait'] = {
		init: function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(240);
			this.appendDummyInput()
				.appendField('Wait');
			this.appendValueInput('seconds');
			this.appendDummyInput()
				.appendField('s');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Pauses the execution of the program for the given number of seconds');
		}
	};

	//WIFI

	Blockly.Blocks['connect_to_wifi'] = {
		init: function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(180);
			this.appendDummyInput()
				.appendField('Connect to Wifi');
			this.appendDummyInput()
				.appendField('SSID')
				.appendField(new Blockly.FieldTextInput('ssid'), 'ssid_value');
			this.appendDummyInput()
				.appendField('Password')
				.appendField(new Blockly.FieldTextInput('password'), 'password_value');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Connects the board to wifi');
		}
	};
	
	
	//Web Communication 

	Blockly.Blocks['close_connection'] = {
		init: function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(180);
			this.appendDummyInput()
				.appendField('Close connection');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Closes the currently opened connection');
		}
	};

	Blockly.Blocks['initialize_communication'] = {
		init: function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(180);
			this.appendDummyInput()
				.appendField('Initialize Web Communication');
			this.appendDummyInput()
				.appendField('Host IP')
				.appendField(new Blockly.FieldTextInput('ip'), 'ip_value');
			this.appendDummyInput()
				.appendField('Port')
				.appendField(new Blockly.FieldTextInput('80'), 'port_value');	
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Initializes the communication with the given host');
		}
	};

	Blockly.Blocks['initialize_communication_simple'] = {
		init: function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(180);
			this.appendDummyInput()
				.appendField('Initialize Web Communication');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Initializes the web communicatio');
		}
	};

	Blockly.Blocks['listen_for_connections'] = {
		init: function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(180);
			this.appendDummyInput()
				.appendField('When client connected');
			this.appendStatementInput('statements')
				.appendField('do');
			this.appendStatementInput('onError')
				.appendField('on error');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Is waiting for a client to connect. Performs the statements from \'do\' when a client has connected and the statements in \'on error\' when an error occured');
		}
	};
	
	Blockly.Blocks['send_response'] = {
		init: function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(180);
			this.appendDummyInput()
				.appendField('Send response');
			this.appendDummyInput()
				.appendField('Status code')
				.appendField(new Blockly.FieldTextInput('code'), 'status_code_value');
			this.appendDummyInput()
				.appendField('Content type')
				.appendField(new Blockly.FieldDropdown([['text', '0'], ['html', '1'], ['json', '2']]), 'content_type_value');
			this.appendValueInput('message_value')
				.appendField('Message');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Sends a response back to the client');
		}
	};

	
	Blockly.Blocks['send_response_error'] = {
		init: function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(180);
			this.appendDummyInput()
				.appendField('Send error response');
			this.appendDummyInput()
				.appendField('Content type')
				.appendField(new Blockly.FieldDropdown([['text', '0'], ['html', '1'], ['json', '2']]), 'content_type_value');
			this.appendValueInput('message_value')
				.appendField('Message');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Sends an error response back to the client');
		}
	};

	
	Blockly.Blocks['send_response_ok'] = {
		init: function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(180);
			this.appendDummyInput()
				.appendField('Send success response');
			this.appendDummyInput()
				.appendField('Content type')
				.appendField(new Blockly.FieldDropdown([['text', '0'], ['html', '1'], ['json', '2']]), 'content_type_value');
			this.appendValueInput('message_value')
				.appendField('Message');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Sends a success response back to the client');
		}
	};


	Blockly.Blocks['get_request_content'] = {
		init: function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(180);
			this.appendDummyInput()
				.appendField('Get request content');
			this.setOutput(true, 'String');
			this.setTooltip('Returns the received request\'s content');
		}
	};

	Blockly.Blocks['request_topic'] = {
		init: function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(180);
			this.appendDummyInput()
				.appendField('request topic is')
				.appendField(new Blockly.FieldTextInput('text'), 'text_value');
			this.setInputsInline(true);
			this.setOutput(true, 'Boolean');
			this.setTooltip('Returns true if the request contains the given string, false otherwise.');
		}
	};

};

/***/ }),

/***/ 540:
/***/ (function(module, exports) {

// DO NOT EDIT THIS FILE, IT IS AUTMATICALLY GENERATED

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;
	// var goog = blockly.goog;

	Blockly.Python.import_urequests = function() {
		if (!Blockly.Python.definitions_['import_urequests']) {
			Blockly.Python.definitions_['import_urequests'] = 'import urequests\n';
		}
		var val_city= Blockly.Python.variableDB_.getDistinctName('val_city', Blockly.Generator.NAME_TYPE);
		Blockly.Python.val_city = val_city;
		// var val_country_code= Blockly.Python.variableDB_.getDistinctName('val_country_code', Blockly.Generator.NAME_TYPE);
		// Blockly.Python.val_country_code = val_country_code;
		var val_api_key= Blockly.Python.variableDB_.getDistinctName('val_api_key', Blockly.Generator.NAME_TYPE);
		Blockly.Python.val_api_key = val_api_key;
	};

	//Peripherals

	Blockly.Python.import_machine = function () {
		if (!Blockly.Python.definitions_['import_machine']) {
			Blockly.Python.definitions_['import_machine'] = 'import machine\n';
		}
	};

	Blockly.Python['analog_read_initialize'] = function(block) {
		Blockly.Python.import_machine();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var pin_name = block.getFieldValue('pin_name').toString();

		var code = pin_name + ' = machine.ADC(' + value_pin + ')\n';
		return code;
	};

	Blockly.Python['analog_read_get_value'] = function(block) {
		var pin_name = block.getFieldValue('pin_name').toString();

		var code = pin_name + '.read_u16()';
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['digital_read_initialize'] = function (block) {
		Blockly.Python.import_machine();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var resistor_type = block.getFieldValue('resistor_type').toString().toUpperCase();
		var pin_name = block.getFieldValue('pin_name').toString();

		var code = pin_name + ' = machine.Pin(' + value_pin + ', machine.Pin.IN, machine.Pin.PULL_' + resistor_type + ')\n';
		return code;
	};

	Blockly.Python['digital_read_get_value'] = function(block) {
		var pin_name = block.getFieldValue('pin_name').toString();

		var code = pin_name + '.value()';
		return [code,Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['digital_write'] = function (block) {
		Blockly.Python.import_machine();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var value_mode = parseInt(block.getFieldValue('mode'));
		// TODO: Assemble Python into code variable.
		var code = 'machine.Pin('+ value_pin + ', machine.Pin.OUT, value=' + value_mode + ')\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return code;
	};

	Blockly.Python['led_on'] = function () {
		Blockly.Python.import_machine();

		var code = 'machine.Pin("LED", machine.Pin.OUT, value=1)\n';

		return code;
	};

	Blockly.Python['led_off'] = function () {
		Blockly.Python.import_machine();

		var code = 'machine.Pin("LED", machine.Pin.OUT, value=0)\n';

		return code;
	};

	//Time

	Blockly.Python['wait'] = function (block) {
		Blockly.Python.import_time();
		var seconds_value = Blockly.Python.valueToCode(block, 'seconds', Blockly.Python.ORDER_ATOMIC);

		var code = 'time.sleep('+ seconds_value + ')\n';
		return code;
	};

	//Thermistor

	Blockly.Python.import_math = function() {
		if(!Blockly.Python.definitions_['import_math']) {
			Blockly.Python.definitions_['import_math'] = 'import math\n';
		}
	};

	Blockly.Python.get_thermistor_temperature = function() {
		if(!Blockly.Python.definitions_['get_temperature']) {
			var code = 'def getTemperature(sensor, type):\n\t';
			code += Blockly.Python.resistance + ' = ' + Blockly.Python.resistance_value + '\n\t';
			code += 'c1 = 1.009249522e-03\n\t';
			code += 'c2 = 2.378405444e-04\n\t';
			code += 'c3 = 2.019202697e-07\n\t';

			code += 'reading = sensor.read_u16()\n\t';
			code += 'R2 = ' + Blockly.Python.resistance + ' * (65535 / reading - 1.0)\n\t';
			code += 'logR2 = math.log(R2)\n\t';
			code += 'T = (1.0 / (c1 + c2*logR2 + c3*logR2*logR2*logR2))\n\t';
			code += 'Tc = T - 273.15\n\t';
			code += 'Tf = (Tc * 9.0)/ 5.0 + 32.0\n\t';
			code += 'if type == "c": \n\t\t';
			code += 'return Tc\n\t';
			code += 'else:\n\t\t';
			code += 'return Tf\n';

			Blockly.Python.definitions_['get_temperature'] = code;
		}
	};

	Blockly.Python['read_temperature_initialize'] = function (block) {
		Blockly.Python.import_machine();
		var pin_value = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);

		var thermistor_sensor = Blockly.Python.variableDB_.getDistinctName('thermistor_sensor',Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.thermistor_sensor = thermistor_sensor;

		var resistance = Blockly.Python.variableDB_.getDistinctName('resistance', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.resistance = resistance;
		Blockly.Python.resistance_value = Blockly.Python.valueToCode(block, 'resistance', Blockly.Python.ORDER_ATOMIC);
	

		var code = Blockly.Python.thermistor_sensor + ' = machine.ADC(' + pin_value + ')\n';
		return code;
	};

	Blockly.Python['get_temperature'] = function (block) {
		var type = block.getFieldValue('degrees_type').toString();
		Blockly.Python.import_math();
		Blockly.Python.get_thermistor_temperature();

		var code = 'getTemperature(' + Blockly.Python.thermistor_sensor + ', "' + type + '")';

		return [code, Blockly.Python.ORDER_NONE];
	};

	//Servo

	Blockly.Python.get_duty = function() {
		if(!Blockly.Python.definitions_['get_duty']) {
			var code = 'def getDuty(degrees):\n\t';
			code += 'if degrees > 180: degrees=180\n\t';
			code += 'if degrees < 0: degrees=0\n\t';
			code += 'maxDuty=9000\n\t';
			code += 'minDuty=1000\n\t';
			code += 'newDuty=minDuty+(maxDuty-minDuty)*(degrees/180)\n\t';
			code += 'return int(newDuty)\n';

			Blockly.Python.definitions_['servo_method'] = code;
		}
	};
	
	Blockly.Python['initialize_servo'] = function (block) {
		Blockly.Python.import_machine();
		var pin_value = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);

		var servo_pin = Blockly.Python.variableDB_.getDistinctName('servo_pin',Blockly.Python.NAME_TYPE);
		Blockly.Python.servo_pin = servo_pin;

		var code = Blockly.Python.servo_pin + ' = machine.PWM(machine.Pin(' + pin_value + '))\n';
		code += Blockly.Python.servo_pin + '.freq(50)\n';

		return code;
	};
	
	Blockly.Python['initialize_servo_multiple'] = function (block) {
		Blockly.Python.import_machine();
		var pin_value = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var servo_name = block.getFieldValue('servo_name').toString();

		var code = servo_name + ' = machine.PWM(machine.Pin(' + pin_value + '))\n';
		code += servo_name + '.freq(50)\n';

		return code;
	};

	Blockly.Python['set_angle'] = function (block) {
		var angle_value = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.get_duty();

		var code = Blockly.Python.servo_pin + '.duty_u16(getDuty(' + angle_value + '))\n';
		return code; 
	};

	Blockly.Python['set_angle_multiple'] = function (block) {
		var angle_value = block.getFieldValue('angle').toString();
		var servo_name = block.getFieldValue('servo_name').toString();
		Blockly.Python.get_duty();

		var code = servo_name + '.duty_u16(getDuty(' + angle_value + '))\n';
		return code; 
	};

	//Distance measurement

	Blockly.Python.compute_distance = function() {
		if(!Blockly.Python.definitions_['compute_distance']) {
			var code = 'def getDistance():\n\t';
			code += Blockly.Python.trigger_pin_name + '.low()\n\t';
			code += 'time.sleep_us(2)\n\t';
			code += Blockly.Python.trigger_pin_name + '.high()\n\t';
			code += 'time.sleep_us(5)\n\t';
			code += Blockly.Python.trigger_pin_name + '.low()\n\t';
			code += 'while ' + Blockly.Python.echo_pin_name + '.value() == 0:\n\t\t';
			code += 'signaloff = time.ticks_us()\n\t';
			code += 'while ' + Blockly.Python.echo_pin_name + '.value() == 1:\n\t\t';
			code += 'signalon = time.ticks_us()\n\t';
			code += 'timepassed = signalon - signaloff\n\t';
			code += 'distance = (timepassed * 0.0343) / 2\n\t';
			code += 'return distance\n';

			Blockly.Python.definitions_['compute_distance'] = code;
		}
	};

	Blockly.Python['distance_initialize'] = function(block) {
		Blockly.Python.import_machine();
		var trigger_pin_value = Blockly.Python.valueToCode(block, 'trigger_pin', Blockly.Python.ORDER_ATOMIC);
		var echo_pin = Blockly.Python.valueToCode(block, 'echo_pin', Blockly.Python.ORDER_ATOMIC);

		Blockly.Python.trigger_pin_name =  Blockly.Python.variableDB_.getDistinctName('trigger_pin', Blockly.Generator.NAME_TYPE);
		Blockly.Python.trigger_pin_value = trigger_pin_value;

		Blockly.Python.echo_pin_name = Blockly.Python.variableDB_.getDistinctName('echo_pin', Blockly.Generator.NAME_TYPE);
		Blockly.Python.echo_pin_value = echo_pin;

		var code = Blockly.Python.trigger_pin_name + ' = machine.Pin(' + Blockly.Python.trigger_pin_value + ', machine.Pin.OUT)\n';
		code += Blockly.Python.echo_pin_name + ' = machine.Pin(' + Blockly.Python.echo_pin_value + ', machine.Pin.IN)\n';

		return code;
	};

	Blockly.Python['get_distance'] = function(block) {
		Blockly.Python.compute_distance();
		var unit = block.getFieldValue('unit');

		var code = '';

		switch(unit){
			case 'mm':
				code = 'getDistance()*10';
				break;
			case 'cm':
				code = 'getDistance()';
				break;
		}

		return [code,Blockly.Python.ORDER_NONE];
	};
	
	//Weather

	Blockly.Python['open_weather_initialize'] = function (block) {
		Blockly.Python.import_urequests();
		Blockly.Python.import_json();
		// TODO: Assemble Python into code variable.
		Blockly.Python.val_city = block.getFieldValue('city_value').toString();
		Blockly.Python.val_api_key = block.getFieldValue('api_key_value').toString();
		// TODO: Change ORDER_NONE to the correct strength.
		var code = 'URL = "https://api.openweathermap.org/data/2.5/weather?q=' + Blockly.Python.val_city + '&appid=' + Blockly.Python.val_api_key + '"\n';
		code += 'r = urequests.get(URL)\n';
		code += 'if r.status_code == 200:\n\t';
		code += 'data = r.json()\n\t';
		return code;
	};

	Blockly.Python['open_weather_get_data'] = function (block) {
		var type_value = block.getFieldValue('type');
		var code = 'data';

		switch(type_value){
			case 'temp':
				code += '[\'main\'][\'temp\']';
				break;
			case 'temp_feels':
				code += '[\'main\'][\'feels_like\']';
				break;
			case 'weather_desc': 
				code += '[\'weather\'][0][\'description\']';
				break;
			case 'weather_icon':
				code += '[\'weather\'][0][\'icon\']';
				break;
			case 'coord': 
				code += '[\'coord\']';
				break;
		}

		return [code, Blockly.Python.ORDER_NONE];
	};
	
	//WIFI

	Blockly.Python.import_time = function() {
		if (!Blockly.Python.definitions_['import_time']) {
			Blockly.Python.definitions_['import_time'] = 'import time\n';
		}
	};

	Blockly.Python.import_network = function () {
		if (!Blockly.Python.definitions_['import_network']) {
			Blockly.Python.definitions_['import_network'] = 'import network\n';
		}
	};

	Blockly.Python['connect_to_wifi'] = function (block) {
		Blockly.Python.import_network();
		Blockly.Python.import_time();
		var ssid_value = block.getFieldValue('ssid_value').toString();
		var password_value = block.getFieldValue('password_value').toString();
		// TODO: Assemble Python into code variable.
		var code = 'wlan = network.WLAN(network.STA_IF)\n';
		code += 'wlan.active(True)\n';
		code += 'wlan.connect(\'' + ssid_value + '\', \'' + password_value + '\')\n';
		code += '\n';
		code += 'while not wlan.isconnected() and wlan.status() >= 0:\n\t';
		code += 'print("Waiting to connect:")\n\t';
		code += 'time.sleep(1)\n\t';
		code += '\n';
		code += 'ip = wlan.ifconfig()\n';
		code += 'print(ip[0])\n';
		code += '\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return code;
	};

	//Web communication

	Blockly.Python.import_socket = function () {
		if (!Blockly.Python.definitions_['import_socket']) {
			Blockly.Python.definitions_['import_socket'] = 'import socket\n';
		}
	};

	Blockly.Python['close_connection'] = function() {
		Blockly.Python.import_socket();

		var code = 'c1.close()\n';
		return code;
	};

	Blockly.Python['initialize_communication'] = function(block) {
		Blockly.Python.import_socket();

		var host_ip_value = block.getFieldValue('ip_value').toString();
		var port_value = block.getFieldValue('port_value').toString();
		// TODO: Assemble Python into code variable.
		var code = 'addr = socket.getaddrinfo(\'' + host_ip_value + '\',' + port_value + ')[0][-1]\n';
		code += 's = socket.socket()\n';
		code += 's.bind(addr)\n';
		code += 's.listen(1)\n';  //dc 1??? 
		code += 'print(\'listening on\', addr)\n';
		code += '\n';
		return code;
	};

	Blockly.Python['initialize_communication_simple'] = function(block) {
		Blockly.Python.import_socket();

		// TODO: Assemble Python into code variable.
		var code = 'addr = socket.getaddrinfo(\'0.0.0.0\', 80)[0][-1]\n';
		code += 's = socket.socket()\n';
		code += 's.bind(addr)\n';
		code += 's.listen(1)\n'; 
		code += 'print(\'listening on\', addr)\n';
		code += '\n';
		return code;
	};

	Blockly.Python['listen_for_connections'] = function(block) {
		Blockly.Python.import_socket();

		var do_statements = Blockly.Python.statementToCode(block, 'statements');
		var on_error_statements = Blockly.Python.statementToCode(block, 'onError');

		var do_function_name = Blockly.Python.variableDB_.getDistinctName('statements', Blockly.Generator.NAME_TYPE);
		var error_function_name = Blockly.Python.variableDB_.getDistinctName('onError', Blockly.Generator.NAME_TYPE);

		var code = 'def ' + do_function_name + '():\n' + do_statements + '\n';
		code += '\n';
		code += 'def ' + error_function_name + '():\n' + on_error_statements + '\n';
		code += '\n';

		code += 'while True:\n\t';
		code += 'try:\n\t\t';
		code += 'c1, addr = s.accept()\n\t\t';
		code += 'print(\'client connected from\', addr)\n\t\t';
		code += 'c1_request = c1.recv(1024)\n\t\t';
		code += 'try:\n\t\t\t';
		code += do_function_name + '()\n\t\t';
		code += 'except OSError as e:\n\t\t\t';
		code += error_function_name + '()\n\t';
		code += 'except OSError as e:\n\t\t';
		code += 'c1.close()\n\t\t';
		code += 'print(\'Connection closed\')\n';
		return code;
	};
	
	Blockly.Python['send_response'] = function(block) {
		Blockly.Python.import_socket();

		var status_code_value = block.getFieldValue('status_code_value').toString();
		var content_type_value = parseInt(block.getFieldValue('content_type_value'));
		var message_value = Blockly.Python.valueToCode(block, 'message_value', Blockly.Python.ORDER_ATOMIC);
		var status_message = '';

		if(content_type_value == 0) {
			content_type_value = 'text/plain';
		}else if (content_type_value == 1) {
			content_type_value = 'text/html';
		} else if (content_type_value == 2) {
			content_type_value = 'text/json';
		}

		if(status_code_value == 200) {
			status_message = 'OK';
		} else if(status_code_value == 404) {
			status_message = 'Not Found';
		} else if(status_code_value == 403) {
			status_message = 'Forbidden';
		}

		var code = 'c1.send(\'HTTP/1.0 ' + status_code_value + ' ' + status_message + '\\r\\nContent-type: ' + content_type_value + '\\r\\n\\r\\n\')\n';
		code += 'c1.send(' + message_value + ')\n';
		code += 'c1.close()\n';
		
		return code;
	};

	Blockly.Python['send_response_ok'] = function(block) {
		Blockly.Python.import_socket();

		var content_type_value = parseInt(block.getFieldValue('content_type_value'));
		var message_value = Blockly.Python.valueToCode(block, 'message_value', Blockly.Python.ORDER_ATOMIC);
		var status_message = 'OK';
		var status_code_value = 200;

		if(content_type_value == 0) {
			content_type_value = 'text/plain';
		}else if (content_type_value == 1) {
			content_type_value = 'text/html';
		} else if (content_type_value == 2) {
			content_type_value = 'text/json';
		}

		var code = 'c1.send(\'HTTP/1.0 ' + status_code_value + ' ' + status_message + '\\r\\nContent-type: ' + content_type_value + '\\r\\n\\r\\n\')\n';
		code += 'c1.send(' + message_value + ')\n';
		code += 'c1.close()\n';
		
		return code;
	};

	Blockly.Python['send_response_error'] = function(block) {
		Blockly.Python.import_socket();

		var content_type_value = parseInt(block.getFieldValue('content_type_value'));
		var message_value = Blockly.Python.valueToCode(block, 'message_value', Blockly.Python.ORDER_ATOMIC);
		var status_message = '';

		if(content_type_value == 0) {
			content_type_value = 'text/plain';
		}else if (content_type_value == 1) {
			content_type_value = 'text/html';
		} else if (content_type_value == 2) {
			content_type_value = 'text/json';
		}

		var status_code_value = 404;
		var status_message = 'Not found';

		var code = 'c1.send(\'HTTP/1.0 ' + status_code_value + ' ' + status_message + '\\r\\nContent-type: ' + content_type_value + '\\r\\n\\r\\n\')\n';
		code += 'c1.send(' + message_value + ')\n';
		code += 'c1.close()\n';
		
		return code;
	};

	Blockly.Python['get_request_content'] = function() {
		Blockly.Python.import_socket();
		
		var code = 'str(c1_request)';
		return [code,Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['request_topic'] = function(block) {
		Blockly.Python.import_socket();
		var text_value = block.getFieldValue('text_value').toString();
		
		var code = 'str(c1_request).find(\'/' + text_value + ' \') != -1';
		return [code, Blockly.Python.ORDER_NONE];
	};
};

/***/ })

}]);