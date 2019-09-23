var studio = null;

let firmata_blocks = require ('./visual/definitions_pyfirmata.js');
let firmata_code = require ('./visual/code_pyfirmata.js');

import toolbox from 'raw-loader!./visual/toolbox.xml';

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
			studio.pin_layout.registerPinLayout ('wyapp', 'picopi', '');
		}
		else
		{
			studio.workspace.warn ('device.wyapp.picopi: pin_layout plugin is not available');
		}
	});

	let picopi = {
		/** 
		 * Device Icon 
		*/
		iconURL ()
		{
			return 'plugins/device.wyapp.picopi/data/img/icon-picopi.png';
		},
		/**
		 * Found a device, modify stuff (like icon)
		 * @param {Device} device 
		 */
		found (device)
		{
			device.icon = this.iconURL ();
			if (!device.description) device.description = 'Pico-Pi';
			device.defaultUsername = 'ubuntu';
			device.defaultPassword = 'ubuntu';
		},

		/**
		 * Update a device, modify stuff
		 * @param {Device} device 
		 */
		update (device)
		{
			device.icon = this.iconURL ();
			if (!device.description) device.description = 'Pico-Pi';
			device.defaultUsername = 'ubuntu';
			device.defaultPassword = 'ubuntu';
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
	studio.device_wyapp.registerBoard ('picopi', picopi);

	studio.projects.registerLanguagePackage ('nodejs', 'picopi', {
		name: 'onoff',
		description: 'GPIO access and interrupt detection with Node.js on Linux boards like the Pico-Pi, C.H.I.P. or BeagleBone.'
	});

	studio.projects.registerLanguagePackage ('python', 'picopi', {
		name: 'gpiozero',
		description: 'A simple interface to GPIO devices with Pico-Pi.'
	});

	studio.editor_visual.registerBlocksDefinitions ('picopi', [firmata_blocks], [firmata_code], toolbox, 
		{
			type: 'wyapp', 
			board: 'picopi'
		}
	);

	register (null, {});
}