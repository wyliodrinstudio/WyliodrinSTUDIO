(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GaugeDialog_vue_vue_type_template_id_358eca9a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(203);
/* harmony import */ var _GaugeDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(205);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _GaugeDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GaugeDialog_vue_vue_type_template_id_358eca9a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _GaugeDialog_vue_vue_type_template_id_358eca9a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/dashboard/graph.gauge/views/GaugeDialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GaugeDialog_vue_vue_type_template_id_358eca9a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(204);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GaugeDialog_vue_vue_type_template_id_358eca9a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GaugeDialog_vue_vue_type_template_id_358eca9a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 204:
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
      _c("v-card-title", [_vm._v(_vm._s(_vm.$t("DASHBOARD_ADDGAUGE")))]),
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
            _c("v-text-field", {
              staticClass: "col-md-6",
              attrs: { label: _vm.$t("NAME") },
              model: {
                value: _vm.newdata.title,
                callback: function($$v) {
                  _vm.$set(_vm.newdata, "title", $$v)
                },
                expression: "newdata.title"
              }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "sig-properties row" },
          [
            _c(
              "v-text-field",
              {
                staticClass: "col-md-12",
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
            ),
            _vm._v(" "),
            _c("v-text-field", {
              staticClass: "col-md-4",
              attrs: {
                label: _vm.$t("DASHBOARD_LOW_VALUE"),
                type: "number",
                step: "0.1"
              },
              model: {
                value: _vm.newdata.lowValue,
                callback: function($$v) {
                  _vm.$set(_vm.newdata, "lowValue", $$v)
                },
                expression: "newdata.lowValue"
              }
            }),
            _vm._v(" "),
            _c("v-text-field", {
              staticClass: "col-md-4",
              attrs: {
                label: _vm.$t("DASHBOARD_MID_VALUE"),
                type: "number",
                step: "0.1"
              },
              model: {
                value: _vm.newdata.midValue,
                callback: function($$v) {
                  _vm.$set(_vm.newdata, "midValue", $$v)
                },
                expression: "newdata.midValue"
              }
            }),
            _vm._v(" "),
            _c("v-text-field", {
              staticClass: "col-md-4",
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
            _c("div", { staticClass: "form__field col-md-4" }, [
              _c("div", { staticClass: "form__label" }, [
                _vm._v(_vm._s(_vm.$t("DASHBOARD_LOW_COLOR")) + ":")
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "form__input" },
                [
                  _c("swatches", {
                    attrs: { colors: "text-advanced", "popover-to": "left" },
                    model: {
                      value: _vm.newdata.lowColor,
                      callback: function($$v) {
                        _vm.$set(_vm.newdata, "lowColor", $$v)
                      },
                      expression: "newdata.lowColor"
                    }
                  })
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form__field col-md-4" }, [
              _c("div", { staticClass: "form__label" }, [
                _vm._v(_vm._s(_vm.$t("DASHBOARD_MID_COLOR")) + ":")
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "form__input" },
                [
                  _c("swatches", {
                    attrs: { colors: "text-advanced", "popover-to": "left" },
                    model: {
                      value: _vm.newdata.midColor,
                      callback: function($$v) {
                        _vm.$set(_vm.newdata, "midColor", $$v)
                      },
                      expression: "newdata.midColor"
                    }
                  })
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form__field col-md-4" }, [
              _c("div", { staticClass: "form__label" }, [
                _vm._v(_vm._s(_vm.$t("DASHBOARD_MID_COLOR")) + ":")
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "form__input" },
                [
                  _c("swatches", {
                    attrs: { colors: "text-advanced", "popover-to": "left" },
                    model: {
                      value: _vm.newdata.highColor,
                      callback: function($$v) {
                        _vm.$set(_vm.newdata, "highColor", $$v)
                      },
                      expression: "newdata.highColor"
                    }
                  })
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("v-text-field", {
              staticClass: "col-md-6",
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

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_GaugeDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(206);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_GaugeDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 206:
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



/* harmony default export */ __webpack_exports__["default"] = ({
	name:'GaugeDialog',
	components: {
		Swatches: (vue_swatches__WEBPACK_IMPORTED_MODULE_1___default())
	},
	props:['signal', 'signals', 'data'],
	data() {
		return {
			newdata: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assign ({
				id:'',
				description:'',
				lowValue: 500,
				midValue: 900,
				minValue: 0,
				maxValue: 1000,
				axisName: '',
				title: '',
				lowColor: '#48f542',
				midColor: '#fafa1b',
				highColor: '#d11504'
			}, this.data)

		};
	},
	methods: {
		esc() {
			this.close();
		}, 
		enter() {
			this.createChart();
		}, 
		close ()
		{
			this.$root.$emit('submit');
		},
		change(item)
		{
			this.newdata.menuElement = item.title;
		},
		createChart()
		{
			let title = this.newdata.id.replace(/ /g,'');
			if(title.length > 0)
				this.$root.$emit ('submit', this.newdata);
			else
				this.studio.workspace.showNotification('DASHBOARD_NO_TITLE');
		}
	}
});


/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setup; });
/* harmony import */ var _views_GaugeGraph_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(57);
/* harmony import */ var _views_GaugeDialog_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(202);



let dashboard_graph_gauge = {};
function setup (options, imports, register)
{
	const studio = imports;

	studio.dashboard.registerGraph('GAUGE_GRAPH', 20, 'plugins/dashboard/graph.gauge/data/img/icons/gauge.png', _views_GaugeGraph_vue__WEBPACK_IMPORTED_MODULE_0__["default"], {
		width: 2,
		height: 6,
		setup: (data) => {
			return studio.workspace.showDialog(_views_GaugeDialog_vue__WEBPACK_IMPORTED_MODULE_1__["default"],{
				width:600,
				data:data
			});
		}
	});
	register (null, {
		dashboard_graph_gauge: dashboard_graph_gauge
	});
}


/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GaugeGraph_vue_vue_type_template_id_d5d74228___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);
/* harmony import */ var _GaugeGraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(60);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _GaugeGraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GaugeGraph_vue_vue_type_template_id_d5d74228___WEBPACK_IMPORTED_MODULE_0__["render"],
  _GaugeGraph_vue_vue_type_template_id_d5d74228___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/dashboard/graph.gauge/views/GaugeGraph.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GaugeGraph_vue_vue_type_template_id_d5d74228___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GaugeGraph_vue_vue_type_template_id_d5d74228___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GaugeGraph_vue_vue_type_template_id_d5d74228___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 59:
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
      _c("ChartJSGauge", {
        ref: "chart",
        staticClass: "line",
        attrs: {
          "chart-data": _vm.series,
          options: _vm.options,
          styles: _vm.styles
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_GaugeGraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_GaugeGraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_chartjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(62);
/* harmony import */ var chartjs_gauge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(201);
/* harmony import */ var chartjs_gauge__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(chartjs_gauge__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//
//
//
//
//
//
//
//



const { reactiveProp } = vue_chartjs__WEBPACK_IMPORTED_MODULE_0__["mixins"];

const ChartJSGauge = {
	name: 'ChartJSGauge',
	extends: Object(vue_chartjs__WEBPACK_IMPORTED_MODULE_0__["generateChart"])('gauge-chart', 'gauge'),
	mixins: [reactiveProp],
	props: ['options'],
	mounted() {
		// this.series is created in the mixin.
		// If you want to pass options please create a local options object
		this.renderChart(this.chartData, this.options);
	},
	methods: {
		update () {
			this.$data._chart.update();
		},
	},
};

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'GaugeGraph',
	components: {
		ChartJSGauge,
	},
	props: ['data', 'width', 'height'],
	data() {
		return {
			unregister: () => {},
			series: {
				datasets: [
					{
						label: this.data.id,
						backgroundColor: [this.data.lowColor, this.data.midColor, this.data.highColor],
						data: [this.data.lowValue, this.data.midValue, this.data.maxValue],
						value: 0,
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				needle: {
					radiusPercentage: 2,
					widthPercentage: 3.2,
					lengthPercentage: 80,
					color: 'rgba(0, 0, 0, 1)'
				},
			},
		};
	},
	computed: {
		styles() {
			return {
				width: `${this.width}px`,
				height: `${this.height}px`,
				position: 'relative',
			};
		},
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
						let seriesData = this.series.datasets[0];
						seriesData.value = data.v;

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
				dataset.label =this.data.id;
				dataset.backgroundColor = [this.data.lowColor, this.data.midColor, this.data.highColor];
				dataset.data = [this.data.lowValue, this.data.midValue, this.data.maxValue];
				chart.update();
			}
		}
	},
	destroyed() {
		if (this.unregister) {
			this.unregister();
		}
	},
});


/***/ })

}]);