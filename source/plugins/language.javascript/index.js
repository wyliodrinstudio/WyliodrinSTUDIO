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
	let javaScript = {
		async createProject(name) {
			await studio.projects.newFile(name, '/main.js', 'console.log(\'Hello from JavaScript\');');
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

	studio.projects.registerLanguage('javascript', 'JavaScript', 'plugins/language.javascript/data/img/javascript.png', javaScript);

	register(null, {});
}