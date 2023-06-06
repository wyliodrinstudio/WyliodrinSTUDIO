(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[55],{

/***/ 1665:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1666);
/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_2__);




let studio = null;
let events = new events__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"] ();

let id = {
	getId () {
		let newtoken = Object(uuid__WEBPACK_IMPORTED_MODULE_0__["v4"]) ();
		let token = studio.settings.loadValue ('device.wyapp.websocket', 'userid', null);
		// port token to new api
		if (token !== null) {
			studio.settings.storeValue ('device.wyapp.websocket', 'userid', null);
			studio.settings.storeValue ('id', 'token', token);
		}
		token = studio.settings.loadValue ('id', 'token', newtoken);
		if (token === newtoken) studio.settings.storeValue ('id', 'token', token);
		return token;
	},

	on (event, ...args) {
		events.on (event, ...args);
	}
};

function setup (options, imports, register) {
	studio = imports;	

	studio.workspace.registerMenuItem('ID_SET_USER_ID', 90, async () => {
		let token = id.getId();
		let settoken = await studio.workspace.showPrompt ('ID_SET_USER_ID_TITLE', 'ID_SET_USER_ID_TEXT', token);
		if (settoken && validator__WEBPACK_IMPORTED_MODULE_1___default.a.isUUID (settoken)) settoken = settoken.toLowerCase ();
		if (settoken && token !== settoken)
		{
			if (validator__WEBPACK_IMPORTED_MODULE_1___default.a.isUUID (settoken))
			{
				// eslint-disable-next-line require-atomic-updates
				token = settoken;
				studio.settings.storeValue ('id', 'token', token);
				events.emit ('id:change', token);
			}
			else
			{
				studio.workspace.showError ('ID_SET_USER_ID_NO_UUID');
			}
		}
	});

	register (null, {
		id: id
	});
}

/***/ })

}]);