let studio = null;
let workspacePath ='';
import Application from './views/Application.vue';
import ProjectsLibrary from './views/ProjectsLibrary.vue';
import _ from 'lodash';
import path from 'path';
import JSZip from 'jszip';
import projectStore from './store';

let packages = {};



/**
 * Project Identification
 * @typedef {Object} Project
 * @property {string} date - date and time of the last time the project was accsesed
 * @property {string} folder - absolute path to the project
 * @property {string} language - programming language of the project
 * @property {string} name - the actual name of the project
 */

/**
 * Programming Language Identification
 * @typedef {Object} Language
 * @property {object} addons - the specific features of the language // language addons
 * @property {string} icon - path to the language image
 * @property {string} id - language name
 * @property {array} fileIcons - array of language specific fileIcons
 * @property  {Object} options - language functions 
 */

/**
 * File Identification
 * @typedef {Object} file - contents of the file/folder
 * @property {string} file - extension if it's a file
 * @property {file[]} children - children if it's a folder
 * @property {string} path - path to object 
 * @property {string} name - name of object 
 */


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
	 * This function returns a programming language object with the following properties: id, title, icons, addons and options.
	 * 
	 * It requires the unique id that identifies the language in the list of all programming languages.
	 * 
	 * @param {string} languageID - the id of said language
	 * 
	 * @returns {Language} - programming language properties
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
	 * This function registers a language object by updating the list of all languages with a new programming language having its 
	 * own specifications and functions. 
	 * 
	 * Every new language has an *id*, its unique identifier, a *title*, which is the actual 
	 * name of the programming language, a characteristic *icon*, and its own *options* required 
	 * in order to be working properly.
	 * 
	 * 
	 * The accepted languages are: *javascript*, *python*, *bash* and *visual*. 
	 * 
	 * @param {string} id - language id
	 * @param {string} title - language title
	 * @param {string} projectIcon - icon that appears in the projects library
	 * @param {string} fileTreeIcon - icon that appears at the top of the file tree
	 * @param {string} fileIcons - icons for files
	 * @param {Object} options - language options
	 * 
	 * 
	 * @example
	 * 
	 * registerLanguage('python', 'Python', 'plugins/languages/python/data/img/project_python.png', 'plugins/languages/python/data/img/python.png', python);
	 */
	registerLanguage(id, title, projectIcon, fileTreeIcon, fileIcons, options) {
		if(!fileIcons) fileIcons = [];
		if (!options) options = {};
		if(id !== null && title !== null && fileTreeIcon !== null)
		{
			this.languages.push({
				id,
				title,
				projectIcon,
				icon: fileTreeIcon,
				addons: {},
				options: options,
				fileIcons:fileIcons
			});
		} else {
			studio.workspace.warn('PROJECTS_NULL');
		}
	},
	/**
	 * This function is used to add an addon to an already existing language. In this case, an addon refers to a 
	 * specific feature that can be set for a board.
	 * 
	 * Each addon requires the programming *language* unique id, the type of the *board* for which the feature 
	 * will be set, the *type* of the actual addon, and the additional functioning options of the feature.
	 * 
	 * @param {Object} language - language id
	 * @param {string|string[]} types - addon type
	 * @param {string|string[]} boards - addon board
	 * @param {Object} options - addon options
	 * 
	 * @returns {boolean} - true if successful, false otherwise
	 * 
	 */
	registerLanguageAddon(language, types, boards, addon = {}) {
		if (!boards) boards = '*';
		if (!types) types = '*';
		if (!_.isArray (types)) types = [types];
		if (!_.isArray (boards)) boards = [boards];
		let lang = this.getLanguage(language);
		if (lang !== null) {
			for (let type of types)
			{
				for (let board of boards)
				{
					lang.addons[type + ':' + board] = addon;
				}
			}
			return true;
		} else {
			studio.workspace.warn('PROJECT_ERROR_LANGUAGE_ADDON', {language: language});
			return false;
		}

	},
	/**
	 * Run an undetermined language function.
	 * @param {string} fn - function name
	 * @param {Project} project - project object
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
	 * This function registers a new type of editor.
	 * 
	 * The editor has a *name*, which is a translatable string that will be dispayed as the 
	 * title of the editor, *languages*, which represent the array with all the supported programming languages id's 
	 * or file extensions, and a Vue *component*, representing the actual content and design of the editor tab. 
	 * 
	 * @param {string} name - the name/id of the editor
	 * @param {string[]} languages - the editor languages
	 * @param {Vue} component - the component to display
	 * @param {array} options - the editor options
	 * 
	 * @returns {boolean} - true if successful, false otherwise
	 * 
	 * @example
	 * 
	 * registerEditor('EDITOR_ACE',['py','js'], Ace);
	 */
	registerEditor(name, languages, component, options = {}) {
		options = _.merge({
			visible: () => true,
			enabled: () => true
		}, options);
		languages = languages.map ((lang) => {
			let l = lang;
			if (!(lang instanceof RegExp))
			{
				l = new RegExp ('\\.'+lang.toString()+'$');
			}
			return l;
		});
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

	/**
	 * Change the date of access of a project
	 * 
	 * @param {Project} project 
	 */
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
	 * This function creates a new empty project.
	 * 
	 * Each project requires a name, that will be entered by the user as a text in 
	 * the input area, and a programming *language* that the project will use, 
	 * also chosen by the user.
	 *
	 * @param {string} name - Project name
	 * @param {string} language - Project language
	 * 
	 * @returns {Project} - Project object
	 * 
	 * @example
	 * 
	 * project = createEmptyProject('MyProject', 'py')
	 */
	async createEmptyProject(name, language) {
		let projectFolder = path.join(workspacePath, name);
		projectFolder = this._isPathValid(workspacePath,projectFolder);
		if(projectFolder !== null && language !== null && name !== null){
			let projectCreate = false;
			try {
				if (!await studio.filesystem.pathExists(projectFolder)) {
					await studio.filesystem.mkdirp(projectFolder);
					projectCreate = true;
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
					let retVal = await this._runLanguageFunction ('createProject', project);
	
					if (retVal === false) {
						await this.deleteProject(project);
						project = null;
					}
					
					return project;
				}
	
			} catch (e) {
				studio.workspace.showError('PROJECT_ERROR_CREATE_PROJECT', {project: projectFolder, error: e.message});
				if (projectCreate) await studio.filesystem.remove ({folder: projectFolder});
			}
		} else {
			studio.workspace.warn('PROJECT_ERROR_CREATE_PROJECT', {project: projectFolder, error: 'NULL'});
			return null;
		}
		
	},
	/**
	 * This function deletes all the files related to the project chosen by the user, when he clicks on the "Delete" button. 
	 * 
	 * After removing all the files, the *currentProject* and *currentFile* are dispatched to the projects store as *null*.
	 * 
	 * @param {Project} project - Project object
	 * 
	 * @returns {boolean} true if succsesful, false otherwise
	 * 
	 * @example
	 * 
	 * deleteProject('MyProject');
	 * 
	 */
	async deleteProject(project) {
		if(project !== null) {
			let projectFolder = project.folder;
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
	 * This function renames a selected project, when the user clicks on the *Rename* button.
	 * 
	 * It's required to know the *project* that will be renamed and the *new name*, that will 
	 * be entered by the user in the input text area.
	 * 
	 * @param {Project} project - Project object
	 * @param {string} newName - New project name
	 * 
	 * @returns {boolean} true if succsesful, false otherwise
	 * 
	 * @example
	 * 
	 * renameProject('MyProject', 'MyRenamedProject');
	 */
	async renameProject(project, newName) {
		// ERROR - project trebuie verificat la null si dat warning in consola (asta un e tradus)
		// newName trebuie verificat sa aiba minim un caracter dupa trim()
		// asta e eroare pentru user
		if(project !== null) {
			if(newName !== null) {
				if(newName.trim().length >= 1) {
					let projectFolder = project.folder;
					let newProjectFolder = path.join(workspacePath, newName);
					newProjectFolder = this._isPathValid(workspacePath, newProjectFolder);
					// TODO if this is the current project, close it, timeout, rename and open again
					if (newProjectFolder !== null && path.basename(newProjectFolder) !== '') {
						try {
							if (await studio.filesystem.pathExists(projectFolder)) {
								await studio.filesystem.rename(projectFolder, newProjectFolder);
								await this.loadProjects(false);
								
							}
						} catch (e) {
							studio.workspace.showError('PROJECT_ERROR_RENAME_PROJECT', {project: projectFolder, error: e.message});
							return false;
						}
						if(project.name === await studio.workspace.getFromStore('projects', 'currentProject').name){
							let newProject = project;
							newProject.folder = newProjectFolder;
							newProject.name = newName;
							await this.selectCurrentProject(newProject,true);
						}
						return true;
						
					} else {
						studio.workspace.showError('PROJECT_ERROR_PATH_INVALID');
					}
					return false;
				}
			}
			
		} else {
			// ERROR projectFolder nu exisat aici, project e null - eslint si da eroare aici
			studio.workspace.warn('PROJECT_ERROR_RENAME_PROJECT', {project: project.projectFolder, error:'NULL'});
			return false;
		}
		
	},
	/**
	 * This function is used to clone a project, by creating a duplicate of the selected project and 
	 * assigning to it the **“newName”** value, chosen by the user. 
	 * 
	 * @param {Project} project - Project object
	 * @param {string} newName - Cloned project name
	 * 
	 * @returns {boolean} true if succsesful, false otherwise
	 * 
	 * @example
	 * 
	 * cloneProject(project, 'MyClonedProject'); 
	 * 
	 */
	async cloneProject(project, newName) {
		if (newName == '') {
			newName = 'Clone of ' + project.name;
		}
		// ERROR verificat project separat de newName
		// newName.trim() trebuie sa aiba minim un caracter
		if(project !== null) {
			if(newName !== null) {
				if(newName.trim().length >= 1) {
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
				}
			}
			
		} else {			
			studio.workspace.warn('PROJECT_ERROR_CLONE_PROJECT', {project: project.projectFolder, error: 'NULL'});
			return false;
		}
		
	},
	/**
	 * This function imports a project archive.
	 * 
	 * Loads a new project tree from the user’s computer. The archive extension can be *“.zip”*, *“.tar”* 
	 * (in this case the files will be extracted), or *‘.wylioapp”* (we are creating recursively the project folder).
	 * 
	 * @param {Project} project - project object
	 * @param {string} extension - archive extension (.zip/.tar/.wylioapp)
	 *
	 * @returns {boolean} true if succsesful, false otherwise
	 * 
	 * @example
	 * 
	 * importProject(project, '.zip');
	 *  
	 */
	async importProject(fileName, data, type) 
	{
		if(type === 'wylioapp'){
			
			let projectImport = JSON.parse(data.toString());
			let projectFolder = path.join(workspacePath, projectImport.title);
			projectFolder = this._isPathValid(workspacePath,projectFolder);
			let json = path.join(projectFolder, 'project.json');
			for (let item of projectImport.tree) {
				await this.recursiveCreating({
					item: item,
					prev: item,
					folder: workspacePath
				});
				await studio.filesystem.writeFile(json, JSON.stringify({
					language: projectImport.language,
					notebook: projectImport.notebook
				}, null, 4));
				await this.loadProjects(false);
			}
		} else {
			let name = path.basename(fileName);
			let pathing = path.join(workspacePath,name.split('.').slice(0, -1).join('.'));
			pathing = this._isPathValid(workspacePath,pathing);
			let zip = new JSZip;
			await studio.filesystem.mkdirp(pathing);
			try{
				if(await studio.filesystem.isDirectory(pathing)){
					zip.loadAsync(data).then(function(contents) {
						Object.keys(contents.files).forEach(async function(key) {
							if (contents.files[key].dir){
								var dest = path.join(pathing,key);
								await studio.filesystem.mkdirp(dest);
							} else {
								zip.file(key).async('nodebuffer').then(async function(content) {
									var dest = path.join(pathing,key);
									await studio.filesystem.writeFile(dest, content);
								});
							}
						});
					});
					return true;
				} else {
					return false;
				}
			} catch(e) {

				// TODO show notification				studio.workspace.error(e);
				return false;
			}
			
		}
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
	 * This function exports a project archive.
	 * 
	 * It's required to know the project that the user will export, including all of its files and folders, 
	 * and the path to where the project will be saved in the user's computer. The archive will have
	 * the *.zip* extension.
	 * 
	 * @param {Project} project - project object
	 * 
	 * 
	 * @example
	 * 
	 * exportProject(project);
	 * 
	 */
	async exportProject(project) {
		let projectPath = project.folder;

		
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
			let savePath = await studio.filesystem.openExportDialog(zipContent, {
				filename: project.name +'.zip',
				filetypes:['zip','tar'],
				type:'application/zip'
			});
			if(savePath !== null){
				await studio.filesystem.writeFile(savePath, zipContent);
			}
			
		}
		
	},
	/**
	 * Create a zip archive starting with a directory found in the fileSystem
	 * @param {string} dir
	 * @param {object} zip
	 * @param {string} root
	 */
	async _buildZipFromDirectory(dir, zip, root) {
		try {
			const list = await studio.filesystem.readdir(dir);
			if(list) {
				for (let file of list) {
					file = path.resolve(dir, file);
					if (await studio.filesystem.isDirectory(file)) {
						let x = path.relative(root, file);
						if(path.sep == '\\'){
							x = x.replace(/\\/g, '/');
						}
						zip.folder(x);
						await this._buildZipFromDirectory(file, zip, root);
					} else {
						const filedata = await studio.filesystem.readFile(file);
						if(filedata) {
							let x = path.relative(root, file);
							if(path.sep == '\\'){
								x = x.replace(/\\/g, '/');
							}
							zip.file(x, filedata);
						}
						
					}
				}
			}
			return true;
		} catch(e) {

			// TODO show notification			studio.workspace.error(e);
		}  
	},
	/**
	 * Sort a file type object by comparing every element if it's a folder or a file.
	 * The resulting tree consists of all the folder and files aranged in alphabetical order, with the files preceding the folders.
	 * 
	 * @param {file} tree
	 */
	sort(tree){
		let strCompare = (a, b) => {
			if (a<b) return -1;
			else if (a>b) return 1;
			else return 0;
		};
		tree.sort((a, b) => {
			if ((a.children !== undefined && b.children !== undefined) || (a.children === undefined && b.children === undefined))
			{
				return strCompare (a.name, b.name);
			}
			else
			if (a.children !== undefined) return -10;
			else if (b.children !== undefined) return 10;
			return 0;
		});
	},
	/**
	 * Recursively generate a deep object with all the contents of a project
	 * 
	 * @param {Project} project - Project object
	 * @param {file} file - File object
	 * 
	 * @returns {file} the root of the folder with all its contents
	 * 
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
							if (child1.name !== 'project.json') {
								children.push(child1);
							}
						}
					}
					pathTo = fullPath.replace(project.folder, '');
					this.sort(children);
					fileInfo = {
						name: file.file,
						children: children,
						path: pathTo,
						key:pathTo
					};
				} else {
					pathTo = fullPath.replace(project.folder, '');
					fileInfo = {
						name: file.file,
						file: path.extname(fullPath).slice(1),
						path: pathTo,
						key:pathTo
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
	 * This function creates a new folder inside a project. For this, it is required that we know 
	 * the *project* for which the new folder is generated and the *name* that the folder 
	 * will have. The name is actually represented by the absolute path to where the 
	 * folder will be created.
	 * 
	 * This option is valid only in the *Advanced Mode*.
	 * 
	 * @param {Project} project - Project object
	 * @param {string} name - path to where to create the folder
	 * 
	 * @returns {boolean} true if succsesful, false otherwise
	 *
	 * @example
	 * 
	 * newFolder(project, '/folder/folder2');
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
	 * This function creates a new file inside a project. For this, it is required that we know 
	 * the *project* for which the new file is generated, the *name* that the file 
	 * will have (actually represented by the absolute path to where the 
	 * file will be created), and, if necessary, the information that will be written in the file.
	 * 
	 * This option is valid only in the *Advanced Mode*.
	 * 
	 * @param {Project} project - project object
	 * @param {string} name - path to where to create the file
	 * @param {string} data - data to be written to file 
	 * 
	 * @returns {boolean} true if succsesful, false otherwise
	 * 
	 * @example
	 * 
	 * newFile(project, '/main.js', 'console.log(\'Hello from JavaScript\');');
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
							await studio.filesystem.mkdirp (path.dirname (newFilePath));
							await studio.filesystem.writeFile(newFilePath, '');
							return true;
						} catch (e) {
							studio.workspace.showError('PROJECT_ERROR_NEW_FILE', {file: newFilePath, error: e.message});
							return false;
						}
					} else {
						try {
							await studio.filesystem.mkdirp (path.dirname (newFilePath));
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
	async exportFile(project, filePath) {
		try {
			filePath = path.join(project.folder,filePath);
			let content = await studio.filesystem.readFile(filePath);
			let savePath = await studio.filesystem.openExportDialog(content, {
				filename: path.basename(filePath),
				filetypes:[path.extname(filePath)],
				type:'application'
			});
			if(savePath !== null){
				await studio.filesystem.writeFile(savePath, content);
			}
		} catch (e) {
			// TODO show notification
			studio.workspace.error(e);
		}
		
	},
	/**
	 * Download a file from the file tree inside the raspberry pi
	 * @param {string} name 
	 * @param {string} data 
	 */
	async downloadFile(name,data) {
		try {
			let savePath = await studio.filesystem.openExportDialog(data, {
				filename:name,
				filetypes:[path.extname(name)],
				type:'application'
			});
			if(savePath !== null) {
				await studio.filesystem.writeFile(savePath,data);
			}
		} catch (e) {
			// TODO show notification
			studio.workspace.error(e);
		}
	},
	/**
	 * This function is used to rename a file or a folder included in the currently open project.
	 * 
	 * It's required to know the *project* for which the change is made, the new *name* that will 
	 * correspond to the selected object and the path to the file/folder to be renamed. 
	 * 
	 * Available only for the *Advanced Mode*, this function is called when the user choses the *Rename* option in the menu that shows
	 * up by right clicking on a folder/file.
	 * 
	 * @param {Project} project - project object
	 * @param {string} newName - new name
	 * @param {string} pathTo - path to existing file/folder
	 * 
	 * @returns {boolean} true if succsesful, false otherwise
	 * 
	 * @example
	 * 
	 * renameObject(project, 'ObjectNewName', 'C:\Users\User\Desktop');
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
						if(await this.changeFile(project,newFile.replace(projectFolder, '')))
							return true;
					} catch (e) {
						studio.workspace.showError('PROJECT_ERROR_RENAME_OBJECT', {object: pathToRename, error: e.message});
						if(await this.changeFile(project,pathTo))
							return false;
					}
				} else {
					studio.workspace.showError('PROJECT_ERROR_PATH_INVALID');
					if(await this.changeFile(project,pathTo))
						return false;
				}
			}
		} else {
			studio.workspace.warn('PROJECT_ERROR_RENAME_OBJECT', {object: pathTo, error: 'NULL'});
			return false;
		}
		
	},
	/**
	 * This function is used to delete a file from a project, and it needs the *project* containing the selected 
	 * file and the *path* to that file.
	 * 
	 * @param {Project} project - project object
	 * @param {string} pathTo - path to the file
	 * 
	 * @returns {boolean} true if succsesful, false otherwise
	 * 
	 * @example
	 * 
	 * deleteFile(project, '.folder/file');
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
						let resp = null;
						if(resp !== false){
							if (await studio.filesystem.pathExists(pathToDelete)) {
								await studio.filesystem.remove(pathToDelete);
								if(pathTo === studio.workspace.getFromStore('projects','currentFile')) {
									resp = await this.changeFile(project,null);
								}
								return true;
							}
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
	 * This function is used to delete a folder from a project, and it needs the *project* containing the selected 
	 * folder and the *path* to that folder.
	 * 
	 * @param {Project} project - project object
	 * @param {string} pathTo - path to the folder
	 * 
	 * @returns {boolean} true if succsesful, false otherwise
	 * 
	 * @example
	 * 
	 * deleteFolder(project, 'C:\Users\User\Desktop\folder');
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
					let currentFile = studio.workspace.getFromStore('projects','currentFile');
					let currentPath = this._isPathValid(project.folder,currentFile);
					if (pathToDelete !== null) {
						if (await studio.filesystem.pathExists(pathToDelete)) {
							await studio.filesystem.remove(pathToDelete);
							if(currentPath.startsWith(pathToDelete)){
								await this.changeFile(project,null);
							}
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
	 * Load existing projects.
	 * 
	 * This function has no parameters. It creates a list with all the existing projects when it's called, by reading all the
	 * folders from the main path, *workspacePath*.
	 * 
	 * 
	 * @returns {Project[]} - a list of projects
	 * 
	 * @example
	 * 
	 * let projects = loadProjects();
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
	 * This function selects a project from the list with all the projects, when the users clicks on it, 
	 * and it displays the content of the *project* in the Application tab.
	 * 
	 * @param {Project} project - project object
	 * 
	 * @returns {boolean} true if succsesful, false otherwise
	 */
	async selectCurrentProject(project,firstLoad) {
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
					
					await this.changeFile(project,null);

					await new Promise((resolve) => {
						process.nextTick(() => {
							resolve();
						});
					});

					await studio.workspace.dispatchToStore('projects', 'currentProject', project);
					// studio.workspace.setWorkspaceTitle (project.name);
					// Close file in editor and make sure project is consistent
					await studio.settings.storeValue('projects', 'currentProject', project);
					let language = this.getLanguage(project.language);
					if (language && firstLoad) {
						let mainFile = await this.getDefaultFileName(project);
						let file = path.join(project.folder, mainFile);
						if (await studio.filesystem.pathExists(file)) {
							await this.changeFile(project,mainFile);
						} else {
							await this.changeFile(project,null);
						}
					}
					await new Promise((resolve) => {
						process.nextTick(() => {
							resolve();
						});
					});
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
	 * Load a previous selected project. 
	 * The function has no params, loads the project from local files.
	 * 
	 * @example
	 * 
	 * let project = loadPreviousSelectedCurrentProject();
	 */
	async loadPreviousSelectedCurrentProject() {
		let project = studio.settings.loadValue('projects', 'currentProject', null);
		let file = studio.settings.loadValue('projects', 'currentFile', null);

		if (project !== {} && project !== null) { 
			if(await this.selectCurrentProject(project, false)) {
				if (file !== {} && file !== null) {
					await this.changeFile(project,file);
				}
			}
			
		}
		
	},
	/**
	 * The purpose of this function is to save a file. It requires the *project* in which the file resides, 
	 * the *name* of the file, actually represented as the path to the file, and a *buffer* containing the data that 
	 * will be saved in the created file.
	 * 
	 * @param {Project} project - project object
	 * @param {string} name - path to file
	 * @param {string} buffer - file buffer to be saved
	 * 
	 * @returns {boolean} - true if successful, false otherwise
	 * 
	 * @example
	 * 
	 * 		saveFile(project, 'FileName', [1, 2, 3]);
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
	 * This function loads the content of a file that was previously saved. In order to 
	 * open the file, it's needed to know the *project* that the file belongs to, and the
	 * full *name* of the file, meaning its path.
	 * 
	 * @param {Project} project - project object
	 * @param {string} name - full file name with path
	 * 
	 * @returns {Object} - file content
	 * 
	 * @example
	 * 
	 * let fileContent = loadFile(project, 'FileName');
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
	 * Changes the current file to another one.
	 * 
	 * @param {Project} project - project object
	 * @param {string} name - path to file
	 * 
	 */
	async changeFile(project, name) {
		let aux = await this._isPathValid(project.folder,name);

		if(name !== null && await studio.filesystem.pathExists(aux)) {
			if (path.basename(name) != 'project.json') {
				// await studio.workspace.setWorkspaceTitle(path.basename(name));
				if (name !== '') {
					await studio.settings.storeValue('projects', 'currentFile', name);
					await studio.workspace.dispatchToStore('projects', 'currentFile', name);
					return true;
				}
			} else {
				studio.workspace.warn('Selecting file project.json, ignoring');
				return true;
			}
			return true;
		} else if (project !== null) {
			// await studio.workspace.setWorkspaceTitle(project.name);
			studio.workspace.warn('Error selecting current file, file is null, dispatching null');
			await studio.settings.storeValue('projects', 'currentFile', null);
			await studio.workspace.dispatchToStore('projects', 'currentFile', null);
			return true;
		}
	},
	/**
	 * The purpose of this function is to save a special settings file and it requires the *project* corresponding to the file, 
	 * the *name* of the file, actually represented as the path to the file, and the *content* that will be saved in the special 
	 * settings file.
	 * 
	 * @param {Project} project - project object
	 * @param {string} name - the path to the file
	 * @param {Buffer} content - the content of the file
	 * 
	 * @returns {boolean} - true if successful, false otherwise
	 * 
	 * @example
	 * 
	 * saveSpecialFile(project, 'SpecialFileName', [1, 2, 3]);
	 */
	async saveSpecialFile(project, name, content) {
		if(project !== null && name !== null && content !== null){
			let projectFolder = project.folder;
			let specialFolder = path.join(projectFolder, '.project');
			try {
				await studio.filesystem.mkdirp(specialFolder);
			} catch (e) {
				// TODO show notification
				studio.workspace.error(e);
			}
			let specialFile = path.join(specialFolder, (name));
			try {
				await studio.filesystem.writeFile(specialFile, content);
				return specialFile;
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
	 * The purpose of this function is to delete a special settings file and it requires the *project* corresponding to the file, 
	 * the *name* of the file, actually represented as the path to the file, and the *content* that will be saved in the special 
	 * settings file.
	 * 
	 * @param {Project} project - project object
	 * @param {string} name - the path to the file
	 * 
	 * @returns {boolean} - true if successful, false otherwise
	 * 
	 * @example
	 * 
	 * loadSpecialFile(project, 'SpecialFileName');
	 */
	async deleteSpecialFile(project, name) {
		if(project !== null && name !== null){
			let projectFolder = project.folder;
			let specialFolder = path.join(projectFolder, '.project');
			try {
				await studio.filesystem.mkdirp(specialFolder);
			} catch (e) {
				// TODO show notification
				studio.workspace.error(e);
			}
			let specialFile = path.join(specialFolder, (name));
			try {
				await studio.filesystem.remove(specialFile);
				return specialFile;
			} catch (e) {
				studio.workspace.showError('PROJECT_ERROR_DELETE_SPECIAL_FILE', {file: specialFile, error: e.message});
				return false;
			}
		} else {
			studio.workspace.warn('PROJECT_ERROR_DELETE_SPECIAL_FILE', {file:name});
			return false;
		}
	},
	/**
	 * This function loads the content of a special settings file that was previously saved. In order to 
	 * open the file, it's needed to know the *project* that the file belongs to, and the
	 * full *name* of the file, meaning its path.
	 * 
	 * @param {Project} project - project object
	 * @param {string} name - the path to the file
	 * 
	 * @returns {Buffer} - the content of the special settings file, null otherwise
	 * 	 
	 * @example
	 * 
	 * loadSpecialFile('MyNewProject', 'SpecialFileName');
	 */
	async loadSpecialFile(project, name) {
		if(project !== null && name !== null) {
			let projectFolder = project.folder;
			let specialFolder = path.join(projectFolder, '.project');
			try {
				await studio.filesystem.mkdirp(specialFolder);
			} catch (e) {
				// TODO show notification
				studio.workspace.error(e);
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
			studio.workspace.showError('PROJECT_ERROR_LOAD_SPECIAL_FILE', {file: 'NULL', error: 'NULL'});
			return null;
		}
	},
	/**
	 * This function generates the tree structure of a project.
	 * 
	 * @param {Project} project - project object
	 * @param {boolean} isRoot - true
	 * 
	 * 
	 * @returns {file} - the tree structure
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
				studio.workspace.error(e.message);
			}
		} else {
			studio.workspace.warn('PROJECT_NULL');
			return null;
		}
	},
	/**
	 * Get the current project structure.
	 * 
	 * The **getFromStore** function is called to load the content of the *currentProject* variable from the projects store.
	 * 
	 * @returns {Project} project object
	 */
	getCurrentProject() {
		let project = studio.workspace.getFromStore('projects', 'currentProject');
		return project;
	},
	/**
	 * 
	 * The **loadProjectStructure** function returns the file tree hierarchy of the given project
	 * 
	 * @param {Project} project project object
	 * @return {file} file type structure
	 */
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
	 * The purpose of this function is to obtain the default file name of a *project*.
	 * 
	 * Usually, the name of this file is 'main.ext', where *ext* is the extension 
	 * corresponding to the programming language that defines the project.
	 * 
	 * @param {Project} project - project object
	 * 
	 * @returns {string} - name of the default file
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
	 * Get the default run file name of a *project*.
	 * 
	 * Usually, the name of this file is 'main.ext', where *ext* is the extension 
	 * corresponding to the programming language that defines the project.
	 * 
	 * @param {Project} project - project object
	 * 
	 * @returns {string} - name of the default run file
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
	 * This function's purpose is to get the makefile for file name of a *project*.
	 * 
	 * @param {Project} project - project object
	 * 
	 * @returns {string} - name of the makefile
	 */
	getMakefile(project, filename) {
		if(project !== null) {
			return this._runLanguageFunction('getMakefile', project, filename);
		} else {
			return null;
		}
	},

	/**
	 * This function's purpose is to get the makefile for file name of a *project*.
	 * 
	 * @param {Project} project - project object
	 * 
	 * @returns {string} - name of the makefile
	 */
	getEnvironmentSetup(project, filename) {
		if(project !== null) {
			return this._runLanguageFunction('getEnvironmentSetup', project, filename);
		} else {
			return null;
		}
	},


	/**
	 * This function returns a specific option that was set to a programming language.
	 * 
	 * In order to obtain it, is required to have the *project* for which the option was set 
	 * and the actual *name* of the specific option.
	 * 
	 * @param {Project} project - project object
	 * @param {string} option - option
	 * 
	 * @returns {Object} the specific option of the programming language
	 * 
	 * @example
	 * 
	 * let sourceLanguage = languageSpecificOption (project, 'sourceLanguage');
	 */
	languageSpecificOption (project, option) {
		return this._runLanguageFunction(option, project);
	},

	/**
	 * This functions returns the code that was written into a file and it needs 
	 * the *project* where the file is saved and the *path* to the file.
	 * 
	 * @param {Project} project - project object
	 * @param {string} path - the path to the file
	 * 
	 * @returns {Object} - the current file code
	 * 
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
	 * Similar to the one defined before, this function also returns the code, but this time 
	 * from the current file that is opened in the current project.
	 * 
	 * @returns {Object} - the current file code
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

	/**
	 * Register a package for a language
	 * @param {string} language 
	 * @param {string} board 
	 * @param {PackageInformation|PackageInformation[]} packageInformationArray 
	 */
	registerLanguagePackage (language, board, packageInformationArray)
	{
		if (!_.isArray (packageInformationArray)) packageInformationArray = [packageInformationArray];
		for (let packageInformation of packageInformationArray)
		{
			if (!board) board = '*';
			if (!packages[language]) packages[language] = {'*':{}};
			if (!packages[language][board]) packages[language][board] = {};
			packages[language][board][packageInformation.name] = packageInformation;
		}
	},

	/**
	 * Retrieve the language packages for a language
	 * @param {Device} device 
	 * @param {string} language 
	 */
	getLanguagePackages (device, language)
	{
		let p = {};
		if (packages[language])
		{
			p = _.assign ({}, packages[language]['*'], packages[language][device.board]);
		}
		return p;
	},
	/**
	 * Shows the Projects Library Dialog when there is no project loaded.
	 */
	showProjectsLibrary()
	{
		studio.workspace.showDialog(ProjectsLibrary, {width: 1000});
	}
};
export default async function setup(options, imports, register) {
	studio = imports;
	workspacePath =  studio.settings.loadValue('projects', 'path', path.join (await imports.filesystem.getUserFolder(), 'WyliodrinSTUDIO'));
	studio.workspace.registerStore('projects', projectStore);

	studio.workspace.registerTab('PROJECT_APPLICATION', 100, Application);

	studio.workspace.registerToolbarButton('PROJECT_LIBRARY', 10, () => projects.showProjectsLibrary(), 'plugins/projects/projects/data/img/icons/projects-icon.svg');
	register(null, {
		projects: projects
	});
}
