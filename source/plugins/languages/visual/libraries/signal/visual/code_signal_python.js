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