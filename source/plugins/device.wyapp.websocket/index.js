import { EventEmitter } from 'events';
import ReconnectingWebSocket from 'reconnectingwebsocket';
import uuid from 'uuid';
import DeviceSetup from './views/DeviceSetup.vue';

const NETWORK_PRIORITY_HIGH = 99;
// const NETWORK_PRIORITY_LOW = 0;

let wyapp = null;
let settings = null;
let workspace = null;

let deviceDriver = null;

let websocketDevices = [];

let socket = null;

let socketMessages = new EventEmitter ();

let authenticated = false;
let connected = false;

class WebSocketWyAppTransport extends EventEmitter
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
			console.log (device);
			console.log (this.device);
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
			if (_.isFunction (done)) 
			{
				process.nextTick (done);
			}
		}
		else
		{
			if (_.isFunction(done)) process.nextTick (() => done (new Error ('No Stream')));
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
			name: workspace.vue.$t('WYAPP_WEBSOCKET_NEW_DEVICE_TITLE'),
			board: 'any',
			placeholder: true,
			priority: NETWORK_PRIORITY_HIGH+10,
			properties: {}
		});
	}
	deviceDriver.updateDevices (websocketDevices);
	socketMessages.emit ('update:devices');
}

export function setup (options, imports, register)
{
	wyapp = imports.device_wyapp;
	settings = imports.settings;
	workspace = imports.workspace;

	// TODO store token
	let newtoken = uuid.v4 ();
	let token = settings.loadValue ('device.wyapp.websocket', 'userid', newtoken);
	if (token === newtoken) settings.storeValue ('device.wyapp.websocket', 'userid', token);

	let pingPongTimeout = null;

	let errorAlreadyShown = false;

	socket = new ReconnectingWebSocket ((location.protocol==='http:'?'ws':'wss')+'://'+location.hostname+':'+location.port+'/socket/ui');

	socket.onopen = function ()
	{
		connected = true;
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
					updateDevices ();
				}
				if (data.e === 'unique')
				{
					let reset = await workspace.showConfirmationPrompt ('DEVICE_WYAPP_WEBSOCKET_INSTANCE_RESET_TITLE', 'DEVICE_WYAPP_WEBSOCKET_INSTANCE_RESET');
					console.log (reset);
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
			else
			if (data.t === 's')
			{
				data.d.map ((device) => {if (!device.properties) device.properties = {}});
				websocketDevices = data.d;
				websocketDevices.map ((device) => {
					if (device.id.indexOf ('wyapp:websocket:')!==0) device.id = 'wyapp:websocket:'+device.id;
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

	socket.onerror = function (err)
	{
		if (!errorAlreadyShown)
		{
			workspace.showError ('DEVICE_WYAPP_WEBSOCKET_SOCKET_ERROR', {error: err.message});
			errorAlreadyShown = true;
		}
	};
	
	socket.onclose = function ()
	{
		connected = false;
		authenticated = false;
		websocketDevices = [];
		updateDevices ();
		clearInterval (pingPongTimeout);
		workspace.showNotification ('DEVICE_WYAPP_WEBSOCKET_SOCKET_DISCONNECTED', {}, 'warning');
	};

	deviceDriver = wyapp.registerTransport ('websocket', {
		Transport: WebSocketWyAppTransport,
		setup (device)
		{
			if (device.id === 'wyapp:websocket:newdevice')
			{
				workspace.showDialog (DeviceSetup, {token});
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
