// DO NOT EDIT THIS FILE, IT IS AUTMATICALLY GENERATED

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;
	// var goog = blockly.goog;
	// Screen and Keyboard

	Blockly.Python.import_json = function () {
		if (!Blockly.Python.definitions_['import_json']) {
			Blockly.Python.definitions_['import_json'] = 'import json\n';
		}
	};

	Blockly.Python['print'] = function (block) {
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'print (' + value_value + ')\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return code;
	};

	Blockly.Python['read'] = function (block) {
		// TODO: Assemble Python into code variable.
		var type = parseInt(block.getFieldValue('type'));
		var code;
		if (type == 0) {
			code = 'raw_input ("")';
		}
		else if (type == 1) {
			code = 'int(raw_input (""))';
		}
		else if (type == 2) {
			code = 'float(raw_input (""))';
		}
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['readwrite'] = function (block) {
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var type = parseInt(block.getFieldValue('type'));
		var code;
		if (type == 0) {
			code = 'raw_input (' + value_value + ')';
		}
		else if (type == 1) {
			code = 'int(raw_input (' + value_value + '))';
		}
		else if (type == 2) {
			code = 'float(raw_input (' + value_value + '))';
		}
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['readwritenr'] = function (block) {
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'int(raw_input (' + value_value + '))';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['println'] = function (block) {
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'print(' + value_value + ')\n';
		return code;
	};

	Blockly.Python['delay'] = function (block) {
		Blockly.Python.importtime();
		var value_millis = Blockly.Python.valueToCode(block, 'millis', Blockly.Python.ORDER_ATOMIC);
		var type = parseInt(block.getFieldValue('type'));
		if (isNaN(type)) type = 0;
		// TODO: Assemble Python into code variable.
		var code = '';
		if (type == 0) {
			code = 'sleep ((' + value_millis + ')/1000.0' + ')\n';
		}
		else if (type == 1) {
			code = 'sleep ((' + value_millis + ')/1000000.0' + ')\n';
		}
		else {
			code = 'sleep (' + value_millis + ')\n';
		}
		return code;
	};


	// Loops

	Blockly.Python.timer = function () {
		if (!Blockly.Python.definitions_['import_timer']) {
			Blockly.Python.definitions_['import_timer'] = 'from threading import Timer\n';
		}
	};

	Blockly.Python['repeat_timing'] = function (block) {
		var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_FUNCTION_CALL);
		var dropdown_time = block.getFieldValue('TIME');
		var statements_name = Blockly.Python.statementToCode(block, 'NAME');
		var type = parseInt(dropdown_time);
		Blockly.Python.timer();
		var dfunct = Blockly.Python.variableDB_.getDistinctName(
			'loopCode', Blockly.Generator.NAME_TYPE);
		if (type == 1) {
			value_value = value_value / 1000;
		}
		else if (type == 2) {
			value_value = value_value / 1000000;
		}
		var globals = Blockly.Variables.allUsedVariables(block);
		for (var i = 0; i < globals.length; i++) {
			globals[i] = Blockly.Python.variableDB_.getName(globals[i], Blockly.Variables.NAME_TYPE);
		}
		globals = globals.length ? '  global ' + globals.join(', ') + '\n' : '';
		// TODO: Assemble Python into code variable.
		var code = 'def ' + dfunct + '():\n' + globals + statements_name +
			'  Timer(' + value_value + ', ' + dfunct + ').start()\n' +
			dfunct + '()\n';
		return code;
	};

	Blockly.Python['json_key'] = function (block) {
		var value_key = Blockly.Python.valueToCode(block, 'key', Blockly.Python.ORDER_ATOMIC);
		var value_json = Blockly.Python.valueToCode(block, 'JSON', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_json + '[' + value_key + ']';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['json_index'] = function (block) {
		var value_index = Blockly.Python.valueToCode(block, 'index', Blockly.Python.ORDER_ATOMIC);
		var value_json = Blockly.Python.valueToCode(block, 'JSON', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_json + '[' + value_index + ']';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['json_items'] = function (block) {
		var value_json = Blockly.Python.valueToCode(block, 'JSON', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'len(' + value_json + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['truncate'] = function (block) {
		var value_truncate = Blockly.Python.valueToCode(block, 'truncate', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'int(' + value_truncate + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['map_block'] = function (block) {
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		var value_from_low = Blockly.Python.valueToCode(block, 'from_low', Blockly.Python.ORDER_ATOMIC);
		var value_to_low = Blockly.Python.valueToCode(block, 'to_low', Blockly.Python.ORDER_ATOMIC);
		var value_from_high = Blockly.Python.valueToCode(block, 'from_high', Blockly.Python.ORDER_ATOMIC);
		var value_to_high = Blockly.Python.valueToCode(block, 'to_high', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_to_low + '+ (' + value_value + '*(' + value_to_high + '-' + value_to_low + '))/(' + value_from_high + '-' + value_from_low + ')';
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['kelvintocelsius'] = function (block) {
		var value_degrees = Blockly.Python.valueToCode(block, 'degrees', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_degrees + '-273.15';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['fahrenheittocelsius'] = function (block) {
		var value_degrees = Blockly.Python.valueToCode(block, 'degrees', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = '(' + value_degrees + '-32)/1.8';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['celsiustokelvin'] = function (block) {
		var value_degrees = Blockly.Python.valueToCode(block, 'degrees', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_degrees + '+273.15';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['celsiustofahrenheit'] = function (block) {
		var value_degrees = Blockly.Python.valueToCode(block, 'degrees', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = '(' + value_degrees + '*1.8)+32';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['dict_get'] = function (block) {
		var dict = Blockly.Python.valueToCode(block, 'DICT',
			Blockly.Python.ORDER_MEMBER) || '___';
		var value = Blockly.Python.valueToCode(block, 'ITEM',
			Blockly.Python.ORDER_NONE) || '___';
		var code = dict + '[' + value + ']';
		return [code, Blockly.Python.ORDER_ATOMIC];
	};


	Blockly.Python['dict_get_literal'] = function (block) {
		var dict = Blockly.Python.valueToCode(block, 'DICT',
			Blockly.Python.ORDER_MEMBER) || '___';
		var value = Blockly.Python.quote_(block.getFieldValue('ITEM'));
		var code = dict + '[' + value + ']';
		return [code, Blockly.Python.ORDER_ATOMIC];
	};


	Blockly.Python['dicts_create_with'] = function (block) {
		// TODO: Assemble Python into code variable.
		var code = new Array(block.itemCount_);

		for (var n = 0; n < block.itemCount_; n++) {
			var key = Blockly.Python.quote_(block.getFieldValue('KEY' + n));
			var value = Blockly.Python.valueToCode(block, 'VALUE' + n,
				Blockly.Python.ORDER_NONE) || '___';
			code[n] = key + ': ' + value;
		}
		code = '{' + code.join(', ') + '}';
		return [code, Blockly.Python.ORDER_ATOMIC];
	};

	Blockly.Python['dict_keys'] = function (block) {
		var dict = Blockly.Python.valueToCode(block, 'DICT',
			Blockly.Python.ORDER_MEMBER) || '___';
		var code = dict + '.keys()';
		return [code, Blockly.Python.ORDER_ATOMIC];
	};

	Blockly.Python['to_json'] = function (block) {
		Blockly.Python.import_json ();
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'json.dumps (' + value_value+')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};
};