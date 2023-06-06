(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[35],{

/***/ 545:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var xml_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(507);
/* harmony import */ var xml_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(xml_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var raw_loader_visual_toolbox_xml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(546);



let studio = null;


let blocks_signal = __webpack_require__ (547);

let signal_py = __webpack_require__ (548);
let signal_js = __webpack_require__ (549);

function setup (options, imports, register)
{
	studio = imports;

	let toolbox = xml_js__WEBPACK_IMPORTED_MODULE_0___default.a.xml2js (raw_loader_visual_toolbox_xml__WEBPACK_IMPORTED_MODULE_1__["default"]);
	studio.editor_visual.registerBlocksDefinitions ('signal', [blocks_signal], [signal_py, signal_js], toolbox);

	register (null, {});
}

/***/ }),

/***/ 546:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<toolbox>\n    <category name=\"Signals\" colour=\"330\">\n        <block type=\"wyapp_send_signal\">\n            <value name=\"value_signal\">\n                <block type=\"text\">\n                    <field name=\"TEXT\"></field>\n                </block>\n            </value>\n            <value name=\"value_value\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">0</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"wyapp_send_signal_break\">\n            <value name=\"value_signal\">\n                <block type=\"text\">\n                    <field name=\"TEXT\"></field>\n                </block>\n            </value>\n        </block>\n    </category>\n    <sep />\n</toolbox>");

/***/ }),

/***/ 547:
/***/ (function(module, exports) {

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;

	Blockly.Blocks['wyapp_send_signal'] = {
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

	Blockly.Blocks['wyapp_send_signal_break'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(330);
			this.appendValueInput('value_signal')
				.setCheck('String')
				.appendField('Send signal');
			this.appendDummyInput()	
				.appendField('break');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};
};


/***/ }),

/***/ 548:
/***/ (function(module, exports) {

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;

	Blockly.Python['wyapp_send_signal'] = function (block) {
		var value_value_signal = Blockly.Python.valueToCode(block, 'value_signal', Blockly.Python.ORDER_ATOMIC);
		var value_value_value = Blockly.Python.valueToCode(block, 'value_value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'print("@{}:{}".format ('+value_value_signal + ', ' + value_value_value + '))\n';
		return code;
	};

	Blockly.Python['wyapp_send_signal_break'] = function (block) {
		var value_value_signal = Blockly.Python.valueToCode(block, 'value_signal', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'print("@{}:break".format ('+value_value_signal + '))\n';
		return code;
	};
};

/***/ }),

/***/ 549:
/***/ (function(module, exports) {

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;

	Blockly.JavaScript['wyapp_send_signal'] = function (block) {
		var value_value_signal = Blockly.JavaScript.valueToCode(block, 'value_signal', Blockly.JavaScript.ORDER_ATOMIC);
		var value_value_value = Blockly.JavaScript.valueToCode(block, 'value_value', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'console.log("@"+' + value_value_signal + '":"' + value_value_value + ');\n';
		return code;
	};
	Blockly.JavaScript['wyapp_send_signal_break'] = function (block) {
		var value_value_signal = Blockly.JavaScript.valueToCode(block, 'value_signal', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'console.log("@"+' + value_value_signal + '":break");\n';
		return code;
	};
};

/***/ })

}]);