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
	let fileIcons = [
		{
			extension: '.visual',
			icon:'mdi-puzzle'
		},
		{
			extension: '.md',
			icon:'mdi-markdown'
		},
	];
	let visual = {
		async createProject(project) {
			await studio.projects.newFile(project, 'main.visual', '<xml></xml>');
		},
		getDefaultFileName() {
			return 'main.visual';
		},
		getDefaultRunFileName() {
			return 'main.visual.py';
		},
		getMakefile(project, filename) {
			if (filename[0] === '/') filename = filename.substring (1);
			// TODO add filename
			return 'run:\n\tpython3 main.visual.py';
		},

		/* language specific options */
		sourceLanguage ()
		{
			return 'python';
		}
	};

	studio.projects.registerLanguage('visual', 'Visual', 'plugins/languages/visual/language/data/img/project.png', 'plugins/languages/visual/language/data/img/visual.png', 'plugins/languages/visual/language/data/img/visualLittle.png', fileIcons, visual);

	register(null, {
		// provides this for the application icons
		language_visual: {}
	});
}