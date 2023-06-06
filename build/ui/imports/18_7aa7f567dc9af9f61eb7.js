(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

/***/ 451:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var _views_FirstRunDialog_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(452);

let studio = null;

let firstrun = {

	isFirstRun()
	{
		return studio.settings.loadValue('firstrun', 'firstRun', true);
	},

	showFirstRun()
	{
		studio.workspace.showDialog(_views_FirstRunDialog_vue__WEBPACK_IMPORTED_MODULE_0__["default"],{width:550});
		studio.settings.storeValue('firstrun', 'firstRun', false);
	}
};

function setup(options, imports, register)
{
	imports.events.on ('ready', (imports) =>
	{
		studio = imports; 

		if(firstrun.isFirstRun())
		{
			firstrun.showFirstRun();
		}
			
	});
	register(null, {
		firstrun: firstrun
	});
}

/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FirstRunDialog_vue_vue_type_template_id_222c062a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(453);
/* harmony import */ var _FirstRunDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(455);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FirstRunDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FirstRunDialog_vue_vue_type_template_id_222c062a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FirstRunDialog_vue_vue_type_template_id_222c062a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/first.run/views/FirstRunDialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FirstRunDialog_vue_vue_type_template_id_222c062a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(454);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FirstRunDialog_vue_vue_type_template_id_222c062a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FirstRunDialog_vue_vue_type_template_id_222c062a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 454:
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
        _c(
          "div",
          { staticClass: "about-logo" },
          [
            _c("v-img", {
              attrs: {
                src:
                  "plugins/first.run/data/img/logo/wyliodrin-studio-about-logo.png"
              }
            }),
            _vm._v(" "),
            _c("span", [
              _vm._v(
                _vm._s(_vm.$t("ABOUT_VERSION")) +
                  " " +
                  _vm._s(_vm.studio.workspace.version)
              )
            ])
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c("v-card-text", [
        _c("div", { staticClass: "welcome" }, [
          _c("h3", [_vm._v(_vm._s(_vm.$t("WELCOME_TEXT")))]),
          _vm._v(" "),
          _c("p", { staticClass: "welcome-text" }, [
            _vm._v(_vm._s(_vm.$t("WELCOME_START_WORK")))
          ]),
          _vm._v(" "),
          _c(
            "p",
            [
              _c(
                "v-btn",
                { staticClass: "welcome-btn", on: { click: _vm.openLibrary } },
                [_vm._v(_vm._s(_vm.$t("WELCOME_CREATE_APP")))]
              ),
              _vm._v(" "),
              _c(
                "v-btn",
                { staticClass: "welcome-btn", on: { click: _vm.setupBoard } },
                [_vm._v(_vm._s(_vm.$t("WELCOME_CONNECT_BOARD")))]
              )
            ],
            1
          )
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "consent" },
          [
            _c("v-checkbox", {
              attrs: {
                dark: "",
                "hide-details": "",
                dense: "",
                label: _vm.$t("ABOUT_FEEDBACK")
              },
              model: {
                value: _vm.feedback,
                callback: function($$v) {
                  _vm.feedback = $$v
                },
                expression: "feedback"
              }
            })
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c(
        "v-card-actions",
        [
          _c("div", { staticClass: "provided" }, [
            _c("p", [
              _vm._v(_vm._s(_vm.$t("ABOUT_PROVIDED_BY")) + " "),
              _c(
                "a",
                { attrs: { target: "_blank" }, on: { click: _vm.openLink } },
                [_vm._v("Wyliodrin SRL")]
              )
            ])
          ]),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c("v-btn", { attrs: { text: "" }, on: { click: _vm.exit } }, [
            _vm._v(_vm._s(_vm.$t("EXIT")))
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

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_FirstRunDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(456);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_FirstRunDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 456:
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
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
	data() {
		return {
			feedback: this.studio.settings.loadValue ('workspace', 'feedback', true)
		};
	},
	methods: {
		openLibrary() 
		{
			this.studio.projects.showProjectsLibrary();
		},
		setupBoard()
		{
			this.studio.system.openLink('https://wyliodrinstudio.readthedocs.io/en/latest/boards.html');
		},
		exit()
		{
			this.$root.$emit('submit', undefined);
		},
		openLink()
		{
			this.studio.system.openLink('https:/wyliodrin.com');
		}
	},
	watch: {
		feedback (newfeedback)
		{
			this.studio.settings.storeValue ('workspace', 'feedback', newfeedback);
		}
	}
});


/***/ })

}]);