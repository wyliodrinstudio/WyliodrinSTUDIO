
//import ESPDisconnectDialog from './views/ESPDisconnectDialog.vue'
import ESPDeviceSetup from './views/ESPDeviceSetup.vue';


import _, { update } from 'lodash';
import { Search } from 'brace';
import SerialConnectionDialog from './views/SerialConnectionDialog.vue';
import ChromeFlagSetup from './views/ChromeFlagSetup.vue';


import path from 'path';

let studio = null;
let workspace = null;
let devices = [];

let serialDevices = [];


let connections = {};
let SerialPort = null;


function updateDevice (device)
{
	// deviceEvents.emit ('update:'+device.id, device);
	workspace.updateDevice (device);
}

function loadSerialPort ()
{
        try
        {
                return eval ('require(\'serialport\')');
        }
        catch (e)
        {

                studio.workspace.error ('device_esp: esp is not available '+e.message);
                return {
                        list: function ()
                        {
                                return [
                                ];
                        }
                };
        }
}

async function listSerialPorts()
{
        let ports = [];
        try
        {
                ports = await SerialPort.list ();
        }
        catch (e)
        {
                studio.workspace.error ('device_esp: failed to list esp '+e.message);
        }
        return ports;
}

function getConnectedDevice (id)
{
	let device = null;
	let connection = connections[id];
	if (connection) device = connection.device;
	return device;
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

        setInterval(async ()=> {
                        let serial_devices =  await listSerialPorts();
                        devices = [];
                        console.log("devices");
                        console.log(serial_devices);
                        // console.log('wtf');
                        // if(isElectron()){
                        //         console.log("Electron");
                        //     }else{
                        //         console.log("browser");
                        //     }
                        // // 

                        for(let serialDevice of serial_devices)
                        {
                                if(serialDevice.vendorId === '2a03' && serialDevice.productId === '0043' )
                                {
                                        let name = 'NodeMCU_(ESP8266)'.toString();
                                        let description = '';
                                        let id = serialDevice.productId;//.toString().toLowerCase();
                                        console.log(id);
                                        devices.push({
                                                id: id,
                                                adress: serialDevice.path,
                                                description,
                                                name,
                                                connection:'serial',
                                                icon:'plugins/device.esp/data/img/icons/esp.png',
                                                board:'any',
                                                status:'',
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
                        console.log('heheheh');
                        console.log(devices);
                        updateDevices();
                        

                },10000);
        
}


function updateDevices(){
        let add = [];
        if (serialDevices.length === 0 && devices.length === 0)
        {
                add.push({
                        id: 'esp:new device',
                        address:'',
                        name: studio.workspace.vue.$t('NodeMCU_ESP8266'),
			board: 'any',
			priority: workspace.DEVICE_PRIORITY_PLACEHOLDER,
			placeholder: true
                });
        }
        workspace.updateDevices([...devices, ...add]);//??
}

export function setup (options, imports, register)
{
        studio = imports;
        SerialPort = loadSerialPort();
        searchSerialDevices();
        console.log(SerialPort);
        //console.log(process.versions.electron);

        let device_esp = {
		defaultIcon() {
			return 'plugins/device.esp/data/img/icons/esp.png';
                },

                registerForUpdate (device, fn)
                {
                        deviceEvents.on ('update:'+device.id, fn);
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

                connect(device/*, options*/)
                {
                        /* Here goes the actual code that you will write in order to connect the device. */

                        if (studio.system.platform () === 'electron')
                        {
                                console.log("checking");
                                if(_.isObject(device))
                                {
                                        //daca nu e nimic conectat
                                        if(device.id === "esp:new device")
                                        {
                                                studio.workspace.showDialog(ESPDeviceSetup,{width: '500px'});
					        return null;
                                        }
                                }
                                else{
                                        if(device.connection === 'serial'){

                                                ports[device.id] = new SerialPort(device.address,(err)=>{
                                                        if(err){
                                                                device.status = 'DISCONNECTED';
                                                                //updateDevice(device);
                                                                studio.workspace.showError ('ESP_SERIAL_CONNECTON_ERROR', {extra: err.message});
								delete connections[device.id];
								delete ports[device.id];
                                                        }
                                                        else
                                                        {
                                                                device.status = 'CONNECTED';
                                                                studio.workspace.showDialog(SerialConnectionDialog,{width: '500px'});
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
                                                        studio.workspace.showError ('ESP_SERIAL_CONNECTON_ERROR', {extra: err.message});
                                                });
                                                ports[device.id].on('close', () => {
                                                        // console.log(data.toString());
                                                        device.status = 'DISCONNECTED';
                                                        updateDevice(device);
                                                        delete connections[device.id];
                                                        delete ports[device.id];
                                                });
                                                return device;
                                        }


                                }

                        }
                        else
                        {
                                //BROWSER

                                if(navigator.serial != undefined)
                                {
                                
                                        async function connectFromBrowser() {

                                                //Filtru pentru un VendorID specific

                                                // const requestOptions = {    
                                                //         filters: [{ vendorId: 0x2341 }],
                                                // };

                                                //Cererea permisiuni de conectare
                                                const portConnect = await navigator.serial.requestPort();
                                                console.log(portConnect);
                                                
                                                //Citirea de pe port
                                                await portConnect.open({ baudrate: 115200 });
                                                device.status='CONNECTED';
                                                workspace.updateDevice(device);
                                                studio.shell.select (device.id);
                                                console.log(portConnect);
                                                const reader = portConnect.readable.getReader();
                                                console.log(await reader.read());
                                                do{

                                                let {done,value} = await reader.read();
                                                
                                                console.log(Buffer.from(value).toString());
                                                
                                                if(done)
                                                {
                                                         break;
                                                }
                                                else
                                                {
                                                        studio.shell.write(device.id, Buffer.from(value).toString());
                                                }

                                                }while(true);
                                                
                                                // for await (const { done, data } of reader.read()) {
                                                //         if (done) break;
                                                //         console.log(data);
                                                // }
                                        }
                                        connectFromBrowser();

                                        

                                }
                                else
                                {
                                        studio.workspace.showDialog(ChromeFlagSetup,{width: '500px'});
                                }        


                        }

                        setTimeout(() => {
                                device.status = 'CONNECTED';
                        }, 1000);
                        return device;
                        
                },


                disconnect(device, options)
                {
                        /* Here goes the actual code that you will write in order to connect the device. */
                        
                        // if (studio.system.platform () === 'electron')
                        // {
                        //         //ELECTRON
                                
                        // }
                        // else
                        // {
                        //         //BROWSER
                        //  }
                        
                        // setTimeout(() => {
                        //         device.status = 'DISCONNECTED';
                        // }, 1000);
                }

        
        };

        workspace = studio.workspace.registerDeviceDriver('esp', device_esp);
                
        if(workspace){
                workspace.registerDeviceToolButton('DEVICE_AWESOME_RUN', 10, async () => {
                        let device = studio.workspace.getDevice ();
                
                        /* Here goes the actual code that will make your device run a project */
                        console.log('Run');
                        }, 'plugins/device.esp/data/img/icons/run-icon.svg',

                
                        /* The aditional options that make the Run Button visible and enabled only if there is a connected device
                        and its type is "awesome" */
                        {
                                visible () {
                                        let device = studio.workspace.getDevice ();
                                        return (device.status === 'CONNECTED' && device.connection === 'esp');
                                },
                                enabled () {
                                        let device = studio.workspace.getDevice ();
                                        return (device.status === 'CONNECTED' && device.connection === 'esp');
                                },
                                type: 'run'
                        });

                        if (studio.system.platform () === 'electron')
                        {
                                //ELECTRON

                                searchSerialDevices();
                        }
                        else
                        {
                                //BROWSER
                        }

                        register(null, {
                                device_esp
                        });

                        // devices = [
                        //         {
                        //                 id: 'esp:web',
                        //                 address: '',
                        //                 name: 'ESP',
                        //                 board: 'any',
                        //                 connection: 'web-usb',
                        //                 priority: workspace.DEVICE_PRIORITY_PLACEHOLDER,
                        //                 placeholder: true
                        //         }
                        // ];
                        workspace.updateDevices ([...devices]);
        
                        
                        
                
        }

        studio.shell.register ((event, id, ...data) =>
	{
		let device = getConnectedDevice (id);
		if (device)
		{
			if (event === 'data')
			{	
                                const writer = portConnect.writable.getWriter();
                                writer.write(data);
                        }
                }
        });

}