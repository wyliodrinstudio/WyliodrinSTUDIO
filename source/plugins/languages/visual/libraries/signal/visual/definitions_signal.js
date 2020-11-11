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
};
