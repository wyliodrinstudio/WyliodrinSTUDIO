const fs = require('fs');
const path = require ('path');

const SOURCE_FOLDER = '../../source';

/**  @pluginName {string} gets the name of each plugin, it's used in merge and split commands*/
var pluginName = [];

/** @function 
 * @returns {array} including all messages-ln.json files, ln = language
 * pushes the name of every plugin in pluginName
 * print a warning if other files are included in the translations directory
*/
function findTranslations(dir)
{
	pluginName = fs.readdirSync(dir);

	let jsFiles = [];
	for (let plugin of pluginName) 
	{
		let translationFiles = fs.readdirSync(dir+plugin+'/translations');
		for(let translationFile of translationFiles)
		{
			if(translationFile.match(/messages-[a-z][a-z]\.json$/))
				jsFiles.push('../../source/plugins/' + plugin + '/translations/' + translationFile);
			else
				console.log('Warning: ' + translationFile + ' is not a translation file');
		}
	}
	return jsFiles;
}

// if(process.argv.length === 3 && (process.argv[2] ==='merge' || process.argv[2]==='report' || process.argv[2]==='split'))
// {
// 	let command = process.argv[2];

// 	if(command === 'merge')
// 	{
// 		var jsFiles = findTranslations('../../source/plugins/');
// 		let allLanguages = [];

// 		/** search languages in every plugin*/
// 		for(let file of jsFiles)
// 		{
// 			/** takes the ln part from messages-ln.json file name */
// 			let language = file.substr(file.length - 7,2);

// 			/** check if the file name matches "messages-ln.json" (ln = language) and create an array with all the languages*/
// 			if(file.substr(file.length - 16, 16).match(/messages-[a-z][a-z]\.json/))
// 			{
// 				if(allLanguages.indexOf(language) === -1)
// 					allLanguages.push(language);
// 			}
// 		}

// 		/** for each language, take the translation from each plugin*/
// 		for(let language of allLanguages)
// 		{
// 			let object = {};
// 			for(let file of jsFiles)
// 			{
// 				/** check if the file name matches the current language in @allLanguages */
// 				if(file.substr(file.length - 7, 2) === language)
// 				{
// 					/**check if the current file has a correct .json format */
// 					try
// 					{
// 						let source = JSON.parse(fs.readFileSync(file).toString());
// 						/**looping throug all the keys and creating an object which combines the translations from all the plugins */
// 						for(let key in Object.keys(source))
// 						{
// 							if(object[Object.keys(source)[key]] === undefined)
// 							{
// 								/**search the plugin name in the file path */
// 								for(let plug of pluginName)
// 									if(file.indexOf(plug) > -1)
// 										location = plug;
// 								object[Object.keys(source)[key]] = Object.values(source)[key];
// 								object[Object.keys(source)[key]].plugin = location;
// 							}
// 							/** check if a key is translated in multiple plugin files */
// 							else
// 								console.log('Error: Key "' + Object.keys(source)[key] + '" is already in the ' +  object[Object.keys(source)[key]].plugin + ' folder in ' + language);
							
// 							let path = './messages-' + language + '.json';
// 							fs.writeFileSync(path,JSON.stringify(object,null,3));
// 						}
// 					}
// 					catch(e)
// 					{
// 						console.log('Error in: ' + file + ' file: ' +e.message);
// 					}
// 				}
// 			}
// 		}
// 	}
// 	else
// 	/** print missing keys from every translation language, using messages-en.json as a reference file */
// 	if(command === 'report')
// 	{
// 		try
// 		{
// 			var translation_english = JSON.parse(fs.readFileSync('messages-en.json').toString());
// 		}
// 		catch(e)
// 		{
// 			console.log('Error: ' + e.message + ' Missing english translation, please run \'merge\' command first.');
// 		}
// 			/**search for all the translation files in the current directory */
// 		let jsFiles = [];
// 		let translationFiles = fs.readdirSync('.');

// 		for(let file  of translationFiles)
// 		{
// 			if(file.match(/messages-[a-z][a-z]\.json/))
// 				jsFiles.push(file);
// 			else
// 				console.log('Warning: ' + file +' is not a translation file.');
// 		}

// 		if(jsFiles.length > 1)
// 		{
// 			for(let file of jsFiles)
// 			{
// 				if(file!=='./messages-en.json')
// 				{
// 					try
// 					{
// 						let translation = JSON.parse(fs.readFileSync(file).toString());
// 						let common_keys = [];
// 						let translationLanguage = Object.keys(translation), 
// 							referenceLanguage= Object.keys(translation_english), 
// 							m = translationLanguage.length, 
// 							n = referenceLanguage.length;
						
// 						/** search for common keys between english and translation language*/
// 						for(let i=0; i<m; i++)
// 							for(let j=0; j<n; j++)
// 								if(translationLanguage[i]=== referenceLanguage[j])
// 									common_keys[translationLanguage[i]]=1;

// 						/** print missing keys from translation language*/
// 						for(let j =0; j<Object.keys(translation_english).length; j++)
// 							if(common_keys[Object.keys(translation_english)[j]] !== 1)
// 								console.log('Error: Key "'+Object.keys(translation_english)[j]+'" is missing '+ file.substr(file.length - 7, 2)+' translation');
// 					}
// 					catch(e)
// 					{
// 						console.log('Error in ' + file + ' file: '+e.message);
// 					}		
// 				}
// 			}
// 		}
// 	}
// 	else
// 	/** for each language other than english, search the name of the plugin and split the keys and values*/
// 	if(command === 'split')
// 	{
// 		let jsFiles = [];
// 		let translationFiles = fs.readdirSync('.');

// 		for(let file  of translationFiles)
// 		{
// 			if(file.match(/messages-[a-z][a-z]\.json/))
// 				jsFiles.push(file);
// 			else
// 				console.log('Warning: ' + file +' is not a translation file.');
// 		}
// 		if(jsFiles.length > 1)
// 		{
// 			for(let file of jsFiles)
// 			{
// 				let object = {};

				
// 				if(file!=='./messages-en.json')
// 				{
// 					try
// 					{
// 						let translation = JSON.parse(fs.readFileSync(file).toString());
// 						for(let i =0; i<Object.keys(translation).length; i++)
// 						{
// 							let plugin = '../../source/plugins/' + Object.values(translation)[i].plugin + '/translations/' + file;
// 							object[Object.keys(translation)[i]] = Object.values(translation)[i];
// 							fs.writeFileSync(plugin, JSON.stringify(object, null, 3));
// 						}
// 					}
// 					catch(e)
// 					{
// 						console.log('Error in ' + file + ' file: '+e.message);
// 					}
					
// 				}
// 			}
// 		}
// 	}
// }
// else
// {
// 	console.log(`Help menu: You must run the code with one of the following commands: 
// 						\n\t Merge: join the translation files for each language, from all the plugins
// 						\n\t Report: print missing keys from every translation language, using english as reference 
// 						\n\t Split: for each language other than english, search the name of the plugin and split the keys and values`);
// }

function loadTranslation (plugin, language='en')
{
	let translationFile = path.join (__dirname,SOURCE_FOLDER,'plugins/',plugin,'/translations/messages-'+language+'.json');
	// console.log (translationFile);
	if (fs.existsSync (translationFile))
	{
		try
		{
			let translation = JSON.parse (fs.readFileSync (translationFile));
			return translation;
		}
		catch (e)
		{
			console.log ('error '+plugin+' ('+language+'): loading translation ids for pluign file with '+e.message);
		}
	}
	else
	{
		// console.log ('info '+plugin+' ('+language+'): no translation files');
	}
	return {};
}

function listPluginNames ()
{
	let pluginNames = [];
	// let pluginsPath = path.join (__dirname, SOURCE_FOLDER, 'plugins');
	// let plugins = fs.readdirSync (pluginsPath);
	// let workspaceIndex = plugins.findIndex (pluginName => pluginName === 'workspace');
	// if (workspaceIndex !== -1)
	// {
	// 	plugins.splice (workspaceIndex, 1);
	// 	plugins.splice (0, 0, 'workspace');
	// }
	// for (let pluginName of plugins)
	// {
	// 	if (pluginName !== '.' && pluginName !== '..')
	// 	{
	// 		pluginNames.push (pluginName);
	// 	}
	// }
	function loadPluginsFolder (folder) {
		let localFolder = path.join (__dirname,SOURCE_FOLDER,'plugins', folder);
		let allPlugins = fs.readdirSync(localFolder).filter (file => file !== '.' && file !== '..' && fs.statSync (path.join (localFolder, file)).isDirectory());

		for(let plugin of allPlugins)
		{
			let file_package_json = path.join (localFolder, plugin, 'package.json');
			if (fs.existsSync (file_package_json))
			{
				pluginNames.push (folder+'/'+plugin);
			}
			else
			{
				loadPluginsFolder (path.join (folder, plugin));
			}
		}
	}

	loadPluginsFolder ('');

	return pluginNames;
}

function loadAllTranslationIds (language='en')
{
	let allTranslationIds = {};
	let plugins = listPluginNames ();
	console.log (plugins);
	for (let pluginName of plugins)
	{
		console.error (pluginName);
		let translation = loadTranslation (pluginName, language);
		for (let id of Object.keys (translation))
		{
			delete translation[id].plugin;
			if (!translation[id].description)
			{
				if (englishTranslation[id] && englishTranslation[id].description)
				{
					translation[id].description = englishTranslation[id].description;
				}
				else
				{
					console.log ('warning '+pluginName+' ('+language+'): id '+id+' has no description');
				}
			}
			if (!allTranslationIds[id])
			{
				allTranslationIds[id] = {
					plugins: [pluginName],
					...translation[id]
				};
			}
			else
			{
				allTranslationIds[id].plugins.push (pluginName);
				console.log ('warning '+pluginName+' ('+language+'): duplicate id '+id+' (found in '+allTranslationIds[id].plugins.join (', ')+')');
			}
		}
	}
	return allTranslationIds;
}

function loadLanguages ()
{
	let languageIds = {};
	let pluginsPath = path.join (__dirname, SOURCE_FOLDER, 'plugins');
	let plugins = listPluginNames ();

	for (let pluginName of plugins)
	{
		try
		{
			let translations = fs.readdirSync (path.join (pluginsPath, pluginName, 'translations'));
			for (let translation of translations)
			{
				let data = translation.match (/^messages-([a-z]{2})\.json$/);
				if (translation !== '.' && translation !== '..')
				{
					if (data)
					{
						languageIds[data[1]] = data[1];
					}
					else
					{
						console.log ('error '+pluginName+' ('+translation+'): translation filename is has the wrong syntax');
					}
				}
			}
		}
		catch (e)
		{
			// console.log ('error '+pluginName+': listing languages failed with '+e.message);
		}
	}

	return Object.keys (languageIds);
}

function loadLanguagesForSending ()
{
	let languageIds = {};
	let translations = fs.readdirSync (__dirname);
	for (let translation of translations)
	{
		let data = translation.match (/^messages-([a-z]{2})\.json$/);
		if (translation !== '.' && translation !== '..')
		{
			if (data)
			{
				languageIds[data[1]] = data[1];
			}
			else
			{
				// console.log ('error '+pluginName+' ('+translation+'): translation filename is has the wrong syntax');
			}
		}
	}
	return Object.keys (languageIds);
}

function verifyTranslation (plugin, language)
{
	let translationEnglish = loadTranslation (plugin);
	let translation = loadTranslation (plugin, language);
	/* verify missing ids */
	for (let id of Object.keys (translationEnglish))
	{
		if (!translation[id]) console.log ('warning '+plugin+' ('+language+'): missing id '+id);
	}
	/* verify extra ids */
	for (let id of Object.keys (translation))
	{
		if (!translationEnglish[id]) console.log ('warning '+plugin+' ('+language+'): extra id '+id);
	}
}

function sendTranslation (language)
{
	let pluginTranslations = {};
	let pluginsPath = path.join (__dirname, SOURCE_FOLDER, 'plugins');
	try
	{
		let translation = JSON.parse (fs.readFileSync ('./messages-'+language+'.json'));
		for (let id of Object.keys (translation))
		{
			for (let pluginName of translation[id].plugins)
			{
				if (!pluginTranslations[pluginName])
				{
					pluginTranslations[pluginName] = {};
				}
				pluginTranslations[pluginName][id] = {
					message: translation[id].message,
					description: translation[id].description
				};
			}
		}
		for (let pluginName in pluginTranslations)
		{
			fs.writeFileSync (path.join (pluginsPath, pluginName, 'translations', 'messages-'+language+'.json'), JSON.stringify (pluginTranslations[pluginName], null, 4));
		}
	}
	catch (e)
	{
		console.log ('error '+language+': loading translation file failed with '+e.message);
	}

}

let englishTranslation = {};

if (!process.argv[2])
{
	console.log ('Loading languages');

	let languages = loadLanguages ();
	console.log ();

	console.log ('Loading translations\n============================');
	englishTranslation = loadAllTranslationIds ('en');
	fs.writeFileSync ('messages-en.json',JSON.stringify (englishTranslation, null, 2));
	for (let language of languages)
	{
		if (language !== 'en')
		{
			let allTranslation = loadAllTranslationIds (language);
			fs.writeFileSync ('messages-'+language+'.json',JSON.stringify (allTranslation, null, 2));
		}
	}
	console.log ();

	console.log ('Verifying translation ids\n==============================');
	let pluginNames = listPluginNames ();
	for (let pluginName of pluginNames)
	{
		for (let language of languages)
		{
			if (language !== 'en')
			{
				verifyTranslation (pluginName, language);
			}
		}
	}
}
else
if (process.argv[2] === 'send')
{
	let languages = loadLanguagesForSending ();
	for (let language of languages)
	{
		console.log ('Sending '+language);
		sendTranslation (language);
	}
}

// console.log (JSON.stringify (loadAllTranslationIds(), null, 4));