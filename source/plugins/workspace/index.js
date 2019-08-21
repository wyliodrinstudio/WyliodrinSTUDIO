import Studio from './views/Studio.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n';
import Vuex from 'vuex';
import VuetifyDialog from 'vuetify-dialog';
import Dialog from './views/Dialog.vue';
import _ from 'lodash';
import ConnectionSelectionDialog from './views/ConnectionSelectionDialog.vue';
import DialogLayout from './views/DialogLayout.vue';
import NotificationLayout from './views/NotificationLayout.vue';
import QuestionDialog from './views/QuestionDialog.vue';
import PromptDialog from './views/PromptDialog.vue';
import studioStore from './store';

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

function getLanguage ()
{
	let languageString = navigator.language;
	let languageId = languageString.split ('-')[0];
	if (translations.TRANSLATION[languageString]) return languageString;
	return languageId;
}

function sortDevices (devices)
{
	return devices.sort ((device1, device2) => {
		let priority = device1.priority - device2.priority;
		if (priority === 0)
		{
			if (device1.name !== device2.name)
			{
				priority = (device1.name < device2.name)?-100:100;
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

	/* Start the application */
	start (studio)
	{
		Vue.prototype.studio = studio;

		let vuetify = new Vuetify ({
			theme: {
				themes: {
				  light: {
					primary: '#e54225',
					secondary: '#3c5459',
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
		Vue.mixin ({
			store: this.store
		});

		/* Translations */
		try
		{
			translations = require ('./translations.json');
		}
		catch (e)
		{
			this.error ('Loading translations failed '+e.message);
		}

		Vue.translation = translations;

		const i18n = new VueI18n ({
			locale: getLanguage (),
			fallbackLocale: 'en',
			messages: translations.TRANSLATION
		});

		Vue.mixin ({
			i18n
		});

		/* Register studion default menu items */
		// this.registerMenuItem ('TOOLBAR_SETUP', 10, () => {
		// 	console.log ('menu item setup');
		// });

		this.registerMenuItem ('WORKSPACE_SET_MODE_SIMPLE', 10, () => {
			workspace.dispatchToStore('workspace','mode', 'simple');
		}, {
			visible (){
				return workspace.getFromStore ('workspace', 'mode') !== 'simple';
			}
		});
	
		this.registerMenuItem ('WORKSPACE_SET_MODE_ADVANCED', 10, () => {
			workspace.dispatchToStore('workspace','mode','advanced');	
		}, {
			visible (){
				return workspace.getFromStore ('workspace', 'mode') === 'simple';
			}
		});

		this.registerMenuItem ('WORKSPACE_TOOLBAR_ABOUT', 100, () => {
			
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

		Vue.use (VuetifyDialog,{
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

		this.vue = new Vue ({
			el: '#app',
			vuetify,
			render: function (render)
			{
				return render (Studio);
			}
		});
	},

	/**
	 * Register a new tab, use before start
	 * @param {string} name - the name/id of the tab
	 * @param {number} priority - the priority of the tab, lower is to the left
	 * @param {Vue} component - the component to display
	 * 
	 * @returns {disposable} - an item that may be disposed
	 */
	registerTab (name, priority, component, options = {})
	{
		options = _.merge ({
			visible: () => true,
			enabled: () => true
		}, options);
		let sameTab = tabs.find ((tab) => tab.name === name);
		if (!sameTab)
		{
			this.registerComponent (component);
			let item = {
				name,
				priority,
				component: component.name,
				enabled: options.enabled,
				visible: options.visible
			};
			tabs.push (item);
			tabs = tabs.sort ((tab1, tab2) => tab1.priority - tab2.priority);
			this.store.dispatch ('workspace/tabs', tabs);
		}
		else
		{
			this.warn ('Tab '+name+' already exists in the workspace');
		}
	},
	
	/**
	 * Register a new menu item, use before start
	 * @param {string} name - the name/id of the menu item
	 * @param {number} priority - the priority of the tab, lower is to the left
	 * @param {Vue} component - the Vue component to display
	 * @param {Function} action - the function to run when clicked
	 * 
	 * @returns {disposable} - an item that may be disposed
	 */
	registerMenuItem (name, priority, action, options = {})
	{
		// TODO verify name, priority and action to be the right value
		options = _.merge ({
			visible: () => true,
			enabled: () => true
		}, options);
		let sameMenuItem = menuItems.find ((menuItem) => menuItem.name === name);
		if (!sameMenuItem)
		{
			let item = {
				name,
				priority,
				action,
				enabled: options.enabled,
				visible: options.visible
			};
			menuItems.push (item);
			menuItems = menuItems.sort ((menuItem1, menuItem2) => menuItem1.priority - menuItem2.priority);
			this.store.dispatch ('workspace/menuItems', menuItems);
		}
		else
		{
			this.warn ('Menu item '+name+' already exists in the menu');
		}
	},

	/**
	 * Register a new menu item, use before start
	 * @param {string} name - the name/id of the menu item
	 * @param {number} priority - the priority of the tab, lower is to the left
	 * @param {Vue} component - the Vue component to display
	 * @param {Function} action - the function to run when clicked
	 * 
	 * @returns {disposable} - an item that may be disposed
	 */
	renameMenuItem (prevName,actualName)
	{
		// TODO verify name, priority and action to be the right value
		let sameMenuItem = menuItems.find ((menuItem) => menuItem.name === prevName);
		if (sameMenuItem)
		{
			let index = menuItems.indexOf(sameMenuItem);
			if(index > -1)
			{
				menuItems.splice (index,1);
			}
			let item = {
				name:actualName,
				priority:sameMenuItem.priority,
				action:sameMenuItem.action,
				enabled: sameMenuItem.enabled,
				visible: sameMenuItem.visible
			};
			menuItems.push (item);
			menuItems = menuItems.sort ((menuItem1, menuItem2) => menuItem1.priority - menuItem2.priority);
			this.store.dispatch ('workspace/menuItems', menuItems);
		}
		else
		{
			this.warn ('Menu item '+prevName+' does not exists in the menu');
		}
	},

	/**
	 * Register a new toolbar button, use before start
	 * @param {string} name - the name/id of the menu item
	 * @param {number} priority - the priority of the tab, lower is to the left
	 * @param {Vue} component - the Vue component to display
	 * @param {Function} action - the function to run when clicked
	 * 
	 * @returns {disposable} - an item that may be disposed
	 */
	registerToolbarButton (name, priority, action, iconURL, options = {})
	{
		// TODO verify name, priority and action to be the right value
		options = _.merge ({
			visible: () => true,
			enabled: () => true
		}, options);
		let sameToolbarButton = toolbarButtons.find ((toolbarButton) => toolbarButton.name === name);
		if (!sameToolbarButton)
		{
			let item = {
				name,
				priority,
				action,
				iconURL,
				enabled: options.enabled,
				visible: options.visible
			};
			toolbarButtons.push (item);
			toolbarButtons = toolbarButtons.sort ((toolbarButton1, toolbarButton2) => toolbarButton1.priority - toolbarButton2.priority);
			this.store.dispatch ('workspace/toolbarButtons', toolbarButtons);
		}
		else
		{
			this.warn ('Toolbar button '+name+' already exists in the toolbar');
		}
	},

	/**
	 * Register a new device tool button, use before start
	 * @oaram {string} deviceType - the device driver type the button is for
	 * @param {string} name - the name/id of the menu item
	 * @param {number} priority - the priority of the tab, lower is to the left
	 * @param {Vue} component - the Vue component to display
	 * @param {Function} action - the function to run when clicked
	 * 
	 * @returns {disposable} - an item that may be disposed
	 */
	registerDeviceToolButton (deviceType, name, priority, action, iconURL, options = {})
	{
		// TODO verify name, priority, options.type and action to be the right value
		options = _.merge ({
			visible: () => true,
			enabled: () => true
		}, options);
		let sameDeviceToolButton = deviceToolButtons.find ((toolbarButton) => toolbarButton.name === name);
		if (!sameDeviceToolButton)
		{
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
			deviceToolButtons.push (item);
			deviceToolButtons = deviceToolButtons.sort ((deviceToolButton1, deviceToolButton2) => deviceToolButton1.priority - deviceToolButton2.priority);
			this.store.dispatch ('workspace/deviceToolButtons', deviceToolButtons);
		}
		else
		{
			this.warn ('Toolbar button '+name+' already exists in the toolbar');
		}
	},

	/**
	 * Register a new toolbar button, use before start
	 * @param {string} name - the name/id of the menu item
	 * @param {number} priority - the priority of the tab, lower is to the left
	 * @param {Vue} component - the Vue component to display
	 * @param {Function} action - the function to run when clicked
	 * 
	 * @returns {disposable} - an item that may be disposed
	 */
	registerStatusButton (name, priority, component, iconURL, options = {})
	{
		// TODO verify name, priority and action to be the right value
		this.registerComponent (component);
		options = _.merge ({
			visible: () => true,
			enabled: () => true,
			inset: () => false,
			height: () => '200px',
			overlay: () => false
		}, options);
		let sameStatusButton = statusButtons.find ((statusButton) => statusButton.name === name);
		if (!sameStatusButton)
		{
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
			statusButtons.push (item);
			statusButtons = statusButtons.sort ((statusButton1, statusButton2) => statusButton1.priority - statusButton2.priority);
			this.store.dispatch ('workspace/statusButtons', statusButtons);
		}
		else
		{
			this.warn ('Toolbar button '+name+' already exists in the toolbar');
		}
	},

	/**
	 * Open status button
	 * @param {string} name
	 */
	openStatusButton (name)
	{
		this.dispatchToStore ('workspace', 'activeStatusButton', name);
	},

	/**
	 * Close status button
	 */
	closeStatusButton ()
	{
		this.dispatchToStore ('workspace', 'activeStatusButton', '');
	},

	/**
	 * Register a new namespaced store, use before start
	 * @param {string} namespace - the name/id of the menu item
	 * @param {Store} store - the priority of the tab, lower is to the left
	 * 
	 * @returns {undefined} 
	 */
	registerStore (namespace, store)
	{
		if (this.store)
		{
			// TODO check if it is already registered
			this.store.registerModule (namespace, store);
		}
		else
		{
			this.error ('Unable to register store module '+namespace+', store has not been already started');
		}
	},

	/**
	 * 
	 * @param {string} namespace 
	 * @param {string} variable 
	 */
	getFromStore (namespace, variable)
	{
		return _.cloneDeep (this.store.getters [namespace+'/'+variable]);
	},
	/**
	 * 
	 * @param {string} namespace 
	 * @param {string} action 
	 * @param {Object} data 
	 */
	dispatchToStore (namespace, action, data)
	{
		return this.store.dispatch(namespace+'/'+action, _.cloneDeep (data));
	},
	/**
	 * Register a component
	 * @param {Vue} component 
	 */
	registerComponent (component)
	{
		// TODO check if title is string
		Vue.component(component.name,component);
	},

	/**
	 * 
	 * @param {string} text 
	 * @param {Object} values 
	 * @param {number} timeout 
	 */
	showNotification (text, values = {}, type = 'info', timeout = 6000)
	{
		if (this.vue)
		{
			if(type === 'info')
				this.vue.$dialog.notify.info(this.vue.$t(text, values), {
					position: 'bottom-right',
					width: '700',
					timeout: timeout
				});
			else
			if (type ==='success')
				this.vue.$dialog.notify.success(this.vue.$t (text, values), {
					position: 'bottom-right',
					width: '700',
					timeout
				});
			else
			if(type === 'warning')
				this.vue.$dialog.notify.warning(this.vue.$t (text, values), {
					position: 'bottom-right',
					width: '700',
					timeout
				});
		}
		else
		{
			this.error ('Notification is not available, please initialize Vue engine first.');
		}
	},
	showError(text, values = {}, timeout = 6000)
	{
		if(this.vue)
		{
			this.vue.$dialog.notify.error(this.vue.$t (text, values), {
				position: 'bottom-right',
				width: '70%',
				timeout
			});
		}
	},
	
	showPrompt(title, question, original, action, values = {})
	{
		return this.showDialog(PromptDialog, {
			question,
			title,
			values,
			persistent: false,
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
			actions: actions,
			values
		});
	},
	
	showConfirmationPrompt(title, question, values = {})
	{
		return this.showDialog(QuestionDialog, {
			question,
			title,
			values
		});
	},

	/**
	 * Show a dialog
	 * @param {string|object} title - the title of the dialog window
	 * @param {Vue} component - the Vue component to display
	 * @param {Object} options - additional like width
	 * @param {Object[]} buttons - the array of buttons to display
	 */
	showDialog (title, component, options, buttons, values = {})
	{
		return new Promise ((resolve, reject) => {
			process.nextTick (() => {
				let value = undefined;
				if (this.vue)
				{
					if (_.isObject (title))
					{
						values = buttons;
						buttons = options;
						options = component;
						component = title;
						value = this.vue.$dialog.showAndWait (component, options, {});
						// console.log (value);
					}
					else
					{
						value = this.vue.$dialog.showAndWait (Dialog, _.assign ({
							title: this.vue.$t (title, values),
							component,
							actions: buttons
						}, options));
						// console.log (value);
					}
				}
				else
				{
					this.error ('Dialog is not available, please initialize Vue engine first.');
				}
				return resolve (value);
			});
		});
	},

	/**
	 * Show the device settings dialog
	 * @param {Device} device - device
	 */
	showDeviceSettingsDialog ()
	{
		let device = this.getDevice ();
		let deviceDriver = deviceDrivers [device.type];
		if (deviceDriver)
		{
			if (_.isFunction (deviceDriver.settings))
			{
				deviceDriver.settings (device);
			}
			else
			{
				this.warn ('Device driver '+device.type+' has no registered settings function');
			}
		}
		else
		{
			this.showError ('DEVICE_UNKNOWN_TYPE', {
				type: device.type
			});
		}
	},

	/**
	 * Show the connect selection dialog
	 */
	showConnectionSelectionDialog ()
	{
		for (let type in deviceDrivers)
		{
			let deviceDriver = deviceDrivers[type];
			if (_.isFunction (deviceDriver.listDevices)) deviceDriver.listDevices ();
		}
		return this.showDialog (ConnectionSelectionDialog, {
			width: '800px'
		});
	},

	/**
	 * Set the workspace title (usually the project name)
	 */
	setWorkspaceTitle (title)
	{
		// TODO check if title is string
		this.store.dispatch ('workspace/title', title);
	},

	/**
	 * Register device type
	 * @param {string} name - device type name
	 * @param {DeviceDriver} deviceDriver - actual device driver
	 */
	registerDeviceDriver (name, deviceDriver)
	{
		if (!deviceDrivers[name])
		{
			/* TODO check that device driver has all the properties
			DeviceDriver
			{
				connect: function,
			}
			*/
			deviceDrivers[name] = deviceDriver;
			return {
				registerDeviceToolButton: this.registerDeviceToolButton.bind (this, name),
				updateDevices: this.updateDevices.bind (this, name),
			};
		}
		else
		{
			this.warn ('Device type '+name+' is already registered');
		}
		return null;
	},

	/**
	 * Update devices
	 * @param {string} type - device type, has to be registered
	 * @param {[Device]} dev - devices
	 */
	updateDevices (type, dev)
	{
		if (deviceDrivers[type])
		{
			// console.log (data);
			let devices = availableDevices.filter ((device) => {
				return (device.type !== type);
			});

			dev.map ((device) => {
				device.type = type;
				if (!device.icon) this._defaultDeviceIcon (device);
			});

			devices.push (...dev);
			availableDevices = sortDevices (devices);
			this.dispatchToStore ('workspace', 'devices', availableDevices);
		}
		else
		{
			this.warn ('update devices: device type '+type+' is not registered');
		}
	},

	/**
	 * Place the default device icon (if available)
	 * @param {Device} device 
	 */
	_defaultDeviceIcon (device)
	{
		if (_.isFunction (deviceDrivers[device.type].defaultIcon))
		{
			device.icon = deviceDrivers[device.type].defaultIcon ();
		}
		else
		{
			device.icon = 'plugins/workspace/data/img/icons/device-icon.png';
			this.warn ('update devices: device type '+device.type+' has no default device icon');
		}
	},

	/**
	 * Connect to a device
	 * @param {Device} device - the device to connect to
	 * @param {Device} options - connect options
	 * 
	 * statuyses
	 *   DISCONNECTED - this is offline
	 *   CONNECTING - trying to connect
	 *   SYNCHRONIZING - trying to synchronize with the device
	 *   CONNECTED - this is online
	 *   ISSUE - there is some issue, the system is partially functional
	 *   ERROR - there is an error with the system
	 */
	async connect (device, options)
	{
		// TODO should check for connection?
		if (this.getStatus () !== 'DISCONNECTED')
		{
			await this.disconnect (this.getDevice ());
		}
		// TODO check that device is an actual device type
		let deviceDriver = deviceDrivers[device.type];
		if (deviceDriver)
		{
			let update = await deviceDriver.connect (_.cloneDeep (device), options);
			if (update) 
			{
				// update = this.store.dispatch ('workspace/device', update);
				// if (update.type === 'none')
				// {
				// 	await this.disconnect ();
				// }
				// register device
				let unregister = deviceDriver.registerForUpdate (update, (device) => {
					let dev = this.getDevice ();
					if (device.id === dev.id && device.type === dev.type)
					{
						this.dispatchToStore ('workspace', 'status', device.status);
						this.dispatchToStore ('workspace', 'device', device);
						if (device.status === 'DISCONNECTED')
						{
							this.dispatchToStore ('workspace', 'device', undefined);
						}
					}
					else
					{
						this.warn ('Trying to update status from device '+device.id+' ('+device.type+') while device is the selected one');
					}
					if (device.status === 'DISCONNECTED')
					{
						unregister ();
					}
				});
				this.dispatchToStore ('workspace', 'device', update);
			}
			// if the device has no type, disconnect it
			// TODO should this display an error?
		}
		else
		{
			this.showError ('DEVICE_UNKNOWN_TYPE', {
				type: device.type
			});
		}
	},
	/**
	 * Get the status
	 */
	getDevice ()
	{
		return this.getFromStore ('workspace', 'device');
	},

	/**
	 * Get the status
	 */
	getStatus ()
	{
		return this.getFromStore ('workspace', 'status');
	},

	/**
	 * Disconnect from a device
	 */
	async disconnect ()
	{
		// TODO should check for existing connection?
		let device = this.getDevice();
		if (device)
		{
			let deviceDriver = deviceDrivers[device.type];
			if (deviceDriver)
			{
				await deviceDriver.disconnect (device);
				// TODO wait some time and then disconnect anyway
			}
			else
			{
				this.error ('There is no driver for the current device ('+device.type+')');
			}
		}
		else
		{
			this.warn ('There is no connected device, nothing to disconnect from');
		}
	},

	/**
	 * Close
	 */
	async close ()
	{
		if (!closeAsking)
		{
			closeAsking = true;
			let value = await workspace.showConfirmationPrompt('EXIT', 'WORKSPACE_TOOLBAR_EXIT_QUESTION');
			
			if (value) {
				system.close ();
			} 

			// eslint-disable-next-line require-atomic-updates
			closeAsking = false;
		}
	},

	/**
	 * Display warning
	 */
	warn ()
	{
		console.warn ('WARNING: ', ...arguments);
	},

	/**
	 * Display error
	 */
	error ()
	{
		console.error ('ERROR: ', ...arguments);
	},
};

export function setup (options, imports, register)
{
	system = imports.system;
	system.events.on ('close-ask', () => {
		workspace.close ();
	});
	Vue.use (VueI18n);
	Vue.use(Vuetify);
	Vue.use (Vuex);
	
	/* Store */
	workspace.store = new Vuex.Store ({
		modules: {},
		strict: process.env.NODE_ENV !== 'production'
	});

	/* Register the store */
	workspace.registerStore ('workspace', studioStore);

	register (null, {
		workspace: workspace
	});
}
