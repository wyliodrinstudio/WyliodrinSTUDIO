import axios from 'axios';
const semverCmp = require('semver/functions/cmp');

async function getServerVersion () {
	try
	{
		let response = await axios.get ('/api/v1/version');
		if (response.data.err === 0)
		{
			return response.data.version;
		}
	}
	catch (e)
	{
		// version request failed
	}
	return undefined;
}

export default function setup (options, imports, register) {
	let studio = imports;

	let ready = false;
	let shouldAsk = false;

	const update = () => {
		studio.system.send ('update');
		// TODO this should be done in a better way
		if (studio.system.platform () === 'browser') {
			setTimeout (() => location.reload(), 1000);
		}
	};

	const askForUpdate = async () => {
		let res = await studio.workspace.showConfirmationPrompt ('UPDATE_TITLE', 'UPDATE_MESSAGE');
		if (res) {
			update ();
		}
	};

	studio.system.events.on ('update-ask', () => {
		shouldAsk = true;
		if (ready) askForUpdate ();
	});

	studio.events.on ('ready', async () => {
		ready = true;
		if (studio.system.platform () === 'browser') {
		
			let serverVersion = await getServerVersion ();
			if (serverVersion && semverCmp (studio.workspace.version, '<', serverVersion)) {
				shouldAsk = true;
				askForUpdate ();
			}
		}
		else
		{
			if (shouldAsk) askForUpdate ();
		}
	});

	studio.workspace.registerToolbarButton ('UPDATE', 100, () => {
		update ();
	}, 'plugins/studio/update/data/img/icons/update.svg', {
		visible: () => shouldAsk
	});

	register (null, {
		update: {}
	});
}