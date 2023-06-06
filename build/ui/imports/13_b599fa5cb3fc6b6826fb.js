(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
var studio = null;

function setup (options, imports, register)
{
	studio = imports;

	imports.events.on ('ready', (imports) => 
	{
		// add optional imports
		studio = imports;

		/* Register Pin Layout */
		if (studio.pin_layout)
		{
			studio.pin_layout.registerPinLayout ('wyapp', 'udooneo', 'plugins/devices/wyapp/devices/udooneo/data/img/pins-udooneo.png');
		}
		else
		{
			studio.workspace.warn ('device.wyapp.udooneo: pin_layout plugin is not available');
		}
	});

	let udooneo = {
		name: 'UDOO Neo',
		setupOptions: {
			path: '/boot/',
			link: 'https://wyliodrinstudio.readthedocs.io/en/latest/boards/udooneo.html#connecting-via-web'
		},
		priority: 20,
		/** 
		 * Device Icon 
		*/
		iconURL ()
		{
			return 'plugins/devices/wyapp/devices/udooneo/data/img/icon-udooneo.png';
		},
		/**
		 * Found a device, modify stuff (like icon)
		 * @param {Device} device 
		 */
		found (device)
		{
			device.icon = this.iconURL ();
			if (!device.description) device.description = 'UDOONeo';
			device.defaultUsername = 'udooer';
			device.defaultPassword = 'udooer';
		},

		/**
		 * Update a device, modify stuff
		 * @param {Device} device 
		 */
		update (device)
		{
			device.icon = this.iconURL ();
			if (!device.description) device.description = 'UDOONeo';
			device.defaultUsername = 'udooer';
			device.defaultPassword = 'udooer';
		},

		/**
		 * Modidify the project before run
		 * @param {Project} project - the project
		 */
		run (/*project*/)
		{
			let retVal = true;
			
			return retVal;
		},
	};

	/* Register Icon */
	studio.device_wyapp.registerBoard ('udooneo', udooneo);

	register (null, {});
}

/***/ })

}]);