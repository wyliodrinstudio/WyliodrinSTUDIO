import $ from 'jquery';
import generic_rpk from './generic_rpk.js';

let touches = {
	'generateTouches': function() {
		$('#up_touch').on ('mousedown', () => {
			console.log('up');
			generic_rpk.touchesDictionary['1'] = true;
		});

		$('#up_touch').on ('mouseup', () => {
			generic_rpk.touchesDictionary['1'] = false;
		});

		$('#up_touch').on ('mouseout', () => {
			generic_rpk.touchesDictionary['1'] = false;
		});

		$('#down_touch').on ('mousedown', () => {
			console.log('down');
			generic_rpk.touchesDictionary['2'] = true;
		});

		$('#down_touch').on ('mouseup', () => {
			generic_rpk.touchesDictionary['2'] = false;
		});

		$('#down_touch').on ('mouseout', () => {
			generic_rpk.touchesDictionary['2'] = false;
		});

		$('#left_touch').on ('mousedown', () => {
			console.log('left');
			generic_rpk.touchesDictionary['3'] = true;
		});

		$('#left_touch').on ('mouseup', () => {
			generic_rpk.touchesDictionary['3'] = false;
		});

		$('#left_touch').on ('mouseout', () => {
			generic_rpk.touchesDictionary['3'] = false;
		});

		$('#right_touch').on ('mousedown', () => {
			console.log('right');
			generic_rpk.touchesDictionary['4'] = true;
		});

		$('#right_touch').on ('mouseup', () => {
			generic_rpk.touchesDictionary['4'] = false;
		});

		$('#right_touch').on ('mouseout', () => {
			generic_rpk.touchesDictionary['4'] = false;
		});
	}
}

export default touches;