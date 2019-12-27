var studio = null;

let firmata_blocks = require ('./visual/definitions_pyfirmata.js');
let firmata_code = require ('./visual/code_pyfirmata.js');

let picamera_blocks = require ('./visual/definitions_picamera.js');
let picamera_code = require ('./visual/code_picamera.js');

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
			studio.pin_layout.registerPinLayout ('wyapp', 'raspberrypi', (device) => {
				if (device.properties.wyliolab)
				{
					return 'plugins/devices/wyapp.device.raspberrypi/data/img/pins-wyliozero.png';
				}
				else
				{
					return 'plugins/devices/wyapp.device.raspberrypi/data/img/pins-raspberrypi.png';
				}
			});
		}
		else
		{
			studio.workspace.warn ('device.wyapp.raspberrypi: pin_layout plugin is not available');
		}
	});

	let raspberrypi = {
		/** 
		 * Device Icon 
		*/
		iconURL ()
		{
			return 'plugins/devices/wyapp.device.raspberrypi/data/img/icon-raspberrypi.png';
		},
		/**
		 * Found a device, modify stuff (like icon)
		 * @param {Device} device 
		 */
		found (device)
		{
			device.icon = this.iconURL ();
			if (!device.description) device.description = 'Raspberry Pi';
			device.defaultUsername = 'pi';
			device.defaultPassword = 'raspberry';
		},

		/**
		 * Update a device, modify stuff
		 * @param {Device} device 
		 */
		update (device)
		{
			device.icon = this.iconURL ();
			if (!device.description) device.description = 'Raspberry Pi';
			device.defaultUsername = 'pi';
			device.defaultPassword = 'raspberry';
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
	studio.device_wyapp.registerBoard ('raspberrypi', raspberrypi);

	studio.projects.registerLanguagePackage ('nodejs', 'raspberrypi', {
		name: 'onoff',
		description: 'GPIO access and interrupt detection with Node.js on Linux boards like the Raspberry Pi, C.H.I.P. or BeagleBone.'
	});

	studio.projects.registerLanguagePackage ('python', 'raspberrypi', [
		{
			name: 'gpiozero',
			description: 'A simple interface to GPIO devices with Raspberry Pi.'
		},
		{
			name: 'pyFirmata',
			description: 'pyFirmata is a Python interface for the Firmata protocol.'
		},
	]);

	studio.editor_visual.registerBlocksDefinitions ('raspberrypi', [firmata_blocks, picamera_blocks], [firmata_code, picamera_code], toolbox, 
		{
			type: 'wyapp', 
			board: 'raspberrypi'
		}
	);

	register (null, {});
}