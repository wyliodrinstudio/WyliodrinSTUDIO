import Visual from './views/VisualEditor.vue';
import _ from 'lodash';
import xml from 'xml-js';
import toolboxStr from 'raw-loader!./visual/toolbox.xml';

// import blockly from './blockly/blockly_compressed_studio.js';
// require ('./blockly/msg/js/en_studio.js')(blockly);

// require ('./blockly/blocks_compressed_studio.js')(blockly);

// require ('./blockly/python_compressed_studio.js')(blockly);
// require ('./blockly/javascript_compressed_studio.js')(blockly);

import Blockly from 'node-blockly/browser';

// require ('../visual/definitions_wyliolab.js') (blockly);
// require ('../visual/code_wyliolab.js') (blockly);

let blocks =require ('./visual/language_definitions.js');
let pycode = require ('./visual/language_python.js');
let jscode = require ('./visual/language_javascript.js');

// const Blockly = blockly.Blockly;

// const swal = require ('sweetalert');

export default function setup (options, imports, register)
{
	const studio = imports;
	studio.projects.registerEditor(Visual.name,['visual'],Visual);
	
	// TODO register confirm and prompt

	let editor_visual = {
		_toolboxes: [],

		_isToolboxRegistered (id)
		{
			return this._toolboxes.find (toolbox => toolbox.id === id);
		},

		getToolboxes ()
		{
			return this._toolboxes;
		},

		getBlockly ()
		{
			return Blockly;
		},

		/**
		 * Register blocks definitions
		 * @param {string} id 
		 * @param {function(blockly)} blocks 
		 * @param {function(blockly)|[function(blockly)]} codes 
		 * @param {Object} toolbox 
		 * @param {Object} options 
		 */
		registerBlocksDefinitions (id, blocks, codes, toolbox, options)
		{
			// blocksDefinitions[id] = _.assign ({}, options, {
			// 	// blocks,
			// 	// code,
			// 	toolbox
			// });

			if (!options) options = {};

			if (!this._isToolboxRegistered(id))
			{
				// TODO should register over the old registration??
				try
				{
					if (_.isArray (blocks))
					{
						for (let block of blocks) block ({Blockly});
					}
					else
					{
						blocks ({Blockly});
					}
					if (_.isArray (codes))
					{
						for (let code of codes) code ({Blockly});
					}
					else
					{
						codes ({Blockly});
					}
				}
				catch (e)
				{
					studio.workspace.error ('projects.editor.visual: register blocks for '+id+' failed with '+e.message);
				}
				this._toolboxes.push ({
					id,
					toolbox:_.isString(toolbox)?xml.xml2js(toolbox):toolbox,
					type: options.type,
					board: options.board,
					visible: _.isFunction(options.visible)?options.visible:() => true,
					language: options.language
				});
			}
			else
			{
				studio.workspace.warn ('projects.editor.visual: register blocks for '+id+' failed as blocks with the same id are already registered');
			}

		}
	};

	// read toolbox
	try
	{
		let toolbox = xml.xml2js (toolboxStr);
		editor_visual.registerBlocksDefinitions ('standard', blocks, [pycode, jscode], toolbox, {});
	}
	catch (e)
	{
		studio.workspace.error ('projects.editor.visual: loading toolbar failed with '+e.message);
	}

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
		editor_visual
	});
}
