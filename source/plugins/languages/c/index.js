// import axios from 'axios';
let studio = null;

import makefile from 'raw-loader!./template/makefile';
import main from 'raw-loader!./template/main.c';

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
		},
		{
			extension: '.ld',
			icon:'mdi-settings'
		},
		{
			extension: '.cfg',
			icon:'mdi-settings'
		}
	];

	let c = {
		async createProject(name){			
			await studio.projects.newFile(name,'/main.c', main);			
		},
		getDefaultFileName() {
			return '/main.c';
		},
		getDefaultRunFileName() {
			return '/main.c';
		},
		getMakefile(/* project, filename */) {
			return makefile;
		},
	};

	studio.projects.registerLanguage('c', 'C', 'plugins/languages/c/data/img/c.png', 'plugins/languages/c/data/img/c.png',fileIcons, c);

	register (null, {});
}
