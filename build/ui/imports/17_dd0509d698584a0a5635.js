(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setup; });
/* harmony import */ var _views_ResistorColorCodeDialog_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(446);
let studio = null;



let resistorcolorcodes = {
	
};
function setup (options, imports, register)
{
	studio = imports;

	studio.workspace.registerMenuItem ('TOOLBAR_RESISTOR_COLOR_CODE', 20, () => studio.workspace.showDialog(_views_ResistorColorCodeDialog_vue__WEBPACK_IMPORTED_MODULE_0__["default"],{width:1500}));
	
	register (null, {
		resistorcolorcodes: resistorcolorcodes
	});
}


/***/ }),

/***/ 446:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ResistorColorCodeDialog_vue_vue_type_template_id_11bb0cc5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(447);
/* harmony import */ var _ResistorColorCodeDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(449);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _ResistorColorCodeDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _ResistorColorCodeDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ResistorColorCodeDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ResistorColorCodeDialog_vue_vue_type_template_id_11bb0cc5___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ResistorColorCodeDialog_vue_vue_type_template_id_11bb0cc5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/documentation/resistorcolorcodes/views/ResistorColorCodeDialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ResistorColorCodeDialog_vue_vue_type_template_id_11bb0cc5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(448);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ResistorColorCodeDialog_vue_vue_type_template_id_11bb0cc5___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ResistorColorCodeDialog_vue_vue_type_template_id_11bb0cc5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 448:
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
    "v-layout",
    { attrs: { row: "", "justify-center": "" } },
    [
      _c(
        "v-card",
        { attrs: { width: "640" } },
        [
          _c("v-card-title", [
            _c("span", { staticClass: "md-toolbar-tools" }, [
              _vm._v(_vm._s(_vm.$t("TOOLBAR_RESISTOR_COLOR_CODE")))
            ])
          ]),
          _vm._v(" "),
          _c(
            "v-tabs",
            { staticClass: "tabs-box", attrs: { left: "" } },
            [
              _c(
                "v-tab",
                {
                  on: {
                    click: function($event) {
                      _vm.CtN = true
                    }
                  }
                },
                [
                  _vm._v(
                    "\n        " +
                      _vm._s(
                        _vm.$t("RESISTOR_COLORCODE_FROM_COLOR_TO_NUMBER")
                      ) +
                      "\n      "
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "v-tab",
                {
                  on: {
                    click: function($event) {
                      _vm.CtN = false
                    }
                  }
                },
                [
                  _vm._v(
                    "\n        " +
                      _vm._s(
                        _vm.$t("RESISTOR_COLORCODE_FROM_NUMBER_TO_COLOR")
                      ) +
                      "\n      "
                  )
                ]
              )
            ],
            1
          ),
          _vm._v(" "),
          _vm.CtN
            ? _c("v-card-text", [
                _c(
                  "div",
                  [
                    _c(
                      "v-container",
                      [
                        _c(
                          "v-row",
                          [
                            _c(
                              "v-col",
                              [
                                _c("v-select", {
                                  attrs: {
                                    label: _vm.$t("RESISTOR_COLORCODE_STRIPES"),
                                    height: "16",
                                    items: _vm.numbers,
                                    "item-text": "label",
                                    "item-value": "value",
                                    "hide-details": ""
                                  },
                                  model: {
                                    value: _vm.number,
                                    callback: function($$v) {
                                      _vm.number = $$v
                                    },
                                    expression: "number"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-col",
                              [
                                _c("v-select", {
                                  attrs: {
                                    label: _vm.$t(
                                      "RESISTOR_COLORCODE_STRIPE_ONE"
                                    ),
                                    height: "16",
                                    items: _vm.colors,
                                    "item-text": "color",
                                    "item-value": "index",
                                    "hide-details": ""
                                  },
                                  model: {
                                    value: _vm.color1,
                                    callback: function($$v) {
                                      _vm.color1 = $$v
                                    },
                                    expression: "color1"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-col",
                              [
                                _c("v-select", {
                                  attrs: {
                                    label: _vm.$t(
                                      "RESISTOR_COLORCODE_STRIPE_TWO"
                                    ),
                                    height: "16",
                                    items: _vm.colors,
                                    "item-text": "color",
                                    "item-value": "index",
                                    "hide-details": ""
                                  },
                                  model: {
                                    value: _vm.color2,
                                    callback: function($$v) {
                                      _vm.color2 = $$v
                                    },
                                    expression: "color2"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-col",
                              {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: _vm.number == 5,
                                    expression: "number==5"
                                  }
                                ]
                              },
                              [
                                _c("v-select", {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value: _vm.number == 5,
                                      expression: "number==5"
                                    }
                                  ],
                                  attrs: {
                                    label: _vm.$t(
                                      "RESISTOR_COLORCODE_STRIPE_THREE"
                                    ),
                                    height: "16",
                                    items: _vm.colors,
                                    "item-text": "color",
                                    "item-value": "index",
                                    "hide-details": ""
                                  },
                                  model: {
                                    value: _vm.color3,
                                    callback: function($$v) {
                                      _vm.color3 = $$v
                                    },
                                    expression: "color3"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-col",
                              [
                                _c("v-select", {
                                  attrs: {
                                    label: _vm.$t(
                                      "RESISTOR_COLORCODE_STRIPE_" +
                                        _vm.stripeNumber(4 - (5 - _vm.number))
                                    ),
                                    height: "16",
                                    items: _vm.multiplier,
                                    "item-text": "color",
                                    "item-value": "value",
                                    "hide-details": ""
                                  },
                                  model: {
                                    value: _vm.color4,
                                    callback: function($$v) {
                                      _vm.color4 = $$v
                                    },
                                    expression: "color4"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-col",
                              [
                                _c("v-select", {
                                  attrs: {
                                    label: _vm.$t(
                                      "RESISTOR_COLORCODE_STRIPE_" +
                                        _vm.stripeNumber(5 - (5 - _vm.number))
                                    ),
                                    height: "16",
                                    items: _vm.tolerance,
                                    "item-text": "color",
                                    "item-value": "value",
                                    "hide-details": ""
                                  },
                                  model: {
                                    value: _vm.color5,
                                    callback: function($$v) {
                                      _vm.color5 = $$v
                                    },
                                    expression: "color5"
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
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticStyle: { padding: "50px 0" },
                    attrs: { align: "center" }
                  },
                  [
                    _c("img", {
                      attrs: {
                        src:
                          "plugins/documentation/resistorcolorcodes/data/img/resistorcolorcode.png"
                      }
                    })
                  ]
                )
              ])
            : _c("v-card-text", [
                _c(
                  "div",
                  [
                    _c(
                      "v-container",
                      [
                        _c(
                          "v-row",
                          [
                            _c(
                              "v-col",
                              [
                                _c("v-text-field", {
                                  attrs: {
                                    autofocus: "",
                                    "hide-details": "",
                                    label: _vm.$t(
                                      "RESISTOR_COLORCODE_RESISTANCE"
                                    ),
                                    height: "16",
                                    placeholder: "Enter a number"
                                  },
                                  model: {
                                    value: _vm.Secondvaluenumber,
                                    callback: function($$v) {
                                      _vm.Secondvaluenumber = $$v
                                    },
                                    expression: "Secondvaluenumber"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-col",
                              [
                                _c("v-select", {
                                  attrs: {
                                    label: _vm.$t("RESISTOR_COLORCODE_STRIPES"),
                                    height: "16",
                                    items: _vm.numbers,
                                    "item-text": "label",
                                    "item-value": "value",
                                    "hide-details": ""
                                  },
                                  model: {
                                    value: _vm.Secondvaluestripes,
                                    callback: function($$v) {
                                      _vm.Secondvaluestripes = $$v
                                    },
                                    expression: "Secondvaluestripes"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-col",
                              [
                                _c("v-select", {
                                  attrs: {
                                    label: _vm.$t("VALUE_TOLERANCE"),
                                    height: "16",
                                    items: _vm.Secondtolerance,
                                    "item-text": "value",
                                    "item-value": "color",
                                    "hide-details": ""
                                  },
                                  model: {
                                    value: _vm.Secondvaluetolerance,
                                    callback: function($$v) {
                                      _vm.Secondvaluetolerance = $$v
                                    },
                                    expression: "Secondvaluetolerance"
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
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticStyle: { "text-align": "center" } }, [
                  _c("img", {
                    attrs: {
                      src:
                        "plugins/documentation/resistorcolorcodes/data/img/left.png"
                    }
                  }),
                  _c("img", {
                    attrs: {
                      src:
                        "plugins/documentation/resistorcolorcodes/data/img/" +
                        _vm.Secondstripe1 +
                        ".png"
                    }
                  }),
                  _c("img", {
                    attrs: {
                      src:
                        "plugins/documentation/resistorcolorcodes/data/img/" +
                        _vm.Secondstripe2 +
                        ".png"
                    }
                  }),
                  _c("img", {
                    attrs: {
                      src:
                        "plugins/documentation/resistorcolorcodes/data/img/" +
                        _vm.Secondstripe3 +
                        ".png"
                    }
                  }),
                  _c("img", {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.Secondvaluestripes === "5",
                        expression: "Secondvaluestripes==='5'"
                      }
                    ],
                    attrs: {
                      src:
                        "plugins/documentation/resistorcolorcodes/data/img/" +
                        _vm.Secondstripe4 +
                        ".png"
                    }
                  }),
                  _c("img", {
                    attrs: {
                      src:
                        "plugins/documentation/resistorcolorcodes/data/img/none.png"
                    }
                  }),
                  _c("img", {
                    attrs: {
                      src:
                        "plugins/documentation/resistorcolorcodes/data/img/" +
                        _vm.Secondvaluetolerance +
                        ".png"
                    }
                  }),
                  _c("img", {
                    attrs: {
                      src:
                        "plugins/documentation/resistorcolorcodes/data/img/right.png"
                    }
                  })
                ])
              ]),
          _vm._v(" "),
          _c(
            "v-card-actions",
            [
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.CtN,
                      expression: "CtN"
                    }
                  ],
                  staticStyle: { "font-size": "16px", "margin-left": "10px" }
                },
                [
                  _c("b", [_vm._v(_vm._s(_vm.$t("VALUE_VALUE")) + ":")]),
                  _vm._v(
                    "\n        " +
                      _vm._s(_vm.r) +
                      " " +
                      _vm._s(_vm.u) +
                      "Ω\n        "
                  ),
                  _c("span", { staticStyle: { "padding-left": "10px" } }, [
                    _vm._v("±" + _vm._s(_vm.color5) + "%")
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: !_vm.CtN,
                      expression: "!CtN"
                    }
                  ],
                  staticStyle: { "font-size": "16px", "margin-left": "10px" }
                },
                [
                  _c("b", [_vm._v(_vm._s(_vm.$t("VALUE_VALUE")) + ":")]),
                  _vm._v(
                    "\n        " +
                      _vm._s(_vm.Secondr) +
                      " " +
                      _vm._s(_vm.Secondu) +
                      "Ω\n      "
                  )
                ]
              ),
              _vm._v(" "),
              _c("v-spacer"),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  ref: "reference",
                  attrs: { right: "", text: "" },
                  on: { click: _vm.close }
                },
                [_vm._v(_vm._s(_vm.$t("EXIT")))]
              )
            ],
            1
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

/***/ 449:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_ResistorColorCodeDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(450);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_ResistorColorCodeDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_loader_lib_index_js_vue_loader_options_ResistorColorCodeDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_loader_lib_index_js_vue_loader_options_ResistorColorCodeDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_loader_lib_index_js_vue_loader_options_ResistorColorCodeDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_ResistorColorCodeDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 450:
/***/ (function(module, exports, __webpack_require__) {

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const mapGetters = __webpack_require__(39).mapGetters;
module.exports = {
	name: 'ColorCodeDialog',
	data() {
		return {
			CtN: true,
			numbers: [{ value: '4', label: 'Four' }, { value: '5', label: 'Five' }],
			colors: [
				{ index: 0, color: 'Black' },
				{ index: 1, color: 'Brown' },
				{ index: 2, color: 'Red' },
				{ index: 3, color: 'Orange' },
				{ index: 4, color: 'Yellow' },
				{ index: 5, color: 'Green' },
				{ index: 6, color: 'Blue' },
				{ index: 7, color: 'Violet' },
				{ index: 8, color: 'Gray' },
				{ index: 9, color: 'White' }
			],

			multiplier: [
				{
					color: 'Black',
					value: 1
				},
				{
					color: 'Brown',
					value: 10
				},
				{
					color: 'Red',
					value: 100
				},
				{
					color: 'Orange',
					value: 1000
				},
				{
					color: 'Yellow',
					value: 10000
				},
				{
					color: 'Green',
					value: 100000
				},
				{
					color: 'Blue',
					value: 1000000
				},
				{
					color: 'Violet',
					value: 10000000
				},
				{
					color: 'Gold',
					value: 0.1
				},
				{
					color: 'Silver',
					value: 0.01
				}
			],

			tolerance: [
				{
					color: 'Black',
					value: 0
				},
				{
					color: 'Brown',
					value: 1
				},
				{
					color: 'Red',
					value: 2
				},
				{
					color: 'Green',
					value: 0.5
				},
				{
					color: 'Blue',
					value: 0.25
				},
				{
					color: 'Violet',
					value: 0.1
				},
				{
					color: 'Gray',
					value: 0.05
				},
				{
					color: 'Gold',
					value: 5
				},
				{
					color: 'Silver',
					value: 10
				}
			],
			number: '4',
			color1: 0,
			color2: 0,
			color3: 0,
			color4: 1,
			color5: 0,
			r: 0,
			u: '',
			//END FIRST
			//BEGIN SECOND
			second: {},

			Secondvalue: {},

			Secondtolerance: [
				{
					color: 0,
					value: '0%'
				},
				{
					color: 1,
					value: '1%'
				},
				{
					color: 2,
					value: '2%'
				},
				{
					color: 5,
					value: '0.5%'
				},
				{
					color: 6,
					value: '0.25%'
				},
				{
					color: 7,
					value: '0.10%'
				},
				{
					color: 8,
					value: '0.05%'
				},
				{
					color: 11,
					value: '5%'
				},
				{
					color: 22,
					value: '10%'
				}
			],

			Secondvaluenumber: 220,
			Secondvaluestripes: '4',
			Secondvaluetolerance: 11, //last stripe

			Secondstripe1: 2,
			Secondstripe2: 2,
			Secondstripe3: 0,
			Secondstripe4: 0,
			Secondr: 220,
			Secondu: ''
		};
	},
	computed: {
		...mapGetters({
			show: 'windows/colorCodeDialog'
		}),
		FirstValueWatchable() {
			return (
				this.number,
				this.color1,
				this.color2,
				this.color3,
				this.color4,
				this.color5,
				Date.now()
			);
		},
		SecondValueWatchable() {
			return (
				this.Secondr,
				this.Secondu,
				this.Secondvaluestripes,
				this.Secondvaluetolerance,
				this.Secondvaluenumber,
				Date.now()
			);
		},
	},
	watch: {
		FirstValueWatchable() {
			var value = parseInt(this.color1) * 10 + parseInt(this.color2);
			if (this.number === '5') {
				value = value * 10 + parseInt(this.color3);
			}
			value = value * parseFloat(this.color4);
			if (value > 1000000) {
				value = value / 1000000;
				this.u = 'M';
			} else if (value > 1000) {
				value = value / 1000;
				this.u = 'K';
			} else {
				this.u = '';
			}
			this.r = value;
		},
		SecondValueWatchable() {
			var value = parseFloat(this.Secondvaluenumber);
			if (
				isNaN(value) ||
        value > 99999999999 ||
        (value < 0.1 && this.Secondvaluestripes === '4') ||
        (value < 1 && this.Secondvaluestripes !== '4')
			) {
				this.Secondr = 0; //bad value
				this.Secondu = '';
				this.Secondstripe1 = 0;
				this.Secondstripe2 = 0;
				this.Secondstripe3 = 0;
				this.Secondstripe4 = 0;
			} else {
				value *= 10000; //workaround for float
				var digit1 = 0;
				var digit2 = 0;
				var digit3 = 0;
				var multiplier = 0;
				if (this.Secondvaluestripes === '4') {
					while (Math.trunc(value / 100) !== 0) {
						multiplier += 1;
						value = Math.trunc(value / 10);
					}

					digit2 = value % 10;
					digit1 = Math.trunc(value / 10);

					multiplier -= 4; //workaround

					this.Secondr = (digit1 * 10 + digit2) * Math.pow(10, multiplier);
					this.Secondstripe3 = multiplier;
				} else {
					while (Math.trunc(value / 1000) !== 0) {
						multiplier += 1;
						value = Math.trunc(value / 10);
					}

					digit3 = value % 10;
					value = Math.trunc(value / 10);
					digit2 = value % 10;
					digit1 = Math.trunc(value / 10);

					multiplier -= 4; //workaround

					this.Secondr =
            ((digit1 * 10 + digit2) * 10 + digit3) * Math.pow(10, multiplier);
					this.Secondstripe3 = digit3;
					this.Secondstripe4 = multiplier;
				}

				this.Secondstripe1 = digit1;
				this.Secondstripe2 = digit2;

				//gold and silver stripes name match
				if (this.Secondstripe3 == -1) {
					this.Secondstripe3 = 11;
				}
				if (this.Secondstripe3 == -2) {
					this.Secondstripe3 = 22;
				}
				if (this.Secondstripe4 == -1) {
					this.Secondstripe4 = 11;
				}
				if (this.Secondstripe4 == -2) {
					this.Secondstripe4 = 22;
				}

				if (this.Secondr > 1000000) {
					this.Secondr = this.Secondr / 1000000;
					this.Secondu = 'M';
				} else if (this.Secondu > 1000) {
					this.Secondu = 'K';
				} else {
					this.Secondu = '';
				}
			}
		}
	},
	mounted() {
		this.$refs.reference.$el.focus();
	},
	updated() {
		if (this.CtN) {
			this.$refs.reference.$el.focus();
		}
	},
	methods: {
		esc() {
			this.close();
		},
		close() {
			this.$root.$emit('submit');
		},
		stripeNumber(number) {
			if (number == 3) {
				return 'THREE'; 
			} else if (number == 4) {
				return 'FOUR';
			} else {
				return 'FIVE';
			}
		}
	}
};


/***/ })

}]);