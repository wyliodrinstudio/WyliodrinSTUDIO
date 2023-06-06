(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[44],{

/***/ 627:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setup; });
/* harmony import */ var _views_ImageEditor_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(628);


function setup (options, imports, register)
{
	const studio = imports;
	studio.projects.registerEditor('EDITOR_IMAGE',['png', 'jpg', 'jpeg', 'gif', 'svg', 'tiff', 'bmp', 'ppm', 'pgm', 'pbm', 'pnm', 'bat', 'bpg'], _views_ImageEditor_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);
	
	register (null, {});
}


/***/ }),

/***/ 628:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ImageEditor_vue_vue_type_template_id_9fe6827e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(629);
/* harmony import */ var _ImageEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(631);
/* empty/unused harmony star reexport *//* harmony import */ var _ImageEditor_vue_vue_type_style_index_0_id_9fe6827e_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(633);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ImageEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ImageEditor_vue_vue_type_template_id_9fe6827e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ImageEditor_vue_vue_type_template_id_9fe6827e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "9fe6827e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/projects/editor.images/views/ImageEditor.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 629:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageEditor_vue_vue_type_template_id_9fe6827e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(630);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageEditor_vue_vue_type_template_id_9fe6827e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageEditor_vue_vue_type_template_id_9fe6827e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 630:
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
    { staticClass: "img-box fill-height", attrs: { align: "center" } },
    [
      _c("v-img", {
        attrs: {
          src: _vm.encodedImage,
          contain: "",
          height: "100%",
          width: "100%"
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 631:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_ImageEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(632);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 632:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(294);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'ImageEditor',
	props: ['project', 'filename'], 
	data() {
		return {
			encodedImage: ''
		};
	},
	methods: {
		
	},
	watch:
	{
		filename:
		{
			immediate: true,
			async handler()
			{
				let filePath = path__WEBPACK_IMPORTED_MODULE_0___default.a.join(this.project.folder, this.filename);
				let extension = this.filename.substring(this.filename.lastIndexOf('.')).substring(1);

				try 
				{
					var encoded = (await this.studio.filesystem.readFile(filePath)).toString ('base64');
					if(extension === 'svg')
						this.encodedImage = 'data:image/svg+xml;base64,' + encoded;
					else
						this.encodedImage = 'data:image/' + extension +';base64,' + encoded;
				}
				catch(e)
				{
					this.studio.workspace.warn(e.message);
				}
			}
		}
	}

});


/***/ }),

/***/ 633:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageEditor_vue_vue_type_style_index_0_id_9fe6827e_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(634);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageEditor_vue_vue_type_style_index_0_id_9fe6827e_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageEditor_vue_vue_type_style_index_0_id_9fe6827e_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageEditor_vue_vue_type_style_index_0_id_9fe6827e_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageEditor_vue_vue_type_style_index_0_id_9fe6827e_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageEditor_vue_vue_type_style_index_0_id_9fe6827e_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 634:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(635);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("092fd234", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 635:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".w-100[data-v-9fe6827e] {\n  width: 100%;\n}\n.w-90[data-v-9fe6827e] {\n  width: 90%;\n}\n.w-80[data-v-9fe6827e] {\n  width: 80%;\n}\n.w-70[data-v-9fe6827e] {\n  width: 70%;\n}\n.w-60[data-v-9fe6827e] {\n  width: 60%;\n}\n.w-50[data-v-9fe6827e] {\n  width: 50%;\n}\n.w-40[data-v-9fe6827e] {\n  width: 40%;\n}\n.w-30[data-v-9fe6827e] {\n  width: 30%;\n}\n.w-20[data-v-9fe6827e] {\n  width: 20%;\n}\n.w-10[data-v-9fe6827e] {\n  width: 10%;\n}\n.hs-0[data-v-9fe6827e] {\n  height: 0% !important;\n}\n.hs-35[data-v-9fe6827e] {\n  height: 35% !important;\n}\n.hs-65[data-v-9fe6827e] {\n  height: 65% !important;\n}\n.hs-100[data-v-9fe6827e] {\n  height: calc(100vh - 158px) !important;\n}\n.rel[data-v-9fe6827e] {\n  position: relative;\n}\n.text-center[data-v-9fe6827e] {\n  text-align: center;\n}\n.text-left[data-v-9fe6827e] {\n  text-align: left;\n}\n.text-right[data-v-9fe6827e] {\n  text-align: right;\n}\n.h-top[data-v-9fe6827e] {\n  height: calc(100vh - 90px);\n}\n.h-top2[data-v-9fe6827e] {\n  height: calc(100vh - 158px);\n}\n.left[data-v-9fe6827e] {\n  float: left !important;\n}\n.right[data-v-9fe6827e] {\n  float: right !important;\n}\n.p-20[data-v-9fe6827e] {\n  padding: 20px;\n}\n.img-box[data-v-9fe6827e] {\n  position: relative;\n}\n.img-box .v-image[data-v-9fe6827e] {\n  background: #ffffff;\n  max-width: 70%;\n  max-height: 70%;\n  text-align: center;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  position: absolute;\n  margin: auto;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ })

}]);