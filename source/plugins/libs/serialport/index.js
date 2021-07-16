import EventEmitter from 'events';

let serial = null;
let studio = null;

function loadSerialPort ()
{
	try
	{
		// written like this to work with webpack when target is browser
		return eval ('require(\'serialport\')');
	}
	catch (e)
	{	
		studio.workspace.error ('serialport: serialport is not available '+e.message);
		return null;
	}
}

class writerElectron {
	constructor(serial) {
		this.serial = serial;
	}

	abort () {
		return true;
	}

	close () {
		return true;
	}

	releaseLock () {
		return true;
	}

	write (data) {
		this.serial.write(data);
	}
}

export class SerialPort extends EventEmitter {
	async start ()
	{
		if (studio.system.platform () === 'browser')
		{
			try
			{
				this.portConnect = await navigator.serial.requestPort();
			}
			catch (e)
			{
				return false;
			}
		}
		return true;
	}

	async connect (address, baudRate)
	{ 
		if (studio.system.platform () === 'electron')
		{	
			this.writerElectron = new writerElectron(this);

			this.serial = new serial(address,{
				baudRate
			},(err)=>{
				if(err){
					this.emit ('error', err);
				}
				else
				{
					this.serial.on('data', (data) => {
						this.data = data;
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
			
			// API changes, so we take into account both versions
			await this.portConnect.open({ baudRate: baudRate || 115200, baudrate: baudRate || 115200 });
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
					}
				}
				catch (e)
				{
					this.emit ('error', e);
					break;
				}
				/* eslint-disable-next-line no-constant-condition */
			} while(true);
			//this.emit ('close');
		}
	}

	write (data) {
		if (studio.system.platform() === 'electron')
		{
			
			if(typeof data === 'object')
				if(data.constructor === Uint8Array)
					data = Buffer.from(data.buffer);

			this.serial.write (data);
		}
		else
		{
			if (this.writer) {
				return this.writer.write(data);
			}
		}
	}

	async close(){
		if(studio.system.platform() === 'electron')
		{
			this.serial.close();
		}
		else{
			await this.reader.cancel();
			await this.writer.abort();
			await this.portConnect.close();
		}
	}

	//Emulating some functions and adding some fake functions
	setSignals(options) {
		return new Promise((resolve) => {
			this.serial.set({dtr: options.dataTerminalReady, rts: options.requestToSend}, () => {
				resolve(null);
			});
		});
	}

	async open (options) {
		if(!this.serial.isOpen)
			await this.serial.open();

		this.writable = this;
		this.readable = this;

		return options;
	}

	getReader() {
		return this;
	}

	getWriter() {
		return this.writerElectron;
	}

	cancel() {
		return true;
	}

	releaseLock() {
		return true;
	}

	read() {
		return new Promise((resolve) => {
			if(this.serial.isOpen) {
				this.serial.on('data', (data) => {
					let newData = new Uint8Array(data.length);
					for (let i = 0; i < data.length; i++) {
						newData[i] = data[i];
					}

					resolve({value: newData, done: false});			
				});
			} else {
				resolve({value: undefined, done: true});
			}
		});
	}
		
}

let serialport = {
	list ()
	{
		if (studio.system.platform () === 'electron' && serial)
		{
			return serial.list ();
		}
		else
		{
			return [];
		}
	},
	isAvailable () {
		return serial != null || navigator.serial != null;
	},
	SerialPort
};

export function setup (options, imports, register) {
	studio = imports;
	serial = loadSerialPort();
	register (null, {
		serialport: serialport
	});
}