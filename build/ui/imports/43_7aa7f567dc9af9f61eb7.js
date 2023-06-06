(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[43],{

/***/ 578:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setup; });
/* harmony import */ var _views_AceEditor_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(579);


function setup (options, imports, register)
{
	const studio = imports;
	studio.projects.registerEditor('EDITOR_ACE',[/makefile(.*)?/i,/Dockerfile(.*)?/i], _views_AceEditor_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);
	
	register (null, {});
}


/***/ }),

/***/ 579:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AceEditor_vue_vue_type_template_id_7cb9e5a2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(580);
/* harmony import */ var _AceEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(582);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AceEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AceEditor_vue_vue_type_template_id_7cb9e5a2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AceEditor_vue_vue_type_template_id_7cb9e5a2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/projects/editor.ace/views/AceEditor.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 580:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AceEditor_vue_vue_type_template_id_7cb9e5a2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(581);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AceEditor_vue_vue_type_template_id_7cb9e5a2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AceEditor_vue_vue_type_template_id_7cb9e5a2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 581:
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
    attrs: { lang: _vm.sourceLanguage, options: _vm.editorOptions },
    on: { init: _vm.initEditor },
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

/***/ 582:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_AceEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(583);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_AceEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 583:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue2_ace_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(584);
/* harmony import */ var vue2_ace_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue2_ace_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(294);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'AceEditor',
	props: ['project', 'filename','active'],
	data () {
		return {
			source: '',
			sourceLanguage: 'python',
			editorOptions: {
				fontSize: '12pt',
				readOnly: false,
				theme: 'ace/theme/chrome',
				enableBasicAutocompletion: true,
				enableSnippets: true,
				enableLiveAutocompletion: true
			}
		};
	},
	methods: {
		initEditor (/*editor*/)
		{
			__webpack_require__(588); //language extension prerequsite...
			__webpack_require__(589);
			__webpack_require__(590);

			__webpack_require__(591);

			__webpack_require__(592);
			__webpack_require__(596);
			__webpack_require__(597);                
			__webpack_require__(598);    //language
			__webpack_require__(599);    //language
			__webpack_require__(600);    //language
			__webpack_require__(601);
			__webpack_require__(602);
			__webpack_require__(603);    //language
			__webpack_require__(604);
			__webpack_require__(605);
			__webpack_require__(607);
			__webpack_require__(608);
			__webpack_require__(609);
			__webpack_require__(610);


			__webpack_require__(611);
			__webpack_require__(612);
			
			__webpack_require__(613);
			__webpack_require__(614); //snippet
			__webpack_require__(615); //snippet
			__webpack_require__(616); //snippet
			__webpack_require__(617);
			__webpack_require__(618); //snippet
			__webpack_require__(619); //snippet
			__webpack_require__(620); //snippet
			__webpack_require__(621); //snippet
			__webpack_require__(622); //snippet
			__webpack_require__(623);
			__webpack_require__(624);
			__webpack_require__(625);
			__webpack_require__(626);
		}
	},
	components: {
		editor: (vue2_ace_editor__WEBPACK_IMPORTED_MODULE_0___default())
	},
	watch:
	{
		filename:
		{
			immediate: true,
			async handler ()
			{
				if (this.filename)
				{
					if (path__WEBPACK_IMPORTED_MODULE_1___default.a.basename (this.filename).toLowerCase().startsWith ('makefile'))
					{
						this.sourceLanguage = 'makefile';
					}
					else if (path__WEBPACK_IMPORTED_MODULE_1___default.a.basename (this.filename).toLowerCase().startsWith ('dockerfile'))
					{
						this.sourceLanguage = 'dockerfile';
					}
					else
						switch (path__WEBPACK_IMPORTED_MODULE_1___default.a.extname (this.filename).toLowerCase())
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
								this.sourceLanguage = 'c_cpp';
								break;
							}
							case '.cpp':
							{
								this.sourceLanguage = 'c_cpp';
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
							default:
							{
								this.sourceLanguage = '';
								break;
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