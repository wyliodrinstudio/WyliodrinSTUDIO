
//import ESPDisconnectDialog from './views/ESPDisconnectDialog.vue'
//import ESPDeviceSetup from './views/ESPDeviceSetup.vue';




//Bus 001 Device 009: ID 10c4:ea60 Cygnal Integrated Products, Inc. CP210x UART Bridge 
//  / myAVR mySmartUSB light
import _ from 'lodash';

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
                studio.workspace.error ('device_awesome: esp is not available '+e.message);
                return {
                        list: function ()
                        {
                                return [
                                ];
                        }
                };
        }
}

async function listESP()
{
        let ports = [];
        try
        {
                ports = await SerialPort.list ();
        }
        catch (e)
        {
                studio.workspace.error ('device_awesome: failed to list awesome '+e.message);
        }
        return ports;
}

function updateDevices()
{
        workspace.updateDevices ([...devices, ...serialDevices]);
}

function searchSerialDevices(){
        return null;
}

export function setup (options, imports, register)
{
        studio = imports;
        SerialPort = loadSerialPort();
        searchSerialDevices();

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

                        setTimeout(() => {
                                device.status = 'CONNECTED';
                        }, 1000);
                },


                disconnect(device, options)
                {
                        /* Here goes the actual code that you will write in order to connect the device. */
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
                        }, 'plugins/device.awesome/data/img/icons/run-icon.svg',
                
                        /* The aditional options that make the Run Button visible and enabled only if there is a connected device
                        and its type is "awesome" */
                        {
                                visible () {
                                        let device = studio.workspace.getDevice ();
                                        return (device.status === 'CONNECTED' && device.connection === 'awesome');
                                },
                                enabled () {
                                        let device = studio.workspace.getDevice ();
                                        return (device.status === 'CONNECTED' && device.connection === 'awesome');
                                },
                                type: 'run'
                        });

                        register(null, {
                                device_awesome
                        });
                
        }

}