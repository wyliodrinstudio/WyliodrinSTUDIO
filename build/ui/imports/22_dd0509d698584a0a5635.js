(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[22],{

/***/ 481:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setup; });
/* harmony import */ var raw_loader_template_makefile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(482);
/* harmony import */ var raw_loader_template_main_c__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(483);
// import axios from 'axios';
let studio = null;




function setup (options, imports, register)
{
	studio = imports;

	let fileIcons = [
		{
			extension: '.rs',
			icon:'plugins/languages/rust/data/img/rustLittle.png'
		},
		{
			extension: '.toml',
			icon:'mdi-settings'
		},
		{
			extension: '.ld',
			icon:'mdi-settings'
		},
		{
			extension: '.cfg',
			icon:'mdi-settings'
		}
	];

	let c = {
		async createProject(name){			
			await studio.projects.newFile(name,'/main.c', raw_loader_template_main_c__WEBPACK_IMPORTED_MODULE_1__["default"]);			
		},
		getDefaultFileName() {
			return '/main.c';
		},
		getDefaultRunFileName() {
			return '/main.c';
		},
		getMakefile(/* project, filename */) {
			return raw_loader_template_makefile__WEBPACK_IMPORTED_MODULE_0__["default"];
		},
	};

	studio.projects.registerLanguage('c', 'C', 'plugins/languages/c/data/img/project.png', 'plugins/languages/c/data/img/c.png', 'plugins/languages/c/data/img/cLittle.png',fileIcons, c);

	register (null, {
		// provided for application icons
		language_c: {}
	});
}


/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("OBJECTS = $(patsubst %.c, %.o, $(wildcard *.c))\n\nrun: app\n\t./app\n\napp: $(OBJECTS)\n\tgcc $< -o app\n");

/***/ }),

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#include <stdio.h>\n\nint main () {\n    printf (\"Hello World\\n\");\n\treturn 0;\n}\n");

/***/ })

}]);