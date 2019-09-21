import store from './store.js';
import aedes from 'aedes';
import net from 'net';
import MQTTServer from './views/MQTTServer.vue';

let studio = null;
let server = null;
let mqttServer = null;
let events = [];

let username = null;
let password = null;

export function setup(options, imports, register) {
	studio = imports;

	let mqtt = {
		start(port, user, pass) {

			if (!mqttServer && !server) {
				port = parseInt(port) || 1883;
				username = user;
				password = pass;
				mqttServer = aedes();
				server = net.createServer(mqttServer.handle);
				server.listen({ port, host: '0.0.0.0' }, (error) => {
					if (!error) {
						studio.workspace.dispatchToStore('mqtt', 'status', 'running');
					}
					else {
						server = null;
						console.log(error);
					}
				});
				mqttServer.on('client', (client) => {

				});

				mqttServer.authenticate = function (client, usr, passwd, callback) {
					if (username.length === 0 && password.length === 0)
					{
						callback (null, true);
					}
					else
					{
						var error = new Error('Auth error');
						error.returnCode = 4;
						if (usr == username && passwd == password) {
							callback(null, true);
						}
						else {
							callback(error, null);
						}
					}
				};

				for (let event of events) {
					mqttServer.subscribe(event.topic, event.fn);
				}
			}
			else {
				studio.workspace.warn('Server is already running');
			}
		},
		stop() {
			if (mqttServer) {
				mqttServer.close();
				server.close();
				mqttServer = null;
				server = null;
				studio.workspace.dispatchToStore('mqtt', 'status', 'stopped');
			}
			else {
				studio.workspace.warn('Server is already stopped');
			}
		},
		publish(message) {
			if (mqttServer) {
				mqttServer.publish(message, (error) => {
					if (error) {
						console.log(error);
					}
					else {
						
					}
				});
			}
			else {
				//studio.workspace.showNotification("MQTT server not started!");
			}
		},
		subscribe(topic, fn) {
			if (mqttServer) {
				mqttServer.subscribe(topic, fn);
			}
			else {
				events.push({ topic, fn });
				//studio.workspace.showNotification("MQTT server not started!");
			}
		}
	};

	// workspace = studio.workspace.registerMenuItem('MQTT_START', 150, () => {

	// }, {
	// 	visible(){
	// 		return studio.workspace.getFromStore ('mqtt', 'status') !== 'running';
	// 	}
	// });

	// workspace = studio.workspace.registerMenuItem('MQTT_STOP', 180, () => {

	// }, {
	// 	visible(){
	// 		return studio.workspace.getFromStore ('mqtt', 'status') === 'running';
	// 	}
	// });

	studio.workspace.registerStatusButton('MQTT', 1, MQTTServer, 'plugins/mqtt/data/img/icons/mqtt-icon.png');

	studio.workspace.registerStore('mqtt', store);

	register(null, {
		mqtt
	});

	// console.log('Mosca server is up and running');
}


// server.close();