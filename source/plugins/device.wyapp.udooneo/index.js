var studio = null;

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
			studio.pin_layout.registerPinLayout ('wyapp', 'udooneo', 'plugins/device.wyapp.udooneo/data/img/pins-udooneo.png');
		}
		else
		{
			studio.workspace.warn ('device.wyapp.udooneo: pin_layout plugin is not available');
		}
	});

	let udooneo = {
		/** 
		 * Device Icon 
		*/
		iconURL ()
		{
			return 'plugins/device.wyapp.udooneo/data/img/icon-udooneo.png';
		},

		/**
		 * Found a device, modify stuff (like icon)
		 * @param {Device} device 
		 */
		found (device)
		{
			device.icon = this.iconURL ();
			if (!device.description) device.description = 'UDOONeo';
		},

		/**
		 * Update a device, modify stuff
		 * @param {Device} device 
		 */
		update (device)
		{
			device.icon = this.iconURL ();
			if (!device.description) device.description = 'UDOONeo';
		},

		/**
		 * Modidify the project before run
		 * @param {Project} project - the project
		 */
		run (project)
		{
			project;
		}
	};

	/* Register Icon */
	studio.device_wyapp.registerBoard ('udooneo', udooneo);

	register (null, {});
}