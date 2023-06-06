(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[63],{

/***/ 1878:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var _views_Tutorials_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1879);


let studio = null;

function setup(options, imports, register) 
{
	studio = imports;
	let platformData = {
		platform: 'github',
		branch: 'main',
		token: null,
		gitlabURL: null
	};

	let tutorials = {
		/**
		 * Show a list for tutorials from a repository
		 * 
		 * @param {String} repository - username/repository
		 */
		showTutorials (repository) {		
			let owner = repository.split('/')[0];
			repository = repository.split('/')[1];
			studio.workspace.showDialog (_views_Tutorials_vue__WEBPACK_IMPORTED_MODULE_0__["default"], {
				owner: owner,
				repository: repository,
				platformData: platformData,
				width: 600
			});
		}
	};

	studio.workspace.registerToolbarButton ('TUTORIALS_NAME', 20, 
		() => { 
			tutorials.showTutorials ('wyliodrinstudio/tutorials');
		},

		'plugins/tutorials/data/img/toque.png');
		
	register(null, {
		tutorials: tutorials
	});
	
}

/***/ }),

/***/ 1879:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tutorials_vue_vue_type_template_id_4cd5e885___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1880);
/* harmony import */ var _Tutorials_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1882);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Tutorials_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Tutorials_vue_vue_type_template_id_4cd5e885___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Tutorials_vue_vue_type_template_id_4cd5e885___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/tutorials/views/Tutorials.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1880:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tutorials_vue_vue_type_template_id_4cd5e885___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1881);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tutorials_vue_vue_type_template_id_4cd5e885___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tutorials_vue_vue_type_template_id_4cd5e885___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1881:
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
    { staticClass: "manager-box emulator-box" },
    [
      _c(
        "v-card-title",
        [
          _c("span", { staticClass: "headline" }, [
            _vm._v(_vm._s(_vm.$t("TUTORIALS_NAME")))
          ]),
          _vm._v(" "),
          _c("v-spacer")
        ],
        1
      ),
      _vm._v(" "),
      _c("v-card-text", [
        !_vm.tutorials
          ? _c(
              "div",
              [_c("v-progress-circular", { attrs: { indeterminate: "" } })],
              1
            )
          : _c(
              "div",
              [
                _vm.downloading
                  ? _c(
                      "div",
                      [
                        _c(
                          "v-row",
                          { attrs: { align: "center", justify: "center" } },
                          [
                            _vm._v(
                              "\n\t\t\t\t\t\tDownloading ...\n\n\t\t\t\t\t"
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
                                  "\n\t\t\t\t\t\t" +
                                    _vm._s(_vm.progress.text) +
                                    "\n\t\t\t\t\t"
                                )
                              ]
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  : _c(
                      "v-list",
                      { attrs: { "three-line": "" } },
                      _vm._l(_vm.tutorials, function(tutorial) {
                        return _c(
                          "v-list-item",
                          {
                            key: tutorial.title,
                            attrs: {
                              disabled: !_vm.available(tutorial.language)
                            },
                            on: {
                              click: function($event) {
                                return _vm.createProject(tutorial)
                              }
                            }
                          },
                          [
                            _c(
                              "v-list-item-avatar",
                              [
                                _c("v-img", {
                                  attrs: {
                                    src: _vm.boardIcon(
                                      tutorial.type,
                                      tutorial.board
                                    )
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-list-item-content",
                              [
                                _c("v-list-item-title", {
                                  domProps: {
                                    textContent: _vm._s(tutorial.title)
                                  }
                                }),
                                _vm._v(" "),
                                _c("v-list-item-subtitle", {
                                  domProps: {
                                    textContent: _vm._s(tutorial.description)
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-list-item-avatar",
                              [
                                _c("v-img", {
                                  attrs: {
                                    src: _vm.languageIcon(tutorial.language)
                                  }
                                })
                              ],
                              1
                            )
                          ],
                          1
                        )
                      }),
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
          _c("v-spacer"),
          _vm._v(" "),
          _c("v-btn", { attrs: { text: "" }, on: { click: _vm.close } }, [
            _vm._v("CLOSE")
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

/***/ 1882:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_Tutorials_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1883);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_Tutorials_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1883:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	name: 'Tutorials',
	props: ['owner', 'repository', 'platformData'],
	data ()
	{
		return  {
			tutorials: null,	
			downloading: false,
			platform: null,
			progress: {}
		};
	},
	async created () {
		if(this.platformData.platform == 'github') this.platform = this.studio.github;
		else this.platform = this.studio.gitlab;

		if(this.platformData.token)
			this.platform.authenticate(this.platformData.token);
		if(this.platformData.gitlabURL)
			this.platform.changeURL(this.platformData.gitlabURL);

		let response = await this.platform.getContentOfDir('', this.owner, this.repository, this.platformData.branch);
		
		let tutorials = [];
		for (let dir of response.dirs) {
			let tutorial = await this.platform.downloadFile(`${dir}/.project/tutorial.json`, this.owner, this.repository, this.platformData.branch);

			tutorials.push(tutorial);
			tutorial['path'] = dir;
		}	
		
		this.tutorials = tutorials;
	},
	methods: {	
		close ()
		{
			this.$root.$emit ('submit');
		},
		boardIcon (type, board) {
			let icon =  this.studio.workspace.getBoardIcon (type, board);
			if (!icon) icon = 'plugins/tutorials/data/img/unknown_board.png';
			return icon;
		},
		languageIcon (languageId) {
			let language = this.studio.projects.getLanguage (languageId);
			if (language)
			{
				return language.icon;
			}
			else
			{
				return 'plugins/tutorials/data/img/toque.png';
			}
		},
		available (languageId) {
			return this.studio.projects.getLanguage (languageId) != null;
		},
		async createProject(tutorial) {
			let nameProject = await this.studio.workspace.showPrompt('TUTORIALS_IMPORT', 'TUTORIALS_IMPORT_PROJECT_NAME', tutorial.title, 'TUTORIALS_IMPORT', {title: tutorial.title});
			if (nameProject !== null) 
			{				
				this.downloading = true;	
				let createProject = await this.studio.projects.createEmptyProject(nameProject, tutorial.language);
				if (createProject) {
					let dirInfos = {};
					await this.platform.getDirListOfFiles(tutorial.path, dirInfos, this.owner, this.repository, this.platformData.branch);
					let numberOfFiles = 0;
					for (let key in dirInfos) {
						numberOfFiles += dirInfos[key].length;
					}
					let downloadedFiles = 0;
									
					for (let key in dirInfos) {
						let folderPath = key.replace(tutorial.path, '');
						if (folderPath !== '') {
							
							await this.studio.projects.newFolder(createProject, folderPath);
						}
						for (let file of dirInfos[key]) {
						
							let filePath = file.replace(tutorial.path, '');
							let fileData = await this.platform.downloadFile(file, this.owner, this.repository, this.platformData.branch, 'arraybuffer');

							await this.studio.projects.newFile(createProject, filePath, Buffer.from (fileData));
							downloadedFiles++;
							this.progress.value = (downloadedFiles/numberOfFiles)*100;
							this.progress.text = this.progress.value.toFixed(2)+'%';
						}
						
					}	 
					this.close ();
					this.studio.projects.selectCurrentProject (createProject, true);
				}
				else
				{
					this.studio.workspace.showNotification ('TUTORIALS_PROJECT_EXISTS', {name: nameProject});
				}
				this.downloading = false;
			}	
		}
	}
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(214).Buffer))

/***/ })

}]);