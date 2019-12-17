let architect = require ('./../architect.js');
let plugins = require ('./plugins.js');
const cowsay = require ('./cowsay');
const jokesData = require ('./../itjokes.js');

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

async function main ()
{
	document.querySelector('#loading-progress').style.display='block';
	document.querySelector('#jokes').innerHTML = cowsay.say ({text: getJoke()});
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
			document.querySelector('#jokes').style.display='none';
			document.querySelector('#loading').style.display='none';
			document.querySelector('#loading-progress').style.display='none';
			app.services.workspace.start (app.services);
			app.services.events.emit ('ready', app.services);
		}
	});
}

main ();
