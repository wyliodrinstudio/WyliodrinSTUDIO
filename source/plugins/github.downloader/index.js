import axios from 'axios';

let studio = null;

let githubdownloader = {
	downloading: false,
	progress: {started: false},
	/**
	 * Show a list for tutorials from a github repository
	 * 
	 * @param {String} repository - username/repository
	 * @returns A list with all the tutorials
	 */
	async getTutorials(repository) {
		let response = await axios.get(`https://api.github.com/repos/${repository}/contents`);
		
		let dirs =[];
		let tutorials = [];
		for (let list of response.data) {
			if (list.type === 'dir') {
				dirs.push(list.path);
			}
		}
		
		for (let dir of dirs) {
			let tutorialData = await axios.get (`https://raw.githubusercontent.com/${repository}/main/${dir}/.project/tutorial.json`);
			let tutorial = tutorialData.data;
			tutorials.push(tutorial);
			tutorial['path'] = dir;
		}	
		
		return tutorials;
	},
	async getDirListOfFiles (repository, path, dirInfos) {
		let response = await axios.get (`https://api.github.com/repos/${repository}/contents/${path}`);
		
		for(let item of response.data) {
			if (item.type === 'file') {
				if (dirInfos[path] === undefined) {
					dirInfos[path] = [];
				}
				dirInfos[path].push(item.path);
			}
			else if (item.type === 'dir') {
				await this.getDirListOfFiles(repository, item.path, dirInfos);
			}
		}	
	},
	async downloadFile (repository, path) {
		let file = await axios.get (`https://raw.githubusercontent.com/${repository}/main/${path}`, {responseType: 'arraybuffer',});
		return file.data;
	},
	async createProject(repository, tutorial, project) {
		this.downloading = true;
		let nameProject = await studio.workspace.showPrompt('TUTORIALS_IMPORT', 'TUTORIALS_IMPORT_PROJECT_NAME', tutorial.title, 'TUTORIALS_IMPORT', {title: tutorial.title});
		if (nameProject !== null) {		
			this.progress.started = true;			
			let createProject = await studio.projects.createEmptyProject(nameProject, tutorial.language);
			if (createProject) {
				let dirInfos = {};
				await this.getDirListOfFiles(repository, tutorial.path, dirInfos);
				let numberOfFiles = 0;
				for (let key in dirInfos) {
					numberOfFiles += dirInfos[key].length;
				}
				let downloadedFiles = 0;
								
				for (let key in dirInfos) {
					let folderPath = key.replace(tutorial.path, '');
					if (folderPath !== '') {
						
						await studio.projects.newFolder(createProject, folderPath);
					}
					for (let file of dirInfos[key]) {
					
						let filePath = file.replace(tutorial.path, '');
						let fileData = await this.downloadFile(repository, file);
						
						await studio.projects.newFile(createProject, filePath, Buffer.from (fileData));
						downloadedFiles++;
						this.progress.value = (downloadedFiles/numberOfFiles)*100;
						this.progress.text = this.progress.value.toFixed(2)+'%';
					}
					
				}	 
				project.project = createProject;
			}
			else
			{
				studio.workspace.showNotification ('TUTORIALS_PROJECT_EXISTS', {name: nameProject});
			}
			this.progress.started = false;
		}

		this.downloading = false;
	}
};

export function setup(options, imports, register)
{
	studio = imports;

	register(null, {
		githubdownloader: githubdownloader
	});
}