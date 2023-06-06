(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ 265:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var _views_MicroPythonConnectionDialog_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(266);
/* harmony import */ var _views_EdgeOrChrome_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(279);
/* harmony import */ var _views_UpgradeToHttps_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(284);
/* harmony import */ var _views_MPFileManager_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(289);
/* harmony import */ var _mpy_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(301);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);







let studio = null;
let workspace = null;
let devices = [];
let serialport = null;

let serialDevices = [];


let connections = {};
let ports = {};


function updateDevice (device)
{
	// deviceEvents.emit ('update:'+device.id, device);
	workspace.updateDevice (device);
}

// function loadSerialPort ()
// {
//         try
//         {
//                 return eval ('require(\'serialport\')');
//         }
//         catch (e)
//         {

//                 studio.workspace.error ('device_mp: mp is not available '+e.message);
//                 return {
//                         list: function ()
//                         {
//                                 return [
//                                 ];
//                         }
//                 };
//         }
// }


async function listSerialPorts()
{
	let ports = [];
	try
	{
		ports = await serialport.list ();
	}
	catch (e)
	{
		studio.workspace.error ('device_mp: failed to list mp '+e.message);
	}
	return ports;
}



// function listPorts() {
//         SerialPort.list().then(
//          ports => {
//           ports.forEach(port => {
//            console.log(`${port.comName}\t${port.pnpId || ''}\t${port.manufacturer || ''}`)
//           })
//          },
//          err => {
//           console.error('Error listing ports', err)
//          }
//         )
//        }

        

function searchSerialDevices(){

	/*setInterval(*/ async function search(){
		let serial_devices =  await listSerialPorts();
		devices = [];

		for(let serialDevice of serial_devices)
		{
			if(serialDevice.vendorId || serialDevice.productId || serialDevice.manufacturer)
			{
				let description = '';
				let id = 'mp:serial:' + serialDevice.path;//.toString().toLowerCase();
				devices.push({
					id: id,
					address: serialDevice.path,
					description,
					name: serialDevice.manufacturer || serialDevice.path,
					connection:'serial',
					icon:'plugins/devices/mp/data/img/icons/mp.png',
					board:'any',
					// python: 'autodetect', TODO estimate based on productId, vendorId and manufacturer
					status:'',
					properties: {
						productId: serialDevice.productId,
						vendorId: serialDevice.vendorId,
						locationId: serialDevice.locationId,
						serialNumber: serialDevice.serialNumber,
						pnpId: serialDevice.pnpId,
					},
					priority: workspace.DEVICE_PRIORITY_HIGH

				});
			}
		}

                        

		serialDevices = devices;

                        
		updateDevices();
		setTimeout(search, 10000);                       
                        
	}
	//},3000);
	search();
	//console.log(serialDevices);
     
                        

        
}

function pythonIcon (variant) {
	let icon = 'plugins/devices/mp/data/img/icons/mp.png';
	if (variant === 'circuitpython') icon = 'plugins/devices/mp/data/img/icons/circuitpython.png';
	return icon;
}


function updateDevices(){
	let add = [];
	if (serialDevices.length === 0 && devices.length === 0) {
		add.push({
			id: 'mp:newdevice',
			address: 'WebSerial',
			name: 'MicroPython',
			board: 'any',
			priority: workspace.DEVICE_PRIORITY_PLACEHOLDER,
			placeholder: true
		});
	}
        
	if(studio.system.platform() === 'browser')
		workspace.updateDevices([...devices, ...serialDevices, ...add]);
	else
		workspace.updateDevices([...serialDevices]);
}

function setup (options, imports, register)
{
	studio = imports;
	serialport = imports.serialport;
	searchSerialDevices();
	//SerialPortlist = loadSerialPort();
	///let event = 'data';
	studio.shell.register((event,id,data)=>
	{
		if (event === 'data')
		{
			if(ports[id])
			{
				ports[id].write(Buffer.from(data+''));
			}
		}
	});

	studio.console.register ((event, id, data) =>
	{
		if (event === 'data')
		{
			if(ports[id])
			{
				ports[id].write(Buffer.from(data+''));
			}
		}
	});

	studio.notebook.register ((event, ...data) =>
	{
		let device = studio.workspace.getDevice ();
		if(device.type === 'mp' && device.status === 'CONNECTED' && ports[device.id])
		{
			let mp = new _mpy_js__WEBPACK_IMPORTED_MODULE_4__["MicroPython"](ports[device.id]); //ports[device.id] = new MP
			if (event === 'run')
			{
				let commands = (data[1]+'\n\n').replace(/\r?\n/g, '\r\n');
				mp.enterRawRepl();
				mp.writeRawRepl(commands);
				studio.notebook.setStatus (null, 'RUNNING');
			}
			else if(event === 'stop')
			{
				mp.stop();
				studio.notebook.setStatus (null, 'READY');
			}
			else if (event === 'reset')
			{
				// "PRESS THE RESET BUTTON ON THE BOARD"
			}
		}
	});
        
	let device_mp = {
		defaultIcon() {
			return 'plugins/devices/mp/data/img/icons/mp.png';
		},

		getBoardIcon () {
			return this.defaultIcon ();
		},

		registerForUpdate (/*device, fn*/)
		{
			//deviceEvents.on ('update:'+device.id, fn);
			return null;//() => deviceEvents.removeListener ('update:'+device.id, fn);
		},

		getConnections ()
		{
			let connections = [];
			for (let deviceId in connections)
			{
				connections.push (connections[deviceId].device);
			}
			return null;//connections;
		},

		async connect(device/*, options*/)
		{
			if(serialport.isAvailable ())
			{
				if(lodash__WEBPACK_IMPORTED_MODULE_5___default.a.isObject(device))
				{

					let port = new serialport.SerialPort();
					if (await port.start ())
					{
						let options = await studio.workspace.showDialog (_views_MicroPythonConnectionDialog_vue__WEBPACK_IMPORTED_MODULE_0__["default"], {
							device: device,
							webSerial: port,
							electron: studio.system.platform () === 'electron',
							width: '500px'
						});
						if (options) 
						{
							let mp = new _mpy_js__WEBPACK_IMPORTED_MODULE_4__["MicroPython"](port);

							device.status = 'CONNECTING';
							device.icon = pythonIcon (options.python);
							updateDevices();

							mp.connect (options);

							

							
							ports[device.id]=mp;

							mp.on('connected',()=>{
								device.status = 'CONNECTED';
								device.running = false;
								updateDevice(device);
								studio.shell.select(device.id);
								studio.notebook.setStatus (null, 'READY');

								studio.console.select (device.id);

								studio.console.reset();
								studio.console.show ();
															
							});

							mp.on('board', (board)=>{
								device.name = board.name;
								device.python = board.python;
								device.version = board.python;
								device.address = device.address+' ('+board.python+'@'+board.version+')';
								device.icon = pythonIcon (device.python);
								updateDevice (device);
							});

							mp.on('status', (status)=>{
								if (status === _mpy_js__WEBPACK_IMPORTED_MODULE_4__["STATUS_RUNNING"]) {
									device.running = true;
									updateDevice (device);
								}
								else
								if (status === _mpy_js__WEBPACK_IMPORTED_MODULE_4__["STATUS_STOPPED"]) {
									device.running = false;
									updateDevice (device);
								}
							});

							mp.on('data', (data)=>
							{
								studio.shell.write(device.id, Buffer.from(data).toString());
								studio.console.write(device.id, Buffer.from(data).toString());
							});

							mp.on('error',(err) => {

								device.status = 'DISCONNECTED';
								updateDevice(device);
								studio.workspace.showError ('ERROR', {extra: err.message});
								delete connections[device.id];
								delete ports[device.id];                
								//studio.workspace.showError ('MP_SERIAL_CONNECTON_ERROR', {extra: err.message});
							});
															
															

							ports[device.id].on('close',() => {
																					
								device.status = 'DISCONNECTED';
								workspace.updateDevice(device);
								studio.console.close();
								delete connections[device.id];
								delete ports[device.id];
							});                                                        
						}
					}                                                  
				}
			}
			else
			{	
				let chrome = !!window.chrome;
				let https = (location.protocol === 'https:');

				if(chrome == false) 
				{
					await studio.workspace.showDialog (_views_EdgeOrChrome_vue__WEBPACK_IMPORTED_MODULE_1__["default"], {
						width: '500px'
					});
				} else if(https == false) 
				{
					await studio.workspace.showDialog (_views_UpgradeToHttps_vue__WEBPACK_IMPORTED_MODULE_2__["default"], {
						width: '500px'
					});
				} else 
				{			
					await studio.workspace.showDialog (_views_EdgeOrChrome_vue__WEBPACK_IMPORTED_MODULE_1__["default"], {
						width: '500px'
					});
				}
			}

			setTimeout(() => {
				device.status = 'CONNECTED';
			}, 1000);
			return device;
                        
		},

                


		disconnect(device, /*options*/)
		{
			/* Here goes the actual code that you will write in order to connect the device. */

			let mp = ports[device.id];
                        
			if (studio.system.platform () === 'electron')
			{
				//ELECTRON

				if(lodash__WEBPACK_IMPORTED_MODULE_5___default.a.isObject(device))
				{
					if(device)
					{
						mp.close();
					}
					device.status = 'DISCONNECTED';
					updateDevice(device);
					studio.console.reset();
                                       
                                                                
					delete connections[device.id];
				}
                                
			}
			else
			{
				//BROWSER
				if(device)
				{
					//ports[device.id].close();
					mp.close();
				}
				device.status = 'DISCONNECTED';
				updateDevice(device);
				studio.console.reset();                     
				//delete connections[device.id];
				delete connections[mp.getPort()];
			}
                        
			setTimeout(() => {
				device.status = 'DISCONNECTED';
			}, 1000);
		}

        
	};

	workspace = studio.workspace.registerDeviceDriver('mp', device_mp);
                
	if(workspace){
		workspace.registerDeviceToolButton('DEVICE_MP_RUN', 10, async () => {
			let device = studio.workspace.getDevice();
                
			/* Here goes the actual code that will make your device run a project */

			let project = await studio.projects.getCurrentProject();

			if (project) {
				let pySource;
				if (project.language === 'python' || project.language === 'visual') {
					let runFilename = await studio.projects.getDefaultRunFileName(project);
					pySource = await studio.projects.loadFile(project, runFilename);
					let mp = ports[device.id];
					studio.console.reset ();
					if (await mp.enterRawRepl())
					{
						device.running = true;
						updateDevice (device);
						if (!await mp.run (pySource)) {
							// device.running = false;
							// updateDevice (device);
							// TODO show error
						}
					}
					else 
					{
						// TODO show error
					}
				}

			}

		}, 'plugins/devices/mp/data/img/icons/run-icon.svg',

                
		/* The aditional options that make the Run Button visible and enabled only if there is a connected device
                        and its type is "awesome" */
		{
			visible () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.type === 'mp' && device.running === false);
			},
			enabled () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.type === 'mp' && device.running === false);
			},
			type: 'run'
		});

                

		workspace.registerDeviceToolButton('DEVICE_MP_STOP', 10, async () => {
			let device = studio.workspace.getDevice();
        
			let mp = ports[device.id];
			await mp.stop();
			device.running = false;
			updateDevice (device);
        
		}, 'plugins/devices/mp/data/img/icons/stop-icon.svg',
        
                        
		/* The aditional options that make the Run Button visible and enabled only if there is a connected device
                        and its type is "awesome" */
		{
			visible () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.type === 'mp' && device.running === true);
			},
			enabled () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.type === 'mp' && device.running === true);
			},
			type: 'stop'
		});
                        
                        

		//RESTART


		workspace.registerDeviceToolButton('DEVICE_MP_RESTART', 10, async () => {
			let device = studio.workspace.getDevice();
        
			if (device && ports[device.id])
			{
				let mp = ports[device.id];
				await mp.reset();
			}
        
		}, 'plugins/devices/mp/data/img/icons/restart-icon.svg',
        
                        
		/* The aditional options that make the Run Button visible and enabled only if there is a connected device
                        and its type is "awesome" */
		{
			visible () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.type === 'mp');
			},
			enabled () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.type === 'mp');
			},
			type: 'stop'
		});        


		// FILES
                
		workspace.registerDeviceToolButton('DEVICE_MP_FILES', 10, async () => {
			let device = studio.workspace.getDevice();

			// let project = await studio.projects.getCurrentProject();

                        
			// let mp = await ports[device.id];
			// console.log (await mp.listdir ('/'));
			let mp = ports[device.id];

			await studio.workspace.showDialog (_views_MPFileManager_vue__WEBPACK_IMPORTED_MODULE_3__["default"], {
				width: 800,
				mp : mp
			});


		}, 'plugins/devices/mp/data/img/icons/fileexplorer-icon.svg',

                
		/* The aditional options that make the Run Button visible and enabled only if there is a connected device
		                and its type is "awesome" */
		{
			enabled () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.type === 'mp' && device.running === false);
			},
		});

		// DEPLOY
		
		workspace.registerDeviceToolButton('DEVICE_MP_DEPLOY', 10, async () => {
			let device = studio.workspace.getDevice();
                
			let mp = ports[device.id];
			let project = await studio.projects.getCurrentProject();
			let name = project.name;
			await mp.mkdir(name);
			if(project)
			{
				if (project.language === 'python') {
					let structure = await studio.projects.generateStructure(project);
					let childrens = structure.children;
					for(let i = 2 ; i < childrens.length ; i++)
					{
						let cod = await studio.projects.getFileCode(project, childrens[i].name);
						await mp.put(name+'/'+childrens[i].name , cod);
					}

				}
			}


		}, 'plugins/devices/mp/data/img/icons/deploy.png',

                
		/* The aditional options that make the Run Button visible and enabled only if there is a connected device
		                and its type is "awesome" */
		{
			enabled () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.type === 'mp' && device.running === false);
			},
		});	

		if (studio.system.platform () === 'electron')
		{
			//ELECTRON

			//searchSerialDevices();
		}
		else
		{
			//BROWSER

			devices = [
				{
					id: 'mp:web',
					address: 'WebSerial',
					name: 'MicroPython',
					board: 'any',
					connection: 'web-usb',
					priority: workspace.DEVICE_PRIORITY_PLACEHOLDER,
					placeholder: true,
				}
			];
			updateDevices();

		}

		register(null, {
			device_mp
		});
   
                
	}
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(214).Buffer))

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MicroPythonConnectionDialog_vue_vue_type_template_id_1d0bdb50___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(267);
/* harmony import */ var _MicroPythonConnectionDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(269);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MicroPythonConnectionDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MicroPythonConnectionDialog_vue_vue_type_template_id_1d0bdb50___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MicroPythonConnectionDialog_vue_vue_type_template_id_1d0bdb50___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/devices/mp/views/MicroPythonConnectionDialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MicroPythonConnectionDialog_vue_vue_type_template_id_1d0bdb50___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(268);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MicroPythonConnectionDialog_vue_vue_type_template_id_1d0bdb50___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MicroPythonConnectionDialog_vue_vue_type_template_id_1d0bdb50___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 268:
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
          _vm._v(_vm._s(_vm.$t("DEVICE_MP_SERIAL_OPTIONS")))
        ])
      ]),
      _vm._v(" "),
      _c(
        "v-card-text",
        [
          _c(
            "v-layout",
            { attrs: { wrap: "" } },
            [
              _c("v-text-field", {
                staticClass: "col-md-12",
                attrs: { label: _vm.$t("DEVICE_MP_SERIAL_PORT"), required: "" },
                model: {
                  value: _vm.port,
                  callback: function($$v) {
                    _vm.port = $$v
                  },
                  expression: "port"
                }
              }),
              _vm._v(" "),
              _c("v-text-field", {
                staticClass: "col-md-6",
                attrs: {
                  label: _vm.$t("DEVICE_MP_SERIAL_BAUDRATE"),
                  required: "",
                  autofocus: ""
                },
                model: {
                  value: _vm.baudrate,
                  callback: function($$v) {
                    _vm.baudrate = $$v
                  },
                  expression: "baudrate"
                }
              }),
              _vm._v(" "),
              _c("v-select", {
                staticClass: "dropdown col-md-6",
                attrs: {
                  label: _vm.$t("DEVICE_MP_VARIANT"),
                  items: _vm.items,
                  "item-text": "title",
                  "item-value": "value",
                  "hide-details": ""
                },
                model: {
                  value: _vm.python,
                  callback: function($$v) {
                    _vm.python = $$v
                  },
                  expression: "python"
                }
              }),
              _vm._v(" "),
              _c(
                "div",
                [
                  _c("v-switch", {
                    attrs: { label: _vm.$t("DEVICE_MP_RESET_AFTER_CONNECT") },
                    model: {
                      value: _vm.reset,
                      callback: function($$v) {
                        _vm.reset = $$v
                      },
                      expression: "reset"
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-card-actions",
        [
          _c("v-btn", { attrs: { text: "" }, on: { click: _vm.flash } }, [
            _vm._v(_vm._s(_vm.$t("DEVICE_MP_FLASH")))
          ]),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c("v-btn", { attrs: { text: "" }, on: { click: _vm.connect } }, [
            _vm._v(_vm._s(_vm.$t("DEVICE_MP_CONNECT")))
          ]),
          _vm._v(" "),
          _c("v-btn", { attrs: { text: "" }, on: { click: _vm.close } }, [
            _vm._v(_vm._s(_vm.$t("DEVICE_MP_EXIT")))
          ])
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

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_MicroPythonConnectionDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(270);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_MicroPythonConnectionDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _flash_flash_views_FlashSelectDevice_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(271);
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
//
//
//
//
//



let defaults = {};

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'MicroPythonConnectionDialog',
	props: ['device', 'electron', 'webSerial'],
	data ()
	{
		let defvalue = defaults[this.device.address];
		return {
			baudrate: this.device.baudrate || ((defvalue && defvalue.baudrate)?defvalue.baudrate:115200),
			port: this.device.address,
			items: [
				{ 
					title: this.$t('DEVICE_MP_AUTODETECT'),
					value: 'autodetect'
				},
				{ 
					title: 'MicroPython',
					value: 'micropython'
				},
				{ 
					title: 'CircuitPython',
					value: 'circuitpython'
				},
			],
			python: this.device.python || ((defvalue && defvalue.python)?defvalue.python:'autodetect'),
			reset: this.device.reset || ((defvalue && defvalue.reset)?defvalue.reset:115200),
		};
	},
	methods: {
		enter() {
			this.connect();
		}, 
		esc() {
			this.close();
		}, 
		connect ()
		{
			if (this.port.length > 0)
			{
				this.$root.$emit ('submit', {
					baudrate: this.baudrate,
					port: this.port,
					python: this.python,
					reset: this.reset
				});
				defaults[this.port] = {
					baudrate: this.baudrate,
					python: this.python,
					reset: this.reset
				};
			}
		},
		close ()
		{
			this.$root.$emit('submit');
		},
		async flash()
		{
			if(this.electron) {
				let neededFlasher = this.studio.flash.getFlasherByVP(this.device.properties.vendorId.toLowerCase(), this.device.properties.productId.toLowerCase());

				if(neededFlasher == null)
					this.studio.workspace.showDialog (_flash_flash_views_FlashSelectDevice_vue__WEBPACK_IMPORTED_MODULE_0__["default"], {
						device: this.device,
						width: 500
					});
				else
					this.studio.workspace.showDialog(neededFlasher.dialogVue, {
						device: this.device,
						width: 500
					});
			} else {
				let portConnect = this.webSerial.getPort();
				let info = await portConnect.getInfo();
				let neededFlasher = this.studio.flash.getFlasherByVP(info.usbVendorId.toString(16).toLowerCase(), info.usbProductId.toString(16).toLowerCase());

				if(neededFlasher == null)
					this.studio.workspace.showDialog (_flash_flash_views_FlashSelectDevice_vue__WEBPACK_IMPORTED_MODULE_0__["default"], {
						device: portConnect,
						width: 500
					});
				else
					this.studio.workspace.showDialog(neededFlasher.dialogVue, {
						device: portConnect,
						width: 500
					});
			}
		}
	}
});


/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MPFileManager_vue_vue_type_template_id_3f9d1d90_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(290);
/* harmony import */ var _MPFileManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(292);
/* empty/unused harmony star reexport *//* harmony import */ var _MPFileManager_vue_vue_type_style_index_0_id_3f9d1d90_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(295);
/* harmony import */ var _MPFileManager_vue_vue_type_style_index_1_id_3f9d1d90_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(298);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(54);







/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _MPFileManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MPFileManager_vue_vue_type_template_id_3f9d1d90_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MPFileManager_vue_vue_type_template_id_3f9d1d90_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "3f9d1d90",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/devices/mp/views/MPFileManager.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MPFileManager_vue_vue_type_template_id_3f9d1d90_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(291);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MPFileManager_vue_vue_type_template_id_3f9d1d90_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MPFileManager_vue_vue_type_template_id_3f9d1d90_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 291:
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
    { staticClass: "manager-box" },
    [
      _c(
        "v-card-title",
        [
          _vm.menuItem === null
            ? _c("span", { staticClass: "headline" }, [
                _vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_NO_DIRECTORY")))
              ])
            : _c("span", { staticClass: "headline" }, [
                _vm._v(_vm._s(_vm.menuItem.path))
              ]),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-tooltip",
            {
              attrs: { bottom: "" },
              scopedSlots: _vm._u([
                {
                  key: "activator",
                  fn: function(data) {
                    return [
                      _c(
                        "v-btn",
                        {
                          staticClass: "title-icon-btn",
                          attrs: { text: "", "aria-label": "Refresh" }
                        },
                        [
                          _c("v-img", {
                            attrs: {
                              contain: "",
                              src:
                                "plugins/devices/wyapp/plugin/data/img/icons/refresh-icon.svg"
                            }
                          })
                        ],
                        1
                      )
                    ]
                  }
                }
              ])
            },
            [
              _vm._v(" "),
              _c("span", [_vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_REFRESH")))])
            ]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("v-card-text", { staticStyle: { height: "100%" } }, [
        _c("div", { staticClass: "filemanager" }, [
          _c(
            "div",
            { staticClass: "tree-left" },
            [
              _c("v-treeview", {
                staticStyle: { width: "fit-content" },
                attrs: {
                  dense: "",
                  items: _vm.items,
                  "load-children": _vm.fetchContent,
                  open: _vm.open,
                  "open-on-click": "",
                  "item-key": "key"
                },
                on: {
                  "update:open": function($event) {
                    _vm.open = $event
                  }
                },
                scopedSlots: _vm._u([
                  {
                    key: "label",
                    fn: function(ref) {
                      var item = ref.item
                      var open = ref.open
                      return [
                        item.name === "DEVICE_WYAPP_FILESYSTEM"
                          ? _c("div", [
                              item.file === undefined && open
                                ? _c(
                                    "p",
                                    {
                                      staticStyle: { width: "100%" },
                                      attrs: { text: "" },
                                      on: {
                                        click: function($event) {
                                          ;(_vm.menuItem = item),
                                            (_vm.fileItem = item)
                                        },
                                        contextmenu: function($event) {
                                          ;(_vm.fileItem = item),
                                            _vm.showFolder($event)
                                        }
                                      }
                                    },
                                    [
                                      _c("v-icon", [_vm._v("mdi-folder-open")]),
                                      _vm._v(
                                        _vm._s(_vm.$t(item.name)) +
                                          "          \n\t\t\t\t\t\t\t"
                                      )
                                    ],
                                    1
                                  )
                                : item.file === undefined
                                ? _c(
                                    "p",
                                    {
                                      staticStyle: { width: "100%" },
                                      attrs: { text: "" },
                                      on: {
                                        click: function($event) {
                                          ;(_vm.menuItem = item),
                                            (_vm.fileItem = item)
                                        },
                                        contextmenu: function($event) {
                                          ;(_vm.fileItem = item),
                                            _vm.showFolder($event)
                                        }
                                      }
                                    },
                                    [
                                      _c("v-icon", [_vm._v("mdi-folder")]),
                                      _vm._v(
                                        _vm._s(_vm.$t(item.name)) +
                                          "\n\t\t\t\t\t\t\t"
                                      )
                                    ],
                                    1
                                  )
                                : _c(
                                    "p",
                                    {
                                      staticStyle: { width: "100%" },
                                      attrs: { text: "" },
                                      on: {
                                        click: function($event) {
                                          _vm.fileItem = item
                                        },
                                        contextmenu: function($event) {
                                          ;(_vm.fileItem = item),
                                            _vm.showFile($event)
                                        }
                                      }
                                    },
                                    [
                                      _c("v-icon", [_vm._v("mdi-file")]),
                                      _vm._v(
                                        _vm._s(item.name) + "\n\t\t\t\t\t\t\t"
                                      )
                                    ],
                                    1
                                  )
                            ])
                          : _c("div", [
                              item.file === undefined && open
                                ? _c(
                                    "p",
                                    {
                                      staticStyle: { width: "100%" },
                                      attrs: { text: "" },
                                      on: {
                                        click: function($event) {
                                          ;(_vm.menuItem = item),
                                            (_vm.fileItem = item)
                                        },
                                        contextmenu: function($event) {
                                          ;(_vm.fileItem = item),
                                            _vm.showFolder($event)
                                        }
                                      }
                                    },
                                    [
                                      _c("v-icon", [_vm._v("mdi-folder-open")]),
                                      _vm._v(
                                        _vm._s(item.name) +
                                          "          \n\t\t\t\t\t\t\t"
                                      )
                                    ],
                                    1
                                  )
                                : item.file === undefined
                                ? _c(
                                    "p",
                                    {
                                      staticStyle: { width: "100%" },
                                      attrs: { text: "" },
                                      on: {
                                        click: function($event) {
                                          ;(_vm.menuItem = item),
                                            (_vm.fileItem = item)
                                        },
                                        contextmenu: function($event) {
                                          ;(_vm.fileItem = item),
                                            _vm.showFolder($event)
                                        }
                                      }
                                    },
                                    [
                                      _c("v-icon", [_vm._v("mdi-folder")]),
                                      _vm._v(
                                        _vm._s(item.name) + "\n\t\t\t\t\t\t\t"
                                      )
                                    ],
                                    1
                                  )
                                : _c(
                                    "p",
                                    {
                                      staticStyle: { width: "100%" },
                                      attrs: { text: "" },
                                      on: {
                                        click: function($event) {
                                          _vm.fileItem = item
                                        },
                                        contextmenu: function($event) {
                                          ;(_vm.fileItem = item),
                                            _vm.showFile($event)
                                        }
                                      }
                                    },
                                    [
                                      _c("v-icon", [_vm._v("mdi-file")]),
                                      _vm._v(
                                        _vm._s(item.name) + "\n\t\t\t\t\t\t\t"
                                      )
                                    ],
                                    1
                                  )
                            ])
                      ]
                    }
                  }
                ]),
                model: {
                  value: _vm.tree,
                  callback: function($$v) {
                    _vm.tree = $$v
                  },
                  expression: "tree"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "project-box-1" },
            [
              _c(
                "v-list",
                [
                  _vm.menuItem !== null
                    ? _c(
                        "v-list-item-group",
                        {
                          attrs: { color: "primary" },
                          model: {
                            value: _vm.item,
                            callback: function($$v) {
                              _vm.item = $$v
                            },
                            expression: "item"
                          }
                        },
                        _vm._l(_vm.menuItem.children, function(item) {
                          return _c(
                            "v-list-item",
                            { key: item.key },
                            [
                              _c("v-list-item-icon", [
                                item.file !== undefined
                                  ? _c(
                                      "p",
                                      {
                                        on: {
                                          click: function($event) {
                                            _vm.fileItem = item
                                          },
                                          contextmenu: function($event) {
                                            ;(_vm.fileItem = item),
                                              _vm.showFile($event)
                                          }
                                        }
                                      },
                                      [_c("v-icon", [_vm._v("mdi-file")])],
                                      1
                                    )
                                  : item.name
                                  ? _c(
                                      "p",
                                      {
                                        attrs: { text: "" },
                                        on: {
                                          click: function($event) {
                                            _vm.menuItem = item
                                          },
                                          contextmenu: function($event) {
                                            ;(_vm.fileItem = item),
                                              _vm.showFolder($event)
                                          }
                                        }
                                      },
                                      [_c("v-icon", [_vm._v("mdi-folder")])],
                                      1
                                    )
                                  : _vm._e()
                              ]),
                              _vm._v(" "),
                              _c(
                                "v-list-item-content",
                                [
                                  item.file !== undefined
                                    ? _c("v-list-item-title", {
                                        domProps: {
                                          textContent: _vm._s(item.name)
                                        },
                                        on: {
                                          click: function($event) {
                                            _vm.fileItem = item
                                          },
                                          contextmenu: function($event) {
                                            ;(_vm.fileItem = item),
                                              _vm.showFile($event)
                                          }
                                        }
                                      })
                                    : item.name
                                    ? _c("v-list-item-title", {
                                        attrs: { text: "" },
                                        domProps: {
                                          textContent: _vm._s(item.name)
                                        },
                                        on: {
                                          click: function($event) {
                                            ;(_vm.menuItem = item),
                                              _vm.fetchContent(item)
                                          },
                                          contextmenu: function($event) {
                                            ;(_vm.fileItem = item),
                                              _vm.showFolder($event)
                                          }
                                        }
                                      })
                                    : _vm._e()
                                ],
                                1
                              )
                            ],
                            1
                          )
                        }),
                        1
                      )
                    : _vm._e()
                ],
                1
              )
            ],
            1
          )
        ])
      ]),
      _vm._v(" "),
      _c(
        "v-card-actions",
        [
          _vm.fileItem !== null
            ? _c("span", [_vm._v(_vm._s(_vm.fileItem.name))])
            : _vm._e(),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _vm.fileItem !== null &&
          _vm.fileItem.children !== undefined &&
          _vm.fileItem.name !== _vm.$t("DEVICE_WYAPP_FILESYSTEM")
            ? _c(
                "v-btn",
                {
                  staticClass: "fileexplorer-actions",
                  attrs: { text: "" },
                  on: { click: _vm.deleteObject }
                },
                [
                  _vm._v(
                    "\n\t\t\t" +
                      _vm._s(_vm.$t("PROJECT_DELETE_FOLDER")) +
                      "\n\t\t"
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.fileItem !== null &&
          _vm.fileItem.children !== undefined &&
          _vm.fileItem.name !== _vm.$t("DEVICE_WYAPP_FILESYSTEM")
            ? _c(
                "v-btn",
                {
                  staticClass: "fileexplorer-actions",
                  attrs: { text: "" },
                  on: { click: _vm.rename }
                },
                [
                  _vm._v(
                    "\n\t\t\t" +
                      _vm._s(_vm.$t("PROJECT_RENAME_FOLDER")) +
                      "\n\t\t"
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.fileItem !== null && _vm.fileItem.children !== undefined
            ? _c(
                "v-btn",
                {
                  staticClass: "fileexplorer-actions",
                  attrs: { text: "" },
                  on: { click: _vm.newFolder }
                },
                [
                  _vm._v(
                    "\n\t\t\t" + _vm._s(_vm.$t("PROJECT_NEW_FOLDER")) + "\n\t\t"
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.fileItem !== null &&
          _vm.fileItem.children !== undefined &&
          _vm.fileItem.name !== _vm.$t("DEVICE_WYAPP_FILESYSTEM")
            ? _c(
                "v-btn",
                {
                  staticClass: "fileexplorer-actions",
                  attrs: { text: "" },
                  on: { click: _vm.upload }
                },
                [
                  _vm._v(
                    "\n\t\t\t" +
                      _vm._s(_vm.$t("PROJECT_IMPORT_FILE")) +
                      "\n\t\t"
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.fileItem !== null && _vm.fileItem.file !== undefined
            ? _c(
                "v-btn",
                {
                  staticClass: "fileexplorer-actions",
                  attrs: { text: "" },
                  on: { click: _vm.deleteObject }
                },
                [
                  _vm._v(
                    "\n\t\t\t" +
                      _vm._s(_vm.$t("PROJECT_DELETE_FILE")) +
                      "\n\t\t"
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.fileItem !== null && _vm.fileItem.file !== undefined
            ? _c(
                "v-btn",
                {
                  staticClass: "fileexplorer-actions",
                  attrs: { text: "" },
                  on: { click: _vm.rename }
                },
                [
                  _vm._v(
                    "\n\t\t\t" +
                      _vm._s(_vm.$t("PROJECT_RENAME_FILE")) +
                      "\n\t\t"
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.fileItem !== null && _vm.fileItem.file !== undefined
            ? _c(
                "v-btn",
                {
                  staticClass: "fileexplorer-actions",
                  attrs: { text: "" },
                  on: { click: _vm.download }
                },
                [
                  _vm._v(
                    "\n\t\t\t" +
                      _vm._s(_vm.$t("PROJECT_EXPORT_FILE")) +
                      "\n\t\t"
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _c("v-btn", { attrs: { text: "" }, on: { click: _vm.close } }, [
            _vm._v(_vm._s(_vm.$t("CLOSE")))
          ])
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

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_MPFileManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(293);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_MPFileManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(294);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
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

const mapGetters = __webpack_require__ (39).mapGetters;

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'FileManager',
	props: ['mp'],
	data () {
		return {
			open: ['public'],
			tree: [],
			items: [{
				name:'DEVICE_WYAPP_FILESYSTEM',
				children:[],
				path:'/',
				size:0,
				key:'/',
			}],
			switch1:false,
			fileMenu: false,
			folderMenu:false,
			fileItem:null,
			menuItem:null,
			newData:null,
			cwdArray:[],
			resolve:null,
			cwd:'/',
			x: 0,
			y: 0,
			item:1,
		};
	},
	computed: {
		...mapGetters ({
			device: 'link/device'//,
			//connection: 'link/connection'
		}),
	},
	watch: {
		async newData(){
			// PROBLEMA this.fileItem = null
			await this.updateFileTree(this.newData,this.fileItem);
		},
		// fileItem() {
		// 	console.log(this.fileItem);
		// }

	},
	async created () {
		
	},
	mounted() {
		this.items[0].name = this.$t(this.items[0].name);
	},
	async destroyed ()
	{
		
	},
	methods: {
		async list(cwd){
			try{
				await this.mp.listdir(cwd);
			}
			catch(e)
			{
				this.studio.workspace.showError('ListError',{extra:e.message});
			}
			

		},
		async saveFileDialog(data){
			let newData1 = Buffer.from(data);
			await this.studio.projects.downloadFile(this.fileItem.name,newData1);
		},
		async download() {
			//downlaod in fereastra glisanta
			//max 3000 biti ~= 32kb MAXKPACKET
			//
			// this.connection.send('fe', {
			// 	a:'down',
			// 	b:this.cwd,
			// 	c:this.fileItem.name,
			// 	z:0,
			// 	size:this.fileItem.size
			// });
			try{
				let d = await this.mp.get(this.cwd+this.fileItem.name);
				this.saveFileDialog(d);
			}
			catch(e)
			{
				this.studio.workspace.showError('GetError',{extra:e.message});
			}

		},
		//TODO de rezolvat put din mpy
		async upload(){
			let files = await this.studio.filesystem.openImportDialog({
				title:'Import',
				filetypes:[]
			});
			if (files.length > 0)
			{
				// use first file
				let fileData = await this.studio.filesystem.readImportFile (files[0]);
				let name = files[0].name;
				let f = this.cwd+path__WEBPACK_IMPORTED_MODULE_0___default.a.basename(name);
				try{
					await this.mp.put(f, Buffer.from(fileData).toString());
				}
				catch(e)
				{
					this.studio.workspace.showError('PutError',{extra:e.message});
				}
				// this.connection.send('fe',{
				// 	a:'up',
				// 	b:this.cwd,
				// 	c:path.basename(name),
				// 	d:fileData,
				// 	t:'w',
				// 	end:true
				// });
			}
			// this.connection.send('fe', {
			// 	a: 'ls',
			// 	b:this.cwd
			// });
			try{
				let d = await this.mp.listdir(this.cwd);
				this.update(d);
			}
			catch(e)
			{
				this.studio.workspace.showError('ListError',{extra:e.message});
			}
		},
		async refresh(){
			//TODO optimize file changes
			this.items[0].children = [];
			this.fileItem=this.items[0];
			this.cwd='/';
			this.cwdArray=[];
			this.menuItem = null;
			this.blocked = true;
			try{
				let d = await this.mp.listdir('/');
				await this.update(d);
			}
			catch(e)
			{
				this.studio.workspace.showError('ListError',{extra:e.message});
			}
			this.blocked = false;
		},
		async deleteObject(){
			//SHOW YOU SURE POPUP
			let allow = await this.studio.workspace.showConfirmationPrompt ('PROJECT_DELETE_FILE', 'PROJECT_FILE_SURE');
			let parent = path__WEBPACK_IMPORTED_MODULE_0___default.a.dirname(this.fileItem.path);
			if(allow){
				// this.connection.send('fe',{
				// 	a:'del',
				// 	b:parent,
				// 	c:this.fileItem.name,
				// });
				if(this.fileItem.children)
				{
					if(parent !== '/')
					{	
						try{
							await this.mp.rmdir(parent+'/'+this.fileItem.name);
						}
						catch(e)
						{
							this.studio.workspace.showError('RmDirError',{extra:e.message});
						}
					}
					else
					{
						try{
							await this.mp.rmdir(this.fileItem.name);
						}
						catch(e)
						{
							this.studio.workspace.showError('RmDirError',{extra:e.message});
						}
					}

					try{
						let d = await this.mp.listdir(parent);
						this.update(d);
					}
					catch(e)
					{
						this.studio.workspace.showError('ListError',{extra:e.message});
					}
					await this.refresh();
				}
				else
				{
					if(parent !== '/')
					{
						try{
							await this.mp.rm(parent+'/'+this.fileItem.name);
						}
						catch(e)
						{
							this.studio.workspace.showError('RmError',{extra:e.message});
						}
					}
					else
					{
						try{
							await this.mp.rm(this.fileItem.name);
						}
						catch(e)
						{
							this.studio.workspace.showError('RmError',{extra:e.message});
						}
					}

					try{
						let d = await this.mp.listdir(parent);
						await this.update(d);
					}
					catch(e)
					{
						this.studio.workspace.showError('ListError',{extra:e.message});
					}
					await this.refresh();
				}
			}			
		},
		async rename(){
			let parent = path__WEBPACK_IMPORTED_MODULE_0___default.a.dirname(this.fileItem.path);
			if (this.fileItem.children)
			{
				let newName = await this.studio.workspace.showPrompt ('PROJECT_RENAME_FOLDER', 'PROJECT_NEW_FOLDER_NAME', this.fileItem.name, 'PROJECT_NEW_NAME');
				if (newName)
				{
					// this.connection.send('fe',{
					// 	a:'ren',
					// 	b:parent,
					// 	c:this.fileItem.name,
					// 	d:newName
					// });
					try{
						await this.mp.rename(parent+this.fileItem.name, parent+newName);
					}
					catch(e)
					{
						this.studio.workspace.showError('RenameError',{extra:e.message});
					}
					await this.refresh();
				}
			}
			else
			{

				let newName = await this.studio.workspace.showPrompt ('PROJECT_RENAME_FILE', 'PROJECT_NEW_FILE_NAME', this.fileItem.name, 'PROJECT_NEW_NAME');
				if (newName)
				{
					// this.connection.send('fe',{
					// 	a:'ren',
					// 	b:parent,
					// 	c:this.fileItem.name,
					// 	d:newName
					// });
					try{
						await this.mp.rename(parent+'/'+this.fileItem.name, parent+'/'+newName);
					}
					catch(e)
					{
						this.studio.workspace.showError('RenameError',{extra:e.message});
					}
					await this.refresh();
				}
			}
			

		},
		async newFolder(){
			let folderName = await this.studio.workspace.showPrompt ('PROJECT_NEW_FOLDER', 'PROJECT_NEW_FOLDER_NAME', '', 'PROJECT_NEW_NAME');
			if (folderName)
			{
				// this.connection.send('fe',{
				// 	a:'newf',
				// 	b:this.fileItem.path,
				// 	c:folderName,
				// });
				try{
					await this.mp.mkdir(this.fileItem.path+folderName);
				}
				catch(e)
				{
					this.studio.workspace.showError('MkDirError',{extra:e.message});
				}

				try{
					let d = await this.mp.listdir(this.fileItem.path+folderName);
					this.update(d);
				}
				catch(e)
				{
					this.studio.workspace.showError('ListError',{extra:e.message});
				}
				await this.refresh();

			}			

		},
		update(data){
			this.newData=data;			
		},
		error(data){
			//TODO show notification
			this.studio.workspace.error (data);
		},
		updateFileTree(data, tree){
			tree.children = [];
			if(data) {
				for(let item of data) {
					if(item.t === 'd') {
						tree.children.push({
							name: item.f,
							children:[],
							path:this.cwd+item.f+'/',
							size:item.s,
							key: this.cwd+item.f+'/',
						});
					} else if(item.t === 'f') {
						tree.children.push({
							name:item.f,
							file:path__WEBPACK_IMPORTED_MODULE_0___default.a.extname(item.f),
							path:this.cwd+item.f+'/',
							size:item.s,
							key:this.cwd+item.f+'/'+item.f,
						});
					}	
				}
				this.studio.projects.sort(tree.children);
				if(this.resolve){
					this.resolve();
					this.resolve = null;
				}
			}
		},
		_isChildOf(child,parent) {
			if (child === parent) return false;
			const parentTokens = parent.split(path__WEBPACK_IMPORTED_MODULE_0___default.a.sep).filter(i => i.length);
			return parentTokens.every((t, i) => child.split(path__WEBPACK_IMPORTED_MODULE_0___default.a.sep)[i] === t);
		},
		async fetchContent(item){
			this.cwd=item.path;
			if(!this.cwdArray.includes(this.cwd)){
				this.cwdArray.push(this.cwd);
				this.fileItem=item;
				let d = await this.mp.listdir(this.cwd);
				this.update(d);
			}
		},
		showFile(e) {
			this.cwd = path__WEBPACK_IMPORTED_MODULE_0___default.a.dirname(this.fileItem.path);
			this.fileMenu = false;
			this.folderMenu = false;
			e.preventDefault();
			this.fileMenu = false;
			this.x = e.clientX;
			this.y = e.clientY;
			this.$nextTick(() => {
				this.fileMenu = true;
			});
		},
		showFolder(e) {
			this.fileMenu = false;
			this.folderMenu = false;
			e.preventDefault();
			this.folderMenu = false;
			this.x = e.clientX;
			this.y = e.clientY;
			this.$nextTick(() => {
				this.folderMenu = true;
			});
		},
		close ()
		{
			this.$root.$emit ('submit');
		},
		esc() {
			this.close();
		}, 
	}
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(214).Buffer))

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MPFileManager_vue_vue_type_style_index_0_id_3f9d1d90_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(296);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MPFileManager_vue_vue_type_style_index_0_id_3f9d1d90_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MPFileManager_vue_vue_type_style_index_0_id_3f9d1d90_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MPFileManager_vue_vue_type_style_index_0_id_3f9d1d90_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MPFileManager_vue_vue_type_style_index_0_id_3f9d1d90_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MPFileManager_vue_vue_type_style_index_0_id_3f9d1d90_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 296:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(297);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("4cfb88cf", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 297:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".folder-open[data-v-3f9d1d90] {\n  background: url('plugins/devices/wyapp/plugin/data/img/icons/32px.png') no-repeat 0px -32px !important;\n  width: 32px;\n  height: 32px;\n}\n.folder-closed[data-v-3f9d1d90] {\n  background: url('plugins/devices/wyapp/plugin/data/img/icons/32px.png') no-repeat -64px 0px !important;\n  width: 32px;\n  height: 32px;\n}\n.file[data-v-3f9d1d90] {\n  background: url('plugins/devices/wyapp/plugin/data/img/icons/32px.png') no-repeat -32px 0px !important;\n  width: 32px;\n  height: 32px;\n}\n.project-tree-on .v-treeview[data-v-3f9d1d90],\n.project-tree-on .v-treeview > .v-treeview-node[data-v-3f9d1d90] {\n  height: auto !important;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MPFileManager_vue_vue_type_style_index_1_id_3f9d1d90_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(299);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MPFileManager_vue_vue_type_style_index_1_id_3f9d1d90_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MPFileManager_vue_vue_type_style_index_1_id_3f9d1d90_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MPFileManager_vue_vue_type_style_index_1_id_3f9d1d90_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MPFileManager_vue_vue_type_style_index_1_id_3f9d1d90_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MPFileManager_vue_vue_type_style_index_1_id_3f9d1d90_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 299:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(300);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("4c22182e", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 300:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".w-100[data-v-3f9d1d90] {\n  width: 100%;\n}\n.w-90[data-v-3f9d1d90] {\n  width: 90%;\n}\n.w-80[data-v-3f9d1d90] {\n  width: 80%;\n}\n.w-70[data-v-3f9d1d90] {\n  width: 70%;\n}\n.w-60[data-v-3f9d1d90] {\n  width: 60%;\n}\n.w-50[data-v-3f9d1d90] {\n  width: 50%;\n}\n.w-40[data-v-3f9d1d90] {\n  width: 40%;\n}\n.w-30[data-v-3f9d1d90] {\n  width: 30%;\n}\n.w-20[data-v-3f9d1d90] {\n  width: 20%;\n}\n.w-10[data-v-3f9d1d90] {\n  width: 10%;\n}\n.hs-0[data-v-3f9d1d90] {\n  height: 0% !important;\n}\n.hs-35[data-v-3f9d1d90] {\n  height: 35% !important;\n}\n.hs-65[data-v-3f9d1d90] {\n  height: 65% !important;\n}\n.hs-100[data-v-3f9d1d90] {\n  height: calc(100vh - 158px) !important;\n}\n.rel[data-v-3f9d1d90] {\n  position: relative;\n}\n.text-center[data-v-3f9d1d90] {\n  text-align: center;\n}\n.text-left[data-v-3f9d1d90] {\n  text-align: left;\n}\n.text-right[data-v-3f9d1d90] {\n  text-align: right;\n}\n.h-top[data-v-3f9d1d90] {\n  height: calc(100vh - 90px);\n}\n.h-top2[data-v-3f9d1d90] {\n  height: calc(100vh - 158px);\n}\n.left[data-v-3f9d1d90] {\n  float: left !important;\n}\n.right[data-v-3f9d1d90] {\n  float: right !important;\n}\n.p-20[data-v-3f9d1d90] {\n  padding: 20px;\n}\n.v-dialog[data-v-3f9d1d90] {\n  box-shadow: none;\n}\n.v-dialog .v-list[data-v-3f9d1d90] {\n  background-color: #ffffff !important;\n  color: #000000 !important;\n}\n.v-dialog .v-list > div[data-v-3f9d1d90]:hover {\n  background-color: #ffffff !important;\n  color: #000000 !important;\n}\n.filemanager[data-v-3f9d1d90] {\n  display: flex;\n  flex-flow: row wrap;\n  overflow: hidden;\n  height: 100%;\n}\n.filemanager .tree-left[data-v-3f9d1d90] {\n  height: 100%;\n  overflow: auto;\n  background: #eee;\n  max-width: 50%;\n  padding: 0 20px 0 0;\n}\n.filemanager .project-box-1[data-v-3f9d1d90] {\n  flex: 1 1 auto;\n  height: 100%;\n  overflow: auto;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer, process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_READY", function() { return STATUS_READY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_REPL_REQ", function() { return STATUS_REPL_REQ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_REPL_REQ_2", function() { return STATUS_REPL_REQ_2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_REPL", function() { return STATUS_REPL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_RUNNING", function() { return STATUS_RUNNING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_STOPPED", function() { return STATUS_STOPPED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_OFFLINE", function() { return STATUS_OFFLINE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MicroPython", function() { return MicroPython; });
const EventEmitter = __webpack_require__ (3).EventEmitter;
const STATUS_READY = 'ready';
const STATUS_REPL_REQ = 'repl_req';
const STATUS_REPL_REQ_2 = 'repl_req_2';
const STATUS_REPL = 'repl';
const STATUS_RUNNING = 'running';
const STATUS_STOPPED = 'stopped';
const STATUS_OFFLINE = 'offline';

const STREAM_NULL = 0;
const STREAM_OUTPUT = 1;
const STREAM_ERROR = 2;
const BUFFER_SIZE = 32;

const RAW_REPL_TIMEOUT = 3000;
const LIST_FILES_TIMEOUT = 3000;

function escape (s) {
	s.replace(/\\/g, '\\\\')
		.replace(/\$/g, '\\$')
		.replace(/'/g, '\\\'')
		.replace(/"/g, '\\"');
	return s;
}

const CircuitPythonRegex = /Adafruit CircuitPython ([A-Za-z0-9_.]+) on [A-Za-z0-9-]+; ([A-Za-z0-9_\s]+) with ([A-Za-z0-9_]+)/;

class MicroPython extends EventEmitter {
	constructor(port){
		super();
		this.port = port;

		this.console = true;
		this.consoleBuffer = '';

		this.circuitPython = false;

		this.expectBuffer = '';
		this.expecting = false;
		this.expectStr = '';
		this.expectTimeout = null;
		this.expectResolve = null;
		this.expectReject = null;

		this.waitingStatus = null;
		this.waitResolve = null;
		this.waitReject = null;

		this.stream = STREAM_NULL;

		this.runSource = null;

		this.display = true;

		this.options = false;

		this.stdout = null;
		this.stderr = null;

		this.setStatus(STATUS_OFFLINE);
		port.on('connected', ()=>{
			this.emit('connected');
			this.setStatus(STATUS_READY);
			if (this.options.reset) this.reset ();
		});

		port.on('data', (data)=>{			
			this.readBuffer (data);
		});
		port.on('error', (err)=>{
			this.emit('error', err);
		});
		
	}

	connect (options) {
		this.options = options;
		this.port.connect (options.port, options.baudrate);
	}

	async listdir (folder) {
		let cmd = `import os
import json

def listdir(directory):
	ls = os.listdir(directory)
	r = []
	for f in ls:
		s = os.stat(directory+'/'+f)
		t = 'u'          
		if s[0] == 16384: 
			t = 'd' 
		elif s[0] == 32768:
			t = 'f'
		r.append({'f': f, 't': t, 's': s[6]})
	print(json.dumps(r))

listdir ('${escape(folder)}')`;

		let ls = null;
		try {
			let res = await this.execute (cmd);
			if (!res.stderr) {
				ls = JSON.parse (res.stdout);
			}
			else
			{
				throw new Error(res.stderr);
			}
		}
		catch (e)
		{
			throw new Error(e);
		}
		return ls;
	}

	async get(file)
	{
		let cmd = `import sys
import ubinascii
with open('${escape(file)}', 'rb') as infile:
	while True:
		result = infile.read(32)
		if result == b'':
			break
		len = sys.stdout.write(result)`;
		
		let fileContent = null;
		try{

			let res = await this.execute(cmd);
			if(!res.stderr)
			{
				fileContent = new Buffer.from(res.stdout).toString();
			}
			else
			{
				throw new Error(res.stderr);
			}

		}
		catch (e)
		{
			throw new Error(e);
		}
		return fileContent;
		
	}

	async mkdir(dir)
	{

		let cmd = `try:
	import os
except ImportError:
	import uos as os
os.mkdir('${escape(dir)}')`;

		try{

			let res = await this.execute(cmd);
			if(!res.stderr)
			{
				//TODO show notification
			}
			else
			{
				//res.stderr === "OSError: [Errno 17] EEXIST" - Directory already exist {dir}.
				throw new Error(res.stderr);
			}

		}
		catch (e)
		{
			throw new Error(e);
		}

	}

	async rename(name, newName)
	{

		let cmd = `try:
	import os
except ImportError:
	import uos as os
os.rename('${escape(name)}', '${escape(newName)}')`;

		try{

			let res = await this.execute(cmd);
			if(!res.stderr)
			{
				//TODO show notification
			}
			else
			{
				//Erori probabile: Fisierul/Directorul sa nu existe
				throw new Error(res.stderr);
			}

		}
		catch (e)
		{
			throw new Error(e);
		}

	}

	async put(file,data)
	{
		let cmd = `f = open('${escape(file)}', 'wb')`;
		await this.execute(cmd);

		try{
			let res = await this.execute(cmd);
			if(!res.stderr)
			{
				
				//TODO show notification

				await this.execute(cmd);

				let len = data.length;

				for(let i = 0; i < len; i=i+BUFFER_SIZE)
				{
					let part_len = Math.min(BUFFER_SIZE, len-i);
					let part = data.substring(i , i+part_len);

					cmd = `f.write(b'${escape(part)}')`;

					try{
						let res = await this.execute(cmd);
						if(!res.stderr)
						{
							//TODO show notification
						}
						else
						{
							throw new Error(res.stderr);
						}
					}
					catch(e){
						throw new Error(e);
					}
					
				}

				cmd = 'f.close()';
				await this.execute(cmd);

			}
			else
			{
				throw new Error(res.stderr);
			}
		}
		catch(e){
			throw new Error(e);
		}

	}

	async rm(file)
	{

		let cmd = `try:
	import os
except ImportError:
	import uos as os
os.remove('${escape(file)}')`;

		try{

			let res = await this.execute(cmd);
			if(!res.stderr)
			{
				//TODO show notification
			}
			else
			{
				//res.stderr === "OSError: [Errno 2] ENOENT" - No such file/directory {file}.
				//res.stderr === "OSError: [Errno 13] EACCES" - Directory is not empty {file}.
				throw new Error(res.stderr);
			}

		}
		catch (e)
		{
			throw new Error(e);
		}

	}

	async rmdir(dir)
	{
		let cmd = `try:
	import os
except ImportError:
	import uos as os
def rmdir(directory):
	os.chdir(directory)
	for f in os.listdir():
		try:
			os.remove(f)
		except OSError:
			pass
	for f in os.listdir():
		rmdir(f)
	os.chdir('..')
	os.rmdir(directory)
rmdir('${escape(dir)}')`;

		try{

			let res = await this.execute(cmd);
			if(!res.stderr)
			{
				//TODO show notification
			}
			else
			{
				//res.stderr === "OSError: [Errno 2] ENOENT" - No such directory {dir}.
				throw new Error(res.stderr);
			}
	
		}
		catch (e)
		{
			throw new Error(e);
		}
		
	}

	waitForStatus (status, timeout) {
		if (!this.waitingStatus) {
			this.waitingStatus = status;
			return new Promise ((resolve, reject) => {
				this.waitResolve = resolve;
				this.waitReject = reject;
				if (timeout > 0) this.waitTimeout = setTimeout ((() => {
					this.waitingStatus = null;
					reject ();
				}).bind(this), timeout);
			});
		}
		else {
			throw new Error ('Already waiting '+this.waitingStatus);
		}
	}

	async execute (cmd) {
		let s = this.waitForStatus (STATUS_STOPPED, LIST_FILES_TIMEOUT);
		if (await this.enterRawRepl ())
		{
			await this.run (cmd, false);
			await s;
			return {
				stdout: this.stdout,
				stderr: this.stderr
			};
		}
		else
		{
			return null;
		}
	}

	emitConsoleBuffer ()
	{
		let buffer = this.consoleBuffer;
		this.resetConsoleBuffer ();
		this.emit ('data', buffer);
	}

	resetConsoleBuffer ()
	{
		this.consoleBuffer = '';
	}

	readBuffer (data) {
		if (this.console) 
		{
			this.emit ('data', data);
			let buffer = Buffer.from (data).toString ();
			if (!this.circuitPython && buffer.indexOf ('Adafruit CircuitPython') > -1) {
				this.circuitPython = true;
				let name = 'CircuitPython';
				let version = null;
				let info = buffer.match (CircuitPythonRegex);
				if (info) {
					version = info[1];
					name = info[2];
				}
				this.emit ('board', {
					python: this.circuitPython?'circuitpython':'micropython',
					name,
					version
				});
			}
		}
		else 
		{
			if (this.stream === STREAM_NULL)
			{
				this.consoleBuffer = this.consoleBuffer + Buffer.from (data).toString();
			}
			this.expectBuffer = this.expectBuffer + Buffer.from (data).toString();
			if (this.expecting)
			{
				let index = this.expectBuffer.indexOf (this.expectStr);
				if (index > -1) {
					this.expectBuffer = this.expectBuffer.substring (index+this.expectStr.length);
					clearTimeout (this.expectTimeout);
					this.expecting = false;
					return this.expectResolve();
				}
			}
			else
			{
				if (this.status === STATUS_RUNNING) {
					let position;
					let emitData = '';
					while ((position = this.expectBuffer.indexOf ('\x04')) > -1)
					{
						emitData = this.expectBuffer.substring (0, position);
						this.expectBuffer = this.expectBuffer.substring (position+1);
						
						if (this.stream === STREAM_OUTPUT)
						{
							this.stdout = this.stdout + emitData;
							if (this.display) this.emit ('data', emitData);
							this.emitData = null;
							this.stream = STREAM_ERROR;
						}
						else if (this.stream === STREAM_ERROR) {
							this.stderr = this.stderr + emitData;
							if (this.display) this.emit ('data', emitData);
							this.setStatus (STATUS_STOPPED);
							this.emitData = null;
							this.stream = STREAM_NULL;
							this.exitRawRepl ();
							// TODO switch this to previous status before STATUS_RUNNING
							// this.setStatus (STATUS_REPL);
						}
					}

					emitData = this.expectBuffer;
					this.expectBuffer = '';
					
					if (this.stream === STREAM_OUTPUT)
					{
						this.stdout = this.stdout + emitData;
						if (this.display === true) this.emit ('data', emitData);
					}
					else if (this.stream === STREAM_ERROR)
					{
						this.stderr = this.stderr + emitData;
						if (this.display === true) this.emit ('data', emitData);
					}
				}
			}
		}
	}

	expect (str, timeout) {
		if (!this.expecting) {
			this.expecting = true;
			this.expectStr = str;
			return new Promise ((resolve, reject) => {
				this.expectResolve = resolve;
				this.expectReject = reject;
				if (timeout > 0) this.expectTimeout = setTimeout ((() => {
					this.expecting = false;
					reject ();
				}).bind(this), timeout);
				process.nextTick (() => this.readBuffer (''));
			});
		}
		else {
			throw new Error ('Already expecting '+this.expectStr);
		}
	}

	sleep (seconds) {
		return new Promise ((resolve) => {
			setTimeout (resolve, parseInt (seconds*1000));
		});
	}

	async enterRawRepl()
	{
		this.console = false;
		let raw_repl = false;
		if (this.status !== STATUS_REPL)
		{
			try
			{
				// send ctrl+c 
				await this.write ('\r\x03');
				await this.sleep (0.1);
				await this.write ('\x03');
				await this.sleep (0.1);

				// wait for serial to flush
				await this.sleep (0.5);

				this.setStatus(STATUS_REPL_REQ);
				await this.write('\r\x01');
				await this.expect ('raw REPL; CTRL-B to exit\r\n>', RAW_REPL_TIMEOUT);
				await this.write('\x04');
				await this.expect ('soft reboot\r\n', RAW_REPL_TIMEOUT);
				await this.sleep (0.5);
				await this.write ('\x03');
				await this.sleep (0.1);
				await this.write ('\x03');
				await this.expect ('raw REPL; CTRL-B to exit\r\n>', RAW_REPL_TIMEOUT);
				this.setStatus(STATUS_REPL);
				raw_repl = true;
			}
			catch (e)
			{
				this.console = true;
				this.emitConsoleBuffer ();
			}
		}
		else
		{
			raw_repl = true;
		}
		return raw_repl;
	}

	async exitRawRepl()
	{
		this.display = true;
		let exit_raw_repl = false;
		if (this.status === STATUS_REPL || this.status === STATUS_STOPPED)
		{
			try
			{
				// send ctrl+b
				await this.write ('\r\x02');
				this.setStatus(STATUS_READY);
				exit_raw_repl = true;
				this.console = true;
				this.resetConsoleBuffer ();
			}
			catch (e)
			{
				exit_raw_repl = false;
			}
		}
		else
		{
			this.console = true;
			this.resetConsoleBuffer ();
			exit_raw_repl = true;
		}
		return exit_raw_repl;
	}

	async run (source, display = true) {
		let running = true;
		if (this.status === STATUS_REPL) {
			this.display = display;
			this.stream = STREAM_NULL;
			this.stdout = '';
			this.stderr = '';
			// TODO write in packets of length 255 
			await this.write (source);
			await this.write ('\x04');
			// await this.expect('>', RAW_REPL_TIMEOUT);
			await this.expect('OK', RAW_REPL_TIMEOUT);
			this.emit ('data', '\r\nRunning \r\n\r\n');
			this.setStatus (STATUS_RUNNING);
			this.stream = STREAM_OUTPUT;
			this.readBuffer ('');
		}
		else
		{
			running = false;
		}
		return running;
	}

	write(data)
	{
		if (typeof data === 'string') data = Buffer.from (data);
		this.port.write(data);
	}

	async writeRawRepl(commands){

		this.setStatus(STATUS_REPL);

		let command_bytes = Buffer.from(commands);

		for(let i = 0 ; i < command_bytes.length ; i=i+256)
		{       
			let subarray_command_bytes = command_bytes.slice(i,Math.min(i+256, command_bytes.length));
			await this.port.write(subarray_command_bytes);
		}
		
		this.setStatus(STATUS_RUNNING);

		await this.port.write(Buffer.from('\r\x04'));
		await this.port.write(Buffer.from('\r\x02'));

	}

	setStatus(status)
	{
		this.status = status;
		if (this.waitingStatus == status) {
			this.waitingStatus = null;
			if (this.waitResolve) this.waitResolve ();
		}
		this.emit('status', status);
		// if (this.runSource && this.status === STATUS_REPL) {
		// 	await this.write (this.runSource);
		// 	this.runSource = null;
		// 	this.setStatus (STATUS_RUNNING);
		// }
	}

	getStatus()
	{
		return this.status;
	}

	getPort()
	{
		return this.port;
	}

	async stop()
	{
		await this.port.write(Buffer.from('\r\x03'));
	}

	async reset()
	{
		this.console = false;
		await this.port.write(Buffer.from('\x03\x04'));
		await this.expect ('soft reboot\r\n', RAW_REPL_TIMEOUT);
		await this.sleep (0.3);
		this.console = true;
		this.resetConsoleBuffer ();
		await this.port.write(Buffer.from('\r\x02'));
	}

	close () {
		this.port.close ();
	}

}

// export class MicroPythonFiles extends EventEmitter {

// 	constructor(mp){
// 		super();
// 		this.mp = mp;
// 	}

// 	async get(filename)
// 	{
// 		command = 'import sys\nimport ubinascii\nwith open(\''+filename+'\', \'rb\') as infile:\nwhile True:\nresult = infile.read('+BUFFER_SIZE+')\nif result == b\'\':\nbreak\nlen=sys.stdout.write(ubinascii.hexlify(result))';
// 		this.mp.run(command);
// 		mp.on('data', (data)=> {
            
// 		});
		
// 		mp.on('error',(err) => {

// 		});
// 	}

// 	async mkdir(directory)
// 	{
// 		command = 'try:\nimport os\nexcept ImportError:\nimport uos as os\nos.mkdir(\''+directory+'\')';
// 		this.mp.run(command);
// 		mp.on('data', (data)=> {
            
// 		});
		
// 		mp.on('error',(err) => {

// 		});

// 	}

// }
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(214).Buffer, __webpack_require__(2)))

/***/ })

}]);