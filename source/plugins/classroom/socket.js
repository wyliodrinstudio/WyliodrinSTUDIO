import { EventEmitter } from 'events';
import ReconnectingWebSocket from 'reconnectingwebsocket';
import axios from 'axios';

export default class ClassroomSocket extends EventEmitter {
	constructor (server, name, secret) {
		super ();
		this.server = server;
		this.name = name;
		this.secret = secret;
	}

	async request (path, payload) {
		let data = null;
		const api = '/api/v1';
		if (payload)
		{
			data = await axios.post (this.server+api+path, payload);
		}
		else
		{
			data = await axios.get (this.server+api+path);
		}
		console.log (data);
		return data.data;
		
	}

	async connect () {
		try
		{
			let session = await this.request ('/join', {
				name: this.name,
				secret: this.secret
			});
			this.session = session;
			this.emit ('connected');
			return true;
		}
		catch (e)
		{
			this.emit ('error', (e.response?e.response.data:e));
			this.disconnect ();
			return false;
		}
	}

	async disconnect () {
		// TODO close websocket
		this.emit ('disconnected');
	}
}