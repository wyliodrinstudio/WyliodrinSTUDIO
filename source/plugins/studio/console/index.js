import Console from './views/Console.vue';
import { getConsole } from './views/Console.vue';
import { events } from './views/Console.vue';

let studio = null;

export function setup (options, imports, register)
{
	studio = imports;

	let signalsBuffer = '';
	let signalRegex = /^@([A-Za-z0-9_]+):\s*([^/]+)(?:\/([0-9]+))?$/;

	const filterSignal = (data) => {
		let signals = [];
		let output = '';
		let signalParts = data.split (/\r?\n/);
		if (signalParts.length > 1) {
			signalParts[0] = signalsBuffer + signalParts[0];
			let actualSignals = signalParts.slice (0, signalParts.length-1);
			for (let signalFormat of actualSignals) {
				let signal = signalFormat.match (signalRegex);
				if (signal) {
					let timestamp = new Date ();
					if (signal[3]) {
						let t = parseFloat (signal[3]);
						if (!isNaN (t))
						{
							timestamp = new Date (t);
						}
						else
						{
							timestamp = new Date (signal[3]);
						}
					}
					signals.push ({
						name: signal[1],
						value: signal[2],
						timestamp: timestamp
					});
				}
				else
				{
					output = output + signalFormat + '\r\n';
				}
			}
		}
		signalsBuffer = signalParts[signalParts.length-1];
		if (signalsBuffer[0] !== '@') {
			output = output + signalsBuffer;
			signalsBuffer = '';
		}
		return {
			signals,
			output
		};
	};

	let consoleObject = {
		/**
		 * Write to console
		 * @param {string} id - console id
		 * @param {string} data - console data
		 *  */
		write(id, data) {
			
			let {signals, output} = filterSignal (data);
			
			for (let signal of signals) {
				studio.dashboard.emitSignal (signal.name, signal.value, signal.timestamp);
			}

			let shell = getConsole ();
			if (shell) shell.write (id, output);
		},

		register (fn)
		{
			let data = fn.bind (fn.this, 'data');
			let resize = fn.bind (fn.this, 'resize');
			events.on ('data', data);
			events.on ('resize', resize);
			return () => {
				events.removeListener ('data', data);
				events.removeListener ('resize', resize);
			};
		},

		/**
		 * reset
		 * @param {string} id - console id
		 *  */
		reset(id) {
			let shell = getConsole ();
			if (shell) shell.reset (id);
		},

		/**
		 * 
		 * @param {string} id - console id
		 */
		select(id) {
			let shell = getConsole ();
			if (shell) shell.select (id);
		},

		getSize ()
		{
			let size = {cols: 0, rows: 0};
			let shell = getConsole ();
			if (shell)
			{
				size = shell.getSize ();
			}
			return size;
		},

		show ()
		{
			studio.workspace.openStatusButton ('CONSOLE');
		}
	};

	studio.workspace.registerComponent (studio.xterm.Xterm);

	studio.workspace.registerStatusButton ('CONSOLE', 1, Console, 'plugins/studio/console/data/img/icons/terminal-icon.svg', {
		height () {
			return '30vh';
		}
	});

	register (null, {
		console: consoleObject
	});
}