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
			extension: '.rs',
			icon:'plugins/languages/rust/data/img/rustLittle.png'
		},
		{
			extension: '.toml',
			icon:'mdi-settings'
		}
	];
	let rust = {
		async createProject(project){
			await studio.projects.newFile(project,'/package.toml','[package]\nname = "'+project.name+'"\nversion = "0.1.0"\nauthors = ["Your Name <name@email.net>"]\nedition = "2018"\n');			
			await studio.projects.newFile(project,'/src/main.rs','use std;\n\nfn main (){\n\tprintln! ("Hello from Rust");\n}\n');			
		},
		getDefaultFileName() {
			return '/src/main.rs';
		},
		getDefaultRunFileName() {
			return '/src/main.rs';
		},
		getMakefile(project, filename) {
			if (filename[0] === '/') filename = filename.substring (1);
			// TODO add filename
			return 'run:\n\tcargo run';
		},
	};

	studio.projects.registerLanguage('rust', 'Rust', 'plugins/languages/rust/data/img/rust.png', pictograms, rust);

	// studio.projects.registerLanguagePackage ('python', null, [
	// 	{
	// 		name: 'requests',
	// 		description: 'Requests is the only Non-GMO HTTP library for Python, safe for human consumption.'
	// 	},
	// 	{
	// 		name: 'scrapy',
	// 		description: 'Scrapy, a fast high-level web crawling & scraping framework for Python.'
	// 	},
	// 	{
	// 		name: 'tensorflow',
	// 		description: 'An end-to-end open source machine learning platform'
	// 	},
	// 	{
	// 		name: 'scrapy',
	// 		description: 'Scrapy, a fast high-level web crawling & scraping framework for Python.'
	// 	},
	// 	{
	// 		name: 'numpy',
	// 		description: 'NumPy is the fundamental package for scientific computing with Python.'
	// 	},
	// 	{
	// 		name: 'Flask',
	// 		description: 'The Python micro framework for building web applications.'
	// 	},
	// 	{
	// 		name: 'opcua',
	// 		description: 'LGPL Pure Python OPC-UA Client and Server'
	// 	},
	// 	{
	// 		name: 'asyncua',
	// 		description: 'OPC UA library for python > 3.6 asyncio'
	// 	},
	// ]);

	register (null, {});
}
