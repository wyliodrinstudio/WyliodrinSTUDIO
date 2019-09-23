let drivelist = null;
const RPK_PRIORITY_HIGH = 20;

import _ from 'lodash';

import path from 'path';

import fs from 'fs-extra';

//import DeviceSetup from './views/DeviceSetup.vue';

import RPKDeviceSetup from './views/RPKDeviceSetup.vue';

import { EventEmitter } from 'events';

let deviceEvents = new EventEmitter();

let studio = null;
let workspace = null;
let devices = [];

let connections = {};

// Search for RPK devices
function loadRPK() {
	try {
		return require('drivelist');
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
		studio.workspace.error('device_rpk: failed to list rpk ' + e.message);
	}
	return ports;
}

function updateDevices() {
	if (devices.length === 0) {
		devices.push({
			id: 'rpk:newdevice',
			address: '',
			name: studio.workspace.vue.$t('RPK_NEW_DEVICE_TITLE'),
			board: 'any',
			placeholder: true
		});
	}
	workspace.updateDevices([...devices]);
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
							priority: RPK_PRIORITY_HIGH,
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

function updateDevice(device) {
	deviceEvents.emit('update:' + device.id, device);
}

export function setup(options, imports, register) {
	studio = imports;

	drivelist = loadRPK();
	search();

	let device_rpk = {
		defaultIcon() {
			return 'plugins/device.rpk/data/img/icons/rpk.png';
		},
		/**
		 * Register to recevie device updates, use when connected
		 * 
		 * @param {Device} device - the device
		 * @param {Function (device)} fn - function to be called
		 */
		registerForUpdate(device, fn) {
			deviceEvents.on('update:' + device.id, fn);
			return () => deviceEvents.removeListener('update:' + device.id, fn);
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
					studio.workspace.showDialog(RPKDeviceSetup);
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
					}
					else {
						studio.workspace.showNotification('RPK_DEVICE_ALREADY_CONNECTED', { device: device.name });
					}
				}
			}
			return null;
		},
		disconnect(device, options) {
			if (_.isObject(device)) {
				if (device.connection === 'usb') {
					delete connections[device.id];
					device.status = 'DISCONNECTED';
					updateDevice(device);
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
			console.log('run');
			if (device) {
				let project = await studio.projects.getCurrentProject();
				if (project) {
					let filename;
					let jsSource;
					console.log(project.language);
					if (project.language === 'visual') {
						filename = await studio.projects.getDefaultRunFileName(project);
						jsSource = await studio.projects.loadFile(project, filename);
					}
					else if (project.language === 'javascript') {
						jsSource = await studio.projects.getCurrentFileCode();
						console.log(jsSource);
					}
					device.sending = true;
					updateDevice(device);
					try {
						if (studio.console) {
							studio.console.show();
							studio.console.reset();
						}

						let data = await readBinary();
						jsSource += '\0';
						if (jsSource.length < 30000) {
							data.write(jsSource, 397494);
							studio.workspace.showNotification('DEVICE_RPK_FLASHING_IN_PROGRESS_PLEASE_WAIT');
							await writeBinary(device, data);
						}
						else {
							studio.workspace.showNotification('DEVICE_RPK_TOO_LONG_SOURCE_CODE');
						}
					}
					catch (e) {
						studio.workspace.showError('DEVICE_RPK_FLASH_ERROR', { error: e.message });
					}
					device.sending = false;
					updateDevice(device);
					studio.workspace.showNotification('DEVICE_RPK_FLASH_DONE', {}, 'success');
					delete connections[device.id];
					device.status = 'DISCONNECTED';
					updateDevice(device);
				}
			}
		}, 'plugins/device.wyapp/data/img/icons/run-icon.svg',
		{
			visible() {
				let device = studio.workspace.getDevice();
				return (device.status === 'CONNECTED' && device.connection === 'usb');
			},
			enabled() {
				let device = studio.workspace.getDevice();
				return (device.status === 'CONNECTED' && device.connection === 'usb' && !device.sending);
			},
			type: 'run'
		});
	}
	else {
		studio.workspace.error('Failed to register device driver rpk');
	}

	register(null, {
		deviceRpk: {}
	});
}

async function readBinary() {
	try {
		let data = await fs.readFile(path.join(__dirname, 'data', 'binaries', 'jerryscript.bin'));
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