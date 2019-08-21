import Console from './views/Console.vue';
import { getConsole } from './views/Console.vue';
import { events } from './views/Console.vue';

let studio = null;

export function setup (options, imports, register)
{
	studio = imports;
	let consoleObject = {
		/**
		 * Write to console
		 * @param {string} id - console id
		 * @param {string} data - console data
		 *  */
		write(id, data) {
			let shell = getConsole ();
			if (shell) shell.write (id, data);
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
			// console.log ('select console '+id+' '+shell);
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

	studio.workspace.registerStatusButton ('CONSOLE', 1, Console, 'plugins/console/data/img/icons/terminal-icon.svg');

	register (null, {
		console: consoleObject
	});
}