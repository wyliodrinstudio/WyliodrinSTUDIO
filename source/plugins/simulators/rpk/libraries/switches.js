import $ from 'jquery';
import generic_rpk from './generic_rpk.js';

let switches = {
	generateSwitches: function() {
		$('#sw1').on ('mousedown', () => {
			generic_rpk.switchesDictionary['1'] = true;
		});

		$('#sw1').on ('mouseup', () => {
			generic_rpk.switchesDictionary['1'] = false;
		});

		$('#sw1').on ('mouseout', () => {
			generic_rpk.switchesDictionary['1'] = false;
		});

		$('#sw2').on ('mousedown', () => {
			generic_rpk.switchesDictionary['2'] = true;
		});

		$('#sw2').on ('mouseup', () => {
			generic_rpk.switchesDictionary['2'] = false;
		});

		$('#sw2').on ('mouseout', () => {
			generic_rpk.switchesDictionary['2'] = false;
		});

		$('#sw3').on ('mousedown', () => {
			generic_rpk.switchesDictionary['3'] = true;
		});

		$('#sw3').on ('mouseup', () => {
			generic_rpk.switchesDictionary['3'] = false;
		});

		$('#sw3').on ('mouseout', () => {
			generic_rpk.switchesDictionary['3'] = false;
		});

		$('#sw4').on ('mousedown', () => {
			generic_rpk.switchesDictionary['4'] = true;
		});

		$('#sw4').on ('mouseup', () => {
			generic_rpk.switchesDictionary['4'] = false;
		});

		$('#sw4').on ('mouseout', () => {
			generic_rpk.switchesDictionary['4'] = false;
		});
	}
};

export default switches;