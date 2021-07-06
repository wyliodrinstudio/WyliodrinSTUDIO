let studio = null;

import FlashSelectDevice from './views/FlashSelectDevice.vue';

let flash = {
	
};

export default function setup (options, imports, register)
{
	studio = imports;

	studio.workspace.registerMenuItem ('TOOLBAR_FLASH', 20, () => studio.workspace.showDialog(FlashSelectDevice,{width:500}));
	
	register (null, {
		flash: flash
	});
}
