(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[27],{

/***/ 488:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setup; });
/* harmony import */ var _views_SelectBoard_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(489);
/* harmony import */ var _views_SelectExample_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(497);
/* harmony import */ var raw_loader_template_makefile_board__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(503);
/* harmony import */ var raw_loader_template_makefile_libtock_c__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(504);
let studio = null;

//TODO create settings function to save in folder.






function setup (options, imports, register)
{
	studio = imports;

	/* Board */

	let boardFileIcons = [
		{
			extension: '.ld',
			icon:'mdi-settings'
		},
		{
			extension: '.cfg',
			icon:'mdi-settings'
		}
	];

	let boardTockos = {
		async createProject(name){
			/* studio.workspace.showDialog will return in this case:
				--> true if the submit button was clicked
				--> false if the cancel button was clicked
			*/
			return await studio.workspace.showDialog (_views_SelectBoard_vue__WEBPACK_IMPORTED_MODULE_0__["default"], {name});
		},
		getDefaultFileName() {
			return '/src/main.rs';
		},
		getDefaultRunFileName() {
			return '/src/main.rs';
		},
		getMakefile(/* project, filename */) {
			return raw_loader_template_makefile_board__WEBPACK_IMPORTED_MODULE_2__["default"];
		},
	};

	studio.projects.registerLanguage('tockos-kernel', 'TockOS Kernel', 'plugins/languages/tockos/data/img/tockos-kernel-project.png', 'plugins/languages/tockos/data/img/tockos.png', 'plugins/languages/tockos/data/img/tock-os-28.png', boardFileIcons, boardTockos);

	/* libtock-c */

	let libtockcFileIcons = [
		
	];

	let libtockcTockos = {
		async createProject(name){
			/* studio.workspace.showDialog will return in this case:
				--> true if the submit button was clicked
				--> false if the cancel button was clicked
			*/
			let ret = await studio.workspace.showDialog (_views_SelectExample_vue__WEBPACK_IMPORTED_MODULE_1__["default"], {name});
			if (ret === true) {
				await studio.projects.newFile(name, '.project/upload.sh', '# DO NOT MODIFY this file will be generated AUTOMATICALLY\n\n');
			}
		},
		getDefaultFileName() {
			return '/main.c';
		},
		getDefaultRunFileName() {
			return '/main.c';
		},
		getMakefile(/* project, filename */) {
			return raw_loader_template_makefile_libtock_c__WEBPACK_IMPORTED_MODULE_3__["default"];
		},
	};

	studio.projects.registerLanguage('tockos-libtockc', 'TockOS C App', 'plugins/languages/c/data/img/tockos-c-project.png', 'plugins/languages/c/data/img/c.png', 'plugins/languages/c/data/img/cLittle.png', libtockcFileIcons, libtockcTockos);

	register (null, {});
}


/***/ }),

/***/ 489:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SelectBoard_vue_vue_type_template_id_5243f55a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(490);
/* harmony import */ var _SelectBoard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(492);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SelectBoard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SelectBoard_vue_vue_type_template_id_5243f55a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SelectBoard_vue_vue_type_template_id_5243f55a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/languages/tockos/views/SelectBoard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 490:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectBoard_vue_vue_type_template_id_5243f55a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(491);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectBoard_vue_vue_type_template_id_5243f55a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectBoard_vue_vue_type_template_id_5243f55a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 491:
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
          _vm._v(_vm._s(_vm.$t("TOCK_OS_SELECT_BOARD")) + " ")
        ])
      ]),
      _vm._v(" "),
      _c(
        "v-card-text",
        [
          _vm.downloadingStatus === ""
            ? _c(
                "v-container",
                { attrs: { fluid: "" } },
                [
                  _c("v-select", {
                    attrs: {
                      "return-object": "",
                      items: _vm.gitVersions,
                      "item-text": "name",
                      label: _vm.$t("TOCK_OS_SELECT_RELEASE_VERSION")
                    },
                    model: {
                      value: _vm.gitInfos.version,
                      callback: function($$v) {
                        _vm.$set(_vm.gitInfos, "version", $$v)
                      },
                      expression: "gitInfos.version"
                    }
                  }),
                  _vm._v(" "),
                  _c("v-select", {
                    attrs: {
                      items: _vm.boards[_vm.gitInfos.version.tag],
                      "item-text": "name",
                      "item-value": "board",
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
                ],
                1
              )
            : _vm.downloadingStatus !== ""
            ? _c(
                "v-container",
                { staticStyle: { height: "170px" }, attrs: { fluid: "" } },
                [
                  _c(
                    "v-row",
                    { attrs: { align: "center", justify: "center" } },
                    [
                      _vm._v(
                        "\n\t\t\t\t" +
                          _vm._s(_vm.downloadingStatus) +
                          "\n\n\t\t\t\t"
                      ),
                      _c(
                        "v-progress-circular",
                        {
                          attrs: {
                            rotate: -90,
                            size: 100,
                            width: 15,
                            value: _vm.progress.value,
                            color: "teal"
                          }
                        },
                        [
                          _vm._v(
                            "\n\t\t\t\t\t" +
                              _vm._s(_vm.progress.text) +
                              "\n\t\t\t\t"
                          )
                        ]
                      )
                    ],
                    1
                  )
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
          _c(
            "v-btn",
            {
              attrs: { text: "", disabled: _vm.downloadingStatus !== "" },
              on: { click: _vm.select }
            },
            [_vm._v(_vm._s(_vm.$t("SELECT")))]
          ),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              attrs: { text: "", disabled: _vm.downloadingStatus !== "" },
              on: { click: _vm.close }
            },
            [_vm._v(_vm._s(_vm.$t("CLOSE")))]
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

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_SelectBoard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(493);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectBoard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 493:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _boards_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(494);
var _boards_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(494, 1);
/* harmony import */ var _releases_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(495);
var _releases_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(495, 1);
/* harmony import */ var raw_loader_template_boardSetup_template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(496);
/* harmony import */ var mustache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(218);
/* harmony import */ var mustache__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mustache__WEBPACK_IMPORTED_MODULE_3__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	name: 'SelectBoard',
	props: ['name'],
	data () {
		return {
			gitVersions: [],
			boards: _boards_json__WEBPACK_IMPORTED_MODULE_0__,
			board: undefined,
			downloadingStatus: '',
			progress: {
				value: 0,
				text: 'N/A'
			},
			gitInfos: {
				owner: 'tock',
				repo: 'tock',
				version: undefined
			}
		};
	},
	created: function () {
		this.gitVersions.push({
			name: 'Latest',
			tag: _releases_json__WEBPACK_IMPORTED_MODULE_1__['tock'][0].tag
		});
		this.gitVersions = this.gitVersions.concat(_releases_json__WEBPACK_IMPORTED_MODULE_1__.tock);
		this.gitInfos.version = this.gitVersions[0];
		this.board = this.boards[this.gitInfos.version.tag][0].board;
	},
	methods: {
		async select ()
		{
			if (this.gitInfos.version.name === 'Latest') {
				this.gitInfos.version.tag = 'master';
			}
			
			await this.downloadBoardFiles();
			await this.generateBoardSetupFile();
			await this.generateGitPrepareFile();

			this.$root.$emit ('submit', true);
		},
		async downloadBoardFiles() {
			this.downloadingStatus = this.$t('TOCK_OS_STATUS_FETCHING');
			let boardRoot = `boards/${this.board}`;
			let boardInfos = await this.studio.github.getRepoFileHierarchy(boardRoot, this.gitInfos.owner, this.gitInfos.repo, this.gitInfos.version.tag);
			
			let numberOfFiles = 0;
			for (let key in boardInfos) {
				numberOfFiles += boardInfos[key].length;
			}
			
			this.downloadingStatus = this.$t('TOCK_OS_STATUS_DOWNLOADING');
			let downloadedFiles = 0;
			this.progress.text = this.progress.value.toFixed(2)+'%';
			for (let key in boardInfos) {
				let folderPath = key.replace(boardRoot, '');
				if (folderPath !== '') {
					await this.studio.projects.newFolder(this.name,folderPath);
				}
				for (let file of boardInfos[key]) {
					let filePath = file;
					filePath = filePath.replace(boardRoot, '');
					
					if (filePath.indexOf('Makefile') !== -1)
						await this.studio.projects.newFile(this.name,filePath+'.kernel', await this.studio.github.downloadFile(file, this.gitInfos.owner, this.gitInfos.repo, this.gitInfos.version.tag));
					else
						await this.studio.projects.newFile(this.name,filePath, await this.studio.github.downloadFile(file, this.gitInfos.owner, this.gitInfos.repo, this.gitInfos.version.tag));
					
					downloadedFiles++;
					this.progress.value = (downloadedFiles/numberOfFiles)*100;
					this.progress.text = this.progress.value.toFixed(2)+'%';	
				}
			}
			this.downloadingStatus = this.$t('TOCK_OS_STATUS_FINISHED');
		},
		async generateBoardSetupFile() {
			let boardRoot = `boards/${this.board}`;

			await this.studio.projects.newFile(this.name, '.project/boardSetup.sh', mustache__WEBPACK_IMPORTED_MODULE_3___default.a.render(raw_loader_template_boardSetup_template__WEBPACK_IMPORTED_MODULE_2__["default"], {boardRoot}));
		},
		async generateGitPrepareFile() {
			let gitPrepare = 'cd $TOCK_KERNEL_DIR && git reset --hard\n';
			gitPrepare += 'cd $TOCK_KERNEL_DIR && git clean -f -d\n';
			gitPrepare += `cd $TOCK_KERNEL_DIR && git checkout ${this.gitInfos.version.tag}\n`;
			if (this.gitInfos.version.name === 'Latest') {
				gitPrepare += 'cd $TOCK_KERNEL_DIR && git pull\n';
			}
			
			await this.studio.projects.newFile(this.name, '.project/gitPrepare.sh', gitPrepare);
		},
		close ()
		{
			this.$root.$emit ('submit', false);
		},
	}
});


/***/ }),

/***/ 494:
/***/ (function(module) {

module.exports = JSON.parse("{\"release-1.6\":[{\"name\":\"Hail\",\"board\":\"hail\"},{\"name\":\"Imix\",\"board\":\"imix\"},{\"name\":\"Nordic nRF52-DK\",\"board\":\"nordic/nrf52dk\"},{\"name\":\"Nordic nRF52840-DK\",\"board\":\"nordic/nrf52840dk\"},{\"name\":\"Nordic nRF52840-Dongle\",\"board\":\"nordic/nrf52840_dongle\"},{\"name\":\"ACD52832\",\"board\":\"acd52832\"},{\"name\":\"Nano 33 BLE\",\"board\":\"nano33ble\"},{\"name\":\"ST Nucleo F446RE\",\"board\":\"nucleo_f446re\"},{\"name\":\"ST Nucleo F429ZI\",\"board\":\"nucleo_f429zi\"},{\"name\":\"STM32F3Discovery kit\",\"board\":\"stm32f3discovery\"},{\"name\":\"STM32F412G Discovery kit\",\"board\":\"stm32f412gdiscovery\"},{\"name\":\"SparkFun RedBoard Artemis Nano\",\"board\":\"redboard_artemis_nano\"},{\"name\":\"SiFive HiFive1\",\"board\":\"hifive1\"},{\"name\":\"Digilent Arty A-7 100T\",\"board\":\"arty_e21\"},{\"name\":\"Nexys Video OpenTitan\",\"board\":\"opentitan\"}],\"release-1.5\":[{\"name\":\"Hail\",\"board\":\"hail\"},{\"name\":\"Imix\",\"board\":\"imix\"},{\"name\":\"Nordic nRF52-DK\",\"board\":\"nordic/nrf52dk\"},{\"name\":\"Nordic nRF52840-DK\",\"board\":\"nordic/nrf52840dk\"},{\"name\":\"Nordic nRF52840-Dongle\",\"board\":\"nordic/nrf52840_dongle\"},{\"name\":\"ACD52832\",\"board\":\"acd52832\"},{\"name\":\"ST Nucleo F446RE\",\"board\":\"nucleo_f446re\"},{\"name\":\"ST Nucleo F429ZI\",\"board\":\"nucleo_f429zi\"},{\"name\":\"STM32F3Discovery kit\",\"board\":\"stm32f3discovery\"},{\"name\":\"SiFive HiFive1\",\"board\":\"hifive1\"},{\"name\":\"Digilent Arty A-7 100T\",\"board\":\"arty_e21\"},{\"name\":\"Nexys Video OpenTitan\",\"board\":\"opentitan\"},{\"name\":\"TI LAUNCHXL-CC26x2/CC13x2 SimpleLink Wireless\",\"board\":\"launchxl\"}],\"release-1.4.1\":[{\"name\":\"Hail\",\"board\":\"hail\"},{\"name\":\"Imix\",\"board\":\"imix\"},{\"name\":\"Nordic nRF52-DK\",\"board\":\"nordic/nrf52dk\"},{\"name\":\"Nordic nRF52840-DK\",\"board\":\"nordic/nrf52840dk\"},{\"name\":\"ST Nucleo F446RE\",\"board\":\"nucleo_f446re\"},{\"name\":\"ST Nucleo F429ZI\",\"board\":\"nucleo_f429zi\"},{\"name\":\"SiFive HiFive1\",\"board\":\"hifive1\"},{\"name\":\"Digilent Arty A-7 100T\",\"board\":\"arty-e21\"},{\"name\":\"TI LAUNCHXL-CC26x2/CC13x2 SimpleLink Wireless\",\"board\":\"launchxl\"}]}");

/***/ }),

/***/ 495:
/***/ (function(module) {

module.exports = JSON.parse("{\"tock\":[{\"name\":\"Tock 1.6\",\"tag\":\"release-1.6\"},{\"name\":\"Tock 1.5\",\"tag\":\"release-1.5\"},{\"name\":\"Tock 1.4\",\"tag\":\"release-1.4.1\"}],\"libtock-c\":[{\"name\":\"LibTock-C 1.5\",\"tag\":\"release-1.5\"},{\"name\":\"LibTock-C 1.4\",\"tag\":\"release-1.4\"}]}");

/***/ }),

/***/ 496:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("echo \"$TOCK_KERNEL_DIR\"\nrm -rf \"$TOCK_KERNEL_DIR/{{{boardRoot}}}\"\nmkdir -p \"$TOCK_KERNEL_DIR/{{{boardRoot}}}\"\ncp -R * \"$TOCK_KERNEL_DIR/{{{boardRoot}}}\"\ncd \"$TOCK_KERNEL_DIR/{{{boardRoot}}}\" && make -f Makefile.kernel flash\n");

/***/ }),

/***/ 497:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SelectExample_vue_vue_type_template_id_0280eede___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(498);
/* harmony import */ var _SelectExample_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(500);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SelectExample_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SelectExample_vue_vue_type_template_id_0280eede___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SelectExample_vue_vue_type_template_id_0280eede___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/languages/tockos/views/SelectExample.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 498:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectExample_vue_vue_type_template_id_0280eede___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(499);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectExample_vue_vue_type_template_id_0280eede___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectExample_vue_vue_type_template_id_0280eede___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 499:
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
          _vm._v(_vm._s(_vm.$t("TOCK_OS_SELECT_EXAMPLE")))
        ])
      ]),
      _vm._v(" "),
      _c(
        "v-card-text",
        [
          _vm.downloadingStatus === ""
            ? _c(
                "v-container",
                { attrs: { fluid: "" } },
                [
                  _vm._v("\n\t\t\tStart From an Example Application\n\t\t\t"),
                  _c("v-select", {
                    attrs: {
                      "return-object": "",
                      items: _vm.gitVersions,
                      "item-text": "name",
                      label: _vm.$t("TOCK_OS_SELECT_RELEASE_VERSION")
                    },
                    model: {
                      value: _vm.gitInfos.version,
                      callback: function($$v) {
                        _vm.$set(_vm.gitInfos, "version", $$v)
                      },
                      expression: "gitInfos.version"
                    }
                  }),
                  _vm._v(" "),
                  _c("v-select", {
                    attrs: {
                      items: _vm.examples[_vm.gitInfos.version.tag],
                      "item-text": "name",
                      "item-value": "example",
                      label: _vm.$t("TOCK_OS_SELECT_EXAMPLE")
                    },
                    model: {
                      value: _vm.example,
                      callback: function($$v) {
                        _vm.example = $$v
                      },
                      expression: "example"
                    }
                  })
                ],
                1
              )
            : _vm.downloadingStatus !== ""
            ? _c(
                "v-container",
                { staticStyle: { height: "170px" }, attrs: { fluid: "" } },
                [
                  _c(
                    "v-row",
                    { attrs: { align: "center", justify: "center" } },
                    [
                      _vm._v(
                        "\n\t\t\t\t" +
                          _vm._s(_vm.downloadingStatus) +
                          "\n\n\t\t\t\t"
                      ),
                      _c(
                        "v-progress-circular",
                        {
                          attrs: {
                            rotate: -90,
                            size: 100,
                            width: 15,
                            value: _vm.progress.value,
                            color: "teal"
                          }
                        },
                        [
                          _vm._v(
                            "\n\t\t\t\t\t" +
                              _vm._s(_vm.progress.text) +
                              "\n\t\t\t\t"
                          )
                        ]
                      )
                    ],
                    1
                  )
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
          _c(
            "v-btn",
            {
              attrs: { text: "", disabled: _vm.downloadingStatus !== "" },
              on: { click: _vm.select }
            },
            [_vm._v(_vm._s(_vm.$t("SELECT")))]
          ),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              attrs: { text: "", disabled: _vm.downloadingStatus !== "" },
              on: { click: _vm.close }
            },
            [_vm._v(_vm._s(_vm.$t("CLOSE")))]
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

/***/ 500:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_SelectExample_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(501);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectExample_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 501:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _examples_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(502);
var _examples_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(502, 1);
/* harmony import */ var _releases_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(495);
var _releases_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(495, 1);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	name: 'SelectExample',
	props: ['name'],
	data () {
		return {
			gitVersions: [],
			examples: _examples_json__WEBPACK_IMPORTED_MODULE_0__,
			example: undefined,
			downloadingStatus: '',
			progress: {
				value: 0,
				text: 'N/A'
			},
			gitInfos: {
				owner: 'tock',
				repo: 'libtock-c',
				version: undefined
			}
		};
	},
	created: function () {
		this.gitVersions.push({
			name: 'Latest',
			tag: _releases_json__WEBPACK_IMPORTED_MODULE_1__['libtock-c'][0].tag
		});
		this.gitVersions = this.gitVersions.concat(_releases_json__WEBPACK_IMPORTED_MODULE_1__['libtock-c']);
		this.gitInfos.version = this.gitVersions[0];
		this.example = this.examples[this.gitInfos.version.tag][0].example;
	},
	methods: {
		async select ()
		{
			if (this.example !== '') {
				if (this.gitInfos.version.name === 'Latest') {
					this.gitInfos.version.tag = 'master';
				}
				await this.downloadExampleFiles();
			} else {
				await this.studio.projects.newFile(this.name, './main.c', '');
			}

			await this.generateGitPrepareFile();

			this.$root.$emit ('submit', true);
		},
		async downloadExampleFiles() {
			this.downloadingStatus = this.$t('TOCK_OS_STATUS_FETCHING');
			let exampleRoot = `examples/${this.example}`;
			let exampleInfos = await this.studio.github.getRepoFileHierarchy(exampleRoot, this.gitInfos.owner, this.gitInfos.repo, this.gitInfos.version.tag);
			
			let numberOfFiles = 0;
			for (let key in exampleInfos) {
				numberOfFiles += exampleInfos[key].length;
			}

			this.downloadingStatus = this.$t('TOCK_OS_STATUS_DOWNLOADING');
			let downloadedFiles = 0;
			this.progress.text = this.progress.value.toFixed(2)+'%';
			for (let key in exampleInfos) {
				let folderPath = key.replace(exampleRoot, '');
				if (folderPath !== '') {
					await this.studio.projects.newFolder(this.name,folderPath);
				}

				for (let file of exampleInfos[key]) {
					let filePath = file;
					filePath = filePath.replace(exampleRoot, '');
					
					if (filePath.indexOf('Makefile') !== -1)
						await this.studio.projects.newFile(this.name,filePath+'.app', await this.studio.github.downloadFile(file, this.gitInfos.owner, this.gitInfos.repo, this.gitInfos.version.tag));
					else
						await this.studio.projects.newFile(this.name,filePath, await this.studio.github.downloadFile(file, this.gitInfos.owner, this.gitInfos.repo, this.gitInfos.version.tag));
					
					downloadedFiles++;
					this.progress.value = (downloadedFiles/numberOfFiles)*100;	
					this.progress.text = this.progress.value.toFixed(2)+'%';
				}
			}

			this.downloadingStatus = this.$t('TOCK_OS_STATUS_FINISHED');
		},
		async generateGitPrepareFile() {
			let gitPrepare = 'cd $TOCK_LIBC_DIR && git reset --hard\n';
			gitPrepare += 'cd $TOCK_LIBC_DIR && git clean -f -d\n';
			gitPrepare += `cd $TOCK_LIBC_DIR && git checkout ${this.gitInfos.version.tag}\n`;
			if (this.gitInfos.version.name === 'Latest') {
				gitPrepare += 'cd $TOCK_LIBC_DIR && git pull\n';
			}
			
			await this.studio.projects.newFile(this.name, '.project/gitPrepare.sh', gitPrepare);
		},
		close ()
		{
			this.$root.$emit ('submit', false);
		}
	}
});


/***/ }),

/***/ 502:
/***/ (function(module) {

module.exports = JSON.parse("{\"release-1.5\":[{\"name\":\"Empty Application\",\"example\":\"\"},{\"name\":\"Hello World\",\"example\":\"c_hello\"},{\"name\":\"Accelerometer -> LEDs\",\"example\":\"accel-leds\"},{\"name\":\"UART over BLE\",\"example\":\"ble-uart\"},{\"name\":\"Bluetooth Low Energy Advertisement App\",\"example\":\"ble_advertising\"},{\"name\":\"Bluetooth Low Energy Passive Scanning\",\"example\":\"ble_passive_scanning\"},{\"name\":\"Blink\",\"example\":\"blink\"},{\"name\":\"Buttons -> LEDs\",\"example\":\"buttons\"},{\"name\":\"cxx_hello\",\"example\":\"cxx_hello\"},{\"name\":\"Find North\",\"example\":\"find_north\"},{\"name\":\"LCD 16x2 HD44780 App\",\"example\":\"hd44780\"},{\"name\":\"IPv6 Sensor App\",\"example\":\"ip_sense\"},{\"name\":\"l3gd20\",\"example\":\"l3gd20\"},{\"name\":\"lsm303dlhc\",\"example\":\"lsm303dlhc\"},{\"name\":\"lua-hello\",\"example\":\"lua-hello\"},{\"name\":\"lvgl\",\"example\":\"lvgl\"},{\"name\":\"rot13_client\",\"example\":\"rot13_client\"},{\"name\":\"rot13_service\",\"example\":\"rot13_service\"},{\"name\":\"screen\",\"example\":\"screen\"},{\"name\":\"security_app\",\"example\":\"security_app\"},{\"name\":\"sensors\",\"example\":\"sensors\"},{\"name\":\"Wit Energy BLE App\",\"example\":\"witenergy\"}],\"release-1.4\":[{\"name\":\"Empty Application\",\"example\":\"\"},{\"name\":\"Hello World\",\"example\":\"c_hello\"},{\"name\":\"Accelerometer -> LEDs\",\"example\":\"accel-leds\"},{\"name\":\"UART over BLE\",\"example\":\"ble-uart\"},{\"name\":\"Bluetooth Low Energy Advertisement App\",\"example\":\"ble_advertising\"},{\"name\":\"Bluetooth Low Energy Passive Scanning\",\"example\":\"ble_passive_scanning\"},{\"name\":\"Blink\",\"example\":\"blink\"},{\"name\":\"Buttons -> LEDs\",\"example\":\"buttons\"},{\"name\":\"cxx_hello\",\"example\":\"cxx_hello\"},{\"name\":\"Find North\",\"example\":\"find_north\"},{\"name\":\"IPv6 Sensor App\",\"example\":\"ip_sense\"},{\"name\":\"lua-hello\",\"example\":\"lua-hello\"},{\"name\":\"rot13_client\",\"example\":\"rot13_client\"},{\"name\":\"rot13_service\",\"example\":\"rot13_service\"},{\"name\":\"security_app\",\"example\":\"security_app\"},{\"name\":\"sensors\",\"example\":\"sensors\"},{\"name\":\"Wit Energy BLE App\",\"example\":\"witenergy\"}]}");

/***/ }),

/***/ 503:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("run:\n\t. .project/gitPrepare.sh\n\t. .project/boardSetup.sh\n\ttockloader listen\n");

/***/ }),

/***/ 504:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("run:\n\t. .project/gitPrepare.sh\n\techo \"$(TOCK_LIBC_DIR)\"\n\trm -rf \"$(TOCK_LIBC_DIR)/examples/studio\"\n\tmkdir -p \"$(TOCK_LIBC_DIR)/examples/studio\"\n\tcp -R * \"$(TOCK_LIBC_DIR)/examples/studio\"\n\tcd \"$(TOCK_LIBC_DIR)/examples/studio\" && make -f Makefile.app\n\t. .project/upload.sh");

/***/ })

}]);