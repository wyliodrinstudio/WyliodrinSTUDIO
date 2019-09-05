/* Here you will import all the modules required for the functioning of your device */

import AwesomeDisconnectDialog from './views/AwesomeDisconnectDialog.vue';

import { EventEmitter } from 'events';
import { connect } from 'http2';

let deviceEvents = new EventEmitter ();

let awesome_module = null;

let studio = null;
let workspace = null;
let devices = [];

let awesomeDevices = [];

let connections = {};

function loadAwesome ()
{
	try
	{
		/* Any module that will allow you to find the type of device you have chosen*/

		return require ('awesome_module');
	}
	catch (e)
	{
		studio.workspace.error ('device_awesome: Awesome is not available '+e.message);
		return {
			list: function ()
			{
				return [
				];
			}
		};
	}
}

async function listAwesome ()
{
	let ports = [];
	try 
	{
		ports = await awesome_module.list ();
	}
	catch (e)
	{
		studio.workspace.error ('device_awesome: failed to list awesome '+e.message);
	}
	return ports;
}

function updateDevices()
{
	workspace.updateDevices ([...devices, ...awesomeDevices]);
}

let discoverAwesomeDevicesTimer = null;

function search ()
{
	if(!discoverAwesomeDevicesTimer)
	{
		discoverAwesomeDevicesTimer = setInterval (async () => {
			let awesome_devices = await listAwesome ();
			devices = [];
			for(let awesomeDevice of awesome_devices)
			{
				/* Search only for the devices that have the same specifications as your Awesome Device,
				  then push the object into the *devices* array and set its properties.
				*/
				devices.push(awesomeDevice);
			}
			updateDevices ();
		},5000);
	}
}

export function setup(options, imports, register)
{
	studio = imports; 
	awesome_module = loadAwesome();
	search();

	let device_awesome = {
		defaultIcon ()
		{
			return 'plugins/device.awesome/data/img/icons/awesome.png';
		},
		/* Register to receive device updates, use when connected */
		registerForUpdate (device, fn)
		{
			deviceEvents.on ('update:'+device.id, fn);
			return () => deviceEvents.removeListener ('update:'+device.id, fn);
		},
		getConnections ()
		{
			let connections = [];
			for (let deviceId in connections)
			{
				connections.push (connections[deviceId].device);
			}
			return connections;
		},
		connect(device, options)
		{
			/* Here goes the actual code that you will write in order to connect the device. */

			setTimeout(() => {
				device.status = 'CONNECTED';
			}, 1000);
		},
		disconnect(device, options)
		{
			/* Here goes the actual code that you will write in order to connect the device. */
			setTimeout(() => {
				device.status = 'DISCONNECTED';
			}, 1000);
		}
	};

	workspace = studio.workspace.registerDeviceDriver('awesome', device_awesome);

	if (workspace)
	{
		/* Register tool buttons */
		workspace.registerDeviceToolButton('DEVICE_AWESOME_RUN', 10 async () => {
			let device = studio.workspace.getDevice ();

			/* Here goes the actual code that will make your device run the code */
			console.log('Run');
		}, 'plugins/device.awesome/data/img/icons/run-icon.svg',

		/* The aditional options that make the Run Button visible and enabled only if there is a connected device 
		and its type is *awesome* */
		{
			visible () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.connection === 'awesome');
			},
			enabled () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.connection === 'awesome');
			},
			type: 'run'
		});

		register(null, {
			device_awesome
		});
	}
}