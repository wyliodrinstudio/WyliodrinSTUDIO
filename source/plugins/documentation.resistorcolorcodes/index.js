let studio = null;

import ResistorColorCodeDialog from './views/ResistorColorCodeDialog.vue';

let resistorcolorcodes = {
	
};
export default function setup (options, imports, register)
{
	studio = imports;

	studio.workspace.registerMenuItem ('TOOLBAR_RESISTOR_COLOR_CODE', 20, () => studio.workspace.showDialog(ResistorColorCodeDialog,{width:1500}));
	
	register (null, {
		resistorcolorcodes: resistorcolorcodes
	});
}
