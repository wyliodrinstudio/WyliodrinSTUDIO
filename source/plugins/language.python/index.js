let studio = null;


//TODO create settings function to save in folder.

export default function setup (options, imports, register)
{
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
	let pictograms = [
		{
			extension: '.py',
			icon:'mdi-language-python'
		},
		{
			extension: '.md',
			icon:'mdi-markdown'
		},
		{
			extension: '.json',
			icon:'mdi-json'
		}
	];
	let python = {
		async createProject(name){
			await studio.projects.newFile(name,'/main.py','print (\'Hello from Python\')');			
		},
		getDefaultFileName() {
			return '/main.py';
		},
		getDefaultRunFileName() {
			return '/main.py';
		},
		getMakefile(project, filename) {
			if (filename[0] === '/') filename = filename.substring (1);
			// TODO add filename
			return 'run:\n\tpython3 main.py';
		},
	};

	studio.projects.registerLanguage('python', 'Python', 'plugins/language.python/data/img/pythonLittle.png',pictograms, python);

	studio.projects.registerLanguagePackage ('python', null, [
		{
			name: 'requests',
			description: 'Requests is the only Non-GMO HTTP library for Python, safe for human consumption.'
		},
		{
			name: 'scrapy',
			description: 'Scrapy, a fast high-level web crawling & scraping framework for Python.'
		},
		{
			name: 'tensorflow',
			description: 'An end-to-end open source machine learning platform'
		},
		{
			name: 'scrapy',
			description: 'Scrapy, a fast high-level web crawling & scraping framework for Python.'
		},
		{
			name: 'numpy',
			description: 'NumPy is the fundamental package for scientific computing with Python.'
		},
		{
			name: 'Flask',
			description: 'The Python micro framework for building web applications.'
		},
		{
			name: 'opcua',
			description: 'LGPL Pure Python OPC-UA Client and Server'
		},
		{
			name: 'asyncua',
			description: 'OPC UA library for python > 3.6 asyncio'
		},
	]);

	register (null, {});
}
