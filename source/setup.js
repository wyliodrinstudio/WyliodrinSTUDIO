const path = require ('path');
const architect = require ('./architect');
const fs = require ('fs-extra');
const ipcRenderer = require ('electron').ipcRenderer;
const oneLinerJoke = require('one-liner-joke');

let itstuff = oneLinerJoke.getRandomJokeWithTag('IT', {
	'exclude_tags': ['dirty', 'racist', 'marriage', 'sex', 'women']
});

async function loadPlugins (pluginsFolder)
{
	let plugins = [];
	try
	{
		let list = await fs.readdir (pluginsFolder);
		let pluginNumber = 0;
		document.querySelector('#loading-progress').style.display='block';
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
							document.querySelector('#loading').innerHTML = 'Loading plugin '+l+'<br><br><i>'+itstuff.body+'</i>';
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
			document.querySelector('#loading').style.display='none';
			document.querySelector('#loading-progress').style.display='none';
			app.services.workspace.start (app.services);
			app.services.events.emit ('ready', app.services);
			ipcRenderer.send ('loaded');
		}
	});
}

main ();
