import os from 'os';
import fs, { truncateSync } from 'fs-extra';
import path from 'path';
import JSZip from 'jszip';
import { remote } from 'electron';
const dialog = remote.dialog;
let studio = null;

let filesystem_real = {
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
	async exportFolder(dir,basePath) {

        // we know what directory we want
		const sourceDir = dir;
		console.log(dir);
		const options = {
			title:path.basename(dir),
			defaultPath: basePath
			,
			filters: [
				{name:'zip', extensions: ['zip']}
			]
		};
		let savePath = dialog.showSaveDialog(null, options);
		let zip = new JSZip();
        if(await this.buildZipFromDirectory(sourceDir, zip, sourceDir)) {
			const zipContent = await zip.generateAsync({
				type: 'nodebuffer',
				comment: 'Project Archive',
				compression: "DEFLATE",
				compressionOptions: {
					level: 9
				}
			});
			console.log(zipContent);
	
			/** create zip file */
			await fs.writeFile(savePath, zipContent);
		}

        /** generate zip file content */
        
    },

    // returns a flat array of absolute paths of all files recursively contained in the dir
    async buildZipFromDirectory(dir, zip, root) {
		try {
			const list = await fs.readdir(dir);
			if(list) {
				for (let file of list) {
					file = path.resolve(dir, file)
					if (await this.isDirectory(file)) {
						this.buildZipFromDirectory(file, zip, root)
					} else {
						const filedata = await fs.readFile(file);
						if(filedata) {
							zip.file(path.relative(root, file), filedata);
						}
						
					}
				}
			}
			return true;
		} catch(e) {
			console.error(e);
		}
        
    }

};

export default function setup(options, imports, register) {
	studio = imports;

	studio.filesystem.registerFileSystem('fs', filesystem_real);

	register(null, {});
}