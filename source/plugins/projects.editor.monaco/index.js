import MonacoEditorPanel from './views/MonacoEditorPanel.vue';

export default function setup (options, imports, register)
{
	const studio = imports;
	studio.projects.registerEditor('MONACO_ACE',[/Dockerfile(.*)?/i,'txt','md','py','js','json','sh','less','css','html','php','vue','c','cpp','d',''], MonacoEditorPanel);
	
	register (null, {});
}
