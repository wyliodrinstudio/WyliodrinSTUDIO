import $ from 'jquery';
import generic_rpk from './generic_rpk.js';

let touches = {
	'generateTouches': function() {
		$('#UP').on ('mousedown', () => {
			console.log('up');
			generic_rpk.touchesDictionary['1'] = true;
		});

		$('#UP').on ('mouseup', () => {
			generic_rpk.touchesDictionary['1'] = false;
		});

		$('#UP').on ('mouseout', () => {
			generic_rpk.touchesDictionary['1'] = false;
		});

		$('#DOWN').on ('mousedown', () => {
			console.log('down');
			generic_rpk.touchesDictionary['2'] = true;
		});

		$('#DOWN').on ('mouseup', () => {
			generic_rpk.touchesDictionary['2'] = false;
		});

		$('#DOWN').on ('mouseout', () => {
			generic_rpk.touchesDictionary['2'] = false;
		});

		$('#LEFT').on ('mousedown', () => {
			console.log('left');
			generic_rpk.touchesDictionary['3'] = true;
		});

		$('#LEFT').on ('mouseup', () => {
			generic_rpk.touchesDictionary['3'] = false;
		});

		$('#LEFT').on ('mouseout', () => {
			generic_rpk.touchesDictionary['3'] = false;
		});

		$('#RIGHT').on ('mousedown', () => {
			console.log('right');
			generic_rpk.touchesDictionary['4'] = true;
		});

		$('#RIGHT').on ('mouseup', () => {
			generic_rpk.touchesDictionary['4'] = false;
		});

		$('#RIGHT').on ('mouseout', () => {
			generic_rpk.touchesDictionary['4'] = false;
		});
	}
}

export default touches;