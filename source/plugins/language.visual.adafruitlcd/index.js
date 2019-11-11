import xml from 'xml-js';
import toolboxStr from 'raw-loader!./visual/toolbox.xml';

let studio = null;


let blocks = require ('./visual/definitions_adafruitlcd.js');
let code = require ('./visual/code_adafruitlcd.js');

export function setup (options, imports, register)
{
	studio = imports;

	let toolbox = xml.xml2js (toolboxStr);

	
	studio.projects.registerLanguagePackage ('python', null, [
		{
			name: 'Adafruit-CharLCD',
			description: 'Python library for accessing Adafruit character LCDs from a Raspberry Pi or BeagleBone Black.'
		}
	]);

	studio.projects.registerLanguagePackage ('python', 'raspberrypi', [
		{
			name: 'RPi.GPIO',
			description: 'A Python module to control the GPIO on a Raspberry Pi'
		}
	]);

	studio.projects.registerLanguagePackage ('python', 'beagleboneblack', [
		{
			name: 'Adafruit_BBIO',
			description: 'Adafruit\'s BeagleBone IO Python Library'
		}
	]);

	studio.editor_visual.registerBlocksDefinitions ('adafruitcharlcd', blocks, code, toolbox, {
		type: 'wyapp',
		board: ['raspberrypi', 'beagleboneblack'],
		visible ()
		{
			let device = studio.workspace.getDevice ();
			if (!device.properties.wyliolab) return true;
			else return false;
		}
	});

	register (null, {});
}