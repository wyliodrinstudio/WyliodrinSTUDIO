import axios from 'axios';
let studio = null;


async function downloadBoardFile (board, filename) {
	console.log ('https://raw.githubusercontent.com/tock/tock/master/boards/'+board+filename);
	let response = await axios.get ('https://raw.githubusercontent.com/tock/tock/master/boards/'+board+filename);
	console.log (response);
	return response.data;
}

async function downloadLibtockcFile (example, filename) {
	console.log ('https://raw.githubusercontent.com/tock/libtock-c/master/examples/'+example+filename);
	let response = await axios.get ('https://raw.githubusercontent.com/tock/libtock-c/master/examples/'+example+filename);
	console.log (response);
	return response.data;
}


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
			let board = await studio.workspace.showDialog (SelectBoard);
			if (board !== null)
			{
				await studio.projects.newFolder(name,'/src');			
				await studio.projects.newFile(name,'/src/main.rs', await downloadBoardFile (board, '/src/main.rs'));			
				await studio.projects.newFile(name,'/src/io.rs', await downloadBoardFile (board, '/src/io.rs'));			
				await studio.projects.newFile(name,'/Cargo.toml', (await downloadBoardFile (board, '/Cargo.toml')).toString()+'\n\n[workspace]\n');			
				await studio.projects.newFile(name,'/layout.ld', await downloadBoardFile (board, '/layout.ld'));			
				await studio.projects.newFile(name,'/chip_layout.ld', await downloadBoardFile (board, '/chip_layout.ld'));			
				await studio.projects.newFile(name,'/Makefile.kernel', (await downloadBoardFile (board, '/Makefile')));
				await studio.projects.newFile(name,'/build.rs', await downloadBoardFile (board, '/build.rs'));						
				await studio.projects.newFile(name,'/openocd.cfg', await downloadBoardFile (board, '/openocd.cfg'));						
			}
		},
		getDefaultFileName() {
			return '/src/main.rs';
		},
		getDefaultRunFileName() {
			return '/src/main.rs';
		},
		getMakefile(project, filename) {
			return makefile_board;
		},
	};

	studio.projects.registerLanguage('tockos-board', 'TockOS Board', 'plugins/languages/tockos/data/img/project.png', 'plugins/languages/python/data/img/pythonLittle.png', boardFileIcons, boardTockos);

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
			let example = await studio.workspace.showDialog (SelectExample);
			console.log (example);
			if (example !== null)
			{
				await studio.projects.newFile(name,'/main.c', await downloadLibtockcFile (example, '/main.c'));			
				await studio.projects.newFile(name,'/Makefile.app', (await downloadLibtockcFile (example, '/Makefile')));		
			}
		},
		getDefaultFileName() {
			return '/main.c';
		},
		getDefaultRunFileName() {
			return '/main.c';
		},
		getMakefile(project, filename) {
			return makefile_libtock_c;
		},
	};

	studio.projects.registerLanguage('tockos-libtockc', 'TockOS C App', 'plugins/languages/tockos/data/img/project.png', 'plugins/languages/python/data/img/pythonLittle.png', libtockcFileIcons, libtockcTockos);

	register (null, {});
}
