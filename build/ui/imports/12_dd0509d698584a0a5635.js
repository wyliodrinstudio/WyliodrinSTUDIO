(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var _views_AppBoardSettings_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(329);
var studio = null;



function setup (options, imports, register)
{
	studio = imports;

	/**	
        imports.events.on ('ready', (imports) => 
		{
			// add optional imports
			studio = imports;
			// Register Pin Layout
			if (studio.pin_layout)
			{
				//TODO
			}
			else
			{
				studio.workspace.warn ('device.wyapp.tockos: pin_layout plugin is not available');
			}
		});
	*/

	let tockos = {
		name: 'Tock VM',
		setupOptions: {
			path: 'http://localhost:2080/',
			link: 'https://wyliodrinstudio.readthedocs.io/en/latest/boards.html'
		},
		priority: 100,
		/** 
		 * Device Icon 
		*/
		iconURL ()
		{
			return 'plugins/devices/wyapp/devices/tockos/data/img/tock-os-48.png';
		},
		/**
		 * Found a device, modify stuff (like icon)
		 * @param {Device} device 
		 */
		found (device)
		{
			device.icon = this.iconURL ();
			if (!device.description) device.description = 'TockOS';
		},

		/**
		 * Update a device, modify stuff
		 * @param {Device} device 
		 */
		update (device)
		{
			device.icon = this.iconURL ();
			if (!device.description) device.description = 'TockOS';
		},

		/**
		 * Modidify the project before run
		 * @param {Project} project - the project
		 */
		async run (project)
		{
			let retVal = true;

			if (project.language === 'tockos-libtockc') {
				retVal = await studio.workspace.showDialog(_views_AppBoardSettings_vue__WEBPACK_IMPORTED_MODULE_0__["default"], {project});
			}

			return retVal;
		}
	};

	/* Register Icon */
	studio.device_wyapp.registerBoard ('tockos', tockos);

	studio.projects.registerLanguagePackage ('tockos-kernel', 'tockos', {
		name: 'TockOS Kernel',
		description: ''
	});

	studio.projects.registerLanguagePackage ('tockos-libtockc', 'tockos', {
		name: 'TockOS LibTockC',
		description: ''
	});

	register (null, {});
}


/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AppBoardSettings_vue_vue_type_template_id_5d66f628___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(330);
/* harmony import */ var _AppBoardSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(332);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AppBoardSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AppBoardSettings_vue_vue_type_template_id_5d66f628___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AppBoardSettings_vue_vue_type_template_id_5d66f628___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/devices/wyapp/devices/tockos/views/AppBoardSettings.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppBoardSettings_vue_vue_type_template_id_5d66f628___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(331);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppBoardSettings_vue_vue_type_template_id_5d66f628___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppBoardSettings_vue_vue_type_template_id_5d66f628___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 331:
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
          _vm._v(_vm._s(_vm.$t("TOCK_OS_APP_BOARD_SETTINGS")) + " ")
        ])
      ]),
      _vm._v(" "),
      _c(
        "v-card-text",
        [
          _c("v-text-field", {
            attrs: { dense: "", label: _vm.$t("TOCK_OS_STACK_SIZE") },
            model: {
              value: _vm.boardSettings.stackSize,
              callback: function($$v) {
                _vm.$set(_vm.boardSettings, "stackSize", $$v)
              },
              expression: "boardSettings.stackSize"
            }
          }),
          _vm._v(" "),
          _c("v-text-field", {
            attrs: { dense: "", label: _vm.$t("TOCK_OS_APP_HEAD_SIZE") },
            model: {
              value: _vm.boardSettings.appHeapSize,
              callback: function($$v) {
                _vm.$set(_vm.boardSettings, "appHeapSize", $$v)
              },
              expression: "boardSettings.appHeapSize"
            }
          }),
          _vm._v(" "),
          _c("v-text-field", {
            attrs: { dense: "", label: _vm.$t("TOCK_OS_KERNEL_HEAP_SIZE") },
            model: {
              value: _vm.boardSettings.kernelHeapSize,
              callback: function($$v) {
                _vm.$set(_vm.boardSettings, "kernelHeapSize", $$v)
              },
              expression: "boardSettings.kernelHeapSize"
            }
          }),
          _vm._v(" "),
          _c("v-select", {
            attrs: {
              items: _vm.flashingOptions,
              label: _vm.$t("TOCK_OS_SELECT_FLASHING_METHOD")
            },
            model: {
              value: _vm.flashOption,
              callback: function($$v) {
                _vm.flashOption = $$v
              },
              expression: "flashOption"
            }
          }),
          _vm._v(" "),
          _vm.flashOption === _vm.$t("TOCK_OS_FLASHING_OPTIONS_TOCKLOADER")
            ? _c("v-select", {
                attrs: {
                  "return-object": "",
                  items: _vm.boards.tockloader,
                  "item-text": "name",
                  label: _vm.$t("TOCK_OS_SELECT_BOARD")
                },
                model: {
                  value: _vm.board,
                  callback: function($$v) {
                    _vm.board = $$v
                  },
                  expression: "board"
                }
              })
            : _vm.flashOption === "Single Binary"
            ? _c(
                "v-flex",
                [
                  _c("v-select", {
                    attrs: {
                      "return-object": "",
                      items: _vm.boards.singleBinary,
                      "item-text": "name",
                      label: _vm.$t("TOCK_OS_SELECT_BOARD")
                    },
                    model: {
                      value: _vm.board,
                      callback: function($$v) {
                        _vm.board = $$v
                      },
                      expression: "board"
                    }
                  }),
                  _vm._v(" "),
                  _c("v-select", {
                    attrs: {
                      "return-object": "",
                      items: _vm.board.compatibleReleases,
                      "item-text": "name",
                      label: _vm.$t("SELECT_BOARD")
                    },
                    model: {
                      value: _vm.kernelVersion,
                      callback: function($$v) {
                        _vm.kernelVersion = $$v
                      },
                      expression: "kernelVersion"
                    }
                  })
                ],
                1
              )
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
          _c("v-btn", { attrs: { text: "" }, on: { click: _vm.select } }, [
            _vm._v(_vm._s(_vm.$t("SELECT")))
          ]),
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

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_AppBoardSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(333);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_AppBoardSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(219);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var raw_loader_template_makefile_default_libtock_c__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(334);
/* harmony import */ var _boards_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(335);
var _boards_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(335, 1);
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
	name: 'BoardSettings',
	props: ['project'],
	data () {
		return {
			flashingOptions: [this.$t('TOCK_OS_FLASHING_OPTIONS_TOCKLOADER'), this.$t('TOCK_OS_FLASHING_OPTIONS_SINGLE_BINARY')],
			flashOption: undefined,
			boards: _boards_json__WEBPACK_IMPORTED_MODULE_2__,
			board: undefined,
			kernelVersion: undefined,
			boardSettings: {
				stackSize: 2048,
				appHeapSize: 1024,
				kernelHeapSize: 1024
			}
		};
	},
	created: async function () {
		function extractNumber(line) {
			let value = (/(.*=\s*)(.*)/g).exec(line);

			if (value.length > 2) {
				value = value[2];
				if (value !== '') {
					return Number(value);
				}
			}

			return null;
		}

		let AppBoardSettings = await this.studio.projects.loadSpecialFile(this.project, 'app_board_settings.json');

		if (AppBoardSettings === null) {
			let makefile = await this.studio.projects.loadFile(this.project, 'Makefile.app');
			if (makefile !== null) {
				makefile = makefile.toString('utf8').split(/\r?\n/);
				for (let line of makefile) {
					if (line.indexOf('STACK_SIZE') !== -1) {
						let value = extractNumber(line);
						if (value !== null)
							this.boardSettings.stackSize = value;
					} else if (line.indexOf('APP_HEAP_SIZE') !== -1) {
						let value = extractNumber(line);
						if (value !== null)
							this.boardSettings.appHeapSize = value;
					} else if (line.indexOf('KERNEL_HEAP_SIZE') !== -1) {
						let value = extractNumber(line);
						if (value !== null)
							this.boardSettings.kernelHeapSize = value;
					} 
				}
			}	
		} else {
			AppBoardSettings = JSON.parse(AppBoardSettings);
			this.boardSettings = AppBoardSettings.boardSettings;
			this.board = AppBoardSettings.board;
			this.flashOption = AppBoardSettings.flashOption;
			if (this.flashOption === this.$t('TOCK_OS_FLASHING_OPTIONS_SINGLE_BINARY'))
				this.kernelVersion = AppBoardSettings.kernelVersion;
		} 
	},
	methods: {
		async select ()
		{
			await this.generateAppMakefile();

			await this.generateUploadSH();

			if (this.flashOption === this.$t('TOCK_OS_FLASHING_OPTIONS_SINGLE_BINARY'))
				await this.updateGitPrepare();

			await this.studio.projects.saveSpecialFile(this.project, 'app_board_settings.json', Buffer.from(JSON.stringify({
				boardSettings: this.boardSettings,
				board: this.board,
				flashOption: this.flashOption,
				kernelVersion: this.kernelVersion
			})));

			this.$root.$emit ('submit', true);
		},
		async generateAppMakefile () {
			let makefile = await this.studio.projects.loadFile(this.project, 'Makefile.app');
			if (makefile === null) {
				makefile = raw_loader_template_makefile_default_libtock_c__WEBPACK_IMPORTED_MODULE_1__["default"];
			} else {
				// convert buffer to string
				makefile = makefile.toString('utf8');
			}

			makefile = makefile.split(/\r?\n/);
			let newMakefile = [];
			let added = {
				stackSize: false,
				appHeapSize: false,
				kernelHeapSize: false
			};
			for (let line of makefile) {
				if (line.indexOf('STACK_SIZE') !== -1) {
					line = 'STACK_SIZE := ' + this.boardSettings.stackSize;
					added.stackSize = true;
				} else if (line.indexOf('APP_HEAP_SIZE') !== -1) {
					line = 'APP_HEAP_SIZE := ' + this.boardSettings.appHeapSize;
					added.appHeapSize = true;
				} else if (line.indexOf('KERNEL_HEAP_SIZE') !== -1) {
					line = 'KERNEL_HEAP_SIZE := ' + this.boardSettings.kernelHeapSize;
					added.kernelHeapSize = true;
				} else if (line.indexOf('# Include userland') !== -1) {
					if (!added.stackSize) {
						newMakefile.push('STACK_SIZE := ' + this.boardSettings.stackSize);
					}
					if (!added.appHeapSize) {
						newMakefile.push('APP_HEAP_SIZE := ' + this.boardSettings.appHeapSize);
					}
					if (!added.kernelHeapSize) {
						newMakefile.push('KERNEL_HEAP_SIZE := ' + this.boardSettings.kernelHeapSize);
					}
					if (!added.stackSize || !added.appHeapSize || !added.kernelHeapSize) {
						newMakefile.push('');
					}
				}

				newMakefile.push(line);
			}
			newMakefile.splice(1, 0, `PACKAGE_NAME="${this.project.name}"`);
			newMakefile = newMakefile.join('\r\n');
			await this.studio.projects.saveFile(this.project, 'Makefile.app', Buffer.from(newMakefile));
		},
		async generateUploadSH () {
			let uploadSH = '# DO NOT MODIFY this file will be generated AUTOMATICALLY\n\n';
			
			if (this.flashOption === this.$t('TOCK_OS_FLASHING_OPTIONS_TOCKLOADER')) {
				const {board, jtagSoftware} = this.board;

				if (jtagSoftware !== null) {
					uploadSH += `tockloader install ~/libtock-c/examples/studio/build/${this.project.name}.tab --${jtagSoftware} --board ${board}\n`;
				} else {
					uploadSH += `tockloader install ~/libtock-c/examples/studio/build/${this.project.name}.tab\n`;
				}
			} else if (this.flashOption === this.$t('TOCK_OS_FLASHING_OPTIONS_SINGLE_BINARY')) {
				const {board} = this.board;

				this.generateKernelMakefile();

				uploadSH += `cp Makefile.kernel ~/tock/boards/${board}/Makefile.kernel\n`;
				uploadSH += `cd ~/tock/boards/${board} && make -f Makefile.kernel\n`;
				uploadSH += `cd ~/tock/boards/${board} && make -f Makefile.kernel program\n`;
			}

			await this.studio.projects.saveFile(this.project, '.project/upload.sh', Buffer.from(uploadSH));
		},
		async generateKernelMakefile () {
			let kernelMakefile = await this.downloadBoardFile(this.board, 'Makefile');
			kernelMakefile = kernelMakefile.split(/\r?\n/);

			let writeIdx = undefined;
			for (let line of kernelMakefile) {
				if ((/.*:.*program/).exec(line) !== null) {
					writeIdx = kernelMakefile.indexOf(line);
				}
			}
			if (writeIdx) {
				const {architecture} = this.board;

				kernelMakefile = kernelMakefile.slice(0,writeIdx);
				kernelMakefile.push(`APP=$(TOCK_ROOT_DIRECTORY)/../libtock-c/examples/studio/build/${architecture}/${architecture}.tbf`);
				kernelMakefile.push('KERNEL=$(TOCK_ROOT_DIRECTORY)/target/$(TARGET)/debug/$(PLATFORM).elf');
				kernelMakefile.push('KERNEL_WITH_APP=$(TOCK_ROOT_DIRECTORY)/target/$(TARGET)/debug/$(PLATFORM)-app.elf\r\n');
				kernelMakefile.push('.PHONY: program');
				kernelMakefile.push('program: $(TOCK_ROOT_DIRECTORY)target/$(TARGET)/debug/$(PLATFORM).elf');
				kernelMakefile.push('	arm-none-eabi-objcopy --update-section .apps=$(APP) $(KERNEL) $(KERNEL_WITH_APP)');
				kernelMakefile.push('	$(OPENOCD) $(OPENOCD_OPTIONS) -c "init; reset halt; flash write_image erase $(KERNEL_WITH_APP); verify_image $(KERNEL_WITH_APP); reset; shutdown"');
			}

			kernelMakefile = kernelMakefile.join('\r\n');
			await this.studio.projects.saveFile(this.project, 'Makefile.kernel', Buffer.from(kernelMakefile));
		},
		async downloadBoardFile ({board}, filename) {
			let response = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.get (`https://raw.githubusercontent.com/tock/tock/master/boards/${board}/${filename}`);
			return response.data;
		},
		async updateGitPrepare () {
			let gitPrepare = Buffer.from(await this.studio.projects.loadFile(this.project, '.project/gitPrepare.sh')).toString();
			gitPrepare += 'cd $TOCK_KERNEL_DIR && git reset --hard\n';
			gitPrepare += 'cd $TOCK_KERNEL_DIR && git clean -f -d\n';
			gitPrepare += `cd $TOCK_KERNEL_DIR && git checkout ${this.kernelVersion.tag}\n`;

			await this.studio.projects.saveFile(this.project, '.project/gitPrepare.sh', Buffer.from(gitPrepare));
		},
		close ()
		{
			this.$root.$emit ('submit', false);
		},
	}
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(214).Buffer))

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# Makefile for user application\n\n# Specify this directory relative to the current application.\nTOCK_USERLAND_BASE_DIR = ../..\n\n# Which files to compile.\nC_SRCS := $(wildcard *.c)\n\n# Include userland master makefile. Contains rules and flags for actually\n# building the application.\ninclude $(TOCK_USERLAND_BASE_DIR)/AppMakefile.mk\n");

/***/ }),

/***/ 335:
/***/ (function(module) {

module.exports = JSON.parse("{\"tockloader\":[{\"name\":\"HAIL\",\"board\":\"hail\",\"jtagSoftware\":null},{\"name\":\"IMIX\",\"board\":\"imix\",\"jtagSoftware\":null},{\"name\":\"Nordic nRF52-DK\",\"board\":\"nrf52dk\",\"jtagSoftware\":\"jlink\"},{\"name\":\"Arty SiFive (A7 FPGA)\",\"board\":\"arty\",\"jtagSoftware\":\"openocd\"},{\"name\":\"STM32f4-based Nucleo\",\"board\":\"nucleof4\",\"jtagSoftware\":\"openocd\"},{\"name\":\"SiFive HiFive1b\",\"board\":\"hifive1b\",\"jtagSoftware\":\"openocd\"},{\"name\":\"STM32F3-based Discovery Boards\",\"board\":\"stm32f3discovery\",\"jtagSoftware\":\"openocd\"}],\"singleBinary\":[{\"name\":\"STM32F3 Discovery kit\",\"board\":\"stm32f3discovery\",\"architecture\":\"cortex-m4\",\"compatibleReleases\":[{\"name\":\"Tock 1.6\",\"tag\":\"release-1.6\"},{\"name\":\"Tock 1.5\",\"tag\":\"release-1.5\"}]},{\"name\":\"STM32F412G Discovery kit\",\"board\":\"stm32f412gdiscovery\",\"architecture\":\"cortex-m4\",\"compatibleReleases\":[{\"name\":\"Tock 1.6\",\"tag\":\"release-1.6\"}]}]}");

/***/ })

}]);