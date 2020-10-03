import SerialConnectionDialog from './views/SerialConnectionDialog.vue';
import BrateConnectionBrowser from './views/BrateConnectionBrowser.vue';
import ChromeFlagSetup from './views/ChromeFlagSetup.vue';
import MPFileManager from './views/MPFileManager.vue';
import {SerialPort} from './serial.js';
import serial from './serial.js';
import {MicroPython, STATUS_RUNNING, STATUS_STOPPED} from './mpy.js';
import _ from 'lodash';

let studio = null;
let workspace = null;
let devices = [];

let serialDevices = [];


let connections = {};
//let SerialPortlist = null;
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
		ports = await serial.list ();
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
			if(serialDevice.vendorId === /*'2a03'*/'1a86' && serialDevice.productId === /*'0043'*/'7523' )
			{
				let name = 'MP'.toString();
				let description = '';
				let id = 'mp:serial:' + serialDevice.path;//.toString().toLowerCase();
				devices.push({
					id: id,
					address: serialDevice.path,
					description,
					name,
					connection:'serial',
					icon:'plugins/devices/mp/data/img/icons/mp.png',
					board:'mp',
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


function updateDevices(){
	let add = [];
	if (serialDevices.length === 0 && devices.length === 0) {
		add.push({
			id: 'mp:newdevice',
			address: '',
			name: studio.workspace.vue.$t('MicroPython'),
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
	serial.setup(studio);
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
			if(navigator.serial !== undefined)
			{
				if(_.isObject(device))
				{
					let options = null;
					if(studio.system.platform() === 'electron')
					{
						options = await studio.workspace.showDialog (SerialConnectionDialog, {
							device: device,
							width: '500px'
						});
					}
					else
					{
						options = await studio.workspace.showDialog (BrateConnectionBrowser, {
							device: device,
							width: '500px'
						});
					}

					if(options != null)
					{
						device.status = 'CONNECTING';
						updateDevices();

						let port = new SerialPort();

						let mp = new MicroPython(port);
						ports[device.id]=mp;

						ports[device.id].on('connected',()=>{
							device.status = 'CONNECTED';
							device.running = false;
							updateDevice(device);
							studio.shell.select(device.id);
							studio.notebook.setStatus (null, 'READY');

							studio.console.select (device.id);

							studio.console.reset();
							studio.console.show ();
                                                        
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

						port.connect(options.port,options.baudrate);
                                                        
					}
                                                
                                                
				}
			}
			else
			{
				await studio.workspace.showDialog (ChromeFlagSetup, {
					device: device,
					width: '650px'
				});
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
						ports[device.id].close();
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
					mp.getPort().close();
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
				if (project.language === 'python') {
					pySource = await studio.projects.getCurrentFileCode();
					let mp = ports[device.id];
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
                        
			/* Here goes the actual code that will make your device stop a project */
        
			let project = await studio.projects.getCurrentProject();
        
			if (project) {
				if (project.language === 'python') {
					let mp = ports[device.id];
					await mp.stop();
					device.running = false;
					updateDevice (device);
					// device.running = false;
					// updateDevice(device);
				}
        
			}
        
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
                        
			/* Here goes the actual code that will make your device stop a project */
        
			let project = await studio.projects.getCurrentProject();
        
			if (project) {
				if (project.language === 'python') {
					let mp = ports[device.id];
					await mp.reset();
				}
        
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
                
			/* Here goes the actual code that will make your device run a project */

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

		// FILES TEST
                
		workspace.registerDeviceToolButton('DEVICE_MP_FILESTEST', 10, async () => {
			let device = studio.workspace.getDevice();
                
			/* Here goes the actual code that will make your device run a project */
			console.log('Files');

			let project = await studio.projects.getCurrentProject();
         
			let mp = ports[device.id];
			console.log(await mp.rm('/test/t.py'));


		}, 'plugins/devices/mp/data/img/icons/fileexplorer-icon.svg',

                
		/* The aditional options that make the Run Button visible and enabled only if there is a connected device
		                and its type is "awesome" */
		{
			enabled () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.type === 'mp' && device.running === false);
			},
		});

		// FILES TEST


		// DEPLOY
		
		workspace.registerDeviceToolButton('DEVICE_MP_DEPLOY', 10, async () => {
			let device = studio.workspace.getDevice();
                
			/* Here goes the actual code that will make your device run a project */

			let project = await studio.projects.getCurrentProject();
			let mp = ports[device.id];
			if(project)
			{
				if (project.language === 'python') {
					let pySource = await studio.projects.getCurrentFileCode();
					let content = Buffer.from(pySource).toString();
					let path = "/"+project.name+".py";
					await mp.put(path, content);
				}
			}


		}, 'plugins/devices/mp/data/img/icons/run-icon.svg',

                
		/* The aditional options that make the Run Button visible and enabled only if there is a connected device
		                and its type is "awesome" */
		{
			enabled () {
				let device = studio.workspace.getDevice ();
				return (device.status === 'CONNECTED' && device.type === 'mp' && device.running === false);
			},
		});

		// DEPLOY

		

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
					address: '',
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