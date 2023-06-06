(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[19],{

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setup; });
/* harmony import */ var _views_FlashSelectDevice_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(271);
/* harmony import */ var _devices_mp_views_EdgeOrChrome_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(279);
/* harmony import */ var _devices_mp_views_UpgradeToHttps_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(284);




let studio = null;
let serialport = null;

let flash = {
	flashers: [],
	
	/**
	 * This function registers a flasher object by updating the list of all flashers with a new flasher having its 
	 * own specifications and functions. 
	 * 
	 * Every new flasher has an *id*, its unique identifier, a *name*, which is the actual 
	 * name of the board it's used to flash, a characteristic *logo*, a *dialogVue* that has the flashing logic,
	 * a *vendorId* used to identify the vendor of the board, and *productId* used to identify the exact board.
	 * 
	 * @param {string} id - flasher id
	 * @param {string} name - boards it can flash
	 * @param {string} boardLogo - Location of the board logo
	 * @param {string} dialogVue - Location of the flasher dialog
	 * @param {string} vendorId - Vendor ID
	 * @param {string} productId - Product ID
	 * 
	 * 
	 * @example
	 * 
	 * registerFlasher('esp', 'ESP8266/32', 'plugins/flash/flash.esp/data/img/ESP.png', FlashDialog, '1a86');
	 */
	registerFlasher(id, name, boardLogo, dialogVue, vendorId, productId) {
		if(id !== null && name !== null && boardLogo !== null && dialogVue !== null && vendorId !== null) {
			this.flashers.push({
				id: id,
				name: name,
				boardLogo: boardLogo,
				dialogVue: dialogVue,
				vendorId: vendorId,
				productId: productId
			});
		} else {
			studio.workspace.warn('FLASH_NULL');
		}
	},

	/**
	 * This function returns a flasher object by its id.
	 * 
	 * @param {string} id - flasher id
	*/
	getFlasher(id) {
		if(id !== null) {
			for(let flasher of this.flashers)
				if(flasher.id == id) return flasher;
			return null;
		} else {
			studio.workspace.warn('FLASH_NULL');
			return null;
		}
	},

	/**
	 * This function returns a flasher object by its vendor ID and product ID.
	 * 
	 * @param {string} vendorId - vendor ID
	 * @param {string} productId - product ID
	*/
	getFlasherByVP(vendorId, productId) {
		if(vendorId !== null) {
			let found = [];
			for(let flasher of this.flashers)
				if(flasher.vendorId == vendorId) found.push(flasher);
			
			if(found.length == 1 && found[0].productId == null) return found[0];
			else if(found.length > 0) {
				for(let flasher of found)
					if(flasher.productId == productId) return flasher;
			}
			return null;
		} else {
			studio.workspace.warn('FLASH_NULL');
			return null;
		}
	},

	/**
	 * This function returns a flasher object by its name.
	 * 	
	 * @param {string} name - flasher name
	 */
	getFlasherByName(name) {
		if(name !== null) {
			for(let flasher of this.flashers)
				if(flasher.name == name) return flasher;
			return null;
		} else {
			studio.workspace.warn('FLASH_NULL');
			return null;
		}
	}
};

function setup (options, imports, register)
{
	studio = imports;
	serialport = imports.serialport;

	studio.workspace.registerMenuItem ('TOOLBAR_FLASH', 20, () => {
		if(serialport.isAvailable ())
			studio.workspace.showDialog(_views_FlashSelectDevice_vue__WEBPACK_IMPORTED_MODULE_0__["default"], {
				fromBurger: true,
				width:500
			});
		else {
			let chrome = !!window.chrome;
			let https = (location.protocol === 'https:');

			if(chrome == false) 
			{
				studio.workspace.showDialog (_devices_mp_views_EdgeOrChrome_vue__WEBPACK_IMPORTED_MODULE_1__["default"], {
					width: '500px'
				});
			} else if(https == false) 
			{
				studio.workspace.showDialog (_devices_mp_views_UpgradeToHttps_vue__WEBPACK_IMPORTED_MODULE_2__["default"], {
					width: '500px'
				});
			} else 
			{			
				studio.workspace.showDialog (_devices_mp_views_EdgeOrChrome_vue__WEBPACK_IMPORTED_MODULE_1__["default"], {
					width: '500px'
				});
			}
		}
	});
	
	register (null, {
		flash: flash
	});
}


/***/ })

}]);