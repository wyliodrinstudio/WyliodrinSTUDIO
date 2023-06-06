(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[59],{

/***/ 1748:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);


function setup (options, imports, register) {
	let serviceWorker = null;

	let system = {

		events: new events__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"](),
	
		send (tag, data)
		{
			if (serviceWorker)
			{
				serviceWorker.postMessage({
					tag,
					data
				});
			}
		},
	
		close ()
		{
			location.href = 'https://wyliodrin.studio';
		},
	
		minimize ()
		{
			
		},
	
		fullscreen ()
		{
			let isFullscreen = () => {
				return document.fullscreenElement !== null;
			};
			if (isFullscreen ())
			{
				document.exitFullscreen ();
			}
			else
			{
				document.body.requestFullscreen ();
			}
		},
		openLink (url)
		{
			window.open(url);
		},
		platform ()
		{
			return 'browser';
		}
	};

	if (navigator.serviceWorker)
	{
		navigator.serviceWorker.ready.then( registration => {
			serviceWorker = registration.active;
		});
	}
	

	register (null, { system });
}


/***/ })

}]);