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
	async getDirListOfFiles (path, dirInfos, repo = 'tock') {
		let response = await axios.get ('https://api.github.com/repos/tock/'+repo+'/contents/'+path);
	
		for(let item of response.data) {
			if (item.type === 'file') {
				if (dirInfos[path] === undefined) {
					dirInfos[path] = [];
				}
				dirInfos[path].push(item.path);
			}
			else if (item.type === 'dir') {
				await tockos.getDirListOfFiles(item.path, dirInfos, repo);
			}
		}
	},
	async getBoardListOfFiles (boardRoot) {
		let boardInfos = {};
	
		await this.getDirListOfFiles(boardRoot, boardInfos);
	
		return boardInfos;
	},
	async getLibtockListOfFiles (exampleRoot) {
		let exampleInfos = {};
		
		await this.getDirListOfFiles(exampleRoot, exampleInfos, 'libtock-c');

		return exampleInfos;
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
			/* studio.workspace.showDialog will return in this case:
				--> true if the submit button was clicked
				--> false if the cancel button was clicked
			*/
			await studio.workspace.showDialog (SelectBoard, {name});
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
			/* studio.workspace.showDialog will return in this case:
				--> true if the submit button was clicked
				--> false if the cancel button was clicked
			*/
			await studio.workspace.showDialog (SelectExample, {name});
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
