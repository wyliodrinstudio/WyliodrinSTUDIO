
//import ESPDisconnectDialog from './views/ESPDisconnectDialog.vue'
import ESPDeviceSetup from './views/ESPDeviceSetup.vue';


import _, { update } from 'lodash';
import { Search } from 'brace';
import SerialConnectionDialog from './views/SerialConnectionDialog.vue';
import ChromeFlagSetup from './views/ChromeFlagSetup.vue';
import {SerialPort, loadSerialPort} from './serial.js';
import serial from './serial.js';
import path from 'path';



let studio = null;
let workspace = null;
let devices = [];

let serialDevices = [];


let connections = {};
let SerialPortlist = null;
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

//                 studio.workspace.error ('device_esp: esp is not available '+e.message);
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
                ports = await SerialPortlist.list ();
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

    /*setInterval(*/ async function search(){
                        let serial_devices =  await listSerialPorts();
                        devices = [];

                        for(let serialDevice of serial_devices)
                        {
                                if(serialDevice.vendorId === '1a86' && serialDevice.productId === '7523' )
                                {
                                        let name = 'NodeMCU_(ESP8266)'.toString();
                                        let description = '';
                                        let id = 'esp:serial:' + serialDevice.path;//.toString().toLowerCase();
                                        devices.push({
                                                id: id,
                                                address: serialDevice.path,
                                                description,
                                                name,
                                                connection:'serial',
                                                icon:'plugins/device.esp/data/img/icons/esp.png',
                                                board:'esp8266',
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
                        console.log('heheheh');
                        console.log(serialDevices);
                        
                }
               // },3000);
                search();
               
                        

        
}


function updateDevices(){
        // let add = [];
        // if (serialDevices.length === 0 && devices.length === 0)
        // {
        //         add.push({
        //                 id: 'esp:new device',
        //                 address:'',
        //                 name: studio.workspace.vue.$t('NodeMCU_ESP8266'),
	// 		board: 'any',
	// 		priority: workspace.DEVICE_PRIORITY_PLACEHOLDER,
	// 		placeholder: true
        //         });
        // }
       
        workspace.updateDevices([ ...serialDevices]);
}

export function setup (options, imports, register)
{
        studio = imports;
        serial.setup(studio);
        SerialPortlist = loadSerialPort();
        searchSerialDevices();
        console.log("check serial");
        console.log(SerialPort);

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

                async connect(device/*, options*/)
                {
                        if (studio.system.platform () === 'electron')
                        {
                               
                                        console.log("checking");
                                        if(_.isObject(device))
                                        {
                                                let options = await studio.workspace.showDialog (SerialConnectionDialog, {
                                                        device: device,
                                                        width: '500px'
                                                });
                                                //console.log(options);
                                                if(options)
                                                {
                                                        device.status = 'CONNECTING';
                                                        updateDevices();
                                                        
                                                }
                                                
                                                ports[device.id] = new SerialPort();

                                                ports[device.id].connect(device.address,device.baudrate);
                                                ports[device.id].on('error',(err) => {

                                                        device.status = 'DISCONNECTED';
                                                                updateDevice(device);
                                                                studio.workspace.showError ('ESP_SERIAL_CONNECTiON_ERROR', {extra: err.message});
                                                                delete connections[device.id];
                                                                delete ports[device.id];
                                                                console.log('MAMA EI DE VIATA');
                                                                
                                                        //studio.workspace.showError ('ESP_SERIAL_CONNECTON_ERROR', {extra: err.message});
                                                });

                                                ports[device.id].on('connected',(data)=>{
                                                        device.status = 'CONNECTED';
                                                        updateDevice(device);
                                                        studio.shell.select(device.id);

                                                        studio.console.select (device.id);

                                                        studio.console.reset();
                                                        studio.console.show ();


                                                });

                                                ports[device.id].on('close',() => {
                                                                        
                                                        device.status = 'DISCONNECTED';
                                                        workspace.updateDevice(device);
                                                        delete connections[device.id];
                                                        delete ports[device.id];
                                                });

                                        
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
                                return null;
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

                                //searchSerialDevices();
                        }
                        else
                        {
                                //BROWSER
                        }

                        register(null, {
                                device_esp
                        });

                        
                        workspace.updateDevices ([...devices]);
                        
                        
                
        }
}