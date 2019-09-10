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
			return 'run:\n\tpython main.py';
		},
	};

	studio.projects.registerLanguage('python', 'Python', 'plugins/language.python/data/img/pythonLittle.png',[], python);

	register (null, {});
}
