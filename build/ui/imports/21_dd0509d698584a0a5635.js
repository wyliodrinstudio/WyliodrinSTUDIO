(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setup; });
/* harmony import */ var _views_FlashDialog_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(475);


let studio = null;

let flashmicrobit = {};

function setup (options, imports, register)
{
	studio = imports;

	studio.flash.registerFlasher('micro1', 'Micro:bit V1', 'plugins/flash/flash.microbit/data/img/microbit1.png', _views_FlashDialog_vue__WEBPACK_IMPORTED_MODULE_0__["default"], '0d28', ['9900', '9901']);
	studio.flash.registerFlasher('micro2', 'Micro:bit V2', 'plugins/flash/flash.microbit/data/img/microbit2.png', _views_FlashDialog_vue__WEBPACK_IMPORTED_MODULE_0__["default"], '0d28', ['9903', '9904']);

	register (null, {
		flashmicrobit
	});
}


/***/ }),

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FlashDialog_vue_vue_type_template_id_afad9c1a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(476);
/* harmony import */ var _FlashDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(478);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FlashDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FlashDialog_vue_vue_type_template_id_afad9c1a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FlashDialog_vue_vue_type_template_id_afad9c1a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/flash/flash.microbit/views/FlashDialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FlashDialog_vue_vue_type_template_id_afad9c1a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(477);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FlashDialog_vue_vue_type_template_id_afad9c1a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FlashDialog_vue_vue_type_template_id_afad9c1a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 477:
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
    [
      _c("v-card-title", [
        _c("span", { staticClass: "headline" }, [
          _vm._v(
            _vm._s(_vm.$t("FLASH_MICROBIT")) +
              " " +
              _vm._s(this.version.substr(this.version.length - 2))
          )
        ])
      ]),
      _vm._v(" "),
      _c("v-card-text", [
        _c(
          "div",
          [
            _c(
              "v-row",
              { attrs: { align: "center", justify: "center" } },
              [
                _c("p", [_vm._v(_vm._s(_vm.progress.text))]),
                _vm._v(" "),
                _c("v-progress-linear", {
                  attrs: {
                    rounded: "",
                    striped: "",
                    value: _vm.progress.value,
                    height: "15",
                    color: _vm.progress.color
                  }
                })
              ],
              1
            )
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c(
        "v-card-actions",
        [
          _c(
            "v-btn",
            {
              attrs: { disabled: !_vm.progress.started, text: "" },
              on: { click: _vm.cancel }
            },
            [_vm._v(_vm._s(_vm.$t("CANCEL")))]
          ),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              attrs: { disabled: _vm.progress.started, text: "" },
              on: { click: _vm.close }
            },
            [_vm._v(_vm._s(_vm.$t("BACK")))]
          )
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

/***/ 478:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_FlashDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(479);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_FlashDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 479:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _flash_views_FlashSelectDevice_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(271);
/* harmony import */ var _flash_views_FlashCancel_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(464);
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



const DAPjs = __webpack_require__(480);
let usb = null;

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'FlashDialog',
	props: ['device', 'version', 'fromBurger'],
	data ()
	{
		return  {
			progress: {
				value: 0,
				text: '',
				color: 'teal',
				started: false
			},
			buffer: null,
			closed: 0,
			target: null
		};
	},
	mounted () {
		usb = this.loadUSB();
		this.connect();
	},
	methods: {
		close ()
		{
			if(!this.closed) {
				this.$root.$emit ('submit');

				if(!this.device)
					this.studio.workspace.showDialog (_flash_views_FlashSelectDevice_vue__WEBPACK_IMPORTED_MODULE_0__["default"], {
						width: 500
					});

				this.closed = 1;
			}
		},
		async cancel ()
		{
			let action = await this.studio.workspace.showDialog  (_flash_views_FlashCancel_vue__WEBPACK_IMPORTED_MODULE_1__["default"], {
				width: 400
			});

			if(action) this.target.disconnect();
		},
		async readHex ()
		{
			if(this.version == 'Micro:bit V1')
				this.buffer = await this.studio.filesystem.loadDataFile('flash/flash.microbit', 'micropython/microbit-v1.0.1.hex');
			else if(this.version == 'Micro:bit V2')
				this.buffer = await this.studio.filesystem.loadDataFile('flash/flash.microbit', 'micropython/microbit-v2.0.0.hex');
		},
		async connect ()
		{
			if(!this.device) {
				this.progress.text = this.$t('FLASH_SELECT_DEVICE');
				this.progress.color = 'teal';
				this.progress.value = 0;

				try {
					const device = await navigator.usb.requestDevice({
						filters: [{vendorId: 0xD28}]
					});

					await this.flash(device);
				} 
				catch (error) {
					this.close();
				}

				this.progress.started = false;
			} else {
				let devices = null;
				
				if(this.studio.system.platform() == 'electron')
					devices = usb.getDeviceList();
				else
					devices = await navigator.usb.getDevices();

				if(this.studio.system.platform() == 'electron') {
					if(!this.fromBurger)
						devices = devices.filter(device => device.deviceDescriptor.idProduct === parseInt(this.device.properties.productId, 16) && device.deviceDescriptor.idVendor === parseInt(this.device.properties.vendorId, 16));
					else
						devices = devices.filter(device => device.deviceDescriptor.idProduct === parseInt(this.device.productId, 16) && device.deviceDescriptor.idVendor === parseInt(this.device.vendorId, 16));
				} else {
					let info = await this.device.getInfo();

					devices = devices.filter(device => device.productId === info.usbProductId && device.vendorId === info.usbVendorId);
				}

				if(devices.length != 1) {
					this.progress.text = this.$t('FLASH_DEVICE_NOT_FOUND');
					this.progress.color = 'red';
				} else {
					try {
						await this.flash(devices[0]);

					} catch (error) {
						//this.close();
					}
				}
			}

			this.progress.started = false;
		},
		async flash (device) 
		{
			this.progress.started = true;
			await this.readHex();
			
			let transport = null;

			if(!this.device || this.studio.system.platform() == 'browser')
				transport = new DAPjs.WebUSB(device);
			else
				transport = new DAPjs.USB(device);

			this.target = new DAPjs.DAPLink(transport);

			this.target.on(DAPjs.DAPLink.EVENT_PROGRESS, progress => {
				this.progress.text = `${this.$t('FLASH_WRITING_PROGRESS')} ${Math.floor(progress * 100)}%`;
				this.progress.value = progress * 100;
			});

			try {
				await this.target.connect();
				await this.target.flash(this.buffer.buffer);

				this.progress.text = this.$t('FLASH_DISCONNECTING_TEXT');
				await this.target.disconnect();

				this.progress.text = this.$t('FLASH_COMPLETE_TEXT');
			}
			catch (error) {
				this.progress.text = error;
				this.progress.color = 'red';
			}
		},
		loadUSB ()
		{
			try
			{
				// written like this to work with webpack when target is browser
				return eval ('require(\'usb\')');
			}
			catch (e)
			{	
				this.studio.workspace.error ('usb: usb is not available '+e.message);
				return null;
			}
		}
	}
});


/***/ })

}]);