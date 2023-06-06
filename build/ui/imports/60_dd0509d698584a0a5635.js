(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[60],{

/***/ 1749:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setup; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(219);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

const semverCmp = __webpack_require__(1750);

async function getServerVersion () {
	try
	{
		let response = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.get ('/api/v1/version');
		if (response.data.err === 0)
		{
			return response.data.version;
		}
	}
	catch (e)
	{
		// version request failed
	}
	return undefined;
}

function setup (options, imports, register) {
	let studio = imports;

	let ready = false;
	let shouldAsk = false;

	const update = () => {
		studio.system.send ('update');
		// TODO this should be done in a better way
		if (studio.system.platform () === 'browser') {
			setTimeout (() => location.reload(), 1000);
		}
	};

	const askForUpdate = async () => {
		let res = await studio.workspace.showConfirmationPrompt ('UPDATE_TITLE', 'UPDATE_MESSAGE');
		if (res) {
			update ();
		}
	};

	studio.system.events.on ('update-ask', () => {
		shouldAsk = true;
		if (ready) askForUpdate ();
	});

	studio.events.on ('ready', async () => {
		ready = true;
		if (studio.system.platform () === 'browser') {
		
			let serverVersion = await getServerVersion ();
			if (serverVersion && semverCmp (studio.workspace.version, '<', serverVersion)) {
				shouldAsk = true;
				askForUpdate ();
			}
		}
		else
		{
			if (shouldAsk) askForUpdate ();
		}
	});

	studio.workspace.registerToolbarButton ('UPDATE', 100, () => {
		update ();
	}, 'plugins/studio/update/data/img/icons/update.svg', {
		visible: () => shouldAsk
	});

	register (null, {
		update: {}
	});
}

/***/ })

}]);