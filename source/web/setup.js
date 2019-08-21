let architect = require ('./architect.js');
let plugins = require ('./plugins.js');

function progress (name, index, all)
{
	document.querySelector('#loading').innerHTML = 'Loading plugin '+name;
	document.querySelector('#loading-progress-bar').setAttribute ('style', 'width: '+Math.round((index/all*100))+'%');
	console.log ('Loading '+name);
}

async function main ()
{
	document.querySelector('#loading-progress').style.display='block';
	let setupPlugins = await plugins.loadPlugins (progress);
	architect.createApp(setupPlugins, function (err, app) {
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
		}
	});
}

main ();
