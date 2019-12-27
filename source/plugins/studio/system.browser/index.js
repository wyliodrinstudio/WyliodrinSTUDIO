import { EventEmitter } from 'events';

let system = {

	events: new EventEmitter(),

	close ()
	{
		location.href = 'https://wyliodrin.studio';
	},

	minimize ()
	{
		
	},

	fullscreen ()
	{
		let isFullscreen = () => {
			return document.fullscreenElement !== null;
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
	},
	platform ()
	{
		return 'browser';
	}
};

export function setup (options, imports, register) {
	register (null, { system });
}
