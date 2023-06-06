(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[45],{

/***/ 1323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MonacoEditorPanel_vue_vue_type_style_index_0_id_57293438_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1324);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MonacoEditorPanel_vue_vue_type_style_index_0_id_57293438_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MonacoEditorPanel_vue_vue_type_style_index_0_id_57293438_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MonacoEditorPanel_vue_vue_type_style_index_0_id_57293438_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MonacoEditorPanel_vue_vue_type_style_index_0_id_57293438_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MonacoEditorPanel_vue_vue_type_style_index_0_id_57293438_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1324:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(430);
            var content = __webpack_require__(1325);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 1325:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.margin[data-v-57293438] {\n\tbackground: 'eae8e8'\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 636:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setup; });
/* harmony import */ var _views_MonacoEditorPanel_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(637);


function setup (options, imports, register)
{
	const studio = imports;
	studio.projects.registerEditor('MONACO_ACE',['txt','md','py','js','json','sh','less','css','html','php','vue','c','cpp','d','rs','toml',''], _views_MonacoEditorPanel_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);
	
	register (null, {});
}


/***/ }),

/***/ 637:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MonacoEditorPanel_vue_vue_type_template_id_57293438_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(638);
/* harmony import */ var _MonacoEditorPanel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(640);
/* empty/unused harmony star reexport *//* harmony import */ var _MonacoEditorPanel_vue_vue_type_style_index_0_id_57293438_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1323);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _MonacoEditorPanel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MonacoEditorPanel_vue_vue_type_template_id_57293438_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MonacoEditorPanel_vue_vue_type_template_id_57293438_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "57293438",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/projects/editor.monaco/views/MonacoEditorPanel.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 638:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MonacoEditorPanel_vue_vue_type_template_id_57293438_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(639);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MonacoEditorPanel_vue_vue_type_template_id_57293438_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MonacoEditorPanel_vue_vue_type_template_id_57293438_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 639:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("MonacoEditor", {
    ref: "editor",
    staticStyle: { height: "100%" },
    attrs: { options: _vm.editorOptions, language: _vm.sourceLanguage },
    model: {
      value: _vm.source,
      callback: function($$v) {
        _vm.source = $$v
      },
      expression: "source"
    }
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 640:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_MonacoEditorPanel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(641);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_MonacoEditorPanel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 641:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_monaco__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(642);
/* harmony import */ var monaco_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(644);
/* harmony import */ var monaco_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(monaco_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(294);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
//
//
//
//





monaco_editor__WEBPACK_IMPORTED_MODULE_1__["editor"].defineTheme('studio', {
	base: 'vs',
	inherit: true,
	rules: [],
	colors: {
		'editorGutter.background': '#dedede',
	}
});

monaco_editor__WEBPACK_IMPORTED_MODULE_1__["editor"].setTheme('studio');

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'MonacoEditorPanel',
	props: ['project', 'filename','active'],
	data () {
		return {
			source: '',
			sourceLanguage: 'python',
			editorOptions: {
				fontSize: 14,
				automaticLayout: true,
				theme: 'studio'
			}
		};
	},
	methods: {
		
	},
	components: {
		MonacoEditor: vue_monaco__WEBPACK_IMPORTED_MODULE_0__["default"]
	},
	watch:
	{
		active (value) {
			if (value) {
				setTimeout (() => this.$refs.editor.getEditor().layout(), 10);
			}
		},
		filename:
		{
			immediate: true,
			async handler ()
			{
				if (this.filename)
				{
					if (path__WEBPACK_IMPORTED_MODULE_2___default.a.basename (this.filename).toLowerCase().startsWith ('makefile'))
					{
						this.sourceLanguage = 'makefile';
					}
					else
					{
						switch (path__WEBPACK_IMPORTED_MODULE_2___default.a.extname (this.filename).toLowerCase())
						{
							case '.md':
							{
								this.sourceLanguage = 'markdown';
								break;
							}
							case '.txt':
							{
								this.sourceLanguage = 'plain_text';
								break;
							}
							case '.py':
							{
								this.sourceLanguage = 'python';
								break;
							}
							case '.sh':
							{
								this.sourceLanguage = 'sh';
								break;
							}
							case '.html':
							{
								this.sourceLanguage = 'html';
								break;
							}
							case '.js':
							{
								this.sourceLanguage = 'javascript';
								break;
							}
							case '.json':
							{
								this.sourceLanguage = 'json';
								break;
							}
							case '.css':
							{
								this.sourceLanguage = 'css';
								break;
							}
							case '.less':
							{
								this.sourceLanguage = 'less';
								break;
							}
							case '.vue':
							{
								this.sourceLanguage = 'javascript';
								break;
							}
							case '.php':
							{
								this.sourceLanguage = 'php';
								break;
							}
							case '.c':
							{
								this.sourceLanguage = 'cpp';
								break;
							}
							case '.cpp':
							{
								this.sourceLanguage = 'cpp';
								break;
							}
							case '.ts':
							{
								this.sourceLanguage = 'typescript';
								break;
							}
							case '.d':
							{
								this.sourceLanguage = 'd';
								break;
							}
							case '.rs':
							{
								this.sourceLanguage = 'rust';
								break;
							}
							case '.toml':
							{
								this.sourceLanguage = 'ini';
								break;
							}
							default:
							{
								this.sourceLanguage = '';
								break;
							}
						}
					}
				}
				let source = await this.studio.projects.loadFile (this.project, this.filename);
				if (source !== null) this.source = source.toString ();
				else this.studio.workspace.showNotification ('Failed to load file '+this.filename);
			}
		},
		// value (newValue, oldValue)
		// {
		// 	if (newValue !== oldValue)
		// 	{
		// 		let value = this.value;
		// 		try
		// 		{
		// 			if (typeof this.value === 'object') value = this.value.toString ();
		// 		}
		// 		catch (e)
		// 		{
		// 			value = '';
		// 		}
		// 		this.source = value;
		// 	}
		// },
		async source (newValue, oldValue)
		{
			if (newValue !== oldValue)
			{
				// this.$emit ('input', this.source);
				await this.studio.projects.saveFile (this.project, this.filename, this.source);
			}
		}
	}
});


/***/ })

}]);