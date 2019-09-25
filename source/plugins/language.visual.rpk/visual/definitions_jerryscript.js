module.exports = function (blockly) {
	var Blockly = blockly.Blockly;
	// var goog = blockly.goog;

	Blockly.Blocks['rpk_gui_drawstring'] = {
		init: function () {
			this.appendValueInput("str")
				.setCheck(null)
				.appendField("Write on Display String:");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip("Draw String");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_gui_drawstringat'] = {
		init: function () {
			this.appendValueInput("str")
				.setCheck(null)
				.appendField("Write on Display: String");
			this.appendValueInput("X")
				.setCheck(null)
				.appendField("X");
			this.appendValueInput("Y")
				.setCheck(null)
				.appendField("Y");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip("Draw String At");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_gui_drawpoint'] = {
		init: function () {
			this.appendValueInput("X")
				.setCheck(null)
				.appendField("Draw Point: X");
			this.appendValueInput("Y")
				.setCheck(null)
				.appendField("Y");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip("Draw Point");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_gui_drawline'] = {
		init: function () {
			this.appendValueInput("X1")
				.setCheck(null)
				.appendField("Draw Line: X1");
			this.appendValueInput("Y1")
				.setCheck(null)
				.appendField("Y1");
			this.appendValueInput("X2")
				.setCheck(null)
				.appendField("X2");
			this.appendValueInput("Y2")
				.setCheck(null)
				.appendField("Y2");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip("Draw Line");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_gui_drawhline'] = {
		init: function () {
			this.appendValueInput("X1")
				.setCheck(null)
				.appendField("Draw Horizontal Line: X1");
			this.appendValueInput("Y1")
				.setCheck(null)
				.appendField("Y1");
			this.appendValueInput("X2")
				.setCheck(null)
				.appendField("X2");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip("Draw Horiozontal Line");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_gui_drawvline'] = {
		init: function () {
			this.appendValueInput("X1")
				.setCheck(null)
				.appendField("Draw Vertical Line: X1");
			this.appendValueInput("Y1")
				.setCheck(null)
				.appendField("Y1");
			this.appendValueInput("Y2")
				.setCheck(null)
				.appendField("Y2");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip("Draw Vertical Line");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_gui_drawrect'] = {
		init: function () {
			this.appendValueInput("X1")
				.setCheck(null)
				.appendField("Draw Rectangle: X1");
			this.appendValueInput("Y1")
				.setCheck(null)
				.appendField("Y1");
			this.appendValueInput("X2")
				.setCheck(null)
				.appendField("X2");
			this.appendValueInput("Y2")
				.setCheck(null)
				.appendField("Y2");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip("Draw Rectangle");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_gui_fillrect'] = {
		init: function () {
			this.appendValueInput("X1")
				.setCheck(null)
				.appendField("Fill Rectangle: X1");
			this.appendValueInput("Y1")
				.setCheck(null)
				.appendField("Y1");
			this.appendValueInput("X2")
				.setCheck(null)
				.appendField("X2");
			this.appendValueInput("Y2")
				.setCheck(null)
				.appendField("Y2");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip("Fill Rectangle");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_gui_drawcircle'] = {
		init: function () {
			this.appendValueInput("X")
				.setCheck(null)
				.appendField("Draw Circle: X");
			this.appendValueInput("Y")
				.setCheck(null)
				.appendField("Y");
			this.appendValueInput("R")
				.setCheck(null)
				.appendField("R");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip("Draw Circle");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_gui_fillcircle'] = {
		init: function () {
			this.appendValueInput("X")
				.setCheck(null)
				.appendField("Fill Circle: X");
			this.appendValueInput("Y")
				.setCheck(null)
				.appendField("Y");
			this.appendValueInput("R")
				.setCheck(null)
				.appendField("R");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip("Fill Circle");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_gui_drawellipse'] = {
		init: function () {
			this.appendValueInput("X1")
				.setCheck(null)
				.appendField("Draw Ellipse: X");
			this.appendValueInput("Y")
				.setCheck(null)
				.appendField("Y");
			this.appendValueInput("RX")
				.setCheck(null)
				.appendField("RX");
			this.appendValueInput("RY")
				.setCheck(null)
				.appendField("RY");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip("Draw Ellipse");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_gui_fillellipse'] = {
		init: function () {
			this.appendValueInput("X1")
				.setCheck(null)
				.appendField("Fill Ellipse: X");
			this.appendValueInput("Y")
				.setCheck(null)
				.appendField("Y");
			this.appendValueInput("RX")
				.setCheck(null)
				.appendField("RX");
			this.appendValueInput("RY")
				.setCheck(null)
				.appendField("RY");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip("Fill Ellipse");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_gui_display_clear'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Display Clear");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip("clear");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_gui_display_newline'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Display New Line");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip("New Line");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_gui_set_color'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Set Color")
				.appendField(new Blockly.FieldDropdown([["BLUE", "0x00FF0000"], ["GREEN", "0x0000FF00"], ["RED", "0x000000FF"], ["CYAN", "0x00FFFF00"], ["MAGENTA", "0x00FF00FF"], ["YELLOW", "0x0000FFFF"], ["LIGHTBLUE", "0x00FF8080"], ["LIGHTGREEN", "0x0080FF80"], ["LIGHTRED", "0x008080FF"], ["LIGHTCYAN", "0x00FFFF80"], ["LIGHTYELLOW", "0x0080FFFF"], ["DARKBLUE", "0x00800000"], ["DARKGREEN", "0x00008000"], ["DARKRED", "0x00000080"], ["DARKCYAN", "0x00808000"], ["DARKMAGENTA", "0x00800080"], ["DARKYELLOW", "0x00008080"], ["WHITE", "0x00FFFFFF"], ["LIGHTGRAY", "0x00D3D3D3"], ["GRAY", "0x00808080"], ["DARKGRAY", "0x00404040"], ["BLACK", "0x00000000"], ["BROWN", "0x002A2AA5"], ["ORANGE", "0x0000A5FF"], ["TRANSPARENT", "0xFF000000"]]), "Color");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip("set_color");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_gui_set_backlight'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Set Backlight")
				.appendField(new Blockly.FieldDropdown([["OFF", "0"], ["LOW", "1"], ["MEDIUM", "2"], ["HIGH", "3"]]), "Backlight");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip("set_backlight");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_gui_set_bk_color'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Set Background Color")
				.appendField(new Blockly.FieldDropdown([["BLUE", "0x00FF0000"], ["GREEN", "0x0000FF00"], ["RED", "0x000000FF"], ["CYAN", "0x00FFFF00"], ["MAGENTA", "0x00FF00FF"], ["YELLOW", "0x0000FFFF"], ["LIGHTBLUE", "0x00FF8080"], ["LIGHTGREEN", "0x0080FF80"], ["LIGHTRED", "0x008080FF"], ["LIGHTCYAN", "0x00FFFF80"], ["LIGHTYELLOW", "0x0080FFFF"], ["DARKBLUE", "0x00800000"], ["DARKGREEN", "0x00008000"], ["DARKRED", "0x00000080"], ["DARKCYAN", "0x00808000"], ["DARKMAGENTA", "0x00800080"], ["DARKYELLOW", "0x00008080"], ["WHITE", "0x00FFFFFF"], ["LIGHTGRAY", "0x00D3D3D3"], ["GRAY", "0x00808080"], ["DARKGRAY", "0x00404040"], ["BLACK", "0x00000000"], ["BROWN", "0x002A2AA5"], ["ORANGE", "0x0000A5FF"], ["TRANSPARENT", "0xFF000000"]]), "Color");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(0);
			this.setTooltip("set_color");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_rgb_set_brightness'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Set Brightness")
				.appendField(new Blockly.FieldDropdown([["OFF", "0"], ["LOW", "1"], ["MEDIUM", "2"], ["HIGH", "3"]]), "Brightness");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(240);
			this.setTooltip("set_brightness");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_rgb_set_color'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Set Color")
				.appendField(new Blockly.FieldDropdown([["RED", "0"], ["GREEN", "1"], ["BLUE", "2"], ["WHITE", "3"], ["YELLOW", "4"], ["CYAN", "5"], ["PURPLE", "6"], ["BLACK", "7"]]), "Color");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(240);
			this.setTooltip("set_color");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_rgb_set_state'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Set State Brightness")
				.appendField(new Blockly.FieldDropdown([["OFF", "0"], ["LOW", "1"], ["MEDIUM", "2"], ["HIGH", "3"]]), "NAME")
				.appendField("Color")
				.appendField(new Blockly.FieldDropdown([["RED", "0"], ["GREEN", "1"], ["BLUE", "2"], ["WHITE", "3"], ["YELLOW", "4"], ["CYAN", "5"], ["PURPLE", "6"], ["BLACK", "7"]]), "Color");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(240);
			this.setTooltip("set_state");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_rgb_get_brightness'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Get Brightness");
			this.setOutput(true, null);
			this.setColour(240);
			this.setTooltip("Get Brightness");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_rgb_get_color'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Get Color");
			this.setOutput(true, null);
			this.setColour(240);
			this.setTooltip("Get Color");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_sensors_get_light'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Get Light");
			this.setOutput(true, "Number");
			this.setColour(90);
			this.setTooltip("Get Light");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_sensors_get_airquality'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Get Air Quality");
			this.setOutput(true, "Number");
			this.setColour(90);
			this.setTooltip("Get Air Quality");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_sensors_get_pressure'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Get Pressure")
				.appendField(new Blockly.FieldDropdown([["atm", "1"], ["Pa", "2"], ["hPa", "3"], ["bar", "4"]]), "Measurement unit");
			this.setOutput(true, "Number");
			this.setColour(90);
			this.setTooltip("Get Pressure");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_sensors_get_temperature'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Get Temperature")
				.appendField(new Blockly.FieldDropdown([["Celsius", "1"], ["Fahrenheit", "2"]]), "Measurement unit");
			this.setOutput(true, "Number");
			this.setColour(90);
			this.setTooltip("Get Temperature");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_sensors_get_motion'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Is Moving");
			this.setOutput(true, "Boolean");
			this.setColour(90);
			this.setTooltip("Get Motion");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_sensors_get_freefall'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Is Free Falling");
			this.setOutput(true, "Boolean");
			this.setColour(90);
			this.setTooltip("Get Free Fall");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_sensors_get_battery'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Get Battery")
				.appendField(new Blockly.FieldDropdown([["Percentage", "1"], ["Charging State", "2"]]), "Properties");
			this.setOutput(true, null);
			this.setColour(90);
			this.setTooltip("Get Battery");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_sensors_get_accelerometer'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Get Accelerometer Axis")
				.appendField(new Blockly.FieldDropdown([["X", "1"], ["Y", "2"], ["Z", "3"]]), "Axis");
			this.setOutput(true, "Number");
			this.setColour(90);
			this.setTooltip("Get Accelerometer");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_sensors_set_buzzer'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Set Buzzer State")
				.appendField(new Blockly.FieldDropdown([["OFF", "0"], ["ON", "1"]]), "NAME");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(90);
			this.setTooltip("Set Buzzer");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_sensors_get_buzzer'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Get Buzzer State");
			this.setOutput(true, "Number");
			this.setColour(90);
			this.setTooltip("Get Buzzer");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_sensors_get_touch'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Get Touch");
			this.setOutput(true, "Number");
			this.setColour(180);
			this.setTooltip("Get Touch");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_sensors_get_switch'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Get Switch");
			this.setOutput(true, "Number");
			this.setColour(45);
			this.setTooltip("Get Switch");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_sensors_get_gyroscope'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Get Gyroscope Axis")
				.appendField(new Blockly.FieldDropdown([["X", "1"], ["Y", "2"], ["Z", "3"]]), "Axis");
			this.setOutput(true, "Number");
			this.setColour(90);
			this.setTooltip("Get Gyroscope");
			this.setHelpUrl("");
		}
	};
	Blockly.Blocks['rpk_sensors_switch'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Switch ")
				.appendField(new Blockly.FieldDropdown([["SW1", "1"], ["SW2", "2"], ["SW3", "3"], ["SW4", "4"]]), "Value");
			this.setOutput(true, "Number");
			this.setColour(45);
			this.setTooltip("Switch");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_sensors_touch'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Touch ")
				.appendField(new Blockly.FieldDropdown([["UP", "1"], ["DOWN", "2"], ["LEFT", "3"], ["RIGHT", "4"]]), "Value");
			this.setOutput(true, "Boolean");
			this.setColour(180);
			this.setTooltip("Touch");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_timing_sleep'] = {
		init: function () {
			this.appendValueInput("time")
				.setCheck("Number")
				.appendField("Sleep");
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([["seconds", "1"], ["miliseconds", "2"], ["microseconds", "3"]]), "measure_unit");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(60);
			this.setTooltip("Sleep");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_console_log'] = {
		init: function () {
			this.appendValueInput("str")
				.setCheck(null)
				.appendField("Console Log");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(300);
			this.setTooltip("Console Log");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_console_read'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Console Read");
			this.setInputsInline(true);
			this.setOutput(true, null);
			this.setColour(300);
			this.setTooltip("Console Log");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_ble_write_int_8'] = {
		init: function () {
			this.appendValueInput("str")
				.setCheck("Number")
				.appendField("Write Int 8");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(210);
			this.setTooltip("Write Int 8");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_ble_write_int_16'] = {
		init: function () {
			this.appendValueInput("str")
				.setCheck("Number")
				.appendField("Write Int 16");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(210);
			this.setTooltip("Write Int 16");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_ble_write_int_32'] = {
		init: function () {
			this.appendValueInput("str")
				.setCheck("Number")
				.appendField("Write Int 32");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(210);
			this.setTooltip("Write Int 32");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_ble_read_int_8'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Read Int 8");
			this.setInputsInline(true);
			this.setOutput(true, "Number");
			this.setColour(210);
			this.setTooltip("Read Int 8");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_ble_read_int_16'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Read Int 16");
			this.setInputsInline(true);
			this.setOutput(true, "Number");
			this.setColour(210);
			this.setTooltip("Read Int 16");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rpk_ble_read_int_32'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Read Int 32");
			this.setInputsInline(true);
			this.setOutput(true, "Number");
			this.setColour(210);
			this.setTooltip("Read Int 32");
			this.setHelpUrl("");
		}
	};
};