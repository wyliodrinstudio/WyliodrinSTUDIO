import Notebook from './views/Notebook.vue';
import { events } from './views/Notebook.vue';
import { getNotebook } from './views/Notebook.vue';
// events.on ('note', (...params) => {
// 	console.log (params);
// });

let notebook = {
	register (fn)
	{
		let run = fn.bind (fn.this, 'run');
		let stop = fn.bind (fn.this, 'stop');
		let reset = fn.bind (fn.this, 'reset');
		events.on ('run', run);
		events.on ('stop', stop);
		events.on ('reset', reset);
		return () => {
			events.removeListener ('run', run);
			events.removeListener ('stop', stop);
			events.removeListener ('reset', reset);
		};
	},
	printCode(id, data)
	{
		let notebook = getNotebook();
		notebook.printPythonCode(id, data);
	},
	printError(id, data)
	{
		let notebook = getNotebook();
		notebook.printPythonError(id, data);
	},
	printResult(id, data)
	{
		let notebook = getNotebook();
		notebook.printPythonResult(id, data);
	},
	setStatus (id, status)
	{
		let notebook = getNotebook();
		notebook.setStatus(id, status);
	}
};
export function setup (options, imports, register)
{
	const studio = imports;
	studio.workspace.registerTab('PROJECT_NOTEBOOK', 300, Notebook, {
		enabled () {
			return !!studio.projects.getCurrentProject ();
		}
	});

	register (null, {
		notebook: notebook
	});
}