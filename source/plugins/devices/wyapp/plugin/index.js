// Search for network devices
import _ from 'lodash';
import path from 'path';


import WyApp from './WyApp';

import DeviceSettings from './views/DeviceSettings.vue';

import DisconnectDialog from './views/DisconnectDialog.vue';
import NetworkManager from './views/NetworkManager.vue';
import FileManager from './views/FileManager.vue';
import PackageManager from './views/PackageManager.vue';
import TaskManager from './views/TaskManager.vue';
import { EventEmitter } from 'events';
import Deployments from './views/Deployments.vue';
import { fstat } from 'fs';
import Docker_pop from './views/Docker-pop.vue';


let studio = null;
let workspace = null;

/**
 * Transports
 */
let transports = {};
let transportDevices = {};

/**
 * Searches
 */
let searches = {};
let searchDevices = {};

const fs = require('fs');

function updateDevices ()
{
	let devices = [];
	for (let transportDriverName in transportDevices)
	{
		devices.push (...transportDevices[transportDriverName]);
	}
	//console.log (searchDevices);
	for (let searchName in searchDevices)
	{
		devices.push (...searchDevices[searchName]);
	}
	workspace.updateDevices (devices);
}

/**
 * connections
 */
let connections = {};

/**
 * Send an update
 * @param {Device} device 
 */
function updateDevice (device)
{
	let boardDriver = boards[device.board];
	if (boardDriver && _.isFunction (boardDriver.update)) boardDriver.update (device);
	// deviceEvents.emit ('update:'+device.id, device);
	workspace.updateDevice (device);
}

/**
 * Send a tag and data to a device
 * @param {Device|string} device 
 * @param {string} tag 
 * @param {Object} packet 
 */
function sendToDevice (device, tag, packet)
{
	if (_.isString (device)) device = getConnectedDevice (device);
	if (device && device.status === 'CONNECTED')
	{
		let connection = connections[device.id];
		if (connection)
		{
			connection.send (tag, packet);
		}
	}
}

/**
 * Get the connected device with the id
 * @param {string} id 
 */
function getConnectedDevice (id)
{
	let device = null;
	let connection = connections[id];
	if (connection) device = connection.device;
	return device;
}

/**
 * Board Drivers
 */
let boards = {};

class Connection extends EventEmitter
{
	constructor (device, transport)
	{
		super ();
		this.device = device;
		this.transport = transport;
	}

	send (tag, data)
	{
		if (this.wyapp)
		{
			this.wyapp.send (tag, data);
		}
		else
		{
			studio.workspace.error ('Unable to send data to device '+this.device.id+', no link');
		}
	}

	disconnect (options)
	{
		if (!options) options = {};
		if (options.disconnect && options.disconnect !== 'disconnect')
		{
			// TODO return?
			this.send ('disc', {a: options.disconnect});
			setTimeout( () => {
				this.transport.disconnect ();
			}, 1000);
		}
		else
		{
			this.send ('d', {});
			return this.transport.disconnect ();
		}
	}
}

export function setup(options, imports, register)
{
	studio = imports;
	console.log('studio');
	console.log(studio);

	let deviceDriver = {
		defaultIcon()
		{
			return 'plugins/devices/wyapp/plugin/data/img/icons/network.png';
		},

		async connect (device, options)
		{
			if (_.isObject (device))
			{				
				if (!connections[device.id])
				{
					// temporary
					connections[device.id] = {};
					if (device.type === 'wyapp')
					{
						let transport = transports[device.transport];
						if (transport)
						{
							let v = options;
							if (!options)
							{
								v = await transport.setup (device);
							}
							if (v)
							{
								// eslint-disable-next-line require-atomic-updates
								device.address = v.address;
								// eslint-disable-next-line require-atomic-updates
								device.port = v.port;
								let Transport = transports[device.transport].Transport;
								// eslint-disable-next-line require-atomic-updates
								let transport = new Transport (device, v);
								
								// eslint-disable-next-line require-atomic-updates
								connections[device.id] = new Connection (device, transport);

								transport.on ('connecting', () => {
									device.status = 'CONNECTING';
									updateDevice (device);
								});

								transport.on ('synchronizing', () => {
									device.status = 'SYNCHRONIZING';
									updateDevice (device); 
									connections[device.id].wyapp = new WyApp (device, transport);
									let connection = connections[device.id];
									connection.wyapp.on ('update', (device) =>
									{
										updateDevice (device);
									});
									connection.wyapp.on ('connected', () =>
									{
										device.status = 'CONNECTED';
										updateDevice (device);

										/* Select shell */
										studio.shell.select (device.id);
										/* Select console */
										studio.console.select (device.id);
									});
									connection.wyapp.on ('packet', (packet) => {
										/* Shell */
										if (packet.t === 's')
										{
											if (packet.d.a === 'k')
											{
												studio.shell.write (device.id, packet.d.t);
											}
											else
											if (packet.d.a === 'e' && packet.d.e === 'noshell')
											{
												let size = studio.shell.getSize ();
												connection.send ('s', {
													a: 'o',
													c: size.cols || 80,
													r: size.rows || 24
												});
											}
										}
										else

										/* Project */
										if (packet.t === 'tp')
										{
											if (packet.d.a === 'k')
											{
												studio.console.write (device.id, packet.d.t);
											}
										}
										else

										/* Error */
										if (packet.t === 'e')
										{
											studio.workspace.showNotification ('DEVICE_WYAPP_ANOTHER_USER');
											connection.disconnect ();
										}
										/* Dashboard */
										else
										if (packet.t === 'v')
										{
											// TODO send array
											studio.dashboard.emitSignal (packet.d.s, packet.d.v, packet.d.t);
										}
										/* Notebook  */
										else
										if(packet.t === 'note')
										{
											if(packet.d.a === 'r')
											{
												if(packet.d.t === 's')
												{
													if (packet.d.s === 'o' )
														studio.notebook.printCode(packet.d.l, packet.d.d);
												}
												else if(packet.d.t === 'e')
													studio.notebook.printError(packet.d.l, packet.d.d.buf);
												else if (packet.d.t === 'r')
												{
													studio.notebook.printResult(packet.d.l, packet.d.d.buf);
												}
												else if (packet.d.t === 'd')
												{
													studio.notebook.setStatus (packet.d.l, 'READY');
												}
											}
											else
											if (packet.d.a === 'status')
											{
												if (packet.d.r === 'r')
												{
													if (packet.d.l)
													{
														studio.notebook.setStatus (packet.d.l, 'RUNNING');
													}
													else
													{
														studio.notebook.setStatus (null, 'READY');
													}
												}
												else
												if (packet.d.r === 's')
												{
													studio.notebook.setStatus (null, 'STOPPED');
												}
											}
										}
										connection.emit ('packet', packet);
										connection.emit ('tag:'+packet.t, packet.d);
									});
								});

								// transport.on ('connected', () => {
								// 	device.status = 'CONNECTED';
								// 	updateDevice (device);
								// });

								transport.on ('error', () => {
									device.status = 'ERROR';
									updateDevice (device);
								});

								transport.on ('disconnected', () => {
									transport.removeAllListeners ();
									delete connections[device.id];
									device.status = 'DISCONNECTED';
									updateDevice (device);
								});

								return device;
							}
						}
						else
						{
							studio.workspace.error ('Unable to connect to '+device.name+', transport '+device.transport+' is not registered');
						}
					}
					else
					{
						studio.workspace.error ('DEVICE_WYAPP_WRONG_TYPE', device.type);
					}
					delete connections[device.id];
				}
				else
				{
					studio.workspace.showNotification ('Device '+device.name+' is already connected');
				}
			}
			return null;
		},

		settings (device)
		{
			studio.workspace.showDialog (DeviceSettings, {
				device
			});
		},
		async disconnect (device, options)
		{
			if (_.isObject(device))
			{
				if (!options)
				{
					// TODO close if there is a disconnect while the user is choosing
					if (device.status === 'CONNECTED')
					{
						options = await studio.workspace.showDialog (DisconnectDialog, {persistent: false, width:300});
					}
					else
					{
						options = {};
					}
				}
				if (options)
				{
					let connection = connections [device.id];
					if (connection)
					{
						connection.disconnect (options);
						// TODO wait for a timeout, then disconnect
					}
				}
			}
			else
			{
				studio.workspace.warn ('device_wyapp_disconnect: there is no device connected');
			}
			// if (ssh)
			// {
			// 	ssh.end ();
			// }
			// else
			// {
			// 	studio.workspace.warn ('network_device_disconnect: there is no ssh connection');
			// }
			// connectedDevice = null;
			// ssh = null;
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

	};

	workspace = studio.workspace.registerDeviceDriver('wyapp', deviceDriver);
	if (workspace)
	{
		/* Register the Run button */
		workspace.registerDeviceToolButton ('DEVICE_WYAPP_RUN', 10, () => {

			device_wyapp.runProject();

		}, 'plugins/devices/wyapp/plugin/data/img/icons/run-icon.svg', 
		{
			visible () {
				let device = studio.workspace.getDevice ();
				// console.log ('visible run');
				// console.log (device);
				return (device.status === 'CONNECTED' && device.properties.treeRun === false);
			},
			type: 'run'
		});

		/* Register the Stop button */
		workspace.registerDeviceToolButton ('DEVICE_WYAPP_STOP', 10, () => {
			// console.log ('stop');
			device_wyapp.stopProject();

		}, 'plugins/devices/wyapp/plugin/data/img/icons/stop-icon.svg', {
			visible () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.properties.treeRun === true);
			},
			type: 'stop'
		});

		/* Register the File Manager button */
		workspace.registerDeviceToolButton ('DEVICE_WYAPP_FILE_MANAGER', 20, () => {
			let device = studio.workspace.getDevice ();
			studio.workspace.showDialog(FileManager, {
				width:800,
				connection: connections[device.id]
			});
		}, 'plugins/devices/wyapp/plugin/data/img/icons/fileexplorer-icon.svg', {
			visible () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.properties.fileManager === true);
			}
		});
		
		/* Register the Task Manager button */
		workspace.registerDeviceToolButton ('DEVICE_WYAPP_TASK_MANAGER', 30, () => {
			let device = studio.workspace.getDevice ();
			studio.workspace.showDialog(TaskManager, {
				width:550,
				connection: connections[device.id]
			});
		}, 'plugins/devices/wyapp/plugin/data/img/icons/task-manager-icon.svg', {
			visible () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.properties.taskManager === true);
			}
		});


		/* Register the Package Manager button */
		workspace.registerDeviceToolButton ('DEVICE_WYAPP_PACKAGE_MANAGER', 40, () => {
			let device = studio.workspace.getDevice ();
			studio.workspace.showDialog(PackageManager, {
				width:550,
				connection: connections[device.id]
			});
		}, 'plugins/devices/wyapp/plugin/data/img/icons/library-icon.svg', {
			visible () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.properties.packageManager === true);
			}
		});
		

		/* Register the Network Manager button */
		workspace.registerDeviceToolButton ('DEVICE_WYAPP_NETWORK_MANAGER', 50, () => {
			let device = studio.workspace.getDevice ();
			studio.workspace.showDialog(NetworkManager, {
				width:550,
				connection: connections[device.id]
			});
		}, 'plugins/devices/wyapp/plugin/data/img/icons/network-manager-icon.svg', {
			visible () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.properties.networkManager === true);
			}
		});

		/* Register the Deployments button */
		workspace.registerDeviceToolButton ('Deployments', 60, () => {
			let device = studio.workspace.getDevice ();
			studio.workspace.showDialog(Deployments, {
				width:550,
				connection: connections[device.id]
			});
		}, 'plugins/devices/wyapp/plugin/data/img/icons/deploy.png', {
			visible () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.properties.deployments === true);
			}
		});

		/* Register the Deploy button */
		workspace.registerDeviceToolButton ('DEVICE_WYAPP_DEPLOY', 70, () => {
			// console.log ('stop');
			let deploy = true;
			device_wyapp.runProject(deploy);

		}, 'plugins/devices/wyapp/plugin/data/img/icons/just_deploy.png', {
			visible () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.properties.treeRun === false);
			},
			type: 'deploy'
		});
	}
	else
	{
		studio.workspace.error ('Failed tp register device driver wyapp');
	}

	let device_wyapp = {
		/**
		 * Register a new transport method
		 * @param {String} name - the name of the transport driver
		 * @param {WyAppTransport} driver - the transport driver
		 */
		registerTransport (name, driver)
		{
			if (!transports[name])
			{
				transports[name] = driver;
				return {
					updateDevices (devices)
					{
						if (_.isArray (devices))
						{
							devices.map (device => {
								device.transport = name;
								let boardDriver = device_wyapp.getBoardDriver (device.board);
								if (boardDriver && _.isFunction (boardDriver.found)) boardDriver.found (device);
							});
							transportDevices [name] = devices;
							updateDevices ();
						}
						else
						{
							workspace.warn ('Transport Driver '+name+' did not provide an array of devices, it provied '+devices);
						}
					}
				};
			}
			else
			{
				studio.workspace.error ('Transport '+name+' has already been registered');
			}
			return null;
		},
		
		/**
		 * Register a new search provider
		 * @param {String} name - the name of the search provider
		 */
		registerSearch (name)
		{
			if (!searches[name])
			{
				searches[name] = name;
				return {
					updateDevices (devices)
					{
						if (_.isArray (devices))
						{
							devices.map (device => {
								let boardDriver = device_wyapp.getBoardDriver (device.board);
								if (boardDriver && _.isFunction (boardDriver.found)) boardDriver.found (device);
							});
							searchDevices [name] = devices;
							updateDevices ();
						}
						else
						{
							workspace.warn ('Transport Driver '+name+' did not provide an array of devices, it provied '+devices);
						}
					}
				};
			}
			else
			{
				studio.workspace.error ('Transport '+name+' has already been registered');
			}
			return null;
		},

		_sendToDevice: sendToDevice,

		/**
		 * Register a new board driver
		 * 
		 * @param {String} name 
		 * @param {WyAppBoard} board 
		 */
		registerBoard (name, board)
		{
			if (!boards[name])
			{
				boards[name] = board;
			}
			else
			{
				studio.workspace.warn ('device.wyapp: board with name '+name+' is already registered');
			}
		},

		/**
		 * Return the board driver
		 */
		getBoardDriver (name)
		{
			return boards[name];
		},

		/**
		 * Stop the current project
		 */
		stopProject()
		{
			let device = studio.workspace.getDevice ();
			if (device)
			{
				// studio.console.show ();
				// studio.console.reset ();
				sendToDevice (device, 'tp', {
					a: 'stop'
				});
			}
		},

		
		/**
		 * Run the current project
		 */
		
		async runProject (deploy = false)
		{
			let project = await studio.projects.getCurrentProject ();
			
			if (project)
			{
				let filename = await studio.projects.getDefaultRunFileName(project);
				let makefile = await studio.projects.loadFile (project, '/makefile');
				if (!makefile) makefile = await studio.projects.getMakefile (project, filename);

				let path_to_docker = project.folder + '/Dockerfile';
				let Dockerfile = null;
				let dockerfile_exists = false;
	
				let device = studio.workspace.getDevice ();

				if (device)
				{
					// allow the board to modify the project structure before run
					let board = this.getBoardDriver (device.board);	
					if (board && board.run) board.run (project);
					studio.console.show ();
					studio.console.reset ();

					let structure = await studio.projects.generateStructure (project);

					if(deploy === true)
					{
						
						if(fs.existsSync(path_to_docker))
						{
							Dockerfile = await studio.projects.loadFile(project,'/Dockerfile');
							console.log('There is a Dockerfile');
							dockerfile_exists = true;
						}
						else
						{
							dockerfile_exists = false;
							console.log('No Dockerfile buuut');
							studio.workspace.showDialog(Docker_pop, {
								width:800,
							});
							//Dockerfile = ("FROM node:latest\nCOPY . .\nRUN node main.js");

						}
					}

					let tp = {
						name: project.name,
						isroot: true,
						isdir: true,
						children: [
							{
								name: project.name,
								isdir: true,
								issoftware: true,
								children: [],
								m: makefile
							}
						],
						dockerFolder: path_to_docker

					};


					let setFiles = async (projectChildren, tpChildren, filenamePath) =>
					{
						for (let file of projectChildren)
						{
							if (file.children)
							{
								let folder = {
									name: file.name,
									isdir: true,
									children: []
								};
								tpChildren.push (folder);
								await setFiles (file.children, folder.children, path.join (filenamePath, file.name));
							}
							else
							{
								tpChildren.push ({
									name: file.name,
									isdir: false,
									content: await studio.projects.loadFile (project, path.join (filenamePath, file.name))
								});
							}
						}
					};

					await setFiles (structure.children, tp.children[0].children, '/');

					let xtrem = studio.console.getSize ();

					if(deploy === true)
					{
						sendToDevice (device, 'tp', {

							a: 'deploy',
							t: tp,
							l: project.language,
							onlysoft: true,
							c: xtrem.cols,
							r: xtrem.rows,
							dep:deploy,
							dcfl: dockerfile_exists,
							Dockerfile: Dockerfile
						});

					}
					else
					{
						sendToDevice (device, 'tp', {

							a: 'start',
							t: tp,
							l: project.language,
							onlysoft: true,
							c: xtrem.cols,
							r: xtrem.rows,
							dep:deploy,
							dcfl: dockerfile_exists,
							Dockerfile: Dockerfile
						});
					}
				
				}
			}
			else
			{
				studio.workspace.showNotification ('DEVICE_WYAPP_ERROR_PROJECT_RUN');
			}
		}
	};

	studio.shell.register ((event, id, ...data) =>
	{
		let device = getConnectedDevice (id);
		if (device)
		{
			if (event === 'data')
			{	
				sendToDevice (device, 's', {
					a:'k',
					t: data[0]
				});
			}
			else
			if (event === 'resize')
			{
				sendToDevice (device, 's', {
					a:'r',
					c: data[0],
					r: data[1]
				});
			}
		}
	});

	studio.console.register ((event, id, ...data) =>
	{
		let device = getConnectedDevice (id);
		if (device)
		{
			if (event === 'data')
			{	
				sendToDevice (device, 'tp', {
					a:'k',
					t: data[0]
				});
			}
			else
			if (event === 'resize')
			{
				sendToDevice (device, 'tp', {
					a:'r',
					c: data[0],
					r: data[1]
				});
			}
		}
	});

	studio.notebook.register ((event, ...data) => 
	{
		let device = studio.workspace.getDevice ();
		if (device.type === 'wyapp' && device.status === 'CONNECTED')
		{
			if (event === 'run')
			{
				let id = data[0];
				let text = data[1];
				sendToDevice (device, 'note', {
					a:'r',
					l: id,
					s: text
				});
			}
			else if(event === 'stop')
			{
				if(data[0])
					sendToDevice(device, 'note', {
						a: 's'
					});
				else
					sendToDevice(device, 'note', {
						a: 'stop'
					});
			}
			else if (event === 'reset')
			{
				sendToDevice(device, 'note', {
					a: 'reset'
				});
			}
		}
	});

	register(null, {
		device_wyapp
	});

}
