import PatreonDialog from './views/PatreonDialog.vue';

export default function setup (options, imports, register) {
	let studio = imports;

	let showDialog = () => {
		studio.workspace.showDialog(PatreonDialog,{width:550});
	};

	imports.events.on ('ready', async (imports) =>
	{
		studio = imports; 

		let run_times = await studio.settings.loadValue('patreon', 'run_times', 1);
		let sponsored = await studio.settings.loadValue('patreon', 'sponsored', false);
		studio.settings.storeValue('patreon', 'run_times', run_times + 1);

		if (!sponsored && run_times % 10 == 1) {
			showDialog ();
		}
	});

	studio.workspace.registerMenuItem('PATREON_SPONSOR', 99, () => {
		showDialog ();

	});

	register (null, {});
}