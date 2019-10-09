let drivelist = null;
// const RPK_PRIORITY_HIGH = 20;

import _ from 'lodash';

import path from 'path';

let fs = null;

//import DeviceSetup from './views/DeviceSetup.vue';

import RPKDeviceSetup from './views/RPKDeviceSetup.vue';

let SerialPort = null;

let studio = null;
let workspace = null;
let devices = [];
let connections = {};

let serialDevices = [];

let ports = {};

/**
 * Send an update
 * @param {Device} device 
 */
function updateDevice (device)
{
	// deviceEvents.emit ('update:'+device.id, device);
	workspace.updateDevice (device);
}

function loadSerialPort() {
	try {
		return eval ('require(\'serialport\')');
	}
	catch (e) {
		console.error (e);
		return {
			list: function () {
				return [
				];
			}
		};
	}
}

async function listSerialPorts() {
	let ports = [];
	try {
		ports = await SerialPort.list();
	}
	catch (e) {
		studio.workspace.showError('DEVICE_WYAPP_SERIAL_LIST_PORTS_ERROR', e.message);
	}
	return ports;
}

function searchSerialDevices() {
	let listDevices = async () => {
		let serialPorts = await listSerialPorts();
		let devices = [];
		for (let serialDevice of serialPorts) {
			if (serialDevice.vendorId === '1fc9' && serialDevice.productId === '0094') {
				let name = 'Running NXP RPK';
				let description = '';
				let id = serialDevice.vendorId.toString().toLowerCase();
				let priority = workspace.DEVICE_PRIORITY_NORMAL;
				devices.push({
					id: id,//'wyapp:serial:'+serialDevice.comName,
					address: serialDevice.comName,
					description,
					name,
					connection: 'serial',
					icon: 'plugins/device.rpk/data/img/icons/running-rpk.png',
					board: 'any',
					priority,
					status: '',
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
		updateDevices();
		setTimeout (listDevices, 5000);
	};
	listDevices ();
}

// Search for RPK devices
function loadRPK() {
	try {
		return eval ('require(\'drivelist\')');
	}
	catch (e) {
		studio.workspace.error('device_rpk: RPK is not available ' + e.message);
		return {
			list: function () {
				return [
				];
			}
		};
	}
}
async function listRPKs() {
	let ports = [];
	try {
		ports = await drivelist.list();
	}
	catch (e) {
		console.error (e);
	}
	return ports;
}

function updateDevices() {
	let add = [];
	if (serialDevices.length === 0 && devices.length === 0) {
		add.push({
			id: 'rpk:newdevice',
			address: '',
			name: studio.workspace.vue.$t('RPK_NEW_DEVICE_TITLE'),
			board: 'any',
			priority: workspace.DEVICE_PRIORITY_PLACEHOLDER,
			placeholder: true
		});
	}
	workspace.updateDevices([...devices, ...serialDevices, ...add]);
}

let discoverRPKsDevicesTimer = null;

function search() {
	if (!discoverRPKsDevicesTimer) {
		discoverRPKsDevicesTimer = setInterval(async () => {
			let rpk_devices = await listRPKs();
			devices = [];
			for (let rpkDevice of rpk_devices) {

				if (rpkDevice.description.indexOf('MASS') >= 0 && rpkDevice.description.indexOf('NXP') >= 0) {
					if (rpkDevice.mountpoints.length > 0)
						devices.push({
							id: 'rpk:' + rpkDevice.mountpoints[0].path,
							name: 'RPK',
							address: rpkDevice.mountpoints[0].path,
							priority: workspace.DEVICE_PRIORITY_NORMAL,
							board: 'rpk',
							connection: 'usb',
							status: ''
						});
				}
			}
			updateDevices();
		}, 5000);
	}
}

export function setup(options, imports, register) {
	studio = imports;
	drivelist = loadRPK();
	SerialPort = loadSerialPort();

	if (studio.system.platform () === 'electron')
	{
		fs = eval ('require (\'fs-extra\')');
	}

	let device_rpk = {
		defaultIcon() {
			return 'plugins/device.rpk/data/img/icons/rpk.png';
		},

		getConnections() {
			let connections = [];
			for (let deviceId in connections) {
				connections.push(connections[deviceId].device);
			}
			return connections;
		},

		async connect(device/*, options*/) {
			console.log('check object');
			if (_.isObject(device)) {
				if (device.id === 'rpk:newdevice') {
					studio.workspace.showDialog(RPKDeviceSetup,{width: '500px'});
					return null;
				}
				else {
					console.log('check connection');
					if (!connections[device.id]) {
						console.log('check type');
						connections[device.id] = {};
						if (device.connection === 'usb') {
							console.log('check path');
							let exists = false;
							exists = await fs.pathExists(device.address);
							if (exists) {
								process.nextTick(() => {
									device.status = 'CONNECTED';
									updateDevice(device);
								});
								return device;
							}
							else {
								delete connections[device.id];
								return null;
							}
						}
						else if (device.connection === 'serial') {
							// console.log(studio.console);
							// if (studio.console)
							// {
							// 	console.log('here');
							// 	studio.console.select(device.id);
							// process.nextTick(() => {
								
							// });
							ports[device.id] = new SerialPort(device.address, (err) => {
								if (err) {
									device.status = 'DISCONNECTED';
									updateDevice(device);
									studio.workspace.showError ('RPK_SERIAL_CONNECTON_ERROR', {extra: err.message});
									delete connections[device.id];
									delete ports[device.id];
								}
								else
								{
									device.status = 'CONNECTED';
									updateDevice(device);
									if (studio.console)
									{
										studio.console.select (device.id);
										studio.console.reset();
										studio.console.show ();
									}
								}
							});
							ports[device.id].on('data', (data) => {
								console.log(data.toString());
								studio.console.write(device.id, data.toString());
							});
							ports[device.id].on('error', (err) => {
								// console.log(data.toString());
								studio.workspace.showError ('RPK_SERIAL_CONNECTON_ERROR', {extra: err.message});
							});
							ports[device.id].on('close', () => {
								// console.log(data.toString());
								device.status = 'DISCONNECTED';
								updateDevice(device);
								delete connections[device.id];
								delete ports[device.id];
							});
							return device;
							// }
							// else {
							// 	delete connections[device.id];
							// 	return null;
							// }
						}
						else if (device.connection === 'web-usb') {
							process.nextTick(() => {
								device.status = 'CONNECTED';
								updateDevice(device);
							});
							return device;
						}
					}
					else {
						studio.workspace.showNotification('RPK_DEVICE_ALREADY_CONNECTED', { device: device.name });
					}
				}
			}
			return null;
		},
		disconnect(device/*, options*/) {
			if (_.isObject(device)) {
				if (device) {
					if (ports[device.id])
					{
						ports[device.id].close ();
					}
					device.status = 'DISCONNECTED';
					updateDevice(device);
					delete connections[device.id];
				}
				return true;
			}

			else {
				studio.workspace.warn('device_wyapp_disconnect: there is no device connecte');
			}
		}
	};

	/* Setup device type */
	workspace = studio.workspace.registerDeviceDriver('rpk', device_rpk);
	if (workspace) {
		workspace.registerDeviceToolButton('DEVICE_RPK_FLASH', 10, async () => {
			let device = studio.workspace.getDevice();
			if (device) {
				if (device.connection === 'usb' || device.connection === 'web-usb')
				{
					let project = await studio.projects.getCurrentProject();
					if (project) {
						let filename;
						let jsSource;
						console.log(project.language);
						if (project.language === 'visual') {
							filename = await studio.projects.getDefaultRunFileName(project);
							jsSource = await studio.projects.loadFile(project, filename);
						}
						else if (project.language === 'nodejs') {
							jsSource = await studio.projects.getCurrentFileCode();
						}

						let flashError = true;

						let data = null;
						try
						{
							data = await readBinary();
							jsSource += '\n\0';
							if (jsSource.length < 30000) {
								data.write(jsSource, 397642);
								flashError = false;
							}
							else {
								studio.workspace.showNotification('DEVICE_RPK_TOO_LONG_SOURCE_CODE');
							}
						}
						catch (e)
						{
							studio.workspace.showError('DEVICE_RPK_FLASH_ERROR', { extra: e.message });
						}

						if (!flashError)
						{
							if (device.connection === 'usb')
							{
								device.sending = true;
								updateDevice(device);
								try {
									studio.workspace.showNotification('DEVICE_RPK_FLASHING_IN_PROGRESS_PLEASE_WAIT');
									await writeBinary(device, data);
								}
								catch (e) {
									studio.workspace.showError('DEVICE_RPK_FLASH_ERROR', { extra: e.message });
								}
								device.sending = false;
								updateDevice(device);
								studio.workspace.showNotification('DEVICE_RPK_FLASH_DONE', {}, 'success');
								delete connections[device.id];
								device.status = 'DISCONNECTED';
								updateDevice(device);
							}
							else
							{
								studio.workspace.showDialog (RPKDeviceSetup, {
									filename: project.name,
									binary: data
								});
							}
						}
					}
				}
				else
				if (device.connection === 'serial')
				{
					studio.workspace.showDialog (RPKDeviceSetup);
				}
			}
		}, 'plugins/device.wyapp/data/img/icons/run-icon.svg',
		{
			visible() {
				let device = studio.workspace.getDevice();
				return (device.status === 'CONNECTED');
			},
			enabled() {
				let device = studio.workspace.getDevice();
				return (device.status === 'CONNECTED' && !device.sending);
			},
			type: 'run'
		});
	}
	else {
		studio.workspace.error('Failed to register device driver rpk');
	}

	if (studio.system.platform() === 'electron')
	{
		search();

		if (SerialPort) {
			searchSerialDevices();
		}
	}
	else 
	{
		devices = [
			{
				id: 'rpk:web',
				address: '',
				name: 'NXP RPK',
				board: 'any',
				connection: 'web-usb',
				priority: workspace.DEVICE_PRIORITY_PLACEHOLDER,
				placeholder: true
			}
		];
		updateDevices ();
	}


	if (studio.console)
	{
		studio.console.register ((event, id, ...data) =>
		{
			if (ports[id])
			{
				if (event === 'data')
				{	
					ports[id].write (data[0]);
				}
				else
				if (event === 'resize')
				{
					// Serial Port has no resize
				}
			}
		});
	}

	register(null, {
		deviceRpk: {}
	});
}

async function readBinary() {
	try {
		let data = await studio.filesystem.loadDataFile('device.rpk', 'binaries/jerryscript.bin');
		return data;
	} catch (err) {
		console.error(err);
	}
}

async function writeBinary(device, data) {
	try {
		await fs.writeFile(path.join(device.address, 'jerryscript.bin'), data);
	} catch (err) {
		console.error(err);
	}
}