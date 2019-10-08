
export function setup(options, imports, register) {

	var Countly = require('countly-sdk-web');

	let currentSession = {
		start: {},
		stop: {}
	};

	let app_language = null;
	let currentDevices = {};
	let connectedDevice = undefined;

	Countly.init({
		// eslint-disable-next-line no-undef
		app_key: APP_KEY,
		url: 'https://statistics.wyliodrin.studio',
		// debug: true,
		app_version: 2.0
	});

	function optInOut()
	{
		let statistics = imports.settings.loadValue('workspace', 'feedback', true);
		if (statistics)
			Countly.q.push(['opt_in']);
		else
			Countly.q.push(['opt_out']);
	}

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
		};
	}




	app_language = imports.workspace.getLanguage();
	// console.log(app_language);

	optInOut();
	Countly.q.push(['track_sessions']);
	Countly.user_details({
		'name': token,
		'username': token,
		'locale': app_language
	});
	Countly.q.push(['userData.save']);


	// ca la add start
	function addStop() {
		let device = imports.workspace.getDevice();
		let project = imports.projects.getCurrentProject();

		// if (device) {
		// 	if (!stopPressedCount[device.board])
		// 		stopPressedCount[device.board] = {
		// 			count: 0,
		// 			times: []
		// 		};
		// 	stopPressedCount[device.board].count += 1;
		// 	stopPressedCount[device.board].times.push(getTime());
		// }

		// let newTime = getTime();
		
		optInOut();
		Countly.add_event({
			'key': 'StopProject',
			'count': 1,
			'segmentation': {
				'device.type': device.type,
				'device.board': device.board,
				'language': project.language,
				'username': token,
				'locale': app_language
			}
		});
	}

	// get project
	function addRun() {
		let device = imports.workspace.getDevice();
		let project = imports.projects.getCurrentProject();

		// if (device) {
		// 	if (!runPressedCount[device.board])
		// 		runPressedCount[device.board] = {
		// 			count: 0,
		// 			times: []
		// 		};
		// 	runPressedCount[device.board].count += 1;
		// 	runPressedCount[device.board].times.push(getTime());
		// }

		// let newTime = getTime();
		optInOut();
		Countly.add_event({
			'key': 'RunProject',
			'count': 1,
			'segmentation': {
				'device.type': device.type,
				'device.board': device.board,
				'language': project.language,
				'username': token,
				'locale': app_language
			}
		});
	}

	imports.hooks.addPostHook('workspace', 'setLanguage', (...args) => {
		app_language = args[1];
		optInOut();
		Countly.user_details({
			'name': token,
			'username': token,
			'locale': app_language
		});
		Countly.q.push(['userData.save']);
		Countly.add_event({
			'key': 'LanguageChange',
			'count': 1,
			'segmentation': {
				'username': token,
				'locale': app_language
			}
		});
	});

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
		optInOut();
		Countly.add_event({
			'key': 'Start',
			'segmentation': {
				'username': token,
				'locale': app_language
			}
		});
	});

	imports.hooks.addPreHook('projects', 'selectCurrentProject', (projectInfo) => {
		// if (args[1]) {
		// 	let projectInfo = args[0];

		// if (!openProjects[projectInfo.language])
		// 	openProjects[projectInfo.language] = 0;
		// openProjects[projectInfo.language] += 1;
		optInOut();
		if (projectInfo)
		{
			Countly.add_event({
				'key': 'OpenProject',
				'count': 1,
				'segmentation': {
					'language': projectInfo.language,
					'username': token,
					'locale': app_language
				}
			});
		}
	});

	imports.hooks.addPreHook('workspace', 'updateDevices', (type, devices) => {
		let olds = currentDevices[type];
		currentDevices[type] = {};
		for (let device of devices) {
			if (!device.placeholder) {
				if (!currentDevices[type][device.board])
					currentDevices[type][device.board] = 0;
				currentDevices[type][device.board] += 1;
			}
		}
		let ok = false;

		for (let ind in currentDevices[type]) {
			if (olds[ind] != currentDevices[type][ind]) {
				ok = true;
				break;
			}
		}
		if (ok) {
			let number = devices.reduce (
				(nr, device) => { return nr + (device.placeholder?0:1); }, 0);
			
			optInOut();			
			if (number > 0)
				Countly.add_event({
					'key': 'UpdateDevices',
					'count': 1,
					'segmentation': {
						'type': type,
						'count': number,
						'username': token,
						'locale': app_language
					}
				});	
		}
		return null;
	});

	imports.hooks.addPreHook('workspace', 'updateDevice', (type, device) => {
		optInOut();
		if (device.status === 'CONNECTED') {
			if (connectedDevice) {
				Countly.add_event({
					'key': 'ConnectionTry',
					'count': 1,
					'segmentation': {
						'type': device.type,
						'board': device.board,
						'username': token,
						'locale': app_language
					}
				});
			} else {
				connectedDevice = device.id;
				Countly.add_event({
					'key': 'Connected',
					'count': 1,
					'segmentation': {
						'type': device.type,
						'board': device.board,
						'username': token,
						'locale': app_language
					}
				});
			}
		}
		if (device.status === 'DISCONNECTED') {
			if (!connectedDevice) {
				Countly.add_event({
					'key': 'DisconnectionTry',
					'count': 1,
					'segmentation': {
						'type': device.type,
						'board': device.board,
						'username': token,
						'locale': app_language
					}
				});
			} else {
				Countly.add_event({
					'key': 'Disconnected',
					'count': 1,
					'segmentation': {
						'type': device.type,
						'board': device.board,
						'username': token,
						'locale': app_language
					}
				});
				connectedDevice = undefined;
			}
		}		
	});
	
	register(null, {});
}
