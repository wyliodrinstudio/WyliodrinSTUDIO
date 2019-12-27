import Xterm from './views/Xterm.vue';

export function setup (options, imports, register) {
	imports.workspace.registerComponent (Xterm);

	register (null, {
		xterm: {
			Xterm
		}
	});
}