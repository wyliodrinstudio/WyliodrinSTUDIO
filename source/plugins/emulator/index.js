import EmulatorSetup from './views/EmulatorSetup.vue';
import emulatorStore from './store';
import uuid from 'uuid';
import fs from 'fs-extra';
import kill from 'tree-kill';
import request from 'request';
import progress from 'request-progress';
import unzipper from 'unzipper';
import path from 'path'; 

let qemu = null;
let studio = null;
let search = null;
let qemuCheck = false;
let downloadingImages = {};
let runningEmulators = {};
let images = [];
let devices = [];
let runningEmulatorImage = '';
let emulatorPort = '';
let emulatorFolder = '';
let runningEmulatorsFolder = '';
let imagesFolder = '';
let imageTypeFolder = '';
let currentlyRunningFolder = '';

const { spawn } = require ('child_process');

let emulator = {
	store: null,
	registerEmulator(name, id, type, system, machine, cpu, cmdline, mem, user, password, image, port, runningFolder, icon)
	{
		let sameEmulator = Object.keys(runningEmulators).find((emulator) => emulator === name);
		if(!sameEmulator)
		{
			let item = {
				name,
				id, 
				type, 
				system, 
				machine, 
				cpu, 
				cmdline, 
				mem, 
				user, 
				password, 
				image, 
				port,
				runningFolder,
				icon
			};
			runningEmulators[name] = item;
			studio.workspace.dispatchToStore('emulator', 'runningEmulators', runningEmulators);
		}
		else
		{
			studio.workspace.showError('EMULATOR_SAME_NAME');
		}
	},
	async registerImages()
	{
		emulatorFolder = path.join(studio.filesystem.getSettingsFolder(), 'emulator');
		await studio.filesystem.mkdirp(emulatorFolder);
		
		imagesFolder = path.join(emulatorFolder, 'images');
		await studio.filesystem.mkdirp(imagesFolder);

		images = JSON.parse(await studio.filesystem.readFile('./source/plugins/emulator/data/emulatorImages/images.json'));
		for(let image of images)
		{
			image.id = uuid.v4();

			imageTypeFolder = path.join(imagesFolder, image.type);
			await studio.filesystem.mkdirp(imageTypeFolder);
			
			let imageFiles = [];
			imageFiles = await studio.filesystem.readdir(imageTypeFolder);

			if(imageFiles)
			{
				for(let file of imageFiles)
					if(image.name === file)
					{
						image.progress = 100;
					}
			}			
			image.dataFolder = imageTypeFolder;
		} 
	
		runningEmulatorsFolder = path.join(emulatorFolder, 'runningEmulators');
		await studio.filesystem.mkdirp(runningEmulatorsFolder);

		if (!search)
		{
			search = studio.device_wyapp.registerSearch ('emulator');
		}
		studio.workspace.dispatchToStore('emulator', 'images', images);
	},
	async loadAvailableEmulators() 
	{
		let jsonFile = path.join(studio.filesystem.getSettingsFolder(), 'emulator', 'runningEmulators', 'running.json');

		try {
			let availableEmulators = await fs.readFile(jsonFile);
			runningEmulators = JSON.parse(availableEmulators);
			console.log(runningEmulators);
			studio.workspace.dispatchToStore('emulator', 'runningEmulators', runningEmulators);
		} catch(e)
		{
			console.log(e.message);
		}
	},
	async runEmulator(imageRunning)
	{
		let index = images.findIndex(img => img.type === imageRunning.type);
		if(index)
		{
			if(images[index].progress !== 100)
				studio.workspace.showError('EMULATOR_NO_EXISTING_IMAGE_ERROR');
		}
		else
		{
			let emulatorName = await studio.workspace.showPrompt('EMULATOR_NAME', 'EMULATOR_CHOOSE_NAME');
			console.log(emulatorName);
			if(emulatorName && !runningEmulators[emulatorName]) {
				for(let image of images)
				{
					if(image.type === imageRunning.type)
					{
						image.loadingEmulator = 'yes';
						studio.workspace.dispatchToStore('emulator', 'images', images);
						
						currentlyRunningFolder = path.join(runningEmulatorsFolder, emulatorName);
						await studio.filesystem.mkdirp(currentlyRunningFolder);
						
						let copyImage = path.join(imagesFolder, imageRunning.type, image.name);
						
						runningEmulatorImage = path.join(currentlyRunningFolder, emulatorName + '_' + image.name);
						
						try{ 
							await fs.copyFile(copyImage, runningEmulatorImage);
						} catch(e) {
							studio.workspace.showError('EMULATOR_COPY_FILE_ERROR', {extra: e.message});
							image.loadingEmulator = 'no';
							studio.workspace.dispatchToStore('emulator', 'images', images);
							await fs.remove(currentlyRunningFolder);
							return;
						}

						image.loadingEmulator = 'no';
						studio.workspace.dispatchToStore('emulator', 'images', images);
					}
				}
				emulatorPort = Math.floor(Math.random() * (10000 - 1024)) + 1024;

				if(imageRunning.type === 'raspberrypi')
				{
					this.registerEmulator(emulatorName, uuid.v4(), imageRunning.type, 'arm', 'versatilepb', 'arm1178', 'rw console=ttyAMA0 root=/dev/sda2 rootfstype=ext4  loglevel=8 rootwait fsck.repair=yes memtest=1', '256M', 'pi', 'raspberry', runningEmulatorImage, emulatorPort, currentlyRunningFolder, 'plugins/emulator/data/img/icons/icon-raspberrypi.png');
				}
				else
				if(imageRunning.type === 'ubuntu')
				{
					this.registerEmulator(emulatorName, uuid.v4(), imageRunning.type, 'x86_64', 'accel=hax:wpxh:kvm:hvf:tcg', null, null, '2G', 'ubuntu', 'ubuntu', runningEmulatorImage, emulatorPort, currentlyRunningFolder, 'plugins/emulator/data/img/icons/icon-ubuntu.png');
				}

				fs.writeFileSync(path.join(runningEmulatorsFolder, 'running.json'), JSON.stringify(runningEmulators, null, 4));
				

				const check = spawn('qemu-system-arm', ['--version'], {
					env: process.env
				});
				check.on('close', (code) => {
					if(code === 1)
					{
						studio.workspace.showNotification('Please install qemu.');
						qemuCheck = true;
						studio.workspace.dispatchToStore('emulator', 'qemuCheck', qemuCheck);
					}
					else
					{
						if(imageRunning.type === 'raspberrypi')
						{
							qemu = spawn('qemu-system-arm', ['-kernel', path.join(imagesFolder, imageRunning.type, 'kernel-qemu-4.14.79-stretch'), '-dtb', path.join(imagesFolder, imageRunning.type, 'versatile-pb.dtb'), '-m', '256', '-M', 'versatilepb', '-cpu', 'arm1176', '-serial', 'stdio', '-append', 'rw console=ttyAMA0 root=/dev/sda2 rootfstype=ext4  loglevel=8 rootwait fsck.repair=yes memtest=1', '-drive', 'file=' + runningEmulatorImage + ',format=raw', '-net', 'nic', '-net', 'user,id=ethernet.0,hostfwd=tcp::' + emulatorPort + '-:22', '-no-reboot'], {
								env: process.env
							});

							qemu.stdout.on('data', () => {
								runningEmulators[emulatorName].running = 1;
								runningEmulators[emulatorName].pid = qemu.pid;
								studio.workspace.dispatchToStore('emulator', 'runningEmulators', runningEmulators);
							});
							
							qemu.stderr.on('data', (data) => {
								console.error(`stderr: ${data}`);
							});
							devices.push ({
								id: 'wyapp:emulator:'+emulatorPort,
								transport: 'ssh',
								address: '127.0.0.1',
								name: emulatorName,
								priority: studio.workspace.DEVICE_PRIORITY_HIGH,
								port: emulatorPort,
								board: 'raspberrypi',
								properties: {
									category: 'raspberrypi',
									platform: 'linux'
								}
							});

							search.updateDevices (devices);
						}
						else if(imageRunning.type === 'ubuntu')
						{
							qemu = spawn('qemu-system-x86_64', ['-hda', runningEmulatorImage, '-boot', 'd', '-m', '2048', '-M', 'accel=hax:wpxh:kvm:hvf:tcg', '-net', 'nic', '-net', 'user,id=ethernet.0,hostfwd=tcp::' + emulatorPort + '-:22', '-no-reboot'], {
								env: process.env
							});

							qemu.stdout.on('data', () => {
								runningEmulators[emulatorName].running = 1;
								runningEmulators[emulatorName].pid = qemu.pid;
								studio.workspace.dispatchToStore('emulator', 'runningEmulators', runningEmulators);
							});
							
							qemu.stderr.on('data', (data) => {
								console.error(`stderr: ${data}`);
							});

							devices.push ({
								id: 'wyapp:emulator:'+ emulatorPort,
								transport: 'ssh',
								address: '127.0.0.1',
								name: emulatorName,
								priority: studio.workspace.DEVICE_PRIORITY_HIGH,
								port: emulatorPort,
								board: 'ubuntu',
								properties: {
									category: 'ubuntu',
									platform: 'linux'
								}
							});
							search.updateDevices (devices);
						}
						studio.workspace.dispatchToStore('workspace', 'devices', devices);
					}
				});
			}
			else {
				studio.workspace.showError('EMULATOR_INVALID_NAME');
			}
		}
	},
	restartEmulator(emulator)
	{
		if(emulator.type === 'raspberrypi') {
			qemu = spawn('qemu-system-arm', ['-kernel', path.join(imagesFolder, emulator.type, 'kernel-qemu-4.14.79-stretch'), '-dtb', path.join(imagesFolder, emulator.type, 'versatile-pb.dtb'), '-m', '256', '-M', 'versatilepb', '-cpu', 'arm1176', '-serial', 'stdio', '-append', 'rw console=ttyAMA0 root=/dev/sda2 rootfstype=ext4  loglevel=8 rootwait fsck.repair=yes memtest=1', '-drive', 'file=' + emulator.image + ',format=raw', '-net', 'nic', '-net', 'user,id=ethernet.0,hostfwd=tcp::' + emulator.port + '-:22', '-no-reboot'], {
				env: process.env
			});
			qemu.stdout.on('data', () => {
				runningEmulators[emulator.name].running = 1;
				runningEmulators[emulator.name].pid = qemu.pid;
				studio.workspace.dispatchToStore('emulator', 'runningEmulators', runningEmulators);
			});
			devices.push ({
				id: 'wyapp:emulator:'+ emulator.port,
				transport: 'ssh',
				address: '127.0.0.1',
				name: emulator.name,
				priority: studio.workspace.DEVICE_PRIORITY_HIGH,
				port: emulator.port,
				board: 'raspberrypi',
				properties: {
					category: 'raspberrypi',
					platform: 'linux'
				}
			});
			search.updateDevices (devices);
		}
		else if(emulator.type === 'ubuntu') {
			qemu = spawn('qemu-system-x86_64', ['-hda', emulator.image, '-boot', 'd', '-m', '2048', '-M', 'accel=hax:wpxh:kvm:hvf:tcg', '-net', 'nic', '-net', 'user,id=ethernet.0,hostfwd=tcp::' + emulator.port + '-:22', '-no-reboot'], {
				env: process.env
			});
			runningEmulators[emulator.name].pid = qemu.pid;
			runningEmulators[emulator.name].running = 1;
			qemu.stderr.on('data', (data) => {
				console.error(`stderr: ${data}`);
			});

			devices.push ({
				id: 'wyapp:emulator:'+ emulator.port,
				transport: 'ssh',
				address: '127.0.0.1',
				name: emulator.name,
				priority: studio.workspace.DEVICE_PRIORITY_HIGH,
				port: emulatorPort,
				board: 'ubuntu',
				properties: {
					category: 'ubuntu',
					platform: 'linux'
				}
			});
			search.updateDevices (devices);
		}
	},
	async stopEmulator(emulator)
	{
		kill(runningEmulators[emulator.name].pid, 'SIGKILL');
		devices = devices.filter(device => device.port !== runningEmulators[emulator.name].port);
		runningEmulators[emulator.name].running = 0;
		studio.workspace.dispatchToStore('emulator', 'runningEmulators', runningEmulators);
		await fs.writeFile(path.join(runningEmulatorsFolder, 'running.json'), JSON.stringify(runningEmulators, null, 4));
		search.updateDevices(devices);
	},
	async deleteEmulator(emulator)
	{
		let value = await studio.workspace.showConfirmationPrompt(
			'EMULATOR_DELETE_EMULATOR_TITLE',
			'EMULATOR_DELETE_EMULATOR_QUESTION',
		);
		if (value) {
			kill(runningEmulators[emulator.name].pid, 'SIGKILL');
			await fs.remove(runningEmulators[emulator.name].runningFolder);
			devices = devices.filter(device => device.port !== runningEmulators[emulator.name].port);
			delete runningEmulators[emulator.name];
			studio.workspace.dispatchToStore('emulator', 'runningEmulators', runningEmulators);
			await fs.writeFile(path.join(runningEmulatorsFolder, 'running.json'), JSON.stringify(runningEmulators, null, 4));
			search.updateDevices(devices);
		}
	},
	async downloadImage(image)
	{
		await studio.filesystem.mkdirp(path.join(imagesFolder, image.type));
		
		let download = progress(request(image.download));
		downloadingImages[image.type] = download;
		
		try {
			download.pipe(fs.createWriteStream(path.join(image.dataFolder, 'image.zip')));
		} catch(e) {
			this.studio.workspace.showError('EMULATOR_DOWNLOAD_ERROR' + {extra: e.message});
		}
		try{
			download.on('progress', (progress) => {
				let percent = (progress.percent * 100).toFixed(2);
				studio.workspace.dispatchToStore('emulator', 'updateDownloadProgress', {image, progress: percent});
			});
		} catch(e) {
			this.studio.workspace.showError('EMULATOR_PROGRESS_ERROR' + {extra: e.message});
		}
		download.on ('abort', () => {
			download.__aborted = true;
		});
		download.on('end', async () => {
			if (!download.__aborted)
			{			
				try{
					let pathing = path.join(image.dataFolder, 'image.zip');
					let unzip =  fs.createReadStream(pathing);
					unzip.pipe(unzipper.Extract({path: image.dataFolder}));
					unzip.on('end', async () => {
						await fs.remove(path.join(image.dataFolder, 'image.zip'));
						studio.workspace.dispatchToStore('emulator', 'updateDownloadProgress', {image, progress: 100});
					});
				} catch(e) {
					console.error(e);
					this.studio.workspace.showError('EMULATOR_UNZIP_ERROR' + {extra: e.message});
					await fs.remove(image.dataFolder);
				}
			}
		});
	},
	async stopDownload(image)
	{
		let download = downloadingImages[image.type];
		download.abort();
		try { 
			await fs.remove(image.dataFolder);
		} catch(e) {
			console.log(e.message);
			studio.workspace.showError('EMULATOR_STOP_DOWNLOAD_ERROR' + {extra: e.message});
		}
		studio.workspace.dispatchToStore('emulator', 'updateDownloadProgress', {image, progress: 0});
	}
};

export function setup(options, imports, register)
{
	studio = imports;

	studio.workspace.registerMenuItem('DEVICE_EMULATOR', 20, () => {
		studio.workspace.showDialog(EmulatorSetup);

	});
	emulator.registerImages();
	emulator.loadAvailableEmulators();

	studio.workspace.registerStore('emulator', emulatorStore);

	register(null, {
		emulator: emulator
	});
}