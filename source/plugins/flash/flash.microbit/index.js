import FlashDialog from './views/FlashDialog.vue';

let studio = null;

let flashmicrobit = {};

export default function setup (options, imports, register)
{
	studio = imports;

	studio.flash.registerFlasher('micro1', 'Micro:bit V1', 'plugins/flash/flash.microbit/data/img/microbit1.png', FlashDialog, '0d28', ['9900', '9901']);
	studio.flash.registerFlasher('micro2', 'Micro:bit V2', 'plugins/flash/flash.microbit/data/img/microbit2.png', FlashDialog, '0d28', ['9903', '9904']);

	register (null, {
		flashmicrobit
	});
}
