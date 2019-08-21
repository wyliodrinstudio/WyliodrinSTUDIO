let drivelist = null;
const RPK_PRIORITY_HIGH = 20;
// const RPK_PRIORITY_LOW = 0;

import _ from 'lodash';

import path from 'path';

import noble from '@abandonware/noble';

import fs from 'fs-extra';

import RPKDisconnectDialog from './views/RPKDisconnectDialog.vue';

import { EventEmitter } from 'events';

let bleAdapterScanner = true;

const DELIMITER = Buffer.alloc (2, 255);

let deviceEvents = new EventEmitter ();

let studio = null;
let workspace = null;
let devices = [];
let bleDevices = [];

let pingVar = null;

let connections = {};

let peripherals  = {};
let savedCharacteristics = {};
let pingTimer = 0;
let pingRes = true;
let startReceiving = false;

let publishPacket = {
	cmd: 'publish',
	qos: 2,
	topic: '',
	payload: '',
	retain: false
};

let msgSize = -1;
let msg = '';
let finalSize = 0;
let CMD = undefined;
let brokenMessage = undefined;

function notificationMessagesReset() {
	msgSize = -1;
	msg = '';
	finalSize = 0;
	CMD = undefined;
	brokenMessage = undefined;
	startReceiving = false;
}

// Search for RPK devices
function loadRPK ()
{
	try
	{
		return require ('drivelist');
	}
	catch (e)
	{
		studio.workspace.error ('device_rpk: RPK is not available '+e.message);
		return {
			list: function ()
			{
				return [
				];
			}
		};
	}
}
// const RPKs = loadRPK ();
async function listRPKs ()
{
	let ports = [];
	try 
	{
		ports = await drivelist.list ();
	}
	catch (e)
	{
		studio.workspace.error ('device_rpk: failed to list rpk '+e.message);
	}
	return ports;
}

function updateDevices ()
{
	workspace.updateDevices ([...devices, ...bleDevices]);
}

let discoverRPKsDevicesTimer = null;

function search ()
{
	if (!discoverRPKsDevicesTimer)
	{
		discoverRPKsDevicesTimer = setInterval (async () => {
			let rpk_devices = await listRPKs ();
			// console.log(rpk_devices);
			devices = [];
			for(let rpkDevice of rpk_devices)
			{
				// console.log(rpkDevice);
				
				if(rpkDevice.description.indexOf('MASS') >=0 && rpkDevice.description.indexOf('NXP')>=0){
					if(rpkDevice.mountpoints.length>0)
						devices.push({
							id: 'rpk:'+rpkDevice.mountpoints[0].path,
							name: 'RPK',
							address: rpkDevice.mountpoints[0].path,
							priority: RPK_PRIORITY_HIGH,
							board: 'rpk',
							connection: 'usb',
							status: ''
						});
				}
			}
			// devices.push({
			// 	id: 'rpk',
			// 	name: 'RPK',
			// 	address: '/usr',
			// 	priority: RPK_PRIORITY_HIGH,
			// 	board: 'rpk',
			// 	connection: 'usb',
			// 	status: ''
			// });
			// console.log(devices);
			updateDevices ();
		},5000);
	}
}

function searchBluetooth ()
{
	let dev = {};
	noble.on('stateChange', (state) => {
		if (state === 'poweredOn') {
			noble.startScanning(null, true);
		} else {
			noble.stopScanning ();
		}
	});

	noble.on('discover', (peripheral) => {
		if(peripheral.advertisement.localName) {
			if (peripheral.advertisement.localName.indexOf('RPK') >= 0) {  
				let id = 'rpk:'+peripheral.advertisement.localName;
				let icon = 'plugins/device.rpk/data/img/icons/rpk-ble.png';
				if (savedCharacteristics[id]) icon = 'plugins/device.rpk/data/img/icons/rpk-ble-online.png';
				dev[id] = {
					id: id,
					name: peripheral.advertisement.localName,
					address: peripheral.address,
					priority: RPK_PRIORITY_HIGH,
					icon: icon,
					board: 'rpk',
					connection: 'ble',
					timestamp: Date.now(),
					periph: peripheral,
					status: 'DISCONNECTED',
					sending: false  
				};
				peripherals[id] = peripheral;

				update ();
			}
		}
	});

	let update = () => {
		bleDevices =  [];

		for (let id in dev)
		{
			if (savedCharacteristics[id]) 
			{
				dev[id].timestamp = Date.now ();
				dev[id].icon = 'plugins/device.rpk/data/img/icons/rpk-ble-online.png';
			}
			if ((Date.now() - dev[id].timestamp) < 20000)
			{
				bleDevices.push (dev[id]);
			}
		}
		updateDevices ();
	};

	let timer = null;
	if (!timer)
	{
		timer = setInterval (() => {
			update ();
		}, 5000);
	}
}

function updateDevice (device)
{
	deviceEvents.emit ('update:'+device.id, device);
}

export function setup(options, imports, register)
{
	studio = imports;

	imports.events.on ('ready', (imports) => {
		studio = imports;
		if (studio.console)
		{
			studio.console.register (async (event, id, ...data) =>
			{
				if (savedCharacteristics[id])
				{
					let device = studio.workspace.getDevice ();
					if (device.type === 'rpk')
					{
						if (event === 'data')
						{	
							let characteristic = savedCharacteristics [device.id];
							if (characteristic)
							{
								// console.log(data.toString().length);
								device.sending = true;
								// notificationMessagesReset();
								await sendToConsole(device, characteristic, data);

								device.sending = false;
								// await sendConsole(characteristic, data.toString().charCodeAt(0));
							}
						}
					}
				}
			});
		}

		if (studio.mqtt)
		{
			studio.mqtt.subscribe('/RPK/+/console/in', async (packet, cb) => {
				for (let device of bleDevices)
				{
					let characteristic = savedCharacteristics[device.id];
					if (characteristic)
					{
						// console.log(bleDevices.length);
						// console.log('trimit ce am primit');
						device.sending = true;
						// notificationMessagesReset();
						await sendToConsole(device, characteristic, packet.payload);
						// console.log('done');
						device.sending = false;
					}
				}
				// console.log (packet.payload.toString());
				cb ();
			});
		}
	});

	drivelist = loadRPK ();
	search();
	searchBluetooth();

	let device_rpk = {
		defaultIcon ()
		{
			return 'plugins/device.rpk/data/img/icons/rpk.png';
		},
		/**
		 * Register to recevie device updates, use when connected
		 * 
		 * @param {Device} device - the device
		 * @param {Function (device)} fn - function to be called
		 */
		registerForUpdate (device, fn)
		{
			deviceEvents.on ('update:'+device.id, fn);
			return () => deviceEvents.removeListener ('update:'+device.id, fn);
		},

		// listDevices ()
		// {
		// 	navigator.bluetooth.requestDevice({
		// 		acceptAllDevices:true
		// 	}).then ((dev) => {
		// 		console.log (dev);
		// 		bleDevices = [];
		// 		for (let device of dev)
		// 		{
		// 			bleDevices.push ({
		// 				id: 'rpk:'+device.id,
		// 				name: device.name || '(No Name)',
		// 				address: 'BLE',
		// 				connection: 'ble'
		// 			});
		// 		}
		// 		updateDevices ();
		// 	}).catch ((e) => { 
		// 		studio.workspace.showError ('DEVICE_RPK_ERROR_BLE', {error: e.message}); 
		// 		bleDevices = [];
		// 		updateDevices ();
		// 	});
		// },

		getConnections ()
		{
			let connections = [];
			for (let deviceId in connections)
			{
				connections.push (connections[deviceId].device);
			}
			return connections;
		},

		async connect (device/*, options*/)
		{
			console.log('check object');
			if (_.isObject (device))
			{
				console.log('check connection');
				if (!connections[device.id])
				{
					console.log('check type');
					connections[device.id] = {};
					if (device.connection === 'usb')
					{
						console.log('check path');
						let exists = false;
						exists = await fs.pathExists(device.address);
						if (exists)
						{
							process.nextTick(() => {
								device.status = 'CONNECTED';
								updateDevice (device);
							});
							return device;
						}
						else
						{
							delete connections[device.id];
							return null;
						}
					}
					else if (device.connection === 'ble')
					{
						
						process.nextTick(() => {
							device.status = 'CONNECTING';
							updateDevice (device);
							console.log(device.status);
							if (!savedCharacteristics[device.id])
							{
								let peripheral = peripherals[device.id];
								peripheral.once ('disconnect', () =>
								{
									// TODO verify if there are any connections?
									if (!bleAdapterScanner) noble.startScanning ();
									device.status = 'DISCONNECTED';
									updateDevice (device);
									if (pingVar) 
									{
										clearInterval(pingVar);
									}
									delete savedCharacteristics [device.id];
									delete connections [device.id];
								});
								if (!bleAdapterScanner) noble.stopScanning ();
								peripheral.connect(function(error) {
									if (!error)
									{
										console.log(device.status);
										device.status = 'SYNCHRONIZING';
										updateDevice (device);
										console.log(device.status);
										peripheral.discoverServices(['0ab5b690c2cec4abe7116ccbaa65c888'], function(error, services) {
											console.log('check services');
											console.log(services);
											for (let service of services) {
												console.log(service);
												service.discoverCharacteristics(['0ab5b691c2cec4abe7116ccbaa65c888'], function(error, characteristics) {
													console.log('characteristic');
													console.log(characteristics);
													for (let characteristic of characteristics) {
														console.log(characteristic);
														if (characteristic.properties.indexOf('write') > 0) {
															savedCharacteristics [device.id] = characteristic;
															device.status = 'CONNECTED';
															updateDevice (device);
															characteristic.notify(true, function(error) {
																if (error)
																{
																	device.status = 'DISCONNECTED';
																	updateDevice (device);
																	if (pingVar) 
																	{
																		clearInterval(pingVar);
																	}
																	delete savedCharacteristics [device.id];
																	delete connections [device.id];
																}
															});
															if (device.status === 'CONNECTED')
															{
																if (studio.console)
																{
																	studio.console.select(device.id);
																}
																
																characteristic.on('data', function(data, isNotification) {
																	console.log();
																	if (isNotification) {
																		console.log(data);
																		if (data[0] === 255 && data[1] === 255 && startReceiving === false && data[2] !== 0){
																			console.log('start of message');
																			brokenMessage = false;
																			startReceiving = true;
																		}
																		else if (data[0] === 255 && data[1] === 255 && (startReceiving === true || data[2] === 0))
																		{
																			notificationMessagesReset();
																			// startReceiving = false;
																			// CMD = undefined;
																			// msgSize = -1;
																			// msg = '';
																			// finalSize = 0;
																		}
																		else if (data[0] === 255 && data[1] === 255 && startReceiving === false && data[2] === 0)
																		{
																			brokenMessage = true;
																		}
																		if (startReceiving && !brokenMessage)
																		{
																			if (CMD === undefined)
																			{
																				CMD = data[2];
																			}
																			switch (CMD)
																			{
																				case 1:
																					// studio.console.write (device.id, 'Connection OK!\r\nDelay:  ' + (Date.now() - pingTimer) + ' ms\r\n\r\n');
																					if (data[4] === 255 && data[5] === 255 && startReceiving === true)
																					{
																						startReceiving = false;
																						CMD = undefined;
																					}
																					pingRes = true;
																					break;

																				case 2:
																					console.log('Source received!');
																					break;

																				case 3:
																					console.log('Stop received!');
																					break;

																				case 4:
																					if (msgSize === -1)
																					{
																						msgSize = data.readInt16LE(4);
																						console.log(msgSize);
																					}
																					else
																					{
																						msg += data.toString();
																						finalSize = msg.length;
																					}
																					if (finalSize >= msgSize)
																					{
																						msg = msg.substr(0,msgSize);
																						console.log(msg);
																						if (connections[device.id])
																						{
																							if (studio.console)
																							{
																								studio.console.write (device.id, msg + '\r\n');
																							}
																						}
																						publishPacket.topic = '/RPK/' + device.name + '/console/out';
																						// console.log('/RPK/' + device.name + '/console');
																						// console.log(publishPacket.topic);
																						publishPacket.payload = '' + msg;
																						if (studio.mqtt)
																						{
																							studio.mqtt.publish(publishPacket);
																						}
																					}
																					break;

																				case 5:
																					if (msgSize === -1)
																					{
																						msgSize = data.readInt16LE(4);
																						console.log(msgSize);
																					}
																					else
																					{
																						msg += data.toString();
																						finalSize = msg.length;
																					}
																					if (finalSize >= msgSize)
																					{
																						msg = msg.substr(0,msgSize);
																						console.log(msg);
																						// studio.console.reset ();
																						if (connections[device.id])
																						{
																							if (studio.console)
																							{
																								studio.console.write (device.id, msg + '\r\n');
																							}
																						}
																						publishPacket.topic = '/RPK/' + device.name + '/console/error';
																						publishPacket.payload = '' + msg;
																						if (studio.mqtt)
																						{
																							studio.mqtt.publish(publishPacket);																				
																						}
																					}
																					break;

																				default:
																					console.log('UNDEFINED COMMAND');
																			}
																		}					
																	}
																	console.log();
																});
																pingVar = setInterval( async () => {
																	if (!device.sending && !startReceiving)
																	{
																		if (pingRes)
																		{
																			await ping(characteristic);
																		}
																		else
																		{
																			console.log('Connection lost!');
																			pingRes = true;
																		}
																	}
																}, 5000);
															}
														}
													}
												});
											}
										});
									}
									else
									{
										delete connections[device.id];
										delete savedCharacteristics[device.id];
										if (error.message.indexOf ('0xc') >= 0 && bleAdapterScanner === true) 
										{
											studio.workspace.showNotification ('BLE Adapter does not allow two functions at a time, retrying to connect.');
											bleAdapterScanner = false;
											process.nextTick (() => {
												device_rpk.connect (device);
											});
										}
										else
										{
											studio.workspace.showError ('BLE error '+error.message);
											console.log(device.status);
											device.status = 'DISCONNECTED';
											if (pingVar) 
											{
												clearInterval(pingVar);
											}
											updateDevice (device);
										}
									}
								});
							}
							else
							{
								device.status = 'CONNECTED';
								updateDevice (device);
							}
						});
						return device;
					}
				}
				else
				{
					studio.workspace.showNotification ('RPK_DEVICE_ALREADY_CONNECTED', {device: device.name});
				}				
			}
			return null;
		},
		async disconnect (device, options)
		{
			if (_.isObject(device))
			{
				if (device.connection === 'usb')
				{
					delete connections[device.id];
					device.status = 'DISCONNECTED';
					updateDevice (device);
				}
				else
				if (device.connection === 'ble')
				{
					if (!options)
					{
						if (device.status === 'CONNECTED')
						{
							options = await studio.workspace.showDialog (RPKDisconnectDialog, {persistent: false, width:288});
						}
						else
						{
							options = {};
						}
					}

					if (options.disconnect === 'standby')
					{
						delete connections[device.id];
						device.status = 'DISCONNECTED';
						updateDevice (device);
					}
					else
					{
						if (options.disconnect === 'stop')
						{
							let characteristic = savedCharacteristics [device.id];
							await stop(characteristic);
						}
						let peripheral = peripherals[device.id];
						peripheral.disconnect();
					}
				}
				// device.status = 'DISCONNECTED';
				// updateDevice (device);
				// delete savedCharacteristics [device.id];
				// delete connections [device.id];
				return true;
			}

			else
			{
				studio.workspace.warn ('device_wyapp_disconnect: there is no device connecte');
			}
		}
	};

	/* Setup device type */
	workspace = studio.workspace.registerDeviceDriver ('rpk', device_rpk);
	if (workspace)
	{
		/* register buttons */
		workspace.registerDeviceToolButton ('DEVICE_FLASH_JAVASCRIPT', 10, async () => {
			console.log ('run');
			let device = studio.workspace.getDevice ();
			if (device)
			{
				try
				{
					device.flashing = true;
					updateDevice (device);
					console.log('start flashing');
					await fs.copyFile(path.join(__dirname, 'data/binaries/jerryscript.bin'), path.join(device.address, 'jerryscript.bin'));
					console.log('finished flashing');
				}
				catch (e)
				{
					studio.workspace.showError ('DEVICE_RPK_FLASH_ERROR', {error: e.message});
				}
				device.flashing = false;
				updateDevice (device);
			}
		}, 'plugins/device.rpk/data/img/icons/flash-jerryscript.png', 
		{
			visible () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.connection === 'usb');
			},
			enabled () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.connection === 'usb' && !device.flashing);
			},
			type: 'run'
		});
		workspace.registerDeviceToolButton ('DEVICE_RPK_RUN', 10, async () => {
			let device = studio.workspace.getDevice ();
			console.log ('run');

			let characteristic = savedCharacteristics [device.id];

			if (characteristic)
			{
				let project = await studio.projects.getCurrentProject ();
				if (project)
				{
					let filename;
					let jsSource;
					console.log(project.language);
					if (project.language === 'visual')
					{
						filename = await studio.projects.getDefaultRunFileName (project);
						jsSource = await studio.projects.loadFile (project, filename);
					}
					else if (project.language === 'javascript')
					{
						jsSource = await studio.projects.getCurrentFileCode();
						console.log(jsSource);
					}
					device.sending = true;
					// notificationMessagesReset();
					updateDevice (device);
					try
					{
						if (studio.console)
						{
							studio.console.show ();
							studio.console.reset ();
						}
						console.log('started sending');
						console.log(jsSource.toString());
						await stop(characteristic);
						await sleep(1000);
						await sendString(characteristic, jsSource);
						console.log('finished sending');
					}
					catch (e)
					{
						studio.workspace.showError ('DEVICE_RPK_SENDING_ERROR', {error: e.message});
					}
					device.sending = false;
					updateDevice (device);
				}
			}
		}, 'plugins/device.rpk/data/img/icons/run-icon.svg', 
		{
			visible () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.connection === 'ble');
			},
			enabled () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.connection === 'ble' && !device.sending);
			},
			type: 'run'
		});  
		workspace.registerDeviceToolButton ('DEVICE_RPK_STOP', 10, async () => {
			let device = studio.workspace.getDevice ();
			console.log ('stop');

			let characteristic = savedCharacteristics [device.id];
			
			if (characteristic)
			{	
				try
				{
					device.sending = true;
					// notificationMessagesReset();
					updateDevice (device);
					await stop(characteristic);
				}
				catch (e)
				{
					studio.workspace.showError ('DEVICE_RPK_SENDING_ERROR', {error: e.message});
				}
				device.sending = false;
				updateDevice (device);
			}
		}, 'plugins/device.wyapp/data/img/icons/stop-icon.svg', 
		{
			visible () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.connection === 'ble');
			},
			enabled () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.connection === 'ble' && !device.sending);
			},
			type: 'stop'
		});
	}
	else
	{
		studio.workspace.error ('Failed to register device driver rpk');
	}

	register (null,{
		deviceRpk: {}	
	});
}

async function sendToConsole(device, characteristic, data)
{
	device.sending = true;
	// notificationMessagesReset();
	let pkgs = [];
	let dataStr = data.toString();
	console.log(dataStr);
	dataStr = dataStr.replace('\r', '\r\n');
	for (let i = 0; i < dataStr.length; i += 18) {
		pkgs.push(dataStr.slice(i, i + 18));
	}

	for (let pkg of pkgs) {
		// publishPacket.topic = '/RPK/' + device.name + '/console/in';
		// publishPacket.payload = '' + pkg;
		// studio.mqtt.publish(publishPacket);	
		console.log('trimit din in');
		await sendConsole(characteristic, pkg);
	}
	console.log('gata');
	device.sending = false;
}

async function sendString(characteristic, jsSource) {
	console.log('Start writing...');
	
	let sending = false;

	setTimeout (() => {
		if (!sending)
		{
			studio.workspace.showError ('DEVICE_RPK_SEDING_RECONNECT_ERROR');
		}
	}, 3000);
    
	let jsSourceLen = jsSource.length;
	let payload = new Buffer.alloc(2);

	//SEND START PKG DELIMITER
	await writeOnBLE(characteristic);
	sending = true;

	//CMD BUFFER
	payload.writeInt8(2, 0);
	payload.writeInt8(0, 1);
	//SEND CMD
	await writeOnBLE(characteristic, payload);

	//SRC LENGTH BUFFER
	payload.writeUInt16BE(jsSourceLen);
	//SEND LENGTH
	await writeOnBLE(characteristic, payload);

	//SEND SRC
	let pkgs = [];

	for (let i = 0; i < jsSource.length; i += 18) {
		pkgs.push(jsSource.slice(i, i + 18));
	}

	for (let pkg of pkgs) {
		payload = Buffer.from(pkg);
		await writeOnBLE(characteristic, payload);
	}

	//SEND STOP PKG DELIMITER
	await writeOnBLE(characteristic);
}

async function stop(characteristic) {
	let payload = Buffer.alloc(2);

	let sending = false;

	setTimeout (() => {
		if (!sending)
		{
			studio.workspace.showError ('DEVICE_RPK_SEDING_RECONNECT_ERROR');
		}
	}, 3000);

	//SEND START PKG DELIMITER
	await writeOnBLE(characteristic);
	sending = true;

	//CMD BUFFER
	payload.writeInt8(3, 0);
	payload.writeInt8(0, 1);
	//SEND CMD
	await writeOnBLE(characteristic, payload);

	//SEND STOP PKG DELIMITER
	await writeOnBLE(characteristic);
}

async function sendConsole(characteristic, pkg) {

	let sending = false;

	setTimeout (() => {
		if (!sending)
		{
			studio.workspace.showError ('DEVICE_RPK_SEDING_RECONNECT_ERROR');
		}
	}, 3000);

	//SEND START PKG DELIMITER
	await writeOnBLE(characteristic);
	sending = true;

	//CMD BUFFER
	let payload = Buffer.alloc(20);

	payload.writeInt8(4, 0);
	payload.writeInt8(0, 1);

	for (let iter in pkg) {
		payload.writeInt8(pkg.charCodeAt(iter), parseInt(iter) + 2);
	}

	console.log(payload);
	//SEND CMD
	await writeOnBLE(characteristic, payload);

	//SEND STOP PKG DELIMITER
	await writeOnBLE(characteristic);
}

async function ping(characteristic) {
	let payload = Buffer.alloc(2);

	await writeOnBLE(characteristic);

	//CMD BUFFER
	payload.writeInt8(1, 0);
	payload.writeInt8(0, 1);
	//SEND CMD
	await writeOnBLE(characteristic, payload);

	await writeOnBLE(characteristic);
	pingTimer = Date.now();
	pingRes = false;
}

function writeOnBLE(characteristic, payload = DELIMITER) {
	return new Promise ((resolve, reject) => {
		try {
			characteristic.write(payload, false, (error) => {
				console.log(payload);
				if (!error) resolve ();
				else reject (error);
			});
		} catch (error) {
			console.log(error);
			reject (error);
		}
	});
}

function sleep(ms)
{
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}
