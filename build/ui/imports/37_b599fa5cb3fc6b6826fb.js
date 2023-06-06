(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[37],{

/***/ 554:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var xml_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(507);
/* harmony import */ var xml_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(xml_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var raw_loader_visual_toolbox_xml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(555);



let studio = null;


let blocks_date_time = __webpack_require__ (556);
let blocks_http = __webpack_require__ (557);

let code_date_time_js = __webpack_require__ (558);
let code_http_js = __webpack_require__ (559);

let code_date_time_py = __webpack_require__ (560);
let code_http_py = __webpack_require__ (561);

function setup (options, imports, register)
{
	studio = imports;

	let toolbox = xml_js__WEBPACK_IMPORTED_MODULE_0___default.a.xml2js (raw_loader_visual_toolbox_xml__WEBPACK_IMPORTED_MODULE_1__["default"]);
	studio.editor_visual.registerBlocksDefinitions ('wyapp', [blocks_date_time, blocks_http], [code_date_time_py, code_date_time_js, code_http_py, code_http_js], toolbox, {
		type: 'wyapp'
	});

	register (null, {});
}

/***/ }),

/***/ 555:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<toolbox>\n    <category name=\"Date and Time\" colour=\"180\">\n        <block type=\"get_date\"></block>\n        <block type=\"get_time\"></block>\n        <block type=\"delay\">\n            <value name=\"millis\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">1000</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"format_numbers\"></block>\n    </category>\n    <category name=\"HTTP\" colour=\"230\">\n        <block type=\"variables_set\" id=\"4\" inline=\"true\" x=\"70\" y=\"47\">\n        <field name=\"VAR\">http response</field>\n        <value name=\"VALUE\">\n            <block type=\"http_get\">\n            <value name=\"link\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">http://</field>\n                </block>\n            </value>\n            </block>\n        </value>\n        </block>\n        <block type=\"variables_set\" id=\"4\" inline=\"true\" x=\"70\" y=\"47\">\n        <field name=\"VAR\">http response</field>\n        <value name=\"VALUE\">\n            <block type=\"http_post\">\n            <value name=\"link\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">http://</field>\n                </block>\n            </value>\n            <value name=\"data\">\n                <block type=\"dicts_create_with\">\n                </block>\n            </value>\n            </block>\n            </value>\n        </block>\n        <block type=\"http_format\">\n        <value name=\"data\">\n            <block type=\"variables_get\">\n                <field name=\"VAR\">http response</field>\n            </block>\n        </value>\n        </block>\n    </category>\n    <sep />\n</toolbox>");

/***/ }),

/***/ 556:
/***/ (function(module, exports) {

module.exports = function (blockly) {
	let Blockly = blockly.Blockly;

	Blockly.Blocks['get_time'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(180);
			this.appendDummyInput()
				.appendField('Get')
				.appendField(new Blockly.FieldDropdown([['hour', '0'], ['minute', '1'], ['second', '2']]), 'NAME')
				.appendField('of day');
			this.setInputsInline(true);
			this.setOutput(true, 'Number');
			this.setTooltip('');
		}
	};

	Blockly.Blocks['get_date'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(180);
			this.appendDummyInput()
				.appendField('Get')
				.appendField(new Blockly.FieldDropdown([['day of week', '0'], ['day', '1'], ['month', '2'], ['year', '3']]), 'NAME');
			this.setInputsInline(true);
			this.setOutput(true, 'Number');
			this.setTooltip('');
		}
	};

	Blockly.Blocks['delay'] = {
		init: function() {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#delay');
			this.setColour(180);
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

	Blockly.Blocks['format_numbers'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(180);
			this.appendValueInput('number')
				.appendField('Format')
				.appendField(new Blockly.FieldDropdown([['two digits with zeros', '0'], ['two digits with spaces', '1']]), 'NAME')
				.setCheck('Number')
				.appendField('number');
			this.setInputsInline(false);
			this.setOutput(true, 'String');
			this.setTooltip('');
		}
	};
};

/***/ }),

/***/ 557:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (blockly) {
	let Blockly = blockly.Blockly;

	Blockly.Blocks['http_get'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(230);
			this.appendDummyInput()
				.appendField('HTTP')
				.appendField(new Blockly.FieldDropdown([['GET', 'get'], ['DELETE', 'delete'], ['OPTIONS', 'options'], ['HEAD', 'head']]), 'method');
			this.appendValueInput('link')
				.appendField('link');
			this.setInputsInline(true);
			this.setTooltip('');
			this.setOutput(true, 'http');
		}
	};

	Blockly.Blocks['http_post'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(230);
			this.appendDummyInput()
				.appendField('HTTP')
				.appendField(new Blockly.FieldDropdown([['POST', 'post'], ['PUT', 'put']]), 'method');
			this.appendValueInput('link')
				.appendField('link');
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([['form', 'data'], ['json', 'json']]), 'format');
			this.appendValueInput('data')
				.appendField('data');
			this.setInputsInline(true);
			this.setTooltip('');
			this.setOutput(true, 'http');
		}
	};

	Blockly.Blocks['http_format'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(230);
			this.appendDummyInput()
				.appendField('HTTP response as')
				.appendField(new Blockly.FieldDropdown([['text', 'text'], ['raw', 'content'], ['JSON', 'json()']]), 'format');
			this.appendValueInput('data')
				.appendField('data')
				.setCheck('http');
			this.setInputsInline(true);
			this.setTooltip('');
			this.setOutput(true);
		}
	};
};

/***/ }),

/***/ 558:
/***/ (function(module, exports) {

module.exports = function (blockly) {
	let Blockly = blockly.Blockly;

	Blockly.JavaScript['get_time'] = function (block) {
		var dropdown_name = block.getFieldValue('NAME');
		// TODO: Assemble JavaScript into code variable.
		var code = '';
		var type = parseInt(dropdown_name);
		if (type == 0) {
			code = 'new Date().getHours()';
		}
		else if (type == 1) {
			code = 'new Date().getMinutes()';
		}
		else {
			code = 'new Date().getSeconds()';
		}
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['get_date'] = function (block) {
		var dropdown_name = block.getFieldValue('NAME');
		// TODO: Assemble JavaScript into code variable.
		var code = '';
		var type = parseInt(dropdown_name);
		if (type == 0) {
			code = 'new Date().getDate()';
		}
		else if (type == 1) {
			code = '(new Date().getDay()+1)';
		}
		else if (type == 2) {
			code = '(new Date().getMonth()+1)';
		}
		else {
			code = 'new Date().getFullYear()';
		}
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['delay'] = function(/* block */) {
		var code = '// the delay function is not in javascript\n';
		return code;
	};

	Blockly.JavaScript['format_numbers'] = function (block) {
		var dropdown_name = block.getFieldValue('NAME');
		var value_number = Blockly.Python.valueToCode(block, 'number', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		Blockly.Python.datetime();
		var type = parseInt(dropdown_name);
		var code = '';
		if (type == 0) {
			code = '(' + value_number + '<10?"0"+' + value_number + ':' + value_number + ')';
		}
		else if (type == 1) {
			code = '(' + value_number + '<10?" "+' + value_number + ':' + value_number + ')';
		}
		else {
			code = value_number;
		}

		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};
};


/***/ }),

/***/ 559:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (blockly) {
	let Blockly = blockly.Blockly;

	Blockly.JavaScript['http_get'] = function (/* block */) {
		// // TODO: Assemble Python into code variable.
		var code;
		Blockly.JavaScript.NoSupported('http');
		code = '/* http_get block not supported in JavaScript */';
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['http_post'] = function (/* block */) {
		// // TODO: Assemble Python into code variable.
		var code;
		Blockly.JavaScript.NoSupported('http');
		code = '/* http_post block not supported in JavaScript */';
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['http_format'] = function (/* block */) {
		// // TODO: Assemble Python into code variable.
		var code;
		Blockly.JavaScript.NoSupported('http');
		code = '/* http_format block not supported in JavaScript */';
		return [code, Blockly.JavaScript.ORDER_NONE];
	};
};

/***/ }),

/***/ 560:
/***/ (function(module, exports) {

module.exports = function (blockly) {
	let Blockly = blockly.Blockly;

	Blockly.Python.importtime = function ()
	{
		if (!Blockly.Python.definitions_['import_time'])
		{
			Blockly.Python.definitions_['import_time'] = 'from time import *\n';
		}
	};

	Blockly.Python.datetime = function () {
		if (!Blockly.Python.definitions_['import_datetime']) {
			Blockly.Python.definitions_['import_datetime'] = 'from datetime import *\n';
		}
	};

	Blockly.Python['get_time'] = function (block) {
		var dropdown_name = block.getFieldValue('NAME');
		// TODO: Assemble Python into code variable.
		Blockly.Python.datetime();
		var type = parseInt(dropdown_name);
		var code = '';
		if (type == 0) {
			code = 'datetime.now().hour';
		}
		else if (type == 1) {
			code = 'datetime.now().minute';
		}
		else {
			code = 'datetime.now().second';
		}

		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['get_date'] = function (block) {
		var dropdown_name = block.getFieldValue('NAME');
		// TODO: Assemble Python into code variable.
		Blockly.Python.datetime();
		var type = parseInt(dropdown_name);
		var code = '';
		if (type == 0) {
			code = '(datetime.now().weekday()+1)';
		}
		else if (type == 1) {
			code = 'datetime.now().day';
		}
		else if (type == 2) {
			code = 'datetime.now().month';
		}
		else {
			code = 'datetime.now().year';
		}

		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['format_numbers'] = function (block) {
		var dropdown_name = block.getFieldValue('NAME');
		var value_number = Blockly.Python.valueToCode(block, 'number', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		Blockly.Python.datetime();
		var type = parseInt(dropdown_name);
		var code = '';
		if (type == 0) {
			code = 'str(' + value_number + ').zfill(2)';
		}
		else if (type == 1) {
			code = 'str(' + value_number + ').rjust(2)';
		}
		else {
			code = value_number;
		}

		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['delay'] = function(block) {
		Blockly.Python.importtime ();
		var value_millis = Blockly.Python.valueToCode(block, 'millis', Blockly.Python.ORDER_ATOMIC);
		var type = parseInt (block.getFieldValue('type'));
		if (isNaN(type)) type = 0;
		// TODO: Assemble Python into code variable.
		var code = '';
		if (type === 0)
		{
			code = 'sleep (('+value_millis+')/1000.0'+')\n';
		}
		else if (type === 1)
		{
			code = 'sleep (('+value_millis+')/1000000.0)\n';
		}
		else
		{
			code = 'sleep ('+value_millis+')\n';
		}
		return code;
	};
};

/***/ }),

/***/ 561:
/***/ (function(module, exports) {

module.exports = function (blockly) {
	let Blockly = blockly.Blockly;

	Blockly.Python.import_requests = function () {
		if (!Blockly.Python.definitions_['requests']) {
			Blockly.Python.definitions_['requests'] = 'import requests';
		}
	};

	Blockly.Python['http_get'] = function (block) {
		var value_method = block.getFieldValue('method');
		var value_link = Blockly.Python.valueToCode(block, 'link', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.import_requests();
		// // TODO: Assemble Python into code variable.
		var code;
		// TODO: Change ORDER_NONE to the correct strength.
		code = 'requests.' + value_method + '(' + value_link + ')';
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['http_post'] = function (block) {
		var value_method = block.getFieldValue('method');
		var value_link = Blockly.Python.valueToCode(block, 'link', Blockly.Python.ORDER_ATOMIC);
		var format = block.getFieldValue('format');
		var value_data = Blockly.Python.valueToCode(block, 'data', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.import_requests();
		// // TODO: Assemble Python into code variable.
		var code;
		// TODO: Change ORDER_NONE to the correct strength.
		code = 'requests.' + value_method + '(' + value_link + ', ' + format + ' = ' + value_data + ')';
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['http_format'] = function (block) {
		var value_format = block.getFieldValue('format');
		var value_data = Blockly.Python.valueToCode(block, 'data', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.import_requests();
		// // TODO: Assemble Python into code variable.
		var code;
		// TODO: Change ORDER_NONE to the correct strength.
		code = value_data + '.' + value_format;
		return [code, Blockly.Python.ORDER_NONE];
	};
};


/***/ })

}]);