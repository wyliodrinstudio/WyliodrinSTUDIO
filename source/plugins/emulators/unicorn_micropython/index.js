import { emulator } from './unicorn/mp_unicorn.js';
import unicorn from './unicorn/unicorn-arm.min.js';

let studio = null;

async function readFirmware() {
	try {
		let data = await studio.filesystem.loadDataFile('emulators/unicorn_micropython', 'firmware/firmware_pyboard.bin');
		return data;
	} catch (err) {
		studio.workspace.error(err);
	}
}

let unicron_micropython = {

};

export async function setup (options, imports, register) {
	studio = imports;

	let firmware = await readFirmware ();

	studio.workspace.registerToolbarButton('MicroPython Emulator', 10, () => {
		let mp = emulator (unicorn, firmware);
		studio.console.show ();
		studio.console.select ('unicorn_micropython');
		studio.console.reset ();
		studio.console.register ((event, id, data) => {
			if (id ===  'unicorn_micropython' && event === 'data') {
				mp.inject (data);
			}
		});
		mp.events.on ('data', (data) => {
			studio.console.write ('unicorn_micropython', data);
		});
	}, 'plugins/projects/projects/data/img/icons/projects-icon.svg');

	register (null, {
		unicron_micropython: unicron_micropython
	});
}