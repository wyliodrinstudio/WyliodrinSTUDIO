import { EventEmitter } from 'events';

let system = {

	events: new EventEmitter(),

	close ()
	{
		window.close ();
	},

	minimize ()
	{
		
	},

	fullscreen ()
	{
		let isFullscreen = () => {
			let fullscreen;
			if (!window.screenTop && !window.screenY) { 
				fullscreen = true;
			}
			else
			{
				fullscreen = false;
			}
			return fullscreen;
		};
		if (isFullscreen ())
		{
			document.exitFullscreen ();
		}
		else
		{
			document.body.requestFullscreen ();
		}
	},
	openLink (url)
	{
		window.open(url);
	}
};

export function setup (options, imports, register) {
	register (null, { system });
}
