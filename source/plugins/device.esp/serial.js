function loadSerialPort ()
{
	try
	{
			return eval ('require(\'serialport\')');
	}
	catch (e)
	{
		studio.workspace.error ('device_esp: esp is not available '+e.message);
		return {
				list: function ()
				{
						return [
						];
				}
		};
	}
}

const EventEmitter = require ('events').EventEmitter;

let SerialPort = loadSerialPort();

let studio = null;

export function setup (s)
{
	this.studio = s;
}

export default {
	list ()
	{
		// if electron ...
		// else ...
		return [];
	}
}

export class SerialPortClient extends EventEmitter{
	constructor (serialPort)
	{
		this.serialPort = serialPort;

		if (studio.system.platform () === 'electron')
		{
		    return SerialPort.list ();
		}
		else
		{
			return [];
		}
	}

	async connect (address, baudRate)
	{
		if (studio.system.platform () === 'electron')
		{
			this.serial = new SerialPort(address,(err)=>{
			if(err){
				this.emit ('error', err);
			}
			else
			{
				serial.on('data', (data) => {
					this.emit ('data', data);
				});
				serial.on('error', (err) => {
					this.emit ('error', err);
				});
				serial.on('close', () => {
					this.emit ('close');	
				});
			}
		});

		}
		else
		{
			const portConnect = await navigator.serial.requestPort();
			this.reader = portConnect.readable.getReader();
			this.writer = portConnect.readable.getWriter();
			do {
				try
				{
					let {done,value} = await reader.read();
					if(done)
					{
						break;
					}
					else
					{
						this.emit ('data', value);
					}
				}
				catch (e)
				{
					this.emit ('error', e);
				}
			} while(true);
			this.emit ('close');
		}
	}

	async write (data) {
		if (studio.system.platform () === 'electron')
		{
			this.serial.write (data);
		}
		else
		{
			if (this.writer) {
				return this.writer.write (data);
			}
		}
	}
}