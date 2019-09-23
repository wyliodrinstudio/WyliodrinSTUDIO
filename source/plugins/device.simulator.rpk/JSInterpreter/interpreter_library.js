import $ from 'jquery';

export default function interpreter_library (studio, device, generic_rpk) {
	return function simulator (interpreter, scope) {
		let log = function (text) {
			try {
				studio.console.write(device.id, text.toString() + '\r\n');
			} catch(e) {
				console.log(e);
			}
		};

		let sleep = function(delay, callback) {
			setTimeout(function() {
				callback(true);
			}, delay);
		};

		let guiDisplayClear = function() {
			let canvas = document.getElementById('rpk_display');
			let ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.canvas.width  = 100;
			ctx.canvas.height = 100;
			ctx.beginPath();
			ctx.fillStyle = 'black';
			ctx.fillRect(0, 0, 100, 100);
			ctx.stroke();
		};

		let guiDisplayNewLine = function() {
			generic_rpk.line ++;
			generic_rpk.text = '';
		};

		let guiDisplayString = function(string) {
			generic_rpk.text += string;
			let canvas = document.getElementById('rpk_display');
			let ctx = canvas.getContext('2d');
			ctx.fillStyle = generic_rpk.guiColorDictionary[generic_rpk.textColor];
			ctx.textAlign = 'left';
			ctx.font = '5 Arial';
			ctx.fillText(generic_rpk.text, 0, generic_rpk.line * 7);
			ctx.stroke();
		};

		let guiDisplayStringAt = function(string, x, y) {
			let canvas = document.getElementById('rpk_display');
			let ctx = canvas.getContext('2d');
			ctx.fillStyle = generic_rpk.guiColorDictionary[generic_rpk.textColor];
			ctx.textAlign = 'left';
			ctx.fillText(string, x, y + 10);
			ctx.stroke();
		};

		let guiDrawPoint = function(x, y) {
			let canvas = document.getElementById('rpk_display');
			let ctx = canvas.getContext('2d');
			ctx.fillStyle = 'white';
			ctx.fillRect(x, y, 1.5, 1.5);
			ctx.stroke();
		};

		let guiDrawLine = function(x0, y0, x1, y1) {
			let canvas = document.getElementById('rpk_display');
			let ctx = canvas.getContext('2d');
			ctx.strokeStyle = 'white';
			ctx.lineWidth = 1;
			ctx.moveTo(x0, y0);
			ctx.lineTo(x1, y1);
			ctx.fill();
			ctx.stroke();
		};

		let guiDrawHLine = function(x0, y0, x) {
			let canvas = document.getElementById('rpk_display');
			let ctx = canvas.getContext('2d');
			ctx.strokeStyle = 'white';
			ctx.lineWidth = 1;
			ctx.moveTo(x0, y0);
			ctx.lineTo(x, y0);
			ctx.fill();
			ctx.stroke();
		};

		let guiDrawVLine = function(x0, y0, y) {
			let canvas = document.getElementById('rpk_display');
			let ctx = canvas.getContext('2d');
			ctx.strokeStyle = 'white';
			ctx.lineWidth = 1;
			ctx.moveTo(x0, y0);
			ctx.lineTo(x0, y);
			ctx.fill();
			ctx.stroke();
		};

		let guiDrawRect = function(x0, y0, x1, y1) {
			let canvas = document.getElementById('rpk_display');
			let ctx = canvas.getContext('2d');
			ctx.strokeStyle = 'white';
			ctx.lineWidth = 1;
			ctx.rect(x0, y0, x1, y1);
			ctx.fill();
			ctx.stroke();
		};

		let guiFillRect = function(x0, y0, x1, y1) {
			let canvas = document.getElementById('rpk_display');
			let ctx = canvas.getContext('2d');
			ctx.fillStyle = 'white';
			ctx.fillRect(x0, y0, x1, y1);
			ctx.stroke();
		};

		let guiDrawCircle = function(x, y, r) {
			let canvas = document.getElementById('rpk_display');
			let ctx = canvas.getContext('2d');
			ctx.strokeStyle = 'white';
			ctx.lineWidth = 1;
			ctx.arc(x, y, r, 0, 2 * Math.PI);
			ctx.fill();
			ctx.stroke();
		};

		let guiFillCircle = function(x, y, r) {
			let canvas = document.getElementById('rpk_display');
			let ctx = canvas.getContext('2d');
			ctx.fillStyle = 'white';
			ctx.arc(x, y, r, 0, 2 * Math.PI);
			ctx.fill();
			ctx.stroke();
		};

		let guiDrawEllipse = function(x, y, rx, ry) {
			let canvas = document.getElementById('rpk_display');
			let ctx = canvas.getContext('2d');
			ctx.strokeStyle = 'white';
			ctx.lineWidth = 1;
			ctx.moveTo(x, y - ry);
			ctx.bezierCurveTo(
				x + rx, y - ry,
				x + rx, y + ry,
				x, y + ry);
			ctx.bezierCurveTo(
				x - rx, y + ry,
				x - rx, y - ry,
				x, y - ry);
			ctx.fill();
			ctx.stroke();
		};

		let guiFillEllipse = function(x, y, rx, ry) {
			let canvas = document.getElementById('rpk_display');
			let ctx = canvas.getContext('2d');
			ctx.fillStyle = 'white';
			ctx.moveTo(x, y - ry);
			ctx.bezierCurveTo(
				x + rx, y - ry,
				x + rx, y + ry,
				x, y + ry);
			ctx.bezierCurveTo(
				x - rx, y + ry,
				x - rx, y - ry,
				x, y - ry);
			ctx.fill();
			ctx.stroke();
		};

		let guiSetBkColor = function(color) {
			try {
				let canvas = document.getElementById('rpk_display');
				let ctx = canvas.getContext('2d');
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.canvas.width  = 100;
				ctx.canvas.height = 100;
				ctx.beginPath();
				ctx.fillStyle = generic_rpk.guiColorDictionary[color];
				ctx.fillRect(0, 0, 100, 100);
				ctx.stroke();
			} catch(e) {
				console.log(e);
			}
		};

		let guiSetColor = function(color) {
			try {
				generic_rpk.textColor = color;
			} catch(e) {
				console.log(e);
			}
		};

		let guiSetBacklight = function(backlight) {
			try {
				console.log('guiSetBacklight');
			} catch(e) {
				console.log(e);
			}
		};

		let rgbSetBrightness = function(brightness) {
			try {
				generic_rpk.rgbBrightness = brightness;
				$('#BRIGHTNESS').attr('fill', 'rgba(0, 0, 0,  ' + generic_rpk.rgbBrightnessDictionary[generic_rpk.rgbBrightness]);
			} catch(e) {
				console.log(e);
			}
		};

		let rgbSetColor = function(color) {
			try {
				generic_rpk.rgbColor = color;
				if (color === 'WHITE') {
					$('#LED').attr('fill', 'white');
				} else if (color  ===  'BLACK') {
					$('#LED').attr('fill', 'black');
				} else {
					$('#LED').attr('fill', 'hsl('+ generic_rpk.rgbColorDictionary[generic_rpk.rgbColor] + ', 50%, 50%)');
				}
			} catch(e) {
				console.log(e);
			}
		};

		let rgbSetState = function(brightness, color) {
			try {
				rgbSetBrightness(brightness);
				rgbSetColor(color);
			} catch(e) {
				console.log(e);
			}
		};

		let rgbGetBrightness = function() {
			return generic_rpk.rgbBrightnessDictionary[generic_rpk.rgbBrightness];
		};

		let rgbGetColor = function() {
			return generic_rpk.rgbColorDictionary[generic_rpk.rgbColor];
		};

		let switchesGetValue = function() {
			let pressed = 0;

			for (let button of Object.keys(generic_rpk.switchesDictionary)) {
				if(generic_rpk.switchesDictionary[button]) {
					pressed = button;
				}
			}

			return pressed;
		};

		let touchGetValue = function() {
			let pressed = 0;

			for (let touch of Object.keys(generic_rpk.touchesDictionary)) {
				if(generic_rpk.touchesDictionary[touch]) {
					pressed = touch;
				}
			}

			return pressed;
		};

		let lightGetValue = function() {
			return generic_rpk.light;
		};

		let airQualityGetValue = function() {
			return generic_rpk.airQuality;
		};

		let pressureGetValue = function() {
			return generic_rpk.pressure;
		};

		let temperatureGetValue = function() {
			return generic_rpk.temperature;
		};

		let batteryGetValue = function() {
			return 'IT IS OVER 9999999%';
		};
		
		let motionGetValue = function() {
			return 'MOVES LIKE JAGGER';
		};

		let freefallGetValue = function() {
			return 'DOWN DOWN DOWN DOWN';
		};

		let gyroscopeGetValue = function() {
			return 'ROUND AND ROUND AND ROUND';
		};

		let accelometerGetValue = function() {
			return 'I AM SPEED';
		};

		let buzzerSetState = function(state) {
			let audio = document.getElementById('beep');
			audio.loop = generic_rpk.buzzerDictionary[state];
			audio.play();
		};

		let buzzerGetState = function() {
			return generic_rpk.buzzer;
		};

		let require = function(name) {
			if (name === 'GUI') {
				let GUI = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
				interpreter.setProperty(scope, 'GUI', GUI);
				interpreter.setProperty(GUI, 'displayClear', interpreter.createNativeFunction(guiDisplayClear));
				interpreter.setProperty(GUI, 'displayNewLine', interpreter.createNativeFunction(guiDisplayNewLine));
				interpreter.setProperty(GUI, 'displayString', interpreter.createNativeFunction(guiDisplayString));
				interpreter.setProperty(GUI, 'displayStringAt', interpreter.createNativeFunction(guiDisplayStringAt));
				interpreter.setProperty(GUI, 'drawPoint', interpreter.createNativeFunction(guiDrawPoint));
				interpreter.setProperty(GUI, 'drawLine', interpreter.createNativeFunction(guiDrawLine));
				interpreter.setProperty(GUI, 'drawHLine', interpreter.createNativeFunction(guiDrawHLine));
				interpreter.setProperty(GUI, 'drawVLine', interpreter.createNativeFunction(guiDrawVLine));
				interpreter.setProperty(GUI, 'drawRect', interpreter.createNativeFunction(guiDrawRect));
				interpreter.setProperty(GUI, 'fillRect', interpreter.createNativeFunction(guiFillRect));
				interpreter.setProperty(GUI, 'drawCircle', interpreter.createNativeFunction(guiDrawCircle));
				interpreter.setProperty(GUI, 'fillCircle', interpreter.createNativeFunction(guiFillCircle));
				interpreter.setProperty(GUI, 'drawEllipse', interpreter.createNativeFunction(guiDrawEllipse));
				interpreter.setProperty(GUI, 'fillEllipse', interpreter.createNativeFunction(guiFillEllipse));
				interpreter.setProperty(GUI, 'setBkColor', interpreter.createNativeFunction(guiSetBkColor));
				interpreter.setProperty(GUI, 'setColor', interpreter.createNativeFunction(guiSetColor));
				interpreter.setProperty(GUI, 'setBacklight', interpreter.createNativeFunction(guiSetBacklight));

				return GUI;
			} else if (name === 'RGB') {
				let RGB = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
				interpreter.setProperty(scope, 'RGB', RGB);
				interpreter.setProperty(RGB, 'setBrightness', interpreter.createNativeFunction(rgbSetBrightness));
				interpreter.setProperty(RGB, 'setColor', interpreter.createNativeFunction(rgbSetColor));
				interpreter.setProperty(RGB, 'setState', interpreter.createNativeFunction(rgbSetState));
				interpreter.setProperty(RGB, 'getBrightness', interpreter.createNativeFunction(rgbGetBrightness));
				interpreter.setProperty(RGB, 'getColor', interpreter.createNativeFunction(rgbGetColor));

				return RGB;
			} else if (name === 'switches') {
				let switches = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
				interpreter.setProperty(scope, 'switches', switches);
				interpreter.setProperty(switches, 'getValue', interpreter.createNativeFunction(switchesGetValue));
				interpreter.setProperty(switches, 'SW1', 1);
				interpreter.setProperty(switches, 'SW2', 2);
				interpreter.setProperty(switches, 'SW3', 3);
				interpreter.setProperty(switches, 'SW4', 4);

				return switches;
			} else if (name === 'touch') {
				let touch = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
				interpreter.setProperty(scope, 'touch', touch);
				interpreter.setProperty(switches, 'getValue', interpreter.createNativeFunction(touchGetValue));
				interpreter.setProperty(switches, 'UP', 1);
				interpreter.setProperty(switches, 'DOWN', 2);
				interpreter.setProperty(switches, 'LEFT', 3);
				interpreter.setProperty(switches, 'RIGHT', 4);

				return touch;
			} else if (name === 'light') {
				let light = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
				interpreter.setProperty(scope, 'light', light);
				interpreter.setProperty(light, 'getValue', interpreter.createNativeFunction(lightGetValue));

				return light;
			} else if (name === 'airQuality') {
				let airQuality = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
				interpreter.setProperty(scope, 'airQuality', airQuality);
				interpreter.setProperty(airQuality, 'getValue', interpreter.createNativeFunction(airQualityGetValue));

				return airQuality;
			} else if (name == 'pressure') {
				let pressure = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
				interpreter.setProperty(scope, 'pressure', pressure);
				interpreter.setProperty(pressure, 'getValue', interpreter.createNativeFunction(pressureGetValue));

				return pressure;
			} else if (name == 'temperature') {
				let temperature = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
				interpreter.setProperty(scope, 'temperature', temperature);
				interpreter.setProperty(temperature, 'getValue', interpreter.createNativeFunction(temperatureGetValue));

				return temperature;
			} else if (name == 'battery') {
				let battery = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
				interpreter.setProperty(scope, 'battery', battery);
				interpreter.setProperty(battery, 'getValue', interpreter.createNativeFunction(batteryGetValue));

				return battery;
			} else if (name == 'motion') {
				let motion = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
				interpreter.setProperty(scope, 'motion', motion);
				interpreter.setProperty(motion, 'getValue', interpreter.createNativeFunction(motionGetValue));

				return motion;
			} else if (name == 'freefall') {
				let freefall = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
				interpreter.setProperty(scope, 'freefall', freefall);
				interpreter.setProperty(freefall, 'getValue', interpreter.createNativeFunction(freefallGetValue));

				return freefall;
			} else if (name == 'gyroscope') {
				let gyroscope = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
				interpreter.setProperty(scope, 'gyroscope', gyroscope);
				interpreter.setProperty(gyroscope, 'getValue', interpreter.createNativeFunction(gyroscopeGetValue));

				return gyroscope;
			} else if (name == 'accelometer') {
				let accelometer = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
				interpreter.setProperty(scope, 'accelometer', accelometer);
				interpreter.setProperty(accelometer, 'getValue', interpreter.createNativeFunction(accelometerGetValue));

				return accelometer;
			} else if (name == 'buzzer') {
				let buzzer = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
				interpreter.setProperty(scope, 'buzzer', buzzer);
				interpreter.setProperty(buzzer, 'setState', interpreter.createNativeFunction(buzzerSetState));
				interpreter.setProperty(buzzer, 'getState', interpreter.createNativeFunction(buzzerGetState));

				return buzzer;
			}
		};

		let jsConsole = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
		interpreter.setProperty(scope, 'console', jsConsole);
		interpreter.setProperty(jsConsole, 'log', interpreter.createNativeFunction(log));

		interpreter.setProperty(scope, 'sleep', interpreter.createAsyncFunction(sleep));
		interpreter.setProperty(scope, 'require', interpreter.createNativeFunction(require));
	}
}