(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(294);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _WyApp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(338);
/* harmony import */ var _views_DeviceSettings_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(366);
/* harmony import */ var _views_DisconnectDialog_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(374);
/* harmony import */ var _views_NetworkManager_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(382);
/* harmony import */ var _views_FileManager_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(397);
/* harmony import */ var _views_PackageManager_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(408);
/* harmony import */ var _views_TaskManager_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(418);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _views_Deployments_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(423);
/* harmony import */ var _views_DockerSettings_vue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(432);
// Search for network devices

















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
	if (boardDriver && lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isFunction (boardDriver.update)) boardDriver.update (device);
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
	if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isString (device)) device = getConnectedDevice (device);
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

class Connection extends events__WEBPACK_IMPORTED_MODULE_9__["EventEmitter"]
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

function setup(options, imports, register)
{
	studio = imports;

	let deviceDriver = {
		defaultIcon()
		{
			return 'plugins/devices/wyapp/plugin/data/img/icons/network.png';
		},

		getBoardIcon (name) {
			let board = boards[name];
			if (board) return board.iconURL ();
			else return null;
		},

		async connect (device, options)
		{
			if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isObject (device))
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
									connections[device.id].wyapp = new _WyApp__WEBPACK_IMPORTED_MODULE_2__["default"] (device, transport);
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
			studio.workspace.showDialog (_views_DeviceSettings_vue__WEBPACK_IMPORTED_MODULE_3__["default"], {
				device
			});
		},
		async disconnect (device, options)
		{
			if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isObject(device))
			{
				if (!options)
				{
					// TODO close if there is a disconnect while the user is choosing
					if (device.status === 'CONNECTED')
					{
						options = await studio.workspace.showDialog (_views_DisconnectDialog_vue__WEBPACK_IMPORTED_MODULE_4__["default"], {persistent: false, width:300});
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
			studio.workspace.showDialog(_views_FileManager_vue__WEBPACK_IMPORTED_MODULE_6__["default"], {
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
			studio.workspace.showDialog(_views_TaskManager_vue__WEBPACK_IMPORTED_MODULE_8__["default"], {
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
			studio.workspace.showDialog(_views_PackageManager_vue__WEBPACK_IMPORTED_MODULE_7__["default"], {
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
			studio.workspace.showDialog(_views_NetworkManager_vue__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
			studio.workspace.showDialog(_views_Deployments_vue__WEBPACK_IMPORTED_MODULE_10__["default"], {
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
			let deploy = true;
			device_wyapp.runProject(deploy);

		}, 'plugins/devices/wyapp/plugin/data/img/icons/just_deploy.png', {
			visible () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.properties.deployments === true);
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
						if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isArray (devices))
						{
							devices.map (device => {
								device.transport = name;
								let boardDriver = device_wyapp.getBoardDriver (device.board);
								if (boardDriver && lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isFunction (boardDriver.found)) boardDriver.found (device);
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
						if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isArray (devices))
						{
							devices.map (device => {
								let boardDriver = device_wyapp.getBoardDriver (device.board);
								if (boardDriver && lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isFunction (boardDriver.found)) boardDriver.found (device);
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
		 * List boards
		 */
		listBoards ()
		{
			let boardsList = [];
			for (let board in boards) {
				boardsList.push ({...boards[board], board});
			}
			boardsList.sort ((board1, board2) => board1.priority - board2.priority);
			return boardsList;
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

				let name = null;
				let tag = null;

				if(deploy === true)
				{
					name = project.name.replace(/\\/g, '\\\\')
						.replace(/\$/g, '\\$')
						.replace(/'/g, '\\\'')
						.replace(/"/g, '\\"');

					tag =  project.name.replace(/[^0-9A-Za-z_]/g,'_');
					makefile += '\ndeploy:\n\t docker build --tag ' + tag +  ' . && docker run --label studio="' +name + '" ';
				}

	
				let device = studio.workspace.getDevice ();
				let dockerfile = null;

				if (device)
				{	
					let retVal = false;
					// allow the board to modify the project structure before run
					let board = this.getBoardDriver (device.board);	
					if (board && board.run) retVal = await board.run (project);
					if (retVal !== false) {
						studio.console.show ();
						studio.console.reset ();

						// deploy
						if(board && board.deploy)
						{
							dockerfile = await studio.projects.loadFile(project, '/Dockerfile');

							if(deploy === true)
							{
								if(dockerfile === undefined)
								{
									let question = await studio.workspace.showConfirmationPrompt('Dockerfile',
										'Dockerfile non-existent. Would you like a predefined one?');

									if(question === 'yes') {
										await board.deploy(project);
									}
									else return null;
								}
								
								let options = await studio.workspace.showDialog(_views_DockerSettings_vue__WEBPACK_IMPORTED_MODULE_11__["default"], {
									width:600,
									project:project,
								});

								let dockoptions = ' ';

								if(options === false){
									return null;
								}

								dockoptions += '--network ' +options.selectedNetwork + ' ';
								dockoptions += '--restart ' + options.selectedRestart + ' ';
								
								if(options.selectedOption === 'interactive')
								{
									dockoptions += '-it ';
								}
								
								if(options.selectedOption === 'detached')
								{
									dockoptions += '-d ';
								}

								if(options.privileged === true)
								{
									dockoptions += '--privileged ';
								}

								if(options.remove === true)
								{
									dockoptions += '--rm ';
								}
								
								if(options.textInput)
								{
									dockoptions += ' '+ options.textInput; 
								}

								makefile += dockoptions + ' ' + tag;

								await studio.projects.saveSpecialFile(project,'docker.json',JSON.stringify(options,null,4));	
							}
							
							
						} 
						let structure = await studio.projects.generateStructure (project);

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
									m: makefile,
									
								}
							],
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
									await setFiles (file.children, folder.children, path__WEBPACK_IMPORTED_MODULE_1___default.a.join (filenamePath, file.name));
								}
								else
								{
									tpChildren.push ({
										name: file.name,
										isdir: false,
										content: await studio.projects.loadFile (project, path__WEBPACK_IMPORTED_MODULE_1___default.a.join (filenamePath, file.name))
									});
								}
							}
						};

						await setFiles (structure.children, tp.children[0].children, '/');
						
						let xtrem = studio.console.getSize ();
						
						sendToDevice (device, 'tp', {

							a: 'start',
							t: tp,
							l: project.language,
							onlysoft: true,
							c: xtrem.cols,
							r: xtrem.rows,	
							deploy:deploy,
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


/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer, process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WyApp; });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var msgpack5__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(339);
/* harmony import */ var msgpack5__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(msgpack5__WEBPACK_IMPORTED_MODULE_1__);



const msgpack = msgpack5__WEBPACK_IMPORTED_MODULE_1___default() ();

const PACKET_SEPARATOR = 255;
const BUFFER_SEPARRATOR = Buffer.from ([PACKET_SEPARATOR, PACKET_SEPARATOR]);
const PACKET_ESCAPE = 0;
const BUFFER_SIZE = 8192;

class WyApp extends events__WEBPACK_IMPORTED_MODULE_0___default.a
{
	/**
	 * run a new wyapp cprotocol
	 * @param {Device} device - the device
	 * @param {Stream} stream - the connection link
	 * @param {boolean} synchronize - synchronize protocol first (use for serial line)
	 */
	constructor (device, stream, synchronize = false)
	{
		super ();
		// make sure the caller gets the status
		this.device = device;
		this.stream = stream;
		this.receivedFirstPacketSeparator = !synchronize;
		this.receivedData = Buffer.alloc (BUFFER_SIZE);
		this.receivedDataPosition = 0;
		this.buffers = [];
		this.isSending = false;

		this.stream.on ('data', (data) => this._received(data));

		// if an error occured for transport, remove all listeners
		this.stream.on ('error', () => this.removeAllListeners());

		if (synchronize)
		{
			// this._setStatus ('SYNCHRONIZING', true);
		}
		else
		{
			this._setStatus ('connected', true);
		}

		this.send ('ping', {});
		this.send ('login', {username: this.device.username, password: this.device.password});
		this.send ('i', {});

		this.on ('packet', this.information);
	}

	information (packet)
	{
		if (packet.t === 'i')
		{
			this.device.name = packet.d.n;
			this.device.properties.category = packet.d.c;
			this.device.board = this.device.properties.category;
			this.device.description = packet.d.p;
			this.device.properties.platform = packet.d.p;
			this.device.properties.internet = packet.d.i;
			this.device.properties.home = packet.d.h;
			this.device.properties.run = packet.d.r;
			this.device.properties.treeRun = packet.d.tr;
			this.emit ('update', this.device);
		}
		else
		if (packet.t === 'capabilities')
		{
			this.device.properties.languages = packet.d.l;
			this.device.properties.packageManager = packet.d.pm;
			this.device.properties.taskManager = packet.d.tm;
			this.device.properties.networkManager = packet.d.net;
			this.device.properties.fileManager = packet.d.fe;
			this.device.properties.deployments = packet.d.dep;
			this.emit ('update', this.device);
		}
		else
		if (packet.t === 'sv')
		{
			this.device.properties.version = packet.d.v;
			this.device.properties.os = packet.d.os;
			this.device.properties.libwyliodrin = packet.d.libv;
			this.device.properties.wyliolab = packet.d.wyliolab;
			this.emit ('update', this.device);
		}
		else
		if (packet.t === 'e')
		{
			this.emit ('issue', packet.d.s);
		}
	}

	disconnect ()
	{
		this.stream.removeListener ('data', this._received);
		this.stream = null;
		this.removeAllListeners ();
	}

	_setStatus (status, nextTick = false)
	{
		this.status = status;
		if (nextTick)
		{
			process.nextTick (() => 
			{
				this.emit (status);
			});
		}
		else
		{
			this.emit (status);
		}
	}

	on (event, fn)
	{
		super.on (event, fn);
		return () => {
			super.removeListener (event, fn);
		};
	}

	_escape (buffer)
	{
		var l = 0;
		for (let i=0; i<buffer.length; i++)
		{
			if (buffer[i]===PACKET_SEPARATOR) l = l+2;
			else l = l+1;
		}
		if (l===buffer.length) return buffer;
		else
		{
			var data = Buffer.alloc (l);
			var li=0;
			for (let i=0; i<buffer.length; i++)
			{
				if (buffer[i] === PACKET_SEPARATOR)
				{
					data[li]=buffer[i];
					li++;
					data[li]=PACKET_ESCAPE;
					li++;
				}
				else
				{
					data[li] = buffer[i];
					li++;
				}
			}
			return data;
		}
	}

	_sendBuffer (data)
	{
		if (this.stream !== null)
		{
			data = this._escape (data);
			this.buffers.push (data);
			this.buffers.push (BUFFER_SEPARRATOR);
			// console.console.log (this.buffers);
			this._send ();
			
			// console.log ('Seding '+data.length+' bytes');
			// var that = this;
		}
		else
		{
			// console.log ('Disconnected');
		}
	}

	_packet ()
	{
		// console.log ('Packet of size '+this.receivedDataPosition+' received');
		var data = this.receivedData.slice (0, this.receivedDataPosition);
		this.receivedDataPosition = 0;
		return data;
	}

	_send ()
	{
		if (this.stream)
		{
			if (!this.isSending && this.buffers.length > 0)
			{
				this.isSending = true;
				var arraydata = this.buffers[0];
				this.buffers.splice (0, 1);
				// console.console.log (arraydata);
				try
				{
					this.stream.write (arraydata, (/*err*/) =>
					{
						this.isSending = false;
						this._send ();
					});
				}
				catch (e)
				{
					// TODO show notification
					// console.log ('Send data '+e.message);
					this.isSending = false;
				}
			}
			else
			{
				// console.log ('Already sending data');
			}
		}
		else
		{
			// console.log ('Disconnected');
		}
	}

	send (tag, data)
	{
		var buffer = msgpack.encode ({t:tag, d:data});
		this._sendBuffer (buffer);
	}

	_addToBuffer (data)
	{
		// TODO put maximum limit
		// debug ('Adding '+data+' to receivedData for port '+this.address);
		if (this.receivedDataPosition >= this.receivedData.length)
		{
			// TODO verify a maximum size
			// console.log ('Data size exceeded, enlarging data with '+this.receivedData.length);
			var receivedData = this.receivedData;
			this.receivedData = new Buffer (receivedData.length*2);
			for (var pos=0; pos < receivedData.length; pos++)
			{
				this.receivedData[pos] = receivedData[pos];
			}
			this.receivedDataPosition = pos;
		}
		this.receivedData[this.receivedDataPosition] = data;
		this.receivedDataPosition=this.receivedDataPosition+1;
	}

	_received (data)
	{
		// console.log ('Received '+data.byteLength+' bytes');
		var datauint = new Uint8Array (data);
		// TODO more efficient to string
		for (var pos=0; pos<datauint.length; pos++)
		{
			// console.console.log (datauint[pos]);
			if (this.receivedFirstPacketSeparator)
			{
				if (datauint[pos] === PACKET_SEPARATOR)
				{
					if (this.previousByte === PACKET_SEPARATOR)
					{
						let rawPacket = this._packet ();
						if (rawPacket.length > 0)
						{
							try
							{
								let packet = msgpack.decode (rawPacket);
								try
								{
									this.emit ('packet', packet);
								}
								catch (e)
								{
									/* eslint-disable-next-line no-console */
									console.warn (e.message);
								}
							}
							catch (e)
							{
								this.emit ('packet-error', e.message);
								// console.error (e.message);
								// console.log ('Packet error '+e.message);
							}
						}
						this.previousByte = 0;
					}
					else
					{
						this.previousByte = datauint[pos];
					}
				}
				else
				if (datauint[pos] === PACKET_ESCAPE)
				{
					if (this.previousByte === PACKET_SEPARATOR)
					{
						this._addToBuffer (this.previousByte);
						this.previousByte = 0;
					}
					else
					{
						this._addToBuffer (datauint[pos]);
						this.previousByte = datauint[pos];
					}
				}
				else
				{
					if (this.previousByte === PACKET_SEPARATOR)
					{
						// console.log ('Random bytes');
					}
					this._addToBuffer(datauint[pos]);
					this.previousByte = datauint[pos];
				}
			}
			else
			{
				if (datauint[pos] === PACKET_SEPARATOR && this.previousByte === PACKET_SEPARATOR) 
				{
					// console.log ('Received first packet separataor');
					this.receivedFirstPacketSeparator = true;
					this._setStatus ('connected', true);
					this.previousByte = 0;
				}
				else
				{
					// console.log ('Random bytes');
					this.previousByte = datauint[pos];
				}
			}
		}
	}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(214).Buffer, __webpack_require__(2)))

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DeviceSettings_vue_vue_type_template_id_11312d7f_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367);
/* harmony import */ var _DeviceSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(369);
/* empty/unused harmony star reexport *//* harmony import */ var _DeviceSettings_vue_vue_type_style_index_0_id_11312d7f_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(371);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _DeviceSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DeviceSettings_vue_vue_type_template_id_11312d7f_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DeviceSettings_vue_vue_type_template_id_11312d7f_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "11312d7f",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/devices/wyapp/plugin/views/DeviceSettings.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DeviceSettings_vue_vue_type_template_id_11312d7f_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(368);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DeviceSettings_vue_vue_type_template_id_11312d7f_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DeviceSettings_vue_vue_type_template_id_11312d7f_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    { staticClass: "devicesett-box" },
    [
      _c(
        "v-card-title",
        [
          _c("span", { staticClass: "headline" }, [
            _vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_SETTINGS")))
          ]),
          _vm._v(" "),
          _c("v-spacer")
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-card-text",
        [
          _c(
            "v-text-field",
            {
              attrs: { label: _vm.$t("DEVICE_WYAPP_NAME"), required: "" },
              model: {
                value: _vm.name,
                callback: function($$v) {
                  _vm.name = $$v
                },
                expression: "name"
              }
            },
            [_vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_NAME")))]
          ),
          _vm._v(" "),
          _c("div", { staticStyle: { padding: "0 0 10px 0" } }, [
            _c("strong", [
              _vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_VERSION")) + ":")
            ]),
            _vm._v(" " + _vm._s(_vm.device.properties.version))
          ]),
          _vm._v(" "),
          _c("div", { staticStyle: { padding: "0 0 10px 0" } }, [
            _c("strong", [_vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_OS")) + ":")]),
            _vm._v(
              " " + _vm._s(_vm.device.properties.os || _vm.device.properties.os)
            )
          ]),
          _vm._v(" "),
          _c("div", { staticStyle: { padding: "0 0 10px 0" } }, [
            _c("strong", [
              _vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_LIBWYLIODRIN")) + ":")
            ]),
            _vm._v(" " + _vm._s(_vm.device.properties.libwyliodrin))
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "langtype", staticStyle: { padding: "0 0 10px 0" } },
            [
              _c("strong", [
                _vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_LANGUAGES")) + ":")
              ]),
              _vm._v(" "),
              _vm._l(_vm.device.properties.languages, function(
                languageAvailable,
                language
              ) {
                return _c("span", { key: language }, [_vm._v(_vm._s(language))])
              })
            ],
            2
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-card-actions",
        [
          _c("v-spacer"),
          _vm._v(" "),
          _c("v-btn", { attrs: { text: "" }, on: { click: _vm.rename } }, [
            _vm._v(_vm._s(_vm.$t("OK")))
          ]),
          _vm._v(" "),
          _c("v-btn", { attrs: { text: "" }, on: { click: _vm.close } }, [
            _vm._v(_vm._s(_vm.$t("CLOSE")))
          ])
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_DeviceSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(370);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_DeviceSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'DeviceSettings',
	props: ['device'],
	data () {
		return {
			name: this.device.name
		};
	},
	methods: {
		close ()
		{
			this.$root.$emit ('submit');
		},
		rename ()
		{
			this.studio.device_wyapp._sendToDevice (this.device, 'n', {n: this.name});
			this.$root.$emit ('submit', this.name);
		},
	}
});


/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DeviceSettings_vue_vue_type_style_index_0_id_11312d7f_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(372);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DeviceSettings_vue_vue_type_style_index_0_id_11312d7f_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DeviceSettings_vue_vue_type_style_index_0_id_11312d7f_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DeviceSettings_vue_vue_type_style_index_0_id_11312d7f_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DeviceSettings_vue_vue_type_style_index_0_id_11312d7f_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DeviceSettings_vue_vue_type_style_index_0_id_11312d7f_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 372:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(373);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("5a431190", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 373:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".w-100[data-v-11312d7f] {\n  width: 100%;\n}\n.w-90[data-v-11312d7f] {\n  width: 90%;\n}\n.w-80[data-v-11312d7f] {\n  width: 80%;\n}\n.w-70[data-v-11312d7f] {\n  width: 70%;\n}\n.w-60[data-v-11312d7f] {\n  width: 60%;\n}\n.w-50[data-v-11312d7f] {\n  width: 50%;\n}\n.w-40[data-v-11312d7f] {\n  width: 40%;\n}\n.w-30[data-v-11312d7f] {\n  width: 30%;\n}\n.w-20[data-v-11312d7f] {\n  width: 20%;\n}\n.w-10[data-v-11312d7f] {\n  width: 10%;\n}\n.hs-0[data-v-11312d7f] {\n  height: 0% !important;\n}\n.hs-35[data-v-11312d7f] {\n  height: 35% !important;\n}\n.hs-65[data-v-11312d7f] {\n  height: 65% !important;\n}\n.hs-100[data-v-11312d7f] {\n  height: calc(100vh - 158px) !important;\n}\n.rel[data-v-11312d7f] {\n  position: relative;\n}\n.text-center[data-v-11312d7f] {\n  text-align: center;\n}\n.text-left[data-v-11312d7f] {\n  text-align: left;\n}\n.text-right[data-v-11312d7f] {\n  text-align: right;\n}\n.h-top[data-v-11312d7f] {\n  height: calc(100vh - 90px);\n}\n.h-top2[data-v-11312d7f] {\n  height: calc(100vh - 158px);\n}\n.left[data-v-11312d7f] {\n  float: left !important;\n}\n.right[data-v-11312d7f] {\n  float: right !important;\n}\n.p-20[data-v-11312d7f] {\n  padding: 20px;\n}\n.disconnect[data-v-11312d7f] {\n  background: #191e25 !important;\n  padding: 10% 0;\n  text-align: center;\n}\n.disconnect .icon-btn[data-v-11312d7f] {\n  background: transparent !important;\n  text-transform: none;\n  color: #ffffff !important;\n  min-width: 80px;\n  min-height: 80px;\n  padding: 0;\n  margin: 0;\n  box-shadow: none !important;\n}\n.disconnect .icon-btn .s24[data-v-11312d7f] {\n  color: #ffffff !important;\n  width: 40px;\n  height: 40px;\n}\n.disconnect .icon-btn[data-v-11312d7f]:hover {\n  background: #e54225 !important;\n}\n.langtype span[data-v-11312d7f] {\n  padding: 3px;\n  font-size: 11px;\n  color: #333333;\n  background: #ffffff;\n  border-radius: 4px;\n  border: #cccccc 1px solid;\n  display: inline;\n  margin: 0 0 0 5px;\n  font-weight: normal;\n  display: inline-block;\n  line-height: 14px;\n}\n.devicesett-box .v-card__text[data-v-11312d7f] {\n  padding: 0;\n  overflow: hidden;\n  color: #000000;\n  max-height: 55vh;\n  min-height: 100px;\n  overflow: auto;\n}\n.devicesett-box .v-window[data-v-11312d7f] {\n  height: calc(100vh - 48px);\n  overflow-y: scroll;\n}\n.devicesett-box .d-flex[data-v-11312d7f] {\n  align-items: center;\n}\n.devicesett-box .v-window__container[data-v-11312d7f] {\n  background: #ffffff;\n  height: 100% !important;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DisconnectDialog_vue_vue_type_template_id_1ba94e2c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(375);
/* harmony import */ var _DisconnectDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(377);
/* empty/unused harmony star reexport *//* harmony import */ var _DisconnectDialog_vue_vue_type_style_index_0_id_1ba94e2c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(379);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _DisconnectDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DisconnectDialog_vue_vue_type_template_id_1ba94e2c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DisconnectDialog_vue_vue_type_template_id_1ba94e2c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1ba94e2c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/devices/wyapp/plugin/views/DisconnectDialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DisconnectDialog_vue_vue_type_template_id_1ba94e2c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(376);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DisconnectDialog_vue_vue_type_template_id_1ba94e2c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DisconnectDialog_vue_vue_type_template_id_1ba94e2c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    { staticClass: "disconnect" },
    [
      _c(
        "v-tooltip",
        {
          attrs: { top: "" },
          scopedSlots: _vm._u([
            {
              key: "activator",
              fn: function(ref) {
                var on = ref.on
                return [
                  _c(
                    "v-btn",
                    _vm._g(
                      {
                        ref: "fn",
                        staticClass: "icon-btn",
                        on: {
                          click: function($event) {
                            $event.stopPropagation()
                            return _vm.disconnect($event)
                          }
                        }
                      },
                      on
                    ),
                    [
                      _c("img", {
                        staticClass: "s24",
                        attrs: {
                          src:
                            "plugins/devices/wyapp/plugin/data/img/icons/disconnect-icon.svg",
                          alt: _vm.$t("DEVICE_WYAPP_DISCONNECT")
                        }
                      })
                    ]
                  )
                ]
              }
            }
          ])
        },
        [
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_DISCONNECT")))])
        ]
      ),
      _vm._v(" "),
      _c(
        "v-tooltip",
        {
          attrs: { top: "" },
          scopedSlots: _vm._u([
            {
              key: "activator",
              fn: function(ref) {
                var on = ref.on
                return [
                  _c(
                    "v-btn",
                    _vm._g(
                      {
                        staticClass: "icon-btn",
                        on: {
                          click: function($event) {
                            $event.stopPropagation()
                            return _vm.disconnectAndReboot($event)
                          }
                        }
                      },
                      on
                    ),
                    [
                      _c("img", {
                        staticClass: "s24",
                        attrs: {
                          src:
                            "plugins/devices/wyapp/plugin/data/img/icons/restart-icon.svg",
                          alt: _vm.$t("DEVICE_WYAPP_RESTART")
                        }
                      })
                    ]
                  )
                ]
              }
            }
          ])
        },
        [
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_RESTART")))])
        ]
      ),
      _vm._v(" "),
      _c(
        "v-tooltip",
        {
          attrs: { top: "" },
          scopedSlots: _vm._u([
            {
              key: "activator",
              fn: function(ref) {
                var on = ref.on
                return [
                  _c(
                    "v-btn",
                    _vm._g(
                      {
                        staticClass: "icon-btn",
                        on: {
                          click: function($event) {
                            $event.stopPropagation()
                            return _vm.disconnectAndPowerOff($event)
                          }
                        }
                      },
                      on
                    ),
                    [
                      _c("img", {
                        staticClass: "s24",
                        attrs: {
                          src:
                            "plugins/devices/wyapp/plugin/data/img/icons/turn-off-icon.svg",
                          alt: _vm.$t("DEVICE_WYAPP_TURNOFF")
                        }
                      })
                    ]
                  )
                ]
              }
            }
          ])
        },
        [
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_TURNOFF")))])
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_DisconnectDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(378);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_DisconnectDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'DisconnectDialog',
	mounted ()
	{
		this.$nextTick (() => {
			this.$refs.fn.$el.focus ();
		});
	},
	methods: {
		esc ()
		{
			this.$root.$emit ('submit');
		},
		disconnectAndReboot ()
		{
			this.$root.$emit ('submit', {
				disconnect: 'reboot'
			});
		},
		disconnectAndPowerOff ()
		{
			this.$root.$emit ('submit', {
				disconnect: 'poweroff'
			});
		},
		disconnect ()
		{
			this.$root.$emit ('submit', {
				disconnect: 'disconnect'
			});
		}
	}
});


/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DisconnectDialog_vue_vue_type_style_index_0_id_1ba94e2c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(380);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DisconnectDialog_vue_vue_type_style_index_0_id_1ba94e2c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DisconnectDialog_vue_vue_type_style_index_0_id_1ba94e2c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DisconnectDialog_vue_vue_type_style_index_0_id_1ba94e2c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DisconnectDialog_vue_vue_type_style_index_0_id_1ba94e2c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DisconnectDialog_vue_vue_type_style_index_0_id_1ba94e2c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 380:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(381);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("410e4248", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 381:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".w-100[data-v-1ba94e2c] {\n  width: 100%;\n}\n.w-90[data-v-1ba94e2c] {\n  width: 90%;\n}\n.w-80[data-v-1ba94e2c] {\n  width: 80%;\n}\n.w-70[data-v-1ba94e2c] {\n  width: 70%;\n}\n.w-60[data-v-1ba94e2c] {\n  width: 60%;\n}\n.w-50[data-v-1ba94e2c] {\n  width: 50%;\n}\n.w-40[data-v-1ba94e2c] {\n  width: 40%;\n}\n.w-30[data-v-1ba94e2c] {\n  width: 30%;\n}\n.w-20[data-v-1ba94e2c] {\n  width: 20%;\n}\n.w-10[data-v-1ba94e2c] {\n  width: 10%;\n}\n.hs-0[data-v-1ba94e2c] {\n  height: 0% !important;\n}\n.hs-35[data-v-1ba94e2c] {\n  height: 35% !important;\n}\n.hs-65[data-v-1ba94e2c] {\n  height: 65% !important;\n}\n.hs-100[data-v-1ba94e2c] {\n  height: calc(100vh - 158px) !important;\n}\n.rel[data-v-1ba94e2c] {\n  position: relative;\n}\n.text-center[data-v-1ba94e2c] {\n  text-align: center;\n}\n.text-left[data-v-1ba94e2c] {\n  text-align: left;\n}\n.text-right[data-v-1ba94e2c] {\n  text-align: right;\n}\n.h-top[data-v-1ba94e2c] {\n  height: calc(100vh - 90px);\n}\n.h-top2[data-v-1ba94e2c] {\n  height: calc(100vh - 158px);\n}\n.left[data-v-1ba94e2c] {\n  float: left !important;\n}\n.right[data-v-1ba94e2c] {\n  float: right !important;\n}\n.p-20[data-v-1ba94e2c] {\n  padding: 20px;\n}\n.disconnect[data-v-1ba94e2c] {\n  background: #191e25 !important;\n  padding: 10% 0;\n  text-align: center;\n}\n.disconnect .icon-btn[data-v-1ba94e2c] {\n  background: transparent !important;\n  text-transform: none;\n  color: #ffffff !important;\n  min-width: 80px;\n  min-height: 80px;\n  padding: 0;\n  margin: 0;\n  box-shadow: none !important;\n}\n.disconnect .icon-btn .s24[data-v-1ba94e2c] {\n  color: #ffffff !important;\n  width: 40px;\n  height: 40px;\n}\n.disconnect .icon-btn[data-v-1ba94e2c]:hover {\n  background: #e54225 !important;\n}\n.langtype span[data-v-1ba94e2c] {\n  padding: 3px;\n  font-size: 11px;\n  color: #333333;\n  background: #ffffff;\n  border-radius: 4px;\n  border: #cccccc 1px solid;\n  display: inline;\n  margin: 0 0 0 5px;\n  font-weight: normal;\n  display: inline-block;\n  line-height: 14px;\n}\n.devicesett-box .v-card__text[data-v-1ba94e2c] {\n  padding: 0;\n  overflow: hidden;\n  color: #000000;\n  max-height: 55vh;\n  min-height: 100px;\n  overflow: auto;\n}\n.devicesett-box .v-window[data-v-1ba94e2c] {\n  height: calc(100vh - 48px);\n  overflow-y: scroll;\n}\n.devicesett-box .d-flex[data-v-1ba94e2c] {\n  align-items: center;\n}\n.devicesett-box .v-window__container[data-v-1ba94e2c] {\n  background: #ffffff;\n  height: 100% !important;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NetworkManager_vue_vue_type_template_id_0c28cf85___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(383);
/* harmony import */ var _NetworkManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(385);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NetworkManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NetworkManager_vue_vue_type_template_id_0c28cf85___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NetworkManager_vue_vue_type_template_id_0c28cf85___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/devices/wyapp/plugin/views/NetworkManager.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NetworkManager_vue_vue_type_template_id_0c28cf85___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(384);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NetworkManager_vue_vue_type_template_id_0c28cf85___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NetworkManager_vue_vue_type_template_id_0c28cf85___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    { staticClass: "manager-box" },
    [
      _c(
        "v-card-title",
        [
          _c("span", { staticClass: "headline" }, [
            _vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_NETWORK_MANAGER")))
          ]),
          _vm._v(" "),
          _c("v-spacer")
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-card-text",
        [
          !_vm.networks
            ? _c(
                "div",
                [_c("v-progress-circular", { attrs: { indeterminate: "" } })],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "v-tabs",
            {
              staticClass: "tabs-box",
              attrs: { left: "" },
              model: {
                value: _vm.active,
                callback: function($$v) {
                  _vm.active = $$v
                },
                expression: "active"
              }
            },
            _vm._l(_vm.networks, function(network) {
              return _c(
                "v-tab",
                { key: network.i, attrs: { ripple: "" } },
                [
                  _c("v-img", {
                    attrs: {
                      src:
                        "plugins/devices/wyapp/plugin/data/img/icons/" +
                        _vm.networkIcon(network) +
                        "-icon.svg",
                      "aria-label": "WiFi"
                    }
                  }),
                  _vm._v("\n\t\t\t\t" + _vm._s(network.i) + "\n\t\t\t")
                ],
                1
              )
            }),
            1
          ),
          _vm._v(" "),
          _c(
            "v-tabs-items",
            {
              model: {
                value: _vm.active,
                callback: function($$v) {
                  _vm.active = $$v
                },
                expression: "active"
              }
            },
            _vm._l(_vm.networks, function(network) {
              return _c(
                "v-tab-item",
                { key: network.i, attrs: { "fill-height": "" } },
                [
                  network.t === "e"
                    ? _c("WiredNetwork", { attrs: { network: network } })
                    : _vm._e(),
                  _vm._v(" "),
                  network.t === "w"
                    ? _c("WirelessNetwork", {
                        attrs: {
                          network: network,
                          "wireless-networks": _vm.wirelessNetworks[network.i]
                        },
                        on: { link: _vm.link, unlink: _vm.unlink }
                      })
                    : _vm._e()
                ],
                1
              )
            }),
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-card-actions",
        [
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-btn",
            { ref: "button", attrs: { text: "" }, on: { click: _vm.close } },
            [_vm._v(_vm._s(_vm.$t("CLOSE")))]
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_NetworkManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(386);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_NetworkManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WiredNetwork_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(387);
/* harmony import */ var _WirelessNetwork_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(392);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'NetworkManager',
	props: ['connection'],
	components: {
		WiredNetwork: _WiredNetwork_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
		WirelessNetwork: _WirelessNetwork_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
	},
	data () {
		return {
			dialog: false,
			active: 0,
			networks: null,
			wirelessNetworks: {

			}
		};
	},
	mounted() {
		this.$refs.button.$el.focus();
	},
	computed: {
		...Object(vuex__WEBPACK_IMPORTED_MODULE_2__["mapGetters"]) ({
			device: 'workspace/device',
		}),
	},
	created ()
	{
		this.connection.send ('net', {
			a: 'run'
		});
		this.connection.on ('tag:net', this.updateNetworks);
	},
	destroyed ()
	{
		this.connection.send ('net', {
			a: 'stop'
		});
		this.connection.removeListener ('tag:net', this.updateNetworks);
	},
	methods: {
		esc() {
			this.close();
		},
		close ()
		{
			this.$root.$emit ('submit');
		},
		networkIcon (network)
		{
			if (network.t === 'e') return 'eth';
			else if (network.t === 'w') return 'wifi';
			else return 'eth';
		},
		updateNetworks (data)
		{
			if (data.a === 'l')
			{
				this.networks = data.n;
				for (let network of this.networks)
				{
					if (network.t === 'w')
					{
						this.connection.send ('net', {a:'s', i:network.i});
					}
				}
			}
			else
			if (data.a === 's')
			{
				if (data.e)
				{
					// TODO show error
					delete this.wirelessNetworks[data.i];
				}
				else
				{
					let wirelessNetworksMap = {};
					data.n.filter ((wirelessNetwork) => {
						if (!wirelessNetworksMap[wirelessNetwork.s])
						{
							wirelessNetworksMap[wirelessNetwork.s] = wirelessNetwork;
						}
						else
						{
							if (wirelessNetworksMap[wirelessNetwork.s].q < wirelessNetwork.q)
							{
								wirelessNetworksMap[wirelessNetwork.s] = wirelessNetwork;
							}
						}
					});
					this.wirelessNetworks[data.i] = Object.values (wirelessNetworksMap).sort ((wirelessNetwork1, wirelessNetwork2) => {
						let s1 = wirelessNetwork1.s.toLowerCase ();
						let s2 = wirelessNetwork2.s.toLowerCase ();
						if (s1 < s2) return -1;
						else
						if (s1 > s2) return 1;
						else return 0;
					});
					if (this.wirelessNetworks[data.i])
					{
						// push the connect to other network
						this.wirelessNetworks[data.i].push ({s: '', p:'wpa2'});
					}
				}
			}
		},
		link (network)
		{
			this.connection.send ('net', {
				a: 'c', 
				...network
			});
		},
		unlink (network)
		{
			this.connection.send ('net', {
				a: 'd',
				...network
			});
		}
	}
});


/***/ }),

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WiredNetwork_vue_vue_type_template_id_a4744bd6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(388);
/* harmony import */ var _WiredNetwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(390);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _WiredNetwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _WiredNetwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _WiredNetwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _WiredNetwork_vue_vue_type_template_id_a4744bd6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _WiredNetwork_vue_vue_type_template_id_a4744bd6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/devices/wyapp/plugin/views/WiredNetwork.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WiredNetwork_vue_vue_type_template_id_a4744bd6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(389);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WiredNetwork_vue_vue_type_template_id_a4744bd6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WiredNetwork_vue_vue_type_template_id_a4744bd6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "p-20" }, [
    _c("div", { staticClass: "networkinfo" }, [
      _c("strong", [
        _vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_WIREDNETWORK_IP")) + ":")
      ]),
      _vm._v(" " + _vm._s(_vm.network.ip) + "\n\t\t"),
      _c("br"),
      _vm._v(" "),
      _c("strong", [
        _vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_WIREDNETWORK_MASK")) + ":")
      ]),
      _vm._v(" " + _vm._s(_vm.network.m) + "\n\t\t"),
      _c("br"),
      _vm._v(" "),
      _c("strong", [
        _vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_WIREDNETWORK_BROADCAST")) + ":")
      ]),
      _vm._v(" " + _vm._s(_vm.network.b) + "\n\t\t"),
      _c("br"),
      _vm._v(" "),
      _c("strong", [
        _vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_WIREDNETWORK_HARDWARE")) + ":")
      ]),
      _vm._v(" " + _vm._s(_vm.network.h) + "\n\t")
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_WiredNetwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(391);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_WiredNetwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_loader_lib_index_js_vue_loader_options_WiredNetwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_loader_lib_index_js_vue_loader_options_WiredNetwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_loader_lib_index_js_vue_loader_options_WiredNetwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_WiredNetwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 391:
/***/ (function(module, exports) {

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = {
	name: 'WiredNetwork',
	props: ['network']
};


/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WirelessNetwork_vue_vue_type_template_id_4b140a3a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(393);
/* harmony import */ var _WirelessNetwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(395);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _WirelessNetwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _WirelessNetwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _WirelessNetwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _WirelessNetwork_vue_vue_type_template_id_4b140a3a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _WirelessNetwork_vue_vue_type_template_id_4b140a3a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/devices/wyapp/plugin/views/WirelessNetwork.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WirelessNetwork_vue_vue_type_template_id_4b140a3a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(394);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WirelessNetwork_vue_vue_type_template_id_4b140a3a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WirelessNetwork_vue_vue_type_template_id_4b140a3a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.network.ip
      ? _c("div", { staticClass: "p-20" }, [
          _c(
            "div",
            { staticClass: "networkinfo" },
            [
              _c("strong", [_vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_SSID")) + ":")]),
              _vm._v(" " + _vm._s(_vm.network.s) + "\n\t\t\t"),
              _c("br"),
              _vm._v(" "),
              _c("strong", [
                _vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_WIREDNETWORK_IP")) + ":")
              ]),
              _vm._v(" " + _vm._s(_vm.network.ip) + "\n\t\t\t"),
              _c("br"),
              _vm._v(" "),
              _c("strong", [
                _vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_WIREDNETWORK_MASK")) + ":")
              ]),
              _vm._v(" " + _vm._s(_vm.network.m) + "\n\t\t\t"),
              _c("br"),
              _vm._v(" "),
              _c("strong", [
                _vm._v(
                  _vm._s(_vm.$t("DEVICE_WYAPP_WIREDNETWORK_BROADCAST")) + ":"
                )
              ]),
              _vm._v(" " + _vm._s(_vm.network.b) + "\n\t\t\t"),
              _c("br"),
              _vm._v(" "),
              _c("strong", [
                _vm._v(
                  _vm._s(_vm.$t("DEVICE_WYAPP_WIREDNETWORK_HARDWARE")) + ":"
                )
              ]),
              _vm._v(" " + _vm._s(_vm.network.h) + "\n\t\t\t"),
              _c(
                "v-btn",
                {
                  staticClass: "lib-app-btn net-dis-btn",
                  attrs: { text: "" },
                  on: {
                    click: function($event) {
                      _vm.unlink()
                    }
                  }
                },
                [_vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_DISCONNECT")))]
              )
            ],
            1
          )
        ])
      : _c("div", { staticClass: "networkinfo" }, [
          !_vm.wirelessNetworks
            ? _c(
                "div",
                { staticClass: "h-100" },
                [_c("v-progress-circular", { attrs: { indeterminate: "" } })],
                1
              )
            : _c(
                "table",
                { staticClass: "w-100" },
                _vm._l(_vm.wirelessNetworks, function(wirelessNetwork) {
                  return _c(
                    "tr",
                    { key: wirelessNetwork.s, staticClass: "w-100 task" },
                    [
                      _c("td", { staticClass: "w-50 signal" }, [
                        _c("h3", [
                          _c("img", {
                            attrs: {
                              src:
                                "plugins/devices/wyapp/plugin/data/img/icons/wifi-strength-" +
                                _vm.signalStrength(wirelessNetwork) +
                                ".png",
                              "aria-label": "Signal strenght"
                            }
                          }),
                          _vm._v(" " + _vm._s(_vm.networkSSID(wirelessNetwork)))
                        ]),
                        _vm._v(" "),
                        wirelessNetwork.s === _vm.SSID
                          ? _c(
                              "div",
                              [
                                wirelessNetwork.s === ""
                                  ? _c("v-text-field", {
                                      attrs: {
                                        label: _vm.$t("DEVICE_WYAPP_SSID")
                                      },
                                      model: {
                                        value: _vm.linkSSID,
                                        callback: function($$v) {
                                          _vm.linkSSID = $$v
                                        },
                                        expression: "linkSSID"
                                      }
                                    })
                                  : _vm._e(),
                                _vm._v(" "),
                                _c("v-text-field", {
                                  attrs: {
                                    type: "password",
                                    label: _vm.$t("DEVICE_WYAPP_PSK")
                                  },
                                  model: {
                                    value: _vm.linkPSK,
                                    callback: function($$v) {
                                      _vm.linkPSK = $$v
                                    },
                                    expression: "linkPSK"
                                  }
                                }),
                                _vm._v(" "),
                                _vm.network.s !== wirelessNetwork.s
                                  ? _c(
                                      "v-btn",
                                      {
                                        staticClass: "lib-app-btn",
                                        attrs: { text: "" },
                                        on: {
                                          click: function($event) {
                                            return _vm.link(wirelessNetwork)
                                          }
                                        }
                                      },
                                      [
                                        _vm._v(
                                          _vm._s(_vm.$t("DEVICE_WYAPP_CONNECT"))
                                        )
                                      ]
                                    )
                                  : _vm._e()
                              ],
                              1
                            )
                          : _vm._e()
                      ]),
                      _vm._v(" "),
                      _c(
                        "td",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: wirelessNetwork.s !== _vm.SSID,
                              expression: "wirelessNetwork.s !== SSID"
                            }
                          ],
                          staticClass: "w-50 text-right"
                        },
                        [
                          !wirelessNetwork.linking
                            ? _c(
                                "v-btn",
                                {
                                  staticClass: "lib-app-btn",
                                  attrs: { text: "" },
                                  on: {
                                    click: function($event) {
                                      _vm.connect(wirelessNetwork)
                                    }
                                  }
                                },
                                [_vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_CONNECT")))]
                              )
                            : _c(
                                "div",
                                [
                                  _c("v-progress-circular", {
                                    attrs: { indeterminate: "" }
                                  })
                                ],
                                1
                              )
                        ],
                        1
                      )
                    ]
                  )
                }),
                0
              )
        ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_WirelessNetwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(396);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_WirelessNetwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_loader_lib_index_js_vue_loader_options_WirelessNetwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_loader_lib_index_js_vue_loader_options_WirelessNetwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_loader_lib_index_js_vue_loader_options_WirelessNetwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_WirelessNetwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 396:
/***/ (function(module, exports) {

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = {
	name: 'WirelessNetwork',
	props: ['network', 'wirelessNetworks'],
	data () {
		return {
			SSID: null,
			linkSSID: null,
			linkPSK: ''
		};
	},
	methods: {
		signalStrength (wirelessNetwork)
		{
			let value;
			if (wirelessNetwork.q >= 75) value = 100;
			else
			if (wirelessNetwork.q >= 50) value = 75;
			else
			if (wirelessNetwork.q >= 25) value = 50;
			else value = 0;
			
			return value;
		},
		connect (wn)
		{
			this.SSID = wn.s;
			this.linkSSID = wn.s;
			this.linkPSK = '';
		},
		link (wirelessNetwork)
		{
			wirelessNetwork.linking = true;
			this.$emit ('link', {
				i: this.network.i,
				s: this.linkSSID,
				p: this.linkPSK
			});
			this.SSID = null;
		},
		unlink ()
		{
			this.$emit ('unlink', {
				i: this.network.i
			});
		},
		networkSSID (wirelessNetwork)
		{
			if (wirelessNetwork.s.length > 0) return wirelessNetwork.s;
			else return this.$t('DEVICE_WYAPP_SSID_OTHER_NETWORK');
		}
	}
};


/***/ }),

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FileManager_vue_vue_type_template_id_24b3e6ca_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(398);
/* harmony import */ var _FileManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(400);
/* empty/unused harmony star reexport *//* harmony import */ var _FileManager_vue_vue_type_style_index_0_id_24b3e6ca_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(402);
/* harmony import */ var _FileManager_vue_vue_type_style_index_1_id_24b3e6ca_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(405);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(54);







/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _FileManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FileManager_vue_vue_type_template_id_24b3e6ca_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FileManager_vue_vue_type_template_id_24b3e6ca_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "24b3e6ca",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/devices/wyapp/plugin/views/FileManager.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_template_id_24b3e6ca_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(399);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_template_id_24b3e6ca_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_template_id_24b3e6ca_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    { staticClass: "manager-box" },
    [
      _c(
        "v-card-title",
        [
          _vm.menuItem === null
            ? _c("span", { staticClass: "headline" }, [
                _vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_NO_DIRECTORY")))
              ])
            : _c("span", { staticClass: "headline" }, [
                _vm._v(_vm._s(_vm.menuItem.path))
              ]),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-tooltip",
            {
              attrs: { bottom: "" },
              scopedSlots: _vm._u([
                {
                  key: "activator",
                  fn: function(data) {
                    return [
                      _c(
                        "v-btn",
                        {
                          staticClass: "title-icon-btn",
                          attrs: { text: "", "aria-label": "Refresh" }
                        },
                        [
                          _c("v-img", {
                            attrs: {
                              contain: "",
                              src:
                                "plugins/devices/wyapp/plugin/data/img/icons/refresh-icon.svg"
                            }
                          })
                        ],
                        1
                      )
                    ]
                  }
                }
              ])
            },
            [
              _vm._v(" "),
              _c("span", [_vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_REFRESH")))])
            ]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("v-card-text", { staticStyle: { height: "100%" } }, [
        _c("div", { staticClass: "filemanager" }, [
          _c(
            "div",
            { staticClass: "tree-left" },
            [
              _c("v-treeview", {
                staticStyle: { width: "fit-content" },
                attrs: {
                  dense: "",
                  items: _vm.items,
                  "load-children": _vm.fetchContent,
                  open: _vm.open,
                  "open-on-click": "",
                  "item-key": "key"
                },
                on: {
                  "update:open": function($event) {
                    _vm.open = $event
                  }
                },
                scopedSlots: _vm._u([
                  {
                    key: "label",
                    fn: function(ref) {
                      var item = ref.item
                      var open = ref.open
                      return [
                        item.name === "DEVICE_WYAPP_FILESYSTEM"
                          ? _c("div", [
                              item.file === undefined && open
                                ? _c(
                                    "p",
                                    {
                                      staticStyle: { width: "100%" },
                                      attrs: { text: "" },
                                      on: {
                                        click: function($event) {
                                          ;(_vm.menuItem = item),
                                            (_vm.fileItem = item)
                                        },
                                        contextmenu: function($event) {
                                          ;(_vm.fileItem = item),
                                            _vm.showFolder($event)
                                        }
                                      }
                                    },
                                    [
                                      _c("v-icon", [_vm._v("mdi-folder-open")]),
                                      _vm._v(
                                        _vm._s(_vm.$t(item.name)) +
                                          "          \n\t\t\t\t\t\t\t"
                                      )
                                    ],
                                    1
                                  )
                                : item.file === undefined
                                ? _c(
                                    "p",
                                    {
                                      staticStyle: { width: "100%" },
                                      attrs: { text: "" },
                                      on: {
                                        click: function($event) {
                                          ;(_vm.menuItem = item),
                                            (_vm.fileItem = item)
                                        },
                                        contextmenu: function($event) {
                                          ;(_vm.fileItem = item),
                                            _vm.showFolder($event)
                                        }
                                      }
                                    },
                                    [
                                      _c("v-icon", [_vm._v("mdi-folder")]),
                                      _vm._v(
                                        _vm._s(_vm.$t(item.name)) +
                                          "\n\t\t\t\t\t\t\t"
                                      )
                                    ],
                                    1
                                  )
                                : _c(
                                    "p",
                                    {
                                      staticStyle: { width: "100%" },
                                      attrs: { text: "" },
                                      on: {
                                        click: function($event) {
                                          _vm.fileItem = item
                                        },
                                        contextmenu: function($event) {
                                          ;(_vm.fileItem = item),
                                            _vm.showFile($event)
                                        }
                                      }
                                    },
                                    [
                                      _c("v-icon", [_vm._v("mdi-file")]),
                                      _vm._v(
                                        _vm._s(item.name) + "\n\t\t\t\t\t\t\t"
                                      )
                                    ],
                                    1
                                  )
                            ])
                          : _c("div", [
                              item.file === undefined && open
                                ? _c(
                                    "p",
                                    {
                                      staticStyle: { width: "100%" },
                                      attrs: { text: "" },
                                      on: {
                                        click: function($event) {
                                          ;(_vm.menuItem = item),
                                            (_vm.fileItem = item)
                                        },
                                        contextmenu: function($event) {
                                          ;(_vm.fileItem = item),
                                            _vm.showFolder($event)
                                        }
                                      }
                                    },
                                    [
                                      _c("v-icon", [_vm._v("mdi-folder-open")]),
                                      _vm._v(
                                        _vm._s(item.name) +
                                          "          \n\t\t\t\t\t\t\t"
                                      )
                                    ],
                                    1
                                  )
                                : item.file === undefined
                                ? _c(
                                    "p",
                                    {
                                      staticStyle: { width: "100%" },
                                      attrs: { text: "" },
                                      on: {
                                        click: function($event) {
                                          ;(_vm.menuItem = item),
                                            (_vm.fileItem = item)
                                        },
                                        contextmenu: function($event) {
                                          ;(_vm.fileItem = item),
                                            _vm.showFolder($event)
                                        }
                                      }
                                    },
                                    [
                                      _c("v-icon", [_vm._v("mdi-folder")]),
                                      _vm._v(
                                        _vm._s(item.name) + "\n\t\t\t\t\t\t\t"
                                      )
                                    ],
                                    1
                                  )
                                : _c(
                                    "p",
                                    {
                                      staticStyle: { width: "100%" },
                                      attrs: { text: "" },
                                      on: {
                                        click: function($event) {
                                          _vm.fileItem = item
                                        },
                                        contextmenu: function($event) {
                                          ;(_vm.fileItem = item),
                                            _vm.showFile($event)
                                        }
                                      }
                                    },
                                    [
                                      _c("v-icon", [_vm._v("mdi-file")]),
                                      _vm._v(
                                        _vm._s(item.name) + "\n\t\t\t\t\t\t\t"
                                      )
                                    ],
                                    1
                                  )
                            ])
                      ]
                    }
                  }
                ]),
                model: {
                  value: _vm.tree,
                  callback: function($$v) {
                    _vm.tree = $$v
                  },
                  expression: "tree"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "project-box-1" },
            [
              _c(
                "v-list",
                [
                  _vm.menuItem !== null
                    ? _c(
                        "v-list-item-group",
                        {
                          attrs: { color: "primary" },
                          model: {
                            value: _vm.item,
                            callback: function($$v) {
                              _vm.item = $$v
                            },
                            expression: "item"
                          }
                        },
                        _vm._l(_vm.menuItem.children, function(item) {
                          return _c(
                            "v-list-item",
                            { key: item.key },
                            [
                              _c("v-list-item-icon", [
                                item.file !== undefined
                                  ? _c(
                                      "p",
                                      {
                                        on: {
                                          click: function($event) {
                                            _vm.fileItem = item
                                          },
                                          contextmenu: function($event) {
                                            ;(_vm.fileItem = item),
                                              _vm.showFile($event)
                                          }
                                        }
                                      },
                                      [_c("v-icon", [_vm._v("mdi-file")])],
                                      1
                                    )
                                  : item.name
                                  ? _c(
                                      "p",
                                      {
                                        attrs: { text: "" },
                                        on: {
                                          click: function($event) {
                                            _vm.menuItem = item
                                          },
                                          contextmenu: function($event) {
                                            ;(_vm.fileItem = item),
                                              _vm.showFolder($event)
                                          }
                                        }
                                      },
                                      [_c("v-icon", [_vm._v("mdi-folder")])],
                                      1
                                    )
                                  : _vm._e()
                              ]),
                              _vm._v(" "),
                              _c(
                                "v-list-item-content",
                                [
                                  item.file !== undefined
                                    ? _c("v-list-item-title", {
                                        domProps: {
                                          textContent: _vm._s(item.name)
                                        },
                                        on: {
                                          click: function($event) {
                                            _vm.fileItem = item
                                          },
                                          contextmenu: function($event) {
                                            ;(_vm.fileItem = item),
                                              _vm.showFile($event)
                                          }
                                        }
                                      })
                                    : item.name
                                    ? _c("v-list-item-title", {
                                        attrs: { text: "" },
                                        domProps: {
                                          textContent: _vm._s(item.name)
                                        },
                                        on: {
                                          click: function($event) {
                                            ;(_vm.menuItem = item),
                                              _vm.fetchContent(item)
                                          },
                                          contextmenu: function($event) {
                                            ;(_vm.fileItem = item),
                                              _vm.showFolder($event)
                                          }
                                        }
                                      })
                                    : _vm._e()
                                ],
                                1
                              )
                            ],
                            1
                          )
                        }),
                        1
                      )
                    : _vm._e()
                ],
                1
              )
            ],
            1
          )
        ])
      ]),
      _vm._v(" "),
      _c(
        "v-card-actions",
        [
          _vm.fileItem !== null
            ? _c("span", [_vm._v(_vm._s(_vm.fileItem.name))])
            : _vm._e(),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _vm.fileItem !== null &&
          _vm.fileItem.children !== undefined &&
          _vm.fileItem.name !== _vm.$t("DEVICE_WYAPP_FILESYSTEM")
            ? _c(
                "v-btn",
                {
                  staticClass: "fileexplorer-actions",
                  attrs: { text: "" },
                  on: { click: _vm.deleteObject }
                },
                [
                  _vm._v(
                    "\n\t\t\t" +
                      _vm._s(_vm.$t("PROJECT_DELETE_FOLDER")) +
                      "\n\t\t"
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.fileItem !== null &&
          _vm.fileItem.children !== undefined &&
          _vm.fileItem.name !== _vm.$t("DEVICE_WYAPP_FILESYSTEM")
            ? _c(
                "v-btn",
                {
                  staticClass: "fileexplorer-actions",
                  attrs: { text: "" },
                  on: { click: _vm.rename }
                },
                [
                  _vm._v(
                    "\n\t\t\t" +
                      _vm._s(_vm.$t("PROJECT_RENAME_FOLDER")) +
                      "\n\t\t"
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.fileItem !== null &&
          _vm.fileItem.children !== undefined &&
          _vm.fileItem.name !== _vm.$t("DEVICE_WYAPP_FILESYSTEM")
            ? _c(
                "v-btn",
                {
                  staticClass: "fileexplorer-actions",
                  attrs: { text: "" },
                  on: { click: _vm.newFolder }
                },
                [
                  _vm._v(
                    "\n\t\t\t" + _vm._s(_vm.$t("PROJECT_NEW_FOLDER")) + "\n\t\t"
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.fileItem !== null &&
          _vm.fileItem.children !== undefined &&
          _vm.fileItem.name !== _vm.$t("DEVICE_WYAPP_FILESYSTEM")
            ? _c(
                "v-btn",
                {
                  staticClass: "fileexplorer-actions",
                  attrs: { text: "" },
                  on: { click: _vm.upload }
                },
                [
                  _vm._v(
                    "\n\t\t\t" +
                      _vm._s(_vm.$t("PROJECT_IMPORT_FILE")) +
                      "\n\t\t"
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.fileItem !== null && _vm.fileItem.file !== undefined
            ? _c(
                "v-btn",
                {
                  staticClass: "fileexplorer-actions",
                  attrs: { text: "" },
                  on: { click: _vm.deleteObject }
                },
                [
                  _vm._v(
                    "\n\t\t\t" +
                      _vm._s(_vm.$t("PROJECT_DELETE_FILE")) +
                      "\n\t\t"
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.fileItem !== null && _vm.fileItem.file !== undefined
            ? _c(
                "v-btn",
                {
                  staticClass: "fileexplorer-actions",
                  attrs: { text: "" },
                  on: { click: _vm.rename }
                },
                [
                  _vm._v(
                    "\n\t\t\t" +
                      _vm._s(_vm.$t("PROJECT_RENAME_FILE")) +
                      "\n\t\t"
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.fileItem !== null && _vm.fileItem.file !== undefined
            ? _c(
                "v-btn",
                {
                  staticClass: "fileexplorer-actions",
                  attrs: { text: "" },
                  on: { click: _vm.download }
                },
                [
                  _vm._v(
                    "\n\t\t\t" +
                      _vm._s(_vm.$t("PROJECT_EXPORT_FILE")) +
                      "\n\t\t"
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _c("v-btn", { attrs: { text: "" }, on: { click: _vm.close } }, [
            _vm._v(_vm._s(_vm.$t("CLOSE")))
          ])
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(401);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(294);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const mapGetters = __webpack_require__ (39).mapGetters;

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'FileManager',
	props: ['connection'],
	data () {
		return {
			open: ['public'],
			tree: [],
			items: [{
				name:'DEVICE_WYAPP_FILESYSTEM',
				children:[],
				path:'/',
				size:0,
				key:'/',
			}],
			switch1:false,
			fileMenu: false,
			folderMenu:false,
			fileItem:null,
			menuItem:null,
			newData:null,
			cwdArray:[],
			resolve:null,
			cwd:'/',
			x: 0,
			y: 0,
			item:1,
		};
	},
	computed: {
		...mapGetters ({
			device: 'link/device'//,
			//connection: 'link/connection'
		}),
	},
	watch: {
		async newData(){
			await this.updateFileTree(this.newData,this.fileItem);
		},
		// fileItem() {
		// 	console.log(this.fileItem);
		// }

	},
	async created () {

		this.connection.on('tag:fe1',this.update);
		this.connection.on('tag:fe3',await this.saveFileDialog);
		this.connection.on('tag:fe6',this.error);
		this.connection.on('tag:fe7',this.error);
	},
	mounted() {
		this.items[0].name = this.$t(this.items[0].name);
	},
	async destroyed ()
	{
		this.connection.removeListener('tag:fe1',this.update);
		this.connection.removeListener('tag:fe3',await this.saveFileDialog);
		this.connection.removeListener('tag:fe6',this.error);
		this.connection.removeListener('tag:fe7',this.error);
	},
	methods: {
		list(cwd){
			this.connection.send('fe', {
				a: 'ls',
				b:cwd
			});
		},
		async saveFileDialog(data){
			let newData1 = Buffer.from(data.f);
			await this.studio.projects.downloadFile(this.fileItem.name,newData1);
		},
		download() {
			//downlaod in fereastra glisanta
			//max 3000 biti ~= 32kb MAXKPACKET
			//
			this.connection.send('fe', {
				a:'down',
				b:this.cwd,
				c:this.fileItem.name,
				z:0,
				size:this.fileItem.size
			});
		},
		async upload(){
			let files = await this.studio.filesystem.openImportDialog({
				title:'Import',
				filetypes:[]
			});
			if (files.length > 0)
			{
				// use first file
				let fileData = await this.studio.filesystem.readImportFile (files[0]);
				let name = files[0].name;
				this.connection.send('fe',{
					a:'up',
					b:this.cwd,
					c:path__WEBPACK_IMPORTED_MODULE_0___default.a.basename(name),
					d:fileData,
					t:'w',
					end:true
				});
			}
			this.connection.send('fe', {
				a: 'ls',
				b:this.cwd
			});
			
		},
		refresh(){
			//TODO optimize file changes
			this.items[0].children = [];
			this.fileItem=this.items[0];
			this.cwd='/';
			this.cwdArray=[];
			this.menuItem = null;
			this.connection.send('fe', {
				a: 'ls',
				b:'/'
			});	
		},
		async deleteObject(){
			//SHOW YOU SURE POPUP
			let allow = await this.studio.workspace.showConfirmationPrompt ('PROJECT_DELETE_FILE', 'PROJECT_FILE_SURE');
			let parent = path__WEBPACK_IMPORTED_MODULE_0___default.a.dirname(this.fileItem.path);
			if(allow){
				this.connection.send('fe',{
					a:'del',
					b:parent,
					c:this.fileItem.name,
				});
				this.refresh();
			}			
		},
		async rename(){
			let parent = path__WEBPACK_IMPORTED_MODULE_0___default.a.dirname(this.fileItem.path);
			if (this.fileItem.children)
			{
				let newName = await this.studio.workspace.showPrompt ('PROJECT_RENAME_FOLDER', 'PROJECT_NEW_FOLDER_NAME', this.fileItem.name, 'PROJECT_NEW_NAME');
				
				if (newName)
				{
					this.connection.send('fe',{
						a:'ren',
						b:parent,
						c:this.fileItem.name,
						d:newName
					});
					this.refresh();
				}
			}
			else
			{

				let newName = await this.studio.workspace.showPrompt ('PROJECT_RENAME_FILE', 'PROJECT_NEW_FILE_NAME', this.fileItem.name, 'PROJECT_NEW_NAME');
				if (newName)
				{
					this.connection.send('fe',{
						a:'ren',
						b:parent,
						c:this.fileItem.name,
						d:newName
					});
					this.refresh();
				}
			}
			

		},
		async newFolder(){
			let folderName = await this.studio.workspace.showPrompt ('PROJECT_NEW_FOLDER', 'PROJECT_NEW_FOLDER_NAME', '', 'PROJECT_NEW_NAME');
			if (folderName)
			{
				this.connection.send('fe',{
					a:'newf',
					b:this.fileItem.path,
					c:folderName,
				});
				this.refresh();

			}			

		},
		update(data){
			this.newData=data;			
		},
		error(data){
			//TODO show notification
			this.studio.workspace.error (data);
		},
		updateFileTree(data, tree){
			tree.children = [];
			if(data) {
				for(let item of data) {
					if(item.isdir) {
						tree.children.push({
							name: item.name,
							children:[],
							path:this.cwd+item.name+'/',
							size:item.size,
							key: this.cwd+item.name+'/',
						});
					} else if(item.isfile) {
						tree.children.push({
							name:item.name,
							file:path__WEBPACK_IMPORTED_MODULE_0___default.a.extname(item.name),
							path:this.cwd+item.name+'/',
							size:item.size,
							key:this.cwd+item.name+'/'+item.name,
						});
					} else if(item.islink) {
						tree.children.push({
							name:item.name,
							link:true,
							path:this.cwd+item.name+'/',
							size:item.size,
							key:this.cwd+item.name+'/'+item.name,
						});
					}	
				}
				this.studio.projects.sort(tree.children);
				if(this.resolve){
					this.resolve();
					this.resolve = null;
				}
				
			}
		},
		_isChildOf(child,parent) {
			if (child === parent) return false;
			const parentTokens = parent.split(path__WEBPACK_IMPORTED_MODULE_0___default.a.sep).filter(i => i.length);
			return parentTokens.every((t, i) => child.split(path__WEBPACK_IMPORTED_MODULE_0___default.a.sep)[i] === t);
		},
		fetchContent(item){
			this.cwd=item.path;
			if(!this.cwdArray.includes(this.cwd)){
				this.cwdArray.push(this.cwd);
				this.fileItem=item;
				this.connection.send('fe', {
					a: 'ls',
					b:this.cwd
				});
				let p = new Promise((resolve) => {this.resolve = resolve;});
				return p;
			}

			
		},
		showFile(e) {
			this.cwd = path__WEBPACK_IMPORTED_MODULE_0___default.a.dirname(this.fileItem.path);
			this.fileMenu = false;
			this.folderMenu = false;
			e.preventDefault();
			this.fileMenu = false;
			this.x = e.clientX;
			this.y = e.clientY;
			this.$nextTick(() => {
				this.fileMenu = true;
			});
		},
		showFolder(e) {
			this.fileMenu = false;
			this.folderMenu = false;
			e.preventDefault();
			this.folderMenu = false;
			this.x = e.clientX;
			this.y = e.clientY;
			this.$nextTick(() => {
				this.folderMenu = true;
			});
		},
		close ()
		{
			this.$root.$emit ('submit');
		},
		esc() {
			this.close();
		}, 
	}
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(214).Buffer))

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_style_index_0_id_24b3e6ca_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(403);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_style_index_0_id_24b3e6ca_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_style_index_0_id_24b3e6ca_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_style_index_0_id_24b3e6ca_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_style_index_0_id_24b3e6ca_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_style_index_0_id_24b3e6ca_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 403:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(404);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("06e6935b", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 404:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".folder-open[data-v-24b3e6ca] {\n  background: url('plugins/devices/wyapp/plugin/data/img/icons/32px.png') no-repeat 0px -32px !important;\n  width: 32px;\n  height: 32px;\n}\n.folder-closed[data-v-24b3e6ca] {\n  background: url('plugins/devices/wyapp/plugin/data/img/icons/32px.png') no-repeat -64px 0px !important;\n  width: 32px;\n  height: 32px;\n}\n.file[data-v-24b3e6ca] {\n  background: url('plugins/devices/wyapp/plugin/data/img/icons/32px.png') no-repeat -32px 0px !important;\n  width: 32px;\n  height: 32px;\n}\n.project-tree-on .v-treeview[data-v-24b3e6ca],\n.project-tree-on .v-treeview > .v-treeview-node[data-v-24b3e6ca] {\n  height: auto !important;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_style_index_1_id_24b3e6ca_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(406);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_style_index_1_id_24b3e6ca_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_style_index_1_id_24b3e6ca_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_style_index_1_id_24b3e6ca_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_style_index_1_id_24b3e6ca_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_style_index_1_id_24b3e6ca_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 406:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(407);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("8119588c", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 407:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".w-100[data-v-24b3e6ca] {\n  width: 100%;\n}\n.w-90[data-v-24b3e6ca] {\n  width: 90%;\n}\n.w-80[data-v-24b3e6ca] {\n  width: 80%;\n}\n.w-70[data-v-24b3e6ca] {\n  width: 70%;\n}\n.w-60[data-v-24b3e6ca] {\n  width: 60%;\n}\n.w-50[data-v-24b3e6ca] {\n  width: 50%;\n}\n.w-40[data-v-24b3e6ca] {\n  width: 40%;\n}\n.w-30[data-v-24b3e6ca] {\n  width: 30%;\n}\n.w-20[data-v-24b3e6ca] {\n  width: 20%;\n}\n.w-10[data-v-24b3e6ca] {\n  width: 10%;\n}\n.hs-0[data-v-24b3e6ca] {\n  height: 0% !important;\n}\n.hs-35[data-v-24b3e6ca] {\n  height: 35% !important;\n}\n.hs-65[data-v-24b3e6ca] {\n  height: 65% !important;\n}\n.hs-100[data-v-24b3e6ca] {\n  height: calc(100vh - 158px) !important;\n}\n.rel[data-v-24b3e6ca] {\n  position: relative;\n}\n.text-center[data-v-24b3e6ca] {\n  text-align: center;\n}\n.text-left[data-v-24b3e6ca] {\n  text-align: left;\n}\n.text-right[data-v-24b3e6ca] {\n  text-align: right;\n}\n.h-top[data-v-24b3e6ca] {\n  height: calc(100vh - 90px);\n}\n.h-top2[data-v-24b3e6ca] {\n  height: calc(100vh - 158px);\n}\n.left[data-v-24b3e6ca] {\n  float: left !important;\n}\n.right[data-v-24b3e6ca] {\n  float: right !important;\n}\n.p-20[data-v-24b3e6ca] {\n  padding: 20px;\n}\n.v-dialog[data-v-24b3e6ca] {\n  box-shadow: none;\n}\n.v-dialog .v-list[data-v-24b3e6ca] {\n  background-color: #ffffff !important;\n  color: #000000 !important;\n}\n.v-dialog .v-list > div[data-v-24b3e6ca]:hover {\n  background-color: #ffffff !important;\n  color: #000000 !important;\n}\n.filemanager[data-v-24b3e6ca] {\n  display: flex;\n  flex-flow: row wrap;\n  overflow: hidden;\n  height: 100%;\n}\n.filemanager .tree-left[data-v-24b3e6ca] {\n  height: 100%;\n  overflow: auto;\n  background: #eee;\n  max-width: 50%;\n  padding: 0 20px 0 0;\n}\n.filemanager .project-box-1[data-v-24b3e6ca] {\n  flex: 1 1 auto;\n  height: 100%;\n  overflow: auto;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PackageManager_vue_vue_type_template_id_59c0366d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(409);
/* harmony import */ var _PackageManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(411);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PackageManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PackageManager_vue_vue_type_template_id_59c0366d___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PackageManager_vue_vue_type_template_id_59c0366d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/devices/wyapp/plugin/views/PackageManager.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PackageManager_vue_vue_type_template_id_59c0366d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(410);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PackageManager_vue_vue_type_template_id_59c0366d___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PackageManager_vue_vue_type_template_id_59c0366d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    { staticClass: "manager-box" },
    [
      _c(
        "v-card-title",
        [
          _c("span", { staticClass: "headline" }, [
            _vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_PACKAGE_MANAGER")))
          ]),
          _vm._v(" "),
          _c("v-spacer")
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-card-text",
        [
          _c(
            "v-tabs",
            {
              staticClass: "tabs-box",
              attrs: { left: "" },
              model: {
                value: _vm.active,
                callback: function($$v) {
                  _vm.active = $$v
                },
                expression: "active"
              }
            },
            [
              _c(
                "v-tab",
                {
                  key: "python",
                  attrs: { ripple: "", disabled: !_vm.knows("python") }
                },
                [_vm._v("\n\t\t\t\tPython\n\t\t\t")]
              ),
              _vm._v(" "),
              _c(
                "v-tab",
                {
                  key: "nodejs",
                  attrs: { ripple: "", disabled: !_vm.knows("nodejs") }
                },
                [_vm._v("\n\t\t\t\tNode JS\n\t\t\t")]
              ),
              _vm._v(" "),
              _c("v-spacer"),
              _vm._v(" "),
              _c(
                "v-form",
                { ref: "form" },
                [
                  _c("v-text-field", {
                    staticClass: "manager-search",
                    attrs: { placeholder: "Search", "append-icon": "search" },
                    model: {
                      value: _vm.search,
                      callback: function($$v) {
                        _vm.search = $$v
                      },
                      expression: "search"
                    }
                  })
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-tabs-items",
            {
              model: {
                value: _vm.active,
                callback: function($$v) {
                  _vm.active = $$v
                },
                expression: "active"
              }
            },
            [
              _c(
                "v-tab-item",
                { key: "python", attrs: { "fill-height": "" } },
                [
                  _c("PackagesList", {
                    attrs: {
                      language: "python",
                      packages: _vm.pythonPackages,
                      working: _vm.working.python
                    },
                    on: { install: _vm.install, uninstall: _vm.uninstall }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-tab-item",
                { key: "nodejs", attrs: { "fill-height": "" } },
                [
                  _c("PackagesList", {
                    attrs: {
                      language: "nodejs",
                      packages: _vm.nodejsPackages,
                      working: _vm.working.nodejs
                    },
                    on: { install: _vm.install, uninstall: _vm.uninstall }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-card-actions",
        [
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-btn",
            { ref: "button", attrs: { text: "" }, on: { click: _vm.close } },
            [_vm._v(_vm._s(_vm.$t("CLOSE")))]
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_PackageManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(412);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_PackageManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 412:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PackagesList_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(413);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


let packagesInstallLogs = {};

function resetPackageLogs (packageName)
{
	delete packagesInstallLogs[packageName];
}

function addPackageLogs (packageName, log)
{
	if (!packagesInstallLogs[packageName]) packagesInstallLogs[packageName] = log;
	else packagesInstallLogs[packageName] = packagesInstallLogs[packageName] + log;
}

function getPackageLogs (packageName)
{
	return packagesInstallLogs[packageName];
}




/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'PackageManager',
	props: ['connection'],
	components: {
		PackagesList: _PackagesList_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
	},
	data () {
		return {
			// dialog: false,
			active: 0,
			packages: {
				python: null,
				nodejs: null
			},
			search: '',
			working: {
				python: {},
				nodejs: {}
			}
		};
	},
	mounted() {
		this.$refs.button.$el.focus();
	}, 
	computed: {
		...Object(vuex__WEBPACK_IMPORTED_MODULE_2__["mapGetters"]) ({
			device: 'workspace/device',
			// connection: 'link/connection',
			// show: 'windows/packageManager'
		}),
		pythonPackages ()
		{
			let search = this.search.trim ().toLowerCase();
			if (this.packages.python && search.length > 0)
			{
				return this.packages.python.filter ((p) => p.name.toLowerCase().indexOf (search) >= 0 || p.description.toLowerCase().indexOf (search) >= 0);
			}
			else return this.packages.python;
		},
		nodejsPackages ()
		{
			let search = this.search.trim ().toLowerCase();
			if (this.packages.nodejs && search.length > 0)
			{
				return this.packages.nodejs.filter ((p) => p.name.toLowerCase().indexOf (search) >= 0 || p.description.toLowerCase().indexOf (search) >= 0);
			}
			else return this.packages.nodejs;
		}
	},
	created ()
	{
		this.connection.send ('pm', {
			a: 'p',
			l: 'python'
		});
		this.connection.send ('pm', {
			a: 'p',
			l: 'nodejs'
		});
		this.connection.on ('tag:pm', this.updatePackages);
	},
	destroyed ()
	{
		this.connection.removeListener ('tag:pm', this.updatePackages);
	},
	methods: {
		knows (languageId)
		{
			return this.device.properties.languages && this.device.properties.languages[languageId];
		},
		updatePackages (data)
		{
			if (data.a === 'p')
			{
				let packages = this.studio.projects.getLanguagePackages (this.device, data.l);
				// console.log (packages);
				for (let packageInformation of data.p)
				{
					packages[packageInformation.n] = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assign ({
						// devices do not report the description and this is used for search
						description: '',
					}, packages[packageInformation.n], {
						name: packageInformation.n,
						version: packageInformation.v,
						installed: true,
						working: false
					});
					delete this.working[data.l][packageInformation.n];
				}
				let packagesData = [];
				for (let name in packages)
				{
					packagesData.push (packages[name]);
					delete this.working[data.l][name];
				}
				this.packages[data.l] = packagesData;
				this.working[data.l] = {
					...this.working[data.l]
				};
			}
			else 
			if (data.a === 'i')
			{
				if (data.e !== undefined)
				{
					if (data.e !== 0)
					{
						this.studio.workspace.showError ('DEVICE_WYAPP_PACKAGE_INSTALL_ERROR', {language: data.l, packageName: data.p, extra: getPackageLogs (data.l+':'+data.p)});
					}
					else
					{
						resetPackageLogs (data.l+':'+data.p);
					}
					this.working[data.l] = {
						...this.working[data.l],
						[data.p]: 'reset'
					};
					this.connection.send ('pm', {
						a: 'p',
						l: data.l
					});
				}
				else
				{
					if (data.out)
					{
						addPackageLogs (data.l+':'+data.p, data.out);
					}
					else
					{
						addPackageLogs (data.l+':'+data.p, data.err);
					}
				}
			}
		},
		esc() {
			this.close();
		}, 
		close ()
		{
			this.$root.$emit ('submit');
		},
		install (data)
		{
			resetPackageLogs (data.languages+':'+data.package.name);
			this.connection.send ('pm', {
				a: 'i',
				l: data.language,
				p: data.package.name
			});
			this.working[data.language]= {
				...this.working[data.language],
				[data.package.name]: 'install'
			};
		},
		uninstall (data)
		{
			this.connection.send ('pm', {
				a: 'u',
				l: data.language,
				p: data.package.name
			});
			this.working[data.language] = {
				...this.working[data.language],
				[data.package.name]: 'uninstall'
			};
		}
	}
});


/***/ }),

/***/ 413:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PackagesList_vue_vue_type_template_id_3ff8a291___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(414);
/* harmony import */ var _PackagesList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(416);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PackagesList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PackagesList_vue_vue_type_template_id_3ff8a291___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PackagesList_vue_vue_type_template_id_3ff8a291___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/devices/wyapp/plugin/views/PackagesList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 414:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PackagesList_vue_vue_type_template_id_3ff8a291___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(415);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PackagesList_vue_vue_type_template_id_3ff8a291___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PackagesList_vue_vue_type_template_id_3ff8a291___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return !_vm.packages
    ? _c(
        "div",
        { staticClass: "h-100" },
        [_c("v-progress-circular", { attrs: { indeterminate: "" } })],
        1
      )
    : _c("div", [
        _c(
          "table",
          { staticClass: "w-100" },
          _vm._l(_vm.packages, function(packageData) {
            return _c("tr", { key: packageData.n, staticClass: "w-100 task" }, [
              _c("td", { staticClass: "w-30" }, [
                _c("h3", [_vm._v(_vm._s(packageData.name))]),
                _vm._v(" "),
                _c("div", [_vm._v(_vm._s(packageData.version))])
              ]),
              _vm._v(" "),
              _c("td", { staticClass: "w-50 d-flex" }, [
                _vm._v(_vm._s(packageData.description))
              ]),
              _vm._v(" "),
              _c("td", { staticClass: "w-20 text-right lib-btn-box" }, [
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value:
                          !_vm.working[packageData.name] &&
                          !(
                            _vm.language === "nodejs" &&
                            packageData.name === "studio-supervisor"
                          ),
                        expression:
                          "!working[packageData.name] && !(language === 'nodejs' && packageData.name === 'studio-supervisor')"
                      }
                    ]
                  },
                  [
                    _c(
                      "v-btn",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: packageData.installed,
                            expression: "packageData.installed"
                          }
                        ],
                        staticClass: "lib-app-btn",
                        attrs: { text: "" },
                        on: {
                          click: function($event) {
                            _vm.uninstall(packageData)
                          }
                        }
                      },
                      [_vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_UNINSTALL")))]
                    ),
                    _vm._v(" "),
                    _c(
                      "v-btn",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: !packageData.installed,
                            expression: "!packageData.installed"
                          }
                        ],
                        staticClass: "lib-app-btn",
                        attrs: { text: "" },
                        on: {
                          click: function($event) {
                            _vm.install(packageData)
                          }
                        }
                      },
                      [_vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_INSTALL")))]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.working[packageData.name],
                        expression: "working[packageData.name]"
                      }
                    ],
                    staticClass: "waiting-box"
                  },
                  [
                    _c("v-progress-circular", {
                      attrs: { size: 20, indeterminate: "" }
                    })
                  ],
                  1
                )
              ])
            ])
          }),
          0
        )
      ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_PackagesList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(417);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_PackagesList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 417:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'PackagesList',
	props: ['language', 'packages', 'working'],
	methods: {
		install (packageData)
		{
			this.$emit ('install', {
				language: this.language,
				package: packageData
			});
		},
		uninstall (packageData)
		{
			this.$emit ('uninstall', {
				language: this.language,
				package:packageData
			});
		}
	}
});


/***/ }),

/***/ 418:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TaskManager_vue_vue_type_template_id_7c769cf2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(419);
/* harmony import */ var _TaskManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(421);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TaskManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TaskManager_vue_vue_type_template_id_7c769cf2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TaskManager_vue_vue_type_template_id_7c769cf2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/devices/wyapp/plugin/views/TaskManager.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TaskManager_vue_vue_type_template_id_7c769cf2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(420);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TaskManager_vue_vue_type_template_id_7c769cf2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TaskManager_vue_vue_type_template_id_7c769cf2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    { staticClass: "manager-box" },
    [
      _c(
        "v-card-title",
        [
          _c("span", { staticClass: "headline" }, [
            _vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_TASK_MANAGER")))
          ]),
          _vm._v(" "),
          _c("v-spacer")
        ],
        1
      ),
      _vm._v(" "),
      _c("v-card-text", [
        !_vm.tasks
          ? _c(
              "div",
              [_c("v-progress-circular", { attrs: { indeterminate: "" } })],
              1
            )
          : _c("div", [
              _c(
                "table",
                { staticClass: "w-100" },
                _vm._l(_vm.tasks, function(task) {
                  return _c(
                    "tr",
                    { key: task.PID, staticClass: "w-100 task" },
                    [
                      _c(
                        "td",
                        { staticClass: "w-50 d-flex" },
                        [
                          _vm.hasTTY(task)
                            ? _c("v-img", {
                                attrs: {
                                  src:
                                    "plugins/devices/wyapp/plugin/data/img/icons/task-icon.svg",
                                  "aria-label": "Task"
                                }
                              })
                            : _c("v-img", {
                                attrs: {
                                  src:
                                    "plugins/devices/wyapp/plugin/data/img/icons/process-icon.svg",
                                  "aria-label": "Process"
                                }
                              }),
                          _vm._v(" "),
                          _c("h3", [_vm._v(_vm._s(task.COMMAND))])
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("td", { staticClass: "w-30 d-flex" }, [
                        _c("span", [_vm._v(_vm._s(task.PID))]),
                        _vm._v(" "),
                        _c("span", [_vm._v(_vm._s(task.CPU))]),
                        _vm._v(" "),
                        _c("span", [
                          _vm._v(_vm._s(_vm.memoryFormat(task.VSZ)))
                        ]),
                        _vm._v(" "),
                        _c("span", [_vm._v(_vm._s(task.TT))])
                      ]),
                      _vm._v(" "),
                      _c(
                        "td",
                        { staticClass: "w-20 text-right lib-btn-box" },
                        [
                          task.sentKill
                            ? _c(
                                "div",
                                { staticClass: "waiting-box" },
                                [
                                  _c("v-progress-circular", {
                                    attrs: { size: 20, indeterminate: "" }
                                  })
                                ],
                                1
                              )
                            : _c(
                                "v-btn",
                                {
                                  staticClass: "lib-app-btn",
                                  attrs: { text: "" },
                                  on: {
                                    click: function($event) {
                                      return _vm.kill(task)
                                    }
                                  }
                                },
                                [_vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_STOP")))]
                              )
                        ],
                        1
                      )
                    ]
                  )
                }),
                0
              )
            ])
      ]),
      _vm._v(" "),
      _c(
        "v-card-actions",
        [
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-btn",
            { ref: "button", attrs: { text: "" }, on: { click: _vm.close } },
            [_vm._v(_vm._s(_vm.$t("CLOSE")))]
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_TaskManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(422);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_TaskManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 422:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'TaskManager',
	props: ['connection'],
	data () {
		return {
			tasks: null
		};
	},
	mounted() {
		this.$refs.button.$el.focus();
	}, 
	computed: {
		...Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"]) ({
			device: 'workspace/device',
		}),
	},
	created () {
		this.connection.send ('tm', {
			a: 'run',
		});
		this.connection.on ('tag:tm', this.updateTasks);
	},
	destroyed () 
	{
		this.connection.send ('tm', {
			a: 'stop'
		});
		this.connection.removeListener ('tag:tm', this.updateTasks);
	},
	methods: {
		updateTasks (data)
		{
			let str = (s1, s2) => 
			{
				if (s1 < s2) return -1;
				else if (s1 === s2) return 0;
				else return 1;
			};
			this.tasks = data.map ((task) => { task.sentKill = false; return task; }).sort ((task1, task2) => {
				if ((task1.TT === '?' && task2.TT === '?') || (task1.TT !== '?' && task2.TT !== '?'))
				{
					return str (task1.COMMAND, task2.COMMAND);
				}
				else if (task1.TT === '?') return 10;
				else return -10;
			});
		},
		memoryFormat (VSZ)
		{
			let vsz = parseInt (VSZ);
			if (isNaN (vsz)) return 'N/A';
			if (vsz < 1024) return vsz+' B';
			else
			if (vsz < 1024*1024) return (vsz/1024).toFixed (2)+' KB';
			else
				return (vsz/(1024*1024)).toFixed (2)+ 'MB';
		},
		hasTTY (task)
		{
			return task.TT !== '?';
		},
		kill (task)
		{
			this.connection.send ('tm', {a: 'exit', PID: task.PID});
			task.sentKill = true;
		},
		esc() {
			this.close();
		}, 
		close ()
		{
			this.$root.$emit ('submit');
		}
	}
});


/***/ }),

/***/ 423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Deployments_vue_vue_type_template_id_32569450_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(424);
/* harmony import */ var _Deployments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(426);
/* empty/unused harmony star reexport *//* harmony import */ var _Deployments_vue_vue_type_style_index_0_id_32569450_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(428);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Deployments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Deployments_vue_vue_type_template_id_32569450_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Deployments_vue_vue_type_template_id_32569450_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "32569450",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/devices/wyapp/plugin/views/Deployments.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 424:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Deployments_vue_vue_type_template_id_32569450_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(425);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Deployments_vue_vue_type_template_id_32569450_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Deployments_vue_vue_type_template_id_32569450_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 425:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    { staticClass: "manager-box" },
    [
      _c(
        "v-card-title",
        [
          _c("span", { staticClass: "headline" }, [
            _vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_DEPLOYMENTS")))
          ]),
          _vm._v(" "),
          _c("v-spacer")
        ],
        1
      ),
      _vm._v(" "),
      _c("v-card-text", [
        !_vm.containers
          ? _c(
              "div",
              [_c("v-progress-circular", { attrs: { indeterminate: "" } })],
              1
            )
          : _vm.containers.length === 0
          ? _c("div", { staticStyle: { "text-align": "center" } }, [
              _c("h2", { staticClass: "text-center font-weight-light" }, [
                _vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_NO_CONTAINERS")))
              ])
            ])
          : _c("div", [
              _c(
                "table",
                { staticClass: "w-100" },
                _vm._l(_vm.containers, function(container) {
                  return _c(
                    "tr",
                    { key: container.ID, staticClass: "w-100 task" },
                    [
                      _c(
                        "td",
                        { staticClass: "w-50 d-flex" },
                        [
                          container.studio === true
                            ? _c("v-img", {
                                attrs: {
                                  src:
                                    "plugins/devices/wyapp/plugin/data/img/icons/wyliodrin-studio-logo.png"
                                }
                              })
                            : _c("v-img", {
                                attrs: {
                                  src:
                                    "plugins/devices/wyapp/plugin/data/img/icons/docker3.svg",
                                  "aria-label": "Container"
                                }
                              }),
                          _vm._v(" "),
                          _c("h3", [_vm._v(_vm._s(container.title))])
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("td", { staticClass: "status-container" }, [
                        _c("div", {
                          class: _vm.status(container),
                          attrs: {
                            alt: container.state,
                            title: container.state
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c(
                        "td",
                        { staticClass: "w-30 d-flex" },
                        [
                          _c("v-spacer"),
                          _vm._v(" "),
                          _c("span", [_vm._v(_vm._s(container.status))])
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "td",
                        { staticClass: "w-20 text-right lib-btn-box" },
                        [
                          container.sentKill
                            ? _c(
                                "div",
                                { staticClass: "waiting-box" },
                                [
                                  _c("v-progress-circular", {
                                    attrs: { size: 20, indeterminate: "" }
                                  })
                                ],
                                1
                              )
                            : container.sentDell
                            ? _c(
                                "div",
                                { staticClass: "waiting-box" },
                                [
                                  _c("v-progress-circular", {
                                    attrs: { size: 20, indeterminate: "" }
                                  })
                                ],
                                1
                              )
                            : container.state === "created"
                            ? _c(
                                "v-btn",
                                {
                                  staticClass: "lib-app-btn",
                                  attrs: { text: "" },
                                  on: {
                                    click: function($event) {
                                      return _vm.stop(container)
                                    }
                                  }
                                },
                                [_vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_STOP")))]
                              )
                            : container.state === "running"
                            ? _c(
                                "v-btn",
                                {
                                  staticClass: "lib-app-btn",
                                  attrs: { text: "" },
                                  on: {
                                    click: function($event) {
                                      return _vm.stop(container)
                                    }
                                  }
                                },
                                [_vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_STOP")))]
                              )
                            : container.state === "restarting"
                            ? _c(
                                "v-btn",
                                {
                                  staticClass: "lib-app-btn",
                                  attrs: { text: "" },
                                  on: {
                                    click: function($event) {
                                      return _vm.stop(container)
                                    }
                                  }
                                },
                                [_vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_STOP")))]
                              )
                            : _c(
                                "v-btn",
                                {
                                  staticClass: "lib-app-btn",
                                  attrs: { text: "" },
                                  on: {
                                    click: function($event) {
                                      return _vm.del(container)
                                    }
                                  }
                                },
                                [_vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_DELETE")))]
                              )
                        ],
                        1
                      )
                    ]
                  )
                }),
                0
              )
            ])
      ]),
      _vm._v(" "),
      _c(
        "v-card-actions",
        [
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-btn",
            { ref: "button", attrs: { text: "" }, on: { click: _vm.close } },
            [_vm._v(_vm._s(_vm.$t("CLOSE")))]
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 426:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_Deployments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(427);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_Deployments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 427:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'Deployments',
	props: ['connection'],
	data () {
		return {
			containers: null
		};
	},
	mounted() {
		this.$refs.button.$el.focus();
	}, 
	computed: {
		...Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"]) ({
			device: 'workspace/device',
		})
	},
	created () {
		this.connection.send ('dep', {
			a: 'run',
		});
		this.connection.on ('tag:dep', this.updateContainers);
	},
	destroyed ()
	{
		this.connection.send ('dep', {
			a: 'stop'
		});
		this.connection.removeListener ('tag:dep', this.updateContainers);
	},
	methods: {
		updateContainers (data)
		{
			this.containers = data.map((container) => { container.sentKill = false; container.sentDell = false; return container;}).sort((container1,container2)=>{
				if(container1.studio === true && container2.studio === false){
					return -1;
				}
				else if(container1.studio === false && container2.studio === true) {
					return 1;
				}
				else 
				{
					if(container1.title < container2.title ) 
						return -1;
					else if (container1.title > container2.title) {
						return 1;
					}
					else return 0;
				}
			});	
		},

		status (container) {
			if (container.state === 'running') {
				return 'green';
			}
			else
			if (container.status.substr(0,10) === 'Exited (0)')
			{
				return 'grey';
			}
			if (container.status.substr(0,14) === 'Restarting (0)')
			{
				return 'yellow';
			}
			else
			if (container.state === 'created') {
				return 'yellow';
			}
			else
			{
				return 'red';
			}
		},
		
		stop (container)
		{
			this.connection.send ('dep', {a: 'exit', ID: container.ID}); 
			container.sentKill = true;
		},
		del(container)
		{
			this.connection.send ('dep', {a: 'delete', ID: container.ID});
			container.sentDell = true;
		},
		esc() {
			this.close();
		}, 
		close ()
		{
			this.$root.$emit ('submit');
		}
	}
});


/***/ }),

/***/ 428:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Deployments_vue_vue_type_style_index_0_id_32569450_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(429);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Deployments_vue_vue_type_style_index_0_id_32569450_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Deployments_vue_vue_type_style_index_0_id_32569450_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Deployments_vue_vue_type_style_index_0_id_32569450_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Deployments_vue_vue_type_style_index_0_id_32569450_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Deployments_vue_vue_type_style_index_0_id_32569450_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 429:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(430);
            var content = __webpack_require__(431);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 431:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.status-container[data-v-32569450] {\n\tposition: relative;\n}\n.status-container > div[data-v-32569450] {\n\tposition: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    margin: 0;\n}\n.green[data-v-32569450] {\n\tbackground-color: green;\n\theight: 15px;\n\twidth: 15px;\n\tborder-radius: 100px;\n}\n.red[data-v-32569450] {\n\tbackground-color: red;\n\theight: 15px;\n\twidth: 15px;\n\tborder-radius: 100px;\n}\n.yellow[data-v-32569450] {\n\tbackground-color: orange;\n\theight: 15px;\n\twidth: 15px;\n\tborder-radius: 100px;\n}\n.grey[data-v-32569450] {\n\tbackground-color: grey;\n\theight: 15px;\n\twidth: 15px;\n\tborder-radius: 100px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DockerSettings_vue_vue_type_template_id_0e1a1e49___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(433);
/* harmony import */ var _DockerSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(435);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DockerSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DockerSettings_vue_vue_type_template_id_0e1a1e49___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DockerSettings_vue_vue_type_template_id_0e1a1e49___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/devices/wyapp/plugin/views/DockerSettings.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 433:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DockerSettings_vue_vue_type_template_id_0e1a1e49___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(434);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DockerSettings_vue_vue_type_template_id_0e1a1e49___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DockerSettings_vue_vue_type_template_id_0e1a1e49___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    [
      _c(
        "v-card-title",
        [
          _c("span", { staticClass: "headline" }, [
            _vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_RUN_DEPLOY")))
          ]),
          _vm._v(" "),
          _c("v-spacer")
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-card-text",
        [
          _c(
            "v-layout",
            { attrs: { wrap: "" } },
            [
              _c("v-select", {
                staticClass: "col-md-6",
                attrs: {
                  label: _vm.$t("DEVICE_WYAPP_PROCESS_OPTIONS"),
                  items: _vm.processOptions,
                  "item-text": "title",
                  "item-value": "value"
                },
                model: {
                  value: _vm.selectedOption,
                  callback: function($$v) {
                    _vm.selectedOption = $$v
                  },
                  expression: "selectedOption"
                }
              }),
              _vm._v(" "),
              _c("v-select", {
                staticClass: "col-md-6",
                attrs: {
                  label: _vm.$t("DEVICE_WYAPP_RESTART_OPTIONS"),
                  items: _vm.restartOptions,
                  "item-text": "title",
                  "item-value": "value"
                },
                model: {
                  value: _vm.selectedRestart,
                  callback: function($$v) {
                    _vm.selectedRestart = $$v
                  },
                  expression: "selectedRestart"
                }
              }),
              _vm._v(" "),
              _c("v-checkbox", {
                staticClass: "col-md-12",
                attrs: { label: _vm.$t("DEVICE_WYAPP_REMOVE_CONTAINER") },
                model: {
                  value: _vm.remove,
                  callback: function($$v) {
                    _vm.remove = $$v
                  },
                  expression: "remove"
                }
              }),
              _vm._v(" "),
              _c("v-select", {
                staticClass: "col-md-6",
                attrs: {
                  items: _vm.networkOptions,
                  "item-text": "title",
                  "item-value": "value",
                  label: _vm.$t("DEVICE_WYAPP_NETWORK_OPTIONS")
                },
                model: {
                  value: _vm.selectedNetwork,
                  callback: function($$v) {
                    _vm.selectedNetwork = $$v
                  },
                  expression: "selectedNetwork"
                }
              }),
              _vm._v(" "),
              _c("v-checkbox", {
                staticClass: "col-md-6",
                attrs: { label: _vm.$t("DEVICE_WYAPP_PRIVILEGED_CONTAINER") },
                model: {
                  value: _vm.privileged,
                  callback: function($$v) {
                    _vm.privileged = $$v
                  },
                  expression: "privileged"
                }
              }),
              _vm._v(" "),
              _c("v-text-field", {
                staticClass: "col-md-12",
                attrs: { label: _vm.$t("DEIVCE_WYAPP_ADDITIONAL_OPTIONS") },
                model: {
                  value: _vm.textInput,
                  callback: function($$v) {
                    _vm.textInput = $$v
                  },
                  expression: "textInput"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-card-actions",
        [
          _c("v-spacer"),
          _vm._v(" "),
          _c("v-btn", { attrs: { text: "" }, on: { click: _vm.close } }, [
            _vm._v(_vm._s(_vm.$t("CLOSE")))
          ]),
          _vm._v(" "),
          _c(
            "v-btn",
            { attrs: { text: "" }, on: { click: _vm.send_options } },
            [_vm._v(_vm._s(_vm.$t("DEVICE_WYAPP_DEPLOY")))]
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 435:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_DockerSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(436);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_DockerSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 436:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


let datas = null;

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'DockerSettings',
	props: ['project'],
	data () {
		datas = {
			processOptions:[
				{
					title: this.$t('DEVICE_WYAPP_DETACHED') ,
					value: 'detached'
				},
				{
					title: this.$t('DEVICE_WYAPP_INTERACTIVE_CONSOLE') ,
					value: 'interactive'
				}
			],
			selectedOption: 'interactive',
			remove: true,
			restartOptions :[
				{
					title: this.$t('DEVICE_WYAPP_NO_RESTART'),
					value: 'no'
				},
				{
					title: this.$t('DEVICE_WYAPP_RESTART_ON_FAILURE'),
					value: 'on-failure',
				},
				{
					title: this.$t('DEVICE_WYAPP_RESTART_ALWAYS'),
					value: 'always'
				},
				{
					title: this.$t('DEVICE_WYAPP_RESTART_UNLESS_STOPPED'),
					value: 'unless-stopped'
				}
			],
			selectedRestart: 'no',

			networkOptions:[
				{
					title: this.$t('DEVICE_WYAPP_DEFAULT_NETWORK'),
					value: 'default'
				},
				{
					title: this.$t('DEVICE_WYAPP_HOST_NETWORK'),
					value: 'host'
				}
			],
			selectedNetwork: 'default',
			privileged: false,
			textInput:'',
		};			
		return datas;		
	},

	computed: {
		...Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"]) ({
			device: 'workspace/device',
		}),
	},

	async created ()
	{
		try {
			let data = await this.studio.projects.loadSpecialFile(this.project, 'docker.json');
			data = JSON.parse(data);
			this.selectedOption = data.selectedOption;
			this.selectedNetwork = data.selectedNetwork;
			this.selectedRestart = data.selectedRestart;
			this.remove = data.remove;
			this.privileged = data.privileged;
			
		} catch (error) {
			this.studio.workspace.warn ('error loading docker.json '+error.message);
		}
	},

	methods: {
		close ()
		{
			this.$root.$emit ('submit',false);
		},
		send_options ()
		{
			this.$root.$emit('submit', datas);
		}
	}
	
});


/***/ })

}]);