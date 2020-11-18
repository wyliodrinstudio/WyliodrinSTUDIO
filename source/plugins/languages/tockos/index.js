let studio = null;

//TODO create settings function to save in folder.

import SelectBoard from './views/SelectBoard.vue';
import SelectExample from './views/SelectExample.vue';
import makefile_board from 'raw-loader!./template/makefile.board';
import makefile_libtock_c from 'raw-loader!./template/makefile.libtock-c';

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

	/* Board */

	let boardFileIcons = [
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

	let boardTockos = {
		async createProject(name){
			/* studio.workspace.showDialog will return in this case:
				--> true if the submit button was clicked
				--> false if the cancel button was clicked
			*/
			return await studio.workspace.showDialog (SelectBoard, {name});
		},
		getDefaultFileName() {
			return '/src/main.rs';
		},
		getDefaultRunFileName() {
			return '/src/main.rs';
		},
		getMakefile(/* project, filename */) {
			return makefile_board;
		},
	};

	studio.projects.registerLanguage('tockos-board', 'TockOS Board', 'plugins/languages/tockos/data/img/tockos-board-small.png', 'plugins/languages/tockos/data/img/tock-os-28.png', boardFileIcons, boardTockos);

	/* libtock-c */

	let libtockcFileIcons = [
		{
			extension: '.h',
			icon:'mdi-h'
		},
		{
			extension: '.c',
			icon:'mdi-c'
		},
	];

	let libtockcTockos = {
		async createProject(name){
			/* studio.workspace.showDialog will return in this case:
				--> true if the submit button was clicked
				--> false if the cancel button was clicked
			*/
			let ret = await studio.workspace.showDialog (SelectExample, {name});
			if (ret === true) {
				await studio.projects.newFile(name, '.project/upload.sh', '# DO NOT MODIFY this file will be generated AUTOMATICALLY\n\n');
			}
		},
		getDefaultFileName() {
			return '/main.c';
		},
		getDefaultRunFileName() {
			return '/main.c';
		},
		getMakefile(/* project, filename */) {
			return makefile_libtock_c;
		},
	};

	studio.projects.registerLanguage('tockos-libtockc', 'TockOS C App', 'plugins/languages/tockos/data/img/tockos-c-small.png', 'plugins/languages/tockos/data/img/tock-os-28.png', libtockcFileIcons, libtockcTockos);

	register (null, {});
}
