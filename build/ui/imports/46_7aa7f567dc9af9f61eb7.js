(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[46],{

/***/ 1326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setup; });
/* harmony import */ var _views_OPCUAModelEditor_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1327);
/* harmony import */ var node_blockly_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1336);
/* harmony import */ var node_blockly_browser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_blockly_browser__WEBPACK_IMPORTED_MODULE_1__);


// import blockly from './blockly/blockly_compressed_studio.js';
// require ('./blockly/msg/js/en_studio.js')(blockly);

// require ('./blockly/blocks_compressed_studio.js')(blockly);

// require ('./blockly/python_compressed_studio.js')(blockly);
// require ('./blockly/javascript_compressed_studio.js')(blockly);



// require ('../visual/definitions_wyliolab.js') (blockly);
// require ('../visual/code_wyliolab.js') (blockly);

let blocks =__webpack_require__ (1345);
let jscode = __webpack_require__ (1346);

// const Blockly = blockly.Blockly;

// const swal = require ('sweetalert');

function setup (options, imports, register)
{
	const studio = imports;
	studio.projects.registerEditor(_views_OPCUAModelEditor_vue__WEBPACK_IMPORTED_MODULE_0__["default"].name,['opcuamodel'],_views_OPCUAModelEditor_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);

	blocks ({Blockly: (node_blockly_browser__WEBPACK_IMPORTED_MODULE_1___default())});
	jscode ({Blockly: (node_blockly_browser__WEBPACK_IMPORTED_MODULE_1___default())});
	
	// TODO register confirm and prompt

	let editor_opcuamodel = {
		getBlockly ()
		{
			return node_blockly_browser__WEBPACK_IMPORTED_MODULE_1___default.a;
		}
	};

	node_blockly_browser__WEBPACK_IMPORTED_MODULE_1___default.a.prompt = async function (title, oldValue, callback)
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

	node_blockly_browser__WEBPACK_IMPORTED_MODULE_1___default.a.confirm = async function (title, callback)
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


/***/ }),

/***/ 1327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OPCUAModelEditor_vue_vue_type_template_id_4bfe57fc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1328);
/* harmony import */ var _OPCUAModelEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1330);
/* empty/unused harmony star reexport *//* harmony import */ var _OPCUAModelEditor_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1333);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _OPCUAModelEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OPCUAModelEditor_vue_vue_type_template_id_4bfe57fc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _OPCUAModelEditor_vue_vue_type_template_id_4bfe57fc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/projects/editor.opcuamodel/views/OPCUAModelEditor.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OPCUAModelEditor_vue_vue_type_template_id_4bfe57fc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1329);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OPCUAModelEditor_vue_vue_type_template_id_4bfe57fc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OPCUAModelEditor_vue_vue_type_template_id_4bfe57fc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "fill-height", attrs: { id: "visualPanel" } },
    [_c("div", { ref: "visual" })]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_OPCUAModelEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1331);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_OPCUAModelEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var raw_loader_visual_toolbox_xml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1332);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(294);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'OPCUAModelEditor',
	props: ['project', 'filename', 'active'],
	
	data ()
	{
		return {
			reload: true,
			visualSource: '',
			extension:'',
			show:false,
			workspace: null,
			source: '',
		};
	},
	computed: {
		...Object(vuex__WEBPACK_IMPORTED_MODULE_1__["mapGetters"]) ({
			currentProject: 'projects/currentProject',
			device: 'workspace/device',
			mode: 'workspace/mode'
		})
	},
	methods: {
		initVisual ()
		{
			let Blockly = this.studio.editor_opcuamodel.getBlockly();
			let blocklyDiv = this.$refs.visual;

			this.workspace = Blockly.inject(blocklyDiv, {
				media: 'plugins/projects/editor.visual/data/media/',
				toolbox: raw_loader_visual_toolbox_xml__WEBPACK_IMPORTED_MODULE_0__["default"],
				horizontalLayout: true,
				zoom:
				{
					controls: true,
					wheel: true,
					startScale: 1.0,
					maxScale: 3,
					minScale: 0.3,
					scaleSpeed: 1.2
				},
				move: {
					scrollbars: true
				},
				collapse: true, 
				comments : true, 
			});

			// console.log (document.getElementById('toolbox').innerHTML);
			// console.log (xml.xml2js ('<toolbar>'+document.getElementById('toolbox').innerHTML+'</toolbar>'));

			window.addEventListener('resize', this.resize, false);
			this.resize();
			// var that = this;
			this.workspace.addChangeListener (() =>
			{
				var xml = Blockly.Xml.workspaceToDom (this.workspace);
				var visual = Blockly.Xml.domToText (xml);
				this.studio.projects.saveFile (this.project, this.filename, visual);
				this.source = visual;
				this.updateSource ();
				// if (that.selectedFile && that.visual)
				// {
				// 	that.fileSource = visual;
				// 	that.pythonVisualSource = '# This file was automatically generated by the Visual language\n# You may edit it, it will be overwritten when you change the Visual language\n\n'+Blockly.Python.workspaceToCode(workspace);
				// }
				// console.log (code);
			});
			this.loadSource ();
		},
		loadSource ()
		{
			if (this.workspace)
			{
				let Blockly = this.studio.editor_opcuamodel.getBlockly ();
				this.workspace.clear ();
				if (path__WEBPACK_IMPORTED_MODULE_2___default.a.extname (this.filename) === '.opcuamodel')
				{
					try
					{
						let xml = Blockly.Xml.textToDom(this.source);
						Blockly.Xml.domToWorkspace(xml, this.workspace);  
					}
					catch (e)
					{
						let xml = Blockly.Xml.textToDom('<xml></xml>');
						Blockly.Xml.domToWorkspace(xml, this.workspace);
					}
				}
				this.resize ();
				this.visualsource = '';
			}
		},
		update ()
		{
			if (this.workspace)
			{
				this.updateSource ();
			}
		},
		updateSource ()
		{
			if (this.workspace)
			{
				let Blockly = this.studio.editor_opcuamodel.getBlockly ();
				try
				{
					let visualSource = '// This file was automatically generated by the Visual language\n// You may edit it, it will be overwritten when you change the Visual language\nconst opcua = require (\'node-opcua\');\n\n\nmodule.exports = function (server, templateObjects = {}) {\n  let namespace = server.engine.addressSpace.getOwnNamespace();\n  let folder = \'ObjectsFolder\';\n  let folderId = \'\';\n  '+Blockly.JavaScript.workspaceToCode(this.workspace).split ('\n').join ('\n  ')+'\n};\n';
					if (this.visualSource !== visualSource)
					{
						//this.$emit ('visual-source', visualSource);
						this.visualSource = visualSource;
						this.saveVisualSource(this.visualSource, 'js');
						this.extension = 'js';
					}
				}
				catch (e)
				{
					this.studio.workspace.warn (e.message);
				}
			}
		},
		resize ()
		{
			if (this.workspace) 
			{
				let Blockly = this.studio.editor_opcuamodel.getBlockly ();
				let visualPanel = this.$el;
				let blocklyDiv = this.$refs.visual;
				var element = visualPanel;
				var x = 0;
				var y = 0;
				do {
					x += element.offsetLeft;
					y += element.offsetTop;
					element = element.offsetParent;
				} while (element);
				// Position blocklyDiv over blocklyArea.
				blocklyDiv.style.left = x + 'px';
				blocklyDiv.style.top = y + 'px';
				blocklyDiv.style.width = visualPanel.offsetWidth + 'px';
				blocklyDiv.style.height = visualPanel.offsetHeight + 'px';
				Blockly.svgResize(this.workspace);
			}
		},
		saveVisualSource (visualSource, extension)
		{
			this.studio.projects.saveFile (this.currentProject, this.filename.substring (0, this.filename.length-11)+'.opcuamodel.'+extension, visualSource);
			// let obj = {
			// 	path:this.currentFile.path + '.pysandra'
			// };
			// if (obj)
			// {
			// 	this.studio.projects.saveFile({
			// 		item: obj,
			// 		buffer: pythonVisualSource
			// 	});
				
			// }
		}
	},
	mounted ()
	{
		this.initVisual ();
	},
	destroyed ()
	{
		if (this.workspace) 
		{
			this.workspace.dispose ();
			window.removeEventListener ('resize', this.resize);
		}
	},
	watch: {
		device ()
		{
			this.update ();
		},
		filename: {
			immediate: true,
			async handler ()
			{
				// TODO queue reloads
				this.source = await this.studio.projects.loadFile (this.project, this.filename);				
				this.loadSource ();
			}
		},
		mode ()
		{
			this.resize ();
		},
		active ()
		{
			setTimeout (() => { this.resize (); this.loadSource (); }, 10);
		}
	}
});


/***/ }),

/***/ 1332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<xml xmlns=\"https://developers.google.com/blockly/xml\" id=\"toolbox\" style=\"display: none\">\n  <block type=\"opcuamodel_folder\">\n    <field name=\"folder_name\">folder_name</field>\n  </block>\n  <block type=\"opcuamodel_template\">\n    <field name=\"template_name\">template_name</field>\n  </block>\n  <block type=\"opcuamodel_variable\">\n    <field name=\"variable_name\">variable_name</field>\n    <field name=\"variable_type\">Boolean</field>\n    <field name=\"variable_history\">FALSE</field>\n  </block>\n</xml>");

/***/ }),

/***/ 1333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OPCUAModelEditor_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1334);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OPCUAModelEditor_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OPCUAModelEditor_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OPCUAModelEditor_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OPCUAModelEditor_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OPCUAModelEditor_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1334:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1335);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("6be7bc2e", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 1335:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "input.blocklyHtmlInput {\n  background-color: #ffffff;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 1345:
/***/ (function(module, exports) {

// DO NOT EDIT THIS FILE, IT IS AUTMATICALLY GENERATED

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;
	// var goog = blockly.goog;
	// Screen and Keyboard

	Blockly.Blocks['opcuamodel_variable'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Variable');
			this.appendDummyInput()
				.appendField(new Blockly.FieldTextInput('variable_name'), 'variable_name');
			this.appendDummyInput()
				.appendField('Data Type')
				.appendField(new Blockly.FieldDropdown([
					['Boolean', 'Boolean'], 
					['Byte', 'Byte'], 
					['ByteString', 'ByteString'],
					['DataValue', 'DataValue'],
					['DateTime', 'DateTime'],
					['Double', 'Double'], 
					['Float', 'Float'], 
					['GUID', 'Guid'], 
					['Int16', 'Int16'], 
					['Int32', 'Int32'], 
					['Int64', 'Int64'], 
					['LocalizedText', 'LocalizedText'], 
					['NodeId', 'NodeId'], 
					['QualifiedName', 'QualifiedName'], 
					['SByte', 'SByte'], 
					['String', 'String'], 
					['UInt16', 'UInt16'], 
					['UInt32', 'UInt32'], 
					['Uint64', 'UInt64'], 
					['Variant', 'Variant'], 
					['XmlElement', 'XmlElement'], 
				]), 'variable_type');
			this.appendDummyInput()
				.appendField('History')
				.appendField(new Blockly.FieldCheckbox('FALSE'), 'variable_history');
			this.setInputsInline(true);
			this.setPreviousStatement(true, ['opcuamodel_property', 'opcuamodel_object', 'opcuamodel_folder']);
			this.setNextStatement(true, ['opcuamodel_property', 'opcuamodel_object', 'opcuamodel_folder']);
			this.setColour(230);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['opcuamodel_folder'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Folder')
				.appendField(new Blockly.FieldTextInput('folder_name'), 'folder_name');
			this.appendStatementInput('folder_objects_properties')
				.setCheck(['opcuamodel_property', 'opcuamodel_object', 'opcuamodel_folder']);
			this.setPreviousStatement(true, ['opcuamodel_object', 'opcuamodel_folder']);
			this.setNextStatement(true, ['opcuamodel_object', 'opcuamodel_folder']);
			this.setColour(210);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['opcuamodel_template'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('Folder Template')
				.appendField(new Blockly.FieldTextInput('template_name'), 'template_name');
			this.appendStatementInput('folder_objects_properties')
				.setCheck(['opcuamodel_property', 'opcuamodel_object', 'opcuamodel_folder']);
			this.setPreviousStatement(true, ['opcuamodel_object', 'opcuamodel_folder']);
			this.setNextStatement(true, ['opcuamodel_object', 'opcuamodel_folder']);
			this.setColour(220);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

};


/***/ }),

/***/ 1346:
/***/ (function(module, exports) {

// DO NOT EDIT THIS FILE, IT IS AUTMATICALLY GENERATED

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;
	// var goog = blockly.goog;
	// Screen and Keyboard

	Blockly.JavaScript.opcuamodel_add_variable = function () {
		if (!Blockly.JavaScript.definitions_['opcuamodel_add_variable']) {
			Blockly.JavaScript.definitions_['opcuamodel_add_variable'] = 'function opcuamodelAddVariable (id, browseName, folder, namespace, dataType, options) {\n  return namespace.addVariable({\n    componentOf: folder,\n    browseName: browseName,\n    nodeId: id,\n    dataType: dataType,\n  });\n}\n';
		}
	};

	Blockly.JavaScript.opcuamodel_add_folder = function (name, statements) {
		let foldervariable = Blockly.JavaScript.variableDB_.getDistinctName(name, Blockly.Generator.NAME_TYPE);
		let folder_id = name.replace (/[^A-Za-z0-9]/g, '_');
		Blockly.JavaScript.definitions_['opcuamodel_add_folder_'+foldervariable] = 'function opcuamodelAddFolder'+foldervariable+'(parentId, parentFolder, folderName) {\n  let folderId = parentId+\'/'+folder_id+'\';\n  let folder = namespace.addFolder(parentFolder,{ browseName: folderName, nodeId: \'ns=1;s=\'+folderId});\n'+statements+'}\n';
		return foldervariable;
	};

	Blockly.JavaScript.opcuamodel_add_template = function (name, statements) {
		let foldervariable = Blockly.JavaScript.variableDB_.getDistinctName(name, Blockly.Generator.NAME_TYPE);
		// let folder_id = name.replace (/[^A-Za-z0-9]/g, '_');
		Blockly.JavaScript.definitions_['opcuamodel_add_template_'+foldervariable] = 'function opcuamodelAddTemplate'+foldervariable+'(parentId, parentFolder)\n{\n  if (templateObjects[\''+name+'\'])\n  {\n    for (let objectName of templateObjects[\''+name+'\'])\n    {\n      let folderName = objectName;\n      let objectId = objectName.replace (/[^A-Za-z0-9]/g, \'_\');\n      let folderId = parentId+\'/\'+objectId;\n      let folder = namespace.addFolder(parentFolder,{ browseName: folderName, nodeId: \'id=1;ns=\'+folderId});\n'+statements+'    }\n  }\n  else\n  {\n    console.error (\'No folder names found for template '+name+'\');\n  }\n}\n';
		return foldervariable;
	};

	Blockly.JavaScript['opcuamodel_variable'] = function (block) {
		Blockly.JavaScript.opcuamodel_add_variable ();
		var text_variable_name = block.getFieldValue('variable_name');
		var text_variable_id = text_variable_name.replace (/[^A-Za-z0-9]/g, '_');
		var dropdown_variable_type = block.getFieldValue('variable_type');
		var text_variable_history = block.getFieldValue('variable_history');
		// TODO: Assemble JavaScript into code variable.
		var code = 'let variable_'+text_variable_id+' = opcuamodelAddVariable (\'ns=1;s=\'+folderId+\'/'+text_variable_id+'\', \''+text_variable_name+'\', folder, namespace, opcua.DataType.'+dropdown_variable_type+');\n';
		if (text_variable_history === 'TRUE') code = code + 'server.engine.addressSpace.installHistoricalDataNode (variable_'+text_variable_id+');\n';
		return code;
	};

	// Blockly.JavaScript['opcuamodel_object'] = function (block) {
	// 	var text_object_name = block.getFieldValue('object_name');
	// 	var text_object_id = block.getFieldValue('object_id');
	// 	var dropdown_object_type = block.getFieldValue('object_type');
	// 	var checkbox_object_history = block.getFieldValue('object_history') == 'TRUE';
	// 	var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
	// 	// TODO: Assemble JavaScript into code variable.
	// 	var code = '...;\n';
	// 	return code;
	// };

	Blockly.JavaScript['opcuamodel_folder'] = function (block) {
		var text_folder_name = block.getFieldValue('folder_name');
		var statements_objects_properties = Blockly.JavaScript.statementToCode(block, 'folder_objects_properties');
		// TODO: Assemble JavaScript into code variable.
		let foldervariable = Blockly.JavaScript.opcuamodel_add_folder (text_folder_name, statements_objects_properties);
		var code = 'opcuamodelAddFolder'+foldervariable+'(folderId, folder, \''+text_folder_name+'\');\n';
		return code;
	};

	Blockly.JavaScript['opcuamodel_template'] = function (block) {
		var text_template_name = block.getFieldValue('template_name');
		var statements_objects_properties = Blockly.JavaScript.statementToCode(block, 'folder_objects_properties');
		// TODO: Assemble JavaScript into code variable.
		let foldervariable = Blockly.JavaScript.opcuamodel_add_template (text_template_name, statements_objects_properties);
		var code = 'opcuamodelAddTemplate'+foldervariable+'(folderId, folder);\n';
		return code;
	};

};

/***/ })

}]);