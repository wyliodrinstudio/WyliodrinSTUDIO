const path = require ('path');
const fs = require ('fs-extra');
const _ = require ('lodash');

class TranslationPlugin {
	apply(compiler) {
		compiler.hooks.environment.tap('Translation Plugin', () => {
			console.log('Writing translation files');
			// TODO apply merge here
			
			let allPlugins = fs.readdirSync('source/plugins');
			var TRANSLATION_WRITE = 'source/plugins/workspace/translations.json';
			var languages = {};
			var translations = {};
			for(let plugin of allPlugins)
			{
				try
				{
					let TRANSLATION_READ = 'source/plugins/'+plugin+'/translations/';
					let languageList = fs.readdirSync (TRANSLATION_READ);

					for (let file of languageList)
					{
						try
						{
							let fileTranslated = path.basename( file, '.json' );
							if (fileTranslated.startsWith('messages-'))
							{
								let newObject = {};

								let language = require('./'+path.join (TRANSLATION_READ,fileTranslated));
								let languageKey = fileTranslated.substring(9);
								if (!translations[languageKey]) translations[languageKey] = {};
								for (let key in language) {
									let value = language[key];
									newObject[key] = value.message;
									if (key === 'LANGUAGE')
									{
										languages[languageKey] = value.message;
									}
								}
								_.assign (translations[languageKey], newObject);
								// try
								// {
								// 	result[languageKey] = JSON.parse(fs.readFileSync(path.join(TRANSLATION_READ,file)).toString()).LANGUAGE.message;
								// }
								// catch(e)
								// {
								// 	console.log('Error in file: ' + path.join(TRANSLATION_READ,file) + '.' + e.message);
								// }
								// console.log ('Language ' + fileTranslated.substring(9).toString() + ' added.');
								// console.log (newObject);
								// languages.push(newObject);
							}
						}
						catch(e)
						{
							if (e.message.indexOf ('ENOENT') === -1)
							{
								console.log('Error: ' + e.message);
							}
						}
					}
				}
				catch(e)
				{
					console.log(e.message);
				}

			}
			
			// var allLanguages = Object.values(result);
			// var allLanguageKeys = Object.keys(result);
			// let final = {}; 
			// for(let eachLanguage in allLanguages)
			// {
			// 	var allTranslations = {};
			// 	for(let object of languages)
			// 		if(object.LANGUAGE === allLanguages[eachLanguage])
			// 		{
			// 			let allKeys = Object.keys(object);
			// 			let allValues = Object.values(object);
			// 			for(let key in allKeys)
			// 				allTranslations[allKeys[key]] = allValues[key];
			// 		}
				
			// 	final[allLanguageKeys[eachLanguage]] = allTranslations;
			// }
			//cheia
			fs.writeFileSync (TRANSLATION_WRITE, JSON.stringify ({LANGUAGES: languages, TRANSLATION: translations}, null, 3), {'flags': 'a'});
		});
	
	}
}

module.exports = TranslationPlugin;