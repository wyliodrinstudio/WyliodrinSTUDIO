let studio = null;


//TODO create settings function to save in folder.

export default function setup (options, imports, register)
{
	studio = imports;
	
	let awesome = {
		async createProject(name){
			await studio.projects.newFile(name,'/main.aws','print (\'Hello from awesome\')');			
		},
		getDefaultFileName() {
			return '/main.aws';
		},
		getDefaultRunFileName() {
			return '/main.aws';
		},
		getMakefile(project, filename) {
			if (filename[0] === '/') filename = filename.substring (1);
			// TODO add filename
			return 'run:\n\tawesome main.aws';
		},
	};

	studio.projects.registerLanguage('awesome', 'awesome', 'plugins/language.awesome/data/img/awesome.png', awesome);

	register (null, {});
}
