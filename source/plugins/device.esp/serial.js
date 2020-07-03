export function loadSerialPort ()
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

let SerialPortlib = null;


let studio = null;




export default {
	setup (s)
	{
		studio = s;
		SerialPortlib = loadSerialPort();
	},
	async list ()
	{
		if (studio.system.platform () === 'electron')
		{
			return SerialPortlib.list ();
		}
		else
		{
			return [];
		}
	}
}

export class SerialPort extends EventEmitter {
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
				this.emit('connected');
			}
		});

		}
		else
		{
			const portConnect = await navigator.serial.requestPort();
			this.reader = portConnect.readable.getReader();
			this.writer = portConnect.readable.getWriter();
			this.emit('connected');
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