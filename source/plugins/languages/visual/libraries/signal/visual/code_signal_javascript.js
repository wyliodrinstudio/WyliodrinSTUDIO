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