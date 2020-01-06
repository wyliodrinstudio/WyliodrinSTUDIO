import Ace from './views/AceEditor.vue';

export default function setup (options, imports, register)
{
	const studio = imports;
	studio.projects.registerEditor('EDITOR_ACE',[/makefile(.*)?/i], Ace);
	
	register (null, {});
}
