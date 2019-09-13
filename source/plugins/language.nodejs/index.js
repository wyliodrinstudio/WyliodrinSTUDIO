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
	let pictograms = [
		{
			extension: '.js',
			icon:'plugins/language.nodejs/data/img/javascriptIcon.png'
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
			return 'run:\n\tnode main.js';
		},
	};

	studio.projects.registerLanguage('nodejs', 'NodeJS', 'plugins/language.nodejs/data/img/javascriptLittle.png',pictograms, javaScript);

	studio.projects.registerLanguagePackage ('nodejs', null, [
		{
			name: 'request',
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
			name: 'mysql',
			description: 'A pure node.js JavaScript Client implementing the MySQL protocol.'
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
	]);
	register(null, {});
}