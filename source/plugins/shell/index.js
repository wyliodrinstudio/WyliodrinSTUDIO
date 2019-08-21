import Shell from './views/Shell.vue';
import { getShell } from './views/Shell.vue';
import { events } from './views/Shell.vue';

let shell = {
	write (id, data)
	{
		let shell = getShell ();
		if (shell) shell.write (id, data);
	},
	select (id)
	{
		let shell = getShell ();
		if (shell) shell.select (id);
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
	getSize ()
	{
		let size = {cols: 0, rows: 0};
		let shell = getShell ();
		if (shell)
		{
			size = shell.getSize ();
		}
		return size;
	}
};
export function setup (options, imports, register)
{
	const studio = imports;
	
	
	studio.workspace.registerTab('PROJECT_SHELL', 600, Shell);
	register (null,
		{
			shell: shell
		});
	
}