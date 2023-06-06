(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[47],{

/***/ 1347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setup; });
/* harmony import */ var _views_VisualEditor_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1348);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var xml_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(507);
/* harmony import */ var xml_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(xml_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var raw_loader_visual_toolbox_xml__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1361);
/* harmony import */ var node_blockly_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1336);
/* harmony import */ var node_blockly_browser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(node_blockly_browser__WEBPACK_IMPORTED_MODULE_4__);





// import blockly from './blockly/blockly_compressed_studio.js';
// require ('./blockly/msg/js/en_studio.js')(blockly);

// require ('./blockly/blocks_compressed_studio.js')(blockly);

// require ('./blockly/python_compressed_studio.js')(blockly);
// require ('./blockly/javascript_compressed_studio.js')(blockly);



// require ('../visual/definitions_wyliolab.js') (blockly);
// require ('../visual/code_wyliolab.js') (blockly);

let blocks =__webpack_require__ (1362);
let pycode = __webpack_require__ (1363);
let jscode = __webpack_require__ (1364);

// const Blockly = blockly.Blockly;

// const swal = require ('sweetalert');

function setup (options, imports, register)
{
	const studio = imports;
	studio.projects.registerEditor(_views_VisualEditor_vue__WEBPACK_IMPORTED_MODULE_0__["default"].name,['visual'],_views_VisualEditor_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);
	
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
			return node_blockly_browser__WEBPACK_IMPORTED_MODULE_4___default.a;
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
					if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isArray (blocks))
					{
						for (let block of blocks) block ({Blockly: (node_blockly_browser__WEBPACK_IMPORTED_MODULE_4___default())});
					}
					else
					{
						blocks ({Blockly: (node_blockly_browser__WEBPACK_IMPORTED_MODULE_4___default())});
					}
					if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isArray (codes))
					{
						for (let code of codes) code ({Blockly: (node_blockly_browser__WEBPACK_IMPORTED_MODULE_4___default())});
					}
					else
					{
						codes ({Blockly: (node_blockly_browser__WEBPACK_IMPORTED_MODULE_4___default())});
					}
				}
				catch (e)
				{
					studio.workspace.error ('projects.editor.visual: register blocks for '+id+' failed with '+e.message);
				}
				if (!options.type) options.type = [null];
				else if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isArray (options.type)) options.type = [options.type];
				if (!options.board) options.board = [null];
				else if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isArray (options.board)) options.board = [options.board];
				for (let type of options.type)
				{
					for (let board of options.board)
					{
						this._toolboxes.push ({
							id,
							toolbox:lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isString(toolbox)?xml_js__WEBPACK_IMPORTED_MODULE_2___default.a.xml2js(toolbox):toolbox,
							type: type,
							board: board,
							visible: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isFunction(options.visible)?options.visible:() => true,
							language: options.language
						});
					}
				}
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
		let toolbox = xml_js__WEBPACK_IMPORTED_MODULE_2___default.a.xml2js (raw_loader_visual_toolbox_xml__WEBPACK_IMPORTED_MODULE_3__["default"]);
		editor_visual.registerBlocksDefinitions ('standard', blocks, [pycode, jscode], toolbox, {});
	}
	catch (e)
	{
		studio.workspace.error ('projects.editor.visual: loading toolbar failed with '+e.message);
	}

	node_blockly_browser__WEBPACK_IMPORTED_MODULE_4___default.a.prompt = async function (title, oldValue, callback)
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

	node_blockly_browser__WEBPACK_IMPORTED_MODULE_4___default.a.confirm = async function (title, callback)
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


/***/ }),

/***/ 1348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VisualEditor_vue_vue_type_template_id_740359bc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1349);
/* harmony import */ var _VisualEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1351);
/* empty/unused harmony star reexport *//* harmony import */ var _VisualEditor_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1358);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _VisualEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VisualEditor_vue_vue_type_template_id_740359bc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _VisualEditor_vue_vue_type_template_id_740359bc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/projects/editor.visual/views/VisualEditor.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VisualEditor_vue_vue_type_template_id_740359bc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1350);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VisualEditor_vue_vue_type_template_id_740359bc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VisualEditor_vue_vue_type_template_id_740359bc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1350:
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
    [
      _vm.show
        ? _c("VisualAce", {
            staticClass: "shrink",
            attrs: { extension: _vm.extension, value: _vm.visualSource }
          })
        : _vm._e(),
      _vm._v(" "),
      _c("div", { ref: "visual" }),
      _vm._v(" "),
      _c(
        "v-btn",
        {
          staticClass: "codestatus",
          attrs: { id: "codestatus" },
          on: { click: _vm.showCode }
        },
        [
          _vm._v(
            _vm._s(
              _vm.show
                ? _vm.$t("EDITOR_VISUAL_HIDE_CODE")
                : _vm.$t("EDITOR_VISUAL_SHOW_CODE")
            )
          )
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_VisualEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1352);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_VisualEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var _VisualAce_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1353);
/* harmony import */ var xml_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(507);
/* harmony import */ var xml_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(xml_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(294);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var timers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(42);
/* harmony import */ var timers__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(timers__WEBPACK_IMPORTED_MODULE_4__);
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
	name: 'VisualEditor',
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
		...Object(vuex__WEBPACK_IMPORTED_MODULE_2__["mapGetters"]) ({
			currentProject: 'projects/currentProject',
			device: 'workspace/device',
			mode: 'workspace/mode'
		})
	},
	components: {
		VisualAce: _VisualAce_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
	},
	methods: {
		initVisual ()
		{
			let Blockly = this.studio.editor_visual.getBlockly();
			let blocklyDiv = this.$refs.visual;

			let toolbox = this.getToolBox ();

			this.workspace = Blockly.inject(blocklyDiv, {
				media: 'plugins/projects/editor.visual/data/media/',
				toolbox: toolbox,
				zoom:
				{
					controls: true,
					wheel: true,
					startScale: 1.0,
					maxScale: 3,
					minScale: 0.3,
					scaleSpeed: 1.2},
			}
			);

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
				let Blockly = this.studio.editor_visual.getBlockly ();
				this.workspace.clear ();
				if (path__WEBPACK_IMPORTED_MODULE_3___default.a.extname (this.filename) === '.visual')
				{
					try
					{
						let xml = Blockly.Xml.textToDom(this.source.toString());
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
		getToolBox ()
		{
			let toolbox = '<xml>';
			let toolboxes = this.studio.editor_visual.getToolboxes ();
			for (let blocks of toolboxes)
			{
				if (((blocks.type === null && blocks.board === null) 
						|| (blocks.type === this.device.type && (blocks.board === null || blocks.board === this.device.board)))
						&& blocks.visible())
				{
					for (let element of blocks.toolbox.elements)
					{
						toolbox = toolbox + xml_js__WEBPACK_IMPORTED_MODULE_1___default.a.js2xml (element);
					}
				}
			}
			toolbox = toolbox + '</xml>';

			// let parser = new DOMParser();
			// let xmlToolbox = parser.parseFromString(toolbox,"text/xml");
			// console.log (xmlToolbox);
			return toolbox;
		},
		update ()
		{
			if (this.workspace)
			{
				this.workspace.updateToolbox (this.getToolBox());
				this.updateSource ();
			}
		},
		updateSource ()
		{
			if (this.workspace)
			{
				let Blockly = this.studio.editor_visual.getBlockly ();
				let sourceLanguage = this.studio.projects.languageSpecificOption (this.currentProject, 'sourceLanguage');
				if (sourceLanguage === 'python')
				{
					try
					{
						let visualSource = '# This file was automatically generated by the Visual language\n# You may edit it, it will be overwritten when you change the Visual language\n\n'+Blockly.Python.workspaceToCode(this.workspace);
						if (this.visualSource !== visualSource)
						{
							//this.$emit ('visual-source', visualSource);
							this.visualSource = visualSource;
							this.saveVisualSource(this.visualSource, 'py');
							this.extension = 'py';
						}
					}
					catch (e)
					{
						let visualSource = '# There was an error while generating the file:\n    '+e.message;
						//this.$emit ('visual-source', visualSource);
						this.visualSource = visualSource;
						this.saveVisualSource(this.visualSource, 'py');
						this.extension = 'py';
					}
				}
				else if (sourceLanguage === 'javascript')
				{
					try
					{
						let visualSource = '// This file was automatically generated by the Visual language\n// You may edit it, it will be overwritten when you change the Visual language\n\n'+Blockly.JavaScript.workspaceToCode(this.workspace);
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
						let visualSource = '// There was an error while generating the file:\n    '+e.message;
						//this.$emit ('visual-source', visualSource);
						this.visualSource = visualSource;
						this.saveVisualSource(this.visualSource, 'js');
						this.extension = 'js';
					}
				}
			}
		},
		resize ()
		{
			if (this.workspace) 
			{
				let Blockly = this.studio.editor_visual.getBlockly ();
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
			this.studio.projects.saveFile (this.currentProject, this.filename+'.'+extension, visualSource);
		},
		showCode()
		{
			this.show = !this.show;
			process.nextTick (this.resize);
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
			Object(timers__WEBPACK_IMPORTED_MODULE_4__["setTimeout"]) (() => { this.resize (); this.loadSource (); }, 10);
		}
	}
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),

/***/ 1353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VisualAce_vue_vue_type_template_id_308f70c4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1354);
/* harmony import */ var _VisualAce_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1356);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _VisualAce_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VisualAce_vue_vue_type_template_id_308f70c4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _VisualAce_vue_vue_type_template_id_308f70c4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/projects/editor.visual/views/VisualAce.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VisualAce_vue_vue_type_template_id_308f70c4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1355);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VisualAce_vue_vue_type_template_id_308f70c4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VisualAce_vue_vue_type_template_id_308f70c4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("editor", {
    attrs: {
      value: _vm.value,
      lang: _vm.sourceLanguage,
      options: _vm.editorOptions
    },
    on: { init: _vm.initEditor }
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_VisualAce_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1357);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_VisualAce_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue2_ace_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(584);
/* harmony import */ var vue2_ace_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue2_ace_editor__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'VisualAce',
	props: ['value', 'extension'],
	data () {
		return {
			sourceLanguage: 'python',
			editorOptions: {
				fontSize: '12pt',
				readOnly: true
			}
		};
	},
	methods: {
		initEditor (/*editor*/)
		{
			__webpack_require__(588); //language extension prerequsite...
			__webpack_require__(598);    //language
			__webpack_require__(599);    //language
			__webpack_require__(611);
		}
	},
	components: {
		editor: (vue2_ace_editor__WEBPACK_IMPORTED_MODULE_0___default())
	},
	created(){
		
	},
	watch:
	{
		extension ()
		{
			switch (this.extension)
			{
				case 'py':
				{
					this.sourceLanguage = 'python';
					break;
				}
				case 'js':
				{
					this.sourceLanguage = 'javascript';
					break;
				}
				default:
				{
					this.sourceLanguage = '';
					break;
				}
			}
		},
	}
});


/***/ }),

/***/ 1358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VisualEditor_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1359);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VisualEditor_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VisualEditor_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VisualEditor_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VisualEditor_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VisualEditor_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1359:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1360);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("bdbcafae", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 1360:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "input.blocklyHtmlInput {\n  background-color: #ffffff;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 1361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<xml id=\"toolbox\" style=\"display: none\">\n\t<category name=\"Logic\" colour=\"210\">\n\t\t<category name=\"If\" colour=\"210\">\n\t\t\t<block type=\"controls_if\" />\n\t\t\t<block type=\"controls_if\">\n\t\t\t\t<mutation else=\"1\" />\n\t\t\t</block>\n\t\t\t<block type=\"controls_if\">\n\t\t\t\t<mutation elseif=\"1\" else=\"1\" />\n\t\t\t</block>\n\t\t</category>\n\t\t<category name=\"Boolean\" colour=\"210\">\n\t\t\t<block type=\"logic_compare\" />\n\t\t\t<block type=\"logic_operation\" />\n\t\t\t<block type=\"logic_negate\" />\n\t\t\t<block type=\"logic_boolean\" />\n\t\t\t<block type=\"logic_null\" />\n\t\t\t<block type=\"logic_ternary\" />\n\t\t</category>\n\t</category>\n\t<category name=\"Loops\" colour=\"%{BKY_LOOPS_HUE}\">\n      <block type=\"controls_repeat_ext\">\n        <value name=\"TIMES\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">10</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"controls_whileUntil\" />\n      <block type=\"controls_for\">\n        <value name=\"FROM\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">1</field>\n          </shadow>\n        </value>\n        <value name=\"TO\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">10</field>\n          </shadow>\n        </value>\n        <value name=\"BY\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">1</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"controls_forEach\" />\n      <block type=\"controls_flow_statements\" />\n    </category>\n    <category name=\"Math\" colour=\"%{BKY_MATH_HUE}\">\n      <block type=\"math_number\">\n        <field name=\"NUM\">123</field>\n      </block>\n      <block type=\"math_arithmetic\">\n        <value name=\"A\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">1</field>\n          </shadow>\n        </value>\n        <value name=\"B\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">1</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"math_single\">\n        <value name=\"NUM\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">9</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"math_trig\">\n        <value name=\"NUM\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">45</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"math_constant\" />\n      <block type=\"math_number_property\">\n        <value name=\"NUMBER_TO_CHECK\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">0</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"math_round\">\n        <value name=\"NUM\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">3.1</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"truncate\" />\n      <block type=\"kelvintocelsius\">\n          <value name=\"degrees\">\n              <block type=\"math_number\">\n                  <field name=\"NUM\">300</field>\n              </block>\n          </value>\n      </block>\n      <block type=\"fahrenheittocelsius\">\n          <value name=\"degrees\">\n              <block type=\"math_number\">\n                  <field name=\"NUM\">80</field>\n              </block>\n          </value>\n      </block>\n      <block type=\"celsiustofahrenheit\">\n          <value name=\"degrees\">\n              <block type=\"math_number\">\n                  <field name=\"NUM\">25</field>\n              </block>\n          </value>\n      </block>\n      <block type=\"celsiustokelvin\">\n          <value name=\"degrees\">\n              <block type=\"math_number\">\n                  <field name=\"NUM\">25</field>\n              </block>\n          </value>\n      </block>\n      <block type=\"map_block\">\n          <value name=\"value\">\n              <block type=\"math_number\">\n                  <field name=\"NUM\">100</field>\n              </block>\n          </value>\n          <value name=\"from_low\">\n              <block type=\"math_number\">\n                  <field name=\"NUM\">0</field>\n              </block>\n          </value>\n          <value name=\"to_low\">\n              <block type=\"math_number\">\n                  <field name=\"NUM\">100</field>\n              </block>\n          </value>\n          <value name=\"from_high\">\n              <block type=\"math_number\">\n                  <field name=\"NUM\">150</field>\n              </block>\n          </value>\n          <value name=\"to_high\">\n              <block type=\"math_number\">\n                  <field name=\"NUM\">255</field>\n              </block>\n          </value>\n      </block>\n      <block type=\"math_on_list\" />\n      <block type=\"math_modulo\">\n        <value name=\"DIVIDEND\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">64</field>\n          </shadow>\n        </value>\n        <value name=\"DIVISOR\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">10</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"math_constrain\">\n        <value name=\"VALUE\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">50</field>\n          </shadow>\n        </value>\n        <value name=\"LOW\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">1</field>\n          </shadow>\n        </value>\n        <value name=\"HIGH\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">100</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"math_random_int\">\n        <value name=\"FROM\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">1</field>\n          </shadow>\n        </value>\n        <value name=\"TO\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">100</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"math_random_float\" />\n      <block type=\"math_atan2\">\n        <value name=\"X\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">1</field>\n          </shadow>\n        </value>\n        <value name=\"Y\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">1</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"to_float\" colour=\"%{BKY_MATH_HUE}\">\n        <value name=\"value\"/>\n      </block>\n      <block type=\"reduce_to_decimals\" colour=\"%{BKY_MATH_HUE}\">\n      </block>\n    </category>\n    <category name=\"Text\" colour=\"%{BKY_TEXTS_HUE}\">\n      <block type=\"text\" />\n      <block type=\"text_join\" />\n      <block type=\"text_append\">\n        <value name=\"TEXT\">\n          <shadow type=\"text\" />\n        </value>\n      </block>\n      <block type=\"text_length\">\n        <value name=\"VALUE\">\n          <shadow type=\"text\">\n            <field name=\"TEXT\">abc</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"text_isEmpty\">\n        <value name=\"VALUE\">\n          <shadow type=\"text\">\n            <field name=\"TEXT\" />\n          </shadow>\n        </value>\n      </block>\n      <block type=\"text_indexOf\">\n        <value name=\"VALUE\">\n          <block type=\"variables_get\">\n            <field name=\"VAR\">text</field>\n          </block>\n        </value>\n        <value name=\"FIND\">\n          <shadow type=\"text\">\n            <field name=\"TEXT\">abc</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"text_charAt\">\n        <value name=\"VALUE\">\n          <block type=\"variables_get\">\n            <field name=\"VAR\">text</field>\n          </block>\n        </value>\n      </block>\n      <block type=\"text_getSubstring\">\n        <value name=\"STRING\">\n          <block type=\"variables_get\">\n            <field name=\"VAR\">text</field>\n          </block>\n        </value>\n      </block>\n      <block type=\"text_changeCase\">\n        <value name=\"TEXT\">\n          <shadow type=\"text\">\n            <field name=\"TEXT\">abc</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"text_trim\">\n        <value name=\"TEXT\">\n          <shadow type=\"text\">\n            <field name=\"TEXT\">abc</field>\n          </shadow>\n        </value>\n      </block>\n    </category>\n    <category name=\"Lists\" colour=\"%{BKY_LISTS_HUE}\">\n      <block type=\"lists_create_with\">\n        <mutation items=\"0\" />\n      </block>\n      <block type=\"lists_create_with\" />\n      <block type=\"lists_repeat\">\n        <value name=\"NUM\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">5</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"lists_length\" />\n      <block type=\"lists_isEmpty\" />\n      <block type=\"lists_indexOf\">\n        <value name=\"VALUE\">\n          <block type=\"variables_get\">\n            <field name=\"VAR\">{listVariable}</field>\n          </block>\n        </value>\n      </block>\n      <block type=\"lists_getIndex\">\n        <value name=\"VALUE\">\n          <block type=\"variables_get\">\n            <field name=\"VAR\">{listVariable}</field>\n          </block>\n        </value>\n      </block>\n      <block type=\"lists_setIndex\">\n        <value name=\"LIST\">\n          <block type=\"variables_get\">\n            <field name=\"VAR\">{listVariable}</field>\n          </block>\n        </value>\n      </block>\n      <block type=\"lists_getSublist\">\n        <value name=\"LIST\">\n          <block type=\"variables_get\">\n            <field name=\"VAR\">{listVariable}</field>\n          </block>\n        </value>\n      </block>\n      <block type=\"lists_split\">\n        <value name=\"DELIM\">\n          <shadow type=\"text\">\n            <field name=\"TEXT\">,</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"lists_sort\" />\n    </category>\n    <category name=\"Colour\" colour=\"%{BKY_COLOUR_HUE}\">\n      <block type=\"colour_picker\" />\n      <block type=\"colour_random\" />\n      <block type=\"colour_rgb\">\n        <value name=\"RED\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">100</field>\n          </shadow>\n        </value>\n        <value name=\"GREEN\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">50</field>\n          </shadow>\n        </value>\n        <value name=\"BLUE\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">0</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"colour_blend\">\n        <value name=\"COLOUR1\">\n          <shadow type=\"colour_picker\">\n            <field name=\"COLOUR\">#ff0000</field>\n          </shadow>\n        </value>\n        <value name=\"COLOUR2\">\n          <shadow type=\"colour_picker\">\n            <field name=\"COLOUR\">#3333ff</field>\n          </shadow>\n        </value>\n        <value name=\"RATIO\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">0.5</field>\n          </shadow>\n        </value>\n      </block>\n    </category>\n    <category name=\"Objects\" colour=\"20\">\n            <block type=\"dicts_create_with\">\n            </block>\n            <block type=\"dict_get\">\n            </block>\n            <block type=\"dict_get_literal\">\n            </block>\n            <block type=\"dict_keys\">\n            </block>\n            <block type=\"json_key\">\n                <value name=\"key\">\n                    <block type=\"text\">\n                        <field name=\"TEXT\">key</field>\n                    </block>\n                </value>\n                <value name=\"JSON\">\n                  <block type=\"variables_get\">\n                    <field name=\"VAR\">object</field>\n                  </block>\n                </value>\n            </block>\n            <block type=\"json_index\">\n                <value name=\"index\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">0</field>\n                    </block>\n                </value>\n                <value name=\"JSON\">\n                  <block type=\"variables_get\">\n                    <field name=\"VAR\">object</field>\n                  </block>\n                </value>\n            </block>\n            <block type=\"json_items\">\n              <value name=\"JSON\">\n                <block type=\"variables_get\">\n                  <field name=\"VAR\">object</field>\n                </block>\n              </value>\n            </block>\n            <block type=\"to_json\">\n              <value name=\"value\">\n                <block type=\"variables_get\">\n                  <field name=\"VAR\">object</field>\n                </block>\n              </value>\n            </block>\n        </category>\n\t<sep />\n\t<category name=\"Screen and Keyboard\" colour=\"250\">\n\t\t<block type=\"print\">\n\t\t\t<value name=\"value\">\n\t\t\t\t<block type=\"text\">\n\t\t\t\t\t<field name=\"TEXT\" />\n\t\t\t\t</block>\n\t\t\t</value>\n\t\t</block>\n\t\t<block type=\"println\">\n\t\t\t<value name=\"value\">\n\t\t\t\t<block type=\"text\">\n\t\t\t\t\t<field name=\"TEXT\" />\n\t\t\t\t</block>\n\t\t\t</value>\n\t\t</block>\n\t\t<block type=\"read\" />\n\t\t<block type=\"readwrite\">\n\t\t\t<value name=\"value\">\n\t\t\t\t<block type=\"text\">\n\t\t\t\t\t<field name=\"TEXT\">What is your name? </field>\n\t\t\t\t</block>\n\t\t\t</value>\n\t\t</block>\n\n\t\t<block type=\"text\">\n\t\t\t<field name=\"TEXT\">text</field>\n\t\t</block>\n\n<sep />\n\t</category>\n  \n  \n<sep />\n\n\t<sep />\n\t\n\t<category name=\"Variables\" custom=\"VARIABLE\" colour=\"330\" />\n\t<category name=\"Functions\" custom=\"PROCEDURE\" colour=\"290\" />\n\n\t<sep />\n</xml>\n");

/***/ }),

/***/ 1362:
/***/ (function(module, exports) {

// DO NOT EDIT THIS FILE, IT IS AUTMATICALLY GENERATED

module.exports = function (blockly) {
	let Blockly = blockly.Blockly;
	// let goog = blockly.goog;
	// Screen and Keyboard

	Blockly.Blocks['print'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#write');
			this.setColour(250);
			this.appendDummyInput()
				.appendField('Write ');
			this.appendValueInput('value');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Write the value on the screen and keep the cursor on the same line.');
		}
	};

	Blockly.Blocks['read'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#read');
			this.setColour(250);
			this.appendDummyInput()
				.appendField('Read');
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([['text', '0'], ['integer number', '1'], ['real number', '2']]), 'type');
			this.appendDummyInput()
				.appendField('from keyboard');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('Read a text from the keyboard.');
		}
	};

	Blockly.Blocks['readwrite'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#write_and_read');
			this.setColour(250);
			this.appendDummyInput()
				.appendField('Write ');
			this.appendValueInput('value');
			this.appendDummyInput()
				.appendField('and read ');
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([['text', '0'], ['integer number', '1'], ['real number', '2']]), 'type');
			this.appendDummyInput()
				.appendField('from keyboard');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('Write the value on the screen and read a text from the keyboard.');
		}
	};

	Blockly.Blocks['println'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#print');
			this.setColour(250);
			this.appendDummyInput()
				.appendField('Write Line');
			this.appendValueInput('value');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Print the value on the screen and set the cursor to the next line.');
		}
	};

	Blockly.Blocks['delay'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#delay');
			this.setColour(120);
			this.appendValueInput('millis')
				.setCheck('Number')
				.appendField('Sleep');
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([['milliseconds', '0'], ['microseconds', '1'], ['seconds', '2']]), 'type');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('Sleep for some specified period.');
		}
	};

	// Loops
	Blockly.Blocks['repeat_timing'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(120);
			this.appendValueInput('VALUE')
				.setCheck('Number')
				.setAlign(Blockly.ALIGN_CENTRE)
				.appendField('Repeat every');
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([['seconds', '0'], ['miliseconds', '1'], ['microseconds', '2']]), 'TIME');
			this.appendStatementInput('NAME')
				.setCheck('null')
				.appendField('do');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['json_key'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(20);
			this.appendValueInput('key')
				.appendField('get');
			this.appendValueInput('JSON')
				.appendField('from');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['json_index'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(20);
			this.appendValueInput('index')
				.appendField('item #');
			this.appendValueInput('JSON')
				.appendField('from');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['json_items'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(20);
			this.appendValueInput('JSON')
				.appendField('count items from ');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['truncate'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(230);
			this.appendValueInput('truncate')
				.setCheck('Number')
				.appendField('truncate');
			this.setOutput(true, 'Number');
			this.setTooltip('');
		}
	};

	Blockly.Blocks['map_block'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(230);
			this.appendValueInput('value')
				.appendField('Map the value');
			this.appendValueInput('from_low')
				.appendField('from the lowest value');
			this.appendValueInput('to_low')
				.appendField('to the lowest value');
			this.appendValueInput('from_high')
				.appendField('from the highest value');
			this.appendValueInput('to_high')
				.appendField('to the highest value');
			this.setOutput(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['kelvintocelsius'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(230);
			this.appendValueInput('degrees')
				.appendField('Get Celsius degrees from Kelvin');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['fahrenheittocelsius'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(230);
			this.appendValueInput('degrees')
				.appendField('Get Celsius degrees from Fahrenheit');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['celsiustokelvin'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(230);
			this.appendValueInput('degrees')
				.appendField('Get Kelvin degrees from Celsius');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['celsiustofahrenheit'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(230);
			this.appendValueInput('degrees')
				.appendField('Get Fahrenheit degrees from Celsius');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['dict_get'] = {
		// Set element at index.
		init: function () {
			this.setColour(20);
			this.appendValueInput('ITEM')
				.appendField('get');
			this.appendValueInput('DICT')
				.setCheck('dict')
				.appendField('of');
			this.setInputsInline(true);
			this.setOutput(true);
		}
	};

	Blockly.Blocks['dict_get_literal'] = {
		// Set element at index.
		init: function () {
			this.setColour(20);
			this.appendValueInput('DICT')
				.appendField('get')
				.appendField(this.newQuote_(true))
				.appendField(new Blockly.FieldTextInput(
					'key'),
				'ITEM')
				.appendField(this.newQuote_(false))
				.setCheck('dict')
				.appendField('of');
			this.setInputsInline(true);
			this.setOutput(true);
		},
		/**
		 * Create an image of an open or closed quote.
		 * @param {boolean} open True if open quote, false if closed.
		 * @return {!Blockly.FieldImage} The field image of the quote.
		 * @private
		 */
		newQuote_: function (open) {
			let file = '';
			if (open == this.RTL) {
				file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAYAAACALL/6AAAA0UlEQVQY023QP0oDURSF8e8MImhlUIiCjWKhrUUK3YCIVkq6bMAF2LkCa8ENWLoNS1sLEQKprMQ/GBDks3kDM+Oc8nfPfTxuANQTYBeYAvdJLL4FnAFfwF2ST9Rz27kp5YH/kwrYp50LdaXHAU4rYNYzWAdeenx7AbgF5sAhcARsAkkyVQ+ACbAKjIGqta4+l78udXxc/LiJG+qvet0pV+q7+tHE+iJzdbGz8FhmOzVcqj/qq7rcKI7Ut1Leq70C1oCrJMMk343HB8ADMEzyVOMff72l48gwfqkAAAAASUVORK5CYII=';
			} else {
				file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAYAAACALL/6AAAAvklEQVQY022PoapCQRRF97lBVDRYhBcEQcP1BwS/QLAqr7xitZn0HzRr8Rts+htmQdCqSbQIwmMZPMIw3lVmZu0zG44UAFSBLdBVBDAFZqFo8eYKtANfBC7AE5h8ZNOHd1FrDnh4VgmDO3ADkujDHPgHfkLZ84bfaLjg/hD6RFLq9z6wBDr+rvuZB1bAEDABY76pA2mGHyWSjvqmIemc4WsCLKOp4nssIj8wD8qS/iSVJK3N7OTeJPV9n72ZbV7iDuSc2BaQBQAAAABJRU5ErkJggg==';
			}
			return new Blockly.FieldImage(file, 12, 12, '"');
		}
	};

	Blockly.Blocks['dict_keys'] = {
		// Set element at index.
		init: function () {
			this.setColour(20);
			this.appendValueInput('DICT')
				.setCheck('dict')
				.appendField('get all keys from');
			this.setInputsInline(false);
		}
	};

	Blockly.Blocks['dicts_create_with_container'] = {
		// Container.
		init: function () {
			this.setColour(20);
			this.appendDummyInput()
				.appendField('Create Dictionary');
			this.appendStatementInput('STACK');
			this.setTooltip('');
			this.contextMenu = false;
		}
	};

	Blockly.Blocks['dicts_create_with_item'] = {
		// Add items.
		init: function () {
			this.setColour(20);
			this.appendDummyInput()
				.appendField('key/value');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
			this.contextMenu = false;
		}
	};
	Blockly.Blocks['dicts_create_with'] = {
		/**
		 * Block for creating a dict with any number of elements of any type.
		 * @this Blockly.Block
		 */
		init: function () {
			this.setInputsInline(false);
			this.setColour(20);
			this.itemCount_ = 1;
			this.updateShape_();
			this.setOutput(true, 'dict');
			this.setMutator(new Blockly.Mutator(['dicts_create_with_item']));
			this.setTooltip('');
		},
		/**
		 * Create XML to represent dict inputs.
		 * @return {Element} XML storage element.
		 * @this Blockly.Block
		 */
		mutationToDom: function (/* workspace */) {
			let container = document.createElement('mutation');
			container.setAttribute('items', this.itemCount_);
			return container;
		},
		/**
		 * Parse XML to restore the dict inputs.
		 * @param {!Element} xmlElement XML storage element.
		 * @this Blockly.Block
		 */
		domToMutation: function (xmlElement) {
			this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
			this.updateShape_();
		},
		/**
		 * Modify this block to have the correct number of inputs.
		 * @private
		 * @this Blockly.Block
		 */
		updateShape_: function () {
			// Delete everything.
			if (this.getInput('EMPTY')) {
				this.removeInput('EMPTY');
			}
			for (let i = 0; this.getInput('VALUE' + i); i++) {
				//this.getInput('VALUE' + i).removeField('KEY'+i);
				this.removeInput('VALUE' + i);
			}
			// Rebuild block.
			if (this.itemCount_ == 0) {
				this.appendDummyInput('EMPTY')
					.appendField('empty dictionary');
			} else {
				this.appendDummyInput('EMPTY')
					.appendField('create dictionary with');
				for (let i = 0; i < this.itemCount_; i++) {
					this.appendValueInput('VALUE' + i)
						.setCheck(null)
						.setAlign(Blockly.ALIGN_RIGHT)
						.appendField(
							new Blockly.FieldTextInput(
								'key'),
							'KEY' + i)
						.appendField(':');
				}
			}
		},
		/**
		 * Populate the mutator's dialog with this block's components.
		 * @param {!Blockly.Workspace} workspace Mutator's workspace.
		 * @return {!Blockly.Block} Root block in mutator.
		 * @this Blockly.Block
		 */
		decompose: function (workspace) {
			let containerBlock =
				Blockly.Block.obtain(workspace, 'dicts_create_with_container');
			containerBlock.initSvg();
			let connection = containerBlock.getInput('STACK').connection;
			for (let x = 0; x < this.itemCount_; x++) {
				let itemBlock = Blockly.Block.obtain(workspace, 'dicts_create_with_item');
				itemBlock.initSvg();
				connection.connect(itemBlock.previousConnection);
				connection = itemBlock.nextConnection;
			}
			return containerBlock;
		},
		/**
		 * Reconfigure this block based on the mutator dialog's components.
		 * @param {!Blockly.Block} containerBlock Root block in mutator.
		 * @this Blockly.Block
		 */
		compose: function (containerBlock) {
			let itemBlock = containerBlock.getInputTargetBlock('STACK');
			// Count number of inputs.
			let connections = [];
			let i = 0;
			while (itemBlock) {
				connections[i] = itemBlock.valueConnection_;
				itemBlock = itemBlock.nextConnection &&
					itemBlock.nextConnection.targetBlock();
				i++;
			}
			this.itemCount_ = i;
			this.updateShape_();
			// Reconnect any child blocks.
			for (let i = 0; i < this.itemCount_; i++) {
				if (connections[i]) {
					this.getInput('VALUE' + i).connection.connect(connections[i]);
				}
			}
		},
		/**
		 * Store pointers to any connected child blocks.
		 * @param {!Blockly.Block} containerBlock Root block in mutator.
		 * @this Blockly.Block
		 */
		saveConnections: function (containerBlock) {
			// Store a pointer to any connected child blocks.
			let itemBlock = containerBlock.getInputTargetBlock('STACK');
			let x = 0;
			while (itemBlock) {
				let value_input = this.getInput('VALUE' + x);
				itemBlock.valueConnection_ = value_input && value_input.connection.targetConnection;
				x++;
				itemBlock = itemBlock.nextConnection &&
					itemBlock.nextConnection.targetBlock();
			}
		}
	};

	Blockly.Blocks['to_json'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(20);
			this.appendValueInput('value')
				.appendField('to JSON');
			this.setOutput(true, 'String');
			this.setTooltip('');
		}
	};

	
	//Math 

	Blockly.Blocks['to_float'] = {
		init: function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(230);
			// this.appendDummyInput()
			// 	.appendField('Convert to float');
			// this.appendValueInput('value');
			this.appendValueInput('value')
				.appendField('Convert to number');
			// this.setInputsInline(true);
			this.setOutput(true, 'Number');
			this.setTooltip('Converts the given number to float');
		}
	};

	Blockly.Blocks['reduce_to_decimals'] = {
		init: function() {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(230);
			this.appendValueInput('number')
				.appendField('Round');
			this.appendDummyInput()
				.appendField('to');
			this.appendValueInput('decimals_number');
			this.appendDummyInput()
				.appendField('decimal places');
			this.setOutput(true, 'Number');
			this.setTooltip('Rounds the float to the given number of decimals');
		}
	};
};


/***/ }),

/***/ 1363:
/***/ (function(module, exports) {

// DO NOT EDIT THIS FILE, IT IS AUTMATICALLY GENERATED

// const { min } = require("moment/moment");
// const { maxSatisfying } = require("semver");

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;
	// var goog = blockly.goog;
	// Screen and Keyboard

	Blockly.Python.import_json = function () {
		if (!Blockly.Python.definitions_['import_json']) {
			Blockly.Python.definitions_['import_json'] = 'import json\n';
		}
	};

	Blockly.Python['print'] = function (block) {
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'print (' + value_value + ')\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return code;
	};

	Blockly.Python['read'] = function (block) {
		// TODO: Assemble Python into code variable.
		var type = parseInt(block.getFieldValue('type'));
		var code;
		if (type == 0) {
			code = 'raw_input ("")';
		}
		else if (type == 1) {
			code = 'int(raw_input (""))';
		}
		else if (type == 2) {
			code = 'float(raw_input (""))';
		}
		
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['readwrite'] = function (block) {
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var type = parseInt(block.getFieldValue('type'));
		var code;
		if (type == 0) {
			code = 'raw_input (' + value_value + ')';
		}
		else if (type == 1) {
			code = 'int(raw_input (' + value_value + '))';
		}
		else if (type == 2) {
			code = 'float(raw_input (' + value_value + '))';
		}
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['readwritenr'] = function (block) {
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'int(raw_input (' + value_value + '))';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['println'] = function (block) {
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'print(' + value_value + ')\n';
		return code;
	};

	Blockly.Python['delay'] = function (block) {
		Blockly.Python.importtime();
		var value_millis = Blockly.Python.valueToCode(block, 'millis', Blockly.Python.ORDER_ATOMIC);
		var type = parseInt(block.getFieldValue('type'));
		if (isNaN(type)) type = 0;
		// TODO: Assemble Python into code variable.
		var code = '';
		if (type == 0) {
			code = 'sleep ((' + value_millis + ')/1000.0' + ')\n';
		}
		else if (type == 1) {
			code = 'sleep ((' + value_millis + ')/1000000.0' + ')\n';
		}
		else {
			code = 'sleep (' + value_millis + ')\n';
		}
		return code;
	};


	// Loops

	Blockly.Python.timer = function () {
		if (!Blockly.Python.definitions_['import_timer']) {
			Blockly.Python.definitions_['import_timer'] = 'from threading import Timer\n';
		}
	};

	Blockly.Python['repeat_timing'] = function (block) {
		var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_FUNCTION_CALL);
		var dropdown_time = block.getFieldValue('TIME');
		var statements_name = Blockly.Python.statementToCode(block, 'NAME');
		var type = parseInt(dropdown_time);
		Blockly.Python.timer();
		var dfunct = Blockly.Python.variableDB_.getDistinctName(
			'loopCode', Blockly.Generator.NAME_TYPE);
		if (type == 1) {
			value_value = value_value / 1000;
		}
		else if (type == 2) {
			value_value = value_value / 1000000;
		}
		var globals = Blockly.Variables.allUsedVariables(block);
		for (var i = 0; i < globals.length; i++) {
			globals[i] = Blockly.Python.variableDB_.getName(globals[i], Blockly.Variables.NAME_TYPE);
		}
		globals = globals.length ? '  global ' + globals.join(', ') + '\n' : '';
		// TODO: Assemble Python into code variable.
		var code = 'def ' + dfunct + '():\n' + globals + statements_name +
			'  Timer(' + value_value + ', ' + dfunct + ').start()\n' +
			dfunct + '()\n';
		return code;
	};

	Blockly.Python['json_key'] = function (block) {
		var value_key = Blockly.Python.valueToCode(block, 'key', Blockly.Python.ORDER_ATOMIC);
		var value_json = Blockly.Python.valueToCode(block, 'JSON', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_json + '[' + value_key + ']';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['json_index'] = function (block) {
		var value_index = Blockly.Python.valueToCode(block, 'index', Blockly.Python.ORDER_ATOMIC);
		var value_json = Blockly.Python.valueToCode(block, 'JSON', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_json + '[' + value_index + ']';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['json_items'] = function (block) {
		var value_json = Blockly.Python.valueToCode(block, 'JSON', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'len(' + value_json + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['truncate'] = function (block) {
		var value_truncate = Blockly.Python.valueToCode(block, 'truncate', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'int(' + value_truncate + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['map_block'] = function (block) {
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		var value_from_low = Blockly.Python.valueToCode(block, 'from_low', Blockly.Python.ORDER_ATOMIC);
		var value_to_low = Blockly.Python.valueToCode(block, 'to_low', Blockly.Python.ORDER_ATOMIC);
		var value_from_high = Blockly.Python.valueToCode(block, 'from_high', Blockly.Python.ORDER_ATOMIC);
		var value_to_high = Blockly.Python.valueToCode(block, 'to_high', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_to_low + '+ (' + value_value + '*(' + value_to_high + '-' + value_to_low + '))/(' + value_from_high + '-' + value_from_low + ')';
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['kelvintocelsius'] = function (block) {
		var value_degrees = Blockly.Python.valueToCode(block, 'degrees', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_degrees + '-273.15';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['fahrenheittocelsius'] = function (block) {
		var value_degrees = Blockly.Python.valueToCode(block, 'degrees', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = '(' + value_degrees + '-32)/1.8';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['celsiustokelvin'] = function (block) {
		var value_degrees = Blockly.Python.valueToCode(block, 'degrees', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_degrees + '+273.15';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['celsiustofahrenheit'] = function (block) {
		var value_degrees = Blockly.Python.valueToCode(block, 'degrees', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = '(' + value_degrees + '*1.8)+32';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['dict_get'] = function (block) {
		var dict = Blockly.Python.valueToCode(block, 'DICT',
			Blockly.Python.ORDER_MEMBER) || '___';
		var value = Blockly.Python.valueToCode(block, 'ITEM',
			Blockly.Python.ORDER_NONE) || '___';
		var code = dict + '[' + value + ']';
		return [code, Blockly.Python.ORDER_ATOMIC];
	};


	Blockly.Python['dict_get_literal'] = function (block) {
		var dict = Blockly.Python.valueToCode(block, 'DICT',
			Blockly.Python.ORDER_MEMBER) || '___';
		var value = Blockly.Python.quote_(block.getFieldValue('ITEM'));
		var code = dict + '[' + value + ']';
		return [code, Blockly.Python.ORDER_ATOMIC];
	};


	Blockly.Python['dicts_create_with'] = function (block) {
		// TODO: Assemble Python into code variable.
		var code = new Array(block.itemCount_);

		for (var n = 0; n < block.itemCount_; n++) {
			var key = Blockly.Python.quote_(block.getFieldValue('KEY' + n));
			var value = Blockly.Python.valueToCode(block, 'VALUE' + n,
				Blockly.Python.ORDER_NONE) || '___';
			code[n] = key + ': ' + value;
		}
		code = '{' + code.join(', ') + '}';
		return [code, Blockly.Python.ORDER_ATOMIC];
	};

	Blockly.Python['dict_keys'] = function (block) {
		var dict = Blockly.Python.valueToCode(block, 'DICT',
			Blockly.Python.ORDER_MEMBER) || '___';
		var code = dict + '.keys()';
		return [code, Blockly.Python.ORDER_ATOMIC];
	};

	Blockly.Python['to_json'] = function (block) {
		Blockly.Python.import_json ();
		var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'json.dumps (' + value_value+')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	//Math 

	Blockly.Python['to_float'] = function(block) {
		var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
		
		var code = 'float(' + value + ')';

		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['reduce_to_decimals'] = function(block) {
		var number_value = Blockly.Python.valueToCode(block, 'number', Blockly.Python.ORDER_ATOMIC);
		var decimal_value = Blockly.Python.valueToCode(block, 'decimals_number', Blockly.Python.ORDER_ATOMIC);
		
		var code = 'round(' + number_value + ',' + decimal_value + ')';
		
		return [code,Blockly.Python.ORDER_NONE];
	};

	
};


/***/ }),

/***/ 1364:
/***/ (function(module, exports) {

// DO NOT EDIT THIS FILE, IT IS AUTMATICALLY GENERATED

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;
	// var goog = blockly.goog;
	// Screen and Keyboard

	Blockly.JavaScript['print'] = function (block) {
		var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'console.log (' + value_value + ');\n';
		// TODO: Change ORDER_NONE to the correct strength.
		return code;
	};

	Blockly.JavaScript['read'] = function (/*block*/) {
		// TODO: Assemble JavaScript into code variable.
		// TODO: Change ORDER_NONE to the correct strength.
		return '//Block not supported in JavaScript.\n';
	};

	Blockly.JavaScript['readwrite'] = function (/*block*/) {
		// // TODO: Change ORDER_NONE to the correct strength.
		return '//Block not supported in JavaScript.\n';
	};

	Blockly.JavaScript['println'] = function (block) {
		var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'console.log(' + value_value + ');\n';
		return code;
	};

	Blockly.JavaScript['delay'] = function (/*block*/) {
		// // TODO: Change ORDER_NONE to the correct strength.
		return '//Block not supported in JavaScript.\n';
	};

	Blockly.JavaScript['json_key'] = function (block) {
		var value_key = Blockly.JavaScript.valueToCode(block, 'key', Blockly.JavaScript.ORDER_ATOMIC);
		var value_json = Blockly.JavaScript.valueToCode(block, 'JSON', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = value_json + '[' + value_key + ']';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['json_index'] = function (block) {
		var value_index = Blockly.JavaScript.valueToCode(block, 'index', Blockly.JavaScript.ORDER_ATOMIC);
		var value_json = Blockly.JavaScript.valueToCode(block, 'JSON', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = value_json + '[' + value_index + ']';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['json_items'] = function (block) {
		var value_json = Blockly.Python.valueToCode(block, 'JSON', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = value_json + '.length';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.JavaScript['truncate'] = function (block) {
		var value_truncate = Blockly.JavaScript.valueToCode(block, 'truncate', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'Math.round(' + value_truncate + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['map_block'] = function (block) {
		var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
		var value_from_low = Blockly.JavaScript.valueToCode(block, 'from_low', Blockly.JavaScript.ORDER_ATOMIC);
		var value_to_low = Blockly.JavaScript.valueToCode(block, 'to_low', Blockly.JavaScript.ORDER_ATOMIC);
		var value_from_high = Blockly.JavaScript.valueToCode(block, 'from_high', Blockly.JavaScript.ORDER_ATOMIC);
		var value_to_high = Blockly.JavaScript.valueToCode(block, 'to_high', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = value_to_low + '+ (' + value_value + '*(' + value_to_high + '-' + value_to_low + '))/(' + value_from_high + '-' + value_from_low + ')';
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['kelvintocelsius'] = function (block) {
		var value_degrees = Blockly.JavaScript.valueToCode(block, 'degrees', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = value_degrees + '-273.15';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['fahrenheittocelsius'] = function (block) {
		var value_degrees = Blockly.JavaScript.valueToCode(block, 'degrees', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = '(' + value_degrees + '-32)/1.8';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['celsiustokelvin'] = function (block) {
		var value_degrees = Blockly.JavaScript.valueToCode(block, 'degrees', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = value_degrees + '+273.15';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['celsiustofahrenheit'] = function (block) {
		var value_degrees = Blockly.JavaScript.valueToCode(block, 'degrees', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = '(' + value_degrees + '*1.8)+32';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['dict_get'] = function (block) {
		var dict = Blockly.JavaScript.valueToCode(block, 'DICT',
			Blockly.JavaScript.ORDER_MEMBER) || 'undefined';
		var value = Blockly.JavaScript.valueToCode(block, 'ITEM',
			Blockly.JavaScript.ORDER_NONE) || 'undefined';
		var code = dict + '[' + value + ']';
		return [code, Blockly.JavaScript.ORDER_ATOMIC];
	};

	Blockly.JavaScript['dict_get_literal'] = function (block) {
		var dict = Blockly.JavaScript.valueToCode(block, 'DICT',
			Blockly.JavaScript.ORDER_MEMBER) || 'undefined';
		var value = Blockly.JavaScript.quote_(block.getFieldValue('ITEM'));
		var code = dict + '[' + value + ']';
		return [code, Blockly.JavaScript.ORDER_ATOMIC];
	};


	Blockly.JavaScript['dicts_create_with'] = function (block) {
		// TODO: Assemble JavaScript into code variable.
		var code = new Array(block.itemCount_);

		for (var n = 0; n < block.itemCount_; n++) {
			var key = Blockly.JavaScript.quote_(block.getFieldValue('KEY' + n));
			var value = Blockly.JavaScript.valueToCode(block, 'VALUE' + n,
				Blockly.JavaScript.ORDER_NONE) || 'undefined';
			code[n] = key + ': ' + value;
		}
		code = '{' + code.join(', ') + '}';
		return [code, Blockly.JavaScript.ORDER_ATOMIC];
	};

	Blockly.JavaScript['dict_keys'] = function (block) {
		var dict = Blockly.JavaScript.valueToCode(block, 'DICT',
			Blockly.JavaScript.ORDER_MEMBER) || 'undefined';
		var code = 'Object.keys(' + dict + ')';
		return [code, Blockly.JavaScript.ORDER_ATOMIC];
	};

	Blockly.JavaScript['to_json'] = function (block) {
		var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'JSON.stringify(' + value_value + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

};

/***/ })

}]);