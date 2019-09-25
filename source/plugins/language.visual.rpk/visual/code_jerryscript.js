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
		var value_x1 = Blockly.JavaScript.valueToCode(block, 'X1', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
		var value_rx = Blockly.JavaScript.valueToCode(block, 'RX', Blockly.JavaScript.ORDER_ATOMIC);
		var value_ry = Blockly.JavaScript.valueToCode(block, 'RY', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'GUI.fillEllipse(' + value_x + ', ' + value_y + ', ' + value_rx + ', ' + value_ry + ');\n';
		return code;
	};

	Blockly.JavaScript['rpk_gui_display_clear'] = function (block) {
		Blockly.JavaScript.setupGUI();
		// TODO: Assemble JavaScript into code variable.
		var code = 'GUI.displayClear();\n';
		return code;
	};

	Blockly.JavaScript['rpk_gui_display_newline'] = function (block) {
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

	Blockly.JavaScript['rpk_rgb_get_brightness'] = function (block) {
		Blockly.JavaScript.setupRGB();
		// TODO: Assemble JavaScript into code variable.
		var code = 'RGB.getBrightness()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_rgb_get_color'] = function (block) {
		Blockly.JavaScript.setupRGB();
		// TODO: Assemble JavaScript into code variable.
		var code = 'RGB.getColor()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_sensors_get_light'] = function (block) {
		Blockly.JavaScript.setupAMBIENTLIGHT();
		// TODO: Assemble JavaScript into code variable.
		var code = 'ambientLight.getValue()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_sensors_get_airquality'] = function (block) {
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

	Blockly.JavaScript['rpk_sensors_get_motion'] = function (block) {
		Blockly.JavaScript.setupMOTION();
		// TODO: Assemble JavaScript into code variable.
		var code = 'motion.getValue()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_sensors_get_freefall'] = function (block) {
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

	Blockly.JavaScript['rpk_sensors_get_buzzer'] = function (block) {
		Blockly.JavaScript.setupBUZZER();
		// TODO: Assemble JavaScript into code variable.
		var code = 'buzzer.getState()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_sensors_get_touch'] = function (block) {
		Blockly.JavaScript.setupTOUCHSCREEN();
		// TODO: Assemble JavaScript into code variable.
		var code = 'touchscreen.getValue()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_sensors_get_switch'] = function (block) {
		Blockly.JavaScript.setupSWITCHES();
		// TODO: Assemble JavaScript into code variable.
		var code = 'switches.getValue()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_sensors_get_gyroscope'] = function (block) {
		Blockly.JavaScript.setup.setupGYROSCOPE();
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

	Blockly.JavaScript['rpk_console_read'] = function (block) {
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

	Blockly.JavaScript['rpk_ble_read_int_8'] = function (block) {
		Blockly.JavaScript.setupBLE();
		// TODO: Assemble JavaScript into code variable.
		var code = 'BLE.readInt8()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_ble_read_int_16'] = function (block) {
		Blockly.JavaScript.setupBLE();
		// TODO: Assemble JavaScript into code variable.
		var code = 'BLE.readInt16()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rpk_ble_read_int_32'] = function (block) {
		Blockly.JavaScript.setupBLE();
		// TODO: Assemble JavaScript into code variable.
		var code = 'BLE.readInt32()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};
};
