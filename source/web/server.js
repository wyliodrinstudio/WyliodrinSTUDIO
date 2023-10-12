#!/usr/bin/env node

'use strict';

const express = require ('express');
const path = require ('path');
const WebSocket = require ('ws');
const pack = require ('./package.json');

const http = require ('http');
const url = require ('url');

const os = require ('os');
const fs = require ('fs');

let users = {};

let app = express ();

let api = express.Router ();

api.get('/dirfiles/:plugin/:dir', (req, res) => {
	let plugin = req.params.plugin;
	if (plugin === 'raspberrypi') {
		plugin = 'simulators/' + plugin;
	}

	const librariesFolder = `${__dirname}/plugins/${plugin}/data/${req.params.dir}`;

	try {
		const fileArr = [];
		fs.readdirSync(librariesFolder).forEach((file) => {
			fileArr.push(file);
		})
		res.send(fileArr);
	} catch (err) {
		res.status(404).send(err);
	}
})

api.get ('/version', (req, res) => {
	res.send ({
		err: 0,
		version: pack.version
	});
});

var server = http.createServer(app);

if (process.env.OT_EXPERIMENTAL_TOKEN)
{
	app.use ((req, res, next) => {
		res.header('Origin-Trial: '+process.env.OT_EXPERIMENTAL_TOKEN);
	});
	next ();
}

function sendDevices (id)
{
	if (users[id] && users[id].devices)
	{
		let devices = [];
		for (let deviceId in users[id].devices)
		{
			let device = users[id].devices[deviceId];
			devices.push ({
				id: deviceId,
				name: device.name || deviceId,
				address: deviceId,
				board: device.board
			});
		}
		sendUser (id, {
			t: 's',
			d: devices
		});
	}
}

function sendUser (id, packet)
{
	let m = JSON.stringify (packet);

	if (users[id] && users[id].socket)
	{
		let socket = users[id].socket;
		socket.send (m);
	}
}

var uiSocket = new WebSocket.Server ({
	noServer: true,
	path: '/socket/ui'
});

uiSocket.on ('connection', (socket) => {
	let id = null;

	console.log ('UISocket: Client connected');
	let lastMessage;
	socket.on ('message', (message) => 
	{
		try 
		{
			let packet = JSON.parse (message);
			// console.log ('UI Socket');
			// console.log (packet);
			if (!id && packet && packet.t === 'a')
			{
				console.log (packet.token);
				if (packet.token && !users[id])
				{
					id = packet.token;
					if (!users[id])
					{
						users[id] = {
							devices: {},
							socket: socket
						};
						socket.send (JSON.stringify ({t: 'a', authenticated: true}));
					}
					else
					{
						if (!packet.reset)
						{
							socket.send (JSON.stringify ({t: 'a', e:'unique'}));
							id = null;
						}
						else
						{
							let older_socket = users[id].socket;
							users[id].socket = socket;
							socket.send (JSON.stringify ({t: 'a', authenticated: true}));
							sendDevices (id);
							older_socket.close ();
						}
					}
				}
				else
				{
					socket.close ();
				}
			}
			else
			if (id)
			{
				if (packet && packet.id && packet.t === 'p')
				{
					let device = users[id].devices[packet.id];
					if (device.socket) device.socket.send (JSON.stringify (packet));
				}
				else
				if (packet && packet.t === 'ping')
				{
					// console.log ('UISocket ping');
					socket.send (JSON.stringify ({t: 'pong'}));
				}
				else
				{
					console.log ('UISocket unknown packet '+JSON.stringify (packet));
				}
			}
			else
			{
				socket.close ();
			}
		}
		catch (e)
		{
			console.log ('UISocket ('+id+'): message '+e.message);
		}
	});

	socket.on ('error', (err) => {
		console.log ('UISocket Error ('+id+'): '+err.message);
	});

	socket.on ('close', () => {
		if (users[id] && socket === users[id].socket)
		{
			let devices = users[id].devices;
			for (let deviceId in devices)
			{
				devices[deviceId].socket.close ();
			}
			delete users[id];
		}
		console.log ('UISocket ('+id+') closed');
	});
});

var remoteSocket = new WebSocket.Server ({
	noServer: true,
	path: '/socket/remote'
});

remoteSocket.on ('connection', (socket) => {
	let userId = null;
	let id = null;

	console.log ('RemoteSocket: Client connected');
	socket.on ('message', (message) => 
	{
		try 
		{
			let packet = JSON.parse (message);
			// console.log ('Remote Socket');
			// console.log (packet);
			if (!userId && packet && packet.t === 'a')
			{
				// console.log (packet.token);
				userId = packet.token;
				id = packet.id;
				if (id && userId && users[userId])
				{
					userId = packet.token;
					users[userId].devices[id] = {
						socket: socket,
						name: packet.name,
						board: packet.board
					};
					sendDevices (userId);
					console.log ('RemoteSocket ('+userId+':'+id+') token');
				}
				else
				{
					socket.close ();
				}
			}
			else
			if (packet && packet.t === 'p')
			{
				packet.id = id;
				sendUser (userId, packet);
			}
			else
			{
				socket.close ();
			}
		}
		catch (e)
		{
			console.log ('RemoteSocket ('+userId+':'+id+'): message '+e.message);
		}
	});

	socket.on ('error', (err) => {
		console.log ('RemoteSocket Error ('+userId+':'+id+'): '+err.message);
	});

	socket.on ('close', () => {
		if (users[userId])
		{
			delete users[userId].devices[id];
			sendDevices (userId);
		}
		console.log ('RemoteSocket ('+userId+':'+id+') closed');
	});
});

server.on ('upgrade', function (req, socket, head)
{
	const pathname = url.parse(req.url).pathname;
	if (pathname === '/socket/ui') 
	{
		uiSocket.handleUpgrade(req, socket, head, function done(ws) {
			uiSocket.emit('connection', ws, req);
		});
	} 
	else
	if (pathname === '/socket/remote') 
	{
		remoteSocket.handleUpgrade(req, socket, head, function done(ws) {
			remoteSocket.emit('connection', ws, req);
		});
	} 
	else 
	{
		socket.destroy();
	}
});

app.use ('/api/v1', api);

app.use (express.static (path.join (__dirname,'ui'), { cacheControl: false }));
let serverListener = server.listen (process.env.PORT || 8080, function (err) {
	if (!err) {
		let n = 0;
		let networks = os.networkInterfaces();
		for (let network in networks) {
			for (let networkAddress of networks[network])
			{
				if (networkAddress.family === 'IPv4' && !networkAddress.address.startsWith ('127'))
				{
					n = n + 1;
					console.log ('Wyliodrin STUDIO running at http://'+networkAddress.address+':'+serverListener.address().port);
				}
			}
		}
		if (n === 0)
		{
			console.log ('wstudio running at http://127.0.0.1:'+serverListener.address().port);
		}
		// console.log ('Listening on port '+serverListener.address());
	}
	else console.log (err);
});
