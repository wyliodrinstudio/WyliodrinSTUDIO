import QEMUEmulatorSetup from './views/QEMUEmulatorSetup.vue';
import emulatorStore from './store';
import { v4 } from 'uuid';
import fs from 'fs-extra';
import kill from 'tree-kill';
import axios from 'axios';
import unzipper from 'unzipper';
import path from 'path'; 

const QEMU = 'qemu-system-';
let qemu = null;
let studio = null;
let search = null;
let qemuCheck = false;
let downloadingImages = {};
let runningEmulators = {};
let images = [];
let devices = [];
let runningEmulatorImage = '';
let runningEmulatorKernel = '';
let runningEmulatorDatabase = '';
let emulatorPort = '';
let emulatorFolder = '';
let runningEmulatorsFolder = '';
let imagesFolder = '';
let imageTypeFolder = '';
let currentlyRunningFolder = '';
let qemuExitCode = {};

const { spawn } = require ('child_process');

let qemu_wyapp = {
	store: null,
	registerEmulator(name, id, type, user, password, image, port, runningFolder, icon, qemu)
	{
		let sameEmulator = Object.keys(runningEmulators).find((qemu_wyapp) => qemu_wyapp === name);
		if(!sameEmulator)
		{
			let item = {
				name,
				id, 
				type, 
				user, 
				password, 
				image, 
				port,
				runningFolder,
				icon,
				qemu
			};
			runningEmulators[name] = item;
			studio.workspace.dispatchToStore('qemu_wyapp', 'runningEmulators', runningEmulators);
		}
		else
		{
			studio.workspace.showError('EMULATOR_SAME_NAME');
		}
	},
	async registerImages()
	{
		emulatorFolder = path.join(studio.filesystem.getSettingsFolder(), 'qemu_wyapp');
		await studio.filesystem.mkdirp(emulatorFolder);
		
		imagesFolder = path.join(emulatorFolder, 'images');
		await studio.filesystem.mkdirp(imagesFolder);

		images = require('./images.json');

		for(let image of images)
		{
			image.id = v4();

			imageTypeFolder = path.join(imagesFolder, image.type);
			image.dataFolder = imageTypeFolder;
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

			const check = spawn(QEMU + image.qemu.system, ['--version'], {
				env: process.env
			});
			check.on('close',  (code) => {
				if(code !== 0)
				{
					qemuCheck = true;
					studio.workspace.dispatchToStore('qemu_wyapp', 'qemuCheck', qemuCheck);
				}
				else
				{
					qemuCheck = false;
					studio.workspace.dispatchToStore('qemu_wyapp', 'qemuCheck', qemuCheck);
				}
				qemuExitCode[image.type] = code;
			});
			check.on('error', (err) => {studio.workspace.error('err code is', err);});
		} 
	
		runningEmulatorsFolder = path.join(emulatorFolder, 'runningEmulators');
		await studio.filesystem.mkdirp(runningEmulatorsFolder);

		if (!search)
		{
			search = studio.device_wyapp.registerSearch ('qemu_wyapp');
		}
		studio.workspace.dispatchToStore('qemu_wyapp', 'images', images);
	},
	async deleteImage(image)
	{
		let value = await studio.workspace.showConfirmationPrompt(
			'EMULATOR_DELETE_IMAGE_TITLE',
			'EMULATOR_DELETE_IMAGE_QUESTION',
		);
		if (value) {
			try{
				await fs.unlink(path.join(image.dataFolder, image.name));
			} catch(e) {
				studio.workspace.error(e.message);
			}
			try{
				await fs.unlink(path.join(image.dataFolder, image.qemu.kernel));
			} catch(e) {
				studio.workspace.error(e.message);
			}
			try{
				await fs.unlink(path.join(image.dataFolder, image.qemu.dtb));
			} catch(e) {
				studio.workspace.error(e.message);
			}
			
			studio.workspace.dispatchToStore('qemu_wyapp', 'images', images);
			studio.workspace.dispatchToStore('qemu_wyapp', 'updateDownloadProgress', {image, progress: -1});
		}
	},
	async loadAvailableEmulators() 
	{
		let jsonFile = path.join(studio.filesystem.getSettingsFolder(), 'qemu_wyapp', 'runningEmulators', 'running.json');

		try {
			let availableEmulators = await fs.readFile(jsonFile);
			runningEmulators = JSON.parse(availableEmulators);
			studio.workspace.dispatchToStore('qemu_wyapp', 'runningEmulators', runningEmulators);
		} catch(e)
		{
			studio.workspace.error(e.message);
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
		else if(qemuExitCode[imageRunning.type] === 0)
		{
			qemuCheck = false;
			studio.workspace.dispatchToStore('qemu_wyapp', 'qemuCheck', qemuCheck);
			let emulatorName = await studio.workspace.showPrompt('EMULATOR_NAME', 'EMULATOR_CHOOSE_NAME');
			if(emulatorName && !runningEmulators[emulatorName]) {
				for(let image of images)
				{
					if(image.type === imageRunning.type)
					{
						image.loadingEmulator = 'yes';
						studio.workspace.dispatchToStore('qemu_wyapp', 'images', images);
						
						currentlyRunningFolder = path.join(runningEmulatorsFolder, emulatorName);
						await studio.filesystem.mkdirp(currentlyRunningFolder);
						
						let copyImage = path.join(imagesFolder, imageRunning.type, image.name);
						
						runningEmulatorImage = path.join(currentlyRunningFolder, emulatorName + '_' + image.name);
						runningEmulatorKernel = path.join(currentlyRunningFolder, 'kernel-qemu-4.14.79-stretch');
						runningEmulatorDatabase = path.join(currentlyRunningFolder, 'versatile-pb.dtb');
						
						try{ 
							await fs.copyFile(copyImage, runningEmulatorImage);
						} catch(e) {
							studio.workspace.showError('EMULATOR_COPY_FILE_ERROR', {extra: e.message});
							image.loadingEmulator = 'no';
							studio.workspace.dispatchToStore('qemu_wyapp', 'images', images);
							await fs.remove(currentlyRunningFolder);
							return;
						}
						let copyKernel = path.join(imagesFolder, imageRunning.type, 'kernel-qemu-4.14.79-stretch');
						try{ 
							await fs.copyFile(copyKernel, runningEmulatorKernel);
						} catch(e) {
							studio.workspace.showError('EMULATOR_COPY_FILE_ERROR', {extra: e.message});
							image.loadingEmulator = 'no';
							studio.workspace.dispatchToStore('qemu_wyapp', 'images', images);
							await fs.remove(currentlyRunningFolder);
							return;
						}
						let copyDatabase = path.join(imagesFolder, imageRunning.type, 'versatile-pb.dtb');
						try{ 
							await fs.copyFile(copyDatabase, runningEmulatorDatabase);
						} catch(e) {
							studio.workspace.showError('EMULATOR_COPY_FILE_ERROR', {extra: e.message});
							image.loadingEmulator = 'no';
							studio.workspace.dispatchToStore('qemu_wyapp', 'images', images);
							await fs.remove(currentlyRunningFolder);
							return;
						}

						image.loadingEmulator = 'no';
						studio.workspace.dispatchToStore('qemu_wyapp', 'images', images);
					}
				}
				emulatorPort = Math.floor(Math.random() * (10000 - 1024)) + 1024;

				this.registerEmulator(emulatorName, v4(), imageRunning.type, 'pi', 'raspberry', runningEmulatorImage, emulatorPort, currentlyRunningFolder, imageRunning.icon, imageRunning.qemu);

				fs.writeFileSync(path.join(runningEmulatorsFolder, 'running.json'), JSON.stringify(runningEmulators, null, 4));
							
				this.startEmulator(runningEmulators[emulatorName]);
			}
			else {
				studio.workspace.showError('EMULATOR_INVALID_NAME');
			}
		}
		else {
			studio.workspace.showError('EMULATOR_MISSING_QEMU_ERROR', {system: imageRunning.qemu.system});
		}
	},
	startEmulator(qemu_wyapp)
	{	
		let parameters = ['-net', 'nic', '-net', 'user,id=ethernet.0,hostfwd=tcp::' + emulatorPort + '-:22', '-no-reboot'];
		if(qemu_wyapp.qemu.kernel)
			parameters.push('-kernel', path.join(imagesFolder, qemu_wyapp.type, qemu_wyapp.qemu.kernel));
		if(qemu_wyapp.qemu.dtb)
			parameters.push('-dtb', path.join(imagesFolder, qemu_wyapp.type, qemu_wyapp.qemu.dtb));
		if(qemu_wyapp.qemu.mem)
			parameters.push('-m', qemu_wyapp.qemu.mem);
		if(qemu_wyapp.qemu.machine)
			parameters.push('-M', qemu_wyapp.qemu.machine);
		if(qemu_wyapp.qemu.cpu)
			parameters.push('-cpu', qemu_wyapp.qemu.cpu);
		if(qemu_wyapp.qemu.serial)
			parameters.push('-serial', qemu_wyapp.qemu.serial);
		if(qemu_wyapp.qemu.cmdline)
			parameters.push('-append', qemu_wyapp.qemu.cmdline);
		if(qemu_wyapp.qemu.drive)
			parameters.push('-drive', qemu_wyapp.qemu.drive + qemu_wyapp.image + ',format=raw');
		if(qemu_wyapp.qemu.hda)
			parameters.push('-hda', qemu_wyapp.image);
		if(qemu_wyapp.qemu.boot)
			parameters.push('-boot', qemu_wyapp.qemu.boot);
		qemu = spawn(QEMU + qemu_wyapp.qemu.system, parameters, {
			env: process.env
		});
		qemu.stdout.on('data', () => {
			runningEmulators[qemu_wyapp.name].running = 1;
			runningEmulators[qemu_wyapp.name].pid = qemu.pid;
			studio.workspace.dispatchToStore('qemu_wyapp', 'runningEmulators', runningEmulators);
		});
		
		qemu.stderr.on('data', (data) => {
			studio.workspace.error(`stderr: ${data}`);
		});
		qemu.on('close', async () => {
			devices = devices.filter(device => device.port !== runningEmulators[qemu_wyapp.name].port);
			runningEmulators[qemu_wyapp.name].running = 0;
			studio.workspace.dispatchToStore('qemu_wyapp', 'runningEmulators', runningEmulators);
			await fs.writeFile(path.join(runningEmulatorsFolder, 'running.json'), JSON.stringify(runningEmulators, null, 4));
			search.updateDevices(devices);
		});
		devices.push ({
			id: 'wyapp:qemu_wyapp:' + runningEmulators[qemu_wyapp.name].port,
			transport: 'ssh',
			address: '127.0.0.1',
			name: qemu_wyapp.name,
			priority: studio.workspace.DEVICE_PRIORITY_HIGH,
			port: runningEmulators[qemu_wyapp.name].port,
			board: qemu_wyapp.type,
			properties: {
				category: qemu_wyapp.type,
				platform: 'linux'
			}
		});
		search.updateDevices(devices);
		studio.workspace.dispatchToStore('workspace', 'devices', devices);
	},
	async stopEmulator(qemu_wyapp)
	{
		if(qemu_wyapp && runningEmulators[qemu_wyapp.name])
		{
			if (runningEmulators[qemu_wyapp.name].pid)
			{
				kill(runningEmulators[qemu_wyapp.name].pid, 'SIGKILL');
			}
			devices = devices.filter(device => device.port !== runningEmulators[qemu_wyapp.name].port);
			runningEmulators[qemu_wyapp.name].running = 0;
			studio.workspace.dispatchToStore('qemu_wyapp', 'runningEmulators', runningEmulators);
			await fs.writeFile(path.join(runningEmulatorsFolder, 'running.json'), JSON.stringify(runningEmulators, null, 4));
			search.updateDevices(devices);
		}
	},
	async deleteEmulator(qemu_wyapp)
	{
		if(qemu_wyapp)
		{
			let value = await studio.workspace.showConfirmationPrompt(
				'EMULATOR_DELETE_EMULATOR_TITLE',
				'EMULATOR_DELETE_EMULATOR_QUESTION',
			);
			if (value) {
				if (runningEmulators[qemu_wyapp.name].pid)
				{
					kill(runningEmulators[qemu_wyapp.name].pid, 'SIGKILL');
				}
				await fs.remove(runningEmulators[qemu_wyapp.name].runningFolder);
				devices = devices.filter(device => device.port !== runningEmulators[qemu_wyapp.name].port);
				delete runningEmulators[qemu_wyapp.name];
				studio.workspace.dispatchToStore('qemu_wyapp', 'runningEmulators', runningEmulators);
				await fs.writeFile(path.join(runningEmulatorsFolder, 'running.json'), JSON.stringify(runningEmulators, null, 4));
				search.updateDevices(devices);
			}
		}
	},
	async downloadImage(image)
	{
		if(image) {
			await studio.filesystem.mkdirp(path.join(imagesFolder, image.type));
			
			let download = await axios.request ({
				url: image.download,
				method: 'GET',
				responseType: 'stream',
				onDownloadProgress: (progressEvent) => {
					var percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
					studio.workspace.dispatchToStore('qemu_wyapp', 'updateDownloadProgress', {image, progress: percent});
				},
			});

			downloadingImages[image.type] = download;
			
			try {
				download.pipe(fs.createWriteStream(path.join(image.dataFolder, 'image.zip')));
			} catch(e) {
				this.studio.workspace.showError('EMULATOR_DOWNLOAD_ERROR' + {extra: e.message});
			}
			
			download.data.on ('abort', () => {
				download.__aborted = true;
			});
			download.data.on('end', async () => {
				if (!download.__aborted)
				{			
					try{
						let pathing = path.join(image.dataFolder, 'image.zip');
						let unzip =  fs.createReadStream(pathing);
						unzip.pipe(unzipper.Extract({path: image.dataFolder}));
						unzip.on('end', async () => {
							await fs.remove(path.join(image.dataFolder, 'image.zip'));
							studio.workspace.dispatchToStore('qemu_wyapp', 'updateDownloadProgress', {image, progress: 100});
						});
					} catch(e) {
						studio.workspace.error(e);
						this.studio.workspace.showError('EMULATOR_UNZIP_ERROR' + {extra: e.message});
						await fs.remove(image.dataFolder);
					}
				}
			});
		}
	},
	async stopDownload(image)
	{
		if(image)
		{
			let download = downloadingImages[image.type];
			download.abort();
			try { 
				await fs.remove(image.dataFolder);
			} catch(e) {
				studio.workspace.error(e.message);
				studio.workspace.showError('EMULATOR_STOP_DOWNLOAD_ERROR' + {extra: e.message});
			}
			studio.workspace.dispatchToStore('qemu_wyapp', 'updateDownloadProgress', {image, progress: 0});
		}
	}
};

export function setup(options, imports, register)
{
	studio = imports;

	studio.workspace.registerMenuItem('DEVICE_EMULATOR', 20, () => {
		studio.workspace.showDialog(QEMUEmulatorSetup,{width:'600px'});

	});
	qemu_wyapp.registerImages();
	qemu_wyapp.loadAvailableEmulators();

	studio.workspace.registerStore('qemu_wyapp', emulatorStore);

	register(null, {
		qemu_wyapp: qemu_wyapp
	});
}