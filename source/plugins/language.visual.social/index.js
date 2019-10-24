import xml from 'xml-js';
import toolboxStr from 'raw-loader!./visual/toolbox.xml';

let studio = null;


let blocks = require ('./visual/definitions_social.js');
let code = require ('./visual/code_social.js');

export function setup (options, imports, register)
{
	studio = imports;

	let toolbox = xml.xml2js (toolboxStr);

	
	studio.projects.registerLanguagePackage ('python', null, [
		{
			name: 'python-facebook-api',
			description: 'A Python wrapper around the Facebook API'
		},
		{
			name: 'requests',
			description: 'Python HTTP for Humans.'
		},
		{
			name: 'tweepy',
			description: 'An easy-to-use Python library for accessing the Twitter API.'
		},
		{
			name: 'twilio',
			description: 'The Twilio Python Helper Library'
		},
	]);

	studio.editor_visual.registerBlocksDefinitions ('social', blocks, code, toolbox, {
		type: 'wyapp',
		visible ()
		{
			let device = studio.workspace.getDevice ();
			if (!device.properties.wyliolab) return true;
			else return false;
		}
	});

	register (null, {});
}