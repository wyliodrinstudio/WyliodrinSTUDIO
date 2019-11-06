import xml from 'xml-js';
import toolboxStr from 'raw-loader!./visual/toolbox.xml';

let studio = null;


let blocks = require ('./visual/definitions_adafruitdht.js');
let code = require ('./visual/code_adafruitdht.js');

export function setup (options, imports, register)
{
	studio = imports;

	let toolbox = xml.xml2js (toolboxStr);

	
	studio.projects.registerLanguagePackage ('python', null, [
		{
			name: 'Adafruit_DHT',
			description: 'Python library to read the DHT series of humidity and temperature sensors on a Raspberry Pi or Beaglebone Black.'
		}
	]);

	studio.editor_visual.registerBlocksDefinitions ('adafruitdht', blocks, code, toolbox, {
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