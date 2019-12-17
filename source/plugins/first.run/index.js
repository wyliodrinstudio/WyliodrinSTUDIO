import FirstRunDialog from './views/FirstRunDialog.vue';
let studio = null;

let firstrun = {

	isFirstRun()
	{
		return studio.settings.loadValue('firstrun', 'firstRun', true);
	},

	showFirstRun()
	{
		studio.workspace.showDialog(FirstRunDialog,{width:550});
		studio.settings.storeValue('firstrun', 'firstRun', false);
	}
};

export function setup(options, imports, register)
{
	imports.events.on ('ready', (imports) =>
	{
		studio = imports; 

		if(firstrun.isFirstRun())
		{
			firstrun.showFirstRun();
		}
			
	});
	register(null, {
		firstrun: firstrun
	});
}