/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
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
		 * Save plugin settings. 
		 * 
		 * For each plugin that this function is called for, we create an object with 
		 * the data that will be stored and we use the filesystem function **writeFile** to 
		 * save the parsed content into the *SETTINGS_FILE*
		 * 
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
				// TODO show notification
				console.error('settings: error storing settings ' + e);
			}
		},
		/**
		 * Load plugin settings.
		 * 
		 * For the selected plugin, we display the data saved inside the special settings file.
		 * 
		 * @param {string} plugin - plugin name
		 * 
		 * @returns {Object} - the data inside the settings file
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
		 * Store value to settings.
		 * 
		 * The function first loads the existing settings of the selected project, then updates 
		 * the chosen property of the object with the *value*.
		 * 
		 * @param {string} plugin - plugin name
		 * @param {string} name - property name
		 * @param {Object} value - the value to be associated to the property
		 * 
		 */
		storeValue (plugin, name, value)
		{
			let data = this.loadSettings (plugin);
			data[name] = value;
			this.storeSettings (plugin, data);
		},

		/**
		 * Load value from settings.
		 * 
		 * We first load the settings from a chosen plugin using the **loadSettings** function. 
		 * If the setting object exists and if there is a value for the chosen *name* property, 
		 * we return that value.
		 * 
		 * @param {string} plugin - plugin name
		 * @param {string} name - property name
		 * @param {Object} value - the value to be associated to the property 
		 * 
		 * @returns {string} - the value in the settings file
		 */
		loadValue (plugin, name, value)
		{
			let data = this.loadSettings (plugin);
			if (data && data[name] !== undefined) return data[name];
			else return value;
		}
	};

	register (null, {
		settings
	});
}