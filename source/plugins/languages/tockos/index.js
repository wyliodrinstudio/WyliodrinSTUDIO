import axios from 'axios';
let studio = null;


let tockos = {
	async downloadBoardFile (board, filename) {
		let response = await axios.get ('https://raw.githubusercontent.com/tock/tock/master/boards/'+board+filename);
		return response.data;
	},
	async downloadLibtockcFile (example, filename) {
		let response = await axios.get ('https://raw.githubusercontent.com/tock/libtock-c/master/examples/'+example+filename);
		return response.data;
	},
	async getDirListOfFiles (path, boardInfos) {
		let response = await axios.get ('https://api.github.com/repos/tock/tock/contents/' + path);
	
		for(let item of response.data) {
			if (item.type === 'file') {
				if (boardInfos[path] === undefined) {
					boardInfos[path] = [];
				}
				boardInfos[path].push(item.path);
			}
			else if (item.type === 'dir') {
				await tockos.getDirListOfFiles(item.path, boardInfos);
			}
		}
	},
	async getBoardListOfFiles (boardRoot) {
		let boardInfos = {};
	
		await tockos.getDirListOfFiles(boardRoot, boardInfos);
	
		return boardInfos;
	}
};


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
			let board = await studio.workspace.showDialog (SelectBoard, {name});
			if (board !== null)
			{
				// await studio.workspace.showDialog(Download, {propBoard: board, projectName: name});
			}
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
			if (example !== null)
			{
				await studio.projects.newFile(name,'/main.c', await tockos.downloadLibtockcFile (example, '/main.c'));			
				await studio.projects.newFile(name,'/Makefile.app', (await tockos.downloadLibtockcFile (example, '/Makefile')));		
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

	studio.projects.registerLanguage('tockos-libtockc', 'TockOS C App', 'plugins/languages/tockos/data/img/project.png', 'plugins/languages/python/data/img/pythonLittle.png', libtockcFileIcons, libtockcTockos);

	register (null, {
		tockos: tockos
	});
}
