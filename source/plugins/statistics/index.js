

export function setup(options, imports, register) {

	let currentSession = {
		start: {},
		stop: {}
	};

	let currentDevices = {};
	let runPressedCount = {};
	let stopPressedCount = {};
	let openProjects = {};

	function getTime() {
		let today = new Date();
		let dateStart = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		let timeStart = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
		return {
			date: dateStart,
			time: timeStart
		};
	}

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
	}

	imports.hooks.addPreHook('system', 'close', () => {
		currentSession.stop = getTime();
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
	});

	imports.hooks.addPreHook('projects', 'changeFile', (...args) => {
		if (args[1]) {
			let projectInfo = args[0];

			if (!openProjects[projectInfo.language])
				openProjects[projectInfo.language] = 0;
			openProjects[projectInfo.language] += 1;

			// console.log(openProjects);
		}

	});

	imports.hooks.addPreHook('workspace', 'updateDevices', (...args) => {
		let type = args[0];
		let devices = args[1];
		currentDevices[type] = {};
		for (let device of devices) {
			if (!device.placeholder && device.id !== 'error') {
				if (!currentDevices[type][device.board])
					currentDevices[type][device.board] = 0;
				currentDevices[type][device.board] += 1;
			}
		}
		return null;
	});
	
	// imports.hooks.addPreHook('projects', 'createEmptyProject', (...args) => {
	
	// 	let da = true;
	// 	if (da) {
	// 		let r = {
	// 			abort: false,
	// 			args: ['Teona is here', 'nodejs'],
	// 			ret: null
	// 		};
	// 		return r;
	// 	} else return null;
	// });

	// imports.hooks.addPostHook('projects', 'createEmptyProject', async(res) => {
	// 	let res2 = await res;
	// 	console.log(res);
	// 	return res2;
	// });

	register(null, {});
}
