import { EventEmitter } from 'events';

export function setup (options, imports, register) {
	let serviceWorker = null;

	let system = {

		events: new EventEmitter(),
	
		send (tag, data)
		{
			serviceWorker.postMessage({
				tag,
				data
			});
		},
	
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

	navigator.serviceWorker.ready.then( registration => {
		serviceWorker = registration.active;
	});
	

	register (null, { system });
}
