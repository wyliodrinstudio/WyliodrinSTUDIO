import $ from 'jquery';
import generic_rpk from './generic_rpk.js';

let switches = {
	generateSwitches: function() {
		$('#SW1').on ('mousedown', () => {
			console.log('sw1');
			generic_rpk.switchesDictionary['1'] = true;
		});

		$('#SW1').on ('mouseup', () => {
			generic_rpk.switchesDictionary['1'] = false;
		});

		$('#SW1').on ('mouseout', () => {
			generic_rpk.switchesDictionary['1'] = false;
		});

		$('#SW2').on ('mousedown', () => {
			console.log('sw2');
			generic_rpk.switchesDictionary['2'] = true;
		});

		$('#SW2').on ('mouseup', () => {
			generic_rpk.switchesDictionary['2'] = false;
		});

		$('#SW2').on ('mouseout', () => {
			generic_rpk.switchesDictionary['2'] = false;
		});

		$('#SW3').on ('mousedown', () => {
			console.log('sw3');
			generic_rpk.switchesDictionary['3'] = true;
		});

		$('#SW3').on ('mouseup', () => {
			generic_rpk.switchesDictionary['3'] = false;
		});

		$('#SW3').on ('mouseout', () => {
			generic_rpk.switchesDictionary['3'] = false;
		});

		$('#SW4').on ('mousedown', () => {
			console.log('sw4');
			generic_rpk.switchesDictionary['4'] = true;
		});

		$('#SW4').on ('mouseup', () => {
			generic_rpk.switchesDictionary['4'] = false;
		});

		$('#SW4').on ('mouseout', () => {
			generic_rpk.switchesDictionary['4'] = false;
		});
	}
}

export default switches;