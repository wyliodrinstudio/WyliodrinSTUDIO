(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setup; });
/* harmony import */ var _views_LineGraph_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(255);
/* harmony import */ var _views_LineDialog_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(260);



let dashboard_graph_line = {};
function setup (options, imports, register)
{
	const studio = imports;
	studio.dashboard.registerGraph('LINE_GRAPH', 10, 'plugins/dashboard/graph.line/data/img/icons/line.png', _views_LineGraph_vue__WEBPACK_IMPORTED_MODULE_0__["default"], {
		width: 6,
		height: 6,
		setup: (data) => {
			return studio.workspace.showDialog(_views_LineDialog_vue__WEBPACK_IMPORTED_MODULE_1__["default"],{
				width:600,
				data:data
			});
		},
	});
	
	register (null, {
		dashboard_graph_line: dashboard_graph_line
	});
}


/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LineGraph_vue_vue_type_template_id_27abea7e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(256);
/* harmony import */ var _LineGraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(258);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _LineGraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LineGraph_vue_vue_type_template_id_27abea7e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LineGraph_vue_vue_type_template_id_27abea7e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/dashboard/graph.line/views/LineGraph.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LineGraph_vue_vue_type_template_id_27abea7e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(257);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LineGraph_vue_vue_type_template_id_27abea7e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LineGraph_vue_vue_type_template_id_27abea7e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("ChartJSLine", {
    ref: "chart",
    staticClass: "line",
    attrs: { "chart-data": _vm.series, options: _vm.options }
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_LineGraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(259);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_LineGraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 259:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_chartjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(62);
//
//
//
//
//
//
//
//


const { reactiveProp } = vue_chartjs__WEBPACK_IMPORTED_MODULE_0__["mixins"];

const ChartJSLine = {
	name: 'ChartJSLine',
	extends: vue_chartjs__WEBPACK_IMPORTED_MODULE_0__["Line"],
	mixins: [reactiveProp],
	props: ['options'],
	mounted() {
		// this.series is created in the mixin.
		// If you want to pass options please create a local options object
		this.renderChart(this.chartData, this.options);
	},
	methods: {
		update (options) {
			if (options) this.$data._chart.options = options;
			this.$data._chart.update();
		},
	},
};

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'LineGraph',
	components: {
		ChartJSLine,
	},
	props: ['data', 'width', 'height'],
	data() {
		return {
			unregister: () => {},
			series: {
				datasets: [
					{
						label: this.data.title || this.data.id,
						borderColor: this.data.color,
						backgroundColor: this.data.color+'5f',
						data: [],
					},
				],
			}
		};
	},
	computed: {
		options () {
			let min = parseFloat (this.data.minValue);
			let max = parseFloat (this.data.maxValue);
			return {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					xAxes: [
						{
							type: 'time',
							distribution: 'series',
							gridLines: {
								drawBorder: false,
							},
							scaleLabel: {
								display: true,
								labelString: this.data.xAxisTitle || '',
							}
						},
					],
					yAxes: [
						{
							gridLines: {
								drawBorder: false,
							},
							scaleLabel: {
								display: true,
								labelString: this.data.yAxisTitle || '',
							},
							ticks: {
								min: !isNaN (min)?min:undefined,
								max: !isNaN (max)?max:undefined
							}
						},
					],
				},
			};
		},
		maxPoints () {
			let points = parseFloat (this.data.maxPoints);
			if (!isNaN (points)) {
				return Math.floor (points);
			}
			else
			{
				return false;
			}
		}
	},
	watch: {
		data: {
			deep: true,
			immediate: true,
			handler() {
				if (this.unregister) {
					this.unregister();
				}
				this.unregister = this.studio.dashboard.registerForSignal(
					this.data.id,
					(data) => {
						const chart = this.$refs.chart;
						let seriesData = this.series.datasets[0].data;
						seriesData.push({
							t: data.t,
							y: parseFloat (data.v),
						});
						
						if (this.maxPoints) {
							seriesData.splice (0, seriesData.length - this.maxPoints);
						}

						chart.update();
					}
				);
				this.update ();
			},
		},
	},
	methods: {
		update () {
			const chart = this.$refs.chart;
			if (chart)
			{
				let dataset = this.series.datasets[0];
				dataset.label = this.data.title || this.data.id;
				dataset.borderColor = this.data.color;
				dataset.backgroundColor = this.data.color + '5f';

				chart.update(this.options);
			}
		}
	},
	destroyed() {
		if (this.unregister) {
			this.unregister();
		}
	},
});


/***/ }),

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LineDialog_vue_vue_type_template_id_142e9d70___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(261);
/* harmony import */ var _LineDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(263);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _LineDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LineDialog_vue_vue_type_template_id_142e9d70___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LineDialog_vue_vue_type_template_id_142e9d70___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/dashboard/graph.line/views/LineDialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 261:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LineDialog_vue_vue_type_template_id_142e9d70___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(262);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LineDialog_vue_vue_type_template_id_142e9d70___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LineDialog_vue_vue_type_template_id_142e9d70___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 262:
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
    { staticClass: "graphDialog" },
    [
      _c("v-card-title", [_vm._v(_vm._s(_vm.$t("DASHBOARD_ADDLINE")))]),
      _vm._v(" "),
      _c("v-card-text", [
        _c(
          "div",
          {
            staticClass: "signal-details row",
            attrs: { "layout-padding": "" }
          },
          [
            _c(
              "v-text-field",
              {
                staticClass: "col-md-6",
                attrs: {
                  autofocus: "",
                  color: "orange",
                  label: _vm.$t("DASHBOARD_SIGNAL_NAME"),
                  required: ""
                },
                model: {
                  value: _vm.newdata.id,
                  callback: function($$v) {
                    _vm.$set(_vm.newdata, "id", $$v)
                  },
                  expression: "newdata.id"
                }
              },
              [_vm._v(_vm._s(_vm.$t("DASHBOARD_SIGNAL_NAME")))]
            ),
            _vm._v(" "),
            _c(
              "v-text-field",
              {
                staticClass: "col-md-6",
                attrs: {
                  color: "orange",
                  label: _vm.$t("DASHBOARD_SIGNAL_DESCRIPTION"),
                  required: ""
                },
                model: {
                  value: _vm.newdata.description,
                  callback: function($$v) {
                    _vm.$set(_vm.newdata, "description", $$v)
                  },
                  expression: "newdata.description"
                }
              },
              [_vm._v(_vm._s(_vm.$t("DASHBOARD_SIGNAL_DESCRIPTION")))]
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "sig-properties row" },
          [
            _c("v-text-field", {
              staticClass: "col-md-5",
              attrs: { label: _vm.$t("NAME") },
              model: {
                value: _vm.newdata.title,
                callback: function($$v) {
                  _vm.$set(_vm.newdata, "title", $$v)
                },
                expression: "newdata.title"
              }
            }),
            _vm._v(" "),
            _c("div", { staticClass: "form__field col-md-3" }, [
              _c("div", { staticClass: "form__label" }, [
                _vm._v(_vm._s(_vm.$t("DASHBOARD_SIGNAL_COLOR")) + ":")
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "form__input" },
                [
                  _c("swatches", {
                    attrs: { colors: "text-advanced", "popover-to": "right" },
                    model: {
                      value: _vm.newdata.color,
                      callback: function($$v) {
                        _vm.$set(_vm.newdata, "color", $$v)
                      },
                      expression: "newdata.color"
                    }
                  })
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "col-md-4" },
              [
                _c("v-select", {
                  staticClass: "drpdown",
                  attrs: {
                    label: _vm.$t("LINE_STYLE"),
                    items: _vm.newdata.items,
                    "item-text": "title",
                    "item-value": "title",
                    "hide-details": ""
                  },
                  model: {
                    value: _vm.newdata.chartType,
                    callback: function($$v) {
                      _vm.$set(_vm.newdata, "chartType", $$v)
                    },
                    expression: "newdata.chartType"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c("v-text-field", {
              staticClass: "col-md-3",
              attrs: {
                label: _vm.$t("DASHBOARD_MIN_AXES_VALUE"),
                type: "number",
                step: "0.1"
              },
              model: {
                value: _vm.newdata.minValue,
                callback: function($$v) {
                  _vm.$set(_vm.newdata, "minValue", $$v)
                },
                expression: "newdata.minValue"
              }
            }),
            _vm._v(" "),
            _c("v-text-field", {
              staticClass: "col-md-3",
              attrs: {
                label: _vm.$t("DASHBOARD_MAX_AXES_VALUE"),
                type: "number",
                step: "0.1"
              },
              model: {
                value: _vm.newdata.maxValue,
                callback: function($$v) {
                  _vm.$set(_vm.newdata, "maxValue", $$v)
                },
                expression: "newdata.maxValue"
              }
            }),
            _vm._v(" "),
            _c("v-text-field", {
              staticClass: "col-md-3",
              attrs: {
                label: _vm.$t("LINE_MAX_POINTS"),
                type: "number",
                step: "1"
              },
              model: {
                value: _vm.newdata.maxPoints,
                callback: function($$v) {
                  _vm.$set(_vm.newdata, "maxPoints", $$v)
                },
                expression: "newdata.maxPoints"
              }
            }),
            _vm._v(" "),
            _c("v-text-field", {
              staticClass: "col-md-6",
              attrs: { label: _vm.$t("LINE_X_AXIS_TITLE") },
              model: {
                value: _vm.newdata.xAxisTitle,
                callback: function($$v) {
                  _vm.$set(_vm.newdata, "xAxisTitle", $$v)
                },
                expression: "newdata.xAxisTitle"
              }
            }),
            _vm._v(" "),
            _c("v-text-field", {
              staticClass: "col-md-6",
              attrs: { label: _vm.$t("LINE_Y_AXIS_TITLE") },
              model: {
                value: _vm.newdata.yAxisTitle,
                callback: function($$v) {
                  _vm.$set(_vm.newdata, "yAxisTitle", $$v)
                },
                expression: "newdata.yAxisTitle"
              }
            })
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
            _vm._v(_vm._s(_vm.$t("CLOSE")))
          ]),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              staticClass: "newapp",
              attrs: { text: "" },
              on: { click: _vm.createChart }
            },
            [_vm._v(_vm._s(_vm.$t("DASHBOARD_ADD_SIGNAL")))]
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

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_LineDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(264);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_LineDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_swatches__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(207);
/* harmony import */ var vue_swatches__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_swatches__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	name:'LineDialog',
	components: {
		Swatches: (vue_swatches__WEBPACK_IMPORTED_MODULE_1___default())
	},
	props:['signal', 'signals', 'data'],
	data() {
		return {
			newdata: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assign ({
				id:'',
				description:'',
				color:'#b9f5f1',
				title: '',
				items: [
					{ title: 'STEP' },
					{ title: 'STRAIGHT' },
					{ title: 'SPLINE' }
				],
				chartType: 'SPLINE',
				legendCheckbox: false,
				axesCheckbox: false,
				logCheckbox: false,
				timeCheckbox:false,
				minValue: 0,
				maxValue: 1000,
				pointsCheckbox: false,
				maxPoints: '',
				xAxisTitle: '',
				yAxisTitle: '',
				overviewCheckbox: false,
				scrollbarCheckbox: false,
			}, this.data)
		};
	},
	methods: {
		methodToRunOnSelect(payload) {
			this.object = payload;
		},
		esc() {
			this.close();
		}, 
		enter() {
			this.createChart();
		}, 
		change(item)
		{
			this.newdata.chartType = item.title;
		},
		close ()
		{
			this.$root.$emit('submit');
		},
		createChart()
		{
			let title = this.newdata.id.replace(/ /g,'');
			if(title.length > 0)
				this.$root.$emit ('submit', this.newdata);
			else
				this.studio.workspace.showNotification('DASHBOARD_NO_TITLE');
		},
		showColorPicker()
		{
			this.newdata.activeColorPicker = true;
		}
	}
});


/***/ })

}]);