import xml from 'xml-js';
import toolboxStr from 'raw-loader!./visual/toolbox.xml';

let studio = null;


let blocks = require ('./visual/definitions_libwyliodrin.js');
let code = require ('./visual/code_libwyliodrin.js');

let blocks_signals = require ('./visual/definitions_signals.js');
let code_signals = require ('./visual/code_signals.js');

export function setup (options, imports, register)
{
	studio = imports;

	let toolbox = xml.xml2js (toolboxStr);
	studio.editor_visual.registerBlocksDefinitions ('libwyliodrin', [blocks, blocks_signals], [code, code_signals], toolbox, {
		type: 'wyapp', 
		board: 'raspberrypi', 
		visible ()
		{
			let device = studio.workspace.getDevice ();
			if (device.properties.libwyliodrin && !device.properties.wyliolab) return true;
			else return false;
		}
	});

	register (null, {});
}