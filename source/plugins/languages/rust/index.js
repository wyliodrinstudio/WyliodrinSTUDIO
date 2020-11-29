let studio = null;


//TODO create settings function to save in folder.

export default function setup (options, imports, register)
{
	studio = imports;
	let fileIcons = [
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
			await studio.projects.newFile(project,'/Cargo.toml','[package]\nname = "'+project.name+'"\nversion = "0.1.0"\nauthors = ["Your Name <name@email.net>"]\nedition = "2018"\n');			
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
		}
	};

	studio.projects.registerLanguage('rust', 'Rust', 'plugins/languages/rust/data/img/project.png', 'plugins/languages/rust/data/img/rust.png', 'plugins/languages/rust/data/img/rustLittle.png', fileIcons, rust);

	register (null, {
		// provides this for the application icons
		language_rust: {}
	});
}
