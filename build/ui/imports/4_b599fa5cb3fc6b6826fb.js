(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setup; });
/* harmony import */ var _views_ImageGraph_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(209);
/* harmony import */ var _views_ImageDialog_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(249);



let dashboard_graph_image = {};
function setup (options, imports, register)
{
	const studio = imports;

	studio.dashboard.registerGraph('IMAGE_GRAPH', 30, 'plugins/dashboard/graph.image/data/img/icons/image.png', _views_ImageGraph_vue__WEBPACK_IMPORTED_MODULE_0__["default"], {
		width: 2,
		height: 5,
		setup: (data) => {
			return studio.workspace.showDialog(_views_ImageDialog_vue__WEBPACK_IMPORTED_MODULE_1__["default"],{
				width:600,
				data:data
			});
		}
	});
	
	register (null, {
		dashboard_graph_image: dashboard_graph_image
	});
}


/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ImageGraph_vue_vue_type_template_id_72ea6da8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(210);
/* harmony import */ var _ImageGraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(212);
/* empty/unused harmony star reexport *//* harmony import */ var _ImageGraph_vue_vue_type_style_index_0_id_72ea6da8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(246);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ImageGraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ImageGraph_vue_vue_type_template_id_72ea6da8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ImageGraph_vue_vue_type_template_id_72ea6da8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "72ea6da8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/dashboard/graph.image/views/ImageGraph.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageGraph_vue_vue_type_template_id_72ea6da8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(211);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageGraph_vue_vue_type_template_id_72ea6da8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageGraph_vue_vue_type_template_id_72ea6da8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("v-img", {
    directives: [
      {
        name: "show",
        rawName: "v-show",
        value: _vm.imageData,
        expression: "imageData"
      }
    ],
    attrs: { src: _vm.imageData, width: _vm.width, height: _vm.height }
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_ImageGraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(213);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageGraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony import */ var mustache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(218);
/* harmony import */ var mustache__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mustache__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(219);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'ImageGraph',
	props: ['data', 'width', 'height'],
	data() {
		return {
			value: null,
			imageData: null
		};
	},
	watch: {
		data: {
			deep: true,
			immediate: true,
			handler() {
				if (this.unregister) {
					this.unregister();
				}
				this.unregister = this.studio.dashboard.registerForSignal(
					this.data.id,
					(data) => {
						this.value = data.v;
					}
				);
				this.$forceUpdate ();
			},
		},
		async value () {
			let imageLinks = this.data.imageLinks.replace (/\r?\n$/, '');
			let images = imageLinks.split (/\r?\n/);
			let link = null;
			if (images.length === 1) {
				link = mustache__WEBPACK_IMPORTED_MODULE_0___default.a.render (imageLinks, { 
					[this.data.id]: this.value, 
					params: {
						width: this.width,
						height: this.height,
						...this.data
					}
				});
			}
			else
			{
				link = images[this.value];
			}
			if (link) {
				try
				{
					let data = await axios__WEBPACK_IMPORTED_MODULE_1___default.a.get (link, {
						responseType: 'arraybuffer'
					});
					this.imageData = 'data:image/*;base64,'+Buffer.from (data.data).toString ('base64');
				}
				catch (e)
				{
					this.imageData = null;
				}
			}
			else
			{
				this.imageData = null;
			}
		}
	},
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(214).Buffer))

/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageGraph_vue_vue_type_style_index_0_id_72ea6da8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(247);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageGraph_vue_vue_type_style_index_0_id_72ea6da8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageGraph_vue_vue_type_style_index_0_id_72ea6da8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageGraph_vue_vue_type_style_index_0_id_72ea6da8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageGraph_vue_vue_type_style_index_0_id_72ea6da8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageGraph_vue_vue_type_style_index_0_id_72ea6da8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(248);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("37d34858", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".v-image[data-v-72ea6da8] {\n  top: 0;\n  margin: auto;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ImageDialog_vue_vue_type_template_id_127a935e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(250);
/* harmony import */ var _ImageDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(252);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ImageDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ImageDialog_vue_vue_type_template_id_127a935e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ImageDialog_vue_vue_type_template_id_127a935e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/dashboard/graph.image/views/ImageDialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageDialog_vue_vue_type_template_id_127a935e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(251);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageDialog_vue_vue_type_template_id_127a935e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageDialog_vue_vue_type_template_id_127a935e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 251:
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
    { staticClass: "graphDialog" },
    [
      _c("v-card-title", [_vm._v(_vm._s(_vm.$t("DASHBOARD_ADDIMAGE")))]),
      _vm._v(" "),
      _c(
        "v-card-text",
        { staticClass: "graphDialog" },
        [
          _c(
            "div",
            {
              staticClass: "signal-details row",
              attrs: { "layout-padding": "" }
            },
            [
              _c(
                "v-text-field",
                {
                  staticClass: "col-md-6",
                  attrs: {
                    autofocus: "",
                    color: "orange",
                    label: _vm.$t("DASHBOARD_SIGNAL_NAME"),
                    required: ""
                  },
                  model: {
                    value: _vm.newdata.id,
                    callback: function($$v) {
                      _vm.$set(_vm.newdata, "id", $$v)
                    },
                    expression: "newdata.id"
                  }
                },
                [_vm._v(_vm._s(_vm.$t("DASHBOARD_SIGNAL_NAME")))]
              ),
              _vm._v(" "),
              _c("v-text-field", {
                staticClass: "col-md-6",
                attrs: { label: _vm.$t("NAME") },
                model: {
                  value: _vm.newdata.title,
                  callback: function($$v) {
                    _vm.$set(_vm.newdata, "title", $$v)
                  },
                  expression: "newdata.title"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-text-field",
            {
              staticClass: "col-md-12",
              attrs: {
                color: "orange",
                label: _vm.$t("DASHBOARD_SIGNAL_DESCRIPTION"),
                required: ""
              },
              model: {
                value: _vm.newdata.description,
                callback: function($$v) {
                  _vm.$set(_vm.newdata, "description", $$v)
                },
                expression: "newdata.description"
              }
            },
            [_vm._v(_vm._s(_vm.$t("DASHBOARD_SIGNAL_DESCRIPTION")))]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "sig-properties row" }, [
            _c("span", { staticClass: "col-md-12" }, [
              _vm._v(
                "Links (one image link per row)\n\t\t\t\t\tif signal = 0, image from row 1\n\t\t\t\t\tif signal = 1, image from row 2\n\t\t\t\t\tif signal = 2, image from row 3\n\t\t\t\t"
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "col-md-12" },
              [
                _c("v-textarea", {
                  attrs: { outlined: "", required: "" },
                  model: {
                    value: _vm.newdata.imageLinks,
                    callback: function($$v) {
                      _vm.$set(_vm.newdata, "imageLinks", $$v)
                    },
                    expression: "newdata.imageLinks"
                  }
                })
              ],
              1
            )
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-card-actions",
        [
          _c("v-spacer"),
          _vm._v(" "),
          _c("v-btn", { attrs: { text: "" }, on: { click: _vm.close } }, [
            _vm._v(_vm._s(_vm.$t("CLOSE")))
          ]),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              staticClass: "newapp",
              attrs: { text: "" },
              on: { click: _vm.createChart }
            },
            [_vm._v(_vm._s(_vm.$t("DASHBOARD_ADD_SIGNAL")))]
          )
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

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_ImageDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(253);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
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
	name:'ImageDialog',
	components: {
	},
	props:['signal', 'signals', 'data'],
	data() {
		return {
			newdata: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assign ({
				id:'',
				description:'',
				title: '',
				imageLinks:''
			}, this.data)
		};
	},
	methods: {
		esc() {
			this.close();
		},
		enter() {
			this.createChart();
		}, 
		close ()
		{
			this.$root.$emit('submit');
		},
		createChart()
		{
			let title = this.newdata.id.replace(/ /g,'');
			if(title.length > 0)
				this.$root.$emit ('submit', this.newdata);
			else
				this.studio.workspace.showNotification('DASHBOARD_NO_TITLE');
		}
	}
});


/***/ })

}]);