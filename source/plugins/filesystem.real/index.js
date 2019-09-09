import os from 'os';
import fs from 'fs-extra';
import path from 'path';
import { remote } from 'electron';
const dialog = remote.dialog;
let studio = null;

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
		return process.env.WYLIDORIN_STUDIO_SETTINGS || path.join (this.getUserFolder(), '.wyliodrinstudio');
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
	openExportDialog(data, opts = {}) {
		const options = {
			title:opts.title || 'Export',
			defaultPath: this.getDefaultFolder(),
			filters: [
				{name:'export', extensions: opts.filetypes || []}
			]
		};
		return dialog.showSaveDialog(null, options);
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
		let files = await dialog.showOpenDialog(null, options);
		let list = [];
		if (files)
		{
			for (let f of files)
			{
				list.push ({
					name: f
				});
			}
		}
		return list;
	},
	
};

export default function setup(options, imports, register) {
	studio = imports;
	studio.filesystem.registerFileSystem('fs', filesystem_real);
	register(null, {});
}