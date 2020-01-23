import { EventEmitter } from 'events';
import bonjour from 'bonjour-hap';
import validator from 'validator';
import Client from 'ssh2';
import SSHConnectionDialog from './views/SSHConnectionDialog.vue';
import _ from 'lodash';
import qs from 'querystring';

// const NETWORK_PRIORITY_HIGH = 99;
// const NETWORK_PRIORITY_LOW = 0;

let wyapp = null;
let workspace = null;

let deviceDriver = null;

const bonjourBrowser = bonjour ();

let browser = null;

let sshDevices = [];

class SSHWyAppTransport extends EventEmitter
{
	/**
	 * 
	 * @param {Device} device 
	 * @param {SSHDeviceOptions} options 
	 */
	constructor (device, options, autoconnect = true)
	{
		super ();
		this.device = device;
		this.address = options.address;
		this.port = options.port || 22;
		this.username = options.username;
		this.password = options.password;
		this.ssh = null;
		this.status = 'disconnected';
		this.stream = null;
		if (autoconnect)
		{
			process.nextTick (this._connect.bind (this));
		}
	}

	_connect ()
	{
		this.ssh = new Client ();
		this.ssh.on ('ready', () => 
		{
			this.ssh.forwardOut ('127.0.0.1', null, '127.0.0.1', 7000, (error, stream) =>
			{
				// console.log (stream);
				if (error) 
				{
					// TODO translate
					if (error.reason === 'CONNECT_FAILED')
					{
						workspace.showNotification ('Device '+this.device+': has no Studio supervisor installed. Only console will be available');
					}
					else
					{
						// TODO translate
						workspace.showError ('Device '+this.device.name, {extra: error.message});
					}
				}
				else
				{
					stream.on ('data', this.emit.bind (this, 'data'));

					stream.on ('end', () => {
						this.ssh.end ();
					});

					this.stream = stream;
					this.status = 'synchronizing';
					this.emit ('synchronizing');
				}
			});
		});

		this.ssh.on ('close', () => {
			this.status = 'disconnected';
			this.emit ('disconnected');
		});

		this.ssh.on ('end', () => {
			this.status = 'disconnected';
			this.emit ('disconnected');
		});

		this.ssh.on ('error', (err) => {
			this.status = 'error';
			// TODO translate
			workspace.showError ('Device '+this.device.name,  {extra: err.message});
			this.emit ('error');
		});

		this.ssh.connect ({
			host: this.address,
			port: this.port,
			username: this.username,
			password: this.password
		});

		this.status = 'connecting';
		this.emit ('connecting');
	}

	write (data, done)
	{
		if (this.stream)
		{
			this.stream.write (data, done);
		}
		else
		{
			if (_.isFunction(done)) process.nextTick (() => done (new Error ('No Stream')));
		}
	}

	disconnect ()
	{
		// TODO emit the disconnect if the ssh is not connected
		if (this.status === 'connecting') 
		{
			this.emit ('disconnected');
			this.ssh.removeAllListeners ();
		}
		if (this.ssh) this.ssh.end ();
	}
}

function updateSSHDevices (sshDevices)
{
	let devices = [];
	for (let networkDevice of sshDevices)
	{
		/* Decode TXT DNS */
		networkDevice.txt = {};
		for (let rawData of networkDevice.rawTxt)
		{
			networkDevice.txt = _.assign (networkDevice.txt, qs.parse (rawData.toString ()));
		}

		let name = networkDevice.name;
		let platform = 'unknown';
		let category = 'unknown';
		let address = null;
		let ipv6Address = null;
		let addressGuess = false;
		// Use only IPv4 address (if possible)
		for (let ipAddress of networkDevice.addresses)
		{
			if (validator.isIP (ipAddress, 4)) address = ipAddress;
			else if (validator.isIP (ipAddress, 6)) ipv6Address = ipAddress;
		}
		// Try to use IPv6
		if (!address) address = ipv6Address;
		// IP addresses might not be available (bonjour library issue), try to use the DNS referer address
		if (!address) if (networkDevice.referer) 
		{
			address = networkDevice.referer.address;
			addressGuess = true;
		}
		if (networkDevice.txt)
		{
			if (networkDevice.txt.name) name = networkDevice.txt.name;
			// TODO categries and platform needs to be verified
			if (networkDevice.txt.platform) platform = networkDevice.txt.platform;
			if (networkDevice.txt.category) category = networkDevice.txt.category;
		}
		let icon = 'plugins/devices/wyapp/transports/ssh/data/img/icons/network.png';

		let priority = workspace.DEVICE_PRIORITY_HIGH;

		let device = {
			id: 'wyapp:ssh:'+address,
			address,
			name,
			board: category,
			icon,
			priority,
			properties: {
				category,
				platform,
				addressGuess,
				// TODO update from device
				port: 22
			}
		};
		
		devices.push (device);
	}
	// TODO translate IP Address
	devices.push ({
		id: 'wyapp:ssh:ipaddress',
		address: '',
		name: workspace.vue.$t('DEVICE_WYAPP_SSH_IP_ADDRESS'),
		board: 'any',
		priority: workspace.DEVICE_PRIORITY_PLACEHOLDER,
		placeholder: true,
		port: 22,
		properties: {
			// TODO update from device
			// port: 22
		}
	});
	return devices;
}

function searchSSHDevices ()
{
	if (!browser)
	{
		browser = bonjourBrowser.find({ type: 'wyapp' });

		let executeUpdate = () => 
		{
			sshDevices = updateSSHDevices (browser.services);
			updateDevices ();
		};

		browser.on ('up', function (/*service*/)
		{
			executeUpdate ();
		});

		browser.on ('down', function (/*service*/)
		{
			// console.log ('down device ', service);
			executeUpdate ();
		});

		executeUpdate ();
	}
}

function updateDevices ()
{
	deviceDriver.updateDevices (sshDevices);
}

export function setup (options, imports, register)
{
	wyapp = imports.device_wyapp;
	workspace = imports.workspace;

	deviceDriver = wyapp.registerTransport ('ssh', {
		Transport: SSHWyAppTransport,
		setup (device)
		{
			return workspace.showDialog (SSHConnectionDialog, {
				device: device,
				width: '500px'
			});
		}
	});

	imports.events.on ('ready', () => {
		searchSSHDevices ();
	});

	register (null, {});
}
