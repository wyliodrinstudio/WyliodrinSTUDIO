import fs from 'fs-extra';
import { remote } from 'electron';

import SendFeedbackDialog from './views/SendFeedbackDialog.vue';
import path from 'path'; 

let info = {
	path: path.join (require('os').tmpdir(), 'WyliodrinSTUDIO/'),
	screens: [],
	getNameFromDate() {
		let d = new Date();
		return d.getDate().toString() + '-' +
				(d.getMonth() + 1).toString() + '-' +
				d.getFullYear().toString() + '-' +
				d.getHours().toString() + '-' +
				d.getMinutes().toString() + '.png';
	},
	getFirstName() {
		return this.screens.shift();
	}
};

export default function setup (options, imports, register)
{
	let win = remote.getCurrentWindow ();
	const studio = imports;
	studio.workspace.registerMenuItem ('SEND_FEEDBACK_TITLE', 10, () => {
		try
		{
			setTimeout(async () => {
				let image = await win.capturePage();
				await fs.mkdirp (info.path);
				await fs.writeFile(path.join (info.path, info.getNameFromDate()), image.toPNG());
				studio.workspace.showDialog(SendFeedbackDialog,{width:1500});
				info.screens.push(info.getNameFromDate());	
			}, 1000);
		}
		catch (e)
		{
			studio.workspace.showError ('FEEDBACK_SCREENSHOT_ERROR', {
				error: e.message
			});
		}
	});
	register (null, {
		info: info
	});
}
