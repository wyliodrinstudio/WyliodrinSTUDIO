'use strict';

let fs = require ('fs');
let mkdirp = require ('mkdirp');
let path = require ('path');

var libs = ['vue', 'vuetify', 'lodash', 'vuex', 'vue-resource', 'vue-router', 'jquery', 'sweetalert', 'vue-i18n', 'xterm', 'validator', 'brace', 'vue2-ace-editor', 'msgpack5'];

module.exports = function(grunt){
	var tasks = {
		browserify: {
			plugins: {
				files:[
					{
						expand: true,
						cwd:'source/plugins/',
						src:['**/index.js'],
						dest: 'build/plugins',
						extDot: 'first'
					},
				],
				options: {
					transform: ['vueify']
				}
			},
			ui: {
				files: {
					'build/ui/js/studio.js': ['source/ui/js/studio.js'],
				},
				options: {
					transform: ['vueify']
				}
			},
			vendor: {
				src: [],
				dest: 'build/js/vendor.js',
				options: {
					external: null,
					require: libs
				},
			},
			options:{
				external: libs,
				postBundleCB: function (err, src, next) {
					// HACK: save Node's `require` before it gets overrided by browserify
					// console.log (src.toString ());
					next(err, 'var node = {require: require, process: process, __dirname: __dirname}; /* console.log (node.require); */ /* console.log (node.process); */' + src);
				}
			},
		},
		// uglify: {
		// 	options:
		// 	{
		// 		compress: {
		// 			drop_console: true
		// 		},
		// 		mongle: true,
		// 	},
		// 	server: {
		// 		files:
		// 		{
		// 			'build/server/startup.js':'build/server/startup.js',
		// 			'build/server/index.js':'build/server/index.js'
		// 		}
		// 	},
		// 	workspace: {
		// 		files:
		// 		{
		// 			'build/workspace/startup.js':'build/workspace/startup.js',
		// 			'build/workspace/index.js':'build/workspace/index.js'
		// 		}
		// 	},
		// 	ui: {
		// 		files:
		// 		{
		// 			'build/ui/js/login.js':'build/ui/js/login.js',
		// 			'build/ui/js/app.js':'build/ui/js/app.js',
		// 			'build/ui/js/studio.js':'build/ui/js/studio.js',
		// 			'build/ui/js/project.js':'build/ui/js/project.js'
		// 		}
		// 	},
		// 	docs: {
		// 		files:
		// 		{
		// 			'build/docs/js/script.js':'build/docs/js/script.js',
		// 		}
		// 	},
		// 	vendor: {
		// 		files:
		// 		{
		// 			'build/ui/js/vendor.js':'build/ui/js/vendor.js',
		// 		}
		// 	},
		// },
		copy:
		{
			ui:
			{
				files:[
					{
						expand: true,
						cwd:'source/ui/',
						src:['*.html'],
						dest: 'build/ui/',
						extDot: 'first'
					},
					{
						expand: true,
						cwd:'source/ui/img/',
						src:['**/*',],
						dest: 'build/ui/img/',
						extDot: 'first'
					},
					
					{
						'build/package.json': 'package.json'
					},
				]
			},
			plugins:
			{
				files:[
					{
						expand: true,
						cwd:'source/plugins',
						src:['**/data'],
						dest: 'build/plugins',
						extDot: 'first',
						// rename: function (dest, src)
						// {
						// 	let paths = src.split ('/');
						// 	paths.splice (0, 2);
						// 	let dst = path.join (dest, paths.join (path.sep));
						// 	// console.log (dst);
						// 	return dst;
						// }
					}
				]
			},
			documentation:
			{
				files:[
					{
						expand: true,
						cwd:'source/ui/js/documentation',
						src:['**/*',],
						dest: 'build/ui/js/documentation',
						extDot: 'first'
					},
				]
			},
			main:
			{
				files:[
					{
						expand: true,
						cwd:'source/',
						src:['main.js'],
						dest: 'build/js/',
						extDot: 'first'
					},
					{
						'build/package.json': 'package.json'
					},

				]
			},
			vendor:
			{
				files:[
					{
						expand: true,
						cwd:'./node_modules/material-design-icons-iconfont/dist/',
						src:['fonts/**'],
						dest: 'build/css',
						extDot: 'first'
					},
				]
			}
		},
		less:
		{
			studio:
			{
				files: {
					'build/ui/css/studio.css': 'source/ui/less/studio.less'
				}
			},
			vendor: {
				files: {
					'build/ui/css/vendor.css': 'source/ui/less/vendor.less'
				}
			}
		},
		eslint:
		{
			gruntfile: 'gruntfile.js',
			main:['source/main.js'],
			ui:['source/ui/**/*.js', 'source/ui/**/*.vue', '!source/ui/js/blockly/**/*', '!source/ui/js/visual/**/*','!source/ui/js/documentation/**/*']
		},
		// mustache_render: {
		// 	docs: {
		// 		files : [
		// 			{
		// 				expand: true,
		// 				cwd: 'source/docs',
		// 				data: 'build/settings.json',
		// 				src: ['**/*.md', '**/*.html'],
		// 				dest: 'build/docs'
		// 			}
		// 		]
		// 	},
		// 	ibot_docs: {
		// 		files : [
		// 			{
		// 				expand: true,
		// 				cwd: 'source/whitelabel/ibot/docs',
		// 				data: 'build/settings.json',
		// 				src: ['**/*.md', '**/*.html'],
		// 				dest: 'build/docs'
		// 			}
		// 		]
		// 	},
		// 	wyliodrin_deploy: {
		// 		files : [
		// 			{
		// 				expand: true,
		// 				cwd: 'source/deploy/templates',
		// 				data: 'source/deploy/templates/wyliodrin.json',
		// 				src: ['**/*.yml','**/*.sh','**/*.yaml'],
		// 				dest: 'deploy'
		// 			}
		// 		]
		// 	},
		// 	ibot_deploy: {
		// 		files : [
		// 			{
		// 				expand: true,
		// 				cwd: 'source/deploy/templates',
		// 				data: 'source/whitelabel/ibot/ibot.json',
		// 				src: ['**/*.yml','**/*.sh','**/*.yaml'],
		// 				dest: 'deploy'
		// 			},
		// 		]
		// 	},
		// 	vm_deploy: {
		// 		files : [
		// 			{
		// 				expand: true,
		// 				cwd: 'source/deploy/templates',
		// 				data: 'source/deploy/templates/wyliodrin-vm.json',
		// 				src: ['**/*.yml','**/*.sh','**/*.yaml'],
		// 				dest: 'deploy'
		// 			},
		// 		]
		// 	}
		// },
		// cssmin: {
		// 	options: {
		// 		keepSpecialComments: 0
		// 	},
		// 	ui:
		// 	{
		// 		expand: true,
		// 		cwd: 'build/ui/css',
		// 		src: ['*.css', '!*.min.css'],
		// 		dest: 'build/ui/css',
		// 		ext: '.css'
		// 	},
		// 	docs:
		// 	{
		// 		expand: true,
		// 		cwd: 'build/docs/css',
		// 		src: ['*.css', '!*.min.css'],
		// 		dest: 'build/docs/css',
		// 		ext: '.css'
		// 	}
		// }
	};

	grunt.registerTask ('languages', 'Languages', function ()
	{
		let TRANSLATION_READ = 'source/translations/';
		let TRANSLATION_WRITE = 'build/ui/js/languages.js';
		let languageList = fs.readdirSync (TRANSLATION_READ);

		let result = {};

		let languages = {};

		for (let file of languageList)
		{
			let fileTranslated = path.basename( file, '.json' );
			if (fileTranslated.startsWith('messages-'))
			{
				let newObject = {};

				let language = require('./'+path.join (TRANSLATION_READ,fileTranslated));
				for (let key in language) {
					let value = language[key];
					newObject[key] = value.message;
				}

				let languageKey = fileTranslated.substring(9);

				result[languageKey] = JSON.parse(fs.readFileSync(path.join(TRANSLATION_READ,file)).toString()).LANGUAGE.message;
				console.log ('Language ' + fileTranslated.substring(9).toString() + ' added.');

				// mkdirp.sync(TRANSLATION_WRITE);
				// fs.writeFileSync( './'+TRANSLATION_WRITE+"locale-"+fileTranslated.substring(9)+".json", JSON.stringify (newObject));     
				languages[languageKey] = newObject;
			}
		}

		mkdirp.sync (path.dirname (TRANSLATION_WRITE));
		fs.writeFileSync (TRANSLATION_WRITE, '"use strict";\n module.exports = '+JSON.stringify ({LANGUAGES: result, TRANSLATION: languages})+';');  
	});

	grunt.registerTask ('blockly', 'Blockly', function (label)
	{
		let blockly_compressed = fs.readFileSync ('source/ui/js/blockly/blockly_compressed.js').toString ();
		blockly_compressed += '\nmodule.exports = {\n\tBlockly,\n\tgoog\n};';
		fs.writeFileSync ('source/ui/js/blockly/blockly_compressed_wyliolab.js', blockly_compressed);

		function wrap (filename)
		{
			let extension = path.extname (filename);
			let filename_wyliolab = filename.substring (0, filename.length-extension.length)+'_wyliolab'+extension;
			// console.log (filename_wyliolab);
			let data = fs.readFileSync (filename).toString ();
			data = '// DO NOT EDIT THIS FILE, IT IS AUTMATICALLY GENERATED\n\nmodule.exports = function (blockly) {\n\tvar Blockly = blockly.Blockly;\n\tvar goog = blockly.goog;\n' + data +'\n};';
			fs.writeFileSync (filename_wyliolab, data);
		}

		if (!label || label === 'ui')
		{
			wrap ('source/ui/js/blockly/blocks_compressed.js');
			wrap ('source/ui/js/blockly/msg/js/en.js');
			wrap ('source/ui/js/blockly/python_compressed.js');
		}
		if (!label || label === 'blocks')
		{
			wrap ('source/ui/js/visual/definitions.js');
			wrap ('source/ui/js/visual/code.js');

			wrap ('source/ui/js/visual/language_definitions.js');
			wrap ('source/ui/js/visual/language_code.js');
		}
	});

	grunt.initConfig(tasks);
	grunt.loadNpmTasks ('grunt-eslint');
	grunt.loadNpmTasks ('grunt-browserify');
	grunt.loadNpmTasks ('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask ('default', ['eslint', 'blockly', 'browserify', 'less', 'copy', 'languages']);
	grunt.registerTask ('fast', 'browserify:ui');

};