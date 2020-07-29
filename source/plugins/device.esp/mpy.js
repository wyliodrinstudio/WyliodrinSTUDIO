import {SerialPort, loadSerialPort} from './serial.js';
import serial from './serial.js';

const EventEmitter = require ('events').EventEmitter;

export class RawRepl extends EventEmitter {

	async writeRawRepl(port, commands){

		port.write(Buffer.from("\r\x03"));
		await port.write(Buffer.from("\r\x03"));
		await port.write(Buffer.from("\r\x01"));

		console.log(Buffer.from(commands));
        let command_bytes = Buffer.from(commands);

        for(let i = 0 ; i < command_bytes.length ; i=i+256)
        {       
            let subarray_command_bytes = command_bytes.slice(i,Math.min(i+256, command_bytes.length));
            port.write(subarray_command_bytes);

        }

        await port.write(Buffer.from("\r\x04"));
		port.write(Buffer.from("\r\x02"));

	}

	async close(port)
	{
		await port.write(Buffer.from("\r\x02"));
		port.write(Buffer.from("\r\x03"));
	}

}