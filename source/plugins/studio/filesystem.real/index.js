/* eslint no-console: ["warn", { allow: ["warn", "error"] }] */
import os from 'os';
import fs from 'fs-extra';
import path from 'path';
import { remote } from 'electron';
const dialog = remote.dialog;

let filesystem_real = {
	getDefaultFolder ()
	{
		return path.join(this.getUserFolder(), 'WyliodrinSTUDIO');
	},
	getUserFolder ()
	{
		return os.homedir ();
	},
	getTemporaryFolder ()
	{
		return os.tmpdir ();
	},
	getSettingsFolder ()
	{
		let settingsFolder = process.env.WYLIDORIN_STUDIO_SETTINGS || path.join (this.getUserFolder(), '.wyliodrinstudio');
		try
		{
			this.mkdirp (settingsFolder);
		}
		catch (e)
		{
			console.error (e.message);
		}
		return settingsFolder;
	},
	pathExists: fs.pathExists,
	mkdirp: fs.mkdirp,
	writeFile: fs.writeFile,
	remove: fs.remove,
	copy: fs.copy,
	readFile: fs.readFile,
	createWriteStream: fs.createWriteStream,
	readdir: fs.readdir,
	rename: fs.rename,
	async isFile(path)
	{
		let stats =(await fs.lstat(path));
		if(stats) {
			return stats.isFile();
		} else {
			return false;
		}
	},
	async isDirectory(path)
	{
		let stats =(await fs.lstat(path));
		if(stats) {
			return stats.isDirectory();
		} else {
			return false;
		}
	},
	async getSize(path)
	{
		let stats =(await fs.lstat(path));
		if(stats) {
			return stats.size;
		} else {
			return 0;
		}
	},
	async lastModified(path)
	{
		let stats =(await fs.lstat(path));
		if(stats) {
			return stats.mtime;
		} else {
			return false;
		}
	},
	async openExportDialog(data, opts = {}) {
		const options = {
			title:opts.title || 'Export',
			defaultPath: path.join(this.getDefaultFolder(),opts.filename),
			filters: [
				{name:'export', extensions: opts.filetypes || []}
			]
		};
		let file = await dialog.showSaveDialog(remote.getCurrentWindow (), options);
		if (file.filePath) return file.filePath;
		else return null;
		// TODO save the actual data to the file
	},
	readImportFile (file)
	{
		return this.readFile (file.name);
	},
	async openImportDialog(opts = {}) {
		const options = {
			title: opts.title || 'Import',
			defaultPath: this.getDefaultFolder(),
			filters: [
				{name:'import', extensions: opts.filetypes || []}
			]
		};
		let files = await dialog.showOpenDialog(remote.getCurrentWindow (), options);
		let list = [];
		if (files && !files.canceled && files.filePaths)
		{
			for (let f of files.filePaths)
			{
				list.push ({
					name: f
				});
			}
		}
		return list;
	},
	/**
	 * Import a file from the data folder
	 * @param {string} pluginName
	 * @param {string} filename 
	 */
	loadDataFile (pluginName, filename)
	{
		return fs.readFile (path.join (__dirname, '../..', pluginName, 'data', filename));
	},

	/**
	 * Returns an array with file names from a given directory
	 * @param {string} pluginName 
	 * @param {string} dirName 
	 * @returns {Array} File names
	 */
	loadDirFiles (pluginName, dirName)
	{
		const dirFiles = [];

		if (pluginName === 'raspberrypi') {
			pluginName = 'simulators/' + pluginName;
		}

		// const librariesFolder = `${__dirname}/../../plugins/${pluginName}/data/${dirName}`;
		const librariesFolder = path.join(__dirname, '../..', pluginName, 'data', dirName);

		fs.readdirSync(librariesFolder).forEach((file) => {
			dirFiles.push(file);
		});

		return dirFiles;
	},
	
	/**
	 * Is the filesystem persistent?
	 */
	isPersistent ()
	{
		return 'persistent';
	},

	/**
	 * Make the filesystem persistent (for web usually)
	 */
	setPersistent ()
	{
		return;
	}
};

export default function setup(options, imports, register) {
	register(null, {
		filesystem: filesystem_real
	});
}