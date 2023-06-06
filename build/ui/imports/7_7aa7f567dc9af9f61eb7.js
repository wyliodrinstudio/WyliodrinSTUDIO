(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setup; });
/* harmony import */ var _views_PinLayout_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(303);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
let studio = null;





var dict_pins_type_board = {};

var dict_pins_board = {};

var dict_pins_type = {};

function setup (options, imports, register)
{
	studio = imports;

	studio.workspace.registerTab('PIN_LAYOUT', 500, _views_PinLayout_vue__WEBPACK_IMPORTED_MODULE_0__["default"], {
		visible: () => {
			let device = studio.workspace.getDevice ();
			return device.type !== 'none' && pin_layout._pinsLayoutImage(device.type, device.board) !== null;
		}
	});

	let pin_layout = {

		/**
		 * This function registers a customized pin layout image for the connected device. 
		 * It's called each time you create a plugin for a new type of board. Depending on 
		 * the type of the device or on the name of the board, the purpose of this function 
		 * is to display the specified image within the Pin Layout tab. 
		 * 
		 * @param {string} type - device type
		 * @param {string} board - board name
		 * @param {string} img - path to the pin layout image
		 */
		registerPinLayout(type, board, img) {
			if (type && board) {
				dict_pins_type_board[type+':'+board] = {
					img
				};
			} else if (type == null && board) {
				dict_pins_board[board] = {
					img
				};
			} else if (board == null && type) {
				dict_pins_type[type] = {
					img
				};
			}
		},

		_pinsLayoutImage (type, board)
		{
			let image = null;
			if (type && board) {
				if (dict_pins_type_board[type+':'+board]) {
					image =  dict_pins_type_board[type+':'+board].img;
					// if(_.isFunction(image))
					// 	return image(studio.workspace.getDevice());
					// else
					// 	return image;
				}
			} else if (type == null && board) {
				if (dict_pins_board[board]) {
					// return dict_pins_board[board].img;
					image = dict_pins_board[board].img;
				}
			} else if (type && board == null) {
				if (dict_pins_type[type]) {
					// return dict_pins_type[type].img;
					image = dict_pins_type[type].img;
				}
			}

			if(image)
			{
				if(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isFunction(image))
					return image(studio.workspace.getDevice());
				else
					return image;
			}
			return image;
		}
	};
	
	register (null, {
		pin_layout
	});
}


/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PinLayout_vue_vue_type_template_id_1bf2c247_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(304);
/* harmony import */ var _PinLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(306);
/* empty/unused harmony star reexport *//* harmony import */ var _PinLayout_vue_vue_type_style_index_0_id_1bf2c247_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(308);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _PinLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PinLayout_vue_vue_type_template_id_1bf2c247_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PinLayout_vue_vue_type_template_id_1bf2c247_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1bf2c247",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/devices/pinlayout/views/PinLayout.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PinLayout_vue_vue_type_template_id_1bf2c247_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(305);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PinLayout_vue_vue_type_template_id_1bf2c247_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PinLayout_vue_vue_type_template_id_1bf2c247_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 305:
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
    { staticClass: "pin-box", attrs: { align: "center" } },
    [
      _c("v-img", {
        attrs: {
          src: _vm.changeBoardPinsImage,
          "aspect-ratio": "3.11",
          contain: "",
          height: "100%",
          width: "100%",
          "max-height": "874px"
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_PinLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(307);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_PinLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'PinLayout',
	data() {
		return {
			
		};
	},
	computed: {
		...Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"]) ({
			device: 'workspace/device',
			status: 'workspace/status',
		}),
		changeBoardPinsImage () {
			return this.studio.pin_layout._pinsLayoutImage (this.device.type, this.device.board) || '';
		}
	},
	methods: {
	}
});


/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PinLayout_vue_vue_type_style_index_0_id_1bf2c247_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(309);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PinLayout_vue_vue_type_style_index_0_id_1bf2c247_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PinLayout_vue_vue_type_style_index_0_id_1bf2c247_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PinLayout_vue_vue_type_style_index_0_id_1bf2c247_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PinLayout_vue_vue_type_style_index_0_id_1bf2c247_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PinLayout_vue_vue_type_style_index_0_id_1bf2c247_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 309:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(310);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("08dda434", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 310:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".w-100[data-v-1bf2c247] {\n  width: 100%;\n}\n.w-90[data-v-1bf2c247] {\n  width: 90%;\n}\n.w-80[data-v-1bf2c247] {\n  width: 80%;\n}\n.w-70[data-v-1bf2c247] {\n  width: 70%;\n}\n.w-60[data-v-1bf2c247] {\n  width: 60%;\n}\n.w-50[data-v-1bf2c247] {\n  width: 50%;\n}\n.w-40[data-v-1bf2c247] {\n  width: 40%;\n}\n.w-30[data-v-1bf2c247] {\n  width: 30%;\n}\n.w-20[data-v-1bf2c247] {\n  width: 20%;\n}\n.w-10[data-v-1bf2c247] {\n  width: 10%;\n}\n.hs-0[data-v-1bf2c247] {\n  height: 0% !important;\n}\n.hs-35[data-v-1bf2c247] {\n  height: 35% !important;\n}\n.hs-65[data-v-1bf2c247] {\n  height: 65% !important;\n}\n.hs-100[data-v-1bf2c247] {\n  height: calc(100vh - 158px) !important;\n}\n.rel[data-v-1bf2c247] {\n  position: relative;\n}\n.text-center[data-v-1bf2c247] {\n  text-align: center;\n}\n.text-left[data-v-1bf2c247] {\n  text-align: left;\n}\n.text-right[data-v-1bf2c247] {\n  text-align: right;\n}\n.h-top[data-v-1bf2c247] {\n  height: calc(100vh - 90px);\n}\n.h-top2[data-v-1bf2c247] {\n  height: calc(100vh - 158px);\n}\n.left[data-v-1bf2c247] {\n  float: left !important;\n}\n.right[data-v-1bf2c247] {\n  float: right !important;\n}\n.p-20[data-v-1bf2c247] {\n  padding: 20px;\n}\n.pin-box[data-v-1bf2c247] {\n  background: #ffffff;\n  width: 100%;\n  height: 100%;\n  text-align: center;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ })

}]);