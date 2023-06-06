(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var _views_Shell_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(312);




let shell = {
	write (id, data)
	{
		let shell = Object(_views_Shell_vue__WEBPACK_IMPORTED_MODULE_0__["getShell"]) ();
		if (shell) shell.write (id, data);
	},
	select (id)
	{
		let shell = Object(_views_Shell_vue__WEBPACK_IMPORTED_MODULE_0__["getShell"]) ();
		if (shell) shell.select (id);
	},
	register (fn)
	{
		let data = fn.bind (fn.this, 'data');
		let resize = fn.bind (fn.this, 'resize');
		_views_Shell_vue__WEBPACK_IMPORTED_MODULE_0__["events"].on ('data', data);
		_views_Shell_vue__WEBPACK_IMPORTED_MODULE_0__["events"].on ('resize', resize);
		return () => {
			_views_Shell_vue__WEBPACK_IMPORTED_MODULE_0__["events"].removeListener ('data', data);
			_views_Shell_vue__WEBPACK_IMPORTED_MODULE_0__["events"].removeListener ('resize', resize);
		};
	},
	getSize ()
	{
		let size = {cols: 0, rows: 0};
		let shell = Object(_views_Shell_vue__WEBPACK_IMPORTED_MODULE_0__["getShell"]) ();
		if (shell)
		{
			size = shell.getSize ();
		}
		return size;
	}
};
function setup (options, imports, register)
{
	const studio = imports;
	
	
	studio.workspace.registerTab('PROJECT_SHELL', 600, _views_Shell_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);
	register (null,
		{
			shell: shell
		});
	
}

/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Shell_vue_vue_type_template_id_78d5ce89___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(313);
/* harmony import */ var _Shell_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(315);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "events", function() { return _Shell_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["events"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getShell", function() { return _Shell_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["getShell"]; });

/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Shell_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Shell_vue_vue_type_template_id_78d5ce89___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Shell_vue_vue_type_template_id_78d5ce89___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/devices/shell/views/Shell.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Shell_vue_vue_type_template_id_78d5ce89___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(314);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Shell_vue_vue_type_template_id_78d5ce89___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Shell_vue_vue_type_template_id_78d5ce89___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 314:
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
    { staticClass: "fill-height" },
    [
      _c("Xterm", {
        ref: "shell",
        staticClass: "shell-box",
        attrs: { active: _vm.active, "no-shell": "SHELL_NO_SHELL" },
        on: { data: _vm.data, update: _vm.update, resize: _vm.resize }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_Shell_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(316);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "events", function() { return _node_modules_vue_loader_lib_index_js_vue_loader_options_Shell_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["events"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getShell", function() { return _node_modules_vue_loader_lib_index_js_vue_loader_options_Shell_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["getShell"]; });

 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_Shell_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "events", function() { return events; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getShell", function() { return getShell; });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//


let events = new events__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"] ();
let shell = null;

function getShell ()
{
	return shell;
}

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'Shell',
	props: ['active'],
	data ()
	{
		return {
			events: events
		};
	},
	mounted ()
	{
		shell = this.$refs.shell;
	},
	methods: {
		data: events.emit.bind (events, 'data'), // (...args) => { events.emit ('data', ...args);}
		update: events.emit.bind (events, 'update'),
		resize: events.emit.bind (events, 'resize')
	}
});


/***/ })

}]);