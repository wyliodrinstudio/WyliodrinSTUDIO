(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[51],{

/***/ 1625:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setup; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _views_RaspberrypiSimulator_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1626);
/* harmony import */ var _JSInterpreter_interpreter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1645);
/* harmony import */ var _JSInterpreter_interpreter_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_JSInterpreter_interpreter_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _JSInterpreter_interpreter_library_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1648);
/* harmony import */ var _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1637);
/* harmony import */ var _libraries_onoff_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1651);
/* harmony import */ var _libraries_lcd_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1652);
let studio = null;
let simulator = {
	connected: false,
	isRunning: false,
	opperationsCounter: 0
};

let workspace = null;









let device_simulator_raspberrypi = {
	/**
	 * Simulate the connection to a real RaspberryPi
	 * @param  {Object} device The 'device' object in the platform
	 */
	connect(device) {
		if (simulator.connected === false) {
			if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isObject(device)) {
				process.nextTick(() => {
					device.status = 'CONNECTED';
					workspace.updateDevice(device);
				});
				simulator.connected = true;

				return device;
			}
		}
	},

	/**
	 * Simulate the disconnection to a real RaspberryPi
	 * @param  {Object} device The 'device' object in the platform
	 */
	disconnect(device) {
		if (simulator.connected === true) {
			if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isObject(device)) {
				device.status = 'DISCONNECTED';
				workspace.updateDevice(device);
				simulator.connected = false;

				return true;
			}
		}
	}
};

/**
 * The function to create the RaspberryPi simulator
 * @param  {Object} options The options for the imported objects (plugins)
 * @param  {Object} imports The imported objects (plugins)
 * @param  {Object} register The exported object (plugin)
 */
function setup(options, imports, register) {
	studio = imports;
	workspace = studio.workspace.registerDeviceDriver('raspberrypi_simulator', device_simulator_raspberrypi);

	// Register a new device: 'RaspberryPi simulator'
	workspace.updateDevices([{
		id: 'raspberrypi_simulator',
		name: 'RaspberryPi',
		priority: workspace.DEVICE_PRIORITY_SIMULATOR,
		address: 'raspberrypi_simulator',
		board: 'raspberrypi_simulator',
		properties: {
			isRunning: false
		},
		placeholder: true,
		icon: 'plugins/simulators/raspberrypi/data/img/icons/icon-raspberrypi.png'
	}
	]);

	// The code that should be executed in case of run button pressing
	workspace.registerDeviceToolButton ('DEVICE_SIMULATOR_RASPBERRY_PI_RUN', 40, async () => {
		try {
			// Load the project code
			let project = studio.projects.getCurrentProject();
			if (!project) {
				studio.workspace.showNotification(studio.workspace.vue.$t('DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_NOT_OPEN'));
			} else if (project.language !== 'nodejs') {
				studio.workspace.showNotification(studio.workspace.vue.$t('DEVICE_SIMULATOR_RASPBERRY_PI_LANGUAGE_INCOMPATIBLE'));
			} else {	
				let filePath = studio.projects.getDefaultRunFileName(project);
				let code = await studio.projects.loadFile(project, filePath);

				let device = studio.workspace.getDevice();
				if (device && device.properties.isRunning === false) {
					// Show and select the right console for this device (RaspberryPi simulator)
					studio.console.show();
					studio.console.select(device.id);

					// Create the object constructors for each library and
					// append them to the users code
					let librariesToLoad = 
						'var libraries = {};\n\n' +
						_libraries_onoff_js__WEBPACK_IMPORTED_MODULE_5__["default"] +
						_libraries_lcd_js__WEBPACK_IMPORTED_MODULE_6__["default"] +
						`function require (name) {
							return libraries[name];
						};\n\n`;
					code = librariesToLoad.toString() + code.toString();
					_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_4__["default"].setDefault();

					// Create the JS interpreter with the associated functions
					let interpreter = new _JSInterpreter_interpreter_js__WEBPACK_IMPORTED_MODULE_2___default.a(code, Object(_JSInterpreter_interpreter_library_js__WEBPACK_IMPORTED_MODULE_3__["default"])(studio, device, simulator));

					// Set the variables of the device to 'running' and update the device
					simulator.opperationsCounter = 0;
					simulator.isRunning = true;
					device.properties.isRunning = true;
					workspace.updateDevice(device);

					/**
					 * The function to be executed by the interpreter
					 * The code written by the user is executed step by step, and each
					 * 100 steps it is slowed down in order for the application not to
					 * crash in case of an infinite loop
					 */
					let runToCompletion = function() {
						if (simulator.isRunning && interpreter.step()) {
							simulator.opperationsCounter ++;
							if (simulator.opperationsCounter === 100) {
								setTimeout(runToCompletion, 10);
								simulator.opperationsCounter = 0;
							} else {
								setTimeout(runToCompletion, 1);
							}
						} else {
							simulator.isRunning = false;
							device.properties.isRunning = false;
							workspace.updateDevice(device);
						}
					};
					process.nextTick(runToCompletion);
				}
			}
		} catch(e) {
			studio.showError ('DEVICE_SIMULATOR_RASPBERRY_PI_RUN_ERROR', {error: e.message});
		}
	}, 'plugins/simulators/raspberrypi/data/img/icons/run-icon.svg', {
		visible() {

			// The visible options of the RaspberryPi simulator run button
			let device = studio.workspace.getDevice ();
			return (device.status === 'CONNECTED' && !device.properties.isRunning);
		},
		enabled() {

			// The enabled options of the RaspberryPi simulator run button
			let project = studio.projects.getCurrentProject();
			return (project);
		},
		type: 'run'
	});

	// The code that should be executed in case of stop button pressing
	workspace.registerDeviceToolButton('DEVICE_SIMULATOR_RASPBERRY_PI_STOP', 50, () => {

		// Set the running variables of the device to false in order to make
		// the JS interpreter to stop
		let device = studio.workspace.getDevice ();
		if (device && device.properties.isRunning) {
			device.properties.isRunning = false;
			simulator.isRunning = false;
			workspace.updateDevice(device);
		}
	}, 'plugins/simulators/raspberrypi/data/img/icons/stop-icon.svg', {
		visible() {

			// The visible options of the RaspberryPi simulator stop button
			let device = studio.workspace.getDevice ();
			return (device.status === 'CONNECTED' && device.properties.isRunning);
		},
		type: 'stop'
	});

	// The 'RaspberryPi simulator' tab registration with the associated Vue component
	studio.workspace.registerTab('DEVICE_SIMULATOR_RASPBERRY_PI', 1000, _views_RaspberrypiSimulator_vue__WEBPACK_IMPORTED_MODULE_1__["default"], {
		visible() {

			// The visible options of the RaspberryPi simulator tab
			let device = studio.workspace.getDevice ();
			return (device.status === 'CONNECTED' && device.id === 'raspberrypi_simulator');
		},
	});
	
	// The object returned by this plugin
	register(null, {
		device_simulator_raspberrypi
	});
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),

/***/ 1626:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RaspberrypiSimulator_vue_vue_type_template_id_13c778f9_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1627);
/* harmony import */ var _RaspberrypiSimulator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1629);
/* empty/unused harmony star reexport *//* harmony import */ var _RaspberrypiSimulator_vue_vue_type_style_index_0_id_13c778f9_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1642);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _RaspberrypiSimulator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RaspberrypiSimulator_vue_vue_type_template_id_13c778f9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RaspberrypiSimulator_vue_vue_type_template_id_13c778f9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "13c778f9",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/simulators/raspberrypi/views/RaspberrypiSimulator.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1627:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RaspberrypiSimulator_vue_vue_type_template_id_13c778f9_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1628);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RaspberrypiSimulator_vue_vue_type_template_id_13c778f9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RaspberrypiSimulator_vue_vue_type_template_id_13c778f9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1628:
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
    "div",
    [
      _c(
        "v-toolbar",
        { attrs: { text: "", color: "grey lighten-4" } },
        [
          _c("v-app-bar-nav-icon", {
            staticStyle: { "margin-left": "15px" },
            on: {
              click: function($event) {
                $event.stopPropagation()
                _vm.projectsListShow = !_vm.projectsListShow
              }
            }
          }),
          _vm._v(" "),
          _c("v-toolbar-title", [_vm._v(_vm._s(_vm.projectNameToBeShown))]),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              staticStyle: { "margin-right": "15px" },
              attrs: { icon: "" },
              on: {
                click: function($event) {
                  return _vm.openDocumentation()
                }
              }
            },
            [_c("v-icon", [_vm._v("mdi-help")])],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.projectsList
        ? _c(
            "v-navigation-drawer",
            {
              attrs: { absolute: "", temporary: "", width: "300", dark: "" },
              model: {
                value: _vm.projectsListShow,
                callback: function($$v) {
                  _vm.projectsListShow = $$v
                },
                expression: "projectsListShow"
              }
            },
            [
              _c(
                "v-list",
                { staticClass: "menu" },
                [
                  _c(
                    "v-btn",
                    {
                      attrs: { text: "" },
                      on: {
                        click: function($event) {
                          _vm.projectsListShow = !_vm.projectsListShow
                        }
                      }
                    },
                    [
                      _vm._v(
                        _vm._s(
                          _vm.$t(
                            "DEVICE_SIMULATOR_RASPBERRY_PI_CLOSE_PROJECT_LIST"
                          )
                        )
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { text: "" },
                      on: {
                        click: function($event) {
                          _vm.uploadOwnProject()
                          _vm.projectsListShow = !_vm.projectsListShow
                        }
                      }
                    },
                    [
                      _vm._v(
                        _vm._s(
                          _vm.$t("DEVICE_SIMULATOR_RASPBERRY_PI_LOAD_PROJECT")
                        )
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _vm._l(_vm.projectsList, function(project, index) {
                    return _c(
                      "v-list-item",
                      {
                        key: index,
                        on: {
                          click: function($event) {
                            _vm.projectName = project.originalName
                            _vm.projectsListShow = !_vm.projectsListShow
                          }
                        }
                      },
                      [
                        _c("v-list-item-title", [_vm._v(_vm._s(project.name))]),
                        _vm._v(" "),
                        _c(
                          "v-list-item-avatar",
                          { attrs: { size: "100" } },
                          [
                            _c("v-img", {
                              attrs: {
                                src:
                                  _vm.svgGenericPath + project.svgPath + ".svg"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    )
                  })
                ],
                2
              )
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _vm._m(0),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "col-md-7 row val-container" },
          [
            _c("v-data-table", {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.componentsTable.length !== 0,
                  expression: "componentsTable.length !== 0"
                }
              ],
              staticClass: "elevation-1",
              attrs: {
                "hide-default-footer": "",
                headers: _vm.headerTable,
                items: _vm.componentsTable,
                "item-key": "pin"
              }
            })
          ],
          1
        )
      ])
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-md-5 sim-box" }, [
      _c("div", { staticClass: "rpi-sim" }, [
        _c("div", { attrs: { id: "raspberrypi_svg" } }),
        _vm._v(" "),
        _c("div", { attrs: { id: "lcd_display" } })
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ 1629:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_RaspberrypiSimulator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1630);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_RaspberrypiSimulator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1630:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1631);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dialogs_LoadProject_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1632);
/* harmony import */ var _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1637);
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






/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'RaspberrypiSimulator',

	props: ['active'],

	data() {
		return {
			projectsListShow: null,
			projectsList: null,
			svgGenericPath: null,

			componentsTable: [],
			headerTable: [{
				text: null,
				align: 'left',
				sortable: false,
				value: 'pins'
			}, {
				text: null,
				value: 'name'
			}, {
				text: null,
				value: 'color'
			}],

			projectNameToBeShown: null,
			projectName: null,
			projectData: null,
			lcdComponents: null
		};
	},


	/**
	 * Read and create the list of projects, as well as load the initial project
	 */
	created() {

		// Update virtual LCD position
		let that = this;
		jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).resize(function() {
			that.loadLcdDisplay();
		});

		// Load the tutorials list of projects
		this.svgGenericPath = _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_2__["default"].svgGenericPath;

		let svgList = __webpack_require__ (1641);
		let projectsList = [];

		for (let i = 0; i < svgList.length; i ++) {
			// The name for the SVG path
			svgList[i] = svgList[i].split('.svg')[0];

			// The name to be shown in the list
			let name = svgList[i].split(_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_2__["default"].startingNameForTutorials)[1];
			name = name.replace(/([0-9A-Z])/g, ' $1').trim();

			projectsList.push({
				name: name,
				originalName: svgList[i],
				svgPath: svgList[i]
			});
		}

		this.projectsList = projectsList;
		this.projectsListShow = false;

		// Save the current project name
		this.projectName = _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_2__["default"].nameStartingProject;
	},

	watch: {
		/**
		 * Load a new project for every change of the variable 'projectName'
		 * @param  {String} name The name of the project to be loaded
		 */
		projectName(name) {
			// Load the new project data
			this.loadProject(name);
		},

		active() {
			if (this.active) {
				setTimeout (() => {
					this.loadLcdDisplay();

					// Name the header titles of the table
					this.headerTable[0].text = this.$t('DEVICE_SIMULATOR_RASPBERRY_PI_TABLE_PIN');
					this.headerTable[1].text = this.$t('DEVICE_SIMULATOR_RASPBERRY_PI_TABLE_NAME');
					this.headerTable[2].text = this.$t('DEVICE_SIMULATOR_RASPBERRY_PI_TABLE_COLOR');
				}, 250);
			}
		}
	},

	methods: {
		/**
		 * Open the documentation
		 */
		openDocumentation() {
			this.studio.system.openLink('https://wyliodrinstudio.readthedocs.io/en/latest/simulators/raspberrypi.html');
		},

		/**
		 * Load a new project with the SVG and the data required
		 * @param  {String} name The name of the project to be loaded
		 */
		loadProject(name) {

			// Parse the name to be shown on the screen if needed
			this.projectNameToBeShown = name;
			if (this.projectNameToBeShown.indexOf(_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_2__["default"].startingNameForTutorials) === 0) {
				this.projectNameToBeShown = this.projectNameToBeShown.split(_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_2__["default"].startingNameForTutorials)[1];
				this.projectNameToBeShown = this.projectNameToBeShown.replace(/([0-9A-Z])/g, ' $1').trim();
			}

			_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_2__["default"].loadProject(name);
			this.projectData = _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_2__["default"].dataLoaded;

			this.componentsTable = [];
			while (document.getElementById('lcd_display').firstChild) {
				document.getElementById('lcd_display').removeChild(document.getElementById('lcd_display').firstChild);
			}

			// Create an array for LCD segments simulation
			this.lcdComponents = [];

			// Create the list needed for the table of components
			for (let component of Object.keys(this.projectData.components)) {
				let newComponent = {
					pins: null,
					name: null,
					color: null
				};

				// Set the attribute 'pins' of each component
				let pins = '';
				for (let pin of Object.keys(this.projectData.pins)) {
					if (this.projectData.pins[pin].id !== 'gnd' && this.projectData.pins[pin].components.includes(component)) {
						if (pins !== '') {
							pins += ', ';
						}

						if (pin !== '3v3' && pin !== '5v') {
							pins += _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_2__["default"].parsePinToGpio(pin);
						} else {
							pins += pin;
						}
					}
				}
				newComponent.pins = pins.toUpperCase();

				// Set the attribute 'name' of each component
				newComponent.name = this.projectData.components[component].name.toUpperCase();

				// Set the attribute 'color' of each component
				if (this.projectData.components[component].color) {
					newComponent.color = this.projectData.components[component].color.toUpperCase();
				} else {
					newComponent.color = '-';
				}

				// Add the component to the table
				this.componentsTable.push(newComponent);

				// Push the LCD segments simulation to add them to the HTML
				if (this.projectData.components[component].name === 'lcd') {
					this.lcdComponents.push(component);
				}
			}

			if (this.active) {
				setTimeout (() => {
					this.loadLcdDisplay();
				}, 250);
			}
		},

		/**
		 * Upload files for a new project and then load it
		 */
		async uploadOwnProject() {
			let state = await this.studio.workspace.showDialog(_dialogs_LoadProject_vue__WEBPACK_IMPORTED_MODULE_1__["default"], {
				width: 500
			});

			if (state) {
				this.loadProject(_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_2__["default"].ownProject.name);
			}
		},

		loadLcdDisplay() {
			for (let component of this.lcdComponents) {
				let elementLcd = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.querySelector('#raspberrypi_svg').firstElementChild).find('g[partID="' + component + '"]');

				if (elementLcd[0]) {
					while (document.getElementById('lcd_display').hasChildNodes()) {
						document.getElementById('lcd_display').removeChild(document.getElementById('lcd_display').firstElementChild);
					}

					let position = elementLcd[0].getBoundingClientRect();
					let svgLeftPosition = position.left;
					let svgTopPosition = position.top - 185.5;
					
					let lcd = document.createElement('g');
					lcd.style.cssText = 'position: absolute; left:' + svgLeftPosition + 'px; top: ' + svgTopPosition + 'px;';
					lcd.id = component;

					let leftPosition = 0;
					let topPosition = 0;
					for (let i = 0; i < 2; i ++) {
						for (let j = 0; j < 16; j ++) {
							let lcdSegment = document.createElement('g');

							if (j === 0 && i !== 0) {
								leftPosition = 0;
								topPosition += 22;
							}

							lcdSegment.style.cssText = 'position: absolute; left: ' + leftPosition + 'px; top: ' + topPosition + 'px; width: 13.3px; height: 21px; text-align: center; font-size: 15px; background: #009628';
							lcdSegment.id = 'segment ' + i + '-' + j;
							lcd.appendChild(lcdSegment);

							leftPosition += 14.3;
						}
					}

					document.getElementById('lcd_display').appendChild(lcd);
				}
			}
		}
	}
});


/***/ }),

/***/ 1632:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LoadProject_vue_vue_type_template_id_1e46eda7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1633);
/* harmony import */ var _LoadProject_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1635);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _LoadProject_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LoadProject_vue_vue_type_template_id_1e46eda7___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LoadProject_vue_vue_type_template_id_1e46eda7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/simulators/raspberrypi/views/dialogs/LoadProject.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1633:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoadProject_vue_vue_type_template_id_1e46eda7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1634);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoadProject_vue_vue_type_template_id_1e46eda7___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoadProject_vue_vue_type_template_id_1e46eda7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1634:
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
      _c("v-card-title", { attrs: { "primary-title": "" } }, [
        _c("h3", { staticClass: "headline mb-0" }, [
          _vm._v(_vm._s(_vm.$t("DEVICE_SIMULATOR_RASPBERRY_PI_LOAD_PROJECT")))
        ])
      ]),
      _vm._v(" "),
      _c(
        "v-card-text",
        [
          _c("v-text-field", {
            attrs: {
              label: _vm.$t(
                "DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_NAME_LABEL"
              )
            },
            model: {
              value: _vm.nameOwnProject,
              callback: function($$v) {
                _vm.nameOwnProject = $$v
              },
              expression: "nameOwnProject"
            }
          }),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              staticClass: "ma-2",
              attrs: { tile: "" },
              on: {
                click: function($event) {
                  return _vm.addSvg()
                }
              }
            },
            [
              _vm.svgNotLoaded
                ? _c(
                    "v-icon",
                    {
                      attrs: { left: "" },
                      on: {
                        click: function($event) {
                          return _vm.addSvg()
                        }
                      }
                    },
                    [_vm._v("mdi-file-plus")]
                  )
                : _vm._e(),
              _vm._v(" "),
              !_vm.svgNotLoaded && !_vm.svgLoading
                ? _c("v-icon", { attrs: { left: "" } }, [
                    _vm._v("mdi-checkbox-marked-circle")
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.svgLoading
                ? _c("v-progress-circular", { attrs: { indeterminate: "" } })
                : _vm._e(),
              _vm._v(
                "\n\t\t\t" +
                  _vm._s(
                    _vm.$t(
                      "DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_ADD_SVG"
                    )
                  ) +
                  "\n\t\t"
              )
            ],
            1
          ),
          _vm._v(" "),
          !_vm.svgNotLoaded && !_vm.svgLoading
            ? _c(
                "v-btn",
                {
                  on: {
                    click: function($event) {
                      return _vm.removeSvg()
                    }
                  }
                },
                [_c("v-icon", [_vm._v("mdi-delete")])],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          !_vm.svgNotLoaded && !_vm.svgLoading
            ? _c("v-text-field", {
                attrs: { value: _vm.svgPath, label: "SVG path", readonly: "" }
              })
            : _vm._e(),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              staticClass: "ma-2",
              attrs: { tile: "" },
              on: {
                click: function($event) {
                  return _vm.addXml()
                }
              }
            },
            [
              _vm.xmlNotLoaded
                ? _c(
                    "v-icon",
                    {
                      attrs: { left: "" },
                      on: {
                        click: function($event) {
                          return _vm.addXml()
                        }
                      }
                    },
                    [_vm._v("mdi-file-plus")]
                  )
                : _vm._e(),
              _vm._v(" "),
              !_vm.xmlNotLoaded && !_vm.xmlLoading
                ? _c("v-icon", { attrs: { left: "" } }, [
                    _vm._v("mdi-checkbox-marked-circle")
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.xmlLoading
                ? _c("v-progress-circular", { attrs: { indeterminate: "" } })
                : _vm._e(),
              _vm._v(
                "\n\t\t\t" +
                  _vm._s(
                    _vm.$t(
                      "DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_ADD_XML"
                    )
                  ) +
                  "\n\t\t"
              )
            ],
            1
          ),
          _vm._v(" "),
          !_vm.xmlNotLoaded && !_vm.xmlLoading
            ? _c(
                "v-btn",
                {
                  staticClass: "ma-2",
                  attrs: { tile: "" },
                  on: {
                    click: function($event) {
                      return _vm.removeXml()
                    }
                  }
                },
                [_c("v-icon", { attrs: { left: "" } }, [_vm._v("mdi-delete")])],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          !_vm.xmlNotLoaded && !_vm.xmlLoading
            ? _c("v-text-field", {
                attrs: { value: _vm.xmlPath, label: "XML path", readonly: "" }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.showWarning
            ? _c("v-alert", { attrs: { type: "warning" } }, [
                _vm._v(_vm._s(_vm.warning))
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.showError
            ? _c("v-alert", { attrs: { type: "error" } }, [
                _vm._v(_vm._s(_vm.error))
              ])
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-card-actions",
        [
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              attrs: { text: "", disabled: _vm.showError },
              on: {
                click: function($event) {
                  return _vm.loadProject()
                }
              }
            },
            [
              _vm._v(
                _vm._s(
                  _vm.$t("DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_UPLOAD")
                )
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              attrs: { text: "" },
              on: {
                click: function($event) {
                  return _vm.close()
                }
              }
            },
            [
              _vm._v(
                _vm._s(
                  _vm.$t("DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_CLOSE")
                )
              )
            ]
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

/***/ 1635:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_LoadProject_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1636);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_LoadProject_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1636:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1631);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1637);
/* harmony import */ var _libraries_utils_generate_project_json_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1638);
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






/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'LoadProject',

	data() {
		return {
			nameOwnProject: null,
			svgOwnProjectString: null,
			xmlOwnProjectString: null,

			svgPath: null,
			xmlPath: null,

			svgDocument: null,
			xmlParsed: null,
			showWarning: false,
			warning: null,
			showError: false,
			error: null,

			svgNotLoaded: true,
			svgLoading: false,

			xmlNotLoaded: true,
			xmlLoading: false
		};
	},

	methods: {
		/**
		 * Load the SVG file from local disk
		 */
		async addSvg() {
			let files = await this.studio.filesystem.openImportDialog({
				title:'Import SVG',
				filetypes:['svg']
			});

			if (files) {
				this.svgLoading = true;
				this.svgNotLoaded = false;

				this.svgPath = files[0].name;

				let fileData = await this.studio.filesystem.readImportFile (files[0]);

				this.svgOwnProjectString = fileData.toString();

				this.svgLoading = false;

				if (this.xmlOwnProjectString) {
					this.checkXmlAndSvg();
				}
			}
		},

		/**
		 * Remove the SVG file loaded
		 */
		removeSvg() {
			this.svgOwnProjectString = null;
			this.svgDocument = null;

			this.svgNotLoaded = true;
			this.svgLoading = false;
		},

		/**
		 * Load the XML file from local disk
		 */
		async addXml() {
			let files = await this.studio.filesystem.openImportDialog({
				title:'Import XML',
				filetypes:['xml']
			});

			if (files.length) {
				this.xmlLoading = true;
				this.xmlNotLoaded = false;

				this.xmlPath = files[0].name;

				let fileData = await this.studio.filesystem.readImportFile (files[0]);

				this.xmlOwnProjectString = fileData.toString();

				this.xmlLoading = false;

				if (this.svgOwnProjectString) {
					this.checkXmlAndSvg();
				}
			}
		},

		/**
		 * Remove the XML file loaded
		 */
		removeXml() {
			this.xmlOwnProjectString = null;
			this.xmlDocument = null;

			this.xmlNotLoaded = true;
			this.xmlLoading = false;
		},

		/**
		 * Check the SVG and the XML match
		 */
		checkXmlAndSvg() {
			this.warning = null;
			this.showWarning = false;
			this.error = null;
			this.showError = false;

			let dom = new DOMParser;
			this.svgDocument = dom.parseFromString(this.svgOwnProjectString, 'image/svg+xml').documentElement;
			let xmlDocument = dom.parseFromString(this.xmlOwnProjectString, 'image/svg+xml').documentElement;
			this.xmlParsed = Object(_libraries_utils_generate_project_json_js__WEBPACK_IMPORTED_MODULE_2__["default"])(xmlDocument);

			let svgMatchXml = true;
			for (let component of Object.keys(this.xmlParsed.components)) {
				if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.svgDocument).find('g[partID="' + component + '"]').length === 0) {
					svgMatchXml = false;
				}
			}
			
			if (svgMatchXml === false) {
				this.error = 'The SVG file does not match the XML file!';
				this.showError = true;
			} else if (this.xmlParsed.warning === 'incomplete') {
				this.warning = 'Your circuit is NOT complete! Some components might not work, so please check again your circuit!';
				this.showWarning = true;
			} else {
				this.warning = null;
				this.showWarning = false;
			}
		},

		/**
		 * Save the name, the SVG and the XML files in the project data
		 */
		loadProject() {
			if (this.xmlParsed === null) {
				this.showWarning = false;
				this.warning = 'The XML file is not loaded!';
				this.showWarning = true;
			} else if (this.svgDocument === null) {
				this.showWarning = false;
				this.warning = 'The SVG file is not loaded!';
				this.showWarning = true;
			} else {
				if (this.nameOwnProject === '' || this.nameOwnProject === null) {
					this.nameOwnProject = 'My Project';
				}

				_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_1__["default"].ownProject.name = this.nameOwnProject;
				_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_1__["default"].ownProject.svg = this.svgDocument;
				_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_1__["default"].ownProject.xml = this.xmlParsed;

				this.close('load');
			}
		},

		/**
		 * Close the dialog
		 */
		close(object) {
			this.$root.$emit ('submit', object);
		}
	}
});


/***/ }),

/***/ 1637:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1631);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _generate_project_json_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1638);
/* harmony import */ var _update_components_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1640);





let generic_raspberrypi = {
	name: 'Raspberry Pi 3 Model B v1.2',

	nameStartingProject: 'testLed',

	// Generic data
	startingNameForTutorials: 'test',
	svgGenericPath: './plugins/simulators/raspberrypi/data/schematics/svg/',
	xmlGenericPath: './plugins/simulators/raspberrypi/data/schematics/xml/',

	// Data about the project loaded at the moment
	nameLoaded: null,
	svgLoaded: null,
	dataLoaded: null,

	// Data about the project loaded by the user
	ownProject: {
		name: null,
		svg: null,
		xml: null,
	},

	// Generic data about RaspberryPi pins
	vccPins: [0, 1, 3, 16],
	gndPins: [5, 8, 13, 19, 24, 29, 33, 38],
	pwmPins: [31, 32, 34],
	i2cPins: [2, 4],

	// Colors dictionary for HSL format
	ledColors: {
		'red': 0,
		'orange': 37,
		'yellow': 58,
		'green': 117,
		'blue': 230
	},

	// The pins for the RaspberryPi
	pins: {
		0: {
			name: '3.3V',
			states: ['3.3']
		},
		1: {
			name: '5V',
			states: ['5']
		},
		2: {
			name: 'GIPO2',
			states: ['IN', 'OUT', 'I2C_SDA']
		},
		3: {
			name: '5V',
			states: ['5']
		},
		4: {
			name: 'GIPO3',
			states: ['IN', 'OUT', 'I2C_SCL']
		},
		5: {
			name: 'GND',
			states: ['0']
		},
		6: {
			name: 'GIPO4',
			states: ['IN', 'OUT', 'SPI_CLK']
		},
		7: {
			name: 'GIPO14',
			states: ['IN', 'OUT']
		},
		8: {
			name: 'GND',
			states: ['0']
		},
		9: {
			name: 'GIPO15',
			states: ['IN', 'OUT']
		},


		10: {
			name: 'GIPO17',
			states: ['IN', 'OUT']
		},
		11: {
			name: 'GIPO18',
			states: ['IN', 'OUT', 'SPI_CLK', 'PWM']
		},
		12: {
			name: 'GIPO27',
			states: ['IN', 'OUT']
		},
		13: {
			name: 'GND',
			states: ['0']
		},
		14: {
			name: 'GIPO22',
			states: ['IN', 'OUT']
		},
		15: {
			name: 'GIPO23',
			states: ['IN', 'OUT']
		},
		16: {
			name: '3.3V',
			states: ['3.3']
		},
		17: {
			name: 'GIPO24',
			states: ['IN', 'OUT']
		},
		18: {
			name: 'GIPO10',
			states: ['IN', 'OUT', 'SPI_MOSI']
		},
		19: {
			name: 'GND',
			states: ['0']
		},


		20: {
			name: 'GIPO9',
			states: ['IN', 'OUT', 'SPI_MOSI']
		},
		21: {
			name: 'GIPO25',
			states: ['IN', 'OUT']
		},
		22: {
			name: 'GIPO11',
			states: ['IN', 'OUT', 'SPI_CLK']
		},
		23: {
			name: 'GIPO8',
			states: ['IN', 'OUT', 'SPI_SS']
		},
		24: {
			name: 'GND',
			states: ['0']
		},
		25: {
			name: 'GIPO7',
			states: ['IN', 'OUT', 'SPI_SS']
		},
		26: {
			name: 'ID_SD',
			states: ['I2C_SDA']
		},
		27: {
			name: 'ID_SC',
			states: ['I2C_SCL']
		},
		28: {
			name: 'GIPO5',
			states: ['IN', 'OUT', 'SPI_CLK']
		},
		29: {
			name: 'GND',
			states: ['0']
		},


		30: {
			name: 'GIPO6',
			states: ['IN', 'OUT', 'SPI_CLK']
		},
		31: {
			name: 'GIPO12',
			states: ['IN', 'OUT', 'PWM']
		},
		32: {
			name: 'GIPO13',
			states: ['IN', 'OUT', 'PWM']
		},
		33: {
			name: 'GND',
			states: ['0']
		},
		34: {
			name: 'GIPO19',
			states: ['IN', 'OUT', 'PWM']
		},
		35: {
			name: 'GIPO16',
			states: ['IN', 'OUT']
		},
		36: {
			name: 'GIPO26',
			states: ['IN', 'OUT']
		},
		37: {
			name: 'GIPO20',
			states: ['IN', 'OUT']
		},
		38: {
			name: 'GND',
			states: ['0']
		},
		39: {
			name: 'GIPO21',
			states: ['IN', 'OUT']
		}
	},

	/**
	 * Return the GPIO number of the pin
	 * @param  {Integer} pinNumber The pin number on the RaspberryPi
	 */
	parsePinToGpio(pinNumber) {
		return this.pins[pinNumber].name.substr(4);
	},

	/**
	 * Return the number of the pin
	 * @param  {Integer} pinGpio The GPIO pin on the RaspberryPi
	 */
	parseGpioToPin(pinGpio) {
		for (let pin of Object.keys(this.pins)) {
			if (this.pins[pin].name === 'GIPO' + pinGpio.toString()) {
				return pin;
			}
		}
	},

	/**
	 * Set the color and the value of the led
	 * @param  {String} component The id of the led
	 * @param  {Integer} value The value that the led should have, '0' of '1'
	 */
	setLed: function(component, value) {
		if (value) {
			this.dataLoaded.components[component].active = true;
			jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.querySelector('#raspberrypi_svg').firstElementChild).find('g[partID="' + component + '"] #color_path32').css({ fill: 'hsl(' + this.ledColors[this.dataLoaded.components[component].color] + ', 100%, 50%)' });
		} else {
			this.dataLoaded.components[component].active = false;
			jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.querySelector('#raspberrypi_svg').firstElementChild).find('g[partID="' + component + '"] #color_path32').css({ fill: 'hsl(' + this.ledColors[this.dataLoaded.components[component].color] + ', 25%, 50%)' });
		}
	},

	/**
	 * Set the functions of the button
	 * @param  {String} component The id of the button
	 */
	setButton: function(component) {
		this.dataLoaded.components[component].active = false;

		// Function for pressing the button
		jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.querySelector('#raspberrypi_svg').firstElementChild).find('g[partID="' + component + '"]').on('mousedown', () => {
			this.dataLoaded.components[component].active = true;
			Object(_update_components_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
		});

		// Function for releasing the button
		jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.querySelector('#raspberrypi_svg').firstElementChild).find('g[partID="' + component + '"]').on('mouseup', () => {
			this.dataLoaded.components[component].active = false;
			Object(_update_components_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
		});

		// Function for leveaing the area of the button
		jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.querySelector('#raspberrypi_svg').firstElementChild).find('g[partID="' + component + '"]').on('mouseleave', () => {
			this.dataLoaded.components[component].active = false;
			Object(_update_components_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
		});

		// Change the cursor style if hover the button
		jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.querySelector('#raspberrypi_svg').firstElementChild).find('g[partID="' + component + '"]').css('cursor', 'pointer');
	},

	/**
	 * Set the LCD to the initial state
	 * @param  {String} component The id of the LCD
	 */
	setLcd: function(component) {
		this.dataLoaded.components[component].text = '';
		this.dataLoaded.components[component].cursor = true;
		this.dataLoaded.components[component].blink = true;
		this.dataLoaded.components[component].curCol = 0;
		this.dataLoaded.components[component].curRow = 0;
		this.dataLoaded.components[component].shift = 0;
		this.dataLoaded.components[component].segments = [['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']];
	},

	/**
	 * Reset the variables needed to be reseted in the project JSON
	 */
	setDefault: function() {
		this.dataLoaded.assignedPins = [];

		for (let pin of Object.keys(this.dataLoaded.pins)) {

			// Choose only the GPIO pins
			if (pin !== '3v3' && pin !== '5v' && pin !== 'gnd') {
				this.dataLoaded.pins[pin].activeLow = false;
				this.dataLoaded.pins[pin].value = 0;
				this.dataLoaded.pins[pin].state = 'in';

				for (let component of this.dataLoaded.pins[pin].components) {
					this.dataLoaded.components[component].active = false;

					if (this.dataLoaded.components[component].name === 'led') {
						this.setLed(component, 0);
					}
				}
			}
		}

		// Reset the state of the LCD
		for (let component of Object.keys(this.dataLoaded.components)) {
			if (this.dataLoaded.components[component].name === 'lcd') {
				this.setLcd(component);
			}
		}

		Object(_update_components_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
	},

	/**
	 * Load the SVG, parse the XML and set to default the components
	 * @param  {String} name The name of the project to load
	 */
	loadProject: function(name) {
		try {
			this.nameLoaded = name;

			if (name.indexOf(this.startingNameForTutorials) !== 0) {
				if (document.getElementById('raspberrypi_svg').firstElementChild === null) {
					document.getElementById('raspberrypi_svg').appendChild(this.ownProject.svg);
				} else {
					document.getElementById('raspberrypi_svg').replaceChild(this.ownProject.svg, document.getElementById('raspberrypi_svg').firstElementChild);
				}

				// Save the SVG document
				this.svgLoaded = this.ownProject.svg;
				this.dataLoaded = this.ownProject.xml;
			} else {

				// Load SVG file
				let svgPath = this.svgGenericPath + name + '.svg';
				let xhrSvg = new XMLHttpRequest();

				xhrSvg.open('GET', svgPath, false);
				xhrSvg.overrideMimeType('image/svg+xml');
				xhrSvg.send('');

				// Put SVG file in HTML component
				if (document.getElementById('raspberrypi_svg').firstElementChild === null) {
					document.getElementById('raspberrypi_svg').appendChild(xhrSvg.responseXML.documentElement);
				} else {
					document.getElementById('raspberrypi_svg').replaceChild(xhrSvg.responseXML.documentElement, document.getElementById('raspberrypi_svg').firstElementChild);
				}

				// Save the SVG document
				this.svgLoaded = xhrSvg.responseXML.documentElement;

				// Load XML file
				let xmlPath = this.xmlGenericPath + name + '.xml';
				let xhrXml = new XMLHttpRequest();

				xhrXml.open('GET', xmlPath, false);
				xhrXml.overrideMimeType('image/svg+xml');
				xhrXml.send('');

				// Parse XML file and save the JSON generated
				this.dataLoaded = Object(_generate_project_json_js__WEBPACK_IMPORTED_MODULE_1__["default"])(xhrXml.responseXML.documentElement);
			}

			// Initialize the components
			for (let component of Object.keys(this.dataLoaded.components)) {
				if (this.dataLoaded.components[component].valid) {
					if (this.dataLoaded.components[component].name === 'led') {
						this.setLed(component, 0);
					} else if (this.dataLoaded.components[component].name === 'button') {
						this.setButton(component);
					} else if (this.dataLoaded.components[component].name === 'lcd') {
						this.setLcd(component);
					}
				}
			}
		} catch(e) {
			// TODO show notification
			/* eslint-disable-next-line no-console */
			console.log(e);
		}
	}
};

/* harmony default export */ __webpack_exports__["default"] = (generic_raspberrypi);

/***/ }),

/***/ 1638:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return generate_project_json; });
/* harmony import */ var _xml2json_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1639);
/* harmony import */ var _generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1637);



/**
 * Parse the XML file, and generate the JSON associated
 * @param  {String} xml The XML file to be parsed
 * @param  {String} name The name of the project to load
 */
function generate_project_json(xml) {
	let projectJson = {};
	let nrOfComponents = 0;
	let netArray = Object(_xml2json_js__WEBPACK_IMPORTED_MODULE_0__["default"])(xml).net;

	// Array of the connections, with the first position taken by the connections that
	// don't include directly the RaspberryPi
	let connections = [{
		name: 'wire',
		components: []
	}];

	// The object that includes the components list
	let components = {};

	// Create the list of the components and the connections list
	for (let net of netArray) {
		if (net.connector.length > 1) {
			let connection = {
				name: null,
				components: []
			};

			// Take every connection one by one
			for (let connector of net.connector) {

				// If the title is 'Raspberry Pi 3', it means it is a direct connection to the Pi
				if (connector.part.attributes.title === 'Raspberry Pi 3') {
					connection.name = connector.attributes.name;
				} else {
					
					// Add the component to the list of components for every connection
					if (connection.components.indexOf(connector.part.attributes.id) === -1) {
						connection.components.push(connector.part.attributes.id);
					}

					// Check if the component already exist in the general list of components
					if (Object.keys(components).indexOf(connector.part.attributes.id) === -1) {

						// Add a component to the general list of components
						let component = {
							name: null,
							active: null,
							valid: null
						};

						component.active = false;
						component.valid = true;

						if (connector.part.attributes.title.toLowerCase().includes('led')) {
							component.name = 'led';
							component.color = connector.part.attributes.title.toLowerCase().split(' ')[0];
						} else if (connector.part.attributes.title.toLowerCase().includes('button')) {
							component.name = 'button';
						} else if (connector.part.attributes.title.toLowerCase().includes('pot')) {
							component.name = 'potentiometer';
						} else if (connector.part.attributes.title.toLowerCase().includes('lcd')) {
							component.name = 'lcd';
							component.segments = [['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']];
							component.cursor = true;
							component.blink = true;
							component.curCol = 0;
							component.curRow = 0;
							component.shift = 0;
						}

						components[connector.part.attributes.id] = component;

						nrOfComponents ++;
					}
				}
			}

			// Set a name for the connections not directly attached to the Raspberry Pi
			if (connection.name === null) {
				connections[0].components.push({
					start: connection.components[0],
					finish: connection.components[1]
				});
			} else {
				connections.push(connection);
			}
		}
	}

	// Create RaspberryPi pins JSON with the first component associated
	for (let connection of connections) {
		let newPinObject = {
			id: null,
			value: null,
			edge: null,
			state: null,
			activeLow: null,
			circuitInterruption: null,
			components: []
		};

		// Case for connections that are attached to a GPIO pin
		if ((connection.name.toLowerCase().includes('gipo') ||  connection.name.toLowerCase().includes('gpio')) &&
			connection.components.length > 0) {
			newPinObject.value = 0;
			newPinObject.edge = 'none';
			newPinObject.state = 'in';
			newPinObject.activeLow = false;
			newPinObject.circuitInterruption = false;
			newPinObject.components.push(connection.components[0]);

			// Find the number of the pin with the given name 
			// GPIOx where 'x' is replaced by a number
			for (let pin of Object.keys(_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_1__["default"].pins)) {
				if (_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_1__["default"].pins[pin].name === 'GIPO' + connection.name.substr(4)) {
					newPinObject.id = pin;
					projectJson[pin] = newPinObject;
					break;
				}
			}

		// Case for connections that are attached to a 3V3 pin
		} else if (connection.name.toLowerCase().includes('3v3') &&
					connection.components.length > 0) {
			newPinObject.id = '3v3';
			newPinObject.value = 1;
			newPinObject.state = 'out';
			newPinObject.circuitInterruption = false;

			// Make a list with all the components associated to the 3V3 pin
			for (let component of connection.components) {
				newPinObject.components.push(component);
			}

			// Save the new pin in the JSON for all the pins
			projectJson[newPinObject.id] = newPinObject;

		// Case for connections that are attached to a 5V pin
		} else if (connection.name.toLowerCase().includes('5v') &&
					connection.components.length > 0) {
			newPinObject.id = '5v';
			newPinObject.value = 1;
			newPinObject.state = 'out';
			newPinObject.circuitInterruption = false;

			// Make a list with all the components associated to the 5V pin
			for (let component of connection.components) {
				newPinObject.components.push(component);
			}

			// Save the new pin in the JSON for all the pins
			projectJson[newPinObject.id] = newPinObject;

		// Case for connections that are attached to a GND pin
		} else if (connection.name.toLowerCase().includes('gnd') &&
					connection.components.length > 0) {
			newPinObject.id = 'gnd';
			newPinObject.value = 0;
			newPinObject.state = 'in';
			newPinObject.circuitInterruption = false;

			// Make a list with all the components associated to the GND pin
			for (let component of connection.components) {
				newPinObject.components.push(component);
			}

			// Save the new pin in the JSON for all the pins
			projectJson[newPinObject.id] = newPinObject;
		}
	}

	// Add the rest of the components, the ones that are not directly connected to the RaspberryPi
	let i = 0;
	while (connections[0].components.length > 0 && i < nrOfComponents) {
		for (let component of connections[0].components) {
			for (let pin of Object.keys(projectJson)) {

				// Check if there is a component from the pair (<start>, <finish>) that is attached
				// to this pin. If so, add the other component, the one that is not attached
				if (projectJson[pin].components.indexOf(component.start) !== -1) {
					if (components[component.finish].name === 'button') {
						projectJson[pin].circuitInterruption = true;
					}

					projectJson[pin].components.push(component.finish);
					connections[0].components.splice(connections[0].components.indexOf(component), 1);
				} else if (projectJson[pin].components.indexOf(component.finish) !== -1) {
					if (components[component.start].name === 'button') {
						projectJson[pin].circuitInterruption = true;
					}

					projectJson[pin].components.push(component.start);
					connections[0].components.splice(connections[0].components.indexOf(component), 1);
				}
			}
		}

		i ++;
	}
	
	// Check if all the components have at least 2 pins connected to the RaspberryPi
	let warning = null;
	for (let component of Object.keys(components)) {

		// Find the numbers of occurences of the component
		let pins = [];
		for (let pin of Object.keys(projectJson)) {
			if (projectJson[pin].components.indexOf(component) !== -1) {
				pins.push(pin);
			}
		}

		// The number of occurences has to be at least 2
		if (components[component].name !== 'lcd') {
			if (pins.length < 2) {
				components[component].valid = false;
				warning = 'incomplete';
			}
		} else {
			if (pins.length < 6) {
				components[component].valid = false;
				warning = 'incomplete';
			}
		}
	}

	return {
		components: components,
		pins: projectJson,
		assignedPins: [],
		warning: warning
	};
}

/***/ }),

/***/ 1639:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return xml2json; });
function xml2json(xml) {
	
	// Create the return object
	let obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
			obj['attributes'] = {};

			for (let j = 0; j < xml.attributes.length; j++) {
				let attribute = xml.attributes.item(j);
				obj['attributes'][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(let i = 0; i < xml.childNodes.length; i++) {
			let item = xml.childNodes.item(i);
			let nodeName = item.nodeName;

			if (typeof(obj[nodeName]) === 'undefined') {
				obj[nodeName] = xml2json(item);
			} else {
				if (typeof(obj[nodeName].push) === 'undefined') {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}

				obj[nodeName].push(xml2json(item));
			}
		}
	}

	return obj;
}

/***/ }),

/***/ 1640:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return update_components; });
/* harmony import */ var _generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1637);


function update_components() {
	for (let pin of Object.keys(_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins)) {
		if (_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[pin].state === 'out') {
			let validCircuit = true;
			for (let component of _generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[pin].components) {
				if (_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].valid === false) {
					validCircuit = false;
					break;
				}
			}

			if (validCircuit) {
				let closedCircuit = true;
				for (let component of _generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[pin].components) {
					if (_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].active === false &&
						_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].name === 'button') {
						closedCircuit = false;
					}
				}

				if (closedCircuit) {
					for (let component of _generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[pin].components) {
						if (_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].name === 'led') {
							_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].setLed(component, _generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[pin].value);
						}
					}
				} else {
					for (let component of _generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[pin].components) {
						if (_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].name === 'led') {
							_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].setLed(component, 0);
						}
					}
				}
			}
		}
	}

	for (let component of Object.keys(_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components)) {
		if (_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].name === 'lcd') {
			for (let i = 0; i < 16; i ++) {
				if (_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].segments[0][i + _generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].shift] === undefined) {
					document.getElementById('segment ' + 0 + '-' + i).innerHTML = '';
				} else {
					document.getElementById('segment ' + 0 + '-' + i).innerHTML = _generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].segments[0][i + _generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].shift];
				}

				if (_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].segments[1][i + _generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].shift] === undefined) {
					document.getElementById('segment ' + 1 + '-' + i).innerHTML = '';
				} else {
					document.getElementById('segment ' + 1 + '-' + i).innerHTML = _generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].segments[1][i + _generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].shift];
				}
			}
		}
	}
}

/***/ }),

/***/ 1641:
/***/ (function(module) {

module.exports = JSON.parse("[\"test3Leds.svg\",\"test5Leds.svg\",\"testLcd.svg\",\"testLcdAnd2ButtonsAnd2Leds.svg\",\"testLcdAndButton.svg\",\"testLed.svg\",\"testLedAndButton.svg\"]");

/***/ }),

/***/ 1642:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RaspberrypiSimulator_vue_vue_type_style_index_0_id_13c778f9_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1643);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RaspberrypiSimulator_vue_vue_type_style_index_0_id_13c778f9_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RaspberrypiSimulator_vue_vue_type_style_index_0_id_13c778f9_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RaspberrypiSimulator_vue_vue_type_style_index_0_id_13c778f9_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RaspberrypiSimulator_vue_vue_type_style_index_0_id_13c778f9_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RaspberrypiSimulator_vue_vue_type_style_index_0_id_13c778f9_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1643:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1644);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("6c097a2d", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 1644:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".w-100[data-v-13c778f9] {\n  width: 100%;\n}\n.w-90[data-v-13c778f9] {\n  width: 90%;\n}\n.w-80[data-v-13c778f9] {\n  width: 80%;\n}\n.w-70[data-v-13c778f9] {\n  width: 70%;\n}\n.w-60[data-v-13c778f9] {\n  width: 60%;\n}\n.w-50[data-v-13c778f9] {\n  width: 50%;\n}\n.w-40[data-v-13c778f9] {\n  width: 40%;\n}\n.w-30[data-v-13c778f9] {\n  width: 30%;\n}\n.w-20[data-v-13c778f9] {\n  width: 20%;\n}\n.w-10[data-v-13c778f9] {\n  width: 10%;\n}\n.hs-0[data-v-13c778f9] {\n  height: 0% !important;\n}\n.hs-35[data-v-13c778f9] {\n  height: 35% !important;\n}\n.hs-65[data-v-13c778f9] {\n  height: 65% !important;\n}\n.hs-100[data-v-13c778f9] {\n  height: calc(100vh - 158px) !important;\n}\n.rel[data-v-13c778f9] {\n  position: relative;\n}\n.text-center[data-v-13c778f9] {\n  text-align: center;\n}\n.text-left[data-v-13c778f9] {\n  text-align: left;\n}\n.text-right[data-v-13c778f9] {\n  text-align: right;\n}\n.h-top[data-v-13c778f9] {\n  height: calc(100vh - 90px);\n}\n.h-top2[data-v-13c778f9] {\n  height: calc(100vh - 158px);\n}\n.left[data-v-13c778f9] {\n  float: left !important;\n}\n.right[data-v-13c778f9] {\n  float: right !important;\n}\n.p-20[data-v-13c778f9] {\n  padding: 20px;\n}\n.sim-box[data-v-13c778f9] {\n  text-align: center;\n  padding-top: 30px;\n  padding-left: 50px;\n}\n.sim-box .checkm-box[data-v-13c778f9] {\n  max-width: 250px;\n  text-align: center;\n  margin: auto;\n  padding-left: 30px;\n}\n.sim-box .checkm-box .v-input--checkbox[data-v-13c778f9] {\n  float: left;\n  margin-right: 15px;\n}\n.rpi-sim[data-v-13c778f9] {\n  margin: auto;\n  position: relative;\n}\n.rpi-sim canvas[data-v-13c778f9] {\n  position: absolute;\n  left: 75px;\n  top: 66px;\n}\n.val-container[data-v-13c778f9] {\n  overflow: auto;\n  padding: 20px;\n  max-height: 100%;\n}\n.val-container > div[data-v-13c778f9] {\n  width: 100%;\n  display: inline-table;\n}\n.val-box[data-v-13c778f9] {\n  border: #eeeeee 1px solid;\n  background: #eeeeee;\n  padding: 55px 30px 0px;\n  position: relative;\n  margin-top: 20px;\n}\n.val-box span[data-v-13c778f9] {\n  position: absolute;\n  margin: auto;\n  display: inline-table;\n  left: 0;\n  right: 0;\n  top: -20px;\n  background: #eeeeee;\n  padding: 10px 30px;\n  font-size: 14px;\n  font-weight: bold;\n}\n.val-box .v-input__slider[data-v-13c778f9] {\n  margin-bottom: 15px;\n}\n.val-box2[data-v-13c778f9] {\n  border: #eeeeee 1px solid;\n  background: #eeeeee;\n  padding: 35px 30px 0px;\n  position: relative;\n  margin-top: 20px;\n}\n.val-box2 span[data-v-13c778f9] {\n  position: absolute;\n  margin: auto;\n  display: inline-table;\n  left: 0;\n  right: 0;\n  top: -20px;\n  background: #eeeeee;\n  padding: 10px 30px;\n  font-size: 14px;\n  font-weight: bold;\n}\n.val-box2 .v-input__slider[data-v-13c778f9] {\n  margin-bottom: 15px;\n}\n#lcd_display g[data-v-13c778f9] {\n  left: 43px !important;\n  top: 289px !important;\n}\naside[data-v-13c778f9] {\n  height: calc(100% - 68px) !important;\n}\naside .v-list-item__avatar[data-v-13c778f9] {\n  margin-bottom: 20px !important;\n  margin-top: 20px !important;\n  margin-right: 20px !important;\n}\naside .v-list-item[data-v-13c778f9] {\n  border-bottom: #324b50 solid 1px;\n}\naside .v-btn:not(.v-btn--round).v-size--default[data-v-13c778f9] {\n  height: auto;\n  min-width: 64px;\n  padding: 16px 16px;\n  width: 50%;\n  float: left;\n  border-radius: 0;\n  background: #191e25 !important;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 1645:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable */

/**
 * @license
 * JavaScript Interpreter
 *
 * Copyright 2013 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Interpreting JavaScript in JavaScript.
 * @author fraser@google.com (Neil Fraser)
 */


/**
 * Create a new interpreter.
 * @param {string|!Object} code Raw JavaScript text or AST.
 * @param {Function=} opt_initFunc Optional initialization function.  Used to
 *     define APIs.  When called it is passed the interpreter object and the
 *     global scope object.
 * @constructor
 */

var acorn = __webpack_require__(1646);

var Interpreter = function(code, opt_initFunc) {
	if (typeof code === 'string') {
		code = acorn.parse(code, Interpreter.PARSE_OPTIONS);
	}
	this.ast = code;
	this.initFunc_ = opt_initFunc;
	this.paused_ = false;
	this.polyfills_ = [];
	// Unique identifier for native functions.  Used in serialization.
	this.functionCounter_ = 0;
	// Map node types to our step function names; a property lookup is faster
	// than string concatenation with "step" prefix.
	this.stepFunctions_ = Object.create(null);
	var stepMatch = /^step([A-Z]\w*)$/;
	var m;
	for (var methodName in this) {
		if ((typeof this[methodName] === 'function') &&
        (m = methodName.match(stepMatch))) {
			this.stepFunctions_[m[1]] = this[methodName].bind(this);
		}
	}
	// Create and initialize the global scope.
	this.global = this.createScope(this.ast, null);
	// Run the polyfills.
	this.ast = acorn.parse(this.polyfills_.join('\n'), Interpreter.PARSE_OPTIONS);
	this.polyfills_ = undefined;  // Allow polyfill strings to garbage collect.
	this.stripLocations_(this.ast, undefined, undefined);
	var state = new Interpreter.State(this.ast, this.global);
	state.done = false;
	this.stateStack = [state];
	this.run();
	this.value = undefined;
	// Point at the main program.
	this.ast = code;
	var state = new Interpreter.State(this.ast, this.global);
	state.done = false;
	this.stateStack.length = 0;
	this.stateStack[0] = state;
	// Get a handle on Acorn's node_t object.  It's tricky to access.
	this.nodeConstructor = state.node.constructor;
	// Preserve publicly properties from being pruned/renamed by JS compilers.
	// Add others as needed.
	this['stateStack'] = this.stateStack;
};

/**
 * @const {!Object} Configuration used for all Acorn parsing.
 */
Interpreter.PARSE_OPTIONS = {
	ecmaVersion: 5
};

/**
 * Property descriptor of readonly properties.
 */
Interpreter.READONLY_DESCRIPTOR = {
	configurable: true,
	enumerable: true,
	writable: false
};

/**
 * Property descriptor of non-enumerable properties.
 */
Interpreter.NONENUMERABLE_DESCRIPTOR = {
	configurable: true,
	enumerable: false,
	writable: true
};

/**
 * Property descriptor of readonly, non-enumerable properties.
 */
Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR = {
	configurable: true,
	enumerable: false,
	writable: false
};

/**
 * Property descriptor of variables.
 */
Interpreter.VARIABLE_DESCRIPTOR = {
	configurable: false,
	enumerable: true,
	writable: true
};

/**
 * Unique symbol for indicating that a step has encountered an error, has
 * added it to the stack, and will be thrown within the user's program.
 * When STEP_ERROR is thrown in the JS-Interpreter, the error can be ignored.
 */
Interpreter.STEP_ERROR = {'STEP_ERROR': true};

/**
 * Unique symbol for indicating that a reference is a variable on the scope,
 * not an object property.
 */
Interpreter.SCOPE_REFERENCE = {'SCOPE_REFERENCE': true};

/**
 * Unique symbol for indicating, when used as the value of the value
 * parameter in calls to setProperty and friends, that the value
 * should be taken from the property descriptor instead.
 */
Interpreter.VALUE_IN_DESCRIPTOR = {'VALUE_IN_DESCRIPTOR': true};

/**
 * Unique symbol for indicating that a RegExp timeout has occurred in a VM.
 */
Interpreter.REGEXP_TIMEOUT = {'REGEXP_TIMEOUT': true};

/**
 * For cycle detection in array to string and error conversion;
 * see spec bug github.com/tc39/ecma262/issues/289
 * Since this is for atomic actions only, it can be a class property.
 */
Interpreter.toStringCycles_ = [];

/**
 * Node's vm module, if loaded and required.
 * @type {Object}
 */
Interpreter.vm = null;

/**
 * Code for executing regular expressions in a thread.
 */
Interpreter.WORKER_CODE = [
	'onmessage = function(e) {',
	'var result;',
	'var data = e.data;',
	'switch (data[0]) {',
	'case \'split\':',
	// ['split', string, separator, limit]
	'result = data[1].split(data[2], data[3]);',
	'break;',
	'case \'match\':',
	// ['match', string, regexp]
	'result = data[1].match(data[2]);',
	'break;',
	'case \'search\':',
	// ['search', string, regexp]
	'result = data[1].search(data[2]);',
	'break;',
	'case \'replace\':',
	// ['replace', string, regexp, newSubstr]
	'result = data[1].replace(data[2], data[3]);',
	'break;',
	'case \'exec\':',
	// ['exec', regexp, lastIndex, string]
	'var regexp = data[1];',
	'regexp.lastIndex = data[2];',
	'result = [regexp.exec(data[3]), data[1].lastIndex];',
	'break;',
	'default:',
	'throw \'Unknown RegExp operation: \' + data[0];',
	'}',
	'postMessage(result);',
	'};'];

/**
 * Some pathological regular expressions can take geometric time.
 * Regular expressions are handled in one of three ways:
 * 0 - throw as invalid.
 * 1 - execute natively (risk of unresponsive program).
 * 2 - execute in separate thread (not supported by IE 9).
 */
Interpreter.prototype.REGEXP_MODE = 2;

/**
 * If REGEXP_MODE = 2, the length of time (in ms) to allow a RegExp
 * thread to execute before terminating it.
 */
Interpreter.prototype.REGEXP_THREAD_TIMEOUT = 1000;

/**
 * Add more code to the interpreter.
 * @param {string|!Object} code Raw JavaScript text or AST.
 */
Interpreter.prototype.appendCode = function(code) {
	var state = this.stateStack[0];
	if (!state || state.node['type'] !== 'Program') {
		throw Error('Expecting original AST to start with a Program node.');
	}
	if (typeof code === 'string') {
		code = acorn.parse(code, Interpreter.PARSE_OPTIONS);
	}
	if (!code || code['type'] !== 'Program') {
		throw Error('Expecting new AST to start with a Program node.');
	}
	this.populateScope_(code, state.scope);
	// Append the new program to the old one.
	for (var i = 0, node; (node = code['body'][i]); i++) {
		state.node['body'].push(node);
	}
	state.done = false;
};

/**
 * Execute one step of the interpreter.
 * @return {boolean} True if a step was executed, false if no more instructions.
 */
Interpreter.prototype.step = function() {
	var stack = this.stateStack;
	var state = stack[stack.length - 1];
	if (!state) {
		return false;
	}
	var node = state.node, type = node['type'];
	if (type === 'Program' && state.done) {
		return false;
	} else if (this.paused_) {
		return true;
	}
	try {
		var nextState = this.stepFunctions_[type](stack, state, node);
	} catch (e) {
		// Eat any step errors.  They have been thrown on the stack.
		if (e !== Interpreter.STEP_ERROR) {
			// Uh oh.  This is a real error in the JS-Interpreter.  Rethrow.
			throw e;
		}
	}
	if (nextState) {
		stack.push(nextState);
	}
	if (!node['end']) {
		// This is polyfill code.  Keep executing until we arrive at user code.
		return this.step();
	}
	return true;
};

/**
 * Execute the interpreter to program completion.  Vulnerable to infinite loops.
 * @return {boolean} True if a execution is asynchronously blocked,
 *     false if no more instructions.
 */
Interpreter.prototype.run = function() {
	while (!this.paused_ && this.step()) {}
	return this.paused_;
};

/**
 * Initialize the global scope with buitin properties and functions.
 * @param {!Interpreter.Object} scope Global scope.
 */
Interpreter.prototype.initGlobalScope = function(scope) {
	// Initialize uneditable global properties.
	this.setProperty(scope, 'NaN', NaN,
		Interpreter.READONLY_DESCRIPTOR);
	this.setProperty(scope, 'Infinity', Infinity,
		Interpreter.READONLY_DESCRIPTOR);
	this.setProperty(scope, 'undefined', undefined,
		Interpreter.READONLY_DESCRIPTOR);
	this.setProperty(scope, 'window', scope,
		Interpreter.READONLY_DESCRIPTOR);
	this.setProperty(scope, 'this', scope,
		Interpreter.READONLY_DESCRIPTOR);
	this.setProperty(scope, 'self', scope); // Editable.

	// Create the objects which will become Object.prototype and
	// Function.prototype, which are needed to bootstrap everything else.
	this.OBJECT_PROTO = new Interpreter.Object(null);
	this.FUNCTION_PROTO = new Interpreter.Object(this.OBJECT_PROTO);
	// Initialize global objects.
	this.initFunction(scope);
	this.initObject(scope);
	// Unable to set scope's parent prior (OBJECT did not exist).
	// Note that in a browser this would be 'Window', whereas in Node.js it would
	// be 'Object'.  This interpreter is closer to Node in that it has no DOM.
	scope.proto = this.OBJECT_PROTO;
	this.setProperty(scope, 'constructor', this.OBJECT,
		Interpreter.NONENUMERABLE_DESCRIPTOR);
	this.initArray(scope);
	this.initString(scope);
	this.initBoolean(scope);
	this.initNumber(scope);
	this.initDate(scope);
	this.initRegExp(scope);
	this.initError(scope);
	this.initMath(scope);
	this.initJSON(scope);

	// Initialize global functions.
	var thisInterpreter = this;
	var func = this.createNativeFunction(
		function(x) {throw EvalError('Can\'t happen');}, false);
	func.eval = true;
	this.setProperty(scope, 'eval', func);

	this.setProperty(scope, 'parseInt',
		this.createNativeFunction(parseInt, false));
	this.setProperty(scope, 'parseFloat',
		this.createNativeFunction(parseFloat, false));

	this.setProperty(scope, 'isNaN',
		this.createNativeFunction(isNaN, false));

	this.setProperty(scope, 'isFinite',
		this.createNativeFunction(isFinite, false));

	var strFunctions = [
		[escape, 'escape'], [unescape, 'unescape'],
		[decodeURI, 'decodeURI'], [decodeURIComponent, 'decodeURIComponent'],
		[encodeURI, 'encodeURI'], [encodeURIComponent, 'encodeURIComponent']
	];
	for (var i = 0; i < strFunctions.length; i++) {
		var wrapper = (function(nativeFunc) {
			return function(str) {
				try {
					return nativeFunc(str);
				} catch (e) {
					// decodeURI('%xy') will throw an error.  Catch and rethrow.
					thisInterpreter.throwException(thisInterpreter.URI_ERROR, e.message);
				}
			};
		})(strFunctions[i][0]);
		this.setProperty(scope, strFunctions[i][1],
			this.createNativeFunction(wrapper, false),
			Interpreter.NONENUMERABLE_DESCRIPTOR);
	}
	// Preserve publicly properties from being pruned/renamed by JS compilers.
	// Add others as needed.
	this['OBJECT'] = this.OBJECT; this['OBJECT_PROTO'] = this.OBJECT_PROTO;
	this['FUNCTION'] = this.FUNCTION; this['FUNCTION_PROTO'] = this.FUNCTION_PROTO;
	this['ARRAY'] = this.ARRAY; this['ARRAY_PROTO'] = this.ARRAY_PROTO;
	this['REGEXP'] = this.REGEXP; this['REGEXP_PROTO'] = this.REGEXP_PROTO;
	this['DATE'] = this.DATE; this['DATE_PROTO'] = this.DATE_PROTO;
	// The following properties are obsolete.  Do not use.
	this['UNDEFINED'] = undefined; this['NULL'] = null; this['NAN'] = NaN;
	this['TRUE'] = true; this['FALSE'] = false; this['STRING_EMPTY'] = '';
	this['NUMBER_ZERO'] = 0; this['NUMBER_ONE'] = 1;

	// Run any user-provided initialization.
	if (this.initFunc_) {
		this.initFunc_(this, scope);
	}
};

/**
 * Initialize the Function class.
 * @param {!Interpreter.Object} scope Global scope.
 */
Interpreter.prototype.initFunction = function(scope) {
	var thisInterpreter = this;
	var wrapper;
	var identifierRegexp = /^[A-Za-z_$][\w$]*$/;
	// Function constructor.
	wrapper = function(var_args) {
		if (thisInterpreter.calledWithNew()) {
			// Called as new Function().
			var newFunc = this;
		} else {
			// Called as Function().
			var newFunc =
          thisInterpreter.createObjectProto(thisInterpreter.FUNCTION_PROTO);
		}
		if (arguments.length) {
			var code = String(arguments[arguments.length - 1]);
		} else {
			var code = '';
		}
		var argsStr = Array.prototype.slice.call(arguments, 0, -1).join(',').trim();
		if (argsStr) {
			var args = argsStr.split(/\s*,\s*/);
			for (var i = 0; i < args.length; i++) {
				var name = args[i];
				if (!identifierRegexp.test(name)) {
					thisInterpreter.throwException(thisInterpreter.SYNTAX_ERROR,
						'Invalid function argument: ' + name);
				}
			}
			argsStr = args.join(', ');
		}
		// Interestingly, the scope for constructed functions is the global scope,
		// even if they were constructed in some other scope.
		newFunc.parentScope = thisInterpreter.global;
		// Acorn needs to parse code in the context of a function or else 'return'
		// statements will be syntax errors.
		try {
			var ast = acorn.parse('(function(' + argsStr + ') {' + code + '})',
				Interpreter.PARSE_OPTIONS);
		} catch (e) {
			// Acorn threw a SyntaxError.  Rethrow as a trappable error.
			thisInterpreter.throwException(thisInterpreter.SYNTAX_ERROR,
				'Invalid code: ' + e.message);
		}
		if (ast['body'].length !== 1) {
			// Function('a', 'return a + 6;}; {alert(1);');
			thisInterpreter.throwException(thisInterpreter.SYNTAX_ERROR,
				'Invalid code in function body.');
		}
		newFunc.node = ast['body'][0]['expression'];
		thisInterpreter.setProperty(newFunc, 'length', newFunc.node['length'],
			Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
		return newFunc;
	};
	wrapper.id = this.functionCounter_++;
	this.FUNCTION = this.createObjectProto(this.FUNCTION_PROTO);

	this.setProperty(scope, 'Function', this.FUNCTION);
	// Manually setup type and prototype because createObj doesn't recognize
	// this object as a function (this.FUNCTION did not exist).
	this.setProperty(this.FUNCTION, 'prototype', this.FUNCTION_PROTO,
		Interpreter.NONENUMERABLE_DESCRIPTOR);
	this.FUNCTION.nativeFunc = wrapper;

	// Configure Function.prototype.
	this.setProperty(this.FUNCTION_PROTO, 'constructor', this.FUNCTION,
		Interpreter.NONENUMERABLE_DESCRIPTOR);
	this.FUNCTION_PROTO.nativeFunc = function() {};
	this.FUNCTION_PROTO.nativeFunc.id = this.functionCounter_++;
	this.setProperty(this.FUNCTION_PROTO, 'length', 0,
		Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);

	var boxThis = function(value) {
		// In non-strict mode 'this' must be an object.
		if ((!value || !value.isObject) && !thisInterpreter.getScope().strict) {
			if (value === undefined || value === null) {
				// 'Undefined' and 'null' are changed to global object.
				value = thisInterpreter.global;
			} else {
				// Primitives must be boxed in non-strict mode.
				var box = thisInterpreter.createObjectProto(
					thisInterpreter.getPrototype(value));
				box.data = value;
				value = box;
			}
		}
		return value;
	};

	wrapper = function(thisArg, args) {
		var state =
        thisInterpreter.stateStack[thisInterpreter.stateStack.length - 1];
		// Rewrite the current 'CallExpression' to apply a different function.
		state.func_ = this;
		// Assign the 'this' object.
		state.funcThis_ = boxThis(thisArg);
		// Bind any provided arguments.
		state.arguments_ = [];
		if (args !== null && args !== undefined) {
			if (args.isObject) {
				state.arguments_ = thisInterpreter.arrayPseudoToNative(args);
			} else {
				thisInterpreter.throwException(thisInterpreter.TYPE_ERROR,
					'CreateListFromArrayLike called on non-object');
			}
		}
		state.doneExec_ = false;
	};
	this.setNativeFunctionPrototype(this.FUNCTION, 'apply', wrapper);

	wrapper = function(thisArg /*, var_args */) {
		var state =
        thisInterpreter.stateStack[thisInterpreter.stateStack.length - 1];
		// Rewrite the current 'CallExpression' to call a different function.
		state.func_ = this;
		// Assign the 'this' object.
		state.funcThis_ = boxThis(thisArg);
		// Bind any provided arguments.
		state.arguments_ = [];
		for (var i = 1; i < arguments.length; i++) {
			state.arguments_.push(arguments[i]);
		}
		state.doneExec_ = false;
	};
	this.setNativeFunctionPrototype(this.FUNCTION, 'call', wrapper);

	this.polyfills_.push(
		// Polyfill copied from:
		// developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind
		'Object.defineProperty(Function.prototype, \'bind\',',
		'{configurable: true, writable: true, value:',
		'function(oThis) {',
		'if (typeof this !== \'function\') {',
		'throw TypeError(\'What is trying to be bound is not callable\');',
		'}',
		'var aArgs   = Array.prototype.slice.call(arguments, 1),',
		'fToBind = this,',
		'fNOP    = function() {},',
		'fBound  = function() {',
		'return fToBind.apply(this instanceof fNOP',
		'? this',
		': oThis,',
		'aArgs.concat(Array.prototype.slice.call(arguments)));',
		'};',
		'if (this.prototype) {',
		'fNOP.prototype = this.prototype;',
		'}',
		'fBound.prototype = new fNOP();',
		'return fBound;',
		'}',
		'});',
		'');

	// Function has no parent to inherit from, so it needs its own mandatory
	// toString and valueOf functions.
	wrapper = function() {
		return String(this);
	};
	this.setNativeFunctionPrototype(this.FUNCTION, 'toString', wrapper);
	this.setProperty(this.FUNCTION, 'toString',
		this.createNativeFunction(wrapper, false),
		Interpreter.NONENUMERABLE_DESCRIPTOR);
	wrapper = function() {
		return this.valueOf();
	};
	this.setNativeFunctionPrototype(this.FUNCTION, 'valueOf', wrapper);
	this.setProperty(this.FUNCTION, 'valueOf',
		this.createNativeFunction(wrapper, false),
		Interpreter.NONENUMERABLE_DESCRIPTOR);
};

/**
 * Initialize the Object class.
 * @param {!Interpreter.Object} scope Global scope.
 */
Interpreter.prototype.initObject = function(scope) {
	var thisInterpreter = this;
	var wrapper;
	// Object constructor.
	wrapper = function(value) {
		if (value === undefined || value === null) {
			// Create a new object.
			if (thisInterpreter.calledWithNew()) {
				// Called as new Object().
				return this;
			} else {
				// Called as Object().
				return thisInterpreter.createObjectProto(thisInterpreter.OBJECT_PROTO);
			}
		}
		if (!value.isObject) {
			// Wrap the value as an object.
			var box = thisInterpreter.createObjectProto(
				thisInterpreter.getPrototype(value));
			box.data = value;
			return box;
		}
		// Return the provided object.
		return value;
	};
	this.OBJECT = this.createNativeFunction(wrapper, true);
	// Throw away the created prototype and use the root prototype.
	this.setProperty(this.OBJECT, 'prototype', this.OBJECT_PROTO,
		Interpreter.NONENUMERABLE_DESCRIPTOR);
	this.setProperty(this.OBJECT_PROTO, 'constructor', this.OBJECT,
		Interpreter.NONENUMERABLE_DESCRIPTOR);
	this.setProperty(scope, 'Object', this.OBJECT);

	/**
   * Checks if the provided value is null or undefined.
   * If so, then throw an error in the call stack.
   * @param {Interpreter.Value} value Value to check.
   */
	var throwIfNullUndefined = function(value) {
		if (value === undefined || value === null) {
			thisInterpreter.throwException(thisInterpreter.TYPE_ERROR,
				'Cannot convert \'' + value + '\' to object');
		}
	};

	// Static methods on Object.
	wrapper = function(obj) {
		throwIfNullUndefined(obj);
		var props = obj.isObject ? obj.properties : obj;
		return thisInterpreter.arrayNativeToPseudo(
			Object.getOwnPropertyNames(props));
	};
	this.setProperty(this.OBJECT, 'getOwnPropertyNames',
		this.createNativeFunction(wrapper, false),
		Interpreter.NONENUMERABLE_DESCRIPTOR);

	wrapper = function(obj) {
		throwIfNullUndefined(obj);
		if (obj.isObject) {
			obj = obj.properties;
		}
		return thisInterpreter.arrayNativeToPseudo(Object.keys(obj));
	};
	this.setProperty(this.OBJECT, 'keys',
		this.createNativeFunction(wrapper, false),
		Interpreter.NONENUMERABLE_DESCRIPTOR);

	wrapper = function(proto) {
		// Support for the second argument is the responsibility of a polyfill.
		if (proto === null) {
			return thisInterpreter.createObjectProto(null);
		}
		if (proto === undefined || !proto.isObject) {
			thisInterpreter.throwException(thisInterpreter.TYPE_ERROR,
				'Object prototype may only be an Object or null');
		}
		return thisInterpreter.createObjectProto(proto);
	};
	this.setProperty(this.OBJECT, 'create',
		this.createNativeFunction(wrapper, false),
		Interpreter.NONENUMERABLE_DESCRIPTOR);

	// Add a polyfill to handle create's second argument.
	this.polyfills_.push(
		'(function() {',
		'var create_ = Object.create;',
		'Object.create = function(proto, props) {',
		'var obj = create_(proto);',
		'props && Object.defineProperties(obj, props);',
		'return obj;',
		'};',
		'})();',
		'');

	wrapper = function(obj, prop, descriptor) {
		prop = String(prop);
		if (!obj || !obj.isObject) {
			thisInterpreter.throwException(thisInterpreter.TYPE_ERROR,
				'Object.defineProperty called on non-object');
		}
		if (!descriptor || !descriptor.isObject) {
			thisInterpreter.throwException(thisInterpreter.TYPE_ERROR,
				'Property description must be an object');
		}
		if (!obj.properties[prop] && obj.preventExtensions) {
			thisInterpreter.throwException(thisInterpreter.TYPE_ERROR,
				'Can\'t define property \'' + prop + '\', object is not extensible');
		}
		// The polyfill guarantees no inheritance and no getter functions.
		// Therefore the descriptor properties map is the native object needed.
		thisInterpreter.setProperty(obj, prop, Interpreter.VALUE_IN_DESCRIPTOR,
			descriptor.properties);
		return obj;
	};
	this.setProperty(this.OBJECT, 'defineProperty',
		this.createNativeFunction(wrapper, false),
		Interpreter.NONENUMERABLE_DESCRIPTOR);

	this.polyfills_.push(
		// Flatten the descriptor to remove any inheritance or getter functions.
		'(function() {',
		'var defineProperty_ = Object.defineProperty;',
		'Object.defineProperty = function(obj, prop, d1) {',
		'var d2 = {};',
		'if (\'configurable\' in d1) d2.configurable = d1.configurable;',
		'if (\'enumerable\' in d1) d2.enumerable = d1.enumerable;',
		'if (\'writable\' in d1) d2.writable = d1.writable;',
		'if (\'value\' in d1) d2.value = d1.value;',
		'if (\'get\' in d1) d2.get = d1.get;',
		'if (\'set\' in d1) d2.set = d1.set;',
		'return defineProperty_(obj, prop, d2);',
		'};',
		'})();',

		'Object.defineProperty(Object, \'defineProperties\',',
		'{configurable: true, writable: true, value:',
		'function(obj, props) {',
		'var keys = Object.keys(props);',
		'for (var i = 0; i < keys.length; i++) {',
		'Object.defineProperty(obj, keys[i], props[keys[i]]);',
		'}',
		'return obj;',
		'}',
		'});',
		'');

	wrapper = function(obj, prop) {
		if (!obj || !obj.isObject) {
			thisInterpreter.throwException(thisInterpreter.TYPE_ERROR,
				'Object.getOwnPropertyDescriptor called on non-object');
		}
		prop = String(prop);
		if (!(prop in obj.properties)) {
			return undefined;
		}
		var descriptor = Object.getOwnPropertyDescriptor(obj.properties, prop);
		var getter = obj.getter[prop];
		var setter = obj.setter[prop];

		if (getter || setter) {
			descriptor.get = getter;
			descriptor.set = setter;
			delete descriptor.value;
			delete descriptor.writable;
		}
		// Preserve value, but remove it for the nativeToPseudo call.
		var value = descriptor.value;
		var hasValue = 'value' in descriptor;
		delete descriptor.value;
		var pseudoDescriptor = thisInterpreter.nativeToPseudo(descriptor);
		if (hasValue) {
			thisInterpreter.setProperty(pseudoDescriptor, 'value', value);
		}
		return pseudoDescriptor;
	};
	this.setProperty(this.OBJECT, 'getOwnPropertyDescriptor',
		this.createNativeFunction(wrapper, false),
		Interpreter.NONENUMERABLE_DESCRIPTOR);

	wrapper = function(obj) {
		throwIfNullUndefined(obj);
		return thisInterpreter.getPrototype(obj);
	};
	this.setProperty(this.OBJECT, 'getPrototypeOf',
		this.createNativeFunction(wrapper, false),
		Interpreter.NONENUMERABLE_DESCRIPTOR);

	wrapper = function(obj) {
		return Boolean(obj) && !obj.preventExtensions;
	};
	this.setProperty(this.OBJECT, 'isExtensible',
		this.createNativeFunction(wrapper, false),
		Interpreter.NONENUMERABLE_DESCRIPTOR);

	wrapper = function(obj) {
		if (obj && obj.isObject) {
			obj.preventExtensions = true;
		}
		return obj;
	};
	this.setProperty(this.OBJECT, 'preventExtensions',
		this.createNativeFunction(wrapper, false),
		Interpreter.NONENUMERABLE_DESCRIPTOR);

	// Instance methods on Object.
	this.setNativeFunctionPrototype(this.OBJECT, 'toString',
		Interpreter.Object.prototype.toString);
	this.setNativeFunctionPrototype(this.OBJECT, 'toLocaleString',
		Interpreter.Object.prototype.toString);
	this.setNativeFunctionPrototype(this.OBJECT, 'valueOf',
		Interpreter.Object.prototype.valueOf);

	wrapper = function(prop) {
		throwIfNullUndefined(this);
		if (!this.isObject) {
			return this.hasOwnProperty(prop);
		}
		return String(prop) in this.properties;
	};
	this.setNativeFunctionPrototype(this.OBJECT, 'hasOwnProperty', wrapper);

	wrapper = function(prop) {
		throwIfNullUndefined(this);
		if (!this.isObject) {
			return this.propertyIsEnumerable(prop);
		}
		return Object.prototype.propertyIsEnumerable.call(this.properties, prop);
	};
	this.setNativeFunctionPrototype(this.OBJECT, 'propertyIsEnumerable', wrapper);

	wrapper = function(obj) {
		while (true) {
			// Note, circular loops shouldn't be possible.
			obj = thisInterpreter.getPrototype(obj);
			if (!obj) {
				// No parent; reached the top.
				return false;
			}
			if (obj === this) {
				return true;
			}
		}
	};
	this.setNativeFunctionPrototype(this.OBJECT, 'isPrototypeOf',  wrapper);
};

/**
 * Initialize the Array class.
 * @param {!Interpreter.Object} scope Global scope.
 */
Interpreter.prototype.initArray = function(scope) {
	var thisInterpreter = this;
	var wrapper;
	// Array constructor.
	wrapper = function(var_args) {
		if (thisInterpreter.calledWithNew()) {
			// Called as new Array().
			var newArray = this;
		} else {
			// Called as Array().
			var newArray =
          thisInterpreter.createObjectProto(thisInterpreter.ARRAY_PROTO);
		}
		var first = arguments[0];
		if (arguments.length === 1 && typeof first === 'number') {
			if (isNaN(Interpreter.legalArrayLength(first))) {
				thisInterpreter.throwException(thisInterpreter.RANGE_ERROR,
					'Invalid array length');
			}
			newArray.properties.length = first;
		} else {
			for (var i = 0; i < arguments.length; i++) {
				newArray.properties[i] = arguments[i];
			}
			newArray.properties.length = i;
		}
		return newArray;
	};
	this.ARRAY = this.createNativeFunction(wrapper, true);
	this.ARRAY_PROTO = this.ARRAY.properties['prototype'];
	this.setProperty(scope, 'Array', this.ARRAY);

	// Static methods on Array.
	wrapper = function(obj) {
		return obj && obj.class === 'Array';
	};
	this.setProperty(this.ARRAY, 'isArray',
		this.createNativeFunction(wrapper, false),
		Interpreter.NONENUMERABLE_DESCRIPTOR);

	// Instance methods on Array.
	wrapper = function() {
		return Array.prototype.pop.call(this.properties);
	};
	this.setNativeFunctionPrototype(this.ARRAY, 'pop', wrapper);

	wrapper = function(var_args) {
		return Array.prototype.push.apply(this.properties, arguments);
	};
	this.setNativeFunctionPrototype(this.ARRAY, 'push', wrapper);

	wrapper = function() {
		return Array.prototype.shift.call(this.properties);
	};
	this.setNativeFunctionPrototype(this.ARRAY, 'shift', wrapper);

	wrapper = function(var_args) {
		return Array.prototype.unshift.apply(this.properties, arguments);
	};
	this.setNativeFunctionPrototype(this.ARRAY, 'unshift', wrapper);

	wrapper = function() {
		Array.prototype.reverse.call(this.properties);
		return this;
	};
	this.setNativeFunctionPrototype(this.ARRAY, 'reverse', wrapper);

	wrapper = function(index, howmany /*, var_args*/) {
		var list = Array.prototype.splice.apply(this.properties, arguments);
		return thisInterpreter.arrayNativeToPseudo(list);
	};
	this.setNativeFunctionPrototype(this.ARRAY, 'splice', wrapper);

	wrapper = function(opt_begin, opt_end) {
		var list = Array.prototype.slice.call(this.properties, opt_begin, opt_end);
		return thisInterpreter.arrayNativeToPseudo(list);
	};
	this.setNativeFunctionPrototype(this.ARRAY, 'slice', wrapper);

	wrapper = function(opt_separator) {
		return Array.prototype.join.call(this.properties, opt_separator);
	};
	this.setNativeFunctionPrototype(this.ARRAY, 'join', wrapper);

	wrapper = function(var_args) {
		var list = [];
		var length = 0;
		// Start by copying the current array.
		var iLength = thisInterpreter.getProperty(this, 'length');
		for (var i = 0; i < iLength; i++) {
			if (thisInterpreter.hasProperty(this, i)) {
				var element = thisInterpreter.getProperty(this, i);
				list[length] = element;
			}
			length++;
		}
		// Loop through all arguments and copy them in.
		for (var i = 0; i < arguments.length; i++) {
			var value = arguments[i];
			if (thisInterpreter.isa(value, thisInterpreter.ARRAY)) {
				var jLength = thisInterpreter.getProperty(value, 'length');
				for (var j = 0; j < jLength; j++) {
					if (thisInterpreter.hasProperty(value, j)) {
						list[length] = thisInterpreter.getProperty(value, j);
					}
					length++;
				}
			} else {
				list[length] = value;
			}
		}
		return thisInterpreter.arrayNativeToPseudo(list);
	};
	this.setNativeFunctionPrototype(this.ARRAY, 'concat', wrapper);

	wrapper = function(searchElement, opt_fromIndex) {
		return Array.prototype.indexOf.apply(this.properties, arguments);
	};
	this.setNativeFunctionPrototype(this.ARRAY, 'indexOf', wrapper);

	wrapper = function(searchElement, opt_fromIndex) {
		return Array.prototype.lastIndexOf.apply(this.properties, arguments);
	};
	this.setNativeFunctionPrototype(this.ARRAY, 'lastIndexOf', wrapper);

	wrapper = function() {
		Array.prototype.sort.call(this.properties);
		return this;
	};
	this.setNativeFunctionPrototype(this.ARRAY, 'sort', wrapper);

	this.polyfills_.push(
		// Polyfill copied from:
		// developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/every
		'Object.defineProperty(Array.prototype, \'every\',',
		'{configurable: true, writable: true, value:',
		'function(callbackfn, thisArg) {',
		'if (!this || typeof callbackfn !== \'function\') throw TypeError();',
		'var T, k;',
		'var O = Object(this);',
		'var len = O.length >>> 0;',
		'if (arguments.length > 1) T = thisArg;',
		'k = 0;',
		'while (k < len) {',
		'if (k in O && !callbackfn.call(T, O[k], k, O)) return false;',
		'k++;',
		'}',
		'return true;',
		'}',
		'});',

		// Polyfill copied from:
		// developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
		'Object.defineProperty(Array.prototype, \'filter\',',
		'{configurable: true, writable: true, value:',
		'function(fun/*, thisArg*/) {',
		'if (this === void 0 || this === null || typeof fun !== \'function\') throw TypeError();',
		'var t = Object(this);',
		'var len = t.length >>> 0;',
		'var res = [];',
		'var thisArg = arguments.length >= 2 ? arguments[1] : void 0;',
		'for (var i = 0; i < len; i++) {',
		'if (i in t) {',
		'var val = t[i];',
		'if (fun.call(thisArg, val, i, t)) res.push(val);',
		'}',
		'}',
		'return res;',
		'}',
		'});',

		// Polyfill copied from:
		// developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
		'Object.defineProperty(Array.prototype, \'forEach\',',
		'{configurable: true, writable: true, value:',
		'function(callback, thisArg) {',
		'if (!this || typeof callback !== \'function\') throw TypeError();',
		'var T, k;',
		'var O = Object(this);',
		'var len = O.length >>> 0;',
		'if (arguments.length > 1) T = thisArg;',
		'k = 0;',
		'while (k < len) {',
		'if (k in O) callback.call(T, O[k], k, O);',
		'k++;',
		'}',
		'}',
		'});',

		// Polyfill copied from:
		// developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map
		'Object.defineProperty(Array.prototype, \'map\',',
		'{configurable: true, writable: true, value:',
		'function(callback, thisArg) {',
		'if (!this || typeof callback !== \'function\') new TypeError;',
		'var T, A, k;',
		'var O = Object(this);',
		'var len = O.length >>> 0;',
		'if (arguments.length > 1) T = thisArg;',
		'A = new Array(len);',
		'k = 0;',
		'while (k < len) {',
		'if (k in O) A[k] = callback.call(T, O[k], k, O);',
		'k++;',
		'}',
		'return A;',
		'}',
		'});',

		// Polyfill copied from:
		// developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
		'Object.defineProperty(Array.prototype, \'reduce\',',
		'{configurable: true, writable: true, value:',
		'function(callback /*, initialValue*/) {',
		'if (!this || typeof callback !== \'function\') throw TypeError();',
		'var t = Object(this), len = t.length >>> 0, k = 0, value;',
		'if (arguments.length === 2) {',
		'value = arguments[1];',
		'} else {',
		'while (k < len && !(k in t)) k++;',
		'if (k >= len) {',
		'throw TypeError(\'Reduce of empty array with no initial value\');',
		'}',
		'value = t[k++];',
		'}',
		'for (; k < len; k++) {',
		'if (k in t) value = callback(value, t[k], k, t);',
		'}',
		'return value;',
		'}',
		'});',

		// Polyfill copied from:
		// developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight
		'Object.defineProperty(Array.prototype, \'reduceRight\',',
		'{configurable: true, writable: true, value:',
		'function(callback /*, initialValue*/) {',
		'if (null === this || \'undefined\' === typeof this || \'function\' !== typeof callback) throw TypeError();',
		'var t = Object(this), len = t.length >>> 0, k = len - 1, value;',
		'if (arguments.length >= 2) {',
		'value = arguments[1];',
		'} else {',
		'while (k >= 0 && !(k in t)) k--;',
		'if (k < 0) {',
		'throw TypeError(\'Reduce of empty array with no initial value\');',
		'}',
		'value = t[k--];',
		'}',
		'for (; k >= 0; k--) {',
		'if (k in t) value = callback(value, t[k], k, t);',
		'}',
		'return value;',
		'}',
		'});',

		// Polyfill copied from:
		// developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/some
		'Object.defineProperty(Array.prototype, \'some\',',
		'{configurable: true, writable: true, value:',
		'function(fun/*, thisArg*/) {',
		'if (!this || typeof fun !== \'function\') throw TypeError();',
		'var t = Object(this);',
		'var len = t.length >>> 0;',
		'var thisArg = arguments.length >= 2 ? arguments[1] : void 0;',
		'for (var i = 0; i < len; i++) {',
		'if (i in t && fun.call(thisArg, t[i], i, t)) {',
		'return true;',
		'}',
		'}',
		'return false;',
		'}',
		'});',


		'(function() {',
		'var sort_ = Array.prototype.sort;',
		'Array.prototype.sort = function(opt_comp) {',
		// Fast native sort.
		'if (typeof opt_comp !== \'function\') {',
		'return sort_.call(this);',
		'}',
		// Slow bubble sort.
		'for (var i = 0; i < this.length; i++) {',
		'var changes = 0;',
		'for (var j = 0; j < this.length - i - 1; j++) {',
		'if (opt_comp(this[j], this[j + 1]) > 0) {',
		'var swap = this[j];',
		'this[j] = this[j + 1];',
		'this[j + 1] = swap;',
		'changes++;',
		'}',
		'}',
		'if (!changes) break;',
		'}',
		'return this;',
		'};',
		'})();',

		'Object.defineProperty(Array.prototype, \'toLocaleString\',',
		'{configurable: true, writable: true, value:',
		'function() {',
		'var out = [];',
		'for (var i = 0; i < this.length; i++) {',
		'out[i] = (this[i] === null || this[i] === undefined) ? \'\' : this[i].toLocaleString();',
		'}',
		'return out.join(\',\');',
		'}',
		'});',
		'');
};

/**
 * Initialize the String class.
 * @param {!Interpreter.Object} scope Global scope.
 */
Interpreter.prototype.initString = function(scope) {
	var thisInterpreter = this;
	var wrapper;
	// String constructor.
	wrapper = function(value) {
		value = String(value);
		if (thisInterpreter.calledWithNew()) {
			// Called as new String().
			this.data = value;
			return this;
		} else {
			// Called as String().
			return value;
		}
	};
	this.STRING = this.createNativeFunction(wrapper, true);
	this.setProperty(scope, 'String', this.STRING);

	// Static methods on String.
	this.setProperty(this.STRING, 'fromCharCode',
		this.createNativeFunction(String.fromCharCode, false),
		Interpreter.NONENUMERABLE_DESCRIPTOR);

	// Instance methods on String.
	// Methods with exclusively primitive arguments.
	var functions = ['charAt', 'charCodeAt', 'concat', 'indexOf', 'lastIndexOf',
		'slice', 'substr', 'substring', 'toLocaleLowerCase', 'toLocaleUpperCase',
		'toLowerCase', 'toUpperCase', 'trim'];
	for (var i = 0; i < functions.length; i++) {
		this.setNativeFunctionPrototype(this.STRING, functions[i],
			String.prototype[functions[i]]);
	}

	wrapper = function(compareString, locales, options) {
		locales = locales ? thisInterpreter.pseudoToNative(locales) : undefined;
		options = options ? thisInterpreter.pseudoToNative(options) : undefined;
		return String(this).localeCompare(compareString, locales, options);
	};
	this.setNativeFunctionPrototype(this.STRING, 'localeCompare', wrapper);

	wrapper = function(separator, limit, callback) {
		var string = String(this);
		limit = limit ? Number(limit) : undefined;
		// Example of catastrophic split RegExp:
		// 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaac'.split(/^(a+)+b/)
		if (thisInterpreter.isa(separator, thisInterpreter.REGEXP)) {
			separator = separator.data;
			thisInterpreter.maybeThrowRegExp(separator, callback);
			if (thisInterpreter.REGEXP_MODE === 2) {
				if (Interpreter.vm) {
					// Run split in vm.
					var sandbox = {
						'string': string,
						'separator': separator,
						'limit': limit
					};
					var code = 'string.split(separator, limit)';
					var jsList =
              thisInterpreter.vmCall(code, sandbox, separator, callback);
					if (jsList !== Interpreter.REGEXP_TIMEOUT) {
						callback(thisInterpreter.arrayNativeToPseudo(jsList));
					}
				} else {
					// Run split in separate thread.
					var splitWorker = thisInterpreter.createWorker();
					var pid = thisInterpreter.regExpTimeout(separator, splitWorker,
						callback);
					splitWorker.onmessage = function(e) {
						clearTimeout(pid);
						callback(thisInterpreter.arrayNativeToPseudo(e.data));
					};
					splitWorker.postMessage(['split', string, separator, limit]);
				}
				return;
			}
		}
		// Run split natively.
		var jsList = string.split(separator, limit);
		callback(thisInterpreter.arrayNativeToPseudo(jsList));
	};
	this.setAsyncFunctionPrototype(this.STRING, 'split', wrapper);

	wrapper = function(regexp, callback) {
		var string = String(this);
		if (thisInterpreter.isa(regexp, thisInterpreter.REGEXP)) {
			regexp = regexp.data;
		} else {
			regexp = new RegExp(regexp);
		}
		// Example of catastrophic match RegExp:
		// 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaac'.match(/^(a+)+b/)
		thisInterpreter.maybeThrowRegExp(regexp, callback);
		if (thisInterpreter.REGEXP_MODE === 2) {
			if (Interpreter.vm) {
				// Run match in vm.
				var sandbox = {
					'string': string,
					'regexp': regexp
				};
				var code = 'string.match(regexp)';
				var m = thisInterpreter.vmCall(code, sandbox, regexp, callback);
				if (m !== Interpreter.REGEXP_TIMEOUT) {
					callback(m && thisInterpreter.arrayNativeToPseudo(m));
				}
			} else {
				// Run match in separate thread.
				var matchWorker = thisInterpreter.createWorker();
				var pid = thisInterpreter.regExpTimeout(regexp, matchWorker, callback);
				matchWorker.onmessage = function(e) {
					clearTimeout(pid);
					callback(e.data && thisInterpreter.arrayNativeToPseudo(e.data));
				};
				matchWorker.postMessage(['match', string, regexp]);
			}
			return;
		}
		// Run match natively.
		var m = string.match(regexp);
		callback(m && thisInterpreter.arrayNativeToPseudo(m));
	};
	this.setAsyncFunctionPrototype(this.STRING, 'match', wrapper);

	wrapper = function(regexp, callback) {
		var string = String(this);
		if (thisInterpreter.isa(regexp, thisInterpreter.REGEXP)) {
			regexp = regexp.data;
		} else {
			regexp = new RegExp(regexp);
		}
		// Example of catastrophic search RegExp:
		// 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaac'.search(/^(a+)+b/)
		thisInterpreter.maybeThrowRegExp(regexp, callback);
		if (thisInterpreter.REGEXP_MODE === 2) {
			if (Interpreter.vm) {
				// Run search in vm.
				var sandbox = {
					'string': string,
					'regexp': regexp
				};
				var code = 'string.search(regexp)';
				var n = thisInterpreter.vmCall(code, sandbox, regexp, callback);
				if (n !== Interpreter.REGEXP_TIMEOUT) {
					callback(n);
				}
			} else {
				// Run search in separate thread.
				var searchWorker = thisInterpreter.createWorker();
				var pid = thisInterpreter.regExpTimeout(regexp, searchWorker, callback);
				searchWorker.onmessage = function(e) {
					clearTimeout(pid);
					callback(e.data);
				};
				searchWorker.postMessage(['search', string, regexp]);
			}
			return;
		}
		// Run search natively.
		callback(string.search(regexp));
	};
	this.setAsyncFunctionPrototype(this.STRING, 'search', wrapper);

	wrapper = function(substr, newSubstr, callback) {
		// Support for function replacements is the responsibility of a polyfill.
		var string = String(this);
		newSubstr = String(newSubstr);
		// Example of catastrophic replace RegExp:
		// 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaac'.replace(/^(a+)+b/, '')
		if (thisInterpreter.isa(substr, thisInterpreter.REGEXP)) {
			substr = substr.data;
			thisInterpreter.maybeThrowRegExp(substr, callback);
			if (thisInterpreter.REGEXP_MODE === 2) {
				if (Interpreter.vm) {
					// Run replace in vm.
					var sandbox = {
						'string': string,
						'substr': substr,
						'newSubstr': newSubstr
					};
					var code = 'string.replace(substr, newSubstr)';
					var str = thisInterpreter.vmCall(code, sandbox, substr, callback);
					if (str !== Interpreter.REGEXP_TIMEOUT) {
						callback(str);
					}
				} else {
					// Run replace in separate thread.
					var replaceWorker = thisInterpreter.createWorker();
					var pid = thisInterpreter.regExpTimeout(substr, replaceWorker,
						callback);
					replaceWorker.onmessage = function(e) {
						clearTimeout(pid);
						callback(e.data);
					};
					replaceWorker.postMessage(['replace', string, substr, newSubstr]);
				}
				return;
			}
		}
		// Run replace natively.
		callback(string.replace(substr, newSubstr));
	};
	this.setAsyncFunctionPrototype(this.STRING, 'replace', wrapper);
	// Add a polyfill to handle replace's second argument being a function.
	this.polyfills_.push(
		'(function() {',
		'var replace_ = String.prototype.replace;',
		'String.prototype.replace = function(substr, newSubstr) {',
		'if (typeof newSubstr !== \'function\') {',
		// string.replace(string|regexp, string)
		'return replace_.call(this, substr, newSubstr);',
		'}',
		'var str = this;',
		'if (substr instanceof RegExp) {',  // string.replace(regexp, function)
		'var subs = [];',
		'var m = substr.exec(str);',
		'while (m) {',
		'm.push(m.index, str);',
		'var inject = newSubstr.apply(null, m);',
		'subs.push([m.index, m[0].length, inject]);',
		'm = substr.global ? substr.exec(str) : null;',
		'}',
		'for (var i = subs.length - 1; i >= 0; i--) {',
		'str = str.substring(0, subs[i][0]) + subs[i][2] + ' +
            'str.substring(subs[i][0] + subs[i][1]);',
		'}',
		'} else {',                         // string.replace(string, function)
		'var i = str.indexOf(substr);',
		'if (i !== -1) {',
		'var inject = newSubstr(str.substr(i, substr.length), i, str);',
		'str = str.substring(0, i) + inject + ' +
            'str.substring(i + substr.length);',
		'}',
		'}',
		'return str;',
		'};',
		'})();',
		'');
};

/**
 * Initialize the Boolean class.
 * @param {!Interpreter.Object} scope Global scope.
 */
Interpreter.prototype.initBoolean = function(scope) {
	var thisInterpreter = this;
	var wrapper;
	// Boolean constructor.
	wrapper = function(value) {
		value = Boolean(value);
		if (thisInterpreter.calledWithNew()) {
			// Called as new Boolean().
			this.data = value;
			return this;
		} else {
			// Called as Boolean().
			return value;
		}
	};
	this.BOOLEAN = this.createNativeFunction(wrapper, true);
	this.setProperty(scope, 'Boolean', this.BOOLEAN);
};

/**
 * Initialize the Number class.
 * @param {!Interpreter.Object} scope Global scope.
 */
Interpreter.prototype.initNumber = function(scope) {
	var thisInterpreter = this;
	var wrapper;
	// Number constructor.
	wrapper = function(value) {
		value = Number(value);
		if (thisInterpreter.calledWithNew()) {
			// Called as new Number().
			this.data = value;
			return this;
		} else {
			// Called as Number().
			return value;
		}
	};
	this.NUMBER = this.createNativeFunction(wrapper, true);
	this.setProperty(scope, 'Number', this.NUMBER);

	var numConsts = ['MAX_VALUE', 'MIN_VALUE', 'NaN', 'NEGATIVE_INFINITY',
		'POSITIVE_INFINITY'];
	for (var i = 0; i < numConsts.length; i++) {
		this.setProperty(this.NUMBER, numConsts[i], Number[numConsts[i]],
			Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
	}

	// Instance methods on Number.
	wrapper = function(fractionDigits) {
		try {
			return Number(this).toExponential(fractionDigits);
		} catch (e) {
			// Throws if fractionDigits isn't within 0-20.
			thisInterpreter.throwException(thisInterpreter.ERROR, e.message);
		}
	};
	this.setNativeFunctionPrototype(this.NUMBER, 'toExponential', wrapper);

	wrapper = function(digits) {
		try {
			return Number(this).toFixed(digits);
		} catch (e) {
			// Throws if digits isn't within 0-20.
			thisInterpreter.throwException(thisInterpreter.ERROR, e.message);
		}
	};
	this.setNativeFunctionPrototype(this.NUMBER, 'toFixed', wrapper);

	wrapper = function(precision) {
		try {
			return Number(this).toPrecision(precision);
		} catch (e) {
			// Throws if precision isn't within range (depends on implementation).
			thisInterpreter.throwException(thisInterpreter.ERROR, e.message);
		}
	};
	this.setNativeFunctionPrototype(this.NUMBER, 'toPrecision', wrapper);

	wrapper = function(radix) {
		try {
			return Number(this).toString(radix);
		} catch (e) {
			// Throws if radix isn't within 2-36.
			thisInterpreter.throwException(thisInterpreter.ERROR, e.message);
		}
	};
	this.setNativeFunctionPrototype(this.NUMBER, 'toString', wrapper);

	wrapper = function(locales, options) {
		locales = locales ? thisInterpreter.pseudoToNative(locales) : undefined;
		options = options ? thisInterpreter.pseudoToNative(options) : undefined;
		return Number(this).toLocaleString(locales, options);
	};
	this.setNativeFunctionPrototype(this.NUMBER, 'toLocaleString', wrapper);
};

/**
 * Initialize the Date class.
 * @param {!Interpreter.Object} scope Global scope.
 */
Interpreter.prototype.initDate = function(scope) {
	var thisInterpreter = this;
	var wrapper;
	// Date constructor.
	wrapper = function(value, var_args) {
		if (!thisInterpreter.calledWithNew()) {
			// Called as Date().
			// Calling Date() as a function returns a string, no arguments are heeded.
			return Date();
		}
		// Called as new Date().
		var args = [null].concat(Array.from(arguments));
		this.data = new (Function.prototype.bind.apply(Date, args));
		return this;
	};
	this.DATE = this.createNativeFunction(wrapper, true);
	this.DATE_PROTO = this.DATE.properties['prototype'];
	this.setProperty(scope, 'Date', this.DATE);

	// Static methods on Date.
	this.setProperty(this.DATE, 'now', this.createNativeFunction(Date.now, false),
		Interpreter.NONENUMERABLE_DESCRIPTOR);

	this.setProperty(this.DATE, 'parse',
		this.createNativeFunction(Date.parse, false),
		Interpreter.NONENUMERABLE_DESCRIPTOR);

	this.setProperty(this.DATE, 'UTC', this.createNativeFunction(Date.UTC, false),
		Interpreter.NONENUMERABLE_DESCRIPTOR);

	// Instance methods on Date.
	var functions = ['getDate', 'getDay', 'getFullYear', 'getHours',
		'getMilliseconds', 'getMinutes', 'getMonth', 'getSeconds', 'getTime',
		'getTimezoneOffset', 'getUTCDate', 'getUTCDay', 'getUTCFullYear',
		'getUTCHours', 'getUTCMilliseconds', 'getUTCMinutes', 'getUTCMonth',
		'getUTCSeconds', 'getYear',
		'setDate', 'setFullYear', 'setHours', 'setMilliseconds',
		'setMinutes', 'setMonth', 'setSeconds', 'setTime', 'setUTCDate',
		'setUTCFullYear', 'setUTCHours', 'setUTCMilliseconds', 'setUTCMinutes',
		'setUTCMonth', 'setUTCSeconds', 'setYear',
		'toDateString', 'toISOString', 'toJSON', 'toGMTString',
		'toLocaleDateString', 'toLocaleString', 'toLocaleTimeString',
		'toTimeString', 'toUTCString'];
	for (var i = 0; i < functions.length; i++) {
		wrapper = (function(nativeFunc) {
			return function(var_args) {
				var args = [];
				for (var i = 0; i < arguments.length; i++) {
					args[i] = thisInterpreter.pseudoToNative(arguments[i]);
				}
				return this.data[nativeFunc].apply(this.data, args);
			};
		})(functions[i]);
		this.setNativeFunctionPrototype(this.DATE, functions[i], wrapper);
	}
};

/**
 * Initialize Regular Expression object.
 * @param {!Interpreter.Object} scope Global scope.
 */
Interpreter.prototype.initRegExp = function(scope) {
	var thisInterpreter = this;
	var wrapper;
	// RegExp constructor.
	wrapper = function(pattern, flags) {
		if (thisInterpreter.calledWithNew()) {
			// Called as new RegExp().
			var rgx = this;
		} else {
			// Called as RegExp().
			var rgx = thisInterpreter.createObjectProto(thisInterpreter.REGEXP_PROTO);
		}
		pattern = pattern ? String(pattern) : '';
		flags = flags ? String(flags) : '';
		thisInterpreter.populateRegExp(rgx, new RegExp(pattern, flags));
		return rgx;
	};
	this.REGEXP = this.createNativeFunction(wrapper, true);
	this.REGEXP_PROTO = this.REGEXP.properties['prototype'];
	this.setProperty(scope, 'RegExp', this.REGEXP);

	this.setProperty(this.REGEXP.properties['prototype'], 'global', undefined,
		Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
	this.setProperty(this.REGEXP.properties['prototype'], 'ignoreCase', undefined,
		Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
	this.setProperty(this.REGEXP.properties['prototype'], 'multiline', undefined,
		Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
	this.setProperty(this.REGEXP.properties['prototype'], 'source', '(?:)',
		Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);

	// Use polyfill to avoid complexity of regexp threads.
	this.polyfills_.push(
		'Object.defineProperty(RegExp.prototype, \'test\',',
		'{configurable: true, writable: true, value:',
		'function(str) {',
		'return String(str).search(this) !== -1',
		'}',
		'});');

	wrapper = function(string, callback) {
		var thisPseudoRegExp = this;
		var regexp = thisPseudoRegExp.data;
		string = String(string);
		// Get lastIndex from wrapped regex, since this is settable.
		regexp.lastIndex =
        Number(thisInterpreter.getProperty(this, 'lastIndex'));
		// Example of catastrophic exec RegExp:
		// /^(a+)+b/.exec('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaac')
		thisInterpreter.maybeThrowRegExp(regexp, callback);
		if (thisInterpreter.REGEXP_MODE === 2) {
			if (Interpreter.vm) {
				// Run exec in vm.
				var sandbox = {
					'string': string,
					'regexp': regexp
				};
				var code = 'regexp.exec(string)';
				var match = thisInterpreter.vmCall(code, sandbox, regexp, callback);
				if (match !== Interpreter.REGEXP_TIMEOUT) {
					thisInterpreter.setProperty(thisPseudoRegExp, 'lastIndex',
						regexp.lastIndex);
					callback(matchToPseudo(match));
				}
			} else {
				// Run exec in separate thread.
				// Note that lastIndex is not preserved when a RegExp is passed to a
				// Web Worker.  Thus it needs to be passed back and forth separately.
				var execWorker = thisInterpreter.createWorker();
				var pid = thisInterpreter.regExpTimeout(regexp, execWorker, callback);
				execWorker.onmessage = function(e) {
					clearTimeout(pid);
					// Return tuple: [result, lastIndex]
					thisInterpreter.setProperty(thisPseudoRegExp, 'lastIndex',
						e.data[1]);
					callback(matchToPseudo(e.data[0]));
				};
				execWorker.postMessage(['exec', regexp, regexp.lastIndex, string]);
			}
			return;
		}
		// Run exec natively.
		var match = regexp.exec(string);
		thisInterpreter.setProperty(thisPseudoRegExp, 'lastIndex',
			regexp.lastIndex);
		callback(matchToPseudo(match));

		function matchToPseudo(match) {
			if (match) {
				var result = thisInterpreter.arrayNativeToPseudo(match);
				// match has additional properties.
				thisInterpreter.setProperty(result, 'index', match.index);
				thisInterpreter.setProperty(result, 'input', match.input);
				return result;
			}
			return null;
		}
	};
	this.setAsyncFunctionPrototype(this.REGEXP, 'exec', wrapper);
};

/**
 * Initialize the Error class.
 * @param {!Interpreter.Object} scope Global scope.
 */
Interpreter.prototype.initError = function(scope) {
	var thisInterpreter = this;
	// Error constructor.
	this.ERROR = this.createNativeFunction(function(opt_message) {
		if (thisInterpreter.calledWithNew()) {
			// Called as new Error().
			var newError = this;
		} else {
			// Called as Error().
			var newError = thisInterpreter.createObject(thisInterpreter.ERROR);
		}
		if (opt_message) {
			thisInterpreter.setProperty(newError, 'message', String(opt_message),
				Interpreter.NONENUMERABLE_DESCRIPTOR);
		}
		return newError;
	}, true);
	this.setProperty(scope, 'Error', this.ERROR);
	this.setProperty(this.ERROR.properties['prototype'], 'message', '',
		Interpreter.NONENUMERABLE_DESCRIPTOR);
	this.setProperty(this.ERROR.properties['prototype'], 'name', 'Error',
		Interpreter.NONENUMERABLE_DESCRIPTOR);

	var createErrorSubclass = function(name) {
		var constructor = thisInterpreter.createNativeFunction(
			function(opt_message) {
				if (thisInterpreter.calledWithNew()) {
					// Called as new XyzError().
					var newError = this;
				} else {
					// Called as XyzError().
					var newError = thisInterpreter.createObject(constructor);
				}
				if (opt_message) {
					thisInterpreter.setProperty(newError, 'message',
						String(opt_message), Interpreter.NONENUMERABLE_DESCRIPTOR);
				}
				return newError;
			}, true);
		thisInterpreter.setProperty(constructor, 'prototype',
			thisInterpreter.createObject(thisInterpreter.ERROR),
			Interpreter.NONENUMERABLE_DESCRIPTOR);
		thisInterpreter.setProperty(constructor.properties['prototype'], 'name',
			name, Interpreter.NONENUMERABLE_DESCRIPTOR);
		thisInterpreter.setProperty(scope, name, constructor);

		return constructor;
	};

	this.EVAL_ERROR = createErrorSubclass('EvalError');
	this.RANGE_ERROR = createErrorSubclass('RangeError');
	this.REFERENCE_ERROR = createErrorSubclass('ReferenceError');
	this.SYNTAX_ERROR = createErrorSubclass('SyntaxError');
	this.TYPE_ERROR = createErrorSubclass('TypeError');
	this.URI_ERROR = createErrorSubclass('URIError');
};

/**
 * Initialize Math object.
 * @param {!Interpreter.Object} scope Global scope.
 */
Interpreter.prototype.initMath = function(scope) {
	var thisInterpreter = this;
	var myMath = this.createObjectProto(this.OBJECT_PROTO);
	this.setProperty(scope, 'Math', myMath);
	var mathConsts = ['E', 'LN2', 'LN10', 'LOG2E', 'LOG10E', 'PI',
		'SQRT1_2', 'SQRT2'];
	for (var i = 0; i < mathConsts.length; i++) {
		this.setProperty(myMath, mathConsts[i], Math[mathConsts[i]],
			Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
	}
	var numFunctions = ['abs', 'acos', 'asin', 'atan', 'atan2', 'ceil', 'cos',
		'exp', 'floor', 'log', 'max', 'min', 'pow', 'random',
		'round', 'sin', 'sqrt', 'tan'];
	for (var i = 0; i < numFunctions.length; i++) {
		this.setProperty(myMath, numFunctions[i],
			this.createNativeFunction(Math[numFunctions[i]], false),
			Interpreter.NONENUMERABLE_DESCRIPTOR);
	}
};

/**
 * Initialize JSON object.
 * @param {!Interpreter.Object} scope Global scope.
 */
Interpreter.prototype.initJSON = function(scope) {
	var thisInterpreter = this;
	var myJSON = thisInterpreter.createObjectProto(this.OBJECT_PROTO);
	this.setProperty(scope, 'JSON', myJSON);

	var wrapper = function(text) {
		try {
			var nativeObj = JSON.parse(String(text));
		} catch (e) {
			thisInterpreter.throwException(thisInterpreter.SYNTAX_ERROR, e.message);
		}
		return thisInterpreter.nativeToPseudo(nativeObj);
	};
	this.setProperty(myJSON, 'parse', this.createNativeFunction(wrapper, false));

	wrapper = function(value) {
		var nativeObj = thisInterpreter.pseudoToNative(value);
		try {
			var str = JSON.stringify(nativeObj);
		} catch (e) {
			thisInterpreter.throwException(thisInterpreter.TYPE_ERROR, e.message);
		}
		return str;
	};
	this.setProperty(myJSON, 'stringify',
		this.createNativeFunction(wrapper, false));
};

/**
 * Is an object of a certain class?
 * @param {Interpreter.Value} child Object to check.
 * @param {Interpreter.Object} constructor Constructor of object.
 * @return {boolean} True if object is the class or inherits from it.
 *     False otherwise.
 */
Interpreter.prototype.isa = function(child, constructor) {
	if (child === null || child === undefined || !constructor) {
		return false;
	}
	var proto = constructor.properties['prototype'];
	if (child === proto) {
		return true;
	}
	// The first step up the prototype chain is harder since the child might be
	// a primitive value.  Subsequent steps can just follow the .proto property.
	child = this.getPrototype(child);
	while (child) {
		if (child === proto) {
			return true;
		}
		child = child.proto;
	}
	return false;
};

/**
 * Initialize a pseudo regular expression object based on a native regular
 * expression object.
 * @param {!Interpreter.Object} pseudoRegexp The existing object to set.
 * @param {!RegExp} nativeRegexp The native regular expression.
 */
Interpreter.prototype.populateRegExp = function(pseudoRegexp, nativeRegexp) {
	pseudoRegexp.data = nativeRegexp;
	// lastIndex is settable, all others are read-only attributes
	this.setProperty(pseudoRegexp, 'lastIndex', nativeRegexp.lastIndex,
		Interpreter.NONENUMERABLE_DESCRIPTOR);
	this.setProperty(pseudoRegexp, 'source', nativeRegexp.source,
		Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
	this.setProperty(pseudoRegexp, 'global', nativeRegexp.global,
		Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
	this.setProperty(pseudoRegexp, 'ignoreCase', nativeRegexp.ignoreCase,
		Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
	this.setProperty(pseudoRegexp, 'multiline', nativeRegexp.multiline,
		Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
};

/**
 * Create a Web Worker to execute regular expressions.
 * Using a separate file fails in Chrome when run locally on a file:// URI.
 * Using a data encoded URI fails in IE and Edge.
 * Using a blob works in IE11 and all other browsers.
 * @return {!Worker} Web Worker with regexp execution code loaded.
 */
Interpreter.prototype.createWorker = function() {
	var blob = this.createWorker.blob_;
	if (!blob) {
		blob = new Blob([Interpreter.WORKER_CODE.join('\n')],
			{type: 'application/javascript'});
		// Cache the blob, so it doesn't need to be created next time.
		this.createWorker.blob_ = blob;
	}
	return new Worker(URL.createObjectURL(blob));
};

/**
 * Execute regular expressions in a node vm.
 * @param {string} code Code to execute.
 * @param {!Object} sandbox Global variables for new vm.
 * @param {!RegExp} nativeRegExp Regular expression.
 * @param {!Function} callback Asynchronous callback function.
 */
Interpreter.prototype.vmCall = function(code, sandbox, nativeRegExp, callback) {
	var options = {'timeout': this.REGEXP_THREAD_TIMEOUT};
	try {
		return Interpreter.vm['runInNewContext'](code, sandbox, options);
	} catch (e) {
		callback(null);
		this.throwException(this.ERROR, 'RegExp Timeout: ' + nativeRegExp);
	}
	return Interpreter.REGEXP_TIMEOUT;
};

/**
 * If REGEXP_MODE is 0, then throw an error.
 * Also throw if REGEXP_MODE is 2 and JS doesn't support Web Workers or vm.
 * @param {!RegExp} nativeRegExp Regular expression.
 * @param {!Function} callback Asynchronous callback function.
 */
Interpreter.prototype.maybeThrowRegExp = function(nativeRegExp, callback) {
	var ok;
	if (this.REGEXP_MODE === 0) {
		// Fail: No RegExp support.
		ok = false;
	} else if (this.REGEXP_MODE === 1) {
		// Ok: Native RegExp support.
		ok = true;
	} else {
		// Sandboxed RegExp handling.
		if (Interpreter.vm) {
			// Ok: Node's vm module already loaded.
			ok = true;
		} else if (typeof Worker === 'function' && typeof URL === 'function') {
			// Ok: Web Workers available.
			ok = true;
		} else if (true) {
			// Try to load Node's vm module.
			try {
				Interpreter.vm = __webpack_require__(1647);
			} catch (e) {}
			ok = !!Interpreter.vm;
		} else {}
	}
	if (!ok) {
		callback(null);
		this.throwException(this.ERROR, 'Regular expressions not supported: ' +
        nativeRegExp);
	}
};

/**
 * Set a timeout for regular expression threads.  Unless cancelled, this will
 * terminate the thread and throw an error.
 * @param {!RegExp} nativeRegExp Regular expression (used for error message).
 * @param {!Worker} worker Thread to terminate.
 * @param {!Function} callback Async callback function to continue execution.
 * @return {number} PID of timeout.  Used to cancel if thread completes.
 */
Interpreter.prototype.regExpTimeout = function(nativeRegExp, worker, callback) {
	var thisInterpreter = this;
	return setTimeout(function() {
		worker.terminate();
		callback(null);
		try {
			thisInterpreter.throwException(thisInterpreter.ERROR,
				'RegExp Timeout: ' + nativeRegExp);
		} catch (e) {
			// Eat the expected Interpreter.STEP_ERROR.
		}
	}, this.REGEXP_THREAD_TIMEOUT);
};

/**
 * Is a value a legal integer for an array length?
 * @param {Interpreter.Value} x Value to check.
 * @return {number} Zero, or a positive integer if the value can be
 *     converted to such.  NaN otherwise.
 */
Interpreter.legalArrayLength = function(x) {
	var n = x >>> 0;
	// Array length must be between 0 and 2^32-1 (inclusive).
	return (n === Number(x)) ? n : NaN;
};

/**
 * Is a value a legal integer for an array index?
 * @param {Interpreter.Value} x Value to check.
 * @return {number} Zero, or a positive integer if the value can be
 *     converted to such.  NaN otherwise.
 */
Interpreter.legalArrayIndex = function(x) {
	var n = x >>> 0;
	// Array index cannot be 2^32-1, otherwise length would be 2^32.
	// 0xffffffff is 2^32-1.
	return (String(n) === String(x) && n !== 0xffffffff) ? n : NaN;
};

/**
 * Typedef for JS values.
 * @typedef {!Interpreter.Object|boolean|number|string|undefined|null}
 */
Interpreter.Value;

/**
 * Class for an object.
 * @param {Interpreter.Object} proto Prototype object or null.
 * @constructor
 */
Interpreter.Object = function(proto) {
	this.getter = Object.create(null);
	this.setter = Object.create(null);
	this.properties = Object.create(null);
	this.proto = proto;
};

/** @type {Interpreter.Object} */
Interpreter.Object.prototype.proto = null;

/** @type {boolean} */
Interpreter.Object.prototype.isObject = true;

/** @type {string} */
Interpreter.Object.prototype.class = 'Object';

/** @type {Date|RegExp|boolean|number|string|undefined|null} */
Interpreter.Object.prototype.data = null;

/**
 * Convert this object into a string.
 * @return {string} String value.
 * @override
 */
Interpreter.Object.prototype.toString = function() {
	if (this.class === 'Array') {
		// Array
		var cycles = Interpreter.toStringCycles_;
		cycles.push(this);
		try {
			var strs = [];
			for (var i = 0; i < this.properties.length; i++) {
				var value = this.properties[i];
				strs[i] = (value && value.isObject && cycles.indexOf(value) !== -1) ?
					'...' : value;
			}
		} finally {
			cycles.pop();
		}
		return strs.join(',');
	}
	if (this.class === 'Error') {
		var cycles = Interpreter.toStringCycles_;
		if (cycles.indexOf(this) !== -1) {
			return '[object Error]';
		}
		var name, message;
		// Bug: Does not support getters and setters for name or message.
		var obj = this;
		do {
			if ('name' in obj.properties) {
				name = obj.properties['name'];
				break;
			}
		} while ((obj = obj.proto));
		var obj = this;
		do {
			if ('message' in obj.properties) {
				message = obj.properties['message'];
				break;
			}
		} while ((obj = obj.proto));
		cycles.push(this);
		try {
			name = name && String(name);
			message = message && String(message);
		} finally {
			cycles.pop();
		}
		return message ? name + ': ' + message : String(name);
	}

	// RegExp, Date, and boxed primitives.
	if (this.data !== null) {
		return String(this.data);
	}

	return '[object ' + this.class + ']';
};

/**
 * Return the object's value.
 * @return {Interpreter.Value} Value.
 * @override
 */
Interpreter.Object.prototype.valueOf = function() {
	if (this.data === undefined || this.data === null ||
      this.data instanceof RegExp) {
		return this; // An Object.
	}
	if (this.data instanceof Date) {
		return this.data.valueOf();  // Milliseconds.
	}
	return /** @type {(boolean|number|string)} */ (this.data);  // Boxed primitive.
};

/**
 * Create a new data object based on a constructor's prototype.
 * @param {Interpreter.Object} constructor Parent constructor function,
 *     or null if scope object.
 * @return {!Interpreter.Object} New data object.
 */
Interpreter.prototype.createObject = function(constructor) {
	return this.createObjectProto(constructor &&
                                constructor.properties['prototype']);
};

/**
 * Create a new data object based on a prototype.
 * @param {Interpreter.Object} proto Prototype object.
 * @return {!Interpreter.Object} New data object.
 */
Interpreter.prototype.createObjectProto = function(proto) {
	if (typeof proto !== 'object') {
		throw Error('Non object prototype');
	}
	var obj = new Interpreter.Object(proto);
	// Functions have prototype objects.
	if (this.isa(obj, this.FUNCTION)) {
		this.setProperty(obj, 'prototype',
			this.createObjectProto(this.OBJECT_PROTO || null),
			Interpreter.NONENUMERABLE_DESCRIPTOR);
		obj.class = 'Function';
	}
	// Arrays have length.
	if (this.isa(obj, this.ARRAY)) {
		this.setProperty(obj, 'length', 0,
			{configurable: false, enumerable: false, writable: true});
		obj.class = 'Array';
	}
	if (this.isa(obj, this.ERROR)) {
		obj.class = 'Error';
	}
	return obj;
};

/**
 * Create a new function.
 * @param {!Object} node AST node defining the function.
 * @param {!Object} scope Parent scope.
 * @return {!Interpreter.Object} New function.
 */
Interpreter.prototype.createFunction = function(node, scope) {
	var func = this.createObjectProto(this.FUNCTION_PROTO);
	func.parentScope = scope;
	func.node = node;
	this.setProperty(func, 'length', func.node['params'].length,
		Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
	return func;
};

/**
 * Create a new native function.
 * @param {!Function} nativeFunc JavaScript function.
 * @param {boolean=} opt_constructor If true, the function's
 * prototype will have its constructor property set to the function.
 * If false, the function cannot be called as a constructor (e.g. escape).
 * Defaults to undefined.
 * @return {!Interpreter.Object} New function.
 */
Interpreter.prototype.createNativeFunction =
    function(nativeFunc, opt_constructor) {
    	var func = this.createObjectProto(this.FUNCTION_PROTO);
    	func.nativeFunc = nativeFunc;
    	nativeFunc.id = this.functionCounter_++;
    	this.setProperty(func, 'length', nativeFunc.length,
    		Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
    	if (opt_constructor) {
    		this.setProperty(func.properties['prototype'], 'constructor', func,
    			Interpreter.NONENUMERABLE_DESCRIPTOR);
    	} else if (opt_constructor === false) {
    		func.illegalConstructor = true;
    		this.setProperty(func, 'prototype', undefined,
    			Interpreter.NONENUMERABLE_DESCRIPTOR);
    	}
    	return func;
    };

/**
 * Create a new native asynchronous function.
 * @param {!Function} asyncFunc JavaScript function.
 * @return {!Interpreter.Object} New function.
 */
Interpreter.prototype.createAsyncFunction = function(asyncFunc) {
	var func = this.createObjectProto(this.FUNCTION_PROTO);
	func.asyncFunc = asyncFunc;
	asyncFunc.id = this.functionCounter_++;
	this.setProperty(func, 'length', asyncFunc.length,
		Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
	return func;
};

/**
 * Converts from a native JS object or value to a JS interpreter object.
 * Can handle JSON-style values, does NOT handle cycles.
 * @param {*} nativeObj The native JS object to be converted.
 * @return {Interpreter.Value} The equivalent JS interpreter object.
 */
Interpreter.prototype.nativeToPseudo = function(nativeObj) {
	if ((typeof nativeObj !== 'object' && typeof nativeObj !== 'function') ||
      nativeObj === null) {
		return nativeObj;
	}

	if (nativeObj instanceof RegExp) {
		var pseudoRegexp = this.createObjectProto(this.REGEXP_PROTO);
		this.populateRegExp(pseudoRegexp, nativeObj);
		return pseudoRegexp;
	}

	if (nativeObj instanceof Date) {
		var pseudoDate = this.createObjectProto(this.DATE_PROTO);
		pseudoDate.data = nativeObj;
		return pseudoDate;
	}

	if (nativeObj instanceof Function) {
		var interpreter = this;
		var wrapper = function() {
			return interpreter.nativeToPseudo(
				nativeObj.apply(interpreter,
					Array.prototype.slice.call(arguments)
						.map(function(i) {
							return interpreter.pseudoToNative(i);
						})
				)
			);
		};
		return this.createNativeFunction(wrapper, undefined);
	}

	var pseudoObj;
	if (Array.isArray(nativeObj)) {  // Array.
		pseudoObj = this.createObjectProto(this.ARRAY_PROTO);
		for (var i = 0; i < nativeObj.length; i++) {
			if (i in nativeObj) {
				this.setProperty(pseudoObj, i, this.nativeToPseudo(nativeObj[i]));
			}
		}
	} else {  // Object.
		pseudoObj = this.createObjectProto(this.OBJECT_PROTO);
		for (var key in nativeObj) {
			this.setProperty(pseudoObj, key, this.nativeToPseudo(nativeObj[key]));
		}
	}
	return pseudoObj;
};

/**
 * Converts from a JS interpreter object to native JS object.
 * Can handle JSON-style values, plus cycles.
 * @param {Interpreter.Value} pseudoObj The JS interpreter object to be
 * converted.
 * @param {Object=} opt_cycles Cycle detection (used in recursive calls).
 * @return {*} The equivalent native JS object or value.
 */
Interpreter.prototype.pseudoToNative = function(pseudoObj, opt_cycles) {
	if ((typeof pseudoObj !== 'object' && typeof pseudoObj !== 'function') ||
      pseudoObj === null) {
		return pseudoObj;
	}

	if (this.isa(pseudoObj, this.REGEXP)) {  // Regular expression.
		return pseudoObj.data;
	}

	if (this.isa(pseudoObj, this.DATE)) {  // Date.
		return pseudoObj.data;
	}

	var cycles = opt_cycles || {
		pseudo: [],
		native: []
	};
	var i = cycles.pseudo.indexOf(pseudoObj);
	if (i !== -1) {
		return cycles.native[i];
	}
	cycles.pseudo.push(pseudoObj);
	var nativeObj;
	if (this.isa(pseudoObj, this.ARRAY)) {  // Array.
		nativeObj = [];
		cycles.native.push(nativeObj);
		var length = this.getProperty(pseudoObj, 'length');
		for (var i = 0; i < length; i++) {
			if (this.hasProperty(pseudoObj, i)) {
				nativeObj[i] =
            this.pseudoToNative(this.getProperty(pseudoObj, i), cycles);
			}
		}
	} else {  // Object.
		nativeObj = {};
		cycles.native.push(nativeObj);
		var val;
		for (var key in pseudoObj.properties) {
			val = pseudoObj.properties[key];
			nativeObj[key] = this.pseudoToNative(val, cycles);
		}
	}
	cycles.pseudo.pop();
	cycles.native.pop();
	return nativeObj;
};

/**
 * Converts from a native JS array to a JS interpreter array.
 * Does handle non-numeric properties (like str.match's index prop).
 * Does NOT recurse into the array's contents.
 * @param {!Array} nativeArray The JS array to be converted.
 * @return {!Interpreter.Object} The equivalent JS interpreter array.
 */
Interpreter.prototype.arrayNativeToPseudo = function(nativeArray) {
	var pseudoArray = this.createObjectProto(this.ARRAY_PROTO);
	var props = Object.getOwnPropertyNames(nativeArray);
	for (var i = 0; i < props.length; i++) {
		this.setProperty(pseudoArray, props[i], nativeArray[props[i]]);
	}
	return pseudoArray;
};

/**
 * Converts from a JS interpreter array to native JS array.
 * Does handle non-numeric properties (like str.match's index prop).
 * Does NOT recurse into the array's contents.
 * @param {!Interpreter.Object} pseudoArray The JS interpreter array,
 *     or JS interpreter object pretending to be an array.
 * @return {!Array} The equivalent native JS array.
 */
Interpreter.prototype.arrayPseudoToNative = function(pseudoArray) {
	var nativeArray = [];
	for (var key in pseudoArray.properties) {
		nativeArray[key] = this.getProperty(pseudoArray, key);
	}
	// pseudoArray might be an object pretending to be an array.  In this case
	// it's possible that length is non-existent, invalid, or smaller than the
	// largest defined numeric property.  Set length explicitly here.
	nativeArray.length = Interpreter.legalArrayLength(
		this.getProperty(pseudoArray, 'length')) || 0;
	return nativeArray;
};

/**
 * Look up the prototype for this value.
 * @param {Interpreter.Value} value Data object.
 * @return {Interpreter.Object} Prototype object, null if none.
 */
Interpreter.prototype.getPrototype = function(value) {
	switch (typeof value) {
		case 'number':
			return this.NUMBER.properties['prototype'];
		case 'boolean':
			return this.BOOLEAN.properties['prototype'];
		case 'string':
			return this.STRING.properties['prototype'];
	}
	if (value) {
		return value.proto;
	}
	return null;
};

/**
 * Fetch a property value from a data object.
 * @param {Interpreter.Value} obj Data object.
 * @param {Interpreter.Value} name Name of property.
 * @return {Interpreter.Value} Property value (may be undefined).
 */
Interpreter.prototype.getProperty = function(obj, name) {
	name = String(name);
	if (obj === undefined || obj === null) {
		this.throwException(this.TYPE_ERROR,
			'Cannot read property \'' + name + '\' of ' + obj);
	}
	if (name === 'length') {
		// Special cases for magic length property.
		if (this.isa(obj, this.STRING)) {
			return String(obj).length;
		}
	} else if (name.charCodeAt(0) < 0x40) {
		// Might have numbers in there?
		// Special cases for string array indexing
		if (this.isa(obj, this.STRING)) {
			var n = Interpreter.legalArrayIndex(name);
			if (!isNaN(n) && n < String(obj).length) {
				return String(obj)[n];
			}
		}
	}
	do {
		if (obj.properties && name in obj.properties) {
			var getter = obj.getter[name];
			if (getter) {
				// Flag this function as being a getter and thus needing immediate
				// execution (rather than being the value of the property).
				getter.isGetter = true;
				return getter;
			}
			return obj.properties[name];
		}
	} while ((obj = this.getPrototype(obj)));
	return undefined;
};

/**
 * Does the named property exist on a data object.
 * @param {Interpreter.Value} obj Data object.
 * @param {Interpreter.Value} name Name of property.
 * @return {boolean} True if property exists.
 */
Interpreter.prototype.hasProperty = function(obj, name) {
	if (!obj.isObject) {
		throw TypeError('Primitive data type has no properties');
	}
	name = String(name);
	if (name === 'length' && this.isa(obj, this.STRING)) {
		return true;
	}
	if (this.isa(obj, this.STRING)) {
		var n = Interpreter.legalArrayIndex(name);
		if (!isNaN(n) && n < String(obj).length) {
			return true;
		}
	}
	do {
		if (obj.properties && name in obj.properties) {
			return true;
		}
	} while ((obj = this.getPrototype(obj)));
	return false;
};

/**
 * Set a property value on a data object.
 * @param {!Interpreter.Object} obj Data object.
 * @param {Interpreter.Value} name Name of property.
 * @param {Interpreter.Value} value New property value.
 *     Use Interpreter.VALUE_IN_DESCRIPTOR if value is handled by
 *     descriptor instead.
 * @param {Object=} opt_descriptor Optional descriptor object.
 * @return {!Interpreter.Object|undefined} Returns a setter function if one
 *     needs to be called, otherwise undefined.
 */
Interpreter.prototype.setProperty = function(obj, name, value, opt_descriptor) {
	name = String(name);
	if (obj === undefined || obj === null) {
		this.throwException(this.TYPE_ERROR,
			'Cannot set property \'' + name + '\' of ' + obj);
	}
	if (opt_descriptor && ('get' in opt_descriptor || 'set' in opt_descriptor) &&
      ('value' in opt_descriptor || 'writable' in opt_descriptor)) {
		this.throwException(this.TYPE_ERROR, 'Invalid property descriptor. ' +
        'Cannot both specify accessors and a value or writable attribute');
	}
	var strict = !this.stateStack || this.getScope().strict;
	if (!obj.isObject) {
		if (strict) {
			this.throwException(this.TYPE_ERROR, 'Can\'t create property \'' + name +
                          '\' on \'' + obj + '\'');
		}
		return;
	}
	if (this.isa(obj, this.STRING)) {
		var n = Interpreter.legalArrayIndex(name);
		if (name === 'length' || (!isNaN(n) && n < String(obj).length)) {
			// Can't set length or letters on String objects.
			if (strict) {
				this.throwException(this.TYPE_ERROR, 'Cannot assign to read only ' +
            'property \'' + name + '\' of String \'' + obj.data + '\'');
			}
			return;
		}
	}
	if (obj.class === 'Array') {
		// Arrays have a magic length variable that is bound to the elements.
		var length = obj.properties.length;
		var i;
		if (name === 'length') {
			// Delete elements if length is smaller.
			if (opt_descriptor) {
				if (!('value' in opt_descriptor)) {
					return;
				}
				value = opt_descriptor.value;
			}
			value = Interpreter.legalArrayLength(value);
			if (isNaN(value)) {
				this.throwException(this.RANGE_ERROR, 'Invalid array length');
			}
			if (value < length) {
				for (i in obj.properties) {
					i = Interpreter.legalArrayIndex(i);
					if (!isNaN(i) && value <= i) {
						delete obj.properties[i];
					}
				}
			}
		} else if (!isNaN(i = Interpreter.legalArrayIndex(name))) {
			// Increase length if this index is larger.
			obj.properties.length = Math.max(length, i + 1);
		}
	}
	if (obj.preventExtensions && !(name in obj.properties)) {
		if (strict) {
			this.throwException(this.TYPE_ERROR, 'Can\'t add property \'' + name +
                          '\', object is not extensible');
		}
		return;
	}
	if (opt_descriptor) {
		// Define the property.
		if ('get' in opt_descriptor) {
			if (opt_descriptor.get) {
				obj.getter[name] = opt_descriptor.get;
			} else {
				delete obj.getter[name];
			}
		}
		if ('set' in opt_descriptor) {
			if (opt_descriptor.set) {
				obj.setter[name] = opt_descriptor.set;
			} else {
				delete obj.setter[name];
			}
		}
		var descriptor = {};
		if ('configurable' in opt_descriptor) {
			descriptor.configurable = opt_descriptor.configurable;
		}
		if ('enumerable' in opt_descriptor) {
			descriptor.enumerable = opt_descriptor.enumerable;
		}
		if ('writable' in opt_descriptor) {
			descriptor.writable = opt_descriptor.writable;
			delete obj.getter[name];
			delete obj.setter[name];
		}
		if ('value' in opt_descriptor) {
			descriptor.value = opt_descriptor.value;
			delete obj.getter[name];
			delete obj.setter[name];
		} else if (value !== Interpreter.VALUE_IN_DESCRIPTOR) {
			descriptor.value = value;
			delete obj.getter[name];
			delete obj.setter[name];
		}
		try {
			Object.defineProperty(obj.properties, name, descriptor);
		} catch (e) {
			this.throwException(this.TYPE_ERROR, 'Cannot redefine property: ' + name);
		}
	} else {
		// Set the property.
		if (value === Interpreter.VALUE_IN_DESCRIPTOR) {
			throw ReferenceError('Value not specified.');
		}
		// Determine the parent (possibly self) where the property is defined.
		var defObj = obj;
		while (!(name in defObj.properties)) {
			defObj = this.getPrototype(defObj);
			if (!defObj) {
				// This is a new property.
				defObj = obj;
				break;
			}
		}
		if (defObj.setter && defObj.setter[name]) {
			return defObj.setter[name];
		}
		if (defObj.getter && defObj.getter[name]) {
			if (strict) {
				this.throwException(this.TYPE_ERROR, 'Cannot set property \'' + name +
            '\' of object \'' + obj + '\' which only has a getter');
			}
		} else {
			// No setter, simple assignment.
			try {
				obj.properties[name] = value;
			} catch (e) {
				if (strict) {
					this.throwException(this.TYPE_ERROR, 'Cannot assign to read only ' +
              'property \'' + name + '\' of object \'' + obj + '\'');
				}
			}
		}
	}
};

/**
 * Convenience method for adding a native function as a non-enumerable property
 * onto an object's prototype.
 * @param {!Interpreter.Object} obj Data object.
 * @param {Interpreter.Value} name Name of property.
 * @param {!Function} wrapper Function object.
 */
Interpreter.prototype.setNativeFunctionPrototype =
    function(obj, name, wrapper) {
    	this.setProperty(obj.properties['prototype'], name,
    		this.createNativeFunction(wrapper, false),
    		Interpreter.NONENUMERABLE_DESCRIPTOR);
    };

/**
 * Convenience method for adding an async function as a non-enumerable property
 * onto an object's prototype.
 * @param {!Interpreter.Object} obj Data object.
 * @param {Interpreter.Value} name Name of property.
 * @param {!Function} wrapper Function object.
 */
Interpreter.prototype.setAsyncFunctionPrototype =
    function(obj, name, wrapper) {
    	this.setProperty(obj.properties['prototype'], name,
    		this.createAsyncFunction(wrapper),
    		Interpreter.NONENUMERABLE_DESCRIPTOR);
    };

/**
 * Returns the current scope from the stateStack.
 * @return {!Interpreter.Object} Current scope dictionary.
 */
Interpreter.prototype.getScope = function() {
	var scope = this.stateStack[this.stateStack.length - 1].scope;
	if (!scope) {
		throw Error('No scope found.');
	}
	return scope;
};

/**
 * Create a new scope dictionary.
 * @param {!Object} node AST node defining the scope container
 *     (e.g. a function).
 * @param {Interpreter.Object} parentScope Scope to link to.
 * @return {!Interpreter.Object} New scope.
 */
Interpreter.prototype.createScope = function(node, parentScope) {
	var scope = this.createObjectProto(null);
	scope.parentScope = parentScope;
	if (!parentScope) {
		this.initGlobalScope(scope);
	}
	this.populateScope_(node, scope);

	// Determine if this scope starts with 'use strict'.
	scope.strict = false;
	if (parentScope && parentScope.strict) {
		scope.strict = true;
	} else {
		var firstNode = node['body'] && node['body'][0];
		if (firstNode && firstNode.expression &&
        firstNode.expression['type'] === 'Literal' &&
        firstNode.expression.value === 'use strict') {
			scope.strict = true;
		}
	}
	return scope;
};

/**
 * Create a new special scope dictionary. Similar to createScope(), but
 * doesn't assume that the scope is for a function body.
 * This is used for 'catch' clauses and 'with' statements.
 * @param {!Interpreter.Object} parentScope Scope to link to.
 * @param {Interpreter.Object=} opt_scope Optional object to transform into
 *     scope.
 * @return {!Interpreter.Object} New scope.
 */
Interpreter.prototype.createSpecialScope = function(parentScope, opt_scope) {
	if (!parentScope) {
		throw Error('parentScope required');
	}
	var scope = opt_scope || this.createObjectProto(null);
	scope.parentScope = parentScope;
	scope.strict = parentScope.strict;
	return scope;
};

/**
 * Retrieves a value from the scope chain.
 * @param {string} name Name of variable.
 * @return {Interpreter.Value} Any value.
 *   May be flagged as being a getter and thus needing immediate execution
 *   (rather than being the value of the property).
 */
Interpreter.prototype.getValueFromScope = function(name) {
	var scope = this.getScope();
	while (scope && scope !== this.global) {
		if (name in scope.properties) {
			return scope.properties[name];
		}
		scope = scope.parentScope;
	}
	// The root scope is also an object which has inherited properties and
	// could also have getters.
	if (scope === this.global && this.hasProperty(scope, name)) {
		return this.getProperty(scope, name);
	}
	// Typeof operator is unique: it can safely look at non-defined variables.
	var prevNode = this.stateStack[this.stateStack.length - 1].node;
	if (prevNode['type'] === 'UnaryExpression' &&
      prevNode['operator'] === 'typeof') {
		return undefined;
	}
	this.throwException(this.REFERENCE_ERROR, name + ' is not defined');
};

/**
 * Sets a value to the current scope.
 * @param {string} name Name of variable.
 * @param {Interpreter.Value} value Value.
 * @return {!Interpreter.Object|undefined} Returns a setter function if one
 *     needs to be called, otherwise undefined.
 */
Interpreter.prototype.setValueToScope = function(name, value) {
	var scope = this.getScope();
	var strict = scope.strict;
	while (scope && scope !== this.global) {
		if (name in scope.properties) {
			scope.properties[name] = value;
			return undefined;
		}
		scope = scope.parentScope;
	}
	// The root scope is also an object which has readonly properties and
	// could also have setters.
	if (scope === this.global && (!strict || this.hasProperty(scope, name))) {
		return this.setProperty(scope, name, value);
	}
	this.throwException(this.REFERENCE_ERROR, name + ' is not defined');
};

/**
 * Create a new scope for the given node.
 * @param {!Object} node AST node (program or function).
 * @param {!Interpreter.Object} scope Scope dictionary to populate.
 * @private
 */
Interpreter.prototype.populateScope_ = function(node, scope) {
	if (node['type'] === 'VariableDeclaration') {
		for (var i = 0; i < node['declarations'].length; i++) {
			this.setProperty(scope, node['declarations'][i]['id']['name'],
				undefined, Interpreter.VARIABLE_DESCRIPTOR);
		}
	} else if (node['type'] === 'FunctionDeclaration') {
		this.setProperty(scope, node['id']['name'],
			this.createFunction(node, scope), Interpreter.VARIABLE_DESCRIPTOR);
		return;  // Do not recurse into function.
	} else if (node['type'] === 'FunctionExpression') {
		return;  // Do not recurse into function.
	} else if (node['type'] === 'ExpressionStatement') {
		return;  // Expressions can't contain variable/function declarations.
	}
	var nodeClass = node['constructor'];
	for (var name in node) {
		var prop = node[name];
		if (prop && typeof prop === 'object') {
			if (Array.isArray(prop)) {
				for (var i = 0; i < prop.length; i++) {
					if (prop[i] && prop[i].constructor === nodeClass) {
						this.populateScope_(prop[i], scope);
					}
				}
			} else {
				if (prop.constructor === nodeClass) {
					this.populateScope_(prop, scope);
				}
			}
		}
	}
};

/**
 * Remove start and end values from AST, or set start and end values to a
 * constant value.  Used to remove highlighting from polyfills and to set
 * highlighting in an eval to cover the entire eval expression.
 * @param {!Object} node AST node.
 * @param {number=} start Starting character of all nodes, or undefined.
 * @param {number=} end Ending character of all nodes, or undefined.
 * @private
 */
Interpreter.prototype.stripLocations_ = function(node, start, end) {
	if (start) {
		node['start'] = start;
	} else {
		delete node['start'];
	}
	if (end) {
		node['end'] = end;
	} else {
		delete node['end'];
	}
	for (var name in node) {
		if (node.hasOwnProperty(name)) {
			var prop = node[name];
			if (prop && typeof prop === 'object') {
				this.stripLocations_(prop, start, end);
			}
		}
	}
};

/**
 * Is the current state directly being called with as a construction with 'new'.
 * @return {boolean} True if 'new foo()', false if 'foo()'.
 */
Interpreter.prototype.calledWithNew = function() {
	return this.stateStack[this.stateStack.length - 1].isConstructor;
};

/**
 * Gets a value from the scope chain or from an object property.
 * @param {!Array} ref Name of variable or object/propname tuple.
 * @return {Interpreter.Value} Any value.
 *   May be flagged as being a getter and thus needing immediate execution
 *   (rather than being the value of the property).
 */
Interpreter.prototype.getValue = function(ref) {
	if (ref[0] === Interpreter.SCOPE_REFERENCE) {
		// A null/varname variable lookup.
		return this.getValueFromScope(ref[1]);
	} else {
		// An obj/prop components tuple (foo.bar).
		return this.getProperty(ref[0], ref[1]);
	}
};

/**
 * Sets a value to the scope chain or to an object property.
 * @param {!Array} ref Name of variable or object/propname tuple.
 * @param {Interpreter.Value} value Value.
 * @return {!Interpreter.Object|undefined} Returns a setter function if one
 *     needs to be called, otherwise undefined.
 */
Interpreter.prototype.setValue = function(ref, value) {
	if (ref[0] === Interpreter.SCOPE_REFERENCE) {
		// A null/varname variable lookup.
		return this.setValueToScope(ref[1], value);
	} else {
		// An obj/prop components tuple (foo.bar).
		return this.setProperty(ref[0], ref[1], value);
	}
};

/**
  * Completion Value Types.
  * @enum {number}
  */
Interpreter.Completion = {
	NORMAL: 0,
	BREAK: 1,
	CONTINUE: 2,
	RETURN: 3,
	THROW: 4
};

/**
 * Throw an exception in the interpreter that can be handled by an
 * interpreter try/catch statement.  If unhandled, a real exception will
 * be thrown.  Can be called with either an error class and a message, or
 * with an actual object to be thrown.
 * @param {!Interpreter.Object} errorClass Type of error (if message is
 *   provided) or the value to throw (if no message).
 * @param {string=} opt_message Message being thrown.
 */
Interpreter.prototype.throwException = function(errorClass, opt_message) {
	if (opt_message === undefined) {
		var error = errorClass;  // This is a value to throw, not an error class.
	} else {
		var error = this.createObject(errorClass);
		this.setProperty(error, 'message', opt_message,
			Interpreter.NONENUMERABLE_DESCRIPTOR);
	}
	this.unwind(Interpreter.Completion.THROW, error, undefined);
	// Abort anything related to the current step.
	throw Interpreter.STEP_ERROR;
};

/**
 * Unwind the stack to the innermost relevant enclosing TryStatement,
 * For/ForIn/WhileStatement or Call/NewExpression.  If this results in
 * the stack being completely unwound the thread will be terminated
 * and the appropriate error being thrown.
 * @param {Interpreter.Completion} type Completion type.
 * @param {Interpreter.Value} value Value computed, returned or thrown.
 * @param {string|undefined} label Target label for break or return.
 */
Interpreter.prototype.unwind = function(type, value, label) {
	if (type === Interpreter.Completion.NORMAL) {
		throw TypeError('Should not unwind for NORMAL completions');
	}

	loop: for (var stack = this.stateStack; stack.length > 0; stack.pop()) {
		var state = stack[stack.length - 1];
		switch (state.node['type']) {
			case 'TryStatement':
				state.cv = {type: type, value: value, label: label};
				return;
			case 'CallExpression':
			case 'NewExpression':
				if (type === Interpreter.Completion.RETURN) {
					state.value = value;
					return;
				} else if (type !== Interpreter.Completion.THROW) {
					throw Error('Unsynatctic break/continue not rejected by Acorn');
				}
				break;
			case 'Program':
				// Don't pop the stateStack.
				// Leave the root scope on the tree in case the program is appended to.
				state.done = true;
				break loop;
		}
		if (type === Interpreter.Completion.BREAK) {
			if (label ? (state.labels && state.labels.indexOf(label) !== -1) :
				(state.isLoop || state.isSwitch)) {
				stack.pop();
				return;
			}
		} else if (type === Interpreter.Completion.CONTINUE) {
			if (label ? (state.labels && state.labels.indexOf(label) !== -1) :
				state.isLoop) {
				return;
			}
		}
	}

	// Unhandled completion.  Throw a real error.
	var realError;
	if (this.isa(value, this.ERROR)) {
		var errorTable = {
			'EvalError': EvalError,
			'RangeError': RangeError,
			'ReferenceError': ReferenceError,
			'SyntaxError': SyntaxError,
			'TypeError': TypeError,
			'URIError': URIError
		};
		var name = String(this.getProperty(value, 'name'));
		var message = this.getProperty(value, 'message').valueOf();
		var errorConstructor = errorTable[name] || Error;
		realError = errorConstructor(message);
	} else {
		realError = String(value);
	}
	throw realError;
};

/**
 * Create a call to a getter function.
 * @param {!Interpreter.Object} func Function to execute.
 * @param {!Interpreter.Object|!Array} left
 *     Name of variable or object/propname tuple.
 * @private
 */
Interpreter.prototype.createGetter_ = function(func, left) {
	// Normally 'this' will be specified as the object component (o.x).
	// Sometimes 'this' is explicitly provided (o).
	var funcThis = Array.isArray(left) ? left[0] : left;
	var node = new this.nodeConstructor({options:{}});
	node['type'] = 'CallExpression';
	var state = new Interpreter.State(node,
		this.stateStack[this.stateStack.length - 1].scope);
	state.doneCallee_ = true;
	state.funcThis_ = funcThis;
	state.func_ = func;
	state.doneArgs_ = true;
	state.arguments_ = [];
	return state;
};

/**
 * Create a call to a setter function.
 * @param {!Interpreter.Object} func Function to execute.
 * @param {!Interpreter.Object|!Array} left
 *     Name of variable or object/propname tuple.
 * @param {Interpreter.Value} value Value to set.
 * @private
 */
Interpreter.prototype.createSetter_ = function(func, left, value) {
	// Normally 'this' will be specified as the object component (o.x).
	// Sometimes 'this' is implicitly the global object (x).
	var funcThis = Array.isArray(left) ? left[0] : this.global;
	var node = new this.nodeConstructor({options:{}});
	node['type'] = 'CallExpression';
	var state = new Interpreter.State(node,
		this.stateStack[this.stateStack.length - 1].scope);
	state.doneCallee_ = true;
	state.funcThis_ = funcThis;
	state.func_ = func;
	state.doneArgs_ = true;
	state.arguments_ = [value];
	return state;
};

/**
 * Class for a state.
 * @param {!Object} node AST node for the state.
 * @param {!Interpreter.Object} scope Scope object for the state.
 * @constructor
 */
Interpreter.State = function(node, scope) {
	this.node = node;
	this.scope = scope;
};


///////////////////////////////////////////////////////////////////////////////
// Functions to handle each node type.
///////////////////////////////////////////////////////////////////////////////

Interpreter.prototype['stepArrayExpression'] = function(stack, state, node) {
	var elements = node['elements'];
	var n = state.n_ || 0;
	if (!state.array_) {
		state.array_ = this.createObjectProto(this.ARRAY_PROTO);
		state.array_.properties.length = elements.length;
	} else {
		this.setProperty(state.array_, n, state.value);
		n++;
	}
	while (n < elements.length) {
		// Skip missing elements - they're not defined, not undefined.
		if (elements[n]) {
			state.n_ = n;
			return new Interpreter.State(elements[n], state.scope);
		}
		n++;
	}
	stack.pop();
	stack[stack.length - 1].value = state.array_;
};

Interpreter.prototype['stepAssignmentExpression'] =
    function(stack, state, node) {
    	if (!state.doneLeft_) {
    		state.doneLeft_ = true;
    		var nextState = new Interpreter.State(node['left'], state.scope);
    		nextState.components = true;
    		return nextState;
    	}
    	if (!state.doneRight_) {
    		if (!state.leftReference_) {
    			state.leftReference_ = state.value;
    		}
    		if (state.doneGetter_) {
    			state.leftValue_ = state.value;
    		}
    		if (!state.doneGetter_ && node['operator'] !== '=') {
    			var leftValue = this.getValue(state.leftReference_);
    			state.leftValue_ = leftValue;
    			if (leftValue && typeof leftValue === 'object' && leftValue.isGetter) {
    				// Clear the getter flag and call the getter function.
    				leftValue.isGetter = false;
    				state.doneGetter_ = true;
    				var func = /** @type {!Interpreter.Object} */ (leftValue);
    				return this.createGetter_(func, state.leftReference_);
    			}
    		}
    		state.doneRight_ = true;
    		return new Interpreter.State(node['right'], state.scope);
    	}
    	if (state.doneSetter_) {
    		// Return if setter function.
    		// Setter method on property has completed.
    		// Ignore its return value, and use the original set value instead.
    		stack.pop();
    		stack[stack.length - 1].value = state.setterValue_;
    		return;
    	}
    	var value = state.leftValue_;
    	var rightValue = state.value;
    	switch (node['operator']) {
    		case '=':    value =    rightValue; break;
    		case '+=':   value +=   rightValue; break;
    		case '-=':   value -=   rightValue; break;
    		case '*=':   value *=   rightValue; break;
    		case '/=':   value /=   rightValue; break;
    		case '%=':   value %=   rightValue; break;
    		case '<<=':  value <<=  rightValue; break;
    		case '>>=':  value >>=  rightValue; break;
    		case '>>>=': value >>>= rightValue; break;
    		case '&=':   value &=   rightValue; break;
    		case '^=':   value ^=   rightValue; break;
    		case '|=':   value |=   rightValue; break;
    		default:
    			throw SyntaxError('Unknown assignment expression: ' + node['operator']);
    	}
    	var setter = this.setValue(state.leftReference_, value);
    	if (setter) {
    		state.doneSetter_ = true;
    		state.setterValue_ = value;
    		return this.createSetter_(setter, state.leftReference_, value);
    	}
    	// Return if no setter function.
    	stack.pop();
    	stack[stack.length - 1].value = value;
    };

Interpreter.prototype['stepBinaryExpression'] = function(stack, state, node) {
	if (!state.doneLeft_) {
		state.doneLeft_ = true;
		return new Interpreter.State(node['left'], state.scope);
	}
	if (!state.doneRight_) {
		state.doneRight_ = true;
		state.leftValue_ = state.value;
		return new Interpreter.State(node['right'], state.scope);
	}
	stack.pop();
	var leftValue = state.leftValue_;
	var rightValue = state.value;
	var value;
	switch (node['operator']) {
		case '==':  value = leftValue ==  rightValue; break;
		case '!=':  value = leftValue !=  rightValue; break;
		case '===': value = leftValue === rightValue; break;
		case '!==': value = leftValue !== rightValue; break;
		case '>':   value = leftValue >   rightValue; break;
		case '>=':  value = leftValue >=  rightValue; break;
		case '<':   value = leftValue <   rightValue; break;
		case '<=':  value = leftValue <=  rightValue; break;
		case '+':   value = leftValue +   rightValue; break;
		case '-':   value = leftValue -   rightValue; break;
		case '*':   value = leftValue *   rightValue; break;
		case '/':   value = leftValue /   rightValue; break;
		case '%':   value = leftValue %   rightValue; break;
		case '&':   value = leftValue &   rightValue; break;
		case '|':   value = leftValue |   rightValue; break;
		case '^':   value = leftValue ^   rightValue; break;
		case '<<':  value = leftValue <<  rightValue; break;
		case '>>':  value = leftValue >>  rightValue; break;
		case '>>>': value = leftValue >>> rightValue; break;
		case 'in':
			if (!rightValue || !rightValue.isObject) {
				this.throwException(this.TYPE_ERROR,
					'\'in\' expects an object, not \'' + rightValue + '\'');
			}
			value = this.hasProperty(rightValue, leftValue);
			break;
		case 'instanceof':
			if (!this.isa(rightValue, this.FUNCTION)) {
				this.throwException(this.TYPE_ERROR,
					'Right-hand side of instanceof is not an object');
			}
			value = leftValue.isObject ? this.isa(leftValue, rightValue) : false;
			break;
		default:
			throw SyntaxError('Unknown binary operator: ' + node['operator']);
	}
	stack[stack.length - 1].value = value;
};

Interpreter.prototype['stepBlockStatement'] = function(stack, state, node) {
	var n = state.n_ || 0;
	var expression = node['body'][n];
	if (expression) {
		state.n_ = n + 1;
		return new Interpreter.State(expression, state.scope);
	}
	stack.pop();
};

Interpreter.prototype['stepBreakStatement'] = function(stack, state, node) {
	var label = node['label'] && node['label']['name'];
	this.unwind(Interpreter.Completion.BREAK, undefined, label);
};

Interpreter.prototype['stepCallExpression'] = function(stack, state, node) {
	if (!state.doneCallee_) {
		state.doneCallee_ = 1;
		// Components needed to determine value of 'this'.
		var nextState = new Interpreter.State(node['callee'], state.scope);
		nextState.components = true;
		return nextState;
	}
	if (state.doneCallee_ === 1) {
		// Determine value of the function.
		state.doneCallee_ = 2;
		var func = state.value;
		if (Array.isArray(func)) {
			state.func_ = this.getValue(func);
			if (func[0] === Interpreter.SCOPE_REFERENCE) {
				// (Globally or locally) named function.  Is it named 'eval'?
				state.directEval_ = (func[1] === 'eval');
			} else {
				// Method function, 'this' is object (ignored if invoked as 'new').
				state.funcThis_ = func[0];
			}
			func = state.func_;
			if (func && typeof func === 'object' && func.isGetter) {
				// Clear the getter flag and call the getter function.
				func.isGetter = false;
				state.doneCallee_ = 1;
				return this.createGetter_(/** @type {!Interpreter.Object} */ (func),
					state.value);
			}
		} else {
			// Already evaluated function: (function(){...})();
			state.func_ = func;
		}
		state.arguments_ = [];
		state.n_ = 0;
	}
	var func = state.func_;
	if (!state.doneArgs_) {
		if (state.n_ !== 0) {
			state.arguments_.push(state.value);
		}
		if (node['arguments'][state.n_]) {
			return new Interpreter.State(node['arguments'][state.n_++], state.scope);
		}
		// Determine value of 'this' in function.
		if (node['type'] === 'NewExpression') {
			if (func.illegalConstructor) {
				// Illegal: new escape();
				this.throwException(this.TYPE_ERROR, func + ' is not a constructor');
			}
			// Constructor, 'this' is new object.
			var proto = func.properties['prototype'];
			if (typeof proto !== 'object' || proto === null) {
				// Non-object prototypes default to Object.prototype.
				proto = this.OBJECT_PROTO;
			}
			state.funcThis_ = this.createObjectProto(proto);
			state.isConstructor = true;
		} else if (state.funcThis_ === undefined) {
			// Global function, 'this' is global object (or 'undefined' if strict).
			state.funcThis_ = state.scope.strict ? undefined : this.global;
		}
		state.doneArgs_ = true;
	}
	if (!state.doneExec_) {
		state.doneExec_ = true;
		if (!func || !func.isObject) {
			this.throwException(this.TYPE_ERROR, func + ' is not a function');
		}
		var funcNode = func.node;
		if (funcNode) {
			var scope = this.createScope(funcNode['body'], func.parentScope);
			// Add all arguments.
			for (var i = 0; i < funcNode['params'].length; i++) {
				var paramName = funcNode['params'][i]['name'];
				var paramValue = state.arguments_.length > i ? state.arguments_[i] :
					undefined;
				this.setProperty(scope, paramName, paramValue);
			}
			// Build arguments variable.
			var argsList = this.createObjectProto(this.ARRAY_PROTO);
			for (var i = 0; i < state.arguments_.length; i++) {
				this.setProperty(argsList, i, state.arguments_[i]);
			}
			this.setProperty(scope, 'arguments', argsList);
			// Add the function's name (var x = function foo(){};)
			var name = funcNode['id'] && funcNode['id']['name'];
			if (name) {
				this.setProperty(scope, name, func);
			}
			this.setProperty(scope, 'this', state.funcThis_,
				Interpreter.READONLY_DESCRIPTOR);
			state.value = undefined;  // Default value if no explicit return.
			return new Interpreter.State(funcNode['body'], scope);
		} else if (func.eval) {
			var code = state.arguments_[0];
			if (typeof code !== 'string') {
				// JS does not parse String objects:
				// eval(new String('1 + 1')) -> '1 + 1'
				state.value = code;
			} else {
				try {
					var ast = acorn.parse(String(code), Interpreter.PARSE_OPTIONS);
				} catch (e) {
					// Acorn threw a SyntaxError.  Rethrow as a trappable error.
					this.throwException(this.SYNTAX_ERROR, 'Invalid code: ' + e.message);
				}
				var evalNode = new this.nodeConstructor({options:{}});
				evalNode['type'] = 'EvalProgram_';
				evalNode['body'] = ast['body'];
				this.stripLocations_(evalNode, node['start'], node['end']);
				// Create new scope and update it with definitions in eval().
				var scope = state.directEval_ ? state.scope : this.global;
				if (scope.strict) {
					// Strict mode get its own scope in eval.
					scope = this.createScope(ast, scope);
				} else {
					// Non-strict mode pollutes the current scope.
					this.populateScope_(ast, scope);
				}
				this.value = undefined;  // Default value if no code.
				return new Interpreter.State(evalNode, scope);
			}
		} else if (func.nativeFunc) {
			state.value = func.nativeFunc.apply(state.funcThis_, state.arguments_);
		} else if (func.asyncFunc) {
			var thisInterpreter = this;
			var callback = function(value) {
				state.value = value;
				thisInterpreter.paused_ = false;
			};
			// Force the argument lengths to match, then append the callback.
			var argLength = func.asyncFunc.length - 1;
			var argsWithCallback = state.arguments_.concat(
				new Array(argLength)).slice(0, argLength);
			argsWithCallback.push(callback);
			this.paused_ = true;
			func.asyncFunc.apply(state.funcThis_, argsWithCallback);
			return;
		} else {
			/* A child of a function is a function but is not callable.  For example:
      var F = function() {};
      F.prototype = escape;
      var f = new F();
      f();
      */
			this.throwException(this.TYPE_ERROR, func.class + ' is not a function');
		}
	} else {
		// Execution complete.  Put the return value on the stack.
		stack.pop();
		if (state.isConstructor && typeof state.value !== 'object') {
			stack[stack.length - 1].value = state.funcThis_;
		} else {
			stack[stack.length - 1].value = state.value;
		}
	}
};

Interpreter.prototype['stepCatchClause'] = function(stack, state, node) {
	if (!state.done_) {
		state.done_ = true;
		// Create an empty scope.
		var scope = this.createSpecialScope(state.scope);
		// Add the argument.
		this.setProperty(scope, node['param']['name'], state.throwValue);
		// Execute catch clause.
		return new Interpreter.State(node['body'], scope);
	} else {
		stack.pop();
	}
};

Interpreter.prototype['stepConditionalExpression'] =
    function(stack, state, node) {
    	var mode = state.mode_ || 0;
    	if (mode === 0) {
    		state.mode_ = 1;
    		return new Interpreter.State(node['test'], state.scope);
    	}
    	if (mode === 1) {
    		state.mode_ = 2;
    		var value = Boolean(state.value);
    		if (value && node['consequent']) {
    			// Execute 'if' block.
    			return new Interpreter.State(node['consequent'], state.scope);
    		} else if (!value && node['alternate']) {
    			// Execute 'else' block.
    			return new Interpreter.State(node['alternate'], state.scope);
    		}
    		// eval('1;if(false){2}') -> undefined
    		this.value = undefined;
    	}
    	stack.pop();
    	if (node['type'] === 'ConditionalExpression') {
    		stack[stack.length - 1].value = state.value;
    	}
    };

Interpreter.prototype['stepContinueStatement'] = function(stack, state, node) {
	var label = node['label'] && node['label']['name'];
	this.unwind(Interpreter.Completion.CONTINUE, undefined, label);
};

Interpreter.prototype['stepDebuggerStatement'] = function(stack, state, node) {
	// Do nothing.  May be overridden by developers.
	stack.pop();
};

Interpreter.prototype['stepDoWhileStatement'] = function(stack, state, node) {
	if (node['type'] === 'DoWhileStatement' && state.test_ === undefined) {
		// First iteration of do/while executes without checking test.
		state.value = true;
		state.test_ = true;
	}
	if (!state.test_) {
		state.test_ = true;
		return new Interpreter.State(node['test'], state.scope);
	}
	if (!state.value) {  // Done, exit loop.
		stack.pop();
	} else if (node['body']) {  // Execute the body.
		state.test_ = false;
		state.isLoop = true;
		return new Interpreter.State(node['body'], state.scope);
	}
};

Interpreter.prototype['stepEmptyStatement'] = function(stack, state, node) {
	stack.pop();
};

Interpreter.prototype['stepEvalProgram_'] = function(stack, state, node) {
	var n = state.n_ || 0;
	var expression = node['body'][n];
	if (expression) {
		state.n_ = n + 1;
		return new Interpreter.State(expression, state.scope);
	}
	stack.pop();
	stack[stack.length - 1].value = this.value;
};

Interpreter.prototype['stepExpressionStatement'] = function(stack, state, node) {
	if (!state.done_) {
		state.done_ = true;
		return new Interpreter.State(node['expression'], state.scope);
	}
	stack.pop();
	// Save this value to interpreter.value for use as a return value if
	// this code is inside an eval function.
	this.value = state.value;
};

Interpreter.prototype['stepForInStatement'] = function(stack, state, node) {
	// First, initialize a variable if exists.  Only do so once, ever.
	if (!state.doneInit_) {
		state.doneInit_ = true;
		if (node['left']['declarations'] &&
        node['left']['declarations'][0]['init']) {
			if (state.scope.strict) {
				this.throwException(this.SYNTAX_ERROR,
					'for-in loop variable declaration may not have an initializer.');
			}
			// Variable initialization: for (var x = 4 in y)
			return new Interpreter.State(node['left'], state.scope);
		}
	}
	// Second, look up the object.  Only do so once, ever.
	if (!state.doneObject_) {
		state.doneObject_ = true;
		if (!state.variable_) {
			state.variable_ = state.value;
		}
		return new Interpreter.State(node['right'], state.scope);
	}
	if (!state.isLoop) {
		// First iteration.
		state.isLoop = true;
		state.object_ = state.value;
		state.visited_ = Object.create(null);
	}
	// Third, find the property name for this iteration.
	if (state.name_ === undefined) {
		gotPropName: while (true) {
			if (state.object_ && state.object_.isObject) {
				if (!state.props_) {
					state.props_ = Object.getOwnPropertyNames(state.object_.properties);
				}
				while (true) {
					var prop = state.props_.shift();
					if (prop === undefined) {
						break;  // Reached end of this object's properties.
					}
					if (!Object.prototype.hasOwnProperty.call(state.object_.properties,
						prop)) {
						continue;  // Property has been deleted in the loop.
					}
					if (state.visited_[prop]) {
						continue;  // Already seen this property on a child.
					}
					state.visited_[prop] = true;
					if (!Object.prototype.propertyIsEnumerable.call(
						state.object_.properties, prop)) {
						continue;  // Skip non-enumerable property.
					}
					state.name_ = prop;
					break gotPropName;
				}
			} else if (state.object_ !== null && state.object_ !== undefined) {
				// Primitive value (other than null or undefined).
				if (!state.props_) {
					state.props_ = Object.getOwnPropertyNames(state.object_);
				}
				while (true) {
					var prop = state.props_.shift();
					if (prop === undefined) {
						break;  // Reached end of this value's properties.
					}
					state.visited_[prop] = true;
					if (!Object.prototype.propertyIsEnumerable.call(
						state.object_, prop)) {
						continue;  // Skip non-enumerable property.
					}
					state.name_ = prop;
					break gotPropName;
				}
			}
			state.object_ = this.getPrototype(state.object_);
			state.props_ = null;
			if (state.object_ === null) {
				// Done, exit loop.
				stack.pop();
				return;
			}
		}
	}
	// Fourth, find the variable
	if (!state.doneVariable_) {
		state.doneVariable_ = true;
		var left = node['left'];
		if (left['type'] === 'VariableDeclaration') {
			// Inline variable declaration: for (var x in y)
			state.variable_ =
          [Interpreter.SCOPE_REFERENCE, left['declarations'][0]['id']['name']];
		} else {
			// Arbitrary left side: for (foo().bar in y)
			state.variable_ = null;
			var nextState = new Interpreter.State(left, state.scope);
			nextState.components = true;
			return nextState;
		}
	}
	if (!state.variable_) {
		state.variable_ = state.value;
	}
	// Fifth, set the variable.
	if (!state.doneSetter_) {
		state.doneSetter_ = true;
		var value = state.name_;
		var setter = this.setValue(state.variable_, value);
		if (setter) {
			return this.createSetter_(setter, state.variable_, value);
		}
	}
	// Next step will be step three.
	state.name_ = undefined;
	// Reevaluate the variable since it could be a setter on the global object.
	state.doneVariable_ = false;
	state.doneSetter_ = false;
	// Sixth and finally, execute the body if there was one.  this.
	if (node['body']) {
		return new Interpreter.State(node['body'], state.scope);
	}
};

Interpreter.prototype['stepForStatement'] = function(stack, state, node) {
	var mode = state.mode_ || 0;
	if (mode === 0) {
		state.mode_ = 1;
		if (node['init']) {
			return new Interpreter.State(node['init'], state.scope);
		}
	} else if (mode === 1) {
		state.mode_ = 2;
		if (node['test']) {
			return new Interpreter.State(node['test'], state.scope);
		}
	} else if (mode === 2) {
		state.mode_ = 3;
		if (node['test'] && !state.value) {
			// Done, exit loop.
			stack.pop();
		} else {  // Execute the body.
			state.isLoop = true;
			return new Interpreter.State(node['body'], state.scope);
		}
	} else if (mode === 3) {
		state.mode_ = 1;
		if (node['update']) {
			return new Interpreter.State(node['update'], state.scope);
		}
	}
};

Interpreter.prototype['stepFunctionDeclaration'] =
    function(stack, state, node) {
    	// This was found and handled when the scope was populated.
    	stack.pop();
    };

Interpreter.prototype['stepFunctionExpression'] = function(stack, state, node) {
	stack.pop();
	stack[stack.length - 1].value = this.createFunction(node, state.scope);
};

Interpreter.prototype['stepIdentifier'] = function(stack, state, node) {
	stack.pop();
	if (state.components) {
		stack[stack.length - 1].value = [Interpreter.SCOPE_REFERENCE, node['name']];
		return;
	}
	var value = this.getValueFromScope(node['name']);
	// An identifier could be a getter if it's a property on the global object.
	if (value && typeof value === 'object' && value.isGetter) {
		// Clear the getter flag and call the getter function.
		value.isGetter = false;
		var scope = state.scope;
		while (!this.hasProperty(scope, node['name'])) {
			scope = scope.parentScope;
		}
		var func = /** @type {!Interpreter.Object} */ (value);
		return this.createGetter_(func, this.global);
	}
	stack[stack.length - 1].value = value;
};

Interpreter.prototype['stepIfStatement'] =
    Interpreter.prototype['stepConditionalExpression'];

Interpreter.prototype['stepLabeledStatement'] = function(stack, state, node) {
	// No need to hit this node again on the way back up the stack.
	stack.pop();
	// Note that a statement might have multiple labels.
	var labels = state.labels || [];
	labels.push(node['label']['name']);
	var nextState = new Interpreter.State(node['body'], state.scope);
	nextState.labels = labels;
	return nextState;
};

Interpreter.prototype['stepLiteral'] = function(stack, state, node) {
	stack.pop();
	var value = node['value'];
	if (value instanceof RegExp) {
		var pseudoRegexp = this.createObjectProto(this.REGEXP_PROTO);
		this.populateRegExp(pseudoRegexp, value);
		value = pseudoRegexp;
	}
	stack[stack.length - 1].value = value;
};

Interpreter.prototype['stepLogicalExpression'] = function(stack, state, node) {
	if (node['operator'] !== '&&' && node['operator'] !== '||') {
		throw SyntaxError('Unknown logical operator: ' + node['operator']);
	}
	if (!state.doneLeft_) {
		state.doneLeft_ = true;
		return new Interpreter.State(node['left'], state.scope);
	}
	if (!state.doneRight_) {
		if ((node['operator'] === '&&' && !state.value) ||
        (node['operator'] === '||' && state.value)) {
			// Shortcut evaluation.
			stack.pop();
			stack[stack.length - 1].value = state.value;
		} else {
			state.doneRight_ = true;
			return new Interpreter.State(node['right'], state.scope);
		}
	} else {
		stack.pop();
		stack[stack.length - 1].value = state.value;
	}
};

Interpreter.prototype['stepMemberExpression'] = function(stack, state, node) {
	if (!state.doneObject_) {
		state.doneObject_ = true;
		return new Interpreter.State(node['object'], state.scope);
	}
	var propName;
	if (!node['computed']) {
		state.object_ = state.value;
		// obj.foo -- Just access 'foo' directly.
		propName = node['property']['name'];
	} else if (!state.doneProperty_) {
		state.object_ = state.value;
		// obj[foo] -- Compute value of 'foo'.
		state.doneProperty_ = true;
		return new Interpreter.State(node['property'], state.scope);
	} else {
		propName = state.value;
	}
	stack.pop();
	if (state.components) {
		stack[stack.length - 1].value = [state.object_, propName];
	} else {
		var value = this.getProperty(state.object_, propName);
		if (value && typeof value === 'object' && value.isGetter) {
			// Clear the getter flag and call the getter function.
			value.isGetter = false;
			var func = /** @type {!Interpreter.Object} */ (value);
			return this.createGetter_(func, state.object_);
		}
		stack[stack.length - 1].value = value;
	}
};

Interpreter.prototype['stepNewExpression'] =
    Interpreter.prototype['stepCallExpression'];

Interpreter.prototype['stepObjectExpression'] = function(stack, state, node) {
	var n = state.n_ || 0;
	var property = node['properties'][n];
	if (!state.object_) {
		// First execution.
		state.object_ = this.createObjectProto(this.OBJECT_PROTO);
		state.properties_ = Object.create(null);
	} else {
		// Determine property name.
		var key = property['key'];
		if (key['type'] === 'Identifier') {
			var propName = key['name'];
		} else if (key['type'] === 'Literal') {
			var propName = key['value'];
		} else {
			throw SyntaxError('Unknown object structure: ' + key['type']);
		}
		// Set the property computed in the previous execution.
		if (!state.properties_[propName]) {
			// Create temp object to collect value, getter, and/or setter.
			state.properties_[propName] = {};
		}
		state.properties_[propName][property['kind']] = state.value;
		state.n_ = ++n;
		property = node['properties'][n];
	}
	if (property) {
		return new Interpreter.State(property['value'], state.scope);
	}
	for (var key in state.properties_) {
		var kinds = state.properties_[key];
		if ('get' in kinds || 'set' in kinds) {
			// Set a property with a getter or setter.
			var descriptor = {
				configurable: true,
				enumerable: true,
				get: kinds['get'],
				set: kinds['set']
			};
			this.setProperty(state.object_, key, null, descriptor);
		} else {
			// Set a normal property with a value.
			this.setProperty(state.object_, key, kinds['init']);
		}
	}
	stack.pop();
	stack[stack.length - 1].value = state.object_;
};

Interpreter.prototype['stepProgram'] = function(stack, state, node) {
	var expression = node['body'].shift();
	if (expression) {
		state.done = false;
		return new Interpreter.State(expression, state.scope);
	}
	state.done = true;
	// Don't pop the stateStack.
	// Leave the root scope on the tree in case the program is appended to.
};

Interpreter.prototype['stepReturnStatement'] = function(stack, state, node) {
	if (node['argument'] && !state.done_) {
		state.done_ = true;
		return new Interpreter.State(node['argument'], state.scope);
	}
	this.unwind(Interpreter.Completion.RETURN, state.value, undefined);
};

Interpreter.prototype['stepSequenceExpression'] = function(stack, state, node) {
	var n = state.n_ || 0;
	var expression = node['expressions'][n];
	if (expression) {
		state.n_ = n + 1;
		return new Interpreter.State(expression, state.scope);
	}
	stack.pop();
	stack[stack.length - 1].value = state.value;
};

Interpreter.prototype['stepSwitchStatement'] = function(stack, state, node) {
	if (!state.test_) {
		state.test_ = 1;
		return new Interpreter.State(node['discriminant'], state.scope);
	}
	if (state.test_ === 1) {
		state.test_ = 2;
		// Preserve switch value between case tests.
		state.switchValue_ = state.value;
		state.defaultCase_ = -1;
	}

	while (true) {
		var index = state.index_ || 0;
		var switchCase = node['cases'][index];
		if (!state.matched_ && switchCase && !switchCase['test']) {
			// Test on the default case is null.
			// Bypass (but store) the default case, and get back to it later.
			state.defaultCase_ = index;
			state.index_ = index + 1;
			continue;
		}
		if (!switchCase && !state.matched_ && state.defaultCase_ !== -1) {
			// Ran through all cases, no match.  Jump to the default.
			state.matched_ = true;
			state.index_ = state.defaultCase_;
			continue;
		}
		if (switchCase) {
			if (!state.matched_ && !state.tested_ && switchCase['test']) {
				state.tested_ = true;
				return new Interpreter.State(switchCase['test'], state.scope);
			}
			if (state.matched_ || state.value === state.switchValue_) {
				state.matched_ = true;
				var n = state.n_ || 0;
				if (switchCase['consequent'][n]) {
					state.isSwitch = true;
					state.n_ = n + 1;
					return new Interpreter.State(switchCase['consequent'][n],
						state.scope);
				}
			}
			// Move on to next case.
			state.tested_ = false;
			state.n_ = 0;
			state.index_ = index + 1;
		} else {
			stack.pop();
			return;
		}
	}
};

Interpreter.prototype['stepThisExpression'] = function(stack, state, node) {
	stack.pop();
	stack[stack.length - 1].value = this.getValueFromScope('this');
};

Interpreter.prototype['stepThrowStatement'] = function(stack, state, node) {
	if (!state.done_) {
		state.done_ = true;
		return new Interpreter.State(node['argument'], state.scope);
	} else {
		this.throwException(state.value);
	}
};

Interpreter.prototype['stepTryStatement'] = function(stack, state, node) {
	if (!state.doneBlock_) {
		state.doneBlock_ = true;
		return new Interpreter.State(node['block'], state.scope);
	}
	if (state.cv && state.cv.type === Interpreter.Completion.THROW &&
      !state.doneHandler_ && node['handler']) {
		state.doneHandler_ = true;
		var nextState = new Interpreter.State(node['handler'], state.scope);
		nextState.throwValue = state.cv.value;
		state.cv = undefined;  // This error has been handled, don't rethrow.
		return nextState;
	}
	if (!state.doneFinalizer_ && node['finalizer']) {
		state.doneFinalizer_ = true;
		return new Interpreter.State(node['finalizer'], state.scope);
	}
	stack.pop();
	if (state.cv) {
		// There was no catch handler, or the catch/finally threw an error.
		// Throw the error up to a higher try.
		this.unwind(state.cv.type, state.cv.value, state.cv.label);
	}
};

Interpreter.prototype['stepUnaryExpression'] = function(stack, state, node) {
	if (!state.done_) {
		state.done_ = true;
		var nextState = new Interpreter.State(node['argument'], state.scope);
		nextState.components = node['operator'] === 'delete';
		return nextState;
	}
	stack.pop();
	var value = state.value;
	if (node['operator'] === '-') {
		value = -value;
	} else if (node['operator'] === '+') {
		value = +value;
	} else if (node['operator'] === '!') {
		value = !value;
	} else if (node['operator'] === '~') {
		value = ~value;
	} else if (node['operator'] === 'delete') {
		var result = true;
		// If value is not an array, then it is a primitive, or some other value.
		// If so, skip the delete and return true.
		if (Array.isArray(value)) {
			var obj = value[0];
			if (obj === Interpreter.SCOPE_REFERENCE) {
				// 'delete foo;' is the same as 'delete window.foo'.
				obj = state.scope;
			}
			var name = String(value[1]);
			try {
				delete obj.properties[name];
			} catch (e) {
				if (state.scope.strict) {
					this.throwException(this.TYPE_ERROR, 'Cannot delete property \'' +
                              name + '\' of \'' + obj + '\'');
				} else {
					result = false;
				}
			}
		}
		value = result;
	} else if (node['operator'] === 'typeof') {
		value = (value && value.class === 'Function') ? 'function' : typeof value;
	} else if (node['operator'] === 'void') {
		value = undefined;
	} else {
		throw SyntaxError('Unknown unary operator: ' + node['operator']);
	}
	stack[stack.length - 1].value = value;
};

Interpreter.prototype['stepUpdateExpression'] = function(stack, state, node) {
	if (!state.doneLeft_) {
		state.doneLeft_ = true;
		var nextState = new Interpreter.State(node['argument'], state.scope);
		nextState.components = true;
		return nextState;
	}
	if (!state.leftSide_) {
		state.leftSide_ = state.value;
	}
	if (state.doneGetter_) {
		state.leftValue_ = state.value;
	}
	if (!state.doneGetter_) {
		var leftValue = this.getValue(state.leftSide_);
		state.leftValue_ = leftValue;
		if (leftValue && typeof leftValue === 'object' && leftValue.isGetter) {
			// Clear the getter flag and call the getter function.
			leftValue.isGetter = false;
			state.doneGetter_ = true;
			var func = /** @type {!Interpreter.Object} */ (leftValue);
			return this.createGetter_(func, state.leftSide_);
		}
	}
	if (state.doneSetter_) {
		// Return if setter function.
		// Setter method on property has completed.
		// Ignore its return value, and use the original set value instead.
		stack.pop();
		stack[stack.length - 1].value = state.setterValue_;
		return;
	}
	var leftValue = Number(state.leftValue_);
	var changeValue;
	if (node['operator'] === '++') {
		changeValue = leftValue + 1;
	} else if (node['operator'] === '--') {
		changeValue = leftValue - 1;
	} else {
		throw SyntaxError('Unknown update expression: ' + node['operator']);
	}
	var returnValue = node['prefix'] ? changeValue : leftValue;
	var setter = this.setValue(state.leftSide_, changeValue);
	if (setter) {
		state.doneSetter_ = true;
		state.setterValue_ = returnValue;
		return this.createSetter_(setter, state.leftSide_, changeValue);
	}
	// Return if no setter function.
	stack.pop();
	stack[stack.length - 1].value = returnValue;
};

Interpreter.prototype['stepVariableDeclaration'] = function(stack, state, node) {
	var declarations = node['declarations'];
	var n = state.n_ || 0;
	var declarationNode = declarations[n];
	if (state.init_ && declarationNode) {
		// This setValue call never needs to deal with calling a setter function.
		// Note that this is setting the init value, not defining the variable.
		// Variable definition is done when scope is populated.
		this.setValueToScope(declarationNode['id']['name'], state.value);
		state.init_ = false;
		declarationNode = declarations[++n];
	}
	while (declarationNode) {
		// Skip any declarations that are not initialized.  They have already
		// been defined as undefined in populateScope_.
		if (declarationNode['init']) {
			state.n_ = n;
			state.init_ = true;
			return new Interpreter.State(declarationNode['init'], state.scope);
		}
		declarationNode = declarations[++n];
	}
	stack.pop();
};

Interpreter.prototype['stepWithStatement'] = function(stack, state, node) {
	if (!state.doneObject_) {
		state.doneObject_ = true;
		return new Interpreter.State(node['object'], state.scope);
	} else if (!state.doneBody_) {
		state.doneBody_ = true;
		var scope = this.createSpecialScope(state.scope, state.value);
		return new Interpreter.State(node['body'], scope);
	} else {
		stack.pop();
	}
};

Interpreter.prototype['stepWhileStatement'] =
    Interpreter.prototype['stepDoWhileStatement'];

// Preserve top-level API functions from being pruned/renamed by JS compilers.
// Add others as needed.
// The global object ('window' in a browser, 'global' in node.js) is 'this'.
this['Interpreter'] = Interpreter;
Interpreter.prototype['step'] = Interpreter.prototype.step;
Interpreter.prototype['run'] = Interpreter.prototype.run;
Interpreter.prototype['appendCode'] = Interpreter.prototype.appendCode;
Interpreter.prototype['createObject'] = Interpreter.prototype.createObject;
Interpreter.prototype['createObjectProto'] =
    Interpreter.prototype.createObjectProto;
Interpreter.prototype['createAsyncFunction'] =
    Interpreter.prototype.createAsyncFunction;
Interpreter.prototype['createNativeFunction'] =
    Interpreter.prototype.createNativeFunction;
Interpreter.prototype['getProperty'] = Interpreter.prototype.getProperty;
Interpreter.prototype['setProperty'] = Interpreter.prototype.setProperty;
Interpreter.prototype['nativeToPseudo'] = Interpreter.prototype.nativeToPseudo;
Interpreter.prototype['pseudoToNative'] = Interpreter.prototype.pseudoToNative;
// Obsolete.  Do not use.
Interpreter.prototype['createPrimitive'] = function(x) {return x;};

module.exports = Interpreter;

/***/ }),

/***/ 1646:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* eslint-disable */

// Acorn is a tiny, fast JavaScript parser written in JavaScript.
//
// Acorn was written by Marijn Haverbeke and released under an MIT
// license. The Unicode regexps (for identifiers and whitespace) were
// taken from [Esprima](http://esprima.org) by Ariya Hidayat.
//
// Git repositories for Acorn are available at
//
//     http://marijnhaverbeke.nl/git/acorn
//     https://github.com/marijnh/acorn.git
//
// Please use the [github bug tracker][ghbt] to report issues.
//
// [ghbt]: https://github.com/marijnh/acorn/issues
//
// This file defines the main parser interface. The library also comes
// with a [error-tolerant parser][dammit] and an
// [abstract syntax tree walker][walk], defined in other files.
//
// [dammit]: acorn_loose.js
// [walk]: util/walk.js

(function(root, mod) {
	if (true) return mod(exports); // CommonJS
	if (true) return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (mod),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
	mod(root.acorn || (root.acorn = {})); // Plain browser env
})(this, function(exports) {
	'use strict';
  
	exports.version = '0.4.1';
  
	// The main exported interface (under `self.acorn` when in the
	// browser) is a `parse` function that takes a code string and
	// returns an abstract syntax tree as specified by [Mozilla parser
	// API][api], with the caveat that the SpiderMonkey-specific syntax
	// (`let`, `yield`, inline XML, etc) is not recognized.
	//
	// [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API
  
	var options, input, inputLen, sourceFile;
  
	exports.parse = function(inpt, opts) {
	  input = String(inpt); inputLen = input.length;
	  setOptions(opts);
	  initTokenState();
	  return parseTopLevel(options.program);
	};
  
	// A second optional argument can be given to further configure
	// the parser process. These options are recognized:
  
	var defaultOptions = exports.defaultOptions = {
	  // `ecmaVersion` indicates the ECMAScript version to parse. Must
	  // be either 3 or 5. This
	  // influences support for strict mode, the set of reserved words, and
	  // support for getters and setter.
	  ecmaVersion: 5,
	  // Turn on `strictSemicolons` to prevent the parser from doing
	  // automatic semicolon insertion.
	  strictSemicolons: false,
	  // When `allowTrailingCommas` is false, the parser will not allow
	  // trailing commas in array and object literals.
	  allowTrailingCommas: true,
	  // By default, reserved words are not enforced. Enable
	  // `forbidReserved` to enforce them.
	  forbidReserved: false,
	  // When `locations` is on, `loc` properties holding objects with
	  // `start` and `end` properties in `{line, column}` form (with
	  // line being 1-based and column 0-based) will be attached to the
	  // nodes.
	  locations: false,
	  // A function can be passed as `onComment` option, which will
	  // cause Acorn to call that function with `(block, text, start,
	  // end)` parameters whenever a comment is skipped. `block` is a
	  // boolean indicating whether this is a block (`/* */`) comment,
	  // `text` is the content of the comment, and `start` and `end` are
	  // character offsets that denote the start and end of the comment.
	  // When the `locations` option is on, two more parameters are
	  // passed, the full `{line, column}` locations of the start and
	  // end of the comments.
	  onComment: null,
	  // Nodes have their start and end characters offsets recorded in
	  // `start` and `end` properties (directly on the node, rather than
	  // the `loc` object, which holds line/column data. To also add a
	  // [semi-standardized][range] `range` property holding a `[start,
	  // end]` array with the same numbers, set the `ranges` option to
	  // `true`.
	  //
	  // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
	  ranges: false,
	  // It is possible to parse multiple files into a single AST by
	  // passing the tree produced by parsing the first file as
	  // `program` option in subsequent parses. This will add the
	  // toplevel forms of the parsed file to the `Program` (top) node
	  // of an existing parse tree.
	  program: null,
	  // When `location` is on, you can pass this to record the source
	  // file in every node's `loc` object.
	  sourceFile: null,
	  // This value, if given, is stored in every node, whether
	  // `location` is on or off.
	  directSourceFile: null
	};
  
	function setOptions(opts) {
	  options = opts || {};
	  for (var opt in defaultOptions) if (!Object.prototype.hasOwnProperty.call(options, opt))
			options[opt] = defaultOptions[opt];
	  sourceFile = options.sourceFile || null;
	}
  
	// The `getLineInfo` function is mostly useful when the
	// `locations` option is off (for performance reasons) and you
	// want to find the line/column position for a given character
	// offset. `input` should be the code string that the offset refers
	// into.
  
	var getLineInfo = exports.getLineInfo = function(input, offset) {
	  for (var line = 1, cur = 0;;) {
			lineBreak.lastIndex = cur;
			var match = lineBreak.exec(input);
			if (match && match.index < offset) {
		  ++line;
		  cur = match.index + match[0].length;
			} else break;
	  }
	  return {line: line, column: offset - cur};
	};
  
	// Acorn is organized as a tokenizer and a recursive-descent parser.
	// The `tokenize` export provides an interface to the tokenizer.
	// Because the tokenizer is optimized for being efficiently used by
	// the Acorn parser itself, this interface is somewhat crude and not
	// very modular. Performing another parse or call to `tokenize` will
	// reset the internal state, and invalidate existing tokenizers.
  
	exports.tokenize = function(inpt, opts) {
	  input = String(inpt); inputLen = input.length;
	  setOptions(opts);
	  initTokenState();
  
	  var t = {};
	  function getToken(forceRegexp) {
			readToken(forceRegexp);
			t.start = tokStart; t.end = tokEnd;
			t.startLoc = tokStartLoc; t.endLoc = tokEndLoc;
			t.type = tokType; t.value = tokVal;
			return t;
	  }
	  getToken.jumpTo = function(pos, reAllowed) {
			tokPos = pos;
			if (options.locations) {
		  tokCurLine = 1;
		  tokLineStart = lineBreak.lastIndex = 0;
		  var match;
		  while ((match = lineBreak.exec(input)) && match.index < pos) {
					++tokCurLine;
					tokLineStart = match.index + match[0].length;
		  }
			}
			tokRegexpAllowed = reAllowed;
			skipSpace();
	  };
	  return getToken;
	};
  
	// State is kept in (closure-)global variables. We already saw the
	// `options`, `input`, and `inputLen` variables above.
  
	// The current position of the tokenizer in the input.
  
	var tokPos;
  
	// The start and end offsets of the current token.
  
	var tokStart, tokEnd;
  
	// When `options.locations` is true, these hold objects
	// containing the tokens start and end line/column pairs.
  
	var tokStartLoc, tokEndLoc;
  
	// The type and value of the current token. Token types are objects,
	// named by variables against which they can be compared, and
	// holding properties that describe them (indicating, for example,
	// the precedence of an infix operator, and the original name of a
	// keyword token). The kind of value that's held in `tokVal` depends
	// on the type of the token. For literals, it is the literal value,
	// for operators, the operator name, and so on.
  
	var tokType, tokVal;
  
	// Interal state for the tokenizer. To distinguish between division
	// operators and regular expressions, it remembers whether the last
	// token was one that is allowed to be followed by an expression.
	// (If it is, a slash is probably a regexp, if it isn't it's a
	// division operator. See the `parseStatement` function for a
	// caveat.)
  
	var tokRegexpAllowed;
  
	// When `options.locations` is true, these are used to keep
	// track of the current line, and know when a new line has been
	// entered.
  
	var tokCurLine, tokLineStart;
  
	// These store the position of the previous token, which is useful
	// when finishing a node and assigning its `end` position.
  
	var lastStart, lastEnd, lastEndLoc;
  
	// This is the parser's state. `inFunction` is used to reject
	// `return` statements outside of functions, `labels` to verify that
	// `break` and `continue` have somewhere to jump to, and `strict`
	// indicates whether strict mode is on.
  
	var inFunction, labels, strict;
  
	// This function is used to raise exceptions on parse errors. It
	// takes an offset integer (into the current `input`) to indicate
	// the location of the error, attaches the position to the end
	// of the error message, and then raises a `SyntaxError` with that
	// message.
  
	function raise(pos, message) {
	  var loc = getLineInfo(input, pos);
	  message += ' (' + loc.line + ':' + loc.column + ')';
	  var err = new SyntaxError(message);
	  err.pos = pos; err.loc = loc; err.raisedAt = tokPos;
	  throw err;
	}
  
	// Reused empty array added for node fields that are always empty.
  
	var empty = [];
  
	// ## Token types
  
	// The assignment of fine-grained, information-carrying type objects
	// allows the tokenizer to store the information it has about a
	// token in a way that is very cheap for the parser to look up.
  
	// All token type variables start with an underscore, to make them
	// easy to recognize.
  
	// These are the general types. The `type` property is only used to
	// make them recognizeable when debugging.
  
	var _num = {type: 'num'}, _regexp = {type: 'regexp'}, _string = {type: 'string'};
	var _name = {type: 'name'}, _eof = {type: 'eof'};
  
	// Keyword tokens. The `keyword` property (also used in keyword-like
	// operators) indicates that the token originated from an
	// identifier-like word, which is used when parsing property names.
	//
	// The `beforeExpr` property is used to disambiguate between regular
	// expressions and divisions. It is set on all token types that can
	// be followed by an expression (thus, a slash after them would be a
	// regular expression).
	//
	// `isLoop` marks a keyword as starting a loop, which is important
	// to know when parsing a label, in order to allow or disallow
	// continue jumps to that label.
  
	var _break = {keyword: 'break'}, _case = {keyword: 'case', beforeExpr: true}, _catch = {keyword: 'catch'};
	var _continue = {keyword: 'continue'}, _debugger = {keyword: 'debugger'}, _default = {keyword: 'default'};
	var _do = {keyword: 'do', isLoop: true}, _else = {keyword: 'else', beforeExpr: true};
	var _finally = {keyword: 'finally'}, _for = {keyword: 'for', isLoop: true}, _function = {keyword: 'function'};
	var _if = {keyword: 'if'}, _return = {keyword: 'return', beforeExpr: true}, _switch = {keyword: 'switch'};
	var _throw = {keyword: 'throw', beforeExpr: true}, _try = {keyword: 'try'}, _var = {keyword: 'var'};
	var _while = {keyword: 'while', isLoop: true}, _with = {keyword: 'with'}, _new = {keyword: 'new', beforeExpr: true};
	var _this = {keyword: 'this'};
  
	// The keywords that denote values.
  
	var _null = {keyword: 'null', atomValue: null}, _true = {keyword: 'true', atomValue: true};
	var _false = {keyword: 'false', atomValue: false};
  
	// Some keywords are treated as regular operators. `in` sometimes
	// (when parsing `for`) needs to be tested against specifically, so
	// we assign a variable name to it for quick comparing.
  
	var _in = {keyword: 'in', binop: 7, beforeExpr: true};
  
	// Map keyword names to token types.
  
	var keywordTypes = {'break': _break, 'case': _case, 'catch': _catch,
		'continue': _continue, 'debugger': _debugger, 'default': _default,
		'do': _do, 'else': _else, 'finally': _finally, 'for': _for,
		'function': _function, 'if': _if, 'return': _return, 'switch': _switch,
		'throw': _throw, 'try': _try, 'var': _var, 'while': _while, 'with': _with,
		'null': _null, 'true': _true, 'false': _false, 'new': _new, 'in': _in,
		'instanceof': {keyword: 'instanceof', binop: 7, beforeExpr: true}, 'this': _this,
		'typeof': {keyword: 'typeof', prefix: true, beforeExpr: true},
		'void': {keyword: 'void', prefix: true, beforeExpr: true},
		'delete': {keyword: 'delete', prefix: true, beforeExpr: true}};
  
	// Punctuation token types. Again, the `type` property is purely for debugging.
  
	var _bracketL = {type: '[', beforeExpr: true}, _bracketR = {type: ']'}, _braceL = {type: '{', beforeExpr: true};
	var _braceR = {type: '}'}, _parenL = {type: '(', beforeExpr: true}, _parenR = {type: ')'};
	var _comma = {type: ',', beforeExpr: true}, _semi = {type: ';', beforeExpr: true};
	var _colon = {type: ':', beforeExpr: true}, _dot = {type: '.'}, _question = {type: '?', beforeExpr: true};
  
	// Operators. These carry several kinds of properties to help the
	// parser use them properly (the presence of these properties is
	// what categorizes them as operators).
	//
	// `binop`, when present, specifies that this operator is a binary
	// operator, and will refer to its precedence.
	//
	// `prefix` and `postfix` mark the operator as a prefix or postfix
	// unary operator. `isUpdate` specifies that the node produced by
	// the operator should be of type UpdateExpression rather than
	// simply UnaryExpression (`++` and `--`).
	//
	// `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
	// binary operators with a very low precedence, that should result
	// in AssignmentExpression nodes.
  
	var _slash = {binop: 10, beforeExpr: true}, _eq = {isAssign: true, beforeExpr: true};
	var _assign = {isAssign: true, beforeExpr: true};
	var _incDec = {postfix: true, prefix: true, isUpdate: true}, _prefix = {prefix: true, beforeExpr: true};
	var _logicalOR = {binop: 1, beforeExpr: true};
	var _logicalAND = {binop: 2, beforeExpr: true};
	var _bitwiseOR = {binop: 3, beforeExpr: true};
	var _bitwiseXOR = {binop: 4, beforeExpr: true};
	var _bitwiseAND = {binop: 5, beforeExpr: true};
	var _equality = {binop: 6, beforeExpr: true};
	var _relational = {binop: 7, beforeExpr: true};
	var _bitShift = {binop: 8, beforeExpr: true};
	var _plusMin = {binop: 9, prefix: true, beforeExpr: true};
	var _multiplyModulo = {binop: 10, beforeExpr: true};
  
	// Provide access to the token types for external users of the
	// tokenizer.
  
	exports.tokTypes = {bracketL: _bracketL, bracketR: _bracketR, braceL: _braceL, braceR: _braceR,
		parenL: _parenL, parenR: _parenR, comma: _comma, semi: _semi, colon: _colon,
		dot: _dot, question: _question, slash: _slash, eq: _eq, name: _name, eof: _eof,
		num: _num, regexp: _regexp, string: _string};
	for (var kw in keywordTypes) exports.tokTypes['_' + kw] = keywordTypes[kw];
  
	// This is a trick taken from Esprima. It turns out that, on
	// non-Chrome browsers, to check whether a string is in a set, a
	// predicate containing a big ugly `switch` statement is faster than
	// a regular expression, and on Chrome the two are about on par.
	// This function uses `eval` (non-lexical) to produce such a
	// predicate from a space-separated string of words.
	//
	// It starts by sorting the words by length.
  
	function makePredicate(words) {
	  words = words.split(' ');
	  var f = '', cats = [];
	  out: for (var i = 0; i < words.length; ++i) {
			for (var j = 0; j < cats.length; ++j)
		  if (cats[j][0].length == words[i].length) {
					cats[j].push(words[i]);
					continue out;
		  }
			cats.push([words[i]]);
	  }
	  function compareTo(arr) {
			if (arr.length == 1) return f += 'return str === ' + JSON.stringify(arr[0]) + ';';
			f += 'switch(str){';
			for (var i = 0; i < arr.length; ++i) f += 'case ' + JSON.stringify(arr[i]) + ':';
			f += 'return true}return false;';
	  }
  
	  // When there are more than three length categories, an outer
	  // switch first dispatches on the lengths, to save on comparisons.
  
	  if (cats.length > 3) {
			cats.sort(function(a, b) {return b.length - a.length;});
			f += 'switch(str.length){';
			for (var i = 0; i < cats.length; ++i) {
		  var cat = cats[i];
		  f += 'case ' + cat[0].length + ':';
		  compareTo(cat);
			}
			f += '}';
  
	  // Otherwise, simply generate a flat `switch` statement.
  
	  } else {
			compareTo(words);
	  }
	  return new Function('str', f);
	}
  
	// The ECMAScript 3 reserved word list.
  
	var isReservedWord3 = makePredicate('abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile');
  
	// ECMAScript 5 reserved words.
  
	var isReservedWord5 = makePredicate('class enum extends super const export import');
  
	// The additional reserved words in strict mode.
  
	var isStrictReservedWord = makePredicate('implements interface let package private protected public static yield');
  
	// The forbidden variable names in strict mode.
  
	var isStrictBadIdWord = makePredicate('eval arguments');
  
	// And the keywords.
  
	var isKeyword = makePredicate('break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this');
  
	// ## Character categories
  
	// Big ugly regular expressions that match characters in the
	// whitespace, identifier, and identifier-start categories. These
	// are only applied when a character is found to actually have a
	// code point above 128.
  
	var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
	var nonASCIIidentifierStartChars = '\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc';
	var nonASCIIidentifierChars = '\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f';
	var nonASCIIidentifierStart = new RegExp('[' + nonASCIIidentifierStartChars + ']');
	var nonASCIIidentifier = new RegExp('[' + nonASCIIidentifierStartChars + nonASCIIidentifierChars + ']');
  
	// Whether a single character denotes a newline.
  
	var newline = /[\n\r\u2028\u2029]/;
  
	// Matches a whole line break (where CRLF is considered a single
	// line break). Used to count lines.
  
	var lineBreak = /\r\n|[\n\r\u2028\u2029]/g;
  
	// Test whether a given character code starts an identifier.
  
	var isIdentifierStart = exports.isIdentifierStart = function(code) {
	  if (code < 65) return code === 36;
	  if (code < 91) return true;
	  if (code < 97) return code === 95;
	  if (code < 123)return true;
	  return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
	};
  
	// Test whether a given character is part of an identifier.
  
	var isIdentifierChar = exports.isIdentifierChar = function(code) {
	  if (code < 48) return code === 36;
	  if (code < 58) return true;
	  if (code < 65) return false;
	  if (code < 91) return true;
	  if (code < 97) return code === 95;
	  if (code < 123)return true;
	  return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
	};
  
	// ## Tokenizer
  
	// These are used when `options.locations` is on, for the
	// `tokStartLoc` and `tokEndLoc` properties.
  
	function line_loc_t() {
	  this.line = tokCurLine;
	  this.column = tokPos - tokLineStart;
	}
  
	// Reset the token state. Used at the start of a parse.
  
	function initTokenState() {
	  tokCurLine = 1;
	  tokPos = tokLineStart = 0;
	  tokRegexpAllowed = true;
	  skipSpace();
	}
  
	// Called at the end of every token. Sets `tokEnd`, `tokVal`, and
	// `tokRegexpAllowed`, and skips the space after the token, so that
	// the next one's `tokStart` will point at the right position.
  
	function finishToken(type, val) {
	  tokEnd = tokPos;
	  if (options.locations) tokEndLoc = new line_loc_t;
	  tokType = type;
	  skipSpace();
	  tokVal = val;
	  tokRegexpAllowed = type.beforeExpr;
	}
  
	function skipBlockComment() {
	  var startLoc = options.onComment && options.locations && new line_loc_t;
	  var start = tokPos, end = input.indexOf('*/', tokPos += 2);
	  if (end === -1) raise(tokPos - 2, 'Unterminated comment');
	  tokPos = end + 2;
	  if (options.locations) {
			lineBreak.lastIndex = start;
			var match;
			while ((match = lineBreak.exec(input)) && match.index < tokPos) {
		  ++tokCurLine;
		  tokLineStart = match.index + match[0].length;
			}
	  }
	  if (options.onComment)
			options.onComment(true, input.slice(start + 2, end), start, tokPos,
						  startLoc, options.locations && new line_loc_t);
	}
  
	function skipLineComment() {
	  var start = tokPos;
	  var startLoc = options.onComment && options.locations && new line_loc_t;
	  var ch = input.charCodeAt(tokPos+=2);
	  while (tokPos < inputLen && ch !== 10 && ch !== 13 && ch !== 8232 && ch !== 8233) {
			++tokPos;
			ch = input.charCodeAt(tokPos);
	  }
	  if (options.onComment)
			options.onComment(false, input.slice(start + 2, tokPos), start, tokPos,
						  startLoc, options.locations && new line_loc_t);
	}
  
	// Called at the start of the parse and after every token. Skips
	// whitespace and comments, and.
  
	function skipSpace() {
	  while (tokPos < inputLen) {
			var ch = input.charCodeAt(tokPos);
			if (ch === 32) { // ' '
		  ++tokPos;
			} else if (ch === 13) {
		  ++tokPos;
		  var next = input.charCodeAt(tokPos);
		  if (next === 10) {
					++tokPos;
		  }
		  if (options.locations) {
					++tokCurLine;
					tokLineStart = tokPos;
		  }
			} else if (ch === 10 || ch === 8232 || ch === 8233) {
		  ++tokPos;
		  if (options.locations) {
					++tokCurLine;
					tokLineStart = tokPos;
		  }
			} else if (ch > 8 && ch < 14) {
		  ++tokPos;
			} else if (ch === 47) { // '/'
		  var next = input.charCodeAt(tokPos + 1);
		  if (next === 42) { // '*'
					skipBlockComment();
		  } else if (next === 47) { // '/'
					skipLineComment();
		  } else break;
			} else if (ch === 160) { // '\xa0'
		  ++tokPos;
			} else if (ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
		  ++tokPos;
			} else {
		  break;
			}
	  }
	}
  
	// ### Token reading
  
	// This is the function that is called to fetch the next token. It
	// is somewhat obscure, because it works in character codes rather
	// than characters, and because operator parsing has been inlined
	// into it.
	//
	// All in the name of speed.
	//
	// The `forceRegexp` parameter is used in the one case where the
	// `tokRegexpAllowed` trick does not work. See `parseStatement`.
  
	function readToken_dot() {
	  var next = input.charCodeAt(tokPos + 1);
	  if (next >= 48 && next <= 57) return readNumber(true);
	  ++tokPos;
	  return finishToken(_dot);
	}
  
	function readToken_slash() { // '/'
	  var next = input.charCodeAt(tokPos + 1);
	  if (tokRegexpAllowed) {++tokPos; return readRegexp();}
	  if (next === 61) return finishOp(_assign, 2);
	  return finishOp(_slash, 1);
	}
  
	function readToken_mult_modulo() { // '%*'
	  var next = input.charCodeAt(tokPos + 1);
	  if (next === 61) return finishOp(_assign, 2);
	  return finishOp(_multiplyModulo, 1);
	}
  
	function readToken_pipe_amp(code) { // '|&'
	  var next = input.charCodeAt(tokPos + 1);
	  if (next === code) return finishOp(code === 124 ? _logicalOR : _logicalAND, 2);
	  if (next === 61) return finishOp(_assign, 2);
	  return finishOp(code === 124 ? _bitwiseOR : _bitwiseAND, 1);
	}
  
	function readToken_caret() { // '^'
	  var next = input.charCodeAt(tokPos + 1);
	  if (next === 61) return finishOp(_assign, 2);
	  return finishOp(_bitwiseXOR, 1);
	}
  
	function readToken_plus_min(code) { // '+-'
	  var next = input.charCodeAt(tokPos + 1);
	  if (next === code) {
			if (next == 45 && input.charCodeAt(tokPos + 2) == 62 &&
			newline.test(input.slice(lastEnd, tokPos))) {
		  // A `-->` line comment
		  tokPos += 3;
		  skipLineComment();
		  skipSpace();
		  return readToken();
			}
			return finishOp(_incDec, 2);
	  }
	  if (next === 61) return finishOp(_assign, 2);
	  return finishOp(_plusMin, 1);
	}
  
	function readToken_lt_gt(code) { // '<>'
	  var next = input.charCodeAt(tokPos + 1);
	  var size = 1;
	  if (next === code) {
			size = code === 62 && input.charCodeAt(tokPos + 2) === 62 ? 3 : 2;
			if (input.charCodeAt(tokPos + size) === 61) return finishOp(_assign, size + 1);
			return finishOp(_bitShift, size);
	  }
	  if (next == 33 && code == 60 && input.charCodeAt(tokPos + 2) == 45 &&
		  input.charCodeAt(tokPos + 3) == 45) {
		// `<!--`, an XML-style comment that should be interpreted as a line comment
			tokPos += 4;
			skipLineComment();
			skipSpace();
			return readToken();
	  }
	  if (next === 61)
			size = input.charCodeAt(tokPos + 2) === 61 ? 3 : 2;
	  return finishOp(_relational, size);
	}
  
	function readToken_eq_excl(code) { // '=!'
	  var next = input.charCodeAt(tokPos + 1);
	  if (next === 61) return finishOp(_equality, input.charCodeAt(tokPos + 2) === 61 ? 3 : 2);
	  return finishOp(code === 61 ? _eq : _prefix, 1);
	}
  
	function getTokenFromCode(code) {
	  switch(code) {
		// The interpretation of a dot depends on whether it is followed
		// by a digit.
	  case 46: // '.'
				return readToken_dot();
  
				// Punctuation tokens.
	  case 40: ++tokPos; return finishToken(_parenL);
	  case 41: ++tokPos; return finishToken(_parenR);
	  case 59: ++tokPos; return finishToken(_semi);
	  case 44: ++tokPos; return finishToken(_comma);
	  case 91: ++tokPos; return finishToken(_bracketL);
	  case 93: ++tokPos; return finishToken(_bracketR);
	  case 123: ++tokPos; return finishToken(_braceL);
	  case 125: ++tokPos; return finishToken(_braceR);
	  case 58: ++tokPos; return finishToken(_colon);
	  case 63: ++tokPos; return finishToken(_question);
  
				// '0x' is a hexadecimal number.
	  case 48: // '0'
				var next = input.charCodeAt(tokPos + 1);
				if (next === 120 || next === 88) return readHexNumber();
				// Anything else beginning with a digit is an integer, octal
				// number, or float.
	  case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: // 1-9
				return readNumber(false);
  
				// Quotes produce strings.
	  case 34: case 39: // '"', "'"
				return readString(code);
  
	  // Operators are parsed inline in tiny state machines. '=' (61) is
	  // often referred to. `finishOp` simply skips the amount of
	  // characters it is given as second argument, and returns a token
	  // of the type given by its first argument.
  
	  case 47: // '/'
				return readToken_slash(code);
  
	  case 37: case 42: // '%*'
				return readToken_mult_modulo();
  
	  case 124: case 38: // '|&'
				return readToken_pipe_amp(code);
  
	  case 94: // '^'
				return readToken_caret();
  
	  case 43: case 45: // '+-'
				return readToken_plus_min(code);
  
	  case 60: case 62: // '<>'
				return readToken_lt_gt(code);
  
	  case 61: case 33: // '=!'
				return readToken_eq_excl(code);
  
	  case 126: // '~'
				return finishOp(_prefix, 1);
	  }
  
	  return false;
	}
  
	function readToken(forceRegexp) {
	  if (!forceRegexp) tokStart = tokPos;
	  else tokPos = tokStart + 1;
	  if (options.locations) tokStartLoc = new line_loc_t;
	  if (forceRegexp) return readRegexp();
	  if (tokPos >= inputLen) return finishToken(_eof);
  
	  var code = input.charCodeAt(tokPos);
	  // Identifier or keyword. '\uXXXX' sequences are allowed in
	  // identifiers, so '\' also dispatches to that.
	  if (isIdentifierStart(code) || code === 92 /* '\' */) return readWord();
  
	  var tok = getTokenFromCode(code);
  
	  if (tok === false) {
		// If we are here, we either found a non-ASCII identifier
		// character, or something that's entirely disallowed.
			var ch = String.fromCharCode(code);
			if (ch === '\\' || nonASCIIidentifierStart.test(ch)) return readWord();
			raise(tokPos, 'Unexpected character \'' + ch + '\'');
	  }
	  return tok;
	}
  
	function finishOp(type, size) {
	  var str = input.slice(tokPos, tokPos + size);
	  tokPos += size;
	  finishToken(type, str);
	}
  
	// Parse a regular expression. Some context-awareness is necessary,
	// since a '/' inside a '[]' set does not end the expression.
  
	function readRegexp() {
	  var content = '', escaped, inClass, start = tokPos;
	  for (;;) {
			if (tokPos >= inputLen) raise(start, 'Unterminated regular expression');
			var ch = input.charAt(tokPos);
			if (newline.test(ch)) raise(start, 'Unterminated regular expression');
			if (!escaped) {
		  if (ch === '[') inClass = true;
		  else if (ch === ']' && inClass) inClass = false;
		  else if (ch === '/' && !inClass) break;
		  escaped = ch === '\\';
			} else escaped = false;
			++tokPos;
	  }
	  var content = input.slice(start, tokPos);
	  ++tokPos;
	  // Need to use `readWord1` because '\uXXXX' sequences are allowed
	  // here (don't ask).
	  var mods = readWord1();
	  if (mods && !/^[gmsiy]*$/.test(mods)) raise(start, 'Invalid regexp flag');
	  return finishToken(_regexp, new RegExp(content, mods));
	}
  
	// Read an integer in the given radix. Return null if zero digits
	// were read, the integer value otherwise. When `len` is given, this
	// will return `null` unless the integer has exactly `len` digits.
  
	function readInt(radix, len) {
	  var start = tokPos, total = 0;
	  for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
			var code = input.charCodeAt(tokPos), val;
			if (code >= 97) val = code - 97 + 10; // a
			else if (code >= 65) val = code - 65 + 10; // A
			else if (code >= 48 && code <= 57) val = code - 48; // 0-9
			else val = Infinity;
			if (val >= radix) break;
			++tokPos;
			total = total * radix + val;
	  }
	  if (tokPos === start || len != null && tokPos - start !== len) return null;
  
	  return total;
	}
  
	function readHexNumber() {
	  tokPos += 2; // 0x
	  var val = readInt(16);
	  if (val == null) raise(tokStart + 2, 'Expected hexadecimal number');
	  if (isIdentifierStart(input.charCodeAt(tokPos))) raise(tokPos, 'Identifier directly after number');
	  return finishToken(_num, val);
	}
  
	// Read an integer, octal integer, or floating-point number.
  
	function readNumber(startsWithDot) {
	  var start = tokPos, isFloat = false, octal = input.charCodeAt(tokPos) === 48;
	  if (!startsWithDot && readInt(10) === null) raise(start, 'Invalid number');
	  if (input.charCodeAt(tokPos) === 46) {
			++tokPos;
			readInt(10);
			isFloat = true;
	  }
	  var next = input.charCodeAt(tokPos);
	  if (next === 69 || next === 101) { // 'eE'
			next = input.charCodeAt(++tokPos);
			if (next === 43 || next === 45) ++tokPos; // '+-'
			if (readInt(10) === null) raise(start, 'Invalid number');
			isFloat = true;
	  }
	  if (isIdentifierStart(input.charCodeAt(tokPos))) raise(tokPos, 'Identifier directly after number');
  
	  var str = input.slice(start, tokPos), val;
	  if (isFloat) val = parseFloat(str);
	  else if (!octal || str.length === 1) val = parseInt(str, 10);
	  else if (/[89]/.test(str) || strict) raise(start, 'Invalid number');
	  else val = parseInt(str, 8);
	  return finishToken(_num, val);
	}
  
	// Read a string value, interpreting backslash-escapes.
  
	function readString(quote) {
	  tokPos++;
	  var out = '';
	  for (;;) {
			if (tokPos >= inputLen) raise(tokStart, 'Unterminated string constant');
			var ch = input.charCodeAt(tokPos);
			if (ch === quote) {
		  ++tokPos;
		  return finishToken(_string, out);
			}
			if (ch === 92) { // '\'
		  ch = input.charCodeAt(++tokPos);
		  var octal = /^[0-7]+/.exec(input.slice(tokPos, tokPos + 3));
		  if (octal) octal = octal[0];
		  while (octal && parseInt(octal, 8) > 255) octal = octal.slice(0, -1);
		  if (octal === '0') octal = null;
		  ++tokPos;
		  if (octal) {
					if (strict) raise(tokPos - 2, 'Octal literal in strict mode');
					out += String.fromCharCode(parseInt(octal, 8));
					tokPos += octal.length - 1;
		  } else {
					switch (ch) {
						case 110: out += '\n'; break; // 'n' -> '\n'
						case 114: out += '\r'; break; // 'r' -> '\r'
						case 120: out += String.fromCharCode(readHexChar(2)); break; // 'x'
						case 117: out += String.fromCharCode(readHexChar(4)); break; // 'u'
						case 85: out += String.fromCharCode(readHexChar(8)); break; // 'U'
						case 116: out += '\t'; break; // 't' -> '\t'
						case 98: out += '\b'; break; // 'b' -> '\b'
						case 118: out += '\u000b'; break; // 'v' -> '\u000b'
						case 102: out += '\f'; break; // 'f' -> '\f'
						case 48: out += '\0'; break; // 0 -> '\0'
						case 13: if (input.charCodeAt(tokPos) === 10) ++tokPos; // '\r\n'
						case 10: // ' \n'
			  if (options.locations) { tokLineStart = tokPos; ++tokCurLine; }
			  break;
						default: out += String.fromCharCode(ch); break;
					}
		  }
			} else {
		  if (ch === 13 || ch === 10 || ch === 8232 || ch === 8233) raise(tokStart, 'Unterminated string constant');
		  out += String.fromCharCode(ch); // '\'
		  ++tokPos;
			}
	  }
	}
  
	// Used to read character escape sequences ('\x', '\u', '\U').
  
	function readHexChar(len) {
	  var n = readInt(16, len);
	  if (n === null) raise(tokStart, 'Bad character escape sequence');
	  return n;
	}
  
	// Used to signal to callers of `readWord1` whether the word
	// contained any escape sequences. This is needed because words with
	// escape sequences must not be interpreted as keywords.
  
	var containsEsc;
  
	// Read an identifier, and return it as a string. Sets `containsEsc`
	// to whether the word contained a '\u' escape.
	//
	// Only builds up the word character-by-character when it actually
	// containeds an escape, as a micro-optimization.
  
	function readWord1() {
	  containsEsc = false;
	  var word, first = true, start = tokPos;
	  for (;;) {
			var ch = input.charCodeAt(tokPos);
			if (isIdentifierChar(ch)) {
		  if (containsEsc) word += input.charAt(tokPos);
		  ++tokPos;
			} else if (ch === 92) { // "\"
		  if (!containsEsc) word = input.slice(start, tokPos);
		  containsEsc = true;
		  if (input.charCodeAt(++tokPos) != 117) // "u"
					raise(tokPos, 'Expecting Unicode escape sequence \\uXXXX');
		  ++tokPos;
		  var esc = readHexChar(4);
		  var escStr = String.fromCharCode(esc);
		  if (!escStr) raise(tokPos - 1, 'Invalid Unicode escape');
		  if (!(first ? isIdentifierStart(esc) : isIdentifierChar(esc)))
					raise(tokPos - 4, 'Invalid Unicode escape');
		  word += escStr;
			} else {
		  break;
			}
			first = false;
	  }
	  return containsEsc ? word : input.slice(start, tokPos);
	}
  
	// Read an identifier or keyword token. Will check for reserved
	// words when necessary.
  
	function readWord() {
	  var word = readWord1();
	  var type = _name;
	  if (!containsEsc) {
			if (isKeyword(word)) type = keywordTypes[word];
			else if (options.forbidReserved &&
				 (options.ecmaVersion === 3 ? isReservedWord3 : isReservedWord5)(word) ||
				 strict && isStrictReservedWord(word))
		  raise(tokStart, 'The keyword \'' + word + '\' is reserved');
	  }
	  return finishToken(type, word);
	}
  
	// ## Parser
  
	// A recursive descent parser operates by defining functions for all
	// syntactic elements, and recursively calling those, each function
	// advancing the input stream and returning an AST node. Precedence
	// of constructs (for example, the fact that `!x[1]` means `!(x[1])`
	// instead of `(!x)[1]` is handled by the fact that the parser
	// function that parses unary prefix operators is called first, and
	// in turn calls the function that parses `[]` subscripts — that
	// way, it'll receive the node for `x[1]` already parsed, and wraps
	// *that* in the unary operator node.
	//
	// Acorn uses an [operator precedence parser][opp] to handle binary
	// operator precedence, because it is much more compact than using
	// the technique outlined above, which uses different, nesting
	// functions to specify precedence, for all of the ten binary
	// precedence levels that JavaScript defines.
	//
	// [opp]: http://en.wikipedia.org/wiki/Operator-precedence_parser
  
	// ### Parser utilities
  
	// Continue to the next token.
  
	function next() {
	  lastStart = tokStart;
	  lastEnd = tokEnd;
	  lastEndLoc = tokEndLoc;
	  readToken();
	}
  
	// Enter strict mode. Re-reads the next token to please pedantic
	// tests ("use strict"; 010; -- should fail).
  
	function setStrict(strct) {
	  strict = strct;
	  tokPos = lastEnd;
	  if (options.locations) {
			while (tokPos < tokLineStart) {
		  tokLineStart = input.lastIndexOf('\n', tokLineStart - 2) + 1;
		  --tokCurLine;
			}
	  }
	  skipSpace();
	  readToken();
	}
  
	// Start an AST node, attaching a start offset.
  
	function node_t() {
	  this.type = null;
	  this.start = tokStart;
	  this.end = null;
	}
  
	function node_loc_t() {
	  this.start = tokStartLoc;
	  this.end = null;
	  if (sourceFile !== null) this.source = sourceFile;
	}
  
	function startNode() {
	  var node = new node_t();
	  if (options.locations)
			node.loc = new node_loc_t();
	  if (options.directSourceFile)
			node.sourceFile = options.directSourceFile;
	  if (options.ranges)
			node.range = [tokStart, 0];
	  return node;
	}
  
	// Start a node whose start offset information should be based on
	// the start of another node. For example, a binary operator node is
	// only started after its left-hand side has already been parsed.
  
	function startNodeFrom(other) {
	  var node = new node_t();
	  node.start = other.start;
	  if (options.locations) {
			node.loc = new node_loc_t();
			node.loc.start = other.loc.start;
	  }
	  if (options.ranges)
			node.range = [other.range[0], 0];
  
	  return node;
	}
  
	// Finish an AST node, adding `type` and `end` properties.
  
	function finishNode(node, type) {
	  node.type = type;
	  node.end = lastEnd;
	  if (options.locations)
			node.loc.end = lastEndLoc;
	  if (options.ranges)
			node.range[1] = lastEnd;
	  return node;
	}
  
	// Test whether a statement node is the string literal `"use strict"`.
  
	function isUseStrict(stmt) {
	  return options.ecmaVersion >= 5 && stmt.type === 'ExpressionStatement' &&
		stmt.expression.type === 'Literal' && stmt.expression.value === 'use strict';
	}
  
	// Predicate that tests whether the next token is of the given
	// type, and if yes, consumes it as a side effect.
  
	function eat(type) {
	  if (tokType === type) {
			next();
			return true;
	  }
	}
  
	// Test whether a semicolon can be inserted at the current position.
  
	function canInsertSemicolon() {
	  return !options.strictSemicolons &&
		(tokType === _eof || tokType === _braceR || newline.test(input.slice(lastEnd, tokStart)));
	}
  
	// Consume a semicolon, or, failing that, see if we are allowed to
	// pretend that there is a semicolon at this position.
  
	function semicolon() {
	  if (!eat(_semi) && !canInsertSemicolon()) unexpected();
	}
  
	// Expect a token of a given type. If found, consume it, otherwise,
	// raise an unexpected token error.
  
	function expect(type) {
	  if (tokType === type) next();
	  else unexpected();
	}
  
	// Raise an unexpected token error.
  
	function unexpected() {
	  raise(tokStart, 'Unexpected token');
	}
  
	// Verify that a node is an lval — something that can be assigned
	// to.
  
	function checkLVal(expr) {
	  if (expr.type !== 'Identifier' && expr.type !== 'MemberExpression')
			raise(expr.start, 'Assigning to rvalue');
	  if (strict && expr.type === 'Identifier' && isStrictBadIdWord(expr.name))
			raise(expr.start, 'Assigning to ' + expr.name + ' in strict mode');
	}
  
	// ### Statement parsing
  
	// Parse a program. Initializes the parser, reads any number of
	// statements, and wraps them in a Program node.  Optionally takes a
	// `program` argument.  If present, the statements will be appended
	// to its body instead of creating a new node.
  
	function parseTopLevel(program) {
	  lastStart = lastEnd = tokPos;
	  if (options.locations) lastEndLoc = new line_loc_t;
	  inFunction = strict = null;
	  labels = [];
	  readToken();
  
	  var node = program || startNode(), first = true;
	  if (!program) node.body = [];
	  while (tokType !== _eof) {
			var stmt = parseStatement();
			node.body.push(stmt);
			if (first && isUseStrict(stmt)) setStrict(true);
			first = false;
	  }
	  return finishNode(node, 'Program');
	}
  
	var loopLabel = {kind: 'loop'}, switchLabel = {kind: 'switch'};
  
	// Parse a single statement.
	//
	// If expecting a statement and finding a slash operator, parse a
	// regular expression literal. This is to handle cases like
	// `if (foo) /blah/.exec(foo);`, where looking at the previous token
	// does not help.
  
	function parseStatement() {
	  if (tokType === _slash || tokType === _assign && tokVal == '/=')
			readToken(true);
  
	  var starttype = tokType, node = startNode();
  
	  // Most types of statements are recognized by the keyword they
	  // start with. Many are trivial to parse, some require a bit of
	  // complexity.
  
	  switch (starttype) {
	  case _break: case _continue:
				next();
				var isBreak = starttype === _break;
				if (eat(_semi) || canInsertSemicolon()) node.label = null;
				else if (tokType !== _name) unexpected();
				else {
		  node.label = parseIdent();
		  semicolon();
				}
  
				// Verify that there is an actual destination to break or
				// continue to.
				for (var i = 0; i < labels.length; ++i) {
		  var lab = labels[i];
		  if (node.label == null || lab.name === node.label.name) {
						if (lab.kind != null && (isBreak || lab.kind === 'loop')) break;
						if (node.label && isBreak) break;
		  }
				}
				if (i === labels.length) raise(node.start, 'Unsyntactic ' + starttype.keyword);
				return finishNode(node, isBreak ? 'BreakStatement' : 'ContinueStatement');
  
	  case _debugger:
				next();
				semicolon();
				return finishNode(node, 'DebuggerStatement');
  
	  case _do:
				next();
				labels.push(loopLabel);
				node.body = parseStatement();
				labels.pop();
				expect(_while);
				node.test = parseParenExpression();
				semicolon();
				return finishNode(node, 'DoWhileStatement');
  
				// Disambiguating between a `for` and a `for`/`in` loop is
				// non-trivial. Basically, we have to parse the init `var`
				// statement or expression, disallowing the `in` operator (see
				// the second parameter to `parseExpression`), and then check
				// whether the next token is `in`. When there is no init part
				// (semicolon immediately after the opening parenthesis), it is
				// a regular `for` loop.
  
	  case _for:
				next();
				labels.push(loopLabel);
				expect(_parenL);
				if (tokType === _semi) return parseFor(node, null);
				if (tokType === _var) {
		  var init = startNode();
		  next();
		  parseVar(init, true);
		  finishNode(init, 'VariableDeclaration');
		  if (init.declarations.length === 1 && eat(_in))
						return parseForIn(node, init);
		  return parseFor(node, init);
				}
				var init = parseExpression(false, true);
				if (eat(_in)) {checkLVal(init); return parseForIn(node, init);}
				return parseFor(node, init);
  
	  case _function:
				next();
				return parseFunction(node, true);
  
	  case _if:
				next();
				node.test = parseParenExpression();
				node.consequent = parseStatement();
				node.alternate = eat(_else) ? parseStatement() : null;
				return finishNode(node, 'IfStatement');
  
	  case _return:
				if (!inFunction) raise(tokStart, '\'return\' outside of function');
				next();
  
				// In `return` (and `break`/`continue`), the keywords with
				// optional arguments, we eagerly look for a semicolon or the
				// possibility to insert one.
  
				if (eat(_semi) || canInsertSemicolon()) node.argument = null;
				else { node.argument = parseExpression(); semicolon(); }
				return finishNode(node, 'ReturnStatement');
  
	  case _switch:
				next();
				node.discriminant = parseParenExpression();
				node.cases = [];
				expect(_braceL);
				labels.push(switchLabel);
  
				// Statements under must be grouped (by label) in SwitchCase
				// nodes. `cur` is used to keep the node that we are currently
				// adding statements to.
  
				for (var cur, sawDefault; tokType != _braceR;) {
		  if (tokType === _case || tokType === _default) {
						var isCase = tokType === _case;
						if (cur) finishNode(cur, 'SwitchCase');
						node.cases.push(cur = startNode());
						cur.consequent = [];
						next();
						if (isCase) cur.test = parseExpression();
						else {
			  if (sawDefault) raise(lastStart, 'Multiple default clauses'); sawDefault = true;
			  cur.test = null;
						}
						expect(_colon);
		  } else {
						if (!cur) unexpected();
						cur.consequent.push(parseStatement());
		  }
				}
				if (cur) finishNode(cur, 'SwitchCase');
				next(); // Closing brace
				labels.pop();
				return finishNode(node, 'SwitchStatement');
  
	  case _throw:
				next();
				if (newline.test(input.slice(lastEnd, tokStart)))
		  raise(lastEnd, 'Illegal newline after throw');
				node.argument = parseExpression();
				semicolon();
				return finishNode(node, 'ThrowStatement');
  
	  case _try:
				next();
				node.block = parseBlock();
				node.handler = null;
				if (tokType === _catch) {
		  var clause = startNode();
		  next();
		  expect(_parenL);
		  clause.param = parseIdent();
		  if (strict && isStrictBadIdWord(clause.param.name))
						raise(clause.param.start, 'Binding ' + clause.param.name + ' in strict mode');
		  expect(_parenR);
		  clause.guard = null;
		  clause.body = parseBlock();
		  node.handler = finishNode(clause, 'CatchClause');
				}
				node.guardedHandlers = empty;
				node.finalizer = eat(_finally) ? parseBlock() : null;
				if (!node.handler && !node.finalizer)
		  raise(node.start, 'Missing catch or finally clause');
				return finishNode(node, 'TryStatement');
  
	  case _var:
				next();
				parseVar(node);
				semicolon();
				return finishNode(node, 'VariableDeclaration');
  
	  case _while:
				next();
				node.test = parseParenExpression();
				labels.push(loopLabel);
				node.body = parseStatement();
				labels.pop();
				return finishNode(node, 'WhileStatement');
  
	  case _with:
				if (strict) raise(tokStart, '\'with\' in strict mode');
				next();
				node.object = parseParenExpression();
				node.body = parseStatement();
				return finishNode(node, 'WithStatement');
  
	  case _braceL:
				return parseBlock();
  
	  case _semi:
				next();
				return finishNode(node, 'EmptyStatement');
  
				// If the statement does not start with a statement keyword or a
				// brace, it's an ExpressionStatement or LabeledStatement. We
				// simply start parsing an expression, and afterwards, if the
				// next token is a colon and the expression was a simple
				// Identifier node, we switch to interpreting it as a label.
  
	  default:
				var maybeName = tokVal, expr = parseExpression();
				if (starttype === _name && expr.type === 'Identifier' && eat(_colon)) {
		  for (var i = 0; i < labels.length; ++i)
						if (labels[i].name === maybeName) raise(expr.start, 'Label \'' + maybeName + '\' is already declared');
		  var kind = tokType.isLoop ? 'loop' : tokType === _switch ? 'switch' : null;
		  labels.push({name: maybeName, kind: kind});
		  node.body = parseStatement();
		  labels.pop();
		  node.label = expr;
		  return finishNode(node, 'LabeledStatement');
				} else {
		  node.expression = expr;
		  semicolon();
		  return finishNode(node, 'ExpressionStatement');
				}
	  }
	}
  
	// Used for constructs like `switch` and `if` that insist on
	// parentheses around their expression.
  
	function parseParenExpression() {
	  expect(_parenL);
	  var val = parseExpression();
	  expect(_parenR);
	  return val;
	}
  
	// Parse a semicolon-enclosed block of statements, handling `"use
	// strict"` declarations when `allowStrict` is true (used for
	// function bodies).
  
	function parseBlock(allowStrict) {
	  var node = startNode(), first = true, strict = false, oldStrict;
	  node.body = [];
	  expect(_braceL);
	  while (!eat(_braceR)) {
			var stmt = parseStatement();
			node.body.push(stmt);
			if (first && allowStrict && isUseStrict(stmt)) {
		  oldStrict = strict;
		  setStrict(strict = true);
			}
			first = false;
	  }
	  if (strict && !oldStrict) setStrict(false);
	  return finishNode(node, 'BlockStatement');
	}
  
	// Parse a regular `for` loop. The disambiguation code in
	// `parseStatement` will already have parsed the init statement or
	// expression.
  
	function parseFor(node, init) {
	  node.init = init;
	  expect(_semi);
	  node.test = tokType === _semi ? null : parseExpression();
	  expect(_semi);
	  node.update = tokType === _parenR ? null : parseExpression();
	  expect(_parenR);
	  node.body = parseStatement();
	  labels.pop();
	  return finishNode(node, 'ForStatement');
	}
  
	// Parse a `for`/`in` loop.
  
	function parseForIn(node, init) {
	  node.left = init;
	  node.right = parseExpression();
	  expect(_parenR);
	  node.body = parseStatement();
	  labels.pop();
	  return finishNode(node, 'ForInStatement');
	}
  
	// Parse a list of variable declarations.
  
	function parseVar(node, noIn) {
	  node.declarations = [];
	  node.kind = 'var';
	  for (;;) {
			var decl = startNode();
			decl.id = parseIdent();
			if (strict && isStrictBadIdWord(decl.id.name))
		  raise(decl.id.start, 'Binding ' + decl.id.name + ' in strict mode');
			decl.init = eat(_eq) ? parseExpression(true, noIn) : null;
			node.declarations.push(finishNode(decl, 'VariableDeclarator'));
			if (!eat(_comma)) break;
	  }
	  return node;
	}
  
	// ### Expression parsing
  
	// These nest, from the most general expression type at the top to
	// 'atomic', nondivisible expression types at the bottom. Most of
	// the functions will simply let the function(s) below them parse,
	// and, *if* the syntactic construct they handle is present, wrap
	// the AST node that the inner parser gave them in another node.
  
	// Parse a full expression. The arguments are used to forbid comma
	// sequences (in argument lists, array literals, or object literals)
	// or the `in` operator (in for loops initalization expressions).
  
	function parseExpression(noComma, noIn) {
	  var expr = parseMaybeAssign(noIn);
	  if (!noComma && tokType === _comma) {
			var node = startNodeFrom(expr);
			node.expressions = [expr];
			while (eat(_comma)) node.expressions.push(parseMaybeAssign(noIn));
			return finishNode(node, 'SequenceExpression');
	  }
	  return expr;
	}
  
	// Parse an assignment expression. This includes applications of
	// operators like `+=`.
  
	function parseMaybeAssign(noIn) {
	  var left = parseMaybeConditional(noIn);
	  if (tokType.isAssign) {
			var node = startNodeFrom(left);
			node.operator = tokVal;
			node.left = left;
			next();
			node.right = parseMaybeAssign(noIn);
			checkLVal(left);
			return finishNode(node, 'AssignmentExpression');
	  }
	  return left;
	}
  
	// Parse a ternary conditional (`?:`) operator.
  
	function parseMaybeConditional(noIn) {
	  var expr = parseExprOps(noIn);
	  if (eat(_question)) {
			var node = startNodeFrom(expr);
			node.test = expr;
			node.consequent = parseExpression(true);
			expect(_colon);
			node.alternate = parseExpression(true, noIn);
			return finishNode(node, 'ConditionalExpression');
	  }
	  return expr;
	}
  
	// Start the precedence parser.
  
	function parseExprOps(noIn) {
	  return parseExprOp(parseMaybeUnary(), -1, noIn);
	}
  
	// Parse binary operators with the operator precedence parsing
	// algorithm. `left` is the left-hand side of the operator.
	// `minPrec` provides context that allows the function to stop and
	// defer further parser to one of its callers when it encounters an
	// operator that has a lower precedence than the set it is parsing.
  
	function parseExprOp(left, minPrec, noIn) {
	  var prec = tokType.binop;
	  if (prec != null && (!noIn || tokType !== _in)) {
			if (prec > minPrec) {
		  var node = startNodeFrom(left);
		  node.left = left;
		  node.operator = tokVal;
		  var op = tokType;
		  next();
		  node.right = parseExprOp(parseMaybeUnary(), prec, noIn);
		  var exprNode = finishNode(node, (op === _logicalOR || op === _logicalAND) ? 'LogicalExpression' : 'BinaryExpression');
		  return parseExprOp(exprNode, minPrec, noIn);
			}
	  }
	  return left;
	}
  
	// Parse unary operators, both prefix and postfix.
  
	function parseMaybeUnary() {
	  if (tokType.prefix) {
			var node = startNode(), update = tokType.isUpdate;
			node.operator = tokVal;
			node.prefix = true;
			tokRegexpAllowed = true;
			next();
			node.argument = parseMaybeUnary();
			if (update) checkLVal(node.argument);
			else if (strict && node.operator === 'delete' &&
				 node.argument.type === 'Identifier')
		  raise(node.start, 'Deleting local variable in strict mode');
			return finishNode(node, update ? 'UpdateExpression' : 'UnaryExpression');
	  }
	  var expr = parseExprSubscripts();
	  while (tokType.postfix && !canInsertSemicolon()) {
			var node = startNodeFrom(expr);
			node.operator = tokVal;
			node.prefix = false;
			node.argument = expr;
			checkLVal(expr);
			next();
			expr = finishNode(node, 'UpdateExpression');
	  }
	  return expr;
	}
  
	// Parse call, dot, and `[]`-subscript expressions.
  
	function parseExprSubscripts() {
	  return parseSubscripts(parseExprAtom());
	}
  
	function parseSubscripts(base, noCalls) {
	  if (eat(_dot)) {
			var node = startNodeFrom(base);
			node.object = base;
			node.property = parseIdent(true);
			node.computed = false;
			return parseSubscripts(finishNode(node, 'MemberExpression'), noCalls);
	  } else if (eat(_bracketL)) {
			var node = startNodeFrom(base);
			node.object = base;
			node.property = parseExpression();
			node.computed = true;
			expect(_bracketR);
			return parseSubscripts(finishNode(node, 'MemberExpression'), noCalls);
	  } else if (!noCalls && eat(_parenL)) {
			var node = startNodeFrom(base);
			node.callee = base;
			node.arguments = parseExprList(_parenR, false);
			return parseSubscripts(finishNode(node, 'CallExpression'), noCalls);
	  } else return base;
	}
  
	// Parse an atomic expression — either a single token that is an
	// expression, an expression started by a keyword like `function` or
	// `new`, or an expression wrapped in punctuation like `()`, `[]`,
	// or `{}`.
  
	function parseExprAtom() {
	  switch (tokType) {
	  case _this:
				var node = startNode();
				next();
				return finishNode(node, 'ThisExpression');
	  case _name:
				return parseIdent();
	  case _num: case _string: case _regexp:
				var node = startNode();
				node.value = tokVal;
				node.raw = input.slice(tokStart, tokEnd);
				next();
				return finishNode(node, 'Literal');
  
	  case _null: case _true: case _false:
				var node = startNode();
				node.value = tokType.atomValue;
				node.raw = tokType.keyword;
				next();
				return finishNode(node, 'Literal');
  
	  case _parenL:
				var tokStartLoc1 = tokStartLoc, tokStart1 = tokStart;
				next();
				var val = parseExpression();
				val.start = tokStart1;
				val.end = tokEnd;
				if (options.locations) {
		  val.loc.start = tokStartLoc1;
		  val.loc.end = tokEndLoc;
				}
				if (options.ranges)
		  val.range = [tokStart1, tokEnd];
				expect(_parenR);
				return val;
  
	  case _bracketL:
				var node = startNode();
				next();
				node.elements = parseExprList(_bracketR, true, true);
				return finishNode(node, 'ArrayExpression');
  
	  case _braceL:
				return parseObj();
  
	  case _function:
				var node = startNode();
				next();
				return parseFunction(node, false);
  
	  case _new:
				return parseNew();
  
	  default:
				unexpected();
	  }
	}
  
	// New's precedence is slightly tricky. It must allow its argument
	// to be a `[]` or dot subscript expression, but not a call — at
	// least, not without wrapping it in parentheses. Thus, it uses the
  
	function parseNew() {
	  var node = startNode();
	  next();
	  node.callee = parseSubscripts(parseExprAtom(), true);
	  if (eat(_parenL)) node.arguments = parseExprList(_parenR, false);
	  else node.arguments = empty;
	  return finishNode(node, 'NewExpression');
	}
  
	// Parse an object literal.
  
	function parseObj() {
	  var node = startNode(), first = true, sawGetSet = false;
	  node.properties = [];
	  next();
	  while (!eat(_braceR)) {
			if (!first) {
		  expect(_comma);
		  if (options.allowTrailingCommas && eat(_braceR)) break;
			} else first = false;
  
			var prop = {key: parsePropertyName()}, isGetSet = false, kind;
			if (eat(_colon)) {
		  prop.value = parseExpression(true);
		  kind = prop.kind = 'init';
			} else if (options.ecmaVersion >= 5 && prop.key.type === 'Identifier' &&
				   (prop.key.name === 'get' || prop.key.name === 'set')) {
		  isGetSet = sawGetSet = true;
		  kind = prop.kind = prop.key.name;
		  prop.key = parsePropertyName();
		  if (tokType !== _parenL) unexpected();
		  prop.value = parseFunction(startNode(), false);
			} else unexpected();
  
			// getters and setters are not allowed to clash — either with
			// each other or with an init property — and in strict mode,
			// init properties are also not allowed to be repeated.
  
			if (prop.key.type === 'Identifier' && (strict || sawGetSet)) {
		  for (var i = 0; i < node.properties.length; ++i) {
					var other = node.properties[i];
					if (other.key.name === prop.key.name) {
			  var conflict = kind == other.kind || isGetSet && other.kind === 'init' ||
				kind === 'init' && (other.kind === 'get' || other.kind === 'set');
			  if (conflict && !strict && kind === 'init' && other.kind === 'init') conflict = false;
			  if (conflict) raise(prop.key.start, 'Redefinition of property');
					}
		  }
			}
			node.properties.push(prop);
	  }
	  return finishNode(node, 'ObjectExpression');
	}
  
	function parsePropertyName() {
	  if (tokType === _num || tokType === _string) return parseExprAtom();
	  return parseIdent(true);
	}
  
	// Parse a function declaration or literal (depending on the
	// `isStatement` parameter).
  
	function parseFunction(node, isStatement) {
	  if (tokType === _name) node.id = parseIdent();
	  else if (isStatement) unexpected();
	  else node.id = null;
	  node.params = [];
	  var first = true;
	  expect(_parenL);
	  while (!eat(_parenR)) {
			if (!first) expect(_comma); else first = false;
			node.params.push(parseIdent());
	  }
  
	  // Start a new scope with regard to labels and the `inFunction`
	  // flag (restore them to their old value afterwards).
	  var oldInFunc = inFunction, oldLabels = labels;
	  inFunction = true; labels = [];
	  node.body = parseBlock(true);
	  inFunction = oldInFunc; labels = oldLabels;
  
	  // If this is a strict mode function, verify that argument names
	  // are not repeated, and it does not try to bind the words `eval`
	  // or `arguments`.
	  if (strict || node.body.body.length && isUseStrict(node.body.body[0])) {
			for (var i = node.id ? -1 : 0; i < node.params.length; ++i) {
		  var id = i < 0 ? node.id : node.params[i];
		  if (isStrictReservedWord(id.name) || isStrictBadIdWord(id.name))
					raise(id.start, 'Defining \'' + id.name + '\' in strict mode');
		  if (i >= 0) for (var j = 0; j < i; ++j) if (id.name === node.params[j].name)
					raise(id.start, 'Argument name clash in strict mode');
			}
	  }
  
	  return finishNode(node, isStatement ? 'FunctionDeclaration' : 'FunctionExpression');
	}
  
	// Parses a comma-separated list of expressions, and returns them as
	// an array. `close` is the token type that ends the list, and
	// `allowEmpty` can be turned on to allow subsequent commas with
	// nothing in between them to be parsed as `null` (which is needed
	// for array literals).
  
	function parseExprList(close, allowTrailingComma, allowEmpty) {
	  var elts = [], first = true;
	  while (!eat(close)) {
			if (!first) {
		  expect(_comma);
		  if (allowTrailingComma && options.allowTrailingCommas && eat(close)) break;
			} else first = false;
  
			if (allowEmpty && tokType === _comma) elts.push(null);
			else elts.push(parseExpression(true));
	  }
	  return elts;
	}
  
	// Parse the next token as an identifier. If `liberal` is true (used
	// when parsing properties), it will also convert keywords into
	// identifiers.
  
	function parseIdent(liberal) {
	  var node = startNode();
	  node.name = tokType === _name ? tokVal : (liberal && !options.forbidReserved && tokType.keyword) || unexpected();
	  tokRegexpAllowed = false;
	  next();
	  return finishNode(node, 'Identifier');
	}
  
});

/***/ }),

/***/ 1648:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return interpreterLibrary; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _onoff_library_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1649);
/* harmony import */ var _lcd_library_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1650);





/**
 * The function structure needed for the JS interpreter
 * @param  {Object} studio The 'studio' object in the platform
 * @param  {Object} device The 'device' object in the platform
 */
function interpreterLibrary (studio, device, simulator) {
	_onoff_library_js__WEBPACK_IMPORTED_MODULE_1__["default"].assign(studio, device, simulator);
	_lcd_library_js__WEBPACK_IMPORTED_MODULE_2__["default"].assign(studio, device, simulator);
	
	/**
	 * Set the functions for the JS interpreter
	 * @param  {Object} interpreter The interpreter created in 'index.js'
	 * @param  {Object} scope The name of the root object used by the interpreter
	 */
	return function simulator (interpreter, scope) {

		/**
		 * The 'console.log' function for the JS interpreter
		 * It shows the text given in the console of the platform
		 * @param  {String/Object} text The text received to be showed in the STUDIO console
		 */
		let consoleLog = function (text) {
			try {
				if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isObject(text)) {
					text = JSON.stringify (text);
				}

				studio.console.write(device.id, text + '\r\n');
			} catch(e) {
				// TODO show notification
				/* eslint-disable-next-line no-console */
				console.warn(e);
			}
		};

		/**
		 * The 'sleep' function for the JS interpreter
		 * It makes the program to stop for a number of milliseconds
		 * @param  {Integer} delay The number of milliseconds to be waited
		 */
		let sleep = function(delay, callback) {
			setTimeout(function() {
				callback(true);
			}, delay);
		};

		// Create for the JS interpreter the object 'console' and set the function 'log' over it
		let jsConsole = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
		interpreter.setProperty(scope, 'console', jsConsole);
		interpreter.setProperty(jsConsole, 'log', interpreter.createNativeFunction(consoleLog));

		// Set the function 'sleep'
		interpreter.setProperty(scope, 'sleep', interpreter.createAsyncFunction(sleep));

		// Create the object 'onoff' with the given structure and set all the functions
		let onoff = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
		let Gpio = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
		interpreter.setProperty(scope, 'onoff', onoff);
		interpreter.setProperty(onoff, 'Gpio', Gpio);
		interpreter.setProperty(Gpio, 'create', interpreter.createNativeFunction(_onoff_library_js__WEBPACK_IMPORTED_MODULE_1__["default"].create));
		interpreter.setProperty(Gpio, 'read', interpreter.createNativeFunction(_onoff_library_js__WEBPACK_IMPORTED_MODULE_1__["default"].read));
		interpreter.setProperty(Gpio, 'readSync', interpreter.createNativeFunction(_onoff_library_js__WEBPACK_IMPORTED_MODULE_1__["default"].readSync));
		interpreter.setProperty(Gpio, 'write', interpreter.createNativeFunction(_onoff_library_js__WEBPACK_IMPORTED_MODULE_1__["default"].write));
		interpreter.setProperty(Gpio, 'writeSync', interpreter.createNativeFunction(_onoff_library_js__WEBPACK_IMPORTED_MODULE_1__["default"].writeSync));
		interpreter.setProperty(Gpio, 'watch', interpreter.createNativeFunction(_onoff_library_js__WEBPACK_IMPORTED_MODULE_1__["default"].watch));
		interpreter.setProperty(Gpio, 'unwatch', interpreter.createNativeFunction(_onoff_library_js__WEBPACK_IMPORTED_MODULE_1__["default"].unwatch));
		interpreter.setProperty(Gpio, 'unwatchAll', interpreter.createNativeFunction(_onoff_library_js__WEBPACK_IMPORTED_MODULE_1__["default"].unwatchAll));
		interpreter.setProperty(Gpio, 'direction', interpreter.createNativeFunction(_onoff_library_js__WEBPACK_IMPORTED_MODULE_1__["default"].direction));
		interpreter.setProperty(Gpio, 'setDirection', interpreter.createNativeFunction(_onoff_library_js__WEBPACK_IMPORTED_MODULE_1__["default"].setDirection));
		interpreter.setProperty(Gpio, 'activeLow', interpreter.createNativeFunction(_onoff_library_js__WEBPACK_IMPORTED_MODULE_1__["default"].activeLow));
		interpreter.setProperty(Gpio, 'setActiveLow', interpreter.createNativeFunction(_onoff_library_js__WEBPACK_IMPORTED_MODULE_1__["default"].setActiveLow));

		// Create the object LCD with the given structure and set all the functions
		let lcd = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
		interpreter.setProperty(scope, 'lcd_library', lcd);
		interpreter.setProperty(lcd, 'create', interpreter.createNativeFunction(_lcd_library_js__WEBPACK_IMPORTED_MODULE_2__["default"].create));
		interpreter.setProperty(lcd, 'print', interpreter.createNativeFunction(_lcd_library_js__WEBPACK_IMPORTED_MODULE_2__["default"].print));
		interpreter.setProperty(lcd, 'clear', interpreter.createNativeFunction(_lcd_library_js__WEBPACK_IMPORTED_MODULE_2__["default"].clear));
		interpreter.setProperty(lcd, 'home', interpreter.createNativeFunction(_lcd_library_js__WEBPACK_IMPORTED_MODULE_2__["default"].home));
		interpreter.setProperty(lcd, 'setCursor', interpreter.createNativeFunction(_lcd_library_js__WEBPACK_IMPORTED_MODULE_2__["default"].setCursor));
		interpreter.setProperty(lcd, 'cursor', interpreter.createNativeFunction(_lcd_library_js__WEBPACK_IMPORTED_MODULE_2__["default"].cursor));
		interpreter.setProperty(lcd, 'noCursor', interpreter.createNativeFunction(_lcd_library_js__WEBPACK_IMPORTED_MODULE_2__["default"].noCursor));
		interpreter.setProperty(lcd, 'blink', interpreter.createNativeFunction(_lcd_library_js__WEBPACK_IMPORTED_MODULE_2__["default"].blink));
		interpreter.setProperty(lcd, 'noBlink', interpreter.createNativeFunction(_lcd_library_js__WEBPACK_IMPORTED_MODULE_2__["default"].noBlink));
		interpreter.setProperty(lcd, 'scrollDisplayLeft', interpreter.createNativeFunction(_lcd_library_js__WEBPACK_IMPORTED_MODULE_2__["default"].scrollDisplayLeft));
		interpreter.setProperty(lcd, 'scrollDisplayRight', interpreter.createNativeFunction(_lcd_library_js__WEBPACK_IMPORTED_MODULE_2__["default"].scrollDisplayRight));
		interpreter.setProperty(lcd, 'leftToRight', interpreter.createNativeFunction(_lcd_library_js__WEBPACK_IMPORTED_MODULE_2__["default"].leftToRight));
		interpreter.setProperty(lcd, 'rightToLeft', interpreter.createNativeFunction(_lcd_library_js__WEBPACK_IMPORTED_MODULE_2__["default"].rightToLeft));
		interpreter.setProperty(lcd, 'autoscroll', interpreter.createNativeFunction(_lcd_library_js__WEBPACK_IMPORTED_MODULE_2__["default"].autoscroll));
		interpreter.setProperty(lcd, 'noAutoscroll', interpreter.createNativeFunction(_lcd_library_js__WEBPACK_IMPORTED_MODULE_2__["default"].noAutoscroll));
		interpreter.setProperty(lcd, 'close', interpreter.createNativeFunction(_lcd_library_js__WEBPACK_IMPORTED_MODULE_2__["default"].close));
	};
}

/***/ }),

/***/ 1649:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1637);
/* harmony import */ var _libraries_utils_update_components_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1640);



let studio_n = null;
let device_n = null;
let simulator_n = null;

let onoff_library = {
	/**
	 * It sets the studio, device and simulator objects
	 * @param  {Object} studio The 'studio' object in the platform
	 * @param  {Object} device The 'device' object in the platform
	 * @param  {Object} simulator The 'simulator' object created for informations
	 */
	assign: function(studio, device, simulator) {
		studio_n = studio;
		device_n = device;
		simulator_n = simulator;
	},

	/**
	 * The 'onoff.Gpio.create' function for the JS interpreter
	 * It assign the pin and sets it's state in the JSON of the parsed XML
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 * @param  {String} state The state of the pin, 'in' or 'out'
	 */
	create: function(pin, state) {
		let pinNumber = _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseGpioToPin(pin);

		if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.assignedPins.includes(pinNumber)) {
			studio_n.console.write(device_n.id, '\r\n----------\r\nERROR: new Gpio(...)\r\nYou can\'t assign a pin already assigned\r\n----------\r\n');
			simulator_n.isRunning = false;
			device_n.properties.isRunning = false;
		} else {
			_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.assignedPins.push(pinNumber);

			if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[pinNumber] && state) {
				_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[pinNumber].state = state;
			}
		}
	},

	/**
	 * --- NOT YET IMPLEMENTED ---
	 * The 'onoff.Gpio.read' function for the JS interpreter
	 * It returns the value received by the pin (ASYNCHRONOUS)
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 * @param  {String} state The state of the pin, 'in' or 'out'
	 */
	read: function(/* pin, state */) {
		// TODO implement
		studio_n.workspace.error ('not implemented');
	},

	/**
	 * The 'onoff.Gpio.readSync' function for the JS interpreter
	 * It returns the value received by the pin (SYNCHRONOUS)
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 * @param  {String} state The state of the pin, 'in' or 'out'
	 */
	readSync: function(pin, state) {
		try {
			let pinNumber = _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseGpioToPin(pin);

			if (state === 'in') {
				let activeCircuit = true;

				for (let component of _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[pinNumber].components) {
					if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].active === false) {
						activeCircuit = false;
						break;
					}
				}

				if (activeCircuit) {
					if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[pinNumber].activeLow) {
						return 0;
					} else {
						return 1;
					}
				} else {
					if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[pinNumber].activeLow) {
						return 1;
					} else {
						return 0;
					}
				}
			} else {
				studio_n.console.write(device_n.id, '\r\n----------\r\nERROR: onoff.Gpio.readSync()\r\nYou can\'t read from a pin that is assigned as "out"\r\n----------\r\n');
				simulator_n.isRunning = false;
				device_n.properties.isRunning = false;
			}
		} catch(e) {
			studio_n.workspace.error(e);
		}
	},

	/**
	 * --- NOT YET IMPLEMENTED ---
	 * The 'onoff.Gpio.write' function for the JS interpreter
	 * It sets the pin and the other components associated to the value given (ASYNCHRONOUS)
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 * @param  {String} state The state of the pin, 'in' or 'out'
	 * @param  {Integer} value The value to be written, '0' or '1'
	 */
	write: function(/* pin, state, value */) {
		// TODO implement
		studio_n.workspace.error('not implemented');
	},

	/**
	 * The 'onoff.Gpio.write' function for the JS interpreter
	 * It sets the pin and the other components associated to the value given (SYNCHRONOUS)
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 * @param  {String} state The state of the pin, 'in' or 'out'
	 * @param  {Integer} value The value to be written, '0' or '1'
	 */
	writeSync: function(pin, state, value) {
		try {
			let pinNumber = _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseGpioToPin(pin);

			if (state === 'out') {
				let output = value;

				// Invert values in case of activeLow
				if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[pinNumber].activeLow) {
					if (output) {
						output = 0;
					} else {
						output = 1;
					}
				}

				_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[pinNumber].value = output;
				Object(_libraries_utils_update_components_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
			} else {
				studio_n.console.write(device_n.id, '\r\n----------\r\nERROR: onoff.Gpio.writeSync()\r\nYou can\'t write on a pin that is assigned as "in"\r\n----------\r\n');
				simulator_n.isRunning = false;
				device_n.properties.isRunning = false;
			}
		} catch(e) {
			studio_n.workspace.error(e);
		}
	},

	/**
	 * --- NOT YET IMPLEMENTED ---
	 * The 'onoff.Gpio.watch' function for the JS interpreter
	 * It watches the change of value of the given pin and make an interruption
	 */
	watch: function() {
		studio_n.workspace.error('not implemented');
	},

	/**
	 * --- NOT YET IMPLEMENTED ---
	 * The 'onoff.Gpio.unwatch' function for the JS interpreter
	 * Itun watches the change of value of the given pin
	 */
	unwatch: function() {
		studio_n.workspace.error('not implemented');
	},

	/**
	 * --- NOT YET IMPLEMENTED ---
	 * The 'onoff.Gpio.unwatch' function for the JS interpreter
	 * It unwatches the change of value of all the pins
	 */
	unwatchAll: function() {
		studio_n.workspace.error('not implemented');
	},

	/**
	 * The 'onoff.Gpio.direction' function for the JS interpreter
	 * It returns the current state of the given pin
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 */
	direction: function(pin) {
		try {
			return _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseGpioToPin(pin)].state;
		} catch(e) {
			studio_n.workspace.error(e);
		}
	},

	/**
	 * --- NOT YET IMPLEMENTED ---
	 * The 'onoff.Gpio.setDirection' function for the JS interpreter
	 * It sets the new state of the given pin
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 * @param  {String} value The new state of the pin
	 */
	setDirection: function(pin, value) {
		try {
			_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseGpioToPin(pin)].state = value;
		} catch(e) {
			studio_n.workspace.error(e);
		}
	},

	/**
	 * The 'onoff.Gpio.activeLow' function for the JS interpreter
	 * It returns the value of activeLow of the given pin
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 */
	activeLow: function(pin) {
		try {
			return _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseGpioToPin(pin)].activeLow;
		} catch(e) {
			studio_n.workspace.error(e);
		}
	},

	/**
	 * The 'onoff.Gpio.setActiveLow' function for the JS interpreter
	 * It sets the value of activeLow to the given pin
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 * @param  {Bool} value The value if the input/output should be inverted
	 */
	setActiveLow: function(pin, value) {
		try {
			let pinNumber = _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseGpioToPin(pin);
			_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[pinNumber].activeLow = value;

			if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[pinNumber].value) {
				_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[pinNumber].value = 0;
			} else {
				_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[pinNumber].value = 1;
			}

			Object(_libraries_utils_update_components_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
		} catch(e) {
			studio_n.workspace.error(e);
		}
	}
};

/* harmony default export */ __webpack_exports__["default"] = (onoff_library);

/***/ }),

/***/ 1650:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1637);
/* harmony import */ var _libraries_utils_update_components_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1640);



let studio_n = null;
let device_n = null;
let simulator_n = null;

let lcd_library = {
	/**
	 * It sets the studio, device and simulator objects
	 * @param  {Object} studio The 'studio' object in the platform
	 * @param  {Object} device The 'device' object in the platform
	 * @param  {Object} simulator The 'simulator' object created for informations
	 */
	assign: function(studio, device, simulator) {
		studio_n = studio;
		device_n = device;
		simulator_n = simulator;
	},

	/**
	 * The 'lcd.create' function for the JS interpreter
	 * It assign the pin and sets it's state in the JSON of the parsed XML
	 * @param  {Integer} rs The register-select number pin from the RaspberryPi
	 * @param  {Integer} e The enable number pin from the RaspberryPi
	 * @param  {Object} data Contains the number pins for the data-bus for the LCD
	 */
	create: function(rs, e, data) {
		let rsNumber = _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseGpioToPin(rs);
		let eNumber = _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseGpioToPin(e);
		let dataNumber = [];

		for (let pin of Object.keys(data.properties)) {
			dataNumber.push(_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseGpioToPin(data.properties[pin]));
		}

		let correctPins = true;
		let pins = [];

		for (let pin of dataNumber) {
			pins.push(pin);
		}
		pins.push(rsNumber);
		pins.push(eNumber);

		if ([...new Set(pins)].length === pins.length) { 
			for (let pin of dataNumber) {
				if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].vccPins.indexOf(pin) !== -1 ||
					_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].gndPins.indexOf(pin) !== -1) {
					correctPins = false;
				}
			}

			if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].vccPins.indexOf(rsNumber) !== -1 ||
				_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].gndPins.indexOf(rsNumber) !== -1) {
				correctPins = false;
			}

			if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].vccPins.indexOf(eNumber) !== -1 ||
				_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].gndPins.indexOf(eNumber) !== -1) {
				correctPins = false;
			}
		} else {
			correctPins = false;
		}

		if (correctPins) {
			let createLcd = true;

			for (let pin of Object.keys(dataNumber)) {
				if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.assignedPins.includes(dataNumber[pin])) {
					createLcd = false;
				}
			}

			if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.assignedPins.includes(rsNumber)) {
				createLcd = false;
			}

			if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.assignedPins.includes(eNumber)) {
				createLcd = false;
			}

			if (createLcd) {
				for (let pin of Object.keys(dataNumber)) {
					_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.assignedPins.push(dataNumber[pin]);
				}

				_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.assignedPins.push(rsNumber);
				_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.assignedPins.push(eNumber);

				for (let component of _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[rsNumber].components) {
					if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].name === 'lcd') {
						_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].valid = true;
					}
				}
			} else {
				studio_n.studio_n.write(device_n.id, '\r\n----------\r\nERROR: new LCD()\r\nYou can\'t assign a pin already assigned\r\n----------\r\n');
				simulator_n.isRunning = false;
				device_n.properties.isRunning = false;
			}
		} else {
			studio_n.studio_n.write(device_n.id, '\r\n----------\r\nERROR: new LCD()\r\nThe pins are not correct\r\n----------\r\n');
			simulator_n.isRunning = false;
			device_n.properties.isRunning = false;
		}
	},

	/**
	 * The 'lcd.print' function for the JS interpreter
	 * It prints a text on LCD
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 * @param  {String} value The text to be written on the LCD
	 */
	print: function(pin, value) {
		try {
			for (let component of _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseGpioToPin(pin)].components) {
				if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].name === 'lcd' && 
					_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].valid) {
					let curRow = _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].curRow;
					let curCol = _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].curCol;

					for (let i = curCol; i < value.toString().length; i ++) {
						_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].segments[curRow][i] = value.toString()[i];
					}
				}
			}

			Object(_libraries_utils_update_components_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
		} catch(e) {
			// TODO write to some simulator console
			studio_n.workspace.error(e);
		}
	},

	/**
	 * The 'lcd.clear' function for the JS interpreter
	 * It clears the LCD and free-up the memory
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 */
	clear: function(pin) {
		try {
			for (let component of _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseGpioToPin(pin)].components) {
				if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].name === 'lcd' && 
					_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].valid) {
					for (let i = 0; i < _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].segments[0].length; i ++) {
						_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].segments[0][i] = '';
					}

					for (let i = 0; i < _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].segments[1].length; i ++) {
						_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].segments[1][i] = '';
					}
				}
			}

			Object(_libraries_utils_update_components_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
		} catch(e) {
			// TODO write to some simulator console
			studio_n.workspace.error(e);
		}
	},

	/**
	 * The 'lcd.home' function for the JS interpreter
	 * It sets the cursor to position (0, 0)
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 */
	home: function(pin) {
		try {
			for (let component of _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseGpioToPin(pin)].components) {
				if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].name === 'lcd' && 
					_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].valid) {
					_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].curCol = 0;
					_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].curRow = 0;
				}
			}
		} catch(e) {
			// TODO write to some simulator console
			studio_n.workspace.error(e);
		}
	},

	/**
	 * The 'lcd.setCursor' function for the JS interpreter
	 * It sets the cursor to a given position
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 * @param  {Integer} row The number of the row of the cursor on the LCD
	 * @param  {Integer} col The number of the colomn of the cursor on the LCD
	 */
	setCursor: function(pin, row, col) {
		try {
			for (let component of _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseGpioToPin(pin)].components) {
				if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].name === 'lcd' && 
					_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].valid) {
					_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].curCol = col;
					_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].curRow = row;
				}
			}
		} catch(e) {
			// TODO write to some simulator console
			studio_n.workspace.error(e);
		}
	},

	/**
	 * The 'lcd.cursor' function for the JS interpreter
	 * It enables the cursor
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 */
	cursor: function(pin) {
		try {
			for (let component of _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseGpioToPin(pin)].components) {
				if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].name === 'lcd' && 
					_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].valid) {
					if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].cursor === false) {
						_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].cursor = true;
					}
				}
			}

			Object(_libraries_utils_update_components_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
		} catch(e) {
			// TODO write to some simulator console
			studio_n.workspace.error(e);
		}
	},

	/**
	 * The 'lcd.noCursor' function for the JS interpreter
	 * It disables the cursor
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 */
	noCursor: function(pin) {
		try {
			for (let component of _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseGpioToPin(pin)].components) {
				if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].name === 'lcd' && 
					_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].valid) {
					_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].cursor = false;
				}
			}

			Object(_libraries_utils_update_components_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
		} catch(e) {
			// TODO write to some simulator console
			studio_n.workspace.error(e);
		}
	},

	/**
	 * --- NOT YET IMPLEMENTED ---
	 * The 'lcd.blink' function for the JS interpreter
	 * It enables the cursor blinking
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 */
	blink: function(/* pin */) {
		studio_n.workspace.error ('not implemented');
	},

	/**
	 * --- NOT YET IMPLEMENTED ---
	 * The 'lcd.noBlink' function for the JS interpreter
	 * It disables the cursor blinking
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 */
	noBlink: function(/* pin */) {
		studio_n.workspace.error ('not implemented');
	},

	/**
	 * The 'lcd.scrollDisplayLeft' function for the JS interpreter
	 * It scrolls the LCD to the left
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 */
	scrollDisplayLeft: function(pin) {
		try {
			for (let component of _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseGpioToPin(pin)].components) {
				if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].name === 'lcd' && 
					_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].valid) {
					_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].shift += 1;
				}
			}

			Object(_libraries_utils_update_components_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
		} catch(e) {
			// TODO write to some simulator console
			studio_n.workspace.error(e);
		}
	},

	/**
	 * The 'lcd.scrollDisplayRight' function for the JS interpreter
	 * It scrolls the LCD to the right
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 */
	scrollDisplayRight: function(pin) {
		try {
			for (let component of _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseGpioToPin(pin)].components) {
				if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].name === 'lcd' && 
					_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].valid) {
					if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].shift > 0) {
						_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].shift -= 1;
					}
				}
			}

			Object(_libraries_utils_update_components_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
		} catch(e) {
			// TODO write to some simulator console
			studio_n.workspace.error(e);
		}
	},

	/**
	 * --- NOT YET IMPLEMENTED ---
	 * The 'lcd.leftToRight' function for the JS interpreter
	 * ---------------------------
	 */
	leftToRight: function() {
		studio_n.workspace.error ('not implemented');
	},

	/**
	 * --- NOT YET IMPLEMENTED ---
	 * The 'lcd.rightToLeft' function for the JS interpreter
	 * ---------------------------
	 */
	rightToLeft: function() {
		studio_n.workspace.error ('not implemented');
	},

	/**
	 * --- NOT YET IMPLEMENTED ---
	 * The 'lcd.autoscroll' function for the JS interpreter
	 * It lets the LCD to autoscroll
	 */
	autoscroll: function() {
		try {
			studio_n.log('autoscroll');
		} catch(e) {
			// TODO write to some simulator console
			studio_n.workspace.error(e);
		}
	},

	/**
	 * --- NOT YET IMPLEMENTED ---
	 * The 'lcd.noAutoscroll' function for the JS interpreter
	 * It stops the autoscroll
	 */
	noAutoscroll: function() {
		try {
			studio_n.log('noAutoscroll');
		} catch(e) {
			// TODO write to some simulator console
			studio_n.workspace.error(e);
		}
	},

	/**
	 * The 'lcd.close' function for the JS interpreter
	 * It closes the LCD
	 * @param  {Integer} pin The number of the pin from the RaspberryPi
	 */
	close: function(pin) {
		try {
			for (let component of _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseGpioToPin(pin)].components) {
				if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].name === 'lcd' && 
					_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].valid) {
					for (let pin of Object.keys(_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins)) {
						if (_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.pins[pin].components[0]].name == 'lcd') {
							let index = _libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.assignedPins.indexOf(pin);
							_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.assignedPins.splice(index, 1);
						}
					}

					_libraries_utils_generic_raspberrypi_js__WEBPACK_IMPORTED_MODULE_0__["default"].dataLoaded.components[component].valid = false;
				}
			}
		} catch(e) {
			// TODO write to some simulator console
			studio_n.workspace.error(e);
		}
	}
};

/* harmony default export */ __webpack_exports__["default"] = (lcd_library);

/***/ }),

/***/ 1651:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// This is the 'onoff.Gpio' constructor for the JS interpreter
let onoff = 
`libraries['onoff'] = {
	Gpio: function (pin, state, edge, options) {
		this.pin = pin;
		this.state = state;
		this.edge = edge;
		this.options = options;

		onoff.Gpio.create(pin, state);

		this.read = function() {
			return onoff.Gpio.read(this.pin, this.state);
		};

		this.readSync = function() {
			return onoff.Gpio.readSync(this.pin, this.state);
		};

		this.write = function(value) {
			onoff.Gpio.write(this.pin, this.state, value);
		};

		this.writeSync = function(value) {
			onoff.Gpio.writeSync(this.pin, this.state, value);
		};

		this.watch = function() {
			onoff.Gpio.watch();
		};

		this.unwatch = function() {
			onoff.Gpio.unwatch();
		};

		this.unwatchAll = function() {
			onoff.Gpio.unwatchAll();
		};

		this.direction = function() {
			return onoff.Gpio.direction(this.pin);
		};

		this.setDirection = function(value) {
			onoff.Gpio.setDirection(this.pin, value);
		};

		this.activeLow = function() {
			return onoff.Gpio.activeLow(this.pin);
		};

		this.setActiveLow = function(value) {
			onoff.Gpio.setActiveLow(this.pin, value);
		};
	}
};\n\n`;

/* harmony default export */ __webpack_exports__["default"] = (onoff);

/***/ }),

/***/ 1652:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// This is the 'lcd' constructor for the JS interpreter
let lcd = 
`libraries['lcd'] = function(object) {
	this.rs = object.rs;
	this.e = object.e;
	this.data = object.data;
	this.cols = object.cols;
	this.rows = object.rows;

	lcd_library.create(object.rs, object.e, object.data);

	this.print = function(value) {
		lcd_library.print(this.rs, value);
	};

	this.clear = function() {
		lcd_library.clear(this.rs);
	};

	this.home = function() {
		lcd_library.home(this.rs);
	};

	this.setCursor = function(col, row) {
		lcd_library.setCursor(this.rs, col, row);
	};

	this.cursor = function() {
		lcd_library.cursor(this.rs);
	};

	this.noCursor = function() {
		lcd_library.noCursor(this.rs);
	};

	this.blink = function() {
		lcd_library.blink();
	};

	this.noBlink = function() {
		lcd_library.noBlink();
	};

	this.scrollDisplayLeft = function() {
		lcd_library.scrollDisplayLeft(this.rs);
	};

	this.scrollDisplayRight = function() {
		lcd_library.scrollDisplayRight(this.rs);
	};

	this.leftToRight = function() {
		return lcd_library.leftToRight(this.rs);
	};

	this.rightToLeft = function() {
		return lcd_library.rightToLeft(this.rs);
	};

	this.autoscroll = function() {
		return lcd_library.autoscroll();
	};

	this.noAutoscroll = function() {
		return lcd_library.noAutoscroll();
	};

	this.close = function() {
		lcd_library.close(this.rs);
	};
};\n\n`;

/* harmony default export */ __webpack_exports__["default"] = (lcd);

/***/ })

}]);