
//import ESPDisconnectDialog from './views/ESPDisconnectDialog.vue'
//import ESPDeviceSetup from './views/ESPDeviceSetup.vue';


import _, { update } from 'lodash';
import { isElectron } from './lib.js'

//import path from 'path';

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
                                        let name = 'NodeMCU (ESP8266)';
                                        let description = '';
                                        let id = serialDevice.productId;
                                        devices.push({
                                                id: id,
                                                adress: serialDevice.path,
                                                description,
                                                name,
                                                connection:'serial',
                                                icon:'plugins/device.esp/data/img/icons/rsz_runningesp-ish.jpg',
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
                        adress:'',
                        name: studio.workspace.vue.$t('NodeMCU ESP8266'),
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
        //console.log(serialDevices);
        console.log(process.versions.electron);

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

                connect(device, options)
                {
                        /* Here goes the actual code that you will write in order to connect the device. */

                        if (studio.system.platform () === 'electron')
                        {
                                //ELECTRON
                        }
                        else
                        {
                                //BROWSER
                        }

                        setTimeout(() => {
                                device.status = 'CONNECTED';
                        }, 1000);
                        return device;
                },


                disconnect(device, options)
                {
                        /* Here goes the actual code that you will write in order to connect the device. */
                        
                        if (studio.system.platform () === 'electron')
                        {
                                //ELECTRON
                        }
                        else
                        {
                                //BROWSER
                        }
                        
                        setTimeout(() => {
                                device.status = 'DISCONNECTED';
                        }, 1000);
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


}


