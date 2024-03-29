import xml from 'xml-js';
import toolboxStr from 'raw-loader!./visual/toolbox.xml';

let studio = null;


let blocks = require ('./visual/definitions_micropython.js');
let code = require ('./visual/code_micropython.js');

export function setup (options, imports, register)
{
	studio = imports;

	let toolbox = xml.xml2js (toolboxStr);

	studio.editor_visual.registerBlocksDefinitions ('micropython', blocks, code, toolbox, {
		type: 'mp',
	});

	register (null, {});
}