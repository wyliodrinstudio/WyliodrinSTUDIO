// This is the 'onoff.Gpio' constructor for the JS interpreter
let onoff = 
`libraries['onoff'] = {
	Gpio: function (pin, state, edge, options) {
		this.pin = pin;
		this.state = state;
		this.edge = edge;
		this.options = options;

		onoff.Gpio.create(pin, state);

		this.read = function() {
			return onoff.Gpio.read(this.pin, this.state);
		};

		this.readSync = function() {
			return onoff.Gpio.readSync(this.pin, this.state);
		};

		this.write = function(value) {
			onoff.Gpio.write(this.pin, this.state, value);
		};

		this.writeSync = function(value) {
			onoff.Gpio.writeSync(this.pin, this.state, value);
		};

		this.watch = function() {
			onoff.Gpio.watch();
		};

		this.unwatch = function() {
			onoff.Gpio.unwatch();
		};

		this.unwatchAll = function() {
			onoff.Gpio.unwatchAll();
		};

		this.direction = function() {
			return onoff.Gpio.direction(this.pin);
		};

		this.setDirection = function(value) {
			onoff.Gpio.setDirection(this.pin, value);
		};

		this.activeLow = function() {
			return onoff.Gpio.activeLow(this.pin);
		};

		this.setActiveLow = function(value) {
			onoff.Gpio.setActiveLow(this.pin, value);
		};
	}
};\n\n`;

export default onoff;