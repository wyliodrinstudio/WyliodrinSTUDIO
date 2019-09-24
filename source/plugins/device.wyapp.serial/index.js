import { EventEmitter } from 'events';
// import * as allDevices from './serial_devices.json';
const allDevices = require ('./serial_devices.json');

import SerialConnectionDialog from './views/SerialConnectionDialog.vue';

let SerialPort = null;

const SERIAL_PRIORITY_LOW = 299;
const SERIAL_PRIORITY_HIGH = 200;

let wyapp = null;
let workspace = null;
let deviceDriver = null;

let serialDevices = [];

let discoverSerialDevicesTimer = null;

function loadSerialPort ()
{
	try
	{
		return require ('serialport');
	}
	catch (e)
	{
		workspace.showError ('DEVICE_WYAPP_SERIAL_SERIAL_PORT_LOAD_ERROR', e.message);
		return {
			list: function ()
			{
				return [
				];
			}
		};
	}
}

async function listSerialPorts ()
{
	let ports = [];
	try 
	{
		ports = await SerialPort.list ();
		// console.log(ports);
	}
	catch (e)
	{
		workspace.showError ('DEVICE_WYAPP_SERIAL_LIST_PORTS_ERROR', e.message);
	}
	return ports;
}

function updateDevices ()
{
	deviceDriver.updateDevices (serialDevices);
}

class SerialWyAppTransport extends EventEmitter
{

}

function searchSerialDevices ()
{
	if (!discoverSerialDevicesTimer)
	{
		let listDevices = async () => {
			let serialPorts = await listSerialPorts ();
			let devices = [];
			for (let serialDevice of serialPorts)
			{
				if (serialDevice.comName && serialDevice.vendorId !== '1fc9' && serialDevice.productId !== '0094')
				{
					let name = serialDevice.comName;
					let description = '';
					let priority = SERIAL_PRIORITY_HIGH;
					if (serialDevice.vendorId)
					{
						let id = serialDevice.vendorId.toString().toLowerCase();
						if(allDevices[id])
						{
							// name = allDevices[id].name;
							if(allDevices[id].products)
							{
								if(allDevices[id].products[serialDevice.productId])
									name = allDevices[id].products[serialDevice.productId];
								else
									name = allDevices[id].name;
								description = allDevices[id].name;
							}
							else
								name = allDevices[id].name;
						}
					}
					// Show nice names in macOS
					else
					{
						// Show nice names in Linux and macOS
						if (name.startsWith('/dev/')) name = name.substring (5);

						if (name.startsWith('cu.')) name = name.substring (3);
						else
						if (name.startsWith('tty.')) name = name.substring (4);
						
						// Push macOS Bluetooth down as this will not have (usually) devices
						if (name.startsWith ('Bluetooth-'))
						{
							priority = SERIAL_PRIORITY_LOW;
						}
						// Is it a message?
						if (serialDevice.message)
						{
							name = serialDevice.message;
						}
						description = 'unknown';
					}
					devices.push ({
						id: 'wyapp:serial:'+serialDevice.comName,
						address: serialDevice.comName,
						description,
						name,
						icon: 'plugins/device.wyapp/data/img/icons/serial.png',
						board: 'any',
						priority,
						properties: {
							productId: serialDevice.productId,
							vendorId: serialDevice.vendorId,
							locationId: serialDevice.locationId,
							serialNumber: serialDevice.serialNumber,
							pnpId: serialDevice.pnpId,
						}
					});
				}
			}
			serialDevices = devices;
			updateDevices ();
		};
		discoverSerialDevicesTimer = setInterval (listDevices, 5000);
		listDevices ();
	}
}

export function setup (options, imports, register)
{
	wyapp = imports.device_wyapp;
	workspace = imports.workspace;

	SerialPort = loadSerialPort ();
	// console.log(SerialPort);

	if (SerialPort)
	{
		deviceDriver = wyapp.registerTransport ('serial', {
			Transport: SerialWyAppTransport,
			setup (device)
			{
				return workspace.showDialog (SerialConnectionDialog, {
					device: device,
					width: '500px'
				});
			}
		});

		searchSerialDevices ();
	}

	register (null, {});
}