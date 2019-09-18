import Ace from './views/AceEditor.vue';

export default function setup (options, imports, register)
{
	const studio = imports;
	studio.projects.registerEditor('EDITOR_ACE',['py','js','json','sh','less','css','html',''], Ace);
	
	register (null, {});
}
