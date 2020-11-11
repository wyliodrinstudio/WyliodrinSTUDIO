import xml from 'xml-js';
import toolboxStr from 'raw-loader!./visual/toolbox.xml';

let studio = null;


let blocks_signal = require ('./visual/definitions_signal.js')

let signal_py = require ('./visual/code_signal_python.js');
let signal_js = require ('./visual/code_signal_javascript.js');

export function setup (options, imports, register)
{
	studio = imports;

	let toolbox = xml.xml2js (toolboxStr);
	studio.editor_visual.registerBlocksDefinitions ('signal', [blocks_signal], [signal_py, signal_js], toolbox);

	register (null, {});
}