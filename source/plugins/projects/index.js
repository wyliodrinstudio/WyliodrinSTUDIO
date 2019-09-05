let studio = null;
let workspacePath ='';
import Application from './views/Application.vue';
import ProjectsLibrary from './views/ProjectsLibrary.vue';
import _ from 'lodash';
import path from 'path';
import JSZip from 'jszip';
import projectStore from './store';



let settings = {
	workspace: {
		path: path.join(require('os').homedir(), 'WyliodrinSTUDIO'),
		projects: []
	}
};
let editors = [];

let projects = {

	store: null,
	languages: [],
	
	/**
	 * Validate a path
	 * @param {string} basePath - project folder
	 * @param {string} filePath - full path
	 * 
	 * @returns {string} - path if path is in project, null otherwise
	 */
	_isPathValid(basePath, filePath) {
		if(basePath !== null && filePath !== null) {
			let normalizedPath = path.normalize(filePath);
			let fullValidPath = path.normalize(path.join (basePath, filePath));
			if(normalizedPath.startsWith(basePath)){
				return normalizedPath;
			} else if (fullValidPath.startsWith(basePath)) {
				return fullValidPath;
			} else {
				return null;
			}	
		} else {
			studio.workspace.warn('PATH_NULL');
			return null;
		}

	},

	/**
	 * Get a language object
	 * @param {string} languageID - the id of said language
	 * 
	 */
	getLanguage(languageID) {
		if(languageID !== null){	
			for (let language of this.languages) {
				if (language.id === languageID) return language;
			}
			return null;
		} else {
			studio.workspace.warn('PROJECTS_NULL');
			return null;
		}
	},

	/**
	 * Register a language object
	 * @param {string} id - language id
	 * @param {string} title - language title
	 * @param {string} icon - language icon
	 * @param {Object} options - language options
	 * 
	 * @example
	 * 
	 * 		registerLanguage('python', 'Python', 'plugins/language.python/data/img/python.png', python);
	 */
	registerLanguage(id, title, icon, options) {
		/**
		 * Options = {
		 * 		mode
		 * 		snippets
		 * 		board
		 * 		callbackfunctions
		 * 		vezi exemplu in index device.wyapp si index device.wyapp.raspberrypi
		 * }
		 */
		if (!options) options = {};
		if(id !== null && title !== null && icon !== null)
		{
			this.languages.push({
				id,
				title,
				icon,
				addons: {},
				options: options
			});
		} else {
			studio.workspace.warn('PROJECTS_NULL');
		}
	},
	/**
	 * Add an addon to an already existing language.
	 * @param {Object} language - language id
	 * @param {Object} board - addon board
	 * @param {Object} type - addon type
	 * @param {Object} options - addon options
	 * 
	 */
	registerLanguageAddon(language, board, type, addon = {}) {
		if (!board) board = '*';
		if (!type) type = '*';
		let lang = this.getLanguage(language);
		if (lang !== null) {
			lang.addons[type + ':' + board] = addon;
			return true;
		} else {
			studio.workspace.warn('PROJECT_ERROR_LANGUAGE_ADDON', {language: language});
			return false;
		}

	},
	/**
	 * Run an undetermined language function.
	 * @param {string} fn - function name
	 * @param {Object} project - project object
	 * @param {array} params - array of params - variable size
	 * 
	 * @returns {unknown} - the result of said function 
	 */
	_runLanguageFunction (fn, project, ...params)
	{
		if(project !== null && fn !== null) {
			let device = studio.workspace.getDevice ();
			let language = this.getLanguage(project.language);
			let type = device.type;
			let board = device.board;
			let addons = language.addons;
			let addon;
			if (type && board) addon = addons[type + ':' + board];
			if (!addon && board) addon = addons['*:' + board];
			if (!addon && type) addon = addons[type + ':*'];

			if (addon && _.isFunction(addon[fn])) {
				return addon[fn](project, ...params);
			} else {
				return language.options[fn](project, ...params);
			}	
		} else {
			studio.workspace.warn('PROJECT_NULL');
			return null;
		}
		
	},

	/**
	 * Register a new editor, use before start
	 * @param {string} name - the name/id of the tab
	 * @param {number} language - the editor language
	 * @param {Vue} component - the component to display
	 * 
	 * @returns {disposable} - an item that may be disposed
	 * 
	 * @example
	 * 
	 * 		registerEditor('EDITOR_ACE',['py','js'], Ace);
	 */
	registerEditor(name, languages, component, options = {}) {
		options = _.merge({
			visible: () => true,
			enabled: () => true
		}, options);
		let sameEditors = editors.find((editor) => editor.name === name);
		if (!sameEditors) {
			studio.workspace.registerComponent(component);
			let item = {
				name,
				languages: languages,
				// events:events,
				component: component.name,
				enabled: options.enabled,
				visible: options.visible
			};
			editors.push(item);
			studio.workspace.dispatchToStore('projects', 'editors', editors);
			return true;
		} else {
			studio.workspace.warn('PROJECT_ERROR_REGISTER_EDITOR', {name: name});
			return false;
		}
	},
	async _changeDate(project){
		let projectFolder = project.folder;
		try {
			let date = await studio.filesystem.lastModified(projectFolder);
			date = new Date(date);
			await studio.filesystem.writeFile(path.join(projectFolder, 'project.json'), JSON.stringify({
				language: project.language,
				date: date
			}, null, 4));
		} catch (e) {
			studio.workspace.showError('PROJECT_ERROR_CHANGE_DATE', {project: projectFolder, error: e.message});
		}
		
	},
	/**
	 * Create a new empty project
	 * @param {string} name - Project name
	 * @param {string} language - Project language
	 * 
	 * @returns {Object} project object
	 * 
	 * @example
	 * 
	 * 		project = createEmptyProject('MyProject', 'py')
	 */
	async createEmptyProject(name, language) {
		// name = name.replace(/\.\./g, '_').replace(/\\|\//g, '_');
		let projectFolder = path.join(workspacePath, name);
		projectFolder = this._isPathValid(workspacePath,projectFolder);
		if(projectFolder !== null && language !== null && name !== null){
			try {
				if (!await studio.filesystem.pathExists(projectFolder)) {
					await studio.filesystem.mkdirp(projectFolder);
					await studio.filesystem.mkdirp(path.join(projectFolder, '.project'));
					let date = await studio.filesystem.lastModified(projectFolder);
					date = new Date(date);
					await studio.filesystem.writeFile(path.join(projectFolder, 'project.json'), JSON.stringify({
						language: language,
						date: date
					}, null, 4));
					
					let project = {
						name: path.basename (projectFolder),
						language: language,
						date: date,
						folder: projectFolder
					};
					// console.log(project);
					await this._runLanguageFunction ('createProject', project);
	
					return project;
				}
	
			} catch (e) {
				studio.workspace.showError('PROJECT_ERROR_CREATE_PROJECT', {project: projectFolder, error: e.message});
			}
		} else {
			studio.workspace.warn('PROJECT_ERROR_CREATE_PROJECT', {project: projectFolder, error: 'NULL'});
			return null;
		}
		
	},
	/**
	 * Delete a project
	 * @param {Object} project - Project object
	 * 
	 * @returns {boolean} true if succsesful, false otherwise
	 * 
	 * @example
	 * 
	 * 		deleteProject('MyProject');
	 */
	async deleteProject(project) {
		if(project !== null) {
			let projectFolder = project.folder;
			// TODO if this is the current project, close it
			try {
				if (await studio.filesystem.pathExists(projectFolder)) {
					await studio.filesystem.remove(projectFolder);
					return true;
				}
			} catch (e) {
				studio.workspace.showError('PROJECT_ERROR_DELETE_PROJECT', {project: projectFolder, error: e.message});
			}
			return false;
		} else { 
			// ERROR studio.workspace.warn('PROJECT_ERROR_DELETE_PROJECT', {project:projectFolder, error:'NULL'});
			studio.workspace.warn('projects.deleteProject: project is null');
			return false;
		}
		
	},

	/**
	 * Rename a project
	 * @param {Object} project - Project object
	 * @param {string} newName - New project name
	 * 
	 * @returns {boolean} true if succsesful, false otherwise
	 * 
	 * @example
	 * 
	 * 		renameProject('MyProject', 'MyRenamedProject');
	 */
	async renameProject(project, newName) {
		// ERROR - project trebuie verificat la null si dat warning in consola (asta un e tradus)
		// newName trebuie verificat sa aiba minim un caracter dupa trim()
		// asta e eroare pentru user
		if(project !== null && newName !== null){
			let projectFolder = project.folder;
			let newProjectFolder = path.join(workspacePath, newName);

			newProjectFolder = this._isPathValid(workspacePath, newProjectFolder);
			// TODO if this is the current project, close it, timeout, rename and open again
			if (newProjectFolder !== null) {
				try {
					if (await studio.filesystem.pathExists(projectFolder)) {
						await studio.filesystem.rename(projectFolder, newProjectFolder);
						await this.loadProjects(false);
						return true;
					}
				} catch (e) {
					studio.workspace.showError('PROJECT_ERROR_RENAME_PROJECT', {project: projectFolder, error: e.message});
				}
			} else {
				studio.workspace.showError('PROJECT_ERROR_PATH_INVALID');
			}
			return false;
		} else {
			// ERROR projectFolder nu exisat aici, project e null - eslint si da eroare aici
			studio.workspace.warn('PROJECT_ERROR_RENAME_PROJECT', {project: projectFolder, error:'NULL'});
			return false;
		}
		
	},
	/**
	 * Clone project
	 * @param {Object} project - Project object
	 * @param {string} newName - Cloned project name
	 * 
	 * @returns {boolean} true if succsesful, false otherwise
	 * 
	 * @example
	 * 		cloneProject('MyNewProject', 'MyClonedProject'); 
	 */
	async cloneProject(project, newName) {
		if (newName == '') {
			newName = 'Clone of ' + project.name;
		}
		// ERROR verificat project separat de newName
		// newName.trim() trebuie sa aiba minim un caracter
		if(project !== null && newName !== null)
		{
			let newProjectFolder = path.join(workspacePath, newName);
			let projectFolder = project.folder;
			newProjectFolder = this._isPathValid(workspacePath, newProjectFolder);
			if (newProjectFolder !== null) {
				try {
					if (await studio.filesystem.pathExists(projectFolder)) {
						await studio.filesystem.copy(projectFolder, newProjectFolder);
						await this.loadProjects(false);
						return true;
					}
				} catch (e) {
					studio.workspace.showError('PROJECT_ERROR_CLONE_PROJECT', {project: projectFolder, error: e.message});
				}
			} else {
				studio.workspace.showError('PROJECT_ERROR_PATH_INVALID');
			}
			return false;
		} else {
			// ERROR project folder nu e definit aici
			studio.workspace.warn('PROJECT_ERROR_CLONE_PROJECT', {project: projectFolder, error: 'NULL'});
			return false;
		}
		
	},
	async importDialog(){
		return await studio.filesystem.openLoadDialog();
	},
	/**
	 * Import a project archive
	 * @param {Object} project - project object
	 * @param {string} extension - archive extension (.zip/.tar/.wylioapp)
	 *
	 * @returns {boolean} true if succsesful, false otherwise
	 * 
	 * @example
	 * 
	 * 		importProject('MyNewProject', '.zip'); 
	 */
	async importProject(file) 
	{
		await console.log(file);
		// console.log(filePath);
		// let pathing = path.join(settings.workspace.path,path.parse(filePath).name);
		
		// let data = await studio.filesystem.readFile(filePath);
		// let zip = new JSZip;
		// if(await studio.filesystem.mkdirp(pathing)){
		// 	zip.loadAsync(data).then(function(contents) {
		// 		console.log(contents);
		// 		Object.keys(contents.files).forEach(function(filename) {
		// 			zip.file(filename).async('nodebuffer').then(async function(content) {
		// 				var dest = path.join(pathing,filename);
		// 				await studio.filesystem.writeFile(dest, content);
		// 			});
		// 		});
		// 	});
		// 	return true;
		// } else {
		// 	return false;
		// }
		
		
	},
	/**
	 * Recursively generate the project tree structure with paths and names
	 * 
	 *	necesarry.item - file item
	 *
	 * 	necessary.item.isdir - is or not directory
	 *
	 * 	necessary.item.children - only if it's a directory
     *
	 * 	necessary.item.name - name
	 *
	 *  necessary.item.content - file content only if it's a file
	 *	 
	 *
	 * @param {Object} necesarry - Object representing the details about every file withing the project
	 *
	 * @returns {boolean} true if succsesful, false otherwise 
	 *
	 */
	async recursiveCreating(necesarry) {
		if(necesarry !== null) {
			if (necesarry.item.isdir) {
				let curentFolder = path.join(necesarry.folder, necesarry.item.name);
				curentFolder = this._isPathValid(necesarry.folder, curentFolder);
				if (curentFolder !== null) {
					await studio.filesystem.mkdirp(curentFolder);
					for (let child of necesarry.item.children) {
						return await this.recursiveCreating({
							item: child,
							prev: necesarry.item,
							folder: curentFolder
						});
					}
				} else {
					studio.workspace.showError('PROJECT_ERROR_PATH_INVALID');
				}
			} else if (!necesarry.item.isdir) {
				let curentFile = path.join(necesarry.folder, necesarry.item.name);
				curentFile = this._isPathValid(necesarry.folder, curentFile);
				if (curentFile !== null) {
					await studio.filesystem.writeFile(curentFile, JSON.stringify(necesarry.item.content));
					return true;
				} else {
					studio.workspace.showError('PROJECT_ERROR_PATH_INVALID');
				}
			}
			return false;
		} else {
			studio.workspace.warn('PROJECT_NULL');
			return false;
		}
		
	},
	/**
	 * Export a project archive
	 * @param {Object} project - project object
	 * @param {string} savePath - path to export to
	 * 
	 * @returns {boolean} true if succsesful, false otherwise
	 * 
	 * @example
	 * 
	 * 		exportProject('MyNewProject', 'C:\Users\User\Desktop');
	 */
	async exportProject(project) {
		let projectPath = project.folder;
		const options = {
			title:path.basename(projectPath),
			defaultPath: settings.workspace.path,
			filters: [
				{name:'zip', extensions: ['zip']}
			]
		};
		let savePath = studio.filesystem.openSaveDialog(options);
		let zip = new JSZip();
		if(await this._buildZipFromDirectory(projectPath, zip, projectPath)) {
			const zipContent = await zip.generateAsync({
				type: 'nodebuffer',
				comment: 'Project Archive',
				compression: 'DEFLATE',
				compressionOptions: {
					level: 9
				}
			});
			console.log(zipContent);
	
			/** create zip file */
			await studio.filesystem.writeFile(savePath, zipContent);
		}
		
	},
	async _buildZipFromDirectory(dir, zip, root) {
		try {
			const list = await studio.filesystem.readdir(dir);
			if(list) {
				for (let file of list) {
					file = path.resolve(dir, file);
					if (await studio.filesystem.isDirectory(file)) {
						await this._buildZipFromDirectory(file, zip, root);
					} else {
						const filedata = await studio.filesystem.readFile(file);
						if(filedata) {
							zip.file(path.relative(root, file), filedata);
						}
						
					}
				}
			}
			return true;
		} catch(e) {
			console.error(e);
		}  
	},
	/**
	 * Recursively generate a deep object with all the contents of a project
	 * 
	 * 
	 *  file - contents of the file/folder
	 * 
	 *  file.file - extension if it's a file
	 * 
	 *  file.children - children if it's a folder
	 * 
	 * 	file.path - path to object 
	 * 
	 *  file.name - name of object 
	 * 
	 * 
	 * @param {Object} project - Project object
	 * @param {Object} file - File object
	 * 
	 * @returns {Object} the root of the folder with all its contents
	 */
	async recursiveGeneration(project, file) {
		if(project !== null && file !== null) {
			let fileInfo;
			let fullPath = path.join(file.dir, file.file);
			// let fullName = this._isPathValid(project.folder, fullPath);
			let fullName = fullPath;
			if (fullName !== null && fullName !== '/.project') {
				let pathTo = '';
				if (await studio.filesystem.isDirectory(fullPath)) {
					let infos = await studio.filesystem.readdir(fullPath);
					let children = [];
					let child1;
					if (infos) {
						for (let child of infos) {
							child1 = await this.recursiveGeneration(project,
								{
									file: child,
									dir: fullPath
								});
							if (child1.file !== 'json') {
								children.push(child1);
							}
						}
					}
					pathTo = fullPath.replace(project.folder, '');
					fileInfo = {
						name: file.file,
						children: children,
						path: pathTo
					};
				} else {
					pathTo = fullPath.replace(project.folder, '');
					fileInfo = {
						name: file.file,
						file: path.extname(fullPath).slice(1),
						path: pathTo
					};
				}
				return fileInfo;
			} else {
				studio.workspace.showError('PROJECT_ERROR_PATH_INVALID');
			}
		} else {
			studio.workspace.warn('PROJECT_NULL');
			return null;
		}
		
	},
	/**
	 * Create a new folder in the project
	 * @param {Object} project - Project object
	 * @param {string} name - path to where to create the folder
	 * 
	 * @example
	 * 
	 * 		newFolder('MyNewProject', 'C:\Users\User\Desktop');
	 */
	async newFolder(project, name) {
		if(project !== null && name !== null){
			let basename = path.basename(name);
			if (basename === '/project.json') {
				studio.workspace.showError('PROJECT_JSON_DO_NOT');
			} else {
				let projectFolder = project.folder;
				let newFolder = path.join(projectFolder, name);

				newFolder = this._isPathValid(projectFolder, newFolder);
				if (newFolder !== null) {
					if (path.basename(newFolder) === '/project.json') {
						studio.workspace.showError('PROJECT_JSON_DO_NOT');
					} else {
						try {
							await studio.filesystem.mkdirp(newFolder);
						} catch (e) {
							studio.workspace.showError('PROJECT_ERROR_NEW_FOLDER', {folder: newFolder, error: e.message});
							return false;
						}
					}
					return true;
				} else {
					studio.workspace.showError('PROJECT_ERROR_PATH_INVALID');
					return false;
				}
			}
		} else {
			studio.workspace.warn('PROJECT_ERROR_NEW_FOLDER', {folder: name, error:'NULL'});
			return false;
		}
	},
	/**
	 * Create a new file in the project
	 * @param {Object} project - project object
	 * @param {string} name - path to where to create the file
	 * @param {string} data - data to be written to file 
	 * 
	 * @example
	 * 
	 * 		newFile(name, '/main.js', 'console.log(\'Hello from JavaScript\');');
	 */
	async newFile(project, name, data = '') {
		if(project !== null && name !== null && data !== null) {
			let basename = path.basename(name);
			if (basename === 'project.json') {	
				studio.workspace.showError('PROJECT_JSON_DO_NOT');
			} else {
				let projectFolder = project.folder;
				let newFilePath = this._isPathValid(projectFolder, name);
				if (newFilePath !== null) {
					if (data === '') {
						try {
							await studio.filesystem.writeFile(newFilePath, '');
							return true;
						} catch (e) {
							studio.workspace.showError('PROJECT_ERROR_NEW_FILE', {file: newFilePath, error: e.message});
							return false;
						}
					} else {
						try {
							await studio.filesystem.writeFile(newFilePath, data);
							return true;
						} catch (e) {
							studio.workspace.showError('PROJECT_ERROR_NEW_FILE', {file: newFilePath, error: e.message});
							return false;
						}
					}
				} else {
					studio.workspace.showError('PROJECT_ERROR_PATH_INVALID');
					return false;
				}
			}
		} else {
			studio.workspace.warn('PROJECT_ERROR_NEW_FILE', {file: name, error: 'NULL'});
			return false;
		}
	},
	/**
	 * Rename a file/folder
	 * @param {Object} project - project object
	 * @param {string} newName - new name
	 * @param {string} pathTo - path to existing file/folder
	 * 
	 * @example
	 * 
	 * 		renameObject('ObjectName', 'ObjectNewName', 'C:\Users\User\Desktop');
	 */
	async renameObject(project, newName, pathTo) {
		if(project !== null && newName !== null && pathTo !== null) {
			if (path.basename(pathTo) === 'project.json' || newName === 'project.json') {
				studio.workspace.showError('PROJECT_JSON_DO_NOT');
			} else {
				let projectFolder = project.folder;
	
				let pathToRename = path.join(projectFolder, pathTo);
	
				let parent = path.dirname(pathToRename);
	
				let newFile = path.join(parent, newName);
	
				pathToRename = this._isPathValid(workspacePath, pathToRename);
				newFile = this._isPathValid(projectFolder, newFile);
				if (pathToRename !== null && newFile !== null) {
					try {
						await studio.filesystem.rename(pathToRename, newFile);
						return true;
					} catch (e) {
						studio.workspace.showError('PROJECT_ERROR_RENAME_OBJECT', {object: pathToRename, error: e.message});
						return false;
					}
				} else {
					studio.workspace.showError('PROJECT_ERROR_PATH_INVALID');
					return false;
				}
			}
		} else {
			studio.workspace.warn('PROJECT_ERROR_RENAME_OBJECT', {object: pathTo, error: 'NULL'});
			return false;
		}
		
	},
	/**
	 * Delete a file
	 * @param {Object} project - project object
	 * @param {string} pathTo - path to the file
	 * 
	 * @example
	 * 
	 * 		deleteFile('MyNewProject', 'C:\Users\User\Desktop\file');
	 */
	async deleteFile(project, pathTo) {
		if(project !== null && pathTo !== null) {
			if (path.basename(pathTo) == 'project.json') {
				studio.workspace.showError('PROJECT_JSON_DO_NOT');
			} else {
				try {
					let projectFolder = project.folder;
					let pathToDelete = path.join(projectFolder, pathTo);
					pathToDelete = this._isPathValid(projectFolder,pathToDelete);
					if (pathToDelete !== null) {
						if(pathTo === studio.workspace.getFromStore('projects','currentFile')) {
							studio.workspace.dispatchToStore('projects','currentFile',null);
						}
						if (await studio.filesystem.pathExists(pathToDelete)) {
							await studio.filesystem.remove(pathToDelete);
							return true;
						}
					} else {
						studio.workspace.showError('PROJECT_ERROR_PATH_INVALID');
						return false;
					}
	
				} catch (e) {
					studio.workspace.showError('PROJECT_ERROR_DELETE_FILE', {file: pathTo, error: e.message});
					return false;
				}
			}
		} else {
			studio.workspace.warn('PROJECT_ERROR_DELETE_FILE', {file:pathTo, error:'NULL'});
			return false;
		}
		
	},
	/**
	 * Delete a folder
	 * @param {Object} project - project object
	 * @param {string} pathTo - path to the folder
	 * 
	 * @example
	 * 
	 * 		deleteFolder('MyNewProject', 'C:\Users\User\Desktop\folder');
	 */
	async deleteFolder(project, pathTo) {
		if(project !== null && pathTo !== null) {
			if (path.basename(pathTo) == 'project.json') {
				studio.workspace.showError('PROJECT_JSON_DO_NOT');
			} else {
				try {
					let projectFolder = project.folder;
					let pathToDelete = path.join(projectFolder, pathTo);
					pathToDelete = this._isPathValid(projectFolder,pathToDelete);
					if (pathToDelete !== null) {
						if (await studio.filesystem.pathExists(pathToDelete)) {
							await studio.filesystem.remove(pathToDelete);
							return true;
						}
					} else {
						studio.workspace.showError('PROJECT_ERROR_PATH_INVALID');
						return false;
					}
	
				} catch (e) {
					studio.workspace.showError('PROJECT_ERROR_DELETE_FOLDER', {object: pathTo, error: e.message});
					return false;
				}
			}
		} else {
			studio.workspace.warn('PROJECT_ERROR_DELETE_FOLDER', {object:pathTo, error:'NULL'});
			return false;
		}
	},
	/**
	 * Load existing projects
	 * @returns {Object} - project object
	 * 
	 * @example
	 * 
	 * 		let projects = loadProjects();
	 */
	async loadProjects() {
		let projectsVariable = [];
		try {
			// make sure path exists
			await studio.filesystem.mkdirp (workspacePath);
			let projectsList = await studio.filesystem.readdir(workspacePath);
			let language = 'unkown';
			for (let projectName of projectsList) {
				let projectFolder = path.join(workspacePath, projectName);
				if (await studio.filesystem.isDirectory(projectFolder)) {
					try {
						let projectData = JSON.parse((await studio.filesystem.readFile(path.join(projectFolder, 'project.json'))).toString());
						language = projectData.language;
						let date = projectData.date.split('.')[0];
						// ERROR - astea vin aici, doar daca projectData exista folder-ul este un proiect
						let project = {
							name: projectName,
							folder: projectFolder,
							date: date,
							language: language
						};
						//TODO return projects
						projectsVariable.push(project);
						// await studio.workspace.storeSettings('projects', projectsVariable);
						settings.workspace.projects.push(project);
					} catch (e) {
						// studio.workspace.showError('PROJECT_ERROR_READ_DATA', {project: projectName, error: e.message});
						studio.workspace.warn ('Folder '+projectFolder+' is not a project');
					}
				}
			}

			return projectsVariable;
		} catch (e) {
			studio.workspace.showError('PROJECT_ERROR_LOAD_PROJECTS', {error: e.message});
			return null;
		}

	},
	/**
	 * Select a project
	 * @param {string} project - project object
	 * @returns {boolean} true if succsesful, false otherwise
	 */
	async selectCurrentProject(project) {
		if(project){
			let projectFolder = project.folder;
			if (projectFolder !== null && await studio.filesystem.pathExists(projectFolder)) {
				try {
					if (await studio.filesystem.isDirectory(projectFolder)) {
						let projectData = JSON.parse((await studio.filesystem.readFile(path.join(projectFolder, 'project.json'))).toString());
						// TODO should we merge all data?
						project.language = projectData.language;
					} else {
						studio.workspace.showError('PROJECT_ERROR_NOT_FOLDER',{project: projectFolder});
						project = null;
					}
				} catch (e) {
					// ERROR id de eroare
					// numele proiectului
					studio.workspace.showError('PROJECT_ERROR_SELECT_PROJECT', {project: project.name, error: e.message});
					project = null;
				}

				//select file
				if (project) {
					studio.workspace.dispatchToStore('projects', 'currentProject', null);
					await studio.settings.storeValue('projects', 'currentFile', null);
					studio.workspace.dispatchToStore('projects', 'currentFile', null);
					await studio.settings.storeValue('projects', 'currentFile', null);

					await new Promise((resolve) => {
						process.nextTick(() => {
							resolve();
						});
					});

					studio.workspace.dispatchToStore('projects', 'currentProject', project);
					studio.workspace.setWorkspaceTitle (project.name);
					// Close file in editor and make sure project is consistent
					await studio.settings.storeValue('projects', 'currentProject', project);
					let language = this.getLanguage(project.language);
					if (language) {
						// let content = await studio.filesystem.readdir(projectFolder);
						// let pathing = '';
						// let editors = studio.workspace.getFromStore('projects', 'editors');
						let mainFile = await this.getDefaultFileName(project);
						if (await studio.filesystem.pathExists(path.join(project.folder, mainFile))) {
							studio.workspace.dispatchToStore('projects', 'currentFile', mainFile);
						}
						else {
							studio.workspace.dispatchToStore('projects', 'currentFile', null);
						}

						await studio.settings.storeValue('projects', 'currentFile', studio.workspace.getFromStore('projects', 'currentFile'));

					}
				}
				// return true if the project is selected or false otherwise
			} else {
				studio.workspace.showError('PROJECT_ERROR_SELECT_PROJECT', {project: project.name, error: 'project folder does not exist'});
				return false;
			}
			if (project) return true;
			else return false;
		} else {
			studio.workspace.warn('PROJECT_ERROR_SELECT_PROJECT', {project: 'NULL', error: 'NULL'});
			return false;
		}		
	},
	/**
	 * Load a previous selected project
	 * no params, loads from local files
	 * 
	 * @example
	 * 
	 * 	let project = loadPreviousSelectedCurrentProject();
	 */
	async loadPreviousSelectedCurrentProject() {
		let project = studio.settings.loadValue('projects', 'currentProject', null);
		let file = studio.settings.loadValue('projects', 'currentFile', null);

		if (project !== {} && project !== null) {
			await this.selectCurrentProject(project);
		}
		if (file !== {} && file !== null) {
			await this.changeFile(file);
		}
	},
	/**
	 * Save an edited file
	 * @param {Object} project - project object
	 * @param {string} name - path to file
	 * @param {string} buffer - file buffer to be saved
	 * @returns {disposable} - an item that may be disposed
	 * 
	 * @example
	 * 
	 * 		saveFile('MyNewProject', 'FileName', [1, 2, 3]);
	 */
	async saveFile(project, name, buffer) {
		// TODO optimize file writes
		if(project !== null && name !== null && buffer !== null) {
			if (name === '/project.json') {
				studio.workspace.warn ('Tring to modify project.json, ingnoring');
			} else {
				if (await studio.filesystem.pathExists(project.folder)) {
					let filePath = this._isPathValid(project.folder, name);
					if (filePath !== null) {
						try {
							await studio.filesystem.mkdirp(path.dirname(filePath));
							await studio.filesystem.writeFile(filePath, buffer);
							return true;
						} catch (e) {
							studio.workspace.error('Save file '+filePath+' failed with '+e.message);
							return false;
						}
					} else {
						studio.workspace.warn('Invalid path for save file '+name+', is not in project');
						return false;
					}
				}
			}
		} else {
			studio.workspace.error(('Error saving file, project is null'));
			return false;
		}
	},

	/**
	 * Load a file
	 * @param {Project} project - project object
	 * @param {string} name - full file name with path
	 * @returns {string} filecontent
	 * 
	 * @example
	 * 
	 * 		let fileContent = loadFile('MyNewProject', 'FileName');
	 */
	async loadFile(project, name) {
		if(project !== null && name !== null) {
			if (project) {
				if (path.basename(name) === '/project.json') {
					studio.workspace.warn('Tring to load project.json, ignoring');
				} else {
					let filePath = this._isPathValid(project.folder, name);
					if (filePath !== null) {
						try {
							return await studio.filesystem.readFile(filePath);
						} catch (e) {
							studio.workspace.error('Load file '+filePath+' failed with '+e.message);
						}
					} else {
						studio.workspace.warn('Invalid path for load file '+name+', is not in project');
					}
				}
			}
		} else {
			studio.workspace.warn('Error loading file, project is null');
			return null;
		}
	},
	/**
	 * Change the current file
	 * @param {string} name - path to file
	 */
	async changeFile(name) {

		if(name !== null) {
			if (studio.workspace.getFromStore('projects', 'currentFile') && path.basename(studio.workspace.getFromStore('projects', 'currentFile')) != 'project.json') {
				if (name !== '') {
					await studio.settings.storeValue('projects', 'currentFile', name);
					await studio.workspace.dispatchToStore('projects', 'currentFile', name);
				}
			} else {
				studio.workspace.warn('Selecting file project.json, ignoring');
				return null;
			}
			return null;
		} else {
			studio.workspace.error('Error selecting current file, file is null');
			return null;
		}
	},
	/**
	 * Save a special settings file
	 * @param {Object} project - project object
	 * @param {string} name - the path to the file
	 * @param {string} content - the content of the file
	 * 
	 * @example
	 * 
	 * 		saveSpecialFile('MyNewProject', 'SpecialFileName', [1, 2, 3]);
	 */
	async saveSpecialFile(project, name, content) {
		if(project !== null && name !== null && content !== null){
			let projectFolder = project.folder;
			let specialFolder = path.join(projectFolder, '.project');
			try {
				await studio.filesystem.mkdirp(specialFolder);
			} catch (e) {
				console.error(e);
			}
			let specialFile = path.join(specialFolder, (name));
			try {
				await studio.filesystem.writeFile(specialFile, content);
			} catch (e) {
				studio.workspace.showError('PROJECT_ERROR_SAVE_SPECIAL_FILE', {file: specialFile, data:content, error: e.message});
				return false;
			}
		} else {
			studio.workspace.warn('PROJECT_ERROR_SAVE_SPECIAL_FILE', {file:name, data:content});
			return false;
		}
	},
	/**
	 * Save a special settings file
	 * @param {Object} project - project object
	 * @param {string} name - the path to the file
	 * 
	 * @returns {disposable} - an item that may be disposed
	 * 	 
	 * @example
	 * 
	 * 		loadSpecialFile('MyNewProject', 'SpecialFileName');
	 */
	async loadSpecialFile(project, name) {
		if(project !== null && name !== null) {
			let projectFolder = project.folder;
			let specialFolder = path.join(projectFolder, '.project');
			try {
				await studio.filesystem.mkdirp(specialFolder);
			} catch (e) {
				console.error(e);
			}
			let specialFile = path.join(specialFolder, name);
			try {
				if (await studio.filesystem.pathExists(specialFile)) {
					let data = await studio.filesystem.readFile(specialFile);
					return data;
				} else
					return null;
			} catch (e) {
				studio.workspace.showError('PROJECT_ERROR_LOAD_SPECIAL_FILE', {file: specialFile, error: e.message});

			}
		} else {
			// ERROR specialFile nu e definit aici
			studio.workspace.showError('PROJECT_ERROR_LOAD_SPECIAL_FILE', {file: specialFile, error: 'NULL'});
			return null;
		}
	},
	/**
	 * Generate the tree structure of a project
	 * @param {Object} project - project object
	 * @param {boolean} isRoot - true
	 * 
	 * @returns {Object} - the tree structure with items of type @recursiveGeneration item
	 * 
	 */
	async generateStructure(project, isRoot=true) {
		if(project !== null) {
			try{
				let projectFolder = project.folder;
				let components = await studio.filesystem.readdir(projectFolder);
				let items = [];
				let files = [];
				for (let item of components) {
					files.push(await this.recursiveGeneration(project,
						{
							file: item,
							dir: projectFolder
						}));
				}
				let root = [{
					name: path.basename(projectFolder),
					children: files,
					path: projectFolder
				}];
				items = root;
				if (isRoot) return items[0];
				else return items;
			} catch(e){
				console.error(e.message);
			}
		} else {
			studio.workspace.warn('PROJECT_NULL');
			return null;
		}
	},
	/**
	 * Get the current project structure
	 * @returns {object} project object
	 */
	getCurrentProject() {
		let project = studio.workspace.getFromStore('projects', 'currentProject');
		return project;
	},
	async loadProjectStructure(project){
		if(project !== null) {
			let retproject = project;
			retproject.structure = await this.generateStructure(project);
			return retproject;
		} else {
			studio.workspace.warn('PROJECT_NULL');
			return null;
		}
	},
	/**
	 * Get the default file name of a language
	 * @param {Object} project - project object
	 * 
	 */
	getDefaultFileName(project) {
		if(project !== null) {
			return this._runLanguageFunction('getDefaultFileName', project);
		} else {
			return null;
		}
	},

	/**
	 * Get the default run file name of a language
	 * @param {Object} project - project object
	 * 
	 */
	getDefaultRunFileName(project) {
		if(project !== null) {
			return this._runLanguageFunction('getDefaultRunFileName', project);
		} else {
			return null;
		}
	},

	/**
	 * Get the makefile for file name of a language
	 * @param {Object} project - project object
	 */
	getMakefile(project, filename) {
		if(project !== null) {
			return this._runLanguageFunction('getMakefile', project, filename);
		} else {
			return null;
		}
	},

	/**
	 * Get the default run file name of a language
	 * @param {Object} project - project object
	 * @param {string} option - option
	 * 
	 * @example
	 * 
	 * 		let sourceLanguage = languageSpecificOption ('MyNewProject', 'sourceLanguage');
	 */
	languageSpecificOption (project, option) {
		return this._runLanguageFunction(option, project);
	},

	/**
	 * Get the file code
	 * @param {string} path - the path to the file
	 * 
	 * @returns {Object} - the current file code
	 */
	async getFileCode(project, pathTo) {
		if(project !== null && pathTo !== null) {
			let projectFolder = project.folder;
			let filePath = path.join(projectFolder, pathTo);

			let actualPath = this._isPathValid(projectFolder, filePath);
			if (actualPath !== null) {
				try {
					if (await studio.filesystem.pathExists(actualPath)) {
						let data = await studio.filesystem.readFile(actualPath);
						if (data)
							return data;
					}
				} catch (e) {
					studio.workspace.showError('PROJECT_ERROR_SEND_CODE', {file: actualPath, error: e.message});
				}
			} else {
				studio.workspace.showError('PROJECT_ERROR_PATH_INVALID');
			}
		} else {
			studio.workspace.warn('PROJECCT_ERROR_SEND_CODE', {file:pathTo, error:'NULL'});
			return null;
		}
	},
	/**
	 * Get the current file code
	 * 
	 * @returns {Object} - the current project with it's tree structure
	 */
	
	async getCurrentFileCode() {
		let project = studio.workspace.getFromStore('projects', 'currentProject');
		let currentFile = studio.workspace.getFromStore('projects', 'currentFile');
	
		let actualPath = this._isPathValid(project.folder, currentFile);
		if (actualPath !== null) {
			try {
				return await studio.filesystem.readFile(actualPath);
			} catch (e) {
				studio.workspace.showError('PROJECT_ERROR_SEND_CODE', {file: actualPath, error: e.message});
			}
		} else {
			studio.workspace.showError('PROJECT_ERROR_PATH_INVALID');
		}
	},
	//getDefaultFileName(Project)
	//Daca nu e placa -> language normal al proiectului -> iau main de acolo
	//Vezi daca ai placa -> verific daca am si type si board -> daca da, il iau pe asta
	//Vezi daca e numai pentru board -> iau pt asta
	// Vezi daca e type
	//readFile(p,f)
	//getCurrentProject()
};
export default async function setup(options, imports, register) {
	studio = imports;
	workspacePath =  studio.settings.loadValue('projects', 'path', path.join (await imports.filesystem.getUserFolder(), 'WyliodrinSTUDIO'));
	studio.workspace.registerStore('projects', projectStore);

	studio.workspace.registerTab('PROJECT_APPLICATION', 100, Application);

	studio.workspace.registerToolbarButton('PROJECT_LIBRARY', 10, () => studio.workspace.showDialog(ProjectsLibrary, {
		width: 1000
	}), 'plugins/projects/data/img/icons/projects-icon.svg');
	register(null, {
		projects: projects
	});
}