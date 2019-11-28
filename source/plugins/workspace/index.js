import Studio from './views/Studio.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n';
import Vuex from 'vuex';
import VuetifyDialog from 'vuetify-dialog';
import Dialog from './views/Dialog.vue';
import uuid from 'uuid';
import _ from 'lodash';
import ConnectionSelectionDialog from './views/ConnectionSelectionDialog.vue';
import DialogLayout from './views/DialogLayout.vue';
import NotificationLayout from './views/NotificationLayout.vue';
import QuestionDialog from './views/QuestionDialog.vue';
import PromptDialog from './views/PromptDialog.vue';
import studioStore from './store';
import AboutDialog from './views/AboutDialog.vue';
import AsyncComputed from 'vue-async-computed';

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

	version: require ('../../../package.json').version,

	DEVICE_PRIORITY_HIGH: 0,
	DEVICE_PRIORITY_NORMAL: 100,
	DEVICE_PRIORITY_PLACEHOLDER: 200,
	DEVICE_PRIORITY_SIMULATOR: 300,
	DEVICE_PRIORITY_LOW: 900,

	/* Start the application */
	start(studio) {
		Vue.prototype.studio = studio;

		let vuetify = new Vuetify({
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

		Vue.config.productionTip = false;

		/* Store */
		Vue.mixin({
			store: this.store
		});

		/* Translations */
		try {
			translations = require('./translations.json');
		}
		catch (e) {
			this.error('Loading translations failed ' + e.message);
		}

		Vue.use(AsyncComputed);

		Vue.translation = translations;

		const i18n = new VueI18n({
			locale: studio.settings.loadValue ('workspace', 'language', getLanguage()),
			fallbackLocale: 'en',
			messages: translations.TRANSLATION
		});

		Vue.mixin({
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
			this.showDialog(AboutDialog,{width:550});
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

		Vue.use(VuetifyDialog, {
			context: {
				vuetify
			},
			confirm: {
				width: 500,
				height: 500
			}
		});

		Vue.prototype.$dialog.layout('default', DialogLayout);
		Vue.prototype.$dialog.layout('notification', NotificationLayout);

		this.vue = new Vue({
			el: '#app',
			vuetify,
			render: function (render) {
				return render(Studio);
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
		options = _.merge({
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
		options = _.merge({
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
	 * registerToolbarButton('TOOLBAR_BUTTON', 10, () => showNotification('You created a toolbar button!'), 'plugins/projects/data/img/icons/button.svg', {
	 * 		visible() {
	 * 			return time.getHours() > 8;
	 * 		}
	 * });
	 */
	registerToolbarButton(name, priority, action, iconURL, options = {}) {
		// TODO verify name, priority and action to be the right value
		options = _.merge({
			visible: () => true,
			enabled: () => true
		}, options);
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
	 * 		'plugins/workspace/data/img/icons/button.svg', {
	 * 		visible() {
	 * 			return time.getHours() > 8;
	 * 		}
	 * });
	 */
	registerDeviceToolButton(deviceType, name, priority, action, iconURL, options = {}) {
		// TODO verify name, priority, options.type and action to be the right value
		options = _.merge({
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
	 * registerStatusButton('CONSOLE', 1, Console, 'plugins/console/data/img/icons/terminal-icon.svg');
	 */
	registerStatusButton(name, priority, component, iconURL, options = {}) {
		// TODO verify name, priority and action to be the right value
		this.registerComponent(component);
		options = _.merge({
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
		return _.cloneDeep(this.store.getters[namespace + '/' + variable]);
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
		return this.store.dispatch(namespace + '/' + action, _.cloneDeep(data));
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
		Vue.component(component.name, component);
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
		return this.showDialog(PromptDialog, {
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
		return this.showDialog(QuestionDialog, {
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
		return this.showDialog(QuestionDialog, {
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
					if (_.isObject(title)) {
						values = buttons;
						buttons = options;
						options = component;
						component = title;
						value = this.vue.$dialog.showAndWait(component, options, {});
						// console.log (value);
					}
					else {
						value = this.vue.$dialog.showAndWait(Dialog, _.assign({
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
			if (_.isFunction(deviceDriver.settings)) {
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
			if (_.isFunction(deviceDriver.listDevices)) deviceDriver.listDevices();
		}
		return this.showDialog(ConnectionSelectionDialog, {
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
		if (_.isFunction(deviceDrivers[device.type].defaultIcon)) {
			device.icon = deviceDrivers[device.type].defaultIcon();
		}
		else {
			device.icon = 'plugins/workspace/data/img/icons/device-icon.png';
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
			let update = await deviceDriver.connect(_.cloneDeep(device), options);
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
		console.warn('WARNING: ', ...arguments);
	},

	/**
	 * Display error
	 */
	error() {
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

export function setup(options, imports, register) {

	studio = imports;
	
	let newToken = uuid.v4 ();
	let token = imports.settings.loadValue('workspace', 'userid', newToken);
	if (token == newToken) imports.settings.storeValue('workspace', 'userid', token);

	system = imports.system;
	system.events.on('close-ask', () => {
		workspace.close();
	});
	
	Vue.use(VueI18n);
	Vue.use(Vuetify, {
		font: 'mdi',
		iconfont: 'mdi'
	});
	Vue.use(Vuex);

	/* Store */
	workspace.store = new Vuex.Store({
		modules: {},
		strict: process.env.NODE_ENV !== 'production'
	});

	/* Register the store */
	workspace.registerStore('workspace', studioStore);

	settings = imports.settings;
	let mode = settings.loadValue('workspace', 'mode', 'simple');

	workspace.dispatchToStore('workspace', 'mode', mode);

	register(null, {
		workspace: workspace
	});
}
