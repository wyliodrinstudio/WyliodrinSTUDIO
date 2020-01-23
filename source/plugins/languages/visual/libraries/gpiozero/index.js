import xml from 'xml-js';
import toolboxStr from 'raw-loader!./visual/toolbox.xml';

let studio = null;


let blocks = require ('./visual/definitions_gpiozero.js');
let code = require ('./visual/code_gpiozero.js');

export function setup (options, imports, register)
{
	studio = imports;

	let toolbox = xml.xml2js (toolboxStr);

	
	studio.projects.registerLanguagePackage ('python', null, [
		{
			name: 'gpiozero',
			description: 'A simple interface to GPIO devices with Raspberry Pi.'
		},
		{
			name: 'RPi.GPIO',
			description: 'A module to control Raspberry Pi GPIO channels.'
		},
	]);

	studio.editor_visual.registerBlocksDefinitions ('gpiozero', blocks, code, toolbox, {
		type: 'wyapp', 
		board: 'raspberrypi', 
		visible ()
		{
			let device = studio.workspace.getDevice ();
			if (!device.properties.wyliolab) return true;
			else return false;
		}
	});

	register (null, {});
}