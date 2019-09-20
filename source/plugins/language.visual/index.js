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
			icon:'mdi-puzzle'
		},
		{
			extension: '.py',
			icon:'mdi-language-python'
		},
		{
			extension: '.json',
			icon:'mdi-json'
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

	studio.projects.registerLanguage('visual', 'Visual', 'plugins/language.visual/data/img/visualLittle.png',pictograms, visual);

	register(null, {});
}