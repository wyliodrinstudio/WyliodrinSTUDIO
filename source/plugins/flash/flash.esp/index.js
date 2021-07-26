import FlashDialog from './views/FlashDialog.vue';

let studio = null;

let flashesp = {};

export default function setup (options, imports, register)
{
	studio = imports;

	studio.flash.registerFlasher('esp', 'ESP8266/32', 'plugins/flash/flash.esp/data/img/ESP.png', FlashDialog, '1a86');

	register (null, {
		flashesp
	});
}
