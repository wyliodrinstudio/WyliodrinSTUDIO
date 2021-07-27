let studio = null;
let simulator = {
	connected: false,
	isRunning: false,
	opperationsCounter: 0
};

let workspace = null;

// Array of mocked supported libraries imports
const supportedLibraries = [
	'import RPi.GPIO as GPIO',
];

let worker = null;

import _ from 'lodash';
import RaspberrypiSimulator from './views/RaspberrypiSimulator.vue';
import JSInterpreter from './JSInterpreter/interpreter.js';
import JSInterpreterLibrary from './JSInterpreter/interpreter_library.js';
import generic_raspberrypi from './libraries/utils/generic_raspberrypi.js';
import onoff from './libraries/onoff.js';
import lcd from './libraries/lcd.js';
import update_components from './libraries/utils/update_components.js';

async function readFirmware() {
	try {
		let data = await studio.filesystem.loadDataFile('simulators/raspberrypi', 'firmware/firmware_pyboard.bin');
		return data;
	} catch (err) {
		studio.workspace.error(err);
	}
}

// Reads custom libraries from data/python-libraries and prepends them to the code
async function readLibraries() {
	try {
		// Names of python files
		const libraries = await studio.filesystem.loadDirFiles('raspberrypi', 'python-libraries');

		let code = '';
		for (let library of libraries) {
			// Read text from file and add them to the code
			const libraryCode = await studio.filesystem.loadDataFile('simulators/raspberrypi', 'python-libraries/' + library);
			code = code + libraryCode + '\n';
		}
		return code;
	} catch(err) {
		studio.workspace.error(err);
	}
}

// Checks for imports of mocked libraries and deletes them
function cleanLoadedLibraries(code) {
	for (let library of supportedLibraries) {
		const regex = new RegExp(library);
		code = code.replace(regex, '');
	}

	return code;
}

// Opens studio console with MicroPython
function loadMicroPythonConsole() {
	studio.console.show ();
	studio.console.select ('unicorn_micropython');
	studio.console.reset ();	
}

// Get state of each pin, set the value and update the components
function updateComponentsFromMP(pins, generic_raspberrypi) {
	try {
		for (let gpioPin = 2; gpioPin <= 26; gpioPin++) {
			const value = pins & (1 << gpioPin) ? 1 : 0; // Checks if pin is HIGH or LOW
			const pin = generic_raspberrypi.parseGpioToPin(gpioPin);
			if (pin && generic_raspberrypi.dataLoaded.pins[pin]) {
				generic_raspberrypi.dataLoaded.pins[pin].value = value;
				generic_raspberrypi.dataLoaded.pins[pin].state = 'out';
			}
		}
	} catch (e) {
		studio.showError ('DEVICE_SIMULATOR_RASPBERRY_PI_RUN_ERROR', {error: e.message});
	}

	update_components();
}

function cleanZeros(strArray) {
	while (strArray.length > 1 && strArray[0] == '0') {
		strArray = strArray.substring(1);
	}

	return strArray;
}

let pins = '';

let librariesCode = '';

let device_simulator_raspberrypi = {
	/**
	 * Simulate the connection to a real RaspberryPi
	 * @param  {Object} device The 'device' object in the platform
	 */
	async connect(device) {
		if (simulator.connected === false) {
			if (!worker) {			
				worker = new Worker('./workers/unicorn.wpworker.js', {type: 'module'});
				librariesCode = await readLibraries();
				// Initialize MicroPython console
				let firmware = await readFirmware();
				worker.postMessage({firmware: firmware, messageType: 'load-mp'});
				loadMicroPythonConsole();

				worker.onmessage = (event) => {
					switch (event.data.messageType){
						// Write text from micropython to studio console
						case 'console-data': {
							let data = event.data.data;
							studio.console.write ('unicorn_micropython', data);
							break;
						}
						case 'pins': {
							pins = event.data.pins;
							updateComponentsFromMP(pins, generic_raspberrypi);
							break;
						}
						case 'killed': {
							let device = studio.workspace.getDevice();
							if (device && device.properties.isRunning) {
								simulator.isRunning = false;
								device.properties.isRunning = false;
								workspace.updateDevice(device);
							}
							break;
						}
					}
				};

				// When button is pressed, change pin state
				generic_raspberrypi.events.on('button', (pinToWrite) => {
					let index = pinToWrite;

					// Check state of pin array and modify button pin state
					if (pins.length < index) {
						pins = '1' + '0'.repeat(index - pins.length) + pins;
					} else {
						let isActive = pins[pins.length - index - 1] == '1' ? 1 : 0;
						if (isActive) {
							pins = pins.substring(0, pins.length - index - 1) + '0' + pins.substring(pins.length - index);
						} else {
							pins = pins.substring(0, pins.length - index - 1) + '1' + pins.substring(pins.length - index);
						}
					}
					pins = cleanZeros(pins);

					worker.postMessage({pins: pins, messageType: 'pins'});
				});
			}

			if (_.isObject(device)) {
				process.nextTick(() => {
					device.status = 'CONNECTED';
					workspace.updateDevice(device);
				});				

				simulator.connected = true;

				return device;
			}
		}
	},

	/**
	 * Simulate the disconnection to a real RaspberryPi
	 * @param  {Object} device The 'device' object in the platform
	 */
	disconnect(device) {
		if (simulator.connected === true) {
			if (_.isObject(device)) {
				device.status = 'DISCONNECTED';
				workspace.updateDevice(device);
				simulator.connected = false;
				worker.postMessage({messageType: 'remove-listeners'});
				worker.terminate();
				studio.console.reset();
				worker = null;
				return true;
			}
		}
	}
};

/**
 * The function to create the RaspberryPi simulator
 * @param  {Object} options The options for the imported objects (plugins)
 * @param  {Object} imports The imported objects (plugins)
 * @param  {Object} register The exported object (plugin)
 */
export default function setup(options, imports, register) {
	studio = imports;
	workspace = studio.workspace.registerDeviceDriver('raspberrypi_simulator', device_simulator_raspberrypi);

	// Write text from studio console to micropython
	studio.console.register ((event, id, data) => {
		if (id ===  'unicorn_micropython' && event === 'data') {
			worker.postMessage({data: data, messageType: 'console-data'});
		}
	});

	// Register a new device: 'RaspberryPi simulator'
	workspace.updateDevices([{
		id: 'raspberrypi_simulator',
		name: 'RaspberryPi',
		priority: workspace.DEVICE_PRIORITY_SIMULATOR,
		address: 'raspberrypi_simulator',
		board: 'raspberrypi_simulator',
		properties: {
			isRunning: false
		},
		placeholder: true,
		icon: 'plugins/simulators/raspberrypi/data/img/icons/icon-raspberrypi.png'
	}
	]);

	// The code that should be executed in case of run button pressing
	workspace.registerDeviceToolButton ('DEVICE_SIMULATOR_RASPBERRY_PI_RUN', 40, async () => {
		try {
			// Load the project code
			let project = studio.projects.getCurrentProject();
			if (!project) {
				studio.workspace.showNotification(studio.workspace.vue.$t('DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_NOT_OPEN'));
			} else if (project.language === 'nodejs') {	
				let filePath = studio.projects.getDefaultRunFileName(project);
				let code = await studio.projects.loadFile(project, filePath);

				let device = studio.workspace.getDevice();
				if (device && device.properties.isRunning === false) {
					// Show and select the right console for this device (RaspberryPi simulator)
					studio.console.show();
					studio.console.select(device.id);

					// Create the object constr`uc`tors for each library and
					// append them to the users code
					let librariesToLoad = 
						'var libraries = {};\n\n' +
						onoff +
						lcd +
						`function require (name) {
							return libraries[name];
						};\n\n`;
					code = librariesToLoad.toString() + code.toString();
					generic_raspberrypi.setDefault();

					// Create the JS interpreter with the associated functions
					let interpreter = new JSInterpreter(code, JSInterpreterLibrary(studio, device, simulator));

					// Set the variables of the device to 'running' and update the device
					simulator.opperationsCounter = 0;
					simulator.isRunning = true;
					device.properties.isRunning = true;
					workspace.updateDevice(device);

					/**
					 * The function to be executed by the interpreter
					 * The code written by the user is executed step by step, and each
					 * 100 steps it is slowed down in order for the application not to
					 * crash in case of an infinite loop
					 */
					let runToCompletion = function() {
						if (simulator.isRunning && interpreter.step()) {
							simulator.opperationsCounter ++;
							if (simulator.opperationsCounter === 100) {
								setTimeout(runToCompletion, 10);
								simulator.opperationsCounter = 0;
							} else {
								setTimeout(runToCompletion, 1);
							}	
						} else {
							simulator.isRunning = false;
							device.properties.isRunning = false;
							workspace.updateDevice(device);
						}
					};
					process.nextTick(runToCompletion);
				}
			} else if (project.language === 'python') {
				// Get the code from files and clean supported libraries
				const filePath = studio.projects.getDefaultRunFileName(project);
				let code = librariesCode + '\n\n' + await studio.projects.loadFile(project, filePath);
				code = cleanLoadedLibraries(code.toString());

				// Set raspberry to default values and run the code
				generic_raspberrypi.setDefault();
				
				let device = studio.workspace.getDevice();

				if (device && device.properties.isRunning === false) {
					worker.postMessage({code: code, messageType: 'run-code'});

					// Configure workspace
					simulator.isRunning = true;
					device.properties.isRunning = true;
					workspace.updateDevice(device);
				}
			} else {
				studio.workspace.showNotification(studio.workspace.vue.$t('DEVICE_SIMULATOR_RASPBERRY_PI_LANGUAGE_INCOMPATIBLE'));
			}
		} catch(e) {
			studio.showError ('DEVICE_SIMULATOR_RASPBERRY_PI_RUN_ERROR', {error: e.message});
		}
	}, 'plugins/simulators/raspberrypi/data/img/icons/run-icon.svg', {
		visible() {

			// The visible options of the RaspberryPi simulator run button
			let device = studio.workspace.getDevice ();
			return (device.status === 'CONNECTED' && !device.properties.isRunning);
		},
		enabled() {

			// The enabled options of the RaspberryPi simulator run button
			let project = studio.projects.getCurrentProject();
			return (project);
		},
		type: 'run'
	});

	// The code that should be executed in case of stop button pressing
	workspace.registerDeviceToolButton('DEVICE_SIMULATOR_RASPBERRY_PI_STOP', 50, () => {

		// Set the running variables of the device to false in order to make
		// the JS interpreter to stop
		let device = studio.workspace.getDevice ();
		if (device && device.properties.isRunning) {
			device.properties.isRunning = false;
			simulator.isRunning = false;
			workspace.updateDevice(device);
		}

		let project = studio.projects.getCurrentProject();
		
		// Terminate MicroPython process
		if (project && project.language === 'python') {
			worker.postMessage({data: String.fromCharCode(3), messageType: 'console-data'});
		}
	}, 'plugins/simulators/raspberrypi/data/img/icons/stop-icon.svg', {
		visible() {

			// The visible options of the RaspberryPi simulator stop button
			let device = studio.workspace.getDevice ();
			return (device.status === 'CONNECTED' && device.properties.isRunning);
		},
		type: 'stop'
	});

	// The 'RaspberryPi simulator' tab registration with the associated Vue component
	studio.workspace.registerTab('DEVICE_SIMULATOR_RASPBERRY_PI', 1000, RaspberrypiSimulator, {
		visible() {

			// The visible options of the RaspberryPi simulator tab
			let device = studio.workspace.getDevice ();
			return (device.status === 'CONNECTED' && device.id === 'raspberrypi_simulator');
		},
	});
	
	// The object returned by this plugin
	register(null, {
		device_simulator_raspberrypi
	});
}