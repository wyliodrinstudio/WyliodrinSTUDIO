var studio = null;

import AppBoardSettings from './views/AppBoardSettings.vue';

export function setup (options, imports, register)
{
	studio = imports;

	/**	
        imports.events.on ('ready', (imports) => 
		{
			// add optional imports
			studio = imports;
			// Register Pin Layout
			if (studio.pin_layout)
			{
				//TODO
			}
			else
			{
				studio.workspace.warn ('device.wyapp.tockos: pin_layout plugin is not available');
			}
		});
	*/

	let tockos = {
		name: 'Tock VM',
		setupOptions: {
			path: '/boot/',
			link: 'https://wyliodrinstudio.readthedocs.io/en/latest/boards.html'
		},
		priority: 100,
		/** 
		 * Device Icon 
		*/
		iconURL ()
		{
			return 'plugins/devices/wyapp/devices/tockos/data/img/tock-os-48.png';
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
			let retVal = true;

			if (project.language === 'tockos-libtockc') {
				retVal = await studio.workspace.showDialog(AppBoardSettings, {project});
			}

			return retVal;
		}
	};

	/* Register Icon */
	studio.device_wyapp.registerBoard ('tockos', tockos);

	studio.projects.registerLanguagePackage ('tockos-kernel', 'tockos', {
		name: 'TockOS Kernel',
		description: ''
	});

	studio.projects.registerLanguagePackage ('tockos-libtockc', 'tockos', {
		name: 'TockOS LibTockC',
		description: ''
	});

	register (null, {});
}
