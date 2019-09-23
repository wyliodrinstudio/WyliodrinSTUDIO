import $ from 'jquery';
import switches from './switches.js';
import touches from './touches.js';

let generic_rpk = {
	text: '',
	line: 1,
	textColor: 'GUI_WHITE',

	rgbBrightness: 'OFF',
	rgbColor: 'BLACK',

	light: null,
	airQuality: null,
	pressure: null,
	temperature: null,
	buzzer: null,

	guiBacklightDictionary: {
        'OFF': '1',
        'LOW': '0.6',
        'MEDIUM': '0.3',
        'HIGH': '0'
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
        'OFF': '1',
        'LOW': '0.6',
        'MEDIUM': '0.3',
        'HIGH': '0'
    },
	
	rgbColorDictionary: {
        'RED': '0',
        'GREEN': '120',
        'BLUE': '210',
        'YELLOW': '60',
        'CYAN': '180',
		'PURPLE': '280',
		'BLACK': 'black',
		'WHITE': 'white'
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
		'ON': true,
		'OFF': false
	},

	setToDefault: function() {
		this.text = '';
		this.line = 1;
		this.textColor = 'GUI_WHITE';

		this.rgbBrightness = 'OFF';
		this.rgbColor = 'BLACK';

		this.buzzer = 'OFF';

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

		let canvas1 = document.getElementById('rpk_display');
		let ctx1 = canvas1.getContext('2d');
		ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
		ctx1.canvas.width  = 100;
		ctx1.canvas.height = 100;
		ctx1.beginPath();
		ctx1.fillStyle = 'black';
		ctx1.fillRect(0, 0, 100, 100);
		ctx1.stroke();

		$('#LED').attr('fill', this.rgbColorDictionary[this.rgbColor]);

		switches.generateSwitches();
		touches.generateTouches();
	}
}

export default generic_rpk;