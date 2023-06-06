(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var _views_Dashboard_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55);





let studio = null;
let graphs =[];
let signalEmitter = new events__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"] ();

let dashboard = {
	store: null,
	registerGraph(name, priority, iconURL, component, options = {})
	{
		if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isObject (options)) options = {};
		studio.workspace.registerComponent (component);
		let sameGraph = graphs.find((graph) => graph.name === name);
		if(!sameGraph)
		{
			let item = {
				name,
				priority,
				iconURL,
				component: component.name,
				setup: options.setup,
				width: options.width || 1,
				height: options.height || 1
			};
			graphs.push(item);
			graphs = graphs.sort((graph1, graph2)=>graph1.priority - graph2.priority);
			studio.workspace.dispatchToStore('dashboard','graphs', graphs);
		}
		else
		{
			this.warn ('Graph '+name+' already exists in the dashboard');
		}
	},
	registerStore (namespace, store)
	{
		if (studio.workspace.store)
		{
			studio.workspace.store.registerModule (namespace, store);
		}
		else
		{
			this.error ('Unable to register store module '+namespace+', store has not been already started');
		}
	},
	registerForSignal (signalName, fn)
	{
		signalEmitter.on (signalName, fn);
		return () => {
			signalEmitter.removeListener (signalName, fn);
		};	
	},
	emitSignal(signalName,v,t)
	{
		signalEmitter.emit(signalName, {
			v:v, 
			t: t?new Date(t):new Date()
		});
	}
};

function setup (options, imports, register)
{
	studio = imports;
	
	studio.workspace.registerStore ('dashboard', _store__WEBPACK_IMPORTED_MODULE_3__["default"]);

	let signalsBuffer = '';
	let signalRegex = /^@([A-Za-z0-9_]+):\s*([^/]+)(?:\/([0-9]+))?\r?\n$/;

	let possible = false;

	let newLine = true;

	const filterSignal = (data) => {
		let signals = [];
		let output = '';

		for (let s of data) 
		{
			if (s === '\n') {
				newLine = true;
				signalsBuffer = signalsBuffer + s;
				let signal = signalsBuffer.match (signalRegex);
				if (signal) 
				{
					let timestamp = new Date ();
					if (signal[3]) {
						let t = parseFloat (signal[3]);
						if (!isNaN (t))
						{
							timestamp = new Date (t);
						}
						else
						{
							timestamp = new Date (signal[3]);
						}
					}
					signals.push ({
						name: signal[1],
						value: signal[2],
						timestamp: timestamp
					});
				}
				else
				{
					output = output + signalsBuffer;
				}
				signalsBuffer = '';
			}
			else
			{
				if (newLine)
				{
					if (s === '@')
					{
						possible = true;
						signalsBuffer = signalsBuffer + s;
					}
					else 
					{
						possible = false;
						output = output + s;
					}
				}
				else
				if (possible)
				{
					signalsBuffer = signalsBuffer + s;
				}
				else
				{
					output = output + s;
				}
				newLine = false;
			}
		}
		
		return {
			signals,
			output
		};
	};

	studio.console.registerFilter ((id, data) => {
		let {signals, output} = filterSignal (data);
			
		for (let signal of signals) {
			dashboard.emitSignal (signal.name, signal.value, signal.timestamp);
		}

		return output;
	});

	studio.workspace.registerTab('PROJECT_DASHBOARD', 200, _views_Dashboard_vue__WEBPACK_IMPORTED_MODULE_0__["default"], {
		enabled ()
		{
			return !!studio.projects.getCurrentProject();
		}
	});
	register (null,
		{
			dashboard: dashboard
		}
	);
}

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Dashboard_vue_vue_type_template_id_605db508_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var _Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* empty/unused harmony star reexport *//* harmony import */ var _Dashboard_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(44);
/* harmony import */ var _Dashboard_vue_vue_type_style_index_1_id_605db508_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(51);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(54);







/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Dashboard_vue_vue_type_template_id_605db508_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Dashboard_vue_vue_type_template_id_605db508_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "605db508",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/dashboard/dashboard/views/Dashboard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_605db508_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_605db508_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_605db508_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 21:
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
    { staticClass: "dashboard-content" },
    [
      _c(
        "v-navigation-drawer",
        {
          attrs: {
            absolute: "",
            permanent: "",
            "expand-on-hover": "",
            right: "",
            width: "200"
          }
        },
        [
          _c(
            "v-list",
            { attrs: { dense: "" } },
            _vm._l(_vm.graphs, function(graph) {
              return _c(
                "v-list-item",
                {
                  key: graph.name,
                  attrs: { link: "" },
                  on: {
                    click: function($event) {
                      $event.stopPropagation()
                      _vm.addSignal(graph)
                    }
                  }
                },
                [
                  _c(
                    "v-list-item-avatar",
                    [_c("v-img", { attrs: { src: graph.iconURL } })],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-list-item-title", [_vm._v(_vm._s(_vm.$t(graph.name)))])
                ],
                1
              )
            }),
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "GridLayout",
        {
          ref: "grid",
          attrs: {
            layout: _vm.layout,
            "col-num": 12,
            "row-height": 30,
            "is-draggable": true,
            "is-resizable": true,
            "is-mirrored": false,
            "vertical-compact": true,
            margin: [10, 10],
            "use-css-transforms": true
          }
        },
        _vm._l(_vm.layout, function(signal) {
          return _c(
            "GridItem",
            {
              key: signal.i,
              attrs: {
                x: signal.x,
                y: signal.y,
                w: signal.w,
                h: signal.h,
                i: signal.i,
                "drag-allow-from": ".graph-header",
                "drag-ignore-from": ".graph-box"
              },
              on: {
                resize: _vm.resizeEvent,
                resized: _vm.resizeEvent,
                "container-resized": _vm.resizeEvent
              }
            },
            [
              _c(
                "div",
                { staticClass: "graph-header" },
                [
                  _c("h3", { staticClass: "graph-title" }, [
                    _vm._v(
                      _vm._s(
                        _vm.signals[signal.i].data.title ||
                          _vm.signals[signal.i].data.id ||
                          _vm.$t("DASHBOARD_UNKNOWN_TITLE")
                      )
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      staticClass: "dash-btn",
                      attrs: { icon: "" },
                      on: {
                        click: function($event) {
                          return _vm.erase(signal.i)
                        }
                      }
                    },
                    [
                      _c("v-img", {
                        staticClass: "s14",
                        attrs: {
                          src:
                            "plugins/dashboard/dashboard/data/img/icons/erase-icon.svg",
                          "aria-label": "DASHBOARD_VIEWER_ERASE_GRAPH"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-tooltip", { attrs: { bottom: "" } }, [
                        _vm._v(
                          "\n\t\t\t\t\t\t\t\t" +
                            _vm._s(_vm.$t("DASHBOARD_VIEWER_ERASE_GRAPH")) +
                            "\n\t\t\t\t\t\t\t\t"
                        )
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      staticClass: "dash-btn",
                      attrs: { "v-if": _vm.signals[signal.i].setup, icon: "" },
                      on: {
                        click: function($event) {
                          return _vm.setup(signal.i)
                        }
                      }
                    },
                    [
                      _c("v-img", {
                        staticClass: "s18",
                        attrs: {
                          src:
                            "plugins/dashboard/dashboard/data/img/icons/settings-icon.svg",
                          "aria-label": "DASHBOARD_VIEWER_GRAPH_SETTINGS"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-tooltip", { attrs: { bottom: "" } }, [
                        _vm._v(
                          _vm._s(_vm.$t("DASHBOARD_VIEWER_GRAPH_SETTINGS"))
                        )
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(_vm.signals[signal.i].component, {
                tag: "component",
                staticClass: "graph-box",
                attrs: {
                  data: _vm.signals[signal.i].data,
                  width: signal.width,
                  height: signal.height
                }
              })
            ],
            1
          )
        }),
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vue_grid_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40);
/* harmony import */ var vue_grid_layout__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue_grid_layout__WEBPACK_IMPORTED_MODULE_3__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	name: 'Dashboard',
	props: ['active'],
	data()
	{
		return {
			canvas: false,
			signals: {},
			layout: [],
			newValue: 0,
		};
	},
	components: {
		GridLayout: vue_grid_layout__WEBPACK_IMPORTED_MODULE_3___default.a.GridLayout,
		GridItem: vue_grid_layout__WEBPACK_IMPORTED_MODULE_3___default.a.GridItem
	},
	computed: {
		
		graphs: {
			get ()
			{
				return this.$store.getters['dashboard/graphs'];
			},
			set (value)
			{
				this.$store.dispatch('dashboard/graphs', value);
			} 
		},
		...Object(vuex__WEBPACK_IMPORTED_MODULE_1__["mapGetters"]) ({
			currentProject: 'projects/currentProject',
			graphs: 'dashboard/graphs'
		}),
		forceUpdate ()
		{
			return true;
		}
	},
	methods: {
		resizeEvent: function(i, newH, newW, newHPx, newWPx){
			let item = this.layout.find ((item) => item.i === i);
			if (item) {
				item.width = newWPx-24;
				item.height = newHPx-24;
				this.$forceUpdate ();
			}
		},
		async erase(id)
		{
			let allow = await this.studio.workspace.showConfirmationPrompt ('DASHBOARD_DELETE_TITLE', 'DASHBOARD_DELETE_QUESTION');

			if(allow === 'yes')
				this.layout = this.layout.filter ((item) => item.i !== id);
			delete this.signals[id];
		},
		async addSignal (graph)
		{
			let id = Object(uuid__WEBPACK_IMPORTED_MODULE_0__["v4"])();
			let item = {
				x: (this.layout.length * 2) % 12,
				y: this.layout.length + 12, // puts it at the bottom
				w: graph.width,
				h: graph.height,
				i: id,
			};
			let signal = {
				id,
				component: graph.component,
				data: {},
			};
			const setup = this.getSetupFunction (signal);
			if (lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isFunction (setup))
			{
				signal.data = await setup (signal.data);
				if (signal.data)
				{
					this.signals[id] = signal;
					this.layout.push (item);
				}
			}
			else
			{
				this.signals[id] = signal;
				this.layout.push (item);
			}
		},
		getSetupFunction (signal) {
			let graph = this.graphs.find ((graph) => graph.component === signal.component);
			if (graph) return graph.setup;
			else return null;
		},
		async setup(id)
		{
			let signal = this.signals[id];
			try 
			{
				const setup = this.getSetupFunction (signal);
				let data = await setup (signal.data);
				if (data) {
					signal.data = data;
					this.saveDashboard ();
				}
				this.$forceUpdate();
			}
			catch(e)
			{
				this.studio.workspace.warn(e.message);
			}	
		},
		emitSignal()
		{
			this.studio.dashboard.emitSignal('LineGraph',this.newValue);
			this.newValue+=10;
			this.studio.dashboard.emitSignal('GaugeGraph', this.newValue);
			this.studio.dashboard.emitSignal('SpeedometerGraph', this.newValue);
			this.studio.dashboard.emitSignal('VumeterGraph', this.newValue);
			this.studio.dashboard.emitSignal('ThermometerGraph', this.newValue);
		},
		async saveDashboard () {
			if (this.currentProject)
			{
				await this.studio.projects.saveSpecialFile(this.currentProject,'dashboard.json', JSON.stringify ({
					layout: this.layout,
					signals: this.signals
				}));
			}
		}
	},
	watch: {
		active (value) {
			if (value) {
				setTimeout (() => this.$refs.grid.onWindowResize(), 10);
			}
		},
		currentProject:
		{
			async handler (){
				if (this.currentProject)
				{
					let data = await this.studio.projects.loadSpecialFile(this.currentProject,'dashboard.json');
					if(data !== null)
					{
						try
						{
							let dashboard = JSON.parse (data);
							this.layout = [];
							this.signals = {};
							for (let signal of dashboard.layout) {
								let dashboardSignal = dashboard.signals[signal.i];
								if (dashboardSignal && dashboardSignal.data) {
									this.signals[signal.i] = dashboardSignal;
									this.layout.push (signal);
								}
							}
						}
						catch(e)
						{
							this.studio.workspace.showError('DASHBOARD_LOAD_DATA_ERROR', {extra: e.message});
						}
					} 
					else
					{
						this.layout = [];
						this.signals = {};
					}
				}
				else
				{
					this.elements = [];
					this.signals = {};
				}				
			},
		},
		layout: {
			deep:true,
			handler: function (/* val, oldVal */){
				if (this.active)
				{
					this.saveDashboard ();
				}
			}	
		}
	}
});


/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(45);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(46);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("77896d12", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
var ___CSS_LOADER_AT_RULE_IMPORT_0___ = __webpack_require__(48);
exports = ___CSS_LOADER_API_IMPORT___(false);
exports.i(___CSS_LOADER_AT_RULE_IMPORT_0___);
// Module
exports.push([module.i, ".w-100 {\n  width: 100%;\n}\n.w-90 {\n  width: 90%;\n}\n.w-80 {\n  width: 80%;\n}\n.w-70 {\n  width: 70%;\n}\n.w-60 {\n  width: 60%;\n}\n.w-50 {\n  width: 50%;\n}\n.w-40 {\n  width: 40%;\n}\n.w-30 {\n  width: 30%;\n}\n.w-20 {\n  width: 20%;\n}\n.w-10 {\n  width: 10%;\n}\n.hs-0 {\n  height: 0% !important;\n}\n.hs-35 {\n  height: 35% !important;\n}\n.hs-65 {\n  height: 65% !important;\n}\n.hs-100 {\n  height: calc(100vh - 158px) !important;\n}\n.rel {\n  position: relative;\n}\n.text-center {\n  text-align: center;\n}\n.text-left {\n  text-align: left;\n}\n.text-right {\n  text-align: right;\n}\n.h-top {\n  height: calc(100vh - 90px);\n}\n.h-top2 {\n  height: calc(100vh - 158px);\n}\n.left {\n  float: left !important;\n}\n.right {\n  float: right !important;\n}\n.p-20 {\n  padding: 20px;\n}\n.widgets-toolBox {\n  z-index: 0;\n  display: none;\n  width: 50px;\n  padding: 0 5px;\n  position: absolute;\n  top: 0px;\n  bottom: 0px;\n  right: 5px;\n  overflow-y: hidden;\n  overflow-x: hidden;\n  display: block;\n}\n.widget_item {\n  background: #eeeeee;\n  height: 50px;\n  margin: 7px 0;\n  cursor: pointer;\n  text-align: center;\n  position: relative;\n}\n.widget_item p.widget_title {\n  background: #868686;\n  font-size: 12px;\n  font-weight: bold;\n  color: #ffffff;\n  text-transform: uppercase;\n  position: absolute;\n  top: 0;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  line-height: 25px;\n}\n.widget_item .v-btn {\n  box-shadow: none !important;\n}\n.dashboard-content {\n  position: relative;\n  background: #ffffff;\n  overflow: auto;\n  height: calc(100vh - 158px) !important;\n}\n.graph-signal {\n  width: calc(100% - 190px) !important;\n  height: 100% !important;\n  overflow: auto;\n}\n.graph-signal li {\n  list-style: none;\n  margin-top: 16px;\n}\n.signal-info {\n  display: inline;\n  padding: 5px 10px;\n  background: #eeeeee;\n  border-radius: 5px;\n}\n.signal-info img {\n  vertical-align: bottom;\n}\n.color {\n  width: 80px !important;\n}\n.dash-btn {\n  height: 24px !important;\n  width: 24px !important;\n  background: none !important;\n  box-shadow: none !important;\n  float: right;\n  margin-right: 6px;\n  margin-top: 6px;\n}\n.dash-btn .v-btn__content {\n  width: 100%;\n  height: 100%;\n}\n.dash-btn .s24 .v-image__image {\n  background-size: 24px !important;\n}\n.dash-btn .s18 .v-image__image {\n  background-size: 18px !important;\n}\n.dash-btn .s14 .v-image__image {\n  background-size: 14px !important;\n}\n.dash-btn:hover {\n  border: 0 !important;\n  background: #e54225 !important;\n}\n.dash-btn:hover .v-image__image {\n  filter: invert(100);\n}\n.dash-btn:nth-child(1) {\n  margin-left: 10px;\n}\n.graph-title {\n  line-height: 36px;\n  margin: 0 16px;\n  float: left;\n}\n.graph-box {\n  position: absolute;\n  top: 3em;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n.graph-header {\n  float: left;\n  position: relative;\n  width: 100%;\n}\n.graph-header .dash-btn {\n  display: none;\n}\n.graph-header:hover {\n  background-color: #eee;\n  cursor: pointer;\n}\n.graph-header:hover .dash-btn {\n  display: block;\n}\n.highcharts-container {\n  position: relative;\n  margin: auto;\n  height: 30% !important;\n}\n.vue-grid-layout {\n  margin-right: 56px;\n}\n.vue-grid-item:not(.vue-grid-placeholder) {\n  background: rgba(255, 255, 255, 0.8);\n  border: 1px dashed rgba(0, 0, 0, 0);\n  overflow: hidden;\n}\n.vue-grid-item:not(.vue-grid-placeholder):hover {\n  border-color: rgba(0, 0, 0, 0.3);\n}\n.vue-grid-item.vue-grid-placeholder {\n  background-color: #81d4f5 !important;\n}\n.vue-grid-item .resizing {\n  opacity: 0.9;\n}\n.vue-grid-item .static {\n  background: #cce;\n}\n.vue-grid-item .text {\n  font-size: 24px;\n  text-align: center;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n  height: 100%;\n  width: 100%;\n}\n.vue-grid-item .no-drag {\n  height: 100%;\n  width: 100%;\n}\n.vue-grid-item .minMax {\n  font-size: 12px;\n}\n.vue-grid-item .add {\n  cursor: pointer;\n}\n.vue-draggable-handle {\n  position: absolute;\n  width: 20px;\n  height: 20px;\n  top: 0;\n  left: 0;\n  background: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>\") no-repeat;\n  background-position: bottom right;\n  padding: 0 8px 8px 0;\n  background-repeat: no-repeat;\n  background-origin: content-box;\n  box-sizing: border-box;\n  cursor: pointer;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_1_id_605db508_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(52);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_1_id_605db508_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_1_id_605db508_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_1_id_605db508_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_1_id_605db508_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_1_id_605db508_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(53);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("ad6522b0", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".v-list-item[data-v-605db508] {\n  padding: 0 10px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
	namespaced: true,
	state: 
	{
		graphs: []
	},
	getters: 
	{
		graphs: (state) => state.graphs,
	},
	actions:
	{
		graphs: ({commit}, graphs) => commit('graphs', [...graphs]),
	},
	mutations:
	{
		graphs: (state, value) => state.graphs = value,
	}
});

/***/ })

}]);