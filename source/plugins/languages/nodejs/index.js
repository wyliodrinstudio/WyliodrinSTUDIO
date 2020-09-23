let studio = null;


//TODO create settings function to save in folder.

export default function setup(options, imports, register) {
	studio = imports;
	/**
	{
		id: 'javascript',
		title: 'JavaScript',
		icon:'./data/img/languages/project/javascript.png',
		options:{
			main(){

			}
		}
	}, */
	//languageAddon(language,board,type, options)
	/**
	 * 		addon
	 * 		{
				type:'rpk/wyapp',
				board:'oriceBoard',
				createProject(name),
				getDefaultFileName(project),
				getCurrentProject,
			}
	 */
	let fileIcons = [
		{
			extension: '.js',
			icon:'mdi-language-javascript'
		},
		{
			extension: '.py',
			icon:'mdi-language-python'
		},
		{
			extension: '.vue',
			icon:'mdi-vuejs'
		},
		{
			extension: '.html',
			icon:'mdi-language-html5'
		},
		{
			extension: '.json',
			icon:'mdi-json'
		},
		{
			extension: '.md',
			icon:'mdi-markdown'
		},
		{
			extension: '.css',
			icon:'mdi-language-css3'
		}
	];
	let javaScript = {
		async createProject(name) {
			await studio.projects.newFile(name, '/main.js', 'console.log(\'Hello from NodeJS\');');
		},
		getDefaultFileName() {
			return '/main.js';
		},
		getDefaultRunFileName() {
			return '/main.js';
		},
		getMakefile(project, filename) {
			if (filename[0] === '/') filename = filename.substring (1);
			// TODO add filename
			return 'run:\n\tnode main.js\n'; 
		},
		getEnvironmentSetup(project) {
			return 'RUN npm install\n';
		},
	};

	studio.projects.registerLanguage('nodejs', 'NodeJS', 'plugins/languages/nodejs/data/img/project.png', 'plugins/languages/nodejs/data/img/javascriptLittle.png',fileIcons, javaScript);

	studio.projects.registerLanguagePackage ('nodejs', null, [
		{
			name: 'request',
			description: 'Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.'
		},
		{
			name: 'axios',
			description: 'Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.'
		},
		{
			name: 'express',
			description: 'Fast, unopinionated, minimalist web framework for Node.js'
		},
		{
			name: '@tensorflow/tfjs',
			description: 'An end-to-end open source machine learning platform'
		},
		{
			name: 'grunt-cli',
			description: 'Grunt\'s command line interface.'
		},
		{
			name: 'lodash',
			description: 'A modern JavaScript utility library delivering modularity, performance & extras.'
		},
		{
			name: 'electron',
			description: 'Build cross platform desktop apps with JavaScript, HTML, and CSS'
		},
		{
			name: 'socket.io',
			description: 'Realtime application framework (Node.JS server)'
		},
		{
			name: 'nodemailer',
			description: 'Send e-mails with Node.JS – easy as cake!'
		},
		{
			name: 'mariadb',
			description: 'MariaDB Node.js connector'
		},
		{
			name: 'redis',
			description: 'redis client for node'
		},
		{
			name: 'mongodb',
			description: 'Mongo DB Native NodeJS Driver'
		},
		{
			name: 'node-opcua',
			description: 'an implementation of a OPC UA stack fully written in javascript and nodejs'
		},
		{           
			name: 'opcua-commander',
			description: 'a opcua client with blessed (ncurses)'
		},
		{
			name: 'vue',
			description: 'Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.'
		},
	]);
	register(null, {});
}