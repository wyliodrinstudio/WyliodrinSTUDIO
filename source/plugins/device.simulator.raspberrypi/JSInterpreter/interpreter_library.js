import _ from 'lodash';

import onoff_library from './onoff_library.js';
import lcd_library from './lcd_library.js'

/**
 * The function structure needed for the JS interpreter
 * @param  {Object} studio The 'studio' object in the platform
 * @param  {Object} device The 'device' object in the platform
 */
export default function interpreterLibrary (studio, device, simulator) {
	onoff_library.assign(studio, device, simulator);
	lcd_library.assign(studio, device, simulator);
	
	/**
	 * Set the functions for the JS interpreter
	 * @param  {Object} interpreter The interpreter created in 'index.js'
	 * @param  {Object} scope The name of the root object used by the interpreter
	 */
	return function simulator (interpreter, scope) {

		/**
		 * The 'console.log' function for the JS interpreter
		 * It shows the text given in the console of the platform
		 * @param  {String/Object} text The text received to be showed in the STUDIO console
		 */
		let consoleLog = function (text) {
			try {
				if (_.isObject(text)) {
					text = JSON.stringify (text);
				}

				studio.console.write(device.id, text + '\r\n');
			} catch(e) {
				console.log(e);
			}
		};

		/**
		 * The 'sleep' function for the JS interpreter
		 * It makes the program to stop for a number of milliseconds
		 * @param  {Integer} delay The number of milliseconds to be waited
		 */
		let sleep = function(delay, callback) {
			setTimeout(function() {
				callback(true);
			}, delay);
		};

		// Create for the JS interpreter the object 'console' and set the function 'log' over it
		let jsConsole = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
		interpreter.setProperty(scope, 'console', jsConsole);
		interpreter.setProperty(jsConsole, 'log', interpreter.createNativeFunction(consoleLog));

		// Set the function 'sleep'
		interpreter.setProperty(scope, 'sleep', interpreter.createAsyncFunction(sleep));

		// Create the object 'onoff' with the given structure and set all the functions
		let onoff = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
		let Gpio = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
		interpreter.setProperty(scope, 'onoff', onoff);
		interpreter.setProperty(onoff, 'Gpio', Gpio);
		interpreter.setProperty(Gpio, 'create', interpreter.createNativeFunction(onoff_library.create));
		interpreter.setProperty(Gpio, 'read', interpreter.createNativeFunction(onoff_library.read));
		interpreter.setProperty(Gpio, 'readSync', interpreter.createNativeFunction(onoff_library.readSync));
		interpreter.setProperty(Gpio, 'write', interpreter.createNativeFunction(onoff_library.write));
		interpreter.setProperty(Gpio, 'writeSync', interpreter.createNativeFunction(onoff_library.writeSync));
		interpreter.setProperty(Gpio, 'watch', interpreter.createNativeFunction(onoff_library.watch));
		interpreter.setProperty(Gpio, 'unwatch', interpreter.createNativeFunction(onoff_library.unwatch));
		interpreter.setProperty(Gpio, 'unwatchAll', interpreter.createNativeFunction(onoff_library.unwatchAll));
		interpreter.setProperty(Gpio, 'direction', interpreter.createNativeFunction(onoff_library.direction));
		interpreter.setProperty(Gpio, 'setDirection', interpreter.createNativeFunction(onoff_library.setDirection));
		interpreter.setProperty(Gpio, 'activeLow', interpreter.createNativeFunction(onoff_library.activeLow));
		interpreter.setProperty(Gpio, 'setActiveLow', interpreter.createNativeFunction(onoff_library.setActiveLow));

		// Create the object LCD with the given structure and set all the functions
		let lcd = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
		interpreter.setProperty(scope, 'lcd_library', lcd);
		interpreter.setProperty(lcd, 'create', interpreter.createNativeFunction(lcd_library.create));
		interpreter.setProperty(lcd, 'print', interpreter.createNativeFunction(lcd_library.print));
		interpreter.setProperty(lcd, 'clear', interpreter.createNativeFunction(lcd_library.clear));
		interpreter.setProperty(lcd, 'home', interpreter.createNativeFunction(lcd_library.home));
		interpreter.setProperty(lcd, 'setCursor', interpreter.createNativeFunction(lcd_library.setCursor));
		interpreter.setProperty(lcd, 'cursor', interpreter.createNativeFunction(lcd_library.cursor));
		interpreter.setProperty(lcd, 'noCursor', interpreter.createNativeFunction(lcd_library.noCursor));
		interpreter.setProperty(lcd, 'blink', interpreter.createNativeFunction(lcd_library.blink));
		interpreter.setProperty(lcd, 'noBlink', interpreter.createNativeFunction(lcd_library.noBlink));
		interpreter.setProperty(lcd, 'scrollDisplayLeft', interpreter.createNativeFunction(lcd_library.scrollDisplayLeft));
		interpreter.setProperty(lcd, 'scrollDisplayRight', interpreter.createNativeFunction(lcd_library.scrollDisplayRight));
		interpreter.setProperty(lcd, 'leftToRight', interpreter.createNativeFunction(lcd_library.leftToRight));
		interpreter.setProperty(lcd, 'rightToLeft', interpreter.createNativeFunction(lcd_library.rightToLeft));
		interpreter.setProperty(lcd, 'autoscroll', interpreter.createNativeFunction(lcd_library.autoscroll));
		interpreter.setProperty(lcd, 'noAutoscroll', interpreter.createNativeFunction(lcd_library.noAutoscroll));
		interpreter.setProperty(lcd, 'close', interpreter.createNativeFunction(lcd_library.close));
	}
}