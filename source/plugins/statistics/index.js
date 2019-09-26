
export function setup(options, imports, register) {

	var Countly = require('countly-sdk-nodejs');

	Countly.init({
		app_key: '5ceac775edc0f7c07a68284a24c4c4b27825c06b',
		url: '192.168.72.185',
		// debug: true,
		app_version: 2.0
	});

	let token = imports.workspace.getToken();

	if (!token)
	{
		// TODO 
	}

	function getTime() {
		let today = new Date();
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


	let currentSession = {
		start: {},
		stop: {}
	};

	let currentDevices = {};
	let runPressedCount = {};
	let stopPressedCount = {};
	let openProjects = {};

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
				'time': newTime.date + '//' + newTime.time
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
				'time': newTime.date + '//' + newTime.time
			}
		});
	}

	imports.hooks.addPreHook('system', 'close', () => {
		currentSession.stop = getTime();

		Countly.add_event({
			'key': 'currentSession',
			'count': 1,
			'segmentation': {
				'stop': currentSession.stop
			}
		});

		// Countly.end_event('currentSession');
		// Countly.end_event('updateDevices');
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
		currentSession.start = getTime();

		// Countly.add_event({
		// 	'key': 'currentSession'+'.',
		// 	'count': 1,
		// 	'segmentation': {
		// 		'start': currentSession.start,
		// 		'stop': currentSession.stop
		// 	}
		// });

		Countly.add_event({
			'key': 'currentSession',
			'segmentation': {
				'start': currentSession.start
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
				'key': 'projectsOpened' + '.' + projectInfo.language,
				'count': 1,
				'segmentation': {
					'time': getTime().date + '//' + getTime().time
				}
			});

			// console.log(openProjects);
		}

	});

	imports.hooks.addPreHook('workspace', 'updateDevices', (...args) => {
		// console.log(Countly.events.list());
		let type = args[0];
		let devices = args[1];
		currentDevices[type] = {};
		for (let device of devices) {
			if (!device.placeholder) {
				if (!currentDevices[type][device.board])
					currentDevices[type][device.board] = 0;
				currentDevices[type][device.board] += 1;
				// console.log(currentDevices[type][device.board]);
				console.log(device.board+':'+currentDevices[type][device.board]);
				Countly.add_event({
					'key': 'updateDevices.'+type+'.'+device.board,
					'count': 1,
					'segmentation': {
						'number': currentDevices[type][device.board]
					}
				});
				
			}
		}
		return null;
	});
	
	register(null, {});
}
