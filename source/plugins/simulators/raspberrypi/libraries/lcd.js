// This is the 'lcd' constructor for the JS interpreter
let lcd = 
`libraries['lcd'] = function(object) {
	this.rs = object.rs;
	this.e = object.e;
	this.data = object.data;
	this.cols = object.cols;
	this.rows = object.rows;

	lcd_library.create(object.rs, object.e, object.data);

	this.print = function(value) {
		lcd_library.print(this.rs, value);
	};

	this.clear = function() {
		lcd_library.clear(this.rs);
	};

	this.home = function() {
		lcd_library.home(this.rs);
	};

	this.setCursor = function(col, row) {
		lcd_library.setCursor(this.rs, col, row);
	};

	this.cursor = function() {
		lcd_library.cursor(this.rs);
	};

	this.noCursor = function() {
		lcd_library.noCursor(this.rs);
	};

	this.blink = function() {
		lcd_library.blink();
	};

	this.noBlink = function() {
		lcd_library.noBlink();
	};

	this.scrollDisplayLeft = function() {
		lcd_library.scrollDisplayLeft(this.rs);
	};

	this.scrollDisplayRight = function() {
		lcd_library.scrollDisplayRight(this.rs);
	};

	this.leftToRight = function() {
		return lcd_library.leftToRight(this.rs);
	};

	this.rightToLeft = function() {
		return lcd_library.rightToLeft(this.rs);
	};

	this.autoscroll = function() {
		return lcd_library.autoscroll();
	};

	this.noAutoscroll = function() {
		return lcd_library.noAutoscroll();
	};

	this.close = function() {
		lcd_library.close(this.rs);
	};
};\n\n`;

export default lcd;