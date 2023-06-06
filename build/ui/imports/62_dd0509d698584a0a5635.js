(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[62],{

/***/ 1864:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var _views_Xterm_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1865);


function setup (options, imports, register) {
	imports.workspace.registerComponent (_views_Xterm_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);

	register (null, {
		xterm: {
			Xterm: _views_Xterm_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
		}
	});
}

/***/ }),

/***/ 1865:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Xterm_vue_vue_type_template_id_417f2424_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1866);
/* harmony import */ var _Xterm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1868);
/* empty/unused harmony star reexport *//* harmony import */ var _Xterm_vue_vue_type_style_index_0_id_417f2424_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1871);
/* harmony import */ var _Xterm_vue_vue_type_style_index_1_lang_less___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1874);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(54);







/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _Xterm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Xterm_vue_vue_type_template_id_417f2424_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Xterm_vue_vue_type_template_id_417f2424_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "417f2424",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/studio/xterm/views/Xterm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1866:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Xterm_vue_vue_type_template_id_417f2424_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1867);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Xterm_vue_vue_type_template_id_417f2424_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Xterm_vue_vue_type_template_id_417f2424_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1867:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "fill-height" }, [
    _c("div", { staticClass: "terminal-actions" }, [
      _c("span", [_vm._v(_vm._s(_vm.currentTerminalTitle))]),
      _vm._v(" "),
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
                          { attrs: { small: "" }, on: { click: _vm.clear } },
                          on
                        ),
                        [
                          _c("v-img", {
                            attrs: {
                              src:
                                "plugins/studio/xterm/data/img/icons/clear-icon.svg"
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
            [_vm._v(" "), _c("span", [_vm._v("Clear Terminal")])]
          ),
          _vm._v(" "),
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
                          { attrs: { small: "" }, on: { click: _vm.reset } },
                          on
                        ),
                        [
                          _c("v-img", {
                            attrs: {
                              src:
                                "plugins/studio/xterm/data/img/icons/reset-icon.svg"
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
            [_vm._v(" "), _c("span", [_vm._v("Reset Terminal")])]
          )
        ],
        1
      )
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        directives: [
          { name: "show", rawName: "v-show", value: !_vm.id, expression: "!id" }
        ],
        staticClass: "xterm-warning"
      },
      [
        _c("v-img", {
          attrs: {
            src: "plugins/studio/xterm/data/img/icons/no-shell-icon.svg"
          }
        }),
        _vm._v(" "),
        _c("span", [_vm._v(_vm._s(_vm.$t(_vm.noShell)))])
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { ref: "shell", staticClass: "bottom-shell-box" })
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1868:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_Xterm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1869);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_Xterm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1869:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var xterm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1870);
/* harmony import */ var xterm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(xterm__WEBPACK_IMPORTED_MODULE_0__);
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
//
//
//


var $ = __webpack_require__ (1631);

// import { FitAddon } from 'xterm-addon-fit';

xterm__WEBPACK_IMPORTED_MODULE_0__["Terminal"].prototype.proposeGeometry = function () {
	if (!this.element.parentElement) {
		return null;
	}
	var parentElementStyle = window.getComputedStyle(this.element.parentElement);
	var parentElementHeight = parseInt(parentElementStyle.getPropertyValue('height'));
	var parentElementWidth = Math.max(0, parseInt(parentElementStyle.getPropertyValue('width')));
	var elementStyle = window.getComputedStyle(this.element);
	var elementPadding = {
		top: parseInt(elementStyle.getPropertyValue('padding-top')),
		bottom: parseInt(elementStyle.getPropertyValue('padding-bottom')),
		right: parseInt(elementStyle.getPropertyValue('padding-right')),
		left: parseInt(elementStyle.getPropertyValue('padding-left'))
	};
	var elementPaddingVer = elementPadding.top + elementPadding.bottom;
	var elementPaddingHor = elementPadding.right + elementPadding.left;
	var availableHeight = parentElementHeight - elementPaddingVer;
	var availableWidth = parentElementWidth - elementPaddingHor - this._core.viewport.scrollBarWidth;
	var geometry = {
		cols: Math.floor(availableWidth / (this._core._renderService.dimensions.actualCellWidth || 9)),
		rows: Math.floor(availableHeight / (this._core._renderService.dimensions.actualCellHeight || 17))
	};
	return geometry;
};

xterm__WEBPACK_IMPORTED_MODULE_0__["Terminal"].prototype.fit = function () {
	var geometry = this.proposeGeometry();
	if (geometry) {
		if (this.rows !== geometry.rows || this.cols !== geometry.cols) {
			this._core._renderService.clear();
			this.resize(geometry.cols, geometry.rows);
		}
	}
};

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'Xterm',
	props: ['active', 'noShell'],
	data ()
	{
		return {
			shell: null,
			// fitAddon: null,
			id: null,
			currentTerminalTitle: '',
			buffers: {
				
			},
			shouldResize: true,
		};
	},
	mounted () {
		this.$nextTick (() => {
			this.start ();
		});
	},
	methods: {
		start ()
		{
			let shell = new xterm__WEBPACK_IMPORTED_MODULE_0__["Terminal"] ({cols: 80, rows: 24});
			// let fitAddon = new FitAddon();
			// shell.loadAddon (fitAddon);
			this.shell = shell;
			// this.fitAddon = fitAddon;
			shell.open (this.$refs.shell);
			$(window).resize(this.resize);
			this.update ();
			shell.onTitleChange((title) => {
				try
				{
					if (this.id)
					{
						this.ensureBuffer (this.id);
						this.buffers[this.id].title = title;
						this.currentTerminalTitle = this.buffers[this.id].title;
					}
				}
				catch(e)
				{
					this.studio.workspace.warn(e.message);
				}
				
			});
			shell.onData ((data) =>{
				if (this.id !== null)
				{
					this.$emit ('data', this.id, data);
				}
			});
		},
		select (id)
		{
			this.write (id, '');
			this.update ();
		},

		write (id, data)
		{
			if(this.id != id)
			{	
				if (this.id !== null)
				{
					this.shell.selectAll ();
					this.buffers[this.id] = {
						title: this.shell.title,
						data: this.shell.getSelection (),
						x: this.shell.buffer.active.cursorX,
						y: this.shell.buffer.active.cursorY,
						// title: (this.buffers[this.id]?this.buffers[this.id].title:'')
					};
				}
				this.id = id;
				this.shell.reset();
				if(this.buffers[id] && this.buffers[id].data)
				{
					// shell.write (this.buffers[id].title);
					this.shell.write (this.buffers[id].data);
					this.shell.write ('\x1b['+this.buffers[id].y+';'+this.buffers[id].x+'f');
					this.currentTerminalTitle = this.buffers[id].title;
				}
			}
			// console.log('undefined');
			this.shell.write (data);
		},

		getSize ()
		{
			return {cols: this.shell.cols, rows: this.shell.rows};
		},

		ensureBuffer (id)
		{
			if (!this.buffers[id]) this.buffers[id] = {};
		},
		resize ()
		{
			this.shouldResize = true;
			this.update ();
		},
		update() 
		{
			if (this.active && this.shouldResize)
			{
				this.shouldResize = false;
				if (this.shell)
				{
					let geometry = this.shell.proposeGeometry ();
					if (geometry.rows !== Infinity && geometry.rows > 0 && geometry.cols > 0)
					{
					// this.fitAddon.fit ();
						this.shell.fit ();
						this.$emit ('resize', this.id, this.shell.cols, this.shell.rows);
					}
				}
			}
		},
		clear()
		{
			this.shell.clear();
		},
		reset()
		{
			this.shell.reset();
		}
	},

	watch: {
		id ()
		{
			this.update ();
		},
		active ()
		{
			setTimeout (() => this.update(), 10);
		}
	},
	
	destroyed ()
	{
		$(window).off('resize', this.resize);
		this.exit ();
	}
});



/***/ }),

/***/ 1871:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Xterm_vue_vue_type_style_index_0_id_417f2424_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1872);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Xterm_vue_vue_type_style_index_0_id_417f2424_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Xterm_vue_vue_type_style_index_0_id_417f2424_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Xterm_vue_vue_type_style_index_0_id_417f2424_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Xterm_vue_vue_type_style_index_0_id_417f2424_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Xterm_vue_vue_type_style_index_0_id_417f2424_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1872:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1873);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("4af7f649", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 1873:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".w-100[data-v-417f2424] {\n  width: 100%;\n}\n.w-90[data-v-417f2424] {\n  width: 90%;\n}\n.w-80[data-v-417f2424] {\n  width: 80%;\n}\n.w-70[data-v-417f2424] {\n  width: 70%;\n}\n.w-60[data-v-417f2424] {\n  width: 60%;\n}\n.w-50[data-v-417f2424] {\n  width: 50%;\n}\n.w-40[data-v-417f2424] {\n  width: 40%;\n}\n.w-30[data-v-417f2424] {\n  width: 30%;\n}\n.w-20[data-v-417f2424] {\n  width: 20%;\n}\n.w-10[data-v-417f2424] {\n  width: 10%;\n}\n.hs-0[data-v-417f2424] {\n  height: 0% !important;\n}\n.hs-35[data-v-417f2424] {\n  height: 35% !important;\n}\n.hs-65[data-v-417f2424] {\n  height: 65% !important;\n}\n.hs-100[data-v-417f2424] {\n  height: calc(100vh - 158px) !important;\n}\n.rel[data-v-417f2424] {\n  position: relative;\n}\n.text-center[data-v-417f2424] {\n  text-align: center;\n}\n.text-left[data-v-417f2424] {\n  text-align: left;\n}\n.text-right[data-v-417f2424] {\n  text-align: right;\n}\n.h-top[data-v-417f2424] {\n  height: calc(100vh - 90px);\n}\n.h-top2[data-v-417f2424] {\n  height: calc(100vh - 158px);\n}\n.left[data-v-417f2424] {\n  float: left !important;\n}\n.right[data-v-417f2424] {\n  float: right !important;\n}\n.p-20[data-v-417f2424] {\n  padding: 20px;\n}\n.terminal-actions[data-v-417f2424] {\n  background: #191e25;\n  color: #ffffff;\n  overflow: auto;\n  padding: 10px 36px 10px 10px;\n}\n.terminal-actions > span[data-v-417f2424] {\n  display: inline-block;\n  position: relative;\n  float: left;\n  line-height: 24px;\n}\n.terminal-actions .terminal-btns[data-v-417f2424] {\n  float: right;\n  display: inline;\n}\n.terminal-actions .terminal-btns button[data-v-417f2424] {\n  border: #868686 0px solid;\n  border-radius: 30px;\n  min-width: initial !important;\n  background-color: transparent !important;\n  color: #ffffff !important;\n  font-size: 12px;\n  text-transform: initial;\n  font-weight: 300;\n  height: 24px !important;\n  padding: 0 5px !important;\n  margin: 0px !important;\n  box-shadow: none !important;\n}\n.terminal-actions .terminal-btns button .v-image[data-v-417f2424] {\n  height: 14px;\n  width: 14px;\n  filter: invert(100%) !important;\n}\n.terminal-actions .terminal-btns button .v-responsive__content[data-v-417f2424] {\n  width: 14px !important;\n}\n.terminal-actions .terminal-btns button[data-v-417f2424]:hover {\n  border: #e54225 0px solid;\n  background-color: #e54225 !important;\n  color: #ffffff;\n}\n.xterm-warning[data-v-417f2424] {\n  position: absolute;\n  margin: auto;\n  left: 0;\n  right: 0;\n  top: 44px;\n  bottom: 0;\n  z-index: 100;\n  color: #a5a5a5;\n  font-size: 14px;\n  font-weight: 300;\n  background-color: rgba(255, 255, 255, 0.1);\n}\n.xterm-warning .v-image[data-v-417f2424] {\n  height: 80px;\n  width: 80px;\n  margin: 35px auto 10px !important;\n  filter: invert(60%) !important;\n}\n.shell-box[data-v-417f2424] {\n  background: #000000;\n}\n.shell-box > .fill-height[data-v-417f2424] {\n  height: calc(100vh - 40px);\n}\n.shell-box > .terminal-actions[data-v-417f2424] {\n  background: #191e25;\n  color: #ffffff;\n  overflow: auto;\n  padding: 10px 10px 10px 10px;\n}\n.shell-box > .terminal-actions > span[data-v-417f2424] {\n  display: inline-block;\n  position: relative;\n  float: left;\n  line-height: 24px;\n}\n.shell-box > .terminal-actions .terminal-btns[data-v-417f2424] {\n  float: right;\n  display: inline;\n}\n.shell-box > .terminal-actions .terminal-btns button[data-v-417f2424] {\n  border: #868686 0px solid;\n  border-radius: 30px;\n  min-width: initial !important;\n  background-color: transparent !important;\n  color: #ffffff !important;\n  font-size: 12px;\n  text-transform: initial;\n  font-weight: 300;\n  height: 24px !important;\n  padding: 0 5px !important;\n  margin: 0px !important;\n  box-shadow: none !important;\n}\n.shell-box > .terminal-actions .terminal-btns button .v-image[data-v-417f2424] {\n  height: 14px;\n  width: 14px;\n  filter: invert(100%) !important;\n}\n.shell-box > .terminal-actions .terminal-btns button .v-responsive__content[data-v-417f2424] {\n  width: 14px !important;\n}\n.shell-box > .terminal-actions .terminal-btns button[data-v-417f2424]:hover {\n  border: #e54225 0px solid;\n  background-color: #e54225 !important;\n  color: #ffffff;\n}\n.shell-box .xterm-warning[data-v-417f2424] {\n  position: absolute;\n  margin: auto;\n  left: 0;\n  right: 0;\n  top: 0;\n  z-index: 100;\n  color: #a5a5a5;\n  font-size: 14px;\n  font-weight: 300;\n  text-align: center;\n  background-color: rgba(255, 255, 255, 0.1);\n}\n.shell-box .xterm-warning .v-image[data-v-417f2424] {\n  height: 128px;\n  width: 128px;\n  margin: 15% auto 50px !important;\n  filter: invert(60%) !important;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 1874:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Xterm_vue_vue_type_style_index_1_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1875);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Xterm_vue_vue_type_style_index_1_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Xterm_vue_vue_type_style_index_1_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Xterm_vue_vue_type_style_index_1_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Xterm_vue_vue_type_style_index_1_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Xterm_vue_vue_type_style_index_1_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1875:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1876);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("82ea696e", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 1876:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
var ___CSS_LOADER_AT_RULE_IMPORT_0___ = __webpack_require__(1877);
exports = ___CSS_LOADER_API_IMPORT___(false);
exports.i(___CSS_LOADER_AT_RULE_IMPORT_0___);
// Module
exports.push([module.i, "\n", ""]);
// Exports
module.exports = exports;


/***/ })

}]);