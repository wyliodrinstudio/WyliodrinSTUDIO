(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[50],{

/***/ 1616:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setup; });
/* harmony import */ var _views_Schematics_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1617);


let studio = null;

function setup (options, imports, register)
{
	studio = imports;

	let schematics = {
		/**
		 * Set project schematics
		 * 
		 * @param {Project} project - the project
		 * @param {Buffer} data - schematics data
		 */
		setSchematics (project, data) {
			return studio.projects.saveSpecialFile (project, 'schematics.svg', data);
		},

		/**
		 * Delete project schematics
		 * 
		 * @param {Project} project - the project
		 */
		deleteSchematics (project) {
			return studio.projects.deleteSpecialFile (project, 'schematics.svg');
		},

		/**
		 * Get project schematics
		 * 
		 * @param {Project} project - the project
		 * 
		 * @returns {Buffer} - the project schmeatics
		 */
		getSchematics (project) {
			return studio.projects.loadSpecialFile (project, 'schematics.svg');
		}
	};

	studio.workspace.registerTab('SCHEMATICS', 400, _views_Schematics_vue__WEBPACK_IMPORTED_MODULE_0__["default"], {
		enabled ()
		{
			return !!studio.projects.getCurrentProject();
		}
	});
	
	register (null, {
		schematics: schematics
	});
}


/***/ }),

/***/ 1617:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Schematics_vue_vue_type_template_id_04354ac0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1618);
/* harmony import */ var _Schematics_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1620);
/* empty/unused harmony star reexport *//* harmony import */ var _Schematics_vue_vue_type_style_index_0_id_04354ac0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1622);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Schematics_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Schematics_vue_vue_type_template_id_04354ac0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Schematics_vue_vue_type_template_id_04354ac0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "04354ac0",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/projects/schematics/views/Schematics.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1618:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Schematics_vue_vue_type_template_id_04354ac0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1619);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Schematics_vue_vue_type_template_id_04354ac0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Schematics_vue_vue_type_template_id_04354ac0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1619:
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
    { staticClass: "schematics-box fill-height" },
    [
      _vm.encodedImage === null
        ? _c("div", { staticClass: "schematics-msg" }, [
            _c("span", [_vm._v(_vm._s(_vm.$t("SCHEMATICS_IMPORT")))])
          ])
        : _c("img", { attrs: { src: _vm.encodedImage } }),
      _vm._v(" "),
      _vm.encodedImage === null
        ? _c(
            "v-btn",
            { staticClass: "svg-btn", on: { click: _vm.selectFile } },
            [_vm._v(_vm._s(_vm.$t("ADD_SCHEMATIC")))]
          )
        : _c(
            "v-btn",
            { staticClass: "svg-btn", on: { click: _vm.deleteSchematics } },
            [_vm._v(_vm._s(_vm.$t("DELETE_SCHEMATIC")))]
          )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1620:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_Schematics_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1621);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_Schematics_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1621:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);
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
	name: 'Schematics',
	data() {
		return {
			data: null, 
		};
	},
	computed: {
		...Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"]) ({
			currentProject: 'projects/currentProject',
		}),
		encodedImage () {
			if (this.data) 
			{
				var encoded = this.data.toString ('base64');	
				return 'data:image/svg+xml;base64,' + encoded;
			}
			else
			{
				return null;
			}
		},
	},
	watch:{
		async currentProject() {
			if (this.currentProject)
			{
				this.data = await this.studio.schematics.getSchematics (this.currentProject);
			}
			else
			{
				this.data = null;
			}
		}
	},
	methods: {
		async selectFile() {
			let files = await this.studio.filesystem.openImportDialog({
				title:'Select a file',
				filetypes:['svg']
			});
			if (files.length > 0)
			{
				if(files) {
					try 
					{
						let content = await this.studio.filesystem.readImportFile (files[0]);
						if (await this.studio.schematics.setSchematics (this.currentProject, content)) {
							this.data = content;
						}
					}
					catch(e)
					{
						this.studio.workspace.showError('SCHEMATICS_IMPORT_ERROR',  {error: e.message});
					}
				}
				
			}
			return false;
		},
		async deleteSchematics() {
			let value = await this.studio.workspace.showConfirmationPrompt('DELETE_CONFIRMATION', 'DELETE_MESSAGE');
			if (value) {
				if (await this.studio.schematics.deleteSchematics (this.currentProject))
				{
					this.data = null;
				}
			}
		}
	},
});


/***/ }),

/***/ 1622:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Schematics_vue_vue_type_style_index_0_id_04354ac0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1623);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Schematics_vue_vue_type_style_index_0_id_04354ac0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Schematics_vue_vue_type_style_index_0_id_04354ac0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Schematics_vue_vue_type_style_index_0_id_04354ac0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Schematics_vue_vue_type_style_index_0_id_04354ac0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Schematics_vue_vue_type_style_index_0_id_04354ac0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1623:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1624);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("77919b0a", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 1624:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".w-100[data-v-04354ac0] {\n  width: 100%;\n}\n.w-90[data-v-04354ac0] {\n  width: 90%;\n}\n.w-80[data-v-04354ac0] {\n  width: 80%;\n}\n.w-70[data-v-04354ac0] {\n  width: 70%;\n}\n.w-60[data-v-04354ac0] {\n  width: 60%;\n}\n.w-50[data-v-04354ac0] {\n  width: 50%;\n}\n.w-40[data-v-04354ac0] {\n  width: 40%;\n}\n.w-30[data-v-04354ac0] {\n  width: 30%;\n}\n.w-20[data-v-04354ac0] {\n  width: 20%;\n}\n.w-10[data-v-04354ac0] {\n  width: 10%;\n}\n.hs-0[data-v-04354ac0] {\n  height: 0% !important;\n}\n.hs-35[data-v-04354ac0] {\n  height: 35% !important;\n}\n.hs-65[data-v-04354ac0] {\n  height: 65% !important;\n}\n.hs-100[data-v-04354ac0] {\n  height: calc(100vh - 158px) !important;\n}\n.rel[data-v-04354ac0] {\n  position: relative;\n}\n.text-center[data-v-04354ac0] {\n  text-align: center;\n}\n.text-left[data-v-04354ac0] {\n  text-align: left;\n}\n.text-right[data-v-04354ac0] {\n  text-align: right;\n}\n.h-top[data-v-04354ac0] {\n  height: calc(100vh - 90px);\n}\n.h-top2[data-v-04354ac0] {\n  height: calc(100vh - 158px);\n}\n.left[data-v-04354ac0] {\n  float: left !important;\n}\n.right[data-v-04354ac0] {\n  float: right !important;\n}\n.p-20[data-v-04354ac0] {\n  padding: 20px;\n}\n.schematics-box[data-v-04354ac0] {\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n.schematics-box .schematics-msg[data-v-04354ac0] {\n  background: url('plugins/projects/schematics/data/img/schematics/import-schematics.png') #ffffff no-repeat 50% 50% !important;\n  width: 524px;\n  height: 330px;\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin: auto;\n  top: 0;\n  bottom: 0;\n}\n.schematics-box .schematics-msg span[data-v-04354ac0] {\n  position: absolute;\n  margin: auto;\n  left: 0;\n  right: 0;\n  top: -60px;\n  text-align: center;\n  font-size: 24px;\n  font-weight: bold;\n}\n.schematics-box img[data-v-04354ac0] {\n  position: absolute;\n  bottom: 0;\n  top: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n  max-height: 90%;\n}\n.svg-btn[data-v-04354ac0] {\n  position: absolute;\n  padding-right: 30px !important;\n  right: -14px;\n  top: 20px;\n  background: #3c5459 !important;\n  color: #ffffff !important;\n  text-transform: capitalize;\n  box-shadow: none !important;\n  font-size: 14px !important;\n}\n.svg-btn[data-v-04354ac0]:hover,\n.svg-btn[data-v-04354ac0]:active,\n.svg-btn[data-v-04354ac0]:focus {\n  position: absolute;\n  right: -10px;\n  top: 20px;\n  background: #e54225 !important;\n  color: #ffffff !important;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ })

}]);