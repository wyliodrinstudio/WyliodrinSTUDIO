(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[30],{

/***/ 523:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var xml_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(507);
/* harmony import */ var xml_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(xml_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var raw_loader_visual_toolbox_xml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(524);



let studio = null;


let blocks = __webpack_require__ (525);
let code = __webpack_require__ (526);

function setup (options, imports, register)
{
	studio = imports;

	let toolbox = xml_js__WEBPACK_IMPORTED_MODULE_0___default.a.xml2js (raw_loader_visual_toolbox_xml__WEBPACK_IMPORTED_MODULE_1__["default"]);

	
	studio.projects.registerLanguagePackage ('python', null, [
		{
			name: 'Adafruit-CharLCD',
			description: 'Python library for accessing Adafruit character LCDs from a Raspberry Pi or BeagleBone Black.'
		}
	]);

	studio.projects.registerLanguagePackage ('python', 'raspberrypi', [
		{
			name: 'RPi.GPIO',
			description: 'A Python module to control the GPIO on a Raspberry Pi'
		}
	]);

	studio.projects.registerLanguagePackage ('python', 'beagleboneblack', [
		{
			name: 'Adafruit_BBIO',
			description: 'Adafruit\'s BeagleBone IO Python Library'
		}
	]);

	studio.editor_visual.registerBlocksDefinitions ('adafruitcharlcd', blocks, code, toolbox, {
		type: 'wyapp',
		board: ['raspberrypi', 'beagleboneblack'],
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

/***/ 524:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<toolbox>\n    <category name=\"Adafruit LCD\" colour=\"260\">\n        <block type=\"adafruit_init_lcd\">\n            <field name=\"rows\">2</field>\n            <value name=\"rs\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">10</field>\n                </block>\n            </value>\n            <value name=\"strobe\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">11</field>\n                </block>\n            </value>\n            <value name=\"backlight\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">12</field>\n                </block>\n            </value>\n            <value name=\"d0\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">5</field>\n                </block>\n            </value>\n            <value name=\"d1\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">6</field>\n                </block>\n            </value>\n            <value name=\"d2\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">7</field>\n                </block>\n            </value>\n            <value name=\"d3\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">9</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"adafruit_clear_lcd\"></block>\n        <block type=\"adafruit_reset_lcd\"></block>\n        <block type=\"adafruit_set_position_lcd\">\n            <value name=\"col\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">1</field>\n                </block>\n            </value>\n            <value name=\"row\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">1</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"adafruit_print_lcd\">\n            <value name=\"text\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">Hey Wyliodrin</field>\n                </block>\n            </value>\n        </block>\n    </category>\n    <sep />\n</toolbox>");

/***/ }),

/***/ 525:
/***/ (function(module, exports) {

// DO NOT EDIT THIS FILE, IT IS AUTMATICALLY GENERATED

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;
	// var goog = blockly.goog;

	Blockly.Blocks['adafruit_init_lcd'] = {
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
			this.appendValueInput('backlight')
				.setCheck('Number')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('Backlight Pin');
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

	Blockly.Blocks['adafruit_clear_lcd'] = {
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

	Blockly.Blocks['adafruit_reset_lcd'] = {
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

	Blockly.Blocks['adafruit_set_position_lcd'] = {
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

	Blockly.Blocks['adafruit_print_lcd'] = {
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

};

/***/ }),

/***/ 526:
/***/ (function(module, exports) {

// DO NOT EDIT THIS FILE, IT IS AUTMATICALLY GENERATED

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;
	// var goog = blockly.goog;

	Blockly.Python.adafruit_lcd_setup = function () {
		if (!Blockly.Python.definitions_['adafruit_lcd_setup']) {
			Blockly.Python.definitions_['adafruit_lcd_setup'] = 'import Adafruit_CharLCD\n';
		}
	};

	Blockly.Python['adafruit_init_lcd'] = function (block) {
		Blockly.Python.adafruit_lcd_setup();
		var lcd = Blockly.Python.variableDB_.getDistinctName(
			'lcd', Blockly.Generator.NAME_TYPE);
		var dropdown_rows = block.getFieldValue('rows');
		var dropdown_cols = block.getFieldValue('cols');
		var value_rs = Blockly.Python.valueToCode(block, 'rs', Blockly.Python.ORDER_ATOMIC);
		var value_strobe = Blockly.Python.valueToCode(block, 'strobe', Blockly.Python.ORDER_ATOMIC);
		var value_backlight = Blockly.Python.valueToCode(block, 'backlight', Blockly.Python.ORDER_ATOMIC);
		var value_d0 = Blockly.Python.valueToCode(block, 'd0', Blockly.Python.ORDER_ATOMIC);
		var value_d1 = Blockly.Python.valueToCode(block, 'd1', Blockly.Python.ORDER_ATOMIC);
		var value_d2 = Blockly.Python.valueToCode(block, 'd2', Blockly.Python.ORDER_ATOMIC);
		var value_d3 = Blockly.Python.valueToCode(block, 'd3', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.adafruit_lcd = lcd;
		Blockly.Python.definitions_['adafruit_lcd_variable'] = lcd + ' = Adafruit_CharLCD.Adafruit_CharLCD (' + value_rs + ', ' + value_strobe + ', ' + value_d0 + ', ' + value_d1 + ', ' + value_d2 + ', ' + value_d3 + ', ' + dropdown_cols + ', ' + dropdown_rows + ', ' + value_backlight + ')\n';
		// TODO: Assemble Python into code variable.
		var code = '';
		return code;
	};

	Blockly.Python['adafruit_clear_lcd'] = function (/* block */) {
		if (Blockly.Python.definitions_['adafruit_lcd_variable']) {
			Blockly.Python.adafruit_lcd_setup();
			// TODO: Assemble Python into code variable.
			var code = Blockly.Python.adafruit_lcd + '.clear()\n';
			return code;
		}
		else throw 'You must init the LCD before using clear lcd';
	};

	Blockly.Python['adafruit_reset_lcd'] = function (/* block */) {
		if (Blockly.Python.definitions_['adafruit_lcd_variable']) {
			Blockly.Python.adafruit_lcd_setup();
			// TODO: Assemble Python into code variable.
			var code = Blockly.Python.adafruit_lcd + '.home()\n';
			return code;
		}
		else throw 'You must init the LCD before using reset lcd';
	};

	Blockly.Python['adafruit_set_position_lcd'] = function (block) {
		Blockly.Python.adafruit_lcd_setup();
		if (Blockly.Python.definitions_['adafruit_lcd_variable']) {
			var value_col = Blockly.Python.valueToCode(block, 'col', Blockly.Python.ORDER_ATOMIC);
			var value_row = Blockly.Python.valueToCode(block, 'row', Blockly.Python.ORDER_ATOMIC);
			// TODO: Assemble Python into code variable.
			var code = Blockly.Python.adafruit_lcd + '.set_cursor(' + value_col + '-1, ' + value_row + '-1)\n';
			return code;
		}
		else throw 'You must init the LCD before using set position lcd';
	};

	Blockly.Python['adafruit_print_lcd'] = function (block) {
		Blockly.Python.adafruit_lcd_setup();
		if (Blockly.Python.definitions_['adafruit_lcd_variable']) {
			var value_text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
			// TODO: Assemble Python into code variable.
			var code = Blockly.Python.adafruit_lcd + '.message (str(' + value_text + '))\n';
			return code;
		}
		else throw 'You must init the LCD before using print lcd';
	};
};

/***/ })

}]);