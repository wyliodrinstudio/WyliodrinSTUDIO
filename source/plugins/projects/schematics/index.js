let studio = null;

import Schematics from './views/Schematics.vue';

let schematics = {
};
export default function setup (options, imports, register)
{
	studio = imports;

	studio.workspace.registerTab('SCHEMATICS', 400, Schematics, {
		enabled ()
		{
			return !!studio.projects.getCurrentProject();
		}
	});
	
	register (null, {
		schematics: schematics
	});
}
