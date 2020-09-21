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
	let fileIcons = [
		{
			extension: '.sh',
			icon:'mdi-bash'
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
	let shell = {
		async createProject(name){
			await studio.projects.newFile(name,'/main.sh','echo "Hello from Shell"');
		},
		getDefaultFileName() {
			return '/main.sh';
		},
		getDefaultRunFileName() {
			return '/main.sh';
		},
		getMakefile(project, filename) {
			if (filename[0] === '/') filename = filename.substring (1);
			// TODO add filename
			return 'run:\n\tbash main.sh';
		},
		getDockerBuildCommands(project,filename) {
			return null;
		},
		getDockerRunCommands(project,filename) {
			//cmd din dockerfile
			return null;
		}
	};

	studio.projects.registerLanguage('shell', 'Bash Shell', 'plugins/languages/shell/data/img/project.png', 'plugins/languages/shell/data/img/shellLittle.png',fileIcons, shell);

	register (null, {});
}
