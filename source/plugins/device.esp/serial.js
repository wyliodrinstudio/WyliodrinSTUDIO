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

let SerialPortLib = null;


let studio = null;




export default {
	setup (s)
	{
		studio = s;
		SerialPortLib = loadSerialPort();
		console.log("setup");
		console.log(SerialPortLib);
		
	},
	list ()
	{
		if (studio.system.platform () === 'electron')
		{
			return SerialPortLib.list ();
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
		console.log('connect 345');
		if (studio.system.platform () === 'electron')
		{
			console.log('sunt pe electron');
			
			this.serial = new SerialPortLib(address,(err)=>{
			if(err){
				console.log(' 666 serial port');
				this.emit ('error', err);
			}
			else
			{
				console.log('else');
				this.serial.on('data', (data) => {
					this.emit ('data', data);
				});
				this.serial.on('error', (err) => {
					this.emit ('error', err);
				});
				this.serial.on('close', () => {
					this.emit ('close');	
				});
				this.emit('connected');
			}
		});

		}
		else
		{
			const portConnect = await navigator.serial.requestPort();
			await portConnect.open({ baudrate: baudRate || 115200 });
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

	close(){
		if(studio.system.platform() === 'electron')
		{
			this.serial.close();
		}
		else{
			return null;
		}
	}
}