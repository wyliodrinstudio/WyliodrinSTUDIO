(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ 437:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process, Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reconnectingwebsocket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(438);
/* harmony import */ var reconnectingwebsocket__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reconnectingwebsocket__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _views_DeviceSetup_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(439);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);





let wyapp = null;
let workspace = null;

let id = null;

let deviceDriver = null;

let websocketDevices = [];

let socket = null;

let socketMessages = new events__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"] ();

let authenticated = false;

let displayedUnique = false;

class WebSocketWyAppTransport extends events__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]
{
	/**
	 * 
	 * @param {Device} device 
	 * @param {SSHDeviceOptions} options 
	 */
	constructor (device, options)
	{
		super ();
		this.device = device;
		this.address = options.address;
		this.port = options.port || 22;
		this.username = options.username;
		this.password = options.password;
		this.status = 'disconnected';
		this.stream = null;
		this.status = 'synchronizing';
		this.datafn = this._data.bind (this);
		this.updatefn = this._update.bind (this);
		process.nextTick (() => {
			this.emit ('synchronizing');
		});
		socketMessages.on ('update:devices', this.updatefn);
		socketMessages.on ('data:'+this.address, this.datafn);
	}

	_update ()
	{
		let exists = false;
		for (let device of websocketDevices)
		{
			if (device.id === this.device.id) exists = true;
		}
		if (!exists) this.disconnect ();
	}

	_data (data)
	{
		this.emit ('data', Buffer.from (data, 'base64'));
	}

	write (data, done)
	{
		if (socket)
		{
			socket.send (JSON.stringify ({t:'p', id: this.address, d:data.toString ('base64')}));
			if (lodash__WEBPACK_IMPORTED_MODULE_3___default.a.isFunction (done)) 
			{
				process.nextTick (done);
			}
		}
		else
		{
			if (lodash__WEBPACK_IMPORTED_MODULE_3___default.a.isFunction(done)) process.nextTick (() => done (new Error ('No Stream')));
		}
	}

	disconnect ()
	{
		socketMessages.removeListener ('data:'+this.address, this.datafn);
		socketMessages.removeListener ('update:devices', this.updatefn);
		this.emit ('disconnected');
	}
}

function updateDevices ()
{
	if (authenticated)
	{
		websocketDevices.push ({
			id: 'wyapp:websocket:newdevice',
			address: '',
			name: workspace.vue.$t('DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_TITLE'),
			board: 'any',
			icon: 'plugins/devices/wyapp/transports/websocket/data/icons/add-device-web.png',
			placeholder: true,
			priority: workspace.DEVICE_PRIORITY_PLACEHOLDER,
			properties: {}
		});
	}
	deviceDriver.updateDevices (websocketDevices);
	socketMessages.emit ('update:devices');
}

function setup (options, imports, register)
{
	wyapp = imports.device_wyapp;
	workspace = imports.workspace;
	id = imports.id;

	// TODO store token
	let token = id.getId ();

	id.on ('id:change', (t) => {
		token = t;
		startSocket ();
	});

	let pingPongTimeout = null;

	let errorAlreadyShown = false;

	let startSocket = () => 
	{
		if (token)
		{
			if (socket) socket.close ();
			let websockethostname = (location.protocol==='http:'?'ws':'wss')+'://'+location.hostname+':'+location.port;
			if (location.href.startsWith ('file://')) websockethostname = 'wss://beta.wyliodrin.studio';
			socket = new reconnectingwebsocket__WEBPACK_IMPORTED_MODULE_1___default.a (websockethostname+'/socket/ui');

			socket.onopen = function ()
			{
				errorAlreadyShown = false;
				socket.send (JSON.stringify({t:'a', token: token}));
				// console.log ('UI Socket sent authenticate');
			};

			socket.onmessage = async function (evt)
			{
				let m = evt.data;
				try
				{
					let data = JSON.parse (m);
					if (data.t === 'a')
					{
						if (data.authenticated === true) 
						{
							workspace.showNotification ('DEVICE_WYAPP_WEBSOCKET_SOCKET_CONNECTED', {}, 'success');
							authenticated = true;
							pingPongTimeout = setInterval (() => {
								if (authenticated) socket.send (JSON.stringify ({t: 'ping'}));
							}, 20*1000);
							socket.send (JSON.stringify ({t: 'i'}));
							updateDevices ();

						}
						if (data.e === 'unique')
						{
							if (displayedUnique === false)
							{
								displayedUnique = true;
								let reset = await workspace.showConfirmationPrompt ('DEVICE_WYAPP_WEBSOCKET_INSTANCE_RESET_TITLE', 'DEVICE_WYAPP_WEBSOCKET_INSTANCE_RESET');
								// eslint-disable-next-line require-atomic-updates
								displayedUnique = false;
								if (reset)
								{
									socket.send (JSON.stringify ({t: 'a', token: token, reset: true}));
								}
								else
								{
									socket.close ();
								}
							}
						}
					}
					else
					if (data.t === 's')
					{
						data.d.map ((device) => {if (!device.properties) device.properties = {};});
						websocketDevices = data.d;
						websocketDevices.map ((device) => {
							if (device.id.indexOf ('wyapp:websocket:')!==0) device.id = 'wyapp:websocket:'+device.id;
							device.priority = workspace.DEVICE_PRIORITY_NORMAL;
						});
						updateDevices ();
					}
					else
					if (data.t === 'p')
					{
						socketMessages.emit ('data:'+data.id, data.d);
					}
				}
				catch (e)
				{
					workspace.error ('UI Socket '+e.message);
				}
			};

			socket.onerror = function ()
			{
				if (!errorAlreadyShown)
				{
					workspace.showError ('DEVICE_WYAPP_WEBSOCKET_SOCKET_ERROR');
					errorAlreadyShown = true;
				}
			};
			
			socket.onclose = function ()
			{
				authenticated = false;
				websocketDevices = [];
				updateDevices ();
				clearInterval (pingPongTimeout);
				workspace.showNotification ('DEVICE_WYAPP_WEBSOCKET_SOCKET_DISCONNECTED', {}, 'warning');
			};
		}
		else
		{
			workspace.showError ('DEVICE_WYAPP_WEBSOCKET_SET_USER_ID_NO_UUID');
		}
	};

	startSocket ();

	deviceDriver = wyapp.registerTransport ('websocket', {
		Transport: WebSocketWyAppTransport,
		setup (device)
		{
			if (device.id === 'wyapp:websocket:newdevice')
			{
				workspace.showDialog (_views_DeviceSetup_vue__WEBPACK_IMPORTED_MODULE_2__["default"], {token, width: 500});
				return null;
			}
			else
				return {
					address: device.address,
					port: device.port
				};
		}
	});

	register (null, {});
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2), __webpack_require__(214).Buffer))

/***/ }),

/***/ 439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DeviceSetup_vue_vue_type_template_id_2e344480___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(440);
/* harmony import */ var _DeviceSetup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(442);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DeviceSetup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DeviceSetup_vue_vue_type_template_id_2e344480___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DeviceSetup_vue_vue_type_template_id_2e344480___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/devices/wyapp/transports/websocket/views/DeviceSetup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DeviceSetup_vue_vue_type_template_id_2e344480___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(441);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DeviceSetup_vue_vue_type_template_id_2e344480___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DeviceSetup_vue_vue_type_template_id_2e344480___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 441:
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
          _vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_TITLE")))
        ])
      ]),
      _vm._v(" "),
      _c(
        "v-card-text",
        [
          _c("v-select", {
            attrs: {
              label: _vm.$t("DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_TYPE"),
              items: _vm.boards,
              "item-text": "name",
              "item-value": "board"
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
          _c("v-text-field", {
            attrs: {
              autofocus: "",
              label: _vm.$t("DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_NAME"),
              required: ""
            },
            model: {
              value: _vm.value,
              callback: function($$v) {
                _vm.value = $$v
              },
              expression: "value"
            }
          }),
          _vm._v(" "),
          _c(
            "pre",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.nameValid,
                  expression: "nameValid"
                }
              ]
            },
            [_vm._v(_vm._s(_vm.json))]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: !_vm.nameValid,
                  expression: "!nameValid"
                }
              ]
            },
            [
              _vm._v(
                _vm._s(
                  _vm.$t("DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_NAME_NOT_VALID")
                )
              )
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
                  value: _vm.nameValid && _vm.setupPath,
                  expression: "nameValid && setupPath"
                }
              ]
            },
            [
              _c(
                "a",
                {
                  attrs: {
                    href:
                      "data:text/plain;charset=utf-8, " +
                      encodeURIComponent(_vm.json),
                    download: "wyliodrin.json"
                  }
                },
                [
                  _vm._v(
                    _vm._s(_vm.$t("DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_DOWNLOAD"))
                  )
                ]
              ),
              _vm._v(" "),
              _c("i", [_vm._v("wyliodrin.json")]),
              _vm._v(
                " " +
                  _vm._s(
                    _vm.$t("DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_DOWNLOAD_PART2")
                  ) +
                  " "
              ),
              _c("i", [_vm._v(_vm._s(_vm.setupPath))])
            ]
          )
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
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.wifiLink,
                  expression: "wifiLink"
                }
              ],
              attrs: { text: "" },
              on: { click: _vm.wifi }
            },
            [_vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_WEBSOCKET_SETUP_WIFI")))]
          ),
          _vm._v(" "),
          _c("v-btn", { attrs: { text: "" }, on: { click: _vm.more } }, [
            _vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_WEBSOCKET_MORE_INFO")))
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

/***/ 442:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_DeviceSetup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(443);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_DeviceSetup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 443:
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

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'DeviceSetup',
	props: ['token'],
	data () {
		return {
			value: '',
			boards: this.studio.device_wyapp.listBoards (),
			board: this.studio.device_wyapp.listBoards ()[0].board
		};
	},
	computed: {
		json ()
		{
			let server = window.location.href;
			if (server.startsWith('file://')) server = 'https://beta.wyliodrin.studio/';
			return JSON.stringify ({token: this.token, id: this.value.trim (), server: server+'socket/remote'}, null, 2);
		},
		jsonBase64 () {
			let server = window.location.href;
			if (server.startsWith('file://')) server = 'https://beta.wyliodrin.studio/';
			return Buffer.from (JSON.stringify ({token: this.token, id: this.value.trim (), server: server+'socket/remote'}, null, 2)).toString('base64');
		},
		nameValid ()
		{
			return (this.value.trim ().length > 0);
		},
		wifiLink ()
		{
			let wifiLink = null;
			let board = this.boards.find ((board) => board.board === this.board);
			if (board && board.setupOptions) wifiLink = board.setupOptions.wifiLink;
			return wifiLink;
		},
		setupPath ()
		{
			let setupPath = null;
			let board = this.boards.find ((board) => board.board === this.board);
			if (board && board.setupOptions) setupPath = board.setupOptions.path;
			return setupPath;
		},
	},
	methods: {
		wifi ()
		{
			this.studio.system.openLink (this.wifiLink);
		},
		more ()
		{
			let board = this.boards.find ((board) => board.board === this.board);
			this.studio.system.openLink (board && board.setupOptions?board.setupOptions.link:'https://wyliodrinstudio.readthedocs.io/en/latest/boards.html');
		},
		close ()
		{
			this.$root.$emit ('submit');
		}
	}
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(214).Buffer))

/***/ })

}]);