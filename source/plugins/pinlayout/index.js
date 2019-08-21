let studio = null;

import PinLayout from './views/PinLayout.vue';

var dict_pins_type_board = {};

var dict_pins_board = {};

var dict_pins_type = {};

export default function setup (options, imports, register)
{
	studio = imports;

	studio.workspace.registerTab('PIN_LAYOUT', 500, PinLayout, {
		visible: () => {
			let device = studio.workspace.getDevice ();
			return device.type !== 'none' && pin_layout._pinsLayoutImage(device.type, device.board) !== null;
		}
	});

	let pin_layout = {
		registerPinLayout(type, board, img) {
			if (type && board) {
				dict_pins_type_board[type+':'+board] = {
					img
				};
			} else if (type == null && board) {
				dict_pins_board[board] = {
					img
				};
			} else if (board == null && type) {
				dict_pins_type[type] = {
					img
				};
			}
		},

		_pinsLayoutImage (type, board)
		{
			if (type && board) {
				if (dict_pins_type_board[type+':'+board]) {
					return dict_pins_type_board[type+':'+board].img;
				}
			} else if (type == null && board) {
				if (dict_pins_board[board]) {
					return dict_pins_board[board].img;
				}
			} else if (type && board == null) {
				if (dict_pins_type[type]) {
					return dict_pins_type[type].img;
				}
			}

			return null;
		}
	};
	
	register (null, {
		pin_layout
	});
}
