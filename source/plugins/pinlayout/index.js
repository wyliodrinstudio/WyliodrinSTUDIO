let studio = null;

import PinLayout from './views/PinLayout.vue';

import _ from 'lodash';

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

		/**
		 * This function registers a customized pin layout image for the connected device. 
		 * It's called each time you create a plugin for a new type of board. Depending on 
		 * the type of the device or on the name of the board, the purpose of this function 
		 * is to display the specified image within the Pin Layout tab. 
		 * 
		 * @param {string} type - device type
		 * @param {string} board - board name
		 * @param {string} img - path to the pin layout image
		 */
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
			let image = null;
			if (type && board) {
				if (dict_pins_type_board[type+':'+board]) {
					image =  dict_pins_type_board[type+':'+board].img;
					// if(_.isFunction(image))
					// 	return image(studio.workspace.getDevice());
					// else
					// 	return image;
				}
			} else if (type == null && board) {
				if (dict_pins_board[board]) {
					// return dict_pins_board[board].img;
					image = dict_pins_board[board].img;
				}
			} else if (type && board == null) {
				if (dict_pins_type[type]) {
					// return dict_pins_type[type].img;
					image = dict_pins_type[type].img;
				}
			}

			if(image)
			{
				if(_.isFunction(image))
					return image(studio.workspace.getDevice());
				else
					return image;
			}
			return image;
		}
	};
	
	register (null, {
		pin_layout
	});
}
