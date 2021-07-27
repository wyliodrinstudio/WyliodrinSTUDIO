import { emulator } from '../unicorn/mp_unicorn.js';
import unicorn from '../unicorn/unicorn-arm.min.js';

// Loads the code from editor into MicroPython
const runEditorCode = (code) => {
	if (code.toString() === '') return;
	
	mp.inject(String.fromCharCode(3)); // CTRL-C
	mp.inject(String.fromCharCode(1)); // CTRL-A - MicroPython raw REPL
	mp.inject(String.fromCharCode(4)); // CTRL-D
	mp.inject(code);
	mp.inject(String.fromCharCode(4));
	mp.inject(String.fromCharCode(2)); // CTRL-B - stop raw REPL
};

let mp = null;

onmessage = (event) => {
	let messageType = event.data.messageType;
	switch (messageType) {
		// Load MicroPython with firmware binary
		case 'load-mp': {
			let firmware = event.data.firmware;
			mp = emulator(unicorn, firmware);

			// Handling events
			mp.events.on('data', (data) => {
				postMessage({data: data, messageType: 'console-data'});
			});

			mp.events.on('pins', (writtenPins) => {
				postMessage({pins: writtenPins, messageType: 'pins'});
			});

			mp.events.on('killed', () => {
				postMessage({messageType: 'killed'});
			});

			break;
		}
		// Inject text data into MicroPython
		case 'console-data': {
			let data = event.data.data;
			mp.inject(data);
			break;
		}
		// Modify pin array
		case 'pins': {
			let pins = event.data.pins;
			mp.hook_write(null, null, 0x40000210, null, null,  parseInt(pins, 2), null, null);
			break;
		}
		// Inject code into MicroPython
		case 'run-code': {
			let code = event.data.code;
			runEditorCode(code);
			break;
		}

		case 'remove-listeners': {
			mp.events.removeAllListeners('data');
			mp.events.removeAllListeners('pins');
			mp.events.removeAllListeners('killed');
		}
	}
};