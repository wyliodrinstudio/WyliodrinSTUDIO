import EventEmitter from 'events';
import msgpack5 from 'msgpack5';

const msgpack = msgpack5 ();

const PACKET_SEPARATOR = 255;
const BUFFER_SEPARRATOR = Buffer.from ([PACKET_SEPARATOR, PACKET_SEPARATOR]);
const PACKET_ESCAPE = 0;
const BUFFER_SIZE = 8192;

export default class WyApp extends EventEmitter
{
	/**
	 * run a new wyapp cprotocol
	 * @param {Device} device - the device
	 * @param {Stream} stream - the connection link
	 * @param {boolean} synchronize - synchronize protocol first (use for serial line)
	 */
	constructor (device, stream, synchronize = false)
	{
		super ();
		// make sure the caller gets the status
		this.device = device;
		this.stream = stream;
		this.receivedFirstPacketSeparator = !synchronize;
		this.receivedData = Buffer.alloc (BUFFER_SIZE);
		this.receivedDataPosition = 0;
		this.buffers = [];
		this.isSending = false;

		this.stream.on ('data', (data) => this._received(data));

		// if an error occured for transport, remove all listeners
		this.stream.on ('error', () => this.removeAllListeners());

		if (synchronize)
		{
			// this._setStatus ('SYNCHRONIZING', true);
		}
		else
		{
			this._setStatus ('connected', true);
		}

		this.send ('ping', {});
		this.send ('login', {username: this.device.username, password: this.device.password});
		this.send ('i', {});

		this.on ('packet', this.information);
	}

	information (packet)
	{
		console.log (packet);
		if (packet.t === 'i')
		{
			this.device.name = packet.d.n;
			this.device.properties.category = packet.d.c;
			this.device.board = this.device.properties.category;
			this.device.description = packet.d.p;
			this.device.properties.platform = packet.d.p;
			this.device.properties.internet = packet.d.i;
			this.device.properties.home = packet.d.h;
			this.device.properties.run = packet.d.r;
			this.device.properties.treeRun = packet.d.tr;
			this.emit ('update', this.device);
		}
		else
		if (packet.t === 'capabilities')
		{
			this.device.properties.languages = packet.d.l;
			this.device.properties.packageManager = packet.d.pm;
			this.device.properties.taskManager = packet.d.tm;
			this.device.properties.networkManager = packet.d.net;
			this.emit ('update', this.device);
		}
		else
		if (packet.t === 'sv')
		{
			this.device.properties.version = packet.d.v;
			this.device.properties.os = packet.d.os;
			this.device.properties.libwyliodrin = packet.d.libv;
			this.device.properties.wyliolab = packet.d.wyliolab;
			this.emit ('update', this.device);
		}
		else
		if (packet.t === 'e')
		{
			this.emit ('issue', packet.d.s);
		}
	}

	disconnect ()
	{
		this.stream.removeListener ('data', this._received);
		this.stream = null;
		this.removeAllListeners ();
	}

	_setStatus (status, nextTick = false)
	{
		this.status = status;
		if (nextTick)
		{
			process.nextTick (() => 
			{
				this.emit (status);
			});
		}
		else
		{
			this.emit (status);
		}
	}

	on (event, fn)
	{
		super.on (event, fn);
		return () => {
			super.removeListener (event, fn);
		};
	}

	_escape (buffer)
	{
		var l = 0;
		for (let i=0; i<buffer.length; i++)
		{
			if (buffer[i]===PACKET_SEPARATOR) l = l+2;
			else l = l+1;
		}
		if (l===buffer.length) return buffer;
		else
		{
			var data = Buffer.alloc (l);
			var li=0;
			for (let i=0; i<buffer.length; i++)
			{
				if (buffer[i] === PACKET_SEPARATOR)
				{
					data[li]=buffer[i];
					li++;
					data[li]=PACKET_ESCAPE;
					li++;
				}
				else
				{
					data[li] = buffer[i];
					li++;
				}
			}
			return data;
		}
	}

	_sendBuffer (data)
	{
		if (this.stream !== null)
		{
			data = this._escape (data);
			this.buffers.push (data);
			this.buffers.push (BUFFER_SEPARRATOR);
			// console.console.log (this.buffers);
			this._send ();
			
			// console.log ('Seding '+data.length+' bytes');
			// var that = this;
		}
		else
		{
			// console.log ('Disconnected');
		}
	}

	_packet ()
	{
		// console.log ('Packet of size '+this.receivedDataPosition+' received');
		var data = this.receivedData.slice (0, this.receivedDataPosition);
		this.receivedDataPosition = 0;
		return data;
	}

	_send ()
	{
		if (this.stream)
		{
			if (!this.isSending && this.buffers.length > 0)
			{
				this.isSending = true;
				var arraydata = this.buffers[0];
				this.buffers.splice (0, 1);
				// console.console.log (arraydata);
				try
				{
					this.stream.write (arraydata, (/*err*/) =>
					{
						this.isSending = false;
						this._send ();
					});
				}
				catch (e)
				{
					console.log ('Send data '+e.message);
					this.isSending = false;
				}
			}
			else
			{
				// console.log ('Already sending data');
			}
		}
		else
		{
			// console.log ('Disconnected');
		}
	}

	send (tag, data)
	{
		var buffer = msgpack.encode ({t:tag, d:data});
		this._sendBuffer (buffer);
	}

	_addToBuffer (data)
	{
		// TODO put maximum limit
		// debug ('Adding '+data+' to receivedData for port '+this.address);
		if (this.receivedDataPosition >= this.receivedData.length)
		{
			// TODO verify a maximum size
			// console.log ('Data size exceeded, enlarging data with '+this.receivedData.length);
			var receivedData = this.receivedData;
			this.receivedData = new Buffer (receivedData.length*2);
			for (var pos=0; pos < receivedData.length; pos++)
			{
				this.receivedData[pos] = receivedData[pos];
			}
			this.receivedDataPosition = pos;
		}
		this.receivedData[this.receivedDataPosition] = data;
		this.receivedDataPosition=this.receivedDataPosition+1;
	}

	_received (data)
	{
		// console.log ('Received '+data.byteLength+' bytes');
		var datauint = new Uint8Array (data);
		// TODO more efficient to string
		for (var pos=0; pos<datauint.length; pos++)
		{
			// console.console.log (datauint[pos]);
			if (this.receivedFirstPacketSeparator)
			{
				if (datauint[pos] === PACKET_SEPARATOR)
				{
					if (this.previousByte === PACKET_SEPARATOR)
					{
						let rawPacket = this._packet ();
						if (rawPacket.length > 0)
						{
							try
							{
								let packet = msgpack.decode (rawPacket);
								// console.log (packet);
								try
								{
									this.emit ('packet', packet);
								}
								catch (e)
								{
									console.error (e.message);
								}
							}
							catch (e)
							{
								// this.emit ('error', e.message);
								console.error (e.message);
								// console.log ('Packet error '+e.message);
							}
						}
						this.previousByte = 0;
					}
					else
					{
						this.previousByte = datauint[pos];
					}
				}
				else
				if (datauint[pos] === PACKET_ESCAPE)
				{
					if (this.previousByte === PACKET_SEPARATOR)
					{
						this._addToBuffer (this.previousByte);
						this.previousByte = 0;
					}
					else
					{
						this._addToBuffer (datauint[pos]);
						this.previousByte = datauint[pos];
					}
				}
				else
				{
					if (this.previousByte === PACKET_SEPARATOR)
					{
						// console.log ('Random bytes');
					}
					this._addToBuffer(datauint[pos]);
					this.previousByte = datauint[pos];
				}
			}
			else
			{
				if (datauint[pos] === PACKET_SEPARATOR && this.previousByte === PACKET_SEPARATOR) 
				{
					// console.log ('Received first packet separataor');
					this.receivedFirstPacketSeparator = true;
					this._setStatus ('connected', true);
					this.previousByte = 0;
				}
				else
				{
					// console.log ('Random bytes');
					this.previousByte = datauint[pos];
				}
			}
		}
	}
}
