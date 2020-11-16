import Console from './views/Console.vue';
import { getConsole } from './views/Console.vue';
import { events } from './views/Console.vue';

let studio = null;

export function setup (options, imports, register)
{
	studio = imports;

	let filters = [];

	let consoleObject = {
		/**
		 * Write to console
		 * @param {string} id - console id
		 * @param {string} data - console data
		 *  */
		write(id, data) {
			
			let output = data;
			for (let filter of filters) {
				output = filter (id, output);
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

		registerFilter (fn)
		{
			filters.push (fn);
			return () => {
				filters = filters.filter ((item) => item !== fn);
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