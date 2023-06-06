(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ 444:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setup; });
let studio = null;

let documentation = {};

function setup (options, imports, register)
{
	studio = imports;

	studio.workspace.registerMenuItem ('DOCUMENTATION', 10, () => {
		studio.system.openLink('https://wyliodrinstudio.readthedocs.io/en/latest/');
	});

	register (null, {
		documentation: documentation
	});
}


/***/ })

}]);