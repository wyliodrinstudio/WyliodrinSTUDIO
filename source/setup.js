const path = require ('path');
const architect = require ('./architect');
const fs = require ('fs-extra');
const ipcRenderer = require ('electron').ipcRenderer;
const cowsay = require ('cowsay');
const jokesData = require ('./itjokes.js');

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function getJoke ()
{
	let str = '';
	let original = jokesData[getRandomInt (jokesData.length)];
	while (original.length >= 50)
	{
		let index = 50;
		while (index > 0 && original[index] !== ' ') index--;
		if (index === 0) 
		{
			str = str + original;
			original = '';
		}
		else
		{
			str = str + original.substring (0, index) + '\n';
			original = original.substring (index);
		}
	}
	str = str + original;
	return str;
}

async function loadPlugins (pluginsFolder)
{
	let plugins = [];
	try
	{
		let list = await fs.readdir (pluginsFolder);
		let pluginNumber = 0;
		document.querySelector('#loading-progress').style.display='block';
		document.querySelector('#jokes').innerHTML = cowsay.say ({text: getJoke()});
		for (let l of list)
		{
			pluginNumber = pluginNumber + 1;
			if ((await fs.stat (path.join (pluginsFolder, l))).isDirectory())
			{
				try
				{
					if (l !== 'vendors~workspace')
					{
						let package_json = require (path.join (pluginsFolder, l, 'package.json'));
						if (!package_json.plugin.disabled)
						{
							document.querySelector('#loading').innerHTML = 'Loading plugin '+l;
							document.querySelector('#loading-progress-bar').setAttribute ('style', 'width: '+Math.round((pluginNumber/(list.length)*100))+'%');
							console.log ('Loading '+l);
							let plugin = require (path.join (pluginsFolder, l));
							let setupFunction = plugin.setup || plugin.default || plugin;
							if (typeof setupFunction !== 'function')
							{
								throw (new Error ('Plugin '+l+' is missing the setup function'));
							}
							plugins.push ({
								consumes: package_json.plugin.consumes,
								provides: package_json.plugin.provides,
								setup: setupFunction
							});
						}
					}
				}
				catch (e)
				{
					console.error ('Error loading plugin '+l+' '+e.message);
					console.error (e);
				}
			}
		}
	}
	catch (e)
	{
		console.log ('Failed to load plugins '+e.message);
	}
	return plugins;
}

// var configPath = path.join(__dirname, 'plugins.js');
// var config = architect.loadConfig(configPath);
// console.log (config);


async function main ()
{
	architect.createApp(await loadPlugins (path.join(__dirname, 'plugins')), function (err, app) {
		if (err) 
		{
			document.querySelector('#startuperror').innerHTML = 'Startup Error: '+err.message;
			document.querySelector('#startuperror').style.display= 'block';
			console.error (err);
		}
		else
		{
			console.log('Starting Wyliodrin Studio');
			// console.log (app);
			document.querySelector('#jokes').style.display='none';
			document.querySelector('#loading').style.display='none';
			document.querySelector('#loading-progress').style.display='none';
			// document.querySelector('#jokes').style.display='none';
			app.services.workspace.start (app.services);
			app.services.events.emit ('ready', app.services);
			ipcRenderer.send ('loaded');
		}
	});
}

main ();
