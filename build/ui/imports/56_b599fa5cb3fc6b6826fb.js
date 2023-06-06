(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[56],{

/***/ 1744:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
let studio = null;

function setup (options, imports, register) {
	studio = imports;

	studio.events.on ('ready', async () => {
		if (studio.system.platform () === 'browser') {

			/*** Migrate from beta to web app, ask user to export and import his projects ***/
			if (location.hostname === 'web.wyliodrin.studio') {
				let beta = studio.settings.loadValue ('migration', 'browser.beta', false);
				if (!beta) {
					let goto = await studio.workspace.showConfirmationPrompt ('MIGRATION_BETA_TITLE', 'MIGRATION_BETA_TEXT');
					if (goto) {
						studio.settings.storeValue ('migration', 'browser.beta', true);
						studio.system.openLink ('https://beta.wyliodrin.studio');
					}
				}
			}
		}
	});

	register (null, {});
}

/***/ })

}]);