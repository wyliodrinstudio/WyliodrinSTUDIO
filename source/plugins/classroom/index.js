import path from "path";

import classroomStore from './store';

import Classroom from './views/Classroom.vue';
import ClassroomConnect from './views/ClassroomConnect.vue';

import ClassroomSocket from './socket';

let CLASSROOM_PATH = null;

let studio = null;
let socket = null;

const classroom = {
	_socket: null, 
	hasJoined () {
		return this._socket !== null;
	},
	async showJoin () {
		if (!this.hasJoined()) {
			let config = await studio.workspace.showDialog (ClassroomConnect);
			if (config) {
				classroom.connect (config)
			}
		}
	},
	async connect (config) {
		if (!this._socket) {
			this._socket = new ClassroomSocket (config.server, config.name, config.secret);

			studio.workspace.dispatchToStore ('classroom', 'config', config);

			// this._socket.on ('connected', () => {
				
			// });
			// this._socket.on ('error', (err) => {
			// 	studio.workspace.showError ('CLASSROOM_SOCKET_EERROR', {
			// 		extra: err.message
			// 	});
			// });
			// this._socket.on ('disconnected', () => {
			// 	this._socket = null;
			// });
			// this._socket.connect ();
		}
		else
		{
			studio.workspace.showError ('CLASSROOM_ALREADY_CONNECTED');
		}
	}
}

export async function setup (options, imports, register)
{
	studio = imports;

	CLASSROOM_PATH = path.join (await studio.filesystem.getSettingsFolder (), 'classroom');

	console.log (CLASSROOM_PATH);

	await studio.filesystem.mkdirp (CLASSROOM_PATH);
	
	studio.workspace.registerStore ('classroom', classroomStore);

	studio.workspace.registerMenuItem('CLASSROOM', 200, () => {
		classroom.showJoin ();
	});

	studio.workspace.registerTab('CLASSROOM', 200, Classroom, {
		visible ()
		{
			return studio.workspace.getFromStore ('classroom', 'isConnected');
		}
	});
	register (null,
		{
			classroom: classroom
		}
	);
}