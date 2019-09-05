module.exports = function (blockly) {
	var Blockly = blockly.Blockly;
	// var goog = blockly.goog;

	/* Register all the Blockly code blocks that you need */
	Blockly.Awesome.block = function {
		if (!Blockly.Awesome.definitions_['block']) {
			Blockly.Awesome.definitions_['block'] = 'from wyliodrin import *\n';
		}
	}
};
