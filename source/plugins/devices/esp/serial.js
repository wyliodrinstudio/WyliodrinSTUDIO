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
		if (studio.system.platform () === 'electron')
		{
			this.serial = new SerialPortLib(address,{
				baudRate
			},(err)=>{
			if(err){
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
			this.portConnect = await navigator.serial.requestPort();
			await this.portConnect.open({ baudrate: baudRate || 115200 });
			this.reader = this.portConnect.readable.getReader();
			this.writer = this.portConnect.writable.getWriter();
			this.emit('connected');
			do {
				try
				{
					let {done,value} = await this.reader.read();
					if(done)
					{
						break;
					}
					else
					{
						this.emit ('data', value);
						console.log(value);
					}
				}
				catch (e)
				{
					console.error(e);
					this.emit ('error', e);
				}
			} while(true);
			//this.emit ('close');
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
				return this.writer.write(data);
			}
		}
	}

	close(){
		if(studio.system.platform() === 'electron')
		{
			this.serial.close();
		}
		else{
			this.reader.cancel();
			this.writer.close();
			this.portConnect.close();
		}
	}
}