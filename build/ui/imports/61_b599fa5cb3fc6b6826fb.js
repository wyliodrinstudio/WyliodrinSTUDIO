(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[61],{

/***/ 1763:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var _views_Studio_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1764);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41);
/* harmony import */ var vuetify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1806);
/* harmony import */ var vuetify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vuetify__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vue_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1807);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(39);
/* harmony import */ var vuetify_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1808);
/* harmony import */ var vuetify_dialog__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(vuetify_dialog__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _views_Dialog_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1809);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _views_ConnectionSelectionDialog_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1814);
/* harmony import */ var _views_DialogLayout_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1819);
/* harmony import */ var _views_NotificationLayout_vue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1824);
/* harmony import */ var _views_QuestionDialog_vue__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1839);
/* harmony import */ var _views_PromptDialog_vue__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(1844);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(1849);
/* harmony import */ var _views_AboutDialog_vue__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(1850);
/* harmony import */ var vue_async_computed__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(1861);


















let settings = null;
let studio = null;

/**
 * a function that is called when the item may be deleted
 * @callback disposable
 */

/**
 * Device Identification
 * @typedef {Object} Device
 * @property {String} id  - unique id for the device (determined by the driver)
 * @property {String} name - name of the device
 * @property {String} type - type of the device (the device type id that reported the device)
 */



let deviceDrivers = {};
let availableDevices = [];
let translations = {
	LANGUAGES: {},
	TRANSLATION: {}
};

// let storeModules = {};
let menuItems = [
	/*{
		name: string,
		priority: number,
		action: function
	}*/
];

let toolbarButtons = [
	/*{
		name: string,
		priority: number,
		iconURL: string,
		action: function
	}*/
];

let deviceToolButtons = [
	/*{
		name: string,
		priority: number,
		iconURL: string,
		action: function
	}*/
];

let statusButtons = [
	/*{
		name: string,
		priority: number,
		iconURL: string,
		action: function
	}*/
];


let tabs = [
	/*{
		name: string,
		priority: number,
		component: Vue,
		visible: function (): boolean,
		enabled: function (): boolean
	}
	*/
];
let closeAsking = false;

let system = null;

function getLanguage() {
	let languageString = navigator.language;
	let languageId = languageString.split('-')[0];
	if (translations.TRANSLATION[languageString]) return languageString;
	return languageId;
}

function sortDevices(devices) {
	return devices.sort((device1, device2) => {
		let priority = device1.priority - device2.priority;
		if (priority === 0) {
			if (device1.name !== device2.name) {
				priority = (device1.name < device2.name) ? -100 : 100;
			}
		}
		return priority;
	});
}

let workspace = {
	/**
	 * The store
	 */
	store: null,

	/**
	 * The Vue
	 */
	vue: null,

	version: __webpack_require__ (1862).version,

	DEVICE_PRIORITY_HIGH: 0,
	DEVICE_PRIORITY_NORMAL: 100,
	DEVICE_PRIORITY_PLACEHOLDER: 200,
	DEVICE_PRIORITY_SIMULATOR: 300,
	DEVICE_PRIORITY_LOW: 900,

	/* Start the application */
	start(studio) {
		vue__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.studio = studio;

		let vuetify = new vuetify__WEBPACK_IMPORTED_MODULE_2___default.a({
			theme: {
				themes: {
					light: {
						primary: '#e54225',
						secondary: '#3c5459',
						accent: '#e54225',
						error: '#971c19',
					},
					dark: {
						primary: '#e54225',
						secondary: '#ffffff',
						accent: '#e54225',
						error: '#971c19',
					},
				},
			},
			icons: {
				iconfont: 'md',
			},
		});

		/* Vuetify */
		// Vue.mixin ({
		// 	vuetify: new Vuetify ({
		// 		icons: {
		// 			iconfont: 'mdi',
		// 		},
		// 	})
		// });

		vue__WEBPACK_IMPORTED_MODULE_1__["default"].config.productionTip = false;

		/* Store */
		vue__WEBPACK_IMPORTED_MODULE_1__["default"].mixin({
			store: this.store
		});

		/* Translations */
		try {
			translations = __webpack_require__(1863);
		}
		catch (e) {
			this.error('Loading translations failed ' + e.message);
		}

		vue__WEBPACK_IMPORTED_MODULE_1__["default"].use(vue_async_computed__WEBPACK_IMPORTED_MODULE_16__["default"]);

		vue__WEBPACK_IMPORTED_MODULE_1__["default"].translation = translations;

		const i18n = new vue_i18n__WEBPACK_IMPORTED_MODULE_3__["default"]({
			locale: studio.settings.loadValue ('workspace', 'language', getLanguage()),
			fallbackLocale: 'en',
			messages: translations.TRANSLATION
		});

		vue__WEBPACK_IMPORTED_MODULE_1__["default"].mixin({
			i18n
		});

		/* Register studion default menu items */
		// this.registerMenuItem ('TOOLBAR_SETUP', 10, () => {
		// 	console.log ('menu item setup');
		// });

		this.registerMenuItem('WORKSPACE_SET_MODE_SIMPLE', 10, () => {
			workspace.dispatchToStore('workspace', 'mode', 'simple');
			settings.storeValue('workspace', 'mode', 'simple');
		}, {
			visible() {
				return workspace.getFromStore('workspace', 'mode') !== 'simple';
			}
		});

		this.registerMenuItem('WORKSPACE_SET_MODE_ADVANCED', 10, () => {
			workspace.dispatchToStore('workspace', 'mode', 'advanced');
			settings.storeValue('workspace', 'mode', 'advanced');

		}, {
			visible() {
				return workspace.getFromStore('workspace', 'mode') === 'simple';
			}
		});

		this.registerMenuItem('WORKSPACE_TOOLBAR_ABOUT', 100, () => {
			this.showDialog(_views_AboutDialog_vue__WEBPACK_IMPORTED_MODULE_15__["default"],{width:550});
		});

		// this.registerTab('Application', 20, () => {
		// 	console.log('tab item Application');
		// });
		// this.registerTab('Dashboard', 30, () => {
		// 	console.log('tab item Dashboard');
		// });
		// this.registerTab('Schematics', 40, () => {
		// 	console.log('tab item Schematics');
		// });
		// this.registerTab('PinLayout', 50, () => {
		// 	console.log('tab item PinLayout');
		// });
		// this.registerTab('Shell', 60, () => {
		// 	console.log('tab item Shell');
		// });

		vue__WEBPACK_IMPORTED_MODULE_1__["default"].use(vuetify_dialog__WEBPACK_IMPORTED_MODULE_5___default.a, {
			context: {
				vuetify
			},
			confirm: {
				width: 500,
				height: 500
			}
		});

		vue__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.$dialog.layout('default', _views_DialogLayout_vue__WEBPACK_IMPORTED_MODULE_10__["default"]);
		vue__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.$dialog.layout('notification', _views_NotificationLayout_vue__WEBPACK_IMPORTED_MODULE_11__["default"]);

		this.vue = new vue__WEBPACK_IMPORTED_MODULE_1__["default"]({
			el: '#app',
			vuetify,
			render: function (render) {
				return render(_views_Studio_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);
			}
		});
	},

	/**
	 * This function will register a new tab in the workspace. 
	 * 
	 * Each tab has a *title*, that will be displayed in the workspace, a *priority*, which refers to the position of a tab in the list 
	 * of tabs, a *component*, representing the actual content and funtionality of the tab, and aditional *options*, that will authorize 
	 * or will block the user access, depending on their value.
	 * 
	 * The default value of these options is  **() => return true**, which means the menu item will be visible and will allow user access, 
	 * but it can be customized at the moment of the registration of one element. 
	 * 
	 * If the value of *enabled* will be changed to another function, the name of the menu item will still be visible in the list of all menu items, but 
	 * it won't permit any user action, because the item will not become usable until the return value of the function will be *true*.
	 * 
	 * If the value of the *visible* option is changed to another function, the name of the menu item will not appear in the list with all menu items 
	 * until the return value of the function will become *true*; in this case, when the element is visible, it becomes automatically *enabled*.
	 * 
	 * 
	 * @param {string} name the translation ID of the title of the tab
	 * @param {number} priority the priority of the tab, lower is to the left
	 * @param {Vue} component the Vue component to display
	 * @param {options} options additional options, like **visible** or **enabled**; 
	 * the tab is available for user interaction according to the value of these options;
	 * 
	 * 
	 * @returns {disposable} an item that may be disposed {:js:func:`disposable`}
	 *
	 * 
	 * @example
	 * 	
	 * let time = new Date();
	 * 
 	 * registerTab('PROJECT_NOTEBOOK', 300, Notebook, {
	 * 		enabled () {
	 *			return time.getHours() > 8;
	 *		}
	 * });
	 * 
	 */
	registerTab(name, priority, component, options = {}) {
		options = lodash__WEBPACK_IMPORTED_MODULE_8___default.a.merge({
			visible: () => true,
			enabled: () => true
		}, options);
		let sameTab = tabs.find((tab) => tab.name === name);
		if (!sameTab) {
			this.registerComponent(component);
			let item = {
				name,
				priority,
				component: component.name,
				enabled: options.enabled,
				visible: options.visible
			};
			tabs.push(item);
			tabs = tabs.sort((tab1, tab2) => tab1.priority - tab2.priority);
			this.store.dispatch('workspace/tabs', tabs);
		}
		else {
			this.warn('Tab ' + name + ' already exists in the workspace');
		}
	},

	/**
	 * This function will register a new item in the menu that is displayed in the top left corner of the window. 
	 * A menu item is a component that will allow the "analysis" of Wyliodrin STUDIO, the purpose of the menu being to include details about 
	 * the application and its operation. 
	 * 
	 * Each item has a *name*, that will be displayed in the menu, a *priority*, which refers to the position of an element in the list 
	 * of menu items, an *action*, representing the content that will be opened when the item is selected, and aditional *options*, that will 
	 * authorize or will block the user access, depending on their value.
	 * 
	 *
	 * The default value of these options is  **() => return true**, which means the menu item will be visible and will allow user access, 
	 * but it can be customized at the moment of the registration of one element. 
	 * 
	 * If the value of *enabled* will be changed to another function, the name of the menu item will still be visible in the list of all menu items, but 
	 * it won't permit any user action, because the item will not become usable until the return value of the function will be *true*.
	 * 
	 * If the value of the *visible* option is changed to another function, the name of the menu item will not appear in the list with all menu items 
	 * until the return value of the function will become *true*; in this case, when the element is visible, it becomes automatically *enabled*.
	 * 
	 * @param {string} name - the name/id of the menu item
	 * @param {number} priority - the priority of the tab, lower is to the left
	 * @param {Function} action - the function to run when clicked
	 * @param {Object} options additional options, like **visible** or **enabled**; 
	 * the tab is available for user interaction according to the value of these options
	 * 
	 * @returns {disposable} - an item that may be disposed
	 * 
	 * @example
	 * 
	 * registerMenuItem('WYLIODRIN_API', 10, () => documentation.openDocumentation());
	 */
	registerMenuItem(name, priority, action, options = {}) {
		// TODO verify name, priority and action to be the right value
		options = lodash__WEBPACK_IMPORTED_MODULE_8___default.a.merge({
			visible: () => true,
			enabled: () => true
		}, options);
		let sameMenuItem = menuItems.find((menuItem) => menuItem.name === name);
		if (!sameMenuItem) {
			let item = {
				name,
				priority,
				action,
				enabled: options.enabled,
				visible: options.visible
			};
			menuItems.push(item);
			menuItems = menuItems.sort((menuItem1, menuItem2) => menuItem1.priority - menuItem2.priority);
			this.store.dispatch('workspace/menuItems', menuItems);
		}
		else {
			this.warn('Menu item ' + name + ' already exists in the menu');
		}
	},

	/**
	 * Rename an item from the menu.
	 * 
	 * The previous parameters that were set for the current menu item will remain unchanged, 
	 * but the name of the element will be updated in the list of menu items.
	 * 
	 * @param {string} prevName - the initial name of the item
	 * @param {string} actualName - the actual name of the item
	 * 
	 * @returns {disposable} - an item that may be disposed
	 * 
	 * @example
	 * 
	 * renameMenuItem('WYLIODRIN_API', 'WYLIODRIN_STUDIO_API');
	 */
	renameMenuItem(prevName, actualName) {
		// TODO verify name, priority and action to be the right value
		let sameMenuItem = menuItems.find((menuItem) => menuItem.name === prevName);
		if (sameMenuItem) {
			let index = menuItems.indexOf(sameMenuItem);
			if (index > -1) {
				menuItems.splice(index, 1);
			}
			let item = {
				name: actualName,
				priority: sameMenuItem.priority,
				action: sameMenuItem.action,
				enabled: sameMenuItem.enabled,
				visible: sameMenuItem.visible
			};
			menuItems.push(item);
			menuItems = menuItems.sort((menuItem1, menuItem2) => menuItem1.priority - menuItem2.priority);
			this.store.dispatch('workspace/menuItems', menuItems);
		}
		else {
			this.warn('Menu item ' + prevName + ' does not exists in the menu');
		}
	},

	/**
	 * 
	 * This function will register a new button in the toolbar. 
	 * 
	 * Each toolbar button has a translatable *name*, that will be displayed under it on mouse hover, a *priority*, which refers to the position of 
	 * an element in the toolbar buttons list, an *action*, representing the content that will be opened when the button is selected, an *icon* that will 
	 * represent the actual symbol of the button and on which the user will be able to click, and aditional *options*, that will authorize or will 
	 * block the user access, depending on their value.
	 * 
	 *
	 * The default value of these options is  **() => return true**, which means the toolbar button will be visible and will allow user access, 
	 * but it can be customized at the moment of the registration of one element. 
	 * 
	 * If the value of *enabled* will be changed to another function, the name of the toolbar button will still be visible in the list of all toolbar buttons, but 
	 * it won't permit any user action, because the button will not become usable until the return value of the function will be *true*.
	 * 
	 * If the value of the *visible* option is changed to another function, the name of the toolbar button will not appear in the list with all toolbar buttons 
	 * until the return value of the function will become *true*; in this case, when the element is visible, it becomes automatically *enabled*.
	 * 
	 * @param {string} name - the name/id of the toolbar button
	 * @param {number} priority - the priority of the tab, lower is to the left
	 * @param {Function} action - the function to run when clicked
	 * @param {string} iconURL - the relative path to the image assigned 
	 * @param {Object} options additional options, like **visible** or **enabled**; 
	 * the button is available for user interaction according to the value of these options
	 * 
	 * @returns {disposable} - an item that may be disposed
	 * 
	 * @example
	 * 
	 * let time = new Date();
	 * 
	 * registerToolbarButton('TOOLBAR_BUTTON', 10, () => showNotification('You created a toolbar button!'), 'plugins/projects/projects/data/img/icons/button.svg', {
	 * 		visible() {
	 * 			return time.getHours() > 8;
	 * 		}
	 * });
	 */
	registerToolbarButton(name, priority, action, iconURL, options = {}) {
		// TODO verify name, priority and action to be the right value
		options = {
			visible: () => true,
			enabled: () => true,
			...options
		};
		let sameToolbarButton = toolbarButtons.find((toolbarButton) => toolbarButton.name === name);
		if (!sameToolbarButton) {
			let item = {
				name,
				priority,
				action,
				iconURL,
				enabled: options.enabled,
				visible: options.visible
			};
			toolbarButtons.push(item);
			toolbarButtons = toolbarButtons.sort((toolbarButton1, toolbarButton2) => toolbarButton1.priority - toolbarButton2.priority);
			this.store.dispatch('workspace/toolbarButtons', toolbarButtons);
		}
		else {
			this.warn('Toolbar button ' + name + ' already exists in the toolbar');
		}
	},

	/**
	 * This function is used to register a new device tool button, specific for every device type.
	 * 
	 * 
	 * For example, when a Raspberry Pi board is connected, the following buttons become available: 
	 * **Run**, **Stop**, **TaskManager**, **PackageManager**, **NetworkManager**.
	 * 
	 * Each device button require a *deviceType*, to know for which type of device we are registering the customized button, 
	 * it has a translatable *name*, that will be displayed under it on mouse hover, a *priority*, which refers to the position of 
	 * an element in the device buttons list, an *action*, representing the content that will be opened when the button is selected, an *icon* that will 
	 * be the actual symbol of the button and on which the user will be able to click, and aditional 
	 * *options*, that will authorize or will block the user access, depending on their value.
	 * 
	 *
	 * The default value of these options is  **() => return true**, which means the device button will be visible and will allow user access, 
	 * but it can be customized at the moment of the registration of one element. 
	 * 
	 * If the value of *enabled* will be changed to another function, the name of the device button will still be visible in the list of all device buttons, but 
	 * it won't permit any user action, because the button will not become usable until the return value of the function will be *true*.
	 * 
	 * If the value of the *visible* option is changed to another function, the name of the device button will not appear in the list with all device buttons 
	 * until the return value of the function will become *true*; in this case, when the element is visible, it becomes automatically *enabled*.
	 * 
	 * @param {string} deviceType - the device driver type the button is for
	 * @param {string} name - the name/id of the menu item
	 * @param {number} priority - the priority of the tab, lower is to the left
	 * @param {Function} action - the function to run when clicked
	 * @param {string} iconURL - the relative path to the image assigned 
	 * @param {Object} options additional options, like **visible** or **enabled**; 
	 * the button is available for user interaction according to the value of these options
	 * 
	 * @returns {disposable} - an item that may be disposed
	 * 
	 * @example
	 * 
	 * let time = new Date();
	 * 
	 * registerDeviceToolBotton('RUN', 10,  => showNotification('You clicked the Run button!'), 
	 * 		'plugins/studio/workspace/data/img/icons/button.svg', {
	 * 		visible() {
	 * 			return time.getHours() > 8;
	 * 		}
	 * });
	 */
	registerDeviceToolButton(deviceType, name, priority, action, iconURL, options = {}) {
		// TODO verify name, priority, options.type and action to be the right value
		options = lodash__WEBPACK_IMPORTED_MODULE_8___default.a.merge({
			visible: () => true,
			enabled: () => true
		}, options);
		let sameDeviceToolButton = deviceToolButtons.find((toolbarButton) => toolbarButton.name === name);
		if (!sameDeviceToolButton) {
			let item = {
				type: deviceType,
				name,
				priority,
				action,
				iconURL,
				enabled: options.enabled,
				visible: options.visible,
				buttonType: options.type
			};
			deviceToolButtons.push(item);
			deviceToolButtons = deviceToolButtons.sort((deviceToolButton1, deviceToolButton2) => deviceToolButton1.priority - deviceToolButton2.priority);
			this.store.dispatch('workspace/deviceToolButtons', deviceToolButtons);
		}
		else {
			this.warn('Toolbar button ' + name + ' already exists in the toolbar');
		}
	},

	/**
	 * This function will register a new button in the status bar that is displayed in the bottom of the window. 
	 * 
	 * Each status button has a translatable *name*, that will be displayed under it on mouse hover, a *priority*, which refers to the position of 
	 * an element in the status buttons list, a *component*, representing the content that will be shown when the button is clicked, an *icon* that will 
	 * represent the actual symbol of the button and on which the user will be able to click, and aditional *options*, that will authorize or will 
	 * block the user access, depending on their value.
	 * 
	 *
	 * The default value of these options is  **() => return true**, which means the status button will be visible and will allow user access, 
	 * but it can be customized at the moment of the registration of one element. 
	 * 
	 * If the value of *enabled* will be changed to another function, the name of the status button will still be visible in the list of all status buttons, but 
	 * it won't permit any user action, because the button will not become usable until the return value of the function will be *true*.
	 * 
	 * If the value of the *visible* option is changed to another function, the name of the status button will not appear in the list with all status buttons 
	 * until the return value of the function will become *true*; in this case, when the element is visible, it becomes automatically *enabled*.
	 * 
	 * The *statusButtons* registered at the moment can open the **Console** and 
	 * the **Mqtt** server interface.
	 * 
	 * @param {string} name - the name/id of the menu item
	 * @param {number} priority - the priority of the tab, lower is to the left
	 * @param {Vue} component - the Vue component to display
	 * @param {string} iconURL - the relative path to the image assigned 
	 * @param {Object} options additional options, like **visible** or **enabled**; 
	 * the button is available for user interaction according to the value of these options
	 * 
	 * @returns {disposable} - an item that may be disposed
	 * 
	 * @example
	 * 
	 * registerStatusButton('CONSOLE', 1, Console, 'plugins/studio/console/data/img/icons/terminal-icon.svg');
	 */
	registerStatusButton(name, priority, component, iconURL, options = {}) {
		// TODO verify name, priority and action to be the right value
		this.registerComponent(component);
		options = lodash__WEBPACK_IMPORTED_MODULE_8___default.a.merge({
			visible: () => true,
			enabled: () => true,
			inset: () => false,
			height: () => '200px',
			overlay: () => false
		}, options);
		let sameStatusButton = statusButtons.find((statusButton) => statusButton.name === name);
		if (!sameStatusButton) {
			let item = {
				name,
				priority,
				component: component.name,
				iconURL,
				enabled: options.enabled,
				visible: options.visible,
				inset: options.inset,
				height: options.height,
				overlay: options.overlay
			};
			statusButtons.push(item);
			statusButtons = statusButtons.sort((statusButton1, statusButton2) => statusButton1.priority - statusButton2.priority);
			this.store.dispatch('workspace/statusButtons', statusButtons);
		}
		else {
			this.warn('Toolbar button ' + name + ' already exists in the toolbar');
		}
	},

	/**
	 * Open a status button, using the **dispatchToStore** function to send to
	 * the *activeStatusButton* variable from the workspace store the value 
	 * of the chosen status button.
	 * 
	 * @param {string} name - the name of the status button to open
	 * 
	 * @example
	 * 
	 * openStatusButton('CONSOLE');
	 */
	openStatusButton(name) {
		this.dispatchToStore('workspace', 'activeStatusButton', name);
	},

	/**
	 * Close a status button, using the **dispatchToStore** function to send to
	 * the *activeStatusButton* variable from the workspace store an empty string,
	 * which means that the currently open status button is no longer available.
	 * 
	 * @example
	 * 
	 * closeStatusButton();
	 */
	closeStatusButton() {
		this.dispatchToStore('workspace', 'activeStatusButton', '');
	},

	/**
	 * This function registers a new namespaced store.
	 * 
	 * A *"store"* is basically a container that holds the application state.
	 * Since a Vuex store is reactive, when a Vue component needs or changes 
	 * a variable state, it will reactively and efficiently update the values.
	 * 
	 * @param {string} namespace - the name/id of the menu item
	 * @param {Object} store - the actual store object, imported from the *'store.js'* file of the plugin
	 * 
	 * @returns {undefined} 
	 * 
	 * @example
	 * 
	 * registerStore('projects', projectStore);
	 * 
	 */
	registerStore(namespace, store) {
		if (this.store) {
			// TODO check if it is already registered
			this.store.registerModule(namespace, store);
		}
		else {
			this.error('Unable to register store module ' + namespace + ', store has not been already started');
		}
	},

	/**
	 * Gets the value of a variable from a selected store.
	 * 
	 * @param {string} namespace - the name of the store where the variable is registered
	 * @param {string} variable - the name of the variable to process
	 * 
	 * @example
	 * 
	 * let project = getFromStore('projects', 'currentProject');
	 */
	getFromStore(namespace, variable) {
		return lodash__WEBPACK_IMPORTED_MODULE_8___default.a.cloneDeep(this.store.getters[namespace + '/' + variable]);
	},

	/**
	 * Sends data to a selected store promptly and updates the state and value of a certain variable.
	 * 
	 * @param {string} namespace - the name of the store where the data will be dispatched
	 * @param {string} action - the variable to be updated
	 * @param {Object} data - additional data to send to the variable
	 * 
	 * @example
	 * 
	 * dispatchToStore('projects', 'currentProject', null);
	 */
	dispatchToStore(namespace, action, data) {
		return this.store.dispatch(namespace + '/' + action, lodash__WEBPACK_IMPORTED_MODULE_8___default.a.cloneDeep(data));
	},

	/**
	 * Register a Vue component.
	 * @param {Vue} component - the Vue component to be registered
	 * 
	 * @example
	 * 
	 * registerComponent(MyComponent);
	 */
	registerComponent(component) {
		// TODO check if title is string
		vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(component.name, component);
	},

	/**
	 * This function shows a notification that will inform the user about the current application state.
	 * 
	 * The notification will have a *text* content, that will be translated according to the current language of the program, 
	 * but it can also contain the name of one system variable the user is working with. This variable is included in the *values* 
	 * object in order to be translated, because its value can change dynamically. Each notification also has a *type*, that will 
	 * update the color of the notification box, and a timeout to be visible for the user, its default value being 6 seconds.
	 *
	 * @param {string} text - the translatable ID of the text to be displayed
	 * @param {Object} [values={}] - values to insert into the translatable text
	 * @param {string} type - the notification type: info/success/warning
	 * @param {number} [timeout=6000] - timeout until the notification is dismissed automatically (0 for never)
	 * 
	 * @example
	 * 		
	 * studio.workspace.showNotification ('TRANSLATED_TEXT_ID', {title: 'the title'}, 'success', 5000);
	 * 
	 *
	 */
	showNotification(text, values = {}, type = 'info', timeout = 6000) {
		if (this.vue) {
			if (type === 'info')
				this.vue.$dialog.notify.info(this.vue.$t(text, values), {
					extra: values.extra,
					position: 'bottom-right',
					width: 700,
					timeout: timeout
				});
			else
			if (type === 'success')
				this.vue.$dialog.notify.success(this.vue.$t(text, values), {
					extra: values.extra,
					position: 'bottom-right',
					width: 700,
					timeout
				});
			else
			if (type === 'warning')
				this.vue.$dialog.notify.warning(this.vue.$t(text, values), {
					extra: values.extra,
					position: 'bottom-right',
					width: 700,
					timeout
				});
		}
		else {
			this.error('Notification is not available, please initialize Vue engine first.');
		}
	},

	/**
	 * This function sends an error notification in the application, when the user is trying to perform an 
	 * unauthorized action. 
	 * 
	 * The error notification will have a *text* content, that will be translated according to the current language of the program, 
	 * but it can also contain the name of one system variable the user is working with. This variable is included in the *values* 
	 * object in order to be translated, because its value can change dynamically, and a timeout to be visible for the user, its 
	 * default value being 6 seconds.. In opposition to a basic notification, the default *type* is *error*.
	 * 
	 * @param {string} text - the translatable ID of the text to be displayed
	 * @param {Object} [value={}] - values to insert into the translatable text
	 * @param {number} [timeout=6000] - timeout until the notification is dismissed automatically (0 for never)
	 * 
	 * @example
	 * 		
	 * studio.workspace.showError ('TRANSLATED_TEXT_ID', {title: 'the title'}, 5000);
	 * 
	 * 
	 */
	showError(text, values = {}, timeout = 6000) {
		if (this.vue) {
			this.vue.$dialog.notify.error(this.vue.$t(text, values), {
				extra: values.extra,
				position: 'bottom-right',
				width: 700,
				timeout
			});
		}
	},

	/**
	 * This function shows a customized prompt that waits for user input and collects data. 
	 * 
	 * A prompt has a *title*, that is located at the top of the box and it indicates the purpose of the prompt, 
	 * a *question*, representing the requirement addressed to users, an *original* value contained in the input 
	 * area, an *action* to be performed, and the *values* option that allow the translation of some system variables
	 * the user is working with.
	 * 
	 * @param {string} title - the translatable title of the prompt to be displayed
	 * @param {string} question - the translatable question of the prompt to be displayed
	 * @param {string} original - the original translatable content of the input area
	 * @param {Object} action - the action performed
	 * @param {Object} [value={}] - values to insert into the translatable text
	 * 
	 * @example
	 * 		
	 * showPrompt('PROJECT_RENAME_PROJECT', 'PROJECT_NAME_PROMPT','');
	 */
	showPrompt(title, question, original, action, values = {}) {
		return this.showDialog(_views_PromptDialog_vue__WEBPACK_IMPORTED_MODULE_13__["default"], {
			question,
			title,
			values,
			persistent: true,
			originalValue: original,
			actions: [
				{
					title: 'BACK',
					class: '',
					value: null
				},
				{
					title: action,
					class: '',
					value: action
				}
			]
		});
	},

	showCustomConfirmationPrompt(title, question, actions, values = {}) {
		return this.showDialog(_views_QuestionDialog_vue__WEBPACK_IMPORTED_MODULE_12__["default"], {
			question,
			title,
			persistent: true,
			actions: actions,
			values
		});
	},

	/**
	 * This function shows a customized prompt containing a simple question and waiting for a *Yes/No* response. 
	 * 
	 * This prompt also has a *title*, that is located at the top of the box and it indicates the purpose of the prompt, 
	 * a *question*, addressed to users in order to confirm an action that will be performed, and the *values* option 
	 * that allow the translation of some system variables the user is working with.
	 * 
	 * @param {string} title - the translatable title of the prompt to be displayed
	 * @param {string} question - the translatable question of the prompt to be displayed
	 * @param {Object} [values={}] - values to insert into the translatable text
	 * 
	 * @example
	 * 		
	 * showConfirmationPrompt('EXIT', 'WORKSPACE_TOOLBAR_EXIT_QUESTION');
	 */
	showConfirmationPrompt(title, question, values = {}) {
		return this.showDialog(_views_QuestionDialog_vue__WEBPACK_IMPORTED_MODULE_12__["default"], {
			question,
			persistent: true,
			title,
			values
		});
	},

	/**
	 * This function shows a dialog that can contain informations about an application component or that can require user actions.
	 * 
	 * The dialog will have a translatable *title*, displayed on the top of the box, a Vue *component* specifically designed 
	 * to collect the required data from the user, additional *options* and *buttons* to customize the dialog window, and the *values* option 
	 * that allow the translation of some system variables the user is working with.
	 * 
	 * @param {string|object} title - the title of the dialog window
	 * @param {Vue} component - the Vue component to display
	 * @param {Object} options - additional like width
	 * @param {Object[]} buttons - the array of buttons to display
	 * @param {Object} [values={}] - values to insert into the translatable text
	 * 
	 * 
	 */
	showDialog(title, component, options, buttons, values = {}) {
		return new Promise((resolve/*, reject*/) => {
			process.nextTick(() => {
				let value = undefined;
				if (this.vue) {
					if (lodash__WEBPACK_IMPORTED_MODULE_8___default.a.isObject(title)) {
						values = buttons;
						buttons = options;
						options = component;
						component = title;
						value = this.vue.$dialog.showAndWait(component, options, {});
						// console.log (value);
					}
					else {
						value = this.vue.$dialog.showAndWait(_views_Dialog_vue__WEBPACK_IMPORTED_MODULE_6__["default"], lodash__WEBPACK_IMPORTED_MODULE_8___default.a.assign({
							title: this.vue.$t(title, values),
							component,
							actions: buttons
						}, options));
						// console.log (value);
					}
				}
				else {
					this.error('Dialog is not available, please initialize Vue engine first.');
				}
				return resolve(value);
			});
		});
	},

	/**
	 * This function opens a customized dialog that contains the settings options of a connected device.
	 * 
	 * It's called if the user clicks on the currently connected device name, and opens a dialog where he can see its specifications.
	 * 
	 * @param {Device} device - device
	 */
	showDeviceSettingsDialog() {
		let device = this.getDevice();
		let deviceDriver = deviceDrivers[device.type];
		if (deviceDriver) {
			if (lodash__WEBPACK_IMPORTED_MODULE_8___default.a.isFunction(deviceDriver.settings)) {
				deviceDriver.settings(device);
			}
			else {
				this.warn('Device driver ' + device.type + ' has no registered settings function');
			}
		}
		else {
			this.showError('DEVICE_UNKNOWN_TYPE', {
				type: device.type
			});
		}
	},

	/**
	 * This function opens a customized dialog box, used to select a device that will be connected to Wyliodrin Studio.
	 * 
	 * It's called when the user clicks on the *‘Connect’* button and it shows a dialog containing a list with all the devices available for connection.
	 */
	showConnectionSelectionDialog() {
		for (let type in deviceDrivers) {
			let deviceDriver = deviceDrivers[type];
			if (lodash__WEBPACK_IMPORTED_MODULE_8___default.a.isFunction(deviceDriver.listDevices)) deviceDriver.listDevices();
		}
		return this.showDialog(_views_ConnectionSelectionDialog_vue__WEBPACK_IMPORTED_MODULE_9__["default"], {
			width: '800px'
		});
	},

	/**
	 * This function sets the title of the workspace according to the name of the current project.
	 * 
	 * The workspace title will be displayed to the left of the tabs list.
	 * 
	 * @example
	 * 
	 * setWorkspaceTitle (project.name);
	 */
	setWorkspaceTitle(title) {
		// TODO check if title is string
		this.store.dispatch('workspace/title', title);
	},

	/**
	 * This function registers a new device type. It requires a *name* that indicates the type of the device 
	 * for which it will register the driver, and the actual device driver object, that include a series of properties 
	 * and functions.
	 * 
	 * @param {string} name - device type name
	 * @param {DeviceDriver} deviceDriver - actual device driver, consists of a series 
	 * of functions necessary to represent, connect, disconnect or set up a device.
	 * 
	 * @example
	 * 		
	 * registerDeviceDriver('my_device', deviceDriver);
	 */
	registerDeviceDriver(name, deviceDriver) {
		if (!deviceDrivers[name]) {
			/* TODO check that device driver has all the properties
			DeviceDriver
			{
				connect: function,
			}
			*/
			deviceDrivers[name] = deviceDriver;
			return {
				DEVICE_PRIORITY_HIGH: workspace.DEVICE_PRIORITY_HIGH,
				DEVICE_PRIORITY_NORMAL: workspace.DEVICE_PRIORITY_NORMAL,
				DEVICE_PRIORITY_PLACEHOLDER: workspace.DEVICE_PRIORITY_PLACEHOLDER,
				DEVICE_PRIORITY_SIMULATOR: workspace.DEVICE_PRIORITY_SIMULATOR,
				DEVICE_PRIORITY_LOW: workspace.DEVICE_PRIORITY_LOW,
				registerDeviceToolButton: this.registerDeviceToolButton.bind(this, name),
				updateDevice: this.updateDevice.bind (this, name),
				updateDevices: this.updateDevices.bind(this, name),
			};
		}
		else {
			this.warn('Device type ' + name + ' is already registered');
		}
		return null;
	},
	
	/**
	 * Returns the icon for a board
	 * 
	 * @param {String} type - driver's type
	 * @param {String} board - board's anme
	 */
	getBoardIcon (type, board) {
		let icon = null;
		let deviceDriver = deviceDrivers[type];
		if (deviceDriver) icon = deviceDriver.getBoardIcon (board);
		return icon;
	},

	/**
	 * This function updates the list of devices for a device type. It's required to know
	 * the *type* of the device that will be updated, and the list wilth all the devices that will 
	 * be attached to the selected type of device.
	 * 
	 * @param {string} type - device type, has to be registered
	 * @param {Device[]} dev - a list of devices (:js:func:`Device`)
	 * 
	 * @example
	 * 
	 * updateDevices (myDevices);
	 */
	updateDevices(type, dev) {
		if (deviceDrivers[type]) {
			// console.log (data);
			let devices = availableDevices.filter((device) => {
				return (device.type !== type);
			});

			dev.map((device) => {
				device.type = type;
				if (!device.icon) this._defaultDeviceIcon(device);
			});

			devices.push(...dev);
			availableDevices = sortDevices(devices);
			this.dispatchToStore('workspace', 'devices', availableDevices);
		}
		else {
			this.warn('update devices: device type ' + type + ' is not registered');
		}
	},

	/**
	 * Place the default device icon (if available)
	 * @param {Device} device 
	 */
	_defaultDeviceIcon(device) {
		if (lodash__WEBPACK_IMPORTED_MODULE_8___default.a.isFunction(deviceDrivers[device.type].defaultIcon)) {
			device.icon = deviceDrivers[device.type].defaultIcon();
		}
		else {
			device.icon = 'plugins/studio/workspace/data/img/icons/device-icon.png';
			this.warn('update devices: device type ' + device.type + ' has no default device icon');
		}
	},

	/**
	 * This function updates the current device with the one in the arguments list
	 * @param {string} type 
	 * @param {Device} device 
	 */
	updateDevice(type, device){
		let dev = this.getDevice();
		device.type = type;
		if (device.id === dev.id && device.type === dev.type) {
			this.dispatchToStore('workspace', 'status', device.status);
			this.dispatchToStore('workspace', 'device', device);
			if (device.status === 'DISCONNECTED') {
				this.dispatchToStore('workspace', 'device', undefined);
			}		
		}
		else {
			this.warn('Trying to update status from device ' + device.id + ' (' + device.type + ') while device is the selected one');
		}
	},

	/**
	 * The purpose of this function is to connect Wyliodrin STUDIO to a device.
	 * 
	 * In order to connect, it's required to have a valid device object and the corresponding 
	 * connection options. This process demands to constantly check the device status. 
	 * 
	 *   The statuses that a device can have are:
	 * 
	 *   DISCONNECTED - this is offline
	 * 
	 *   CONNECTING - trying to connect
	 * 
	 *   SYNCHRONIZING - trying to synchronize with the device
	 * 
	 *   CONNECTED - this is online
	 * 
	 *   ISSUE - there is some issue, the system is partially functional
	 * 
	 *   ERROR - there is an error with the system
	 * 
	 * 
	 * @param {Device} device - the device to connect to
	 * @param {Device} options - connect options
	 * 
	 */
	async connect(device, options) {
		// TODO should check for connection?
		if (this.getStatus() !== 'DISCONNECTED') {
			await this.disconnect(this.getDevice());
		}
		// TODO check that device is an actual device type
		let deviceDriver = deviceDrivers[device.type];
		if (deviceDriver) {
			let update = await deviceDriver.connect(lodash__WEBPACK_IMPORTED_MODULE_8___default.a.cloneDeep(device), options);
			if (update) {
				// update = this.store.dispatch ('workspace/device', update);
				// if (update.type === 'none')
				// {
				// 	await this.disconnect ();
				// }
				// register device
				// let unregister = deviceDriver.registerForUpdate(update, (device) => {
				// 	let dev = this.getDevice();
				// 	if (device.id === dev.id && device.type === dev.type) {
				// 		this.dispatchToStore('workspace', 'status', device.status);
				// 		this.dispatchToStore('workspace', 'device', device);
				// 		if (device.status === 'DISCONNECTED') {
				// 			this.dispatchToStore('workspace', 'device', undefined);
				// 		}
				// 	}
				// 	else {
				// 		this.warn('Trying to update status from device ' + device.id + ' (' + device.type + ') while device is the selected one');
				// 	}
				// });
				this.dispatchToStore('workspace', 'device', update);
			}
			// if the device has no type, disconnect it
			// TODO should this display an error?
		}
		else {
			this.showError('DEVICE_UNKNOWN_TYPE', {
				type: device.type
			});
		}
	},
	/**
	 * Returns a device from the store. 
	 * 
	 * This function has no parameters and it's using the **getFromStore** function, 
	 * which returns a **device** object, with all its properties. It's useful to work with it each 
	 * time you want to manipulate the currently connected device and you need to know its type.
	 *
	 * @example
	 * 
	 * let device = getDevice ();
	 */
	getDevice() {
		return this.getFromStore('workspace', 'device');
	},

	/**
	 * This function returns the status of a device.
	 * 
	 * The function has no parameters and calls the **getFromStore** function, which returns
	 * from the workspace store a string representing the current status of the device 
	 * the user tries to work with.
	 * 
	 * @example
	 * 
	 * let status = getStatus();
	 */
	getStatus() {
		return this.getFromStore('workspace', 'status');
	},

	/**
	 * Returns a devices from the store. 
	 * 
	 * This function has no parameters and it's using the **getFromStore** function, 
	 * which returns a **device[]** object, with all its properties. It's useful to work with it each 
	 * time you want to manipulate the currently connected device and you need to know its type.
	 *
	 * @example
	 * 
	 * let devices = getDevices ();
	 */
	getDevices () {
		return this.getFromStore('workspace', 'devices');
	},

	/**
	 * This function disconnects the currently connected device from Wyliodrin STUDIO, which means 
	 * that it deletes the connections and characteristics of this device, as reported by the type 
	 * of disconnection that the user chooses:
	 *
	 * *StandBy* - 
	 * 
	 * *Disconnect* - 
	 * 
	 * *Turn Off* -
	 *
	 */
	async disconnect() {
		// TODO should check for existing connection?
		let device = this.getDevice();
		if (device) {
			let deviceDriver = deviceDrivers[device.type];
			if (deviceDriver) {
				await deviceDriver.disconnect(device);
				// TODO wait some time and then disconnect anyway
			}
			else {
				this.error('There is no driver for the current device (' + device.type + ')');
			}
		}
		else {
			this.warn('There is no connected device, nothing to disconnect from');
		}
	},

	/**
	 * Close
	 */
	async close() {
		if (!closeAsking) {
			closeAsking = true;
			let value = await workspace.showConfirmationPrompt('EXIT', 'WORKSPACE_TOOLBAR_EXIT_QUESTION');

			if (value) {
				system.close();
			}

			// eslint-disable-next-line require-atomic-updates
			closeAsking = false;
		}
	},

	/**
	 * Display warning
	 */
	warn() {
		/* eslint-disable-next-line  no-console */
		console.warn('WARNING: ', ...arguments);
	},

	/**
	 * Display error
	 */
	error() {
		/* eslint-disable-next-line  no-console */
		console.error('ERROR: ', ...arguments);
	},

	/**
	 * Returns the unique token for the application
	 */
	getToken ()
	{
		return studio.settings.loadValue('workspace', 'userid', null);
	},

	/**
	 * Sets the language of the application in the store
	 * @param {String} languageId 
	 */
	setLanguage(languageId)
	{
		studio.settings.storeValue('workspace','language',languageId);
	},

	/**
	 * Returns the language of the application
	 */
	getLanguage ()
	{
		return studio.settings.loadValue('workspace','language',getLanguage ());
	}
};

function setup(options, imports, register) {

	studio = imports;
	
	let newToken = Object(uuid__WEBPACK_IMPORTED_MODULE_7__["v4"]) ();
	let token = imports.settings.loadValue('workspace', 'userid', newToken);
	if (token == newToken) imports.settings.storeValue('workspace', 'userid', token);

	system = imports.system;
	system.events.on('close-ask', () => {
		workspace.close();
	});
	
	vue__WEBPACK_IMPORTED_MODULE_1__["default"].use(vue_i18n__WEBPACK_IMPORTED_MODULE_3__["default"]);
	vue__WEBPACK_IMPORTED_MODULE_1__["default"].use(vuetify__WEBPACK_IMPORTED_MODULE_2___default.a, {
		font: 'mdi',
		iconfont: 'mdi'
	});
	vue__WEBPACK_IMPORTED_MODULE_1__["default"].use(vuex__WEBPACK_IMPORTED_MODULE_4__["default"]);

	/* Store */
	workspace.store = new vuex__WEBPACK_IMPORTED_MODULE_4__["default"].Store({
		modules: {},
		strict: "none" !== 'production'
	});

	/* Register the store */
	workspace.registerStore('workspace', _store__WEBPACK_IMPORTED_MODULE_14__["default"]);

	settings = imports.settings;
	let mode = settings.loadValue('workspace', 'mode', 'simple');

	workspace.dispatchToStore('workspace', 'mode', mode);

	register(null, {
		workspace: workspace
	});
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),

/***/ 1764:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Studio_vue_vue_type_template_id_1cd1ba35___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1765);
/* harmony import */ var _Studio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1767);
/* empty/unused harmony star reexport *//* harmony import */ var _Studio_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1799);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Studio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Studio_vue_vue_type_template_id_1cd1ba35___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Studio_vue_vue_type_template_id_1cd1ba35___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/studio/workspace/views/Studio.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1765:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Studio_vue_vue_type_template_id_1cd1ba35___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1766);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Studio_vue_vue_type_template_id_1cd1ba35___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Studio_vue_vue_type_template_id_1cd1ba35___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1766:
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
    "v-app",
    [_c("Toolbar"), _vm._v(" "), _c("Workspace"), _vm._v(" "), _c("Status")],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1767:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_Studio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1768);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_Studio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1768:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _Toolbar_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1769);
/* harmony import */ var _Workspace_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1789);
/* harmony import */ var _Status_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1794);
//
//
//
//
//
//
//
//






/* eslint-disable-next-line no-console */
console.log ('Loading Studio');
/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0__["default"].extend ({
	name: 'Studio',
	components: {
		Toolbar: _Toolbar_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
		Workspace: _Workspace_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
		Status: _Status_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
	},
	data()
	{
		return {
			
		};
	},
	created ()
	{
		
	},
	methods: {
		
	}
}));


/***/ }),

/***/ 1769:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Toolbar_vue_vue_type_template_id_e8902ea8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1770);
/* harmony import */ var _Toolbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1772);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Toolbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Toolbar_vue_vue_type_template_id_e8902ea8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Toolbar_vue_vue_type_template_id_e8902ea8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/studio/workspace/views/Toolbar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1770:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Toolbar_vue_vue_type_template_id_e8902ea8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1771);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Toolbar_vue_vue_type_template_id_e8902ea8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Toolbar_vue_vue_type_template_id_e8902ea8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1771:
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
    "v-toolbar",
    { staticClass: "titlebar" },
    [
      _c(
        "v-toolbar-title",
        [
          _c("v-img", {
            staticClass: "logo",
            attrs: {
              src:
                "plugins/studio/workspace/data/img/logo/wyliodrin-small-logo.png",
              alt: "Wyliodrin",
              title: "Wyliodrin"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("v-spacer"),
      _vm._v(" "),
      _c(
        "v-toolbar-items",
        { staticClass: "hidden-sm-and-down titlebar-buttons" },
        [
          _c("LanguageMenu"),
          _vm._v(" "),
          _vm._l(_vm.toolbarButtons, function(toolbarButton) {
            return _c(
              "v-tooltip",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: toolbarButton.visible(),
                    expression: "toolbarButton.visible()"
                  }
                ],
                key: toolbarButton.name,
                attrs: { bottom: "", disabled: !toolbarButton.enabled() },
                scopedSlots: _vm._u(
                  [
                    {
                      key: "activator",
                      fn: function(ref) {
                        var on = ref.on
                        return [
                          _c(
                            "v-btn",
                            _vm._g(
                              {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: toolbarButton.visible(),
                                    expression: "toolbarButton.visible()"
                                  }
                                ],
                                attrs: { disabled: !toolbarButton.enabled() },
                                on: {
                                  click: function($event) {
                                    $event.stopPropagation()
                                    return toolbarButton.action($event)
                                  }
                                }
                              },
                              on
                            ),
                            [
                              _c("img", {
                                attrs: {
                                  src: toolbarButton.iconURL,
                                  alt: _vm.$t(toolbarButton.name),
                                  hspace: "50"
                                }
                              })
                            ]
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
                _c("span", [_vm._v(_vm._s(_vm.$t(toolbarButton.name)))])
              ]
            )
          }),
          _vm._v(" "),
          _c("Menu"),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "toggle-connection" },
            [
              _c("DeviceTools"),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "status label c-status",
                  class: "label-" + _vm.status.toLowerCase()
                },
                [_vm._v(_vm._s(_vm.$t("WORKSPACE_STATUS_" + _vm.status)))]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "triangle" })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "window-control" },
            [
              _c(
                "v-tooltip",
                {
                  attrs: { left: "" },
                  scopedSlots: _vm._u([
                    {
                      key: "activator",
                      fn: function(data) {
                        return [
                          _c(
                            "v-btn",
                            {
                              staticClass: "window-button",
                              attrs: { text: "" },
                              on: { click: _vm.exit }
                            },
                            [
                              _c(
                                "v-img",
                                _vm._g(
                                  {
                                    attrs: {
                                      src:
                                        "plugins/studio/workspace/data/img/icons/closeapp-icon.svg",
                                      "aria-label": _vm.$t(
                                        "WORKSPACE_TOOLBAR_EXIT"
                                      )
                                    }
                                  },
                                  data.on
                                )
                              )
                            ],
                            1
                          )
                        ]
                      }
                    }
                  ])
                },
                [
                  _vm._v(" "),
                  _c("span", [_vm._v(_vm._s(_vm.$t("WORKSPACE_TOOLBAR_EXIT")))])
                ]
              ),
              _vm._v(" "),
              _c(
                "v-tooltip",
                {
                  attrs: { left: "" },
                  scopedSlots: _vm._u([
                    {
                      key: "activator",
                      fn: function(data) {
                        return [
                          _c(
                            "v-btn",
                            {
                              staticClass: "window-button",
                              attrs: { text: "" },
                              on: { click: _vm.fullscreen }
                            },
                            [
                              _c(
                                "v-img",
                                _vm._g(
                                  {
                                    attrs: {
                                      src:
                                        "plugins/studio/workspace/data/img/icons/maximize-icon.svg",
                                      "aria-label": _vm.$t(
                                        "WORKSPACE_TOOLBAR_FULLSCREEN"
                                      )
                                    }
                                  },
                                  data.on
                                )
                              )
                            ],
                            1
                          )
                        ]
                      }
                    }
                  ])
                },
                [
                  _vm._v(" "),
                  _c("span", [
                    _vm._v(_vm._s(_vm.$t("WORKSPACE_TOOLBAR_FULLSCREEN")))
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "v-tooltip",
                {
                  attrs: { left: "" },
                  scopedSlots: _vm._u([
                    {
                      key: "activator",
                      fn: function(data) {
                        return [
                          _c(
                            "v-btn",
                            {
                              staticClass: "window-button",
                              attrs: { text: "" },
                              on: { click: _vm.minimize }
                            },
                            [
                              _c(
                                "v-img",
                                _vm._g(
                                  {
                                    attrs: {
                                      src:
                                        "plugins/studio/workspace/data/img/icons/minimize-icon.svg",
                                      "aria-label": _vm.$t(
                                        "WORKSPACE_TOOLBAR_MINIMIZE"
                                      )
                                    }
                                  },
                                  data.on
                                )
                              )
                            ],
                            1
                          )
                        ]
                      }
                    }
                  ])
                },
                [
                  _vm._v(" "),
                  _c("span", [
                    _vm._v(_vm._s(_vm.$t("WORKSPACE_TOOLBAR_MINIMIZE")))
                  ])
                ]
              )
            ],
            1
          )
        ],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1772:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_Toolbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1773);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_Toolbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1773:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _LanguageMenu_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1774);
/* harmony import */ var _Menu_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1779);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(39);
/* harmony import */ var _DeviceTools_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1784);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0__["default"].extend ({
	name: 'Toolbar',
	components: {
		LanguageMenu: _LanguageMenu_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
		DeviceTools: _DeviceTools_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
		// ProjectsLibrary,
		Menu: _Menu_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
	},
	computed: {
		...Object(vuex__WEBPACK_IMPORTED_MODULE_3__["mapGetters"]) ({
			toolbarButtons: 'workspace/toolbarButtons',
			device: 'workspace/device',
			status: 'workspace/status',
		})
	},
	methods: {
		minimize ()
		{
			this.studio.system.minimize ();
		},
		fullscreen ()
		{
			this.studio.system.fullscreen ();
		},
		exit ()
		{
			this.studio.workspace.close ();
		}
	}
}));


/***/ }),

/***/ 1774:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LanguageMenu_vue_vue_type_template_id_6cad3114___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1775);
/* harmony import */ var _LanguageMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1777);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _LanguageMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LanguageMenu_vue_vue_type_template_id_6cad3114___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LanguageMenu_vue_vue_type_template_id_6cad3114___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/studio/workspace/views/LanguageMenu.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1775:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageMenu_vue_vue_type_template_id_6cad3114___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1776);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageMenu_vue_vue_type_template_id_6cad3114___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageMenu_vue_vue_type_template_id_6cad3114___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1776:
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
    "v-tooltip",
    {
      attrs: { bottom: "" },
      scopedSlots: _vm._u([
        {
          key: "activator",
          fn: function(ref) {
            var menu = ref.on
            return [
              _c(
                "v-menu",
                {
                  attrs: { "offset-y": "", "close-on-click": "" },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "activator",
                        fn: function(ref) {
                          var tooltip = ref.on
                          return [
                            _c(
                              "v-btn",
                              _vm._g({}, Object.assign({}, tooltip, menu)),
                              [
                                _c("v-img", {
                                  attrs: {
                                    src: _vm.languageImage,
                                    "aria-label": "Language",
                                    eager: true
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
                  _c(
                    "v-list",
                    { staticClass: "menu" },
                    _vm._l(_vm.LANGUAGES, function(languageName, languageId) {
                      return _c(
                        "v-list-item",
                        {
                          key: languageId,
                          on: {
                            click: function($event) {
                              _vm.setLanguage(languageId)
                            }
                          }
                        },
                        [
                          _c(
                            "v-list-item-avatar",
                            { attrs: { item: "", size: "20" } },
                            [
                              _c("v-img", {
                                attrs: {
                                  src:
                                    "plugins/studio/workspace/data/img/flags/" +
                                    languageId +
                                    ".png"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("v-list-item-title", [
                            _vm._v(_vm._s(languageName))
                          ])
                        ],
                        1
                      )
                    }),
                    1
                  )
                ],
                1
              )
            ]
          }
        }
      ])
    },
    [_vm._v(" "), _c("span", [_vm._v("Language")])]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1777:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1778);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1778:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1631);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	name: 'LanguageMenu',
	data () {
		return {
			LANGUAGES: vue__WEBPACK_IMPORTED_MODULE_0__["default"].translation.LANGUAGES
		};
	},
	computed: {
		languageImage ()
		{
			return 'plugins/studio/workspace/data/img/flags/'+this.$i18n.locale+'.png';
		}
	},
	methods: {
		setLanguage (languageId)
		{
			// TODO
			this.$i18n.locale = languageId;
			// Trigger resize to make sure UI elements get updated
			jquery__WEBPACK_IMPORTED_MODULE_1___default()(window).trigger ('resize');
			this.studio.workspace.setLanguage(languageId);
		}
	}
});


/***/ }),

/***/ 1779:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Menu_vue_vue_type_template_id_0840befe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1780);
/* harmony import */ var _Menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1782);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Menu_vue_vue_type_template_id_0840befe___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Menu_vue_vue_type_template_id_0840befe___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/studio/workspace/views/Menu.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1780:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Menu_vue_vue_type_template_id_0840befe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1781);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Menu_vue_vue_type_template_id_0840befe___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Menu_vue_vue_type_template_id_0840befe___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1781:
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
    "v-tooltip",
    {
      attrs: { bottom: "" },
      scopedSlots: _vm._u([
        {
          key: "activator",
          fn: function(ref) {
            var menu = ref.on
            return [
              _c(
                "v-menu",
                {
                  attrs: {
                    "offset-y": "",
                    "close-on-content-click": "",
                    "close-on-click": ""
                  },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "activator",
                        fn: function(ref) {
                          var tooltip = ref.on
                          return [
                            _c(
                              "v-btn",
                              _vm._g(
                                {
                                  staticClass: "cucu",
                                  attrs: { slot: "activator" },
                                  slot: "activator"
                                },
                                Object.assign({}, tooltip, menu)
                              ),
                              [
                                _c("v-img", {
                                  attrs: {
                                    src:
                                      "plugins/studio/workspace/data/img/icons/menu-icon.svg",
                                    "aria-label": "Menu"
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
                  _c(
                    "v-list",
                    { staticClass: "menu" },
                    _vm._l(_vm.menuItems, function(menuItem) {
                      return _c(
                        "v-list-item",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: menuItem.visible(),
                              expression: "menuItem.visible()"
                            }
                          ],
                          key: menuItem.name,
                          attrs: { disabled: !menuItem.enabled() },
                          on: {
                            click: function($event) {
                              _vm.runMenuItem(menuItem)
                            }
                          }
                        },
                        [
                          _c("v-list-item-title", [
                            _vm._v(_vm._s(_vm.$t(menuItem.name)))
                          ])
                        ],
                        1
                      )
                    }),
                    1
                  )
                ],
                1
              )
            ]
          }
        }
      ])
    },
    [_vm._v(" "), _c("span", [_vm._v("Menu")])]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1782:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_Menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1783);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_Menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1783:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);
//
//
//
//
//
//
//
//
//
//
//
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
	name: 'Menu',
	data ()
	{
		return {
			
		};
	},
	computed: Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"]) ({
		menuItems: 'workspace/menuItems'
	}),
	methods: 
	{
		runMenuItem (menuItem)
		{
			menuItem.action ();
		}
	}
});


/***/ }),

/***/ 1784:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DeviceTools_vue_vue_type_template_id_eafbf654___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1785);
/* harmony import */ var _DeviceTools_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1787);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DeviceTools_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DeviceTools_vue_vue_type_template_id_eafbf654___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DeviceTools_vue_vue_type_template_id_eafbf654___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/studio/workspace/views/DeviceTools.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1785:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DeviceTools_vue_vue_type_template_id_eafbf654___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1786);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DeviceTools_vue_vue_type_template_id_eafbf654___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DeviceTools_vue_vue_type_template_id_eafbf654___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1786:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return !_vm.offline
    ? _c("div", [
        _c(
          "div",
          { staticClass: "connected-menu" },
          [
            _c(
              "div",
              {
                staticClass: "left connected-device-box",
                on: {
                  click: function($event) {
                    $event.stopPropagation()
                    return _vm.settings($event)
                  }
                }
              },
              [
                _c("span", { staticClass: "device-title" }, [
                  _vm._v(_vm._s(_vm.device.name))
                ]),
                _vm._v(" "),
                _c("span", { staticClass: "device-port" }, [
                  _vm._v(_vm._s(_vm.device.address))
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "device" },
                  [_c("v-img", { attrs: { src: _vm.device.icon } })],
                  1
                )
              ]
            ),
            _vm._v(" "),
            _vm._l(_vm.deviceToolButtonsFilter, function(deviceToolButton) {
              return _c(
                "v-tooltip",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: deviceToolButton.visible(),
                      expression: "deviceToolButton.visible()"
                    }
                  ],
                  key: deviceToolButton.name,
                  attrs: { bottom: "" },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "activator",
                        fn: function(data) {
                          return [
                            _c(
                              "v-btn",
                              {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: deviceToolButton.visible(),
                                    expression: "deviceToolButton.visible()"
                                  }
                                ],
                                class: deviceToolButton.buttonType + "-bt",
                                attrs: {
                                  text: "",
                                  disabled: !deviceToolButton.enabled()
                                },
                                on: {
                                  click: function($event) {
                                    $event.stopPropagation()
                                    return deviceToolButton.action()
                                  }
                                }
                              },
                              [
                                _c(
                                  "v-img",
                                  _vm._g(
                                    {
                                      attrs: {
                                        src: deviceToolButton.iconURL,
                                        "aria-label": _vm.$t(
                                          deviceToolButton.name
                                        )
                                      }
                                    },
                                    data.on
                                  )
                                )
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
                  _c("span", [_vm._v(_vm._s(_vm.$t(deviceToolButton.name)))])
                ]
              )
            }),
            _vm._v(" "),
            _c(
              "v-tooltip",
              {
                attrs: { bottom: "" },
                scopedSlots: _vm._u(
                  [
                    {
                      key: "activator",
                      fn: function(data) {
                        return [
                          _c(
                            "v-btn",
                            {
                              attrs: { text: "" },
                              on: { click: _vm.disconnect }
                            },
                            [
                              _c(
                                "v-img",
                                _vm._g(
                                  {
                                    attrs: {
                                      src:
                                        "plugins/studio/workspace/data/img/icons/turn-off-icon.svg",
                                      "aria-label": _vm.$t(
                                        "WORKSPACE_DEVICE_DISCONNECT"
                                      )
                                    }
                                  },
                                  data.on
                                )
                              )
                            ],
                            1
                          )
                        ]
                      }
                    }
                  ],
                  null,
                  false,
                  2253113487
                )
              },
              [
                _vm._v(" "),
                _c("span", [
                  _vm._v(_vm._s(_vm.$t("WORKSPACE_DEVICE_DISCONNECT")))
                ])
              ]
            )
          ],
          2
        )
      ])
    : _c(
        "v-layout",
        { attrs: { row: "", "justify-center": "" } },
        [
          _c(
            "v-btn",
            {
              attrs: { dark: "" },
              on: { click: _vm.showConnectionSelectionDialog }
            },
            [_vm._v(_vm._s(_vm.$t("WORKSPACE_DEVICE_CONNECT")))]
          )
        ],
        1
      )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1787:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_DeviceTools_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1788);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_DeviceTools_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1788:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	name: 'DeviceTools',
	data () {
		return {
			
		};
	},
	computed: {
		...Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"]) ({
			deviceToolButtons: 'workspace/deviceToolButtons',
			device: 'workspace/device',
			status: 'workspace/status',
		}),
		offline () {
			return this.status === 'DISCONNECTED';
		},
		deviceToolButtonsFilter () {
			return this.deviceToolButtons.filter (deviceToolButton => deviceToolButton.type === this.device.type);
		}
	},
	methods: {
		async showConnectionSelectionDialog ()
		{
			let device = await this.studio.workspace.showConnectionSelectionDialog ();
			if (device)
			{
				this.studio.workspace.connect (device);
			}
		},
		settings ()
		{
			this.studio.workspace.showDeviceSettingsDialog ();
		},
		disconnect ()
		{
			this.studio.workspace.disconnect ();
		}
	}
});


/***/ }),

/***/ 1789:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Workspace_vue_vue_type_template_id_4fbaeaf4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1790);
/* harmony import */ var _Workspace_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1792);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Workspace_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Workspace_vue_vue_type_template_id_4fbaeaf4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Workspace_vue_vue_type_template_id_4fbaeaf4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/studio/workspace/views/Workspace.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1790:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Workspace_vue_vue_type_template_id_4fbaeaf4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1791);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Workspace_vue_vue_type_template_id_4fbaeaf4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Workspace_vue_vue_type_template_id_4fbaeaf4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1791:
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
    { staticClass: "h-top" },
    [
      _c("div", { staticClass: "projname" }, [_vm._v(_vm._s(_vm.title))]),
      _vm._v(" "),
      _c(
        "v-tabs",
        {
          ref: "tabs",
          staticClass: "tabs-box",
          attrs: { right: "" },
          model: {
            value: _vm.active,
            callback: function($$v) {
              _vm.active = $$v
            },
            expression: "active"
          }
        },
        _vm._l(_vm.tabs, function(tab) {
          return _c(
            "v-tab",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: tab.visible(),
                  expression: "tab.visible()"
                }
              ],
              key: tab.name,
              attrs: { ripple: "", disabled: !tab.enabled() }
            },
            [_vm._v("\n\t\t\t" + _vm._s(_vm.$t(tab.name)) + "\n\t\t")]
          )
        }),
        1
      ),
      _vm._v(" "),
      _c(
        "v-tabs-items",
        {
          model: {
            value: _vm.active,
            callback: function($$v) {
              _vm.active = $$v
            },
            expression: "active"
          }
        },
        _vm._l(_vm.tabs, function(tab) {
          return _c(
            "v-tab-item",
            {
              key: tab.name,
              staticClass: "h-top2",
              attrs: {
                eager: "",
                transition: false,
                "reverse-transition": false
              }
            },
            [
              _c(tab.component, {
                tag: "component",
                attrs: { active: _vm.isActive(tab) }
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

/***/ 1792:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_Workspace_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1793);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_Workspace_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1793:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);
//
//
//
//
//
//
//
//
//
//
//
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
	name: 'Workspace',
	data () {
		return {
			
		};
	},
	components: {
		
	},
	computed: {
		active: {
			get ()
			{
				return this.$store.getters['workspace/activeTab'];
			},
			set (value)
			{
				this.$store.dispatch('workspace/activeTab', value);
			} 	
		},
		...Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"]) ({
			tabs: 'workspace/tabs',
			title: 'workspace/title'
		})
	},
	methods: {
		isActive (tab)
		{
			return tab.name === this.tabs[this.active].name;
		}
	},
	updated ()
	{
		this.$refs.tabs.callSlider ();
	}
});


/***/ }),

/***/ 1794:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Status_vue_vue_type_template_id_62507251___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1795);
/* harmony import */ var _Status_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1797);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Status_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Status_vue_vue_type_template_id_62507251___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Status_vue_vue_type_template_id_62507251___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/studio/workspace/views/Status.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1795:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Status_vue_vue_type_template_id_62507251___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1796);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Status_vue_vue_type_template_id_62507251___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Status_vue_vue_type_template_id_62507251___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1796:
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
    "v-system-bar",
    { attrs: { dark: "", color: "light" } },
    [
      _c("v-spacer"),
      _vm._v(" "),
      _vm._l(_vm.statusButtons, function(statusButton, index) {
        return _c(
          "span",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: statusButton.visible(),
                expression: "statusButton.visible()"
              }
            ],
            key: statusButton.name,
            staticClass: "status-btn",
            attrs: { disabled: !statusButton.enabled() },
            on: {
              click: function($event) {
                _vm.action(statusButton)
              }
            }
          },
          [
            _c(
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
                            _vm._g({}, on),
                            [
                              _c("v-img", {
                                attrs: { src: statusButton.iconURL }
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
                _c("span", [_vm._v(_vm._s(_vm.$t(statusButton.name)))])
              ]
            ),
            _vm._v(" "),
            _c(
              "v-bottom-sheet",
              {
                attrs: {
                  value: _vm.activeStatusButton === statusButton.name,
                  persistent: "",
                  "hide-overlay": !statusButton.overlay(),
                  eager: "",
                  inset: statusButton.inset(),
                  "retain-focus": false,
                  "no-click-animation": true
                },
                on: {
                  keydown: function($event) {
                    if (
                      !$event.type.indexOf("key") &&
                      _vm._k($event.keyCode, "esc", 27, $event.key, [
                        "Esc",
                        "Escape"
                      ])
                    ) {
                      return null
                    }
                    return _vm.close(index)
                  }
                }
              },
              [
                _c(
                  "v-sheet",
                  {
                    staticClass: "text-center",
                    attrs: { height: statusButton.height() }
                  },
                  [
                    _c(statusButton.component, {
                      ref: "statusButton",
                      refInFor: true,
                      tag: "component",
                      attrs: {
                        active: _vm.activeStatusButton === statusButton.name
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
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1797:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_Status_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1798);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_Status_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1798:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//
//
//
//
//
//
//
//
//
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
	name: 'Status',
	data () {
		return {
			
		};
	},
	computed: {
		...Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"]) ({
			statusButtons: 'workspace/statusButtons',
			activeStatusButton: 'workspace/activeStatusButton'
		})
	},
	methods: {
		action (statusButton)
		{
			if (this.activeStatusButton !== statusButton.name)
			{
				this.$store.dispatch ('workspace/activeStatusButton', statusButton.name);
			}
			else
			{
				this.$store.dispatch ('workspace/activeStatusButton', '');
			}
		},
		close (position)
		{
			if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isFunction (this.$refs.statusButton[position].esc)) this.$refs.statusButton[position].esc ();
		}
	}
});


/***/ }),

/***/ 1799:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Studio_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1800);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Studio_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Studio_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Studio_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Studio_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Studio_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1800:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1801);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("14d0ce39", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 1801:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
var ___CSS_LOADER_AT_RULE_IMPORT_0___ = __webpack_require__(1802);
var ___CSS_LOADER_AT_RULE_IMPORT_1___ = __webpack_require__(1803);
var ___CSS_LOADER_AT_RULE_IMPORT_2___ = __webpack_require__(1804);
var ___CSS_LOADER_AT_RULE_IMPORT_3___ = __webpack_require__(1805);
exports = ___CSS_LOADER_API_IMPORT___(false);
exports.i(___CSS_LOADER_AT_RULE_IMPORT_0___);
exports.i(___CSS_LOADER_AT_RULE_IMPORT_1___);
exports.i(___CSS_LOADER_AT_RULE_IMPORT_2___);
exports.i(___CSS_LOADER_AT_RULE_IMPORT_3___);
// Module
exports.push([module.i, ".w-100 {\n  width: 100%;\n}\n.w-90 {\n  width: 90%;\n}\n.w-80 {\n  width: 80%;\n}\n.w-70 {\n  width: 70%;\n}\n.w-60 {\n  width: 60%;\n}\n.w-50 {\n  width: 50%;\n}\n.w-40 {\n  width: 40%;\n}\n.w-30 {\n  width: 30%;\n}\n.w-20 {\n  width: 20%;\n}\n.w-10 {\n  width: 10%;\n}\n.hs-0 {\n  height: 0% !important;\n}\n.hs-35 {\n  height: 35% !important;\n}\n.hs-65 {\n  height: 65% !important;\n}\n.hs-100 {\n  height: calc(100vh - 158px) !important;\n}\n.rel {\n  position: relative;\n}\n.text-center {\n  text-align: center;\n}\n.text-left {\n  text-align: left;\n}\n.text-right {\n  text-align: right;\n}\n.h-top {\n  height: calc(100vh - 90px);\n}\n.h-top2 {\n  height: calc(100vh - 158px);\n}\n.left {\n  float: left !important;\n}\n.right {\n  float: right !important;\n}\n.p-20 {\n  padding: 20px;\n}\nhtml {\n  overflow: hidden;\n}\nbody {\n  font-size: 13px;\n  color: #000000;\n  overflow: hidden;\n}\na {\n  color: #e54225;\n  text-decoration: none;\n}\na:hover {\n  text-decoration: underline;\n}\n.v-btn {\n  letter-spacing: 0;\n}\n.v-toolbar__content,\n.v-toolbar__extension {\n  padding: 0;\n}\n.titlebar {\n  -webkit-user-select: none;\n  -webkit-app-region: drag;\n  height: 90px;\n  background: #191e25 !important;\n}\n.titlebar .v-toolbar__content {\n  height: 90px !important;\n}\n.v-card__text {\n  padding: 16px !important;\n}\n.v-menu button {\n  text-transform: none;\n  color: #ffffff !important;\n  min-width: 50px;\n  margin: 23px 10px 0 0 !important;\n  height: 50px !important;\n  box-shadow: none !important;\n  background: transparent !important;\n}\n.v-menu button > div {\n  padding: 13px;\n}\n.v-menu button > div > div {\n  height: 24px;\n  width: 24px;\n}\n.v-menu button:hover {\n  background: #e54225 !important;\n}\n.titlebar-buttons {\n  height: 50px;\n  -webkit-app-region: no-drag;\n}\n.titlebar-buttons button {\n  background: transparent !important;\n  box-shadow: none !important;\n  min-width: initial !important;\n}\n.titlebar-buttons button .v-image__image {\n  height: 24px;\n  width: 24px;\n}\n.titlebar-buttons button .v-responsive__content {\n  width: 24px !important;\n}\n.titlebar-buttons > button {\n  margin: 0px 1px !important;\n  border-radius: 3px !important;\n  max-width: 50px;\n  padding: 13px !important;\n}\n.titlebar-buttons > button > span > img {\n  height: 24px;\n  width: 24px;\n}\n.titlebar-buttons button:hover {\n  background: #e54225 !important;\n}\n.titlebar-buttons > div > div > div {\n  -webkit-app-region: no-drag;\n}\n.logo {\n  width: 155px;\n  height: 50px;\n  margin: 0px 0 0 15px;\n}\n.toggle-connection {\n  display: block;\n  background: #090b0d;\n  z-index: 80;\n  padding: 25px 25px 0;\n  position: relative;\n  margin-left: 30px;\n  height: 90px;\n  margin-top: -20px;\n}\n.toggle-connection button {\n  height: 36px !important;\n  background: #27292a !important;\n}\n.toggle-connection button > div {\n  padding: 0 12px!important;\n  line-height: 36px;\n}\n.toggle-connection button:hover {\n  background: #e54225 !important;\n  color: #ffffff !important;\n}\n.status {\n  padding: 10px;\n  float: left;\n  text-align: center;\n  color: #ffffff;\n  border-radius: 4px;\n  font-size: 12px;\n}\n.toggle-connection .triangle {\n  width: 0;\n  height: 0;\n  position: absolute;\n  z-index: 100;\n  left: -20px;\n  top: 0;\n  background: none !important;\n  border-bottom: 90px solid #090b0d;\n  border-left: 20px solid transparent;\n}\n.label-disconnected {\n  background: #a5a5a5;\n}\n.label-connected {\n  background: #468847;\n}\n.label-synchronizing,\n.label-install,\n.label-ping {\n  background: #5bc0de;\n}\n.label-connecting {\n  background: #f0ad4e;\n}\n.label-error {\n  background: #d9534f;\n}\n.label {\n  display: inline;\n  font-size: 75%;\n  font-weight: bold;\n  line-height: 1;\n  color: #ffffff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.25em;\n}\n.c-status {\n  position: fixed;\n  left: 200px;\n  top: 32px;\n  font-size: 11px;\n}\n.window-control {\n  display: block;\n  z-index: 80;\n  padding: 10px 5px;\n  height: 90px;\n  position: relative;\n  margin-left: 0px;\n  max-width: 34px;\n  margin-top: -20px;\n}\n.window-control button {\n  background: transparent !important;\n}\n.window-control button:hover {\n  background: #e54225 !important;\n}\n.window-button {\n  -webkit-app-region: no-drag;\n  height: initial !important;\n  width: 24px !important;\n  height: 24px !important;\n  min-width: initial;\n  line-height: initial;\n  border-radius: 0;\n  min-height: initial !important;\n  margin: 0px !important;\n  padding: 0px !important;\n  top: -1px;\n}\n.window-button > div {\n  padding: 0 !important;\n  width: 24px !important;\n  height: 24px !important;\n}\n.tabs-box > div {\n  background-color: #e5eef1 !important;\n}\n.tabs-box .v-tabs-slider-wrapper {\n  height: 4px !important;\n}\n.tabs-box .v-tabs-slider {\n  background-color: #e54225 !important;\n  border-color: #e54225 !important;\n}\n.tabs-box .v-tab--active {\n  color: #000000 !important;\n}\n.tabs-box .v-tabs__item .v-image {\n  width: 24px;\n  margin-right: 3px;\n}\n.tabs-box .v-tabs__item .v-image__image {\n  background-position: center 1px;\n}\n.v-system-bar {\n  margin-top: -20px;\n  height: 20px !important;\n  position: relative;\n  z-index: 100;\n  background: #191e25 !important;\n}\n.v-system-bar .status-btn {\n  position: relative;\n  cursor: pointer;\n  text-align: center;\n  margin-top: -20px;\n  margin-left: 5px;\n}\n.v-system-bar button {\n  border: #868686 0px solid;\n  border-radius: 30px;\n  min-width: initial !important;\n  background-color: #3c5459 !important;\n  color: #ffffff !important;\n  font-size: 12px;\n  text-transform: initial;\n  font-weight: 300;\n  height: 24px !important;\n  padding: 0 7px !important;\n  margin: 0px !important;\n  box-shadow: none !important;\n}\n.v-system-bar button .v-image {\n  height: 10px;\n  width: 10px;\n  filter: invert(100%) !important;\n}\n.v-system-bar button .v-responsive__content {\n  width: 14px !important;\n}\n.v-system-bar button:hover {\n  border: #e54225 0px solid;\n  background-color: #e54225 !important;\n  color: #ffffff;\n}\n.application a:hover {\n  text-decoration: none;\n}\n.projname {\n  position: absolute;\n  background: none;\n  top: 100px;\n  left: 20px;\n  color: #000000;\n  z-index: 1;\n  font-size: 20px;\n  letter-spacing: 0.005em;\n  font-weight: 400;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  max-width: 30%;\n  text-align: left;\n  white-space: nowrap;\n}\n.dirname {\n  position: absolute;\n  background: none;\n  top: 100px;\n  left: 20px;\n  color: #000000;\n  z-index: 1;\n  font-size: 20px;\n  letter-spacing: 0.005em;\n  font-weight: 400;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  max-width: 30%;\n  text-align: left;\n  direction: rtl;\n  white-space: nowrap;\n}\n.v-card__title {\n  background: #3c5459;\n  color: #ffffff;\n}\n.headline {\n  font-size: 20px !important;\n}\n.v-avatar .v-icon,\n.v-avatar .v-image,\n.v-avatar img {\n  border-radius: 0 !important;\n  display: block !important;\n  height: initial !important;\n  width: initial !important;\n}\n.v-avatar {\n  border-radius: 0;\n}\n.v-list-item__avatar:first-child {\n  margin-right: 15px;\n}\n.connection-box {\n  overflow: hidden;\n}\n.connection-box .v-card__text {\n  max-height: 50%;\n  overflow-y: scroll;\n}\n.connection-box .itemlist {\n  display: flex;\n  padding: 0;\n  margin: 5px 0;\n  min-height: 90px;\n  overflow-x: hidden;\n  overflow-y: auto;\n  flex-wrap: wrap;\n}\n.connection-box .itemlist > div {\n  max-width: 33%;\n  flex-basis: 33%;\n}\n.connection-box .itemlist a {\n  min-height: 90px !important;\n  height: 90px !important;\n}\n.connection-box .itemlist .board-connect-title {\n  width: 100%;\n  text-align: left;\n  line-height: 25px;\n  color: #000000;\n  text-transform: none;\n  font-weight: bold;\n}\n.connection-box .itemlist .board-connect-type {\n  width: 100%;\n  text-align: left;\n  font-size: 12px;\n  color: #000000 !important;\n  text-transform: none;\n  line-height: normal;\n}\n.connection-box .itemlist .board-connect-address {\n  width: 100%;\n  text-align: left;\n  font-size: 12px;\n  color: #000000 !important;\n  text-transform: none;\n  line-height: normal;\n}\n.connection-box .itemlist .v-avatar {\n  width: initial !important;\n  height: initial !important;\n  border-radius: 0;\n}\n.v-list.menu {\n  background-color: #3c5459 !important;\n  color: #ffffff !important;\n  padding: 0px !important;\n}\n.v-list.menu > div:hover {\n  background-color: #e54225 !important;\n  color: #ffffff !important;\n  cursor: pointer;\n}\n.v-dialog {\n  box-shadow: none;\n}\n.v-dialog .v-list {\n  background-color: #ffffff !important;\n  color: #000000 !important;\n}\n.v-dialog .v-list > div:hover {\n  background-color: #eaeaea !important;\n  color: #000000 !important;\n}\n.small-box {\n  width: 550px;\n  height: 365px;\n  overflow: hidden;\n}\n.small-box .itemlist {\n  flex-flow: wrap;\n}\n.small-box .v-card__text {\n  height: 68%;\n  overflow-y: scroll;\n}\n.small-box .v-avatar {\n  width: initial !important;\n  height: initial !important;\n  border-radius: 0;\n  padding-right: 25px;\n}\n.small-box a {\n  min-height: 130px !important;\n  height: 130px !important;\n}\n.small-box .v-list__tile__title {\n  cursor: pointer;\n  color: #000000;\n  font-size: 16px;\n  font-weight: bold;\n}\n.small-box .v-list__tile__sub-title {\n  cursor: pointer;\n  color: #000000 !important;\n  padding-TOP: 5px;\n  font-size: 13px;\n}\n.small-box .projlang {\n  padding: 3px;\n  font-size: 10px;\n  color: #333333;\n  background: #ffffff;\n  border-radius: 4px;\n  border: #cccccc 1px solid;\n  display: inline;\n  margin: 0 0 0 5px;\n  font-weight: normal;\n}\n.v-card__actions {\n  border-top-width: 1px;\n  border-top-style: solid;\n  border-top-color: #cccccc;\n}\n.v-card__actions .layout {\n  display: contents;\n}\n.v-card__title button,\n.v-card__title button:hover {\n  background: transparent !important;\n  text-decoration: #e54225 !important;\n  margin: 0 !important;\n  height: initial !important;\n  font-weight: 300;\n  max-height: 36px !important;\n  min-width: initial !important;\n}\n.v-card__title button > div,\n.v-card__title button:hover > div {\n  padding: 0 !important;\n}\n.v-card__title .v-btn:hover:before {\n  background-color: transparent;\n}\n.v-card__title button .v-image__image {\n  height: 24px;\n  width: 24px;\n  margin: auto;\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n}\n.v-card__title .title-icon-btn {\n  padding: 0px !important;\n  border-radius: 3px !important;\n}\n.v-card__title .title-icon-btn .v-btn__content {\n  width: 36px !important;\n  height: 36px !important;\n}\n.v-card__title .title-icon-btn:hover {\n  padding: 0px !important;\n  background: #e54225 !important;\n}\n.v-menu__content {\n  margin-top: -42px !important;\n  z-index: 999 !important;\n}\n.v-menu__content .menu .v-list-item__title {\n  color: #ffffff !important;\n  font-size: 14px !important;\n}\n.v-list__tile {\n  font-size: 14px !important;\n}\n.v-list__tile__action,\n.v-list__tile__avatar {\n  min-width: 30px;\n}\n.device {\n  position: absolute;\n  top: -5px;\n  left: -60px;\n  height: 48px;\n  width: 54px;\n}\n.device .v-image__image {\n  background-size: 48px auto !important;\n}\n.connected-menu {\n  margin-left: 45px;\n  float: left;\n  position: relative;\n}\n.connected-menu .connected-device-box {\n  min-width: 90px;\n  position: relative;\n}\n.connected-menu .device-title {\n  font-size: 18px;\n  font-weight: 500;\n  letter-spacing: 0.005em;\n  display: inline;\n  padding: 4px 20px 0 0px;\n  min-width: 100px;\n  color: #ffffff;\n  margin-left: -5px;\n}\n.connected-menu .device-port {\n  font-size: 10px;\n  position: absolute;\n  left: -5px;\n  top: 25px;\n  color: #cccccc;\n  width: 100%;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.connected-menu .v-btn {\n  padding: 0 13px !important;\n  margin-left: 5px !important;\n  border-radius: 3px !important;\n}\n.connected-menu .run-bt {\n  color: #d1d2d3 !important;\n  background-color: transparent !important;\n  text-transform: none;\n  color: #ffffff !important;\n  min-width: 50px;\n  border: #27292a solid 2px !important;\n}\n.connected-menu .run-bt:hover {\n  background: #468847 !important;\n  color: #ffffff !important;\n  border: #468847 solid 2px !important;\n}\n.connected-menu .stop-bt {\n  color: #d1d2d3 !important;\n  background-color: transparent !important;\n  text-transform: none;\n  color: #ffffff !important;\n  min-width: 50px;\n  border: #27292a solid 2px !important;\n}\n.connected-menu .stop-bt:hover {\n  background: #971c19 !important;\n  color: #ffffff !important;\n  border: #971c19 solid 2px !important;\n}\n.connected-menu .update-bt {\n  background: #971c19 !important;\n}\n.connected-menu .height-priority .v-image__image {\n  background-size: auto 24px !important;\n}\n.v-window code {\n  display: none !important;\n}\n.v-window__container {\n  background: #ffffff;\n  height: 100% !important;\n}\n.v-window-item img {\n  height: 100%;\n  width: auto;\n}\n.shell-box {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 0 100%;\n  flex: 1 0 100%;\n  min-width: 0;\n}\n.manager-box .v-card__text {\n  padding: 0;\n  overflow: hidden;\n  color: #000000;\n  max-height: 55vh;\n  padding: 0 !important;\n  min-height: 100px;\n  overflow: auto;\n}\n.manager-box .v-window {\n  overflow-y: auto;\n  overflow-x: hidden;\n  height: 45vh !important;\n}\n.manager-box .d-flex {\n  align-items: center;\n}\n.manager-box .v-window__container {\n  background: #ffffff;\n  height: 100% !important;\n}\n.manager-box .v-tab .v-image {\n  height: 24px;\n  width: 24px;\n  margin-right: 5px;\n}\n.manager-box .v-btn__content {\n  text-transform: capitalize;\n}\n.manager-box .v-treeview {\n  background: #eaeaea;\n}\n.manager-box .v-treeview i {\n  margin-right: 5px;\n}\n.manager-box .project-box-1 .v-list-item__icon {\n  margin: 0 10px 0 0 !important;\n}\n.manager-box .project-box-1 .v-list-item__content {\n  padding: 0 !important;\n}\n.manager-box .project-box-1 .v-list-item__title {\n  font-size: 14px !important;\n}\n.manager-box .project-box-1 .v-application p {\n  margin-bottom: 0 !important;\n}\n.manager-box .project-box-1 .v-list-item {\n  min-height: initial !important;\n  height: 46px !important;\n  padding: 10px 16px !important;\n}\n.theme--light.v-card .v-card__text {\n  color: #000000;\n}\n.lib-app-btn {\n  background: #ffffff;\n  border: #cccccc 1px solid;\n  font-size: 12px;\n  line-height: 28px;\n  min-height: 28px;\n  padding: 0 10px;\n  margin: auto !important;\n  height: 30px !important;\n  min-width: 80px !important;\n}\n.lib-app-btn:hover {\n  background: #e54225;\n  color: #ffffff;\n  border: #e54225 1px solid;\n}\n.manager-search {\n  font-weight: 300;\n  color: #000000;\n  padding: 5px 10px 0 0 !important;\n}\n.manager-search input {\n  padding: 4px 0 0px 0 !important;\n}\n.manager-search:hover,\n.manager-search:focus {\n  outline: none;\n}\n.orange--text {\n  color: #e54225 !important;\n  caret-color: #e54225 !important;\n}\ninput {\n  caret-color: #e54225 !important;\n}\n.task {\n  font-size: 13px;\n  border-bottom: 1px #cccccc solid;\n  display: flex;\n}\n.task td {\n  padding: 10px;\n  margin: 0;\n}\n.task td:first-child {\n  padding-left: 20px;\n}\n.task td:first-child div {\n  margin-top: 2px;\n  font-size: 12px;\n}\n.task td:last-child {\n  padding-right: 20px;\n}\n.task .v-image {\n  max-width: 30px;\n  margin-right: 10px;\n}\n.task .v-image__image {\n  background-size: 24px;\n  width: 30px;\n}\n.bottom-shell-box {\n  height: calc(100vh - 202px);\n}\n.bottom-shell-box .xterm {\n  height: 100% !important;\n}\n.v-bottom-sheet .bottom-shell-box {\n  height: calc(100% - 44px);\n}\n.v-bottom-sheet .bottom-shell-box .xterm {\n  height: 100% !important;\n}\n.scroll-box {\n  height: 100%;\n  overflow-y: scroll;\n}\n.input-container {\n  justify-content: space-between;\n}\n.input-container .v-input {\n  box-sizing: border-box;\n  margin: 0 5px;\n  width: calc(1/3*100% - (1 - 1/3)*10px);\n}\n.signal img {\n  height: auto;\n}\n.networkinfo {\n  font-size: 14px;\n  position: relative;\n}\n.net-dis-btn {\n  position: absolute;\n  top: 0;\n  right: 5px;\n}\n.vertical-panes {\n  width: 100% !important;\n}\n.project-tree-on {\n  width: 100%;\n  display: inline-block;\n  float: left;\n  position: relative;\n  background: #ffffff;\n  height: 100% !important;\n  height: calc(100vh - 160px) !important;\n}\n.project-tree-on .v-treeview {\n  height: calc(100vh - 220px);\n  overflow: auto;\n}\n.project-tree-on .v-treeview > .v-treeview-node {\n  height: 100%;\n  width: -moz-fit-content;\n  width: fit-content;\n}\n.project-tree-off {\n  width: 0px;\n  display: none;\n  position: relative;\n}\n.fileexplorer-actions {\n  text-transform: none;\n  color: #000000 !important;\n  min-width: 36px;\n  padding: 0;\n  margin: 3px !important;\n}\n.fileexplorer-actions .v-image {\n  max-height: 18px;\n}\n.fileexplorer-actions .v-image__image {\n  background-size: 18px auto;\n}\n.fileexplorer-actions:hover {\n  background: #e54225 !important;\n}\n.fileexplorer-actions:hover .v-image__image {\n  filter: invert(100%);\n}\n.fileexplorer-dialog {\n  position: absolute;\n  z-index: 98;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.5) !important;\n}\n.fileexplorer-dialog > div {\n  position: absolute;\n  z-index: 99;\n  background: #ffffff;\n  width: 50%;\n  padding: 25px 25px 10px 25px;\n  top: 40%;\n  margin: auto;\n  left: 0;\n  right: 0;\n  border-radius: 10px;\n}\n.tree-classic {\n  min-width: 195px;\n  margin: 0px;\n  position: relative;\n  background: #ffffff;\n}\n.projectTree {\n  min-width: 200px;\n  margin: 0px;\n  position: relative;\n  background: #ffffff;\n}\n.projectTree .tree-classic {\n  min-width: 195px;\n  margin: 0px;\n  position: relative;\n  background: #ffffff;\n  margin-bottom: 95px;\n}\n.tree-classic li i {\n  outline: none;\n}\n.show-hide-console {\n  position: absolute;\n  top: -30px;\n  right: 10px;\n  text-align: center;\n  z-index: 80;\n  background: #000000;\n  padding: 0;\n  text-decoration: none !important;\n}\n.show-hide-console button {\n  height: 24px;\n}\n.show-hide-console .v-image__image {\n  background-size: 12px auto;\n  filter: invert(100);\n  height: 24px;\n}\n.show-hide-console:hover {\n  background: #e54225;\n}\n.tree-hide {\n  position: absolute;\n  top: 40%;\n  left: -10px;\n  z-index: 7;\n}\n.tree-hide img {\n  height: 29px;\n}\n.tree-hide button,\n.tree-hide button:hover {\n  min-width: initial !important;\n  min-height: initial;\n  padding: 0 !important;\n  margin: 0px;\n  position: relative;\n  background: transparent !important;\n}\n.tree-hide button:hover,\n.tree-hide button:focus {\n  background: transparent !important;\n}\n.tree-hide button:hover img,\n.tree-hide button:focus img {\n  filter: invert(100%);\n}\n.tree-show {\n  position: absolute;\n  top: 40%;\n  right: -14px;\n  z-index: 7;\n}\n.tree-show img {\n  height: 29px;\n}\n.tree-show button,\n.tree-show button:hover {\n  min-width: initial !important;\n  min-height: initial;\n  padding: 0 !important;\n  margin: 0px;\n  position: relative;\n  background: transparent !important;\n}\n.tree-show button:hover,\n.tree-show button:focus {\n  background: transparent !important;\n}\n.tree-show button:hover img,\n.tree-show button:focus img {\n  filter: invert(100%);\n}\n.os-icon {\n  position: fixed;\n  top: 35px;\n  left: 320px;\n  z-index: 200;\n}\n.file-manager-actions {\n  position: absolute;\n  margin: auto;\n  left: 0;\n  right: 0;\n  text-align: center;\n  max-width: 200px;\n}\n.onofftoggle .v-input {\n  display: block;\n  flex: none;\n  padding: 0 0 0 10px;\n  margin-top: 0px;\n}\n.onofftoggle .v-input .v-messages {\n  display: none;\n}\n.onofftoggle .v-input .v-input__slot {\n  margin-bottom: 2px;\n}\n/* Scrollbar width */\n::-webkit-scrollbar {\n  width: 8px;\n  height: 8px;\n}\n/* Track */\n::-webkit-scrollbar-track {\n  -webkit-border-radius: 10px;\n  border-radius: 10px;\n  margin: 1% 0;\n}\n/* Handle */\n::-webkit-scrollbar-thumb {\n  -webkit-border-radius: 10px;\n  border-radius: 10px;\n  background: rgba(0, 0, 0, 0.2);\n}\n::-webkit-scrollbar-thumb:window-inactive {\n  background: rgba(0, 0, 0, 0.1);\n}\n/* Scrollbar width */\n::-webkit-scrollbar {\n  width: 8px;\n  height: 8px;\n}\n/* Track */\n::-webkit-scrollbar-track {\n  -webkit-border-radius: 10px;\n  border-radius: 10px;\n  margin: 1% 0;\n}\n/* Handle */\n::-webkit-scrollbar-thumb {\n  -webkit-border-radius: 10px;\n  border-radius: 10px;\n  background: rgba(0, 0, 0, 0.2);\n}\n::-webkit-scrollbar-thumb:window-inactive {\n  background: rgba(0, 0, 0, 0.1);\n}\n.about-box {\n  /* Scrollbar width */\n  /* Track */\n  /* Handle */\n}\n.about-box ::-webkit-scrollbar {\n  width: 8px;\n  height: 8px;\n}\n.about-box ::-webkit-scrollbar-track {\n  -webkit-border-radius: 10px;\n  border-radius: 10px;\n  margin: 1% 0;\n}\n.about-box ::-webkit-scrollbar-thumb {\n  -webkit-border-radius: 10px;\n  border-radius: 10px;\n  background: rgba(255, 255, 255, 0.2);\n}\n.about-box ::-webkit-scrollbar-thumb:window-inactive {\n  background: rgba(255, 255, 255, 0.1);\n}\n.lib-btn-box {\n  position: relative;\n}\n.lib-btn-box .waiting-box {\n  position: relative !important;\n  height: 100%;\n  width: 100%;\n  display: contents;\n}\n/* Spinning circle */\n.v-progress-circular {\n  position: absolute;\n  margin: auto;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  color: #e54225;\n}\n.icon-btn-lg {\n  text-transform: none;\n  color: #ffffff !important;\n  min-width: 50px;\n  padding: 12px;\n  position: absolute !important;\n  right: 10px;\n}\n.icon-btn-lg:hover {\n  background: #e54225 !important;\n}\n.codestatus {\n  position: absolute;\n  right: -14px;\n  top: 20px;\n  background: #3c5459 !important;\n  color: #ffffff !important;\n  text-transform: capitalize;\n  box-shadow: none !important;\n  font-size: 14px !important;\n  padding-right: 30px !important;\n}\n.codestatus:hover,\n.codestatus:active,\n.codestatus:focus {\n  position: absolute;\n  right: -10px;\n  top: 20px;\n  background: #e54225 !important;\n  color: #ffffff !important;\n}\n.startuperror {\n  font-size: 18px;\n  font-family: Arial, Helvetica, sans-serif;\n  color: #ffffff;\n  text-align: center;\n  padding: 10px 15px;\n  position: absolute;\n  margin: auto;\n  width: 100%;\n  background: #d9534f;\n}\n.v-alert__icon.v-icon {\n  margin-top: 10px;\n}\n.v-treeview-node__content p {\n  margin: auto;\n}\n.graphDialog .v-card__text {\n  max-height: 600px !important;\n  overflow-y: auto;\n}\n.graphDialog .form__label {\n  float: left;\n  line-height: 42px;\n  margin-right: 10px;\n  font-size: 16px;\n  color: rgba(0, 0, 0, 0.54);\n}\n.graphDialog .newapp {\n  border: #e54225 2px solid;\n  background: #ffffff;\n  color: #000000;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n.graphDialog .newapp:hover {\n  border: #e54225 2px solid;\n  background: #e54225;\n  color: #ffffff;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n.v-card pre {\n  border-color: #cccccc;\n  background: #eaeaea;\n  opacity: 1;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n  padding: 5px;\n  overflow: auto;\n}\n.drpdown {\n  margin-top: -8px;\n}\n.v-alert {\n  overflow: hidden;\n}\n.v-alert pre {\n  overflow-y: auto;\n  max-width: 600px;\n  max-height: 200px;\n  border: rgba(0, 0, 0, 0.2) 1px solid;\n  padding: 5px;\n  background: rgba(255, 255, 255, 0.2);\n}\n.about-box {\n  background: url('plugins/studio/workspace/data/img/about-bg.jpg') #000 no-repeat top center;\n  color: #ffffff !important;\n}\n.about-box .v-card__title {\n  background: transparent;\n}\n.about-box .v-card__text {\n  color: #ffffff !important;\n}\n.about-box .pre-box {\n  height: 100%;\n}\n.about-box .v-card__actions {\n  border-top: 0px;\n  padding: 18px;\n}\n.about-box .v-card__actions .v-btn {\n  color: #ffffff;\n}\n.about-logo {\n  position: relative;\n  margin: auto;\n  text-align: center;\n  padding: 30px 0 40px;\n}\n.about-logo .v-image {\n  max-width: 368px;\n  margin: auto;\n}\n.about-logo span {\n  position: absolute;\n  right: 10px;\n  top: 90px;\n  font-size: 14px;\n}\n.developers {\n  margin: auto;\n  text-align: center;\n  overflow: auto;\n  display: block;\n  max-height: 300px;\n}\n.developers h3 {\n  font-weight: bold;\n  width: 100%;\n  font-size: 18px;\n  margin-bottom: 20px;\n}\n.developers p {\n  width: 100%;\n  font-size: 14px;\n  margin-bottom: 10px;\n}\n.provided {\n  font-size: 12px;\n  position: absolute;\n  left: 25px;\n  bottom: 10px;\n}\n.license-box {\n  margin: 15px;\n}\n.welcome {\n  margin: auto;\n  text-align: center;\n}\n.welcome h3 {\n  font-weight: bold;\n  width: 100%;\n  font-size: 20px;\n}\n.welcome p {\n  width: 100%;\n  font-size: 14px;\n}\n.welcome span {\n  width: 100%;\n  font-size: 14px;\n  text-align: center;\n}\n.welcome .welcome-text {\n  padding: 15px 10% 0;\n}\n.welcome-btn {\n  background: transparent !important;\n  border: #ffffff 2px solid;\n  color: #ffffff !important;\n  padding-left: 10px;\n  padding-right: 10px;\n  margin-top: 40px;\n}\n.welcome-btn:hover {\n  background: #e54225 !important;\n  color: #ffffff !important;\n  border: #e54225 2px solid;\n}\n.consent {\n  margin: auto;\n  max-width: 80%;\n}\n.consent label {\n  font-size: 14px;\n  font-weight: 300;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 1805:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/* MaterialDesignIcons.com */\n@font-face {\n  font-family: \"Material Design Icons\";\n  src: url(\"plugins/studio/workspace/data/fonts/materialdesignicons-webfont.eot?v=4.4.95\");\n  src: url(\"plugins/studio/workspace/data/fonts/materialdesignicons-webfont.eot?#iefix&v=4.4.95\") format(\"embedded-opentype\"), url(\"plugins/studio/workspace/data/fonts/materialdesignicons-webfont.woff2?v=4.4.95\") format(\"woff2\"), url(\"plugins/studio/workspace/data/fonts/materialdesignicons-webfont.woff?v=4.4.95\") format(\"woff\"), url(\"plugins/studio/workspace/data/fonts/materialdesignicons-webfont.ttf?v=4.4.95\") format(\"truetype\");\n  font-weight: normal;\n  font-style: normal;\n}\n\n.mdi:before,\n.mdi-set {\n  display: inline-block;\n  font: normal normal normal 24px/1 \"Material Design Icons\";\n  font-size: inherit;\n  text-rendering: auto;\n  line-height: inherit;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.mdi-ab-testing::before {\n  content: \"\\F001C\";\n}\n\n.mdi-access-point::before {\n  content: \"\\F002\";\n}\n\n.mdi-access-point-network::before {\n  content: \"\\F003\";\n}\n\n.mdi-access-point-network-off::before {\n  content: \"\\FBBD\";\n}\n\n.mdi-account::before {\n  content: \"\\F004\";\n}\n\n.mdi-account-alert::before {\n  content: \"\\F005\";\n}\n\n.mdi-account-alert-outline::before {\n  content: \"\\FB2C\";\n}\n\n.mdi-account-arrow-left::before {\n  content: \"\\FB2D\";\n}\n\n.mdi-account-arrow-left-outline::before {\n  content: \"\\FB2E\";\n}\n\n.mdi-account-arrow-right::before {\n  content: \"\\FB2F\";\n}\n\n.mdi-account-arrow-right-outline::before {\n  content: \"\\FB30\";\n}\n\n.mdi-account-badge::before {\n  content: \"\\FD83\";\n}\n\n.mdi-account-badge-alert::before {\n  content: \"\\FD84\";\n}\n\n.mdi-account-badge-alert-outline::before {\n  content: \"\\FD85\";\n}\n\n.mdi-account-badge-horizontal::before {\n  content: \"\\FDF0\";\n}\n\n.mdi-account-badge-horizontal-outline::before {\n  content: \"\\FDF1\";\n}\n\n.mdi-account-badge-outline::before {\n  content: \"\\FD86\";\n}\n\n.mdi-account-box::before {\n  content: \"\\F006\";\n}\n\n.mdi-account-box-multiple::before {\n  content: \"\\F933\";\n}\n\n.mdi-account-box-multiple-outline::before {\n  content: \"\\F002C\";\n}\n\n.mdi-account-box-outline::before {\n  content: \"\\F007\";\n}\n\n.mdi-account-card-details::before {\n  content: \"\\F5D2\";\n}\n\n.mdi-account-card-details-outline::before {\n  content: \"\\FD87\";\n}\n\n.mdi-account-cash::before {\n  content: \"\\F00C2\";\n}\n\n.mdi-account-cash-outline::before {\n  content: \"\\F00C3\";\n}\n\n.mdi-account-check::before {\n  content: \"\\F008\";\n}\n\n.mdi-account-check-outline::before {\n  content: \"\\FBBE\";\n}\n\n.mdi-account-child::before {\n  content: \"\\FA88\";\n}\n\n.mdi-account-child-circle::before {\n  content: \"\\FA89\";\n}\n\n.mdi-account-child-outline::before {\n  content: \"\\F00F3\";\n}\n\n.mdi-account-circle::before {\n  content: \"\\F009\";\n}\n\n.mdi-account-circle-outline::before {\n  content: \"\\FB31\";\n}\n\n.mdi-account-clock::before {\n  content: \"\\FB32\";\n}\n\n.mdi-account-clock-outline::before {\n  content: \"\\FB33\";\n}\n\n.mdi-account-convert::before {\n  content: \"\\F00A\";\n}\n\n.mdi-account-details::before {\n  content: \"\\F631\";\n}\n\n.mdi-account-edit::before {\n  content: \"\\F6BB\";\n}\n\n.mdi-account-edit-outline::before {\n  content: \"\\F001D\";\n}\n\n.mdi-account-group::before {\n  content: \"\\F848\";\n}\n\n.mdi-account-group-outline::before {\n  content: \"\\FB34\";\n}\n\n.mdi-account-heart::before {\n  content: \"\\F898\";\n}\n\n.mdi-account-heart-outline::before {\n  content: \"\\FBBF\";\n}\n\n.mdi-account-key::before {\n  content: \"\\F00B\";\n}\n\n.mdi-account-key-outline::before {\n  content: \"\\FBC0\";\n}\n\n.mdi-account-lock::before {\n  content: \"\\F0189\";\n}\n\n.mdi-account-lock-outline::before {\n  content: \"\\F018A\";\n}\n\n.mdi-account-minus::before {\n  content: \"\\F00D\";\n}\n\n.mdi-account-minus-outline::before {\n  content: \"\\FAEB\";\n}\n\n.mdi-account-multiple::before {\n  content: \"\\F00E\";\n}\n\n.mdi-account-multiple-check::before {\n  content: \"\\F8C4\";\n}\n\n.mdi-account-multiple-minus::before {\n  content: \"\\F5D3\";\n}\n\n.mdi-account-multiple-minus-outline::before {\n  content: \"\\FBC1\";\n}\n\n.mdi-account-multiple-outline::before {\n  content: \"\\F00F\";\n}\n\n.mdi-account-multiple-plus::before {\n  content: \"\\F010\";\n}\n\n.mdi-account-multiple-plus-outline::before {\n  content: \"\\F7FF\";\n}\n\n.mdi-account-network::before {\n  content: \"\\F011\";\n}\n\n.mdi-account-network-outline::before {\n  content: \"\\FBC2\";\n}\n\n.mdi-account-off::before {\n  content: \"\\F012\";\n}\n\n.mdi-account-off-outline::before {\n  content: \"\\FBC3\";\n}\n\n.mdi-account-outline::before {\n  content: \"\\F013\";\n}\n\n.mdi-account-plus::before {\n  content: \"\\F014\";\n}\n\n.mdi-account-plus-outline::before {\n  content: \"\\F800\";\n}\n\n.mdi-account-question::before {\n  content: \"\\FB35\";\n}\n\n.mdi-account-question-outline::before {\n  content: \"\\FB36\";\n}\n\n.mdi-account-remove::before {\n  content: \"\\F015\";\n}\n\n.mdi-account-remove-outline::before {\n  content: \"\\FAEC\";\n}\n\n.mdi-account-search::before {\n  content: \"\\F016\";\n}\n\n.mdi-account-search-outline::before {\n  content: \"\\F934\";\n}\n\n.mdi-account-settings::before {\n  content: \"\\F630\";\n}\n\n.mdi-account-settings-outline::before {\n  content: \"\\F00F4\";\n}\n\n.mdi-account-star::before {\n  content: \"\\F017\";\n}\n\n.mdi-account-star-outline::before {\n  content: \"\\FBC4\";\n}\n\n.mdi-account-supervisor::before {\n  content: \"\\FA8A\";\n}\n\n.mdi-account-supervisor-circle::before {\n  content: \"\\FA8B\";\n}\n\n.mdi-account-supervisor-outline::before {\n  content: \"\\F0158\";\n}\n\n.mdi-account-switch::before {\n  content: \"\\F019\";\n}\n\n.mdi-account-tie::before {\n  content: \"\\FCBF\";\n}\n\n.mdi-account-tie-outline::before {\n  content: \"\\F00F5\";\n}\n\n.mdi-accusoft::before {\n  content: \"\\F849\";\n}\n\n.mdi-adchoices::before {\n  content: \"\\FD1E\";\n}\n\n.mdi-adjust::before {\n  content: \"\\F01A\";\n}\n\n.mdi-adobe::before {\n  content: \"\\F935\";\n}\n\n.mdi-adobe-acrobat::before {\n  content: \"\\FFBD\";\n}\n\n.mdi-air-conditioner::before {\n  content: \"\\F01B\";\n}\n\n.mdi-air-filter::before {\n  content: \"\\FD1F\";\n}\n\n.mdi-air-horn::before {\n  content: \"\\FD88\";\n}\n\n.mdi-air-humidifier::before {\n  content: \"\\F00C4\";\n}\n\n.mdi-air-purifier::before {\n  content: \"\\FD20\";\n}\n\n.mdi-airbag::before {\n  content: \"\\FBC5\";\n}\n\n.mdi-airballoon::before {\n  content: \"\\F01C\";\n}\n\n.mdi-airballoon-outline::before {\n  content: \"\\F002D\";\n}\n\n.mdi-airplane::before {\n  content: \"\\F01D\";\n}\n\n.mdi-airplane-landing::before {\n  content: \"\\F5D4\";\n}\n\n.mdi-airplane-off::before {\n  content: \"\\F01E\";\n}\n\n.mdi-airplane-takeoff::before {\n  content: \"\\F5D5\";\n}\n\n.mdi-airplay::before {\n  content: \"\\F01F\";\n}\n\n.mdi-airport::before {\n  content: \"\\F84A\";\n}\n\n.mdi-alarm::before {\n  content: \"\\F020\";\n}\n\n.mdi-alarm-bell::before {\n  content: \"\\F78D\";\n}\n\n.mdi-alarm-check::before {\n  content: \"\\F021\";\n}\n\n.mdi-alarm-light::before {\n  content: \"\\F78E\";\n}\n\n.mdi-alarm-light-outline::before {\n  content: \"\\FBC6\";\n}\n\n.mdi-alarm-multiple::before {\n  content: \"\\F022\";\n}\n\n.mdi-alarm-note::before {\n  content: \"\\FE8E\";\n}\n\n.mdi-alarm-note-off::before {\n  content: \"\\FE8F\";\n}\n\n.mdi-alarm-off::before {\n  content: \"\\F023\";\n}\n\n.mdi-alarm-plus::before {\n  content: \"\\F024\";\n}\n\n.mdi-alarm-snooze::before {\n  content: \"\\F68D\";\n}\n\n.mdi-album::before {\n  content: \"\\F025\";\n}\n\n.mdi-alert::before {\n  content: \"\\F026\";\n}\n\n.mdi-alert-box::before {\n  content: \"\\F027\";\n}\n\n.mdi-alert-box-outline::before {\n  content: \"\\FCC0\";\n}\n\n.mdi-alert-circle::before {\n  content: \"\\F028\";\n}\n\n.mdi-alert-circle-outline::before {\n  content: \"\\F5D6\";\n}\n\n.mdi-alert-decagram::before {\n  content: \"\\F6BC\";\n}\n\n.mdi-alert-decagram-outline::before {\n  content: \"\\FCC1\";\n}\n\n.mdi-alert-octagon::before {\n  content: \"\\F029\";\n}\n\n.mdi-alert-octagon-outline::before {\n  content: \"\\FCC2\";\n}\n\n.mdi-alert-octagram::before {\n  content: \"\\F766\";\n}\n\n.mdi-alert-octagram-outline::before {\n  content: \"\\FCC3\";\n}\n\n.mdi-alert-outline::before {\n  content: \"\\F02A\";\n}\n\n.mdi-alien::before {\n  content: \"\\F899\";\n}\n\n.mdi-alien-outline::before {\n  content: \"\\F00F6\";\n}\n\n.mdi-all-inclusive::before {\n  content: \"\\F6BD\";\n}\n\n.mdi-alpha::before {\n  content: \"\\F02B\";\n}\n\n.mdi-alpha-a::before {\n  content: \"\\41\";\n}\n\n.mdi-alpha-a-box::before {\n  content: \"\\FAED\";\n}\n\n.mdi-alpha-a-box-outline::before {\n  content: \"\\FBC7\";\n}\n\n.mdi-alpha-a-circle::before {\n  content: \"\\FBC8\";\n}\n\n.mdi-alpha-a-circle-outline::before {\n  content: \"\\FBC9\";\n}\n\n.mdi-alpha-b::before {\n  content: \"\\42\";\n}\n\n.mdi-alpha-b-box::before {\n  content: \"\\FAEE\";\n}\n\n.mdi-alpha-b-box-outline::before {\n  content: \"\\FBCA\";\n}\n\n.mdi-alpha-b-circle::before {\n  content: \"\\FBCB\";\n}\n\n.mdi-alpha-b-circle-outline::before {\n  content: \"\\FBCC\";\n}\n\n.mdi-alpha-c::before {\n  content: \"\\43\";\n}\n\n.mdi-alpha-c-box::before {\n  content: \"\\FAEF\";\n}\n\n.mdi-alpha-c-box-outline::before {\n  content: \"\\FBCD\";\n}\n\n.mdi-alpha-c-circle::before {\n  content: \"\\FBCE\";\n}\n\n.mdi-alpha-c-circle-outline::before {\n  content: \"\\FBCF\";\n}\n\n.mdi-alpha-d::before {\n  content: \"\\44\";\n}\n\n.mdi-alpha-d-box::before {\n  content: \"\\FAF0\";\n}\n\n.mdi-alpha-d-box-outline::before {\n  content: \"\\FBD0\";\n}\n\n.mdi-alpha-d-circle::before {\n  content: \"\\FBD1\";\n}\n\n.mdi-alpha-d-circle-outline::before {\n  content: \"\\FBD2\";\n}\n\n.mdi-alpha-e::before {\n  content: \"\\45\";\n}\n\n.mdi-alpha-e-box::before {\n  content: \"\\FAF1\";\n}\n\n.mdi-alpha-e-box-outline::before {\n  content: \"\\FBD3\";\n}\n\n.mdi-alpha-e-circle::before {\n  content: \"\\FBD4\";\n}\n\n.mdi-alpha-e-circle-outline::before {\n  content: \"\\FBD5\";\n}\n\n.mdi-alpha-f::before {\n  content: \"\\46\";\n}\n\n.mdi-alpha-f-box::before {\n  content: \"\\FAF2\";\n}\n\n.mdi-alpha-f-box-outline::before {\n  content: \"\\FBD6\";\n}\n\n.mdi-alpha-f-circle::before {\n  content: \"\\FBD7\";\n}\n\n.mdi-alpha-f-circle-outline::before {\n  content: \"\\FBD8\";\n}\n\n.mdi-alpha-g::before {\n  content: \"\\47\";\n}\n\n.mdi-alpha-g-box::before {\n  content: \"\\FAF3\";\n}\n\n.mdi-alpha-g-box-outline::before {\n  content: \"\\FBD9\";\n}\n\n.mdi-alpha-g-circle::before {\n  content: \"\\FBDA\";\n}\n\n.mdi-alpha-g-circle-outline::before {\n  content: \"\\FBDB\";\n}\n\n.mdi-alpha-h::before {\n  content: \"\\48\";\n}\n\n.mdi-alpha-h-box::before {\n  content: \"\\FAF4\";\n}\n\n.mdi-alpha-h-box-outline::before {\n  content: \"\\FBDC\";\n}\n\n.mdi-alpha-h-circle::before {\n  content: \"\\FBDD\";\n}\n\n.mdi-alpha-h-circle-outline::before {\n  content: \"\\FBDE\";\n}\n\n.mdi-alpha-i::before {\n  content: \"\\49\";\n}\n\n.mdi-alpha-i-box::before {\n  content: \"\\FAF5\";\n}\n\n.mdi-alpha-i-box-outline::before {\n  content: \"\\FBDF\";\n}\n\n.mdi-alpha-i-circle::before {\n  content: \"\\FBE0\";\n}\n\n.mdi-alpha-i-circle-outline::before {\n  content: \"\\FBE1\";\n}\n\n.mdi-alpha-j::before {\n  content: \"\\4A\";\n}\n\n.mdi-alpha-j-box::before {\n  content: \"\\FAF6\";\n}\n\n.mdi-alpha-j-box-outline::before {\n  content: \"\\FBE2\";\n}\n\n.mdi-alpha-j-circle::before {\n  content: \"\\FBE3\";\n}\n\n.mdi-alpha-j-circle-outline::before {\n  content: \"\\FBE4\";\n}\n\n.mdi-alpha-k::before {\n  content: \"\\4B\";\n}\n\n.mdi-alpha-k-box::before {\n  content: \"\\FAF7\";\n}\n\n.mdi-alpha-k-box-outline::before {\n  content: \"\\FBE5\";\n}\n\n.mdi-alpha-k-circle::before {\n  content: \"\\FBE6\";\n}\n\n.mdi-alpha-k-circle-outline::before {\n  content: \"\\FBE7\";\n}\n\n.mdi-alpha-l::before {\n  content: \"\\4C\";\n}\n\n.mdi-alpha-l-box::before {\n  content: \"\\FAF8\";\n}\n\n.mdi-alpha-l-box-outline::before {\n  content: \"\\FBE8\";\n}\n\n.mdi-alpha-l-circle::before {\n  content: \"\\FBE9\";\n}\n\n.mdi-alpha-l-circle-outline::before {\n  content: \"\\FBEA\";\n}\n\n.mdi-alpha-m::before {\n  content: \"\\4D\";\n}\n\n.mdi-alpha-m-box::before {\n  content: \"\\FAF9\";\n}\n\n.mdi-alpha-m-box-outline::before {\n  content: \"\\FBEB\";\n}\n\n.mdi-alpha-m-circle::before {\n  content: \"\\FBEC\";\n}\n\n.mdi-alpha-m-circle-outline::before {\n  content: \"\\FBED\";\n}\n\n.mdi-alpha-n::before {\n  content: \"\\4E\";\n}\n\n.mdi-alpha-n-box::before {\n  content: \"\\FAFA\";\n}\n\n.mdi-alpha-n-box-outline::before {\n  content: \"\\FBEE\";\n}\n\n.mdi-alpha-n-circle::before {\n  content: \"\\FBEF\";\n}\n\n.mdi-alpha-n-circle-outline::before {\n  content: \"\\FBF0\";\n}\n\n.mdi-alpha-o::before {\n  content: \"\\4F\";\n}\n\n.mdi-alpha-o-box::before {\n  content: \"\\FAFB\";\n}\n\n.mdi-alpha-o-box-outline::before {\n  content: \"\\FBF1\";\n}\n\n.mdi-alpha-o-circle::before {\n  content: \"\\FBF2\";\n}\n\n.mdi-alpha-o-circle-outline::before {\n  content: \"\\FBF3\";\n}\n\n.mdi-alpha-p::before {\n  content: \"\\50\";\n}\n\n.mdi-alpha-p-box::before {\n  content: \"\\FAFC\";\n}\n\n.mdi-alpha-p-box-outline::before {\n  content: \"\\FBF4\";\n}\n\n.mdi-alpha-p-circle::before {\n  content: \"\\FBF5\";\n}\n\n.mdi-alpha-p-circle-outline::before {\n  content: \"\\FBF6\";\n}\n\n.mdi-alpha-q::before {\n  content: \"\\51\";\n}\n\n.mdi-alpha-q-box::before {\n  content: \"\\FAFD\";\n}\n\n.mdi-alpha-q-box-outline::before {\n  content: \"\\FBF7\";\n}\n\n.mdi-alpha-q-circle::before {\n  content: \"\\FBF8\";\n}\n\n.mdi-alpha-q-circle-outline::before {\n  content: \"\\FBF9\";\n}\n\n.mdi-alpha-r::before {\n  content: \"\\52\";\n}\n\n.mdi-alpha-r-box::before {\n  content: \"\\FAFE\";\n}\n\n.mdi-alpha-r-box-outline::before {\n  content: \"\\FBFA\";\n}\n\n.mdi-alpha-r-circle::before {\n  content: \"\\FBFB\";\n}\n\n.mdi-alpha-r-circle-outline::before {\n  content: \"\\FBFC\";\n}\n\n.mdi-alpha-s::before {\n  content: \"\\53\";\n}\n\n.mdi-alpha-s-box::before {\n  content: \"\\FAFF\";\n}\n\n.mdi-alpha-s-box-outline::before {\n  content: \"\\FBFD\";\n}\n\n.mdi-alpha-s-circle::before {\n  content: \"\\FBFE\";\n}\n\n.mdi-alpha-s-circle-outline::before {\n  content: \"\\FBFF\";\n}\n\n.mdi-alpha-t::before {\n  content: \"\\54\";\n}\n\n.mdi-alpha-t-box::before {\n  content: \"\\FB00\";\n}\n\n.mdi-alpha-t-box-outline::before {\n  content: \"\\FC00\";\n}\n\n.mdi-alpha-t-circle::before {\n  content: \"\\FC01\";\n}\n\n.mdi-alpha-t-circle-outline::before {\n  content: \"\\FC02\";\n}\n\n.mdi-alpha-u::before {\n  content: \"\\55\";\n}\n\n.mdi-alpha-u-box::before {\n  content: \"\\FB01\";\n}\n\n.mdi-alpha-u-box-outline::before {\n  content: \"\\FC03\";\n}\n\n.mdi-alpha-u-circle::before {\n  content: \"\\FC04\";\n}\n\n.mdi-alpha-u-circle-outline::before {\n  content: \"\\FC05\";\n}\n\n.mdi-alpha-v::before {\n  content: \"\\56\";\n}\n\n.mdi-alpha-v-box::before {\n  content: \"\\FB02\";\n}\n\n.mdi-alpha-v-box-outline::before {\n  content: \"\\FC06\";\n}\n\n.mdi-alpha-v-circle::before {\n  content: \"\\FC07\";\n}\n\n.mdi-alpha-v-circle-outline::before {\n  content: \"\\FC08\";\n}\n\n.mdi-alpha-w::before {\n  content: \"\\57\";\n}\n\n.mdi-alpha-w-box::before {\n  content: \"\\FB03\";\n}\n\n.mdi-alpha-w-box-outline::before {\n  content: \"\\FC09\";\n}\n\n.mdi-alpha-w-circle::before {\n  content: \"\\FC0A\";\n}\n\n.mdi-alpha-w-circle-outline::before {\n  content: \"\\FC0B\";\n}\n\n.mdi-alpha-x::before {\n  content: \"\\58\";\n}\n\n.mdi-alpha-x-box::before {\n  content: \"\\FB04\";\n}\n\n.mdi-alpha-x-box-outline::before {\n  content: \"\\FC0C\";\n}\n\n.mdi-alpha-x-circle::before {\n  content: \"\\FC0D\";\n}\n\n.mdi-alpha-x-circle-outline::before {\n  content: \"\\FC0E\";\n}\n\n.mdi-alpha-y::before {\n  content: \"\\59\";\n}\n\n.mdi-alpha-y-box::before {\n  content: \"\\FB05\";\n}\n\n.mdi-alpha-y-box-outline::before {\n  content: \"\\FC0F\";\n}\n\n.mdi-alpha-y-circle::before {\n  content: \"\\FC10\";\n}\n\n.mdi-alpha-y-circle-outline::before {\n  content: \"\\FC11\";\n}\n\n.mdi-alpha-z::before {\n  content: \"\\5A\";\n}\n\n.mdi-alpha-z-box::before {\n  content: \"\\FB06\";\n}\n\n.mdi-alpha-z-box-outline::before {\n  content: \"\\FC12\";\n}\n\n.mdi-alpha-z-circle::before {\n  content: \"\\FC13\";\n}\n\n.mdi-alpha-z-circle-outline::before {\n  content: \"\\FC14\";\n}\n\n.mdi-alphabetical::before {\n  content: \"\\F02C\";\n}\n\n.mdi-alphabetical-off::before {\n  content: \"\\F002E\";\n}\n\n.mdi-alphabetical-variant::before {\n  content: \"\\F002F\";\n}\n\n.mdi-alphabetical-variant-off::before {\n  content: \"\\F0030\";\n}\n\n.mdi-altimeter::before {\n  content: \"\\F5D7\";\n}\n\n.mdi-amazon::before {\n  content: \"\\F02D\";\n}\n\n.mdi-amazon-alexa::before {\n  content: \"\\F8C5\";\n}\n\n.mdi-amazon-drive::before {\n  content: \"\\F02E\";\n}\n\n.mdi-ambulance::before {\n  content: \"\\F02F\";\n}\n\n.mdi-ammunition::before {\n  content: \"\\FCC4\";\n}\n\n.mdi-ampersand::before {\n  content: \"\\FA8C\";\n}\n\n.mdi-amplifier::before {\n  content: \"\\F030\";\n}\n\n.mdi-anchor::before {\n  content: \"\\F031\";\n}\n\n.mdi-android::before {\n  content: \"\\F032\";\n}\n\n.mdi-android-auto::before {\n  content: \"\\FA8D\";\n}\n\n.mdi-android-debug-bridge::before {\n  content: \"\\F033\";\n}\n\n.mdi-android-head::before {\n  content: \"\\F78F\";\n}\n\n.mdi-android-messages::before {\n  content: \"\\FD21\";\n}\n\n.mdi-android-studio::before {\n  content: \"\\F034\";\n}\n\n.mdi-angle-acute::before {\n  content: \"\\F936\";\n}\n\n.mdi-angle-obtuse::before {\n  content: \"\\F937\";\n}\n\n.mdi-angle-right::before {\n  content: \"\\F938\";\n}\n\n.mdi-angular::before {\n  content: \"\\F6B1\";\n}\n\n.mdi-angularjs::before {\n  content: \"\\F6BE\";\n}\n\n.mdi-animation::before {\n  content: \"\\F5D8\";\n}\n\n.mdi-animation-outline::before {\n  content: \"\\FA8E\";\n}\n\n.mdi-animation-play::before {\n  content: \"\\F939\";\n}\n\n.mdi-animation-play-outline::before {\n  content: \"\\FA8F\";\n}\n\n.mdi-ansible::before {\n  content: \"\\F00C5\";\n}\n\n.mdi-antenna::before {\n  content: \"\\F0144\";\n}\n\n.mdi-anvil::before {\n  content: \"\\F89A\";\n}\n\n.mdi-apache-kafka::before {\n  content: \"\\F0031\";\n}\n\n.mdi-api::before {\n  content: \"\\F00C6\";\n}\n\n.mdi-apple::before {\n  content: \"\\F035\";\n}\n\n.mdi-apple-finder::before {\n  content: \"\\F036\";\n}\n\n.mdi-apple-icloud::before {\n  content: \"\\F038\";\n}\n\n.mdi-apple-ios::before {\n  content: \"\\F037\";\n}\n\n.mdi-apple-keyboard-caps::before {\n  content: \"\\F632\";\n}\n\n.mdi-apple-keyboard-command::before {\n  content: \"\\F633\";\n}\n\n.mdi-apple-keyboard-control::before {\n  content: \"\\F634\";\n}\n\n.mdi-apple-keyboard-option::before {\n  content: \"\\F635\";\n}\n\n.mdi-apple-keyboard-shift::before {\n  content: \"\\F636\";\n}\n\n.mdi-apple-safari::before {\n  content: \"\\F039\";\n}\n\n.mdi-application::before {\n  content: \"\\F614\";\n}\n\n.mdi-application-export::before {\n  content: \"\\FD89\";\n}\n\n.mdi-application-import::before {\n  content: \"\\FD8A\";\n}\n\n.mdi-approximately-equal::before {\n  content: \"\\FFBE\";\n}\n\n.mdi-approximately-equal-box::before {\n  content: \"\\FFBF\";\n}\n\n.mdi-apps::before {\n  content: \"\\F03B\";\n}\n\n.mdi-apps-box::before {\n  content: \"\\FD22\";\n}\n\n.mdi-arch::before {\n  content: \"\\F8C6\";\n}\n\n.mdi-archive::before {\n  content: \"\\F03C\";\n}\n\n.mdi-arm-flex::before {\n  content: \"\\F008F\";\n}\n\n.mdi-arm-flex-outline::before {\n  content: \"\\F0090\";\n}\n\n.mdi-arrange-bring-forward::before {\n  content: \"\\F03D\";\n}\n\n.mdi-arrange-bring-to-front::before {\n  content: \"\\F03E\";\n}\n\n.mdi-arrange-send-backward::before {\n  content: \"\\F03F\";\n}\n\n.mdi-arrange-send-to-back::before {\n  content: \"\\F040\";\n}\n\n.mdi-arrow-all::before {\n  content: \"\\F041\";\n}\n\n.mdi-arrow-bottom-left::before {\n  content: \"\\F042\";\n}\n\n.mdi-arrow-bottom-left-bold-outline::before {\n  content: \"\\F9B6\";\n}\n\n.mdi-arrow-bottom-left-thick::before {\n  content: \"\\F9B7\";\n}\n\n.mdi-arrow-bottom-right::before {\n  content: \"\\F043\";\n}\n\n.mdi-arrow-bottom-right-bold-outline::before {\n  content: \"\\F9B8\";\n}\n\n.mdi-arrow-bottom-right-thick::before {\n  content: \"\\F9B9\";\n}\n\n.mdi-arrow-collapse::before {\n  content: \"\\F615\";\n}\n\n.mdi-arrow-collapse-all::before {\n  content: \"\\F044\";\n}\n\n.mdi-arrow-collapse-down::before {\n  content: \"\\F791\";\n}\n\n.mdi-arrow-collapse-horizontal::before {\n  content: \"\\F84B\";\n}\n\n.mdi-arrow-collapse-left::before {\n  content: \"\\F792\";\n}\n\n.mdi-arrow-collapse-right::before {\n  content: \"\\F793\";\n}\n\n.mdi-arrow-collapse-up::before {\n  content: \"\\F794\";\n}\n\n.mdi-arrow-collapse-vertical::before {\n  content: \"\\F84C\";\n}\n\n.mdi-arrow-decision::before {\n  content: \"\\F9BA\";\n}\n\n.mdi-arrow-decision-auto::before {\n  content: \"\\F9BB\";\n}\n\n.mdi-arrow-decision-auto-outline::before {\n  content: \"\\F9BC\";\n}\n\n.mdi-arrow-decision-outline::before {\n  content: \"\\F9BD\";\n}\n\n.mdi-arrow-down::before {\n  content: \"\\F045\";\n}\n\n.mdi-arrow-down-bold::before {\n  content: \"\\F72D\";\n}\n\n.mdi-arrow-down-bold-box::before {\n  content: \"\\F72E\";\n}\n\n.mdi-arrow-down-bold-box-outline::before {\n  content: \"\\F72F\";\n}\n\n.mdi-arrow-down-bold-circle::before {\n  content: \"\\F047\";\n}\n\n.mdi-arrow-down-bold-circle-outline::before {\n  content: \"\\F048\";\n}\n\n.mdi-arrow-down-bold-hexagon-outline::before {\n  content: \"\\F049\";\n}\n\n.mdi-arrow-down-bold-outline::before {\n  content: \"\\F9BE\";\n}\n\n.mdi-arrow-down-box::before {\n  content: \"\\F6BF\";\n}\n\n.mdi-arrow-down-circle::before {\n  content: \"\\FCB7\";\n}\n\n.mdi-arrow-down-circle-outline::before {\n  content: \"\\FCB8\";\n}\n\n.mdi-arrow-down-drop-circle::before {\n  content: \"\\F04A\";\n}\n\n.mdi-arrow-down-drop-circle-outline::before {\n  content: \"\\F04B\";\n}\n\n.mdi-arrow-down-thick::before {\n  content: \"\\F046\";\n}\n\n.mdi-arrow-expand::before {\n  content: \"\\F616\";\n}\n\n.mdi-arrow-expand-all::before {\n  content: \"\\F04C\";\n}\n\n.mdi-arrow-expand-down::before {\n  content: \"\\F795\";\n}\n\n.mdi-arrow-expand-horizontal::before {\n  content: \"\\F84D\";\n}\n\n.mdi-arrow-expand-left::before {\n  content: \"\\F796\";\n}\n\n.mdi-arrow-expand-right::before {\n  content: \"\\F797\";\n}\n\n.mdi-arrow-expand-up::before {\n  content: \"\\F798\";\n}\n\n.mdi-arrow-expand-vertical::before {\n  content: \"\\F84E\";\n}\n\n.mdi-arrow-horizontal-lock::before {\n  content: \"\\F0186\";\n}\n\n.mdi-arrow-left::before {\n  content: \"\\F04D\";\n}\n\n.mdi-arrow-left-bold::before {\n  content: \"\\F730\";\n}\n\n.mdi-arrow-left-bold-box::before {\n  content: \"\\F731\";\n}\n\n.mdi-arrow-left-bold-box-outline::before {\n  content: \"\\F732\";\n}\n\n.mdi-arrow-left-bold-circle::before {\n  content: \"\\F04F\";\n}\n\n.mdi-arrow-left-bold-circle-outline::before {\n  content: \"\\F050\";\n}\n\n.mdi-arrow-left-bold-hexagon-outline::before {\n  content: \"\\F051\";\n}\n\n.mdi-arrow-left-bold-outline::before {\n  content: \"\\F9BF\";\n}\n\n.mdi-arrow-left-box::before {\n  content: \"\\F6C0\";\n}\n\n.mdi-arrow-left-circle::before {\n  content: \"\\FCB9\";\n}\n\n.mdi-arrow-left-circle-outline::before {\n  content: \"\\FCBA\";\n}\n\n.mdi-arrow-left-drop-circle::before {\n  content: \"\\F052\";\n}\n\n.mdi-arrow-left-drop-circle-outline::before {\n  content: \"\\F053\";\n}\n\n.mdi-arrow-left-right::before {\n  content: \"\\FE90\";\n}\n\n.mdi-arrow-left-right-bold::before {\n  content: \"\\FE91\";\n}\n\n.mdi-arrow-left-right-bold-outline::before {\n  content: \"\\F9C0\";\n}\n\n.mdi-arrow-left-thick::before {\n  content: \"\\F04E\";\n}\n\n.mdi-arrow-right::before {\n  content: \"\\F054\";\n}\n\n.mdi-arrow-right-bold::before {\n  content: \"\\F733\";\n}\n\n.mdi-arrow-right-bold-box::before {\n  content: \"\\F734\";\n}\n\n.mdi-arrow-right-bold-box-outline::before {\n  content: \"\\F735\";\n}\n\n.mdi-arrow-right-bold-circle::before {\n  content: \"\\F056\";\n}\n\n.mdi-arrow-right-bold-circle-outline::before {\n  content: \"\\F057\";\n}\n\n.mdi-arrow-right-bold-hexagon-outline::before {\n  content: \"\\F058\";\n}\n\n.mdi-arrow-right-bold-outline::before {\n  content: \"\\F9C1\";\n}\n\n.mdi-arrow-right-box::before {\n  content: \"\\F6C1\";\n}\n\n.mdi-arrow-right-circle::before {\n  content: \"\\FCBB\";\n}\n\n.mdi-arrow-right-circle-outline::before {\n  content: \"\\FCBC\";\n}\n\n.mdi-arrow-right-drop-circle::before {\n  content: \"\\F059\";\n}\n\n.mdi-arrow-right-drop-circle-outline::before {\n  content: \"\\F05A\";\n}\n\n.mdi-arrow-right-thick::before {\n  content: \"\\F055\";\n}\n\n.mdi-arrow-split-horizontal::before {\n  content: \"\\F93A\";\n}\n\n.mdi-arrow-split-vertical::before {\n  content: \"\\F93B\";\n}\n\n.mdi-arrow-top-left::before {\n  content: \"\\F05B\";\n}\n\n.mdi-arrow-top-left-bold-outline::before {\n  content: \"\\F9C2\";\n}\n\n.mdi-arrow-top-left-bottom-right::before {\n  content: \"\\FE92\";\n}\n\n.mdi-arrow-top-left-bottom-right-bold::before {\n  content: \"\\FE93\";\n}\n\n.mdi-arrow-top-left-thick::before {\n  content: \"\\F9C3\";\n}\n\n.mdi-arrow-top-right::before {\n  content: \"\\F05C\";\n}\n\n.mdi-arrow-top-right-bold-outline::before {\n  content: \"\\F9C4\";\n}\n\n.mdi-arrow-top-right-bottom-left::before {\n  content: \"\\FE94\";\n}\n\n.mdi-arrow-top-right-bottom-left-bold::before {\n  content: \"\\FE95\";\n}\n\n.mdi-arrow-top-right-thick::before {\n  content: \"\\F9C5\";\n}\n\n.mdi-arrow-up::before {\n  content: \"\\F05D\";\n}\n\n.mdi-arrow-up-bold::before {\n  content: \"\\F736\";\n}\n\n.mdi-arrow-up-bold-box::before {\n  content: \"\\F737\";\n}\n\n.mdi-arrow-up-bold-box-outline::before {\n  content: \"\\F738\";\n}\n\n.mdi-arrow-up-bold-circle::before {\n  content: \"\\F05F\";\n}\n\n.mdi-arrow-up-bold-circle-outline::before {\n  content: \"\\F060\";\n}\n\n.mdi-arrow-up-bold-hexagon-outline::before {\n  content: \"\\F061\";\n}\n\n.mdi-arrow-up-bold-outline::before {\n  content: \"\\F9C6\";\n}\n\n.mdi-arrow-up-box::before {\n  content: \"\\F6C2\";\n}\n\n.mdi-arrow-up-circle::before {\n  content: \"\\FCBD\";\n}\n\n.mdi-arrow-up-circle-outline::before {\n  content: \"\\FCBE\";\n}\n\n.mdi-arrow-up-down::before {\n  content: \"\\FE96\";\n}\n\n.mdi-arrow-up-down-bold::before {\n  content: \"\\FE97\";\n}\n\n.mdi-arrow-up-down-bold-outline::before {\n  content: \"\\F9C7\";\n}\n\n.mdi-arrow-up-drop-circle::before {\n  content: \"\\F062\";\n}\n\n.mdi-arrow-up-drop-circle-outline::before {\n  content: \"\\F063\";\n}\n\n.mdi-arrow-up-thick::before {\n  content: \"\\F05E\";\n}\n\n.mdi-arrow-vertical-lock::before {\n  content: \"\\F0187\";\n}\n\n.mdi-artist::before {\n  content: \"\\F802\";\n}\n\n.mdi-artist-outline::before {\n  content: \"\\FCC5\";\n}\n\n.mdi-artstation::before {\n  content: \"\\FB37\";\n}\n\n.mdi-aspect-ratio::before {\n  content: \"\\FA23\";\n}\n\n.mdi-assistant::before {\n  content: \"\\F064\";\n}\n\n.mdi-asterisk::before {\n  content: \"\\F6C3\";\n}\n\n.mdi-at::before {\n  content: \"\\F065\";\n}\n\n.mdi-atlassian::before {\n  content: \"\\F803\";\n}\n\n.mdi-atm::before {\n  content: \"\\FD23\";\n}\n\n.mdi-atom::before {\n  content: \"\\F767\";\n}\n\n.mdi-atom-variant::before {\n  content: \"\\FE98\";\n}\n\n.mdi-attachment::before {\n  content: \"\\F066\";\n}\n\n.mdi-audio-video::before {\n  content: \"\\F93C\";\n}\n\n.mdi-audiobook::before {\n  content: \"\\F067\";\n}\n\n.mdi-augmented-reality::before {\n  content: \"\\F84F\";\n}\n\n.mdi-auto-fix::before {\n  content: \"\\F068\";\n}\n\n.mdi-auto-upload::before {\n  content: \"\\F069\";\n}\n\n.mdi-autorenew::before {\n  content: \"\\F06A\";\n}\n\n.mdi-av-timer::before {\n  content: \"\\F06B\";\n}\n\n.mdi-aws::before {\n  content: \"\\FDF2\";\n}\n\n.mdi-axe::before {\n  content: \"\\F8C7\";\n}\n\n.mdi-axis::before {\n  content: \"\\FD24\";\n}\n\n.mdi-axis-arrow::before {\n  content: \"\\FD25\";\n}\n\n.mdi-axis-arrow-lock::before {\n  content: \"\\FD26\";\n}\n\n.mdi-axis-lock::before {\n  content: \"\\FD27\";\n}\n\n.mdi-axis-x-arrow::before {\n  content: \"\\FD28\";\n}\n\n.mdi-axis-x-arrow-lock::before {\n  content: \"\\FD29\";\n}\n\n.mdi-axis-x-rotate-clockwise::before {\n  content: \"\\FD2A\";\n}\n\n.mdi-axis-x-rotate-counterclockwise::before {\n  content: \"\\FD2B\";\n}\n\n.mdi-axis-x-y-arrow-lock::before {\n  content: \"\\FD2C\";\n}\n\n.mdi-axis-y-arrow::before {\n  content: \"\\FD2D\";\n}\n\n.mdi-axis-y-arrow-lock::before {\n  content: \"\\FD2E\";\n}\n\n.mdi-axis-y-rotate-clockwise::before {\n  content: \"\\FD2F\";\n}\n\n.mdi-axis-y-rotate-counterclockwise::before {\n  content: \"\\FD30\";\n}\n\n.mdi-axis-z-arrow::before {\n  content: \"\\FD31\";\n}\n\n.mdi-axis-z-arrow-lock::before {\n  content: \"\\FD32\";\n}\n\n.mdi-axis-z-rotate-clockwise::before {\n  content: \"\\FD33\";\n}\n\n.mdi-axis-z-rotate-counterclockwise::before {\n  content: \"\\FD34\";\n}\n\n.mdi-azure::before {\n  content: \"\\F804\";\n}\n\n.mdi-azure-devops::before {\n  content: \"\\F0091\";\n}\n\n.mdi-babel::before {\n  content: \"\\FA24\";\n}\n\n.mdi-baby::before {\n  content: \"\\F06C\";\n}\n\n.mdi-baby-bottle::before {\n  content: \"\\FF56\";\n}\n\n.mdi-baby-bottle-outline::before {\n  content: \"\\FF57\";\n}\n\n.mdi-baby-carriage::before {\n  content: \"\\F68E\";\n}\n\n.mdi-baby-carriage-off::before {\n  content: \"\\FFC0\";\n}\n\n.mdi-baby-face::before {\n  content: \"\\FE99\";\n}\n\n.mdi-baby-face-outline::before {\n  content: \"\\FE9A\";\n}\n\n.mdi-backburger::before {\n  content: \"\\F06D\";\n}\n\n.mdi-backspace::before {\n  content: \"\\F06E\";\n}\n\n.mdi-backspace-outline::before {\n  content: \"\\FB38\";\n}\n\n.mdi-backspace-reverse::before {\n  content: \"\\FE9B\";\n}\n\n.mdi-backspace-reverse-outline::before {\n  content: \"\\FE9C\";\n}\n\n.mdi-backup-restore::before {\n  content: \"\\F06F\";\n}\n\n.mdi-bacteria::before {\n  content: \"\\FEF2\";\n}\n\n.mdi-bacteria-outline::before {\n  content: \"\\FEF3\";\n}\n\n.mdi-badminton::before {\n  content: \"\\F850\";\n}\n\n.mdi-bag-carry-on::before {\n  content: \"\\FF58\";\n}\n\n.mdi-bag-carry-on-check::before {\n  content: \"\\FD41\";\n}\n\n.mdi-bag-carry-on-off::before {\n  content: \"\\FF59\";\n}\n\n.mdi-bag-checked::before {\n  content: \"\\FF5A\";\n}\n\n.mdi-bag-personal::before {\n  content: \"\\FDF3\";\n}\n\n.mdi-bag-personal-off::before {\n  content: \"\\FDF4\";\n}\n\n.mdi-bag-personal-off-outline::before {\n  content: \"\\FDF5\";\n}\n\n.mdi-bag-personal-outline::before {\n  content: \"\\FDF6\";\n}\n\n.mdi-baguette::before {\n  content: \"\\FF5B\";\n}\n\n.mdi-balloon::before {\n  content: \"\\FA25\";\n}\n\n.mdi-ballot::before {\n  content: \"\\F9C8\";\n}\n\n.mdi-ballot-outline::before {\n  content: \"\\F9C9\";\n}\n\n.mdi-ballot-recount::before {\n  content: \"\\FC15\";\n}\n\n.mdi-ballot-recount-outline::before {\n  content: \"\\FC16\";\n}\n\n.mdi-bandage::before {\n  content: \"\\FD8B\";\n}\n\n.mdi-bandcamp::before {\n  content: \"\\F674\";\n}\n\n.mdi-bank::before {\n  content: \"\\F070\";\n}\n\n.mdi-bank-minus::before {\n  content: \"\\FD8C\";\n}\n\n.mdi-bank-outline::before {\n  content: \"\\FE9D\";\n}\n\n.mdi-bank-plus::before {\n  content: \"\\FD8D\";\n}\n\n.mdi-bank-remove::before {\n  content: \"\\FD8E\";\n}\n\n.mdi-bank-transfer::before {\n  content: \"\\FA26\";\n}\n\n.mdi-bank-transfer-in::before {\n  content: \"\\FA27\";\n}\n\n.mdi-bank-transfer-out::before {\n  content: \"\\FA28\";\n}\n\n.mdi-barcode::before {\n  content: \"\\F071\";\n}\n\n.mdi-barcode-scan::before {\n  content: \"\\F072\";\n}\n\n.mdi-barley::before {\n  content: \"\\F073\";\n}\n\n.mdi-barley-off::before {\n  content: \"\\FB39\";\n}\n\n.mdi-barn::before {\n  content: \"\\FB3A\";\n}\n\n.mdi-barrel::before {\n  content: \"\\F074\";\n}\n\n.mdi-baseball::before {\n  content: \"\\F851\";\n}\n\n.mdi-baseball-bat::before {\n  content: \"\\F852\";\n}\n\n.mdi-basecamp::before {\n  content: \"\\F075\";\n}\n\n.mdi-bash::before {\n  content: \"\\F01AE\";\n}\n\n.mdi-basket::before {\n  content: \"\\F076\";\n}\n\n.mdi-basket-fill::before {\n  content: \"\\F077\";\n}\n\n.mdi-basket-outline::before {\n  content: \"\\F01AC\";\n}\n\n.mdi-basket-unfill::before {\n  content: \"\\F078\";\n}\n\n.mdi-basketball::before {\n  content: \"\\F805\";\n}\n\n.mdi-basketball-hoop::before {\n  content: \"\\FC17\";\n}\n\n.mdi-basketball-hoop-outline::before {\n  content: \"\\FC18\";\n}\n\n.mdi-bat::before {\n  content: \"\\FB3B\";\n}\n\n.mdi-battery::before {\n  content: \"\\F079\";\n}\n\n.mdi-battery-10::before {\n  content: \"\\F07A\";\n}\n\n.mdi-battery-10-bluetooth::before {\n  content: \"\\F93D\";\n}\n\n.mdi-battery-20::before {\n  content: \"\\F07B\";\n}\n\n.mdi-battery-20-bluetooth::before {\n  content: \"\\F93E\";\n}\n\n.mdi-battery-30::before {\n  content: \"\\F07C\";\n}\n\n.mdi-battery-30-bluetooth::before {\n  content: \"\\F93F\";\n}\n\n.mdi-battery-40::before {\n  content: \"\\F07D\";\n}\n\n.mdi-battery-40-bluetooth::before {\n  content: \"\\F940\";\n}\n\n.mdi-battery-50::before {\n  content: \"\\F07E\";\n}\n\n.mdi-battery-50-bluetooth::before {\n  content: \"\\F941\";\n}\n\n.mdi-battery-60::before {\n  content: \"\\F07F\";\n}\n\n.mdi-battery-60-bluetooth::before {\n  content: \"\\F942\";\n}\n\n.mdi-battery-70::before {\n  content: \"\\F080\";\n}\n\n.mdi-battery-70-bluetooth::before {\n  content: \"\\F943\";\n}\n\n.mdi-battery-80::before {\n  content: \"\\F081\";\n}\n\n.mdi-battery-80-bluetooth::before {\n  content: \"\\F944\";\n}\n\n.mdi-battery-90::before {\n  content: \"\\F082\";\n}\n\n.mdi-battery-90-bluetooth::before {\n  content: \"\\F945\";\n}\n\n.mdi-battery-alert::before {\n  content: \"\\F083\";\n}\n\n.mdi-battery-alert-bluetooth::before {\n  content: \"\\F946\";\n}\n\n.mdi-battery-alert-variant::before {\n  content: \"\\F00F7\";\n}\n\n.mdi-battery-alert-variant-outline::before {\n  content: \"\\F00F8\";\n}\n\n.mdi-battery-bluetooth::before {\n  content: \"\\F947\";\n}\n\n.mdi-battery-bluetooth-variant::before {\n  content: \"\\F948\";\n}\n\n.mdi-battery-charging::before {\n  content: \"\\F084\";\n}\n\n.mdi-battery-charging-10::before {\n  content: \"\\F89B\";\n}\n\n.mdi-battery-charging-100::before {\n  content: \"\\F085\";\n}\n\n.mdi-battery-charging-20::before {\n  content: \"\\F086\";\n}\n\n.mdi-battery-charging-30::before {\n  content: \"\\F087\";\n}\n\n.mdi-battery-charging-40::before {\n  content: \"\\F088\";\n}\n\n.mdi-battery-charging-50::before {\n  content: \"\\F89C\";\n}\n\n.mdi-battery-charging-60::before {\n  content: \"\\F089\";\n}\n\n.mdi-battery-charging-70::before {\n  content: \"\\F89D\";\n}\n\n.mdi-battery-charging-80::before {\n  content: \"\\F08A\";\n}\n\n.mdi-battery-charging-90::before {\n  content: \"\\F08B\";\n}\n\n.mdi-battery-charging-outline::before {\n  content: \"\\F89E\";\n}\n\n.mdi-battery-charging-wireless::before {\n  content: \"\\F806\";\n}\n\n.mdi-battery-charging-wireless-10::before {\n  content: \"\\F807\";\n}\n\n.mdi-battery-charging-wireless-20::before {\n  content: \"\\F808\";\n}\n\n.mdi-battery-charging-wireless-30::before {\n  content: \"\\F809\";\n}\n\n.mdi-battery-charging-wireless-40::before {\n  content: \"\\F80A\";\n}\n\n.mdi-battery-charging-wireless-50::before {\n  content: \"\\F80B\";\n}\n\n.mdi-battery-charging-wireless-60::before {\n  content: \"\\F80C\";\n}\n\n.mdi-battery-charging-wireless-70::before {\n  content: \"\\F80D\";\n}\n\n.mdi-battery-charging-wireless-80::before {\n  content: \"\\F80E\";\n}\n\n.mdi-battery-charging-wireless-90::before {\n  content: \"\\F80F\";\n}\n\n.mdi-battery-charging-wireless-alert::before {\n  content: \"\\F810\";\n}\n\n.mdi-battery-charging-wireless-outline::before {\n  content: \"\\F811\";\n}\n\n.mdi-battery-minus::before {\n  content: \"\\F08C\";\n}\n\n.mdi-battery-negative::before {\n  content: \"\\F08D\";\n}\n\n.mdi-battery-outline::before {\n  content: \"\\F08E\";\n}\n\n.mdi-battery-plus::before {\n  content: \"\\F08F\";\n}\n\n.mdi-battery-positive::before {\n  content: \"\\F090\";\n}\n\n.mdi-battery-unknown::before {\n  content: \"\\F091\";\n}\n\n.mdi-battery-unknown-bluetooth::before {\n  content: \"\\F949\";\n}\n\n.mdi-battlenet::before {\n  content: \"\\FB3C\";\n}\n\n.mdi-beach::before {\n  content: \"\\F092\";\n}\n\n.mdi-beaker::before {\n  content: \"\\FCC6\";\n}\n\n.mdi-beaker-outline::before {\n  content: \"\\F68F\";\n}\n\n.mdi-beats::before {\n  content: \"\\F097\";\n}\n\n.mdi-bed-double::before {\n  content: \"\\F0092\";\n}\n\n.mdi-bed-double-outline::before {\n  content: \"\\F0093\";\n}\n\n.mdi-bed-empty::before {\n  content: \"\\F89F\";\n}\n\n.mdi-bed-king::before {\n  content: \"\\F0094\";\n}\n\n.mdi-bed-king-outline::before {\n  content: \"\\F0095\";\n}\n\n.mdi-bed-queen::before {\n  content: \"\\F0096\";\n}\n\n.mdi-bed-queen-outline::before {\n  content: \"\\F0097\";\n}\n\n.mdi-bed-single::before {\n  content: \"\\F0098\";\n}\n\n.mdi-bed-single-outline::before {\n  content: \"\\F0099\";\n}\n\n.mdi-bee::before {\n  content: \"\\FFC1\";\n}\n\n.mdi-bee-flower::before {\n  content: \"\\FFC2\";\n}\n\n.mdi-beehive-outline::before {\n  content: \"\\F00F9\";\n}\n\n.mdi-beer::before {\n  content: \"\\F098\";\n}\n\n.mdi-behance::before {\n  content: \"\\F099\";\n}\n\n.mdi-bell::before {\n  content: \"\\F09A\";\n}\n\n.mdi-bell-alert::before {\n  content: \"\\FD35\";\n}\n\n.mdi-bell-alert-outline::before {\n  content: \"\\FE9E\";\n}\n\n.mdi-bell-circle::before {\n  content: \"\\FD36\";\n}\n\n.mdi-bell-circle-outline::before {\n  content: \"\\FD37\";\n}\n\n.mdi-bell-off::before {\n  content: \"\\F09B\";\n}\n\n.mdi-bell-off-outline::before {\n  content: \"\\FA90\";\n}\n\n.mdi-bell-outline::before {\n  content: \"\\F09C\";\n}\n\n.mdi-bell-plus::before {\n  content: \"\\F09D\";\n}\n\n.mdi-bell-plus-outline::before {\n  content: \"\\FA91\";\n}\n\n.mdi-bell-ring::before {\n  content: \"\\F09E\";\n}\n\n.mdi-bell-ring-outline::before {\n  content: \"\\F09F\";\n}\n\n.mdi-bell-sleep::before {\n  content: \"\\F0A0\";\n}\n\n.mdi-bell-sleep-outline::before {\n  content: \"\\FA92\";\n}\n\n.mdi-beta::before {\n  content: \"\\F0A1\";\n}\n\n.mdi-betamax::before {\n  content: \"\\F9CA\";\n}\n\n.mdi-biathlon::before {\n  content: \"\\FDF7\";\n}\n\n.mdi-bible::before {\n  content: \"\\F0A2\";\n}\n\n.mdi-bicycle::before {\n  content: \"\\F00C7\";\n}\n\n.mdi-bike::before {\n  content: \"\\F0A3\";\n}\n\n.mdi-bike-fast::before {\n  content: \"\\F014A\";\n}\n\n.mdi-billboard::before {\n  content: \"\\F0032\";\n}\n\n.mdi-billiards::before {\n  content: \"\\FB3D\";\n}\n\n.mdi-billiards-rack::before {\n  content: \"\\FB3E\";\n}\n\n.mdi-bing::before {\n  content: \"\\F0A4\";\n}\n\n.mdi-binoculars::before {\n  content: \"\\F0A5\";\n}\n\n.mdi-bio::before {\n  content: \"\\F0A6\";\n}\n\n.mdi-biohazard::before {\n  content: \"\\F0A7\";\n}\n\n.mdi-bitbucket::before {\n  content: \"\\F0A8\";\n}\n\n.mdi-bitcoin::before {\n  content: \"\\F812\";\n}\n\n.mdi-black-mesa::before {\n  content: \"\\F0A9\";\n}\n\n.mdi-blackberry::before {\n  content: \"\\F0AA\";\n}\n\n.mdi-blender::before {\n  content: \"\\FCC7\";\n}\n\n.mdi-blender-software::before {\n  content: \"\\F0AB\";\n}\n\n.mdi-blinds::before {\n  content: \"\\F0AC\";\n}\n\n.mdi-blinds-open::before {\n  content: \"\\F0033\";\n}\n\n.mdi-block-helper::before {\n  content: \"\\F0AD\";\n}\n\n.mdi-blogger::before {\n  content: \"\\F0AE\";\n}\n\n.mdi-blood-bag::before {\n  content: \"\\FCC8\";\n}\n\n.mdi-bluetooth::before {\n  content: \"\\F0AF\";\n}\n\n.mdi-bluetooth-audio::before {\n  content: \"\\F0B0\";\n}\n\n.mdi-bluetooth-connect::before {\n  content: \"\\F0B1\";\n}\n\n.mdi-bluetooth-off::before {\n  content: \"\\F0B2\";\n}\n\n.mdi-bluetooth-settings::before {\n  content: \"\\F0B3\";\n}\n\n.mdi-bluetooth-transfer::before {\n  content: \"\\F0B4\";\n}\n\n.mdi-blur::before {\n  content: \"\\F0B5\";\n}\n\n.mdi-blur-linear::before {\n  content: \"\\F0B6\";\n}\n\n.mdi-blur-off::before {\n  content: \"\\F0B7\";\n}\n\n.mdi-blur-radial::before {\n  content: \"\\F0B8\";\n}\n\n.mdi-bolnisi-cross::before {\n  content: \"\\FCC9\";\n}\n\n.mdi-bolt::before {\n  content: \"\\FD8F\";\n}\n\n.mdi-bomb::before {\n  content: \"\\F690\";\n}\n\n.mdi-bomb-off::before {\n  content: \"\\F6C4\";\n}\n\n.mdi-bone::before {\n  content: \"\\F0B9\";\n}\n\n.mdi-book::before {\n  content: \"\\F0BA\";\n}\n\n.mdi-book-information-variant::before {\n  content: \"\\F009A\";\n}\n\n.mdi-book-lock::before {\n  content: \"\\F799\";\n}\n\n.mdi-book-lock-open::before {\n  content: \"\\F79A\";\n}\n\n.mdi-book-minus::before {\n  content: \"\\F5D9\";\n}\n\n.mdi-book-minus-multiple::before {\n  content: \"\\FA93\";\n}\n\n.mdi-book-multiple::before {\n  content: \"\\F0BB\";\n}\n\n.mdi-book-open::before {\n  content: \"\\F0BD\";\n}\n\n.mdi-book-open-outline::before {\n  content: \"\\FB3F\";\n}\n\n.mdi-book-open-page-variant::before {\n  content: \"\\F5DA\";\n}\n\n.mdi-book-open-variant::before {\n  content: \"\\F0BE\";\n}\n\n.mdi-book-outline::before {\n  content: \"\\FB40\";\n}\n\n.mdi-book-play::before {\n  content: \"\\FE9F\";\n}\n\n.mdi-book-play-outline::before {\n  content: \"\\FEA0\";\n}\n\n.mdi-book-plus::before {\n  content: \"\\F5DB\";\n}\n\n.mdi-book-plus-multiple::before {\n  content: \"\\FA94\";\n}\n\n.mdi-book-remove::before {\n  content: \"\\FA96\";\n}\n\n.mdi-book-remove-multiple::before {\n  content: \"\\FA95\";\n}\n\n.mdi-book-search::before {\n  content: \"\\FEA1\";\n}\n\n.mdi-book-search-outline::before {\n  content: \"\\FEA2\";\n}\n\n.mdi-book-variant::before {\n  content: \"\\F0BF\";\n}\n\n.mdi-book-variant-multiple::before {\n  content: \"\\F0BC\";\n}\n\n.mdi-bookmark::before {\n  content: \"\\F0C0\";\n}\n\n.mdi-bookmark-check::before {\n  content: \"\\F0C1\";\n}\n\n.mdi-bookmark-minus::before {\n  content: \"\\F9CB\";\n}\n\n.mdi-bookmark-minus-outline::before {\n  content: \"\\F9CC\";\n}\n\n.mdi-bookmark-multiple::before {\n  content: \"\\FDF8\";\n}\n\n.mdi-bookmark-multiple-outline::before {\n  content: \"\\FDF9\";\n}\n\n.mdi-bookmark-music::before {\n  content: \"\\F0C2\";\n}\n\n.mdi-bookmark-off::before {\n  content: \"\\F9CD\";\n}\n\n.mdi-bookmark-off-outline::before {\n  content: \"\\F9CE\";\n}\n\n.mdi-bookmark-outline::before {\n  content: \"\\F0C3\";\n}\n\n.mdi-bookmark-plus::before {\n  content: \"\\F0C5\";\n}\n\n.mdi-bookmark-plus-outline::before {\n  content: \"\\F0C4\";\n}\n\n.mdi-bookmark-remove::before {\n  content: \"\\F0C6\";\n}\n\n.mdi-boom-gate::before {\n  content: \"\\FEA3\";\n}\n\n.mdi-boom-gate-alert::before {\n  content: \"\\FEA4\";\n}\n\n.mdi-boom-gate-alert-outline::before {\n  content: \"\\FEA5\";\n}\n\n.mdi-boom-gate-down::before {\n  content: \"\\FEA6\";\n}\n\n.mdi-boom-gate-down-outline::before {\n  content: \"\\FEA7\";\n}\n\n.mdi-boom-gate-outline::before {\n  content: \"\\FEA8\";\n}\n\n.mdi-boom-gate-up::before {\n  content: \"\\FEA9\";\n}\n\n.mdi-boom-gate-up-outline::before {\n  content: \"\\FEAA\";\n}\n\n.mdi-boombox::before {\n  content: \"\\F5DC\";\n}\n\n.mdi-boomerang::before {\n  content: \"\\F00FA\";\n}\n\n.mdi-bootstrap::before {\n  content: \"\\F6C5\";\n}\n\n.mdi-border-all::before {\n  content: \"\\F0C7\";\n}\n\n.mdi-border-all-variant::before {\n  content: \"\\F8A0\";\n}\n\n.mdi-border-bottom::before {\n  content: \"\\F0C8\";\n}\n\n.mdi-border-bottom-variant::before {\n  content: \"\\F8A1\";\n}\n\n.mdi-border-color::before {\n  content: \"\\F0C9\";\n}\n\n.mdi-border-horizontal::before {\n  content: \"\\F0CA\";\n}\n\n.mdi-border-inside::before {\n  content: \"\\F0CB\";\n}\n\n.mdi-border-left::before {\n  content: \"\\F0CC\";\n}\n\n.mdi-border-left-variant::before {\n  content: \"\\F8A2\";\n}\n\n.mdi-border-none::before {\n  content: \"\\F0CD\";\n}\n\n.mdi-border-none-variant::before {\n  content: \"\\F8A3\";\n}\n\n.mdi-border-outside::before {\n  content: \"\\F0CE\";\n}\n\n.mdi-border-right::before {\n  content: \"\\F0CF\";\n}\n\n.mdi-border-right-variant::before {\n  content: \"\\F8A4\";\n}\n\n.mdi-border-style::before {\n  content: \"\\F0D0\";\n}\n\n.mdi-border-top::before {\n  content: \"\\F0D1\";\n}\n\n.mdi-border-top-variant::before {\n  content: \"\\F8A5\";\n}\n\n.mdi-border-vertical::before {\n  content: \"\\F0D2\";\n}\n\n.mdi-bottle-soda::before {\n  content: \"\\F009B\";\n}\n\n.mdi-bottle-soda-classic::before {\n  content: \"\\F009C\";\n}\n\n.mdi-bottle-soda-outline::before {\n  content: \"\\F009D\";\n}\n\n.mdi-bottle-tonic::before {\n  content: \"\\F0159\";\n}\n\n.mdi-bottle-tonic-outline::before {\n  content: \"\\F015A\";\n}\n\n.mdi-bottle-tonic-plus::before {\n  content: \"\\F015B\";\n}\n\n.mdi-bottle-tonic-plus-outline::before {\n  content: \"\\F015C\";\n}\n\n.mdi-bottle-tonic-skull::before {\n  content: \"\\F015D\";\n}\n\n.mdi-bottle-tonic-skull-outline::before {\n  content: \"\\F015E\";\n}\n\n.mdi-bottle-wine::before {\n  content: \"\\F853\";\n}\n\n.mdi-bow-tie::before {\n  content: \"\\F677\";\n}\n\n.mdi-bowl::before {\n  content: \"\\F617\";\n}\n\n.mdi-bowling::before {\n  content: \"\\F0D3\";\n}\n\n.mdi-box::before {\n  content: \"\\F0D4\";\n}\n\n.mdi-box-cutter::before {\n  content: \"\\F0D5\";\n}\n\n.mdi-box-shadow::before {\n  content: \"\\F637\";\n}\n\n.mdi-boxing-glove::before {\n  content: \"\\FB41\";\n}\n\n.mdi-braille::before {\n  content: \"\\F9CF\";\n}\n\n.mdi-brain::before {\n  content: \"\\F9D0\";\n}\n\n.mdi-bread-slice::before {\n  content: \"\\FCCA\";\n}\n\n.mdi-bread-slice-outline::before {\n  content: \"\\FCCB\";\n}\n\n.mdi-bridge::before {\n  content: \"\\F618\";\n}\n\n.mdi-briefcase::before {\n  content: \"\\F0D6\";\n}\n\n.mdi-briefcase-account::before {\n  content: \"\\FCCC\";\n}\n\n.mdi-briefcase-account-outline::before {\n  content: \"\\FCCD\";\n}\n\n.mdi-briefcase-check::before {\n  content: \"\\F0D7\";\n}\n\n.mdi-briefcase-clock::before {\n  content: \"\\F00FB\";\n}\n\n.mdi-briefcase-clock-outline::before {\n  content: \"\\F00FC\";\n}\n\n.mdi-briefcase-download::before {\n  content: \"\\F0D8\";\n}\n\n.mdi-briefcase-download-outline::before {\n  content: \"\\FC19\";\n}\n\n.mdi-briefcase-edit::before {\n  content: \"\\FA97\";\n}\n\n.mdi-briefcase-edit-outline::before {\n  content: \"\\FC1A\";\n}\n\n.mdi-briefcase-minus::before {\n  content: \"\\FA29\";\n}\n\n.mdi-briefcase-minus-outline::before {\n  content: \"\\FC1B\";\n}\n\n.mdi-briefcase-outline::before {\n  content: \"\\F813\";\n}\n\n.mdi-briefcase-plus::before {\n  content: \"\\FA2A\";\n}\n\n.mdi-briefcase-plus-outline::before {\n  content: \"\\FC1C\";\n}\n\n.mdi-briefcase-remove::before {\n  content: \"\\FA2B\";\n}\n\n.mdi-briefcase-remove-outline::before {\n  content: \"\\FC1D\";\n}\n\n.mdi-briefcase-search::before {\n  content: \"\\FA2C\";\n}\n\n.mdi-briefcase-search-outline::before {\n  content: \"\\FC1E\";\n}\n\n.mdi-briefcase-upload::before {\n  content: \"\\F0D9\";\n}\n\n.mdi-briefcase-upload-outline::before {\n  content: \"\\FC1F\";\n}\n\n.mdi-brightness-1::before {\n  content: \"\\F0DA\";\n}\n\n.mdi-brightness-2::before {\n  content: \"\\F0DB\";\n}\n\n.mdi-brightness-3::before {\n  content: \"\\F0DC\";\n}\n\n.mdi-brightness-4::before {\n  content: \"\\F0DD\";\n}\n\n.mdi-brightness-5::before {\n  content: \"\\F0DE\";\n}\n\n.mdi-brightness-6::before {\n  content: \"\\F0DF\";\n}\n\n.mdi-brightness-7::before {\n  content: \"\\F0E0\";\n}\n\n.mdi-brightness-auto::before {\n  content: \"\\F0E1\";\n}\n\n.mdi-brightness-percent::before {\n  content: \"\\FCCE\";\n}\n\n.mdi-broom::before {\n  content: \"\\F0E2\";\n}\n\n.mdi-brush::before {\n  content: \"\\F0E3\";\n}\n\n.mdi-buddhism::before {\n  content: \"\\F94A\";\n}\n\n.mdi-buffer::before {\n  content: \"\\F619\";\n}\n\n.mdi-bug::before {\n  content: \"\\F0E4\";\n}\n\n.mdi-bug-check::before {\n  content: \"\\FA2D\";\n}\n\n.mdi-bug-check-outline::before {\n  content: \"\\FA2E\";\n}\n\n.mdi-bug-outline::before {\n  content: \"\\FA2F\";\n}\n\n.mdi-bugle::before {\n  content: \"\\FD90\";\n}\n\n.mdi-bulldozer::before {\n  content: \"\\FB07\";\n}\n\n.mdi-bullet::before {\n  content: \"\\FCCF\";\n}\n\n.mdi-bulletin-board::before {\n  content: \"\\F0E5\";\n}\n\n.mdi-bullhorn::before {\n  content: \"\\F0E6\";\n}\n\n.mdi-bullhorn-outline::before {\n  content: \"\\FB08\";\n}\n\n.mdi-bullseye::before {\n  content: \"\\F5DD\";\n}\n\n.mdi-bullseye-arrow::before {\n  content: \"\\F8C8\";\n}\n\n.mdi-bus::before {\n  content: \"\\F0E7\";\n}\n\n.mdi-bus-alert::before {\n  content: \"\\FA98\";\n}\n\n.mdi-bus-articulated-end::before {\n  content: \"\\F79B\";\n}\n\n.mdi-bus-articulated-front::before {\n  content: \"\\F79C\";\n}\n\n.mdi-bus-clock::before {\n  content: \"\\F8C9\";\n}\n\n.mdi-bus-double-decker::before {\n  content: \"\\F79D\";\n}\n\n.mdi-bus-multiple::before {\n  content: \"\\FF5C\";\n}\n\n.mdi-bus-school::before {\n  content: \"\\F79E\";\n}\n\n.mdi-bus-side::before {\n  content: \"\\F79F\";\n}\n\n.mdi-bus-stop::before {\n  content: \"\\F0034\";\n}\n\n.mdi-bus-stop-covered::before {\n  content: \"\\F0035\";\n}\n\n.mdi-bus-stop-uncovered::before {\n  content: \"\\F0036\";\n}\n\n.mdi-cached::before {\n  content: \"\\F0E8\";\n}\n\n.mdi-cactus::before {\n  content: \"\\FD91\";\n}\n\n.mdi-cake::before {\n  content: \"\\F0E9\";\n}\n\n.mdi-cake-layered::before {\n  content: \"\\F0EA\";\n}\n\n.mdi-cake-variant::before {\n  content: \"\\F0EB\";\n}\n\n.mdi-calculator::before {\n  content: \"\\F0EC\";\n}\n\n.mdi-calculator-variant::before {\n  content: \"\\FA99\";\n}\n\n.mdi-calendar::before {\n  content: \"\\F0ED\";\n}\n\n.mdi-calendar-account::before {\n  content: \"\\FEF4\";\n}\n\n.mdi-calendar-account-outline::before {\n  content: \"\\FEF5\";\n}\n\n.mdi-calendar-alert::before {\n  content: \"\\FA30\";\n}\n\n.mdi-calendar-arrow-left::before {\n  content: \"\\F015F\";\n}\n\n.mdi-calendar-arrow-right::before {\n  content: \"\\F0160\";\n}\n\n.mdi-calendar-blank::before {\n  content: \"\\F0EE\";\n}\n\n.mdi-calendar-blank-multiple::before {\n  content: \"\\F009E\";\n}\n\n.mdi-calendar-blank-outline::before {\n  content: \"\\FB42\";\n}\n\n.mdi-calendar-check::before {\n  content: \"\\F0EF\";\n}\n\n.mdi-calendar-check-outline::before {\n  content: \"\\FC20\";\n}\n\n.mdi-calendar-clock::before {\n  content: \"\\F0F0\";\n}\n\n.mdi-calendar-edit::before {\n  content: \"\\F8A6\";\n}\n\n.mdi-calendar-export::before {\n  content: \"\\FB09\";\n}\n\n.mdi-calendar-heart::before {\n  content: \"\\F9D1\";\n}\n\n.mdi-calendar-import::before {\n  content: \"\\FB0A\";\n}\n\n.mdi-calendar-minus::before {\n  content: \"\\FD38\";\n}\n\n.mdi-calendar-month::before {\n  content: \"\\FDFA\";\n}\n\n.mdi-calendar-month-outline::before {\n  content: \"\\FDFB\";\n}\n\n.mdi-calendar-multiple::before {\n  content: \"\\F0F1\";\n}\n\n.mdi-calendar-multiple-check::before {\n  content: \"\\F0F2\";\n}\n\n.mdi-calendar-multiselect::before {\n  content: \"\\FA31\";\n}\n\n.mdi-calendar-outline::before {\n  content: \"\\FB43\";\n}\n\n.mdi-calendar-plus::before {\n  content: \"\\F0F3\";\n}\n\n.mdi-calendar-question::before {\n  content: \"\\F691\";\n}\n\n.mdi-calendar-range::before {\n  content: \"\\F678\";\n}\n\n.mdi-calendar-range-outline::before {\n  content: \"\\FB44\";\n}\n\n.mdi-calendar-remove::before {\n  content: \"\\F0F4\";\n}\n\n.mdi-calendar-remove-outline::before {\n  content: \"\\FC21\";\n}\n\n.mdi-calendar-repeat::before {\n  content: \"\\FEAB\";\n}\n\n.mdi-calendar-repeat-outline::before {\n  content: \"\\FEAC\";\n}\n\n.mdi-calendar-search::before {\n  content: \"\\F94B\";\n}\n\n.mdi-calendar-star::before {\n  content: \"\\F9D2\";\n}\n\n.mdi-calendar-text::before {\n  content: \"\\F0F5\";\n}\n\n.mdi-calendar-text-outline::before {\n  content: \"\\FC22\";\n}\n\n.mdi-calendar-today::before {\n  content: \"\\F0F6\";\n}\n\n.mdi-calendar-week::before {\n  content: \"\\FA32\";\n}\n\n.mdi-calendar-week-begin::before {\n  content: \"\\FA33\";\n}\n\n.mdi-calendar-weekend::before {\n  content: \"\\FEF6\";\n}\n\n.mdi-calendar-weekend-outline::before {\n  content: \"\\FEF7\";\n}\n\n.mdi-call-made::before {\n  content: \"\\F0F7\";\n}\n\n.mdi-call-merge::before {\n  content: \"\\F0F8\";\n}\n\n.mdi-call-missed::before {\n  content: \"\\F0F9\";\n}\n\n.mdi-call-received::before {\n  content: \"\\F0FA\";\n}\n\n.mdi-call-split::before {\n  content: \"\\F0FB\";\n}\n\n.mdi-camcorder::before {\n  content: \"\\F0FC\";\n}\n\n.mdi-camcorder-box::before {\n  content: \"\\F0FD\";\n}\n\n.mdi-camcorder-box-off::before {\n  content: \"\\F0FE\";\n}\n\n.mdi-camcorder-off::before {\n  content: \"\\F0FF\";\n}\n\n.mdi-camera::before {\n  content: \"\\F100\";\n}\n\n.mdi-camera-account::before {\n  content: \"\\F8CA\";\n}\n\n.mdi-camera-burst::before {\n  content: \"\\F692\";\n}\n\n.mdi-camera-control::before {\n  content: \"\\FB45\";\n}\n\n.mdi-camera-enhance::before {\n  content: \"\\F101\";\n}\n\n.mdi-camera-enhance-outline::before {\n  content: \"\\FB46\";\n}\n\n.mdi-camera-front::before {\n  content: \"\\F102\";\n}\n\n.mdi-camera-front-variant::before {\n  content: \"\\F103\";\n}\n\n.mdi-camera-gopro::before {\n  content: \"\\F7A0\";\n}\n\n.mdi-camera-image::before {\n  content: \"\\F8CB\";\n}\n\n.mdi-camera-iris::before {\n  content: \"\\F104\";\n}\n\n.mdi-camera-metering-center::before {\n  content: \"\\F7A1\";\n}\n\n.mdi-camera-metering-matrix::before {\n  content: \"\\F7A2\";\n}\n\n.mdi-camera-metering-partial::before {\n  content: \"\\F7A3\";\n}\n\n.mdi-camera-metering-spot::before {\n  content: \"\\F7A4\";\n}\n\n.mdi-camera-off::before {\n  content: \"\\F5DF\";\n}\n\n.mdi-camera-outline::before {\n  content: \"\\FD39\";\n}\n\n.mdi-camera-party-mode::before {\n  content: \"\\F105\";\n}\n\n.mdi-camera-plus::before {\n  content: \"\\FEF8\";\n}\n\n.mdi-camera-plus-outline::before {\n  content: \"\\FEF9\";\n}\n\n.mdi-camera-rear::before {\n  content: \"\\F106\";\n}\n\n.mdi-camera-rear-variant::before {\n  content: \"\\F107\";\n}\n\n.mdi-camera-retake::before {\n  content: \"\\FDFC\";\n}\n\n.mdi-camera-retake-outline::before {\n  content: \"\\FDFD\";\n}\n\n.mdi-camera-switch::before {\n  content: \"\\F108\";\n}\n\n.mdi-camera-timer::before {\n  content: \"\\F109\";\n}\n\n.mdi-camera-wireless::before {\n  content: \"\\FD92\";\n}\n\n.mdi-camera-wireless-outline::before {\n  content: \"\\FD93\";\n}\n\n.mdi-campfire::before {\n  content: \"\\FEFA\";\n}\n\n.mdi-cancel::before {\n  content: \"\\F739\";\n}\n\n.mdi-candle::before {\n  content: \"\\F5E2\";\n}\n\n.mdi-candycane::before {\n  content: \"\\F10A\";\n}\n\n.mdi-cannabis::before {\n  content: \"\\F7A5\";\n}\n\n.mdi-caps-lock::before {\n  content: \"\\FA9A\";\n}\n\n.mdi-car::before {\n  content: \"\\F10B\";\n}\n\n.mdi-car-2-plus::before {\n  content: \"\\F0037\";\n}\n\n.mdi-car-3-plus::before {\n  content: \"\\F0038\";\n}\n\n.mdi-car-back::before {\n  content: \"\\FDFE\";\n}\n\n.mdi-car-battery::before {\n  content: \"\\F10C\";\n}\n\n.mdi-car-brake-abs::before {\n  content: \"\\FC23\";\n}\n\n.mdi-car-brake-alert::before {\n  content: \"\\FC24\";\n}\n\n.mdi-car-brake-hold::before {\n  content: \"\\FD3A\";\n}\n\n.mdi-car-brake-parking::before {\n  content: \"\\FD3B\";\n}\n\n.mdi-car-brake-retarder::before {\n  content: \"\\F0039\";\n}\n\n.mdi-car-child-seat::before {\n  content: \"\\FFC3\";\n}\n\n.mdi-car-clutch::before {\n  content: \"\\F003A\";\n}\n\n.mdi-car-connected::before {\n  content: \"\\F10D\";\n}\n\n.mdi-car-convertible::before {\n  content: \"\\F7A6\";\n}\n\n.mdi-car-coolant-level::before {\n  content: \"\\F003B\";\n}\n\n.mdi-car-cruise-control::before {\n  content: \"\\FD3C\";\n}\n\n.mdi-car-defrost-front::before {\n  content: \"\\FD3D\";\n}\n\n.mdi-car-defrost-rear::before {\n  content: \"\\FD3E\";\n}\n\n.mdi-car-door::before {\n  content: \"\\FB47\";\n}\n\n.mdi-car-door-lock::before {\n  content: \"\\F00C8\";\n}\n\n.mdi-car-electric::before {\n  content: \"\\FB48\";\n}\n\n.mdi-car-esp::before {\n  content: \"\\FC25\";\n}\n\n.mdi-car-estate::before {\n  content: \"\\F7A7\";\n}\n\n.mdi-car-hatchback::before {\n  content: \"\\F7A8\";\n}\n\n.mdi-car-key::before {\n  content: \"\\FB49\";\n}\n\n.mdi-car-light-dimmed::before {\n  content: \"\\FC26\";\n}\n\n.mdi-car-light-fog::before {\n  content: \"\\FC27\";\n}\n\n.mdi-car-light-high::before {\n  content: \"\\FC28\";\n}\n\n.mdi-car-limousine::before {\n  content: \"\\F8CC\";\n}\n\n.mdi-car-multiple::before {\n  content: \"\\FB4A\";\n}\n\n.mdi-car-off::before {\n  content: \"\\FDFF\";\n}\n\n.mdi-car-parking-lights::before {\n  content: \"\\FD3F\";\n}\n\n.mdi-car-pickup::before {\n  content: \"\\F7A9\";\n}\n\n.mdi-car-seat::before {\n  content: \"\\FFC4\";\n}\n\n.mdi-car-seat-cooler::before {\n  content: \"\\FFC5\";\n}\n\n.mdi-car-seat-heater::before {\n  content: \"\\FFC6\";\n}\n\n.mdi-car-shift-pattern::before {\n  content: \"\\FF5D\";\n}\n\n.mdi-car-side::before {\n  content: \"\\F7AA\";\n}\n\n.mdi-car-sports::before {\n  content: \"\\F7AB\";\n}\n\n.mdi-car-tire-alert::before {\n  content: \"\\FC29\";\n}\n\n.mdi-car-traction-control::before {\n  content: \"\\FD40\";\n}\n\n.mdi-car-turbocharger::before {\n  content: \"\\F003C\";\n}\n\n.mdi-car-wash::before {\n  content: \"\\F10E\";\n}\n\n.mdi-car-windshield::before {\n  content: \"\\F003D\";\n}\n\n.mdi-car-windshield-outline::before {\n  content: \"\\F003E\";\n}\n\n.mdi-caravan::before {\n  content: \"\\F7AC\";\n}\n\n.mdi-card::before {\n  content: \"\\FB4B\";\n}\n\n.mdi-card-bulleted::before {\n  content: \"\\FB4C\";\n}\n\n.mdi-card-bulleted-off::before {\n  content: \"\\FB4D\";\n}\n\n.mdi-card-bulleted-off-outline::before {\n  content: \"\\FB4E\";\n}\n\n.mdi-card-bulleted-outline::before {\n  content: \"\\FB4F\";\n}\n\n.mdi-card-bulleted-settings::before {\n  content: \"\\FB50\";\n}\n\n.mdi-card-bulleted-settings-outline::before {\n  content: \"\\FB51\";\n}\n\n.mdi-card-outline::before {\n  content: \"\\FB52\";\n}\n\n.mdi-card-search::before {\n  content: \"\\F009F\";\n}\n\n.mdi-card-search-outline::before {\n  content: \"\\F00A0\";\n}\n\n.mdi-card-text::before {\n  content: \"\\FB53\";\n}\n\n.mdi-card-text-outline::before {\n  content: \"\\FB54\";\n}\n\n.mdi-cards::before {\n  content: \"\\F638\";\n}\n\n.mdi-cards-club::before {\n  content: \"\\F8CD\";\n}\n\n.mdi-cards-diamond::before {\n  content: \"\\F8CE\";\n}\n\n.mdi-cards-diamond-outline::before {\n  content: \"\\F003F\";\n}\n\n.mdi-cards-heart::before {\n  content: \"\\F8CF\";\n}\n\n.mdi-cards-outline::before {\n  content: \"\\F639\";\n}\n\n.mdi-cards-playing-outline::before {\n  content: \"\\F63A\";\n}\n\n.mdi-cards-spade::before {\n  content: \"\\F8D0\";\n}\n\n.mdi-cards-variant::before {\n  content: \"\\F6C6\";\n}\n\n.mdi-carrot::before {\n  content: \"\\F10F\";\n}\n\n.mdi-cart::before {\n  content: \"\\F110\";\n}\n\n.mdi-cart-arrow-down::before {\n  content: \"\\FD42\";\n}\n\n.mdi-cart-arrow-right::before {\n  content: \"\\FC2A\";\n}\n\n.mdi-cart-arrow-up::before {\n  content: \"\\FD43\";\n}\n\n.mdi-cart-minus::before {\n  content: \"\\FD44\";\n}\n\n.mdi-cart-off::before {\n  content: \"\\F66B\";\n}\n\n.mdi-cart-outline::before {\n  content: \"\\F111\";\n}\n\n.mdi-cart-plus::before {\n  content: \"\\F112\";\n}\n\n.mdi-cart-remove::before {\n  content: \"\\FD45\";\n}\n\n.mdi-case-sensitive-alt::before {\n  content: \"\\F113\";\n}\n\n.mdi-cash::before {\n  content: \"\\F114\";\n}\n\n.mdi-cash-100::before {\n  content: \"\\F115\";\n}\n\n.mdi-cash-marker::before {\n  content: \"\\FD94\";\n}\n\n.mdi-cash-multiple::before {\n  content: \"\\F116\";\n}\n\n.mdi-cash-refund::before {\n  content: \"\\FA9B\";\n}\n\n.mdi-cash-register::before {\n  content: \"\\FCD0\";\n}\n\n.mdi-cash-usd::before {\n  content: \"\\F01A1\";\n}\n\n.mdi-cash-usd-outline::before {\n  content: \"\\F117\";\n}\n\n.mdi-cassette::before {\n  content: \"\\F9D3\";\n}\n\n.mdi-cast::before {\n  content: \"\\F118\";\n}\n\n.mdi-cast-audio::before {\n  content: \"\\F0040\";\n}\n\n.mdi-cast-connected::before {\n  content: \"\\F119\";\n}\n\n.mdi-cast-education::before {\n  content: \"\\FE6D\";\n}\n\n.mdi-cast-off::before {\n  content: \"\\F789\";\n}\n\n.mdi-castle::before {\n  content: \"\\F11A\";\n}\n\n.mdi-cat::before {\n  content: \"\\F11B\";\n}\n\n.mdi-cctv::before {\n  content: \"\\F7AD\";\n}\n\n.mdi-ceiling-light::before {\n  content: \"\\F768\";\n}\n\n.mdi-cellphone::before {\n  content: \"\\F11C\";\n}\n\n.mdi-cellphone-android::before {\n  content: \"\\F11D\";\n}\n\n.mdi-cellphone-arrow-down::before {\n  content: \"\\F9D4\";\n}\n\n.mdi-cellphone-basic::before {\n  content: \"\\F11E\";\n}\n\n.mdi-cellphone-dock::before {\n  content: \"\\F11F\";\n}\n\n.mdi-cellphone-erase::before {\n  content: \"\\F94C\";\n}\n\n.mdi-cellphone-information::before {\n  content: \"\\FF5E\";\n}\n\n.mdi-cellphone-iphone::before {\n  content: \"\\F120\";\n}\n\n.mdi-cellphone-key::before {\n  content: \"\\F94D\";\n}\n\n.mdi-cellphone-link::before {\n  content: \"\\F121\";\n}\n\n.mdi-cellphone-link-off::before {\n  content: \"\\F122\";\n}\n\n.mdi-cellphone-lock::before {\n  content: \"\\F94E\";\n}\n\n.mdi-cellphone-message::before {\n  content: \"\\F8D2\";\n}\n\n.mdi-cellphone-message-off::before {\n  content: \"\\F00FD\";\n}\n\n.mdi-cellphone-nfc::before {\n  content: \"\\FEAD\";\n}\n\n.mdi-cellphone-off::before {\n  content: \"\\F94F\";\n}\n\n.mdi-cellphone-play::before {\n  content: \"\\F0041\";\n}\n\n.mdi-cellphone-screenshot::before {\n  content: \"\\FA34\";\n}\n\n.mdi-cellphone-settings::before {\n  content: \"\\F123\";\n}\n\n.mdi-cellphone-settings-variant::before {\n  content: \"\\F950\";\n}\n\n.mdi-cellphone-sound::before {\n  content: \"\\F951\";\n}\n\n.mdi-cellphone-text::before {\n  content: \"\\F8D1\";\n}\n\n.mdi-cellphone-wireless::before {\n  content: \"\\F814\";\n}\n\n.mdi-celtic-cross::before {\n  content: \"\\FCD1\";\n}\n\n.mdi-centos::before {\n  content: \"\\F0145\";\n}\n\n.mdi-certificate::before {\n  content: \"\\F124\";\n}\n\n.mdi-certificate-outline::before {\n  content: \"\\F01B3\";\n}\n\n.mdi-chair-rolling::before {\n  content: \"\\FFBA\";\n}\n\n.mdi-chair-school::before {\n  content: \"\\F125\";\n}\n\n.mdi-charity::before {\n  content: \"\\FC2B\";\n}\n\n.mdi-chart-arc::before {\n  content: \"\\F126\";\n}\n\n.mdi-chart-areaspline::before {\n  content: \"\\F127\";\n}\n\n.mdi-chart-areaspline-variant::before {\n  content: \"\\FEAE\";\n}\n\n.mdi-chart-bar::before {\n  content: \"\\F128\";\n}\n\n.mdi-chart-bar-stacked::before {\n  content: \"\\F769\";\n}\n\n.mdi-chart-bell-curve::before {\n  content: \"\\FC2C\";\n}\n\n.mdi-chart-bell-curve-cumulative::before {\n  content: \"\\FFC7\";\n}\n\n.mdi-chart-bubble::before {\n  content: \"\\F5E3\";\n}\n\n.mdi-chart-donut::before {\n  content: \"\\F7AE\";\n}\n\n.mdi-chart-donut-variant::before {\n  content: \"\\F7AF\";\n}\n\n.mdi-chart-gantt::before {\n  content: \"\\F66C\";\n}\n\n.mdi-chart-histogram::before {\n  content: \"\\F129\";\n}\n\n.mdi-chart-line::before {\n  content: \"\\F12A\";\n}\n\n.mdi-chart-line-stacked::before {\n  content: \"\\F76A\";\n}\n\n.mdi-chart-line-variant::before {\n  content: \"\\F7B0\";\n}\n\n.mdi-chart-multiline::before {\n  content: \"\\F8D3\";\n}\n\n.mdi-chart-pie::before {\n  content: \"\\F12B\";\n}\n\n.mdi-chart-scatter-plot::before {\n  content: \"\\FEAF\";\n}\n\n.mdi-chart-scatter-plot-hexbin::before {\n  content: \"\\F66D\";\n}\n\n.mdi-chart-timeline::before {\n  content: \"\\F66E\";\n}\n\n.mdi-chart-timeline-variant::before {\n  content: \"\\FEB0\";\n}\n\n.mdi-chart-tree::before {\n  content: \"\\FEB1\";\n}\n\n.mdi-chat::before {\n  content: \"\\FB55\";\n}\n\n.mdi-chat-alert::before {\n  content: \"\\FB56\";\n}\n\n.mdi-chat-outline::before {\n  content: \"\\FEFB\";\n}\n\n.mdi-chat-processing::before {\n  content: \"\\FB57\";\n}\n\n.mdi-check::before {\n  content: \"\\F12C\";\n}\n\n.mdi-check-all::before {\n  content: \"\\F12D\";\n}\n\n.mdi-check-bold::before {\n  content: \"\\FE6E\";\n}\n\n.mdi-check-box-multiple-outline::before {\n  content: \"\\FC2D\";\n}\n\n.mdi-check-box-outline::before {\n  content: \"\\FC2E\";\n}\n\n.mdi-check-circle::before {\n  content: \"\\F5E0\";\n}\n\n.mdi-check-circle-outline::before {\n  content: \"\\F5E1\";\n}\n\n.mdi-check-decagram::before {\n  content: \"\\F790\";\n}\n\n.mdi-check-network::before {\n  content: \"\\FC2F\";\n}\n\n.mdi-check-network-outline::before {\n  content: \"\\FC30\";\n}\n\n.mdi-check-outline::before {\n  content: \"\\F854\";\n}\n\n.mdi-check-underline::before {\n  content: \"\\FE70\";\n}\n\n.mdi-check-underline-circle::before {\n  content: \"\\FE71\";\n}\n\n.mdi-check-underline-circle-outline::before {\n  content: \"\\FE72\";\n}\n\n.mdi-checkbook::before {\n  content: \"\\FA9C\";\n}\n\n.mdi-checkbox-blank::before {\n  content: \"\\F12E\";\n}\n\n.mdi-checkbox-blank-circle::before {\n  content: \"\\F12F\";\n}\n\n.mdi-checkbox-blank-circle-outline::before {\n  content: \"\\F130\";\n}\n\n.mdi-checkbox-blank-outline::before {\n  content: \"\\F131\";\n}\n\n.mdi-checkbox-intermediate::before {\n  content: \"\\F855\";\n}\n\n.mdi-checkbox-marked::before {\n  content: \"\\F132\";\n}\n\n.mdi-checkbox-marked-circle::before {\n  content: \"\\F133\";\n}\n\n.mdi-checkbox-marked-circle-outline::before {\n  content: \"\\F134\";\n}\n\n.mdi-checkbox-marked-outline::before {\n  content: \"\\F135\";\n}\n\n.mdi-checkbox-multiple-blank::before {\n  content: \"\\F136\";\n}\n\n.mdi-checkbox-multiple-blank-circle::before {\n  content: \"\\F63B\";\n}\n\n.mdi-checkbox-multiple-blank-circle-outline::before {\n  content: \"\\F63C\";\n}\n\n.mdi-checkbox-multiple-blank-outline::before {\n  content: \"\\F137\";\n}\n\n.mdi-checkbox-multiple-marked::before {\n  content: \"\\F138\";\n}\n\n.mdi-checkbox-multiple-marked-circle::before {\n  content: \"\\F63D\";\n}\n\n.mdi-checkbox-multiple-marked-circle-outline::before {\n  content: \"\\F63E\";\n}\n\n.mdi-checkbox-multiple-marked-outline::before {\n  content: \"\\F139\";\n}\n\n.mdi-checkerboard::before {\n  content: \"\\F13A\";\n}\n\n.mdi-chef-hat::before {\n  content: \"\\FB58\";\n}\n\n.mdi-chemical-weapon::before {\n  content: \"\\F13B\";\n}\n\n.mdi-chess-bishop::before {\n  content: \"\\F85B\";\n}\n\n.mdi-chess-king::before {\n  content: \"\\F856\";\n}\n\n.mdi-chess-knight::before {\n  content: \"\\F857\";\n}\n\n.mdi-chess-pawn::before {\n  content: \"\\F858\";\n}\n\n.mdi-chess-queen::before {\n  content: \"\\F859\";\n}\n\n.mdi-chess-rook::before {\n  content: \"\\F85A\";\n}\n\n.mdi-chevron-double-down::before {\n  content: \"\\F13C\";\n}\n\n.mdi-chevron-double-left::before {\n  content: \"\\F13D\";\n}\n\n.mdi-chevron-double-right::before {\n  content: \"\\F13E\";\n}\n\n.mdi-chevron-double-up::before {\n  content: \"\\F13F\";\n}\n\n.mdi-chevron-down::before {\n  content: \"\\F140\";\n}\n\n.mdi-chevron-down-box::before {\n  content: \"\\F9D5\";\n}\n\n.mdi-chevron-down-box-outline::before {\n  content: \"\\F9D6\";\n}\n\n.mdi-chevron-down-circle::before {\n  content: \"\\FB0B\";\n}\n\n.mdi-chevron-down-circle-outline::before {\n  content: \"\\FB0C\";\n}\n\n.mdi-chevron-left::before {\n  content: \"\\F141\";\n}\n\n.mdi-chevron-left-box::before {\n  content: \"\\F9D7\";\n}\n\n.mdi-chevron-left-box-outline::before {\n  content: \"\\F9D8\";\n}\n\n.mdi-chevron-left-circle::before {\n  content: \"\\FB0D\";\n}\n\n.mdi-chevron-left-circle-outline::before {\n  content: \"\\FB0E\";\n}\n\n.mdi-chevron-right::before {\n  content: \"\\F142\";\n}\n\n.mdi-chevron-right-box::before {\n  content: \"\\F9D9\";\n}\n\n.mdi-chevron-right-box-outline::before {\n  content: \"\\F9DA\";\n}\n\n.mdi-chevron-right-circle::before {\n  content: \"\\FB0F\";\n}\n\n.mdi-chevron-right-circle-outline::before {\n  content: \"\\FB10\";\n}\n\n.mdi-chevron-triple-down::before {\n  content: \"\\FD95\";\n}\n\n.mdi-chevron-triple-left::before {\n  content: \"\\FD96\";\n}\n\n.mdi-chevron-triple-right::before {\n  content: \"\\FD97\";\n}\n\n.mdi-chevron-triple-up::before {\n  content: \"\\FD98\";\n}\n\n.mdi-chevron-up::before {\n  content: \"\\F143\";\n}\n\n.mdi-chevron-up-box::before {\n  content: \"\\F9DB\";\n}\n\n.mdi-chevron-up-box-outline::before {\n  content: \"\\F9DC\";\n}\n\n.mdi-chevron-up-circle::before {\n  content: \"\\FB11\";\n}\n\n.mdi-chevron-up-circle-outline::before {\n  content: \"\\FB12\";\n}\n\n.mdi-chili-hot::before {\n  content: \"\\F7B1\";\n}\n\n.mdi-chili-medium::before {\n  content: \"\\F7B2\";\n}\n\n.mdi-chili-mild::before {\n  content: \"\\F7B3\";\n}\n\n.mdi-chip::before {\n  content: \"\\F61A\";\n}\n\n.mdi-christianity::before {\n  content: \"\\F952\";\n}\n\n.mdi-christianity-outline::before {\n  content: \"\\FCD2\";\n}\n\n.mdi-church::before {\n  content: \"\\F144\";\n}\n\n.mdi-cigar::before {\n  content: \"\\F01B4\";\n}\n\n.mdi-circle::before {\n  content: \"\\F764\";\n}\n\n.mdi-circle-double::before {\n  content: \"\\FEB2\";\n}\n\n.mdi-circle-edit-outline::before {\n  content: \"\\F8D4\";\n}\n\n.mdi-circle-expand::before {\n  content: \"\\FEB3\";\n}\n\n.mdi-circle-medium::before {\n  content: \"\\F9DD\";\n}\n\n.mdi-circle-off-outline::before {\n  content: \"\\F00FE\";\n}\n\n.mdi-circle-outline::before {\n  content: \"\\F765\";\n}\n\n.mdi-circle-slice-1::before {\n  content: \"\\FA9D\";\n}\n\n.mdi-circle-slice-2::before {\n  content: \"\\FA9E\";\n}\n\n.mdi-circle-slice-3::before {\n  content: \"\\FA9F\";\n}\n\n.mdi-circle-slice-4::before {\n  content: \"\\FAA0\";\n}\n\n.mdi-circle-slice-5::before {\n  content: \"\\FAA1\";\n}\n\n.mdi-circle-slice-6::before {\n  content: \"\\FAA2\";\n}\n\n.mdi-circle-slice-7::before {\n  content: \"\\FAA3\";\n}\n\n.mdi-circle-slice-8::before {\n  content: \"\\FAA4\";\n}\n\n.mdi-circle-small::before {\n  content: \"\\F9DE\";\n}\n\n.mdi-circular-saw::before {\n  content: \"\\FE73\";\n}\n\n.mdi-cisco-webex::before {\n  content: \"\\F145\";\n}\n\n.mdi-city::before {\n  content: \"\\F146\";\n}\n\n.mdi-city-variant::before {\n  content: \"\\FA35\";\n}\n\n.mdi-city-variant-outline::before {\n  content: \"\\FA36\";\n}\n\n.mdi-clipboard::before {\n  content: \"\\F147\";\n}\n\n.mdi-clipboard-account::before {\n  content: \"\\F148\";\n}\n\n.mdi-clipboard-account-outline::before {\n  content: \"\\FC31\";\n}\n\n.mdi-clipboard-alert::before {\n  content: \"\\F149\";\n}\n\n.mdi-clipboard-alert-outline::before {\n  content: \"\\FCD3\";\n}\n\n.mdi-clipboard-arrow-down::before {\n  content: \"\\F14A\";\n}\n\n.mdi-clipboard-arrow-down-outline::before {\n  content: \"\\FC32\";\n}\n\n.mdi-clipboard-arrow-left::before {\n  content: \"\\F14B\";\n}\n\n.mdi-clipboard-arrow-left-outline::before {\n  content: \"\\FCD4\";\n}\n\n.mdi-clipboard-arrow-right::before {\n  content: \"\\FCD5\";\n}\n\n.mdi-clipboard-arrow-right-outline::before {\n  content: \"\\FCD6\";\n}\n\n.mdi-clipboard-arrow-up::before {\n  content: \"\\FC33\";\n}\n\n.mdi-clipboard-arrow-up-outline::before {\n  content: \"\\FC34\";\n}\n\n.mdi-clipboard-check::before {\n  content: \"\\F14C\";\n}\n\n.mdi-clipboard-check-outline::before {\n  content: \"\\F8A7\";\n}\n\n.mdi-clipboard-flow::before {\n  content: \"\\F6C7\";\n}\n\n.mdi-clipboard-flow-outline::before {\n  content: \"\\F0142\";\n}\n\n.mdi-clipboard-list::before {\n  content: \"\\F00FF\";\n}\n\n.mdi-clipboard-list-outline::before {\n  content: \"\\F0100\";\n}\n\n.mdi-clipboard-outline::before {\n  content: \"\\F14D\";\n}\n\n.mdi-clipboard-play::before {\n  content: \"\\FC35\";\n}\n\n.mdi-clipboard-play-outline::before {\n  content: \"\\FC36\";\n}\n\n.mdi-clipboard-plus::before {\n  content: \"\\F750\";\n}\n\n.mdi-clipboard-pulse::before {\n  content: \"\\F85C\";\n}\n\n.mdi-clipboard-pulse-outline::before {\n  content: \"\\F85D\";\n}\n\n.mdi-clipboard-text::before {\n  content: \"\\F14E\";\n}\n\n.mdi-clipboard-text-outline::before {\n  content: \"\\FA37\";\n}\n\n.mdi-clipboard-text-play::before {\n  content: \"\\FC37\";\n}\n\n.mdi-clipboard-text-play-outline::before {\n  content: \"\\FC38\";\n}\n\n.mdi-clippy::before {\n  content: \"\\F14F\";\n}\n\n.mdi-clock::before {\n  content: \"\\F953\";\n}\n\n.mdi-clock-alert::before {\n  content: \"\\F954\";\n}\n\n.mdi-clock-alert-outline::before {\n  content: \"\\F5CE\";\n}\n\n.mdi-clock-check::before {\n  content: \"\\FFC8\";\n}\n\n.mdi-clock-check-outline::before {\n  content: \"\\FFC9\";\n}\n\n.mdi-clock-digital::before {\n  content: \"\\FEB4\";\n}\n\n.mdi-clock-end::before {\n  content: \"\\F151\";\n}\n\n.mdi-clock-fast::before {\n  content: \"\\F152\";\n}\n\n.mdi-clock-in::before {\n  content: \"\\F153\";\n}\n\n.mdi-clock-out::before {\n  content: \"\\F154\";\n}\n\n.mdi-clock-outline::before {\n  content: \"\\F150\";\n}\n\n.mdi-clock-start::before {\n  content: \"\\F155\";\n}\n\n.mdi-close::before {\n  content: \"\\F156\";\n}\n\n.mdi-close-box::before {\n  content: \"\\F157\";\n}\n\n.mdi-close-box-multiple::before {\n  content: \"\\FC39\";\n}\n\n.mdi-close-box-multiple-outline::before {\n  content: \"\\FC3A\";\n}\n\n.mdi-close-box-outline::before {\n  content: \"\\F158\";\n}\n\n.mdi-close-circle::before {\n  content: \"\\F159\";\n}\n\n.mdi-close-circle-outline::before {\n  content: \"\\F15A\";\n}\n\n.mdi-close-network::before {\n  content: \"\\F15B\";\n}\n\n.mdi-close-network-outline::before {\n  content: \"\\FC3B\";\n}\n\n.mdi-close-octagon::before {\n  content: \"\\F15C\";\n}\n\n.mdi-close-octagon-outline::before {\n  content: \"\\F15D\";\n}\n\n.mdi-close-outline::before {\n  content: \"\\F6C8\";\n}\n\n.mdi-closed-caption::before {\n  content: \"\\F15E\";\n}\n\n.mdi-closed-caption-outline::before {\n  content: \"\\FD99\";\n}\n\n.mdi-cloud::before {\n  content: \"\\F15F\";\n}\n\n.mdi-cloud-alert::before {\n  content: \"\\F9DF\";\n}\n\n.mdi-cloud-braces::before {\n  content: \"\\F7B4\";\n}\n\n.mdi-cloud-check::before {\n  content: \"\\F160\";\n}\n\n.mdi-cloud-circle::before {\n  content: \"\\F161\";\n}\n\n.mdi-cloud-download::before {\n  content: \"\\F162\";\n}\n\n.mdi-cloud-download-outline::before {\n  content: \"\\FB59\";\n}\n\n.mdi-cloud-off-outline::before {\n  content: \"\\F164\";\n}\n\n.mdi-cloud-outline::before {\n  content: \"\\F163\";\n}\n\n.mdi-cloud-print::before {\n  content: \"\\F165\";\n}\n\n.mdi-cloud-print-outline::before {\n  content: \"\\F166\";\n}\n\n.mdi-cloud-question::before {\n  content: \"\\FA38\";\n}\n\n.mdi-cloud-search::before {\n  content: \"\\F955\";\n}\n\n.mdi-cloud-search-outline::before {\n  content: \"\\F956\";\n}\n\n.mdi-cloud-sync::before {\n  content: \"\\F63F\";\n}\n\n.mdi-cloud-tags::before {\n  content: \"\\F7B5\";\n}\n\n.mdi-cloud-upload::before {\n  content: \"\\F167\";\n}\n\n.mdi-cloud-upload-outline::before {\n  content: \"\\FB5A\";\n}\n\n.mdi-clover::before {\n  content: \"\\F815\";\n}\n\n.mdi-coach-lamp::before {\n  content: \"\\F0042\";\n}\n\n.mdi-coat-rack::before {\n  content: \"\\F00C9\";\n}\n\n.mdi-code-array::before {\n  content: \"\\F168\";\n}\n\n.mdi-code-braces::before {\n  content: \"\\F169\";\n}\n\n.mdi-code-braces-box::before {\n  content: \"\\F0101\";\n}\n\n.mdi-code-brackets::before {\n  content: \"\\F16A\";\n}\n\n.mdi-code-equal::before {\n  content: \"\\F16B\";\n}\n\n.mdi-code-greater-than::before {\n  content: \"\\F16C\";\n}\n\n.mdi-code-greater-than-or-equal::before {\n  content: \"\\F16D\";\n}\n\n.mdi-code-less-than::before {\n  content: \"\\F16E\";\n}\n\n.mdi-code-less-than-or-equal::before {\n  content: \"\\F16F\";\n}\n\n.mdi-code-not-equal::before {\n  content: \"\\F170\";\n}\n\n.mdi-code-not-equal-variant::before {\n  content: \"\\F171\";\n}\n\n.mdi-code-parentheses::before {\n  content: \"\\F172\";\n}\n\n.mdi-code-parentheses-box::before {\n  content: \"\\F0102\";\n}\n\n.mdi-code-string::before {\n  content: \"\\F173\";\n}\n\n.mdi-code-tags::before {\n  content: \"\\F174\";\n}\n\n.mdi-code-tags-check::before {\n  content: \"\\F693\";\n}\n\n.mdi-codepen::before {\n  content: \"\\F175\";\n}\n\n.mdi-coffee::before {\n  content: \"\\F176\";\n}\n\n.mdi-coffee-maker::before {\n  content: \"\\F00CA\";\n}\n\n.mdi-coffee-off::before {\n  content: \"\\FFCA\";\n}\n\n.mdi-coffee-off-outline::before {\n  content: \"\\FFCB\";\n}\n\n.mdi-coffee-outline::before {\n  content: \"\\F6C9\";\n}\n\n.mdi-coffee-to-go::before {\n  content: \"\\F177\";\n}\n\n.mdi-coffin::before {\n  content: \"\\FB5B\";\n}\n\n.mdi-cogs::before {\n  content: \"\\F8D5\";\n}\n\n.mdi-coin::before {\n  content: \"\\F0196\";\n}\n\n.mdi-coin-outline::before {\n  content: \"\\F178\";\n}\n\n.mdi-coins::before {\n  content: \"\\F694\";\n}\n\n.mdi-collage::before {\n  content: \"\\F640\";\n}\n\n.mdi-collapse-all::before {\n  content: \"\\FAA5\";\n}\n\n.mdi-collapse-all-outline::before {\n  content: \"\\FAA6\";\n}\n\n.mdi-color-helper::before {\n  content: \"\\F179\";\n}\n\n.mdi-comma::before {\n  content: \"\\FE74\";\n}\n\n.mdi-comma-box::before {\n  content: \"\\FE75\";\n}\n\n.mdi-comma-box-outline::before {\n  content: \"\\FE76\";\n}\n\n.mdi-comma-circle::before {\n  content: \"\\FE77\";\n}\n\n.mdi-comma-circle-outline::before {\n  content: \"\\FE78\";\n}\n\n.mdi-comment::before {\n  content: \"\\F17A\";\n}\n\n.mdi-comment-account::before {\n  content: \"\\F17B\";\n}\n\n.mdi-comment-account-outline::before {\n  content: \"\\F17C\";\n}\n\n.mdi-comment-alert::before {\n  content: \"\\F17D\";\n}\n\n.mdi-comment-alert-outline::before {\n  content: \"\\F17E\";\n}\n\n.mdi-comment-arrow-left::before {\n  content: \"\\F9E0\";\n}\n\n.mdi-comment-arrow-left-outline::before {\n  content: \"\\F9E1\";\n}\n\n.mdi-comment-arrow-right::before {\n  content: \"\\F9E2\";\n}\n\n.mdi-comment-arrow-right-outline::before {\n  content: \"\\F9E3\";\n}\n\n.mdi-comment-check::before {\n  content: \"\\F17F\";\n}\n\n.mdi-comment-check-outline::before {\n  content: \"\\F180\";\n}\n\n.mdi-comment-eye::before {\n  content: \"\\FA39\";\n}\n\n.mdi-comment-eye-outline::before {\n  content: \"\\FA3A\";\n}\n\n.mdi-comment-multiple::before {\n  content: \"\\F85E\";\n}\n\n.mdi-comment-multiple-outline::before {\n  content: \"\\F181\";\n}\n\n.mdi-comment-outline::before {\n  content: \"\\F182\";\n}\n\n.mdi-comment-plus::before {\n  content: \"\\F9E4\";\n}\n\n.mdi-comment-plus-outline::before {\n  content: \"\\F183\";\n}\n\n.mdi-comment-processing::before {\n  content: \"\\F184\";\n}\n\n.mdi-comment-processing-outline::before {\n  content: \"\\F185\";\n}\n\n.mdi-comment-question::before {\n  content: \"\\F816\";\n}\n\n.mdi-comment-question-outline::before {\n  content: \"\\F186\";\n}\n\n.mdi-comment-quote::before {\n  content: \"\\F0043\";\n}\n\n.mdi-comment-quote-outline::before {\n  content: \"\\F0044\";\n}\n\n.mdi-comment-remove::before {\n  content: \"\\F5DE\";\n}\n\n.mdi-comment-remove-outline::before {\n  content: \"\\F187\";\n}\n\n.mdi-comment-search::before {\n  content: \"\\FA3B\";\n}\n\n.mdi-comment-search-outline::before {\n  content: \"\\FA3C\";\n}\n\n.mdi-comment-text::before {\n  content: \"\\F188\";\n}\n\n.mdi-comment-text-multiple::before {\n  content: \"\\F85F\";\n}\n\n.mdi-comment-text-multiple-outline::before {\n  content: \"\\F860\";\n}\n\n.mdi-comment-text-outline::before {\n  content: \"\\F189\";\n}\n\n.mdi-compare::before {\n  content: \"\\F18A\";\n}\n\n.mdi-compass::before {\n  content: \"\\F18B\";\n}\n\n.mdi-compass-off::before {\n  content: \"\\FB5C\";\n}\n\n.mdi-compass-off-outline::before {\n  content: \"\\FB5D\";\n}\n\n.mdi-compass-outline::before {\n  content: \"\\F18C\";\n}\n\n.mdi-concourse-ci::before {\n  content: \"\\F00CB\";\n}\n\n.mdi-console::before {\n  content: \"\\F18D\";\n}\n\n.mdi-console-line::before {\n  content: \"\\F7B6\";\n}\n\n.mdi-console-network::before {\n  content: \"\\F8A8\";\n}\n\n.mdi-console-network-outline::before {\n  content: \"\\FC3C\";\n}\n\n.mdi-consolidate::before {\n  content: \"\\F0103\";\n}\n\n.mdi-contact-mail::before {\n  content: \"\\F18E\";\n}\n\n.mdi-contact-mail-outline::before {\n  content: \"\\FEB5\";\n}\n\n.mdi-contact-phone::before {\n  content: \"\\FEB6\";\n}\n\n.mdi-contact-phone-outline::before {\n  content: \"\\FEB7\";\n}\n\n.mdi-contactless-payment::before {\n  content: \"\\FD46\";\n}\n\n.mdi-contacts::before {\n  content: \"\\F6CA\";\n}\n\n.mdi-contain::before {\n  content: \"\\FA3D\";\n}\n\n.mdi-contain-end::before {\n  content: \"\\FA3E\";\n}\n\n.mdi-contain-start::before {\n  content: \"\\FA3F\";\n}\n\n.mdi-content-copy::before {\n  content: \"\\F18F\";\n}\n\n.mdi-content-cut::before {\n  content: \"\\F190\";\n}\n\n.mdi-content-duplicate::before {\n  content: \"\\F191\";\n}\n\n.mdi-content-paste::before {\n  content: \"\\F192\";\n}\n\n.mdi-content-save::before {\n  content: \"\\F193\";\n}\n\n.mdi-content-save-alert::before {\n  content: \"\\FF5F\";\n}\n\n.mdi-content-save-alert-outline::before {\n  content: \"\\FF60\";\n}\n\n.mdi-content-save-all::before {\n  content: \"\\F194\";\n}\n\n.mdi-content-save-all-outline::before {\n  content: \"\\FF61\";\n}\n\n.mdi-content-save-edit::before {\n  content: \"\\FCD7\";\n}\n\n.mdi-content-save-edit-outline::before {\n  content: \"\\FCD8\";\n}\n\n.mdi-content-save-move::before {\n  content: \"\\FE79\";\n}\n\n.mdi-content-save-move-outline::before {\n  content: \"\\FE7A\";\n}\n\n.mdi-content-save-outline::before {\n  content: \"\\F817\";\n}\n\n.mdi-content-save-settings::before {\n  content: \"\\F61B\";\n}\n\n.mdi-content-save-settings-outline::before {\n  content: \"\\FB13\";\n}\n\n.mdi-contrast::before {\n  content: \"\\F195\";\n}\n\n.mdi-contrast-box::before {\n  content: \"\\F196\";\n}\n\n.mdi-contrast-circle::before {\n  content: \"\\F197\";\n}\n\n.mdi-controller-classic::before {\n  content: \"\\FB5E\";\n}\n\n.mdi-controller-classic-outline::before {\n  content: \"\\FB5F\";\n}\n\n.mdi-cookie::before {\n  content: \"\\F198\";\n}\n\n.mdi-coolant-temperature::before {\n  content: \"\\F3C8\";\n}\n\n.mdi-copyright::before {\n  content: \"\\F5E6\";\n}\n\n.mdi-cordova::before {\n  content: \"\\F957\";\n}\n\n.mdi-corn::before {\n  content: \"\\F7B7\";\n}\n\n.mdi-counter::before {\n  content: \"\\F199\";\n}\n\n.mdi-cow::before {\n  content: \"\\F19A\";\n}\n\n.mdi-cowboy::before {\n  content: \"\\FEB8\";\n}\n\n.mdi-cpu-32-bit::before {\n  content: \"\\FEFC\";\n}\n\n.mdi-cpu-64-bit::before {\n  content: \"\\FEFD\";\n}\n\n.mdi-crane::before {\n  content: \"\\F861\";\n}\n\n.mdi-creation::before {\n  content: \"\\F1C9\";\n}\n\n.mdi-creative-commons::before {\n  content: \"\\FD47\";\n}\n\n.mdi-credit-card::before {\n  content: \"\\F0010\";\n}\n\n.mdi-credit-card-clock::before {\n  content: \"\\FEFE\";\n}\n\n.mdi-credit-card-clock-outline::before {\n  content: \"\\FFBC\";\n}\n\n.mdi-credit-card-marker::before {\n  content: \"\\F6A7\";\n}\n\n.mdi-credit-card-marker-outline::before {\n  content: \"\\FD9A\";\n}\n\n.mdi-credit-card-minus::before {\n  content: \"\\FFCC\";\n}\n\n.mdi-credit-card-minus-outline::before {\n  content: \"\\FFCD\";\n}\n\n.mdi-credit-card-multiple::before {\n  content: \"\\F0011\";\n}\n\n.mdi-credit-card-multiple-outline::before {\n  content: \"\\F19C\";\n}\n\n.mdi-credit-card-off::before {\n  content: \"\\F0012\";\n}\n\n.mdi-credit-card-off-outline::before {\n  content: \"\\F5E4\";\n}\n\n.mdi-credit-card-outline::before {\n  content: \"\\F19B\";\n}\n\n.mdi-credit-card-plus::before {\n  content: \"\\F0013\";\n}\n\n.mdi-credit-card-plus-outline::before {\n  content: \"\\F675\";\n}\n\n.mdi-credit-card-refund::before {\n  content: \"\\F0014\";\n}\n\n.mdi-credit-card-refund-outline::before {\n  content: \"\\FAA7\";\n}\n\n.mdi-credit-card-remove::before {\n  content: \"\\FFCE\";\n}\n\n.mdi-credit-card-remove-outline::before {\n  content: \"\\FFCF\";\n}\n\n.mdi-credit-card-scan::before {\n  content: \"\\F0015\";\n}\n\n.mdi-credit-card-scan-outline::before {\n  content: \"\\F19D\";\n}\n\n.mdi-credit-card-settings::before {\n  content: \"\\F0016\";\n}\n\n.mdi-credit-card-settings-outline::before {\n  content: \"\\F8D6\";\n}\n\n.mdi-credit-card-wireless::before {\n  content: \"\\F801\";\n}\n\n.mdi-credit-card-wireless-outline::before {\n  content: \"\\FD48\";\n}\n\n.mdi-cricket::before {\n  content: \"\\FD49\";\n}\n\n.mdi-crop::before {\n  content: \"\\F19E\";\n}\n\n.mdi-crop-free::before {\n  content: \"\\F19F\";\n}\n\n.mdi-crop-landscape::before {\n  content: \"\\F1A0\";\n}\n\n.mdi-crop-portrait::before {\n  content: \"\\F1A1\";\n}\n\n.mdi-crop-rotate::before {\n  content: \"\\F695\";\n}\n\n.mdi-crop-square::before {\n  content: \"\\F1A2\";\n}\n\n.mdi-crosshairs::before {\n  content: \"\\F1A3\";\n}\n\n.mdi-crosshairs-gps::before {\n  content: \"\\F1A4\";\n}\n\n.mdi-crosshairs-off::before {\n  content: \"\\FF62\";\n}\n\n.mdi-crosshairs-question::before {\n  content: \"\\F0161\";\n}\n\n.mdi-crown::before {\n  content: \"\\F1A5\";\n}\n\n.mdi-cryengine::before {\n  content: \"\\F958\";\n}\n\n.mdi-crystal-ball::before {\n  content: \"\\FB14\";\n}\n\n.mdi-cube::before {\n  content: \"\\F1A6\";\n}\n\n.mdi-cube-outline::before {\n  content: \"\\F1A7\";\n}\n\n.mdi-cube-scan::before {\n  content: \"\\FB60\";\n}\n\n.mdi-cube-send::before {\n  content: \"\\F1A8\";\n}\n\n.mdi-cube-unfolded::before {\n  content: \"\\F1A9\";\n}\n\n.mdi-cup::before {\n  content: \"\\F1AA\";\n}\n\n.mdi-cup-off::before {\n  content: \"\\F5E5\";\n}\n\n.mdi-cup-water::before {\n  content: \"\\F1AB\";\n}\n\n.mdi-cupboard::before {\n  content: \"\\FF63\";\n}\n\n.mdi-cupboard-outline::before {\n  content: \"\\FF64\";\n}\n\n.mdi-cupcake::before {\n  content: \"\\F959\";\n}\n\n.mdi-curling::before {\n  content: \"\\F862\";\n}\n\n.mdi-currency-bdt::before {\n  content: \"\\F863\";\n}\n\n.mdi-currency-brl::before {\n  content: \"\\FB61\";\n}\n\n.mdi-currency-btc::before {\n  content: \"\\F1AC\";\n}\n\n.mdi-currency-cny::before {\n  content: \"\\F7B9\";\n}\n\n.mdi-currency-eth::before {\n  content: \"\\F7BA\";\n}\n\n.mdi-currency-eur::before {\n  content: \"\\F1AD\";\n}\n\n.mdi-currency-gbp::before {\n  content: \"\\F1AE\";\n}\n\n.mdi-currency-ils::before {\n  content: \"\\FC3D\";\n}\n\n.mdi-currency-inr::before {\n  content: \"\\F1AF\";\n}\n\n.mdi-currency-jpy::before {\n  content: \"\\F7BB\";\n}\n\n.mdi-currency-krw::before {\n  content: \"\\F7BC\";\n}\n\n.mdi-currency-kzt::before {\n  content: \"\\F864\";\n}\n\n.mdi-currency-ngn::before {\n  content: \"\\F1B0\";\n}\n\n.mdi-currency-php::before {\n  content: \"\\F9E5\";\n}\n\n.mdi-currency-rial::before {\n  content: \"\\FEB9\";\n}\n\n.mdi-currency-rub::before {\n  content: \"\\F1B1\";\n}\n\n.mdi-currency-sign::before {\n  content: \"\\F7BD\";\n}\n\n.mdi-currency-try::before {\n  content: \"\\F1B2\";\n}\n\n.mdi-currency-twd::before {\n  content: \"\\F7BE\";\n}\n\n.mdi-currency-usd::before {\n  content: \"\\F1B3\";\n}\n\n.mdi-currency-usd-off::before {\n  content: \"\\F679\";\n}\n\n.mdi-current-ac::before {\n  content: \"\\F95A\";\n}\n\n.mdi-current-dc::before {\n  content: \"\\F95B\";\n}\n\n.mdi-cursor-default::before {\n  content: \"\\F1B4\";\n}\n\n.mdi-cursor-default-click::before {\n  content: \"\\FCD9\";\n}\n\n.mdi-cursor-default-click-outline::before {\n  content: \"\\FCDA\";\n}\n\n.mdi-cursor-default-gesture::before {\n  content: \"\\F0152\";\n}\n\n.mdi-cursor-default-gesture-outline::before {\n  content: \"\\F0153\";\n}\n\n.mdi-cursor-default-outline::before {\n  content: \"\\F1B5\";\n}\n\n.mdi-cursor-move::before {\n  content: \"\\F1B6\";\n}\n\n.mdi-cursor-pointer::before {\n  content: \"\\F1B7\";\n}\n\n.mdi-cursor-text::before {\n  content: \"\\F5E7\";\n}\n\n.mdi-database::before {\n  content: \"\\F1B8\";\n}\n\n.mdi-database-check::before {\n  content: \"\\FAA8\";\n}\n\n.mdi-database-edit::before {\n  content: \"\\FB62\";\n}\n\n.mdi-database-export::before {\n  content: \"\\F95D\";\n}\n\n.mdi-database-import::before {\n  content: \"\\F95C\";\n}\n\n.mdi-database-lock::before {\n  content: \"\\FAA9\";\n}\n\n.mdi-database-minus::before {\n  content: \"\\F1B9\";\n}\n\n.mdi-database-plus::before {\n  content: \"\\F1BA\";\n}\n\n.mdi-database-refresh::before {\n  content: \"\\FCDB\";\n}\n\n.mdi-database-remove::before {\n  content: \"\\FCDC\";\n}\n\n.mdi-database-search::before {\n  content: \"\\F865\";\n}\n\n.mdi-database-settings::before {\n  content: \"\\FCDD\";\n}\n\n.mdi-death-star::before {\n  content: \"\\F8D7\";\n}\n\n.mdi-death-star-variant::before {\n  content: \"\\F8D8\";\n}\n\n.mdi-deathly-hallows::before {\n  content: \"\\FB63\";\n}\n\n.mdi-debian::before {\n  content: \"\\F8D9\";\n}\n\n.mdi-debug-step-into::before {\n  content: \"\\F1BB\";\n}\n\n.mdi-debug-step-out::before {\n  content: \"\\F1BC\";\n}\n\n.mdi-debug-step-over::before {\n  content: \"\\F1BD\";\n}\n\n.mdi-decagram::before {\n  content: \"\\F76B\";\n}\n\n.mdi-decagram-outline::before {\n  content: \"\\F76C\";\n}\n\n.mdi-decimal::before {\n  content: \"\\F00CC\";\n}\n\n.mdi-decimal-comma::before {\n  content: \"\\F00CD\";\n}\n\n.mdi-decimal-comma-decrease::before {\n  content: \"\\F00CE\";\n}\n\n.mdi-decimal-comma-increase::before {\n  content: \"\\F00CF\";\n}\n\n.mdi-decimal-decrease::before {\n  content: \"\\F1BE\";\n}\n\n.mdi-decimal-increase::before {\n  content: \"\\F1BF\";\n}\n\n.mdi-delete::before {\n  content: \"\\F1C0\";\n}\n\n.mdi-delete-alert::before {\n  content: \"\\F00D0\";\n}\n\n.mdi-delete-alert-outline::before {\n  content: \"\\F00D1\";\n}\n\n.mdi-delete-circle::before {\n  content: \"\\F682\";\n}\n\n.mdi-delete-circle-outline::before {\n  content: \"\\FB64\";\n}\n\n.mdi-delete-empty::before {\n  content: \"\\F6CB\";\n}\n\n.mdi-delete-empty-outline::before {\n  content: \"\\FEBA\";\n}\n\n.mdi-delete-forever::before {\n  content: \"\\F5E8\";\n}\n\n.mdi-delete-forever-outline::before {\n  content: \"\\FB65\";\n}\n\n.mdi-delete-off::before {\n  content: \"\\F00D2\";\n}\n\n.mdi-delete-off-outline::before {\n  content: \"\\F00D3\";\n}\n\n.mdi-delete-outline::before {\n  content: \"\\F9E6\";\n}\n\n.mdi-delete-restore::before {\n  content: \"\\F818\";\n}\n\n.mdi-delete-sweep::before {\n  content: \"\\F5E9\";\n}\n\n.mdi-delete-sweep-outline::before {\n  content: \"\\FC3E\";\n}\n\n.mdi-delete-variant::before {\n  content: \"\\F1C1\";\n}\n\n.mdi-delta::before {\n  content: \"\\F1C2\";\n}\n\n.mdi-desk-lamp::before {\n  content: \"\\F95E\";\n}\n\n.mdi-deskphone::before {\n  content: \"\\F1C3\";\n}\n\n.mdi-desktop-classic::before {\n  content: \"\\F7BF\";\n}\n\n.mdi-desktop-mac::before {\n  content: \"\\F1C4\";\n}\n\n.mdi-desktop-mac-dashboard::before {\n  content: \"\\F9E7\";\n}\n\n.mdi-desktop-tower::before {\n  content: \"\\F1C5\";\n}\n\n.mdi-desktop-tower-monitor::before {\n  content: \"\\FAAA\";\n}\n\n.mdi-details::before {\n  content: \"\\F1C6\";\n}\n\n.mdi-dev-to::before {\n  content: \"\\FD4A\";\n}\n\n.mdi-developer-board::before {\n  content: \"\\F696\";\n}\n\n.mdi-deviantart::before {\n  content: \"\\F1C7\";\n}\n\n.mdi-devices::before {\n  content: \"\\FFD0\";\n}\n\n.mdi-diabetes::before {\n  content: \"\\F0151\";\n}\n\n.mdi-dialpad::before {\n  content: \"\\F61C\";\n}\n\n.mdi-diameter::before {\n  content: \"\\FC3F\";\n}\n\n.mdi-diameter-outline::before {\n  content: \"\\FC40\";\n}\n\n.mdi-diameter-variant::before {\n  content: \"\\FC41\";\n}\n\n.mdi-diamond::before {\n  content: \"\\FB66\";\n}\n\n.mdi-diamond-outline::before {\n  content: \"\\FB67\";\n}\n\n.mdi-diamond-stone::before {\n  content: \"\\F1C8\";\n}\n\n.mdi-dice-1::before {\n  content: \"\\F1CA\";\n}\n\n.mdi-dice-1-outline::before {\n  content: \"\\F0175\";\n}\n\n.mdi-dice-2::before {\n  content: \"\\F1CB\";\n}\n\n.mdi-dice-2-outline::before {\n  content: \"\\F0176\";\n}\n\n.mdi-dice-3::before {\n  content: \"\\F1CC\";\n}\n\n.mdi-dice-3-outline::before {\n  content: \"\\F0177\";\n}\n\n.mdi-dice-4::before {\n  content: \"\\F1CD\";\n}\n\n.mdi-dice-4-outline::before {\n  content: \"\\F0178\";\n}\n\n.mdi-dice-5::before {\n  content: \"\\F1CE\";\n}\n\n.mdi-dice-5-outline::before {\n  content: \"\\F0179\";\n}\n\n.mdi-dice-6::before {\n  content: \"\\F1CF\";\n}\n\n.mdi-dice-6-outline::before {\n  content: \"\\F017A\";\n}\n\n.mdi-dice-d10::before {\n  content: \"\\F017E\";\n}\n\n.mdi-dice-d10-outline::before {\n  content: \"\\F76E\";\n}\n\n.mdi-dice-d12::before {\n  content: \"\\F017F\";\n}\n\n.mdi-dice-d12-outline::before {\n  content: \"\\F866\";\n}\n\n.mdi-dice-d20::before {\n  content: \"\\F0180\";\n}\n\n.mdi-dice-d20-outline::before {\n  content: \"\\F5EA\";\n}\n\n.mdi-dice-d4::before {\n  content: \"\\F017B\";\n}\n\n.mdi-dice-d4-outline::before {\n  content: \"\\F5EB\";\n}\n\n.mdi-dice-d6::before {\n  content: \"\\F017C\";\n}\n\n.mdi-dice-d6-outline::before {\n  content: \"\\F5EC\";\n}\n\n.mdi-dice-d8::before {\n  content: \"\\F017D\";\n}\n\n.mdi-dice-d8-outline::before {\n  content: \"\\F5ED\";\n}\n\n.mdi-dice-multiple::before {\n  content: \"\\F76D\";\n}\n\n.mdi-dice-multiple-outline::before {\n  content: \"\\F0181\";\n}\n\n.mdi-dictionary::before {\n  content: \"\\F61D\";\n}\n\n.mdi-dip-switch::before {\n  content: \"\\F7C0\";\n}\n\n.mdi-directions::before {\n  content: \"\\F1D0\";\n}\n\n.mdi-directions-fork::before {\n  content: \"\\F641\";\n}\n\n.mdi-disc::before {\n  content: \"\\F5EE\";\n}\n\n.mdi-disc-alert::before {\n  content: \"\\F1D1\";\n}\n\n.mdi-disc-player::before {\n  content: \"\\F95F\";\n}\n\n.mdi-discord::before {\n  content: \"\\F66F\";\n}\n\n.mdi-dishwasher::before {\n  content: \"\\FAAB\";\n}\n\n.mdi-disqus::before {\n  content: \"\\F1D2\";\n}\n\n.mdi-disqus-outline::before {\n  content: \"\\F1D3\";\n}\n\n.mdi-diving-flippers::before {\n  content: \"\\FD9B\";\n}\n\n.mdi-diving-helmet::before {\n  content: \"\\FD9C\";\n}\n\n.mdi-diving-scuba::before {\n  content: \"\\FD9D\";\n}\n\n.mdi-diving-scuba-flag::before {\n  content: \"\\FD9E\";\n}\n\n.mdi-diving-scuba-tank::before {\n  content: \"\\FD9F\";\n}\n\n.mdi-diving-scuba-tank-multiple::before {\n  content: \"\\FDA0\";\n}\n\n.mdi-diving-snorkel::before {\n  content: \"\\FDA1\";\n}\n\n.mdi-division::before {\n  content: \"\\F1D4\";\n}\n\n.mdi-division-box::before {\n  content: \"\\F1D5\";\n}\n\n.mdi-dlna::before {\n  content: \"\\FA40\";\n}\n\n.mdi-dna::before {\n  content: \"\\F683\";\n}\n\n.mdi-dns::before {\n  content: \"\\F1D6\";\n}\n\n.mdi-dns-outline::before {\n  content: \"\\FB68\";\n}\n\n.mdi-do-not-disturb::before {\n  content: \"\\F697\";\n}\n\n.mdi-do-not-disturb-off::before {\n  content: \"\\F698\";\n}\n\n.mdi-dock-bottom::before {\n  content: \"\\F00D4\";\n}\n\n.mdi-dock-left::before {\n  content: \"\\F00D5\";\n}\n\n.mdi-dock-right::before {\n  content: \"\\F00D6\";\n}\n\n.mdi-dock-window::before {\n  content: \"\\F00D7\";\n}\n\n.mdi-docker::before {\n  content: \"\\F867\";\n}\n\n.mdi-doctor::before {\n  content: \"\\FA41\";\n}\n\n.mdi-dog::before {\n  content: \"\\FA42\";\n}\n\n.mdi-dog-service::before {\n  content: \"\\FAAC\";\n}\n\n.mdi-dog-side::before {\n  content: \"\\FA43\";\n}\n\n.mdi-dolby::before {\n  content: \"\\F6B2\";\n}\n\n.mdi-dolly::before {\n  content: \"\\FEBB\";\n}\n\n.mdi-domain::before {\n  content: \"\\F1D7\";\n}\n\n.mdi-domain-off::before {\n  content: \"\\FD4B\";\n}\n\n.mdi-domain-plus::before {\n  content: \"\\F00D8\";\n}\n\n.mdi-domain-remove::before {\n  content: \"\\F00D9\";\n}\n\n.mdi-domino-mask::before {\n  content: \"\\F0045\";\n}\n\n.mdi-donkey::before {\n  content: \"\\F7C1\";\n}\n\n.mdi-door::before {\n  content: \"\\F819\";\n}\n\n.mdi-door-closed::before {\n  content: \"\\F81A\";\n}\n\n.mdi-door-closed-lock::before {\n  content: \"\\F00DA\";\n}\n\n.mdi-door-open::before {\n  content: \"\\F81B\";\n}\n\n.mdi-doorbell-video::before {\n  content: \"\\F868\";\n}\n\n.mdi-dot-net::before {\n  content: \"\\FAAD\";\n}\n\n.mdi-dots-horizontal::before {\n  content: \"\\F1D8\";\n}\n\n.mdi-dots-horizontal-circle::before {\n  content: \"\\F7C2\";\n}\n\n.mdi-dots-horizontal-circle-outline::before {\n  content: \"\\FB69\";\n}\n\n.mdi-dots-vertical::before {\n  content: \"\\F1D9\";\n}\n\n.mdi-dots-vertical-circle::before {\n  content: \"\\F7C3\";\n}\n\n.mdi-dots-vertical-circle-outline::before {\n  content: \"\\FB6A\";\n}\n\n.mdi-douban::before {\n  content: \"\\F699\";\n}\n\n.mdi-download::before {\n  content: \"\\F1DA\";\n}\n\n.mdi-download-multiple::before {\n  content: \"\\F9E8\";\n}\n\n.mdi-download-network::before {\n  content: \"\\F6F3\";\n}\n\n.mdi-download-network-outline::before {\n  content: \"\\FC42\";\n}\n\n.mdi-download-off::before {\n  content: \"\\F00DB\";\n}\n\n.mdi-download-off-outline::before {\n  content: \"\\F00DC\";\n}\n\n.mdi-download-outline::before {\n  content: \"\\FB6B\";\n}\n\n.mdi-drag::before {\n  content: \"\\F1DB\";\n}\n\n.mdi-drag-horizontal::before {\n  content: \"\\F1DC\";\n}\n\n.mdi-drag-variant::before {\n  content: \"\\FB6C\";\n}\n\n.mdi-drag-vertical::before {\n  content: \"\\F1DD\";\n}\n\n.mdi-drama-masks::before {\n  content: \"\\FCDE\";\n}\n\n.mdi-draw::before {\n  content: \"\\FF66\";\n}\n\n.mdi-drawing::before {\n  content: \"\\F1DE\";\n}\n\n.mdi-drawing-box::before {\n  content: \"\\F1DF\";\n}\n\n.mdi-dresser::before {\n  content: \"\\FF67\";\n}\n\n.mdi-dresser-outline::before {\n  content: \"\\FF68\";\n}\n\n.mdi-dribbble::before {\n  content: \"\\F1E0\";\n}\n\n.mdi-dribbble-box::before {\n  content: \"\\F1E1\";\n}\n\n.mdi-drone::before {\n  content: \"\\F1E2\";\n}\n\n.mdi-dropbox::before {\n  content: \"\\F1E3\";\n}\n\n.mdi-drupal::before {\n  content: \"\\F1E4\";\n}\n\n.mdi-duck::before {\n  content: \"\\F1E5\";\n}\n\n.mdi-dumbbell::before {\n  content: \"\\F1E6\";\n}\n\n.mdi-dump-truck::before {\n  content: \"\\FC43\";\n}\n\n.mdi-ear-hearing::before {\n  content: \"\\F7C4\";\n}\n\n.mdi-ear-hearing-off::before {\n  content: \"\\FA44\";\n}\n\n.mdi-earth::before {\n  content: \"\\F1E7\";\n}\n\n.mdi-earth-box::before {\n  content: \"\\F6CC\";\n}\n\n.mdi-earth-box-off::before {\n  content: \"\\F6CD\";\n}\n\n.mdi-earth-off::before {\n  content: \"\\F1E8\";\n}\n\n.mdi-edge::before {\n  content: \"\\F1E9\";\n}\n\n.mdi-egg::before {\n  content: \"\\FAAE\";\n}\n\n.mdi-egg-easter::before {\n  content: \"\\FAAF\";\n}\n\n.mdi-eight-track::before {\n  content: \"\\F9E9\";\n}\n\n.mdi-eject::before {\n  content: \"\\F1EA\";\n}\n\n.mdi-eject-outline::before {\n  content: \"\\FB6D\";\n}\n\n.mdi-electric-switch::before {\n  content: \"\\FEBC\";\n}\n\n.mdi-electric-switch-closed::before {\n  content: \"\\F0104\";\n}\n\n.mdi-electron-framework::before {\n  content: \"\\F0046\";\n}\n\n.mdi-elephant::before {\n  content: \"\\F7C5\";\n}\n\n.mdi-elevation-decline::before {\n  content: \"\\F1EB\";\n}\n\n.mdi-elevation-rise::before {\n  content: \"\\F1EC\";\n}\n\n.mdi-elevator::before {\n  content: \"\\F1ED\";\n}\n\n.mdi-ellipse::before {\n  content: \"\\FEBD\";\n}\n\n.mdi-ellipse-outline::before {\n  content: \"\\FEBE\";\n}\n\n.mdi-email::before {\n  content: \"\\F1EE\";\n}\n\n.mdi-email-alert::before {\n  content: \"\\F6CE\";\n}\n\n.mdi-email-box::before {\n  content: \"\\FCDF\";\n}\n\n.mdi-email-check::before {\n  content: \"\\FAB0\";\n}\n\n.mdi-email-check-outline::before {\n  content: \"\\FAB1\";\n}\n\n.mdi-email-edit::before {\n  content: \"\\FF00\";\n}\n\n.mdi-email-edit-outline::before {\n  content: \"\\FF01\";\n}\n\n.mdi-email-lock::before {\n  content: \"\\F1F1\";\n}\n\n.mdi-email-mark-as-unread::before {\n  content: \"\\FB6E\";\n}\n\n.mdi-email-minus::before {\n  content: \"\\FF02\";\n}\n\n.mdi-email-minus-outline::before {\n  content: \"\\FF03\";\n}\n\n.mdi-email-multiple::before {\n  content: \"\\FF04\";\n}\n\n.mdi-email-multiple-outline::before {\n  content: \"\\FF05\";\n}\n\n.mdi-email-newsletter::before {\n  content: \"\\FFD1\";\n}\n\n.mdi-email-open::before {\n  content: \"\\F1EF\";\n}\n\n.mdi-email-open-multiple::before {\n  content: \"\\FF06\";\n}\n\n.mdi-email-open-multiple-outline::before {\n  content: \"\\FF07\";\n}\n\n.mdi-email-open-outline::before {\n  content: \"\\F5EF\";\n}\n\n.mdi-email-outline::before {\n  content: \"\\F1F0\";\n}\n\n.mdi-email-plus::before {\n  content: \"\\F9EA\";\n}\n\n.mdi-email-plus-outline::before {\n  content: \"\\F9EB\";\n}\n\n.mdi-email-receive::before {\n  content: \"\\F0105\";\n}\n\n.mdi-email-receive-outline::before {\n  content: \"\\F0106\";\n}\n\n.mdi-email-search::before {\n  content: \"\\F960\";\n}\n\n.mdi-email-search-outline::before {\n  content: \"\\F961\";\n}\n\n.mdi-email-send::before {\n  content: \"\\F0107\";\n}\n\n.mdi-email-send-outline::before {\n  content: \"\\F0108\";\n}\n\n.mdi-email-variant::before {\n  content: \"\\F5F0\";\n}\n\n.mdi-ember::before {\n  content: \"\\FB15\";\n}\n\n.mdi-emby::before {\n  content: \"\\F6B3\";\n}\n\n.mdi-emoticon::before {\n  content: \"\\FC44\";\n}\n\n.mdi-emoticon-angry::before {\n  content: \"\\FC45\";\n}\n\n.mdi-emoticon-angry-outline::before {\n  content: \"\\FC46\";\n}\n\n.mdi-emoticon-confused::before {\n  content: \"\\F0109\";\n}\n\n.mdi-emoticon-confused-outline::before {\n  content: \"\\F010A\";\n}\n\n.mdi-emoticon-cool::before {\n  content: \"\\FC47\";\n}\n\n.mdi-emoticon-cool-outline::before {\n  content: \"\\F1F3\";\n}\n\n.mdi-emoticon-cry::before {\n  content: \"\\FC48\";\n}\n\n.mdi-emoticon-cry-outline::before {\n  content: \"\\FC49\";\n}\n\n.mdi-emoticon-dead::before {\n  content: \"\\FC4A\";\n}\n\n.mdi-emoticon-dead-outline::before {\n  content: \"\\F69A\";\n}\n\n.mdi-emoticon-devil::before {\n  content: \"\\FC4B\";\n}\n\n.mdi-emoticon-devil-outline::before {\n  content: \"\\F1F4\";\n}\n\n.mdi-emoticon-excited::before {\n  content: \"\\FC4C\";\n}\n\n.mdi-emoticon-excited-outline::before {\n  content: \"\\F69B\";\n}\n\n.mdi-emoticon-frown::before {\n  content: \"\\FF69\";\n}\n\n.mdi-emoticon-frown-outline::before {\n  content: \"\\FF6A\";\n}\n\n.mdi-emoticon-happy::before {\n  content: \"\\FC4D\";\n}\n\n.mdi-emoticon-happy-outline::before {\n  content: \"\\F1F5\";\n}\n\n.mdi-emoticon-kiss::before {\n  content: \"\\FC4E\";\n}\n\n.mdi-emoticon-kiss-outline::before {\n  content: \"\\FC4F\";\n}\n\n.mdi-emoticon-neutral::before {\n  content: \"\\FC50\";\n}\n\n.mdi-emoticon-neutral-outline::before {\n  content: \"\\F1F6\";\n}\n\n.mdi-emoticon-outline::before {\n  content: \"\\F1F2\";\n}\n\n.mdi-emoticon-poop::before {\n  content: \"\\F1F7\";\n}\n\n.mdi-emoticon-poop-outline::before {\n  content: \"\\FC51\";\n}\n\n.mdi-emoticon-sad::before {\n  content: \"\\FC52\";\n}\n\n.mdi-emoticon-sad-outline::before {\n  content: \"\\F1F8\";\n}\n\n.mdi-emoticon-tongue::before {\n  content: \"\\F1F9\";\n}\n\n.mdi-emoticon-tongue-outline::before {\n  content: \"\\FC53\";\n}\n\n.mdi-emoticon-wink::before {\n  content: \"\\FC54\";\n}\n\n.mdi-emoticon-wink-outline::before {\n  content: \"\\FC55\";\n}\n\n.mdi-engine::before {\n  content: \"\\F1FA\";\n}\n\n.mdi-engine-off::before {\n  content: \"\\FA45\";\n}\n\n.mdi-engine-off-outline::before {\n  content: \"\\FA46\";\n}\n\n.mdi-engine-outline::before {\n  content: \"\\F1FB\";\n}\n\n.mdi-epsilon::before {\n  content: \"\\F010B\";\n}\n\n.mdi-equal::before {\n  content: \"\\F1FC\";\n}\n\n.mdi-equal-box::before {\n  content: \"\\F1FD\";\n}\n\n.mdi-equalizer::before {\n  content: \"\\FEBF\";\n}\n\n.mdi-equalizer-outline::before {\n  content: \"\\FEC0\";\n}\n\n.mdi-eraser::before {\n  content: \"\\F1FE\";\n}\n\n.mdi-eraser-variant::before {\n  content: \"\\F642\";\n}\n\n.mdi-escalator::before {\n  content: \"\\F1FF\";\n}\n\n.mdi-eslint::before {\n  content: \"\\FC56\";\n}\n\n.mdi-et::before {\n  content: \"\\FAB2\";\n}\n\n.mdi-ethereum::before {\n  content: \"\\F869\";\n}\n\n.mdi-ethernet::before {\n  content: \"\\F200\";\n}\n\n.mdi-ethernet-cable::before {\n  content: \"\\F201\";\n}\n\n.mdi-ethernet-cable-off::before {\n  content: \"\\F202\";\n}\n\n.mdi-etsy::before {\n  content: \"\\F203\";\n}\n\n.mdi-ev-station::before {\n  content: \"\\F5F1\";\n}\n\n.mdi-eventbrite::before {\n  content: \"\\F7C6\";\n}\n\n.mdi-evernote::before {\n  content: \"\\F204\";\n}\n\n.mdi-excavator::before {\n  content: \"\\F0047\";\n}\n\n.mdi-exclamation::before {\n  content: \"\\F205\";\n}\n\n.mdi-exit-run::before {\n  content: \"\\FA47\";\n}\n\n.mdi-exit-to-app::before {\n  content: \"\\F206\";\n}\n\n.mdi-expand-all::before {\n  content: \"\\FAB3\";\n}\n\n.mdi-expand-all-outline::before {\n  content: \"\\FAB4\";\n}\n\n.mdi-expansion-card::before {\n  content: \"\\F8AD\";\n}\n\n.mdi-expansion-card-variant::before {\n  content: \"\\FFD2\";\n}\n\n.mdi-exponent::before {\n  content: \"\\F962\";\n}\n\n.mdi-exponent-box::before {\n  content: \"\\F963\";\n}\n\n.mdi-export::before {\n  content: \"\\F207\";\n}\n\n.mdi-export-variant::before {\n  content: \"\\FB6F\";\n}\n\n.mdi-eye::before {\n  content: \"\\F208\";\n}\n\n.mdi-eye-check::before {\n  content: \"\\FCE0\";\n}\n\n.mdi-eye-check-outline::before {\n  content: \"\\FCE1\";\n}\n\n.mdi-eye-circle::before {\n  content: \"\\FB70\";\n}\n\n.mdi-eye-circle-outline::before {\n  content: \"\\FB71\";\n}\n\n.mdi-eye-minus::before {\n  content: \"\\F0048\";\n}\n\n.mdi-eye-minus-outline::before {\n  content: \"\\F0049\";\n}\n\n.mdi-eye-off::before {\n  content: \"\\F209\";\n}\n\n.mdi-eye-off-outline::before {\n  content: \"\\F6D0\";\n}\n\n.mdi-eye-outline::before {\n  content: \"\\F6CF\";\n}\n\n.mdi-eye-plus::before {\n  content: \"\\F86A\";\n}\n\n.mdi-eye-plus-outline::before {\n  content: \"\\F86B\";\n}\n\n.mdi-eye-settings::before {\n  content: \"\\F86C\";\n}\n\n.mdi-eye-settings-outline::before {\n  content: \"\\F86D\";\n}\n\n.mdi-eyedropper::before {\n  content: \"\\F20A\";\n}\n\n.mdi-eyedropper-variant::before {\n  content: \"\\F20B\";\n}\n\n.mdi-face::before {\n  content: \"\\F643\";\n}\n\n.mdi-face-agent::before {\n  content: \"\\FD4C\";\n}\n\n.mdi-face-outline::before {\n  content: \"\\FB72\";\n}\n\n.mdi-face-profile::before {\n  content: \"\\F644\";\n}\n\n.mdi-face-profile-woman::before {\n  content: \"\\F00A1\";\n}\n\n.mdi-face-recognition::before {\n  content: \"\\FC57\";\n}\n\n.mdi-face-woman::before {\n  content: \"\\F00A2\";\n}\n\n.mdi-face-woman-outline::before {\n  content: \"\\F00A3\";\n}\n\n.mdi-facebook::before {\n  content: \"\\F20C\";\n}\n\n.mdi-facebook-box::before {\n  content: \"\\F20D\";\n}\n\n.mdi-facebook-messenger::before {\n  content: \"\\F20E\";\n}\n\n.mdi-facebook-workplace::before {\n  content: \"\\FB16\";\n}\n\n.mdi-factory::before {\n  content: \"\\F20F\";\n}\n\n.mdi-fan::before {\n  content: \"\\F210\";\n}\n\n.mdi-fan-off::before {\n  content: \"\\F81C\";\n}\n\n.mdi-fast-forward::before {\n  content: \"\\F211\";\n}\n\n.mdi-fast-forward-10::before {\n  content: \"\\FD4D\";\n}\n\n.mdi-fast-forward-30::before {\n  content: \"\\FCE2\";\n}\n\n.mdi-fast-forward-outline::before {\n  content: \"\\F6D1\";\n}\n\n.mdi-fax::before {\n  content: \"\\F212\";\n}\n\n.mdi-feather::before {\n  content: \"\\F6D2\";\n}\n\n.mdi-feature-search::before {\n  content: \"\\FA48\";\n}\n\n.mdi-feature-search-outline::before {\n  content: \"\\FA49\";\n}\n\n.mdi-fedora::before {\n  content: \"\\F8DA\";\n}\n\n.mdi-ferris-wheel::before {\n  content: \"\\FEC1\";\n}\n\n.mdi-ferry::before {\n  content: \"\\F213\";\n}\n\n.mdi-file::before {\n  content: \"\\F214\";\n}\n\n.mdi-file-account::before {\n  content: \"\\F73A\";\n}\n\n.mdi-file-account-outline::before {\n  content: \"\\F004A\";\n}\n\n.mdi-file-alert::before {\n  content: \"\\FA4A\";\n}\n\n.mdi-file-alert-outline::before {\n  content: \"\\FA4B\";\n}\n\n.mdi-file-cabinet::before {\n  content: \"\\FAB5\";\n}\n\n.mdi-file-cad::before {\n  content: \"\\FF08\";\n}\n\n.mdi-file-cad-box::before {\n  content: \"\\FF09\";\n}\n\n.mdi-file-cancel::before {\n  content: \"\\FDA2\";\n}\n\n.mdi-file-cancel-outline::before {\n  content: \"\\FDA3\";\n}\n\n.mdi-file-certificate::before {\n  content: \"\\F01B1\";\n}\n\n.mdi-file-certificate-outline::before {\n  content: \"\\F01B2\";\n}\n\n.mdi-file-chart::before {\n  content: \"\\F215\";\n}\n\n.mdi-file-chart-outline::before {\n  content: \"\\F004B\";\n}\n\n.mdi-file-check::before {\n  content: \"\\F216\";\n}\n\n.mdi-file-check-outline::before {\n  content: \"\\FE7B\";\n}\n\n.mdi-file-cloud::before {\n  content: \"\\F217\";\n}\n\n.mdi-file-cloud-outline::before {\n  content: \"\\F004C\";\n}\n\n.mdi-file-code::before {\n  content: \"\\F22E\";\n}\n\n.mdi-file-code-outline::before {\n  content: \"\\F004D\";\n}\n\n.mdi-file-compare::before {\n  content: \"\\F8A9\";\n}\n\n.mdi-file-delimited::before {\n  content: \"\\F218\";\n}\n\n.mdi-file-delimited-outline::before {\n  content: \"\\FEC2\";\n}\n\n.mdi-file-document::before {\n  content: \"\\F219\";\n}\n\n.mdi-file-document-box::before {\n  content: \"\\F21A\";\n}\n\n.mdi-file-document-box-check::before {\n  content: \"\\FEC3\";\n}\n\n.mdi-file-document-box-check-outline::before {\n  content: \"\\FEC4\";\n}\n\n.mdi-file-document-box-minus::before {\n  content: \"\\FEC5\";\n}\n\n.mdi-file-document-box-minus-outline::before {\n  content: \"\\FEC6\";\n}\n\n.mdi-file-document-box-multiple::before {\n  content: \"\\FAB6\";\n}\n\n.mdi-file-document-box-multiple-outline::before {\n  content: \"\\FAB7\";\n}\n\n.mdi-file-document-box-outline::before {\n  content: \"\\F9EC\";\n}\n\n.mdi-file-document-box-plus::before {\n  content: \"\\FEC7\";\n}\n\n.mdi-file-document-box-plus-outline::before {\n  content: \"\\FEC8\";\n}\n\n.mdi-file-document-box-remove::before {\n  content: \"\\FEC9\";\n}\n\n.mdi-file-document-box-remove-outline::before {\n  content: \"\\FECA\";\n}\n\n.mdi-file-document-box-search::before {\n  content: \"\\FECB\";\n}\n\n.mdi-file-document-box-search-outline::before {\n  content: \"\\FECC\";\n}\n\n.mdi-file-document-edit::before {\n  content: \"\\FDA4\";\n}\n\n.mdi-file-document-edit-outline::before {\n  content: \"\\FDA5\";\n}\n\n.mdi-file-document-outline::before {\n  content: \"\\F9ED\";\n}\n\n.mdi-file-download::before {\n  content: \"\\F964\";\n}\n\n.mdi-file-download-outline::before {\n  content: \"\\F965\";\n}\n\n.mdi-file-excel::before {\n  content: \"\\F21B\";\n}\n\n.mdi-file-excel-box::before {\n  content: \"\\F21C\";\n}\n\n.mdi-file-excel-box-outline::before {\n  content: \"\\F004E\";\n}\n\n.mdi-file-excel-outline::before {\n  content: \"\\F004F\";\n}\n\n.mdi-file-export::before {\n  content: \"\\F21D\";\n}\n\n.mdi-file-export-outline::before {\n  content: \"\\F0050\";\n}\n\n.mdi-file-eye::before {\n  content: \"\\FDA6\";\n}\n\n.mdi-file-eye-outline::before {\n  content: \"\\FDA7\";\n}\n\n.mdi-file-find::before {\n  content: \"\\F21E\";\n}\n\n.mdi-file-find-outline::before {\n  content: \"\\FB73\";\n}\n\n.mdi-file-hidden::before {\n  content: \"\\F613\";\n}\n\n.mdi-file-image::before {\n  content: \"\\F21F\";\n}\n\n.mdi-file-image-outline::before {\n  content: \"\\FECD\";\n}\n\n.mdi-file-import::before {\n  content: \"\\F220\";\n}\n\n.mdi-file-import-outline::before {\n  content: \"\\F0051\";\n}\n\n.mdi-file-key::before {\n  content: \"\\F01AF\";\n}\n\n.mdi-file-key-outline::before {\n  content: \"\\F01B0\";\n}\n\n.mdi-file-link::before {\n  content: \"\\F01A2\";\n}\n\n.mdi-file-link-outline::before {\n  content: \"\\F01A3\";\n}\n\n.mdi-file-lock::before {\n  content: \"\\F221\";\n}\n\n.mdi-file-lock-outline::before {\n  content: \"\\F0052\";\n}\n\n.mdi-file-move::before {\n  content: \"\\FAB8\";\n}\n\n.mdi-file-move-outline::before {\n  content: \"\\F0053\";\n}\n\n.mdi-file-multiple::before {\n  content: \"\\F222\";\n}\n\n.mdi-file-multiple-outline::before {\n  content: \"\\F0054\";\n}\n\n.mdi-file-music::before {\n  content: \"\\F223\";\n}\n\n.mdi-file-music-outline::before {\n  content: \"\\FE7C\";\n}\n\n.mdi-file-outline::before {\n  content: \"\\F224\";\n}\n\n.mdi-file-pdf::before {\n  content: \"\\F225\";\n}\n\n.mdi-file-pdf-box::before {\n  content: \"\\F226\";\n}\n\n.mdi-file-pdf-box-outline::before {\n  content: \"\\FFD3\";\n}\n\n.mdi-file-pdf-outline::before {\n  content: \"\\FE7D\";\n}\n\n.mdi-file-percent::before {\n  content: \"\\F81D\";\n}\n\n.mdi-file-percent-outline::before {\n  content: \"\\F0055\";\n}\n\n.mdi-file-phone::before {\n  content: \"\\F01A4\";\n}\n\n.mdi-file-phone-outline::before {\n  content: \"\\F01A5\";\n}\n\n.mdi-file-plus::before {\n  content: \"\\F751\";\n}\n\n.mdi-file-plus-outline::before {\n  content: \"\\FF0A\";\n}\n\n.mdi-file-powerpoint::before {\n  content: \"\\F227\";\n}\n\n.mdi-file-powerpoint-box::before {\n  content: \"\\F228\";\n}\n\n.mdi-file-powerpoint-box-outline::before {\n  content: \"\\F0056\";\n}\n\n.mdi-file-powerpoint-outline::before {\n  content: \"\\F0057\";\n}\n\n.mdi-file-presentation-box::before {\n  content: \"\\F229\";\n}\n\n.mdi-file-question::before {\n  content: \"\\F86E\";\n}\n\n.mdi-file-question-outline::before {\n  content: \"\\F0058\";\n}\n\n.mdi-file-remove::before {\n  content: \"\\FB74\";\n}\n\n.mdi-file-remove-outline::before {\n  content: \"\\F0059\";\n}\n\n.mdi-file-replace::before {\n  content: \"\\FB17\";\n}\n\n.mdi-file-replace-outline::before {\n  content: \"\\FB18\";\n}\n\n.mdi-file-restore::before {\n  content: \"\\F670\";\n}\n\n.mdi-file-restore-outline::before {\n  content: \"\\F005A\";\n}\n\n.mdi-file-search::before {\n  content: \"\\FC58\";\n}\n\n.mdi-file-search-outline::before {\n  content: \"\\FC59\";\n}\n\n.mdi-file-send::before {\n  content: \"\\F22A\";\n}\n\n.mdi-file-send-outline::before {\n  content: \"\\F005B\";\n}\n\n.mdi-file-settings::before {\n  content: \"\\F00A4\";\n}\n\n.mdi-file-settings-outline::before {\n  content: \"\\F00A5\";\n}\n\n.mdi-file-settings-variant::before {\n  content: \"\\F00A6\";\n}\n\n.mdi-file-settings-variant-outline::before {\n  content: \"\\F00A7\";\n}\n\n.mdi-file-star::before {\n  content: \"\\F005C\";\n}\n\n.mdi-file-star-outline::before {\n  content: \"\\F005D\";\n}\n\n.mdi-file-swap::before {\n  content: \"\\FFD4\";\n}\n\n.mdi-file-swap-outline::before {\n  content: \"\\FFD5\";\n}\n\n.mdi-file-table::before {\n  content: \"\\FC5A\";\n}\n\n.mdi-file-table-box::before {\n  content: \"\\F010C\";\n}\n\n.mdi-file-table-box-multiple::before {\n  content: \"\\F010D\";\n}\n\n.mdi-file-table-box-multiple-outline::before {\n  content: \"\\F010E\";\n}\n\n.mdi-file-table-box-outline::before {\n  content: \"\\F010F\";\n}\n\n.mdi-file-table-outline::before {\n  content: \"\\FC5B\";\n}\n\n.mdi-file-tree::before {\n  content: \"\\F645\";\n}\n\n.mdi-file-undo::before {\n  content: \"\\F8DB\";\n}\n\n.mdi-file-undo-outline::before {\n  content: \"\\F005E\";\n}\n\n.mdi-file-upload::before {\n  content: \"\\FA4C\";\n}\n\n.mdi-file-upload-outline::before {\n  content: \"\\FA4D\";\n}\n\n.mdi-file-video::before {\n  content: \"\\F22B\";\n}\n\n.mdi-file-video-outline::before {\n  content: \"\\FE10\";\n}\n\n.mdi-file-word::before {\n  content: \"\\F22C\";\n}\n\n.mdi-file-word-box::before {\n  content: \"\\F22D\";\n}\n\n.mdi-file-word-box-outline::before {\n  content: \"\\F005F\";\n}\n\n.mdi-file-word-outline::before {\n  content: \"\\F0060\";\n}\n\n.mdi-film::before {\n  content: \"\\F22F\";\n}\n\n.mdi-filmstrip::before {\n  content: \"\\F230\";\n}\n\n.mdi-filmstrip-off::before {\n  content: \"\\F231\";\n}\n\n.mdi-filter::before {\n  content: \"\\F232\";\n}\n\n.mdi-filter-menu::before {\n  content: \"\\F0110\";\n}\n\n.mdi-filter-menu-outline::before {\n  content: \"\\F0111\";\n}\n\n.mdi-filter-minus::before {\n  content: \"\\FF0B\";\n}\n\n.mdi-filter-minus-outline::before {\n  content: \"\\FF0C\";\n}\n\n.mdi-filter-outline::before {\n  content: \"\\F233\";\n}\n\n.mdi-filter-plus::before {\n  content: \"\\FF0D\";\n}\n\n.mdi-filter-plus-outline::before {\n  content: \"\\FF0E\";\n}\n\n.mdi-filter-remove::before {\n  content: \"\\F234\";\n}\n\n.mdi-filter-remove-outline::before {\n  content: \"\\F235\";\n}\n\n.mdi-filter-variant::before {\n  content: \"\\F236\";\n}\n\n.mdi-filter-variant-minus::before {\n  content: \"\\F013D\";\n}\n\n.mdi-filter-variant-plus::before {\n  content: \"\\F013E\";\n}\n\n.mdi-filter-variant-remove::before {\n  content: \"\\F0061\";\n}\n\n.mdi-finance::before {\n  content: \"\\F81E\";\n}\n\n.mdi-find-replace::before {\n  content: \"\\F6D3\";\n}\n\n.mdi-fingerprint::before {\n  content: \"\\F237\";\n}\n\n.mdi-fingerprint-off::before {\n  content: \"\\FECE\";\n}\n\n.mdi-fire::before {\n  content: \"\\F238\";\n}\n\n.mdi-fire-extinguisher::before {\n  content: \"\\FF0F\";\n}\n\n.mdi-fire-hydrant::before {\n  content: \"\\F0162\";\n}\n\n.mdi-fire-hydrant-alert::before {\n  content: \"\\F0163\";\n}\n\n.mdi-fire-hydrant-off::before {\n  content: \"\\F0164\";\n}\n\n.mdi-fire-truck::before {\n  content: \"\\F8AA\";\n}\n\n.mdi-firebase::before {\n  content: \"\\F966\";\n}\n\n.mdi-firefox::before {\n  content: \"\\F239\";\n}\n\n.mdi-fireplace::before {\n  content: \"\\FE11\";\n}\n\n.mdi-fireplace-off::before {\n  content: \"\\FE12\";\n}\n\n.mdi-firework::before {\n  content: \"\\FE13\";\n}\n\n.mdi-fish::before {\n  content: \"\\F23A\";\n}\n\n.mdi-fishbowl::before {\n  content: \"\\FF10\";\n}\n\n.mdi-fishbowl-outline::before {\n  content: \"\\FF11\";\n}\n\n.mdi-fit-to-page::before {\n  content: \"\\FF12\";\n}\n\n.mdi-fit-to-page-outline::before {\n  content: \"\\FF13\";\n}\n\n.mdi-flag::before {\n  content: \"\\F23B\";\n}\n\n.mdi-flag-checkered::before {\n  content: \"\\F23C\";\n}\n\n.mdi-flag-minus::before {\n  content: \"\\FB75\";\n}\n\n.mdi-flag-minus-outline::before {\n  content: \"\\F00DD\";\n}\n\n.mdi-flag-outline::before {\n  content: \"\\F23D\";\n}\n\n.mdi-flag-plus::before {\n  content: \"\\FB76\";\n}\n\n.mdi-flag-plus-outline::before {\n  content: \"\\F00DE\";\n}\n\n.mdi-flag-remove::before {\n  content: \"\\FB77\";\n}\n\n.mdi-flag-remove-outline::before {\n  content: \"\\F00DF\";\n}\n\n.mdi-flag-triangle::before {\n  content: \"\\F23F\";\n}\n\n.mdi-flag-variant::before {\n  content: \"\\F240\";\n}\n\n.mdi-flag-variant-outline::before {\n  content: \"\\F23E\";\n}\n\n.mdi-flare::before {\n  content: \"\\FD4E\";\n}\n\n.mdi-flash::before {\n  content: \"\\F241\";\n}\n\n.mdi-flash-alert::before {\n  content: \"\\FF14\";\n}\n\n.mdi-flash-alert-outline::before {\n  content: \"\\FF15\";\n}\n\n.mdi-flash-auto::before {\n  content: \"\\F242\";\n}\n\n.mdi-flash-circle::before {\n  content: \"\\F81F\";\n}\n\n.mdi-flash-off::before {\n  content: \"\\F243\";\n}\n\n.mdi-flash-outline::before {\n  content: \"\\F6D4\";\n}\n\n.mdi-flash-red-eye::before {\n  content: \"\\F67A\";\n}\n\n.mdi-flashlight::before {\n  content: \"\\F244\";\n}\n\n.mdi-flashlight-off::before {\n  content: \"\\F245\";\n}\n\n.mdi-flask::before {\n  content: \"\\F093\";\n}\n\n.mdi-flask-empty::before {\n  content: \"\\F094\";\n}\n\n.mdi-flask-empty-outline::before {\n  content: \"\\F095\";\n}\n\n.mdi-flask-outline::before {\n  content: \"\\F096\";\n}\n\n.mdi-flattr::before {\n  content: \"\\F246\";\n}\n\n.mdi-flickr::before {\n  content: \"\\FCE3\";\n}\n\n.mdi-flip-horizontal::before {\n  content: \"\\F0112\";\n}\n\n.mdi-flip-to-back::before {\n  content: \"\\F247\";\n}\n\n.mdi-flip-to-front::before {\n  content: \"\\F248\";\n}\n\n.mdi-flip-vertical::before {\n  content: \"\\F0113\";\n}\n\n.mdi-floor-lamp::before {\n  content: \"\\F8DC\";\n}\n\n.mdi-floor-lamp-dual::before {\n  content: \"\\F0062\";\n}\n\n.mdi-floor-lamp-variant::before {\n  content: \"\\F0063\";\n}\n\n.mdi-floor-plan::before {\n  content: \"\\F820\";\n}\n\n.mdi-floppy::before {\n  content: \"\\F249\";\n}\n\n.mdi-floppy-variant::before {\n  content: \"\\F9EE\";\n}\n\n.mdi-flower::before {\n  content: \"\\F24A\";\n}\n\n.mdi-flower-outline::before {\n  content: \"\\F9EF\";\n}\n\n.mdi-flower-poppy::before {\n  content: \"\\FCE4\";\n}\n\n.mdi-flower-tulip::before {\n  content: \"\\F9F0\";\n}\n\n.mdi-flower-tulip-outline::before {\n  content: \"\\F9F1\";\n}\n\n.mdi-focus-auto::before {\n  content: \"\\FF6B\";\n}\n\n.mdi-focus-field::before {\n  content: \"\\FF6C\";\n}\n\n.mdi-focus-field-horizontal::before {\n  content: \"\\FF6D\";\n}\n\n.mdi-focus-field-vertical::before {\n  content: \"\\FF6E\";\n}\n\n.mdi-folder::before {\n  content: \"\\F24B\";\n}\n\n.mdi-folder-account::before {\n  content: \"\\F24C\";\n}\n\n.mdi-folder-account-outline::before {\n  content: \"\\FB78\";\n}\n\n.mdi-folder-alert::before {\n  content: \"\\FDA8\";\n}\n\n.mdi-folder-alert-outline::before {\n  content: \"\\FDA9\";\n}\n\n.mdi-folder-clock::before {\n  content: \"\\FAB9\";\n}\n\n.mdi-folder-clock-outline::before {\n  content: \"\\FABA\";\n}\n\n.mdi-folder-download::before {\n  content: \"\\F24D\";\n}\n\n.mdi-folder-download-outline::before {\n  content: \"\\F0114\";\n}\n\n.mdi-folder-edit::before {\n  content: \"\\F8DD\";\n}\n\n.mdi-folder-edit-outline::before {\n  content: \"\\FDAA\";\n}\n\n.mdi-folder-google-drive::before {\n  content: \"\\F24E\";\n}\n\n.mdi-folder-heart::before {\n  content: \"\\F0115\";\n}\n\n.mdi-folder-heart-outline::before {\n  content: \"\\F0116\";\n}\n\n.mdi-folder-home::before {\n  content: \"\\F00E0\";\n}\n\n.mdi-folder-home-outline::before {\n  content: \"\\F00E1\";\n}\n\n.mdi-folder-image::before {\n  content: \"\\F24F\";\n}\n\n.mdi-folder-information::before {\n  content: \"\\F00E2\";\n}\n\n.mdi-folder-information-outline::before {\n  content: \"\\F00E3\";\n}\n\n.mdi-folder-key::before {\n  content: \"\\F8AB\";\n}\n\n.mdi-folder-key-network::before {\n  content: \"\\F8AC\";\n}\n\n.mdi-folder-key-network-outline::before {\n  content: \"\\FC5C\";\n}\n\n.mdi-folder-key-outline::before {\n  content: \"\\F0117\";\n}\n\n.mdi-folder-lock::before {\n  content: \"\\F250\";\n}\n\n.mdi-folder-lock-open::before {\n  content: \"\\F251\";\n}\n\n.mdi-folder-move::before {\n  content: \"\\F252\";\n}\n\n.mdi-folder-multiple::before {\n  content: \"\\F253\";\n}\n\n.mdi-folder-multiple-image::before {\n  content: \"\\F254\";\n}\n\n.mdi-folder-multiple-outline::before {\n  content: \"\\F255\";\n}\n\n.mdi-folder-network::before {\n  content: \"\\F86F\";\n}\n\n.mdi-folder-network-outline::before {\n  content: \"\\FC5D\";\n}\n\n.mdi-folder-open::before {\n  content: \"\\F76F\";\n}\n\n.mdi-folder-open-outline::before {\n  content: \"\\FDAB\";\n}\n\n.mdi-folder-outline::before {\n  content: \"\\F256\";\n}\n\n.mdi-folder-plus::before {\n  content: \"\\F257\";\n}\n\n.mdi-folder-plus-outline::before {\n  content: \"\\FB79\";\n}\n\n.mdi-folder-pound::before {\n  content: \"\\FCE5\";\n}\n\n.mdi-folder-pound-outline::before {\n  content: \"\\FCE6\";\n}\n\n.mdi-folder-remove::before {\n  content: \"\\F258\";\n}\n\n.mdi-folder-remove-outline::before {\n  content: \"\\FB7A\";\n}\n\n.mdi-folder-search::before {\n  content: \"\\F967\";\n}\n\n.mdi-folder-search-outline::before {\n  content: \"\\F968\";\n}\n\n.mdi-folder-settings::before {\n  content: \"\\F00A8\";\n}\n\n.mdi-folder-settings-outline::before {\n  content: \"\\F00A9\";\n}\n\n.mdi-folder-settings-variant::before {\n  content: \"\\F00AA\";\n}\n\n.mdi-folder-settings-variant-outline::before {\n  content: \"\\F00AB\";\n}\n\n.mdi-folder-star::before {\n  content: \"\\F69C\";\n}\n\n.mdi-folder-star-outline::before {\n  content: \"\\FB7B\";\n}\n\n.mdi-folder-swap::before {\n  content: \"\\FFD6\";\n}\n\n.mdi-folder-swap-outline::before {\n  content: \"\\FFD7\";\n}\n\n.mdi-folder-sync::before {\n  content: \"\\FCE7\";\n}\n\n.mdi-folder-sync-outline::before {\n  content: \"\\FCE8\";\n}\n\n.mdi-folder-text::before {\n  content: \"\\FC5E\";\n}\n\n.mdi-folder-text-outline::before {\n  content: \"\\FC5F\";\n}\n\n.mdi-folder-upload::before {\n  content: \"\\F259\";\n}\n\n.mdi-folder-upload-outline::before {\n  content: \"\\F0118\";\n}\n\n.mdi-folder-zip::before {\n  content: \"\\F6EA\";\n}\n\n.mdi-folder-zip-outline::before {\n  content: \"\\F7B8\";\n}\n\n.mdi-font-awesome::before {\n  content: \"\\F03A\";\n}\n\n.mdi-food::before {\n  content: \"\\F25A\";\n}\n\n.mdi-food-apple::before {\n  content: \"\\F25B\";\n}\n\n.mdi-food-apple-outline::before {\n  content: \"\\FC60\";\n}\n\n.mdi-food-croissant::before {\n  content: \"\\F7C7\";\n}\n\n.mdi-food-fork-drink::before {\n  content: \"\\F5F2\";\n}\n\n.mdi-food-off::before {\n  content: \"\\F5F3\";\n}\n\n.mdi-food-variant::before {\n  content: \"\\F25C\";\n}\n\n.mdi-foot-print::before {\n  content: \"\\FF6F\";\n}\n\n.mdi-football::before {\n  content: \"\\F25D\";\n}\n\n.mdi-football-australian::before {\n  content: \"\\F25E\";\n}\n\n.mdi-football-helmet::before {\n  content: \"\\F25F\";\n}\n\n.mdi-forklift::before {\n  content: \"\\F7C8\";\n}\n\n.mdi-format-align-bottom::before {\n  content: \"\\F752\";\n}\n\n.mdi-format-align-center::before {\n  content: \"\\F260\";\n}\n\n.mdi-format-align-justify::before {\n  content: \"\\F261\";\n}\n\n.mdi-format-align-left::before {\n  content: \"\\F262\";\n}\n\n.mdi-format-align-middle::before {\n  content: \"\\F753\";\n}\n\n.mdi-format-align-right::before {\n  content: \"\\F263\";\n}\n\n.mdi-format-align-top::before {\n  content: \"\\F754\";\n}\n\n.mdi-format-annotation-minus::before {\n  content: \"\\FABB\";\n}\n\n.mdi-format-annotation-plus::before {\n  content: \"\\F646\";\n}\n\n.mdi-format-bold::before {\n  content: \"\\F264\";\n}\n\n.mdi-format-clear::before {\n  content: \"\\F265\";\n}\n\n.mdi-format-color-fill::before {\n  content: \"\\F266\";\n}\n\n.mdi-format-color-highlight::before {\n  content: \"\\FE14\";\n}\n\n.mdi-format-color-text::before {\n  content: \"\\F69D\";\n}\n\n.mdi-format-columns::before {\n  content: \"\\F8DE\";\n}\n\n.mdi-format-float-center::before {\n  content: \"\\F267\";\n}\n\n.mdi-format-float-left::before {\n  content: \"\\F268\";\n}\n\n.mdi-format-float-none::before {\n  content: \"\\F269\";\n}\n\n.mdi-format-float-right::before {\n  content: \"\\F26A\";\n}\n\n.mdi-format-font::before {\n  content: \"\\F6D5\";\n}\n\n.mdi-format-font-size-decrease::before {\n  content: \"\\F9F2\";\n}\n\n.mdi-format-font-size-increase::before {\n  content: \"\\F9F3\";\n}\n\n.mdi-format-header-1::before {\n  content: \"\\F26B\";\n}\n\n.mdi-format-header-2::before {\n  content: \"\\F26C\";\n}\n\n.mdi-format-header-3::before {\n  content: \"\\F26D\";\n}\n\n.mdi-format-header-4::before {\n  content: \"\\F26E\";\n}\n\n.mdi-format-header-5::before {\n  content: \"\\F26F\";\n}\n\n.mdi-format-header-6::before {\n  content: \"\\F270\";\n}\n\n.mdi-format-header-decrease::before {\n  content: \"\\F271\";\n}\n\n.mdi-format-header-equal::before {\n  content: \"\\F272\";\n}\n\n.mdi-format-header-increase::before {\n  content: \"\\F273\";\n}\n\n.mdi-format-header-pound::before {\n  content: \"\\F274\";\n}\n\n.mdi-format-horizontal-align-center::before {\n  content: \"\\F61E\";\n}\n\n.mdi-format-horizontal-align-left::before {\n  content: \"\\F61F\";\n}\n\n.mdi-format-horizontal-align-right::before {\n  content: \"\\F620\";\n}\n\n.mdi-format-indent-decrease::before {\n  content: \"\\F275\";\n}\n\n.mdi-format-indent-increase::before {\n  content: \"\\F276\";\n}\n\n.mdi-format-italic::before {\n  content: \"\\F277\";\n}\n\n.mdi-format-letter-case::before {\n  content: \"\\FB19\";\n}\n\n.mdi-format-letter-case-lower::before {\n  content: \"\\FB1A\";\n}\n\n.mdi-format-letter-case-upper::before {\n  content: \"\\FB1B\";\n}\n\n.mdi-format-letter-ends-with::before {\n  content: \"\\FFD8\";\n}\n\n.mdi-format-letter-matches::before {\n  content: \"\\FFD9\";\n}\n\n.mdi-format-letter-starts-with::before {\n  content: \"\\FFDA\";\n}\n\n.mdi-format-line-spacing::before {\n  content: \"\\F278\";\n}\n\n.mdi-format-line-style::before {\n  content: \"\\F5C8\";\n}\n\n.mdi-format-line-weight::before {\n  content: \"\\F5C9\";\n}\n\n.mdi-format-list-bulleted::before {\n  content: \"\\F279\";\n}\n\n.mdi-format-list-bulleted-square::before {\n  content: \"\\FDAC\";\n}\n\n.mdi-format-list-bulleted-triangle::before {\n  content: \"\\FECF\";\n}\n\n.mdi-format-list-bulleted-type::before {\n  content: \"\\F27A\";\n}\n\n.mdi-format-list-checkbox::before {\n  content: \"\\F969\";\n}\n\n.mdi-format-list-checks::before {\n  content: \"\\F755\";\n}\n\n.mdi-format-list-numbered::before {\n  content: \"\\F27B\";\n}\n\n.mdi-format-list-numbered-rtl::before {\n  content: \"\\FCE9\";\n}\n\n.mdi-format-overline::before {\n  content: \"\\FED0\";\n}\n\n.mdi-format-page-break::before {\n  content: \"\\F6D6\";\n}\n\n.mdi-format-paint::before {\n  content: \"\\F27C\";\n}\n\n.mdi-format-paragraph::before {\n  content: \"\\F27D\";\n}\n\n.mdi-format-pilcrow::before {\n  content: \"\\F6D7\";\n}\n\n.mdi-format-quote-close::before {\n  content: \"\\F27E\";\n}\n\n.mdi-format-quote-open::before {\n  content: \"\\F756\";\n}\n\n.mdi-format-rotate-90::before {\n  content: \"\\F6A9\";\n}\n\n.mdi-format-section::before {\n  content: \"\\F69E\";\n}\n\n.mdi-format-size::before {\n  content: \"\\F27F\";\n}\n\n.mdi-format-strikethrough::before {\n  content: \"\\F280\";\n}\n\n.mdi-format-strikethrough-variant::before {\n  content: \"\\F281\";\n}\n\n.mdi-format-subscript::before {\n  content: \"\\F282\";\n}\n\n.mdi-format-superscript::before {\n  content: \"\\F283\";\n}\n\n.mdi-format-text::before {\n  content: \"\\F284\";\n}\n\n.mdi-format-text-rotation-angle-down::before {\n  content: \"\\FFDB\";\n}\n\n.mdi-format-text-rotation-angle-up::before {\n  content: \"\\FFDC\";\n}\n\n.mdi-format-text-rotation-down::before {\n  content: \"\\FD4F\";\n}\n\n.mdi-format-text-rotation-down-vertical::before {\n  content: \"\\FFDD\";\n}\n\n.mdi-format-text-rotation-none::before {\n  content: \"\\FD50\";\n}\n\n.mdi-format-text-rotation-up::before {\n  content: \"\\FFDE\";\n}\n\n.mdi-format-text-rotation-vertical::before {\n  content: \"\\FFDF\";\n}\n\n.mdi-format-text-variant::before {\n  content: \"\\FE15\";\n}\n\n.mdi-format-text-wrapping-clip::before {\n  content: \"\\FCEA\";\n}\n\n.mdi-format-text-wrapping-overflow::before {\n  content: \"\\FCEB\";\n}\n\n.mdi-format-text-wrapping-wrap::before {\n  content: \"\\FCEC\";\n}\n\n.mdi-format-textbox::before {\n  content: \"\\FCED\";\n}\n\n.mdi-format-textdirection-l-to-r::before {\n  content: \"\\F285\";\n}\n\n.mdi-format-textdirection-r-to-l::before {\n  content: \"\\F286\";\n}\n\n.mdi-format-title::before {\n  content: \"\\F5F4\";\n}\n\n.mdi-format-underline::before {\n  content: \"\\F287\";\n}\n\n.mdi-format-vertical-align-bottom::before {\n  content: \"\\F621\";\n}\n\n.mdi-format-vertical-align-center::before {\n  content: \"\\F622\";\n}\n\n.mdi-format-vertical-align-top::before {\n  content: \"\\F623\";\n}\n\n.mdi-format-wrap-inline::before {\n  content: \"\\F288\";\n}\n\n.mdi-format-wrap-square::before {\n  content: \"\\F289\";\n}\n\n.mdi-format-wrap-tight::before {\n  content: \"\\F28A\";\n}\n\n.mdi-format-wrap-top-bottom::before {\n  content: \"\\F28B\";\n}\n\n.mdi-forum::before {\n  content: \"\\F28C\";\n}\n\n.mdi-forum-outline::before {\n  content: \"\\F821\";\n}\n\n.mdi-forward::before {\n  content: \"\\F28D\";\n}\n\n.mdi-forwardburger::before {\n  content: \"\\FD51\";\n}\n\n.mdi-fountain::before {\n  content: \"\\F96A\";\n}\n\n.mdi-fountain-pen::before {\n  content: \"\\FCEE\";\n}\n\n.mdi-fountain-pen-tip::before {\n  content: \"\\FCEF\";\n}\n\n.mdi-foursquare::before {\n  content: \"\\F28E\";\n}\n\n.mdi-freebsd::before {\n  content: \"\\F8DF\";\n}\n\n.mdi-frequently-asked-questions::before {\n  content: \"\\FED1\";\n}\n\n.mdi-fridge::before {\n  content: \"\\F290\";\n}\n\n.mdi-fridge-bottom::before {\n  content: \"\\F292\";\n}\n\n.mdi-fridge-outline::before {\n  content: \"\\F28F\";\n}\n\n.mdi-fridge-top::before {\n  content: \"\\F291\";\n}\n\n.mdi-fruit-cherries::before {\n  content: \"\\F0064\";\n}\n\n.mdi-fruit-citrus::before {\n  content: \"\\F0065\";\n}\n\n.mdi-fruit-grapes::before {\n  content: \"\\F0066\";\n}\n\n.mdi-fruit-grapes-outline::before {\n  content: \"\\F0067\";\n}\n\n.mdi-fruit-pineapple::before {\n  content: \"\\F0068\";\n}\n\n.mdi-fruit-watermelon::before {\n  content: \"\\F0069\";\n}\n\n.mdi-fuel::before {\n  content: \"\\F7C9\";\n}\n\n.mdi-fullscreen::before {\n  content: \"\\F293\";\n}\n\n.mdi-fullscreen-exit::before {\n  content: \"\\F294\";\n}\n\n.mdi-function::before {\n  content: \"\\F295\";\n}\n\n.mdi-function-variant::before {\n  content: \"\\F870\";\n}\n\n.mdi-furigana-horizontal::before {\n  content: \"\\F00AC\";\n}\n\n.mdi-furigana-vertical::before {\n  content: \"\\F00AD\";\n}\n\n.mdi-fuse::before {\n  content: \"\\FC61\";\n}\n\n.mdi-fuse-blade::before {\n  content: \"\\FC62\";\n}\n\n.mdi-gamepad::before {\n  content: \"\\F296\";\n}\n\n.mdi-gamepad-circle::before {\n  content: \"\\FE16\";\n}\n\n.mdi-gamepad-circle-down::before {\n  content: \"\\FE17\";\n}\n\n.mdi-gamepad-circle-left::before {\n  content: \"\\FE18\";\n}\n\n.mdi-gamepad-circle-outline::before {\n  content: \"\\FE19\";\n}\n\n.mdi-gamepad-circle-right::before {\n  content: \"\\FE1A\";\n}\n\n.mdi-gamepad-circle-up::before {\n  content: \"\\FE1B\";\n}\n\n.mdi-gamepad-down::before {\n  content: \"\\FE1C\";\n}\n\n.mdi-gamepad-left::before {\n  content: \"\\FE1D\";\n}\n\n.mdi-gamepad-right::before {\n  content: \"\\FE1E\";\n}\n\n.mdi-gamepad-round::before {\n  content: \"\\FE1F\";\n}\n\n.mdi-gamepad-round-down::before {\n  content: \"\\FE7E\";\n}\n\n.mdi-gamepad-round-left::before {\n  content: \"\\FE7F\";\n}\n\n.mdi-gamepad-round-outline::before {\n  content: \"\\FE80\";\n}\n\n.mdi-gamepad-round-right::before {\n  content: \"\\FE81\";\n}\n\n.mdi-gamepad-round-up::before {\n  content: \"\\FE82\";\n}\n\n.mdi-gamepad-square::before {\n  content: \"\\FED2\";\n}\n\n.mdi-gamepad-square-outline::before {\n  content: \"\\FED3\";\n}\n\n.mdi-gamepad-up::before {\n  content: \"\\FE83\";\n}\n\n.mdi-gamepad-variant::before {\n  content: \"\\F297\";\n}\n\n.mdi-gamepad-variant-outline::before {\n  content: \"\\FED4\";\n}\n\n.mdi-gamma::before {\n  content: \"\\F0119\";\n}\n\n.mdi-gantry-crane::before {\n  content: \"\\FDAD\";\n}\n\n.mdi-garage::before {\n  content: \"\\F6D8\";\n}\n\n.mdi-garage-alert::before {\n  content: \"\\F871\";\n}\n\n.mdi-garage-open::before {\n  content: \"\\F6D9\";\n}\n\n.mdi-gas-cylinder::before {\n  content: \"\\F647\";\n}\n\n.mdi-gas-station::before {\n  content: \"\\F298\";\n}\n\n.mdi-gas-station-outline::before {\n  content: \"\\FED5\";\n}\n\n.mdi-gate::before {\n  content: \"\\F299\";\n}\n\n.mdi-gate-and::before {\n  content: \"\\F8E0\";\n}\n\n.mdi-gate-arrow-right::before {\n  content: \"\\F0194\";\n}\n\n.mdi-gate-nand::before {\n  content: \"\\F8E1\";\n}\n\n.mdi-gate-nor::before {\n  content: \"\\F8E2\";\n}\n\n.mdi-gate-not::before {\n  content: \"\\F8E3\";\n}\n\n.mdi-gate-open::before {\n  content: \"\\F0195\";\n}\n\n.mdi-gate-or::before {\n  content: \"\\F8E4\";\n}\n\n.mdi-gate-xnor::before {\n  content: \"\\F8E5\";\n}\n\n.mdi-gate-xor::before {\n  content: \"\\F8E6\";\n}\n\n.mdi-gatsby::before {\n  content: \"\\FE84\";\n}\n\n.mdi-gauge::before {\n  content: \"\\F29A\";\n}\n\n.mdi-gauge-empty::before {\n  content: \"\\F872\";\n}\n\n.mdi-gauge-full::before {\n  content: \"\\F873\";\n}\n\n.mdi-gauge-low::before {\n  content: \"\\F874\";\n}\n\n.mdi-gavel::before {\n  content: \"\\F29B\";\n}\n\n.mdi-gender-female::before {\n  content: \"\\F29C\";\n}\n\n.mdi-gender-male::before {\n  content: \"\\F29D\";\n}\n\n.mdi-gender-male-female::before {\n  content: \"\\F29E\";\n}\n\n.mdi-gender-male-female-variant::before {\n  content: \"\\F016A\";\n}\n\n.mdi-gender-non-binary::before {\n  content: \"\\F016B\";\n}\n\n.mdi-gender-transgender::before {\n  content: \"\\F29F\";\n}\n\n.mdi-gentoo::before {\n  content: \"\\F8E7\";\n}\n\n.mdi-gesture::before {\n  content: \"\\F7CA\";\n}\n\n.mdi-gesture-double-tap::before {\n  content: \"\\F73B\";\n}\n\n.mdi-gesture-pinch::before {\n  content: \"\\FABC\";\n}\n\n.mdi-gesture-spread::before {\n  content: \"\\FABD\";\n}\n\n.mdi-gesture-swipe::before {\n  content: \"\\FD52\";\n}\n\n.mdi-gesture-swipe-down::before {\n  content: \"\\F73C\";\n}\n\n.mdi-gesture-swipe-horizontal::before {\n  content: \"\\FABE\";\n}\n\n.mdi-gesture-swipe-left::before {\n  content: \"\\F73D\";\n}\n\n.mdi-gesture-swipe-right::before {\n  content: \"\\F73E\";\n}\n\n.mdi-gesture-swipe-up::before {\n  content: \"\\F73F\";\n}\n\n.mdi-gesture-swipe-vertical::before {\n  content: \"\\FABF\";\n}\n\n.mdi-gesture-tap::before {\n  content: \"\\F740\";\n}\n\n.mdi-gesture-tap-hold::before {\n  content: \"\\FD53\";\n}\n\n.mdi-gesture-two-double-tap::before {\n  content: \"\\F741\";\n}\n\n.mdi-gesture-two-tap::before {\n  content: \"\\F742\";\n}\n\n.mdi-ghost::before {\n  content: \"\\F2A0\";\n}\n\n.mdi-ghost-off::before {\n  content: \"\\F9F4\";\n}\n\n.mdi-gif::before {\n  content: \"\\FD54\";\n}\n\n.mdi-gift::before {\n  content: \"\\FE85\";\n}\n\n.mdi-gift-outline::before {\n  content: \"\\F2A1\";\n}\n\n.mdi-git::before {\n  content: \"\\F2A2\";\n}\n\n.mdi-github-box::before {\n  content: \"\\F2A3\";\n}\n\n.mdi-github-circle::before {\n  content: \"\\F2A4\";\n}\n\n.mdi-github-face::before {\n  content: \"\\F6DA\";\n}\n\n.mdi-gitlab::before {\n  content: \"\\FB7C\";\n}\n\n.mdi-glass-cocktail::before {\n  content: \"\\F356\";\n}\n\n.mdi-glass-flute::before {\n  content: \"\\F2A5\";\n}\n\n.mdi-glass-mug::before {\n  content: \"\\F2A6\";\n}\n\n.mdi-glass-mug-variant::before {\n  content: \"\\F0141\";\n}\n\n.mdi-glass-stange::before {\n  content: \"\\F2A7\";\n}\n\n.mdi-glass-tulip::before {\n  content: \"\\F2A8\";\n}\n\n.mdi-glass-wine::before {\n  content: \"\\F875\";\n}\n\n.mdi-glassdoor::before {\n  content: \"\\F2A9\";\n}\n\n.mdi-glasses::before {\n  content: \"\\F2AA\";\n}\n\n.mdi-globe-model::before {\n  content: \"\\F8E8\";\n}\n\n.mdi-gmail::before {\n  content: \"\\F2AB\";\n}\n\n.mdi-gnome::before {\n  content: \"\\F2AC\";\n}\n\n.mdi-go-kart::before {\n  content: \"\\FD55\";\n}\n\n.mdi-go-kart-track::before {\n  content: \"\\FD56\";\n}\n\n.mdi-gog::before {\n  content: \"\\FB7D\";\n}\n\n.mdi-golf::before {\n  content: \"\\F822\";\n}\n\n.mdi-golf-tee::before {\n  content: \"\\F00AE\";\n}\n\n.mdi-gondola::before {\n  content: \"\\F685\";\n}\n\n.mdi-goodreads::before {\n  content: \"\\FD57\";\n}\n\n.mdi-google::before {\n  content: \"\\F2AD\";\n}\n\n.mdi-google-adwords::before {\n  content: \"\\FC63\";\n}\n\n.mdi-google-analytics::before {\n  content: \"\\F7CB\";\n}\n\n.mdi-google-assistant::before {\n  content: \"\\F7CC\";\n}\n\n.mdi-google-cardboard::before {\n  content: \"\\F2AE\";\n}\n\n.mdi-google-chrome::before {\n  content: \"\\F2AF\";\n}\n\n.mdi-google-circles::before {\n  content: \"\\F2B0\";\n}\n\n.mdi-google-circles-communities::before {\n  content: \"\\F2B1\";\n}\n\n.mdi-google-circles-extended::before {\n  content: \"\\F2B2\";\n}\n\n.mdi-google-circles-group::before {\n  content: \"\\F2B3\";\n}\n\n.mdi-google-classroom::before {\n  content: \"\\F2C0\";\n}\n\n.mdi-google-controller::before {\n  content: \"\\F2B4\";\n}\n\n.mdi-google-controller-off::before {\n  content: \"\\F2B5\";\n}\n\n.mdi-google-drive::before {\n  content: \"\\F2B6\";\n}\n\n.mdi-google-earth::before {\n  content: \"\\F2B7\";\n}\n\n.mdi-google-fit::before {\n  content: \"\\F96B\";\n}\n\n.mdi-google-glass::before {\n  content: \"\\F2B8\";\n}\n\n.mdi-google-hangouts::before {\n  content: \"\\F2C9\";\n}\n\n.mdi-google-home::before {\n  content: \"\\F823\";\n}\n\n.mdi-google-keep::before {\n  content: \"\\F6DB\";\n}\n\n.mdi-google-lens::before {\n  content: \"\\F9F5\";\n}\n\n.mdi-google-maps::before {\n  content: \"\\F5F5\";\n}\n\n.mdi-google-my-business::before {\n  content: \"\\F006A\";\n}\n\n.mdi-google-nearby::before {\n  content: \"\\F2B9\";\n}\n\n.mdi-google-pages::before {\n  content: \"\\F2BA\";\n}\n\n.mdi-google-photos::before {\n  content: \"\\F6DC\";\n}\n\n.mdi-google-physical-web::before {\n  content: \"\\F2BB\";\n}\n\n.mdi-google-play::before {\n  content: \"\\F2BC\";\n}\n\n.mdi-google-plus::before {\n  content: \"\\F2BD\";\n}\n\n.mdi-google-plus-box::before {\n  content: \"\\F2BE\";\n}\n\n.mdi-google-podcast::before {\n  content: \"\\FED6\";\n}\n\n.mdi-google-spreadsheet::before {\n  content: \"\\F9F6\";\n}\n\n.mdi-google-street-view::before {\n  content: \"\\FC64\";\n}\n\n.mdi-google-translate::before {\n  content: \"\\F2BF\";\n}\n\n.mdi-gradient::before {\n  content: \"\\F69F\";\n}\n\n.mdi-grain::before {\n  content: \"\\FD58\";\n}\n\n.mdi-graph::before {\n  content: \"\\F006B\";\n}\n\n.mdi-graph-outline::before {\n  content: \"\\F006C\";\n}\n\n.mdi-graphql::before {\n  content: \"\\F876\";\n}\n\n.mdi-grave-stone::before {\n  content: \"\\FB7E\";\n}\n\n.mdi-grease-pencil::before {\n  content: \"\\F648\";\n}\n\n.mdi-greater-than::before {\n  content: \"\\F96C\";\n}\n\n.mdi-greater-than-or-equal::before {\n  content: \"\\F96D\";\n}\n\n.mdi-grid::before {\n  content: \"\\F2C1\";\n}\n\n.mdi-grid-large::before {\n  content: \"\\F757\";\n}\n\n.mdi-grid-off::before {\n  content: \"\\F2C2\";\n}\n\n.mdi-grill::before {\n  content: \"\\FE86\";\n}\n\n.mdi-grill-outline::before {\n  content: \"\\F01B5\";\n}\n\n.mdi-group::before {\n  content: \"\\F2C3\";\n}\n\n.mdi-guitar-acoustic::before {\n  content: \"\\F770\";\n}\n\n.mdi-guitar-electric::before {\n  content: \"\\F2C4\";\n}\n\n.mdi-guitar-pick::before {\n  content: \"\\F2C5\";\n}\n\n.mdi-guitar-pick-outline::before {\n  content: \"\\F2C6\";\n}\n\n.mdi-guy-fawkes-mask::before {\n  content: \"\\F824\";\n}\n\n.mdi-hackernews::before {\n  content: \"\\F624\";\n}\n\n.mdi-hail::before {\n  content: \"\\FAC0\";\n}\n\n.mdi-hair-dryer::before {\n  content: \"\\F011A\";\n}\n\n.mdi-hair-dryer-outline::before {\n  content: \"\\F011B\";\n}\n\n.mdi-halloween::before {\n  content: \"\\FB7F\";\n}\n\n.mdi-hamburger::before {\n  content: \"\\F684\";\n}\n\n.mdi-hammer::before {\n  content: \"\\F8E9\";\n}\n\n.mdi-hand::before {\n  content: \"\\FA4E\";\n}\n\n.mdi-hand-heart::before {\n  content: \"\\F011C\";\n}\n\n.mdi-hand-left::before {\n  content: \"\\FE87\";\n}\n\n.mdi-hand-okay::before {\n  content: \"\\FA4F\";\n}\n\n.mdi-hand-peace::before {\n  content: \"\\FA50\";\n}\n\n.mdi-hand-peace-variant::before {\n  content: \"\\FA51\";\n}\n\n.mdi-hand-pointing-down::before {\n  content: \"\\FA52\";\n}\n\n.mdi-hand-pointing-left::before {\n  content: \"\\FA53\";\n}\n\n.mdi-hand-pointing-right::before {\n  content: \"\\F2C7\";\n}\n\n.mdi-hand-pointing-up::before {\n  content: \"\\FA54\";\n}\n\n.mdi-hand-right::before {\n  content: \"\\FE88\";\n}\n\n.mdi-hand-saw::before {\n  content: \"\\FE89\";\n}\n\n.mdi-handball::before {\n  content: \"\\FF70\";\n}\n\n.mdi-handcuffs::before {\n  content: \"\\F0169\";\n}\n\n.mdi-hanger::before {\n  content: \"\\F2C8\";\n}\n\n.mdi-hard-hat::before {\n  content: \"\\F96E\";\n}\n\n.mdi-harddisk::before {\n  content: \"\\F2CA\";\n}\n\n.mdi-harddisk-plus::before {\n  content: \"\\F006D\";\n}\n\n.mdi-harddisk-remove::before {\n  content: \"\\F006E\";\n}\n\n.mdi-hat-fedora::before {\n  content: \"\\FB80\";\n}\n\n.mdi-hazard-lights::before {\n  content: \"\\FC65\";\n}\n\n.mdi-hdr::before {\n  content: \"\\FD59\";\n}\n\n.mdi-hdr-off::before {\n  content: \"\\FD5A\";\n}\n\n.mdi-headphones::before {\n  content: \"\\F2CB\";\n}\n\n.mdi-headphones-bluetooth::before {\n  content: \"\\F96F\";\n}\n\n.mdi-headphones-box::before {\n  content: \"\\F2CC\";\n}\n\n.mdi-headphones-off::before {\n  content: \"\\F7CD\";\n}\n\n.mdi-headphones-settings::before {\n  content: \"\\F2CD\";\n}\n\n.mdi-headset::before {\n  content: \"\\F2CE\";\n}\n\n.mdi-headset-dock::before {\n  content: \"\\F2CF\";\n}\n\n.mdi-headset-off::before {\n  content: \"\\F2D0\";\n}\n\n.mdi-heart::before {\n  content: \"\\F2D1\";\n}\n\n.mdi-heart-box::before {\n  content: \"\\F2D2\";\n}\n\n.mdi-heart-box-outline::before {\n  content: \"\\F2D3\";\n}\n\n.mdi-heart-broken::before {\n  content: \"\\F2D4\";\n}\n\n.mdi-heart-broken-outline::before {\n  content: \"\\FCF0\";\n}\n\n.mdi-heart-circle::before {\n  content: \"\\F970\";\n}\n\n.mdi-heart-circle-outline::before {\n  content: \"\\F971\";\n}\n\n.mdi-heart-flash::before {\n  content: \"\\FF16\";\n}\n\n.mdi-heart-half::before {\n  content: \"\\F6DE\";\n}\n\n.mdi-heart-half-full::before {\n  content: \"\\F6DD\";\n}\n\n.mdi-heart-half-outline::before {\n  content: \"\\F6DF\";\n}\n\n.mdi-heart-multiple::before {\n  content: \"\\FA55\";\n}\n\n.mdi-heart-multiple-outline::before {\n  content: \"\\FA56\";\n}\n\n.mdi-heart-off::before {\n  content: \"\\F758\";\n}\n\n.mdi-heart-outline::before {\n  content: \"\\F2D5\";\n}\n\n.mdi-heart-pulse::before {\n  content: \"\\F5F6\";\n}\n\n.mdi-helicopter::before {\n  content: \"\\FAC1\";\n}\n\n.mdi-help::before {\n  content: \"\\F2D6\";\n}\n\n.mdi-help-box::before {\n  content: \"\\F78A\";\n}\n\n.mdi-help-circle::before {\n  content: \"\\F2D7\";\n}\n\n.mdi-help-circle-outline::before {\n  content: \"\\F625\";\n}\n\n.mdi-help-network::before {\n  content: \"\\F6F4\";\n}\n\n.mdi-help-network-outline::before {\n  content: \"\\FC66\";\n}\n\n.mdi-help-rhombus::before {\n  content: \"\\FB81\";\n}\n\n.mdi-help-rhombus-outline::before {\n  content: \"\\FB82\";\n}\n\n.mdi-hexagon::before {\n  content: \"\\F2D8\";\n}\n\n.mdi-hexagon-multiple::before {\n  content: \"\\F6E0\";\n}\n\n.mdi-hexagon-multiple-outline::before {\n  content: \"\\F011D\";\n}\n\n.mdi-hexagon-outline::before {\n  content: \"\\F2D9\";\n}\n\n.mdi-hexagon-slice-1::before {\n  content: \"\\FAC2\";\n}\n\n.mdi-hexagon-slice-2::before {\n  content: \"\\FAC3\";\n}\n\n.mdi-hexagon-slice-3::before {\n  content: \"\\FAC4\";\n}\n\n.mdi-hexagon-slice-4::before {\n  content: \"\\FAC5\";\n}\n\n.mdi-hexagon-slice-5::before {\n  content: \"\\FAC6\";\n}\n\n.mdi-hexagon-slice-6::before {\n  content: \"\\FAC7\";\n}\n\n.mdi-hexagram::before {\n  content: \"\\FAC8\";\n}\n\n.mdi-hexagram-outline::before {\n  content: \"\\FAC9\";\n}\n\n.mdi-high-definition::before {\n  content: \"\\F7CE\";\n}\n\n.mdi-high-definition-box::before {\n  content: \"\\F877\";\n}\n\n.mdi-highway::before {\n  content: \"\\F5F7\";\n}\n\n.mdi-hiking::before {\n  content: \"\\FD5B\";\n}\n\n.mdi-hinduism::before {\n  content: \"\\F972\";\n}\n\n.mdi-history::before {\n  content: \"\\F2DA\";\n}\n\n.mdi-hockey-puck::before {\n  content: \"\\F878\";\n}\n\n.mdi-hockey-sticks::before {\n  content: \"\\F879\";\n}\n\n.mdi-hololens::before {\n  content: \"\\F2DB\";\n}\n\n.mdi-home::before {\n  content: \"\\F2DC\";\n}\n\n.mdi-home-account::before {\n  content: \"\\F825\";\n}\n\n.mdi-home-alert::before {\n  content: \"\\F87A\";\n}\n\n.mdi-home-analytics::before {\n  content: \"\\FED7\";\n}\n\n.mdi-home-assistant::before {\n  content: \"\\F7CF\";\n}\n\n.mdi-home-automation::before {\n  content: \"\\F7D0\";\n}\n\n.mdi-home-circle::before {\n  content: \"\\F7D1\";\n}\n\n.mdi-home-circle-outline::before {\n  content: \"\\F006F\";\n}\n\n.mdi-home-city::before {\n  content: \"\\FCF1\";\n}\n\n.mdi-home-city-outline::before {\n  content: \"\\FCF2\";\n}\n\n.mdi-home-currency-usd::before {\n  content: \"\\F8AE\";\n}\n\n.mdi-home-edit::before {\n  content: \"\\F0184\";\n}\n\n.mdi-home-edit-outline::before {\n  content: \"\\F0185\";\n}\n\n.mdi-home-export-outline::before {\n  content: \"\\FFB8\";\n}\n\n.mdi-home-flood::before {\n  content: \"\\FF17\";\n}\n\n.mdi-home-floor-0::before {\n  content: \"\\FDAE\";\n}\n\n.mdi-home-floor-1::before {\n  content: \"\\FD5C\";\n}\n\n.mdi-home-floor-2::before {\n  content: \"\\FD5D\";\n}\n\n.mdi-home-floor-3::before {\n  content: \"\\FD5E\";\n}\n\n.mdi-home-floor-a::before {\n  content: \"\\FD5F\";\n}\n\n.mdi-home-floor-b::before {\n  content: \"\\FD60\";\n}\n\n.mdi-home-floor-g::before {\n  content: \"\\FD61\";\n}\n\n.mdi-home-floor-l::before {\n  content: \"\\FD62\";\n}\n\n.mdi-home-floor-negative-1::before {\n  content: \"\\FDAF\";\n}\n\n.mdi-home-group::before {\n  content: \"\\FDB0\";\n}\n\n.mdi-home-heart::before {\n  content: \"\\F826\";\n}\n\n.mdi-home-import-outline::before {\n  content: \"\\FFB9\";\n}\n\n.mdi-home-lock::before {\n  content: \"\\F8EA\";\n}\n\n.mdi-home-lock-open::before {\n  content: \"\\F8EB\";\n}\n\n.mdi-home-map-marker::before {\n  content: \"\\F5F8\";\n}\n\n.mdi-home-minus::before {\n  content: \"\\F973\";\n}\n\n.mdi-home-modern::before {\n  content: \"\\F2DD\";\n}\n\n.mdi-home-outline::before {\n  content: \"\\F6A0\";\n}\n\n.mdi-home-plus::before {\n  content: \"\\F974\";\n}\n\n.mdi-home-roof::before {\n  content: \"\\F0156\";\n}\n\n.mdi-home-thermometer::before {\n  content: \"\\FF71\";\n}\n\n.mdi-home-thermometer-outline::before {\n  content: \"\\FF72\";\n}\n\n.mdi-home-variant::before {\n  content: \"\\F2DE\";\n}\n\n.mdi-home-variant-outline::before {\n  content: \"\\FB83\";\n}\n\n.mdi-hook::before {\n  content: \"\\F6E1\";\n}\n\n.mdi-hook-off::before {\n  content: \"\\F6E2\";\n}\n\n.mdi-hops::before {\n  content: \"\\F2DF\";\n}\n\n.mdi-horizontal-rotate-clockwise::before {\n  content: \"\\F011E\";\n}\n\n.mdi-horizontal-rotate-counterclockwise::before {\n  content: \"\\F011F\";\n}\n\n.mdi-horseshoe::before {\n  content: \"\\FA57\";\n}\n\n.mdi-hospital::before {\n  content: \"\\F0017\";\n}\n\n.mdi-hospital-box::before {\n  content: \"\\F2E0\";\n}\n\n.mdi-hospital-box-outline::before {\n  content: \"\\F0018\";\n}\n\n.mdi-hospital-building::before {\n  content: \"\\F2E1\";\n}\n\n.mdi-hospital-marker::before {\n  content: \"\\F2E2\";\n}\n\n.mdi-hot-tub::before {\n  content: \"\\F827\";\n}\n\n.mdi-hotel::before {\n  content: \"\\F2E3\";\n}\n\n.mdi-houzz::before {\n  content: \"\\F2E4\";\n}\n\n.mdi-houzz-box::before {\n  content: \"\\F2E5\";\n}\n\n.mdi-hubspot::before {\n  content: \"\\FCF3\";\n}\n\n.mdi-hulu::before {\n  content: \"\\F828\";\n}\n\n.mdi-human::before {\n  content: \"\\F2E6\";\n}\n\n.mdi-human-child::before {\n  content: \"\\F2E7\";\n}\n\n.mdi-human-female::before {\n  content: \"\\F649\";\n}\n\n.mdi-human-female-boy::before {\n  content: \"\\FA58\";\n}\n\n.mdi-human-female-female::before {\n  content: \"\\FA59\";\n}\n\n.mdi-human-female-girl::before {\n  content: \"\\FA5A\";\n}\n\n.mdi-human-greeting::before {\n  content: \"\\F64A\";\n}\n\n.mdi-human-handsdown::before {\n  content: \"\\F64B\";\n}\n\n.mdi-human-handsup::before {\n  content: \"\\F64C\";\n}\n\n.mdi-human-male::before {\n  content: \"\\F64D\";\n}\n\n.mdi-human-male-boy::before {\n  content: \"\\FA5B\";\n}\n\n.mdi-human-male-female::before {\n  content: \"\\F2E8\";\n}\n\n.mdi-human-male-girl::before {\n  content: \"\\FA5C\";\n}\n\n.mdi-human-male-height::before {\n  content: \"\\FF18\";\n}\n\n.mdi-human-male-height-variant::before {\n  content: \"\\FF19\";\n}\n\n.mdi-human-male-male::before {\n  content: \"\\FA5D\";\n}\n\n.mdi-human-pregnant::before {\n  content: \"\\F5CF\";\n}\n\n.mdi-humble-bundle::before {\n  content: \"\\F743\";\n}\n\n.mdi-ice-cream::before {\n  content: \"\\F829\";\n}\n\n.mdi-ice-pop::before {\n  content: \"\\FF1A\";\n}\n\n.mdi-id-card::before {\n  content: \"\\FFE0\";\n}\n\n.mdi-identifier::before {\n  content: \"\\FF1B\";\n}\n\n.mdi-iframe::before {\n  content: \"\\FC67\";\n}\n\n.mdi-iframe-array::before {\n  content: \"\\F0120\";\n}\n\n.mdi-iframe-array-outline::before {\n  content: \"\\F0121\";\n}\n\n.mdi-iframe-braces::before {\n  content: \"\\F0122\";\n}\n\n.mdi-iframe-braces-outline::before {\n  content: \"\\F0123\";\n}\n\n.mdi-iframe-outline::before {\n  content: \"\\FC68\";\n}\n\n.mdi-iframe-parentheses::before {\n  content: \"\\F0124\";\n}\n\n.mdi-iframe-parentheses-outline::before {\n  content: \"\\F0125\";\n}\n\n.mdi-iframe-variable::before {\n  content: \"\\F0126\";\n}\n\n.mdi-iframe-variable-outline::before {\n  content: \"\\F0127\";\n}\n\n.mdi-image::before {\n  content: \"\\F2E9\";\n}\n\n.mdi-image-album::before {\n  content: \"\\F2EA\";\n}\n\n.mdi-image-area::before {\n  content: \"\\F2EB\";\n}\n\n.mdi-image-area-close::before {\n  content: \"\\F2EC\";\n}\n\n.mdi-image-auto-adjust::before {\n  content: \"\\FFE1\";\n}\n\n.mdi-image-broken::before {\n  content: \"\\F2ED\";\n}\n\n.mdi-image-broken-variant::before {\n  content: \"\\F2EE\";\n}\n\n.mdi-image-filter::before {\n  content: \"\\F2EF\";\n}\n\n.mdi-image-filter-black-white::before {\n  content: \"\\F2F0\";\n}\n\n.mdi-image-filter-center-focus::before {\n  content: \"\\F2F1\";\n}\n\n.mdi-image-filter-center-focus-strong::before {\n  content: \"\\FF1C\";\n}\n\n.mdi-image-filter-center-focus-strong-outline::before {\n  content: \"\\FF1D\";\n}\n\n.mdi-image-filter-center-focus-weak::before {\n  content: \"\\F2F2\";\n}\n\n.mdi-image-filter-drama::before {\n  content: \"\\F2F3\";\n}\n\n.mdi-image-filter-frames::before {\n  content: \"\\F2F4\";\n}\n\n.mdi-image-filter-hdr::before {\n  content: \"\\F2F5\";\n}\n\n.mdi-image-filter-none::before {\n  content: \"\\F2F6\";\n}\n\n.mdi-image-filter-tilt-shift::before {\n  content: \"\\F2F7\";\n}\n\n.mdi-image-filter-vintage::before {\n  content: \"\\F2F8\";\n}\n\n.mdi-image-frame::before {\n  content: \"\\FE8A\";\n}\n\n.mdi-image-move::before {\n  content: \"\\F9F7\";\n}\n\n.mdi-image-multiple::before {\n  content: \"\\F2F9\";\n}\n\n.mdi-image-off::before {\n  content: \"\\F82A\";\n}\n\n.mdi-image-outline::before {\n  content: \"\\F975\";\n}\n\n.mdi-image-plus::before {\n  content: \"\\F87B\";\n}\n\n.mdi-image-search::before {\n  content: \"\\F976\";\n}\n\n.mdi-image-search-outline::before {\n  content: \"\\F977\";\n}\n\n.mdi-image-size-select-actual::before {\n  content: \"\\FC69\";\n}\n\n.mdi-image-size-select-large::before {\n  content: \"\\FC6A\";\n}\n\n.mdi-image-size-select-small::before {\n  content: \"\\FC6B\";\n}\n\n.mdi-import::before {\n  content: \"\\F2FA\";\n}\n\n.mdi-inbox::before {\n  content: \"\\F686\";\n}\n\n.mdi-inbox-arrow-down::before {\n  content: \"\\F2FB\";\n}\n\n.mdi-inbox-arrow-up::before {\n  content: \"\\F3D1\";\n}\n\n.mdi-inbox-multiple::before {\n  content: \"\\F8AF\";\n}\n\n.mdi-inbox-multiple-outline::before {\n  content: \"\\FB84\";\n}\n\n.mdi-incognito::before {\n  content: \"\\F5F9\";\n}\n\n.mdi-infinity::before {\n  content: \"\\F6E3\";\n}\n\n.mdi-information::before {\n  content: \"\\F2FC\";\n}\n\n.mdi-information-outline::before {\n  content: \"\\F2FD\";\n}\n\n.mdi-information-variant::before {\n  content: \"\\F64E\";\n}\n\n.mdi-instagram::before {\n  content: \"\\F2FE\";\n}\n\n.mdi-instapaper::before {\n  content: \"\\F2FF\";\n}\n\n.mdi-instrument-triangle::before {\n  content: \"\\F0070\";\n}\n\n.mdi-internet-explorer::before {\n  content: \"\\F300\";\n}\n\n.mdi-invert-colors::before {\n  content: \"\\F301\";\n}\n\n.mdi-invert-colors-off::before {\n  content: \"\\FE8B\";\n}\n\n.mdi-ip::before {\n  content: \"\\FA5E\";\n}\n\n.mdi-ip-network::before {\n  content: \"\\FA5F\";\n}\n\n.mdi-ip-network-outline::before {\n  content: \"\\FC6C\";\n}\n\n.mdi-ipod::before {\n  content: \"\\FC6D\";\n}\n\n.mdi-islam::before {\n  content: \"\\F978\";\n}\n\n.mdi-island::before {\n  content: \"\\F0071\";\n}\n\n.mdi-itunes::before {\n  content: \"\\F676\";\n}\n\n.mdi-iv-bag::before {\n  content: \"\\F00E4\";\n}\n\n.mdi-jabber::before {\n  content: \"\\FDB1\";\n}\n\n.mdi-jeepney::before {\n  content: \"\\F302\";\n}\n\n.mdi-jellyfish::before {\n  content: \"\\FF1E\";\n}\n\n.mdi-jellyfish-outline::before {\n  content: \"\\FF1F\";\n}\n\n.mdi-jira::before {\n  content: \"\\F303\";\n}\n\n.mdi-jquery::before {\n  content: \"\\F87C\";\n}\n\n.mdi-jsfiddle::before {\n  content: \"\\F304\";\n}\n\n.mdi-json::before {\n  content: \"\\F626\";\n}\n\n.mdi-judaism::before {\n  content: \"\\F979\";\n}\n\n.mdi-kabaddi::before {\n  content: \"\\FD63\";\n}\n\n.mdi-karate::before {\n  content: \"\\F82B\";\n}\n\n.mdi-keg::before {\n  content: \"\\F305\";\n}\n\n.mdi-kettle::before {\n  content: \"\\F5FA\";\n}\n\n.mdi-kettle-outline::before {\n  content: \"\\FF73\";\n}\n\n.mdi-key::before {\n  content: \"\\F306\";\n}\n\n.mdi-key-change::before {\n  content: \"\\F307\";\n}\n\n.mdi-key-link::before {\n  content: \"\\F01CA\";\n}\n\n.mdi-key-minus::before {\n  content: \"\\F308\";\n}\n\n.mdi-key-outline::before {\n  content: \"\\FDB2\";\n}\n\n.mdi-key-plus::before {\n  content: \"\\F309\";\n}\n\n.mdi-key-remove::before {\n  content: \"\\F30A\";\n}\n\n.mdi-key-star::before {\n  content: \"\\F01C9\";\n}\n\n.mdi-key-variant::before {\n  content: \"\\F30B\";\n}\n\n.mdi-key-wireless::before {\n  content: \"\\FFE2\";\n}\n\n.mdi-keyboard::before {\n  content: \"\\F30C\";\n}\n\n.mdi-keyboard-backspace::before {\n  content: \"\\F30D\";\n}\n\n.mdi-keyboard-caps::before {\n  content: \"\\F30E\";\n}\n\n.mdi-keyboard-close::before {\n  content: \"\\F30F\";\n}\n\n.mdi-keyboard-off::before {\n  content: \"\\F310\";\n}\n\n.mdi-keyboard-off-outline::before {\n  content: \"\\FE8C\";\n}\n\n.mdi-keyboard-outline::before {\n  content: \"\\F97A\";\n}\n\n.mdi-keyboard-return::before {\n  content: \"\\F311\";\n}\n\n.mdi-keyboard-settings::before {\n  content: \"\\F9F8\";\n}\n\n.mdi-keyboard-settings-outline::before {\n  content: \"\\F9F9\";\n}\n\n.mdi-keyboard-space::before {\n  content: \"\\F0072\";\n}\n\n.mdi-keyboard-tab::before {\n  content: \"\\F312\";\n}\n\n.mdi-keyboard-variant::before {\n  content: \"\\F313\";\n}\n\n.mdi-khanda::before {\n  content: \"\\F0128\";\n}\n\n.mdi-kickstarter::before {\n  content: \"\\F744\";\n}\n\n.mdi-knife::before {\n  content: \"\\F9FA\";\n}\n\n.mdi-knife-military::before {\n  content: \"\\F9FB\";\n}\n\n.mdi-kodi::before {\n  content: \"\\F314\";\n}\n\n.mdi-kubernetes::before {\n  content: \"\\F0129\";\n}\n\n.mdi-label::before {\n  content: \"\\F315\";\n}\n\n.mdi-label-off::before {\n  content: \"\\FACA\";\n}\n\n.mdi-label-off-outline::before {\n  content: \"\\FACB\";\n}\n\n.mdi-label-outline::before {\n  content: \"\\F316\";\n}\n\n.mdi-label-variant::before {\n  content: \"\\FACC\";\n}\n\n.mdi-label-variant-outline::before {\n  content: \"\\FACD\";\n}\n\n.mdi-ladybug::before {\n  content: \"\\F82C\";\n}\n\n.mdi-lambda::before {\n  content: \"\\F627\";\n}\n\n.mdi-lamp::before {\n  content: \"\\F6B4\";\n}\n\n.mdi-lan::before {\n  content: \"\\F317\";\n}\n\n.mdi-lan-connect::before {\n  content: \"\\F318\";\n}\n\n.mdi-lan-disconnect::before {\n  content: \"\\F319\";\n}\n\n.mdi-lan-pending::before {\n  content: \"\\F31A\";\n}\n\n.mdi-language-c::before {\n  content: \"\\F671\";\n}\n\n.mdi-language-cpp::before {\n  content: \"\\F672\";\n}\n\n.mdi-language-csharp::before {\n  content: \"\\F31B\";\n}\n\n.mdi-language-css3::before {\n  content: \"\\F31C\";\n}\n\n.mdi-language-go::before {\n  content: \"\\F7D2\";\n}\n\n.mdi-language-haskell::before {\n  content: \"\\FC6E\";\n}\n\n.mdi-language-html5::before {\n  content: \"\\F31D\";\n}\n\n.mdi-language-java::before {\n  content: \"\\FB1C\";\n}\n\n.mdi-language-javascript::before {\n  content: \"\\F31E\";\n}\n\n.mdi-language-lua::before {\n  content: \"\\F8B0\";\n}\n\n.mdi-language-php::before {\n  content: \"\\F31F\";\n}\n\n.mdi-language-python::before {\n  content: \"\\F320\";\n}\n\n.mdi-language-python-text::before {\n  content: \"\\F321\";\n}\n\n.mdi-language-r::before {\n  content: \"\\F7D3\";\n}\n\n.mdi-language-ruby-on-rails::before {\n  content: \"\\FACE\";\n}\n\n.mdi-language-swift::before {\n  content: \"\\F6E4\";\n}\n\n.mdi-language-typescript::before {\n  content: \"\\F6E5\";\n}\n\n.mdi-laptop::before {\n  content: \"\\F322\";\n}\n\n.mdi-laptop-chromebook::before {\n  content: \"\\F323\";\n}\n\n.mdi-laptop-mac::before {\n  content: \"\\F324\";\n}\n\n.mdi-laptop-off::before {\n  content: \"\\F6E6\";\n}\n\n.mdi-laptop-windows::before {\n  content: \"\\F325\";\n}\n\n.mdi-laravel::before {\n  content: \"\\FACF\";\n}\n\n.mdi-lasso::before {\n  content: \"\\FF20\";\n}\n\n.mdi-lastfm::before {\n  content: \"\\F326\";\n}\n\n.mdi-lastpass::before {\n  content: \"\\F446\";\n}\n\n.mdi-latitude::before {\n  content: \"\\FF74\";\n}\n\n.mdi-launch::before {\n  content: \"\\F327\";\n}\n\n.mdi-lava-lamp::before {\n  content: \"\\F7D4\";\n}\n\n.mdi-layers::before {\n  content: \"\\F328\";\n}\n\n.mdi-layers-minus::before {\n  content: \"\\FE8D\";\n}\n\n.mdi-layers-off::before {\n  content: \"\\F329\";\n}\n\n.mdi-layers-off-outline::before {\n  content: \"\\F9FC\";\n}\n\n.mdi-layers-outline::before {\n  content: \"\\F9FD\";\n}\n\n.mdi-layers-plus::before {\n  content: \"\\FE30\";\n}\n\n.mdi-layers-remove::before {\n  content: \"\\FE31\";\n}\n\n.mdi-layers-triple::before {\n  content: \"\\FF75\";\n}\n\n.mdi-layers-triple-outline::before {\n  content: \"\\FF76\";\n}\n\n.mdi-lead-pencil::before {\n  content: \"\\F64F\";\n}\n\n.mdi-leaf::before {\n  content: \"\\F32A\";\n}\n\n.mdi-leaf-maple::before {\n  content: \"\\FC6F\";\n}\n\n.mdi-leak::before {\n  content: \"\\FDB3\";\n}\n\n.mdi-leak-off::before {\n  content: \"\\FDB4\";\n}\n\n.mdi-led-off::before {\n  content: \"\\F32B\";\n}\n\n.mdi-led-on::before {\n  content: \"\\F32C\";\n}\n\n.mdi-led-outline::before {\n  content: \"\\F32D\";\n}\n\n.mdi-led-strip::before {\n  content: \"\\F7D5\";\n}\n\n.mdi-led-strip-variant::before {\n  content: \"\\F0073\";\n}\n\n.mdi-led-variant-off::before {\n  content: \"\\F32E\";\n}\n\n.mdi-led-variant-on::before {\n  content: \"\\F32F\";\n}\n\n.mdi-led-variant-outline::before {\n  content: \"\\F330\";\n}\n\n.mdi-leek::before {\n  content: \"\\F01A8\";\n}\n\n.mdi-less-than::before {\n  content: \"\\F97B\";\n}\n\n.mdi-less-than-or-equal::before {\n  content: \"\\F97C\";\n}\n\n.mdi-library::before {\n  content: \"\\F331\";\n}\n\n.mdi-library-books::before {\n  content: \"\\F332\";\n}\n\n.mdi-library-movie::before {\n  content: \"\\FCF4\";\n}\n\n.mdi-library-music::before {\n  content: \"\\F333\";\n}\n\n.mdi-library-music-outline::before {\n  content: \"\\FF21\";\n}\n\n.mdi-library-shelves::before {\n  content: \"\\FB85\";\n}\n\n.mdi-library-video::before {\n  content: \"\\FCF5\";\n}\n\n.mdi-license::before {\n  content: \"\\FFE3\";\n}\n\n.mdi-lifebuoy::before {\n  content: \"\\F87D\";\n}\n\n.mdi-light-switch::before {\n  content: \"\\F97D\";\n}\n\n.mdi-lightbulb::before {\n  content: \"\\F335\";\n}\n\n.mdi-lightbulb-off::before {\n  content: \"\\FE32\";\n}\n\n.mdi-lightbulb-off-outline::before {\n  content: \"\\FE33\";\n}\n\n.mdi-lightbulb-on::before {\n  content: \"\\F6E7\";\n}\n\n.mdi-lightbulb-on-outline::before {\n  content: \"\\F6E8\";\n}\n\n.mdi-lightbulb-outline::before {\n  content: \"\\F336\";\n}\n\n.mdi-lighthouse::before {\n  content: \"\\F9FE\";\n}\n\n.mdi-lighthouse-on::before {\n  content: \"\\F9FF\";\n}\n\n.mdi-link::before {\n  content: \"\\F337\";\n}\n\n.mdi-link-box::before {\n  content: \"\\FCF6\";\n}\n\n.mdi-link-box-outline::before {\n  content: \"\\FCF7\";\n}\n\n.mdi-link-box-variant::before {\n  content: \"\\FCF8\";\n}\n\n.mdi-link-box-variant-outline::before {\n  content: \"\\FCF9\";\n}\n\n.mdi-link-lock::before {\n  content: \"\\F00E5\";\n}\n\n.mdi-link-off::before {\n  content: \"\\F338\";\n}\n\n.mdi-link-plus::before {\n  content: \"\\FC70\";\n}\n\n.mdi-link-variant::before {\n  content: \"\\F339\";\n}\n\n.mdi-link-variant-minus::before {\n  content: \"\\F012A\";\n}\n\n.mdi-link-variant-off::before {\n  content: \"\\F33A\";\n}\n\n.mdi-link-variant-plus::before {\n  content: \"\\F012B\";\n}\n\n.mdi-link-variant-remove::before {\n  content: \"\\F012C\";\n}\n\n.mdi-linkedin::before {\n  content: \"\\F33B\";\n}\n\n.mdi-linkedin-box::before {\n  content: \"\\F33C\";\n}\n\n.mdi-linux::before {\n  content: \"\\F33D\";\n}\n\n.mdi-linux-mint::before {\n  content: \"\\F8EC\";\n}\n\n.mdi-litecoin::before {\n  content: \"\\FA60\";\n}\n\n.mdi-loading::before {\n  content: \"\\F771\";\n}\n\n.mdi-location-enter::before {\n  content: \"\\FFE4\";\n}\n\n.mdi-location-exit::before {\n  content: \"\\FFE5\";\n}\n\n.mdi-lock::before {\n  content: \"\\F33E\";\n}\n\n.mdi-lock-alert::before {\n  content: \"\\F8ED\";\n}\n\n.mdi-lock-clock::before {\n  content: \"\\F97E\";\n}\n\n.mdi-lock-open::before {\n  content: \"\\F33F\";\n}\n\n.mdi-lock-open-outline::before {\n  content: \"\\F340\";\n}\n\n.mdi-lock-open-variant::before {\n  content: \"\\FFE6\";\n}\n\n.mdi-lock-open-variant-outline::before {\n  content: \"\\FFE7\";\n}\n\n.mdi-lock-outline::before {\n  content: \"\\F341\";\n}\n\n.mdi-lock-pattern::before {\n  content: \"\\F6E9\";\n}\n\n.mdi-lock-plus::before {\n  content: \"\\F5FB\";\n}\n\n.mdi-lock-question::before {\n  content: \"\\F8EE\";\n}\n\n.mdi-lock-reset::before {\n  content: \"\\F772\";\n}\n\n.mdi-lock-smart::before {\n  content: \"\\F8B1\";\n}\n\n.mdi-locker::before {\n  content: \"\\F7D6\";\n}\n\n.mdi-locker-multiple::before {\n  content: \"\\F7D7\";\n}\n\n.mdi-login::before {\n  content: \"\\F342\";\n}\n\n.mdi-login-variant::before {\n  content: \"\\F5FC\";\n}\n\n.mdi-logout::before {\n  content: \"\\F343\";\n}\n\n.mdi-logout-variant::before {\n  content: \"\\F5FD\";\n}\n\n.mdi-longitude::before {\n  content: \"\\FF77\";\n}\n\n.mdi-looks::before {\n  content: \"\\F344\";\n}\n\n.mdi-loupe::before {\n  content: \"\\F345\";\n}\n\n.mdi-lumx::before {\n  content: \"\\F346\";\n}\n\n.mdi-lungs::before {\n  content: \"\\F00AF\";\n}\n\n.mdi-lyft::before {\n  content: \"\\FB1D\";\n}\n\n.mdi-magnet::before {\n  content: \"\\F347\";\n}\n\n.mdi-magnet-on::before {\n  content: \"\\F348\";\n}\n\n.mdi-magnify::before {\n  content: \"\\F349\";\n}\n\n.mdi-magnify-close::before {\n  content: \"\\F97F\";\n}\n\n.mdi-magnify-minus::before {\n  content: \"\\F34A\";\n}\n\n.mdi-magnify-minus-cursor::before {\n  content: \"\\FA61\";\n}\n\n.mdi-magnify-minus-outline::before {\n  content: \"\\F6EB\";\n}\n\n.mdi-magnify-plus::before {\n  content: \"\\F34B\";\n}\n\n.mdi-magnify-plus-cursor::before {\n  content: \"\\FA62\";\n}\n\n.mdi-magnify-plus-outline::before {\n  content: \"\\F6EC\";\n}\n\n.mdi-mail::before {\n  content: \"\\FED8\";\n}\n\n.mdi-mail-ru::before {\n  content: \"\\F34C\";\n}\n\n.mdi-mailbox::before {\n  content: \"\\F6ED\";\n}\n\n.mdi-mailbox-open::before {\n  content: \"\\FD64\";\n}\n\n.mdi-mailbox-open-outline::before {\n  content: \"\\FD65\";\n}\n\n.mdi-mailbox-open-up::before {\n  content: \"\\FD66\";\n}\n\n.mdi-mailbox-open-up-outline::before {\n  content: \"\\FD67\";\n}\n\n.mdi-mailbox-outline::before {\n  content: \"\\FD68\";\n}\n\n.mdi-mailbox-up::before {\n  content: \"\\FD69\";\n}\n\n.mdi-mailbox-up-outline::before {\n  content: \"\\FD6A\";\n}\n\n.mdi-map::before {\n  content: \"\\F34D\";\n}\n\n.mdi-map-check::before {\n  content: \"\\FED9\";\n}\n\n.mdi-map-check-outline::before {\n  content: \"\\FEDA\";\n}\n\n.mdi-map-clock::before {\n  content: \"\\FCFA\";\n}\n\n.mdi-map-clock-outline::before {\n  content: \"\\FCFB\";\n}\n\n.mdi-map-legend::before {\n  content: \"\\FA00\";\n}\n\n.mdi-map-marker::before {\n  content: \"\\F34E\";\n}\n\n.mdi-map-marker-alert::before {\n  content: \"\\FF22\";\n}\n\n.mdi-map-marker-alert-outline::before {\n  content: \"\\FF23\";\n}\n\n.mdi-map-marker-check::before {\n  content: \"\\FC71\";\n}\n\n.mdi-map-marker-circle::before {\n  content: \"\\F34F\";\n}\n\n.mdi-map-marker-distance::before {\n  content: \"\\F8EF\";\n}\n\n.mdi-map-marker-down::before {\n  content: \"\\F012D\";\n}\n\n.mdi-map-marker-minus::before {\n  content: \"\\F650\";\n}\n\n.mdi-map-marker-multiple::before {\n  content: \"\\F350\";\n}\n\n.mdi-map-marker-off::before {\n  content: \"\\F351\";\n}\n\n.mdi-map-marker-outline::before {\n  content: \"\\F7D8\";\n}\n\n.mdi-map-marker-path::before {\n  content: \"\\FCFC\";\n}\n\n.mdi-map-marker-plus::before {\n  content: \"\\F651\";\n}\n\n.mdi-map-marker-question::before {\n  content: \"\\FF24\";\n}\n\n.mdi-map-marker-question-outline::before {\n  content: \"\\FF25\";\n}\n\n.mdi-map-marker-radius::before {\n  content: \"\\F352\";\n}\n\n.mdi-map-marker-remove::before {\n  content: \"\\FF26\";\n}\n\n.mdi-map-marker-remove-variant::before {\n  content: \"\\FF27\";\n}\n\n.mdi-map-marker-up::before {\n  content: \"\\F012E\";\n}\n\n.mdi-map-minus::before {\n  content: \"\\F980\";\n}\n\n.mdi-map-outline::before {\n  content: \"\\F981\";\n}\n\n.mdi-map-plus::before {\n  content: \"\\F982\";\n}\n\n.mdi-map-search::before {\n  content: \"\\F983\";\n}\n\n.mdi-map-search-outline::before {\n  content: \"\\F984\";\n}\n\n.mdi-mapbox::before {\n  content: \"\\FB86\";\n}\n\n.mdi-margin::before {\n  content: \"\\F353\";\n}\n\n.mdi-markdown::before {\n  content: \"\\F354\";\n}\n\n.mdi-markdown-outline::before {\n  content: \"\\FF78\";\n}\n\n.mdi-marker::before {\n  content: \"\\F652\";\n}\n\n.mdi-marker-cancel::before {\n  content: \"\\FDB5\";\n}\n\n.mdi-marker-check::before {\n  content: \"\\F355\";\n}\n\n.mdi-mastodon::before {\n  content: \"\\FAD0\";\n}\n\n.mdi-mastodon-variant::before {\n  content: \"\\FAD1\";\n}\n\n.mdi-material-design::before {\n  content: \"\\F985\";\n}\n\n.mdi-material-ui::before {\n  content: \"\\F357\";\n}\n\n.mdi-math-compass::before {\n  content: \"\\F358\";\n}\n\n.mdi-math-cos::before {\n  content: \"\\FC72\";\n}\n\n.mdi-math-integral::before {\n  content: \"\\FFE8\";\n}\n\n.mdi-math-integral-box::before {\n  content: \"\\FFE9\";\n}\n\n.mdi-math-log::before {\n  content: \"\\F00B0\";\n}\n\n.mdi-math-norm::before {\n  content: \"\\FFEA\";\n}\n\n.mdi-math-norm-box::before {\n  content: \"\\FFEB\";\n}\n\n.mdi-math-sin::before {\n  content: \"\\FC73\";\n}\n\n.mdi-math-tan::before {\n  content: \"\\FC74\";\n}\n\n.mdi-matrix::before {\n  content: \"\\F628\";\n}\n\n.mdi-maxcdn::before {\n  content: \"\\F359\";\n}\n\n.mdi-medal::before {\n  content: \"\\F986\";\n}\n\n.mdi-medical-bag::before {\n  content: \"\\F6EE\";\n}\n\n.mdi-meditation::before {\n  content: \"\\F01A6\";\n}\n\n.mdi-medium::before {\n  content: \"\\F35A\";\n}\n\n.mdi-meetup::before {\n  content: \"\\FAD2\";\n}\n\n.mdi-memory::before {\n  content: \"\\F35B\";\n}\n\n.mdi-menu::before {\n  content: \"\\F35C\";\n}\n\n.mdi-menu-down::before {\n  content: \"\\F35D\";\n}\n\n.mdi-menu-down-outline::before {\n  content: \"\\F6B5\";\n}\n\n.mdi-menu-left::before {\n  content: \"\\F35E\";\n}\n\n.mdi-menu-left-outline::before {\n  content: \"\\FA01\";\n}\n\n.mdi-menu-open::before {\n  content: \"\\FB87\";\n}\n\n.mdi-menu-right::before {\n  content: \"\\F35F\";\n}\n\n.mdi-menu-right-outline::before {\n  content: \"\\FA02\";\n}\n\n.mdi-menu-swap::before {\n  content: \"\\FA63\";\n}\n\n.mdi-menu-swap-outline::before {\n  content: \"\\FA64\";\n}\n\n.mdi-menu-up::before {\n  content: \"\\F360\";\n}\n\n.mdi-menu-up-outline::before {\n  content: \"\\F6B6\";\n}\n\n.mdi-merge::before {\n  content: \"\\FF79\";\n}\n\n.mdi-message::before {\n  content: \"\\F361\";\n}\n\n.mdi-message-alert::before {\n  content: \"\\F362\";\n}\n\n.mdi-message-alert-outline::before {\n  content: \"\\FA03\";\n}\n\n.mdi-message-bulleted::before {\n  content: \"\\F6A1\";\n}\n\n.mdi-message-bulleted-off::before {\n  content: \"\\F6A2\";\n}\n\n.mdi-message-draw::before {\n  content: \"\\F363\";\n}\n\n.mdi-message-image::before {\n  content: \"\\F364\";\n}\n\n.mdi-message-image-outline::before {\n  content: \"\\F0197\";\n}\n\n.mdi-message-lock::before {\n  content: \"\\FFEC\";\n}\n\n.mdi-message-lock-outline::before {\n  content: \"\\F0198\";\n}\n\n.mdi-message-minus::before {\n  content: \"\\F0199\";\n}\n\n.mdi-message-minus-outline::before {\n  content: \"\\F019A\";\n}\n\n.mdi-message-outline::before {\n  content: \"\\F365\";\n}\n\n.mdi-message-plus::before {\n  content: \"\\F653\";\n}\n\n.mdi-message-plus-outline::before {\n  content: \"\\F00E6\";\n}\n\n.mdi-message-processing::before {\n  content: \"\\F366\";\n}\n\n.mdi-message-processing-outline::before {\n  content: \"\\F019B\";\n}\n\n.mdi-message-reply::before {\n  content: \"\\F367\";\n}\n\n.mdi-message-reply-text::before {\n  content: \"\\F368\";\n}\n\n.mdi-message-settings::before {\n  content: \"\\F6EF\";\n}\n\n.mdi-message-settings-outline::before {\n  content: \"\\F019C\";\n}\n\n.mdi-message-settings-variant::before {\n  content: \"\\F6F0\";\n}\n\n.mdi-message-settings-variant-outline::before {\n  content: \"\\F019D\";\n}\n\n.mdi-message-text::before {\n  content: \"\\F369\";\n}\n\n.mdi-message-text-clock::before {\n  content: \"\\F019E\";\n}\n\n.mdi-message-text-clock-outline::before {\n  content: \"\\F019F\";\n}\n\n.mdi-message-text-lock::before {\n  content: \"\\FFED\";\n}\n\n.mdi-message-text-lock-outline::before {\n  content: \"\\F01A0\";\n}\n\n.mdi-message-text-outline::before {\n  content: \"\\F36A\";\n}\n\n.mdi-message-video::before {\n  content: \"\\F36B\";\n}\n\n.mdi-meteor::before {\n  content: \"\\F629\";\n}\n\n.mdi-metronome::before {\n  content: \"\\F7D9\";\n}\n\n.mdi-metronome-tick::before {\n  content: \"\\F7DA\";\n}\n\n.mdi-micro-sd::before {\n  content: \"\\F7DB\";\n}\n\n.mdi-microphone::before {\n  content: \"\\F36C\";\n}\n\n.mdi-microphone-minus::before {\n  content: \"\\F8B2\";\n}\n\n.mdi-microphone-off::before {\n  content: \"\\F36D\";\n}\n\n.mdi-microphone-outline::before {\n  content: \"\\F36E\";\n}\n\n.mdi-microphone-plus::before {\n  content: \"\\F8B3\";\n}\n\n.mdi-microphone-settings::before {\n  content: \"\\F36F\";\n}\n\n.mdi-microphone-variant::before {\n  content: \"\\F370\";\n}\n\n.mdi-microphone-variant-off::before {\n  content: \"\\F371\";\n}\n\n.mdi-microscope::before {\n  content: \"\\F654\";\n}\n\n.mdi-microsoft::before {\n  content: \"\\F372\";\n}\n\n.mdi-microsoft-dynamics::before {\n  content: \"\\F987\";\n}\n\n.mdi-microwave::before {\n  content: \"\\FC75\";\n}\n\n.mdi-middleware::before {\n  content: \"\\FF7A\";\n}\n\n.mdi-middleware-outline::before {\n  content: \"\\FF7B\";\n}\n\n.mdi-midi::before {\n  content: \"\\F8F0\";\n}\n\n.mdi-midi-port::before {\n  content: \"\\F8F1\";\n}\n\n.mdi-mine::before {\n  content: \"\\FDB6\";\n}\n\n.mdi-minecraft::before {\n  content: \"\\F373\";\n}\n\n.mdi-mini-sd::before {\n  content: \"\\FA04\";\n}\n\n.mdi-minidisc::before {\n  content: \"\\FA05\";\n}\n\n.mdi-minus::before {\n  content: \"\\F374\";\n}\n\n.mdi-minus-box::before {\n  content: \"\\F375\";\n}\n\n.mdi-minus-box-multiple::before {\n  content: \"\\F016C\";\n}\n\n.mdi-minus-box-multiple-outline::before {\n  content: \"\\F016D\";\n}\n\n.mdi-minus-box-outline::before {\n  content: \"\\F6F1\";\n}\n\n.mdi-minus-circle::before {\n  content: \"\\F376\";\n}\n\n.mdi-minus-circle-outline::before {\n  content: \"\\F377\";\n}\n\n.mdi-minus-network::before {\n  content: \"\\F378\";\n}\n\n.mdi-minus-network-outline::before {\n  content: \"\\FC76\";\n}\n\n.mdi-mixcloud::before {\n  content: \"\\F62A\";\n}\n\n.mdi-mixed-martial-arts::before {\n  content: \"\\FD6B\";\n}\n\n.mdi-mixed-reality::before {\n  content: \"\\F87E\";\n}\n\n.mdi-mixer::before {\n  content: \"\\F7DC\";\n}\n\n.mdi-molecule::before {\n  content: \"\\FB88\";\n}\n\n.mdi-monitor::before {\n  content: \"\\F379\";\n}\n\n.mdi-monitor-cellphone::before {\n  content: \"\\F988\";\n}\n\n.mdi-monitor-cellphone-star::before {\n  content: \"\\F989\";\n}\n\n.mdi-monitor-clean::before {\n  content: \"\\F012F\";\n}\n\n.mdi-monitor-dashboard::before {\n  content: \"\\FA06\";\n}\n\n.mdi-monitor-lock::before {\n  content: \"\\FDB7\";\n}\n\n.mdi-monitor-multiple::before {\n  content: \"\\F37A\";\n}\n\n.mdi-monitor-off::before {\n  content: \"\\FD6C\";\n}\n\n.mdi-monitor-screenshot::before {\n  content: \"\\FE34\";\n}\n\n.mdi-monitor-speaker::before {\n  content: \"\\FF7C\";\n}\n\n.mdi-monitor-speaker-off::before {\n  content: \"\\FF7D\";\n}\n\n.mdi-monitor-star::before {\n  content: \"\\FDB8\";\n}\n\n.mdi-moon-first-quarter::before {\n  content: \"\\FF7E\";\n}\n\n.mdi-moon-full::before {\n  content: \"\\FF7F\";\n}\n\n.mdi-moon-last-quarter::before {\n  content: \"\\FF80\";\n}\n\n.mdi-moon-new::before {\n  content: \"\\FF81\";\n}\n\n.mdi-moon-waning-crescent::before {\n  content: \"\\FF82\";\n}\n\n.mdi-moon-waning-gibbous::before {\n  content: \"\\FF83\";\n}\n\n.mdi-moon-waxing-crescent::before {\n  content: \"\\FF84\";\n}\n\n.mdi-moon-waxing-gibbous::before {\n  content: \"\\FF85\";\n}\n\n.mdi-moped::before {\n  content: \"\\F00B1\";\n}\n\n.mdi-more::before {\n  content: \"\\F37B\";\n}\n\n.mdi-mother-nurse::before {\n  content: \"\\FCFD\";\n}\n\n.mdi-motion-sensor::before {\n  content: \"\\FD6D\";\n}\n\n.mdi-motorbike::before {\n  content: \"\\F37C\";\n}\n\n.mdi-mouse::before {\n  content: \"\\F37D\";\n}\n\n.mdi-mouse-bluetooth::before {\n  content: \"\\F98A\";\n}\n\n.mdi-mouse-off::before {\n  content: \"\\F37E\";\n}\n\n.mdi-mouse-variant::before {\n  content: \"\\F37F\";\n}\n\n.mdi-mouse-variant-off::before {\n  content: \"\\F380\";\n}\n\n.mdi-move-resize::before {\n  content: \"\\F655\";\n}\n\n.mdi-move-resize-variant::before {\n  content: \"\\F656\";\n}\n\n.mdi-movie::before {\n  content: \"\\F381\";\n}\n\n.mdi-movie-edit::before {\n  content: \"\\F014D\";\n}\n\n.mdi-movie-edit-outline::before {\n  content: \"\\F014E\";\n}\n\n.mdi-movie-filter::before {\n  content: \"\\F014F\";\n}\n\n.mdi-movie-filter-outline::before {\n  content: \"\\F0150\";\n}\n\n.mdi-movie-open::before {\n  content: \"\\FFEE\";\n}\n\n.mdi-movie-open-outline::before {\n  content: \"\\FFEF\";\n}\n\n.mdi-movie-outline::before {\n  content: \"\\FDB9\";\n}\n\n.mdi-movie-roll::before {\n  content: \"\\F7DD\";\n}\n\n.mdi-muffin::before {\n  content: \"\\F98B\";\n}\n\n.mdi-multiplication::before {\n  content: \"\\F382\";\n}\n\n.mdi-multiplication-box::before {\n  content: \"\\F383\";\n}\n\n.mdi-mushroom::before {\n  content: \"\\F7DE\";\n}\n\n.mdi-mushroom-outline::before {\n  content: \"\\F7DF\";\n}\n\n.mdi-music::before {\n  content: \"\\F759\";\n}\n\n.mdi-music-accidental-double-flat::before {\n  content: \"\\FF86\";\n}\n\n.mdi-music-accidental-double-sharp::before {\n  content: \"\\FF87\";\n}\n\n.mdi-music-accidental-flat::before {\n  content: \"\\FF88\";\n}\n\n.mdi-music-accidental-natural::before {\n  content: \"\\FF89\";\n}\n\n.mdi-music-accidental-sharp::before {\n  content: \"\\FF8A\";\n}\n\n.mdi-music-box::before {\n  content: \"\\F384\";\n}\n\n.mdi-music-box-outline::before {\n  content: \"\\F385\";\n}\n\n.mdi-music-circle::before {\n  content: \"\\F386\";\n}\n\n.mdi-music-circle-outline::before {\n  content: \"\\FAD3\";\n}\n\n.mdi-music-clef-alto::before {\n  content: \"\\FF8B\";\n}\n\n.mdi-music-clef-bass::before {\n  content: \"\\FF8C\";\n}\n\n.mdi-music-clef-treble::before {\n  content: \"\\FF8D\";\n}\n\n.mdi-music-note::before {\n  content: \"\\F387\";\n}\n\n.mdi-music-note-bluetooth::before {\n  content: \"\\F5FE\";\n}\n\n.mdi-music-note-bluetooth-off::before {\n  content: \"\\F5FF\";\n}\n\n.mdi-music-note-eighth::before {\n  content: \"\\F388\";\n}\n\n.mdi-music-note-eighth-dotted::before {\n  content: \"\\FF8E\";\n}\n\n.mdi-music-note-half::before {\n  content: \"\\F389\";\n}\n\n.mdi-music-note-half-dotted::before {\n  content: \"\\FF8F\";\n}\n\n.mdi-music-note-off::before {\n  content: \"\\F38A\";\n}\n\n.mdi-music-note-off-outline::before {\n  content: \"\\FF90\";\n}\n\n.mdi-music-note-outline::before {\n  content: \"\\FF91\";\n}\n\n.mdi-music-note-plus::before {\n  content: \"\\FDBA\";\n}\n\n.mdi-music-note-quarter::before {\n  content: \"\\F38B\";\n}\n\n.mdi-music-note-quarter-dotted::before {\n  content: \"\\FF92\";\n}\n\n.mdi-music-note-sixteenth::before {\n  content: \"\\F38C\";\n}\n\n.mdi-music-note-sixteenth-dotted::before {\n  content: \"\\FF93\";\n}\n\n.mdi-music-note-whole::before {\n  content: \"\\F38D\";\n}\n\n.mdi-music-note-whole-dotted::before {\n  content: \"\\FF94\";\n}\n\n.mdi-music-off::before {\n  content: \"\\F75A\";\n}\n\n.mdi-music-rest-eighth::before {\n  content: \"\\FF95\";\n}\n\n.mdi-music-rest-half::before {\n  content: \"\\FF96\";\n}\n\n.mdi-music-rest-quarter::before {\n  content: \"\\FF97\";\n}\n\n.mdi-music-rest-sixteenth::before {\n  content: \"\\FF98\";\n}\n\n.mdi-music-rest-whole::before {\n  content: \"\\FF99\";\n}\n\n.mdi-nail::before {\n  content: \"\\FDBB\";\n}\n\n.mdi-nas::before {\n  content: \"\\F8F2\";\n}\n\n.mdi-nativescript::before {\n  content: \"\\F87F\";\n}\n\n.mdi-nature::before {\n  content: \"\\F38E\";\n}\n\n.mdi-nature-people::before {\n  content: \"\\F38F\";\n}\n\n.mdi-navigation::before {\n  content: \"\\F390\";\n}\n\n.mdi-near-me::before {\n  content: \"\\F5CD\";\n}\n\n.mdi-necklace::before {\n  content: \"\\FF28\";\n}\n\n.mdi-needle::before {\n  content: \"\\F391\";\n}\n\n.mdi-netflix::before {\n  content: \"\\F745\";\n}\n\n.mdi-network::before {\n  content: \"\\F6F2\";\n}\n\n.mdi-network-off::before {\n  content: \"\\FC77\";\n}\n\n.mdi-network-off-outline::before {\n  content: \"\\FC78\";\n}\n\n.mdi-network-outline::before {\n  content: \"\\FC79\";\n}\n\n.mdi-network-router::before {\n  content: \"\\F00B2\";\n}\n\n.mdi-network-strength-1::before {\n  content: \"\\F8F3\";\n}\n\n.mdi-network-strength-1-alert::before {\n  content: \"\\F8F4\";\n}\n\n.mdi-network-strength-2::before {\n  content: \"\\F8F5\";\n}\n\n.mdi-network-strength-2-alert::before {\n  content: \"\\F8F6\";\n}\n\n.mdi-network-strength-3::before {\n  content: \"\\F8F7\";\n}\n\n.mdi-network-strength-3-alert::before {\n  content: \"\\F8F8\";\n}\n\n.mdi-network-strength-4::before {\n  content: \"\\F8F9\";\n}\n\n.mdi-network-strength-4-alert::before {\n  content: \"\\F8FA\";\n}\n\n.mdi-network-strength-off::before {\n  content: \"\\F8FB\";\n}\n\n.mdi-network-strength-off-outline::before {\n  content: \"\\F8FC\";\n}\n\n.mdi-network-strength-outline::before {\n  content: \"\\F8FD\";\n}\n\n.mdi-new-box::before {\n  content: \"\\F394\";\n}\n\n.mdi-newspaper::before {\n  content: \"\\F395\";\n}\n\n.mdi-newspaper-minus::before {\n  content: \"\\FF29\";\n}\n\n.mdi-newspaper-plus::before {\n  content: \"\\FF2A\";\n}\n\n.mdi-newspaper-variant::before {\n  content: \"\\F0023\";\n}\n\n.mdi-newspaper-variant-multiple::before {\n  content: \"\\F0024\";\n}\n\n.mdi-newspaper-variant-multiple-outline::before {\n  content: \"\\F0025\";\n}\n\n.mdi-newspaper-variant-outline::before {\n  content: \"\\F0026\";\n}\n\n.mdi-nfc::before {\n  content: \"\\F396\";\n}\n\n.mdi-nfc-off::before {\n  content: \"\\FE35\";\n}\n\n.mdi-nfc-search-variant::before {\n  content: \"\\FE36\";\n}\n\n.mdi-nfc-tap::before {\n  content: \"\\F397\";\n}\n\n.mdi-nfc-variant::before {\n  content: \"\\F398\";\n}\n\n.mdi-nfc-variant-off::before {\n  content: \"\\FE37\";\n}\n\n.mdi-ninja::before {\n  content: \"\\F773\";\n}\n\n.mdi-nintendo-switch::before {\n  content: \"\\F7E0\";\n}\n\n.mdi-nix::before {\n  content: \"\\F0130\";\n}\n\n.mdi-nodejs::before {\n  content: \"\\F399\";\n}\n\n.mdi-noodles::before {\n  content: \"\\F01A9\";\n}\n\n.mdi-not-equal::before {\n  content: \"\\F98C\";\n}\n\n.mdi-not-equal-variant::before {\n  content: \"\\F98D\";\n}\n\n.mdi-note::before {\n  content: \"\\F39A\";\n}\n\n.mdi-note-multiple::before {\n  content: \"\\F6B7\";\n}\n\n.mdi-note-multiple-outline::before {\n  content: \"\\F6B8\";\n}\n\n.mdi-note-outline::before {\n  content: \"\\F39B\";\n}\n\n.mdi-note-plus::before {\n  content: \"\\F39C\";\n}\n\n.mdi-note-plus-outline::before {\n  content: \"\\F39D\";\n}\n\n.mdi-note-text::before {\n  content: \"\\F39E\";\n}\n\n.mdi-notebook::before {\n  content: \"\\F82D\";\n}\n\n.mdi-notebook-multiple::before {\n  content: \"\\FE38\";\n}\n\n.mdi-notebook-outline::before {\n  content: \"\\FEDC\";\n}\n\n.mdi-notification-clear-all::before {\n  content: \"\\F39F\";\n}\n\n.mdi-npm::before {\n  content: \"\\F6F6\";\n}\n\n.mdi-npm-variant::before {\n  content: \"\\F98E\";\n}\n\n.mdi-npm-variant-outline::before {\n  content: \"\\F98F\";\n}\n\n.mdi-nuke::before {\n  content: \"\\F6A3\";\n}\n\n.mdi-null::before {\n  content: \"\\F7E1\";\n}\n\n.mdi-numeric::before {\n  content: \"\\F3A0\";\n}\n\n.mdi-numeric-0::before {\n  content: \"\\30\";\n}\n\n.mdi-numeric-0-box::before {\n  content: \"\\F3A1\";\n}\n\n.mdi-numeric-0-box-multiple::before {\n  content: \"\\FF2B\";\n}\n\n.mdi-numeric-0-box-multiple-outline::before {\n  content: \"\\F3A2\";\n}\n\n.mdi-numeric-0-box-outline::before {\n  content: \"\\F3A3\";\n}\n\n.mdi-numeric-0-circle::before {\n  content: \"\\FC7A\";\n}\n\n.mdi-numeric-0-circle-outline::before {\n  content: \"\\FC7B\";\n}\n\n.mdi-numeric-1::before {\n  content: \"\\31\";\n}\n\n.mdi-numeric-1-box::before {\n  content: \"\\F3A4\";\n}\n\n.mdi-numeric-1-box-multiple::before {\n  content: \"\\FF2C\";\n}\n\n.mdi-numeric-1-box-multiple-outline::before {\n  content: \"\\F3A5\";\n}\n\n.mdi-numeric-1-box-outline::before {\n  content: \"\\F3A6\";\n}\n\n.mdi-numeric-1-circle::before {\n  content: \"\\FC7C\";\n}\n\n.mdi-numeric-1-circle-outline::before {\n  content: \"\\FC7D\";\n}\n\n.mdi-numeric-10::before {\n  content: \"\\F000A\";\n}\n\n.mdi-numeric-10-box::before {\n  content: \"\\FF9A\";\n}\n\n.mdi-numeric-10-box-multiple::before {\n  content: \"\\F000B\";\n}\n\n.mdi-numeric-10-box-multiple-outline::before {\n  content: \"\\F000C\";\n}\n\n.mdi-numeric-10-box-outline::before {\n  content: \"\\FF9B\";\n}\n\n.mdi-numeric-10-circle::before {\n  content: \"\\F000D\";\n}\n\n.mdi-numeric-10-circle-outline::before {\n  content: \"\\F000E\";\n}\n\n.mdi-numeric-2::before {\n  content: \"\\32\";\n}\n\n.mdi-numeric-2-box::before {\n  content: \"\\F3A7\";\n}\n\n.mdi-numeric-2-box-multiple::before {\n  content: \"\\FF2D\";\n}\n\n.mdi-numeric-2-box-multiple-outline::before {\n  content: \"\\F3A8\";\n}\n\n.mdi-numeric-2-box-outline::before {\n  content: \"\\F3A9\";\n}\n\n.mdi-numeric-2-circle::before {\n  content: \"\\FC7E\";\n}\n\n.mdi-numeric-2-circle-outline::before {\n  content: \"\\FC7F\";\n}\n\n.mdi-numeric-3::before {\n  content: \"\\33\";\n}\n\n.mdi-numeric-3-box::before {\n  content: \"\\F3AA\";\n}\n\n.mdi-numeric-3-box-multiple::before {\n  content: \"\\FF2E\";\n}\n\n.mdi-numeric-3-box-multiple-outline::before {\n  content: \"\\F3AB\";\n}\n\n.mdi-numeric-3-box-outline::before {\n  content: \"\\F3AC\";\n}\n\n.mdi-numeric-3-circle::before {\n  content: \"\\FC80\";\n}\n\n.mdi-numeric-3-circle-outline::before {\n  content: \"\\FC81\";\n}\n\n.mdi-numeric-4::before {\n  content: \"\\34\";\n}\n\n.mdi-numeric-4-box::before {\n  content: \"\\F3AD\";\n}\n\n.mdi-numeric-4-box-multiple::before {\n  content: \"\\FF2F\";\n}\n\n.mdi-numeric-4-box-multiple-outline::before {\n  content: \"\\F3AE\";\n}\n\n.mdi-numeric-4-box-outline::before {\n  content: \"\\F3AF\";\n}\n\n.mdi-numeric-4-circle::before {\n  content: \"\\FC82\";\n}\n\n.mdi-numeric-4-circle-outline::before {\n  content: \"\\FC83\";\n}\n\n.mdi-numeric-5::before {\n  content: \"\\35\";\n}\n\n.mdi-numeric-5-box::before {\n  content: \"\\F3B0\";\n}\n\n.mdi-numeric-5-box-multiple::before {\n  content: \"\\FF30\";\n}\n\n.mdi-numeric-5-box-multiple-outline::before {\n  content: \"\\F3B1\";\n}\n\n.mdi-numeric-5-box-outline::before {\n  content: \"\\F3B2\";\n}\n\n.mdi-numeric-5-circle::before {\n  content: \"\\FC84\";\n}\n\n.mdi-numeric-5-circle-outline::before {\n  content: \"\\FC85\";\n}\n\n.mdi-numeric-6::before {\n  content: \"\\36\";\n}\n\n.mdi-numeric-6-box::before {\n  content: \"\\F3B3\";\n}\n\n.mdi-numeric-6-box-multiple::before {\n  content: \"\\FF31\";\n}\n\n.mdi-numeric-6-box-multiple-outline::before {\n  content: \"\\F3B4\";\n}\n\n.mdi-numeric-6-box-outline::before {\n  content: \"\\F3B5\";\n}\n\n.mdi-numeric-6-circle::before {\n  content: \"\\FC86\";\n}\n\n.mdi-numeric-6-circle-outline::before {\n  content: \"\\FC87\";\n}\n\n.mdi-numeric-7::before {\n  content: \"\\37\";\n}\n\n.mdi-numeric-7-box::before {\n  content: \"\\F3B6\";\n}\n\n.mdi-numeric-7-box-multiple::before {\n  content: \"\\FF32\";\n}\n\n.mdi-numeric-7-box-multiple-outline::before {\n  content: \"\\F3B7\";\n}\n\n.mdi-numeric-7-box-outline::before {\n  content: \"\\F3B8\";\n}\n\n.mdi-numeric-7-circle::before {\n  content: \"\\FC88\";\n}\n\n.mdi-numeric-7-circle-outline::before {\n  content: \"\\FC89\";\n}\n\n.mdi-numeric-8::before {\n  content: \"\\38\";\n}\n\n.mdi-numeric-8-box::before {\n  content: \"\\F3B9\";\n}\n\n.mdi-numeric-8-box-multiple::before {\n  content: \"\\FF33\";\n}\n\n.mdi-numeric-8-box-multiple-outline::before {\n  content: \"\\F3BA\";\n}\n\n.mdi-numeric-8-box-outline::before {\n  content: \"\\F3BB\";\n}\n\n.mdi-numeric-8-circle::before {\n  content: \"\\FC8A\";\n}\n\n.mdi-numeric-8-circle-outline::before {\n  content: \"\\FC8B\";\n}\n\n.mdi-numeric-9::before {\n  content: \"\\39\";\n}\n\n.mdi-numeric-9-box::before {\n  content: \"\\F3BC\";\n}\n\n.mdi-numeric-9-box-multiple::before {\n  content: \"\\FF34\";\n}\n\n.mdi-numeric-9-box-multiple-outline::before {\n  content: \"\\F3BD\";\n}\n\n.mdi-numeric-9-box-outline::before {\n  content: \"\\F3BE\";\n}\n\n.mdi-numeric-9-circle::before {\n  content: \"\\FC8C\";\n}\n\n.mdi-numeric-9-circle-outline::before {\n  content: \"\\FC8D\";\n}\n\n.mdi-numeric-9-plus::before {\n  content: \"\\F000F\";\n}\n\n.mdi-numeric-9-plus-box::before {\n  content: \"\\F3BF\";\n}\n\n.mdi-numeric-9-plus-box-multiple::before {\n  content: \"\\FF35\";\n}\n\n.mdi-numeric-9-plus-box-multiple-outline::before {\n  content: \"\\F3C0\";\n}\n\n.mdi-numeric-9-plus-box-outline::before {\n  content: \"\\F3C1\";\n}\n\n.mdi-numeric-9-plus-circle::before {\n  content: \"\\FC8E\";\n}\n\n.mdi-numeric-9-plus-circle-outline::before {\n  content: \"\\FC8F\";\n}\n\n.mdi-numeric-negative-1::before {\n  content: \"\\F0074\";\n}\n\n.mdi-nut::before {\n  content: \"\\F6F7\";\n}\n\n.mdi-nutrition::before {\n  content: \"\\F3C2\";\n}\n\n.mdi-nuxt::before {\n  content: \"\\F0131\";\n}\n\n.mdi-oar::before {\n  content: \"\\F67B\";\n}\n\n.mdi-ocarina::before {\n  content: \"\\FDBC\";\n}\n\n.mdi-ocr::before {\n  content: \"\\F0165\";\n}\n\n.mdi-octagon::before {\n  content: \"\\F3C3\";\n}\n\n.mdi-octagon-outline::before {\n  content: \"\\F3C4\";\n}\n\n.mdi-octagram::before {\n  content: \"\\F6F8\";\n}\n\n.mdi-octagram-outline::before {\n  content: \"\\F774\";\n}\n\n.mdi-odnoklassniki::before {\n  content: \"\\F3C5\";\n}\n\n.mdi-office::before {\n  content: \"\\F3C6\";\n}\n\n.mdi-office-building::before {\n  content: \"\\F990\";\n}\n\n.mdi-oil::before {\n  content: \"\\F3C7\";\n}\n\n.mdi-oil-lamp::before {\n  content: \"\\FF36\";\n}\n\n.mdi-oil-level::before {\n  content: \"\\F0075\";\n}\n\n.mdi-oil-temperature::before {\n  content: \"\\F0019\";\n}\n\n.mdi-omega::before {\n  content: \"\\F3C9\";\n}\n\n.mdi-one-up::before {\n  content: \"\\FB89\";\n}\n\n.mdi-onedrive::before {\n  content: \"\\F3CA\";\n}\n\n.mdi-onenote::before {\n  content: \"\\F746\";\n}\n\n.mdi-onepassword::before {\n  content: \"\\F880\";\n}\n\n.mdi-opacity::before {\n  content: \"\\F5CC\";\n}\n\n.mdi-open-in-app::before {\n  content: \"\\F3CB\";\n}\n\n.mdi-open-in-new::before {\n  content: \"\\F3CC\";\n}\n\n.mdi-open-source-initiative::before {\n  content: \"\\FB8A\";\n}\n\n.mdi-openid::before {\n  content: \"\\F3CD\";\n}\n\n.mdi-opera::before {\n  content: \"\\F3CE\";\n}\n\n.mdi-orbit::before {\n  content: \"\\F018\";\n}\n\n.mdi-origin::before {\n  content: \"\\FB2B\";\n}\n\n.mdi-ornament::before {\n  content: \"\\F3CF\";\n}\n\n.mdi-ornament-variant::before {\n  content: \"\\F3D0\";\n}\n\n.mdi-outdoor-lamp::before {\n  content: \"\\F0076\";\n}\n\n.mdi-outlook::before {\n  content: \"\\FCFE\";\n}\n\n.mdi-overscan::before {\n  content: \"\\F0027\";\n}\n\n.mdi-owl::before {\n  content: \"\\F3D2\";\n}\n\n.mdi-pac-man::before {\n  content: \"\\FB8B\";\n}\n\n.mdi-package::before {\n  content: \"\\F3D3\";\n}\n\n.mdi-package-down::before {\n  content: \"\\F3D4\";\n}\n\n.mdi-package-up::before {\n  content: \"\\F3D5\";\n}\n\n.mdi-package-variant::before {\n  content: \"\\F3D6\";\n}\n\n.mdi-package-variant-closed::before {\n  content: \"\\F3D7\";\n}\n\n.mdi-page-first::before {\n  content: \"\\F600\";\n}\n\n.mdi-page-last::before {\n  content: \"\\F601\";\n}\n\n.mdi-page-layout-body::before {\n  content: \"\\F6F9\";\n}\n\n.mdi-page-layout-footer::before {\n  content: \"\\F6FA\";\n}\n\n.mdi-page-layout-header::before {\n  content: \"\\F6FB\";\n}\n\n.mdi-page-layout-header-footer::before {\n  content: \"\\FF9C\";\n}\n\n.mdi-page-layout-sidebar-left::before {\n  content: \"\\F6FC\";\n}\n\n.mdi-page-layout-sidebar-right::before {\n  content: \"\\F6FD\";\n}\n\n.mdi-page-next::before {\n  content: \"\\FB8C\";\n}\n\n.mdi-page-next-outline::before {\n  content: \"\\FB8D\";\n}\n\n.mdi-page-previous::before {\n  content: \"\\FB8E\";\n}\n\n.mdi-page-previous-outline::before {\n  content: \"\\FB8F\";\n}\n\n.mdi-palette::before {\n  content: \"\\F3D8\";\n}\n\n.mdi-palette-advanced::before {\n  content: \"\\F3D9\";\n}\n\n.mdi-palette-outline::before {\n  content: \"\\FE6C\";\n}\n\n.mdi-palette-swatch::before {\n  content: \"\\F8B4\";\n}\n\n.mdi-palm-tree::before {\n  content: \"\\F0077\";\n}\n\n.mdi-pan::before {\n  content: \"\\FB90\";\n}\n\n.mdi-pan-bottom-left::before {\n  content: \"\\FB91\";\n}\n\n.mdi-pan-bottom-right::before {\n  content: \"\\FB92\";\n}\n\n.mdi-pan-down::before {\n  content: \"\\FB93\";\n}\n\n.mdi-pan-horizontal::before {\n  content: \"\\FB94\";\n}\n\n.mdi-pan-left::before {\n  content: \"\\FB95\";\n}\n\n.mdi-pan-right::before {\n  content: \"\\FB96\";\n}\n\n.mdi-pan-top-left::before {\n  content: \"\\FB97\";\n}\n\n.mdi-pan-top-right::before {\n  content: \"\\FB98\";\n}\n\n.mdi-pan-up::before {\n  content: \"\\FB99\";\n}\n\n.mdi-pan-vertical::before {\n  content: \"\\FB9A\";\n}\n\n.mdi-panda::before {\n  content: \"\\F3DA\";\n}\n\n.mdi-pandora::before {\n  content: \"\\F3DB\";\n}\n\n.mdi-panorama::before {\n  content: \"\\F3DC\";\n}\n\n.mdi-panorama-fisheye::before {\n  content: \"\\F3DD\";\n}\n\n.mdi-panorama-horizontal::before {\n  content: \"\\F3DE\";\n}\n\n.mdi-panorama-vertical::before {\n  content: \"\\F3DF\";\n}\n\n.mdi-panorama-wide-angle::before {\n  content: \"\\F3E0\";\n}\n\n.mdi-paper-cut-vertical::before {\n  content: \"\\F3E1\";\n}\n\n.mdi-paper-roll::before {\n  content: \"\\F0182\";\n}\n\n.mdi-paper-roll-outline::before {\n  content: \"\\F0183\";\n}\n\n.mdi-paperclip::before {\n  content: \"\\F3E2\";\n}\n\n.mdi-parachute::before {\n  content: \"\\FC90\";\n}\n\n.mdi-parachute-outline::before {\n  content: \"\\FC91\";\n}\n\n.mdi-parking::before {\n  content: \"\\F3E3\";\n}\n\n.mdi-party-popper::before {\n  content: \"\\F0078\";\n}\n\n.mdi-passport::before {\n  content: \"\\F7E2\";\n}\n\n.mdi-passport-biometric::before {\n  content: \"\\FDBD\";\n}\n\n.mdi-pasta::before {\n  content: \"\\F018B\";\n}\n\n.mdi-patio-heater::before {\n  content: \"\\FF9D\";\n}\n\n.mdi-patreon::before {\n  content: \"\\F881\";\n}\n\n.mdi-pause::before {\n  content: \"\\F3E4\";\n}\n\n.mdi-pause-circle::before {\n  content: \"\\F3E5\";\n}\n\n.mdi-pause-circle-outline::before {\n  content: \"\\F3E6\";\n}\n\n.mdi-pause-octagon::before {\n  content: \"\\F3E7\";\n}\n\n.mdi-pause-octagon-outline::before {\n  content: \"\\F3E8\";\n}\n\n.mdi-paw::before {\n  content: \"\\F3E9\";\n}\n\n.mdi-paw-off::before {\n  content: \"\\F657\";\n}\n\n.mdi-paypal::before {\n  content: \"\\F882\";\n}\n\n.mdi-pdf-box::before {\n  content: \"\\FE39\";\n}\n\n.mdi-peace::before {\n  content: \"\\F883\";\n}\n\n.mdi-peanut::before {\n  content: \"\\F001E\";\n}\n\n.mdi-peanut-off::before {\n  content: \"\\F001F\";\n}\n\n.mdi-peanut-off-outline::before {\n  content: \"\\F0021\";\n}\n\n.mdi-peanut-outline::before {\n  content: \"\\F0020\";\n}\n\n.mdi-pen::before {\n  content: \"\\F3EA\";\n}\n\n.mdi-pen-lock::before {\n  content: \"\\FDBE\";\n}\n\n.mdi-pen-minus::before {\n  content: \"\\FDBF\";\n}\n\n.mdi-pen-off::before {\n  content: \"\\FDC0\";\n}\n\n.mdi-pen-plus::before {\n  content: \"\\FDC1\";\n}\n\n.mdi-pen-remove::before {\n  content: \"\\FDC2\";\n}\n\n.mdi-pencil::before {\n  content: \"\\F3EB\";\n}\n\n.mdi-pencil-box::before {\n  content: \"\\F3EC\";\n}\n\n.mdi-pencil-box-multiple::before {\n  content: \"\\F016F\";\n}\n\n.mdi-pencil-box-multiple-outline::before {\n  content: \"\\F0170\";\n}\n\n.mdi-pencil-box-outline::before {\n  content: \"\\F3ED\";\n}\n\n.mdi-pencil-circle::before {\n  content: \"\\F6FE\";\n}\n\n.mdi-pencil-circle-outline::before {\n  content: \"\\F775\";\n}\n\n.mdi-pencil-lock::before {\n  content: \"\\F3EE\";\n}\n\n.mdi-pencil-lock-outline::before {\n  content: \"\\FDC3\";\n}\n\n.mdi-pencil-minus::before {\n  content: \"\\FDC4\";\n}\n\n.mdi-pencil-minus-outline::before {\n  content: \"\\FDC5\";\n}\n\n.mdi-pencil-off::before {\n  content: \"\\F3EF\";\n}\n\n.mdi-pencil-off-outline::before {\n  content: \"\\FDC6\";\n}\n\n.mdi-pencil-outline::before {\n  content: \"\\FC92\";\n}\n\n.mdi-pencil-plus::before {\n  content: \"\\FDC7\";\n}\n\n.mdi-pencil-plus-outline::before {\n  content: \"\\FDC8\";\n}\n\n.mdi-pencil-remove::before {\n  content: \"\\FDC9\";\n}\n\n.mdi-pencil-remove-outline::before {\n  content: \"\\FDCA\";\n}\n\n.mdi-penguin::before {\n  content: \"\\FEDD\";\n}\n\n.mdi-pentagon::before {\n  content: \"\\F6FF\";\n}\n\n.mdi-pentagon-outline::before {\n  content: \"\\F700\";\n}\n\n.mdi-percent::before {\n  content: \"\\F3F0\";\n}\n\n.mdi-periodic-table::before {\n  content: \"\\F8B5\";\n}\n\n.mdi-periodic-table-co2::before {\n  content: \"\\F7E3\";\n}\n\n.mdi-periscope::before {\n  content: \"\\F747\";\n}\n\n.mdi-perspective-less::before {\n  content: \"\\FCFF\";\n}\n\n.mdi-perspective-more::before {\n  content: \"\\FD00\";\n}\n\n.mdi-pharmacy::before {\n  content: \"\\F3F1\";\n}\n\n.mdi-phone::before {\n  content: \"\\F3F2\";\n}\n\n.mdi-phone-alert::before {\n  content: \"\\FF37\";\n}\n\n.mdi-phone-bluetooth::before {\n  content: \"\\F3F3\";\n}\n\n.mdi-phone-cancel::before {\n  content: \"\\F00E7\";\n}\n\n.mdi-phone-classic::before {\n  content: \"\\F602\";\n}\n\n.mdi-phone-forward::before {\n  content: \"\\F3F4\";\n}\n\n.mdi-phone-hangup::before {\n  content: \"\\F3F5\";\n}\n\n.mdi-phone-in-talk::before {\n  content: \"\\F3F6\";\n}\n\n.mdi-phone-in-talk-outline::before {\n  content: \"\\F01AD\";\n}\n\n.mdi-phone-incoming::before {\n  content: \"\\F3F7\";\n}\n\n.mdi-phone-lock::before {\n  content: \"\\F3F8\";\n}\n\n.mdi-phone-log::before {\n  content: \"\\F3F9\";\n}\n\n.mdi-phone-minus::before {\n  content: \"\\F658\";\n}\n\n.mdi-phone-missed::before {\n  content: \"\\F3FA\";\n}\n\n.mdi-phone-off::before {\n  content: \"\\FDCB\";\n}\n\n.mdi-phone-outgoing::before {\n  content: \"\\F3FB\";\n}\n\n.mdi-phone-outline::before {\n  content: \"\\FDCC\";\n}\n\n.mdi-phone-paused::before {\n  content: \"\\F3FC\";\n}\n\n.mdi-phone-plus::before {\n  content: \"\\F659\";\n}\n\n.mdi-phone-return::before {\n  content: \"\\F82E\";\n}\n\n.mdi-phone-rotate-landscape::before {\n  content: \"\\F884\";\n}\n\n.mdi-phone-rotate-portrait::before {\n  content: \"\\F885\";\n}\n\n.mdi-phone-settings::before {\n  content: \"\\F3FD\";\n}\n\n.mdi-phone-voip::before {\n  content: \"\\F3FE\";\n}\n\n.mdi-pi::before {\n  content: \"\\F3FF\";\n}\n\n.mdi-pi-box::before {\n  content: \"\\F400\";\n}\n\n.mdi-pi-hole::before {\n  content: \"\\FDCD\";\n}\n\n.mdi-piano::before {\n  content: \"\\F67C\";\n}\n\n.mdi-pickaxe::before {\n  content: \"\\F8B6\";\n}\n\n.mdi-picture-in-picture-bottom-right::before {\n  content: \"\\FE3A\";\n}\n\n.mdi-picture-in-picture-bottom-right-outline::before {\n  content: \"\\FE3B\";\n}\n\n.mdi-picture-in-picture-top-right::before {\n  content: \"\\FE3C\";\n}\n\n.mdi-picture-in-picture-top-right-outline::before {\n  content: \"\\FE3D\";\n}\n\n.mdi-pier::before {\n  content: \"\\F886\";\n}\n\n.mdi-pier-crane::before {\n  content: \"\\F887\";\n}\n\n.mdi-pig::before {\n  content: \"\\F401\";\n}\n\n.mdi-pig-variant::before {\n  content: \"\\F0028\";\n}\n\n.mdi-piggy-bank::before {\n  content: \"\\F0029\";\n}\n\n.mdi-pill::before {\n  content: \"\\F402\";\n}\n\n.mdi-pillar::before {\n  content: \"\\F701\";\n}\n\n.mdi-pin::before {\n  content: \"\\F403\";\n}\n\n.mdi-pin-off::before {\n  content: \"\\F404\";\n}\n\n.mdi-pin-off-outline::before {\n  content: \"\\F92F\";\n}\n\n.mdi-pin-outline::before {\n  content: \"\\F930\";\n}\n\n.mdi-pine-tree::before {\n  content: \"\\F405\";\n}\n\n.mdi-pine-tree-box::before {\n  content: \"\\F406\";\n}\n\n.mdi-pinterest::before {\n  content: \"\\F407\";\n}\n\n.mdi-pinterest-box::before {\n  content: \"\\F408\";\n}\n\n.mdi-pinwheel::before {\n  content: \"\\FAD4\";\n}\n\n.mdi-pinwheel-outline::before {\n  content: \"\\FAD5\";\n}\n\n.mdi-pipe::before {\n  content: \"\\F7E4\";\n}\n\n.mdi-pipe-disconnected::before {\n  content: \"\\F7E5\";\n}\n\n.mdi-pipe-leak::before {\n  content: \"\\F888\";\n}\n\n.mdi-pirate::before {\n  content: \"\\FA07\";\n}\n\n.mdi-pistol::before {\n  content: \"\\F702\";\n}\n\n.mdi-piston::before {\n  content: \"\\F889\";\n}\n\n.mdi-pizza::before {\n  content: \"\\F409\";\n}\n\n.mdi-play::before {\n  content: \"\\F40A\";\n}\n\n.mdi-play-box-outline::before {\n  content: \"\\F40B\";\n}\n\n.mdi-play-circle::before {\n  content: \"\\F40C\";\n}\n\n.mdi-play-circle-outline::before {\n  content: \"\\F40D\";\n}\n\n.mdi-play-network::before {\n  content: \"\\F88A\";\n}\n\n.mdi-play-network-outline::before {\n  content: \"\\FC93\";\n}\n\n.mdi-play-outline::before {\n  content: \"\\FF38\";\n}\n\n.mdi-play-pause::before {\n  content: \"\\F40E\";\n}\n\n.mdi-play-protected-content::before {\n  content: \"\\F40F\";\n}\n\n.mdi-play-speed::before {\n  content: \"\\F8FE\";\n}\n\n.mdi-playlist-check::before {\n  content: \"\\F5C7\";\n}\n\n.mdi-playlist-edit::before {\n  content: \"\\F8FF\";\n}\n\n.mdi-playlist-minus::before {\n  content: \"\\F410\";\n}\n\n.mdi-playlist-music::before {\n  content: \"\\FC94\";\n}\n\n.mdi-playlist-music-outline::before {\n  content: \"\\FC95\";\n}\n\n.mdi-playlist-play::before {\n  content: \"\\F411\";\n}\n\n.mdi-playlist-plus::before {\n  content: \"\\F412\";\n}\n\n.mdi-playlist-remove::before {\n  content: \"\\F413\";\n}\n\n.mdi-playlist-star::before {\n  content: \"\\FDCE\";\n}\n\n.mdi-playstation::before {\n  content: \"\\F414\";\n}\n\n.mdi-plex::before {\n  content: \"\\F6B9\";\n}\n\n.mdi-plus::before {\n  content: \"\\F415\";\n}\n\n.mdi-plus-box::before {\n  content: \"\\F416\";\n}\n\n.mdi-plus-box-multiple::before {\n  content: \"\\F334\";\n}\n\n.mdi-plus-box-multiple-outline::before {\n  content: \"\\F016E\";\n}\n\n.mdi-plus-box-outline::before {\n  content: \"\\F703\";\n}\n\n.mdi-plus-circle::before {\n  content: \"\\F417\";\n}\n\n.mdi-plus-circle-multiple-outline::before {\n  content: \"\\F418\";\n}\n\n.mdi-plus-circle-outline::before {\n  content: \"\\F419\";\n}\n\n.mdi-plus-minus::before {\n  content: \"\\F991\";\n}\n\n.mdi-plus-minus-box::before {\n  content: \"\\F992\";\n}\n\n.mdi-plus-network::before {\n  content: \"\\F41A\";\n}\n\n.mdi-plus-network-outline::before {\n  content: \"\\FC96\";\n}\n\n.mdi-plus-one::before {\n  content: \"\\F41B\";\n}\n\n.mdi-plus-outline::before {\n  content: \"\\F704\";\n}\n\n.mdi-pocket::before {\n  content: \"\\F41C\";\n}\n\n.mdi-podcast::before {\n  content: \"\\F993\";\n}\n\n.mdi-podium::before {\n  content: \"\\FD01\";\n}\n\n.mdi-podium-bronze::before {\n  content: \"\\FD02\";\n}\n\n.mdi-podium-gold::before {\n  content: \"\\FD03\";\n}\n\n.mdi-podium-silver::before {\n  content: \"\\FD04\";\n}\n\n.mdi-point-of-sale::before {\n  content: \"\\FD6E\";\n}\n\n.mdi-pokeball::before {\n  content: \"\\F41D\";\n}\n\n.mdi-pokemon-go::before {\n  content: \"\\FA08\";\n}\n\n.mdi-poker-chip::before {\n  content: \"\\F82F\";\n}\n\n.mdi-polaroid::before {\n  content: \"\\F41E\";\n}\n\n.mdi-police-badge::before {\n  content: \"\\F0192\";\n}\n\n.mdi-police-badge-outline::before {\n  content: \"\\F0193\";\n}\n\n.mdi-poll::before {\n  content: \"\\F41F\";\n}\n\n.mdi-poll-box::before {\n  content: \"\\F420\";\n}\n\n.mdi-polymer::before {\n  content: \"\\F421\";\n}\n\n.mdi-pool::before {\n  content: \"\\F606\";\n}\n\n.mdi-popcorn::before {\n  content: \"\\F422\";\n}\n\n.mdi-post::before {\n  content: \"\\F002A\";\n}\n\n.mdi-post-outline::before {\n  content: \"\\F002B\";\n}\n\n.mdi-postage-stamp::before {\n  content: \"\\FC97\";\n}\n\n.mdi-pot::before {\n  content: \"\\F65A\";\n}\n\n.mdi-pot-mix::before {\n  content: \"\\F65B\";\n}\n\n.mdi-pound::before {\n  content: \"\\F423\";\n}\n\n.mdi-pound-box::before {\n  content: \"\\F424\";\n}\n\n.mdi-pound-box-outline::before {\n  content: \"\\F01AA\";\n}\n\n.mdi-power::before {\n  content: \"\\F425\";\n}\n\n.mdi-power-cycle::before {\n  content: \"\\F900\";\n}\n\n.mdi-power-off::before {\n  content: \"\\F901\";\n}\n\n.mdi-power-on::before {\n  content: \"\\F902\";\n}\n\n.mdi-power-plug::before {\n  content: \"\\F6A4\";\n}\n\n.mdi-power-plug-off::before {\n  content: \"\\F6A5\";\n}\n\n.mdi-power-settings::before {\n  content: \"\\F426\";\n}\n\n.mdi-power-sleep::before {\n  content: \"\\F903\";\n}\n\n.mdi-power-socket::before {\n  content: \"\\F427\";\n}\n\n.mdi-power-socket-au::before {\n  content: \"\\F904\";\n}\n\n.mdi-power-socket-de::before {\n  content: \"\\F0132\";\n}\n\n.mdi-power-socket-eu::before {\n  content: \"\\F7E6\";\n}\n\n.mdi-power-socket-fr::before {\n  content: \"\\F0133\";\n}\n\n.mdi-power-socket-jp::before {\n  content: \"\\F0134\";\n}\n\n.mdi-power-socket-uk::before {\n  content: \"\\F7E7\";\n}\n\n.mdi-power-socket-us::before {\n  content: \"\\F7E8\";\n}\n\n.mdi-power-standby::before {\n  content: \"\\F905\";\n}\n\n.mdi-powershell::before {\n  content: \"\\FA09\";\n}\n\n.mdi-prescription::before {\n  content: \"\\F705\";\n}\n\n.mdi-presentation::before {\n  content: \"\\F428\";\n}\n\n.mdi-presentation-play::before {\n  content: \"\\F429\";\n}\n\n.mdi-printer::before {\n  content: \"\\F42A\";\n}\n\n.mdi-printer-3d::before {\n  content: \"\\F42B\";\n}\n\n.mdi-printer-3d-nozzle::before {\n  content: \"\\FE3E\";\n}\n\n.mdi-printer-3d-nozzle-outline::before {\n  content: \"\\FE3F\";\n}\n\n.mdi-printer-alert::before {\n  content: \"\\F42C\";\n}\n\n.mdi-printer-check::before {\n  content: \"\\F0171\";\n}\n\n.mdi-printer-off::before {\n  content: \"\\FE40\";\n}\n\n.mdi-printer-pos::before {\n  content: \"\\F0079\";\n}\n\n.mdi-printer-settings::before {\n  content: \"\\F706\";\n}\n\n.mdi-printer-wireless::before {\n  content: \"\\FA0A\";\n}\n\n.mdi-priority-high::before {\n  content: \"\\F603\";\n}\n\n.mdi-priority-low::before {\n  content: \"\\F604\";\n}\n\n.mdi-professional-hexagon::before {\n  content: \"\\F42D\";\n}\n\n.mdi-progress-alert::before {\n  content: \"\\FC98\";\n}\n\n.mdi-progress-check::before {\n  content: \"\\F994\";\n}\n\n.mdi-progress-clock::before {\n  content: \"\\F995\";\n}\n\n.mdi-progress-close::before {\n  content: \"\\F0135\";\n}\n\n.mdi-progress-download::before {\n  content: \"\\F996\";\n}\n\n.mdi-progress-upload::before {\n  content: \"\\F997\";\n}\n\n.mdi-progress-wrench::before {\n  content: \"\\FC99\";\n}\n\n.mdi-projector::before {\n  content: \"\\F42E\";\n}\n\n.mdi-projector-screen::before {\n  content: \"\\F42F\";\n}\n\n.mdi-protocol::before {\n  content: \"\\FFF9\";\n}\n\n.mdi-publish::before {\n  content: \"\\F6A6\";\n}\n\n.mdi-pulse::before {\n  content: \"\\F430\";\n}\n\n.mdi-pumpkin::before {\n  content: \"\\FB9B\";\n}\n\n.mdi-purse::before {\n  content: \"\\FF39\";\n}\n\n.mdi-purse-outline::before {\n  content: \"\\FF3A\";\n}\n\n.mdi-puzzle::before {\n  content: \"\\F431\";\n}\n\n.mdi-puzzle-outline::before {\n  content: \"\\FA65\";\n}\n\n.mdi-qi::before {\n  content: \"\\F998\";\n}\n\n.mdi-qqchat::before {\n  content: \"\\F605\";\n}\n\n.mdi-qrcode::before {\n  content: \"\\F432\";\n}\n\n.mdi-qrcode-edit::before {\n  content: \"\\F8B7\";\n}\n\n.mdi-qrcode-minus::before {\n  content: \"\\F01B7\";\n}\n\n.mdi-qrcode-plus::before {\n  content: \"\\F01B6\";\n}\n\n.mdi-qrcode-remove::before {\n  content: \"\\F01B8\";\n}\n\n.mdi-qrcode-scan::before {\n  content: \"\\F433\";\n}\n\n.mdi-quadcopter::before {\n  content: \"\\F434\";\n}\n\n.mdi-quality-high::before {\n  content: \"\\F435\";\n}\n\n.mdi-quality-low::before {\n  content: \"\\FA0B\";\n}\n\n.mdi-quality-medium::before {\n  content: \"\\FA0C\";\n}\n\n.mdi-quicktime::before {\n  content: \"\\F436\";\n}\n\n.mdi-quora::before {\n  content: \"\\FD05\";\n}\n\n.mdi-rabbit::before {\n  content: \"\\F906\";\n}\n\n.mdi-racing-helmet::before {\n  content: \"\\FD6F\";\n}\n\n.mdi-racquetball::before {\n  content: \"\\FD70\";\n}\n\n.mdi-radar::before {\n  content: \"\\F437\";\n}\n\n.mdi-radiator::before {\n  content: \"\\F438\";\n}\n\n.mdi-radiator-disabled::before {\n  content: \"\\FAD6\";\n}\n\n.mdi-radiator-off::before {\n  content: \"\\FAD7\";\n}\n\n.mdi-radio::before {\n  content: \"\\F439\";\n}\n\n.mdi-radio-am::before {\n  content: \"\\FC9A\";\n}\n\n.mdi-radio-fm::before {\n  content: \"\\FC9B\";\n}\n\n.mdi-radio-handheld::before {\n  content: \"\\F43A\";\n}\n\n.mdi-radio-tower::before {\n  content: \"\\F43B\";\n}\n\n.mdi-radioactive::before {\n  content: \"\\F43C\";\n}\n\n.mdi-radioactive-off::before {\n  content: \"\\FEDE\";\n}\n\n.mdi-radiobox-blank::before {\n  content: \"\\F43D\";\n}\n\n.mdi-radiobox-marked::before {\n  content: \"\\F43E\";\n}\n\n.mdi-radius::before {\n  content: \"\\FC9C\";\n}\n\n.mdi-radius-outline::before {\n  content: \"\\FC9D\";\n}\n\n.mdi-railroad-light::before {\n  content: \"\\FF3B\";\n}\n\n.mdi-raspberry-pi::before {\n  content: \"\\F43F\";\n}\n\n.mdi-ray-end::before {\n  content: \"\\F440\";\n}\n\n.mdi-ray-end-arrow::before {\n  content: \"\\F441\";\n}\n\n.mdi-ray-start::before {\n  content: \"\\F442\";\n}\n\n.mdi-ray-start-arrow::before {\n  content: \"\\F443\";\n}\n\n.mdi-ray-start-end::before {\n  content: \"\\F444\";\n}\n\n.mdi-ray-vertex::before {\n  content: \"\\F445\";\n}\n\n.mdi-react::before {\n  content: \"\\F707\";\n}\n\n.mdi-read::before {\n  content: \"\\F447\";\n}\n\n.mdi-receipt::before {\n  content: \"\\F449\";\n}\n\n.mdi-record::before {\n  content: \"\\F44A\";\n}\n\n.mdi-record-circle::before {\n  content: \"\\FEDF\";\n}\n\n.mdi-record-circle-outline::before {\n  content: \"\\FEE0\";\n}\n\n.mdi-record-player::before {\n  content: \"\\F999\";\n}\n\n.mdi-record-rec::before {\n  content: \"\\F44B\";\n}\n\n.mdi-rectangle::before {\n  content: \"\\FE41\";\n}\n\n.mdi-rectangle-outline::before {\n  content: \"\\FE42\";\n}\n\n.mdi-recycle::before {\n  content: \"\\F44C\";\n}\n\n.mdi-reddit::before {\n  content: \"\\F44D\";\n}\n\n.mdi-redhat::before {\n  content: \"\\F0146\";\n}\n\n.mdi-redo::before {\n  content: \"\\F44E\";\n}\n\n.mdi-redo-variant::before {\n  content: \"\\F44F\";\n}\n\n.mdi-reflect-horizontal::before {\n  content: \"\\FA0D\";\n}\n\n.mdi-reflect-vertical::before {\n  content: \"\\FA0E\";\n}\n\n.mdi-refresh::before {\n  content: \"\\F450\";\n}\n\n.mdi-regex::before {\n  content: \"\\F451\";\n}\n\n.mdi-registered-trademark::before {\n  content: \"\\FA66\";\n}\n\n.mdi-relative-scale::before {\n  content: \"\\F452\";\n}\n\n.mdi-reload::before {\n  content: \"\\F453\";\n}\n\n.mdi-reload-alert::before {\n  content: \"\\F0136\";\n}\n\n.mdi-reminder::before {\n  content: \"\\F88B\";\n}\n\n.mdi-remote::before {\n  content: \"\\F454\";\n}\n\n.mdi-remote-desktop::before {\n  content: \"\\F8B8\";\n}\n\n.mdi-remote-off::before {\n  content: \"\\FEE1\";\n}\n\n.mdi-remote-tv::before {\n  content: \"\\FEE2\";\n}\n\n.mdi-remote-tv-off::before {\n  content: \"\\FEE3\";\n}\n\n.mdi-rename-box::before {\n  content: \"\\F455\";\n}\n\n.mdi-reorder-horizontal::before {\n  content: \"\\F687\";\n}\n\n.mdi-reorder-vertical::before {\n  content: \"\\F688\";\n}\n\n.mdi-repeat::before {\n  content: \"\\F456\";\n}\n\n.mdi-repeat-off::before {\n  content: \"\\F457\";\n}\n\n.mdi-repeat-once::before {\n  content: \"\\F458\";\n}\n\n.mdi-replay::before {\n  content: \"\\F459\";\n}\n\n.mdi-reply::before {\n  content: \"\\F45A\";\n}\n\n.mdi-reply-all::before {\n  content: \"\\F45B\";\n}\n\n.mdi-reply-all-outline::before {\n  content: \"\\FF3C\";\n}\n\n.mdi-reply-outline::before {\n  content: \"\\FF3D\";\n}\n\n.mdi-reproduction::before {\n  content: \"\\F45C\";\n}\n\n.mdi-resistor::before {\n  content: \"\\FB1F\";\n}\n\n.mdi-resistor-nodes::before {\n  content: \"\\FB20\";\n}\n\n.mdi-resize::before {\n  content: \"\\FA67\";\n}\n\n.mdi-resize-bottom-right::before {\n  content: \"\\F45D\";\n}\n\n.mdi-responsive::before {\n  content: \"\\F45E\";\n}\n\n.mdi-restart::before {\n  content: \"\\F708\";\n}\n\n.mdi-restart-alert::before {\n  content: \"\\F0137\";\n}\n\n.mdi-restart-off::before {\n  content: \"\\FD71\";\n}\n\n.mdi-restore::before {\n  content: \"\\F99A\";\n}\n\n.mdi-restore-alert::before {\n  content: \"\\F0138\";\n}\n\n.mdi-rewind::before {\n  content: \"\\F45F\";\n}\n\n.mdi-rewind-10::before {\n  content: \"\\FD06\";\n}\n\n.mdi-rewind-30::before {\n  content: \"\\FD72\";\n}\n\n.mdi-rewind-outline::before {\n  content: \"\\F709\";\n}\n\n.mdi-rhombus::before {\n  content: \"\\F70A\";\n}\n\n.mdi-rhombus-medium::before {\n  content: \"\\FA0F\";\n}\n\n.mdi-rhombus-outline::before {\n  content: \"\\F70B\";\n}\n\n.mdi-rhombus-split::before {\n  content: \"\\FA10\";\n}\n\n.mdi-ribbon::before {\n  content: \"\\F460\";\n}\n\n.mdi-rice::before {\n  content: \"\\F7E9\";\n}\n\n.mdi-ring::before {\n  content: \"\\F7EA\";\n}\n\n.mdi-rivet::before {\n  content: \"\\FE43\";\n}\n\n.mdi-road::before {\n  content: \"\\F461\";\n}\n\n.mdi-road-variant::before {\n  content: \"\\F462\";\n}\n\n.mdi-robber::before {\n  content: \"\\F007A\";\n}\n\n.mdi-robot::before {\n  content: \"\\F6A8\";\n}\n\n.mdi-robot-industrial::before {\n  content: \"\\FB21\";\n}\n\n.mdi-robot-vacuum::before {\n  content: \"\\F70C\";\n}\n\n.mdi-robot-vacuum-variant::before {\n  content: \"\\F907\";\n}\n\n.mdi-rocket::before {\n  content: \"\\F463\";\n}\n\n.mdi-roller-skate::before {\n  content: \"\\FD07\";\n}\n\n.mdi-rollerblade::before {\n  content: \"\\FD08\";\n}\n\n.mdi-rollupjs::before {\n  content: \"\\FB9C\";\n}\n\n.mdi-roman-numeral-1::before {\n  content: \"\\F00B3\";\n}\n\n.mdi-roman-numeral-10::before {\n  content: \"\\F00BC\";\n}\n\n.mdi-roman-numeral-2::before {\n  content: \"\\F00B4\";\n}\n\n.mdi-roman-numeral-3::before {\n  content: \"\\F00B5\";\n}\n\n.mdi-roman-numeral-4::before {\n  content: \"\\F00B6\";\n}\n\n.mdi-roman-numeral-5::before {\n  content: \"\\F00B7\";\n}\n\n.mdi-roman-numeral-6::before {\n  content: \"\\F00B8\";\n}\n\n.mdi-roman-numeral-7::before {\n  content: \"\\F00B9\";\n}\n\n.mdi-roman-numeral-8::before {\n  content: \"\\F00BA\";\n}\n\n.mdi-roman-numeral-9::before {\n  content: \"\\F00BB\";\n}\n\n.mdi-room-service::before {\n  content: \"\\F88C\";\n}\n\n.mdi-room-service-outline::before {\n  content: \"\\FD73\";\n}\n\n.mdi-rotate-3d::before {\n  content: \"\\FEE4\";\n}\n\n.mdi-rotate-3d-variant::before {\n  content: \"\\F464\";\n}\n\n.mdi-rotate-left::before {\n  content: \"\\F465\";\n}\n\n.mdi-rotate-left-variant::before {\n  content: \"\\F466\";\n}\n\n.mdi-rotate-orbit::before {\n  content: \"\\FD74\";\n}\n\n.mdi-rotate-right::before {\n  content: \"\\F467\";\n}\n\n.mdi-rotate-right-variant::before {\n  content: \"\\F468\";\n}\n\n.mdi-rounded-corner::before {\n  content: \"\\F607\";\n}\n\n.mdi-router-wireless::before {\n  content: \"\\F469\";\n}\n\n.mdi-router-wireless-settings::before {\n  content: \"\\FA68\";\n}\n\n.mdi-routes::before {\n  content: \"\\F46A\";\n}\n\n.mdi-routes-clock::before {\n  content: \"\\F007B\";\n}\n\n.mdi-rowing::before {\n  content: \"\\F608\";\n}\n\n.mdi-rss::before {\n  content: \"\\F46B\";\n}\n\n.mdi-rss-box::before {\n  content: \"\\F46C\";\n}\n\n.mdi-rss-off::before {\n  content: \"\\FF3E\";\n}\n\n.mdi-ruby::before {\n  content: \"\\FD09\";\n}\n\n.mdi-rugby::before {\n  content: \"\\FD75\";\n}\n\n.mdi-ruler::before {\n  content: \"\\F46D\";\n}\n\n.mdi-ruler-square::before {\n  content: \"\\FC9E\";\n}\n\n.mdi-ruler-square-compass::before {\n  content: \"\\FEDB\";\n}\n\n.mdi-run::before {\n  content: \"\\F70D\";\n}\n\n.mdi-run-fast::before {\n  content: \"\\F46E\";\n}\n\n.mdi-sack::before {\n  content: \"\\FD0A\";\n}\n\n.mdi-sack-percent::before {\n  content: \"\\FD0B\";\n}\n\n.mdi-safe::before {\n  content: \"\\FA69\";\n}\n\n.mdi-safety-goggles::before {\n  content: \"\\FD0C\";\n}\n\n.mdi-sailing::before {\n  content: \"\\FEE5\";\n}\n\n.mdi-sale::before {\n  content: \"\\F46F\";\n}\n\n.mdi-salesforce::before {\n  content: \"\\F88D\";\n}\n\n.mdi-sass::before {\n  content: \"\\F7EB\";\n}\n\n.mdi-satellite::before {\n  content: \"\\F470\";\n}\n\n.mdi-satellite-uplink::before {\n  content: \"\\F908\";\n}\n\n.mdi-satellite-variant::before {\n  content: \"\\F471\";\n}\n\n.mdi-sausage::before {\n  content: \"\\F8B9\";\n}\n\n.mdi-saw-blade::before {\n  content: \"\\FE44\";\n}\n\n.mdi-saxophone::before {\n  content: \"\\F609\";\n}\n\n.mdi-scale::before {\n  content: \"\\F472\";\n}\n\n.mdi-scale-balance::before {\n  content: \"\\F5D1\";\n}\n\n.mdi-scale-bathroom::before {\n  content: \"\\F473\";\n}\n\n.mdi-scale-off::before {\n  content: \"\\F007C\";\n}\n\n.mdi-scanner::before {\n  content: \"\\F6AA\";\n}\n\n.mdi-scanner-off::before {\n  content: \"\\F909\";\n}\n\n.mdi-scatter-plot::before {\n  content: \"\\FEE6\";\n}\n\n.mdi-scatter-plot-outline::before {\n  content: \"\\FEE7\";\n}\n\n.mdi-school::before {\n  content: \"\\F474\";\n}\n\n.mdi-school-outline::before {\n  content: \"\\F01AB\";\n}\n\n.mdi-scissors-cutting::before {\n  content: \"\\FA6A\";\n}\n\n.mdi-screen-rotation::before {\n  content: \"\\F475\";\n}\n\n.mdi-screen-rotation-lock::before {\n  content: \"\\F476\";\n}\n\n.mdi-screw-flat-top::before {\n  content: \"\\FDCF\";\n}\n\n.mdi-screw-lag::before {\n  content: \"\\FE54\";\n}\n\n.mdi-screw-machine-flat-top::before {\n  content: \"\\FE55\";\n}\n\n.mdi-screw-machine-round-top::before {\n  content: \"\\FE56\";\n}\n\n.mdi-screw-round-top::before {\n  content: \"\\FE57\";\n}\n\n.mdi-screwdriver::before {\n  content: \"\\F477\";\n}\n\n.mdi-script::before {\n  content: \"\\FB9D\";\n}\n\n.mdi-script-outline::before {\n  content: \"\\F478\";\n}\n\n.mdi-script-text::before {\n  content: \"\\FB9E\";\n}\n\n.mdi-script-text-outline::before {\n  content: \"\\FB9F\";\n}\n\n.mdi-sd::before {\n  content: \"\\F479\";\n}\n\n.mdi-seal::before {\n  content: \"\\F47A\";\n}\n\n.mdi-seal-variant::before {\n  content: \"\\FFFA\";\n}\n\n.mdi-search-web::before {\n  content: \"\\F70E\";\n}\n\n.mdi-seat::before {\n  content: \"\\FC9F\";\n}\n\n.mdi-seat-flat::before {\n  content: \"\\F47B\";\n}\n\n.mdi-seat-flat-angled::before {\n  content: \"\\F47C\";\n}\n\n.mdi-seat-individual-suite::before {\n  content: \"\\F47D\";\n}\n\n.mdi-seat-legroom-extra::before {\n  content: \"\\F47E\";\n}\n\n.mdi-seat-legroom-normal::before {\n  content: \"\\F47F\";\n}\n\n.mdi-seat-legroom-reduced::before {\n  content: \"\\F480\";\n}\n\n.mdi-seat-outline::before {\n  content: \"\\FCA0\";\n}\n\n.mdi-seat-recline-extra::before {\n  content: \"\\F481\";\n}\n\n.mdi-seat-recline-normal::before {\n  content: \"\\F482\";\n}\n\n.mdi-seatbelt::before {\n  content: \"\\FCA1\";\n}\n\n.mdi-security::before {\n  content: \"\\F483\";\n}\n\n.mdi-security-network::before {\n  content: \"\\F484\";\n}\n\n.mdi-seed::before {\n  content: \"\\FE45\";\n}\n\n.mdi-seed-outline::before {\n  content: \"\\FE46\";\n}\n\n.mdi-segment::before {\n  content: \"\\FEE8\";\n}\n\n.mdi-select::before {\n  content: \"\\F485\";\n}\n\n.mdi-select-all::before {\n  content: \"\\F486\";\n}\n\n.mdi-select-color::before {\n  content: \"\\FD0D\";\n}\n\n.mdi-select-compare::before {\n  content: \"\\FAD8\";\n}\n\n.mdi-select-drag::before {\n  content: \"\\FA6B\";\n}\n\n.mdi-select-group::before {\n  content: \"\\FF9F\";\n}\n\n.mdi-select-inverse::before {\n  content: \"\\F487\";\n}\n\n.mdi-select-off::before {\n  content: \"\\F488\";\n}\n\n.mdi-select-place::before {\n  content: \"\\FFFB\";\n}\n\n.mdi-selection::before {\n  content: \"\\F489\";\n}\n\n.mdi-selection-drag::before {\n  content: \"\\FA6C\";\n}\n\n.mdi-selection-ellipse::before {\n  content: \"\\FD0E\";\n}\n\n.mdi-selection-ellipse-arrow-inside::before {\n  content: \"\\FF3F\";\n}\n\n.mdi-selection-off::before {\n  content: \"\\F776\";\n}\n\n.mdi-send::before {\n  content: \"\\F48A\";\n}\n\n.mdi-send-check::before {\n  content: \"\\F018C\";\n}\n\n.mdi-send-check-outline::before {\n  content: \"\\F018D\";\n}\n\n.mdi-send-circle::before {\n  content: \"\\FE58\";\n}\n\n.mdi-send-circle-outline::before {\n  content: \"\\FE59\";\n}\n\n.mdi-send-clock::before {\n  content: \"\\F018E\";\n}\n\n.mdi-send-clock-outline::before {\n  content: \"\\F018F\";\n}\n\n.mdi-send-lock::before {\n  content: \"\\F7EC\";\n}\n\n.mdi-send-lock-outline::before {\n  content: \"\\F0191\";\n}\n\n.mdi-send-outline::before {\n  content: \"\\F0190\";\n}\n\n.mdi-serial-port::before {\n  content: \"\\F65C\";\n}\n\n.mdi-server::before {\n  content: \"\\F48B\";\n}\n\n.mdi-server-minus::before {\n  content: \"\\F48C\";\n}\n\n.mdi-server-network::before {\n  content: \"\\F48D\";\n}\n\n.mdi-server-network-off::before {\n  content: \"\\F48E\";\n}\n\n.mdi-server-off::before {\n  content: \"\\F48F\";\n}\n\n.mdi-server-plus::before {\n  content: \"\\F490\";\n}\n\n.mdi-server-remove::before {\n  content: \"\\F491\";\n}\n\n.mdi-server-security::before {\n  content: \"\\F492\";\n}\n\n.mdi-set-all::before {\n  content: \"\\F777\";\n}\n\n.mdi-set-center::before {\n  content: \"\\F778\";\n}\n\n.mdi-set-center-right::before {\n  content: \"\\F779\";\n}\n\n.mdi-set-left::before {\n  content: \"\\F77A\";\n}\n\n.mdi-set-left-center::before {\n  content: \"\\F77B\";\n}\n\n.mdi-set-left-right::before {\n  content: \"\\F77C\";\n}\n\n.mdi-set-none::before {\n  content: \"\\F77D\";\n}\n\n.mdi-set-right::before {\n  content: \"\\F77E\";\n}\n\n.mdi-set-top-box::before {\n  content: \"\\F99E\";\n}\n\n.mdi-settings::before {\n  content: \"\\F493\";\n}\n\n.mdi-settings-box::before {\n  content: \"\\F494\";\n}\n\n.mdi-settings-helper::before {\n  content: \"\\FA6D\";\n}\n\n.mdi-settings-outline::before {\n  content: \"\\F8BA\";\n}\n\n.mdi-settings-transfer::before {\n  content: \"\\F007D\";\n}\n\n.mdi-settings-transfer-outline::before {\n  content: \"\\F007E\";\n}\n\n.mdi-shaker::before {\n  content: \"\\F0139\";\n}\n\n.mdi-shaker-outline::before {\n  content: \"\\F013A\";\n}\n\n.mdi-shape::before {\n  content: \"\\F830\";\n}\n\n.mdi-shape-circle-plus::before {\n  content: \"\\F65D\";\n}\n\n.mdi-shape-outline::before {\n  content: \"\\F831\";\n}\n\n.mdi-shape-plus::before {\n  content: \"\\F495\";\n}\n\n.mdi-shape-polygon-plus::before {\n  content: \"\\F65E\";\n}\n\n.mdi-shape-rectangle-plus::before {\n  content: \"\\F65F\";\n}\n\n.mdi-shape-square-plus::before {\n  content: \"\\F660\";\n}\n\n.mdi-share::before {\n  content: \"\\F496\";\n}\n\n.mdi-share-off::before {\n  content: \"\\FF40\";\n}\n\n.mdi-share-off-outline::before {\n  content: \"\\FF41\";\n}\n\n.mdi-share-outline::before {\n  content: \"\\F931\";\n}\n\n.mdi-share-variant::before {\n  content: \"\\F497\";\n}\n\n.mdi-sheep::before {\n  content: \"\\FCA2\";\n}\n\n.mdi-shield::before {\n  content: \"\\F498\";\n}\n\n.mdi-shield-account::before {\n  content: \"\\F88E\";\n}\n\n.mdi-shield-account-outline::before {\n  content: \"\\FA11\";\n}\n\n.mdi-shield-airplane::before {\n  content: \"\\F6BA\";\n}\n\n.mdi-shield-airplane-outline::before {\n  content: \"\\FCA3\";\n}\n\n.mdi-shield-alert::before {\n  content: \"\\FEE9\";\n}\n\n.mdi-shield-alert-outline::before {\n  content: \"\\FEEA\";\n}\n\n.mdi-shield-car::before {\n  content: \"\\FFA0\";\n}\n\n.mdi-shield-check::before {\n  content: \"\\F565\";\n}\n\n.mdi-shield-check-outline::before {\n  content: \"\\FCA4\";\n}\n\n.mdi-shield-cross::before {\n  content: \"\\FCA5\";\n}\n\n.mdi-shield-cross-outline::before {\n  content: \"\\FCA6\";\n}\n\n.mdi-shield-half-full::before {\n  content: \"\\F77F\";\n}\n\n.mdi-shield-home::before {\n  content: \"\\F689\";\n}\n\n.mdi-shield-home-outline::before {\n  content: \"\\FCA7\";\n}\n\n.mdi-shield-key::before {\n  content: \"\\FBA0\";\n}\n\n.mdi-shield-key-outline::before {\n  content: \"\\FBA1\";\n}\n\n.mdi-shield-link-variant::before {\n  content: \"\\FD0F\";\n}\n\n.mdi-shield-link-variant-outline::before {\n  content: \"\\FD10\";\n}\n\n.mdi-shield-lock::before {\n  content: \"\\F99C\";\n}\n\n.mdi-shield-lock-outline::before {\n  content: \"\\FCA8\";\n}\n\n.mdi-shield-off::before {\n  content: \"\\F99D\";\n}\n\n.mdi-shield-off-outline::before {\n  content: \"\\F99B\";\n}\n\n.mdi-shield-outline::before {\n  content: \"\\F499\";\n}\n\n.mdi-shield-plus::before {\n  content: \"\\FAD9\";\n}\n\n.mdi-shield-plus-outline::before {\n  content: \"\\FADA\";\n}\n\n.mdi-shield-remove::before {\n  content: \"\\FADB\";\n}\n\n.mdi-shield-remove-outline::before {\n  content: \"\\FADC\";\n}\n\n.mdi-shield-search::before {\n  content: \"\\FD76\";\n}\n\n.mdi-shield-star::before {\n  content: \"\\F0166\";\n}\n\n.mdi-shield-star-outline::before {\n  content: \"\\F0167\";\n}\n\n.mdi-shield-sun::before {\n  content: \"\\F007F\";\n}\n\n.mdi-shield-sun-outline::before {\n  content: \"\\F0080\";\n}\n\n.mdi-ship-wheel::before {\n  content: \"\\F832\";\n}\n\n.mdi-shoe-formal::before {\n  content: \"\\FB22\";\n}\n\n.mdi-shoe-heel::before {\n  content: \"\\FB23\";\n}\n\n.mdi-shoe-print::before {\n  content: \"\\FE5A\";\n}\n\n.mdi-shopify::before {\n  content: \"\\FADD\";\n}\n\n.mdi-shopping::before {\n  content: \"\\F49A\";\n}\n\n.mdi-shopping-music::before {\n  content: \"\\F49B\";\n}\n\n.mdi-shopping-search::before {\n  content: \"\\FFA1\";\n}\n\n.mdi-shovel::before {\n  content: \"\\F70F\";\n}\n\n.mdi-shovel-off::before {\n  content: \"\\F710\";\n}\n\n.mdi-shower::before {\n  content: \"\\F99F\";\n}\n\n.mdi-shower-head::before {\n  content: \"\\F9A0\";\n}\n\n.mdi-shredder::before {\n  content: \"\\F49C\";\n}\n\n.mdi-shuffle::before {\n  content: \"\\F49D\";\n}\n\n.mdi-shuffle-disabled::before {\n  content: \"\\F49E\";\n}\n\n.mdi-shuffle-variant::before {\n  content: \"\\F49F\";\n}\n\n.mdi-sigma::before {\n  content: \"\\F4A0\";\n}\n\n.mdi-sigma-lower::before {\n  content: \"\\F62B\";\n}\n\n.mdi-sign-caution::before {\n  content: \"\\F4A1\";\n}\n\n.mdi-sign-direction::before {\n  content: \"\\F780\";\n}\n\n.mdi-sign-direction-minus::before {\n  content: \"\\F0022\";\n}\n\n.mdi-sign-direction-plus::before {\n  content: \"\\FFFD\";\n}\n\n.mdi-sign-direction-remove::before {\n  content: \"\\FFFE\";\n}\n\n.mdi-sign-real-estate::before {\n  content: \"\\F0143\";\n}\n\n.mdi-sign-text::before {\n  content: \"\\F781\";\n}\n\n.mdi-signal::before {\n  content: \"\\F4A2\";\n}\n\n.mdi-signal-2g::before {\n  content: \"\\F711\";\n}\n\n.mdi-signal-3g::before {\n  content: \"\\F712\";\n}\n\n.mdi-signal-4g::before {\n  content: \"\\F713\";\n}\n\n.mdi-signal-5g::before {\n  content: \"\\FA6E\";\n}\n\n.mdi-signal-cellular-1::before {\n  content: \"\\F8BB\";\n}\n\n.mdi-signal-cellular-2::before {\n  content: \"\\F8BC\";\n}\n\n.mdi-signal-cellular-3::before {\n  content: \"\\F8BD\";\n}\n\n.mdi-signal-cellular-outline::before {\n  content: \"\\F8BE\";\n}\n\n.mdi-signal-distance-variant::before {\n  content: \"\\FE47\";\n}\n\n.mdi-signal-hspa::before {\n  content: \"\\F714\";\n}\n\n.mdi-signal-hspa-plus::before {\n  content: \"\\F715\";\n}\n\n.mdi-signal-off::before {\n  content: \"\\F782\";\n}\n\n.mdi-signal-variant::before {\n  content: \"\\F60A\";\n}\n\n.mdi-signature::before {\n  content: \"\\FE5B\";\n}\n\n.mdi-signature-freehand::before {\n  content: \"\\FE5C\";\n}\n\n.mdi-signature-image::before {\n  content: \"\\FE5D\";\n}\n\n.mdi-signature-text::before {\n  content: \"\\FE5E\";\n}\n\n.mdi-silo::before {\n  content: \"\\FB24\";\n}\n\n.mdi-silverware::before {\n  content: \"\\F4A3\";\n}\n\n.mdi-silverware-clean::before {\n  content: \"\\FFFF\";\n}\n\n.mdi-silverware-fork::before {\n  content: \"\\F4A4\";\n}\n\n.mdi-silverware-fork-knife::before {\n  content: \"\\FA6F\";\n}\n\n.mdi-silverware-spoon::before {\n  content: \"\\F4A5\";\n}\n\n.mdi-silverware-variant::before {\n  content: \"\\F4A6\";\n}\n\n.mdi-sim::before {\n  content: \"\\F4A7\";\n}\n\n.mdi-sim-alert::before {\n  content: \"\\F4A8\";\n}\n\n.mdi-sim-off::before {\n  content: \"\\F4A9\";\n}\n\n.mdi-sina-weibo::before {\n  content: \"\\FADE\";\n}\n\n.mdi-sitemap::before {\n  content: \"\\F4AA\";\n}\n\n.mdi-skate::before {\n  content: \"\\FD11\";\n}\n\n.mdi-skew-less::before {\n  content: \"\\FD12\";\n}\n\n.mdi-skew-more::before {\n  content: \"\\FD13\";\n}\n\n.mdi-skip-backward::before {\n  content: \"\\F4AB\";\n}\n\n.mdi-skip-backward-outline::before {\n  content: \"\\FF42\";\n}\n\n.mdi-skip-forward::before {\n  content: \"\\F4AC\";\n}\n\n.mdi-skip-forward-outline::before {\n  content: \"\\FF43\";\n}\n\n.mdi-skip-next::before {\n  content: \"\\F4AD\";\n}\n\n.mdi-skip-next-circle::before {\n  content: \"\\F661\";\n}\n\n.mdi-skip-next-circle-outline::before {\n  content: \"\\F662\";\n}\n\n.mdi-skip-next-outline::before {\n  content: \"\\FF44\";\n}\n\n.mdi-skip-previous::before {\n  content: \"\\F4AE\";\n}\n\n.mdi-skip-previous-circle::before {\n  content: \"\\F663\";\n}\n\n.mdi-skip-previous-circle-outline::before {\n  content: \"\\F664\";\n}\n\n.mdi-skip-previous-outline::before {\n  content: \"\\FF45\";\n}\n\n.mdi-skull::before {\n  content: \"\\F68B\";\n}\n\n.mdi-skull-crossbones::before {\n  content: \"\\FBA2\";\n}\n\n.mdi-skull-crossbones-outline::before {\n  content: \"\\FBA3\";\n}\n\n.mdi-skull-outline::before {\n  content: \"\\FBA4\";\n}\n\n.mdi-skype::before {\n  content: \"\\F4AF\";\n}\n\n.mdi-skype-business::before {\n  content: \"\\F4B0\";\n}\n\n.mdi-slack::before {\n  content: \"\\F4B1\";\n}\n\n.mdi-slackware::before {\n  content: \"\\F90A\";\n}\n\n.mdi-slash-forward::before {\n  content: \"\\F0000\";\n}\n\n.mdi-slash-forward-box::before {\n  content: \"\\F0001\";\n}\n\n.mdi-sleep::before {\n  content: \"\\F4B2\";\n}\n\n.mdi-sleep-off::before {\n  content: \"\\F4B3\";\n}\n\n.mdi-slope-downhill::before {\n  content: \"\\FE5F\";\n}\n\n.mdi-slope-uphill::before {\n  content: \"\\FE60\";\n}\n\n.mdi-slot-machine::before {\n  content: \"\\F013F\";\n}\n\n.mdi-slot-machine-outline::before {\n  content: \"\\F0140\";\n}\n\n.mdi-smart-card::before {\n  content: \"\\F00E8\";\n}\n\n.mdi-smart-card-outline::before {\n  content: \"\\F00E9\";\n}\n\n.mdi-smart-card-reader::before {\n  content: \"\\F00EA\";\n}\n\n.mdi-smart-card-reader-outline::before {\n  content: \"\\F00EB\";\n}\n\n.mdi-smog::before {\n  content: \"\\FA70\";\n}\n\n.mdi-smoke-detector::before {\n  content: \"\\F392\";\n}\n\n.mdi-smoking::before {\n  content: \"\\F4B4\";\n}\n\n.mdi-smoking-off::before {\n  content: \"\\F4B5\";\n}\n\n.mdi-snapchat::before {\n  content: \"\\F4B6\";\n}\n\n.mdi-snowflake::before {\n  content: \"\\F716\";\n}\n\n.mdi-snowflake-alert::before {\n  content: \"\\FF46\";\n}\n\n.mdi-snowflake-variant::before {\n  content: \"\\FF47\";\n}\n\n.mdi-snowman::before {\n  content: \"\\F4B7\";\n}\n\n.mdi-soccer::before {\n  content: \"\\F4B8\";\n}\n\n.mdi-soccer-field::before {\n  content: \"\\F833\";\n}\n\n.mdi-sofa::before {\n  content: \"\\F4B9\";\n}\n\n.mdi-solar-panel::before {\n  content: \"\\FD77\";\n}\n\n.mdi-solar-panel-large::before {\n  content: \"\\FD78\";\n}\n\n.mdi-solar-power::before {\n  content: \"\\FA71\";\n}\n\n.mdi-soldering-iron::before {\n  content: \"\\F00BD\";\n}\n\n.mdi-solid::before {\n  content: \"\\F68C\";\n}\n\n.mdi-sort::before {\n  content: \"\\F4BA\";\n}\n\n.mdi-sort-alphabetical::before {\n  content: \"\\F4BB\";\n}\n\n.mdi-sort-alphabetical-ascending::before {\n  content: \"\\F0173\";\n}\n\n.mdi-sort-alphabetical-descending::before {\n  content: \"\\F0174\";\n}\n\n.mdi-sort-ascending::before {\n  content: \"\\F4BC\";\n}\n\n.mdi-sort-descending::before {\n  content: \"\\F4BD\";\n}\n\n.mdi-sort-numeric::before {\n  content: \"\\F4BE\";\n}\n\n.mdi-sort-variant::before {\n  content: \"\\F4BF\";\n}\n\n.mdi-sort-variant-lock::before {\n  content: \"\\FCA9\";\n}\n\n.mdi-sort-variant-lock-open::before {\n  content: \"\\FCAA\";\n}\n\n.mdi-sort-variant-remove::before {\n  content: \"\\F0172\";\n}\n\n.mdi-soundcloud::before {\n  content: \"\\F4C0\";\n}\n\n.mdi-source-branch::before {\n  content: \"\\F62C\";\n}\n\n.mdi-source-commit::before {\n  content: \"\\F717\";\n}\n\n.mdi-source-commit-end::before {\n  content: \"\\F718\";\n}\n\n.mdi-source-commit-end-local::before {\n  content: \"\\F719\";\n}\n\n.mdi-source-commit-local::before {\n  content: \"\\F71A\";\n}\n\n.mdi-source-commit-next-local::before {\n  content: \"\\F71B\";\n}\n\n.mdi-source-commit-start::before {\n  content: \"\\F71C\";\n}\n\n.mdi-source-commit-start-next-local::before {\n  content: \"\\F71D\";\n}\n\n.mdi-source-fork::before {\n  content: \"\\F4C1\";\n}\n\n.mdi-source-merge::before {\n  content: \"\\F62D\";\n}\n\n.mdi-source-pull::before {\n  content: \"\\F4C2\";\n}\n\n.mdi-source-repository::before {\n  content: \"\\FCAB\";\n}\n\n.mdi-source-repository-multiple::before {\n  content: \"\\FCAC\";\n}\n\n.mdi-soy-sauce::before {\n  content: \"\\F7ED\";\n}\n\n.mdi-spa::before {\n  content: \"\\FCAD\";\n}\n\n.mdi-spa-outline::before {\n  content: \"\\FCAE\";\n}\n\n.mdi-space-invaders::before {\n  content: \"\\FBA5\";\n}\n\n.mdi-spade::before {\n  content: \"\\FE48\";\n}\n\n.mdi-speaker::before {\n  content: \"\\F4C3\";\n}\n\n.mdi-speaker-bluetooth::before {\n  content: \"\\F9A1\";\n}\n\n.mdi-speaker-multiple::before {\n  content: \"\\FD14\";\n}\n\n.mdi-speaker-off::before {\n  content: \"\\F4C4\";\n}\n\n.mdi-speaker-wireless::before {\n  content: \"\\F71E\";\n}\n\n.mdi-speedometer::before {\n  content: \"\\F4C5\";\n}\n\n.mdi-speedometer-medium::before {\n  content: \"\\FFA2\";\n}\n\n.mdi-speedometer-slow::before {\n  content: \"\\FFA3\";\n}\n\n.mdi-spellcheck::before {\n  content: \"\\F4C6\";\n}\n\n.mdi-spider-web::before {\n  content: \"\\FBA6\";\n}\n\n.mdi-spotify::before {\n  content: \"\\F4C7\";\n}\n\n.mdi-spotlight::before {\n  content: \"\\F4C8\";\n}\n\n.mdi-spotlight-beam::before {\n  content: \"\\F4C9\";\n}\n\n.mdi-spray::before {\n  content: \"\\F665\";\n}\n\n.mdi-spray-bottle::before {\n  content: \"\\FADF\";\n}\n\n.mdi-sprinkler::before {\n  content: \"\\F0081\";\n}\n\n.mdi-sprinkler-variant::before {\n  content: \"\\F0082\";\n}\n\n.mdi-sprout::before {\n  content: \"\\FE49\";\n}\n\n.mdi-sprout-outline::before {\n  content: \"\\FE4A\";\n}\n\n.mdi-square::before {\n  content: \"\\F763\";\n}\n\n.mdi-square-edit-outline::before {\n  content: \"\\F90B\";\n}\n\n.mdi-square-inc::before {\n  content: \"\\F4CA\";\n}\n\n.mdi-square-inc-cash::before {\n  content: \"\\F4CB\";\n}\n\n.mdi-square-medium::before {\n  content: \"\\FA12\";\n}\n\n.mdi-square-medium-outline::before {\n  content: \"\\FA13\";\n}\n\n.mdi-square-outline::before {\n  content: \"\\F762\";\n}\n\n.mdi-square-root::before {\n  content: \"\\F783\";\n}\n\n.mdi-square-root-box::before {\n  content: \"\\F9A2\";\n}\n\n.mdi-square-small::before {\n  content: \"\\FA14\";\n}\n\n.mdi-squeegee::before {\n  content: \"\\FAE0\";\n}\n\n.mdi-ssh::before {\n  content: \"\\F8BF\";\n}\n\n.mdi-stack-exchange::before {\n  content: \"\\F60B\";\n}\n\n.mdi-stack-overflow::before {\n  content: \"\\F4CC\";\n}\n\n.mdi-stadium::before {\n  content: \"\\F001A\";\n}\n\n.mdi-stadium-variant::before {\n  content: \"\\F71F\";\n}\n\n.mdi-stairs::before {\n  content: \"\\F4CD\";\n}\n\n.mdi-stamper::before {\n  content: \"\\FD15\";\n}\n\n.mdi-standard-definition::before {\n  content: \"\\F7EE\";\n}\n\n.mdi-star::before {\n  content: \"\\F4CE\";\n}\n\n.mdi-star-box::before {\n  content: \"\\FA72\";\n}\n\n.mdi-star-box-outline::before {\n  content: \"\\FA73\";\n}\n\n.mdi-star-circle::before {\n  content: \"\\F4CF\";\n}\n\n.mdi-star-circle-outline::before {\n  content: \"\\F9A3\";\n}\n\n.mdi-star-face::before {\n  content: \"\\F9A4\";\n}\n\n.mdi-star-four-points::before {\n  content: \"\\FAE1\";\n}\n\n.mdi-star-four-points-outline::before {\n  content: \"\\FAE2\";\n}\n\n.mdi-star-half::before {\n  content: \"\\F4D0\";\n}\n\n.mdi-star-off::before {\n  content: \"\\F4D1\";\n}\n\n.mdi-star-outline::before {\n  content: \"\\F4D2\";\n}\n\n.mdi-star-three-points::before {\n  content: \"\\FAE3\";\n}\n\n.mdi-star-three-points-outline::before {\n  content: \"\\FAE4\";\n}\n\n.mdi-steam::before {\n  content: \"\\F4D3\";\n}\n\n.mdi-steam-box::before {\n  content: \"\\F90C\";\n}\n\n.mdi-steering::before {\n  content: \"\\F4D4\";\n}\n\n.mdi-steering-off::before {\n  content: \"\\F90D\";\n}\n\n.mdi-step-backward::before {\n  content: \"\\F4D5\";\n}\n\n.mdi-step-backward-2::before {\n  content: \"\\F4D6\";\n}\n\n.mdi-step-forward::before {\n  content: \"\\F4D7\";\n}\n\n.mdi-step-forward-2::before {\n  content: \"\\F4D8\";\n}\n\n.mdi-stethoscope::before {\n  content: \"\\F4D9\";\n}\n\n.mdi-sticker::before {\n  content: \"\\F5D0\";\n}\n\n.mdi-sticker-emoji::before {\n  content: \"\\F784\";\n}\n\n.mdi-stocking::before {\n  content: \"\\F4DA\";\n}\n\n.mdi-stomach::before {\n  content: \"\\F00BE\";\n}\n\n.mdi-stop::before {\n  content: \"\\F4DB\";\n}\n\n.mdi-stop-circle::before {\n  content: \"\\F666\";\n}\n\n.mdi-stop-circle-outline::before {\n  content: \"\\F667\";\n}\n\n.mdi-store::before {\n  content: \"\\F4DC\";\n}\n\n.mdi-store-24-hour::before {\n  content: \"\\F4DD\";\n}\n\n.mdi-storefront::before {\n  content: \"\\F00EC\";\n}\n\n.mdi-stove::before {\n  content: \"\\F4DE\";\n}\n\n.mdi-strava::before {\n  content: \"\\FB25\";\n}\n\n.mdi-stretch-to-page::before {\n  content: \"\\FF48\";\n}\n\n.mdi-stretch-to-page-outline::before {\n  content: \"\\FF49\";\n}\n\n.mdi-subdirectory-arrow-left::before {\n  content: \"\\F60C\";\n}\n\n.mdi-subdirectory-arrow-right::before {\n  content: \"\\F60D\";\n}\n\n.mdi-subtitles::before {\n  content: \"\\FA15\";\n}\n\n.mdi-subtitles-outline::before {\n  content: \"\\FA16\";\n}\n\n.mdi-subway::before {\n  content: \"\\F6AB\";\n}\n\n.mdi-subway-alert-variant::before {\n  content: \"\\FD79\";\n}\n\n.mdi-subway-variant::before {\n  content: \"\\F4DF\";\n}\n\n.mdi-summit::before {\n  content: \"\\F785\";\n}\n\n.mdi-sunglasses::before {\n  content: \"\\F4E0\";\n}\n\n.mdi-surround-sound::before {\n  content: \"\\F5C5\";\n}\n\n.mdi-surround-sound-2-0::before {\n  content: \"\\F7EF\";\n}\n\n.mdi-surround-sound-3-1::before {\n  content: \"\\F7F0\";\n}\n\n.mdi-surround-sound-5-1::before {\n  content: \"\\F7F1\";\n}\n\n.mdi-surround-sound-7-1::before {\n  content: \"\\F7F2\";\n}\n\n.mdi-svg::before {\n  content: \"\\F720\";\n}\n\n.mdi-swap-horizontal::before {\n  content: \"\\F4E1\";\n}\n\n.mdi-swap-horizontal-bold::before {\n  content: \"\\FBA9\";\n}\n\n.mdi-swap-horizontal-circle::before {\n  content: \"\\F0002\";\n}\n\n.mdi-swap-horizontal-circle-outline::before {\n  content: \"\\F0003\";\n}\n\n.mdi-swap-horizontal-variant::before {\n  content: \"\\F8C0\";\n}\n\n.mdi-swap-vertical::before {\n  content: \"\\F4E2\";\n}\n\n.mdi-swap-vertical-bold::before {\n  content: \"\\FBAA\";\n}\n\n.mdi-swap-vertical-circle::before {\n  content: \"\\F0004\";\n}\n\n.mdi-swap-vertical-circle-outline::before {\n  content: \"\\F0005\";\n}\n\n.mdi-swap-vertical-variant::before {\n  content: \"\\F8C1\";\n}\n\n.mdi-swim::before {\n  content: \"\\F4E3\";\n}\n\n.mdi-switch::before {\n  content: \"\\F4E4\";\n}\n\n.mdi-sword::before {\n  content: \"\\F4E5\";\n}\n\n.mdi-sword-cross::before {\n  content: \"\\F786\";\n}\n\n.mdi-symfony::before {\n  content: \"\\FAE5\";\n}\n\n.mdi-sync::before {\n  content: \"\\F4E6\";\n}\n\n.mdi-sync-alert::before {\n  content: \"\\F4E7\";\n}\n\n.mdi-sync-off::before {\n  content: \"\\F4E8\";\n}\n\n.mdi-tab::before {\n  content: \"\\F4E9\";\n}\n\n.mdi-tab-minus::before {\n  content: \"\\FB26\";\n}\n\n.mdi-tab-plus::before {\n  content: \"\\F75B\";\n}\n\n.mdi-tab-remove::before {\n  content: \"\\FB27\";\n}\n\n.mdi-tab-unselected::before {\n  content: \"\\F4EA\";\n}\n\n.mdi-table::before {\n  content: \"\\F4EB\";\n}\n\n.mdi-table-border::before {\n  content: \"\\FA17\";\n}\n\n.mdi-table-chair::before {\n  content: \"\\F0083\";\n}\n\n.mdi-table-column::before {\n  content: \"\\F834\";\n}\n\n.mdi-table-column-plus-after::before {\n  content: \"\\F4EC\";\n}\n\n.mdi-table-column-plus-before::before {\n  content: \"\\F4ED\";\n}\n\n.mdi-table-column-remove::before {\n  content: \"\\F4EE\";\n}\n\n.mdi-table-column-width::before {\n  content: \"\\F4EF\";\n}\n\n.mdi-table-edit::before {\n  content: \"\\F4F0\";\n}\n\n.mdi-table-eye::before {\n  content: \"\\F00BF\";\n}\n\n.mdi-table-large::before {\n  content: \"\\F4F1\";\n}\n\n.mdi-table-large-plus::before {\n  content: \"\\FFA4\";\n}\n\n.mdi-table-large-remove::before {\n  content: \"\\FFA5\";\n}\n\n.mdi-table-merge-cells::before {\n  content: \"\\F9A5\";\n}\n\n.mdi-table-of-contents::before {\n  content: \"\\F835\";\n}\n\n.mdi-table-plus::before {\n  content: \"\\FA74\";\n}\n\n.mdi-table-remove::before {\n  content: \"\\FA75\";\n}\n\n.mdi-table-row::before {\n  content: \"\\F836\";\n}\n\n.mdi-table-row-height::before {\n  content: \"\\F4F2\";\n}\n\n.mdi-table-row-plus-after::before {\n  content: \"\\F4F3\";\n}\n\n.mdi-table-row-plus-before::before {\n  content: \"\\F4F4\";\n}\n\n.mdi-table-row-remove::before {\n  content: \"\\F4F5\";\n}\n\n.mdi-table-search::before {\n  content: \"\\F90E\";\n}\n\n.mdi-table-settings::before {\n  content: \"\\F837\";\n}\n\n.mdi-table-tennis::before {\n  content: \"\\FE4B\";\n}\n\n.mdi-tablet::before {\n  content: \"\\F4F6\";\n}\n\n.mdi-tablet-android::before {\n  content: \"\\F4F7\";\n}\n\n.mdi-tablet-cellphone::before {\n  content: \"\\F9A6\";\n}\n\n.mdi-tablet-dashboard::before {\n  content: \"\\FEEB\";\n}\n\n.mdi-tablet-ipad::before {\n  content: \"\\F4F8\";\n}\n\n.mdi-taco::before {\n  content: \"\\F761\";\n}\n\n.mdi-tag::before {\n  content: \"\\F4F9\";\n}\n\n.mdi-tag-faces::before {\n  content: \"\\F4FA\";\n}\n\n.mdi-tag-heart::before {\n  content: \"\\F68A\";\n}\n\n.mdi-tag-heart-outline::before {\n  content: \"\\FBAB\";\n}\n\n.mdi-tag-minus::before {\n  content: \"\\F90F\";\n}\n\n.mdi-tag-multiple::before {\n  content: \"\\F4FB\";\n}\n\n.mdi-tag-outline::before {\n  content: \"\\F4FC\";\n}\n\n.mdi-tag-plus::before {\n  content: \"\\F721\";\n}\n\n.mdi-tag-remove::before {\n  content: \"\\F722\";\n}\n\n.mdi-tag-text-outline::before {\n  content: \"\\F4FD\";\n}\n\n.mdi-tank::before {\n  content: \"\\FD16\";\n}\n\n.mdi-tanker-truck::before {\n  content: \"\\F0006\";\n}\n\n.mdi-tape-measure::before {\n  content: \"\\FB28\";\n}\n\n.mdi-target::before {\n  content: \"\\F4FE\";\n}\n\n.mdi-target-account::before {\n  content: \"\\FBAC\";\n}\n\n.mdi-target-variant::before {\n  content: \"\\FA76\";\n}\n\n.mdi-taxi::before {\n  content: \"\\F4FF\";\n}\n\n.mdi-tea::before {\n  content: \"\\FD7A\";\n}\n\n.mdi-tea-outline::before {\n  content: \"\\FD7B\";\n}\n\n.mdi-teach::before {\n  content: \"\\F88F\";\n}\n\n.mdi-teamviewer::before {\n  content: \"\\F500\";\n}\n\n.mdi-telegram::before {\n  content: \"\\F501\";\n}\n\n.mdi-telescope::before {\n  content: \"\\FB29\";\n}\n\n.mdi-television::before {\n  content: \"\\F502\";\n}\n\n.mdi-television-box::before {\n  content: \"\\F838\";\n}\n\n.mdi-television-classic::before {\n  content: \"\\F7F3\";\n}\n\n.mdi-television-classic-off::before {\n  content: \"\\F839\";\n}\n\n.mdi-television-clean::before {\n  content: \"\\F013B\";\n}\n\n.mdi-television-guide::before {\n  content: \"\\F503\";\n}\n\n.mdi-television-off::before {\n  content: \"\\F83A\";\n}\n\n.mdi-television-pause::before {\n  content: \"\\FFA6\";\n}\n\n.mdi-television-play::before {\n  content: \"\\FEEC\";\n}\n\n.mdi-television-stop::before {\n  content: \"\\FFA7\";\n}\n\n.mdi-temperature-celsius::before {\n  content: \"\\F504\";\n}\n\n.mdi-temperature-fahrenheit::before {\n  content: \"\\F505\";\n}\n\n.mdi-temperature-kelvin::before {\n  content: \"\\F506\";\n}\n\n.mdi-tennis::before {\n  content: \"\\FD7C\";\n}\n\n.mdi-tennis-ball::before {\n  content: \"\\F507\";\n}\n\n.mdi-tent::before {\n  content: \"\\F508\";\n}\n\n.mdi-terraform::before {\n  content: \"\\F0084\";\n}\n\n.mdi-terrain::before {\n  content: \"\\F509\";\n}\n\n.mdi-test-tube::before {\n  content: \"\\F668\";\n}\n\n.mdi-test-tube-empty::before {\n  content: \"\\F910\";\n}\n\n.mdi-test-tube-off::before {\n  content: \"\\F911\";\n}\n\n.mdi-text::before {\n  content: \"\\F9A7\";\n}\n\n.mdi-text-recognition::before {\n  content: \"\\F0168\";\n}\n\n.mdi-text-shadow::before {\n  content: \"\\F669\";\n}\n\n.mdi-text-short::before {\n  content: \"\\F9A8\";\n}\n\n.mdi-text-subject::before {\n  content: \"\\F9A9\";\n}\n\n.mdi-text-to-speech::before {\n  content: \"\\F50A\";\n}\n\n.mdi-text-to-speech-off::before {\n  content: \"\\F50B\";\n}\n\n.mdi-textarea::before {\n  content: \"\\F00C0\";\n}\n\n.mdi-textbox::before {\n  content: \"\\F60E\";\n}\n\n.mdi-textbox-password::before {\n  content: \"\\F7F4\";\n}\n\n.mdi-texture::before {\n  content: \"\\F50C\";\n}\n\n.mdi-texture-box::before {\n  content: \"\\F0007\";\n}\n\n.mdi-theater::before {\n  content: \"\\F50D\";\n}\n\n.mdi-theme-light-dark::before {\n  content: \"\\F50E\";\n}\n\n.mdi-thermometer::before {\n  content: \"\\F50F\";\n}\n\n.mdi-thermometer-alert::before {\n  content: \"\\FE61\";\n}\n\n.mdi-thermometer-chevron-down::before {\n  content: \"\\FE62\";\n}\n\n.mdi-thermometer-chevron-up::before {\n  content: \"\\FE63\";\n}\n\n.mdi-thermometer-high::before {\n  content: \"\\F00ED\";\n}\n\n.mdi-thermometer-lines::before {\n  content: \"\\F510\";\n}\n\n.mdi-thermometer-low::before {\n  content: \"\\F00EE\";\n}\n\n.mdi-thermometer-minus::before {\n  content: \"\\FE64\";\n}\n\n.mdi-thermometer-plus::before {\n  content: \"\\FE65\";\n}\n\n.mdi-thermostat::before {\n  content: \"\\F393\";\n}\n\n.mdi-thermostat-box::before {\n  content: \"\\F890\";\n}\n\n.mdi-thought-bubble::before {\n  content: \"\\F7F5\";\n}\n\n.mdi-thought-bubble-outline::before {\n  content: \"\\F7F6\";\n}\n\n.mdi-thumb-down::before {\n  content: \"\\F511\";\n}\n\n.mdi-thumb-down-outline::before {\n  content: \"\\F512\";\n}\n\n.mdi-thumb-up::before {\n  content: \"\\F513\";\n}\n\n.mdi-thumb-up-outline::before {\n  content: \"\\F514\";\n}\n\n.mdi-thumbs-up-down::before {\n  content: \"\\F515\";\n}\n\n.mdi-ticket::before {\n  content: \"\\F516\";\n}\n\n.mdi-ticket-account::before {\n  content: \"\\F517\";\n}\n\n.mdi-ticket-confirmation::before {\n  content: \"\\F518\";\n}\n\n.mdi-ticket-outline::before {\n  content: \"\\F912\";\n}\n\n.mdi-ticket-percent::before {\n  content: \"\\F723\";\n}\n\n.mdi-tie::before {\n  content: \"\\F519\";\n}\n\n.mdi-tilde::before {\n  content: \"\\F724\";\n}\n\n.mdi-timelapse::before {\n  content: \"\\F51A\";\n}\n\n.mdi-timeline::before {\n  content: \"\\FBAD\";\n}\n\n.mdi-timeline-alert::before {\n  content: \"\\FFB2\";\n}\n\n.mdi-timeline-alert-outline::before {\n  content: \"\\FFB5\";\n}\n\n.mdi-timeline-help::before {\n  content: \"\\FFB6\";\n}\n\n.mdi-timeline-help-outline::before {\n  content: \"\\FFB7\";\n}\n\n.mdi-timeline-outline::before {\n  content: \"\\FBAE\";\n}\n\n.mdi-timeline-plus::before {\n  content: \"\\FFB3\";\n}\n\n.mdi-timeline-plus-outline::before {\n  content: \"\\FFB4\";\n}\n\n.mdi-timeline-text::before {\n  content: \"\\FBAF\";\n}\n\n.mdi-timeline-text-outline::before {\n  content: \"\\FBB0\";\n}\n\n.mdi-timer::before {\n  content: \"\\F51B\";\n}\n\n.mdi-timer-10::before {\n  content: \"\\F51C\";\n}\n\n.mdi-timer-3::before {\n  content: \"\\F51D\";\n}\n\n.mdi-timer-off::before {\n  content: \"\\F51E\";\n}\n\n.mdi-timer-sand::before {\n  content: \"\\F51F\";\n}\n\n.mdi-timer-sand-empty::before {\n  content: \"\\F6AC\";\n}\n\n.mdi-timer-sand-full::before {\n  content: \"\\F78B\";\n}\n\n.mdi-timetable::before {\n  content: \"\\F520\";\n}\n\n.mdi-toaster::before {\n  content: \"\\F0085\";\n}\n\n.mdi-toaster-oven::before {\n  content: \"\\FCAF\";\n}\n\n.mdi-toggle-switch::before {\n  content: \"\\F521\";\n}\n\n.mdi-toggle-switch-off::before {\n  content: \"\\F522\";\n}\n\n.mdi-toggle-switch-off-outline::before {\n  content: \"\\FA18\";\n}\n\n.mdi-toggle-switch-outline::before {\n  content: \"\\FA19\";\n}\n\n.mdi-toilet::before {\n  content: \"\\F9AA\";\n}\n\n.mdi-toolbox::before {\n  content: \"\\F9AB\";\n}\n\n.mdi-toolbox-outline::before {\n  content: \"\\F9AC\";\n}\n\n.mdi-tools::before {\n  content: \"\\F0086\";\n}\n\n.mdi-tooltip::before {\n  content: \"\\F523\";\n}\n\n.mdi-tooltip-account::before {\n  content: \"\\F00C\";\n}\n\n.mdi-tooltip-edit::before {\n  content: \"\\F524\";\n}\n\n.mdi-tooltip-image::before {\n  content: \"\\F525\";\n}\n\n.mdi-tooltip-image-outline::before {\n  content: \"\\FBB1\";\n}\n\n.mdi-tooltip-outline::before {\n  content: \"\\F526\";\n}\n\n.mdi-tooltip-plus::before {\n  content: \"\\FBB2\";\n}\n\n.mdi-tooltip-plus-outline::before {\n  content: \"\\F527\";\n}\n\n.mdi-tooltip-text::before {\n  content: \"\\F528\";\n}\n\n.mdi-tooltip-text-outline::before {\n  content: \"\\FBB3\";\n}\n\n.mdi-tooth::before {\n  content: \"\\F8C2\";\n}\n\n.mdi-tooth-outline::before {\n  content: \"\\F529\";\n}\n\n.mdi-toothbrush::before {\n  content: \"\\F0154\";\n}\n\n.mdi-toothbrush-electric::before {\n  content: \"\\F0157\";\n}\n\n.mdi-toothbrush-paste::before {\n  content: \"\\F0155\";\n}\n\n.mdi-tor::before {\n  content: \"\\F52A\";\n}\n\n.mdi-tortoise::before {\n  content: \"\\FD17\";\n}\n\n.mdi-tournament::before {\n  content: \"\\F9AD\";\n}\n\n.mdi-tower-beach::before {\n  content: \"\\F680\";\n}\n\n.mdi-tower-fire::before {\n  content: \"\\F681\";\n}\n\n.mdi-towing::before {\n  content: \"\\F83B\";\n}\n\n.mdi-track-light::before {\n  content: \"\\F913\";\n}\n\n.mdi-trackpad::before {\n  content: \"\\F7F7\";\n}\n\n.mdi-trackpad-lock::before {\n  content: \"\\F932\";\n}\n\n.mdi-tractor::before {\n  content: \"\\F891\";\n}\n\n.mdi-trademark::before {\n  content: \"\\FA77\";\n}\n\n.mdi-traffic-light::before {\n  content: \"\\F52B\";\n}\n\n.mdi-train::before {\n  content: \"\\F52C\";\n}\n\n.mdi-train-car::before {\n  content: \"\\FBB4\";\n}\n\n.mdi-train-variant::before {\n  content: \"\\F8C3\";\n}\n\n.mdi-tram::before {\n  content: \"\\F52D\";\n}\n\n.mdi-tram-side::before {\n  content: \"\\F0008\";\n}\n\n.mdi-transcribe::before {\n  content: \"\\F52E\";\n}\n\n.mdi-transcribe-close::before {\n  content: \"\\F52F\";\n}\n\n.mdi-transfer::before {\n  content: \"\\F0087\";\n}\n\n.mdi-transfer-down::before {\n  content: \"\\FD7D\";\n}\n\n.mdi-transfer-left::before {\n  content: \"\\FD7E\";\n}\n\n.mdi-transfer-right::before {\n  content: \"\\F530\";\n}\n\n.mdi-transfer-up::before {\n  content: \"\\FD7F\";\n}\n\n.mdi-transit-connection::before {\n  content: \"\\FD18\";\n}\n\n.mdi-transit-connection-variant::before {\n  content: \"\\FD19\";\n}\n\n.mdi-transit-detour::before {\n  content: \"\\FFA8\";\n}\n\n.mdi-transit-transfer::before {\n  content: \"\\F6AD\";\n}\n\n.mdi-transition::before {\n  content: \"\\F914\";\n}\n\n.mdi-transition-masked::before {\n  content: \"\\F915\";\n}\n\n.mdi-translate::before {\n  content: \"\\F5CA\";\n}\n\n.mdi-translate-off::before {\n  content: \"\\FE66\";\n}\n\n.mdi-transmission-tower::before {\n  content: \"\\FD1A\";\n}\n\n.mdi-trash-can::before {\n  content: \"\\FA78\";\n}\n\n.mdi-trash-can-outline::before {\n  content: \"\\FA79\";\n}\n\n.mdi-treasure-chest::before {\n  content: \"\\F725\";\n}\n\n.mdi-tree::before {\n  content: \"\\F531\";\n}\n\n.mdi-tree-outline::before {\n  content: \"\\FE4C\";\n}\n\n.mdi-trello::before {\n  content: \"\\F532\";\n}\n\n.mdi-trending-down::before {\n  content: \"\\F533\";\n}\n\n.mdi-trending-neutral::before {\n  content: \"\\F534\";\n}\n\n.mdi-trending-up::before {\n  content: \"\\F535\";\n}\n\n.mdi-triangle::before {\n  content: \"\\F536\";\n}\n\n.mdi-triangle-outline::before {\n  content: \"\\F537\";\n}\n\n.mdi-triforce::before {\n  content: \"\\FBB5\";\n}\n\n.mdi-trophy::before {\n  content: \"\\F538\";\n}\n\n.mdi-trophy-award::before {\n  content: \"\\F539\";\n}\n\n.mdi-trophy-broken::before {\n  content: \"\\FD80\";\n}\n\n.mdi-trophy-outline::before {\n  content: \"\\F53A\";\n}\n\n.mdi-trophy-variant::before {\n  content: \"\\F53B\";\n}\n\n.mdi-trophy-variant-outline::before {\n  content: \"\\F53C\";\n}\n\n.mdi-truck::before {\n  content: \"\\F53D\";\n}\n\n.mdi-truck-check::before {\n  content: \"\\FCB0\";\n}\n\n.mdi-truck-delivery::before {\n  content: \"\\F53E\";\n}\n\n.mdi-truck-fast::before {\n  content: \"\\F787\";\n}\n\n.mdi-truck-trailer::before {\n  content: \"\\F726\";\n}\n\n.mdi-trumpet::before {\n  content: \"\\F00C1\";\n}\n\n.mdi-tshirt-crew::before {\n  content: \"\\FA7A\";\n}\n\n.mdi-tshirt-crew-outline::before {\n  content: \"\\F53F\";\n}\n\n.mdi-tshirt-v::before {\n  content: \"\\FA7B\";\n}\n\n.mdi-tshirt-v-outline::before {\n  content: \"\\F540\";\n}\n\n.mdi-tumble-dryer::before {\n  content: \"\\F916\";\n}\n\n.mdi-tumblr::before {\n  content: \"\\F541\";\n}\n\n.mdi-tumblr-box::before {\n  content: \"\\F917\";\n}\n\n.mdi-tumblr-reblog::before {\n  content: \"\\F542\";\n}\n\n.mdi-tune::before {\n  content: \"\\F62E\";\n}\n\n.mdi-tune-vertical::before {\n  content: \"\\F66A\";\n}\n\n.mdi-turnstile::before {\n  content: \"\\FCB1\";\n}\n\n.mdi-turnstile-outline::before {\n  content: \"\\FCB2\";\n}\n\n.mdi-turtle::before {\n  content: \"\\FCB3\";\n}\n\n.mdi-twitch::before {\n  content: \"\\F543\";\n}\n\n.mdi-twitter::before {\n  content: \"\\F544\";\n}\n\n.mdi-twitter-box::before {\n  content: \"\\F545\";\n}\n\n.mdi-twitter-circle::before {\n  content: \"\\F546\";\n}\n\n.mdi-twitter-retweet::before {\n  content: \"\\F547\";\n}\n\n.mdi-two-factor-authentication::before {\n  content: \"\\F9AE\";\n}\n\n.mdi-typewriter::before {\n  content: \"\\FF4A\";\n}\n\n.mdi-uber::before {\n  content: \"\\F748\";\n}\n\n.mdi-ubisoft::before {\n  content: \"\\FBB6\";\n}\n\n.mdi-ubuntu::before {\n  content: \"\\F548\";\n}\n\n.mdi-ufo::before {\n  content: \"\\F00EF\";\n}\n\n.mdi-ufo-outline::before {\n  content: \"\\F00F0\";\n}\n\n.mdi-ultra-high-definition::before {\n  content: \"\\F7F8\";\n}\n\n.mdi-umbraco::before {\n  content: \"\\F549\";\n}\n\n.mdi-umbrella::before {\n  content: \"\\F54A\";\n}\n\n.mdi-umbrella-closed::before {\n  content: \"\\F9AF\";\n}\n\n.mdi-umbrella-outline::before {\n  content: \"\\F54B\";\n}\n\n.mdi-undo::before {\n  content: \"\\F54C\";\n}\n\n.mdi-undo-variant::before {\n  content: \"\\F54D\";\n}\n\n.mdi-unfold-less-horizontal::before {\n  content: \"\\F54E\";\n}\n\n.mdi-unfold-less-vertical::before {\n  content: \"\\F75F\";\n}\n\n.mdi-unfold-more-horizontal::before {\n  content: \"\\F54F\";\n}\n\n.mdi-unfold-more-vertical::before {\n  content: \"\\F760\";\n}\n\n.mdi-ungroup::before {\n  content: \"\\F550\";\n}\n\n.mdi-unicode::before {\n  content: \"\\FEED\";\n}\n\n.mdi-unity::before {\n  content: \"\\F6AE\";\n}\n\n.mdi-unreal::before {\n  content: \"\\F9B0\";\n}\n\n.mdi-untappd::before {\n  content: \"\\F551\";\n}\n\n.mdi-update::before {\n  content: \"\\F6AF\";\n}\n\n.mdi-upload::before {\n  content: \"\\F552\";\n}\n\n.mdi-upload-multiple::before {\n  content: \"\\F83C\";\n}\n\n.mdi-upload-network::before {\n  content: \"\\F6F5\";\n}\n\n.mdi-upload-network-outline::before {\n  content: \"\\FCB4\";\n}\n\n.mdi-upload-off::before {\n  content: \"\\F00F1\";\n}\n\n.mdi-upload-off-outline::before {\n  content: \"\\F00F2\";\n}\n\n.mdi-upload-outline::before {\n  content: \"\\FE67\";\n}\n\n.mdi-usb::before {\n  content: \"\\F553\";\n}\n\n.mdi-valve::before {\n  content: \"\\F0088\";\n}\n\n.mdi-valve-closed::before {\n  content: \"\\F0089\";\n}\n\n.mdi-valve-open::before {\n  content: \"\\F008A\";\n}\n\n.mdi-van-passenger::before {\n  content: \"\\F7F9\";\n}\n\n.mdi-van-utility::before {\n  content: \"\\F7FA\";\n}\n\n.mdi-vanish::before {\n  content: \"\\F7FB\";\n}\n\n.mdi-variable::before {\n  content: \"\\FAE6\";\n}\n\n.mdi-variable-box::before {\n  content: \"\\F013C\";\n}\n\n.mdi-vector-arrange-above::before {\n  content: \"\\F554\";\n}\n\n.mdi-vector-arrange-below::before {\n  content: \"\\F555\";\n}\n\n.mdi-vector-bezier::before {\n  content: \"\\FAE7\";\n}\n\n.mdi-vector-circle::before {\n  content: \"\\F556\";\n}\n\n.mdi-vector-circle-variant::before {\n  content: \"\\F557\";\n}\n\n.mdi-vector-combine::before {\n  content: \"\\F558\";\n}\n\n.mdi-vector-curve::before {\n  content: \"\\F559\";\n}\n\n.mdi-vector-difference::before {\n  content: \"\\F55A\";\n}\n\n.mdi-vector-difference-ab::before {\n  content: \"\\F55B\";\n}\n\n.mdi-vector-difference-ba::before {\n  content: \"\\F55C\";\n}\n\n.mdi-vector-ellipse::before {\n  content: \"\\F892\";\n}\n\n.mdi-vector-intersection::before {\n  content: \"\\F55D\";\n}\n\n.mdi-vector-line::before {\n  content: \"\\F55E\";\n}\n\n.mdi-vector-link::before {\n  content: \"\\F0009\";\n}\n\n.mdi-vector-point::before {\n  content: \"\\F55F\";\n}\n\n.mdi-vector-polygon::before {\n  content: \"\\F560\";\n}\n\n.mdi-vector-polyline::before {\n  content: \"\\F561\";\n}\n\n.mdi-vector-radius::before {\n  content: \"\\F749\";\n}\n\n.mdi-vector-rectangle::before {\n  content: \"\\F5C6\";\n}\n\n.mdi-vector-selection::before {\n  content: \"\\F562\";\n}\n\n.mdi-vector-square::before {\n  content: \"\\F001\";\n}\n\n.mdi-vector-triangle::before {\n  content: \"\\F563\";\n}\n\n.mdi-vector-union::before {\n  content: \"\\F564\";\n}\n\n.mdi-venmo::before {\n  content: \"\\F578\";\n}\n\n.mdi-vhs::before {\n  content: \"\\FA1A\";\n}\n\n.mdi-vibrate::before {\n  content: \"\\F566\";\n}\n\n.mdi-vibrate-off::before {\n  content: \"\\FCB5\";\n}\n\n.mdi-video::before {\n  content: \"\\F567\";\n}\n\n.mdi-video-3d::before {\n  content: \"\\F7FC\";\n}\n\n.mdi-video-3d-variant::before {\n  content: \"\\FEEE\";\n}\n\n.mdi-video-4k-box::before {\n  content: \"\\F83D\";\n}\n\n.mdi-video-account::before {\n  content: \"\\F918\";\n}\n\n.mdi-video-check::before {\n  content: \"\\F008B\";\n}\n\n.mdi-video-check-outline::before {\n  content: \"\\F008C\";\n}\n\n.mdi-video-image::before {\n  content: \"\\F919\";\n}\n\n.mdi-video-input-antenna::before {\n  content: \"\\F83E\";\n}\n\n.mdi-video-input-component::before {\n  content: \"\\F83F\";\n}\n\n.mdi-video-input-hdmi::before {\n  content: \"\\F840\";\n}\n\n.mdi-video-input-scart::before {\n  content: \"\\FFA9\";\n}\n\n.mdi-video-input-svideo::before {\n  content: \"\\F841\";\n}\n\n.mdi-video-minus::before {\n  content: \"\\F9B1\";\n}\n\n.mdi-video-off::before {\n  content: \"\\F568\";\n}\n\n.mdi-video-off-outline::before {\n  content: \"\\FBB7\";\n}\n\n.mdi-video-outline::before {\n  content: \"\\FBB8\";\n}\n\n.mdi-video-plus::before {\n  content: \"\\F9B2\";\n}\n\n.mdi-video-stabilization::before {\n  content: \"\\F91A\";\n}\n\n.mdi-video-switch::before {\n  content: \"\\F569\";\n}\n\n.mdi-video-vintage::before {\n  content: \"\\FA1B\";\n}\n\n.mdi-video-wireless::before {\n  content: \"\\FEEF\";\n}\n\n.mdi-video-wireless-outline::before {\n  content: \"\\FEF0\";\n}\n\n.mdi-view-agenda::before {\n  content: \"\\F56A\";\n}\n\n.mdi-view-array::before {\n  content: \"\\F56B\";\n}\n\n.mdi-view-carousel::before {\n  content: \"\\F56C\";\n}\n\n.mdi-view-column::before {\n  content: \"\\F56D\";\n}\n\n.mdi-view-comfy::before {\n  content: \"\\FE4D\";\n}\n\n.mdi-view-compact::before {\n  content: \"\\FE4E\";\n}\n\n.mdi-view-compact-outline::before {\n  content: \"\\FE4F\";\n}\n\n.mdi-view-dashboard::before {\n  content: \"\\F56E\";\n}\n\n.mdi-view-dashboard-outline::before {\n  content: \"\\FA1C\";\n}\n\n.mdi-view-dashboard-variant::before {\n  content: \"\\F842\";\n}\n\n.mdi-view-day::before {\n  content: \"\\F56F\";\n}\n\n.mdi-view-grid::before {\n  content: \"\\F570\";\n}\n\n.mdi-view-grid-plus::before {\n  content: \"\\FFAA\";\n}\n\n.mdi-view-headline::before {\n  content: \"\\F571\";\n}\n\n.mdi-view-list::before {\n  content: \"\\F572\";\n}\n\n.mdi-view-module::before {\n  content: \"\\F573\";\n}\n\n.mdi-view-parallel::before {\n  content: \"\\F727\";\n}\n\n.mdi-view-quilt::before {\n  content: \"\\F574\";\n}\n\n.mdi-view-sequential::before {\n  content: \"\\F728\";\n}\n\n.mdi-view-split-horizontal::before {\n  content: \"\\FBA7\";\n}\n\n.mdi-view-split-vertical::before {\n  content: \"\\FBA8\";\n}\n\n.mdi-view-stream::before {\n  content: \"\\F575\";\n}\n\n.mdi-view-week::before {\n  content: \"\\F576\";\n}\n\n.mdi-vimeo::before {\n  content: \"\\F577\";\n}\n\n.mdi-violin::before {\n  content: \"\\F60F\";\n}\n\n.mdi-virtual-reality::before {\n  content: \"\\F893\";\n}\n\n.mdi-visual-studio::before {\n  content: \"\\F610\";\n}\n\n.mdi-visual-studio-code::before {\n  content: \"\\FA1D\";\n}\n\n.mdi-vk::before {\n  content: \"\\F579\";\n}\n\n.mdi-vk-box::before {\n  content: \"\\F57A\";\n}\n\n.mdi-vk-circle::before {\n  content: \"\\F57B\";\n}\n\n.mdi-vlc::before {\n  content: \"\\F57C\";\n}\n\n.mdi-voice::before {\n  content: \"\\F5CB\";\n}\n\n.mdi-voice-off::before {\n  content: \"\\FEF1\";\n}\n\n.mdi-voicemail::before {\n  content: \"\\F57D\";\n}\n\n.mdi-volleyball::before {\n  content: \"\\F9B3\";\n}\n\n.mdi-volume-high::before {\n  content: \"\\F57E\";\n}\n\n.mdi-volume-low::before {\n  content: \"\\F57F\";\n}\n\n.mdi-volume-medium::before {\n  content: \"\\F580\";\n}\n\n.mdi-volume-minus::before {\n  content: \"\\F75D\";\n}\n\n.mdi-volume-mute::before {\n  content: \"\\F75E\";\n}\n\n.mdi-volume-off::before {\n  content: \"\\F581\";\n}\n\n.mdi-volume-plus::before {\n  content: \"\\F75C\";\n}\n\n.mdi-volume-source::before {\n  content: \"\\F014B\";\n}\n\n.mdi-volume-variant-off::before {\n  content: \"\\FE68\";\n}\n\n.mdi-volume-vibrate::before {\n  content: \"\\F014C\";\n}\n\n.mdi-vote::before {\n  content: \"\\FA1E\";\n}\n\n.mdi-vote-outline::before {\n  content: \"\\FA1F\";\n}\n\n.mdi-vpn::before {\n  content: \"\\F582\";\n}\n\n.mdi-vuejs::before {\n  content: \"\\F843\";\n}\n\n.mdi-vuetify::before {\n  content: \"\\FE50\";\n}\n\n.mdi-walk::before {\n  content: \"\\F583\";\n}\n\n.mdi-wall::before {\n  content: \"\\F7FD\";\n}\n\n.mdi-wall-sconce::before {\n  content: \"\\F91B\";\n}\n\n.mdi-wall-sconce-flat::before {\n  content: \"\\F91C\";\n}\n\n.mdi-wall-sconce-variant::before {\n  content: \"\\F91D\";\n}\n\n.mdi-wallet::before {\n  content: \"\\F584\";\n}\n\n.mdi-wallet-giftcard::before {\n  content: \"\\F585\";\n}\n\n.mdi-wallet-membership::before {\n  content: \"\\F586\";\n}\n\n.mdi-wallet-outline::before {\n  content: \"\\FBB9\";\n}\n\n.mdi-wallet-plus::before {\n  content: \"\\FFAB\";\n}\n\n.mdi-wallet-plus-outline::before {\n  content: \"\\FFAC\";\n}\n\n.mdi-wallet-travel::before {\n  content: \"\\F587\";\n}\n\n.mdi-wallpaper::before {\n  content: \"\\FE69\";\n}\n\n.mdi-wan::before {\n  content: \"\\F588\";\n}\n\n.mdi-wardrobe::before {\n  content: \"\\FFAD\";\n}\n\n.mdi-wardrobe-outline::before {\n  content: \"\\FFAE\";\n}\n\n.mdi-warehouse::before {\n  content: \"\\FFBB\";\n}\n\n.mdi-washing-machine::before {\n  content: \"\\F729\";\n}\n\n.mdi-watch::before {\n  content: \"\\F589\";\n}\n\n.mdi-watch-export::before {\n  content: \"\\F58A\";\n}\n\n.mdi-watch-export-variant::before {\n  content: \"\\F894\";\n}\n\n.mdi-watch-import::before {\n  content: \"\\F58B\";\n}\n\n.mdi-watch-import-variant::before {\n  content: \"\\F895\";\n}\n\n.mdi-watch-variant::before {\n  content: \"\\F896\";\n}\n\n.mdi-watch-vibrate::before {\n  content: \"\\F6B0\";\n}\n\n.mdi-watch-vibrate-off::before {\n  content: \"\\FCB6\";\n}\n\n.mdi-water::before {\n  content: \"\\F58C\";\n}\n\n.mdi-water-boiler::before {\n  content: \"\\FFAF\";\n}\n\n.mdi-water-off::before {\n  content: \"\\F58D\";\n}\n\n.mdi-water-outline::before {\n  content: \"\\FE6A\";\n}\n\n.mdi-water-percent::before {\n  content: \"\\F58E\";\n}\n\n.mdi-water-pump::before {\n  content: \"\\F58F\";\n}\n\n.mdi-water-pump-off::before {\n  content: \"\\FFB0\";\n}\n\n.mdi-water-well::before {\n  content: \"\\F008D\";\n}\n\n.mdi-water-well-outline::before {\n  content: \"\\F008E\";\n}\n\n.mdi-watermark::before {\n  content: \"\\F612\";\n}\n\n.mdi-wave::before {\n  content: \"\\FF4B\";\n}\n\n.mdi-waves::before {\n  content: \"\\F78C\";\n}\n\n.mdi-waze::before {\n  content: \"\\FBBA\";\n}\n\n.mdi-weather-cloudy::before {\n  content: \"\\F590\";\n}\n\n.mdi-weather-cloudy-alert::before {\n  content: \"\\FF4C\";\n}\n\n.mdi-weather-cloudy-arrow-right::before {\n  content: \"\\FE51\";\n}\n\n.mdi-weather-fog::before {\n  content: \"\\F591\";\n}\n\n.mdi-weather-hail::before {\n  content: \"\\F592\";\n}\n\n.mdi-weather-hazy::before {\n  content: \"\\FF4D\";\n}\n\n.mdi-weather-hurricane::before {\n  content: \"\\F897\";\n}\n\n.mdi-weather-lightning::before {\n  content: \"\\F593\";\n}\n\n.mdi-weather-lightning-rainy::before {\n  content: \"\\F67D\";\n}\n\n.mdi-weather-night::before {\n  content: \"\\F594\";\n}\n\n.mdi-weather-night-partly-cloudy::before {\n  content: \"\\FF4E\";\n}\n\n.mdi-weather-partly-cloudy::before {\n  content: \"\\F595\";\n}\n\n.mdi-weather-partly-lightning::before {\n  content: \"\\FF4F\";\n}\n\n.mdi-weather-partly-rainy::before {\n  content: \"\\FF50\";\n}\n\n.mdi-weather-partly-snowy::before {\n  content: \"\\FF51\";\n}\n\n.mdi-weather-partly-snowy-rainy::before {\n  content: \"\\FF52\";\n}\n\n.mdi-weather-pouring::before {\n  content: \"\\F596\";\n}\n\n.mdi-weather-rainy::before {\n  content: \"\\F597\";\n}\n\n.mdi-weather-snowy::before {\n  content: \"\\F598\";\n}\n\n.mdi-weather-snowy-heavy::before {\n  content: \"\\FF53\";\n}\n\n.mdi-weather-snowy-rainy::before {\n  content: \"\\F67E\";\n}\n\n.mdi-weather-sunny::before {\n  content: \"\\F599\";\n}\n\n.mdi-weather-sunny-alert::before {\n  content: \"\\FF54\";\n}\n\n.mdi-weather-sunset::before {\n  content: \"\\F59A\";\n}\n\n.mdi-weather-sunset-down::before {\n  content: \"\\F59B\";\n}\n\n.mdi-weather-sunset-up::before {\n  content: \"\\F59C\";\n}\n\n.mdi-weather-tornado::before {\n  content: \"\\FF55\";\n}\n\n.mdi-weather-windy::before {\n  content: \"\\F59D\";\n}\n\n.mdi-weather-windy-variant::before {\n  content: \"\\F59E\";\n}\n\n.mdi-web::before {\n  content: \"\\F59F\";\n}\n\n.mdi-web-box::before {\n  content: \"\\FFB1\";\n}\n\n.mdi-webcam::before {\n  content: \"\\F5A0\";\n}\n\n.mdi-webhook::before {\n  content: \"\\F62F\";\n}\n\n.mdi-webpack::before {\n  content: \"\\F72A\";\n}\n\n.mdi-wechat::before {\n  content: \"\\F611\";\n}\n\n.mdi-weight::before {\n  content: \"\\F5A1\";\n}\n\n.mdi-weight-gram::before {\n  content: \"\\FD1B\";\n}\n\n.mdi-weight-kilogram::before {\n  content: \"\\F5A2\";\n}\n\n.mdi-weight-lifter::before {\n  content: \"\\F0188\";\n}\n\n.mdi-weight-pound::before {\n  content: \"\\F9B4\";\n}\n\n.mdi-whatsapp::before {\n  content: \"\\F5A3\";\n}\n\n.mdi-wheelchair-accessibility::before {\n  content: \"\\F5A4\";\n}\n\n.mdi-whistle::before {\n  content: \"\\F9B5\";\n}\n\n.mdi-white-balance-auto::before {\n  content: \"\\F5A5\";\n}\n\n.mdi-white-balance-incandescent::before {\n  content: \"\\F5A6\";\n}\n\n.mdi-white-balance-iridescent::before {\n  content: \"\\F5A7\";\n}\n\n.mdi-white-balance-sunny::before {\n  content: \"\\F5A8\";\n}\n\n.mdi-widgets::before {\n  content: \"\\F72B\";\n}\n\n.mdi-wifi::before {\n  content: \"\\F5A9\";\n}\n\n.mdi-wifi-off::before {\n  content: \"\\F5AA\";\n}\n\n.mdi-wifi-star::before {\n  content: \"\\FE6B\";\n}\n\n.mdi-wifi-strength-1::before {\n  content: \"\\F91E\";\n}\n\n.mdi-wifi-strength-1-alert::before {\n  content: \"\\F91F\";\n}\n\n.mdi-wifi-strength-1-lock::before {\n  content: \"\\F920\";\n}\n\n.mdi-wifi-strength-2::before {\n  content: \"\\F921\";\n}\n\n.mdi-wifi-strength-2-alert::before {\n  content: \"\\F922\";\n}\n\n.mdi-wifi-strength-2-lock::before {\n  content: \"\\F923\";\n}\n\n.mdi-wifi-strength-3::before {\n  content: \"\\F924\";\n}\n\n.mdi-wifi-strength-3-alert::before {\n  content: \"\\F925\";\n}\n\n.mdi-wifi-strength-3-lock::before {\n  content: \"\\F926\";\n}\n\n.mdi-wifi-strength-4::before {\n  content: \"\\F927\";\n}\n\n.mdi-wifi-strength-4-alert::before {\n  content: \"\\F928\";\n}\n\n.mdi-wifi-strength-4-lock::before {\n  content: \"\\F929\";\n}\n\n.mdi-wifi-strength-alert-outline::before {\n  content: \"\\F92A\";\n}\n\n.mdi-wifi-strength-lock-outline::before {\n  content: \"\\F92B\";\n}\n\n.mdi-wifi-strength-off::before {\n  content: \"\\F92C\";\n}\n\n.mdi-wifi-strength-off-outline::before {\n  content: \"\\F92D\";\n}\n\n.mdi-wifi-strength-outline::before {\n  content: \"\\F92E\";\n}\n\n.mdi-wii::before {\n  content: \"\\F5AB\";\n}\n\n.mdi-wiiu::before {\n  content: \"\\F72C\";\n}\n\n.mdi-wikipedia::before {\n  content: \"\\F5AC\";\n}\n\n.mdi-wind-turbine::before {\n  content: \"\\FD81\";\n}\n\n.mdi-window-close::before {\n  content: \"\\F5AD\";\n}\n\n.mdi-window-closed::before {\n  content: \"\\F5AE\";\n}\n\n.mdi-window-maximize::before {\n  content: \"\\F5AF\";\n}\n\n.mdi-window-minimize::before {\n  content: \"\\F5B0\";\n}\n\n.mdi-window-open::before {\n  content: \"\\F5B1\";\n}\n\n.mdi-window-restore::before {\n  content: \"\\F5B2\";\n}\n\n.mdi-window-shutter::before {\n  content: \"\\F0147\";\n}\n\n.mdi-window-shutter-alert::before {\n  content: \"\\F0148\";\n}\n\n.mdi-window-shutter-open::before {\n  content: \"\\F0149\";\n}\n\n.mdi-windows::before {\n  content: \"\\F5B3\";\n}\n\n.mdi-windows-classic::before {\n  content: \"\\FA20\";\n}\n\n.mdi-wiper::before {\n  content: \"\\FAE8\";\n}\n\n.mdi-wiper-wash::before {\n  content: \"\\FD82\";\n}\n\n.mdi-wordpress::before {\n  content: \"\\F5B4\";\n}\n\n.mdi-worker::before {\n  content: \"\\F5B5\";\n}\n\n.mdi-wrap::before {\n  content: \"\\F5B6\";\n}\n\n.mdi-wrap-disabled::before {\n  content: \"\\FBBB\";\n}\n\n.mdi-wrench::before {\n  content: \"\\F5B7\";\n}\n\n.mdi-wrench-outline::before {\n  content: \"\\FBBC\";\n}\n\n.mdi-wunderlist::before {\n  content: \"\\F5B8\";\n}\n\n.mdi-xamarin::before {\n  content: \"\\F844\";\n}\n\n.mdi-xamarin-outline::before {\n  content: \"\\F845\";\n}\n\n.mdi-xaml::before {\n  content: \"\\F673\";\n}\n\n.mdi-xbox::before {\n  content: \"\\F5B9\";\n}\n\n.mdi-xbox-controller::before {\n  content: \"\\F5BA\";\n}\n\n.mdi-xbox-controller-battery-alert::before {\n  content: \"\\F74A\";\n}\n\n.mdi-xbox-controller-battery-charging::before {\n  content: \"\\FA21\";\n}\n\n.mdi-xbox-controller-battery-empty::before {\n  content: \"\\F74B\";\n}\n\n.mdi-xbox-controller-battery-full::before {\n  content: \"\\F74C\";\n}\n\n.mdi-xbox-controller-battery-low::before {\n  content: \"\\F74D\";\n}\n\n.mdi-xbox-controller-battery-medium::before {\n  content: \"\\F74E\";\n}\n\n.mdi-xbox-controller-battery-unknown::before {\n  content: \"\\F74F\";\n}\n\n.mdi-xbox-controller-menu::before {\n  content: \"\\FE52\";\n}\n\n.mdi-xbox-controller-off::before {\n  content: \"\\F5BB\";\n}\n\n.mdi-xbox-controller-view::before {\n  content: \"\\FE53\";\n}\n\n.mdi-xda::before {\n  content: \"\\F5BC\";\n}\n\n.mdi-xing::before {\n  content: \"\\F5BD\";\n}\n\n.mdi-xing-box::before {\n  content: \"\\F5BE\";\n}\n\n.mdi-xing-circle::before {\n  content: \"\\F5BF\";\n}\n\n.mdi-xml::before {\n  content: \"\\F5C0\";\n}\n\n.mdi-xmpp::before {\n  content: \"\\F7FE\";\n}\n\n.mdi-yahoo::before {\n  content: \"\\FB2A\";\n}\n\n.mdi-yammer::before {\n  content: \"\\F788\";\n}\n\n.mdi-yeast::before {\n  content: \"\\F5C1\";\n}\n\n.mdi-yelp::before {\n  content: \"\\F5C2\";\n}\n\n.mdi-yin-yang::before {\n  content: \"\\F67F\";\n}\n\n.mdi-yoga::before {\n  content: \"\\F01A7\";\n}\n\n.mdi-youtube::before {\n  content: \"\\F5C3\";\n}\n\n.mdi-youtube-creator-studio::before {\n  content: \"\\F846\";\n}\n\n.mdi-youtube-gaming::before {\n  content: \"\\F847\";\n}\n\n.mdi-youtube-subscription::before {\n  content: \"\\FD1C\";\n}\n\n.mdi-youtube-tv::before {\n  content: \"\\F448\";\n}\n\n.mdi-z-wave::before {\n  content: \"\\FAE9\";\n}\n\n.mdi-zend::before {\n  content: \"\\FAEA\";\n}\n\n.mdi-zigbee::before {\n  content: \"\\FD1D\";\n}\n\n.mdi-zip-box::before {\n  content: \"\\F5C4\";\n}\n\n.mdi-zip-box-outline::before {\n  content: \"\\F001B\";\n}\n\n.mdi-zip-disk::before {\n  content: \"\\FA22\";\n}\n\n.mdi-zodiac-aquarius::before {\n  content: \"\\FA7C\";\n}\n\n.mdi-zodiac-aries::before {\n  content: \"\\FA7D\";\n}\n\n.mdi-zodiac-cancer::before {\n  content: \"\\FA7E\";\n}\n\n.mdi-zodiac-capricorn::before {\n  content: \"\\FA7F\";\n}\n\n.mdi-zodiac-gemini::before {\n  content: \"\\FA80\";\n}\n\n.mdi-zodiac-leo::before {\n  content: \"\\FA81\";\n}\n\n.mdi-zodiac-libra::before {\n  content: \"\\FA82\";\n}\n\n.mdi-zodiac-pisces::before {\n  content: \"\\FA83\";\n}\n\n.mdi-zodiac-sagittarius::before {\n  content: \"\\FA84\";\n}\n\n.mdi-zodiac-scorpio::before {\n  content: \"\\FA85\";\n}\n\n.mdi-zodiac-taurus::before {\n  content: \"\\FA86\";\n}\n\n.mdi-zodiac-virgo::before {\n  content: \"\\FA87\";\n}\n\n.mdi-blank::before {\n  content: \"\\F68C\";\n  visibility: hidden;\n}\n\n.mdi-18px.mdi-set, .mdi-18px.mdi:before {\n  font-size: 18px;\n}\n\n.mdi-24px.mdi-set, .mdi-24px.mdi:before {\n  font-size: 24px;\n}\n\n.mdi-36px.mdi-set, .mdi-36px.mdi:before {\n  font-size: 36px;\n}\n\n.mdi-48px.mdi-set, .mdi-48px.mdi:before {\n  font-size: 48px;\n}\n\n.mdi-dark:before {\n  color: rgba(0, 0, 0, 0.54);\n}\n\n.mdi-dark.mdi-inactive:before {\n  color: rgba(0, 0, 0, 0.26);\n}\n\n.mdi-light:before {\n  color: white;\n}\n\n.mdi-light.mdi-inactive:before {\n  color: rgba(255, 255, 255, 0.3);\n}\n\n.mdi-rotate-45 {\n  /*\n        // Not included in production\n        &.mdi-flip-h:before {\n            -webkit-transform: scaleX(-1) rotate(45deg);\n            transform: scaleX(-1) rotate(45deg);\n            filter: FlipH;\n            -ms-filter: \"FlipH\";\n        }\n        &.mdi-flip-v:before {\n            -webkit-transform: scaleY(-1) rotate(45deg);\n            -ms-transform: rotate(45deg);\n            transform: scaleY(-1) rotate(45deg);\n            filter: FlipV;\n            -ms-filter: \"FlipV\";\n        }\n        */\n}\n\n.mdi-rotate-45:before {\n  -webkit-transform: rotate(45deg);\n  -ms-transform: rotate(45deg);\n  transform: rotate(45deg);\n}\n\n.mdi-rotate-90 {\n  /*\n        // Not included in production\n        &.mdi-flip-h:before {\n            -webkit-transform: scaleX(-1) rotate(90deg);\n            transform: scaleX(-1) rotate(90deg);\n            filter: FlipH;\n            -ms-filter: \"FlipH\";\n        }\n        &.mdi-flip-v:before {\n            -webkit-transform: scaleY(-1) rotate(90deg);\n            -ms-transform: rotate(90deg);\n            transform: scaleY(-1) rotate(90deg);\n            filter: FlipV;\n            -ms-filter: \"FlipV\";\n        }\n        */\n}\n\n.mdi-rotate-90:before {\n  -webkit-transform: rotate(90deg);\n  -ms-transform: rotate(90deg);\n  transform: rotate(90deg);\n}\n\n.mdi-rotate-135 {\n  /*\n        // Not included in production\n        &.mdi-flip-h:before {\n            -webkit-transform: scaleX(-1) rotate(135deg);\n            transform: scaleX(-1) rotate(135deg);\n            filter: FlipH;\n            -ms-filter: \"FlipH\";\n        }\n        &.mdi-flip-v:before {\n            -webkit-transform: scaleY(-1) rotate(135deg);\n            -ms-transform: rotate(135deg);\n            transform: scaleY(-1) rotate(135deg);\n            filter: FlipV;\n            -ms-filter: \"FlipV\";\n        }\n        */\n}\n\n.mdi-rotate-135:before {\n  -webkit-transform: rotate(135deg);\n  -ms-transform: rotate(135deg);\n  transform: rotate(135deg);\n}\n\n.mdi-rotate-180 {\n  /*\n        // Not included in production\n        &.mdi-flip-h:before {\n            -webkit-transform: scaleX(-1) rotate(180deg);\n            transform: scaleX(-1) rotate(180deg);\n            filter: FlipH;\n            -ms-filter: \"FlipH\";\n        }\n        &.mdi-flip-v:before {\n            -webkit-transform: scaleY(-1) rotate(180deg);\n            -ms-transform: rotate(180deg);\n            transform: scaleY(-1) rotate(180deg);\n            filter: FlipV;\n            -ms-filter: \"FlipV\";\n        }\n        */\n}\n\n.mdi-rotate-180:before {\n  -webkit-transform: rotate(180deg);\n  -ms-transform: rotate(180deg);\n  transform: rotate(180deg);\n}\n\n.mdi-rotate-225 {\n  /*\n        // Not included in production\n        &.mdi-flip-h:before {\n            -webkit-transform: scaleX(-1) rotate(225deg);\n            transform: scaleX(-1) rotate(225deg);\n            filter: FlipH;\n            -ms-filter: \"FlipH\";\n        }\n        &.mdi-flip-v:before {\n            -webkit-transform: scaleY(-1) rotate(225deg);\n            -ms-transform: rotate(225deg);\n            transform: scaleY(-1) rotate(225deg);\n            filter: FlipV;\n            -ms-filter: \"FlipV\";\n        }\n        */\n}\n\n.mdi-rotate-225:before {\n  -webkit-transform: rotate(225deg);\n  -ms-transform: rotate(225deg);\n  transform: rotate(225deg);\n}\n\n.mdi-rotate-270 {\n  /*\n        // Not included in production\n        &.mdi-flip-h:before {\n            -webkit-transform: scaleX(-1) rotate(270deg);\n            transform: scaleX(-1) rotate(270deg);\n            filter: FlipH;\n            -ms-filter: \"FlipH\";\n        }\n        &.mdi-flip-v:before {\n            -webkit-transform: scaleY(-1) rotate(270deg);\n            -ms-transform: rotate(270deg);\n            transform: scaleY(-1) rotate(270deg);\n            filter: FlipV;\n            -ms-filter: \"FlipV\";\n        }\n        */\n}\n\n.mdi-rotate-270:before {\n  -webkit-transform: rotate(270deg);\n  -ms-transform: rotate(270deg);\n  transform: rotate(270deg);\n}\n\n.mdi-rotate-315 {\n  /*\n        // Not included in production\n        &.mdi-flip-h:before {\n            -webkit-transform: scaleX(-1) rotate(315deg);\n            transform: scaleX(-1) rotate(315deg);\n            filter: FlipH;\n            -ms-filter: \"FlipH\";\n        }\n        &.mdi-flip-v:before {\n            -webkit-transform: scaleY(-1) rotate(315deg);\n            -ms-transform: rotate(315deg);\n            transform: scaleY(-1) rotate(315deg);\n            filter: FlipV;\n            -ms-filter: \"FlipV\";\n        }\n        */\n}\n\n.mdi-rotate-315:before {\n  -webkit-transform: rotate(315deg);\n  -ms-transform: rotate(315deg);\n  transform: rotate(315deg);\n}\n\n.mdi-flip-h:before {\n  -webkit-transform: scaleX(-1);\n  transform: scaleX(-1);\n  filter: FlipH;\n  -ms-filter: \"FlipH\";\n}\n\n.mdi-flip-v:before {\n  -webkit-transform: scaleY(-1);\n  transform: scaleY(-1);\n  filter: FlipV;\n  -ms-filter: \"FlipV\";\n}\n\n.mdi-spin:before {\n  -webkit-animation: mdi-spin 2s infinite linear;\n  animation: mdi-spin 2s infinite linear;\n}\n\n@-webkit-keyframes mdi-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg);\n  }\n}\n\n@keyframes mdi-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg);\n  }\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 1809:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Dialog_vue_vue_type_template_id_00fa04a7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1810);
/* harmony import */ var _Dialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1812);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Dialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Dialog_vue_vue_type_template_id_00fa04a7___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Dialog_vue_vue_type_template_id_00fa04a7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/studio/workspace/views/Dialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1810:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dialog_vue_vue_type_template_id_00fa04a7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1811);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dialog_vue_vue_type_template_id_00fa04a7___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dialog_vue_vue_type_template_id_00fa04a7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1811:
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
    "DialogCard",
    { attrs: { title: _vm.title, actions: _vm.actions } },
    [_c(_vm.component, { tag: "component" })],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1812:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_Dialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1813);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_Dialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1813:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'Dialog',
	props: ['title', 'component', 'actions'],
});


/***/ }),

/***/ 1814:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ConnectionSelectionDialog_vue_vue_type_template_id_39a776a7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1815);
/* harmony import */ var _ConnectionSelectionDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1817);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ConnectionSelectionDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ConnectionSelectionDialog_vue_vue_type_template_id_39a776a7___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ConnectionSelectionDialog_vue_vue_type_template_id_39a776a7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/studio/workspace/views/ConnectionSelectionDialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1815:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ConnectionSelectionDialog_vue_vue_type_template_id_39a776a7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1816);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ConnectionSelectionDialog_vue_vue_type_template_id_39a776a7___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ConnectionSelectionDialog_vue_vue_type_template_id_39a776a7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1816:
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
    { staticClass: "connection-box" },
    [
      _c("v-card-title", [
        _c("span", { staticClass: "headline" }, [
          _vm._v(_vm._s(_vm.$t("WORKSPACE_BOARD_CONNECT")))
        ])
      ]),
      _vm._v(" "),
      _c(
        "v-card-text",
        [
          _c(
            "v-list",
            { staticClass: "itemlist", attrs: { "two-line": "" } },
            [
              _vm._l(_vm.devices, function(device) {
                return [
                  _c(
                    "v-list-item",
                    {
                      key: device.id,
                      on: {
                        click: function($event) {
                          return _vm.connect(device)
                        }
                      }
                    },
                    [
                      _c("v-list-item-avatar", [
                        _c("img", { attrs: { src: device.icon } })
                      ]),
                      _vm._v(" "),
                      _c(
                        "v-list-item-content",
                        [
                          _c(
                            "v-list-item-title",
                            { staticClass: "board-connect-title" },
                            [_vm._v(_vm._s(device.name))]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-list-item-subtitle",
                            { staticClass: "board-connect-type" },
                            [_vm._v(_vm._s(device.description))]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-list-item-subtitle",
                            { staticClass: "board-connect-address" },
                            [_vm._v(_vm._s(device.address))]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ]
              })
            ],
            2
          ),
          _vm._v(" "),
          _vm.devicesWithoutPlaceholders === 0
            ? _c(
                "v-alert",
                { staticClass: "mb-4", attrs: { type: "success" } },
                [
                  _c(
                    "v-row",
                    { attrs: { align: "center" } },
                    [
                      _c("v-col", { staticClass: "grow" }, [
                        _vm._v(_vm._s(_vm.$t("WORKSPACE_DEVICE_SETUP_TEXT")))
                      ]),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { staticClass: "shrink" },
                        [
                          _c("v-btn", { on: { click: _vm.setup } }, [
                            _vm._v(_vm._s(_vm.$t("WORKSPACE_DEVICE_SETUP")))
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
            { ref: "close", attrs: { text: "" }, on: { click: _vm.close } },
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

/***/ 1817:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_ConnectionSelectionDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1818);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_ConnectionSelectionDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1818:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	name: 'ConnectionSelectionDialog',
	data () 
	{
		return {

		};
	},
	computed: {
		...Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"]) ({
			devices: 'workspace/devices'
		}),
		devicesWithoutPlaceholders ()
		{
			if (!this.devices) return 0;
			else 
			{
				return this.devices.reduce ((nr, device) => { return nr + (device.placeholder?0:1); }, 0);
			}
		}
	},
	mounted () {
		this.$refs.close.$el.focus ();
	},
	methods:
	{
		connect (device)
		{
			this.$root.$emit ('submit', device);
		},
		close ()
		{
			this.$root.$emit ('submit', undefined);
		},
		esc ()
		{
			this.close ();
		},
		setup ()
		{
			this.studio.system.openLink ('https://wyliodrinstudio.readthedocs.io/en/latest/boards');
		}
	}
});


/***/ }),

/***/ 1819:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DialogLayout_vue_vue_type_template_id_238da09e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1820);
/* harmony import */ var _DialogLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1822);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DialogLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DialogLayout_vue_vue_type_template_id_238da09e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DialogLayout_vue_vue_type_template_id_238da09e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/studio/workspace/views/DialogLayout.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1820:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DialogLayout_vue_vue_type_template_id_238da09e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1821);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DialogLayout_vue_vue_type_template_id_238da09e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DialogLayout_vue_vue_type_template_id_238da09e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1821:
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
    "v-dialog",
    {
      attrs: { "max-width": _vm.width, persistent: _vm.persistent },
      on: {
        keydown: [
          function($event) {
            if (
              !$event.type.indexOf("key") &&
              _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
            ) {
              return null
            }
            return _vm.enter($event)
          },
          function($event) {
            if (
              !$event.type.indexOf("key") &&
              _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])
            ) {
              return null
            }
            return _vm.esc($event)
          }
        ]
      },
      model: {
        value: _vm.isActive,
        callback: function($$v) {
          _vm.isActive = $$v
        },
        expression: "isActive"
      }
    },
    [
      _c(
        "dialog-child",
        _vm._b({ ref: "dialog" }, "dialog-child", _vm.$options.propsData, false)
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1822:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_DialogLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1823);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_DialogLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1823:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		persistent: {
			default: true
		}
	},
	methods: {
		enter ()
		{
			if (this.$refs.dialog.enter) this.$refs.dialog.enter ();
		},
		esc ()
		{
			if (this.$refs.dialog.esc) this.$refs.dialog.esc ();
		}
	}
});


/***/ }),

/***/ 1824:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NotificationLayout_vue_vue_type_template_id_125dca54___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1825);
/* harmony import */ var _NotificationLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1827);
/* empty/unused harmony star reexport *//* harmony import */ var _NotificationLayout_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1836);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _NotificationLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NotificationLayout_vue_vue_type_template_id_125dca54___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NotificationLayout_vue_vue_type_template_id_125dca54___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/studio/workspace/views/NotificationLayout.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1825:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationLayout_vue_vue_type_template_id_125dca54___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1826);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationLayout_vue_vue_type_template_id_125dca54___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationLayout_vue_vue_type_template_id_125dca54___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1826:
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
    "transition",
    {
      attrs: { name: "vuedl-notification-fade" },
      on: { "after-leave": _vm.onTransitionEnd }
    },
    [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.isActive,
              expression: "isActive"
            }
          ],
          class: ["v-application", "vuedl-notification", _vm.horizontalClass],
          style: _vm.getStyle,
          attrs: { role: "alert" },
          on: { mouseenter: _vm.clearTimer, mouseleave: _vm.startTimer }
        },
        [
          _c(
            "Alert",
            _vm._b({ ref: "dialog" }, "Alert", _vm.$options.propsData, false)
          ),
          _vm._v(" "),
          _vm.showClose
            ? _c("div", {
                staticClass: "vuedl-notification__closeBtn",
                domProps: { innerHTML: _vm._s("×") },
                on: {
                  click: function($event) {
                    $event.stopPropagation()
                    return _vm.close($event)
                  }
                }
              })
            : _vm._e()
        ],
        1
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1827:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1828);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1828:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuedl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1829);
/* harmony import */ var _Alert_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1831);
//
//
//
//
//
//
//
//
//
//
//
//
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
	components: {
		Alert: _Alert_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
	},
	mixins: [ vuedl__WEBPACK_IMPORTED_MODULE_0__["Notifiable"] ],
	props: {
		width: {
			type: Number,
			default: () => 330
		}
	},
	computed: {
		getStyle () {
			return {
				[this.verticalProperty]: `${this.verticalOffset}px`,
				'max-width': `${this.width}px`,
				'z-index': this.zIndex
			};
		}
	}
});


/***/ }),

/***/ 1831:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Alert_vue_vue_type_template_id_064d404d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1832);
/* harmony import */ var _Alert_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1834);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Alert_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Alert_vue_vue_type_template_id_064d404d___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Alert_vue_vue_type_template_id_064d404d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/studio/workspace/views/Alert.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1832:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Alert_vue_vue_type_template_id_064d404d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1833);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Alert_vue_vue_type_template_id_064d404d___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Alert_vue_vue_type_template_id_064d404d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1833:
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
    "v-alert",
    {
      staticStyle: { margin: "0", "min-width": "300px" },
      attrs: { value: true, dismissible: _vm.dismissible, type: _vm.type },
      on: {
        input: function($event) {
          return _vm.$emit("submit")
        }
      }
    },
    [
      _vm._v("\n  " + _vm._s(_vm.text) + "\n  "),
      _vm.extra ? _c("pre", [_vm._v(_vm._s(_vm.extra))]) : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1834:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_Alert_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1835);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_Alert_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1835:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
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
	components: {
    
	},
	layout: ['notification', { showClose: false }],
	props: {
		type: {
			type: String,
			default: () => 'info'
		},
		actions: [ Array, Object ],
		text: String,
		dismissible: {
			type: Boolean,
			default: true
		},
		extra: {
			type: String,
			default: null
		}
	}
});


/***/ }),

/***/ 1836:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationLayout_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1837);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationLayout_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationLayout_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationLayout_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationLayout_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationLayout_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1837:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1838);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("1fa59819", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 1838:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".vuedl-notification {\n  display: flex;\n  box-sizing: border-box;\n  position: fixed;\n  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n  transition: opacity 0.3s, transform 0.3s, left 0.3s, right 0.3s, top 0.4s, bottom 0.3s;\n  overflow: hidden;\n}\n.vuedl-notification > div:first-child {\n  width: 100%;\n}\n.vuedl-notification.right {\n  right: 16px;\n}\n.vuedl-notification.left {\n  left: 16px;\n}\n.vuedl-notification__closeBtn {\n  position: absolute;\n  top: 9px;\n  right: 15px;\n  cursor: pointer;\n  color: #909399;\n  font-size: 22px;\n}\n.vuedl-notification__closeBtn:hover {\n  color: #606266;\n}\n.vuedl-notification-fade-enter.right {\n  right: 0;\n  transform: translateX(100%);\n}\n.vuedl-notification-fade-enter.left {\n  left: 0;\n  transform: translateX(-100%);\n}\n.vuedl-notification-fade-leave-active {\n  opacity: 0;\n}\n@media screen and (max-width: 450px) {\n.vuedl-notification {\n    left: 8px !important;\n    right: 8px !important;\n    max-width: inherit !important;\n}\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 1839:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _QuestionDialog_vue_vue_type_template_id_fa1983a6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1840);
/* harmony import */ var _QuestionDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1842);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _QuestionDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _QuestionDialog_vue_vue_type_template_id_fa1983a6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _QuestionDialog_vue_vue_type_template_id_fa1983a6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/studio/workspace/views/QuestionDialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1840:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_QuestionDialog_vue_vue_type_template_id_fa1983a6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1841);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_QuestionDialog_vue_vue_type_template_id_fa1983a6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_QuestionDialog_vue_vue_type_template_id_fa1983a6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1841:
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
    { staticClass: "connection-box" },
    [
      _c("v-card-title", [
        _c("span", { staticClass: "headline" }, [
          _vm._v(_vm._s(_vm.$t(_vm.title, _vm.values)))
        ])
      ]),
      _vm._v(" "),
      _c("v-card-text", [
        _vm._v("\n\t\t" + _vm._s(_vm.$t(_vm.question, _vm.values)) + "\n\t")
      ]),
      _vm._v(" "),
      _c(
        "v-card-actions",
        [
          _c("v-spacer"),
          _vm._v(" "),
          _vm._l(_vm.actions, function(action) {
            return _c(
              "v-btn",
              {
                key: action.title,
                ref: "action",
                refInFor: true,
                class: action.class,
                attrs: { text: "" },
                on: {
                  click: function($event) {
                    return _vm.click(action)
                  }
                }
              },
              [_vm._v(_vm._s(_vm.$t(action.title)))]
            )
          })
        ],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1842:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_QuestionDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1843);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_QuestionDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1843:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
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
	name: 'QuestionDialog',
	props: ['title', 'question', 'buttons', 'values'],
	data () 
	{
		return {
			actions: this.buttons?this.buttons:[{
				title: 'NO',
				class: '',
				value: null,
			},
			{
				title: 'YES',
				class: '',
				value: 'yes'
			}]
		};
	},
	mounted ()
	{
		this.$refs.action[0].$el.focus();
	},
	methods:
	{
		enter ()
		{
			this.click (this.actions[1]);
		},
		esc ()
		{
			this.click (this.actions[0]);
		},
		click (button)
		{
			this.$root.$emit ('submit', button.value);
		}
	}
});


/***/ }),

/***/ 1844:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PromptDialog_vue_vue_type_template_id_22cddbeb___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1845);
/* harmony import */ var _PromptDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1847);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PromptDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PromptDialog_vue_vue_type_template_id_22cddbeb___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PromptDialog_vue_vue_type_template_id_22cddbeb___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/studio/workspace/views/PromptDialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1845:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PromptDialog_vue_vue_type_template_id_22cddbeb___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1846);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PromptDialog_vue_vue_type_template_id_22cddbeb___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PromptDialog_vue_vue_type_template_id_22cddbeb___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1846:
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
    { staticClass: "connection-box" },
    [
      _c("v-card-title", [
        _c("span", { staticClass: "headline" }, [
          _vm._v(_vm._s(_vm.$t(_vm.title, _vm.values)))
        ])
      ]),
      _vm._v(" "),
      _c(
        "v-card-text",
        [
          _c(
            "v-text-field",
            {
              attrs: {
                autofocus: "",
                label: _vm.$t(_vm.question, _vm.values),
                required: ""
              },
              model: {
                value: _vm.value,
                callback: function($$v) {
                  _vm.value = $$v
                },
                expression: "value"
              }
            },
            [_vm._v(_vm._s(_vm.$t(_vm.question, _vm.values)))]
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
          _vm._l(_vm.actions, function(action) {
            return _c(
              "v-btn",
              {
                key: action.title,
                class: action.class,
                attrs: { text: "" },
                on: {
                  click: function($event) {
                    return _vm.click(action)
                  }
                }
              },
              [_vm._v(_vm._s(_vm.$t(action.title)))]
            )
          })
        ],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1847:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_PromptDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1848);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_PromptDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1848:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
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
	name: 'PromptDialog',
	props: ['title', 'question', 'buttons', 'values', 'originalValue'],
	data () 
	{
		return {
			actions: this.buttons?this.buttons:[{
				title: 'BACK',
				class: '',
				value: null,
			},
			{
				title: 'OK',
				class: '',
				value: 'ok'
			}],
			value: this.originalValue
		};
	},
	methods:
	{
		enter ()
		{
			this.click (this.actions[1]);
		},
		esc ()
		{
			this.click (this.actions[0]);
		},
		click (button)
		{
			if (button.value)
			{
				this.$root.$emit ('submit', this.value);
			}
			else
			{
				this.$root.$emit ('submit', null);
			}
		}
	}
});


/***/ }),

/***/ 1849:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoneDevice", function() { return NoneDevice; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);


/* the non connected device */
const NoneDevice = {
	id: 'none',
	type: 'none',
	name: '',
	board: 'none',
	languages: {},
};

/* harmony default export */ __webpack_exports__["default"] = ({
	namespaced: true,
	state:
	{
		menuItems: [],
		toolbarButtons: [],
		deviceToolButtons: [],
		tabs: [],
		activeTab: 0,
		title: '',
		devices: [],
		device: NoneDevice,
		status: 'DISCONNECTED',
		currentProject: '',
		currentFile: '',
		mode:'simple',
		statusButtons: [],
		activeStatusButton: '',
	},
	getters:
	{
		menuItems: (state) => state.menuItems,
		toolbarButtons: (state) => state.toolbarButtons,
		deviceToolButtons: (state) => state.deviceToolButtons,
		tabs: (state) => state.tabs,
		activeTab: (state) => state.activeTab,
		title: (state) => state.title,
		devices: (state) => state.devices,
		device: (state) => state.device,
		status: (state) => state.status,
		mode: (state) => state.mode,
		statusButtons: (state) => state.statusButtons,
		activeStatusButton: (state) => state.activeStatusButton,
		// currentProject: (state) => state.currentProject,
		// currentFile: (state) => state.currentFile
	},
	actions:
	{
		menuItems: ({commit}, menuItems) => commit ('menuItems', [...menuItems]),
		toolbarButtons: ({commit}, toolbarButtons) => commit ('toolbarButtons', [...toolbarButtons]),
		deviceToolButtons: ({commit}, deviceToolButtons) => commit ('deviceToolButtons', [...deviceToolButtons]),
		tabs: ({commit}, tabs) => commit('tabs', [...tabs]),
		activeTab: ({commit}, activeTab) => commit ('activeTab', activeTab),
		title: ({commit}, title) => commit ('title', title),
		devices: ({commit}, devices) => commit ('devices', devices),
		device: ({commit}, device) => 
		{
			if (!device || !device.type) device = NoneDevice;
			else device = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assign ({}, device);
			commit ('device', device);
			return device;
		},
		status: ({commit}, status) => commit ('status', status),
		mode: ({commit}, mode) => {
			commit ('mode', mode);
		},
		statusButtons: ({commit}, statusButtons) => commit ('statusButtons', [...statusButtons]),
		activeStatusButton: ({commit}, activeStatusButton) => commit ('activeStatusButton', activeStatusButton),
		// currentProject: ({commit}, currentProject) => commit ('currentProject', currentProject),
		// currentFile: ({commit}, currentFile) => commit ('currentFile', currentFile)
	},
	mutations:
	{
		menuItems: (state, value) => state.menuItems = value,
		toolbarButtons: (state, value) => state.toolbarButtons = value,
		deviceToolButtons: (state, value) => state.deviceToolButtons = value,
		tabs: (state, value) => state.tabs = value,
		activeTab: (state, value) => state.activeTab = value,
		title: (state, value) => state.title = value,
		devices: (state, value) => state.devices = value,
		device: (state, value) => state.device = value,
		status: (state, value) => state.status = value,
		mode: (state, value) => state.mode = value,
		statusButtons: (state, value) => state.statusButtons = value,
		activeStatusButton: (state, value) => state.activeStatusButton = value,
		// currentProject: (state, value) => state.currentProject = value,
		// currentFile: (state, value) => state.currentFile = value
	}
});

/***/ }),

/***/ 1850:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AboutDialog_vue_vue_type_template_id_1646aa34___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1851);
/* harmony import */ var _AboutDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AboutDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AboutDialog_vue_vue_type_template_id_1646aa34___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AboutDialog_vue_vue_type_template_id_1646aa34___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/studio/workspace/views/AboutDialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1851:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AboutDialog_vue_vue_type_template_id_1646aa34___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1852);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AboutDialog_vue_vue_type_template_id_1646aa34___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AboutDialog_vue_vue_type_template_id_1646aa34___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1852:
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
    { staticClass: "about-box" },
    [
      _c("v-card-title", [
        _c(
          "div",
          { staticClass: "about-logo" },
          [
            _c("v-img", {
              attrs: {
                src:
                  "plugins/studio/workspace/data/img/logo/wyliodrin-studio-about-logo.png"
              }
            }),
            _vm._v(" "),
            _c("span", [
              _vm._v(
                _vm._s(_vm.$t("ABOUT_VERSION")) +
                  " " +
                  _vm._s(_vm.studio.workspace.version)
              )
            ])
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c("v-card-text", [
        _c("div", { staticClass: "developers" }, [
          _c("h3", [_vm._v(_vm._s(_vm.$t("ABOUT_DEVELOPED_BY")))]),
          _vm._v(" "),
          _c("p", [
            _c("strong", [_vm._v("Alexandru Radovici")]),
            _vm._v(" - " + _vm._s(_vm.$t("ABOUT_MAINTAINER")))
          ]),
          _vm._v(" "),
          _c("p", [
            _c("strong", [_vm._v("Ovidiu Stoica")]),
            _vm._v(" - " + _vm._s(_vm.$t("ABOUT_UI_UX")))
          ]),
          _vm._v(" "),
          _c("p", [
            _c("strong", [_vm._v("Ioana Culic")]),
            _vm._v(" - Development Manager")
          ]),
          _vm._v(" "),
          _c("p", [
            _c("strong", [_vm._v("Marius-Andrei Aluculesei")]),
            _vm._v(" - Projects, Application")
          ]),
          _vm._v(" "),
          _c("p", [
            _c("strong", [_vm._v("Cosmin-Daniel Radu")]),
            _vm._v(" - Embedded Software")
          ]),
          _vm._v(" "),
          _c("p", [
            _c("strong", [_vm._v("Liviu-Nicolae Moraru")]),
            _vm._v(" - Embedded Software")
          ]),
          _vm._v(" "),
          _c("p", [
            _c("strong", [_vm._v("Calin Dumitru")]),
            _vm._v(" - Simulators")
          ]),
          _vm._v(" "),
          _c("p", [
            _c("strong", [_vm._v("Diana Ghindaoanu")]),
            _vm._v(" - Notebook, Dashboard, Documentation, Emulator")
          ]),
          _vm._v(" "),
          _c("p", [
            _c("strong", [_vm._v("Teona Severin")]),
            _vm._v(" - Web File System")
          ]),
          _vm._v(" "),
          _c("p", [
            _c("strong", [_vm._v("Iulia Andreea Luta")]),
            _vm._v(" - Docker")
          ]),
          _vm._v(" "),
          _c("p", [
            _c("strong", [_vm._v("Andrei-Paul Zamfir")]),
            _vm._v(" - MicroPython")
          ]),
          _vm._v(" "),
          _c("p", [
            _c("strong", [_vm._v("Ana Marinescu")]),
            _vm._v(" - Pin Layout")
          ]),
          _vm._v(" "),
          _c("p", [
            _c("strong", [_vm._v("Andrei Deatcu")]),
            _vm._v(" - Resistor Color Code, Schematics")
          ]),
          _vm._v(" "),
          _c("p", [
            _c("strong", [_vm._v("Roberta-Alexandra Craciun")]),
            _vm._v(" - Tutorials")
          ]),
          _vm._v(" "),
          _c("p", [
            _c("strong", [_vm._v("Alexandra-Gabriela State")]),
            _vm._v(" - Tutorials")
          ]),
          _vm._v(" "),
          _c("p", [
            _c("strong", [_vm._v("Serban Andrei")]),
            _vm._v(" - GitLab Download")
          ]),
          _vm._v(" "),
          _c("br"),
          _vm._v(" "),
          _c("h3", [_vm._v(_vm._s(_vm.$t("ABOUT_TRANSLATE")))]),
          _vm._v(" "),
          _c("p", [
            _c("strong", [_vm._v("Diana Ghindaoanu")]),
            _vm._v(" - Romanian, French")
          ]),
          _vm._v(" "),
          _c("p", [
            _c("strong", [_vm._v("Simao Gomes Viana")]),
            _vm._v(" - German")
          ]),
          _vm._v(" "),
          _c("p", [
            _c("strong", [_vm._v("Csongor Hegedüs")]),
            _vm._v(" - Hungarian")
          ]),
          _vm._v(" "),
          _c("p", [
            _c("strong", [_vm._v("Ana Marinescu")]),
            _vm._v(" - Japaneese")
          ]),
          _vm._v(" "),
          _c("p", [
            _c("strong", [_vm._v("Veronika Uhrinová")]),
            _vm._v(" - Slovak")
          ]),
          _vm._v(" "),
          _c("p", [
            _c("strong", [_vm._v("Sorina Goran")]),
            _vm._v(" - Spanish")
          ])
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "consent" },
          [
            _c("v-checkbox", {
              attrs: {
                dark: "",
                "hide-details": "",
                dense: "",
                label: _vm.$t("ABOUT_FEEDBACK")
              },
              model: {
                value: _vm.feedback,
                callback: function($$v) {
                  _vm.feedback = $$v
                },
                expression: "feedback"
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
          _c("div", { staticClass: "provided" }, [
            _c("p", [
              _vm._v(_vm._s(_vm.$t("ABOUT_PROVIDED_BY")) + " "),
              _c(
                "a",
                { attrs: { target: "_blank" }, on: { click: _vm.openLink } },
                [_vm._v("Wyliodrin SRL")]
              )
            ])
          ]),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c("v-btn", { attrs: { text: "" }, on: { click: _vm.openLicense } }, [
            _vm._v(_vm._s(_vm.$t("ABOUT_LICENSE")))
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

/***/ 1853:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_AboutDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1854);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_AboutDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1854:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LicenseDialog_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1855);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	name:'AboutDialog',
	data() {
		return {
			feedback: this.studio.settings.loadValue ('workspace', 'feedback', true)
		};
	},
	methods: 
	{
		openLink() {
			this.studio.system.openLink('https://wyliodrin.com/');
		},
		openLicense() {
			// console.log('license');
			this.$root.$emit('submit', undefined);
			this.studio.workspace.showDialog(_LicenseDialog_vue__WEBPACK_IMPORTED_MODULE_0__["default"],{width:800});
		},
		close() {
			this.$root.$emit('submit', undefined);
		}
	},
	watch: {
		feedback (newfeedback)
		{
			this.studio.settings.storeValue ('workspace', 'feedback', newfeedback);
		}
	}
});


/***/ }),

/***/ 1855:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LicenseDialog_vue_vue_type_template_id_5c81385a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1856);
/* harmony import */ var _LicenseDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1858);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _LicenseDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LicenseDialog_vue_vue_type_template_id_5c81385a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LicenseDialog_vue_vue_type_template_id_5c81385a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/studio/workspace/views/LicenseDialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1856:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LicenseDialog_vue_vue_type_template_id_5c81385a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1857);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LicenseDialog_vue_vue_type_template_id_5c81385a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LicenseDialog_vue_vue_type_template_id_5c81385a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1857:
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
    { staticClass: "manager-box" },
    [
      _c("v-card-title", [
        _vm._v("\n\t\t" + _vm._s(_vm.$t("ABOUT_LICENSE_TITLE")) + "\n\t")
      ]),
      _vm._v(" "),
      _c("v-card-text", [
        _c("pre", { staticClass: "license-box" }, [
          _vm._v(" " + _vm._s(_vm.license) + " ")
        ])
      ]),
      _vm._v(" "),
      _c(
        "v-card-actions",
        [
          _c("v-spacer"),
          _vm._v(" "),
          _c("v-btn", { attrs: { text: "" }, on: { click: _vm.exit } }, [
            _vm._v(_vm._s(_vm.$t("EXIT")))
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

/***/ 1858:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_LicenseDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1859);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_LicenseDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1859:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var raw_loader_LICENSE__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1860);
//
//
//
//
//
//
//
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
	data() {
		return {
			license: raw_loader_LICENSE__WEBPACK_IMPORTED_MODULE_0__["default"]
		};
	},
	methods: {
		exit() {
			this.$root.$emit('submit', undefined);
		}
	}
});


/***/ }),

/***/ 1860:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("                                Apache License\n                           Version 2.0, January 2004\n                        http://www.apache.org/licenses/\n\n   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION\n\n   1. Definitions.\n\n      \"License\" shall mean the terms and conditions for use, reproduction,\n      and distribution as defined by Sections 1 through 9 of this document.\n\n      \"Licensor\" shall mean the copyright owner or entity authorized by\n      the copyright owner that is granting the License.\n\n      \"Legal Entity\" shall mean the union of the acting entity and all\n      other entities that control, are controlled by, or are under common\n      control with that entity. For the purposes of this definition,\n      \"control\" means (i) the power, direct or indirect, to cause the\n      direction or management of such entity, whether by contract or\n      otherwise, or (ii) ownership of fifty percent (50%) or more of the\n      outstanding shares, or (iii) beneficial ownership of such entity.\n\n      \"You\" (or \"Your\") shall mean an individual or Legal Entity\n      exercising permissions granted by this License.\n\n      \"Source\" form shall mean the preferred form for making modifications,\n      including but not limited to software source code, documentation\n      source, and configuration files.\n\n      \"Object\" form shall mean any form resulting from mechanical\n      transformation or translation of a Source form, including but\n      not limited to compiled object code, generated documentation,\n      and conversions to other media types.\n\n      \"Work\" shall mean the work of authorship, whether in Source or\n      Object form, made available under the License, as indicated by a\n      copyright notice that is included in or attached to the work\n      (an example is provided in the Appendix below).\n\n      \"Derivative Works\" shall mean any work, whether in Source or Object\n      form, that is based on (or derived from) the Work and for which the\n      editorial revisions, annotations, elaborations, or other modifications\n      represent, as a whole, an original work of authorship. For the purposes\n      of this License, Derivative Works shall not include works that remain\n      separable from, or merely link (or bind by name) to the interfaces of,\n      the Work and Derivative Works thereof.\n\n      \"Contribution\" shall mean any work of authorship, including\n      the original version of the Work and any modifications or additions\n      to that Work or Derivative Works thereof, that is intentionally\n      submitted to Licensor for inclusion in the Work by the copyright owner\n      or by an individual or Legal Entity authorized to submit on behalf of\n      the copyright owner. For the purposes of this definition, \"submitted\"\n      means any form of electronic, verbal, or written communication sent\n      to the Licensor or its representatives, including but not limited to\n      communication on electronic mailing lists, source code control systems,\n      and issue tracking systems that are managed by, or on behalf of, the\n      Licensor for the purpose of discussing and improving the Work, but\n      excluding communication that is conspicuously marked or otherwise\n      designated in writing by the copyright owner as \"Not a Contribution.\"\n\n      \"Contributor\" shall mean Licensor and any individual or Legal Entity\n      on behalf of whom a Contribution has been received by Licensor and\n      subsequently incorporated within the Work.\n\n   2. Grant of Copyright License. Subject to the terms and conditions of\n      this License, each Contributor hereby grants to You a perpetual,\n      worldwide, non-exclusive, no-charge, royalty-free, irrevocable\n      copyright license to reproduce, prepare Derivative Works of,\n      publicly display, publicly perform, sublicense, and distribute the\n      Work and such Derivative Works in Source or Object form.\n\n   3. Grant of Patent License. Subject to the terms and conditions of\n      this License, each Contributor hereby grants to You a perpetual,\n      worldwide, non-exclusive, no-charge, royalty-free, irrevocable\n      (except as stated in this section) patent license to make, have made,\n      use, offer to sell, sell, import, and otherwise transfer the Work,\n      where such license applies only to those patent claims licensable\n      by such Contributor that are necessarily infringed by their\n      Contribution(s) alone or by combination of their Contribution(s)\n      with the Work to which such Contribution(s) was submitted. If You\n      institute patent litigation against any entity (including a\n      cross-claim or counterclaim in a lawsuit) alleging that the Work\n      or a Contribution incorporated within the Work constitutes direct\n      or contributory patent infringement, then any patent licenses\n      granted to You under this License for that Work shall terminate\n      as of the date such litigation is filed.\n\n   4. Redistribution. You may reproduce and distribute copies of the\n      Work or Derivative Works thereof in any medium, with or without\n      modifications, and in Source or Object form, provided that You\n      meet the following conditions:\n\n      (a) You must give any other recipients of the Work or\n          Derivative Works a copy of this License; and\n\n      (b) You must cause any modified files to carry prominent notices\n          stating that You changed the files; and\n\n      (c) You must retain, in the Source form of any Derivative Works\n          that You distribute, all copyright, patent, trademark, and\n          attribution notices from the Source form of the Work,\n          excluding those notices that do not pertain to any part of\n          the Derivative Works; and\n\n      (d) If the Work includes a \"NOTICE\" text file as part of its\n          distribution, then any Derivative Works that You distribute must\n          include a readable copy of the attribution notices contained\n          within such NOTICE file, excluding those notices that do not\n          pertain to any part of the Derivative Works, in at least one\n          of the following places: within a NOTICE text file distributed\n          as part of the Derivative Works; within the Source form or\n          documentation, if provided along with the Derivative Works; or,\n          within a display generated by the Derivative Works, if and\n          wherever such third-party notices normally appear. The contents\n          of the NOTICE file are for informational purposes only and\n          do not modify the License. You may add Your own attribution\n          notices within Derivative Works that You distribute, alongside\n          or as an addendum to the NOTICE text from the Work, provided\n          that such additional attribution notices cannot be construed\n          as modifying the License.\n\n      You may add Your own copyright statement to Your modifications and\n      may provide additional or different license terms and conditions\n      for use, reproduction, or distribution of Your modifications, or\n      for any such Derivative Works as a whole, provided Your use,\n      reproduction, and distribution of the Work otherwise complies with\n      the conditions stated in this License.\n\n   5. Submission of Contributions. Unless You explicitly state otherwise,\n      any Contribution intentionally submitted for inclusion in the Work\n      by You to the Licensor shall be under the terms and conditions of\n      this License, without any additional terms or conditions.\n      Notwithstanding the above, nothing herein shall supersede or modify\n      the terms of any separate license agreement you may have executed\n      with Licensor regarding such Contributions.\n\n   6. Trademarks. This License does not grant permission to use the trade\n      names, trademarks, service marks, or product names of the Licensor,\n      except as required for reasonable and customary use in describing the\n      origin of the Work and reproducing the content of the NOTICE file.\n\n   7. Disclaimer of Warranty. Unless required by applicable law or\n      agreed to in writing, Licensor provides the Work (and each\n      Contributor provides its Contributions) on an \"AS IS\" BASIS,\n      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or\n      implied, including, without limitation, any warranties or conditions\n      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A\n      PARTICULAR PURPOSE. You are solely responsible for determining the\n      appropriateness of using or redistributing the Work and assume any\n      risks associated with Your exercise of permissions under this License.\n\n   8. Limitation of Liability. In no event and under no legal theory,\n      whether in tort (including negligence), contract, or otherwise,\n      unless required by applicable law (such as deliberate and grossly\n      negligent acts) or agreed to in writing, shall any Contributor be\n      liable to You for damages, including any direct, indirect, special,\n      incidental, or consequential damages of any character arising as a\n      result of this License or out of the use or inability to use the\n      Work (including but not limited to damages for loss of goodwill,\n      work stoppage, computer failure or malfunction, or any and all\n      other commercial damages or losses), even if such Contributor\n      has been advised of the possibility of such damages.\n\n   9. Accepting Warranty or Additional Liability. While redistributing\n      the Work or Derivative Works thereof, You may choose to offer,\n      and charge a fee for, acceptance of support, warranty, indemnity,\n      or other liability obligations and/or rights consistent with this\n      License. However, in accepting such obligations, You may act only\n      on Your own behalf and on Your sole responsibility, not on behalf\n      of any other Contributor, and only if You agree to indemnify,\n      defend, and hold each Contributor harmless for any liability\n      incurred by, or claims asserted against, such Contributor by reason\n      of your accepting any such warranty or additional liability.\n\n   END OF TERMS AND CONDITIONS\n\n   APPENDIX: How to apply the Apache License to your work.\n\n      To apply the Apache License to your work, attach the following\n      boilerplate notice, with the fields enclosed by brackets \"[]\"\n      replaced with your own identifying information. (Don't include\n      the brackets!)  The text should be enclosed in the appropriate\n      comment syntax for the file format. We also recommend that a\n      file or class name and description of purpose be included on the\n      same \"printed page\" as the copyright notice for easier\n      identification within third-party archives.\n\n   Copyright 2019 Wyliodrin SRL\n\n   Licensed under the Apache License, Version 2.0 (the \"License\");\n   you may not use this file except in compliance with the License.\n   You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n   Unless required by applicable law or agreed to in writing, software\n   distributed under the License is distributed on an \"AS IS\" BASIS,\n   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n   See the License for the specific language governing permissions and\n   limitations under the License.\n");

/***/ }),

/***/ 1862:
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"wyliodrinstudio\",\"version\":\"2.4.0\",\"description\":\"Wyliodrin STUDIO is an educational platform for IoT and Embedded Linux systems\",\"main\":\"main.js\",\"scripts\":{\"test\":\"echo \\\"Error: no test specified\\\" && exit 1\",\"start\":\"electron build/\",\"pack\":\"webpack --env.NODE_ENV=production && electron-builder --dir\",\"dist\":\"webpack --env.NODE_ENV=production && electron-builder\",\"electron\":\"webpack\",\"browser\":\"webpack --config=webpack.browser.config.js\",\"electron-production\":\"webpack --env.NODE_ENV=production\",\"browser-production\":\"webpack --config=webpack.browser.config.js --env.NODE_ENV=production\",\"electron-format\":\"webpack --env.FORMAT=yes\",\"browser-format\":\"webpack --config=webpack.browser.config.js --env.FORMAT=yes\",\"clean\":\"rm -rf build/ dist\"},\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/wyliodrinstudio/WyliodrinSTUDIO.git\"},\"author\":\"Wyliodrin SRL\",\"license\":\"Apache-2.0\",\"bugs\":{\"url\":\"https://github.com/wyliodrinstudio/WyliodrinSTUDIO/issues\"},\"build\":{\"publish\":[{\"provider\":\"github\"}],\"buildDependenciesFromSource\":true,\"appId\":\"wyliodrin.studio\",\"artifactName\":\"WyliodrinSTUDIO-${version}.${ext}\",\"mac\":{\"category\":\"public.app-category.developer-tools\",\"icon\":\"source/img/icons/mac/wyliodrin-studio-logo.icns\"},\"snap\":{\"plugs\":[\"default\",\"network-bind\",\"serial-port\"]},\"linux\":{\"desktop\":{\"Name\":\"Wyliodrin STUDIO\",\"Type\":\"Application\",\"Terminal\":false},\"category\":\"Development\",\"vendor\":\"Wyliodrin SRL\",\"icon\":\"source/img/wyliodrin-studio-logo.png\"},\"win\":{\"icon\":\"source/img/icons/win/wyliodrin-studio-logo.ico\"},\"copyright\":\"Copyright &copy; 2020, Wyliodrin SRL\",\"productName\":\"Wyliodrin STUDIO\",\"directories\":{\"app\":\"build\"}},\"homepage\":\"https://wyliodrin.studio\",\"devDependencies\":{\"@mdi/font\":\"^4.4.95\",\"axios\":\"^0.21.1\",\"brace\":\"^0.11.1\",\"chartjs-gauge\":\"^0.2.0\",\"copy-webpack-plugin\":\"^6.0.3\",\"countly-sdk-web\":\"^20.4.0\",\"css-loader\":\"^3.0.0\",\"dexie\":\"^3.0.2\",\"electron\":\"^9.4.0\",\"electron-builder\":\"^22.11.5\",\"electron-rebuild\":\"^2.0.0\",\"eslint\":\"^7.7.0\",\"eslint-loader\":\"^4.0.2\",\"eslint-plugin-vue\":\"^6.2.2\",\"file-loader\":\"^6.0.0\",\"highlight.js\":\"^10.4.1\",\"html-webpack-plugin\":\"^4.3.0\",\"jquery\":\"^3.5.1\",\"jszip\":\"^3.3.0\",\"katex\":\"^0.12.0\",\"less\":\"^3.12.1\",\"less-loader\":\"^6.2.0\",\"marked\":\"git+https://github.com/wyliodrinstudio/marked.git\",\"material-design-icons\":\"^3.0.1\",\"material-design-icons-iconfont\":\"^4.0.5\",\"material-icons\":\"^0.3.1\",\"moment\":\"^2.27.0\",\"moment-timezone\":\"^0.5.31\",\"monaco-editor\":\"^0.20.0\",\"monaco-editor-webpack-plugin\":\"^1.9.0\",\"msgpack5\":\"^4.5.1\",\"mustache\":\"^4.0.1\",\"node-blockly\":\"^1.2.8\",\"raw-loader\":\"^3.1.0\",\"reconnectingwebsocket\":\"^1.0.0\",\"semver\":\"^7.3.2\",\"style-loader\":\"^1.2.1\",\"uuid\":\"^8.3.0\",\"validator\":\"^10.11.0\",\"vue\":\"^2.6.12\",\"vue-async-computed\":\"^3.9.0\",\"vue-chartjs\":\"^3.5.1\",\"vue-grid-layout\":\"^2.3.11\",\"vue-i18n\":\"^8.21.0\",\"vue-loader\":\"^15.9.3\",\"vue-monaco\":\"^1.2.1\",\"vue-multipane\":\"^0.9.5\",\"vue-swatches\":\"^2.1.0\",\"vue-template-compiler\":\"^2.6.12\",\"vue2-ace-editor\":\"0.0.15\",\"vue2-highcharts\":\"^1.2.5\",\"vuedl\":\"0.3.4\",\"vuetify\":\"2.3.9\",\"vuetify-dialog\":\"^0.3.6\",\"vuex\":\"^3.5.1\",\"webpack\":\"^4.44.1\",\"webpack-cli\":\"^3.3.12\",\"webpack-node-externals\":\"^1.7.2\",\"xml-js\":\"^1.6.11\",\"xterm\":\"^4.8.1\"},\"eslintConfig\":{\"env\":{\"es6\":true,\"node\":true,\"browser\":true,\"mocha\":false},\"globals\":{\"node\":true},\"parserOptions\":{\"ecmaVersion\":2018,\"sourceType\":\"module\"},\"plugins\":[\"vue\"],\"extends\":[\"eslint:recommended\",\"plugin:vue/essential\"],\"rules\":{\"indent\":[\"error\",\"tab\",{\"SwitchCase\":1}],\"linebreak-style\":[\"error\",\"unix\"],\"no-console\":[\"error\"],\"quotes\":[\"error\",\"single\"],\"semi\":[\"error\",\"always\"],\"require-await\":[\"error\"]}},\"dependencies\":{\"aedes\":\"^0.42.5\",\"axios\":\"^0.21.1\",\"bonjour-hap\":\"^3.5.4\",\"chart.js\":\"^2.9.4\",\"dapjs\":\"^2.3.0\",\"drivelist\":\"^8.0.6\",\"electron-is-dev\":\"^1.1.0\",\"electron-updater\":\"^4.2.0\",\"fs-extra\":\"^7.0.1\",\"grabity\":\"^1.0.5\",\"irc-upd\":\"^0.10.0\",\"serialport\":\"^9.0.1\",\"ssh2\":\"^0.8.9\",\"tree-kill\":\"^1.2.1\",\"unzipper\":\"^0.10.5\",\"usb\":\"^1.6.4\"}}");

/***/ }),

/***/ 1863:
/***/ (function(module) {

module.exports = JSON.parse("{\"LANGUAGES\":{\"de\":\"Deutsch\",\"en\":\"English\",\"es\":\"Español\",\"fr\":\"Français\",\"hu\":\"Magyar\",\"jp\":\"日本語\",\"ro\":\"Română\",\"sk\":\"Slovenský\"},\"TRANSLATION\":{\"de\":{\"PROJECT_DASHBOARD\":\"Übersicht\",\"DASHBOARD_SIGNAL_NAME\":\"Signalname *\",\"DASHBOARD_SIGNAL_DESCRIPTION\":\"Beschreibung\",\"DASHBOARD_SIGNAL_COLOR\":\"Farbe\",\"NAME\":\"Name\",\"DASHBOARD_ADD_SIGNAL\":\"Hinzufügen\",\"IMAGE_GRAPH\":\"Bild\",\"DASHBOARD_ADDIMAGE\":\"Bild -Signal hinzufügen\",\"LINE_GRAPH\":\"Linie\",\"DASHBOARD_ADDLINE\":\"Linie - Signal hinzufügen\",\"PIN_LAYOUT\":\"Pinbelegung\",\"PROJECT_SHELL\":\"Befehlszeile\",\"DEVICE_WYAPP_RUN\":\"Ausführen\",\"DEVICE_WYAPP_STOP\":\"Stop\",\"DEVICE_WYAPP_TASK_MANAGER\":\"Task Manager\",\"DEVICE_WYAPP_PACKAGE_MANAGER\":\"Paketmanager\",\"DEVICE_WYAPP_NETWORK_MANAGER\":\"Netzwerkmanager\",\"DEVICE_WYAPP_DISCONNECT\":\"Verbindung trennen\",\"DEVICE_WYAPP_RESTART\":\"Verbindung trennen und Neustart\",\"DEVICE_WYAPP_TURNOFF\":\"Verbindung trennen und herunterfahren\",\"PROJECT_NOTEBOOK\":\"Notebook\",\"PROJECT_APPLICATION\":\"Awedung\",\"PROJECT_NEW_FOLDER\":\"Neuer Ordner\",\"PROJECT_NEW_FILE\":\"Neue Datei\",\"PROJECT_HIDE_CONSOLE\":\"Konsole ausblenden\",\"PROJECT_WELCOME_CREATE_NEW_APP\":\"Neue Anwendung erstellen\",\"PROJECT_LIBRARY_IMPORT\":\"Import\",\"PROJECT_LIBRARY_RENAME\":\"Umbenennen\",\"PROJECT_LIBRARY_DELETE\":\"Löschen\",\"PROJECT_LIBRARY_CLOSE\":\"Schließen\",\"PROJECT_LIBRARY_EXPORT\":\"Export\",\"PROJECT_LIBRARY_OPTIONS\":\"Optionen\",\"PROJECT_LIBRARY_PROJECTS\":\"Projekte\",\"PROJECT_LIBRARY_LOAD_EXAMPLE\":\"Beispiel laden\",\"PROJECT_LIBRARY_CLONE\":\"Klonen\",\"LANGUAGE\":\"Deutsch\",\"WORKSPACE_TOOLBAR_EXIT\":\"Verlassen\",\"WORKSPACE_TOOLBAR_FULLSCREEN\":\"Maximieren\",\"WORKSPACE_TOOLBAR_RESTORE\":\"Wiederherstellen\",\"WORKSPACE_TOOLBAR_MINIMIZE\":\"Minimieren\",\"WORKSPACE_TOOLBAR_SETUP\":\"Einrichtung\",\"WORKSPACE_TOOLBAR_ABOUT\":\"Über\",\"WORKSPACE_PROJECT_NOTEBOOK\":\"Notebook\",\"WORKSPACE_DEVICE_CONNECT\":\"Verbinden\",\"WORKSPACE_BOARD_CONNECT\":\"Wählen Sie ein Gerät aus, mit dem Sie eine Verbindung herstellen möchten\",\"CLOSE\":\"Schließen\",\"WORKSPACE_PROJECT_LIBRARY\":\"Projektbibliothek\",\"WORKSPACE_DEVICE_DISCONNECT\":\"Verbindung trennen\",\"WORKSPACE_TOOLBAR_EXIT_QUESTION\":\"Soll die Anwendung beendet werden?\",\"YES\":\"Ja\",\"NO\":\"Nein\",\"EXIT\":\"Beenden\"},\"en\":{\"PROJECT_DASHBOARD\":\"Dashboard\",\"DASHBOARD_LOAD_DATA_ERROR\":\"Failed to load the dashboard\",\"DASHBOARD_VIEWER_INVALID_SIGNAL\":\"Signal name invalid\",\"DASHBOARD_VIEWER_MOVE_LEFT\":\"Move left\",\"DASHBOARD_VIEWER_MOVE_RIGHT\":\"Move right\",\"DASHBOARD_VIEWER_GRAPH_SETTINGS\":\"Graph settings\",\"DASHBOARD_VIEWER_ERASE_GRAPH\":\"Erase graph\",\"DASHBOARD_SIGNAL_NAME\":\"Signal Name *\",\"DASHBOARD_SIGNAL_DESCRIPTION\":\"Description\",\"DASHBOARD_SIGNAL_COLOR\":\"Color\",\"NAME\":\"Name\",\"DASHBOARD_ADD_SIGNAL\":\"Add\",\"DASHBOARD_LOW_COLOR\":\"Low color\",\"DASHBOARD_LOW_VALUE\":\"Low value\",\"DASHBOARD_MID_COLOR\":\"Mid color\",\"DASHBOARD_MID_VALUE\":\"Mid value\",\"DASHBOARD_HIGH_COLOR\":\"High color\",\"DASHBOARD_MIN_AXES_VALUE\":\"Minimum value\",\"DASHBOARD_MAX_AXES_VALUE\":\"Maximum value\",\"DASHBOARD_KILOMETERS\":\"Kilometers\",\"DASHBOARD_MILES\":\"Miles\",\"DASHBOARD_MIN_VALUE\":\"Minimum axes value\",\"DASHBOARD_MAX_VALUE\":\"Maximum axes value\",\"DASHBOARD_AXIS_NAME\":\"Axis name\",\"DASHBOARD_DELETE_TITLE\":\"Delete Signal\",\"DASHBOARD_DELETE_QUESTION\":\"Are you sure you want to delete this signal?\",\"DASHBOARD_NO_TITLE\":\"Please choose a name for the signal.\",\"DASHBOARD_UNKNOWN_TITLE\":\"(no signal)\",\"GAUGE_GRAPH\":\"Gauge\",\"DASHBOARD_ADDGAUGE\":\"Gauge - Add signal\",\"IMAGE_GRAPH\":\"Image\",\"DASHBOARD_ADDIMAGE\":\"Image - Add signal\",\"LINE_GRAPH\":\"Line\",\"DASHBOARD_ADDLINE\":\"Line - Add signal\",\"LINE_STYLE\":\"Style\",\"LINE_HIDE_LEGEND\":\"Hide legend\",\"LINE_FIX_AXES_VALUES\":\"Fix axes values\",\"LINE_LOGARITHMIC_AXES\":\"Logarithmic axes\",\"LINE_TIME_SERIES\":\"Time series\",\"LINE_SHOW_POINTS\":\"Show points\",\"LINE_MAX_POINTS\":\"Maximum points to show (0 means show all)\",\"LINE_X_AXIS_TITLE\":\"X Axis Title\",\"LINE_Y_AXIS_TITLE\":\"Y Axis Title\",\"LINE_OVERVIEW\":\"Show overview\",\"LINE_SCROLLBAR\":\"Show scrollbar\",\"LINE_STEP\":\"Step\",\"LINE_STRAIGHT\":\"Straight\",\"LINE_SPLINE\":\"Spline\",\"DEVICE_MP_RUN\":\"Run\",\"DEVICE_MP_STOP\":\"Stop\",\"DEVICE_MP_RESTART\":\"Reset\",\"DEVICE_MP_CONNECT\":\"CONNECT\",\"DEVICE_MP_EXIT\":\"Exit\",\"DEVICE_MP_FILES\":\"File System\",\"DEVICE_MP_DEPLOY\":\"Deploy\",\"DEVICE_MP_FLAG_HEADER\":\"Enable WebSerial\",\"DEVICE_MP_FLAG_STEP_ONE\":\"1. You need Google Chrome for this feature\",\"DEVICE_MP_FLAG_STEP_TWO\":\"2. In the Chrome search bar we will look for: chrome: // flags\",\"DEVICE_MP_FLAG_STEP_THREE\":\"3. Search the search bar in the flags: # enable-experimental-web-platform-features\",\"DEVICE_MP_FLAG_STEP_FOUR\":\"4. Give the ENABLE flag: Experimental Web Platform features\",\"DEVICE_MP_FLAG_STEP_FIVE\":\"5. At the bottom right we access the RELAUNCH button\",\"DEVICE_MP_FLAG_STEP_SIX\":\"After restarting the browser we will be able to use the browser version.\",\"DEVICE_MP_FLAG_CAREFUL\":\"CAREFUL! To work you must be on a secure connection\",\"DEVICE_MP_SERIAL_OPTIONS\":\"Connect via Serial\",\"DEVICE_MP_SERIAL_BAUDRATE\":\"Serial connection speed\",\"DEVICE_MP_VARIANT\":\"MicroPython Variant\",\"DEVICE_MP_CHECKBOX\":\"Do you want to restart the board when connecting?\",\"DEVICE_MP_AUTODETECT\":\"Detect Automatically\",\"DEVICE_MP_RESET_AFTER_CONNECT\":\"Reset after connect\",\"DEVICE_MP_BROWSER_HEADER\":\"Browser not supported\",\"DEVICE_MP_HTTPS_HEADER\":\"Use a secure connection\",\"DEVICE_MP_HTTPS_MESSAGE\":\"Please upgrade to a secure connection to use MicroPython.\",\"DEVICE_MP_HTTPS_SWITCH_CONNECTION\":\"Switch to secure connection\",\"DEVICE_MP_FLASH\":\"FLASH\",\"PIN_LAYOUT\":\"Pin Layout\",\"PROJECT_SHELL\":\"Shell\",\"SHELL_NO_SHELL\":\"Connect to a device to enable the shell\",\"TOCK_OS_APP_BOARD_SETTINGS\":\"App Board Settings\",\"TOCK_OS_STACK_SIZE\":\"Stack Size\",\"TOCK_OS_APP_HEAD_SIZE\":\"APP Heap Size\",\"TOCK_OS_KERNEL_HEAP_SIZE\":\"Kernel Heap Size\",\"TOCK_OS_SELECT_FLASHING_METHOD\":\"Select Flashing Method\",\"TOCK_OS_FLASHING_OPTIONS_TOCKLOADER\":\"Tockloader\",\"TOCK_OS_FLASHING_OPTIONS_SINGLE_BINARY\":\"Single Binary\",\"DEVICE_WYAPP_RUN\":\"Run\",\"DEVICE_WYAPP_STOP\":\"Stop\",\"DEVICE_WYAPP_TASK_MANAGER\":\"Task Manager\",\"DEVICE_WYAPP_PACKAGE_MANAGER\":\"Package Manager\",\"DEVICE_WYAPP_NETWORK_MANAGER\":\"Network Manager\",\"DEVICE_WYAPP_DISCONNECT\":\"Disconnect\",\"DEVICE_WYAPP_RESTART\":\"Reboot and Disconnect\",\"DEVICE_WYAPP_TURNOFF\":\"Power Off and Disconnect\",\"DEVICE_WYAPP_ANOTHER_USER\":\"The device is already connected to another user.\",\"DEVICE_WYAPP_SETTINGS\":\"Device Settings\",\"DEVICE_WYAPP_NAME\":\"Name\",\"DEVICE_WYAPP_VERSION\":\"Version\",\"DEVICE_WYAPP_LIBWYLIODRIN\":\"Wyliodrin Library Version\",\"DEVICE_WYAPP_OS\":\"Operating system\",\"DEVICE_WYAPP_LANGUAGES\":\"Languages\",\"DEVICE_WYAPP_WIREDNETWORK_IP\":\"IP\",\"DEVICE_WYAPP_WIREDNETWORK_MASK\":\"Mask\",\"DEVICE_WYAPP_WIREDNETWORK_BROADCAST\":\"Broadcast\",\"DEVICE_WYAPP_WIREDNETWORK_HARDWARE\":\"Hardware Address\",\"DEVICE_WYAPP_UNINSTALL\":\"Uninstall\",\"DEVICE_WYAPP_WYLIODRIN_DEVICENAME\":\"Device name\",\"DEVICE_WYAPP_INSTALL\":\"Install\",\"DEVICE_WYAPP_PACKAGE_INSTALL_ERROR\":\"Failed to install {language} package {packageName}.\",\"DEVICE_WYAPP_PACKAGE_UNINSTALL_ERROR\":\"Failed to uninstall {language} package {packageName}.\",\"DEVICE_WYAPP_SSID\":\"Network Name\",\"DEVICE_WYAPP_PSK\":\"Network Passphrase\",\"DEVICE_WYAPP_CONNECT\":\"Connect\",\"DEVICE_WYAPP_SSID_OTHER_NETWORK\":\"Other Network\",\"DEVICE_WYAPP_REFRESH\":\"Refresh\",\"DEVICE_WYAPP_FILE_MANAGER\":\"File manager\",\"DEVICE_WYAPP_ERROR_PROJECT_RUN\":\"Please open a project\",\"DEVICE_WYAPP_NO_DIRECTORY\":\"There is no directory selected\",\"DEVICE_WYAPP_FILESYSTEM\":\"File System\",\"DEVICE_WYAPP_RUN_DEPLOY\":\"Deployment Settings\",\"DEVICE_WYAPP_DOCKERFILE\":\"Dockerfile \",\"DEVICE_WYAPP_DEPLOY\":\"Deploy\",\"DEVICE_WYAPP_DELETE\":\"Delete\",\"YES\":\"Yes\",\"NO\":\"No\",\"DEVICE_WYAPP_DEPLOYMENTS\":\"Deployments\",\"DEVICE_WYAPP_REMOVE_CONTAINER\":\"Remove container at exit\",\"DEIVCE_WYAPP_ADDITIONAL_OPTIONS\":\"Additional options\",\"DEVICE_WYAPP_DETACHED\":\"Service\",\"DEVICE_WYAPP_INTERACTIVE_CONSOLE\":\"Interactive\",\"DEVICE_WYAPP_PRIVILEGED_CONTAINER\":\" Privileged container\",\"DEVICE_WYAPP_NO_RESTART\":\"Do not restart\",\"DEVICE_WYAPP_RESTART_ON_FAILURE\":\"On failure\",\"DEVICE_WYAPP_RESTART_ALWAYS\":\"Always\",\"DEVICE_WYAPP_RESTART_UNLESS_STOPPED\":\"Unless stopped\",\"DEVICE_WYAPP_DEFAULT_NETWORK\":\"Private\",\"DEVICE_WYAPP_HOST_NETWORK\":\"Same as device\",\"DEVICE_WYAPP_NETWORK_OPTIONS\":\"Network options\",\"DEVICE_WYAPP_RESTART_OPTIONS\":\"Restart options\",\"DEVICE_WYAPP_PROCESS_OPTIONS\":\"Process options\",\"DEVICE_WYAPP_NO_CONTAINERS\":\"There are no containers\",\"DEVICE_WYAPP_WEBSOCKET_SOCKET_CONNECTED\":\"Authenticated to websocket device server\",\"DEVICE_WYAPP_WEBSOCKET_SOCKET_ERROR\":\"Server error\",\"DEVICE_WYAPP_WEBSOCKET_SOCKET_DISCONNECTED\":\"Disconnected from the websocket devices server\",\"DEVICE_WYAPP_WEBSOCKET_INSTANCE_RESET_TITLE\":\"Use Studio here?\",\"DEVICE_WYAPP_WEBSOCKET_INSTANCE_RESET\":\"There is another Studio instance connected to the server with your id. You are not able to use multiple connections. Would you like to use Studio here?\",\"DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_TITLE\":\"Add Web Device\",\"DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_NAME\":\"Device Name\",\"DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_NAME_NOT_VALID\":\"Please enter a valid device name\",\"DEVICE_WYAPP_WEBSOCKET_SET_USER_ID\":\"Session ID\",\"DEVICE_WYAPP_WEBSOCKET_SET_USER_ID_TITLE\":\"Session ID\",\"DEVICE_WYAPP_WEBSOCKET_SET_USER_ID_TEXT\":\"Unique ID used to connect to the devices, it's like a password.\",\"DEVICE_WYAPP_WEBSOCKET_SET_USER_ID_NO_UUID\":\"The session ID must be a valid UUID.\",\"DEVICE_WYAPP_WEBSOCKET_MORE_INFO\":\"More Information\",\"DEVICE_WYAPP_WEBSOCKET_SETUP_WIFI\":\"Setup WiFi\",\"DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_TYPE\":\"Device\",\"DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_DOWNLOAD\":\"Download\",\"DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_DOWNLOAD_PART2\":\"to the board at\",\"DOCUMENTATION\":\"Documentation\",\"TOOLBAR_RESISTOR_COLOR_CODE\":\"Resistor color code\",\"RESISTOR_COLORCODE_FROM_COLOR_TO_NUMBER\":\"FROM COLOR TO NUMBER\",\"RESISTOR_COLORCODE_FROM_NUMBER_TO_COLOR\":\"FROM NUMBER TO COLOR\",\"RESISTOR_COLORCODE_STRIPES\":\"Stripes\",\"VALUE_FOUR\":\"Four\",\"VALUE_FIVE\":\"Five\",\"RESISTOR_COLORCODE_STRIPE_ONE\":\"Stripe 1\",\"RESISTOR_COLORCODE_STRIPE_TWO\":\"Stripe 2\",\"RESISTOR_COLORCODE_STRIPE_THREE\":\"Stripe 3\",\"RESISTOR_COLORCODE_STRIPE_FOUR\":\"Stripe 4\",\"RESISTOR_COLORCODE_STRIPE_FIVE\":\"Stripe 5\",\"VALUE_VALUE\":\"Value\",\"RESISTOR_COLORCODE_RESISTANCE\":\"Resistance\",\"VALUE_TOLERANCE\":\"Tolerance\",\"WELCOME_TEXT\":\"Welcome to Wyliodrin STUDIO\",\"WELCOME_START_WORK\":\"You can start creating new applications, set up boards or import your own projects.\",\"WELCOME_CREATE_APP\":\"Create a new application\",\"WELCOME_CONNECT_BOARD\":\"Connect board\",\"TOOLBAR_FLASH\":\"Flash MicroPython\",\"FLASH_SELECT_BOARD\":\"Select board to flash\",\"FLASH_ESP\":\"Flash MicroPython ESP Boards\",\"FLASH_MICROBIT\":\"Flash MicroPython Micro:bit\",\"START\":\"START\",\"BACK\":\"BACK\",\"CANCEL\":\"CANCEL\",\"SELECT\":\"SELECT\",\"FLASH_CANCEL_DIALOG\":\"Cancel Flashing\",\"FLASH_CANCEL_TEXT_QUESTION\":\"Are you sure you want to cancel?\",\"FLASH_CANCEL_TEXT\":\"The board will be unusable until you flash it.\",\"FLASH_SELECT_DEVICE\":\"Select the device to flash\",\"FLASH_WRITING_PROGRESS\":\"Writing progress:\",\"FLASH_CONNECTING_TEXT\":\"Connecting to device...\",\"FLASH_INITIALIZING_TEXT\":\"Initializing device...\",\"FLASH_UNKNOWN_BOARD_TEXT\":\"Unknown board\",\"FLASH_ERASING_DEVICE_TEXT\":\"Erasing device...\",\"FLASH_COMPLETE_TEXT\":\"All done!\",\"FLASH_DISCONNECTING_TEXT\":\"Disconnecting from device...\",\"FLASH_ERROR_DEVICE_NOT_FOUND\":\"Error: Device not found, please try again.\",\"TOCK_OS_SELECT_BOARD\":\"Select Board\",\"TOCK_OS_SELECT_EXAMPLE\":\"Select Example\",\"TOCK_OS_STATUS_FETCHING\":\"Fetching infos...\",\"TOCK_OS_STATUS_DOWNLOADING\":\"Downloading...\",\"TOCK_OS_STATUS_FINISHED\":\"Finished...\",\"TOCK_OS_SELECT_RELEASE_VERSION\":\"Select Tock Release Version\",\"PATREON_SPONSOR\":\"Sponsor\",\"PATREON_SPONSOR_TITLE\":\"Please sponsor the Wyliodrin STUDIO project\",\"PATREON_SPONSOR_TEXT\":\"Wyliodrin STUDIO is a free and open source project. You sponsorship allows us to maintain the project and offer it for free. Thank you.\",\"PATREON_SPONSOR_NOW\":\"Sponsor\",\"PATREON_SPONSOR_LATER\":\"Later\",\"EDITOR_VISUAL_SHOW_CODE\":\"Show Code\",\"EDITOR_VISUAL_HIDE_CODE\":\"Hide Code\",\"PROJECT_NOTEBOOK\":\"Notebook\",\"NOTEBOOK_SELECT_IMAGE_ERROR\":\"Please select an image.\",\"NOTEBOOK_SELECT_FILE_ERROR\":\"Please select a valid image.\",\"NOTEBOOK_DELETE_ITEM_QUESTION\":\"Are you sure you want to delete this element?\",\"NOTEBOOK_DELETE_ITEM_TITLE\":\"Delete element\",\"NOTEBOOK_LOAD_DATA_ERROR\":\"Unable to load the notebook data ({error})\",\"NOTEBOOK_RESET_NOTEBOOK_TITLE\":\"Reset Notebook\",\"NOTEBOOK_RESET_NOTEBOOK_QUESTION\":\"Are you sure you want to reset the notebook?\\nYou will lose all the notes for this project.\",\"NOTEBOOK_LOAD_PROJECT\":\"Load a project to display the notebook\",\"PROJECT_APPLICATION\":\"Application\",\"PROJECT_DELETE_FOLDER\":\"Delete Folder\",\"PROJECT_RENAME_FOLDER\":\"Rename folder\",\"PROJECT_NEW_FOLDER\":\"New folder\",\"PROJECT_NEW_FOLDER_NAME\":\"New Folder Name\",\"PROJECT_FOLDER_SURE\":\"Are you sure you want to delete this folder?\",\"PROJECT_DELETE_FILE\":\"Delete File\",\"PROJECT_RENAME_FILE\":\"Rename File\",\"PROJECT_NEW_FILE\":\"New File\",\"PROJECT_IMPORT_FILE\":\"Import File\",\"PROJECT_EXPORT_FILE\":\"Export File\",\"PROJECT_NEW_FILE_NAME\":\"New File Name\",\"PROJECT_FILE_SURE\":\"Are you sure you want to delete this file?\",\"PROJECT_NEW_NAME\":\"New Name\",\"PROJECT_DELETE_PROJECT\":\"Delete project\",\"PROJECT_LOAD_PROJECT\":\"Load a project from the library\",\"PROJECT_PROJECT_SURE\":\"Are you sure you want to delete this project?\",\"PROJECT_HIDE_CONSOLE\":\"Hide Console\",\"PROJECT_WELCOME_CREATE_NEW_APP\":\"Create New Application\",\"PROJECT_LIBRARY\":\"Projects Library\",\"PROJECT_LIBRARY_NAME\":\"Project name\",\"PROJECT_LIBRARY_NEW_PROJECT\":\"Create project\",\"PROJECT_LIBRARY_RENAME\":\"Rename\",\"PROJECT_LIBRARY_DELETE\":\"Delete\",\"PROJECT_LIBRARY_CLONE\":\"Clone\",\"PROJECT_LIBRARY_IMPORT\":\"Import\",\"PROJECT_LIBRARY_CLOSE\":\"Close\",\"PROJECT_LIBRARY_EXPORT\":\"Export\",\"PROJECT_LIBRARY_PROJECTS\":\"Projects\",\"PROJECT_LIBRARY_OPTIONS\":\"Options\",\"PROJECT_LIBRARY_LOAD_EXAMPLE\":\"Load an Example\",\"PROJECT_ERROR_LANGUAGE_ADDON\":\"Register addon failed for language {language}\",\"PROJECT_ERROR_REGISTER_EDITOR\":\"Register editor failed for name {name} editor already registered\",\"PROJECT_ERROR_LOAD_PROJECTS\":\"Error while loading the projects ({error})\",\"PROJECT_ERROR_SELECT_PROJECT\":\"Error while selecting project {project} ({error})\",\"PROJECT_ERROR_CREATE_PROJECT\":\"Error while creating project {project} ({error})\",\"PROJECT_ERROR_RENAME_PROJECT\":\"Error while renaming project {project} to {name} ({error})\",\"PROJECT_ERROR_CLONE_PROJECT\":\"Error while cloning project {project} ({error})\",\"PROJECT_ERROR_DELETE_PROJECT\":\"Error while deleting project {project} ({error})\",\"PROJECT_ERROR_IMPORT_PROJECT\":\"Error while importing project {project} ({error})\",\"PROJECT_ERROR_EXPORT_PROJECT\":\"Error while exporting project {project} ({error})\",\"PROJECT_ERROR_NEW_FOLDER\":\"Error while creating new folder {folder} ({error})\",\"PROJECT_ERROR_NEW_FILE\":\"Error while creating new file {file} ({error})\",\"PROJECT_ERROR_RENAME_OBJECT\":\"Error while renaming object {object} ({error})\",\"PROJECT_ERROR_DELETE_FOLDER\":\"Error while deleting folder {folder} ({error})\",\"PROJECT_ERROR_DELETE_FILE\":\"Error while deleting file {file} ({error})\",\"PROJECTS_JSON_DO_NOT\":\"Tried to edit project.json, DO NOT DO THIS\",\"PROJECT_ERROR_SAVE_FILE\":\"Error while saving file {file} ({error})\",\"PROJECT_ERROR_LOAD_FILE\":\"Error while loading file {file} ({error})\",\"PROJECT_ERROR_READ_DATA\":\"Error while reading data for project {project} ({error})\",\"PROJECT_ERROR_NOT_FOLDER\":\"Project folder {project} is not a folder\",\"PROJECT_ERROR_SAVE_SPECIAL_FILE\":\"Error while saving special file {file} with data ({error})\",\"PROJECT_ERROR_LOAD_SPECIAL_FILE\":\"Error while loading special file {file} ({error})\",\"PROJECT_ERROR_SEND_CODE\":\"Error while sending file code {file} ({error})\",\"PROJECT_ERROR_PATH_INVALID\":\"Error, path is not inside the workspace folder\",\"PROJECT_ERROR_CHANGE_DATE\":\"Error, cannot write date {project} ({error})\",\"PROJECT_JSON_DO_NOT\":\"Tried to edit project.json, DO NOT DO THIS\",\"PROJECT_CLONE_PROJECT\":\"Clone Project\",\"PROJECT_RENAME_PROJECT\":\"Rename Project\",\"PROJECT_NAME_PROMPT\":\"Please input the name of the project\",\"PROJECT_LIBRARY_SEARCH\":\"Search\",\"PROJECT_NULL\":\"One or more parameters are null\",\"PATH_NULL\":\"A path is null\",\"PROJECTS_NO_PROJECT\":\"You don't have any projects yet\",\"PROJECTS_CREATE_APPLICATION\":\"Click the \\\"Create new Application\\\" button below\",\"PROJECTS_STORAGE_NOT_PERSISTENT\":\"The storage system is not persistent. This means your projects might be deleted any time without notice. To avoid this, please export your projects frequently.\",\"PROJECTS_STORAGE_ASK_PERSISTENT\":\"The storage system is not persistent. Please allow permission to make the storage peristent.\",\"PROJECTS_STORAGE_BUTTON_ASK_PERSISTENT\":\"Allow Persistance\",\"PROJECTS_STORAGE_BROWSER_ERROR\":\"If your browser didn't ask you if you allow persistence, there might be an issue with your browser. To prevent losing your projects, you should add this website to the bookmarks, use it more often and frequenlty export your projects. We also recommend you to use Firefox.\",\"PROJECTS_NO_FILE\":\"There is no file selected, please either import, create or select a file\",\"PROJECTS_EXTENSION_URECOGNIZED\":\"The file extension is not recognized\",\"PROJECTS_INVALID_PROJECT\":\"You have oppened an invalid project, please select another one\",\"PROJECT_EXISTS_PROMPT\":\"A project with that name already exists\",\"PROJECTS_READ_ONLY_FILE_SYSTEM\":\"The stoarge space is READ ONLY, projects can only be opened.\",\"PROJECT_ERROR_SAVE_SCHEMATIC\":\"Error while saving schematic {file} with data ({error})\",\"PROJECT_ERROR_LOAD_SCHEMATIC\":\"Error while loading schematic {file} ({error})\",\"SCHEMATICS\":\"Schematics\",\"ADD_SCHEMATIC\":\"Add schematics\",\"DELETE_SCHEMATIC\":\"Delete schematics\",\"DELETE_MESSAGE\":\"Are you sure you want to delete it ?\",\"DELETE_CONFIRMATION\":\"Delete confirmation\",\"SCHEMATICS_IMPORT\":\"Import your .svg schematics from Fritzing\",\"SCHEMATICS_IMPORT_ERROR\":\"Error importing schematics: {error}\",\"DEVICE_SIMULATOR_RASPBERRY_PI\":\"Raspberry Pi Simulator\",\"DEVICE_SIMULATOR_RASPBERRY_PI_RUN\":\"Run\",\"DEVICE_SIMULATOR_RASPBERRY_PI_STOP\":\"Stop\",\"DEVICE_SIMULATOR_RASPBERRY_PI_LOAD_PROJECT\":\"Load Schema\",\"DEVICE_SIMULATOR_RASPBERRY_PI_CLOSE_PROJECT_LIST\":\"Close\",\"DEVICE_SIMULATOR_RASPBERRY_PI_HELP\":\"Help\",\"DEVICE_SIMULATOR_RASPBERRY_PI_TABLE_PIN\":\"Pins\",\"DEVICE_SIMULATOR_RASPBERRY_PI_TABLE_NAME\":\"Name\",\"DEVICE_SIMULATOR_RASPBERRY_PI_TABLE_COLOR\":\"Color\",\"DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_NAME_LABEL\":\"Simulator Name\",\"DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_UPLOAD\":\"Upload\",\"DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_CLOSE\":\"Close\",\"DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_ADD_SVG\":\"Add SVG file\",\"DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_ADD_XML\":\"Add XML netlist\",\"DEVICE_SIMULATOR_RASPBERRY_PI_RUN_ERROR\":\"Error running project ({{error}})\",\"DEVICE_SIMULATOR_RASPBERRY_PI_LANGUAGE_INCOMPATIBLE\":\"The simulator does not support your projects' programming language\",\"CONSOLE\":\"Console\",\"CONSOLE_NO_SHELL\":\"Run a project to enable the console\",\"DATABASE\":\"DATABASE\",\"ID_SET_USER_ID\":\"Session ID\",\"ID_SET_USER_ID_TITLE\":\"Session ID\",\"ID_SET_USER_ID_TEXT\":\"Unique ID used to connect to the devices, it's like a password.\",\"ID_SET_USER_ID_NO_UUID\":\"The session ID must be a valid UUID.\",\"MIGRATION_BETA_TITLE\":\"Restore your Projects and Boards\",\"MIGRATION_BETA_TEXT\":\"We have migrated Wyliodrin STUDIO Web App from beta and this has changed the domain name. Please export and import your projects and your Dession ID. Would you like to go now to https://beta.wyliodrin.studio?\",\"UPDATE\":\"Update\",\"UPDATE_TITLE\":\"Update Available\",\"UPDATE_MESSAGE\":\"There is a new version of Wyliodrin STUDIO available. Would you like to update?\",\"LANGUAGE\":\"English\",\"WORKSPACE_TOOLBAR_EXIT\":\"Exit\",\"WORKSPACE_TOOLBAR_FULLSCREEN\":\"Fullscreen\",\"WORKSPACE_TOOLBAR_RESTORE\":\"Restore\",\"WORKSPACE_TOOLBAR_MINIMIZE\":\"Minimize\",\"WORKSPACE_TOOLBAR_SETUP\":\"Setup\",\"WORKSPACE_TOOLBAR_ABOUT\":\"About\",\"WORKSPACE_PROJECT_NOTEBOOK\":\"Notebook\",\"WORKSPACE_DEVICE_CONNECT\":\"Connect\",\"WORKSPACE_BOARD_CONNECT\":\"Select a device to connect to\",\"CLOSE\":\"Close\",\"WORKSPACE_PROJECT_LIBRARY\":\"Projects Library\",\"WORKSPACE_DEVICE_DISCONNECT\":\"Disconnect\",\"WORKSPACE_STATUS_DISCONNECTED\":\"DISCONNECTED\",\"WORKSPACE_STATUS_CONNECTED\":\"CONNECTED\",\"WORKSPACE_STATUS_SYNCHRONIZING\":\"SYNCHRONIZING\",\"WORKSPACE_STATUS_CONNECTING\":\"CONNECTING\",\"WORKSPACE_STATUS_ERROR\":\"ERROR\",\"WORKSPACE_TOOLBAR_EXIT_QUESTION\":\"Are you sure you want to exit?\",\"EXIT\":\"Exit\",\"WORKSPACE_TOOLBAR_CLOSE\":\"Close\",\"WORKSPACE_SET_MODE_ADVANCED\":\"Use Advanced Mode\",\"WORKSPACE_SET_MODE_SIMPLE\":\"Use Simple Mode\",\"ABOUT_DEVELOPED_BY\":\"Developed by\",\"ABOUT_TRANSLATE\":\"Translations\",\"ABOUT_MAINTAINER\":\"Maintainer\",\"ABOUT_UI_UX\":\"UI/UX\",\"ABOUT_DEVELOPMENT\":\"Developer\",\"ABOUT_LICENSE\":\"License\",\"ABOUT_LICENSE_TITLE\":\"Usage License\",\"ABOUT_PROVIDED_BY\":\"Provided by\",\"WORKSPACE_DEVICE_SETUP_TEXT\":\"You might want to set up some devices. For more information, please go to our tutorials website.\",\"WORKSPACE_DEVICE_SETUP\":\"Device Setup\",\"WORKSPACE_DOCUMENTATION\":\"Documentation\",\"ABOUT_VERSION\":\"Version\",\"OK\":\"OK\",\"ABOUT_FEEDBACK\":\"Allow sending anonymous usage parameters in order to help us improve the software\",\"TUTORIALS_NAME\":\"Tutorials\",\"TUTORIALS_IMPORT\":\"Import {title}\",\"TUTORIALS_IMPORT_PROJECT_NAME\":\"Input the name for the new project\",\"TUTORIALS_PROJECT_EXISTS\":\"A project with the name {name} already exists, please choose another name for it\"},\"es\":{\"PROJECT_DASHBOARD\":\"Tablero de Control\",\"DASHBOARD_LOAD_DATA_ERROR\":\"Falló al cargar el tablero de control\",\"DASHBOARD_VIEWER_INVALID_SIGNAL\":\"Nombre de señal invalido\",\"DASHBOARD_VIEWER_MOVE_LEFT\":\"Mover a la izquierda\",\"DASHBOARD_VIEWER_MOVE_RIGHT\":\"Mover a la derecha\",\"DASHBOARD_VIEWER_GRAPH_SETTINGS\":\"Configuración de la gráfica\",\"DASHBOARD_VIEWER_ERASE_GRAPH\":\"Borrar gráfica\",\"DASHBOARD_SIGNAL_NAME\":\"Nombre de la señal\",\"DASHBOARD_SIGNAL_DESCRIPTION\":\"Descripción\",\"DASHBOARD_SIGNAL_COLOR\":\"Color\",\"NAME\":\"Nombre\",\"DASHBOARD_ADD_SIGNAL\":\"Agregar\",\"DASHBOARD_LOW_COLOR\":\"Color bajo\",\"DASHBOARD_LOW_VALUE\":\"Valor bajo\",\"DASHBOARD_MID_COLOR\":\"Color medio\",\"DASHBOARD_MID_VALUE\":\"Valor medio\",\"DASHBOARD_HIGH_COLOR\":\"Color alto\",\"DASHBOARD_MIN_AXES_VALUE\":\"Valor mínimo\",\"DASHBOARD_MAX_AXES_VALUE\":\"Valor máximo\",\"DASHBOARD_KILOMETERS\":\"Kilómetros\",\"DASHBOARD_MILES\":\"Millas\",\"DASHBOARD_MIN_VALUE\":\"Valor mínimo de los ejes\",\"DASHBOARD_MAX_VALUE\":\"Valor máximo de los ejes\",\"DASHBOARD_AXIS_NAME\":\"Nombre del eje\",\"DASHBOARD_DELETE_TITLE\":\"Borrar señal\",\"DASHBOARD_DELETE_QUESTION\":\"¿Está seguro que quiere borrar esta señal?\",\"DASHBOARD_NO_TITLE\":\"Por favor, escoja un nombre para la señal.\",\"DASHBOARD_UNKNOWN_TITLE\":\"(no señal)\",\"GAUGE_GRAPH\":\"Indicador\",\"DASHBOARD_ADDGAUGE\":\"Indicador - Agregar señal\",\"IMAGE_GRAPH\":\"Imagen\",\"DASHBOARD_ADDIMAGE\":\"Imagen - Añadir señal\",\"LINE_GRAPH\":\"Línea\",\"DASHBOARD_ADDLINE\":\"Línea - Agregar señal\",\"LINE_STYLE\":\"Estilo\",\"LINE_HIDE_LEGEND\":\"Ocultar leyenda\",\"LINE_FIX_AXES_VALUES\":\"Fijar los valores de los ejes\",\"LINE_LOGARITHMIC_AXES\":\"Ejes logarítmicos\",\"LINE_TIME_SERIES\":\"Series de tiempo\",\"LINE_SHOW_POINTS\":\"Mostrar puntos\",\"LINE_MAX_POINTS\":\"Puntos máximos a mostar (0 significa mostrar todos)\",\"LINE_X_AXIS_TITLE\":\"Nombre de X eje\",\"LINE_Y_AXIS_TITLE\":\"Nombre de Y eje\",\"LINE_OVERVIEW\":\"Mostrar descripción\",\"LINE_SCROLLBAR\":\"Mostrar barra de desplazamiento\",\"LINE_STEP\":\"Paso\",\"LINE_STRAIGHT\":\"Recta\",\"LINE_SPLINE\":\"Spline\",\"DEVICE_MP_RUN\":\"Correr\",\"DEVICE_MP_STOP\":\"Detener\",\"DEVICE_MP_RESTART\":\"Reiniciar\",\"DEVICE_MP_CONNECT\":\"CONECTAR\",\"DEVICE_MP_EXIT\":\"Salir\",\"DEVICE_MP_FILES\":\"Sistema de archivos\",\"DEVICE_MP_DEPLOY\":\"Desplegar\",\"DEVICE_MP_FLAG_HEADER\":\"Habilitar WebSerial\",\"DEVICE_MP_FLAG_STEP_ONE\":\"1. Necesitas Google Chrome para esta característica\",\"DEVICE_MP_FLAG_STEP_TWO\":\"2. En la barra de búsqueda de Chrome buscamos: chrome: // flags\",\"DEVICE_MP_FLAG_STEP_THREE\":\"3. En la barra de búsqueda de las flags se busca: # enable-experimental-web-platform-features\",\"DEVICE_MP_FLAG_STEP_FOUR\":\"4. Seleccionar la bandera ENABLE: Experimental Web Platform features\",\"DEVICE_MP_FLAG_STEP_FIVE\":\"5. En la parte inferior derecha accedemos al botón RELAUNCH\",\"DEVICE_MP_FLAG_STEP_SIX\":\"Después de reiniciar el navegador, podremos utilizar la versión para navegador.\",\"DEVICE_MP_FLAG_CAREFUL\":\"¡CUIDADO! Para trabajar debes estar en una conexión segura\",\"DEVICE_MP_SERIAL_OPTIONS\":\"Conectar vía Serial\",\"DEVICE_MP_SERIAL_BAUDRATE\":\"Velocidad de conexión Serial\",\"DEVICE_MP_VARIANT\":\"Variante de MicroPython\",\"DEVICE_MP_CHECKBOX\":\"¿Quieres reiniciar la tarjeta cuando se conecte?\",\"DEVICE_MP_AUTODETECT\":\"Detectar automáticamente\",\"DEVICE_MP_RESET_AFTER_CONNECT\":\"Reiniciar después de conectar\",\"PIN_LAYOUT\":\"Diagrama de asignación de pines\",\"PROJECT_SHELL\":\"Terminal\",\"SHELL_NO_SHELL\":\"Conecte un dispositivo para habilitar la terminal\",\"TOCK_OS_APP_BOARD_SETTINGS\":\"Ajustes aplicación tarjeta\",\"TOCK_OS_STACK_SIZE\":\"Tamaño pila\",\"TOCK_OS_APP_HEAD_SIZE\":\"Tamaño montículo aplicación\",\"TOCK_OS_KERNEL_HEAP_SIZE\":\"Tamaño montículo kernel\",\"TOCK_OS_SELECT_FLASHING_METHOD\":\"Seleccionar método de programación\",\"TOCK_OS_FLASHING_OPTIONS_TOCKLOADER\":\"Tockloader\",\"TOCK_OS_FLASHING_OPTIONS_SINGLE_BINARY\":\"Binario solo\",\"DEVICE_WYAPP_RUN\":\"Ejecutar\",\"DEVICE_WYAPP_STOP\":\"Detener\",\"DEVICE_WYAPP_TASK_MANAGER\":\"Administrador de tareas\",\"DEVICE_WYAPP_PACKAGE_MANAGER\":\"Administrador de paquetes\",\"DEVICE_WYAPP_NETWORK_MANAGER\":\"Administrador de redes\",\"DEVICE_WYAPP_DISCONNECT\":\"Desconectar\",\"DEVICE_WYAPP_RESTART\":\"Reiniciar y Desconectar\",\"DEVICE_WYAPP_TURNOFF\":\"Apagar y Desconectar\",\"DEVICE_WYAPP_ANOTHER_USER\":\"El dispositivo ya está conectado a otro usuario.\",\"DEVICE_WYAPP_SETTINGS\":\"Ajustes del dispositivo\",\"DEVICE_WYAPP_NAME\":\"Nombre\",\"DEVICE_WYAPP_VERSION\":\"Versión\",\"DEVICE_WYAPP_LIBWYLIODRIN\":\"Versión de la biblioteca Wyliodrin\",\"DEVICE_WYAPP_OS\":\"Sistema operativo\",\"DEVICE_WYAPP_LANGUAGES\":\"Lenguajes\",\"DEVICE_WYAPP_WIREDNETWORK_IP\":\"IP\",\"DEVICE_WYAPP_WIREDNETWORK_MASK\":\"Máscara\",\"DEVICE_WYAPP_WIREDNETWORK_BROADCAST\":\"Difusión\",\"DEVICE_WYAPP_WIREDNETWORK_HARDWARE\":\"Dirección física\",\"DEVICE_WYAPP_UNINSTALL\":\"Desinstalar\",\"DEVICE_WYAPP_WYLIODRIN_DEVICENAME\":\"Nombre del dispositivo\",\"DEVICE_WYAPP_INSTALL\":\"Instalar\",\"DEVICE_WYAPP_PACKAGE_INSTALL_ERROR\":\"Falló instalar el paquete {packageName} de {language} .\",\"DEVICE_WYAPP_PACKAGE_UNINSTALL_ERROR\":\"Falló desinstalar el paquete {packageName} de {language}.\",\"DEVICE_WYAPP_SSID\":\"Nombre de la Red\",\"DEVICE_WYAPP_PSK\":\"Frase de contraseña de la Red\",\"DEVICE_WYAPP_CONNECT\":\"Conectar\",\"DEVICE_WYAPP_SSID_OTHER_NETWORK\":\"Otra Red\",\"DEVICE_WYAPP_REFRESH\":\"Refrescar\",\"DEVICE_WYAPP_FILE_MANAGER\":\"Adminstrador de archivos\",\"DEVICE_WYAPP_ERROR_PROJECT_RUN\":\"Por favor abra un proyecto\",\"DEVICE_WYAPP_NO_DIRECTORY\":\"No hay un directorio seleccionado\",\"DEVICE_WYAPP_FILESYSTEM\":\"Sistema de archivos\",\"DEVICE_WYAPP_RUN_DEPLOY\":\"Ajustes de despliegue\",\"DEVICE_WYAPP_DOCKERFILE\":\"Dockerfile \",\"DEVICE_WYAPP_DEPLOY\":\"Despliegue\",\"DEVICE_WYAPP_DELETE\":\"Eliminar\",\"YES\":\"Sí\",\"NO\":\"No\",\"DEVICE_WYAPP_DEPLOYMENTS\":\"Despliegues\",\"DEVICE_WYAPP_REMOVE_CONTAINER\":\"Remover contenedor al salir\",\"DEIVCE_WYAPP_ADDITIONAL_OPTIONS\":\"Opciones adicionales\",\"DEVICE_WYAPP_DETACHED\":\"Servicio\",\"DEVICE_WYAPP_INTERACTIVE_CONSOLE\":\"Interactivo\",\"DEVICE_WYAPP_PRIVILEGED_CONTAINER\":\"Contenedor privilegiado\",\"DEVICE_WYAPP_NO_RESTART\":\"No reiniciar\",\"DEVICE_WYAPP_RESTART_ON_FAILURE\":\"Al fallar\",\"DEVICE_WYAPP_RESTART_ALWAYS\":\"Siempre\",\"DEVICE_WYAPP_RESTART_UNLESS_STOPPED\":\"Al menos que se detenga\",\"DEVICE_WYAPP_DEFAULT_NETWORK\":\"Privado\",\"DEVICE_WYAPP_HOST_NETWORK\":\"Igual que el dispositivo\",\"DEVICE_WYAPP_NETWORK_OPTIONS\":\"Opciones de red\",\"DEVICE_WYAPP_RESTART_OPTIONS\":\"Opciones de reinicio\",\"DEVICE_WYAPP_PROCESS_OPTIONS\":\"Opciones de proceso\",\"DEVICE_WYAPP_NO_CONTAINERS\":\"No hay contenedores\",\"DEVICE_WYAPP_WEBSOCKET_SOCKET_CONNECTED\":\"Autenticado en el servidor del dispositivo websocket\",\"DEVICE_WYAPP_WEBSOCKET_SOCKET_ERROR\":\"Error del servidor\",\"DEVICE_WYAPP_WEBSOCKET_SOCKET_DISCONNECTED\":\"Desconectar del servidor los dispositivos websocket\",\"DEVICE_WYAPP_WEBSOCKET_INSTANCE_RESET_TITLE\":\"¿Usar Studio aquí?\",\"DEVICE_WYAPP_WEBSOCKET_INSTANCE_RESET\":\"Hay otra instancia de Studio conectada al servidor con tu id. No puedes usar múltiples conexiones. ¿Te gustaría usar Studio aquí?\",\"DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_TITLE\":\"Agregar dispositivo Web\",\"DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_NAME\":\"Nombre del dispositivo\",\"DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_NAME_NOT_VALID\":\"Por favor ingrese un nombre de dispositivo válido\",\"DEVICE_WYAPP_WEBSOCKET_SET_USER_ID\":\"Identificador de Sesión\",\"DEVICE_WYAPP_WEBSOCKET_SET_USER_ID_TITLE\":\"Identificador de Sesión\",\"DEVICE_WYAPP_WEBSOCKET_SET_USER_ID_TEXT\":\"Identificador único usado para conectar a los dispositivos, es como una contraseña.\",\"DEVICE_WYAPP_WEBSOCKET_SET_USER_ID_NO_UUID\":\"El identificador de sesión debe ser un UUID válido.\",\"DEVICE_WYAPP_WEBSOCKET_MORE_INFO\":\"Más información\",\"DEVICE_WYAPP_WEBSOCKET_SETUP_WIFI\":\"Ajustar WiFi\",\"DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_TYPE\":\"Dispositivo\",\"DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_DOWNLOAD\":\"Descargar\",\"DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_DOWNLOAD_PART2\":\"a la tarjeta en\",\"DOCUMENTATION\":\"Documentación\",\"TOOLBAR_RESISTOR_COLOR_CODE\":\"Código de color de resistencia\",\"RESISTOR_COLORCODE_FROM_COLOR_TO_NUMBER\":\"DEL COLOR AL NÚMERO\",\"RESISTOR_COLORCODE_FROM_NUMBER_TO_COLOR\":\"DEL NÚMERO AL COLOR\",\"RESISTOR_COLORCODE_STRIPES\":\"Bandas\",\"VALUE_FOUR\":\"Cuatro\",\"VALUE_FIVE\":\"Cinco\",\"RESISTOR_COLORCODE_STRIPE_ONE\":\"Banda 1\",\"RESISTOR_COLORCODE_STRIPE_TWO\":\"Banda 2\",\"RESISTOR_COLORCODE_STRIPE_THREE\":\"Banda 3\",\"RESISTOR_COLORCODE_STRIPE_FOUR\":\"Banda 4\",\"RESISTOR_COLORCODE_STRIPE_FIVE\":\"Banda 5\",\"VALUE_VALUE\":\"Valor\",\"RESISTOR_COLORCODE_RESISTANCE\":\"Resistencia\",\"VALUE_TOLERANCE\":\"Tolerancia\",\"WELCOME_TEXT\":\"Bienvenido a Wyliodrin STUDIO\",\"WELCOME_START_WORK\":\"Puedes empezar creando nuevas aplicaciones, configurando tarjetas o importando tus propios proyectos.\",\"WELCOME_CREATE_APP\":\"Crear una nueva aplicación\",\"WELCOME_CONNECT_BOARD\":\"Conectar tarjeta\",\"TOCK_OS_SELECT_BOARD\":\"Seleccionar tarjeta\",\"TOCK_OS_SELECT_EXAMPLE\":\"Seleccionar ejemplo\",\"TOCK_OS_STATUS_FETCHING\":\"Obteniendo información...\",\"TOCK_OS_STATUS_DOWNLOADING\":\"Descargando...\",\"TOCK_OS_STATUS_FINISHED\":\"Finalizando...\",\"TOCK_OS_SELECT_RELEASE_VERSION\":\"Seleccionar versión Tock Release\",\"PATREON_SPONSOR\":\"Patrocinador\",\"PATREON_SPONSOR_TITLE\":\"Patrocine el proyecto Wyliodrin STUDIO\",\"PATREON_SPONSOR_TEXT\":\"Wyliodrin STUDIO es un proyecto gratuito y de código abierto. Tu patrocinio nos permite mantener el proyecto y ofrecerlo gratis. Gracias.\",\"PATREON_SPONSOR_NOW\":\"Patrocinador\",\"PATREON_SPONSOR_LATER\":\"Más tarde\",\"EDITOR_VISUAL_SHOW_CODE\":\"Mostrar código\",\"EDITOR_VISUAL_HIDE_CODE\":\"Ocultar código\",\"PROJECT_NOTEBOOK\":\"Cuaderno\",\"NOTEBOOK_SELECT_IMAGE_ERROR\":\"Por favor seleccione una imagen.\",\"NOTEBOOK_SELECT_FILE_ERROR\":\"Por favor seleccione una imagen válida.\",\"NOTEBOOK_DELETE_ITEM_QUESTION\":\"¿Está seguro que quiere eliminar este elemento?\",\"NOTEBOOK_DELETE_ITEM_TITLE\":\"Eliminar elemento\",\"NOTEBOOK_LOAD_DATA_ERROR\":\"No puede cargar los datos del cuaderno ({error})\",\"NOTEBOOK_RESET_NOTEBOOK_TITLE\":\"Reiniciar cuaderno\",\"NOTEBOOK_RESET_NOTEBOOK_QUESTION\":\"¿Está seguro que desea reiniciar el cuaderno?\\nPerdera todos las notas para este proyecto.\",\"NOTEBOOK_LOAD_PROJECT\":\"Cargar un proyecto para mostrar en el cuaderno\",\"PROJECT_APPLICATION\":\"Aplicación\",\"PROJECT_DELETE_FOLDER\":\"Eliminar carpeta\",\"PROJECT_RENAME_FOLDER\":\"Cambiar nombre de la carpeta\",\"PROJECT_NEW_FOLDER\":\"Nueva carpeta\",\"PROJECT_NEW_FOLDER_NAME\":\"Nuevo nombre de la carpeta\",\"PROJECT_FOLDER_SURE\":\"¿Está seguro que desea eliminar esta carpeta?\",\"PROJECT_DELETE_FILE\":\"Eliminar archivo\",\"PROJECT_RENAME_FILE\":\"Cambiar nombre del archivo\",\"PROJECT_NEW_FILE\":\"Nuevo archivo\",\"PROJECT_IMPORT_FILE\":\"Importar archivo\",\"PROJECT_EXPORT_FILE\":\"Exportar archivo\",\"PROJECT_NEW_FILE_NAME\":\"Nuevo nombre del archivo\",\"PROJECT_FILE_SURE\":\"¿Está seguro que desea eliminar este archivo?\",\"PROJECT_NEW_NAME\":\"Nuevo nombre\",\"PROJECT_DELETE_PROJECT\":\"Eliminar proyecto\",\"PROJECT_LOAD_PROJECT\":\"Cargar un proyecto de la biblioteca\",\"PROJECT_PROJECT_SURE\":\"¿Está seguro que desea eliminar este proyecto?\",\"PROJECT_HIDE_CONSOLE\":\"Ocultar la consola\",\"PROJECT_WELCOME_CREATE_NEW_APP\":\"Crear una nueva aplicación\",\"PROJECT_LIBRARY\":\"Biblioteca de proyectos\",\"PROJECT_LIBRARY_NAME\":\"Nombre del proyecto\",\"PROJECT_LIBRARY_NEW_PROJECT\":\"Crear proyecto\",\"PROJECT_LIBRARY_RENAME\":\"Cambiar el nombre\",\"PROJECT_LIBRARY_DELETE\":\"Eliminar\",\"PROJECT_LIBRARY_CLONE\":\"Clonar\",\"PROJECT_LIBRARY_IMPORT\":\"Importar\",\"PROJECT_LIBRARY_CLOSE\":\"Cerrar\",\"PROJECT_LIBRARY_EXPORT\":\"Exportar\",\"PROJECT_LIBRARY_PROJECTS\":\"Proyectos\",\"PROJECT_LIBRARY_OPTIONS\":\"Opciones\",\"PROJECT_LIBRARY_LOAD_EXAMPLE\":\"Cargar un ejemplo\",\"PROJECT_ERROR_LANGUAGE_ADDON\":\"Registrar adición falló para el lenguaje {language}\",\"PROJECT_ERROR_REGISTER_EDITOR\":\"Registrar editor falló para el nombre editor {name}, ya está registrado\",\"PROJECT_ERROR_LOAD_PROJECTS\":\"Error mientras cargaba los proyectos ({error})\",\"PROJECT_ERROR_SELECT_PROJECT\":\"Error mientras seleccionaba el proyecto {project} ({error})\",\"PROJECT_ERROR_CREATE_PROJECT\":\"Error mientras creaba el proyecto {project} ({error})\",\"PROJECT_ERROR_RENAME_PROJECT\":\"Error mientras renombraba el proyecto {project} a {name} ({error})\",\"PROJECT_ERROR_CLONE_PROJECT\":\"Error mientras clonaba el proyecto {project} ({error})\",\"PROJECT_ERROR_DELETE_PROJECT\":\"Error mientras eliminaba el proyecto {project} ({error})\",\"PROJECT_ERROR_IMPORT_PROJECT\":\"Error mientras importaba el proyecto {project} ({error})\",\"PROJECT_ERROR_EXPORT_PROJECT\":\"Error mientras exportaba el proyecto {project} ({error})\",\"PROJECT_ERROR_NEW_FOLDER\":\"Error mientras creaba la nueva carpeta {folder} ({error})\",\"PROJECT_ERROR_NEW_FILE\":\"Error mientras creaba el nuevo archivo {file} ({error})\",\"PROJECT_ERROR_RENAME_OBJECT\":\"Error mientras cambiaba el nombre del objecto {object} ({error})\",\"PROJECT_ERROR_DELETE_FOLDER\":\"Error mientras eliminaba la carpeta {folder} ({error})\",\"PROJECT_ERROR_DELETE_FILE\":\"Error mientras eliminaba el archivo {file} ({error})\",\"PROJECTS_JSON_DO_NOT\":\"Trató de editar project.json, NO HAGA ESTO\",\"PROJECT_ERROR_SAVE_FILE\":\"Error mientras guardaba el archivo {file} ({error})\",\"PROJECT_ERROR_LOAD_FILE\":\"Error mientras cargaba el archivo {file} ({error})\",\"PROJECT_ERROR_READ_DATA\":\"Error mientras leía los datos para el proyecto {project} ({error})\",\"PROJECT_ERROR_NOT_FOLDER\":\"Carpeta del proyecto {project} no es una carpeta\",\"PROJECT_ERROR_SAVE_SPECIAL_FILE\":\"Error mientras guardaba el archivo especial {file} con datos ({error})\",\"PROJECT_ERROR_LOAD_SPECIAL_FILE\":\"Error mientras cargaba el archivo especial {file} ({error})\",\"PROJECT_ERROR_SEND_CODE\":\"Error mientras enviaba el archivo de código {file} ({error})\",\"PROJECT_ERROR_PATH_INVALID\":\"Error, la ruta no está dentro de la carpeta del espacio de trabajo\",\"PROJECT_ERROR_CHANGE_DATE\":\"Error, no se puede escribir la fecha {project} ({error})\",\"PROJECT_JSON_DO_NOT\":\"Trató de editar project.json, NO HAGA ESTO\",\"PROJECT_CLONE_PROJECT\":\"Clonar Proyecto\",\"PROJECT_RENAME_PROJECT\":\"Cambiar de nombre al proyecto\",\"PROJECT_NAME_PROMPT\":\"Por favor ingrese el nombre del proyecto\",\"PROJECT_LIBRARY_SEARCH\":\"Buscar\",\"PROJECT_NULL\":\"Uno o más parámetros están sin valor\",\"PATH_NULL\":\"La ruta no tiene valor\",\"PROJECTS_NO_PROJECT\":\"Aún no tiene ningún proyecto\",\"PROJECTS_CREATE_APPLICATION\":\"Clic en el botón \\\"Crear nueva aplicación\\\" abajo\",\"PROJECTS_STORAGE_NOT_PERSISTENT\":\"El sistema de almacenamiento no es persistente. Esto significa que sus proyectos pueden ser borrados en cualquier momento sin previo aviso. Para evitar esto, por favor, exporte sus proyectos con frecuencia.\",\"PROJECTS_STORAGE_ASK_PERSISTENT\":\"El sistema de almacenamiento no es persistente. Por favor, autorice el permiso para hacer el almacenamiento persistente.\",\"PROJECTS_STORAGE_BUTTON_ASK_PERSISTENT\":\"Autorizar persistencia\",\"PROJECTS_STORAGE_BROWSER_ERROR\":\"Si su navegador no le preguntó si permite la persistencia, puede haber un problema con su navegador. Para evitar perder sus proyectos, debería añadir este sitio web a los marcadores, usarlo más a menudo y exportar sus proyectos con más frecuencia. También le recomendamos que use Firefox.\",\"PROJECTS_NO_FILE\":\"No hay un archivo seleccionado, por favor, importe, cree o seleccione un archivo\",\"PROJECTS_EXTENSION_URECOGNIZED\":\"La extensión del archivo no es reconocida\",\"PROJECTS_INVALID_PROJECT\":\"Ha abierto un proyecto inválido, por favor seleccione otro\",\"PROJECT_EXISTS_PROMPT\":\"Un proyecto con este nombre ya existe\",\"PROJECTS_READ_ONLY_FILE_SYSTEM\":\"El espacio de almacenamiento es de SOLO LECTURA, los proyectos pueden ser abiertos solamente.\",\"PROJECT_ERROR_SAVE_SCHEMATIC\":\"Error mientras guardaba el archivo esquemático {file} con datos ({error})\",\"PROJECT_ERROR_LOAD_SCHEMATIC\":\"Error mientras cargaba el archivo esquemático {file} ({error})\",\"SCHEMATICS\":\"Esquemático\",\"ADD_SCHEMATIC\":\"Agregar esquemático\",\"DELETE_SCHEMATIC\":\"Eliminar esquemático\",\"DELETE_MESSAGE\":\"¿Está seguro que desea eliminarlo?\",\"DELETE_CONFIRMATION\":\"Confimación eliminar\",\"SCHEMATICS_IMPORT\":\"Importar su archivo esquemático .svg de Fritzing\",\"SCHEMATICS_IMPORT_ERROR\":\"Error importando esquemático: {error}\",\"DEVICE_SIMULATOR_RASPBERRY_PI\":\"Simulador de Raspberry Pi\",\"DEVICE_SIMULATOR_RASPBERRY_PI_RUN\":\"Ejecutar\",\"DEVICE_SIMULATOR_RASPBERRY_PI_STOP\":\"Detener\",\"DEVICE_SIMULATOR_RASPBERRY_PI_LOAD_PROJECT\":\"Cargar esquemático\",\"DEVICE_SIMULATOR_RASPBERRY_PI_CLOSE_PROJECT_LIST\":\"Cerrar\",\"DEVICE_SIMULATOR_RASPBERRY_PI_HELP\":\"Ayuda\",\"DEVICE_SIMULATOR_RASPBERRY_PI_TABLE_PIN\":\"Pines\",\"DEVICE_SIMULATOR_RASPBERRY_PI_TABLE_NAME\":\"Nombre\",\"DEVICE_SIMULATOR_RASPBERRY_PI_TABLE_COLOR\":\"Color\",\"DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_NAME_LABEL\":\"Nombre del simulador\",\"DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_UPLOAD\":\"Subir\",\"DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_CLOSE\":\"Cerrar\",\"DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_ADD_SVG\":\"Agregar archivo SVG\",\"DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_ADD_XML\":\"Agregar lista de redes XML\",\"DEVICE_SIMULATOR_RASPBERRY_PI_RUN_ERROR\":\"Error ejecutando proyecto ({{error}})\",\"CONSOLE\":\"Consola\",\"CONSOLE_NO_SHELL\":\"Ejecute un proyecto para habilitar la consola\",\"DATABASE\":\"BASE DE DATOS\",\"ID_SET_USER_ID\":\"Identificador de Sesión\",\"ID_SET_USER_ID_TITLE\":\"Identificador de Sesión\",\"ID_SET_USER_ID_TEXT\":\"Identificador único usado para conectar a los dispositivos, es como una contraseña.\",\"ID_SET_USER_ID_NO_UUID\":\"El identificador de sesión debe ser un UUID válido.\",\"MIGRATION_BETA_TITLE\":\"Restaurar tus proyectos y tarjetas\",\"MIGRATION_BETA_TEXT\":\"Hemos migrado Wyliodrin STUDIO Web App a beta y esto ha cambiado el nombre del dominio. Por favor exporta e importa tus proyectos y tu ID de sesión. ¿Te gustaría ir ahora a https://beta.wyliodrin.studio?\",\"UPDATE\":\"Actualizar\",\"UPDATE_TITLE\":\"Actualización disponible\",\"UPDATE_MESSAGE\":\"Hay una nueva versión de Wyliodrin STUDIO disponible. ¿Te gustaría actualizar?\",\"LANGUAGE\":\"Español\",\"WORKSPACE_TOOLBAR_EXIT\":\"Salir\",\"WORKSPACE_TOOLBAR_FULLSCREEN\":\"Pantalla Completa\",\"WORKSPACE_TOOLBAR_RESTORE\":\"Restablecer\",\"WORKSPACE_TOOLBAR_MINIMIZE\":\"Minimizar\",\"WORKSPACE_TOOLBAR_SETUP\":\"Configuración\",\"WORKSPACE_TOOLBAR_ABOUT\":\"Acerca de\",\"WORKSPACE_PROJECT_NOTEBOOK\":\"Cuaderno\",\"WORKSPACE_DEVICE_CONNECT\":\"Conectar\",\"WORKSPACE_BOARD_CONNECT\":\"Seleccione un dispositivo para conectarse\",\"CLOSE\":\"Cerrar\",\"WORKSPACE_PROJECT_LIBRARY\":\"Librería de proyectos\",\"WORKSPACE_DEVICE_DISCONNECT\":\"Desconectar\",\"WORKSPACE_STATUS_DISCONNECTED\":\"DESCONECTADO\",\"WORKSPACE_STATUS_CONNECTED\":\"CONECTADO\",\"WORKSPACE_STATUS_SYNCHRONIZING\":\"SINCRONIZANDO\",\"WORKSPACE_STATUS_CONNECTING\":\"CONECTANDO\",\"WORKSPACE_STATUS_ERROR\":\"ERROR\",\"WORKSPACE_TOOLBAR_EXIT_QUESTION\":\"¿Estás seguro que quieres salir?\",\"EXIT\":\"Salir\",\"WORKSPACE_TOOLBAR_CLOSE\":\"Cerrar\",\"WORKSPACE_SET_MODE_ADVANCED\":\"Usar Modo Avanzado\",\"WORKSPACE_SET_MODE_SIMPLE\":\"Usar Modo Simple\",\"ABOUT_DEVELOPED_BY\":\"Desarrollado por\",\"ABOUT_TRANSLATE\":\"Traducciones\",\"ABOUT_MAINTAINER\":\"Encargado\",\"ABOUT_UI_UX\":\"UI/UX\",\"ABOUT_DEVELOPMENT\":\"Desarrollador\",\"ABOUT_LICENSE\":\"Licencia\",\"ABOUT_LICENSE_TITLE\":\"Licencia de uso\",\"ABOUT_PROVIDED_BY\":\"Proporcionado por\",\"WORKSPACE_DEVICE_SETUP_TEXT\":\"Tal vez quieras instalar algunos dispositivos. Para obtener más información, por favor visite nuestro sitio web de tutoriales.\",\"WORKSPACE_DEVICE_SETUP\":\"Configuración del dispositivo\",\"WORKSPACE_DOCUMENTATION\":\"Documentación\",\"ABOUT_VERSION\":\"Versión\",\"OK\":\"OK\",\"BACK\":\"ATRÁS\",\"ABOUT_FEEDBACK\":\"Permitir el envío anónimo de parámetros de uso para ayudarnos a mejorar el software\",\"TUTORIALS_NAME\":\"Tutoriales\",\"TUTORIALS_IMPORT\":\"Importar {title}\",\"TUTORIALS_IMPORT_PROJECT_NAME\":\"Ingrese el nombre para el nuevo proyecto\",\"TUTORIALS_PROJECT_EXISTS\":\"Un proyecto con el nombre {name} ya existe, por favor escoja otro nombre\"},\"fr\":{\"PROJECT_DASHBOARD\":\"Tableau de bord\",\"DASHBOARD_VIEWER_INVALID_SIGNAL\":\"Nom du signal invalide\",\"DASHBOARD_VIEWER_MOVE_LEFT\":\"Déplacer à gauche\",\"DASHBOARD_VIEWER_MOVE_RIGHT\":\"Déplacer à droite\",\"DASHBOARD_VIEWER_GRAPH_SETTINGS\":\"Paramètres du signal\",\"DASHBOARD_VIEWER_ERASE_GRAPH\":\"Supprimer un graphe\",\"DASHBOARD_SIGNAL_NAME\":\"Nom du signal *\",\"DASHBOARD_SIGNAL_DESCRIPTION\":\"Description\",\"DASHBOARD_SIGNAL_COLOR\":\"Couleur\",\"NAME\":\"Nom\",\"DASHBOARD_ADD_SIGNAL\":\"Ajouter\",\"DASHBOARD_LOW_COLOR\":\"Low color\",\"DASHBOARD_LOW_VALUE\":\"Low value\",\"DASHBOARD_MID_COLOR\":\"Mid color\",\"DASHBOARD_MID_VALUE\":\"Mid value\",\"DASHBOARD_HIGH_COLOR\":\"High color\",\"DASHBOARD_MIN_AXES_VALUE\":\"Valeur minimale\",\"DASHBOARD_MAX_AXES_VALUE\":\"Valeur maximale\",\"DASHBOARD_KILOMETERS\":\"Kilomètres\",\"DASHBOARD_MILES\":\"Miles\",\"DASHBOARD_MIN_VALUE\":\"Valeur minimale\",\"DASHBOARD_MAX_VALUE\":\"Valeur maximale\",\"DASHBOARD_DELETE_TITLE\":\"Supprimer un signal\",\"DASHBOARD_DELETE_QUESTION\":\"Êtes-vous sûr de vouloir supprimer ce signal?\",\"DASHBOARD_NO_TITLE\":\"Veuillez choisir un nom pour le signal.\",\"DASHBOARD_AXIS_NAME\":\"Nom de l'axe\",\"GAUGE_GRAPH\":\"Jauge\",\"DASHBOARD_ADDGAUGE\":\"Jauge - Ajouter signal\",\"IMAGE_GRAPH\":\"Image\",\"DASHBOARD_ADDIMAGE\":\"Image - Ajouter un signal\",\"LINE_GRAPH\":\"Ligne\",\"DASHBOARD_ADDLINE\":\"Ligne - Ajouter signal\",\"LINE_STYLE\":\"Style\",\"LINE_HIDE_LEGEND\":\"Masquer la légende\",\"LINE_FIX_AXES_VALUES\":\"Fixer les valeurs des axes\",\"LINE_LOGARITHMIC_AXES\":\"Axes logarithmiques\",\"LINE_TIME_SERIES\":\"Séries temporelles\",\"LINE_SHOW_POINTS\":\"Montrer les points\",\"LINE_MAX_POINTS\":\"Nombre maximum de points à afficher (0 signifie les afficher tous)\",\"LINE_X_AXIS_TITLE\":\"Nom de l'axe x\",\"LINE_Y_AXIS_TITLE\":\"Nom de l'axe y\",\"LINE_OVERVIEW\":\"Afficher l'aperçu\",\"LINE_SCROLLBAR\":\"Afficher la barre de défilement\",\"LINE_STEP\":\"Pas\",\"LINE_STRAIGHT\":\"Regtiligne\",\"LINE_SPLINE\":\"Spline\",\"DEVICE_MP_RUN\":\"DÉBUT\",\"DEVICE_MP_STOP\":\"ARRÊTEZ\",\"DEVICE_MP_RESTART\":\"REDÉMARRER\",\"DEVICE_MP_CONNECT\":\"BRANCHER\",\"DEVICE_MP_EXIT\":\"Sortie\",\"DEVICE_MP_FILES\":\"SYSTÈME DE FICHIERS\",\"DEVICE_MP_DEPLOY\":\"DÉPLOYER\",\"DEVICE_MP_FLAG_HEADER\":\"Configurez votre WebSerial\",\"DEVICE_MP_FLAG_STEP_ONE\":\"1. Pour cette fonction, vous avez besoin de Google Chrome\",\"DEVICE_MP_FLAG_STEP_TWO\":\"2. Dans la barre de recherche Chrome, nous rechercherons: chrome: // flags\",\"DEVICE_MP_FLAG_STEP_THREE\":\"3. Recherchez la barre de recherche dans les drapeaux: # enable-experimental-web-platform-features\",\"DEVICE_MP_FLAG_STEP_FOUR\":\"4. Donnez le drapeau ENABLE: fonctionnalités de la plate-forme Web expérimentale\",\"DEVICE_MP_FLAG_STEP_FIVE\":\"5. En bas à droite, on accède au bouton RELAUNCH\",\"DEVICE_MP_FLAG_STEP_SIX\":\"Après avoir redémarré le navigateur, nous pourrons utiliser la version du navigateur.\",\"DEVICE_MP_FLAG_CAREFUL\":\"PRUDENTE! Pour travailler, vous devez être sur une connexion sécurisée\",\"DEVICE_MP_SERIAL_OPTIONS\":\"Conecter\",\"DEVICE_MP_SERIAL_BAUDRATE\":\"Définir une valeur pour la vitesse de transmission. Valeur par défaut: 115200.\",\"DEVICE_MP_DROPDOWN_TITLE\":\"Langage de programmation\",\"DEVICE_MP_CHECKBOX\":\"Voulez-vous redémarrer la carte lors de la connexion?\",\"PIN_LAYOUT\":\"Plan de broches\",\"PROJECT_SHELL\":\"Shell\",\"SHELL_NO_SHELL\":\"Connectez un périphérique pour activer le shell\",\"DEVICE_WYAPP_RUN\":\"Exécuter\",\"DEVICE_WYAPP_STOP\":\"Arrêt\",\"DEVICE_WYAPP_TASK_MANAGER\":\"Gestionnaire de tâches\",\"DEVICE_WYAPP_PACKAGE_MANAGER\":\"Gestion des paquets\",\"DEVICE_WYAPP_NETWORK_MANAGER\":\"Gestion de réseau\",\"DEVICE_WYAPP_DISCONNECT\":\"Déconnecter\",\"DEVICE_WYAPP_RESTART\":\"Redémarrer et Déconnecter\",\"DEVICE_WYAPP_TURNOFF\":\"Arrêter et Déconnecter\",\"DEVICE_WYAPP_ANOTHER_USER\":\"L'appareil est déjà connecté à un autre utilisateur.\",\"DEVICE_WYAPP_SETTINGS\":\"Paramètres de l'appareil\",\"DEVICE_WYAPP_NAME\":\"Nom\",\"DEVICE_WYAPP_VERSION\":\"Version\",\"DEVICE_WYAPP_OS\":\"Système d'exploitation\",\"DEVICE_WYAPP_LANGUAGES\":\"Langages\",\"DEVICE_WYAPP_SSID\":\"Nom de réseau\",\"DEVICE_WYAPP_WIREDNETWORK_IP\":\"IP\",\"DEVICE_WYAPP_WIREDNETWORK_MASK\":\"Masque\",\"DEVICE_WYAPP_WIREDNETWORK_BROADCAST\":\"Broadcast\",\"DEVICE_WYAPP_WIREDNETWORK_HARDWARE\":\"Adresse Matérielle\",\"DEVICE_WYAPP_UNINSTALL\":\"Désinstaller\",\"DEVICE_WYAPP_WYLIODRIN_DEVICENAME\":\"Nom de l'appareil\",\"DEVICE_WYAPP_INSTALL\":\"Installer\",\"DEVICE_WYAPP_PACKAGE_INSTALL_ERROR\":\"Impossible d'installer le paquet {packageName} pour {language}.\",\"DEVICE_WYAPP_PACKAGE_UNINSTALL_ERROR\":\"Impossible de désinstaller le paquet {packageName} pour {language}.\",\"DEVICE_WYAPP_PSK\":\"Phrase de passe du réseau\",\"DEVICE_WYAPP_CONNECT\":\"Connecter\",\"DEVICE_WYAPP_SSID_OTHER_NETWORK\":\"Autre réseau\",\"DEVICE_WYAPP_REFRESH\":\"Actualiser\",\"DEVICE_WYAPP_FILE_MANAGER\":\"Gestionnaire de fichiers\",\"DEVICE_WYAPP_LIBWYLIODRIN\":\"Version de Wyliodrin Library\",\"DEVICE_WYAPP_ERROR_PROJECT_RUN\":\"Veuillez ouvrir un projet.\",\"DEVICE_WYAPP_NO_DIRECTORY\":\"Il n'y a pas de directoire sélectionné\",\"DEVICE_WYAPP_FILESYSTEM\":\"Système de fichiers\",\"DEVICE_WYAPP_WEBSOCKET_SOCKET_CONNECTED\":\"Authentifié auprès du serveur de périphériques\",\"DEVICE_WYAPP_WEBSOCKET_SOCKET_ERROR\":\"Erreur du serveur\",\"DEVICE_WYAPP_WEBSOCKET_SOCKET_DISCONNECTED\":\"Déconnecté du serveur de périphériques \",\"DEVICE_WYAPP_WEBSOCKET_INSTANCE_RESET_TITLE\":\"Utiliser Studio ici?\",\"DEVICE_WYAPP_WEBSOCKET_INSTANCE_RESET\":\"Une autre instance de Studio est connectée au serveur avec votre identifiant. Vous ne pouvez pas utiliser plusieurs connexions. Voulez-vous utiliser Studio ici?\",\"DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_TITLE\":\"Ajouter un périphérique\",\"DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_NAME\":\"Nom du périphérique\",\"DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_NAME_NOT_VALID\":\"Veuillez entrer un nom de périphérique valide\",\"DEVICE_WYAPP_WEBSOCKET_SET_USER_ID_TITLE\":\"ID de la session\",\"DEVICE_WYAPP_WEBSOCKET_SET_USER_ID_TEXT\":\"Identifiant unique utilisé pour se connecter aux appareils, similaire à un mot de passe.\",\"DEVICE_WYAPP_WEBSOCKET_SET_USER_ID_NO_UUID\":\"L'ID de la session doit doit être un UUID valide.\",\"DEVICE_WYAPP_WEBSOCKET_SET_USER_ID\":\"ID de la session\",\"DOCUMENTATION\":\"Documentation\",\"TOOLBAR_RESISTOR_COLOR_CODE\":\"Code couleur de résistance\",\"RESISTOR_COLORCODE_FROM_COLOR_TO_NUMBER\":\"DE COULEUR À VALEUR\",\"RESISTOR_COLORCODE_FROM_NUMBER_TO_COLOR\":\"DE VALEUR À COULEUR\",\"RESISTOR_COLORCODE_STRIPES\":\"Bandes\",\"RESISTOR_COLORCODE_STRIPE_ONE\":\"Bande 1\",\"RESISTOR_COLORCODE_STRIPE_TWO\":\"Bande 2\",\"RESISTOR_COLORCODE_STRIPE_THREE\":\"Bande 3\",\"RESISTOR_COLORCODE_STRIPE_FOUR\":\"Bande 4\",\"RESISTOR_COLORCODE_STRIPE_FIVE\":\"Bande 5\",\"VALUE_FOUR\":\"Quatre\",\"VALUE_FIVE\":\"Cinq\",\"VALUE_VALUE\":\"Valeur\",\"RESISTOR_COLORCODE_RESISTANCE\":\"Résistance\",\"VALUE_TOLERANCE\":\"Tolérance\",\"WELCOME_TEXT\":\"Bienvenu à Wyliodrin STUDIO\",\"WELCOME_START_WORK\":\"Vous pouvez commencer à créer de nouvelles applications, à configurer et à connecter des cartes ou à importer vos propres projets..\",\"WELCOME_CREATE_APP\":\"Créer une nouvelle application\",\"WELCOME_CONNECT_BOARD\":\"Connecter une carte\",\"PATREON_SPONSOR\":\"Parrainer\",\"PATREON_SPONSOR_TITLE\":\"Merci de parrainer le projet Wyliodrin STUDIO\",\"PATREON_SPONSOR_TEXT\":\"Wyliodrin STUDIO est un projet gratuit et open source. Votre parrainage nous permet de maintenir le projet et de le proposer gratuitement. Je vous remercie.\",\"PATREON_SPONSOR_NOW\":\"Parrainer\",\"PATREON_SPONSOR_LATER\":\"Plus tard\",\"EDITOR_VISUAL_SHOW_CODE\":\"Afficher le code\",\"EDITOR_VISUAL_HIDE_CODE\":\"Masquer le code\",\"PROJECT_NOTEBOOK\":\"Notebook\",\"NOTEBOOK_SELECT_IMAGE_ERROR\":\"Veuillez sélectionner une image.\",\"NOTEBOOK_SELECT_FILE_ERROR\":\"Veuillez sélectionner un fichier valide.\",\"NOTEBOOK_DELETE_ITEM_QUESTION\":\"Êtes-vous sûr de vouloir supprimer cet élément?\",\"NOTEBOOK_DELETE_ITEM_TITLE\":\"Supprimer un élément\",\"NOTEBOOK_LOAD_DATA_ERROR\":\"Impossible de charger les notes.\",\"NOTEBOOK_RESET_NOTEBOOK_TITLE\":\"Réinitialiser le Notebook\",\"NOTEBOOK_RESET_NOTEBOOK_QUESTION\":\"Voulez-vous vraiment réinitialiser le Notebook? Vous allez perdre toutes les notes pour ce projet.\",\"NOTEBOOK_LOAD_PROJECT\":\"Charger un projet pour afficher le Notebook\",\"PROJECT_APPLICATION\":\"Application\",\"PROJECT_NEW_FOLDER\":\"Nouveau dossier\",\"PROJECT_NEW_FILE\":\"Nouveau fichier\",\"PROJECT_HIDE_CONSOLE\":\"Cacher la console\",\"PROJECT_WELCOME_CREATE_NEW_APP\":\"Créer une nouvelle application\",\"PROJECT_LIBRARY_IMPORT\":\"Importer\",\"PROJECT_LIBRARY_EXPORT\":\"Exporter\",\"PROJECT_LIBRARY_OPTIONS\":\"Options\",\"PROJECT_LIBRARY_RENAME\":\"Renommer\",\"PROJECT_LIBRARY_DELETE\":\"Effacer\",\"PROJECT_LIBRARY_CLOSE\":\"Fermer\",\"PROJECT_LIBRARY_PROJECTS\":\"Projets\",\"PROJECT_LIBRARY_LOAD_EXAMPLE\":\"Ouvrir un exemple\",\"PROJECT_LIBRARY\":\"Bibliothèque de projets\",\"PROJECTS_NO_PROJECT\":\"Vous n'avez pas encore de projets.\",\"PROJECTS_CREATE_APPLICATION\":\"Cliquez sur le bouton \\\"Créer une nouvelle application\\\" ci-dessous\",\"PROJECTS_STORAGE_NOT_PERSISTENT\":\"Le système de stockage n'est pas persistant. Cela signifie que vos projets peuvent être supprimés à tout moment sans préavis. Pour éviter cela, exportez fréquemment vos projets.\",\"PROJECTS_STORAGE_ASK_PERSISTENT\":\"Le système de stockage n'est pas persistant. Veuillez autoriser rendre le stockage persistant.\",\"PROJECTS_STORAGE_BUTTON_ASK_PERSISTENT\":\"Autoriser la persistance\",\"PROJECTS_STORAGE_BROWSER_ERROR\":\"Si votre navigateur ne vous demande pas d'autoriser la persistance, il s'agit d'un problème avec votre navigateur. Pour éviter de perdre vos projets, vous devez ajouter ce site Web aux bookmarks, l’utiliser souvent et exporter fréquemment vos projets. Nous vous recommandons également d'utiliser Firefox.\",\"PROJECT_DELETE_FOLDER\":\"Supprimer le dossier\",\"PROJECT_RENAME_FOLDER\":\"Rename folder\",\"PROJECT_NEW_FOLDER_NAME\":\"Nom du nouveau dossier\",\"PROJECT_FOLDER_SURE\":\"Êtes-vous sûr de vouloir supprimer ce dossier?\",\"PROJECT_DELETE_FILE\":\"Supprimer le fichier\",\"PROJECT_RENAME_FILE\":\"Renommer le fichier\",\"PROJECT_IMPORT_FILE\":\"Importer le fichier\",\"PROJECT_EXPORT_FILE\":\"Exporter le fichier\",\"PROJECT_NEW_FILE_NAME\":\"Nouveau nom du fichier\",\"PROJECT_FILE_SURE\":\"Êtes-vous sûr de vouloir supprimer ce fichier?\",\"PROJECT_NEW_NAME\":\"Nouveau Nom\",\"PROJECT_DELETE_PROJECT\":\"Supprimer le projet\",\"PROJECT_LOAD_PROJECT\":\"Charger un projet\",\"PROJECT_PROJECT_SURE\":\"Êtes-vous sûr de vouloir supprimer ce projet?\",\"PROJECT_LIBRARY_NAME\":\"Nom du projet\",\"PROJECT_LIBRARY_NEW_PROJECT\":\"Créer un projet\",\"PROJECT_LIBRARY_CLONE\":\"Cloner\",\"PROJECT_ERROR_LANGUAGE_ADDON\":\"Impossible d'enregister l'addon pour le {language}\",\"PROJECT_ERROR_REGISTER_EDITOR\":\"Impossible d'enregistrer l'éditeur {name}. L'éditeur a déjà été enregistré\",\"PROJECT_ERROR_LOAD_PROJECTS\":\"Erreur lors du chargement des projets ({error})\",\"PROJECT_ERROR_SELECT_PROJECT\":\"Erreur lors de la sélection du projet {project} ({error})\",\"PROJECT_ERROR_CREATE_PROJECT\":\"Erreur lors de la création du projet {project} ({error})\",\"PROJECT_ERROR_RENAME_PROJECT\":\"Erreur lors du changement de nom du projet {project} en {name} ({error})\",\"PROJECT_ERROR_CLONE_PROJECT\":\"Erreur lors du clonage du projet {project} ({error})\",\"PROJECT_ERROR_DELETE_PROJECT\":\"Erreur lors de la supression du projet {project} ({error})\",\"PROJECT_ERROR_IMPORT_PROJECT\":\"Erreur lors de l'importation du projet {project} ({error})\",\"PROJECT_ERROR_EXPORT_PROJECT\":\"Erreur lors de l'exportation du projet {project} ({error})\",\"PROJECT_ERROR_NEW_FOLDER\":\"Erreur lors de la création d'un nouveau dossier {folder} ({error})\",\"PROJECT_ERROR_NEW_FILE\":\"Erreur lors de la création d'un nouveau fichier {file} ({error})\",\"PROJECT_ERROR_RENAME_OBJECT\":\"Erreur lors du changement de nom de l'objet {object} ({error})\",\"PROJECT_ERROR_DELETE_FOLDER\":\"Erreur lors de la supression du dossier {folder} ({error})\",\"PROJECT_ERROR_DELETE_FILE\":\"Erreur lors de la supression du fichier {file} ({error})\",\"PROJECTS_JSON_DO_NOT\":\"Vous avez essayé de modifier le fichier project.json, NE FAITES PAS CELA\",\"PROJECT_ERROR_SAVE_FILE\":\"Erreur lors de l'enregistrement du fichier {file} ({error})\",\"PROJECT_ERROR_LOAD_FILE\":\"Erreur lors du chargement du fichier {file} ({error})\",\"PROJECT_ERROR_READ_DATA\":\"Erreur lors de la lecture des données pour le projet {project} ({error})\",\"PROJECT_ERROR_NOT_FOLDER\":\"Le dossier du projet {project} n'est pas un dossier valide.\",\"PROJECT_ERROR_SAVE_SPECIAL_FILE\":\"Erreur lors de l'enregistrement du fichier spécial {file} avec des données ({error})\",\"PROJECT_ERROR_LOAD_SPECIAL_FILE\":\"Erreur lors du chargement du fichier spécial {file} avec des données ({error})\",\"PROJECT_ERROR_SEND_CODE\":\"Erreur lors de l'envoi du code de fichier {file} ({error})\",\"PROJECT_ERROR_PATH_INVALID\":\"Erreur, le chemin n'est pas dans le dossier workspace\",\"PROJECT_ERROR_CHANGE_DATE\":\"Erreur, impossible d'écrire la date {project} ({error})\",\"PROJECT_JSON_DO_NOT\":\"Vous avez essayé de modifier le fichier project.json, NE FAITES PAS CELA\",\"PROJECT_CLONE_PROJECT\":\"Cloner le projet\",\"PROJECT_RENAME_PROJECT\":\"Renommer le projet\",\"PROJECT_NAME_PROMPT\":\"Veuillez saisir le nom du projet.\",\"PROJECT_LIBRARY_SEARCH\":\"Chercher\",\"PROJECT_NULL\":\"Un ou plusieurs paramètres sont nuls\",\"PATH_NULL\":\"Un chemin est nul\",\"PROJECTS_NO_FILE\":\"Aucun fichier n'est sélectionné, veuillez importer, créer ou sélectionner un fichier.\",\"PROJECTS_EXTENSION_URECOGNIZED\":\"L'extension de fichier n'est pas reconnue\",\"PROJECTS_INVALID_PROJECT\":\"Vous avez ouvert un projet invalide, veuillez en sélectionner un autre.\",\"PROJECTS_READ_ONLY_FILE_SYSTEM\":\"L'espace de stockage est en lecture seule, les projets ne peuvent être ouverts.\",\"PROJECT_ERROR_SAVE_SCHEMATIC\":\"Erreur lors de la sauvegarde du schéma {file} avec des données ({error})\",\"PROJECT_ERROR_LOAD_SCHEMATIC\":\"Erreur lors du chargement du schéma {file} ({error})\",\"PROJECT_EXISTS_PROMPT\":\"Un projet portant ce nom existe déjà.\",\"SCHEMATICS\":\"Schémas\",\"ADD_SCHEMATIC\":\"Ajouter schémas\",\"DELETE_SCHEMATIC\":\"Supprimer schémas\",\"DELETE_MESSAGE\":\"Êtes-vous sûr de vouloir supprimer ce schéma?\",\"DELETE_CONFIRMATION\":\"Confirmation de suppression\",\"SCHEMATICS_IMPORT\":\"Importer le schémas .svg depuis Fritzing\",\"CONSOLE\":\"Console\",\"CONSOLE_NO_SHELL\":\"Exécuter un projet pour activer la console\",\"DATABASE\":\"BASE DE DONNÉES\",\"ID_SET_USER_ID_TITLE\":\"ID de la session\",\"ID_SET_USER_ID_TEXT\":\"Identifiant unique utilisé pour se connecter aux appareils, similaire à un mot de passe.\",\"ID_SET_USER_ID_NO_UUID\":\"L'ID de la session doit doit être un UUID valide.\",\"ID_SET_USER_ID\":\"ID de la session\",\"LANGUAGE\":\"Français\",\"WORKSPACE_TOOLBAR_EXIT\":\"Sortie\",\"WORKSPACE_TOOLBAR_FULLSCREEN\":\"Plein écran\",\"WORKSPACE_TOOLBAR_RESTORE\":\"Rétablir\",\"WORKSPACE_TOOLBAR_MINIMIZE\":\"Minimiser\",\"WORKSPACE_TOOLBAR_SETUP\":\"Installer\",\"WORKSPACE_TOOLBAR_ABOUT\":\"À propos de ce logiciel\",\"WORKSPACE_PROJECT_NOTEBOOK\":\"Notebook\",\"WORKSPACE_DEVICE_CONNECT\":\"Connecter\",\"WORKSPACE_BOARD_CONNECT\":\"Sélectionnez un appareil pour se connecter à lui\",\"CLOSE\":\"Fermer\",\"WORKSPACE_PROJECT_LIBRARY\":\"Bibliothèque projets\",\"WORKSPACE_DEVICE_DISCONNECT\":\"Déconnecter\",\"WORKSPACE_STATUS_DISCONNECTED\":\"Déconnecté\",\"WORKSPACE_TOOLBAR_EXIT_QUESTION\":\"Êtes-vous sûr de vouloir quitter?\",\"YES\":\"Oui\",\"NO\":\"Non\",\"EXIT\":\"Sortie\",\"WORKSPACE_DOCUMENTATION\":\"Documentation\",\"WORKSPACE_SET_MODE_ADVANCED\":\"Mode Avancé\",\"WORKSPACE_SET_MODE_SIMPLE\":\"Mode Simple\",\"ABOUT_DEVELOPED_BY\":\"Développé par\",\"ABOUT_MAINTAINER\":\"Mainteneur\",\"ABOUT_UI_UX\":\"UI/UX\",\"ABOUT_DEVELOPMENT\":\"Développeur\",\"ABOUT_LICENSE\":\"License\",\"ABOUT_LICENSE_TITLE\":\"Licence d'utilisation\",\"ABOUT_PROVIDED_BY\":\"Fourni par\",\"WORKSPACE_DEVICE_SETUP_TEXT\":\"Vous voudrez peut-être configurer certains appareils. Pour plus d'informations, consultez notre site Web de tutoriels.\",\"WORKSPACE_DEVICE_SETUP\":\"Configuration du périphérique\",\"WORKSPACE_STATUS_CONNECTED\":\"CONNECTÉ\",\"WORKSPACE_STATUS_SYNCHRONIZING\":\"SYNCHRONISATION\",\"WORKSPACE_STATUS_CONNECTING\":\"EN COURS DE CONNEXION\",\"WORKSPACE_STATUS_ERROR\":\"ERREUR\",\"WORKSPACE_TOOLBAR_CLOSE\":\"Fermer\",\"ABOUT_TRANSLATE\":\"Traductions\",\"ABOUT_VERSION\":\"Version\",\"OK\":\"OK\",\"BACK\":\"Retour\",\"ABOUT_FEEDBACK\":\"Autoriser l'envoi de paramètres d'utilisation anonymes afin de nous aider à améliorer le logiciel\",\"TUTORIALS_NAME\":\"Les tutoriels\",\"TUTORIALS_IMPORT\":\"Import {title}\",\"TUTORIALS_IMPORT_PROJECT_NAME\":\"Mettez le nom du nouveau projet.\",\"TUTORIALS_PROJECT_EXISTS\":\"Un projet avec le nom {name} existe déjà, s'il vous plaît choisissez un autre nom\"},\"hu\":{\"PROJECT_DASHBOARD\":\"Vezérlőpult\",\"DASHBOARD_SIGNAL_NAME\":\"Jel Megnevezése *\",\"DASHBOARD_SIGNAL_DESCRIPTION\":\"Leírás\",\"DASHBOARD_SIGNAL_COLOR\":\"Szín\",\"IMAGE_GRAPH\":\"Kép\",\"DASHBOARD_ADDIMAGE\":\"Kép hozzáadása\",\"PIN_LAYOUT\":\"Pin Kiosztás\",\"PROJECT_SHELL\":\"Shell\",\"DEVICE_WYAPP_RUN\":\"Futtatás\",\"DEVICE_WYAPP_STOP\":\"Megállít\",\"DEVICE_WYAPP_TASK_MANAGER\":\"Feladatkezelő\",\"DEVICE_WYAPP_PACKAGE_MANAGER\":\"Csomag Kezelő\",\"DEVICE_WYAPP_NETWORK_MANAGER\":\"Hálózat Kezelő\",\"DEVICE_WYAPP_DISCONNECT\":\"Szétkapcsolás\",\"DEVICE_WYAPP_RESTART\":\"Újraindítás és Szétkapcsolás\",\"DEVICE_WYAPP_TURNOFF\":\"Kikapcsolás és Szétkapcsolás\",\"PROJECT_NOTEBOOK\":\"Notebook\",\"PROJECT_APPLICATION\":\"Alkalmazás\",\"PROJECT_NEW_FOLDER\":\"Új Mappa\",\"PROJECT_NEW_FILE\":\"Új Fájl\",\"PROJECT_HIDE_CONSOLE\":\"Konzol Elrejtése\",\"PROJECT_WELCOME_CREATE_NEW_APP\":\"Új alkalmazás készítése\",\"PROJECT_LIBRARY_IMPORT\":\"Importálás\",\"PROJECT_LIBRARY_EXPORT\":\"Exportálás\",\"PROJECT_LIBRARY_OPTIONS\":\"Beállítások\",\"PROJECT_LIBRARY_RENAME\":\"Átnevezés\",\"PROJECT_LIBRARY_DELETE\":\"Törlés\",\"PROJECT_LIBRARY_CLOSE\":\"Bezár\",\"PROJECT_LIBRARY_PROJECTS\":\"Projektek\",\"PROJECT_LIBRARY_LOAD_EXAMPLE\":\"Példa betöltése\",\"LANGUAGE\":\"Magyar\",\"WORKSPACE_TOOLBAR_EXIT\":\"Kilépés\",\"WORKSPACE_TOOLBAR_FULLSCREEN\":\"Teljes képernyő\",\"WORKSPACE_TOOLBAR_RESTORE\":\"Visszaálítás\",\"WORKSPACE_TOOLBAR_MINIMIZE\":\"Lekicsinyítés\",\"WORKSPACE_TOOLBAR_SETUP\":\"Telepítés\",\"WORKSPACE_TOOLBAR_ABOUT\":\"A szoftverről\",\"WORKSPACE_PROJECT_NOTEBOOK\":\"Notebook\",\"WORKSPACE_DEVICE_CONNECT\":\"Csatlakozás\",\"WORKSPACE_BOARD_CONNECT\":\"Válassz ki egy eszközt amihez csatlakozni szeretnél\",\"CLOSE\":\"Bezár\",\"WORKSPACE_PROJECT_LIBRARY\":\"Projekt Könyvtár\",\"WORKSPACE_DEVICE_DISCONNECT\":\"Szétkapcsolás\",\"WORKSPACE_TOOLBAR_EXIT_QUESTION\":\"Biztosan ki szeretnél lépni?\",\"YES\":\"Igen\",\"NO\":\"Nem\",\"EXIT\":\"Kilépés\"},\"jp\":{\"PROJECT_DASHBOARD\":\"ダッシュボード\",\"DASHBOARD_VIEWER_INVALID_SIGNAL\":\"無効な信号名\",\"DASHBOARD_VIEWER_MOVE_LEFT\":\"左に動きます\",\"DASHBOARD_VIEWER_MOVE_RIGHT\":\"右に動きます\",\"DASHBOARD_VIEWER_GRAPH_SETTINGS\":\"グラフの設定\",\"DASHBOARD_VIEWER_ERASE_GRAPH\":\"グラフを消します\",\"DASHBOARD_SIGNAL_NAME\":\"信号名 *\",\"DASHBOARD_SIGNAL_DESCRIPTION\":\"説明\",\"DASHBOARD_SIGNAL_COLOR\":\"色\",\"NAME\":\"名前\",\"DASHBOARD_ADD_SIGNAL\":\"加えます\",\"DASHBOARD_LOW_COLOR\":\"ロー色 ???? color\",\"DASHBOARD_LOW_VALUE\":\"ロー値\",\"DASHBOARD_MID_COLOR\":\"ミディアム色(pot sa pun medium in loc de mid?)\",\"DASHBOARD_MID_VALUE\":\"ミディアム値 (same)\",\"DASHBOARD_HIGH_COLOR\":\"ハイ色\",\"DASHBOARD_MIN_AXES_VALUE\":\"最小値\",\"DASHBOARD_MAX_AXES_VALUE\":\"最大値\",\"DASHBOARD_KILOMETERS\":\"キロメートル\",\"DASHBOARD_MILES\":\"マイル\",\"DASHBOARD_MIN_VALUE\":\"最小軸値\",\"DASHBOARD_MAX_VALUE\":\"最大軸値\",\"DASHBOARD_AXIS_NAME\":\"軸名\",\"DASHBOARD_DELETE_TITLE\":\"信号を消します\",\"DASHBOARD_DELETE_QUESTION\":\"この信号を消してもよろしいですか？\",\"DASHBOARD_NO_TITLE\":\"信号名をえらんでください。\",\"GAUGE_GRAPH\":\"ゲージ\",\"DASHBOARD_ADDGAUGE\":\"ゲージ - 信号を足します\",\"IMAGE_GRAPH\":\"画像\",\"DASHBOARD_ADDIMAGE\":\"画像 - 信号を足します\",\"LINE_GRAPH\":\"ライン\",\"DASHBOARD_ADDLINE\":\"ライン - 信号を足します\",\"LINE_STYLE\":\"様式\",\"LINE_HIDE_LEGEND\":\"凡例を隠す\",\"LINE_FIX_AXES_VALUES\":\"軸の値を治します\",\"LINE_LOGARITHMIC_AXES\":\"対数軸\",\"LINE_TIME_SERIES\":\"時系列\",\"LINE_SHOW_POINTS\":\"ポイントを表示\",\"LINE_MAX_POINTS\":\"表示する最大ポイント (0　はすべてを表示することを意味します)\",\"LINE_X_AXIS_TITLE\":\"X軸のタイトル\",\"LINE_Y_AXIS_TITLE\":\"Y軸タイトル\",\"LINE_OVERVIEW\":\"概要を表示\",\"LINE_SCROLLBAR\":\"スクロール・バーを表示\",\"LINE_STEP\":\"段\",\"LINE_STRAIGHT\":\"直線\",\"LINE_SPLINE\":\"スプライン\",\"PIN_LAYOUT\":\"端子配置\",\"PROJECT_SHELL\":\"シェル\",\"SHELL_NO_SHELL\":\"デバイスに接続してシェルを有効にします\",\"DEVICE_WYAPP_RUN\":\"実行します\",\"DEVICE_WYAPP_STOP\":\"止まります\",\"DEVICE_WYAPP_TASK_MANAGER\":\"タスクマネージャ\",\"DEVICE_WYAPP_PACKAGE_MANAGER\":\"パッケージマネージャー\",\"DEVICE_WYAPP_NETWORK_MANAGER\":\"ネットワークマネージャ\",\"DEVICE_WYAPP_DISCONNECT\":\"ディスコネクト\",\"DEVICE_WYAPP_RESTART\":\"リブートとディスコネクト\",\"DEVICE_WYAPP_TURNOFF\":\"パワーオフとディスコネクト\",\"DEVICE_WYAPP_ANOTHER_USER\":\"デバイスはすでに別のユーザーに接続されています。\",\"DEVICE_WYAPP_SETTINGS\":\"デバイスの設定\",\"DEVICE_WYAPP_NAME\":\"名前\",\"DEVICE_WYAPP_VERSION\":\"バージョン\",\"DEVICE_WYAPP_LIBWYLIODRIN\":\"Ｗｙｌｉｏｄｒｉｎライブラリーのバージョン\",\"DEVICE_WYAPP_OS\":\"オペレーティング・システム\",\"DEVICE_WYAPP_LANGUAGES\":\"言語\",\"DEVICE_WYAPP_WIREDNETWORK_IP\":\"ＩＰ\",\"DEVICE_WYAPP_WIREDNETWORK_MASK\":\"マスク\",\"DEVICE_WYAPP_WIREDNETWORK_BROADCAST\":\"ブロードキャスト\",\"DEVICE_WYAPP_WIREDNETWORK_HARDWARE\":\"ハードウェアアドレス\",\"DEVICE_WYAPP_UNINSTALL\":\"アンインストール\",\"DEVICE_WYAPP_WYLIODRIN_DEVICENAME\":\"装置名\",\"DEVICE_WYAPP_INSTALL\":\"インストール\",\"DEVICE_WYAPP_PACKAGE_INSTALL_ERROR\":\"{language}パッケージ{packageName}のインストールに失敗しました。\",\"DEVICE_WYAPP_PACKAGE_UNINSTALL_ERROR\":\"{language}パッケージ{packageName}のアンインストールに失敗しました。\",\"DEVICE_WYAPP_PSK\":\"ネットワークパスワード\",\"DEVICE_WYAPP_CONNECT\":\"コネクト\",\"DEVICE_WYAPP_SSID_OTHER_NETWORK\":\"その他のネットワーク\",\"DEVICE_WYAPP_REFRESH\":\"リフレッシュ\",\"DEVICE_WYAPP_FILE_MANAGER\":\"ファイルマネージャ\",\"DEVICE_WYAPP_SSID\":\"ネットワーク名\",\"DEVICE_WYAPP_ERROR_PROJECT_RUN\":\"プロジェクトを開いてください\",\"DEVICE_WYAPP_WEBSOCKET_SOCKET_CONNECTED\":\"ウェブソケットデバイスサーバーに対して認証済み\",\"DEVICE_WYAPP_WEBSOCKET_SOCKET_ERROR\":\"サーバーエラー\",\"DEVICE_WYAPP_WEBSOCKET_SOCKET_DISCONNECTED\":\"ウェブソケットデバイスサーバーからディスコネクトしました\",\"DEVICE_WYAPP_WEBSOCKET_INSTANCE_RESET_TITLE\":\"ここでＳｔｕｄｉｏを使用します？\",\"DEVICE_WYAPP_WEBSOCKET_INSTANCE_RESET\":\"ＩＤでサーバーに接続された別のＳｔｕｄｉｏインスタンスがあります。複数の接続を使用することはできません。ここでＳｔｕｄｉｏを使用しますか？\",\"DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_TITLE\":\"デバイスを足します\",\"DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_NAME\":\"装置名\",\"DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_NAME_NOT_VALID\":\"有効なデバイス名を入力してください\",\"DOCUMENTATION\":\"文書化\",\"TOOLBAR_RESISTOR_COLOR_CODE\":\"抵抗のカラーコード\",\"RESISTOR_COLORCODE_FROM_COLOR_TO_NUMBER\":\"色から番号まで\",\"RESISTOR_COLORCODE_FROM_NUMBER_TO_COLOR\":\"番号から色まで\",\"RESISTOR_COLORCODE_STRIPES\":\"ストライプ\",\"VALUE_FOUR\":\"四\",\"VALUE_FIVE\":\"五\",\"RESISTOR_COLORCODE_STRIPE\":\"ストライプ\",\"VALUE_VALUE\":\"値\",\"RESISTOR_COLORCODE_RESISTANCE\":\"抵抗\",\"VALUE_TOLERANCE\":\"トレランス\",\"WELCOME_TEXT\":\"ＷｙｌｉｏｄｒｉｎSTUDIOへようこそ\",\"WELCOME_START_WORK\":\"新しいアプリケーションの作成を開始したり、ボードをセットアップしたり、独自のプロジェクトをインポートしたりできます。\",\"WELCOME_CREATE_APP\":\"新しいアプリケーションを作成します\",\"WELCOME_CONNECT_BOARD\":\"ボードを接続\",\"EDITOR_VISUAL_SHOW_CODE\":\"コードを表示します\",\"EDITOR_VISUAL_HIDE_CODE\":\"コードを非表示します\",\"PROJECT_NOTEBOOK\":\"ノート\",\"NOTEBOOK_SELECT_IMAGE_ERROR\":\"画像を選んでください。\",\"NOTEBOOK_SELECT_FILE_ERROR\":\"有効な画像を選んでください。\",\"NOTEBOOK_DELETE_ITEM_QUESTION\":\"この要素を削除してもよろしいですか？\",\"NOTEBOOK_DELETE_ITEM_TITLE\":\"要素を削除します\",\"NOTEBOOK_LOAD_DATA_ERROR\":\"ノートブックのデータを読み込めません ({error})\",\"NOTEBOOK_RESET_NOTEBOOK_TITLE\":\"ノートブックをリセット\",\"NOTEBOOK_RESET_NOTEBOOK_QUESTION\":\"ノートブックをリセットしてもよろしいですか？\\nこのプロジェクトのすべてのメモが失われます。\",\"PROJECT_APPLICATION\":\"アプリケーション\",\"PROJECT_DELETE_FOLDER\":\"フォルダを消します\",\"PROJECT_RENAME_FOLDER\":\"フォルダをリネーム\",\"PROJECT_NEW_FOLDER\":\"新しいフォルダ\",\"PROJECT_NEW_FOLDER_NAME\":\"新しいフォルダ名\",\"PROJECT_DELETE_FILE\":\"ファイルを消します\",\"PROJECT_RENAME_FILE\":\"ファイルをリネーム\",\"PROJECT_NEW_FILE\":\"新しいファイル\",\"PROJECT_NEW_FILE_NAME\":\"新しいファイル名\",\"PROJECT_NEW_NAME\":\"\",\"PROJECT_HIDE_CONSOLE\":\"コンソールを隠します\",\"PROJECT_WELCOME_CREATE_NEW_APP\":\"新しいアプリケーションを作ります\",\"PROJECT_LIBRARY_RENAME\":\"リネーム\",\"PROJECT_LIBRARY_DELETE\":\"消します\",\"PROJECT_LIBRARY_CLONE\":\"クローンします\",\"PROJECT_LIBRARY_IMPORT\":\"取り込みます\",\"PROJECT_LIBRARY_CLOSE\":\"クローズ\",\"PROJECT_LIBRARY_EXPORT\":\"輸出します\",\"PROJECT_LIBRARY_PROJECTS\":\"プロジェクト\",\"PROJECT_LIBRARY_OPTIONS\":\"設定\",\"PROJECT_LIBRARY_LOAD_EXAMPLE\":\"例を載せ込みます\",\"PROJECT_FOLDER_SURE\":\"このフォルダーを削除してもよろしいですか？\",\"PROJECT_IMPORT_FILE\":\"インポートファイル\",\"PROJECT_EXPORT_FILE\":\"エクスポートファイル\",\"PROJECT_FILE_SURE\":\"このファイルを削除してもよろしいですか？\",\"PROJECT_DELETE_PROJECT\":\"プロジェクトを削除します\",\"PROJECT_LOAD_PROJECT\":\"ライブラリからプロジェクトをロードします\",\"PROJECT_PROJECT_SURE\":\"このプロジェクトを削除してもよろしいですか？\",\"PROJECT_LIBRARY\":\"プロジェクトライブラリ\",\"PROJECT_LIBRARY_NAME\":\"プロジェクト名\",\"PROJECT_LIBRARY_NEW_PROJECT\":\"プロジェクトを作成します\",\"PROJECT_ERROR_LANGUAGE_ADDON\":\"言語{language}のアドオンの登録に失敗しました\",\"PROJECT_ERROR_REGISTER_EDITOR\":\"名前{name}のエディターの登録エディターが既に登録されていません\",\"PROJECT_ERROR_LOAD_PROJECTS\":\"プロジェクトの読み込み中にエラーが発生しました ({error})\",\"PROJECT_ERROR_SELECT_PROJECT\":\"プロジェクト{project}の選択中にエラーが発生しました ({error})\",\"PROJECT_ERROR_CREATE_PROJECT\":\"プロジェクト{project}の作成中にエラーが発生しました ({error})\",\"PROJECT_ERROR_RENAME_PROJECT\":\"プロジェクト{project}の名前を{name}に変更中にエラーが発生しました ({error})\",\"PROJECT_ERROR_CLONE_PROJECT\":\"プロジェクト{project}のクローン中にエラーが発生しました ({error})\",\"PROJECT_ERROR_DELETE_PROJECT\":\"プロジェクト{project}の削除中にエラーが発生しました ({error})\",\"PROJECT_ERROR_IMPORT_PROJECT\":\"プロジェクト{project}のインポート中にエラーが発生しました ({error})\",\"PROJECT_ERROR_EXPORT_PROJECT\":\"プロジェクト{project}のエクスポート中にエラーが発生しました ({error})\",\"PROJECT_ERROR_NEW_FOLDER\":\"新しいフォルダー{folder}の作成中にエラーが発生しました ({error})\",\"PROJECT_ERROR_NEW_FILE\":\"新しいファイル{file}の作成中にエラーが発生しました ({error})\",\"PROJECT_ERROR_RENAME_OBJECT\":\"オブジェクト{object}の名前を変更中にエラーが発生しました ({error})\",\"PROJECT_ERROR_DELETE_FOLDER\":\"フォルダー{folder}の削除中にエラーが発生しました ({error})\",\"PROJECT_ERROR_DELETE_FILE\":\"ファイル{file}の削除中にエラーが発生しました ({error})\",\"PROJECTS_JSON_DO_NOT\":\"project．jsonを編集しようとしました。 これをしないでください。\",\"PROJECT_ERROR_SAVE_FILE\":\"ファイル{file}の保存中にエラーが発生しました　({error})\",\"PROJECT_ERROR_LOAD_FILE\":\"ファイル{file}の読み込み中にエラーが発生しました ({error})\",\"PROJECT_ERROR_READ_DATA\":\"プロジェクト{project}のデータの読み取り中にエラーが発生しました ({error})\",\"PROJECT_ERROR_NOT_FOLDER\":\"プロジェクトフォルダー{project}はフォルダーではありません\",\"PROJECT_ERROR_SAVE_SPECIAL_FILE\":\"データ付きの特殊ファイル{file}の保存中にエラーが発生しました ({error})\",\"PROJECT_ERROR_LOAD_SPECIAL_FILE\":\"特殊ファイル{file}の読み込み中にエラーが発生しました ({error})\",\"PROJECT_ERROR_SEND_CODE\":\"ファイルコード{file}の送信中にエラーが発生しました ({error})\",\"PROJECT_ERROR_PATH_INVALID\":\"エラー、パスがワークスペースフォルダー内にありません\",\"PROJECT_ERROR_CHANGE_DATE\":\"エラー、日付{project}を書き込めません ({error})\",\"PROJECT_JSON_DO_NOT\":\"project．jsonを編集しようとしました。 これをしないでください。\",\"PROJECT_CLONE_PROJECT\":\"プロジェクトをクローンします\",\"PROJECT_RENAME_PROJECT\":\"プロジェクトの名前を変更します\",\"PROJECT_NAME_PROMPT\":\"プロジェクトの名前を入力してください\",\"PROJECT_LIBRARY_SEARCH\":\"サーチ\",\"PROJECT_NULL\":\"1つ以上のパラメーターがヌルです\",\"PATH_NULL\":\"パスがヌルです\",\"PROJECTS_NO_PROJECT\":\"まだプロジェクトがありません\",\"PROJECTS_CREATE_APPLICATION\":\"下の[新しいアプリケーションを作成]ボタンをクリックします ???\",\"PROJECTS_STORAGE_NOT_PERSISTENT\":\"ストレージシステムは永続的ではありません。これは、予告なしにプロジェクトがいつでも削除される可能性があることを意味します。これを回避するには、プロジェクトを頻繁にエクスポートしてください。\",\"PROJECTS_STORAGE_ASK_PERSISTENT\":\"ストレージシステムは永続的ではありません。ストレージを永続化する許可を許可してください。\",\"PROJECTS_STORAGE_BUTTON_ASK_PERSISTENT\":\"永続性を許可する\",\"PROJECTS_STORAGE_BROWSER_ERROR\":\"持続性を許可するかどうかをブラウザが尋ねなかった場合、ブラウザに問題がある可能性があります。プロジェクトが失われないようにするには、このWebサイトをブックマークに追加し、より頻繁に使用して、プロジェクトを頻繁にエクスポートする必要があります。Firefoxを使用することもお勧めします。\",\"SCHEMATICS\":\"回路図\",\"ADD_SCHEMATIC\":\"回路図を足します\",\"DELETE_SCHEMATIC\":\"回路図を消します\",\"DELETE_MESSAGE\":\"これを削除してもよろしいですか？\",\"DELETE_CONFIRMATION\":\"消すの確認\",\"SCHEMATICS_IMPORT\":\"Fritzingから.svg回路図をインポートします\",\"CONSOLE\":\" コンソール\",\"CONSOLE_NO_SHELL\":\"プロジェクトを実行してコンソールをイネーブルにします\",\"DATABASE\":\"データベース\",\"LANGUAGE\":\"日本語\",\"WORKSPACE_TOOLBAR_EXIT\":\"エグジット\",\"WORKSPACE_TOOLBAR_FULLSCREEN\":\"フルスクリーン\",\"WORKSPACE_TOOLBAR_RESTORE\":\"リストア\",\"WORKSPACE_TOOLBAR_MINIMIZE\":\"最小化\",\"WORKSPACE_TOOLBAR_SETUP\":\"設定\",\"WORKSPACE_TOOLBAR_ABOUT\":\"ついて\",\"WORKSPACE_PROJECT_NOTEBOOK\":\"ノート\",\"WORKSPACE_DEVICE_CONNECT\":\"コネクト\",\"WORKSPACE_BOARD_CONNECT\":\"デバイスでコネクトしてを選んでください　\",\"CLOSE\":\"クローズ\",\"WORKSPACE_PROJECT_LIBRARY\":\"プロジェクトライブラリ\",\"WORKSPACE_DEVICE_DISCONNECT\":\"ディスコネクト\",\"WORKSPACE_TOOLBAR_EXIT_QUESTION\":\"これをエグジットしてもよろしいですか？\",\"YES\":\"はい\",\"NO\":\"いいえ\",\"EXIT\":\"エグジット\",\"WORKSPACE_TOOLBAR_CLOSE\":\"クローズ\",\"WORKSPACE_STATUS_DISCONNECTED\":\"ディスコネクトでした\",\"WORKSPACE_STATUS_CONNECTED\":\"コネクトでした\",\"WORKSPACE_STATUS_SYNCHRONIZING\":\"垂直同期信号 \",\"WORKSPACE_STATUS_CONNECTING\":\"接続中\",\"WORKSPACE_STATUS_ERROR\":\" エラー \",\"WORKSPACE_SET_MODE_ADVANCED\":\"アドバンストモードを使います\",\"WORKSPACE_SET_MODE_SIMPLE\":\"シンプルモードを使います\",\"ABOUT_DEVELOPED_BY\":\"によって開発された\",\"ABOUT_MAINTAINER\":\"メンテナー\",\"ABOUT_UI_UX\":\"ＵＩ／ＵＸ\",\"ABOUT_DEVELOPMENT\":\" デベロッパー \",\"ABOUT_LICENSE\":\"ライセンス\",\"ABOUT_LICENSE_TITLE\":\"ライセンスの使用方法 \",\"ABOUT_PROVIDED_BY\":\"によって提供された\",\"ABOUT_VERSION\":\"バージョン\",\"WORKSPACE_DEVICE_SETUP_TEXT\":\"デバイスをセットアップすることもできます。詳細については、チュートリアルWebサイトにアクセスしてください。\",\"WORKSPACE_DEVICE_SETUP\":\"デバイスのセットアップ\"},\"ro\":{\"PROJECT_DASHBOARD\":\"Tablou de bord\",\"DASHBOARD_VIEWER_INVALID_SIGNAL\":\"Nume semnal invalid\",\"DASHBOARD_VIEWER_MOVE_LEFT\":\"Mutare la stânga\",\"DASHBOARD_VIEWER_MOVE_RIGHT\":\"Mutare la dreapta\",\"DASHBOARD_VIEWER_GRAPH_SETTINGS\":\"Setări\",\"DASHBOARD_VIEWER_ERASE_GRAPH\":\"Ștergere grafic\",\"DASHBOARD_SIGNAL_NAME\":\"Numele semnalului *\",\"DASHBOARD_SIGNAL_DESCRIPTION\":\"Descriere\",\"DASHBOARD_SIGNAL_COLOR\":\"Culoare\",\"NAME\":\"Nume\",\"DASHBOARD_ADD_SIGNAL\":\"Adăugați\",\"DASHBOARD_LOW_COLOR\":\"Low color\",\"DASHBOARD_LOW_VALUE\":\"Low value\",\"DASHBOARD_MID_COLOR\":\"Mid color\",\"DASHBOARD_MID_VALUE\":\"Mid value\",\"DASHBOARD_HIGH_COLOR\":\"High color\",\"DASHBOARD_MIN_AXES_VALUE\":\"Valoare minimă\",\"DASHBOARD_MAX_AXES_VALUE\":\"Valoare maximă\",\"DASHBOARD_KILOMETERS\":\"Kilometri\",\"DASHBOARD_MILES\":\"Mile\",\"DASHBOARD_MIN_VALUE\":\"Valoare minimă\",\"DASHBOARD_MAX_VALUE\":\"Valoare maximă\",\"DASHBOARD_DELETE_TITLE\":\"Ștergere semnal\",\"DASHBOARD_DELETE_QUESTION\":\"Sigur doriți să ștergeți acest semnal?\",\"DASHBOARD_NO_TITLE\":\"Alegeți un nume pentru semnal.\",\"DASHBOARD_AXIS_NAME\":\"Numele axei\",\"GAUGE_GRAPH\":\"Cadran\",\"DASHBOARD_ADDGAUGE\":\"Cadran - Adăugare semnal\",\"IMAGE_GRAPH\":\"Imagine\",\"DASHBOARD_ADDIMAGE\":\"Imagine - Adaugă semnal\",\"LINE_GRAPH\":\"Linie\",\"DASHBOARD_ADDLINE\":\"Linie - Adaugă semnal\",\"LINE_STYLE\":\"Stil\",\"LINE_HIDE_LEGEND\":\"Ascundeți legenda\",\"LINE_FIX_AXES_VALUES\":\"Fixați valoarea axelor\",\"LINE_LOGARITHMIC_AXES\":\"Axe logaritmice\",\"LINE_TIME_SERIES\":\"Serie temporală\",\"LINE_SHOW_POINTS\":\"Afișați puncte\",\"LINE_MAX_POINTS\":\"Puncte maxime de afișat (0 înseamnă a le arăta pe toate)\",\"LINE_X_AXIS_TITLE\":\"Titlul axei x\",\"LINE_Y_AXIS_TITLE\":\"Titlul axei y\",\"LINE_OVERVIEW\":\"Afișați prezentarea generală\",\"LINE_SCROLLBAR\":\"Afișați bara de derulare\",\"LINE_STEP\":\"Treaptă\",\"LINE_STRAIGHT\":\"Liniar\",\"LINE_SPLINE\":\"Spline\",\"DEVICE_MP_RUN\":\"RULEAZA\",\"DEVICE_MP_STOP\":\"OPRESTE\",\"DEVICE_MP_RESTART\":\"RESETEAZA\",\"DEVICE_MP_CONNECT\":\"CONECTEAZA\",\"DEVICE_MP_EXIT\":\"IESIRE\",\"DEVICE_MP_FILES\":\"SISTEM DE FISIERE\",\"DEVICE_MP_DEPLOY\":\"INCARCA PROIECTUL\",\"DEVICE_MP_FLAG_HEADER\":\"Activeaza WebSerial\",\"DEVICE_MP_FLAG_STEP_ONE\":\"1. Pentru aceasta functie aveti nevoie de Google Chrome\",\"DEVICE_MP_FLAG_STEP_TWO\":\"2. In bara de search din Chrome vom cauta : chrome://flags\",\"DEVICE_MP_FLAG_STEP_THREE\":\"3. Cautati in bara de search din flags: #enable-experimental-web-platform-features\",\"DEVICE_MP_FLAG_STEP_FOUR\":\"4. Dati ENABLE flag-ului : Experimental Web Platform features\",\"DEVICE_MP_FLAG_STEP_FIVE\":\"5. In partea de jos dreapta accesam butonul RELAUNCH\",\"DEVICE_MP_FLAG_STEP_SIX\":\"Dupa repornirea browser-ului vom putea folosii varianta browser.\",\"DEVICE_MP_FLAG_WARNING\":\"ATENTIE! Pentru a functiona trebuie sa fiti pe o conexiune securizata.\",\"DEVICE_MP_SERIAL_OPTIONS\":\"Conectare\",\"DEVICE_MP_SERIAL_BAUDRATE\":\"Setati o valoare pentru baudrate. Valoare implicita : 115200.\",\"DEVICE_MP_DROPDOWN_TITLE\":\"Limbaj de programare\",\"DEVICE_MP_CHECKBOX\":\"Doriti restartarea placii la conectare?\",\"PIN_LAYOUT\":\"Așezarea pinilor\",\"PROJECT_SHELL\":\"Shell\",\"SHELL_NO_SHELL\":\"Conectați-vă la un dispozitiv pentru a activa terminalul\",\"TOCK_OS_APP_BOARD_SETTINGS\":\"Setări aplicație\",\"TOCK_OS_STACK_SIZE\":\"Dimensiune stivă\",\"TOCK_OS_APP_HEAD_SIZE\":\"Dimensiune heap aplicație\",\"TOCK_OS_KERNEL_HEAP_SIZE\":\"Dimensiune heap kernel\",\"TOCK_OS_SELECT_FLASHING_METHOD\":\"Metoda de scriere\",\"TOCK_OS_FLASHING_OPTIONS_TOCKLOADER\":\"Tockloader\",\"TOCK_OS_FLASHING_OPTIONS_SINGLE_BINARY\":\"Binar simplu\",\"DEVICE_WYAPP_RUN\":\"Rulați\",\"DEVICE_WYAPP_STOP\":\"Oprire\",\"DEVICE_WYAPP_TASK_MANAGER\":\"Administrare procese\",\"DEVICE_WYAPP_PACKAGE_MANAGER\":\"Administrare pachete\",\"DEVICE_WYAPP_NETWORK_MANAGER\":\"Setări rețea\",\"DEVICE_WYAPP_DISCONNECT\":\"Deconectați\",\"DEVICE_WYAPP_RESTART\":\"Reporniți și Deconectați\",\"DEVICE_WYAPP_TURNOFF\":\"Opriți și Deconectați\",\"DEVICE_WYAPP_REFRESH\":\"Reîncarcă\",\"DEVICE_WYAPP_FILE_MANAGER\":\"Administrare fișiere\",\"DEVICE_WYAPP_SSID\":\"Nume reţea\",\"DEVICE_WYAPP_ANOTHER_USER\":\"Dispozitivul este deja conectat la un alt utilizator.\",\"DEVICE_WYAPP_SETTINGS\":\"Setări dispozitiv\",\"DEVICE_WYAPP_NAME\":\"Nume\",\"DEVICE_WYAPP_VERSION\":\"Versiune\",\"DEVICE_WYAPP_LIBWYLIODRIN\":\"Versiune Wyliodrin Library\",\"DEVICE_WYAPP_OS\":\"Sistem de operare\",\"DEVICE_WYAPP_LANGUAGES\":\"Limbaje\",\"DEVICE_WYAPP_WIREDNETWORK_IP\":\"IP\",\"DEVICE_WYAPP_WIREDNETWORK_MASK\":\"Mască\",\"DEVICE_WYAPP_WIREDNETWORK_BROADCAST\":\"Broadcast\",\"DEVICE_WYAPP_WIREDNETWORK_HARDWARE\":\"Adresă Hardware\",\"DEVICE_WYAPP_UNINSTALL\":\"Dezinstalare\",\"DEVICE_WYAPP_WYLIODRIN_DEVICENAME\":\"Nume dispozitiv\",\"DEVICE_WYAPP_INSTALL\":\"Instalare\",\"DEVICE_WYAPP_PACKAGE_INSTALL_ERROR\":\"Pachetul {packageName} pentru {language} nu a putut fi instalat.\",\"DEVICE_WYAPP_PACKAGE_UNINSTALL_ERROR\":\"Pachetul {packageName} pentru {language} nu a putut fi dezinstalat.\",\"DEVICE_WYAPP_PSK\":\"Parola pentru rețea\",\"DEVICE_WYAPP_CONNECT\":\"Conectare\",\"DEVICE_WYAPP_SSID_OTHER_NETWORK\":\"Alte rețele\",\"DEVICE_WYAPP_NO_DIRECTORY\":\"Nu există nici un director selectat\",\"DEVICE_WYAPP_ERROR_PROJECT_RUN\":\"Vă rugăm să deschideți un proiect nou\",\"DEVICE_WYAPP_FILESYSTEM\":\"Sistem de fisiere\",\"DEVICE_WYAPP_RUN_DEPLOY\":\"Setari implementare\",\"DEVICE_WYAPP_DOCKERFILE\":\"Dockerfile\",\"DEVICE_WYAPP_DEPLOY\":\"Implementeaza\",\"DEVICE_WYAPP_DELETE\":\"Sterge\",\"YES\":\"Da\",\"NO\":\"Nu\",\"DEVICE_WYAPP_DEPLOYMENTS\":\"Implementari\",\"DEVICE_WYAPP_REMOVE_CONTAINER\":\"Sterge containerul la iesire (--rm)\",\"DEIVCE_WYAPP_ADDITIONAL_OPTIONS\":\"Mai multe optiuni\",\"DEIVCE_WYAPP_DETACHED\":\"detasat\",\"DEVICE_WYAPP_INTERACTIVE_CONSOLE\":\"consola interactiva \",\"DEVICE_WYAPP_PRIVILEGED_CONTAINER\":\" Container privilegiat (--privileged)\",\"DEVICE_WYAPP_NO_RESTART\":\"nu\",\"DEVICE_WYAPP_RESTART_ON_FAILURE\":\"la esec\",\"DEVICE_WYAPP_RESTART_ALWAYS\":\"intotdeauna\",\"DEVICE_WYAPP_RESTART_UNLESS_STOPPED\":\"doar daca e oprit\",\"DEVICE_WYAPP_DEFAULT_NETWORK\":\"default\",\"DEVICE_WYAPP_HOST_NETWORK\":\"host\",\"DEVICE_WYAPP_NETWORK_OPTIONS\":\"Optiuni de retea\",\"DEVICE_WYAPP_RESTART_OPTIONS\":\"Optiuni de restart\",\"DEVICE_WYAPP_PROCESS_OPTIONS\":\"Optiuni de proces\",\"DEVICE_WYAPP_NO_CONTAINERS\":\"Nu sunt containere\",\"DEVICE_WYAPP_WEBSOCKET_SOCKET_CONNECTED\":\"Autentificat la serverul de dispozitive\",\"DEVICE_WYAPP_WEBSOCKET_SOCKET_ERROR\":\"Eroare la server\",\"DEVICE_WYAPP_WEBSOCKET_SOCKET_DISCONNECTED\":\"Deconectat de la serverul de dispozitive\",\"DEVICE_WYAPP_WEBSOCKET_INSTANCE_RESET_TITLE\":\"Folositi Studio aici?\",\"DEVICE_WYAPP_WEBSOCKET_INSTANCE_RESET\":\"Mai exista o instanta de Studio activa si puteti folosi doar o instanta la un moment dat. Dotiti sa folositi Studio aici?\",\"DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_NAME_NOT_VALID\":\"Va rog dati un nume pentru dispozitivul nou\",\"DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_TITLE\":\"Adaugare dispozitiv web\",\"DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_NAME\":\"Nume Dispozitiv\",\"DEVICE_WYAPP_WEBSOCKET_SET_USER_ID\":\"ID-ul Sesiunii\",\"DEVICE_WYAPP_WEBSOCKET_SET_USER_ID_TITLE\":\"ID-ul sesiunii\",\"DEVICE_WYAPP_WEBSOCKET_SET_USER_ID_TEXT\":\"ID unic folosit pentru conectarea la dispozitive, este similar cu o parola.\",\"DEVICE_WYAPP_WEBSOCKET_SET_USER_ID_NO_UUID\":\"ID-ul sesiunii trebuie sa fie un UUID valid.\",\"DEVICE_WYAPP_WEBSOCKET_MORE_INFO\":\"Mai multe informatii\",\"DOCUMENTATION\":\"Documentație\",\"TOOLBAR_RESISTOR_COLOR_CODE\":\"Codul culorilor pentru rezistențe\",\"RESISTOR_COLORCODE_FROM_COLOR_TO_NUMBER\":\"DIN CULOARE ÎN VALOARE\",\"RESISTOR_COLORCODE_FROM_NUMBER_TO_COLOR\":\"DIN NUMĂR ÎN CULOARE\",\"RESISTOR_COLORCODE_STRIPES\":\"Linii\",\"VALUE_FOUR\":\"Patru\",\"VALUE_FIVE\":\"Cinci\",\"RESISTOR_COLORCODE_STRIPE_ONE\":\"Banda 1\",\"RESISTOR_COLORCODE_STRIPE_TWO\":\"Banda 2\",\"RESISTOR_COLORCODE_STRIPE_THREE\":\"Banda 3\",\"RESISTOR_COLORCODE_STRIPE_FOUR\":\"Banda 4\",\"RESISTOR_COLORCODE_STRIPE_FIVE\":\"Banda 5\",\"VALUE_VALUE\":\"Valoare\",\"RESISTOR_COLORCODE_RESISTANCE\":\"Rezistență\",\"VALUE_TOLERANCE\":\"Toleranță\",\"WELCOME_TEXT\":\"Bun venit!\",\"WELCOME_START_WORK\":\"Puteți începe să creați noi aplicații, să configurați și să conectați placi sau să importați propriile proiecte.\",\"WELCOME_CREATE_APP\":\"Creați o aplicație nouă\",\"WELCOME_CONNECT_BOARD\":\"Conectare placă\",\"TOCK_OS_SELECT_BOARD\":\"Alege placa\",\"TOCK_OS_SELECT_EXAMPLE\":\"Alege exemplul\",\"TOCK_OS_STATUS_FETCHING\":\"Colectez informații...\",\"TOCK_OS_STATUS_DOWNLOADING\":\"Se descarcă...\",\"TOCK_OS_STATUS_FINISHED\":\"Gata\",\"TOCK_OS_SELECT_RELEASE_VERSION\":\"Alege versiunea release-ului de Tock\",\"PATREON_SPONSOR\":\"Susțineți\",\"PATREON_SPONSOR_TITLE\":\"Susțineți proiectul Wyliodrin STUDIO\",\"PATREON_SPONSOR_TEXT\":\"Wyliodrin STUDIO este un proiect open source și gratuit. Sponsorizarea dvs. ne permite să îmbunătățim proiectul și să îl oferim gratuit. Mulțumim.\",\"PATREON_SPONSOR_NOW\":\"Susține\",\"PATREON_SPONSOR_LATER\":\"Mai târziu\",\"EDITOR_VISUAL_SHOW_CODE\":\"Afisați Sursa\",\"EDITOR_VISUAL_HIDE_CODE\":\"Ascundeți Sursa\",\"PROJECT_NOTEBOOK\":\"Notițe\",\"NOTEBOOK_SELECT_IMAGE_ERROR\":\"Selectați o imagine.\",\"NOTEBOOK_SELECT_FILE_ERROR\":\"Selectați un fișier valid.\",\"NOTEBOOK_DELETE_ITEM_QUESTION\":\"Sigur doriți să ștergeți acest articol?\",\"NOTEBOOK_DELETE_ITEM_TITLE\":\"Ștergere element\",\"NOTEBOOK_LOAD_DATA_ERROR\":\"Imposibil de încărcat notițele ({error})\",\"NOTEBOOK_RESET_NOTEBOOK_TITLE\":\"Resetare notițe\",\"NOTEBOOK_RESET_NOTEBOOK_QUESTION\":\"Sigur doriți să resetați notițele? Veți pierde toate notițele pentru acest proiect.\",\"NOTEBOOK_LOAD_PROJECT\":\"Incarcati un proiect pentru a avea access la notițe\",\"PROJECT_APPLICATION\":\"Aplicație\",\"PROJECT_DELETE_FOLDER\":\"Șterge dosarul\",\"PROJECT_RENAME_FOLDER\":\"Redenumește dosarul\",\"PROJECT_NEW_FOLDER\":\"Dosar nou\",\"PROJECT_NEW_FOLDER_NAME\":\"Nume nou de dosar\",\"PROJECT_FOLDER_SURE\":\"Sunteți sigur că vreți să ștergeți acest dosar?\",\"PROJECT_DELETE_FILE\":\"Șterge fișierul\",\"PROJECT_RENAME_FILE\":\"Redenumește fișierul\",\"PROJECT_NEW_FILE\":\"Fișier nou\",\"PROJECT_IMPORT_FILE\":\"Importă fișier\",\"PROJECT_EXPORT_FILE\":\"Exportă fișier\",\"PROJECT_NEW_FILE_NAME\":\"Nuume nou de fișier\",\"PROJECT_FILE_SURE\":\"Sunteți sigur că vreți să ștergeți acest fișier?\",\"PROJECT_NEW_NAME\":\"Nume nou\",\"PROJECT_DELETE_PROJECT\":\"Șterge proiectul\",\"PROJECT_LOAD_PROJECT\":\"Încarcă un proiect din librărie\",\"PROJECT_PROJECT_SURE\":\"Sunteți sigur că vreți să ștergeți acest proiect?\",\"PROJECT_HIDE_CONSOLE\":\"Ascunde Consola\",\"PROJECT_WELCOME_CREATE_NEW_APP\":\"Creează o nouă aplicație\",\"PROJECT_LIBRARY\":\"Librărie\",\"PROJECT_LIBRARY_NAME\":\"Numele proiectului\",\"PROJECT_LIBRARY_NEW_PROJECT\":\"Creează un proiect\",\"PROJECT_LIBRARY_RENAME\":\"Redenumește\",\"PROJECT_LIBRARY_DELETE\":\"Șterge\",\"PROJECT_LIBRARY_CLONE\":\"Clonează\",\"PROJECT_LIBRARY_IMPORT\":\"Import\",\"PROJECT_LIBRARY_CLOSE\":\"Închide\",\"PROJECT_LIBRARY_EXPORT\":\"Export\",\"PROJECT_LIBRARY_PROJECTS\":\"Proiecte\",\"PROJECT_LIBRARY_OPTIONS\":\"Opțiuni\",\"PROJECT_LIBRARY_LOAD_EXAMPLE\":\"Încarcă un exemplu\",\"PROJECT_ERROR_LANGUAGE_ADDON\":\"Înregistrarea addon-ului a eșuat pentru limba {language}\",\"PROJECT_ERROR_REGISTER_EDITOR\":\"Înregistrarea editorului a eșuat pentru numele {name} editorul este deja registrat\",\"PROJECT_ERROR_LOAD_PROJECTS\":\"Eroare la încărcarea proiectelor ({error})\",\"PROJECT_ERROR_SELECT_PROJECT\":\"Eroare la selectarea proiectului {project} ({error})\",\"PROJECT_ERROR_CREATE_PROJECT\":\"Eroare la crearea proiectului {project} ({error})\",\"PROJECT_ERROR_RENAME_PROJECT\":\"Eroare la redenumirea proiectului {project} cu numele {name} ({error})\",\"PROJECT_ERROR_CLONE_PROJECT\":\"Eroare la clonarea proiectului {project} ({error})\",\"PROJECT_ERROR_DELETE_PROJECT\":\"Eroare la ștergerea proiectului {project} ({error})\",\"PROJECT_ERROR_IMPORT_PROJECT\":\"Eroare la importarea proiectului {project} ({error})\",\"PROJECT_ERROR_EXPORT_PROJECT\":\"Eroare la exporting project {project} ({error})\",\"PROJECT_ERROR_NEW_FOLDER\":\"Eroare la crearea unui nou dosar {folder} ({error})\",\"PROJECT_ERROR_NEW_FILE\":\"Eroare la crearea unui nou fișier {file} ({error})\",\"PROJECT_ERROR_RENAME_OBJECT\":\"Eroare la redenumirea obiectului {object} ({error})\",\"PROJECT_ERROR_DELETE_FOLDER\":\"Eroare la ștergerea dosarului {folder} ({error})\",\"PROJECT_ERROR_DELETE_FILE\":\"Eroare la ștergerea dosarului {file} ({error})\",\"PROJECT_ERROR_SAVE_FILE\":\"Eroare la salvarea fișierului {file} ({error})\",\"PROJECT_ERROR_LOAD_FILE\":\"Eroare la încărcarea unui fișier {file} ({error})\",\"PROJECT_ERROR_READ_DATA\":\"Eroare la citirea datelor proiectului {project} ({error})\",\"PROJECT_ERROR_NOT_FOLDER\":\"Dosarul proiectului {project} nu este un dosar\",\"PROJECT_ERROR_SAVE_SPECIAL_FILE\":\"Eroare la salvarea fișierului special {file} cu datele ({error})\",\"PROJECT_ERROR_LOAD_SPECIAL_FILE\":\"Eroare la încărcarea fișierului special {file} ({error})\",\"PROJECT_ERROR_SEND_CODE\":\"Eroare la trimiterea codului fișierului {file} ({error})\",\"PROJECT_ERROR_PATH_INVALID\":\"Eroare, calea nu se află în dosarul spațiului de lucuru\",\"PROJECT_ERROR_CHANGE_DATE\":\"Eroare, nu se poate scrie data pentru proiect {project} ({error})\",\"PROJECT_JSON_DO_NOT\":\"S-a încercat editarea fișierului project.json, NU FACEȚI ASTA\",\"PROJECT_CLONE_PROJECT\":\"Clonează proiectul\",\"PROJECT_RENAME_PROJECT\":\"Redenumește proiectul\",\"PROJECT_NAME_PROMPT\":\"Introduceți numele proiectului\",\"PROJECT_LIBRARY_SEARCH\":\"Caută\",\"PROJECT_NULL\":\"Un parametru este null\",\"PATH_NULL\":\"O cale este nulă\",\"PROJECTS_NO_PROJECT\":\"Încă nu aveți niciun proiect\",\"PROJECTS_CREATE_APPLICATION\":\"Apăsați butonul \\\"Creează o aplicație nouă\\\" de mai jos\",\"PROJECTS_STORAGE_NOT_PERSISTENT\":\"Sistemul de stocare nu este persistent, ceea ce înseamnă că proiectele dvs. ar putea fi șterse oricând, fără notificare prealabilă. Pentru a evita acest lucru, vă rugăm să exportați proiectele frecvent.\",\"PROJECTS_STORAGE_ASK_PERSISTENT\":\"Sistemul de stocare nu este persistent. Vă rugăm să permiteți stocarea persistentă.\",\"PROJECTS_STORAGE_BUTTON_ASK_PERSISTENT\":\"Permiteți Persistența\",\"PROJECTS_STORAGE_BROWSER_ERROR\":\"Dacă browser-ul dvs. nu v-a întrebat dacă permiteți persistența, ar putea fi o problemă cu browserul. Pentru a preveni pierderea proiectelor, ar trebui să adăugați acest site web la marcaje, să-l utilizați mai des și să exportați frecvent proiectele. De asemenea, vă recomandăm să utilizați Firefox.\",\"PROJECTS_NO_FILE\":\"Nu este nici un fișier selectat, vă rugăm creați, importați sau selectați un fișier.\",\"PROJECTS_EXTENSION_URECOGNIZED\":\"Extensia fișierului nu este recunoscută.\",\"PROJECTS_INVALID_PROJECT\":\"Ați deschis un proiect invalid, vă rugăm selectați altul.\",\"PROJECTS_JSON_DO_NOT\":\"S-a încercat editarea fișierului project.json, NU FACEȚI ASTA\",\"PROJECT_EXISTS_PROMPT\":\"Un proiect cu acest nume există deja\",\"PROJECTS_READ_ONLY_FILE_SYSTEM\":\"Spațiul de stocare este numai pentru CITIRE, proiectele pot fi doar deschise.\",\"PROJECT_ERROR_SAVE_SCHEMATIC\":\"Eroare la salvarea schemei {file} cu datele ({error})\",\"PROJECT_ERROR_LOAD_SCHEMATIC\":\"Eroare la încărcarea schemei {file} ({error})\",\"SCHEMATICS\":\"Scheme\",\"ADD_SCHEMATIC\":\"Adăugare schemă\",\"DELETE_SCHEMATIC\":\"Ștergere schemă\",\"DELETE_MESSAGE\":\"Ești sigur(ă) că vrei să ștergi schema ?\",\"DELETE_CONFIRMATION\":\"Confirmarea ștergerii\",\"SCHEMATICS_IMPORT\":\"Importați scheme .svg din Fritzing\",\"DEVICE_SIMULATOR_RASPBERRY_PI\":\"Simulator Raspberry Pi\",\"DEVICE_SIMULATOR_RASPBERRY_PI_RUN\":\"Ruleaza\",\"DEVICE_SIMULATOR_RASPBERRY_PI_STOP\":\"Opreste\",\"DEVICE_SIMULATOR_RASPBERRY_PI_LOAD_PROJECT\":\"Incarca Schema\",\"DEVICE_SIMULATOR_RASPBERRY_PI_CLOSE_PROJECT_LIST\":\"Inchide\",\"DEVICE_SIMULATOR_RASPBERRY_PI_HELP\":\"Ajutor\",\"DEVICE_SIMULATOR_RASPBERRY_PI_TABLE_PIN\":\"Pini\",\"DEVICE_SIMULATOR_RASPBERRY_PI_TABLE_NAME\":\"Nume\",\"DEVICE_SIMULATOR_RASPBERRY_PI_TABLE_COLOR\":\"Culoare\",\"DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_NAME_LABEL\":\"Numele Proiectului\",\"DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_UPLOAD\":\"Incarca\",\"DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_CLOSE\":\"Inchide\",\"DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_ADD_SVG\":\"Adauga Fisierul SVG\",\"DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_ADD_XML\":\"Adauga Fisierul XML netlist\",\"CONSOLE\":\"Consola\",\"CONSOLE_NO_SHELL\":\"Rulati un proiect pentru a activa consola\",\"DATABASE\":\"BAZĂ DE DATE\",\"ID_SET_USER_ID\":\"ID-ul Sesiunii\",\"ID_SET_USER_ID_TITLE\":\"ID-ul sesiunii\",\"ID_SET_USER_ID_TEXT\":\"ID unic folosit pentru conectarea la dispozitive, este similar cu o parola.\",\"ID_SET_USER_ID_NO_UUID\":\"ID-ul sesiunii trebuie sa fie un UUID valid.\",\"LANGUAGE\":\"Română\",\"WORKSPACE_TOOLBAR_EXIT\":\"Ieșire\",\"WORKSPACE_TOOLBAR_FULLSCREEN\":\"Ecran complet\",\"WORKSPACE_TOOLBAR_RESTORE\":\"Refacere ecran\",\"WORKSPACE_TOOLBAR_MINIMIZE\":\"Minimizare\",\"WORKSPACE_TOOLBAR_SETUP\":\"Setări\",\"WORKSPACE_TOOLBAR_ABOUT\":\"Despre\",\"WORKSPACE_PROJECT_NOTEBOOK\":\"Notebook\",\"WORKSPACE_DEVICE_CONNECT\":\"Conectare\",\"WORKSPACE_BOARD_CONNECT\":\"Selectați un dispozitiv la care doriți să vă conectați\",\"CLOSE\":\"Închide\",\"WORKSPACE_PROJECT_LIBRARY\":\"Bibliotecă proiecte\",\"WORKSPACE_DEVICE_DISCONNECT\":\"Deconectare\",\"WORKSPACE_STATUS_DISCONNECTED\":\"DECONECTAT\",\"WORKSPACE_STATUS_CONNECTED\":\"CONECTAT\",\"WORKSPACE_STATUS_SYNCHRONIZING\":\"SUNCRONIZARE\",\"WORKSPACE_STATUS_CONNECTING\":\"CONECATRE\",\"WORKSPACE_STATUS_ERROR\":\"EROARE\",\"WORKSPACE_TOOLBAR_EXIT_QUESTION\":\"Sunteți sigur că doriți să inchideți?\",\"EXIT\":\"Ieșire\",\"WORKSPACE_SET_MODE_ADVANCED\":\"Mod Avansat\",\"WORKSPACE_SET_MODE_SIMPLE\":\"Mod Simplu\",\"ABOUT_DEVELOPED_BY\":\"Dezvoltat de\",\"ABOUT_MAINTAINER\":\"\",\"ABOUT_UI_UX\":\"UI/UX\",\"ABOUT_DEVELOPMENT\":\"Developer\",\"ABOUT_LICENSE\":\"Licență\",\"ABOUT_LICENSE_TITLE\":\"Licență de utilizare\",\"ABOUT_PROVIDED_BY\":\"Oferit de\",\"WORKSPACE_DEVICE_SETUP_TEXT\":\"Daca doriți să configurați anumite dispozitive, puteți accesa site-ul nostru web cu tutoriale pentru mai multe informații.\",\"WORKSPACE_DEVICE_SETUP\":\"Configurare dispozitiv\",\"WORKSPACE_TOOLBAR_CLOSE\":\"Ieșire\",\"WORKSPACE_DOCUMENTATION\":\"Documentație\",\"OK\":\"OK\",\"BACK\":\"Înapoi\",\"ABOUT_FEEDBACK\":\"Permiteti trimiterea de date anonime despre utilizarea software-ului. Acestea ne ajuta sa il imbunatatim.\",\"ABOUT_TRANSLATE\":\"Traduceri\",\"ABOUT_VERSION\":\"Versiune\",\"TUTORIALS_NAME\":\"Tutoriale\",\"TUTORIALS_IMPORT\":\"Import {title}\",\"TUTORIALS_IMPORT_PROJECT_NAME\":\"Scrieţi numele noului proiect\",\"TUTORIALS_PROJECT_EXISTS\":\"Un proiect cu numele {name} există deja, vă rog alegeţi un alt nume.\"},\"sk\":{\"PROJECT_DASHBOARD\":\"Riadiaca dosks\",\"DASHBOARD_SIGNAL_NAME\":\"Názov signálu\",\"DASHBOARD_SIGNAL_DESCRIPTION\":\"Popis\",\"DASHBOARD_SIGNAL_COLOR\":\"Farba\",\"NAME\":\"Názov\",\"DASHBOARD_ADD_SIGNAL\":\"Pridať\",\"IMAGE_GRAPH\":\"Obrázok\",\"DASHBOARD_ADDIMAGE\":\"Obrázok - Pridať signál\",\"PIN_LAYOUT\":\"Rozvrhnutie Pinov\",\"PROJECT_SHELL\":\"Shell\",\"DEVICE_WYAPP_RUN\":\"Spustiť\",\"DEVICE_WYAPP_STOP\":\"Zastaviť\",\"DEVICE_WYAPP_TASK_MANAGER\":\"Správca úloh\",\"DEVICE_WYAPP_PACKAGE_MANAGER\":\"Správca balíkov\",\"DEVICE_WYAPP_NETWORK_MANAGER\":\"Správca siete\",\"DEVICE_WYAPP_DISCONNECT\":\"Odpojiť\",\"DEVICE_WYAPP_RESTART\":\"Reštartovať a odpojiť\",\"DEVICE_WYAPP_TURNOFF\":\"Vypnúť a odpojiť\",\"PROJECT_NOTEBOOK\":\"Notebook\",\"PROJECT_APPLICATION\":\"Aplikácia\",\"PROJECT_NEW_FOLDER\":\"Nový priečinok\",\"PROJECT_NEW_FILE\":\"Nový súbor\",\"PROJECT_HIDE_CONSOLE\":\"Skryť Konzolu\",\"PROJECT_WELCOME_CREATE_NEW_APP\":\"Vytvoriť novú aplikáciu\",\"PROJECT_LIBRARY_IMPORT\":\"Importovať\",\"PROJECT_LIBRARY_CLONE\":\"Vytvoriť\",\"PROJECT_LIBRARY_EXPORT\":\"Exportovať\",\"PROJECT_LIBRARY_OPTIONS\":\"Možnosti\",\"PROJECT_LIBRARY_RENAME\":\"Premenovať\",\"PROJECT_LIBRARY_DELETE\":\"Vymazať\",\"PROJECT_LIBRARY_CLOSE\":\"Zatvoriť\",\"PROJECT_LIBRARY_PROJECTS\":\"Projekty\",\"PROJECT_LIBRARY_LOAD_EXAMPLE\":\"Načítať príklad\",\"LANGUAGE\":\"Slovenský\",\"WORKSPACE_TOOLBAR_EXIT\":\"Ukončiť\",\"WORKSPACE_TOOLBAR_FULLSCREEN\":\"Celá obrazovka\",\"WORKSPACE_TOOLBAR_RESTORE\":\"Obnoviť\",\"WORKSPACE_TOOLBAR_MINIMIZE\":\"Minimalizovať\",\"WORKSPACE_TOOLBAR_SETUP\":\"Nastavenia\",\"WORKSPACE_TOOLBAR_ABOUT\":\"Informácie o\",\"WORKSPACE_PROJECT_NOTEBOOK\":\"Notebook\",\"WORKSPACE_DEVICE_CONNECT\":\"Pripojiť\",\"WORKSPACE_BOARD_CONNECT\":\"Vyberte zariadenie, ku ktorému sa chcete pripojiť\",\"CLOSE\":\"Zatvoriť\",\"WORKSPACE_PROJECT_LIBRARY\":\"Knižnica projektov\",\"WORKSPACE_DEVICE_DISCONNECT\":\"Odpojiť\",\"WORKSPACE_TOOLBAR_EXIT_QUESTION\":\"Ste si istý že chcete odísť?\",\"YES\":\"Áno\",\"NO\":\"Nie\",\"EXIT\":\"Ukončiť\"}}}");

/***/ })

}]);