import { v4 } from "uuid";
import validator from "validator";
import { EventEmitter } from "events";

let studio = null;
let events = new EventEmitter ();

let id = {
	getId () {
		let newtoken = v4 ();
		let token = studio.settings.loadValue ('device.wyapp.websocket', 'userid', null);
		// port token to new api
		if (token !== null) {
			studio.settings.storeValue ('device.wyapp.websocket', 'userid', null);
			studio.settings.storeValue ('id', 'token', token);
		}
		token = studio.settings.loadValue ('id', 'token', newtoken);
		if (token === newtoken) studio.settings.storeValue ('id', 'token', token);
		return token;
	},

	on (event, ...args) {
		events.on (event, ...args);
	}
}

export function setup (options, imports, register) {
	studio = imports;	

	studio.workspace.registerMenuItem('ID_SET_USER_ID', 90, async () => {
		let token = id.getId();
		let settoken = await studio.workspace.showPrompt ('ID_SET_USER_ID_TITLE', 'ID_SET_USER_ID_TEXT', token);
		if (settoken && validator.isUUID (settoken)) settoken = settoken.toLowerCase ();
		if (settoken && token !== settoken)
		{
			if (validator.isUUID (settoken))
			{
				// eslint-disable-next-line require-atomic-updates
				token = settoken;
				studio.settings.storeValue ('id', 'token', token);
				events.emit ('id:change', token);
			}
			else
			{
				studio.workspace.showError ('ID_SET_USER_ID_NO_UUID');
			}
		}
	});

	register (null, {
		id: id
	});
}