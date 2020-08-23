const path = require ('path');
const architect = require ('./architect');
const ipcRenderer = require ('electron').ipcRenderer;
const cowsay = require ('./cowsay');
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

function progress (name, index, all)
{
	if (index || all)
	{
		document.querySelector('#loading').innerHTML = 'Loading plugin '+name;
		document.querySelector('#loading-progress-bar').setAttribute ('style', 'width: '+Math.round((index/all*100))+'%');
		console.log ('Loading '+name);
	}
	else
	{
		document.querySelector('#loading').innerHTML = name;
		document.querySelector('#loading-progress-bar').setAttribute ('style', 'width: 100%');
		console.log (name);
	}
}

function loadPlugins (pluginsFolder)
{
	let plugins = [];
	try
	{
		plugins = require ('./plugins.js');
		let pluginNumber = 0;
		document.querySelector('#loading-progress').style.display='block';
		document.querySelector('#jokes').innerHTML = cowsay.say ({text: getJoke()});
		for (let p of plugins)
		{
			pluginNumber = pluginNumber + 1;
			try
			{
				progress (p.folder + '/' + p.name, pluginNumber, plugins.length);
				let plugin = require (path.join (pluginsFolder, p.folder, p.name));
				let setupFunction = plugin.setup || plugin.default || plugin;
				if (typeof setupFunction !== 'function')
				{
					throw (new Error ('Plugin '+p.name+' is missing the setup function'));
				}
				p.setup = setupFunction;
			}
			catch (e)
			{
				console.error ('Error loading plugin '+p.name+' '+e.message);
				console.error (e);
			}
		}
		progress ('Your workspace is almost ready ...');
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
