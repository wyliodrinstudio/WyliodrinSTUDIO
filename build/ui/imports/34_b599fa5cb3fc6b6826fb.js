(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[34],{

/***/ 541:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var xml_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(507);
/* harmony import */ var xml_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(xml_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var raw_loader_visual_toolbox_xml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(542);



let studio = null;


let blocks = __webpack_require__ (543);
let code = __webpack_require__ (544);

function setup (options, imports, register)
{
	studio = imports;

	studio.projects.registerLanguageAddon ('visual', ['rpk', 'rpk_simulator'], 'rpk', {
		getDefaultRunFileName ()
		{
			return '/main.visual.js';
		},

		/* language specific options */
		sourceLanguage ()
		{
			return 'javascript';
		},
		icon:'plugins/languages/visual.rpk/data/img/testIcon.png',
		fileIcons:[
			
		]
	});


	let toolbox = xml_js__WEBPACK_IMPORTED_MODULE_0___default.a.xml2js (raw_loader_visual_toolbox_xml__WEBPACK_IMPORTED_MODULE_1__["default"]);
	studio.editor_visual.registerBlocksDefinitions ('rpk', blocks, code, toolbox, {type: ['rpk', 'rpk_simulator'], board: 'rpk'});

	register (null, {});
}

/***/ }),

/***/ 542:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<toolbox>\n  <category name=\"Display\" colour=\"0\">\n    <block type=\"rpk_gui_drawstring\">\n      <value name=\"str\">\n        <shadow type=\"text\">\n          <field name=\"TEXT\"/>\n        </shadow>\n      </value>\n    </block>\n    <block type=\"rpk_gui_drawstringat\">\n      <value name=\"str\">\n        <shadow type=\"text\">\n          <field name=\"TEXT\"/>\n        </shadow>\n      </value>\n      <value name=\"X\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"Y\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n    </block>\n    <block type=\"rpk_gui_drawpoint\">\n      <value name=\"X\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"Y\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n    </block>\n    <block type=\"rpk_gui_drawline\">\n      <value name=\"X1\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"Y1\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"X2\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"Y2\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n    </block>\n    <block type=\"rpk_gui_drawhline\">\n      <value name=\"X1\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"Y1\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"X2\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n    </block>\n    <block type=\"rpk_gui_drawvline\">\n      <value name=\"X1\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"Y1\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"Y2\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n    </block>\n    <block type=\"rpk_gui_drawrect\">\n      <value name=\"X1\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"Y1\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"X2\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"Y2\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n    </block>\n    <block type=\"rpk_gui_fillrect\">\n      <value name=\"X1\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"Y1\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"X2\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"Y2\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n    </block>\n    <block type=\"rpk_gui_drawcircle\">\n      <value name=\"X\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"Y\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"R\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n    </block>\n    <block type=\"rpk_gui_fillcircle\">\n      <value name=\"X\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"Y\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"R\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n    </block>\n    <block type=\"rpk_gui_drawellipse\">\n      <value name=\"X1\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"Y\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"RX\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"RY\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n    </block>\n    <block type=\"rpk_gui_fillellipse\">\n      <value name=\"X1\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"Y\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"RX\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n      <value name=\"RY\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n    </block>\n    <block type=\"rpk_gui_display_clear\"/>\n    <block type=\"rpk_gui_display_newline\"/>\n    <block type=\"rpk_gui_set_color\">\n      <field name=\"Color\">0x00FF0000</field>\n    </block>\n    <block type=\"rpk_gui_set_backlight\">\n      <field name=\"Backlight\">0</field>\n    </block>\n    <block type=\"rpk_gui_set_bk_color\">\n      <field name=\"Color\">0x00FF0000</field>\n    </block>\n  </category>\n  <category name=\"RGB\" colour=\"240\">\n    <block type=\"rpk_rgb_set_brightness\">\n      <field name=\"Brightness\">0</field>\n    </block>\n    <block type=\"rpk_rgb_set_color\">\n      <field name=\"Color\">0</field>\n    </block>\n    <block type=\"rpk_rgb_set_state\">\n      <field name=\"Brightness\">0</field>\n      <field name=\"Color\">0</field>\n    </block>\n    <block type=\"rpk_rgb_get_brightness\"/>\n    <block type=\"rpk_rgb_get_color\"/>\n  </category>\n  <category name=\"Sensors\" colour=\"90\">\n    <block type=\"rpk_sensors_get_light\"/>\n    <block type=\"rpk_sensors_get_airquality\"/>\n    <block type=\"rpk_sensors_get_pressure\">\n      <field name=\"Measurement unit\">1</field>\n    </block>\n    <block type=\"rpk_sensors_get_temperature\">\n      <field name=\"Measurement unit\">1</field>\n    </block>\n    <block type=\"rpk_sensors_get_motion\"/>\n    <block type=\"rpk_sensors_get_freefall\"/>\n    <block type=\"rpk_sensors_get_battery\">\n      <field name=\"Properties\">1</field>\n    </block>\n    <block type=\"rpk_sensors_get_accelerometer\">\n      <field name=\"Axis\">1</field>\n    </block>\n    <block type=\"rpk_sensors_get_gyroscope\">\n      <field name=\"Axis\">1</field>\n    </block>\n    <block type=\"rpk_sensors_set_buzzer\">\n      <field name=\"NAME\">0</field>\n    </block>\n    <block type=\"rpk_sensors_get_buzzer\"/>\n  </category>\n  <category name=\"Touch\" colour=\"180\">\n    <block type=\"rpk_sensors_get_touch\"/>\n    <block type=\"rpk_sensors_touch\">\n      <field name=\"Value\">1</field>\n    </block>\n  </category>\n  <category name=\"Switches\" colour=\"45\">\n    <block type=\"rpk_sensors_get_switch\"/>\n    <block type=\"rpk_sensors_switch\">\n      <field name=\"Value\">1</field>\n    </block>\n  </category>\n  <category name=\"Time\" colour=\"60\">\n    <block type=\"rpk_timing_sleep\">\n      <field name=\"measure_unit\">1</field>\n      <value name=\"time\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n    </block>\n  </category>\n  <category name=\"Console\" colour=\"300\">\n    <block type=\"rpk_console_log\">\n      <value name=\"str\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n    </block>\n    <block type=\"rpk_console_read\"/>\n  </category>\n  <category name=\"Bluetooth\" colour=\"210\">\n    <block type=\"rpk_ble_write_int_8\">\n      <value name=\"str\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n    </block>\n    <block type=\"rpk_ble_write_int_16\">\n      <value name=\"str\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n    </block>\n    <block type=\"rpk_ble_write_int_32\">\n      <value name=\"str\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n    </block>\n    <block type=\"rpk_ble_read_int_8\"/>\n    <block type=\"rpk_ble_read_int_16\"/>\n    <block type=\"rpk_ble_read_int_32\"/>\n  </category>\n  <sep/>\n</toolbox>");

/***/ }),

/***/ 543:
/***/ (function(module, exports) {

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;
	// var goog = blockly.goog;

	Blockly.Blocks['rpk_gui_drawstring'] = {
		init: function () {
			this.appendValueInput('str')
				.setCheck(null)
				.appendField('Write on Display String:');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip('Draw String');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_gui_drawstringat'] = {
		init: function () {
			this.appendValueInput('str')
				.setCheck(null)
				.appendField('Write on Display: String');
			this.appendValueInput('X')
				.setCheck(null)
				.appendField('X');
			this.appendValueInput('Y')
				.setCheck(null)
				.appendField('Y');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip('Draw String At');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_gui_drawpoint'] = {
		init: function () {
			this.appendValueInput('X')
				.setCheck(null)
				.appendField('Draw Point: X');
			this.appendValueInput('Y')
				.setCheck(null)
				.appendField('Y');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip('Draw Point');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_gui_drawline'] = {
		init: function () {
			this.appendValueInput('X1')
				.setCheck(null)
				.appendField('Draw Line: X1');
			this.appendValueInput('Y1')
				.setCheck(null)
				.appendField('Y1');
			this.appendValueInput('X2')
				.setCheck(null)
				.appendField('X2');
			this.appendValueInput('Y2')
				.setCheck(null)
				.appendField('Y2');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip('Draw Line');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_gui_drawhline'] = {
		init: function () {
			this.appendValueInput('X1')
				.setCheck(null)
				.appendField('Draw Horizontal Line: X1');
			this.appendValueInput('Y1')
				.setCheck(null)
				.appendField('Y1');
			this.appendValueInput('X2')
				.setCheck(null)
				.appendField('X2');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip('Draw Horiozontal Line');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_gui_drawvline'] = {
		init: function () {
			this.appendValueInput('X1')
				.setCheck(null)
				.appendField('Draw Vertical Line: X1');
			this.appendValueInput('Y1')
				.setCheck(null)
				.appendField('Y1');
			this.appendValueInput('Y2')
				.setCheck(null)
				.appendField('Y2');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip('Draw Vertical Line');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_gui_drawrect'] = {
		init: function () {
			this.appendValueInput('X1')
				.setCheck(null)
				.appendField('Draw Rectangle: X1');
			this.appendValueInput('Y1')
				.setCheck(null)
				.appendField('Y1');
			this.appendValueInput('X2')
				.setCheck(null)
				.appendField('X2');
			this.appendValueInput('Y2')
				.setCheck(null)
				.appendField('Y2');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip('Draw Rectangle');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_gui_fillrect'] = {
		init: function () {
			this.appendValueInput('X1')
				.setCheck(null)
				.appendField('Fill Rectangle: X1');
			this.appendValueInput('Y1')
				.setCheck(null)
				.appendField('Y1');
			this.appendValueInput('X2')
				.setCheck(null)
				.appendField('X2');
			this.appendValueInput('Y2')
				.setCheck(null)
				.appendField('Y2');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip('Fill Rectangle');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_gui_drawcircle'] = {
		init: function () {
			this.appendValueInput('X')
				.setCheck(null)
				.appendField('Draw Circle: X');
			this.appendValueInput('Y')
				.setCheck(null)
				.appendField('Y');
			this.appendValueInput('R')
				.setCheck(null)
				.appendField('R');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip('Draw Circle');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_gui_fillcircle'] = {
		init: function () {
			this.appendValueInput('X')
				.setCheck(null)
				.appendField('Fill Circle: X');
			this.appendValueInput('Y')
				.setCheck(null)
				.appendField('Y');
			this.appendValueInput('R')
				.setCheck(null)
				.appendField('R');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip('Fill Circle');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_gui_drawellipse'] = {
		init: function () {
			this.appendValueInput('X1')
				.setCheck(null)
				.appendField('Draw Ellipse: X');
			this.appendValueInput('Y')
				.setCheck(null)
				.appendField('Y');
			this.appendValueInput('RX')
				.setCheck(null)
				.appendField('RX');
			this.appendValueInput('RY')
				.setCheck(null)
				.appendField('RY');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip('Draw Ellipse');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_gui_fillellipse'] = {
		init: function () {
			this.appendValueInput('X1')
				.setCheck(null)
				.appendField('Fill Ellipse: X');
			this.appendValueInput('Y')
				.setCheck(null)
				.appendField('Y');
			this.appendValueInput('RX')
				.setCheck(null)
				.appendField('RX');
			this.appendValueInput('RY')
				.setCheck(null)
				.appendField('RY');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip('Fill Ellipse');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_gui_display_clear'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Display Clear');
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip('clear');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_gui_display_newline'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Display New Line');
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip('New Line');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_gui_set_color'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Set Color')
				.appendField(new Blockly.FieldDropdown([['BLUE', '0x00FF0000'], ['GREEN', '0x0000FF00'], ['RED', '0x000000FF'], ['CYAN', '0x00FFFF00'], ['MAGENTA', '0x00FF00FF'], ['YELLOW', '0x0000FFFF'], ['LIGHTBLUE', '0x00FF8080'], ['LIGHTGREEN', '0x0080FF80'], ['LIGHTRED', '0x008080FF'], ['LIGHTCYAN', '0x00FFFF80'], ['LIGHTYELLOW', '0x0080FFFF'], ['DARKBLUE', '0x00800000'], ['DARKGREEN', '0x00008000'], ['DARKRED', '0x00000080'], ['DARKCYAN', '0x00808000'], ['DARKMAGENTA', '0x00800080'], ['DARKYELLOW', '0x00008080'], ['WHITE', '0x00FFFFFF'], ['LIGHTGRAY', '0x00D3D3D3'], ['GRAY', '0x00808080'], ['DARKGRAY', '0x00404040'], ['BLACK', '0x00000000'], ['BROWN', '0x002A2AA5'], ['ORANGE', '0x0000A5FF'], ['TRANSPARENT', '0xFF000000']]), 'Color');
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip('set_color');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_gui_set_backlight'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Set Backlight')
				.appendField(new Blockly.FieldDropdown([['OFF', '0'], ['LOW', '1'], ['MEDIUM', '2'], ['HIGH', '3']]), 'Backlight');
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip('set_backlight');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_gui_set_bk_color'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Set Background Color')
				.appendField(new Blockly.FieldDropdown([['BLUE', '0x00FF0000'], ['GREEN', '0x0000FF00'], ['RED', '0x000000FF'], ['CYAN', '0x00FFFF00'], ['MAGENTA', '0x00FF00FF'], ['YELLOW', '0x0000FFFF'], ['LIGHTBLUE', '0x00FF8080'], ['LIGHTGREEN', '0x0080FF80'], ['LIGHTRED', '0x008080FF'], ['LIGHTCYAN', '0x00FFFF80'], ['LIGHTYELLOW', '0x0080FFFF'], ['DARKBLUE', '0x00800000'], ['DARKGREEN', '0x00008000'], ['DARKRED', '0x00000080'], ['DARKCYAN', '0x00808000'], ['DARKMAGENTA', '0x00800080'], ['DARKYELLOW', '0x00008080'], ['WHITE', '0x00FFFFFF'], ['LIGHTGRAY', '0x00D3D3D3'], ['GRAY', '0x00808080'], ['DARKGRAY', '0x00404040'], ['BLACK', '0x00000000'], ['BROWN', '0x002A2AA5'], ['ORANGE', '0x0000A5FF'], ['TRANSPARENT', '0xFF000000']]), 'Color');
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip('set_color');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_rgb_set_brightness'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Set Brightness')
				.appendField(new Blockly.FieldDropdown([['OFF', '0'], ['LOW', '1'], ['MEDIUM', '2'], ['HIGH', '3']]), 'Brightness');
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(240);
			this.setTooltip('set_brightness');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_rgb_set_color'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Set Color')
				.appendField(new Blockly.FieldDropdown([['RED', '0'], ['GREEN', '1'], ['BLUE', '2'], ['WHITE', '3'], ['YELLOW', '4'], ['CYAN', '5'], ['PURPLE', '6'], ['BLACK', '7']]), 'Color');
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(240);
			this.setTooltip('set_color');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_rgb_set_state'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Set State Brightness')
				.appendField(new Blockly.FieldDropdown([['OFF', '0'], ['LOW', '1'], ['MEDIUM', '2'], ['HIGH', '3']]), 'Brightness')
				.appendField('Color')
				.appendField(new Blockly.FieldDropdown([['RED', '0'], ['GREEN', '1'], ['BLUE', '2'], ['WHITE', '3'], ['YELLOW', '4'], ['CYAN', '5'], ['PURPLE', '6'], ['BLACK', '7']]), 'Color');
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(240);
			this.setTooltip('set_state');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_rgb_get_brightness'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Get Brightness');
			this.setOutput(true, null);
			this.setColour(240);
			this.setTooltip('Get Brightness');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_rgb_get_color'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Get Color');
			this.setOutput(true, null);
			this.setColour(240);
			this.setTooltip('Get Color');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_sensors_get_light'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Get Light');
			this.setOutput(true, 'Number');
			this.setColour(90);
			this.setTooltip('Get Light');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_sensors_get_airquality'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Get Air Quality');
			this.setOutput(true, 'Number');
			this.setColour(90);
			this.setTooltip('Get Air Quality');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_sensors_get_pressure'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Get Pressure')
				.appendField(new Blockly.FieldDropdown([['atm', '1'], ['Pa', '2'], ['hPa', '3'], ['bar', '4']]), 'Measurement unit');
			this.setOutput(true, 'Number');
			this.setColour(90);
			this.setTooltip('Get Pressure');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_sensors_get_temperature'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Get Temperature')
				.appendField(new Blockly.FieldDropdown([['Celsius', '1'], ['Fahrenheit', '2']]), 'Measurement unit');
			this.setOutput(true, 'Number');
			this.setColour(90);
			this.setTooltip('Get Temperature');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_sensors_get_motion'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Is Moving');
			this.setOutput(true, 'Boolean');
			this.setColour(90);
			this.setTooltip('Get Motion');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_sensors_get_freefall'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Is Free Falling');
			this.setOutput(true, 'Boolean');
			this.setColour(90);
			this.setTooltip('Get Free Fall');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_sensors_get_battery'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Get Battery')
				.appendField(new Blockly.FieldDropdown([['Percentage', '1'], ['Charging State', '2']]), 'Properties');
			this.setOutput(true, null);
			this.setColour(90);
			this.setTooltip('Get Battery');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_sensors_get_accelerometer'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Get Accelerometer Axis')
				.appendField(new Blockly.FieldDropdown([['X', '1'], ['Y', '2'], ['Z', '3']]), 'Axis');
			this.setOutput(true, 'Number');
			this.setColour(90);
			this.setTooltip('Get Accelerometer');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_sensors_set_buzzer'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Set Buzzer State')
				.appendField(new Blockly.FieldDropdown([['OFF', '0'], ['ON', '1']]), 'NAME');
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(90);
			this.setTooltip('Set Buzzer');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_sensors_get_buzzer'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Get Buzzer State');
			this.setOutput(true, 'Number');
			this.setColour(90);
			this.setTooltip('Get Buzzer');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_sensors_get_touch'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Get Touch');
			this.setOutput(true, 'Number');
			this.setColour(180);
			this.setTooltip('Get Touch');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_sensors_get_switch'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Get Switch');
			this.setOutput(true, 'Number');
			this.setColour(45);
			this.setTooltip('Get Switch');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_sensors_get_gyroscope'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Get Gyroscope Axis')
				.appendField(new Blockly.FieldDropdown([['X', '1'], ['Y', '2'], ['Z', '3']]), 'Axis');
			this.setOutput(true, 'Number');
			this.setColour(90);
			this.setTooltip('Get Gyroscope');
			this.setHelpUrl('');
		}
	};
	Blockly.Blocks['rpk_sensors_switch'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Switch ')
				.appendField(new Blockly.FieldDropdown([['SW1', '1'], ['SW2', '2'], ['SW3', '3'], ['SW4', '4']]), 'Value');
			this.setOutput(true, 'Number');
			this.setColour(45);
			this.setTooltip('Switch');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_sensors_touch'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Touch ')
				.appendField(new Blockly.FieldDropdown([['UP', '1'], ['DOWN', '2'], ['LEFT', '3'], ['RIGHT', '4']]), 'Value');
			this.setOutput(true, 'Boolean');
			this.setColour(180);
			this.setTooltip('Touch');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_timing_sleep'] = {
		init: function () {
			this.appendValueInput('time')
				.setCheck('Number')
				.appendField('Sleep');
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([['seconds', '1'], ['miliseconds', '2'], ['microseconds', '3']]), 'measure_unit');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(60);
			this.setTooltip('Sleep');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_console_log'] = {
		init: function () {
			this.appendValueInput('str')
				.setCheck(null)
				.appendField('Console Log');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(300);
			this.setTooltip('Console Log');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_console_read'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Console Read');
			this.setInputsInline(true);
			this.setOutput(true, null);
			this.setColour(300);
			this.setTooltip('Console Log');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_ble_write_int_8'] = {
		init: function () {
			this.appendValueInput('str')
				.setCheck('Number')
				.appendField('Write Int 8');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(210);
			this.setTooltip('Write Int 8');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_ble_write_int_16'] = {
		init: function () {
			this.appendValueInput('str')
				.setCheck('Number')
				.appendField('Write Int 16');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(210);
			this.setTooltip('Write Int 16');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_ble_write_int_32'] = {
		init: function () {
			this.appendValueInput('str')
				.setCheck('Number')
				.appendField('Write Int 32');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(210);
			this.setTooltip('Write Int 32');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_ble_read_int_8'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Read Int 8');
			this.setInputsInline(true);
			this.setOutput(true, 'Number');
			this.setColour(210);
			this.setTooltip('Read Int 8');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_ble_read_int_16'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Read Int 16');
			this.setInputsInline(true);
			this.setOutput(true, 'Number');
			this.setColour(210);
			this.setTooltip('Read Int 16');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['rpk_ble_read_int_32'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Read Int 32');
			this.setInputsInline(true);
			this.setOutput(true, 'Number');
			this.setColour(210);
			this.setTooltip('Read Int 32');
			this.setHelpUrl('');
		}
	};
};

/***/ }),

/***/ 544:
/***/ (function(module, exports) {

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;
	// var goog = blockly.goog;

	Blockly.JavaScript.setupGUI = function () {
		if (!Blockly.JavaScript.definitions_['setupGUI']) {
			Blockly.JavaScript.definitions_['setupGUI'] = 'var GUI = require(\'GUI\');';
		}
	};

	Blockly.JavaScript.setupRGB = function () {
		if (!Blockly.JavaScript.definitions_['setupRGB']) {
			Blockly.JavaScript.definitions_['setupRGB'] = 'var RGB = require(\'RGB\');';
		}
	};

	Blockly.JavaScript.setupACCELEROMETER = function () {
		if (!Blockly.JavaScript.definitions_['setupACCELEROMETER']) {
			Blockly.JavaScript.definitions_['setupACCELEROMETER'] = 'var accelerometer = require(\'accelerometer\');';
		}
	};

	Blockly.JavaScript.setupGYROSCOPE = function () {
		if (!Blockly.JavaScript.definitions_['setupGYROSCOPE']) {
			Blockly.JavaScript.definitions_['setupGYROSCOPE'] = 'var gyroscope = require(\'gyroscope\');';
		}
	};

	Blockly.JavaScript.setupBATTERY = function () {
		if (!Blockly.JavaScript.definitions_['setupBATTERY']) {
			Blockly.JavaScript.definitions_['setupBATTERY'] = 'var battery = require(\'battery\');';
		}
	};

	Blockly.JavaScript.setupMOTION = function () {
		if (!Blockly.JavaScript.definitions_['setupMOTION']) {
			Blockly.JavaScript.definitions_['setupMOTION'] = 'var motion = require(\'motion\');';
		}
	};

	Blockly.JavaScript.setupFREEFALL = function () {
		if (!Blockly.JavaScript.definitions_['setupFREEFALL']) {
			Blockly.JavaScript.definitions_['setupFREEFALL'] = 'var freeFall = require(\'freeFall\');';
		}
	};

	Blockly.JavaScript.setupAMBIENTLIGHT = function () {
		if (!Blockly.JavaScript.definitions_['setupAMBIENTLIGHT']) {
			Blockly.JavaScript.definitions_['setupAMBIENTLIGHT'] = 'var ambientLight = require(\'ambientLight\');';
		}
	};

	Blockly.JavaScript.setupAIRQUALITY = function () {
		if (!Blockly.JavaScript.definitions_['setupAIRQUALITY']) {
			Blockly.JavaScript.definitions_['setupAIRQUALITY'] = 'var airQuality = require(\'airQuality\');';
		}
	};

	Blockly.JavaScript.setupPRESSURE = function () {
		if (!Blockly.JavaScript.definitions_['setupPRESSURE']) {
			Blockly.JavaScript.definitions_['setupPRESSURE'] = 'var pressure = require(\'pressure\');';
		}
	};
	Blockly.JavaScript.setupTEMPERATURE = function () {
		if (!Blockly.JavaScript.definitions_['setupTEMPERATURE']) {
			Blockly.JavaScript.definitions_['setupTEMPERATURE'] = 'var temperature = require(\'temperature\');';
		}
	};
	Blockly.JavaScript.setupBUZZER = function () {
		if (!Blockly.JavaScript.definitions_['setupBUZZER']) {
			Blockly.JavaScript.definitions_['setupBUZZER'] = 'var buzzer = require(\'buzzer\');';
		}
	};
	Blockly.JavaScript.setupTOUCHSCREEN = function () {
		if (!Blockly.JavaScript.definitions_['setupTOUCHSCREEN']) {
			Blockly.JavaScript.definitions_['setupTOUCHSCREEN'] = 'var touchscreen = require(\'touchscreen\');';
		}
	};
	Blockly.JavaScript.setupSWITCHES = function () {
		if (!Blockly.JavaScript.definitions_['setupSWITCHES']) {
			Blockly.JavaScript.definitions_['setupSWITCHES'] = 'var switches = require(\'switches\');';
		}
	};
	Blockly.JavaScript.setupBLE = function () {
		if (!Blockly.JavaScript.definitions_['setupBLE']) {
			Blockly.JavaScript.definitions_['setupBLE'] = 'var BLE = require(\'BLE\');';
		}
	};

	Blockly.JavaScript['rpk_gui_drawstring'] = function (block) {
		Blockly.JavaScript.setupGUI();
		var value_str = Blockly.JavaScript.valueToCode(block, 'str', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'GUI.displayString(' + value_str + ');\n';
		return code;
	};

	Blockly.JavaScript['rpk_gui_drawstringat'] = function (block) {
		Blockly.JavaScript.setupGUI();
		var value_str = Blockly.JavaScript.valueToCode(block, 'str', Blockly.JavaScript.ORDER_ATOMIC);
		var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'GUI.displayStringAt(' + value_str + ', ' + value_x + ', ' + value_y + ');\n';
		return code;
	};

	Blockly.JavaScript['rpk_gui_drawpoint'] = function (block) {
		Blockly.JavaScript.setupGUI();
		var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'GUI.drawPoint(' + value_x + ', ' + value_y + ');\n';
		return code;
	};

	Blockly.JavaScript['rpk_gui_drawline'] = function (block) {
		Blockly.JavaScript.setupGUI();
		var value_x1 = Blockly.JavaScript.valueToCode(block, 'X1', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y1 = Blockly.JavaScript.valueToCode(block, 'Y1', Blockly.JavaScript.ORDER_ATOMIC);
		var value_x2 = Blockly.JavaScript.valueToCode(block, 'X2', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y2 = Blockly.JavaScript.valueToCode(block, 'Y2', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'GUI.drawLine(' + value_x1 + ', ' + value_y1 + ', ' + value_x2 + ', ' + value_y2 + ');\n';
		return code;
	};

	Blockly.JavaScript['rpk_gui_drawhline'] = function (block) {
		Blockly.JavaScript.setupGUI();
		var value_x1 = Blockly.JavaScript.valueToCode(block, 'X1', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y1 = Blockly.JavaScript.valueToCode(block, 'Y1', Blockly.JavaScript.ORDER_ATOMIC);
		var value_x2 = Blockly.JavaScript.valueToCode(block, 'X2', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'GUI.drawHLine(' + value_x1 + ', ' + value_y1 + ', ' + value_x2 + ');\n';
		return code;
	};

	Blockly.JavaScript['rpk_gui_drawvline'] = function (block) {
		Blockly.JavaScript.setupGUI();
		var value_x1 = Blockly.JavaScript.valueToCode(block, 'X1', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y1 = Blockly.JavaScript.valueToCode(block, 'Y1', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y2 = Blockly.JavaScript.valueToCode(block, 'Y2', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'GUI.drawVLine(' + value_x1 + ', ' + value_y1 + ', ' + value_y2 + ');\n';
		return code;
	};

	Blockly.JavaScript['rpk_gui_drawrect'] = function (block) {
		Blockly.JavaScript.setupGUI();
		var value_x1 = Blockly.JavaScript.valueToCode(block, 'X1', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y1 = Blockly.JavaScript.valueToCode(block, 'Y1', Blockly.JavaScript.ORDER_ATOMIC);
		var value_x2 = Blockly.JavaScript.valueToCode(block, 'X2', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y2 = Blockly.JavaScript.valueToCode(block, 'Y2', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'GUI.drawRect(' + value_x1 + ', ' + value_y1 + ', ' + value_x2 + ', ' + value_y2 + ');\n';
		return code;
	};

	Blockly.JavaScript['rpk_gui_fillrect'] = function (block) {
		Blockly.JavaScript.setupGUI();
		var value_x1 = Blockly.JavaScript.valueToCode(block, 'X1', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y1 = Blockly.JavaScript.valueToCode(block, 'Y1', Blockly.JavaScript.ORDER_ATOMIC);
		var value_x2 = Blockly.JavaScript.valueToCode(block, 'X2', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y2 = Blockly.JavaScript.valueToCode(block, 'Y2', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'GUI.fillRect(' + value_x1 + ', ' + value_y1 + ', ' + value_x2 + ', ' + value_y2 + ');\n';
		return code;
	};

	Blockly.JavaScript['rpk_gui_drawcircle'] = function (block) {
		Blockly.JavaScript.setupGUI();
		var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
		var value_r = Blockly.JavaScript.valueToCode(block, 'R', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'GUI.drawCircle(' + value_x + ', ' + value_y + ', ' + value_r + ');\n';
		return code;
	};

	Blockly.JavaScript['rpk_gui_fillcircle'] = function (block) {
		Blockly.JavaScript.setupGUI();
		var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
		var value_r = Blockly.JavaScript.valueToCode(block, 'R', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'GUI.fillCircle(' + value_x + ', ' + value_y + ', ' + value_r + ');\n';
		return code;
	};

	Blockly.JavaScript['rpk_gui_drawellipse'] = function (block) {
		Blockly.JavaScript.setupGUI();
		var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
		var value_rx = Blockly.JavaScript.valueToCode(block, 'RX', Blockly.JavaScript.ORDER_ATOMIC);
		var value_ry = Blockly.JavaScript.valueToCode(block, 'RY', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'GUI.drawEllipse(' + value_x + ', ' + value_y + ', ' + value_rx + ', ' + value_ry + ');\n';
		return code;
	};

	Blockly.JavaScript['rpk_gui_fillellipse'] = function (block) {
		Blockly.JavaScript.setupGUI();
		var value_x = Blockly.JavaScript.valueToCode(block, 'X1', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
		var value_rx = Blockly.JavaScript.valueToCode(block, 'RX', Blockly.JavaScript.ORDER_ATOMIC);
		var value_ry = Blockly.JavaScript.valueToCode(block, 'RY', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'GUI.fillEllipse(' + value_x + ', ' + value_y + ', ' + value_rx + ', ' + value_ry + ');\n';
		return code;
	};

	Blockly.JavaScript['rpk_gui_display_clear'] = function (/* block */) {
		Blockly.JavaScript.setupGUI();
		// TODO: Assemble JavaScript into code variable.
		var code = 'GUI.displayClear();\n';
		return code;
	};

	Blockly.JavaScript['rpk_gui_display_newline'] = function (/* block */) {
		Blockly.JavaScript.setupGUI();
		// TODO: Assemble JavaScript into code variable.
		var code = 'GUI.displayNewLine();\n';
		return code;
	};

	Blockly.JavaScript['rpk_gui_set_color'] = function (block) {
		Blockly.JavaScript.setupGUI();
		var dropdown_color = block.getFieldValue('Color');
		// TODO: Assemble JavaScript into code variable.
		var code = 'GUI.setColor(' + dropdown_color + ');\n';
		return code;
	};

	Blockly.JavaScript['rpk_gui_set_backlight'] = function (block) {
		Blockly.JavaScript.setupGUI();
		var dropdown_backlight = block.getFieldValue('Backlight');
		// TODO: Assemble JavaScript into code variable.
		var code = 'GUI.setBacklight(' + dropdown_backlight + ');\n';
		return code;
	};

	Blockly.JavaScript['rpk_gui_set_bk_color'] = function (block) {
		Blockly.JavaScript.setupGUI();
		var dropdown_color = block.getFieldValue('Color');
		// TODO: Assemble JavaScript into code variable.
		var code = 'GUI.setBkColor(' + dropdown_color + ');\n';
		return code;
	};

	Blockly.JavaScript['rpk_rgb_set_brightness'] = function (block) {
		Blockly.JavaScript.setupRGB();
		var dropdown_brightness = block.getFieldValue('Brightness');
		// TODO: Assemble JavaScript into code variable.
		var code = 'RGB.setBrightness(' + dropdown_brightness + ');\n';
		return code;
	};

	Blockly.JavaScript['rpk_rgb_set_color'] = function (block) {
		Blockly.JavaScript.setupRGB();
		var dropdown_color = block.getFieldValue('Color');
		// TODO: Assemble JavaScript into code variable.
		var code = 'RGB.setColor(' + dropdown_color + ');\n';
		return code;
	};

	Blockly.JavaScript['rpk_rgb_set_state'] = function (block) {
		Blockly.JavaScript.setupRGB();
		var dropdown_brightness = block.getFieldValue('Brightness');
		var dropdown_color = block.getFieldValue('Color');
		// TODO: Assemble JavaScript into code variable.
		var code = 'RGB.setState(' + dropdown_brightness + ', ' + dropdown_color + ');\n';
		return code;
	};

	Blockly.JavaScript['rpk_rgb_get_brightness'] = function (/* block */) {
		Blockly.JavaScript.setupRGB();
		// TODO: Assemble JavaScript into code variable.
		var code = 'RGB.getBrightness()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_rgb_get_color'] = function (/* block */) {
		Blockly.JavaScript.setupRGB();
		// TODO: Assemble JavaScript into code variable.
		var code = 'RGB.getColor()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_sensors_get_light'] = function (/* block */) {
		Blockly.JavaScript.setupAMBIENTLIGHT();
		// TODO: Assemble JavaScript into code variable.
		var code = 'ambientLight.getValue()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_sensors_get_airquality'] = function (/* block */) {
		Blockly.JavaScript.setupAIRQUALITY();
		// TODO: Assemble JavaScript into code variable.
		var code = 'airQuality.getValue()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_sensors_get_pressure'] = function (block) {
		Blockly.JavaScript.setupPRESSURE();
		var dropdown_measurement_unit = block.getFieldValue('Measurement unit');
		// TODO: Assemble JavaScript into code variable.
		var code;

		if (dropdown_measurement_unit === '1') {
			code = 'pressure.getValue() * 0.00098692316931427';
		}
		else if (dropdown_measurement_unit === '2') {
			code = 'pressure.getValue() * 100';
		}
		else if (dropdown_measurement_unit === '3') {
			code = 'pressure.getValue()';
		}
		else if (dropdown_measurement_unit === '4') {
			code = 'pressure.getValue() * 0.001';
		}

		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_sensors_get_temperature'] = function (block) {
		Blockly.JavaScript.setupTEMPERATURE();
		var dropdown_measurement_unit = block.getFieldValue('Measurement unit');
		let code = '';
		// TODO: Assemble JavaScript into code variable.
		if (dropdown_measurement_unit === '1') {
			// TODO: Change ORDER_NONE to the correct strength.
			code = 'temperature.getValue()';
		}
		else if (dropdown_measurement_unit === '2') {
			code = 'temperature.getValue() * 9 / 5 + 32';
		}
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_sensors_get_motion'] = function (/* block */) {
		Blockly.JavaScript.setupMOTION();
		// TODO: Assemble JavaScript into code variable.
		let code = 'motion.getValue()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_sensors_get_freefall'] = function (/* block */) {
		Blockly.JavaScript.setupFREEFALL();
		// TODO: Assemble JavaScript into code variable.
		var code = 'freefall.getValue()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_sensors_get_battery'] = function (block) {
		Blockly.JavaScript.setupBATTERY();
		var dropdown_properties = block.getFieldValue('Properties');
		// TODO: Assemble JavaScript into code variable.
		var code;

		if (dropdown_properties === '1') {
			code = 'battery.getValue().percentage';
		}
		else if (dropdown_properties === '2') {
			code = 'battery.getValue().state';
		}
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_sensors_get_accelerometer'] = function (block) {
		Blockly.JavaScript.setupACCELEROMETER();
		var dropdown_axis = block.getFieldValue('Axis');
		// TODO: Assemble JavaScript into code variable.
		var code;

		if (dropdown_axis === '1') {
			code = 'accelerometer.getValue().x';
		}
		else if (dropdown_axis === '2') {
			code = 'accelerometer.getValue().y';
		}
		else if (dropdown_axis === '3') {
			code = 'accelerometer.getValue().z';
		}
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_sensors_set_buzzer'] = function (block) {
		Blockly.JavaScript.setupBUZZER();
		var dropdown_name = block.getFieldValue('NAME');
		// TODO: Assemble JavaScript into code variable.
		var code;

		if (dropdown_name === '0') {
			code = 'buzzer.setState(buzzer.OFF);\n';
		}
		else if (dropdown_name === '1') {
			code = 'buzzer.setState(buzzer.ON);\n';
		}

		return code;
	};

	Blockly.JavaScript['rpk_sensors_get_buzzer'] = function (/* block */) {
		Blockly.JavaScript.setupBUZZER();
		// TODO: Assemble JavaScript into code variable.
		var code = 'buzzer.getState()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_sensors_get_touch'] = function (/* block */) {
		Blockly.JavaScript.setupTOUCHSCREEN();
		// TODO: Assemble JavaScript into code variable.
		var code = 'touchscreen.getValue()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_sensors_get_switch'] = function (/* block */) {
		Blockly.JavaScript.setupSWITCHES();
		// TODO: Assemble JavaScript into code variable.
		var code = 'switches.getValue()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_sensors_get_gyroscope'] = function (block) {
		Blockly.JavaScript.setupGYROSCOPE();
		var dropdown_axis = block.getFieldValue('Axis');
		// TODO: Assemble JavaScript into code variable.
		var code;
		if (dropdown_axis === '1') {
			code = 'gyroscope.getValue().x';
		}
		else if (dropdown_axis === '2') {
			code = 'gyroscope.getValue().y';
		}
		else if (dropdown_axis === '3') {
			code = 'gyroscope.getValue().z';
		}
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_sensors_switch'] = function (block) {
		Blockly.JavaScript.setupSWITCHES();
		var dropdown_value = block.getFieldValue('Value');
		// TODO: Assemble JavaScript into code variable.
		var code;
		if (dropdown_value === '1') {
			code = 'switches.SW1';
		}
		else if (dropdown_value === '2') {
			code = 'switches.SW2';
		}
		else if (dropdown_value === '3') {
			code = 'switches.SW3';
		}
		else if (dropdown_value === '4') {
			code = 'switches.SW4';
		}
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_sensors_touch'] = function (block) {
		Blockly.JavaScript.setupTOUCHSCREEN();
		var dropdown_value = block.getFieldValue('Value');
		// TODO: Assemble JavaScript into code variable.
		var code;
		if (dropdown_value === '1') {
			code = 'touchscreen.UP';
		}
		else if (dropdown_value === '2') {
			code = 'touchscreen.DOWN';
		}
		else if (dropdown_value === '3') {
			code = 'touchscreen.LEFT';
		}
		else if (dropdown_value === '4') {
			code = 'touchscreen.RIGHT';
		}
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_timing_sleep'] = function (block) {
		var value_time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_ATOMIC);
		var dropdown_measure_unit = block.getFieldValue('measure_unit');
		// TODO: Assemble JavaScript into code variable.

		var code;

		if (dropdown_measure_unit === '1') {
			code = 'sleep(' + value_time + ' * 1000);\n';
		}
		else if (dropdown_measure_unit === '2') {
			code = 'sleep(' + value_time + ');\n';
		}
		else if (dropdown_measure_unit === '3') {
			code = 'sleep(' + value_time + ' / 1000);\n';
		}

		return code;
	};
	Blockly.JavaScript['rpk_console_log'] = function (block) {
		var value_str = Blockly.JavaScript.valueToCode(block, 'str', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'console.log(' + value_str + ');\n';
		return code;
	};

	Blockly.JavaScript['rpk_console_read'] = function (/* block */) {
		// TODO: Assemble JavaScript into code variable.
		var code = 'console.read()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_ble_write_int_8'] = function (block) {
		Blockly.JavaScript.setupBLE();
		var value_str = Blockly.JavaScript.valueToCode(block, 'str', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'BLE.writeInt8(' + value_str + ');\n';
		return code;
	};

	Blockly.JavaScript['rpk_ble_write_int_16'] = function (block) {
		Blockly.JavaScript.setupBLE();
		var value_str = Blockly.JavaScript.valueToCode(block, 'str', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'BLE.writeInt16(' + value_str + ');\n';
		return code;
	};

	Blockly.JavaScript['rpk_ble_write_int_32'] = function (block) {
		Blockly.JavaScript.setupBLE();
		var value_str = Blockly.JavaScript.valueToCode(block, 'str', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'BLE.writeInt32(' + value_str + ');\n';
		return code;
	};

	Blockly.JavaScript['rpk_ble_read_int_8'] = function (/* block */) {
		Blockly.JavaScript.setupBLE();
		// TODO: Assemble JavaScript into code variable.
		var code = 'BLE.readInt8()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_ble_read_int_16'] = function (/* block */) {
		Blockly.JavaScript.setupBLE();
		// TODO: Assemble JavaScript into code variable.
		var code = 'BLE.readInt16()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_ble_read_int_32'] = function (/* block */) {
		Blockly.JavaScript.setupBLE();
		// TODO: Assemble JavaScript into code variable.
		var code = 'BLE.readInt32()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};
};


/***/ })

}]);