import MicroPythonConnectionDialog from './views/MicroPythonConnectionDialog.vue';
import EdgeOrChrome from './views/EdgeOrChrome.vue';
import UpgradeToHttps from './views/UpgradeToHttps.vue';
import MPFileManager from './views/MPFileManager.vue';
import {MicroPython, STATUS_RUNNING, STATUS_STOPPED} from './mpy.js';
import _ from 'lodash';

let studio = null;
let workspace = null;
let devices = [];
let serialport = null;

let serialDevices = [];


let connections = {};
let ports = {};


function updateDevice (device)
{
	// deviceEvents.emit ('update:'+device.id, device);
	workspace.updateDevice (device);
}

// function loadSerialPort ()
// {
//         try
//         {
//                 return eval ('require(\'serialport\')');
//         }
//         catch (e)
//         {

//                 studio.workspace.error ('device_mp: mp is not available '+e.message);
//                 return {
//                         list: function ()
//                         {
//                                 return [
//                                 ];
//                         }
//                 };
//         }
// }


async function listSerialPorts()
{
	let ports = [];
	try
	{
		ports = await serialport.list ();
	}
	catch (e)
	{
		studio.workspace.error ('device_mp: failed to list mp '+e.message);
	}
	return ports;
}



// function listPorts() {
//         SerialPort.list().then(
//          ports => {
//           ports.forEach(port => {
//            console.log(`${port.comName}\t${port.pnpId || ''}\t${port.manufacturer || ''}`)
//           })
//          },
//          err => {
//           console.error('Error listing ports', err)
//          }
//         )
//        }

        

function searchSerialDevices(){

	/*setInterval(*/ async function search(){
		let serial_devices =  await listSerialPorts();
		devices = [];

		for(let serialDevice of serial_devices)
		{
			if(serialDevice.vendorId || serialDevice.productId || serialDevice.manufacturer)
			{
				let description = '';
				let id = 'mp:serial:' + serialDevice.path;//.toString().toLowerCase();
				devices.push({
					id: id,
					address: serialDevice.path,
					description,
					name: serialDevice.manufacturer || serialDevice.path,
					connection:'serial',
					icon:'plugins/devices/mp/data/img/icons/mp.png',
					board:'any',
					// python: 'autodetect', TODO estimate based on productId, vendorId and manufacturer
					status:'',
					properties: {
						productId: serialDevice.productId,
						vendorId: serialDevice.vendorId,
						locationId: serialDevice.locationId,
						serialNumber: serialDevice.serialNumber,
						pnpId: serialDevice.pnpId,
					},
					priority: workspace.DEVICE_PRIORITY_HIGH

				});
			}
		}

                        

		serialDevices = devices;

                        
		updateDevices();
		setTimeout(search, 10000);                       
                        
	}
	//},3000);
	search();
	//console.log(serialDevices);
     
                        

        
}

function pythonIcon (variant) {
	let icon = 'plugins/devices/mp/data/img/icons/mp.png';
	if (variant === 'circuitpython') icon = 'plugins/devices/mp/data/img/icons/circuitpython.png';
	return icon;
}


function updateDevices(){
	let add = [];
	if (serialDevices.length === 0 && devices.length === 0) {
		add.push({
			id: 'mp:newdevice',
			address: 'WebSerial',
			name: 'MicroPython',
			board: 'any',
			priority: workspace.DEVICE_PRIORITY_PLACEHOLDER,
			placeholder: true
		});
	}
        
	if(studio.system.platform() === 'browser')
		workspace.updateDevices([...devices, ...serialDevices, ...add]);
	else
		workspace.updateDevices([...serialDevices]);
}

export function setup (options, imports, register)
{
	studio = imports;
	serialport = imports.serialport;
	searchSerialDevices();
	//SerialPortlist = loadSerialPort();
	///let event = 'data';
	studio.shell.register((event,id,data)=>
	{
		if (event === 'data')
		{
			if(ports[id])
			{
				ports[id].write(Buffer.from(data+''));
			}
		}
	});

	studio.console.register ((event, id, data) =>
	{
		if (event === 'data')
		{
			if(ports[id])
			{
				ports[id].write(Buffer.from(data+''));
			}
		}
	});

	studio.notebook.register ((event, ...data) =>
	{
		let device = studio.workspace.getDevice ();
		if(device.type === 'mp' && device.status === 'CONNECTED' && ports[device.id])
		{
			let mp = new MicroPython(ports[device.id]); //ports[device.id] = new MP
			if (event === 'run')
			{
				let commands = (data[1]+'\n\n').replace(/\r?\n/g, '\r\n');
				mp.enterRawRepl();
				mp.writeRawRepl(commands);
				studio.notebook.setStatus (null, 'RUNNING');
			}
			else if(event === 'stop')
			{
				mp.stop();
				studio.notebook.setStatus (null, 'READY');
			}
			else if (event === 'reset')
			{
				// "PRESS THE RESET BUTTON ON THE BOARD"
			}
		}
	});
        
	let device_mp = {
		defaultIcon() {
			return 'plugins/devices/mp/data/img/icons/mp.png';
		},

		getBoardIcon () {
			return this.defaultIcon ();
		},

		registerForUpdate (/*device, fn*/)
		{
			//deviceEvents.on ('update:'+device.id, fn);
			return null;//() => deviceEvents.removeListener ('update:'+device.id, fn);
		},

		getConnections ()
		{
			let connections = [];
			for (let deviceId in connections)
			{
				connections.push (connections[deviceId].device);
			}
			return null;//connections;
		},

		async connect(device/*, options*/)
		{
			if(serialport.isAvailable ())
			{
				if(_.isObject(device))
				{

					let port = new serialport.SerialPort();
					if (await port.start ())
					{
						let options = await studio.workspace.showDialog (MicroPythonConnectionDialog, {
							device: device,
							width: '500px'
						});
						if (options) 
						{
							let mp = new MicroPython(port);

							device.status = 'CONNECTING';
							device.icon = pythonIcon (options.python);
							updateDevices();

							mp.connect (options);

							

							
							ports[device.id]=mp;

							mp.on('connected',()=>{
								device.status = 'CONNECTED';
								device.running = false;
								updateDevice(device);
								studio.shell.select(device.id);
								studio.notebook.setStatus (null, 'READY');

								studio.console.select (device.id);

								studio.console.reset();
								studio.console.show ();
															
							});

							mp.on('board', (board)=>{
								device.name = board.name;
								device.python = board.python;
								device.version = board.python;
								device.address = device.address+' ('+board.python+'@'+board.version+')';
								device.icon = pythonIcon (device.python);
								updateDevice (device);
							});

							mp.on('status', (status)=>{
								if (status === STATUS_RUNNING) {
									device.running = true;
									updateDevice (device);
								}
								else
								if (status === STATUS_STOPPED) {
									device.running = false;
									updateDevice (device);
								}
							});

							mp.on('data', (data)=>
							{
								studio.shell.write(device.id, Buffer.from(data).toString());
								studio.console.write(device.id, Buffer.from(data).toString());
							});

							mp.on('error',(err) => {

								device.status = 'DISCONNECTED';
								updateDevice(device);
								studio.workspace.showError ('ERROR', {extra: err.message});
								delete connections[device.id];
								delete ports[device.id];                
								//studio.workspace.showError ('MP_SERIAL_CONNECTON_ERROR', {extra: err.message});
							});
															
															

							ports[device.id].on('close',() => {
																					
								device.status = 'DISCONNECTED';
								workspace.updateDevice(device);
								studio.console.close();
								delete connections[device.id];
								delete ports[device.id];
							});                                                        
						}
					}                                                  
				}
			}
			else
			{	
				let chrome = !!window.chrome;
				let https = (location.protocol === 'https:');

				if(chrome == false) 
				{
					await studio.workspace.showDialog (EdgeOrChrome, {
						width: '500px'
					});
				} else if(https == false) 
				{
					await studio.workspace.showDialog (UpgradeToHttps, {
						width: '500px'
					});
				} else 
				{			
					await studio.workspace.showDialog (EdgeOrChrome, {
						width: '500px'
					});
				}
			}

			setTimeout(() => {
				device.status = 'CONNECTED';
			}, 1000);
			return device;
                        
		},

                


		disconnect(device, /*options*/)
		{
			/* Here goes the actual code that you will write in order to connect the device. */

			let mp = ports[device.id];
                        
			if (studio.system.platform () === 'electron')
			{
				//ELECTRON

				if(_.isObject(device))
				{
					if(device)
					{
						mp.close();
					}
					device.status = 'DISCONNECTED';
					updateDevice(device);
					studio.console.reset();
                                       
                                                                
					delete connections[device.id];
				}
                                
			}
			else
			{
				//BROWSER
				if(device)
				{
					//ports[device.id].close();
					mp.close();
				}
				device.status = 'DISCONNECTED';
				updateDevice(device);
				studio.console.reset();                     
				//delete connections[device.id];
				delete connections[mp.getPort()];
			}
                        
			setTimeout(() => {
				device.status = 'DISCONNECTED';
			}, 1000);
		}

        
	};

	workspace = studio.workspace.registerDeviceDriver('mp', device_mp);
                
	if(workspace){
		workspace.registerDeviceToolButton('DEVICE_MP_RUN', 10, async () => {
			let device = studio.workspace.getDevice();
                
			/* Here goes the actual code that will make your device run a project */

			let project = await studio.projects.getCurrentProject();

			if (project) {
				let pySource;
				if (project.language === 'python' || project.language === 'visual') {
					let runFilename = await studio.projects.getDefaultRunFileName(project);
					pySource = await studio.projects.loadFile(project, runFilename);
					let mp = ports[device.id];
					studio.console.reset ();
					if (await mp.enterRawRepl())
					{
						device.running = true;
						updateDevice (device);
						if (!await mp.run (pySource)) {
							// device.running = false;
							// updateDevice (device);
							// TODO show error
						}
					}
					else 
					{
						// TODO show error
					}
				}

			}

		}, 'plugins/devices/mp/data/img/icons/run-icon.svg',

                
		/* The aditional options that make the Run Button visible and enabled only if there is a connected device
                        and its type is "awesome" */
		{
			visible () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.type === 'mp' && device.running === false);
			},
			enabled () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.type === 'mp' && device.running === false);
			},
			type: 'run'
		});

                

		workspace.registerDeviceToolButton('DEVICE_MP_STOP', 10, async () => {
			let device = studio.workspace.getDevice();
        
			let mp = ports[device.id];
			await mp.stop();
			device.running = false;
			updateDevice (device);
        
		}, 'plugins/devices/mp/data/img/icons/stop-icon.svg',
        
                        
		/* The aditional options that make the Run Button visible and enabled only if there is a connected device
                        and its type is "awesome" */
		{
			visible () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.type === 'mp' && device.running === true);
			},
			enabled () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.type === 'mp' && device.running === true);
			},
			type: 'stop'
		});
                        
                        

		//RESTART


		workspace.registerDeviceToolButton('DEVICE_MP_RESTART', 10, async () => {
			let device = studio.workspace.getDevice();
        
			if (device && ports[device.id])
			{
				let mp = ports[device.id];
				await mp.reset();
			}
        
		}, 'plugins/devices/mp/data/img/icons/restart-icon.svg',
        
                        
		/* The aditional options that make the Run Button visible and enabled only if there is a connected device
                        and its type is "awesome" */
		{
			visible () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.type === 'mp');
			},
			enabled () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.type === 'mp');
			},
			type: 'stop'
		});        


		// FILES
                
		workspace.registerDeviceToolButton('DEVICE_MP_FILES', 10, async () => {
			let device = studio.workspace.getDevice();

			// let project = await studio.projects.getCurrentProject();

                        
			// let mp = await ports[device.id];
			// console.log (await mp.listdir ('/'));
			let mp = ports[device.id];

			await studio.workspace.showDialog (MPFileManager, {
				width: 800,
				mp : mp
			});


		}, 'plugins/devices/mp/data/img/icons/fileexplorer-icon.svg',

                
		/* The aditional options that make the Run Button visible and enabled only if there is a connected device
		                and its type is "awesome" */
		{
			enabled () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.type === 'mp' && device.running === false);
			},
		});

		// DEPLOY
		
		workspace.registerDeviceToolButton('DEVICE_MP_DEPLOY', 10, async () => {
			let device = studio.workspace.getDevice();
                
			let mp = ports[device.id];
			let project = await studio.projects.getCurrentProject();
			let name = project.name;
			await mp.mkdir(name);
			if(project)
			{
				if (project.language === 'python') {
					let structure = await studio.projects.generateStructure(project);
					let childrens = structure.children;
					for(let i = 2 ; i < childrens.length ; i++)
					{
						let cod = await studio.projects.getFileCode(project, childrens[i].name);
						await mp.put(name+'/'+childrens[i].name , cod);
					}

				}
			}


		}, 'plugins/devices/mp/data/img/icons/deploy.png',

                
		/* The aditional options that make the Run Button visible and enabled only if there is a connected device
		                and its type is "awesome" */
		{
			enabled () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.type === 'mp' && device.running === false);
			},
		});	

		if (studio.system.platform () === 'electron')
		{
			//ELECTRON

			//searchSerialDevices();
		}
		else
		{
			//BROWSER

			devices = [
				{
					id: 'mp:web',
					address: 'WebSerial',
					name: 'MicroPython',
					board: 'any',
					connection: 'web-usb',
					priority: workspace.DEVICE_PRIORITY_PLACEHOLDER,
					placeholder: true,
				}
			];
			updateDevices();

		}

		register(null, {
			device_mp
		});
   
                
	}
}