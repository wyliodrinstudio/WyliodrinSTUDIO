import $ from 'jquery';
import switches from './switches.js';
import touches from './touches.js';

let generic_rpk = {
	text: '',
	line: 1,
	textColor: 'GUI_WHITE',

	rgbBrightness: 0,
	rgbColor: 7,

	light: 0,
	airQuality: 400,
	pressure: 50,
	temperature: -40,
	motion: false,
	frefall: false,
	gyroscope: {
		x: 0,
		y: 0,
		z: 0
	},
	accelometer: {
		x: 0,
		y: 0,
		z: 0
	},
	buzzer: 0,

	guiBacklightDictionary: {
        0: '1',
        1: '0.6',
        2: '0.3',
        3: '0'
	},
	
	guiColorDictionary: {
        'GUI_BLUE': '#0000FF',
        'GUI_GREEN': '#00FF00',
        'GUI_RED': '#FF0000',
        'GUI_CYAN': '#00FFFF',
        'GUI_MAGENTA': '#FF00FF',
        'GUI_YELLOW': '#FFFF00',
        'GUI_LIGHTBLUE': '#8080FF',
        'GUI_LIGHTGREEN': '#80FF80',
        'GUI_LIGHTRED': '#FF8080',
        'GUI_LIGHTCYAN': '#80FFFF',
        'GUI_LIGHTYELLOW': '#FFFF80',
        'GUI_DARKBLUE': '#000080',
        'GUI_DARKGREEN': '#008000',
        'GUI_DARKRED': '#800000',
        'GUI_DARKCYAN': '#008080',
        'GUI_DARKMAGENTA': '#800080',
        'GUI_DARKYELLOW': '#808000',
        'GUI_WHITE': '#FFFFFF',
        'GUI_LIGHTGRAY': '#D3D3D3',
        'GUI_GRAY': '#808080',
        'GUI_DARKGRAY': '#404040',
        'GUI_BLACK': '#000000',
        'GUI_BROWN': '#A52A2A',
        'GUI_ORANGE': '#FFA500'
	},

	rgbBrightnessDictionary: {
        0: '1',
        1: '0.6',
        2: '0.3',
        3: '0'
    },
	
	rgbColorDictionary: {
        0: '0',
        1: '120',
		2: '210',
		3: 'white',
        4: '60',
        5: '180',
		6: '280',
		7: 'black'
	},

	switchesDictionary: {
		1: false,
		2: false,
		3: false,
		4: false
	},

	touchesDictionary: {
		1: false,
		2: false,
		3: false,
		4: false
	},

	buzzerDictionary: {
		1: true,
		0: false
	},

	setToDefault: function() {
		this.text = '';
		this.line = 1;
		this.textColor = 'GUI_WHITE';

		this.rgbBrightness = 0;
		this.rgbColor = 7;

		this.buzzer = 0;

		this.switches = {
			'1': false,
			'2': false,
			'3': false,
			'4': false
		}

		this.touches = {
			'1': false,
			'2': false,
			'3': false,
			'4': false
		}

		let canvas = document.getElementById('rpk_display');
		let ctx = canvas.getContext('2d');
		ctx.canvas.width  = 115;
		ctx.canvas.height = 120;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		//ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, 115, 120);
		ctx.stroke();

		$('#led_color').attr('fill', this.rgbColorDictionary[this.rgbColor]);

		switches.generateSwitches();
		touches.generateTouches();
	}
}

export default generic_rpk;