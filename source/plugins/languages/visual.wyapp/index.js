import xml from 'xml-js';
import toolboxStr from 'raw-loader!./visual/toolbox.xml';

let studio = null;


let blocks_date_time = require ('./visual/definitions_date_time.js');
let blocks_http = require ('./visual/definitions_http.js');

let code_date_time_js = require ('./visual/code_date_time_javascript.js');
let code_http_js = require ('./visual/code_http_javascript.js');

let code_date_time_py = require ('./visual/code_date_time_python.js');
let code_http_py = require ('./visual/code_http_python.js');

export function setup (options, imports, register)
{
	studio = imports;

	let toolbox = xml.xml2js (toolboxStr);
	studio.editor_visual.registerBlocksDefinitions ('wyapp', [blocks_date_time, blocks_http], [code_date_time_py, code_date_time_js, code_http_py, code_http_js], toolbox, {
		type: 'wyapp'
	});

	register (null, {});
}