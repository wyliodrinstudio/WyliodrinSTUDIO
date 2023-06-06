(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[42],{

/***/ 569:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setup; });
/* harmony import */ var _views_PatreonDialog_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(570);


function setup (options, imports, register) {
	let studio = imports;

	let showDialog = () => {
		studio.workspace.showDialog(_views_PatreonDialog_vue__WEBPACK_IMPORTED_MODULE_0__["default"],{width:550});
	};

	imports.events.on ('ready', async (imports) =>
	{
		studio = imports; 

		let run_times = await studio.settings.loadValue('patreon', 'run_times', 1);
		let sponsored = await studio.settings.loadValue('patreon', 'sponsored', false);
		studio.settings.storeValue('patreon', 'run_times', run_times + 1);

		if (!sponsored && run_times % 10 == 0) {
			showDialog ();
		}
	});

	studio.workspace.registerMenuItem('PATREON_SPONSOR', 99, () => {
		showDialog ();

	});

	register (null, {});
}

/***/ }),

/***/ 570:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PatreonDialog_vue_vue_type_template_id_0ecedba6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(571);
/* harmony import */ var _PatreonDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(573);
/* empty/unused harmony star reexport *//* harmony import */ var _PatreonDialog_vue_vue_type_style_index_0_id_0ecedba6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(575);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _PatreonDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PatreonDialog_vue_vue_type_template_id_0ecedba6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PatreonDialog_vue_vue_type_template_id_0ecedba6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0ecedba6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/patreon/views/PatreonDialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 571:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PatreonDialog_vue_vue_type_template_id_0ecedba6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(572);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PatreonDialog_vue_vue_type_template_id_0ecedba6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PatreonDialog_vue_vue_type_template_id_0ecedba6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 572:
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
    "v-card",
    { staticClass: "about-box" },
    [
      _c("v-card-title", [
        _c("span", [_vm._v(_vm._s(_vm.$t("PATREON_SPONSOR_TITLE")))])
      ]),
      _vm._v(" "),
      _c("v-card-text", [
        _vm._v("\n\t\t" + _vm._s(_vm.$t("PATREON_SPONSOR_TEXT")) + "\n\t")
      ]),
      _vm._v(" "),
      _c(
        "v-card-actions",
        [
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "a",
            {
              staticClass: "patreon",
              attrs: {
                color: "primary",
                tabindex: "0",
                type: "button",
                role: "button",
                target: "_blank",
                rel: "noopener noreferrer"
              },
              on: {
                click: function($event) {
                  return _vm.openLink()
                }
              }
            },
            [
              _c("div", { staticClass: "patreon-div1" }, [
                _c("div", { staticClass: "patreon-svg1" }, [
                  _c("span", { staticClass: "patreon-svg2" }, [
                    _c(
                      "svg",
                      {
                        attrs: {
                          viewBox: "0 0 569 546",
                          xmlns: "http://www.w3.org/2000/svg"
                        }
                      },
                      [
                        _c("g", [
                          _c("circle", {
                            attrs: {
                              cx: "362.589996",
                              cy: "204.589996",
                              "data-fill": "1",
                              id: "Oval",
                              r: "204.589996"
                            }
                          }),
                          _vm._v(" "),
                          _c("rect", {
                            attrs: {
                              "data-fill": "2",
                              height: "545.799988",
                              id: "Rectangle",
                              width: "100",
                              x: "0",
                              y: "0"
                            }
                          })
                        ])
                      ]
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "patreon-text" }, [
                  _vm._v("Become a patron")
                ])
              ])
            ]
          ),
          _vm._v(" "),
          _c("v-btn", { attrs: { text: "" }, on: { click: _vm.exit } }, [
            _vm._v(_vm._s(_vm.$t("PATREON_SPONSOR_LATER")))
          ])
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 573:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_PatreonDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(574);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_PatreonDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 574:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
	data() {
		return {
			
		};
	},
	methods: {
		exit()
		{
			this.$root.$emit('submit', undefined);
		},
		openLink()
		{
			this.studio.system.openLink('https://www.patreon.com/bePatron?u=27093250');
			this.studio.settings.storeValue('patreon', 'sponsored', true);
			this.$root.$emit('submit', undefined);
		}
	}
});


/***/ }),

/***/ 575:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PatreonDialog_vue_vue_type_style_index_0_id_0ecedba6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(576);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PatreonDialog_vue_vue_type_style_index_0_id_0ecedba6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PatreonDialog_vue_vue_type_style_index_0_id_0ecedba6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PatreonDialog_vue_vue_type_style_index_0_id_0ecedba6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PatreonDialog_vue_vue_type_style_index_0_id_0ecedba6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PatreonDialog_vue_vue_type_style_index_0_id_0ecedba6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 576:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(577);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("2f69816e", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 577:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".patreon[data-v-0ecedba6] {\n  -moz-box-align: center;\n  align-items: center;\n  backface-visibility: hidden;\n  background-color: #ff424d;\n  border-radius: 9999px;\n  border: 1px solid #ff424d;\n  box-sizing: border-box;\n  color: #ffffff !important;\n  cursor: pointer;\n  display: inline-flex;\n  font-size: 0.875rem !important;\n  font-weight: 500;\n  height: unset;\n  -moz-box-pack: center;\n  justify-content: center;\n  padding: 0.46875rem 1rem;\n  position: relative;\n  pointer-events: unset;\n  text-align: center;\n  text-decoration: none;\n  text-transform: none;\n  transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;\n  user-select: none;\n  white-space: unset;\n}\n.patreon-div1[data-v-0ecedba6] {\n  -moz-box-align: center;\n  align-items: center;\n  display: flex;\n  -moz-box-pack: center;\n  justify-content: center;\n  visibility: visible;\n}\n.patreon-svg1[data-v-0ecedba6] {\n  align-self: center;\n  -moz-box-align: center;\n  align-items: center;\n  display: inline-flex;\n  filter: none;\n  cursor: unset;\n  vertical-align: unset;\n  height: unset;\n  width: unset;\n  margin-right: 0.7em;\n}\n.patreon-svg2 svg[data-v-0ecedba6] {\n  height: 1rem;\n  width: 1rem;\n  fill: #ffffff;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ })

}]);