'use strict';

const express = require ('express');
const path = require ('path');
const WebSocket = require ('ws');

const http = require ('http');
const url = require ('url');

let users = {};

let app = express ();
var server = http.createServer(app);

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
	socket.on ('message', (message) => 
	{
		try 
		{
			let packet = JSON.parse (message);
			console.log ('UI Socket');
			console.log (packet);
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
			if (packet && packet.id && packet.t === 'p')
			{
				let device = users[id].devices[packet.id];
				if (device.socket) device.socket.send (JSON.stringify (packet));
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
			console.log ('Remote Socket');
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

app.use (express.static (path.join (__dirname,'ui'), { cacheControl: false }));
let serverListener = server.listen (process.env.PORT || 8080, function (err) {
	if (!err) console.log ('Listening on port '+serverListener.address().port);
	else console.log (err);
});
