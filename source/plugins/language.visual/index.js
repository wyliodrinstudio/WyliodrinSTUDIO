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
	let pictograms = [
		{
			extension: '.visual',
			icon:'plugins/language.visual/data/img/visualLittle.png'
		},
		{
			extension: '.py',
			icon:'plugins/language.visual/data/img/pythonLittle.png'
		}
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
			return 'run:\n\tpython main.visual.py';
		},

		/* language specific options */
		sourceLanguage ()
		{
			return 'python';
		}
	};

	studio.projects.registerLanguage('visual', 'Visual', 'plugins/language.visual/data/img/visualLittle.png',pictograms, visual);

	register(null, {});
}