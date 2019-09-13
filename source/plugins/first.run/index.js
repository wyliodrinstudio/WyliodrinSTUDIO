import FirstRunDialog from './views/FirstRunDialog.vue';
let studio = null;

export function setup(options, imports, register)
{

	imports.events.on ('ready', (imports) =>
	{
		studio = imports; 

		if(studio.settings.loadValue('firstrun', 'firstRun', true))
		{
			studio.workspace.showDialog(FirstRunDialog);
			studio.settings.storeValue('firstrun', 'firstRun', false);
		}
			
	});
	register(null, {
		
	});
}