var studio = null;

import BoardSettings from './views/BoardSettings.vue';

export function setup (options, imports, register)
{
	studio = imports;

	imports.events.on ('ready', (imports) => 
	{
		// add optional imports
		studio = imports;

		/* Register Pin Layout */
		if (studio.pin_layout)
		{
			//TODO
		}
		else
		{
			studio.workspace.warn ('device.wyapp.tockos: pin_layout plugin is not available');
		}
	});

	let tockos = {
		/** 
		 * Device Icon 
		*/
		iconURL ()
		{
			return 'plugins/devices/wyapp/devices/tockos/data/img/icon-tockos.png';
		},
		/**
		 * Found a device, modify stuff (like icon)
		 * @param {Device} device 
		 */
		found (device)
		{
			device.icon = this.iconURL ();
			if (!device.description) device.description = 'TockOS';
		},

		/**
		 * Update a device, modify stuff
		 * @param {Device} device 
		 */
		update (device)
		{
			device.icon = this.iconURL ();
			if (!device.description) device.description = 'TockOS';
		},

		/**
		 * Modidify the project before run
		 * @param {Project} project - the project
		 */
		async run (project)
		{
			function extractNumber(line) {
				let value = (/(.*=\s*)(.*)/g).exec(line);

				if (value.length > 2) {
					value = value[2];
					if (value !== '') {
						return Number(value);
					}
				}

				return null;
			}

			let retVal = true;

			if (project.language === 'tockos-libtockc') {
				let boardSettings = {
					stackSize: 2048,
					appHeapSize: 1024,
					kernelHeapSize: 1024
				};
				
				let makefile = await studio.projects.loadFile(project, 'Makefile.app');
				if (makefile !== null) {
					makefile = makefile.toString('utf8').split(/\r?\n/);
					for (let line of makefile) {
						if (line.indexOf('STACK_SIZE') !== -1) {
							let value = extractNumber(line);
							if (value !== null)
								boardSettings.stackSize = value;
						} else if (line.indexOf('APP_HEAP_SIZE') !== -1) {
							let value = extractNumber(line);
							if (value !== null)
								boardSettings.appHeapSize = value;
						} else if (line.indexOf('KERNEL_HEAP_SIZE') !== -1) {
							let value = extractNumber(line);
							if (value !== null)
								boardSettings.kernelHeapSize = value;
						} 
					}
				}

				retVal = await studio.workspace.showDialog(BoardSettings, {boardSettings, project});
			}

			return retVal;
		}
	};

	/* Register Icon */
	studio.device_wyapp.registerBoard ('tockos', tockos);

	studio.projects.registerLanguagePackage ('tockos-board', 'tockos', {
		name: 'TockOS Board',
		description: 'TODO'
	});

	studio.projects.registerLanguagePackage ('tockos-libtockc', 'tockos', {
		name: 'TockOS LibTockC',
		description: 'TODO'
	});

	studio.editor_visual.registerBlocksDefinitions ('tockos',
		{
			type: 'wyapp', 
			board: 'tockos'
		}
	);

	register (null, {});
}