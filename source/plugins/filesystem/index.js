let studio = null;

let filesystems = {};

let defaultFileSystem = null;

let filesystem = {
	_runFileSystemFn (fn, defaultValue, ...data)
	{
		
		let filesystem = filesystems[defaultFileSystem];
		if (filesystem) return filesystem[fn](...data);
		else
		{
			console.error ('filesystem: function '+fn+' is not defined');
		}
		return defaultValue;
	},

	getUserFolder ()
	{
		return this._runFileSystemFn ('getUserFolder');
	},

	getTemporaryFolder ()
	{
		return this._runFileSystemFn ('getTemporaryFolder');
	},

	getSettingsFolder ()
	{
		let settingsFolder = this._runFileSystemFn ('getSettingsFolder');
		try
		{
			this.mkdirp (settingsFolder);
		}
		catch (e)
		{
			console.log (e.message);
		}
		return settingsFolder;
	},

	pathExists(path)
	{
		return this._runFileSystemFn ('pathExists', false, path);
		// use the default filesystem
	},

	mkdirp(path)
	{
		return this._runFileSystemFn('mkdirp', false, path);
	},

	writeFile(path, data)
	{
		return this._runFileSystemFn('writeFile', false, path, data);
	},

	remove(path)
	{	
		return this._runFileSystemFn('remove', false, path);
	},

	copy(src, dest)
	{
		return this._runFileSystemFn('copy', false, src, dest);
	},

	readFile(file)
	{
		return this._runFileSystemFn('readFile', null, file);
	},

	createWriteStream(src)
	{
		return this._runFileSystemFn('createWriteStream', false, src);
	},

	readdir(path)
	{
		return this._runFileSystemFn('readdir', [], path);
	},

	rename(oldFile, newFile)
	{
		return this._runFileSystemFn('rename', null, oldFile, newFile);
	},

	isFile(path)
	{
		return this._runFileSystemFn('isFile', false, path);
	},
	
	isDirectory(path)
	{
		return this._runFileSystemFn('isDirectory', false, path);
	},
	
	lastModified(path)
	{
		return this._runFileSystemFn('lastModified',false,path);
	},

	getSize(path)
	{
		return this._runFileSystemFn('getSize', 0, path);
	},

	openExportDialog(data, options = {})
	{
		return this._runFileSystemFn('openExportDialog',null,data, options);
	},

	readImportFile(file)
	{
		return this._runFileSystemFn('readImportFile',null,file);
	},

	openImportDialog(options = {})
	{
		return this._runFileSystemFn('openImportDialog',null,options);
	},

	registerFileSystem (id, filesystem)
	{
		if (!filesystems[id])
		{
			filesystems[id] = filesystem;
			this.selectDefaultFileSystem(id);
			// if (!defaultFileSystem) defaultFileSystem = id;
		}
		else
		{
			console.warn('REAL_FS_ALREADY_REGISTERED_FS');
		}
	},

	/**
	 * Import a file from the data folder
	 * @param {string} pluginName 
	 * @param {string} filename 
	 */
	loadDataFile (pluginName, filename)
	{
		return this._runFileSystemFn('loadDataFile',null,pluginName, filename);
	},

	selectDefaultFileSystem (id)
	{
		if (filesystems[id])
		{
			defaultFileSystem = id;
		}
		else
		{
			studio.workspace.error ('REAL_FS_DO_NOT_EXIST_FS');
		}
	},

	/**
	 * Is the filesystem persistent?
	 * @returns {string} - never/prompt/persisted
	 */
	isPersistent ()
	{
		return this._runFileSystemFn ('isPersistent');
	},

	/**
	 * Make the filesystem persistent (for web usually)
	 */
	setPersistent ()
	{
		return this._runFileSystemFn ('setPersistent');
	}
};

export default function setup(options, imports, register) {
	studio = imports;
	register(null, {
		filesystem: filesystem
	});
}