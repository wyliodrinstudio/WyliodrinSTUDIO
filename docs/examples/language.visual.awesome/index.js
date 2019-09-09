import xml from 'xml-js';
import toolboxStr from 'raw-loader!./visual/toolbox.xml';

let studio = null;


let blocks = require ('./visual/definitions_for_awesome.js');
let code = require ('./visual/code_for_awesome.js');

export function setup (options, imports, register)
{
	studio = imports;

	studio.projects.registerLanguageAddon ('visual', 'awesome', 'awesome', {
		getDefaultRunFileName ()
		{
			return '/main.visual.aws';
		},

		/* language specific options */
		sourceLanguage ()
		{
			return 'javascript';
		}
	});


	let toolbox = xml.xml2js (toolboxStr);
	studio.editor_visual.registerBlocksDefinitions ('awesome', blocks, code, toolbox, {type: 'awesome', board: 'awesome'});

	register (null, {});
}