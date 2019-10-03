
export function setup(options, imports, register) {

	var Countly = require('countly-sdk-web');

	let currentSession = {
		start: {},
		stop: {}
	};

	let currentDevices = {};
	let runPressedCount = {};
	let stopPressedCount = {};
	let openProjects = {};
	let connectedDevice = undefined;
	// console.log(APP_KEY);
	Countly.init({
		app_key: APP_KEY,
		url: 'https://tracking.wyliodrin.studio',
		// debug: true,
		app_version: 2.0
	});

	let token = imports.workspace.getToken();

	if (!token)
	{
		// TODO 
	}

	function getTime(startStop = 0) {
		let today = new Date();
		if (startStop === 1)
			currentSession.start = today;
		if (startStop === 2)
			currentSession.stop = today;
		return {
			date: today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear(),
			time: today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
		}
	}

	console.log(typeof(token));
	Countly.user_details({
		'name': token,
		'username': token + '.' + getTime().date + '-' + getTime().time,
		// 'email': 'test@test.com',
		// 'organization': 'Countly',
		// 'phone': '+37112345678',
		//Web URL to picture
		// 'picture': 'https://pbs.twimg.com/profile_images/1442562237/012_n_400x400.jpg', 
		// 'gender': 'M',
		// 'byear': 1987, //birth year
		'custom':{
			'date': getTime().date
		}
	});


	

	function addStop() {
		let device = imports.workspace.getDevice();

		if (device) {
			if (!stopPressedCount[device.board])
				stopPressedCount[device.board] = {
					count: 0,
					times: []
				};
			stopPressedCount[device.board].count += 1;
			stopPressedCount[device.board].times.push(getTime());
		}

		let newTime = getTime();
		Countly.add_event({
			'key': 'pressedStopButton',
			'count': 1,
			'segmentation': {
				'time': newTime.date
			}
		});
	}


	function addRun() {
		let device = imports.workspace.getDevice();

		if (device) {
			if (!runPressedCount[device.board])
				runPressedCount[device.board] = {
					count: 0,
					times: []
				};
			runPressedCount[device.board].count += 1;
			runPressedCount[device.board].times.push(getTime());
		}

		let newTime = getTime();
		Countly.add_event({
			'key': 'pressedRunButton',
			'count': 1,
			'segmentation': {
				'time': newTime.date
			}
		});
	}

	imports.hooks.addPreHook('system', 'close', () => {
		let stopTime = getTime(2);
		let data = stopTime.date + '/' + stopTime.time;
		setTimeout(function(){
			Countly.end_event({
				'key': 'currentSession.'+token,
				'count': 1,
				'segmentation': {
					'stop': data
				}
			});
		}, 20000);

		/** trimite catre ceva info inainte de inchidere */
		return {
			abort: false,
			args: [],
			ret: null
		};
	});

	imports.hooks.addPreHook('device_rpk', 'runProject', () => {
		addRun();
	});

	imports.hooks.addPreHook('device_wyapp', 'runProject', () => {
		addRun();
	});

	imports.hooks.addPreHook('device_wyapp', 'stopProject', () => {
		addStop();
	});

	imports.hooks.addPreHook('device_rpk', 'stopProject', () => {
		addStop();
	});

	imports.events.on ('ready', ()=>
	{
		let startTime = getTime(1);
		Countly.add_event({
			'key': 'currentSession.'+token,
			'segmentation': {
				'start': startTime.date + '/' + startTime.time
			}
		});
	});

	imports.hooks.addPreHook('projects', 'changeFile', (...args) => {
		if (args[1]) {
			let projectInfo = args[0];

			if (!openProjects[projectInfo.language])
				openProjects[projectInfo.language] = 0;
			openProjects[projectInfo.language] += 1;

			Countly.add_event({
				'key': projectInfo.language + '.projects',
				'count': 1,
				'segmentation': {
					'language': projectInfo.language
				}
			});

		}

	});

	imports.hooks.addPreHook('workspace', 'updateDevices', (...args) => {
		let type = args[0];
		let devices = args[1];
		currentDevices[type] = {};
		for (let device of devices) {
			if (!device.placeholder) {
				if (!currentDevices[type][device.board])
					currentDevices[type][device.board] = 0;
				currentDevices[type][device.board] += 1;
			}
		}
		for (let deviceName in currentDevices[type])
			Countly.add_event({
				'key': type + '.devices',
				'count': currentDevices[type][deviceName],
				'segmentation': {
					'number': currentDevices[type][deviceName]
				}
			});	
		return null;
	});

	imports.hooks.addPreHook('workspace', 'updateDevice', (...args) => {
		let device = args[1];
		if (device.status === 'CONNECTED') {
			if (connectedDevice) {
				Countly.add_event({
					'key': 'connectionTry',
					'count': 1,
					'segmentation': {
						'connectionType': device.board
					}
				});
			} else {
				connectedDevice = device.id;
				Countly.add_event({
					'key': 'connected',
					'count': 1,
					'segmentation': {
						'type': device.board
					}
				});
			}
		}
		if (device.status === 'DISCONNECTED') {
			if (!connectedDevice) {
				Countly.add_event({
					'key': 'disconnectionTry',
					'count': 1,
					'segmentation': {
						'connectionType': device.board
					}
				});
			} else {
				Countly.add_event({
					'key': 'disconnected',
					'count': 1,
					'segmentation': {
						'type': device.board
					}
				});
				connectedDevice = undefined;
			}
		}		
	});
	
	register(null, {});
}
