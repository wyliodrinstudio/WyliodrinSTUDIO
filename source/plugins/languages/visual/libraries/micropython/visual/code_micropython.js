// DO NOT EDIT THIS FILE, IT IS AUTMATICALLY GENERATED

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;
	// var goog = blockly.goog;

	Blockly.Python.micropython_import_Pin = function() {
		if (!Blockly.Python.definitions_['micropython_pin']) {
			Blockly.Python.definitions_['micropython_pin'] = 'from machine import Pin \n';
		}
	};

	Blockly.Python.micropython_import_PWM = function() {
		if (!Blockly.Python.definitions_['micropython_pwm']) {
			Blockly.Python.micropython_import_Pin ();
			Blockly.Python.definitions_['micropython_pwm'] = 'from machine import PWM \n';
		}
	};

	Blockly.Python.micropython_import_time = function() {
		if (!Blockly.Python.definitions_['micropython_time']) {
			Blockly.Python.definitions_['micropython_time'] = 'import time \n';
		}
	};

	Blockly.Python.micropython_import_sleep_from_time = function() {
		if (!Blockly.Python.definitions_['micropython_sleep_from_time']) {
			Blockly.Python.definitions_['micropython_sleep_from_time'] = 'from time import sleep \n';
		}
	};

	Blockly.Python.micropython_import_utime = function() {
		if (!Blockly.Python.definitions_['micropython_utime']) {
			Blockly.Python.definitions_['micropython_utime'] = 'import utime \n';
		}
	};

	Blockly.Python.micropython_import_dht = function() {
		if (!Blockly.Python.definitions_['micropython_dht']) {
			Blockly.Python.definitions_['micropython_dht'] = 'import dht \n';
		}
	};

	Blockly.Python.micropython_import_adc = function() {
		if (!Blockly.Python.definitions_['micropython_adc']) {
			Blockly.Python.definitions_['micropython_adc'] = 'from machine import ADC \n';
		}
	};

	Blockly.Python.micropython_import_network = function() {
		if (!Blockly.Python.definitions_['micropython_network']) {
			Blockly.Python.definitions_['micropython_network'] = 'import network \n';
		}
	};

	Blockly.Python.micropython_import_I2C = function() {
		if (!Blockly.Python.definitions_['micropython_I2C']) {
                        Blockly.Python.micropython_import_Pin ();
			Blockly.Python.definitions_['micropython_I2C'] = 'from machine import I2C \n';
		}
	};

	Blockly.Python.micropython_import_SPI = function() {
		if (!Blockly.Python.definitions_['micropython_SPI']) {
                        Blockly.Python.micropython_import_Pin ();
			Blockly.Python.definitions_['micropython_SPI'] = 'from machine import SPI \n';
		}
	};

	Blockly.Python['micropython_digital_input'] = function(block) {
		Blockly.Python.micropython_import_Pin();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var dropdown_type = block.getFieldValue('type');
		// TODO: Assemble Python into code variable.
		var code = 'Pin(' + value_pin.toString() + ', ' + 'Pin.IN' + ', ' + 'Pin.' + dropdown_type.toString() + ')' + '\n' ;
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['micropython_led'] = function(block) {
		Blockly.Python.micropython_import_Pin();
		var value_led = Blockly.Python.valueToCode(block, 'LED', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'Pin(' + value_led + ', ' + 'Pin.OUT)' + '\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['micropython_set_value'] = function(block) {
		var dropdown_set_value = block.getFieldValue('set_value');
		var value_pin_setvalue = Blockly.Python.valueToCode(block, 'pin_setValue', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_pin_setvalue.toString() + '.value' + '(' + dropdown_set_value.toString() + ')' + '\n'; 
		return code;
	};

	Blockly.Python['micropython_get_value'] = function(block) {
		var value_get_value = Blockly.Python.valueToCode(block, 'get_value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_get_value.toString() + '.value()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['micropython_on_off'] = function(block) {
		var dropdown_set_on_off = block.getFieldValue('set_on/off');
		var value_set_valueled = Blockly.Python.valueToCode(block, 'set_valueLED', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_set_valueled.toString() + '.' + dropdown_set_on_off.toString() + '()' + '\n';
		return code;
	};

	Blockly.Python['micropython_pwm'] = function(block) {
		Blockly.Python.micropython_import_PWM();
		var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
		var value_freq = Blockly.Python.valueToCode(block, 'freq', Blockly.Python.ORDER_ATOMIC);
		var value_duty = Blockly.Python.valueToCode(block, 'duty', Blockly.Python.ORDER_ATOMIC);
		var code = '';
		if (value_freq == 0 && value_duty == 0) {
			code = 'Pwm(' + value_pin.toString() + ', Pin.OUT'+ ')' + '\n';
		} else if (value_duty == 0 && value_freq != 0){
			code = 'PWM(' + '(' + value_pin.toString() + ', Pin.OUT)' + ', ' + 'freq=' + value_freq.toString() + ')' + '\n';
		} else if (value_freq == 0 && value_duty != 0) {
			code = 'PWM(' + '(' + value_pin.toString() + ', Pin.OUT)' + ', ' + 'duty=' + value_duty.toString() + ')' + '\n';
		} else {
			code = 'PWM(' + '(' + value_pin.toString() + ', Pin.OUT)' + ', ' + 'freq=' + value_freq.toString() + ', ' +'duty=' + value_duty.toString() + ')' + '\n';	
		}
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['micropython_pwm_methods'] = function(block) {
		var dropdown_methods = block.getFieldValue('methods');
		var value_methods = Blockly.Python.valueToCode(block, 'methods', Blockly.Python.ORDER_ATOMIC);
		var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = '';
		if (dropdown_methods.toString() === 'deinit') {
			code = value_name.toString() + '.' + dropdown_methods.toString() + '()' + '\n';
		} else {
			code = value_name.toString() + '.' + dropdown_methods.toString() + '(' + value_methods + ')' + '\n';
		}
	
		return code;
	};

	Blockly.Python['micropython_declaration_rgb_1'] = function(block) {
		var value_red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_ATOMIC);
		var value_green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_ATOMIC);
		var value_blue = Blockly.Python.valueToCode(block, 'blue', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'red = ' + value_red.toString() + '\n' + 'green = ' + value_green.toString() + '\n' + 'blue = ' + value_blue.toString() + '\n';
		return code;
	};

	Blockly.Python['micropython_rgb_pwm_set'] = function(block) {
		var dropdown_rgb = block.getFieldValue('rgb');
		var text_duty = block.getFieldValue('duty');
		var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = dropdown_rgb.toString() +'.' + text_duty.toString() + '(' + value_name + ')' + '\n';
		return code;
	};

	Blockly.Python['micropython_rgb_pin_set'] = function(block) {
		var dropdown_rgb = block.getFieldValue('rgb');
		var dropdown_func = block.getFieldValue('func');
		// TODO: Assemble Python into code variable.
		var code = dropdown_rgb.toString() + '.' + dropdown_func.toString() + '()' + '\n';
		return code;
	};

	Blockly.Python['micropython_time'] = function(block) {
		Blockly.Python.micropython_import_time();
		var dropdown_time = block.getFieldValue('time');
		var value_micropython_time = Blockly.Python.valueToCode(block, 'micropython_time', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'time.' + dropdown_time.toString() + '(' + value_micropython_time + ')' + '\n';
		return code;
	};

	Blockly.Python['micropython_sleep_from_time'] = function(block) {
		Blockly.Python.micropython_import_sleep_from_time();
		var dropdown_unit_measurement = block.getFieldValue('unit_measurement');
		var value_micropython_sleep_from_time = Blockly.Python.valueToCode(block, 'micropython_sleep_from_time', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = dropdown_unit_measurement.toString() + '(' + value_micropython_sleep_from_time + ')' + '\n';
		return code;
	};

	Blockly.Python['micropython_utime'] = function(block) {
		Blockly.Python.micropython_import_utime();
		var dropdown_utime = block.getFieldValue('utime');
		var value_micropython_utime = Blockly.Python.valueToCode(block, 'micropython_utime', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'utime.' + dropdown_utime.toString() + '(' + value_micropython_utime + ')\n';
		return code;
	};

	Blockly.Python['micropython_machine_time_pulse_us'] = function(block) {
		var value_pin_var = Blockly.Python.valueToCode(block, 'pin/var', Blockly.Python.ORDER_ATOMIC);
		var dropdown_pulse = block.getFieldValue('pulse');
		var value_timeout_us = Blockly.Python.valueToCode(block, 'timeout_us', Blockly.Python.ORDER_ATOMIC);
		var value_var = Blockly.Python.valueToCode(block, 'var', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = '';
		if (value_timeout_us == 0) {
			code = value_var.toString() + '=' + 'machine.time_pulse_us' + '(' + value_pin_var.toString() + ', ' + dropdown_pulse + ')' + '\n';
		} else {
			code = value_var.toString() + '=' + 'machine.time_pulse_us' + '(' + value_pin_var.toString() + ', ' + dropdown_pulse + ', ' + value_timeout_us + ')' + '\n';
		}
		return code;
	};

	Blockly.Python['micropython_adc'] = function(block) {
		Blockly.Python.micropython_import_adc();
		var value_adc_var = Blockly.Python.valueToCode(block, 'adc_var', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'ADC(' + value_adc_var + ')' + '\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['micropython_adc_method'] = function(block) {
		var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_name.toString() + '.read()' + '\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['micropython_adc_pin'] = function(block) {
		Blockly.Python.micropython_import_adc();
		var value_adc_pin = Blockly.Python.valueToCode(block, 'adc_pin', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'ADC( Pin(' + value_adc_pin.toString() + ', Pin.IN)' + ')' + '\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['micropython_i2c_standard_operation'] = function(block) {
		var dropdown_operation = block.getFieldValue('operation');
		var text_addr = block.getFieldValue('addr');
		//var dropdown_name = block.getFieldValue('NAME');
		var text_input = block.getFieldValue('input');
		var value_op = Blockly.Python.valueToCode(block, 'op', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'i2c.' + dropdown_operation.toString() + '( ' + text_addr.toString() + ', ' + text_input + ', ' + value_op.toString() + ')' + '\n';
		return code;
	};

	Blockly.Python['micropython_i2c'] = function(block) {
		Blockly.Python.micropython_import_I2C();
		var text_id = block.getFieldValue('id');
		var value_scl = Blockly.Python.valueToCode(block, 'scl', Blockly.Python.ORDER_ATOMIC);
		var value_sda = Blockly.Python.valueToCode(block, 'sda', Blockly.Python.ORDER_ATOMIC);
		var value_freq = Blockly.Python.valueToCode(block, 'freq', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = '';
		if (value_freq == 0) {
			code = 'I2C(' + 'id=' + text_id.toString() + ', ' + 'scl=Pin(' + value_scl + ')' + ', ' + 'sda=Pin(' + value_sda + ')' + ')' + '\n';
		} else 
			code = 'I2C(' + 'id=' + text_id.toString() + ', ' + 'scl=Pin(' + value_scl + ')' + ', ' + 'sda=Pin(' + value_sda + ')'+ ', ' + 'freq=' + value_freq.toString() + ')' + '\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	
	
	Blockly.Python['micropython_i2c_scan'] = function() {
		// TODO: Assemble Python into code variable.
		var code = 'i2c.scan()' + '\n';
		return code;
	};

	Blockly.Python['micropython_i2c_operation'] = function(block) {
		var dropdown_operation = block.getFieldValue('operation');
		// TODO: Assemble Python into code variable.
		var code = 'i2c.' + dropdown_operation.toString() + '()' + '\n';
		return code;
	};

	Blockly.Python['micropython_spi'] = function(block) {
		Blockly.Python.micropython_import_SPI();
		var value_spi = Blockly.Python.valueToCode(block, 'SPI', Blockly.Python.ORDER_ATOMIC);
		var value_bauderate = Blockly.Python.valueToCode(block, 'bauderate', Blockly.Python.ORDER_ATOMIC);
		var value_polarity = Blockly.Python.valueToCode(block, 'polarity', Blockly.Python.ORDER_ATOMIC);
		var value_phase = Blockly.Python.valueToCode(block, 'phase', Blockly.Python.ORDER_ATOMIC);
		var value_sck = Blockly.Python.valueToCode(block, 'sck', Blockly.Python.ORDER_ATOMIC);
		var value_mosi = Blockly.Python.valueToCode(block, 'mosi', Blockly.Python.ORDER_ATOMIC);
		var value_miso = Blockly.Python.valueToCode(block, 'miso', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'SPI(' + value_spi + ', ' + 'bauderate=' + value_bauderate + ', ' + 'polarity=' + value_polarity + ', ' + 'phase=' + value_phase + ', ' + 'sck=Pin(' + value_sck + ')' + ', ' + 'mosi=Pin(' + value_mosi + ')' + ', ' + 'miso=Pin(' + value_miso + ')' + ')' + '\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['micropython_spi_init'] = function(block) {
		var value_spi_init = Blockly.Python.valueToCode(block, 'spi_init', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'spi.init(baudrate=' + value_spi_init + ')' + '\n';
		return code;
	};

	Blockly.Python['micropython_spi_read'] = function(block) {
		var dropdown_read = block.getFieldValue('read');
		var value_param1 = Blockly.Python.valueToCode(block, 'param1', Blockly.Python.ORDER_ATOMIC);
		var dropdown_name = block.getFieldValue('NAME');
		// TODO: Assemble Python into code variable.
		var code = '';
		if (dropdown_name.toString() === 'none') {
			code = 'spi.'  + dropdown_read.toString() + '(' + value_param1 + ')' + '\n';
		} else {
			code = 'spi.'+ dropdown_read.toString() + '(' + value_param1 + ', ' + dropdown_name.toString() +')' + '\n';
		}
		return code;
	};

	Blockly.Python['micropythob_spi_create_buffer'] = function(block) {
		var value_buf = Blockly.Python.valueToCode(block, 'buf', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'bytearray(' + value_buf + ')' + '\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['micropython_spi_write'] = function(block) {
		var dropdown_write = block.getFieldValue('write');
		var value_param = Blockly.Python.valueToCode(block, 'param', Blockly.Python.ORDER_ATOMIC);
		var dropdown_param2 = block.getFieldValue('param2');
		// TODO: Assemble Python into code variable.
		var code = '';
		if (dropdown_param2.toString() === 'none') {
			code = 'spi.'  + dropdown_write.toString() + '(' + value_param + ')' + '\n';
		} else {
			code = 'spi.'+ dropdown_write.toString() + '(' + value_param + ', ' + dropdown_param2.toString() +')' + '\n';
		}
		return code;
	};

	Blockly.Python['micropython_print_format'] = function(block) {
		var text_quotation_mark = block.getFieldValue('text_quotation_mark');
		var value_var1 = Blockly.Python.valueToCode(block, 'var1', Blockly.Python.ORDER_ATOMIC);
		var value_var2 = Blockly.Python.valueToCode(block, 'var2', Blockly.Python.ORDER_ATOMIC);
		var value_var3 = Blockly.Python.valueToCode(block, 'var3', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = '';
		if (value_var1 && value_var2 && value_var3) {
			code = 'print("' + text_quotation_mark.toString() + '")' + '.format(' + value_var1.toString() + ',' + value_var2.toString() + ',' + value_var3.toString() + ')' +')\n';
		} else if (value_var1 && value_var2) {
			code = 'print("' + text_quotation_mark.toString() + '")' + '.format(' + value_var1.toString() + ',' + value_var2.toString() + ')' +')\n';
		} else if (value_var1 && value_var3) {
			code = 'print("' + text_quotation_mark.toString() + '")' + '.format(' + value_var1.toString() + ',' + value_var3.toString() + ')' +')\n';
		} else if (value_var2 && value_var3) {
			code = 'print("' + text_quotation_mark.toString() + '")' + '.format('  + value_var2.toString() + ',' + value_var3.toString() + ')' +')\n';
		} else if (value_var1) {
			code = 'print("' + text_quotation_mark.toString() + '")' + '.format(' + value_var1.toString() + ')' +')\n';
		} else if (value_var2) {
			code = 'print("' + text_quotation_mark.toString() + '")' + '.format(' + value_var2.toString() + ')' +')\n';
		} else if (value_var3) {
			code = 'print("' + text_quotation_mark.toString() + '")' + '.format(' + value_var3.toString() + ')' +')\n';
		}
		return code;
	};

	// Blockly.Python['micropython_dht'] = function(block) {
	// 	Blockly.Python.micropython_import_dht();
	// 	var value_dht = Blockly.Python.valueToCode(block, 'dht', Blockly.Python.ORDER_ATOMIC);
	// 	// TODO: Assemble Python into code variable.
	// 	var code = 'dht.DHT11(Pin())' + value_dht.toString();
	// 	// TODO: Change ORDER_NONE to the correct strength.
	// 	return [code, Blockly.Python.ORDER_NONE];
	// };

	Blockly.Python['micropython_dht'] = function(block) {
		var value_dht = Blockly.Python.valueToCode(block, 'dht', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'dht.DHT11(Pin'+ value_dht.toString() + ')' +')' + '\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['micropython_dht_sensors'] = function(block) {
		var dropdown_sensors = block.getFieldValue('sensors');
		var value_sensors = Blockly.Python.valueToCode(block, 'sensors', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code =value_sensors.toString() + '.' + dropdown_sensors.toString() + '()' +'\n'  ;
		return code;
	};

	Blockly.Python['micropython_get_dht_sensors'] = function(block) {
		var dropdown_sensors = block.getFieldValue('sensors');
		var value_get_value_sensor = Blockly.Python.valueToCode(block, 'get_value_sensor', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = '';
		if (value_get_value_sensor) {
			code = value_get_value_sensor.toString() + '.' + dropdown_sensors.toString() + '()';
		} else {
			code = dropdown_sensors.toString() + '()' + '\n';
		}
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['micropython_try_catch'] = function(block) {
		var statements_try_catch = Blockly.Python.statementToCode(block, 'try_catch');
		var text_error = block.getFieldValue('error');
		var value_except = Blockly.Python.valueToCode(block, 'except', Blockly.Python.ORDER_ATOMIC);
		var statements_except_code = Blockly.Python.statementToCode(block, 'except_code');
		// TODO: Assemble Python into code variable.
		var code = 'try:' + '\n' + statements_try_catch + 'except ' + text_error.toString() + ' as ' + value_except.toString() + ':' + '\n' + statements_except_code + '\n';
		return code;
	};

	Blockly.Python['micropython_network_wlan'] = function(block) {
		Blockly.Python.micropython_import_network();
		var dropdown_type = block.getFieldValue('type');
		// TODO: Assemble Python into code variable.
		var code = 'network.WLAN(network.' + dropdown_type.toString() + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['micropython_network_set_active'] = function(block) {
		var dropdown_name = block.getFieldValue('NAME');
		var value_active = Blockly.Python.valueToCode(block, 'active', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_active.toString() + '.active' + '(' + dropdown_name.toString() + ')';
		return code;
	};

	Blockly.Python['micropython_network_get_active'] = function(block) {
		var value_get = Blockly.Python.valueToCode(block, 'get', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_get.toString() + '.active()' + '\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['micropython_network_check_connection'] = function(block) {
		var dropdown_conn = block.getFieldValue('conn');
		var value_conn = Blockly.Python.valueToCode(block, 'conn', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_conn.toString() + '.' + dropdown_conn.toString() + '()' + '\n';
		return code;
	};

	Blockly.Python['micropython_network_wifi'] = function(block) {
		var text_essid = block.getFieldValue('ESSID');
		var text_password = block.getFieldValue('password');
		var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_name.toString() + '.connect(' + '"' + text_essid.toString() + '"' + ', '  + '"' + text_password + '"' + ')' + '\n';
		return code;
	};

	Blockly.Python['micropython_network_scan'] = function(block) {
		var value_scan = Blockly.Python.valueToCode(block, 'scan', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_scan.toString() + '.scan()' + '\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['micropython_network_config'] = function(block) {
		var text_name = block.getFieldValue('NAME');
		var value_config = Blockly.Python.valueToCode(block, 'config', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_config.toString() + '.config("' + text_name.toString() + '")' + '\n';
		return code;
	};

};
