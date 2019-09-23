import OPCUAModelEditor from './views/OPCUAModelEditor.vue';
import _ from 'lodash';

// import blockly from './blockly/blockly_compressed_studio.js';
// require ('./blockly/msg/js/en_studio.js')(blockly);

// require ('./blockly/blocks_compressed_studio.js')(blockly);

// require ('./blockly/python_compressed_studio.js')(blockly);
// require ('./blockly/javascript_compressed_studio.js')(blockly);

import Blockly from 'node-blockly/browser';

// require ('../visual/definitions_wyliolab.js') (blockly);
// require ('../visual/code_wyliolab.js') (blockly);

let blocks =require ('./visual/language_definitions.js');
let jscode = require ('./visual/language_javascript.js');

// const Blockly = blockly.Blockly;

// const swal = require ('sweetalert');

export default function setup (options, imports, register)
{
	const studio = imports;
	studio.projects.registerEditor(OPCUAModelEditor.name,['opcuamodel'],OPCUAModelEditor);

	blocks ({Blockly});
	jscode ({Blockly});
	
	// TODO register confirm and prompt

	let editor_opcuamodel = {
		getBlockly ()
		{
			return Blockly;
		}
	};

	Blockly.prompt = async function (title, oldValue, callback)
	{
		try
		{
			let value = await studio.workspace.showPrompt (title.split(' ')[0], title, '', oldValue, 'OK');
			callback (value);
		}
		catch (e)
		{
			// console.log (e);
			callback (null);
		}
	};

	Blockly.confirm = async function (title, callback)
	{
		try
		{
			let value = await studio.workspace.showConfirmationPrompt (title, '');
			callback (value);
		}
		catch (e)
		{
			callback (null);
		}
	};

	register (null, {
		editor_opcuamodel
	});
}
