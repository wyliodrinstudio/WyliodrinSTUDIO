import xml from 'xml-js';
import toolboxStr from 'raw-loader!./visual/toolbox.xml';

let studio = null;


let blocks = require ('./visual/definitions_wyliolab.js');
let code = require ('./visual/code_wyliolab.js');

export function setup (options, imports, register)
{
	studio = imports;

	studio.projects.registerLanguagePackage ('python', null, [
		{
			name: 'wyliozero',
			description: 'WyliodrinLab'
		}
	]);

	let toolbox = xml.xml2js (toolboxStr);
	studio.editor_visual.registerBlocksDefinitions ('wyliozero', blocks, code, toolbox, {
		type: 'wyapp', 
		board: 'raspberrypi', 
		visible ()
		{
			let device = studio.workspace.getDevice ();
			if (device.properties.wyliolab) return true;
			else return false;
		}
	});

	register (null, {});
}