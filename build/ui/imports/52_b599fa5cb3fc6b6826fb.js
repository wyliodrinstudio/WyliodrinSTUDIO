(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[52],{

/***/ 1653:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var _views_Console_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1654);




let studio = null;

function setup (options, imports, register)
{
	studio = imports;

	let filters = [];

	let consoleObject = {
		/**
		 * Write to console
		 * @param {string} id - console id
		 * @param {string} data - console data
		 *  */
		write(id, data) {
			
			let output = data;
			for (let filter of filters) {
				output = filter (id, output);
			}

			let shell = Object(_views_Console_vue__WEBPACK_IMPORTED_MODULE_0__["getConsole"]) ();
			if (shell) shell.write (id, output);
		},

		register (fn)
		{
			let data = fn.bind (fn.this, 'data');
			let resize = fn.bind (fn.this, 'resize');
			_views_Console_vue__WEBPACK_IMPORTED_MODULE_0__["events"].on ('data', data);
			_views_Console_vue__WEBPACK_IMPORTED_MODULE_0__["events"].on ('resize', resize);
			return () => {
				_views_Console_vue__WEBPACK_IMPORTED_MODULE_0__["events"].removeListener ('data', data);
				_views_Console_vue__WEBPACK_IMPORTED_MODULE_0__["events"].removeListener ('resize', resize);
			};
		},

		registerFilter (fn)
		{
			filters.push (fn);
			return () => {
				filters = filters.filter ((item) => item !== fn);
			};
		},

		/**
		 * reset
		 * @param {string} id - console id
		 *  */
		reset(id) {
			let shell = Object(_views_Console_vue__WEBPACK_IMPORTED_MODULE_0__["getConsole"]) ();
			if (shell) shell.reset (id);
		},

		/**
		 * 
		 * @param {string} id - console id
		 */
		select(id) {
			let shell = Object(_views_Console_vue__WEBPACK_IMPORTED_MODULE_0__["getConsole"]) ();
			if (shell) shell.select (id);
		},

		getSize ()
		{
			let size = {cols: 0, rows: 0};
			let shell = Object(_views_Console_vue__WEBPACK_IMPORTED_MODULE_0__["getConsole"]) ();
			if (shell)
			{
				size = shell.getSize ();
			}
			return size;
		},

		show ()
		{
			studio.workspace.openStatusButton ('CONSOLE');
		}
	};

	studio.workspace.registerComponent (studio.xterm.Xterm);

	studio.workspace.registerStatusButton ('CONSOLE', 1, _views_Console_vue__WEBPACK_IMPORTED_MODULE_0__["default"], 'plugins/studio/console/data/img/icons/terminal-icon.svg', {
		height () {
			return '30vh';
		}
	});

	register (null, {
		console: consoleObject
	});
}

/***/ }),

/***/ 1654:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Console_vue_vue_type_template_id_04ba45ca_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1655);
/* harmony import */ var _Console_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1657);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "events", function() { return _Console_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["events"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getConsole", function() { return _Console_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["getConsole"]; });

/* harmony import */ var _Console_vue_vue_type_style_index_0_id_04ba45ca_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1659);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Console_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Console_vue_vue_type_template_id_04ba45ca_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Console_vue_vue_type_template_id_04ba45ca_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "04ba45ca",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/studio/console/views/Console.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1655:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Console_vue_vue_type_template_id_04ba45ca_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1656);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Console_vue_vue_type_template_id_04ba45ca_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Console_vue_vue_type_template_id_04ba45ca_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1656:
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
    { staticStyle: { position: "relative" } },
    [
      _c(
        "div",
        { staticClass: "terminal-btns" },
        [
          _c(
            "v-tooltip",
            {
              attrs: { top: "" },
              scopedSlots: _vm._u([
                {
                  key: "activator",
                  fn: function(ref) {
                    var on = ref.on
                    return [
                      _c(
                        "v-btn",
                        _vm._g(
                          { attrs: { small: "" }, on: { click: _vm.close } },
                          on
                        ),
                        [
                          _c("v-img", {
                            attrs: {
                              src:
                                "plugins/studio/console/data/img/icons/close-icon.svg"
                            }
                          })
                        ],
                        1
                      )
                    ]
                  }
                }
              ])
            },
            [_vm._v(" "), _c("span", [_vm._v(_vm._s(_vm.$t("CLOSE")))])]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("Xterm", {
        ref: "shell",
        attrs: { "no-shell": "CONSOLE_NO_SHELL", active: _vm.active },
        on: { data: _vm.data, update: _vm.update, resize: _vm.resize }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1657:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_Console_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1658);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "events", function() { return _node_modules_vue_loader_lib_index_js_vue_loader_options_Console_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["events"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getConsole", function() { return _node_modules_vue_loader_lib_index_js_vue_loader_options_Console_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["getConsole"]; });

 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_Console_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1658:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "events", function() { return events; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConsole", function() { return getConsole; });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
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


let events = new events__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"] ();

let shell = null;

function getConsole ()
{
	return shell;
}

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'Console',
	props: ['active'],
	methods: {
		close ()
		{
			this.studio.workspace.closeStatusButton ();
		},
		data: events.emit.bind (events, 'data'),
		update: events.emit.bind (events, 'update'),
		resize: events.emit.bind (events, 'resize'),
		esc ()
		{
			this.close ();
		}
	},
	mounted ()
	{
		shell = this.$refs.shell;
	}
});


/***/ }),

/***/ 1659:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Console_vue_vue_type_style_index_0_id_04ba45ca_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1660);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Console_vue_vue_type_style_index_0_id_04ba45ca_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Console_vue_vue_type_style_index_0_id_04ba45ca_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Console_vue_vue_type_style_index_0_id_04ba45ca_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Console_vue_vue_type_style_index_0_id_04ba45ca_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Console_vue_vue_type_style_index_0_id_04ba45ca_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1660:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1661);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("ef8303e0", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 1661:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".w-100[data-v-04ba45ca] {\n  width: 100%;\n}\n.w-90[data-v-04ba45ca] {\n  width: 90%;\n}\n.w-80[data-v-04ba45ca] {\n  width: 80%;\n}\n.w-70[data-v-04ba45ca] {\n  width: 70%;\n}\n.w-60[data-v-04ba45ca] {\n  width: 60%;\n}\n.w-50[data-v-04ba45ca] {\n  width: 50%;\n}\n.w-40[data-v-04ba45ca] {\n  width: 40%;\n}\n.w-30[data-v-04ba45ca] {\n  width: 30%;\n}\n.w-20[data-v-04ba45ca] {\n  width: 20%;\n}\n.w-10[data-v-04ba45ca] {\n  width: 10%;\n}\n.hs-0[data-v-04ba45ca] {\n  height: 0% !important;\n}\n.hs-35[data-v-04ba45ca] {\n  height: 35% !important;\n}\n.hs-65[data-v-04ba45ca] {\n  height: 65% !important;\n}\n.hs-100[data-v-04ba45ca] {\n  height: calc(100vh - 158px) !important;\n}\n.rel[data-v-04ba45ca] {\n  position: relative;\n}\n.text-center[data-v-04ba45ca] {\n  text-align: center;\n}\n.text-left[data-v-04ba45ca] {\n  text-align: left;\n}\n.text-right[data-v-04ba45ca] {\n  text-align: right;\n}\n.h-top[data-v-04ba45ca] {\n  height: calc(100vh - 90px);\n}\n.h-top2[data-v-04ba45ca] {\n  height: calc(100vh - 158px);\n}\n.left[data-v-04ba45ca] {\n  float: left !important;\n}\n.right[data-v-04ba45ca] {\n  float: right !important;\n}\n.p-20[data-v-04ba45ca] {\n  padding: 20px;\n}\n.terminal-btns[data-v-04ba45ca] {\n  position: absolute;\n  right: 10px;\n  top: 10px;\n}\n.terminal-btns button[data-v-04ba45ca] {\n  border: #868686 0px solid;\n  border-radius: 30px;\n  min-width: initial !important;\n  background-color: transparent !important;\n  color: #ffffff !important;\n  font-size: 12px;\n  text-transform: initial;\n  font-weight: 300;\n  height: 24px !important;\n  padding: 0 7px !important;\n  margin: 0px !important;\n  box-shadow: none !important;\n}\n.terminal-btns button .v-image[data-v-04ba45ca] {\n  height: 10px;\n  width: 10px;\n  filter: invert(100%) !important;\n}\n.terminal-btns button .v-responsive__content[data-v-04ba45ca] {\n  width: 10px !important;\n}\n.terminal-btns button[data-v-04ba45ca]:hover {\n  border: #e54225 0px solid;\n  background-color: #e54225 !important;\n  color: #ffffff;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ })

}]);