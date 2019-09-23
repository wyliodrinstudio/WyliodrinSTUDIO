import xml from 'xml-js';
import toolboxStr from 'raw-loader!./visual/toolbox.xml';

let studio = null;


let blocks = require ('./visual/definitions_jerryscript.js');
let code = require ('./visual/code_jerryscript.js');

export function setup (options, imports, register)
{
	studio = imports;

	studio.projects.registerLanguageAddon ('visual', ['rpk', 'rpk_simulator'], 'rpk', {
		getDefaultRunFileName ()
		{
			return '/main.visual.js';
		},

		/* language specific options */
		sourceLanguage ()
		{
			return 'javascript';
		},
		icon:'plugins/language.visual.rpk/data/img/testIcon.png',
		pictograms:[
			
		]
	});


	let toolbox = xml.xml2js (toolboxStr);
	studio.editor_visual.registerBlocksDefinitions ('rpk', blocks, code, toolbox, {type: ['rpk', 'rpk_simulator'], board: 'rpk'});

	register (null, {});
}