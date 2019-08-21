import Login from './views/Login.vue';

export function setup (options, imports, register)
{
	const studio = imports;
	studio.workspace.registerTab('CHAT', 100, Login);

	register (null, {
		
	});
}