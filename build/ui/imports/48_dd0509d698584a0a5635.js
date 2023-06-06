(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[48],{

/***/ 1365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var _views_Notebook_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1366);



// events.on ('note', (...params) => {
// 	console.log (params);
// });

let notebook = {
	register (fn)
	{
		let run = fn.bind (fn.this, 'run');
		let stop = fn.bind (fn.this, 'stop');
		let reset = fn.bind (fn.this, 'reset');
		_views_Notebook_vue__WEBPACK_IMPORTED_MODULE_0__["events"].on ('run', run);
		_views_Notebook_vue__WEBPACK_IMPORTED_MODULE_0__["events"].on ('stop', stop);
		_views_Notebook_vue__WEBPACK_IMPORTED_MODULE_0__["events"].on ('reset', reset);
		return () => {
			_views_Notebook_vue__WEBPACK_IMPORTED_MODULE_0__["events"].removeListener ('run', run);
			_views_Notebook_vue__WEBPACK_IMPORTED_MODULE_0__["events"].removeListener ('stop', stop);
			_views_Notebook_vue__WEBPACK_IMPORTED_MODULE_0__["events"].removeListener ('reset', reset);
		};
	},
	printCode(id, data)
	{
		let notebook = Object(_views_Notebook_vue__WEBPACK_IMPORTED_MODULE_0__["getNotebook"])();
		notebook.printPythonCode(id, data);
	},
	printError(id, data)
	{
		let notebook = Object(_views_Notebook_vue__WEBPACK_IMPORTED_MODULE_0__["getNotebook"])();
		notebook.printPythonError(id, data);
	},
	printResult(id, data)
	{
		let notebook = Object(_views_Notebook_vue__WEBPACK_IMPORTED_MODULE_0__["getNotebook"])();
		notebook.printPythonResult(id, data);
	},
	setStatus (id, status)
	{
		let notebook = Object(_views_Notebook_vue__WEBPACK_IMPORTED_MODULE_0__["getNotebook"])();
		notebook.setStatus(id, status);
	}
};
function setup (options, imports, register)
{
	const studio = imports;
	studio.workspace.registerTab('PROJECT_NOTEBOOK', 300, _views_Notebook_vue__WEBPACK_IMPORTED_MODULE_0__["default"], {
		enabled () {
			return !!studio.projects.getCurrentProject ();
		}
	});

	register (null, {
		notebook: notebook
	});
}

/***/ }),

/***/ 1366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Notebook_vue_vue_type_template_id_20c37480_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1367);
/* harmony import */ var _Notebook_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1369);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "events", function() { return _Notebook_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["events"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getNotebook", function() { return _Notebook_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["getNotebook"]; });

/* harmony import */ var _Notebook_vue_vue_type_style_index_0_id_20c37480_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1575);
/* harmony import */ var _Notebook_vue_vue_type_style_index_1_lang_less___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1578);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(54);







/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _Notebook_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Notebook_vue_vue_type_template_id_20c37480_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Notebook_vue_vue_type_template_id_20c37480_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "20c37480",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/projects/notebook/views/Notebook.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Notebook_vue_vue_type_template_id_20c37480_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1368);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Notebook_vue_vue_type_template_id_20c37480_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Notebook_vue_vue_type_template_id_20c37480_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.currentProject
    ? _c(
        "div",
        {
          ref: "notebook",
          staticClass: "notebook-box",
          on: {
            click: function($event) {
              if ($event.target !== $event.currentTarget) {
                return null
              }
              return _vm.showCurrentElement(null)
            }
          }
        },
        [
          _vm._l(_vm.elements, function(element) {
            return _c("li", { key: element.id }, [
              _c(
                "div",
                {
                  on: {
                    click: function($event) {
                      return _vm.showCurrentElement(element)
                    }
                  }
                },
                [
                  _c(
                    "v-layout",
                    [
                      _c(
                        "v-flex",
                        [
                          _c("v-card", [
                            element.id === _vm.visibleId
                              ? _c(
                                  "div",
                                  { staticClass: "section-active" },
                                  [
                                    _c(
                                      "v-card-actions",
                                      [
                                        _c(
                                          "v-layout",
                                          [
                                            _c("v-select", {
                                              staticClass: "drpdown",
                                              attrs: {
                                                items: _vm.items,
                                                "item-text": "title",
                                                "item-value": "type",
                                                "hide-details": ""
                                              },
                                              model: {
                                                value: element.type,
                                                callback: function($$v) {
                                                  _vm.$set(element, "type", $$v)
                                                },
                                                expression: "element.type"
                                              }
                                            })
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-tooltip",
                                          {
                                            attrs: { bottom: "" },
                                            scopedSlots: _vm._u(
                                              [
                                                {
                                                  key: "activator",
                                                  fn: function(ref) {
                                                    var on = ref.on
                                                    return [
                                                      _c(
                                                        "v-btn",
                                                        {
                                                          staticClass:
                                                            "ntbk-btn",
                                                          attrs: { text: "" },
                                                          on: {
                                                            click: function(
                                                              $event
                                                            ) {
                                                              return _vm.moveUp(
                                                                element.id
                                                              )
                                                            }
                                                          }
                                                        },
                                                        [
                                                          _c("v-img", {
                                                            attrs: {
                                                              src:
                                                                "plugins/projects/notebook/data/img/icons/up-icon.png"
                                                            }
                                                          })
                                                        ],
                                                        1
                                                      )
                                                    ]
                                                  }
                                                }
                                              ],
                                              null,
                                              true
                                            )
                                          },
                                          [
                                            _vm._v(" "),
                                            _c("span", [_vm._v("Move up")])
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-tooltip",
                                          {
                                            attrs: { bottom: "" },
                                            scopedSlots: _vm._u(
                                              [
                                                {
                                                  key: "activator",
                                                  fn: function(ref) {
                                                    var on = ref.on
                                                    return [
                                                      _c(
                                                        "v-btn",
                                                        {
                                                          staticClass:
                                                            "ntbk-btn",
                                                          attrs: { text: "" },
                                                          on: {
                                                            click: function(
                                                              $event
                                                            ) {
                                                              return _vm.moveDown(
                                                                element.id
                                                              )
                                                            }
                                                          }
                                                        },
                                                        [
                                                          _c("v-img", {
                                                            attrs: {
                                                              src:
                                                                "plugins/projects/notebook/data/img/icons/down-icon.png"
                                                            }
                                                          })
                                                        ],
                                                        1
                                                      )
                                                    ]
                                                  }
                                                }
                                              ],
                                              null,
                                              true
                                            )
                                          },
                                          [
                                            _vm._v(" "),
                                            _c("span", [_vm._v("Move down")])
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-tooltip",
                                          {
                                            attrs: { bottom: "" },
                                            scopedSlots: _vm._u(
                                              [
                                                {
                                                  key: "activator",
                                                  fn: function(ref) {
                                                    var on = ref.on
                                                    return [
                                                      _c(
                                                        "v-btn",
                                                        {
                                                          staticClass:
                                                            "ntbk-btn",
                                                          attrs: { text: "" },
                                                          on: {
                                                            click: function(
                                                              $event
                                                            ) {
                                                              return _vm.deleteElement(
                                                                element
                                                              )
                                                            }
                                                          }
                                                        },
                                                        [
                                                          _c("v-img", {
                                                            attrs: {
                                                              src:
                                                                "plugins/projects/notebook/data/img/icons/delete-icon.png"
                                                            }
                                                          })
                                                        ],
                                                        1
                                                      )
                                                    ]
                                                  }
                                                }
                                              ],
                                              null,
                                              true
                                            )
                                          },
                                          [
                                            _vm._v(" "),
                                            _c("span", [_vm._v("Delete")])
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-tooltip",
                                          {
                                            attrs: { bottom: "" },
                                            scopedSlots: _vm._u(
                                              [
                                                {
                                                  key: "activator",
                                                  fn: function(ref) {
                                                    var on = ref.on
                                                    return [
                                                      _c(
                                                        "v-btn",
                                                        {
                                                          staticClass:
                                                            "ntbk-btn",
                                                          attrs: { text: "" },
                                                          on: {
                                                            click:
                                                              _vm.addElement
                                                          }
                                                        },
                                                        [
                                                          _c("v-img", {
                                                            attrs: {
                                                              src:
                                                                "plugins/projects/notebook/data/img/icons/add-icon.png"
                                                            }
                                                          })
                                                        ],
                                                        1
                                                      )
                                                    ]
                                                  }
                                                }
                                              ],
                                              null,
                                              true
                                            )
                                          },
                                          [
                                            _vm._v(" "),
                                            _c("span", [_vm._v("Add")])
                                          ]
                                        ),
                                        _vm._v(" "),
                                        element.type === "markdown"
                                          ? _c(
                                              "v-tooltip",
                                              {
                                                attrs: { bottom: "" },
                                                scopedSlots: _vm._u(
                                                  [
                                                    {
                                                      key: "activator",
                                                      fn: function(ref) {
                                                        var on = ref.on
                                                        return [
                                                          _c(
                                                            "v-btn",
                                                            {
                                                              staticClass:
                                                                "ntbk-btn right",
                                                              attrs: {
                                                                text: ""
                                                              },
                                                              on: {
                                                                click: function(
                                                                  $event
                                                                ) {
                                                                  element.editable = !element.editable
                                                                }
                                                              }
                                                            },
                                                            [
                                                              _c("v-img", {
                                                                attrs: {
                                                                  src:
                                                                    "plugins/projects/notebook/data/img/icons/edit-icon.png"
                                                                }
                                                              })
                                                            ],
                                                            1
                                                          )
                                                        ]
                                                      }
                                                    }
                                                  ],
                                                  null,
                                                  true
                                                )
                                              },
                                              [
                                                _vm._v(" "),
                                                _c("span", [_vm._v("Edit")])
                                              ]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        element.type === "python" &&
                                        _vm.visibleRun &&
                                        !_vm.runningId
                                          ? _c(
                                              "v-tooltip",
                                              {
                                                attrs: { bottom: "" },
                                                scopedSlots: _vm._u(
                                                  [
                                                    {
                                                      key: "activator",
                                                      fn: function(ref) {
                                                        var on = ref.on
                                                        return [
                                                          _c(
                                                            "v-btn",
                                                            {
                                                              staticClass:
                                                                "ntbk-btn",
                                                              attrs: {
                                                                text: ""
                                                              },
                                                              on: {
                                                                click: function(
                                                                  $event
                                                                ) {
                                                                  return _vm.runCode(
                                                                    element.id
                                                                  )
                                                                }
                                                              }
                                                            },
                                                            [
                                                              _c("v-img", {
                                                                attrs: {
                                                                  src:
                                                                    "plugins/projects/notebook/data/img/icons/run-icon.png"
                                                                }
                                                              })
                                                            ],
                                                            1
                                                          )
                                                        ]
                                                      }
                                                    }
                                                  ],
                                                  null,
                                                  true
                                                )
                                              },
                                              [
                                                _vm._v(" "),
                                                _c("span", [_vm._v("Run")])
                                              ]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.runningId === element.id
                                          ? _c(
                                              "span",
                                              { staticClass: "ntbk-btn" },
                                              [
                                                _c("v-img", {
                                                  attrs: {
                                                    src:
                                                      "plugins/projects/notebook/data/img/icons/running.gif"
                                                  }
                                                })
                                              ],
                                              1
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.status === "RUNNING" ||
                                        _vm.status === "STOPPED"
                                          ? _c(
                                              "v-tooltip",
                                              {
                                                attrs: { bottom: "" },
                                                scopedSlots: _vm._u(
                                                  [
                                                    {
                                                      key: "activator",
                                                      fn: function(ref) {
                                                        var on = ref.on
                                                        return [
                                                          _c(
                                                            "v-btn",
                                                            {
                                                              directives: [
                                                                {
                                                                  name: "show",
                                                                  rawName:
                                                                    "v-show",
                                                                  value:
                                                                    _vm.visibleRun,
                                                                  expression:
                                                                    "visibleRun"
                                                                }
                                                              ],
                                                              staticClass:
                                                                "ntbk-btn",
                                                              attrs: {
                                                                text: ""
                                                              },
                                                              on: {
                                                                click: function(
                                                                  $event
                                                                ) {
                                                                  return _vm.stopCode(
                                                                    element.id
                                                                  )
                                                                }
                                                              }
                                                            },
                                                            [
                                                              _c("v-img", {
                                                                attrs: {
                                                                  src:
                                                                    "plugins/projects/notebook/data/img/icons/stop-icon.png"
                                                                }
                                                              })
                                                            ],
                                                            1
                                                          )
                                                        ]
                                                      }
                                                    }
                                                  ],
                                                  null,
                                                  true
                                                )
                                              },
                                              [
                                                _vm._v(" "),
                                                _c("span", [_vm._v("Stop")])
                                              ]
                                            )
                                          : _vm._e()
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    element.type === "markdown"
                                      ? _c("div", {
                                          staticClass: "compiledmkd",
                                          domProps: {
                                            innerHTML: _vm._s(
                                              _vm.compiledMarkdown(element)
                                            )
                                          }
                                        })
                                      : _vm._e(),
                                    _vm._v(" "),
                                    element.type === "markdown"
                                      ? _c(
                                          "div",
                                          { staticClass: "markdown-box" },
                                          [
                                            element.editable
                                              ? _c(
                                                  "div",
                                                  [
                                                    _c("AceNotebook", {
                                                      attrs: {
                                                        syntax: "markdown",
                                                        element: element
                                                      },
                                                      model: {
                                                        value: element.data,
                                                        callback: function(
                                                          $$v
                                                        ) {
                                                          _vm.$set(
                                                            element,
                                                            "data",
                                                            $$v
                                                          )
                                                        },
                                                        expression:
                                                          "element.data"
                                                      }
                                                    })
                                                  ],
                                                  1
                                                )
                                              : _vm._e()
                                          ]
                                        )
                                      : _c(
                                          "div",
                                          [
                                            _c("AceNotebook", {
                                              attrs: {
                                                syntax: "python",
                                                element: element
                                              },
                                              model: {
                                                value: element.data,
                                                callback: function($$v) {
                                                  _vm.$set(element, "data", $$v)
                                                },
                                                expression: "element.data"
                                              }
                                            }),
                                            _vm._v(" "),
                                            element.code
                                              ? _c("pre", [
                                                  _vm._v(_vm._s(element.code))
                                                ])
                                              : _vm._e(),
                                            _vm._v(" "),
                                            element.error
                                              ? _c("div", {
                                                  domProps: {
                                                    innerHTML: _vm._s(
                                                      element.error
                                                    )
                                                  }
                                                })
                                              : _vm._e(),
                                            _vm._v(" "),
                                            element.result
                                              ? _c("div", {
                                                  staticClass: "result",
                                                  domProps: {
                                                    innerHTML: _vm._s(
                                                      element.result
                                                    )
                                                  }
                                                })
                                              : _vm._e()
                                          ],
                                          1
                                        )
                                  ],
                                  1
                                )
                              : element.type === "markdown"
                              ? _c("div", [
                                  _c("div", {
                                    staticClass: "compiledmkd",
                                    domProps: {
                                      innerHTML: _vm._s(
                                        _vm.compiledMarkdown(element)
                                      )
                                    }
                                  })
                                ])
                              : _c(
                                  "div",
                                  [
                                    _c("AceNotebook", {
                                      attrs: {
                                        syntax: "python",
                                        element: element,
                                        readOnly: true
                                      },
                                      model: {
                                        value: element.data,
                                        callback: function($$v) {
                                          _vm.$set(element, "data", $$v)
                                        },
                                        expression: "element.data"
                                      }
                                    }),
                                    _vm._v(" "),
                                    element.code
                                      ? _c("pre", { staticClass: "code" }, [
                                          _vm._v(_vm._s(element.code))
                                        ])
                                      : _vm._e(),
                                    _vm._v(" "),
                                    element.error
                                      ? _c("div", {
                                          staticClass: "error",
                                          domProps: {
                                            innerHTML: _vm._s(element.error)
                                          }
                                        })
                                      : _vm._e(),
                                    _vm._v(" "),
                                    element.result
                                      ? _c("div", {
                                          staticClass: "result",
                                          domProps: {
                                            innerHTML: _vm._s(element.result)
                                          }
                                        })
                                      : _vm._e()
                                  ],
                                  1
                                )
                          ])
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ])
          }),
          _vm._v(" "),
          _c("div", { staticClass: "bottom-space" }),
          _vm._v(" "),
          _vm.visibleRun
            ? _c(
                "div",
                {
                  staticClass: "server-status no-print",
                  class: {
                    connected:
                      _vm.status === "READY" || _vm.status === "PROCESSING",
                    stopped: _vm.status === "STOPPED"
                  }
                },
                [
                  _vm._v("\n\t\tPython " + _vm._s(_vm.status) + "\n\t\t"),
                  _vm.visibleRun
                    ? _c(
                        "v-tooltip",
                        {
                          attrs: { top: "" },
                          scopedSlots: _vm._u(
                            [
                              {
                                key: "activator",
                                fn: function(ref) {
                                  var on = ref.on
                                  return [
                                    _c(
                                      "v-btn",
                                      {
                                        staticClass: "ntbk-btn",
                                        attrs: { text: "" },
                                        on: {
                                          click: function($event) {
                                            return _vm.resetCode(
                                              _vm.runningElementId
                                            )
                                          }
                                        }
                                      },
                                      [
                                        _c("v-img", {
                                          attrs: {
                                            src:
                                              "plugins/projects/notebook/data/img/icons/reset-icon.png"
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  ]
                                }
                              }
                            ],
                            null,
                            false,
                            2092170895
                          )
                        },
                        [_vm._v(" "), _c("span", [_vm._v("Reset")])]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.visibleRun && _vm.status !== "STOPPED"
                    ? _c(
                        "v-tooltip",
                        {
                          attrs: { top: "" },
                          scopedSlots: _vm._u(
                            [
                              {
                                key: "activator",
                                fn: function(ref) {
                                  var on = ref.on
                                  return [
                                    _c(
                                      "v-btn",
                                      {
                                        staticClass: "ntbk-btn",
                                        attrs: { text: "" },
                                        on: {
                                          click: function($event) {
                                            return _vm.stopInterpretor()
                                          }
                                        }
                                      },
                                      [
                                        _c("v-img", {
                                          attrs: {
                                            src:
                                              "plugins/projects/notebook/data/img/icons/stop-icon.png"
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  ]
                                }
                              }
                            ],
                            null,
                            false,
                            3908006204
                          )
                        },
                        [_vm._v(" "), _c("span", [_vm._v("Stop")])]
                      )
                    : _vm._e()
                ],
                1
              )
            : _vm._e()
        ],
        2
      )
    : _c("div", [
        _vm._v("\n\t" + _vm._s(_vm.$t("NOTEBOOK_LOAD_PROJECT")) + "\n")
      ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_Notebook_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1370);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "events", function() { return _node_modules_vue_loader_lib_index_js_vue_loader_options_Notebook_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["events"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getNotebook", function() { return _node_modules_vue_loader_lib_index_js_vue_loader_options_Notebook_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["getNotebook"]; });

 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_Notebook_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "events", function() { return events; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNotebook", function() { return getNotebook; });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var marked__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1371);
/* harmony import */ var marked__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(marked__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AceNotebook_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1372);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(39);
/* harmony import */ var highlight_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1382);
/* harmony import */ var highlight_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(highlight_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var katex__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1574);
/* harmony import */ var katex__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(katex__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_6__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









let events = new events__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"] ();

let notebook = null;
function getNotebook()
{
	return notebook;
}

var renderer = new marked__WEBPACK_IMPORTED_MODULE_1___default.a.Renderer();
marked__WEBPACK_IMPORTED_MODULE_1___default.a.setOptions({
	renderer: renderer,
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: false,
	smartLists: true,
	smartypants: false,
	highlight: function (code, lang) {
		try
		{
			var html = code;
			if (!lang) 
				html = highlight_js__WEBPACK_IMPORTED_MODULE_4___default.a.highlightAuto (code).value;
			else 
				html = highlight_js__WEBPACK_IMPORTED_MODULE_4___default.a.highlight(lang, code).value;
			return html;
		}
		catch (e)
		{
			return code;
		}
	},
	latex: function (text, style)
	{
		try
		{
			var web = katex__WEBPACK_IMPORTED_MODULE_5___default.a.renderToString (text, (style?{displayMode: true}:null));
			if (style) web = '<span style="font-size: 20px">'+web+'</span>';
			return web;
		}
		catch (e)
		{
			return text;
		}
	},
});

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'Notebook',
	data()
	{
		return {
			elements: [
			
				{ id: Object(uuid__WEBPACK_IMPORTED_MODULE_0__["v4"])(), type: 'markdown',editable: false,data: '# New Item', code: '', error: '', result:''},
			],
			nextId : 0,
			visibleId: '',
			editElementId: '',
			runningId: '',
			items: [
				{ 
					title: 'Markdown',
					type: 'markdown' 
				},
				{ 
					title: 'Python',
					type: 'python' 
				}
			],
			events: events,
			status:'READY',
			runningElementId: '',
			onlyOne: true
		};
	},
	components: {
		AceNotebook: _AceNotebook_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
	},
	watch: {	
		currentProject:
		{
			async handler (){
				if (this.currentProject)
				{
					let data = await this.studio.projects.loadSpecialFile(this.currentProject,'notebook.json');
					if(data !== null)
					{
						try
						{
							this.elements = JSON.parse (data);
						}
						catch(e)
						{
							this.studio.workspace.showError('NOTEBOOK_LOAD_DATA_ERROR', {error: e.message});
						}
					} 
					else
					{
						this.elements = [{ id: Object(uuid__WEBPACK_IMPORTED_MODULE_0__["v4"])(), type: 'markdown',editable: false, data: '# Steps to build a project', code: '', error: '', result: ''}];
					}
					if (this.elements.length === 0) 
						this.elements = [{ id: Object(uuid__WEBPACK_IMPORTED_MODULE_0__["v4"])(), type: 'markdown',editable: false, data: '# Steps to build a project', code: '', error: '', result: ''}];
				}
				else
				{
					this.elements = [{ id: Object(uuid__WEBPACK_IMPORTED_MODULE_0__["v4"])(), type: 'markdown',editable: false, data: '# Steps to build a project', code: '', error: '', result: ''}];
				}				
			},
		},
		elements: { 
			deep:true,
			handler: function (/* val, oldVal */){
				this.save ();
			}		
		}
	},
	mounted()
	{
		notebook = this;
	},
	methods: {
		async save () {
			if (this.currentProject)
			{
				await this.studio.projects.saveSpecialFile(this.currentProject,'notebook.json', JSON.stringify (this.elements));
			}
		},
		async resetNotebook () {
			let value = await this.studio.workspace.showCustomConfirmationPrompt(
				'NOTEBOOK_RESET_NOTEBOOK_TITLE',
				'NOTEBOOK_RESET_NOTEBOOK_QUESTION',
				{
					false: this.$t('NO'),
					true: {
						color: 'orange',
						text: this.$t('YES'),
						handle: () => {
							return new Promise(resolve => {
								setTimeout(resolve, 100);
							});
						}
					}
				}
			);
			if (value === 'yes')
			{
				this.elements = [{ id: Object(uuid__WEBPACK_IMPORTED_MODULE_0__["v4"])(), type: 'markdown',editable: false, data: '# Steps to build a project', code: '', error: '', result: ''}];
				if (this.currentProject)
				{
					this.studio.projects.saveSpecialFile(this.currentProject,'notebook.json', JSON.stringify (this.elements));
				}
			}
			
		},
		itemTypeName (type)
		{
			return this.items.find ((item) => item.type === type).title;
		},
		moveUp(id)
		{
			try
			{
				let index = this.elements.findIndex(e=>e.id === id);
				if(index >= 1)
				{
					let aux = this.elements[index];
					this.elements[index] = this.elements[index-1];
					this.elements[index-1] = aux;
					this.$forceUpdate();
					this.save ();
				}
			}
			catch(e)
			{
				this.studio.workspace.warn (e);
			}
		},
		moveDown(id)
		{
			try
			{
				let index = this.elements.findIndex(e=>e.id === id);

				if(index < this.elements.length-1)
				{
					let aux = this.elements[index];
					this.elements[index] = this.elements[index+1];
					this.elements[index+1] = aux;
					this.$forceUpdate();
					this.save ();
				}
			}
			catch(e)
			{
				this.studio.workspace.warn (e);
			}
		},
		async deleteElement(element)
		{
			let value = await this.studio.workspace.showCustomConfirmationPrompt(
				'NOTEBOOK_DELETE_ITEM_TITLE',
				'NOTEBOOK_DELETE_ITEM_QUESTION',
				{
					false: this.$t('NO'),
					true: {
						color: 'orange',
						text: this.$t('YES'),
						handle: () => {
							return new Promise(resolve => {
								setTimeout(resolve, 100);
							});
						}
					}
				}
			);
			if (value === 'yes' && this.elements.length > 1) {
				this.elements = this.elements.filter(e=>e.id !== element.id);
			} 	
		},
		addElement()
		{
			this.elements.push(
				{
					id: Object(uuid__WEBPACK_IMPORTED_MODULE_0__["v4"]) (), 
					type: 'markdown',
					editable: false,
					data: '# New Item',
					code:'',
					error: '', 
					result: ''
				});
			this.onlyOne = false;
		},
		firstElement(id)
		{
			let index = this.elements.findIndex(e=>e.id === id);
			if(index=== 0)
				return true;
			else
				return false;
		},
		openEditArea(element)
		{
			element.editable = true;	
		},
		showCurrentElement(element)
		{
			if (element)
			{
				this.visibleId = element.id;
				let otherElements = this.elements.filter(e=>e.id !== element.id);
				for(let other of otherElements)
					other.editable = false;
			}
			else
			{
				this.visibleId = '';
			}
		},
		runCode(id)
		{
			
			let index = this.elements.findIndex(e=>e.id === id);
			let currentElement = this.elements[index];
			currentElement.code='';
			currentElement.error='';
			currentElement.result = '';
			events.emit('run', currentElement.id, currentElement.data);
			// this.runningElementId = id;
		},
		compiledMarkdown: function(element) 
		{
			return marked__WEBPACK_IMPORTED_MODULE_1___default()(element.data);
		},
		printPythonCode(id, data)
		{
			let element = this.elements.find(e=>e.id === id);
			element.code = data;
			this.$forceUpdate();
		},
		printPythonError(id, data)
		{
			let element = this.elements.find(e=>e.id === id);
			element.error = data;
			this.$forceUpdate();
		},
		printPythonResult(id, data)
		{
			let element = this.elements.find(e=>e.id === id);
			element.result = data;
			this.$forceUpdate();
		},
		setStatus (id, status)
		{
			this.runningId = id;
			this.status = status;
		},
		stopCode(/* id */)
		{
			events.emit('stop', this.runningId);
		},
		stopInterpretor()
		{
			events.emit('stop');
		},
		resetCode(/* id */)
		{
			events.emit('reset');
		}
	},
	computed: {
		...Object(vuex__WEBPACK_IMPORTED_MODULE_3__["mapGetters"]) ({
			currentProject: 'projects/currentProject',
			device: 'workspace/device'
		}),
		visibleRun() {
			return this.device.status === 'CONNECTED';
		}
	}
});


/***/ }),

/***/ 1372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AceNotebook_vue_vue_type_template_id_2d798269_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1373);
/* harmony import */ var _AceNotebook_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1375);
/* empty/unused harmony star reexport *//* harmony import */ var _AceNotebook_vue_vue_type_style_index_0_id_2d798269_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1377);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AceNotebook_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AceNotebook_vue_vue_type_template_id_2d798269_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AceNotebook_vue_vue_type_template_id_2d798269_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "2d798269",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/projects/notebook/views/AceNotebook.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AceNotebook_vue_vue_type_template_id_2d798269_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1374);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AceNotebook_vue_vue_type_template_id_2d798269_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AceNotebook_vue_vue_type_template_id_2d798269_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1374:
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
      _vm.syntax === "markdown"
        ? _c(
            "div",
            [
              _c(
                "v-toolbar",
                { staticClass: "markdown-btns" },
                [
                  _c(
                    "v-btn",
                    {
                      attrs: { text: "" },
                      on: {
                        click: function($event) {
                          return _vm.importImage(_vm.element)
                        }
                      }
                    },
                    [
                      _c("v-img", {
                        attrs: {
                          src:
                            "plugins/projects/notebook/data/img/icons/image-icon.png"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { text: "" },
                      on: {
                        click: function($event) {
                          return _vm.addImageLink(_vm.element)
                        }
                      }
                    },
                    [
                      _c("v-img", {
                        attrs: {
                          src:
                            "plugins/projects/notebook/data/img/icons/imagelink-icon.png"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { text: "" },
                      on: {
                        click: function($event) {
                          return _vm.importFile(_vm.element)
                        }
                      }
                    },
                    [
                      _c("v-img", {
                        attrs: {
                          src:
                            "plugins/projects/notebook/data/img/icons/file-icon.png"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { text: "" },
                      on: {
                        click: function($event) {
                          return _vm.addLink(_vm.element)
                        }
                      }
                    },
                    [
                      _c("v-img", {
                        attrs: {
                          src:
                            "plugins/projects/notebook/data/img/icons/link-icon.png"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { text: "" },
                      on: {
                        click: function($event) {
                          return _vm.numberedList(_vm.element)
                        }
                      }
                    },
                    [
                      _c("v-img", {
                        attrs: {
                          src:
                            "plugins/projects/notebook/data/img/icons/nlist-icon.png"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { text: "" },
                      on: {
                        click: function($event) {
                          return _vm.bulletedList(_vm.element)
                        }
                      }
                    },
                    [
                      _c("v-img", {
                        attrs: {
                          src:
                            "plugins/projects/notebook/data/img/icons/list-icon.png"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { text: "" },
                      on: {
                        click: function($event) {
                          return _vm.boldText(_vm.element)
                        }
                      }
                    },
                    [
                      _c("v-img", {
                        attrs: {
                          src:
                            "plugins/projects/notebook/data/img/icons/bold-icon.png"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { text: "" },
                      on: {
                        click: function($event) {
                          return _vm.italicText(_vm.element)
                        }
                      }
                    },
                    [
                      _c("v-img", {
                        attrs: {
                          src:
                            "plugins/projects/notebook/data/img/icons/italic-icon.png"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { text: "" },
                      on: {
                        click: function($event) {
                          return _vm.heading1(_vm.element)
                        }
                      }
                    },
                    [
                      _c("v-img", {
                        attrs: {
                          src:
                            "plugins/projects/notebook/data/img/icons/h1-icon.png"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { text: "" },
                      on: {
                        click: function($event) {
                          return _vm.heading2(_vm.element)
                        }
                      }
                    },
                    [
                      _c("v-img", {
                        attrs: {
                          src:
                            "plugins/projects/notebook/data/img/icons/h2-icon.png"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { text: "" },
                      on: {
                        click: function($event) {
                          return _vm.heading3(_vm.element)
                        }
                      }
                    },
                    [
                      _c("v-img", {
                        attrs: {
                          src:
                            "plugins/projects/notebook/data/img/icons/h3-icon.png"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { text: "" },
                      on: {
                        click: function($event) {
                          return _vm.addSource(_vm.element)
                        }
                      }
                    },
                    [
                      _c("v-img", {
                        attrs: {
                          src:
                            "plugins/projects/notebook/data/img/icons/source-icon.png"
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
          )
        : _vm._e(),
      _vm._v(" "),
      _c("editor", {
        attrs: { lang: _vm.syntax, options: _vm.editorOptions },
        on: { init: _vm.initEditor },
        model: {
          value: _vm.element.data,
          callback: function($$v) {
            _vm.$set(_vm.element, "data", $$v)
          },
          expression: "element.data"
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_AceNotebook_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1376);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_AceNotebook_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue2_ace_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(584);
/* harmony import */ var vue2_ace_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue2_ace_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(294);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



// import { remote } from 'electron';
// const dialog = remote.dialog;

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'AceNotebook',
	props: ['value', 'syntax','element', 'readOnly'],
	data () {
		return {
			editor: null,
			source: '',
			editorOptions: {
				fontSize: '10pt',
				readOnly: this.tester,
				minLines: 3,
				maxLines: 20
			},
			tester: false
		};
	},
	computed: {
		
	},
	methods: {
		initEditor (editor)
		{
			this.editor = editor;
			__webpack_require__(588); 
			__webpack_require__(598);
			__webpack_require__(592);  
			__webpack_require__(611);
			__webpack_require__(614); 
		},
		boldText(/* element */)
		{
			this.editor.insert('**text**');
		},
		italicText(/* element */)
		{
			this.editor.insert('*italics*');
		},
		bulletedList(/* element */)
		{
			this.editor.insert ('\n* Item\n* Item \n* Item');
		},
		numberedList(/* element */)
		{
			this.editor.insert ('\n1. Item\n2. Item \n3. Item');
		},
		heading1(/* element */)
		{
			this.editor.insert ('\n# Title');
		},
		heading2(/* element */)
		{
			this.editor.insert ('\n## Title');
		},
		heading3(/* element */)
		{
			this.editor.insert ('\n### Title');
		},
		async importFile(/* element */)
		{
			const options = {
				title: 'Select file',
				filetypes: ['*']
			};
			let imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];
			let openPath = await this.studio.filesystem.openImportDialog(options);
			if (openPath.length > 0) {
				try
				{
					var fileName = path__WEBPACK_IMPORTED_MODULE_1___default.a.basename (openPath[0].name);
					var fileType;
					var fileExtension;
					let extension = fileName.substring(fileName.lastIndexOf('.'));
					if(imageExtensions.includes(extension))
					{
						fileType = 'image';
						fileExtension = extension.substring(1);
						this.editor.insert('!');
					}
					else
					{
						if(extension === '.html')
						{
							fileType = 'text';
							fileExtension = 'html';
						}
						else
						{
							fileType = 'application';
							if(extension === '.json' || extension === '.doc' || extension ==='.docx')
								fileExtension = 'octet-stream:';
							else if(extension === '.js')
								fileExtension = 'javascript:';
							else
								fileExtension = extension.substring(1) + ':';
						}
					}	
					try {
						var encoded = (await this.studio.filesystem.readImportFile(openPath[0])).toString ('base64');
						this.editor.insert('[' + fileName+ ']'+'(data:'+fileType+'/'+fileExtension+';base64,' + encoded + ')');
					}
					catch(e)
					{
						this.studio.workspace.showError('NOTEBOOK_SELECT_FILE_ERROR', {extra: e.message});
					}
				}
				catch(e)
				{
					this.studio.workspace.showError('NOTEBOOK_SELECT_FILE_ERROR', {extra: e.message});
				}
			}
		},
		async importImage(/* element */)
		{
			const options = {
				title: 'Select file',
				filetypes: ['*']
			};
			let openPath = await this.studio.filesystem.openImportDialog(options);
			if (openPath.length > 0)
			{
				try
				{
					var fileName = path__WEBPACK_IMPORTED_MODULE_1___default.a.basename (openPath[0].name);
					var encoded = (await this.studio.filesystem.readImportFile(openPath[0])).toString ('base64');
					this.editor.insert('![' + fileName+ ']'+'(data:image/jpeg;base64,' + encoded + ')');
				}
				catch(e)
				{
					this.studio.workspace.showError('NOTEBOOK_SELECT_IMAGE_ERROR', {extra: e.message});
				}
			}
			
		},
		addImageLink(/* element */)
		{
			this.editor.insert ('\n![image](http://)');
		},
		addLink(/* element */)
		{			
			this.editor.insert ('\n[text](http://)');
		},
		addSource(/* element */)
		{
			this.editor.insert('\n```language\nsource\n```');
		}
	},
	components: {
		editor: (vue2_ace_editor__WEBPACK_IMPORTED_MODULE_0___default())
	},
	watch:
	{
		readOnly() {
			this.tester = this.readOnly;
		},
		value (newValue, oldValue)
		{
			if (newValue !== oldValue)
			{
				let value = this.value;
				try
				{
					if (typeof this.value === 'object') value = this.value.toString ();
				}
				catch (e)
				{
					value = '';
				}
				this.source = value;
			}
		},
		source (newValue, oldValue)
		{
			if (newValue !== oldValue)
			{
				this.$emit ('input', this.source);
			}
		}
	}
	
});


/***/ }),

/***/ 1377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AceNotebook_vue_vue_type_style_index_0_id_2d798269_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1378);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AceNotebook_vue_vue_type_style_index_0_id_2d798269_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AceNotebook_vue_vue_type_style_index_0_id_2d798269_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AceNotebook_vue_vue_type_style_index_0_id_2d798269_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AceNotebook_vue_vue_type_style_index_0_id_2d798269_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AceNotebook_vue_vue_type_style_index_0_id_2d798269_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1378:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1379);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("362b9e0b", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 1379:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
var ___CSS_LOADER_AT_RULE_IMPORT_0___ = __webpack_require__(1380);
var ___CSS_LOADER_AT_RULE_IMPORT_1___ = __webpack_require__(1381);
exports = ___CSS_LOADER_API_IMPORT___(false);
exports.i(___CSS_LOADER_AT_RULE_IMPORT_0___);
exports.i(___CSS_LOADER_AT_RULE_IMPORT_1___);
// Module
exports.push([module.i, ".w-100[data-v-2d798269] {\n  width: 100%;\n}\n.w-90[data-v-2d798269] {\n  width: 90%;\n}\n.w-80[data-v-2d798269] {\n  width: 80%;\n}\n.w-70[data-v-2d798269] {\n  width: 70%;\n}\n.w-60[data-v-2d798269] {\n  width: 60%;\n}\n.w-50[data-v-2d798269] {\n  width: 50%;\n}\n.w-40[data-v-2d798269] {\n  width: 40%;\n}\n.w-30[data-v-2d798269] {\n  width: 30%;\n}\n.w-20[data-v-2d798269] {\n  width: 20%;\n}\n.w-10[data-v-2d798269] {\n  width: 10%;\n}\n.hs-0[data-v-2d798269] {\n  height: 0% !important;\n}\n.hs-35[data-v-2d798269] {\n  height: 35% !important;\n}\n.hs-65[data-v-2d798269] {\n  height: 65% !important;\n}\n.hs-100[data-v-2d798269] {\n  height: calc(100vh - 158px) !important;\n}\n.rel[data-v-2d798269] {\n  position: relative;\n}\n.text-center[data-v-2d798269] {\n  text-align: center;\n}\n.text-left[data-v-2d798269] {\n  text-align: left;\n}\n.text-right[data-v-2d798269] {\n  text-align: right;\n}\n.h-top[data-v-2d798269] {\n  height: calc(100vh - 90px);\n}\n.h-top2[data-v-2d798269] {\n  height: calc(100vh - 158px);\n}\n.left[data-v-2d798269] {\n  float: left !important;\n}\n.right[data-v-2d798269] {\n  float: right !important;\n}\n.p-20[data-v-2d798269] {\n  padding: 20px;\n}\n.notebook-box[data-v-2d798269] {\n  height: calc(100vh - 158px) !important;\n  padding: 1%;\n  overflow: auto;\n}\n.notebook-box li[data-v-2d798269] {\n  list-style: none;\n  padding: 0;\n  margin: 0 0 15px 0;\n  border: #ffffff 1px solid;\n}\n.notebook-box li[data-v-2d798269]:hover {\n  border: #eeeeee 1px solid;\n}\n.notebook-box .v-btn__content img[data-v-2d798269] {\n  height: 24px;\n  width: 24px;\n  min-height: 24px;\n  min-width: 24px;\n}\n.notebook-box .ntbk-btn[data-v-2d798269] {\n  min-width: initial;\n  padding: 0 10px;\n  margin: 0 1px !important;\n  min-width: initial !important;\n}\n.notebook-box .ntbk-btn .v-image[data-v-2d798269] {\n  height: 16px;\n  width: 16px;\n}\n.notebook-box .ntbk-btn[data-v-2d798269]:hover {\n  background: #e54225;\n}\n.notebook-box .ntbk-btn:hover .v-image[data-v-2d798269] {\n  filter: invert(100%);\n}\n.notebook-box .ntbk-btn:hover .v-image[data-v-2d798269] {\n  opacity: 1;\n}\n.notebook-box .right[data-v-2d798269] {\n  position: absolute;\n  right: 10px;\n}\n.notebook-box .v-card[data-v-2d798269] {\n  box-shadow: none !important;\n  cursor: pointer;\n}\n.notebook-box .drpdown[data-v-2d798269] {\n  max-width: 150px;\n  margin-right: 15px;\n  padding-top: 0px !important;\n}\n.v-card__actions[data-v-2d798269] {\n  border: 0;\n}\n.section-active[data-v-2d798269] {\n  padding: 0px 0px 0px 0px;\n  border-radius: 2px;\n  border-width: 5px 1px 1px 1px !important;\n  border-color: #468847;\n  border-style: solid;\n  position: relative;\n  margin-bottom: 10px;\n  width: 100%;\n  -webkit-transition: padding 1s;\n  transition: padding 0.5s;\n  cursor: default;\n}\n.section-active > div[data-v-2d798269] {\n  padding: 10px;\n}\n.markdown-box textarea[data-v-2d798269] {\n  width: 100%;\n  border-left: #eeeeee solid 1px;\n  border-right: #eeeeee solid 1px;\n  border-bottom: #eeeeee solid 2px;\n  padding: 10px;\n}\n.markdown-btns[data-v-2d798269] {\n  box-shadow: none !important;\n  background: #eeeeee !important;\n  padding: 0px !important;\n}\n.markdown-btns .v-btn[data-v-2d798269] {\n  color: #000000;\n  min-width: initial !important;\n  min-height: initial !important;\n  padding: 6 !important;\n  height: 30px !important;\n  margin: 0px 3px 0 0 !important;\n}\n.markdown-btns .v-btn .v-image[data-v-2d798269] {\n  opacity: 0.6 !important;\n}\n.markdown-btns .v-btn .v-image[data-v-2d798269] {\n  height: 16px !important;\n  width: 16px !important;\n}\n.markdown-btns .v-btn[data-v-2d798269]:hover {\n  background: #e54225;\n}\n.markdown-btns .v-btn:hover .v-image[data-v-2d798269] {\n  filter: invert(100%) !important;\n}\n.markdown-btns .v-btn:hover .v-image[data-v-2d798269] {\n  opacity: 1 !important;\n}\n.new-item[data-v-2d798269] {\n  font-size: 24px !important;\n  font-weight: bold;\n  padding: 10px !important;\n}\n.compiledmkd[data-v-2d798269] {\n  padding: 10px 15px !important;\n  line-height: 150%;\n}\n.compiledmkd[data-v-2d798269]  .alert {\n  padding: 10px;\n  margin-top: 10px;\n  border: 1px solid transparent;\n  border-radius: 2px;\n}\n.compiledmkd[data-v-2d798269]  .alert-warning {\n  color: #8a6d3b;\n  background-color: #fcf8e3;\n  border-color: #faebcc;\n}\n.compiledmkd[data-v-2d798269]  .alert-danger {\n  color: #d9534f;\n  background-color: #f2dede;\n  border-color: #ebccd1;\n}\n.compiledmkd[data-v-2d798269]  .alert-danger div {\n  border: 0;\n  padding: 0;\n  background: transparent !important;\n  color: #d9534f !important;\n}\n.compiledmkd[data-v-2d798269]  .alert-danger pre {\n  border: 0;\n  padding: 0;\n  background: transparent !important;\n  color: #d9534f !important;\n  margin: 0 !important;\n}\n.compiledmkd[data-v-2d798269]  h1 {\n  margin-block-start: 0.67em;\n  margin-block-end: 0.67em;\n}\n.compiledmkd[data-v-2d798269]  h2 {\n  margin-block-start: 0.83em;\n  margin-block-end: 0.83em;\n}\n.compiledmkd[data-v-2d798269]  h3 {\n  margin-block-start: 1em;\n  margin-block-end: 1em;\n}\n.server-status[data-v-2d798269] {\n  position: fixed;\n  display: block;\n  text-align: center;\n  bottom: 20px;\n  left: 0;\n  right: 0;\n  width: 100%;\n  padding: 10px 0;\n  color: #fff;\n  z-index: 99;\n}\n.server-status .v-btn[data-v-2d798269] {\n  height: 26px !important;\n  padding: 0 !important;\n  margin-left: 10px !important;\n}\n.server-status .v-btn .v-image[data-v-2d798269] {\n  filter: invert(100%) !important;\n}\n.server-status .v-btn[data-v-2d798269]:hover {\n  background: transparent !important;\n}\n.server-status .v-btn:hover .v-image[data-v-2d798269] {\n  filter: invert(0%) !important;\n}\n.connected[data-v-2d798269] {\n  background: #147b3e;\n}\n.disconnected[data-v-2d798269] {\n  background: #971c19;\n}\n.stopped[data-v-2d798269] {\n  background: #c67329;\n}\n.alert[data-v-2d798269] {\n  padding: 10px;\n  margin-top: 10px;\n  border: 1px solid transparent;\n  border-radius: 2px;\n}\n.alert-warning[data-v-2d798269] {\n  color: #8a6d3b;\n  background-color: #fcf8e3;\n  border-color: #faebcc;\n}\n.alert-danger[data-v-2d798269] {\n  color: #d9534f;\n  background-color: #f2dede;\n  border-color: #ebccd1;\n}\n.alert-danger div[data-v-2d798269] {\n  border: 0;\n  padding: 0;\n  background: transparent !important;\n  color: #d9534f !important;\n}\n.alert-danger pre[data-v-2d798269] {\n  border: 0;\n  padding: 0;\n  background: transparent !important;\n  color: #d9534f !important;\n  margin: 0 !important;\n}\nh1[data-v-2d798269] {\n  font-size: 2em;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 1575:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Notebook_vue_vue_type_style_index_0_id_20c37480_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1576);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Notebook_vue_vue_type_style_index_0_id_20c37480_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Notebook_vue_vue_type_style_index_0_id_20c37480_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Notebook_vue_vue_type_style_index_0_id_20c37480_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Notebook_vue_vue_type_style_index_0_id_20c37480_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Notebook_vue_vue_type_style_index_0_id_20c37480_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1576:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1577);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("65bd8e4d", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 1577:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
var ___CSS_LOADER_AT_RULE_IMPORT_0___ = __webpack_require__(1380);
var ___CSS_LOADER_AT_RULE_IMPORT_1___ = __webpack_require__(1381);
exports = ___CSS_LOADER_API_IMPORT___(false);
exports.i(___CSS_LOADER_AT_RULE_IMPORT_0___);
exports.i(___CSS_LOADER_AT_RULE_IMPORT_1___);
// Module
exports.push([module.i, ".w-100[data-v-20c37480] {\n  width: 100%;\n}\n.w-90[data-v-20c37480] {\n  width: 90%;\n}\n.w-80[data-v-20c37480] {\n  width: 80%;\n}\n.w-70[data-v-20c37480] {\n  width: 70%;\n}\n.w-60[data-v-20c37480] {\n  width: 60%;\n}\n.w-50[data-v-20c37480] {\n  width: 50%;\n}\n.w-40[data-v-20c37480] {\n  width: 40%;\n}\n.w-30[data-v-20c37480] {\n  width: 30%;\n}\n.w-20[data-v-20c37480] {\n  width: 20%;\n}\n.w-10[data-v-20c37480] {\n  width: 10%;\n}\n.hs-0[data-v-20c37480] {\n  height: 0% !important;\n}\n.hs-35[data-v-20c37480] {\n  height: 35% !important;\n}\n.hs-65[data-v-20c37480] {\n  height: 65% !important;\n}\n.hs-100[data-v-20c37480] {\n  height: calc(100vh - 158px) !important;\n}\n.rel[data-v-20c37480] {\n  position: relative;\n}\n.text-center[data-v-20c37480] {\n  text-align: center;\n}\n.text-left[data-v-20c37480] {\n  text-align: left;\n}\n.text-right[data-v-20c37480] {\n  text-align: right;\n}\n.h-top[data-v-20c37480] {\n  height: calc(100vh - 90px);\n}\n.h-top2[data-v-20c37480] {\n  height: calc(100vh - 158px);\n}\n.left[data-v-20c37480] {\n  float: left !important;\n}\n.right[data-v-20c37480] {\n  float: right !important;\n}\n.p-20[data-v-20c37480] {\n  padding: 20px;\n}\n.notebook-box[data-v-20c37480] {\n  height: calc(100vh - 158px) !important;\n  padding: 1%;\n  overflow: auto;\n}\n.notebook-box li[data-v-20c37480] {\n  list-style: none;\n  padding: 0;\n  margin: 0 0 15px 0;\n  border: #ffffff 1px solid;\n}\n.notebook-box li[data-v-20c37480]:hover {\n  border: #eeeeee 1px solid;\n}\n.notebook-box .v-btn__content img[data-v-20c37480] {\n  height: 24px;\n  width: 24px;\n  min-height: 24px;\n  min-width: 24px;\n}\n.notebook-box .ntbk-btn[data-v-20c37480] {\n  min-width: initial;\n  padding: 0 10px;\n  margin: 0 1px !important;\n  min-width: initial !important;\n}\n.notebook-box .ntbk-btn .v-image[data-v-20c37480] {\n  height: 16px;\n  width: 16px;\n}\n.notebook-box .ntbk-btn[data-v-20c37480]:hover {\n  background: #e54225;\n}\n.notebook-box .ntbk-btn:hover .v-image[data-v-20c37480] {\n  filter: invert(100%);\n}\n.notebook-box .ntbk-btn:hover .v-image[data-v-20c37480] {\n  opacity: 1;\n}\n.notebook-box .right[data-v-20c37480] {\n  position: absolute;\n  right: 10px;\n}\n.notebook-box .v-card[data-v-20c37480] {\n  box-shadow: none !important;\n  cursor: pointer;\n}\n.notebook-box .drpdown[data-v-20c37480] {\n  max-width: 150px;\n  margin-right: 15px;\n  padding-top: 0px !important;\n}\n.v-card__actions[data-v-20c37480] {\n  border: 0;\n}\n.section-active[data-v-20c37480] {\n  padding: 0px 0px 0px 0px;\n  border-radius: 2px;\n  border-width: 5px 1px 1px 1px !important;\n  border-color: #468847;\n  border-style: solid;\n  position: relative;\n  margin-bottom: 10px;\n  width: 100%;\n  -webkit-transition: padding 1s;\n  transition: padding 0.5s;\n  cursor: default;\n}\n.section-active > div[data-v-20c37480] {\n  padding: 10px;\n}\n.markdown-box textarea[data-v-20c37480] {\n  width: 100%;\n  border-left: #eeeeee solid 1px;\n  border-right: #eeeeee solid 1px;\n  border-bottom: #eeeeee solid 2px;\n  padding: 10px;\n}\n.markdown-btns[data-v-20c37480] {\n  box-shadow: none !important;\n  background: #eeeeee !important;\n  padding: 0px !important;\n}\n.markdown-btns .v-btn[data-v-20c37480] {\n  color: #000000;\n  min-width: initial !important;\n  min-height: initial !important;\n  padding: 6 !important;\n  height: 30px !important;\n  margin: 0px 3px 0 0 !important;\n}\n.markdown-btns .v-btn .v-image[data-v-20c37480] {\n  opacity: 0.6 !important;\n}\n.markdown-btns .v-btn .v-image[data-v-20c37480] {\n  height: 16px !important;\n  width: 16px !important;\n}\n.markdown-btns .v-btn[data-v-20c37480]:hover {\n  background: #e54225;\n}\n.markdown-btns .v-btn:hover .v-image[data-v-20c37480] {\n  filter: invert(100%) !important;\n}\n.markdown-btns .v-btn:hover .v-image[data-v-20c37480] {\n  opacity: 1 !important;\n}\n.new-item[data-v-20c37480] {\n  font-size: 24px !important;\n  font-weight: bold;\n  padding: 10px !important;\n}\n.compiledmkd[data-v-20c37480] {\n  padding: 10px 15px !important;\n  line-height: 150%;\n}\n.compiledmkd[data-v-20c37480]  .alert {\n  padding: 10px;\n  margin-top: 10px;\n  border: 1px solid transparent;\n  border-radius: 2px;\n}\n.compiledmkd[data-v-20c37480]  .alert-warning {\n  color: #8a6d3b;\n  background-color: #fcf8e3;\n  border-color: #faebcc;\n}\n.compiledmkd[data-v-20c37480]  .alert-danger {\n  color: #d9534f;\n  background-color: #f2dede;\n  border-color: #ebccd1;\n}\n.compiledmkd[data-v-20c37480]  .alert-danger div {\n  border: 0;\n  padding: 0;\n  background: transparent !important;\n  color: #d9534f !important;\n}\n.compiledmkd[data-v-20c37480]  .alert-danger pre {\n  border: 0;\n  padding: 0;\n  background: transparent !important;\n  color: #d9534f !important;\n  margin: 0 !important;\n}\n.compiledmkd[data-v-20c37480]  h1 {\n  margin-block-start: 0.67em;\n  margin-block-end: 0.67em;\n}\n.compiledmkd[data-v-20c37480]  h2 {\n  margin-block-start: 0.83em;\n  margin-block-end: 0.83em;\n}\n.compiledmkd[data-v-20c37480]  h3 {\n  margin-block-start: 1em;\n  margin-block-end: 1em;\n}\n.server-status[data-v-20c37480] {\n  position: fixed;\n  display: block;\n  text-align: center;\n  bottom: 20px;\n  left: 0;\n  right: 0;\n  width: 100%;\n  padding: 10px 0;\n  color: #fff;\n  z-index: 99;\n}\n.server-status .v-btn[data-v-20c37480] {\n  height: 26px !important;\n  padding: 0 !important;\n  margin-left: 10px !important;\n}\n.server-status .v-btn .v-image[data-v-20c37480] {\n  filter: invert(100%) !important;\n}\n.server-status .v-btn[data-v-20c37480]:hover {\n  background: transparent !important;\n}\n.server-status .v-btn:hover .v-image[data-v-20c37480] {\n  filter: invert(0%) !important;\n}\n.connected[data-v-20c37480] {\n  background: #147b3e;\n}\n.disconnected[data-v-20c37480] {\n  background: #971c19;\n}\n.stopped[data-v-20c37480] {\n  background: #c67329;\n}\n.alert[data-v-20c37480] {\n  padding: 10px;\n  margin-top: 10px;\n  border: 1px solid transparent;\n  border-radius: 2px;\n}\n.alert-warning[data-v-20c37480] {\n  color: #8a6d3b;\n  background-color: #fcf8e3;\n  border-color: #faebcc;\n}\n.alert-danger[data-v-20c37480] {\n  color: #d9534f;\n  background-color: #f2dede;\n  border-color: #ebccd1;\n}\n.alert-danger div[data-v-20c37480] {\n  border: 0;\n  padding: 0;\n  background: transparent !important;\n  color: #d9534f !important;\n}\n.alert-danger pre[data-v-20c37480] {\n  border: 0;\n  padding: 0;\n  background: transparent !important;\n  color: #d9534f !important;\n  margin: 0 !important;\n}\nh1[data-v-20c37480] {\n  font-size: 2em;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 1578:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Notebook_vue_vue_type_style_index_1_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1579);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Notebook_vue_vue_type_style_index_1_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Notebook_vue_vue_type_style_index_1_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Notebook_vue_vue_type_style_index_1_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Notebook_vue_vue_type_style_index_1_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Notebook_vue_vue_type_style_index_1_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1579:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1580);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("0ac083c0", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 1580:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".v-window-item img {\n  height: initial !important;\n  width: auto;\n  max-width: 100%;\n  max-height: 70vh;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ })

}]);