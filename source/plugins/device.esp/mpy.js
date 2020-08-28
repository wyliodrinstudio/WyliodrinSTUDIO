import {SerialPort, loadSerialPort} from './serial.js';
import serial from './serial.js';

const EventEmitter = require ('events').EventEmitter;
export const STATUS_READY = 'ready';
export const STATUS_REPL_REQ = 'repl_req';
export const STATUS_REPL = 'repl';
export const STATUS_RUNNING = 'running';
export const STATUS_OFFLINE = 'offline';


export class MicroPython extends EventEmitter {
	constructor(port){
		super();
		this.port = port;
		this.data;
		this.setStatus(STATUS_OFFLINE);
		port.on('connected', ()=>{
			this.emit('connected');
			this.setStatus(STATUS_READY);
		});
		port.on('data', (data)=>{
			this.data = this.data+Buffer.from(data).toString();
			if(this.status === STATUS_REPL_REQ && this.data.endsWith('raw REPL; CTRL-B to exit\r\n>'))
			{
				console.log('OK');
				//Am facut emitul pentru a scrie pe ESP atunci cand a intrat sigur in Raw Repl
				this.emit('readyrepl');
			}
			else
			{
				this.emit('data', data);
			}
			
			
		});
		port.on('error', (err)=>{
			this.emit('error', err);
		});
	}

	async enterRawRepl()
	{
		await this.port.write(Buffer.from("\r\x01"));
		await this.setStatus(STATUS_REPL_REQ);
	}

	write(data)
	{
		this.port.write(data);
	}

	async writeRawRepl(commands){

		this.setStatus(STATUS_REPL);

		console.log(Buffer.from(commands));
		let command_bytes = Buffer.from(commands);

        for(let i = 0 ; i < command_bytes.length ; i=i+256)
        {       
            let subarray_command_bytes = command_bytes.slice(i,Math.min(i+256, command_bytes.length));
            await this.port.write(subarray_command_bytes);
		}
		
		this.setStatus(STATUS_RUNNING);

		await this.port.write(Buffer.from("\r\x04"));
		await this.port.write(Buffer.from("\r\x02"));

	}

	setStatus(status)
	{
		this.status = status;
		this.emit('status', status);
	}

	getStatus()
	{
		return this.status;
	}

	getPort()
	{
		return this.port;
	}

	async stop()
	{
		await this.port.write(Buffer.from("\r\x03"));
		this.setStatus(STATUS_READY);
	}

}