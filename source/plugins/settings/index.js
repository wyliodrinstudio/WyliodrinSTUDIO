import path from 'path';

let settingsData = {
	
};

export async function setup (options, imports, register)
{
	let filesystem = imports.filesystem;
	let SETTINGS_FOLDER = await filesystem.getSettingsFolder ();
	let SETTINGS_FILE = path.join (SETTINGS_FOLDER, 'settings.json');
	try
	{
		settingsData = JSON.parse (await filesystem.readFile (SETTINGS_FILE));
		if (!settingsData) 
		{
			console.warn ('Error while reading settings file, using default settings');
			settingsData = {};
		}
	}
	catch (e)
	{
		console.warn ('Error while reading settings file ('+e.message+'), using default settings');
	}

	
	let settings = {
		/**
		 * Save plugin settings
		 * @param {string} plugin - plugin name
		 * @param {Object} data - plugin data
		 */
		storeSettings (plugin, data)
		{
			try
			{
				let obj = settingsData;
				obj[plugin]=data;
				let json = JSON.stringify(obj);
				filesystem.writeFile(SETTINGS_FILE, json).then ().catch ((e) => {
					console.error ('Error writing settings file '+e.message);
				});
			}
			catch(e){
				console.error('settings: error storing settings ' + e);
			}
		},
		/**
		 * Load plugin settings
		 * @param {string} plugin - plugin name
		 */
		loadSettings (plugin)
		{
			let data = settingsData[plugin];
			if(data !== undefined){
				return data;
			} else {
				return {};
			}
			
		},

		/**
		 * Store value to settings
		 */
		storeValue (plugin, name, value)
		{
			let data = this.loadSettings (plugin);
			data[name] = value;
			this.storeSettings (plugin, data);
		},

		/**
		 * Load value from settings
		 */
		loadValue (plugin, name, value)
		{
			let data = this.loadSettings (plugin);
			if (data && data[name]) return data[name];
			else return value;
		}
	};

	register (null, {
		settings
	});
}