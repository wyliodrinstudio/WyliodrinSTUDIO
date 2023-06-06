(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[49],{

/***/ 1581:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setup; });
/* harmony import */ var _views_Application_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1582);
/* harmony import */ var _views_ProjectsLibrary_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1587);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(294);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1613);
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jszip__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1614);
let studio = null;
let workspacePath ='';







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
		path: path__WEBPACK_IMPORTED_MODULE_3___default.a.join(__webpack_require__(1615).homedir(), 'WyliodrinSTUDIO'),
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
			let normalizedPath = path__WEBPACK_IMPORTED_MODULE_3___default.a.normalize(filePath);
			let fullValidPath = path__WEBPACK_IMPORTED_MODULE_3___default.a.normalize(path__WEBPACK_IMPORTED_MODULE_3___default.a.join (basePath, filePath));
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
	 * @param {string} logoIcon - icon that appears in the new application popup
	 * @param {string} fileTreeIcon - icon that appears at the top of the file tree
	 * @param {string} fileIcons - icons for files
	 * @param {Object} options - language options
	 * 
	 * 
	 * @example
	 * 
	 * registerLanguage('python', 'Python', 'plugins/languages/python/data/img/project_python.png', 'plugins/languages/python/data/img/python.png', python);
	 */
	registerLanguage(id, title, projectIcon, logoIcon, fileTreeIcon, fileIcons, options) {
		if(!fileIcons) fileIcons = [];
		if (!options) options = {};
		if(id !== null && title !== null && fileTreeIcon !== null)
		{
			this.languages.push({
				id,
				title,
				projectIcon,
				logo: logoIcon,
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
		if (!lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isArray (types)) types = [types];
		if (!lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isArray (boards)) boards = [boards];
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

			if (addon && lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isFunction(addon[fn])) {
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
		options = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.merge({
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
			await studio.filesystem.writeFile(path__WEBPACK_IMPORTED_MODULE_3___default.a.join(projectFolder, 'project.json'), JSON.stringify({
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
		let projectFolder = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(workspacePath, name);
		projectFolder = this._isPathValid(workspacePath,projectFolder);
		if(projectFolder !== null && language !== null && name !== null){
			let projectCreate = false;
			try {
				if (!await studio.filesystem.pathExists(projectFolder)) {
					await studio.filesystem.mkdirp(projectFolder);
					projectCreate = true;
					await studio.filesystem.mkdirp(path__WEBPACK_IMPORTED_MODULE_3___default.a.join(projectFolder, '.project'));
					let date = await studio.filesystem.lastModified(projectFolder);
					date = new Date(date);
					await studio.filesystem.writeFile(path__WEBPACK_IMPORTED_MODULE_3___default.a.join(projectFolder, 'project.json'), JSON.stringify({
						language: language,
						date: date
					}, null, 4));
					
					let project = {
						name: path__WEBPACK_IMPORTED_MODULE_3___default.a.basename (projectFolder),
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
					let newProjectFolder = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(workspacePath, newName);
					newProjectFolder = this._isPathValid(workspacePath, newProjectFolder);
					// TODO if this is the current project, close it, timeout, rename and open again
					if (newProjectFolder !== null && path__WEBPACK_IMPORTED_MODULE_3___default.a.basename(newProjectFolder) !== '') {
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
					let newProjectFolder = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(workspacePath, newName);
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
	 * @param {Project} data - data from project
	 * @param {string} extension - archive extension (.zip/.tar/.wylioapp)
	 *
	 * @returns {boolean} true if succsesful, false otherwise
	 *
	 * @example
	 * 
	 * importProject(project, projectData, '.zip');
	 *  
	 */
	async importProject(fileName, data, type) 
	{
		if(type === 'wylioapp'){
			
			let projectImport = JSON.parse(data.toString());
			let projectFolder = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(workspacePath, projectImport.title);
			projectFolder = this._isPathValid(workspacePath,projectFolder);
			let json = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(projectFolder, 'project.json');
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
			let name = path__WEBPACK_IMPORTED_MODULE_3___default.a.basename(fileName);
			let pathing = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(workspacePath,name.split('.').slice(0, -1).join('.'));
			pathing = this._isPathValid(workspacePath,pathing);
			let zip = new jszip__WEBPACK_IMPORTED_MODULE_4___default.a;
			await studio.filesystem.mkdirp(pathing);
			try{
				if(await studio.filesystem.isDirectory(pathing)){
					zip.loadAsync(data).then(function(contents) {
						Object.keys(contents.files).forEach(async function(key) {
							if (contents.files[key].dir){
								var dest = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(pathing,key);
								await studio.filesystem.mkdirp(dest);
							} else {
								zip.file(key).async('nodebuffer').then(async function(content) {
									var dest = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(pathing,key);
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
				let curentFolder = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(necesarry.folder, necesarry.item.name);
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
				let curentFile = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(necesarry.folder, necesarry.item.name);
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

		
		let zip = new jszip__WEBPACK_IMPORTED_MODULE_4___default.a();
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
					file = path__WEBPACK_IMPORTED_MODULE_3___default.a.resolve(dir, file);
					if (await studio.filesystem.isDirectory(file)) {
						let x = path__WEBPACK_IMPORTED_MODULE_3___default.a.relative(root, file);
						if(path__WEBPACK_IMPORTED_MODULE_3___default.a.sep == '\\'){
							x = x.replace(/\\/g, '/');
						}
						zip.folder(x);
						await this._buildZipFromDirectory(file, zip, root);
					} else {
						const filedata = await studio.filesystem.readFile(file);
						if(filedata) {
							let x = path__WEBPACK_IMPORTED_MODULE_3___default.a.relative(root, file);
							if(path__WEBPACK_IMPORTED_MODULE_3___default.a.sep == '\\'){
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
			let fullPath = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(file.dir, file.file);
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
						file: path__WEBPACK_IMPORTED_MODULE_3___default.a.extname(fullPath).slice(1),
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
			let basename = path__WEBPACK_IMPORTED_MODULE_3___default.a.basename(name);
			if (basename === '/project.json') {
				studio.workspace.showError('PROJECT_JSON_DO_NOT');
			} else {
				let projectFolder = project.folder;
				let newFolder = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(projectFolder, name);

				newFolder = this._isPathValid(projectFolder, newFolder);
				if (newFolder !== null) {
					if (path__WEBPACK_IMPORTED_MODULE_3___default.a.basename(newFolder) === '/project.json') {
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
			let basename = path__WEBPACK_IMPORTED_MODULE_3___default.a.basename(name);
			if (basename === 'project.json') {	
				studio.workspace.showError('PROJECT_JSON_DO_NOT');
			} else {
				let projectFolder = project.folder;
				let newFilePath = this._isPathValid(projectFolder, name);
				if (newFilePath !== null) {
					if (data === '') {
						try {
							await studio.filesystem.mkdirp (path__WEBPACK_IMPORTED_MODULE_3___default.a.dirname (newFilePath));
							await studio.filesystem.writeFile(newFilePath, '');
							return true;
						} catch (e) {
							studio.workspace.showError('PROJECT_ERROR_NEW_FILE', {file: newFilePath, error: e.message});
							return false;
						}
					} else {
						try {
							await studio.filesystem.mkdirp (path__WEBPACK_IMPORTED_MODULE_3___default.a.dirname (newFilePath));
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
			filePath = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(project.folder,filePath);
			let content = await studio.filesystem.readFile(filePath);
			let savePath = await studio.filesystem.openExportDialog(content, {
				filename: path__WEBPACK_IMPORTED_MODULE_3___default.a.basename(filePath),
				filetypes:[path__WEBPACK_IMPORTED_MODULE_3___default.a.extname(filePath)],
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
				filetypes:[path__WEBPACK_IMPORTED_MODULE_3___default.a.extname(name)],
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
	 * renameObject(project, 'ObjectNewName', '/folder/file');
	 */
	async renameObject(project, newName, pathTo) {
		
		if(project !== null && newName !== null && pathTo !== null) {
			if (path__WEBPACK_IMPORTED_MODULE_3___default.a.basename(pathTo) === 'project.json' || newName === 'project.json') {
				studio.workspace.showError('PROJECT_JSON_DO_NOT');
			} else {
				let projectFolder = project.folder;
	
				let pathToRename = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(projectFolder, pathTo);
	
				let parent = path__WEBPACK_IMPORTED_MODULE_3___default.a.dirname(pathToRename);
	
				let newFile = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(parent, newName);
	
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
	 * deleteFile(project, '/folder/file');
	 */
	async deleteFile(project, pathTo) {
		if(project !== null && pathTo !== null) {
			if (path__WEBPACK_IMPORTED_MODULE_3___default.a.basename(pathTo) == 'project.json') {
				studio.workspace.showError('PROJECT_JSON_DO_NOT');
			} else {
				try {
					let projectFolder = project.folder;
					let pathToDelete = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(projectFolder, pathTo);
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
	 * deleteFolder(project, '/folder/folder2');
	 */
	async deleteFolder(project, pathTo) {
		if(project !== null && pathTo !== null) {
			if (path__WEBPACK_IMPORTED_MODULE_3___default.a.basename(pathTo) == 'project.json') {
				studio.workspace.showError('PROJECT_JSON_DO_NOT');
			} else {
				try {
					let projectFolder = project.folder;
					let pathToDelete = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(projectFolder, pathTo);
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
				let projectFolder = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(workspacePath, projectName);
				if (await studio.filesystem.isDirectory(projectFolder)) {
					try {
						let projectData = JSON.parse((await studio.filesystem.readFile(path__WEBPACK_IMPORTED_MODULE_3___default.a.join(projectFolder, 'project.json'))).toString());
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
						let projectData = JSON.parse((await studio.filesystem.readFile(path__WEBPACK_IMPORTED_MODULE_3___default.a.join(projectFolder, 'project.json'))).toString());
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
						let file = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(project.folder, mainFile);
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

		if (project !== null) {
			if(await studio.filesystem.pathExists(project.folder)) {
				if(await this.selectCurrentProject(project, false)) {
					if (file !== null) {
						await this.changeFile(project,file);
					}
				} 
			} else {
				studio.workspace.showDialog(_views_ProjectsLibrary_vue__WEBPACK_IMPORTED_MODULE_1__["default"], {width: 1000});
			}			
		} else if(!studio.settings.loadValue('firstrun', 'firstRun', true)) {
			studio.workspace.showDialog(_views_ProjectsLibrary_vue__WEBPACK_IMPORTED_MODULE_1__["default"], {width: 1000});
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
	 * 		saveFile(project, '/folder/file', Buffer.from ('...'));
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
							await studio.filesystem.mkdirp(path__WEBPACK_IMPORTED_MODULE_3___default.a.dirname(filePath));
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
				if (path__WEBPACK_IMPORTED_MODULE_3___default.a.basename(name) === '/project.json') {
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
			if (path__WEBPACK_IMPORTED_MODULE_3___default.a.basename(name) != 'project.json') {
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
	 * saveSpecialFile(project, 'SpecialFileName', Buffer.from ('...'));
	 */
	async saveSpecialFile(project, name, content) {
		if(project !== null && name !== null && content !== null){
			let projectFolder = project.folder;
			let specialFolder = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(projectFolder, '.project');
			try {
				await studio.filesystem.mkdirp(specialFolder);
			} catch (e) {
				// TODO show notification
				studio.workspace.error(e);
			}
			let specialFile = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(specialFolder, (name));
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
	 * deleteSpecialFile(project, 'SpecialFileName');
	 */
	async deleteSpecialFile(project, name) {
		if(project !== null && name !== null){
			let projectFolder = project.folder;
			let specialFolder = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(projectFolder, '.project');
			try {
				await studio.filesystem.mkdirp(specialFolder);
			} catch (e) {
				// TODO show notification
				studio.workspace.error(e);
			}
			let specialFile = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(specialFolder, (name));
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
			let specialFolder = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(projectFolder, '.project');
			try {
				await studio.filesystem.mkdirp(specialFolder);
			} catch (e) {
				// TODO show notification
				studio.workspace.error(e);
			}
			let specialFile = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(specialFolder, name);
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
					name: path__WEBPACK_IMPORTED_MODULE_3___default.a.basename(projectFolder),
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
	 * let sourceLanguage = languageSpecificOption (project, {...});
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
			let filePath = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(projectFolder, pathTo);

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
		if (!lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isArray (packageInformationArray)) packageInformationArray = [packageInformationArray];
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
			p = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.assign ({}, packages[language]['*'], packages[language][device.board]);
		}
		return p;
	},
	/**
	 * Shows the Projects Library Dialog when there is no project loaded.
	 */
	showProjectsLibrary()
	{
		studio.workspace.showDialog(_views_ProjectsLibrary_vue__WEBPACK_IMPORTED_MODULE_1__["default"], {width: 1000});
	}
};
async function setup(options, imports, register) {
	studio = imports;
	workspacePath =  studio.settings.loadValue('projects', 'path', path__WEBPACK_IMPORTED_MODULE_3___default.a.join (await imports.filesystem.getUserFolder(), 'WyliodrinSTUDIO'));
	studio.workspace.registerStore('projects', _store__WEBPACK_IMPORTED_MODULE_5__["default"]);

	studio.workspace.registerTab('PROJECT_APPLICATION', 100, _views_Application_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);

	studio.workspace.registerToolbarButton('PROJECT_LIBRARY', 10, () => projects.showProjectsLibrary(), 'plugins/projects/projects/data/img/icons/projects-icon.svg');
	register(null, {
		projects: projects
	});
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),

/***/ 1582:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Application_vue_vue_type_template_id_63bdaecc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1583);
/* harmony import */ var _Application_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1585);
/* empty/unused harmony star reexport *//* harmony import */ var _Application_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1607);
/* harmony import */ var _Application_vue_vue_type_style_index_1_id_63bdaecc_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1610);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(54);







/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _Application_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Application_vue_vue_type_template_id_63bdaecc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Application_vue_vue_type_template_id_63bdaecc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "63bdaecc",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/projects/projects/views/Application.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1583:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Application_vue_vue_type_template_id_63bdaecc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1584);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Application_vue_vue_type_template_id_63bdaecc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Application_vue_vue_type_template_id_63bdaecc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1584:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.currentProject
    ? _c(
        "div",
        [
          _c(
            "multipane",
            {
              staticClass: "vertical-panes",
              attrs: { layout: "vertical" },
              on: {
                paneResize: _vm.panelresize,
                paneResizeStop: _vm.storeresize
              }
            },
            [
              _vm.advanced
                ? _c(
                    "div",
                    {
                      staticClass: "pane tree-show",
                      class: _vm.treeShow,
                      staticStyle: { left: "0" },
                      style: {
                        minWidth: "195px",
                        width: _vm.filetree_size,
                        maxWidth: " "
                      }
                    },
                    [
                      _c("div", { attrs: { layout: "row" } }, [
                        _vm.advanced
                          ? _c(
                              "div",
                              { staticClass: "tree-show", class: _vm.treeShow },
                              [
                                _c(
                                  "v-btn",
                                  {
                                    attrs: { text: "" },
                                    on: { click: _vm.changeClassHide }
                                  },
                                  [
                                    _c("img", {
                                      attrs: {
                                        src:
                                          "plugins/projects/projects/data/img/filem-hide.png"
                                      }
                                    })
                                  ]
                                )
                              ],
                              1
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.advanced
                          ? _c(
                              "div",
                              {
                                staticClass: "project-tree-on",
                                class: _vm.projectTree
                              },
                              [
                                _c("v-treeview", {
                                  attrs: {
                                    open: _vm.open,
                                    items: _vm.items,
                                    "item-key": "key",
                                    active: _vm.itemsActive,
                                    activatable: "",
                                    color: "rgba(0,0,0,0.87)",
                                    "return-object": "",
                                    "open-on-click": true,
                                    dense: ""
                                  },
                                  on: {
                                    "update:active": [
                                      function($event) {
                                        _vm.itemsActive = $event
                                      },
                                      _vm.setActive
                                    ]
                                  },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "prepend",
                                        fn: function(ref) {
                                          var item = ref.item
                                          var open = ref.open
                                          return [
                                            item.path === "/"
                                              ? _c(
                                                  "p",
                                                  {
                                                    on: {
                                                      click: function($event) {
                                                        _vm.menuItem = item
                                                      },
                                                      contextmenu: function(
                                                        $event
                                                      ) {
                                                        ;(_vm.fileItem = item),
                                                          _vm.showProject(
                                                            $event
                                                          )
                                                      }
                                                    }
                                                  },
                                                  [
                                                    _vm.languageImage().type
                                                      ? _c("v-img", {
                                                          attrs: {
                                                            contain: "",
                                                            src: _vm.languageImage()
                                                              .img,
                                                            avatar: ""
                                                          }
                                                        })
                                                      : _c("v-icon", [
                                                          _vm._v(
                                                            _vm._s(
                                                              _vm.languageImage()
                                                                .img
                                                            )
                                                          )
                                                        ])
                                                  ],
                                                  1
                                                )
                                              : item.file !== undefined
                                              ? _c(
                                                  "p",
                                                  {
                                                    on: {
                                                      contextmenu: function(
                                                        $event
                                                      ) {
                                                        ;(_vm.fileItem = item),
                                                          _vm.showFile($event)
                                                      }
                                                    }
                                                  },
                                                  [
                                                    _vm.getPictogram(item.path)
                                                      .type
                                                      ? _c("v-img", {
                                                          attrs: {
                                                            contain: "",
                                                            src: _vm.getPictogram(
                                                              item.path
                                                            ).img,
                                                            avatar: ""
                                                          }
                                                        })
                                                      : _c("v-icon", [
                                                          _vm._v(
                                                            _vm._s(
                                                              _vm.getPictogram(
                                                                item.path
                                                              ).img
                                                            )
                                                          )
                                                        ])
                                                  ],
                                                  1
                                                )
                                              : open && item.path !== "/"
                                              ? _c(
                                                  "p",
                                                  {
                                                    attrs: { text: "" },
                                                    on: {
                                                      click: function($event) {
                                                        _vm.menuItem = item
                                                      },
                                                      contextmenu: function(
                                                        $event
                                                      ) {
                                                        ;(_vm.fileItem = item),
                                                          _vm.showFolder($event)
                                                      }
                                                    }
                                                  },
                                                  [
                                                    _c("v-icon", [
                                                      _vm._v("mdi-folder-open")
                                                    ])
                                                  ],
                                                  1
                                                )
                                              : item.path !== "/"
                                              ? _c(
                                                  "p",
                                                  {
                                                    attrs: { text: "" },
                                                    on: {
                                                      click: function($event) {
                                                        _vm.menuItem = item
                                                      },
                                                      contextmenu: function(
                                                        $event
                                                      ) {
                                                        ;(_vm.fileItem = item),
                                                          _vm.showFolder($event)
                                                      }
                                                    }
                                                  },
                                                  [
                                                    _c("v-icon", [
                                                      _vm._v("mdi-folder")
                                                    ])
                                                  ],
                                                  1
                                                )
                                              : _vm._e()
                                          ]
                                        }
                                      },
                                      {
                                        key: "label",
                                        fn: function(ref) {
                                          var item = ref.item
                                          return [
                                            item.file === undefined &&
                                            item.path === "/"
                                              ? _c(
                                                  "p",
                                                  {
                                                    staticStyle: {
                                                      width: "100%"
                                                    },
                                                    attrs: { text: "" },
                                                    on: {
                                                      click: function($event) {
                                                        _vm.menuItem = item
                                                      },
                                                      contextmenu: function(
                                                        $event
                                                      ) {
                                                        ;(_vm.fileItem = item),
                                                          _vm.showProject(
                                                            $event
                                                          )
                                                      }
                                                    }
                                                  },
                                                  [
                                                    _vm._v(
                                                      " \n\t\t\t\t\t\t\t" +
                                                        _vm._s(item.name) +
                                                        "                  \n\t\t\t\t\t\t"
                                                    )
                                                  ]
                                                )
                                              : item.file === undefined &&
                                                item.path !== "/"
                                              ? _c(
                                                  "p",
                                                  {
                                                    staticStyle: {
                                                      width: "100%"
                                                    },
                                                    attrs: { text: "" },
                                                    on: {
                                                      click: function($event) {
                                                        _vm.menuItem = item
                                                      },
                                                      contextmenu: function(
                                                        $event
                                                      ) {
                                                        ;(_vm.fileItem = item),
                                                          _vm.showFolder($event)
                                                      }
                                                    }
                                                  },
                                                  [
                                                    _vm._v(
                                                      " \n\t\t\t\t\t\t\t" +
                                                        _vm._s(item.name) +
                                                        "                  \n\t\t\t\t\t\t"
                                                    )
                                                  ]
                                                )
                                              : _c(
                                                  "p",
                                                  {
                                                    staticStyle: {
                                                      width: "100%"
                                                    },
                                                    attrs: { text: "" },
                                                    on: {
                                                      contextmenu: function(
                                                        $event
                                                      ) {
                                                        ;(_vm.fileItem = item),
                                                          _vm.showFile($event)
                                                      }
                                                    }
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n\t\t\t\t\t\t\t" +
                                                        _vm._s(item.name) +
                                                        "\n\t\t\t\t\t\t"
                                                    )
                                                  ]
                                                )
                                          ]
                                        }
                                      }
                                    ],
                                    null,
                                    false,
                                    198209464
                                  ),
                                  model: {
                                    value: _vm.tree,
                                    callback: function($$v) {
                                      _vm.tree = $$v
                                    },
                                    expression: "tree"
                                  }
                                }),
                                _vm._v(" "),
                                _c(
                                  "v-menu",
                                  {
                                    attrs: {
                                      "position-x": _vm.x,
                                      "position-y": _vm.y,
                                      absolute: "",
                                      "offset-y": ""
                                    },
                                    model: {
                                      value: _vm.projectMenu,
                                      callback: function($$v) {
                                        _vm.projectMenu = $$v
                                      },
                                      expression: "projectMenu"
                                    }
                                  },
                                  [
                                    _c(
                                      "v-list",
                                      { staticClass: "menu" },
                                      [
                                        _c(
                                          "v-list-item",
                                          {
                                            on: {
                                              click: function($event) {
                                                return _vm.newFolder(
                                                  _vm.fileItem
                                                )
                                              }
                                            }
                                          },
                                          [
                                            _c("v-list-item-title", [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t("PROJECT_NEW_FOLDER")
                                                )
                                              )
                                            ])
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-list-item",
                                          {
                                            on: {
                                              click: function($event) {
                                                return _vm.newFile(_vm.fileItem)
                                              }
                                            }
                                          },
                                          [
                                            _c("v-list-item-title", [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t("PROJECT_NEW_FILE")
                                                )
                                              )
                                            ])
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-list-item",
                                          {
                                            on: {
                                              click: function($event) {
                                                return _vm.importFile(
                                                  _vm.fileItem
                                                )
                                              }
                                            }
                                          },
                                          [
                                            _c("v-list-item-title", [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t("PROJECT_IMPORT_FILE")
                                                )
                                              )
                                            ])
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-menu",
                                  {
                                    attrs: {
                                      "position-x": _vm.x,
                                      "position-y": _vm.y,
                                      absolute: "",
                                      "offset-y": ""
                                    },
                                    model: {
                                      value: _vm.folderMenu,
                                      callback: function($$v) {
                                        _vm.folderMenu = $$v
                                      },
                                      expression: "folderMenu"
                                    }
                                  },
                                  [
                                    _c(
                                      "v-list",
                                      { staticClass: "menu" },
                                      [
                                        _c(
                                          "v-list-item",
                                          {
                                            on: {
                                              click: function($event) {
                                                return _vm.deleteFolder(
                                                  _vm.fileItem
                                                )
                                              }
                                            }
                                          },
                                          [
                                            _c("v-list-item-title", [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t(
                                                    "PROJECT_DELETE_FOLDER"
                                                  )
                                                )
                                              )
                                            ])
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-list-item",
                                          {
                                            on: {
                                              click: function($event) {
                                                return _vm.renameObject(
                                                  _vm.fileItem
                                                )
                                              }
                                            }
                                          },
                                          [
                                            _c("v-list-item-title", [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t(
                                                    "PROJECT_RENAME_FOLDER"
                                                  )
                                                )
                                              )
                                            ])
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-list-item",
                                          {
                                            on: {
                                              click: function($event) {
                                                return _vm.newFolder(
                                                  _vm.fileItem
                                                )
                                              }
                                            }
                                          },
                                          [
                                            _c("v-list-item-title", [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t("PROJECT_NEW_FOLDER")
                                                )
                                              )
                                            ])
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-list-item",
                                          {
                                            on: {
                                              click: function($event) {
                                                return _vm.newFile(_vm.fileItem)
                                              }
                                            }
                                          },
                                          [
                                            _c("v-list-item-title", [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t("PROJECT_NEW_FILE")
                                                )
                                              )
                                            ])
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-list-item",
                                          {
                                            on: {
                                              click: function($event) {
                                                return _vm.importFile(
                                                  _vm.fileItem
                                                )
                                              }
                                            }
                                          },
                                          [
                                            _c("v-list-item-title", [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t("PROJECT_IMPORT_FILE")
                                                )
                                              )
                                            ])
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-menu",
                                  {
                                    attrs: {
                                      "position-x": _vm.x,
                                      "position-y": _vm.y,
                                      absolute: "",
                                      "offset-y": ""
                                    },
                                    model: {
                                      value: _vm.fileMenu,
                                      callback: function($$v) {
                                        _vm.fileMenu = $$v
                                      },
                                      expression: "fileMenu"
                                    }
                                  },
                                  [
                                    _c(
                                      "v-list",
                                      { staticClass: "menu" },
                                      [
                                        _c(
                                          "v-list-item",
                                          {
                                            on: {
                                              click: function($event) {
                                                return _vm.deleteFile(
                                                  _vm.fileItem
                                                )
                                              }
                                            }
                                          },
                                          [
                                            _c("v-list-item-title", [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t("PROJECT_DELETE_FILE")
                                                )
                                              )
                                            ])
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-list-item",
                                          {
                                            on: {
                                              click: function($event) {
                                                return _vm.renameObject(
                                                  _vm.fileItem
                                                )
                                              }
                                            }
                                          },
                                          [
                                            _c("v-list-item-title", [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t("PROJECT_RENAME_FILE")
                                                )
                                              )
                                            ])
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-list-item",
                                          {
                                            on: {
                                              click: function($event) {
                                                return _vm.exportFile(
                                                  _vm.fileItem
                                                )
                                              }
                                            }
                                          },
                                          [
                                            _c("v-list-item-title", [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t("PROJECT_EXPORT_FILE")
                                                )
                                              )
                                            ])
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-card-actions",
                                  { staticClass: "fm-actions" },
                                  [
                                    _c(
                                      "v-btn",
                                      {
                                        attrs: { text: "", icon: "" },
                                        on: {
                                          click: function($event) {
                                            return _vm.newFile(_vm.menuItem)
                                          }
                                        }
                                      },
                                      [_c("v-icon", [_vm._v("mdi-file-plus")])],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "v-btn",
                                      {
                                        attrs: { text: "", icon: "" },
                                        on: {
                                          click: function($event) {
                                            return _vm.newFolder(_vm.menuItem)
                                          }
                                        }
                                      },
                                      [
                                        _c("v-icon", [
                                          _vm._v("mdi-folder-plus")
                                        ])
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "v-btn",
                                      {
                                        attrs: { text: "", icon: "" },
                                        on: {
                                          click: function($event) {
                                            return _vm.dirTree(_vm.menuItem)
                                          }
                                        }
                                      },
                                      [_c("v-icon", [_vm._v("mdi-refresh")])],
                                      1
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          : _vm._e()
                      ])
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "multipane-resizer",
                { staticClass: "hs-100", staticStyle: { "z-index": "2" } },
                [
                  _vm.advanced
                    ? _c(
                        "div",
                        { staticClass: "tree-hide", class: _vm.treeHide },
                        [
                          _c(
                            "v-btn",
                            {
                              attrs: { text: "" },
                              on: { click: _vm.changeClassShow }
                            },
                            [
                              _c("img", {
                                attrs: {
                                  src:
                                    "plugins/projects/projects/data/img/filem-show.png"
                                }
                              })
                            ]
                          )
                        ],
                        1
                      )
                    : _vm._e()
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "hs-100 pane",
                  class: _vm.editorBox,
                  style: { flexGrow: 1, width: "100px" }
                },
                [
                  _vm.currentEditor &&
                  _vm.currentFile &&
                  _vm.verifyLanguage(_vm.currentProject)
                    ? _c(_vm.currentEditor, {
                        ref: "editor",
                        tag: "component",
                        attrs: {
                          project: _vm.currentProject,
                          filename: _vm.currentFile,
                          active: _vm.active
                        }
                      })
                    : !_vm.verifyLanguage(_vm.currentProject)
                    ? _c("div", { staticClass: "projects-msg" }, [
                        _vm._v(
                          "\n\t\t\t\t" +
                            _vm._s(_vm.$t("PROJECTS_INVALID_PROJECT")) +
                            "\n\t\t\t"
                        )
                      ])
                    : _vm.currentFile === null
                    ? _c("div", { staticClass: "projects-msg" }, [
                        _vm._v(
                          "\n\t\t\t\t" +
                            _vm._s(_vm.$t("PROJECTS_NO_FILE")) +
                            "\n\t\t\t"
                        )
                      ])
                    : _vm.currentEditor === null
                    ? _c("div", { staticClass: "projects-msg" }, [
                        _vm._v(
                          "\n\t\t\t\t" +
                            _vm._s(_vm.$t("PROJECTS_EXTENSION_URECOGNIZED")) +
                            "\n\t\t\t"
                        )
                      ])
                    : _vm._e()
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    : _vm.currentProject === null
    ? _c("div", [
        _c(
          "div",
          { staticClass: "projects-msg" },
          [
            _c(
              "v-btn",
              {
                on: {
                  click: function($event) {
                    return _vm.projectLibrary()
                  }
                }
              },
              [_vm._v(_vm._s(_vm.$t("PROJECT_LOAD_PROJECT")))]
            )
          ],
          1
        )
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1585:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_Application_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1586);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_Application_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1586:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(294);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ProjectsLibrary_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1587);
/* harmony import */ var vue_multipane__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1606);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//is file function in care sa fie logica
// de trimis ace even






/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'Application',
	props: ['active'],
	data () {
		return {
			extension: '',
			source: '',
			folder:'',

			fileItem:'',
			menuItem:null,
			tabs:[],
			tabItem:null,

			previous:[],

			filetree_size: this.studio.settings.loadValue ('projects', 'filetree_size', '195px'),

			showTree: this.advanced,
			previousProject: null,
			previousRoot: null,
			open: [],
			tree: [],
			items:[],
			item:null,
			type:null,
			itemsActive: [],
			fileMenu: false,
			folderMenu:false,
			projectMenu:false,
			x: 0,
			y: 0,
			showConsole: false,
			baseFileIcon:'mdi-file',
			baseFolderIcon:'mdi-folder-account',
		};
	},
	components: {
		Multipane: vue_multipane__WEBPACK_IMPORTED_MODULE_3__["Multipane"],
		MultipaneResizer: vue_multipane__WEBPACK_IMPORTED_MODULE_3__["MultipaneResizer"]
	},
	computed: {

		treeShow ()
		{	
			return this.showTree?'d-block':'d-none';
		},
		treeHide ()
		{
			return this.showTree?'d-none':'d-block';
		},
		projectTree ()
		{
			return this.showTree?'project-tree-on hs-100':'project-tree-off hs-100';
		},
		editorBox ()
		{
			return this.showTree?'project-box-1':'project-box-2';
		},
		advanced ()
		{
			return this.mode !== 'simple';
		},
		
		...Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"]) ({
			currentProject: 'projects/currentProject',
			currentFile: 'projects/currentFile',
			editors: 'projects/editors',
			mode: 'workspace/mode'
		}),
		currentEditor ()
		{
			let baseEditor = null;
			if (this.currentFile)
			{
				// let extension = path.extname (this.currentFile).substring (1).toLowerCase();
				for (let editor of this.editors) {
					for (let lang of editor.languages) {
						if (lang.test (this.currentFile)) {
							return editor.component;
						}
					}
				}
			}
			return baseEditor;
		}
	},
	watch: {
		async currentProject ()
		{
			this.updateTitle ();
			await this.dirTree();
			// while(this.items.name === this.previousRoot.name) {
			// 	await this.dirTree();	
			// }
			
		},
		currentFile ()
		{
			this.updateTitle ();
			//await this.dirTree();
			// while(this.items.name === this.previousRoot.name) {
			// 	await this.dirTree();	
			// }
			
		},
		async source ()
		{
			await this.studio.projects.saveFile(this.currentProject,this.currentFile,this.source);
		},
		mode:
		{
			immediate: true,
			handler ()
			{
				// if(this.mode===true){
				// 	await this.changeSource({
				// 		name:('main'+this.extension),
				// 		file:this.extension,
				// 		path:('main'+this.extension)
				// 	})
				// }
				this.updateTitle ();
				this.showTree = this.advanced;
			}
		},
		showTree ()
		{
			process.nextTick (() => {
				window.dispatchEvent(new Event('resize'));
			});
		},
		type()
		{
			// let that = this;
			return this.editors.find((element)=> { 
				if(element == this.type){
					this.studio.workspace.dispatchToStore('projects','currentEditor',element.component);
				}
			}); 
		}
	},
	methods: {
		setActive(items){
			// TODO why is this function here?
			if (items.length > 0)
			{
				this.fileItem = items[0];
				if (this.fileItem.file !== undefined)
				{
					this.changeSource (this.fileItem);	
				}
			}
			else if (this.fileItem)
			{
				items.push (this.fileItem);
			}
		},

		panelresize ()
		{
			if (this.$refs.editor.resize)
			{
				this.$refs.editor.resize ();
			}
		},
		storeresize (pane, container, size)
		{
			this.studio.settings.storeValue ('projects', 'filetree_size', size);
		},
		verifyLanguage() {
			let language = this.studio.projects.getLanguage(this.currentProject.language);
			if(language){
				return true;
			} else return false;
		},
		languageImage ()
		{
			// TODO check if language is known, not only that it exists
			let language = this.studio.projects.getLanguage(this.currentProject.language);
			let addons = null;
			if(language){
				addons = language.addons;
			}	
			let device = this.studio.workspace.getDevice ();
			let type = device.type;
			let board = device.board;
			let icon = null;
			if(addons) {
				if(type !== 'none' && board !== 'none' && addons[type + ':' + board]) {
					icon = addons[type + ':' + board].icon;
				}
				if (!icon && addons && board !== 'none' && addons['*:' + board]) {
					icon = addons['*:' + board].icon;
				}
				if (!icon && addons && type !== 'none' && addons[type + ':*']) {
					icon = addons[type + ':*'].icon;
				}
				if(!icon && type !== 'none' && board !== 'none' && addons[type + ':' + board]) {
					icon = language.icon;
				}
				if(!icon && addons && board !== 'none' && addons['*:' + board]) {
					icon = language.icon;
				}
				if(!icon && addons && type !== 'none' && addons[type + ':*']) {
					icon = language.icon;
				}
			}	
			if (!icon && language){
				icon = language.icon;
			}
			if(!icon) {
				icon = this.baseFolderIcon;
			}
			let imgType = false;
			if(icon){
				let array = icon.split('-');
				if(array[0] === 'mdi') {
					imgType = false;
				} else {
					imgType = true;
				}
			}
			return {
				img:icon,
				type:imgType
			};
		},
		getPictogram(filename)
		{
			let language = this.studio.projects.getLanguage(this.currentProject.language);
			let addons = null;
			let fileIcons = [];
			if(language){
				addons = language.addons;
			} 
			
			let ext = path__WEBPACK_IMPORTED_MODULE_1___default.a.extname(filename).toLowerCase();
			let device = this.studio.workspace.getDevice ();
			let type = device.type;
			let board = device.board;
			let pictogram = null;
			if(language) {
				fileIcons = language.fileIcons;
				if(type !== 'none' && board !== 'none' && addons[type + ':' + board] !== undefined) {
					let addonPictograms = addons[type + ':' + board].fileIcons;
					if(!pictogram && addonPictograms && addonPictograms.length > 0) {
						for(let pict of addonPictograms) {
							if(pict.extension && ext === pict.extension) {
								pictogram = pict.icon;
							} else if(pict.filename && filename.match(pict.filename)) {
								pictogram = pict.icon;
							}
						}
					}
					
				}
				
				if (!pictogram && board !== 'none' && addons['*:' + board] !== undefined) {
					let addonPictograms = addons['*:' + board].fileIcons;
					if(addonPictograms && addonPictograms.length > 0) {
						for( let pict of addonPictograms) {
							if(pict.extension && ext === pict.extension) {
								pictogram = pict.icon;
							} else if(pict.filename && filename.match(pict.filename)) {
								pictogram = pict.icon;
							}
						}
					}
				}
				
				if (!pictogram && type !== 'none' && addons[type + ':*'] !== undefined) {
					let addonPictograms = addons[type + ':*'].fileIcons;
					if(addonPictograms && addonPictograms.length > 0) {
						for( let pict of addonPictograms) {
							if(pict.extension && ext === pict.extension) {
								pictogram = pict.icon;
							} else if(pict.filename && filename.match(pict.filename)) {
						
								pictogram = pict.icon;
							}
						}
					}
				}
				
				if(!pictogram || (type === 'none' && board === 'none' && !pictogram)) {
					if(fileIcons && fileIcons.length > 0) {
						for( let pict of fileIcons) {
							if(pict.extension && ext === pict.extension) {
								pictogram = pict.icon;
							} else if(pict.filename && filename.match(pict.filename)) {
								pictogram = pict.icon;
							}
						}
					}
				}
				
				if(!pictogram) {
					
					if(ext === '.c') {
						pictogram = 'mdi-language-c';
					} else if (ext === '.cpp') {
						pictogram = 'mdi-language-cpp';
					} else if (ext === '.css') {
						pictogram = 'mdi-language-css3';
					} else if (ext === '.html') {
						pictogram = 'mdi-language-html5';
					} else if (ext === '.js') {
						pictogram = 'mdi-language-javascript';
					} else if (ext === '.ts') {
						pictogram = 'mdi-language-typescript';
					} else if (ext === '.php') {
						pictogram = 'mdi-language-php';
					} else if (ext === '.py') {
						pictogram = 'mdi-language-python';
					} else if (ext === '.json') {
						pictogram = 'mdi-json';
					} else if (ext === '.vue') {
						pictogram = 'mdi-vuejs';
					} else if (ext === '.md') {
						pictogram = 'mdi-markdown';
					} else if (ext === '.sh') {
						pictogram = 'mdi-bash';
					} else if (ext === '.visual') {
						pictogram = 'mdi-puzzle';
					} else if (ext === '.d') {
						pictogram = 'mdi-file';
					} else if (ext === '.png') {
						pictogram = 'mdi-file-image';
					} else if (ext === '.svg') {
						pictogram = 'mdi-file-image';
					} else if (ext === '.jpg') {
						pictogram = 'mdi-file-image';
					} else if (ext === '.jpeg') {
						pictogram = 'mdi-file-image';
					} else if (ext === '.gif') {
						pictogram = 'mdi-file-image';
					} else if (ext === '.tiff') {
						pictogram = 'mdi-file-image';
					} else if (ext === '.bmp') {
						pictogram = 'mdi-file-image';
					} else if (ext === '.ppm') {
						pictogram = 'mdi-file-image';
					} else if (ext === '.pgm') {
						pictogram = 'mdi-file-image';
					} else if (ext === '.pbm') {
						pictogram = 'mdi-file-image';
					} else if (ext === '.pnm') {
						pictogram = 'mdi-file-image';
					} else if (ext === '.bat') {
						pictogram = 'mdi-file-image';
					} else if (ext === '.bpg') {
						pictogram = 'mdi-file-image';
					}
				} 
				
				if(pictogram) {
					let array = pictogram.split('-');
					let imgType = true;
					if(array[0] === 'mdi') {
						imgType = false;
					} else {
						imgType = true;
					}
					return {
						img:pictogram,
						type:imgType
					};
				}
			}
			
			return {
				img:this.baseFileIcon,
				type:false
			};
			
		},
		showFile(e) {
			this.fileMenu = false;
			this.folderMenu = false;
			this.projectMenu = false;
			e.preventDefault();
			this.fileMenu = false;
			this.x = e.clientX;
			this.y = e.clientY+40;
			this.$nextTick(() => {
				this.fileMenu = true;
			});
		},
		showFolder(e) {
			this.fileMenu = false;
			this.folderMenu = false;
			this.projectMenu = false;
			e.preventDefault();
			this.folderMenu = false;
			this.x = e.clientX;
			this.y = e.clientY+40;
			this.$nextTick(() => {
				this.folderMenu = true;
			});
		},
		showProject(e) {
			this.fileMenu = false;
			this.folderMenu = false;
			this.projectMenu = false;
			e.preventDefault();
			this.projectMenu = false;
			this.x = e.clientX;
			this.y = e.clientY+40;
			this.$nextTick(() => {
				this.projectMenu = true;
			});
		},
		changeClassHide(){
			this.showTree = false;
		},
		changeClassShow(){
			this.showTree = true;
		},
		async changeSource(item)
		{
			this.itemsActive = [];
			this.itemsActive.push (item);
			await this.studio.projects.changeFile(this.currentProject,item.path);
		},
		
		async dirTree() 
		{
			
			if (this.currentProject)
			{
				let filename = this.currentProject.folder;
				if(this.items !== this.previous){
					this.items = [];
				}
				let components = await this.studio.filesystem.readdir(filename);
				let files = [];
				for(let item of components){
					let file = await this.studio.projects.recursiveGeneration(this.currentProject,
						{
							file: item,
							dir:filename
						});
					if(file.name !== 'project.json' && file.name !== '.project')
					{
						files.push(file);
					}
					
				}
				this.studio.projects.sort(files);
				let root = [{
					name:path__WEBPACK_IMPORTED_MODULE_1___default.a.basename(filename),
					children:files,
					path:'/',
					key:'/'
				}];
				this.items = root;
				
				this.previous = this.items;
				

			}
		},
		async newFolder (item)
		{
			if(item === undefined || item === null) {
				item = this.items[0];
			}
			let folderName = await this.studio.workspace.showPrompt ('PROJECT_NEW_FOLDER', 'PROJECT_NEW_FOLDER_NAME', '', 'PROJECT_NEW_NAME');
			if (folderName)
			{
				await this.studio.projects.newFolder(this.currentProject,path__WEBPACK_IMPORTED_MODULE_1___default.a.join(item.path,folderName));
				await this.refresh();
			}
		},
		async newFile (item)
		{
			if(item === undefined || item === null) {
				item = this.items[0];
			}
			let fileName = await this.studio.workspace.showPrompt ('PROJECT_NEW_FILE', 'PROJECT_NEW_FILE_NAME', '', 'PROJECT_NEW_NAME');
			if (fileName)
			{
				await this.studio.projects.newFile(this.currentProject,path__WEBPACK_IMPORTED_MODULE_1___default.a.join(item.path,fileName));
				await this.refresh();
			}
		},
		async exportFile (item)
		{
			if (await this.studio.projects.exportFile(this.currentProject,item.path))
			{
				await this.refresh();
			}
		},
		async importFile (item)
		{
			let files = await this.studio.filesystem.openImportDialog({
				title:'Import',
				filetypes:['*']
			});
			if (files.length > 0)
			{
				// use first file
				let fileData = await this.studio.filesystem.readImportFile (files[0]);
				if(files) {
					let filePath = path__WEBPACK_IMPORTED_MODULE_1___default.a.join(item.path,path__WEBPACK_IMPORTED_MODULE_1___default.a.basename(files[0].name));
					if(await this.studio.projects.newFile(this.currentProject,filePath,fileData))
					{
						await this.refresh();
					}
				}
				
			}
			return false;
		},
		async renameObject (item)
		{
			if (item.children)
			{
				let newName = await this.studio.workspace.showPrompt ('PROJECT_RENAME_FOLDER', 'PROJECT_NEW_FOLDER_NAME', item.name, 'PROJECT_NEW_NAME');
				if (newName)
				{
					if(await this.studio.projects.renameObject(this.currentProject,newName,item.path))
						await this.refresh();
				}
			}
			else
			{

				let newName = await this.studio.workspace.showPrompt ('PROJECT_RENAME_FILE', 'PROJECT_NEW_FILE_NAME', item.name, 'PROJECT_NEW_NAME');
				if (newName)
				{
					if(await this.studio.projects.renameObject(this.currentProject,newName,item.path))
						await this.refresh();
				}
			}
		},
		async deleteFile (item)
		{
			let allow = await this.studio.workspace.showConfirmationPrompt ('PROJECT_DELETE_FILE', 'PROJECT_FILE_SURE');
			if (allow)
			{
				if(await this.studio.projects.deleteFile(this.currentProject,item.path)) {
					await this.refresh();
				}
					
			}
		},
		async deleteFolder (item)
		{
			let allow = await this.studio.workspace.showConfirmationPrompt ('PROJECT_DELETE_FOLDER', 'PROJECT_FOLDER_SURE');
			if (allow)
			{
				if(await this.studio.projects.deleteFolder(this.currentProject,item.path))
					await this.refresh();
			}
		},
		/////
		async refresh(){
			await this.dirTree();
		},
		projectLibrary(){
			this.studio.workspace.showDialog(_ProjectsLibrary_vue__WEBPACK_IMPORTED_MODULE_2__["default"], {
				width: 1000
			});
		},
		updateTitle ()
		{
			if (this.currentProject)
			{
				if (this.advanced && this.currentFile) this.studio.workspace.setWorkspaceTitle (this.currentFile);
				else this.studio.workspace.setWorkspaceTitle (this.currentProject.name);
			}
			else this.studio.workspace.setWorkspaceTitle ('');
		}
		
		// async newFirmware(){

		// }
	},
	async created ()
	{
		await this.studio.projects.loadPreviousSelectedCurrentProject();
		await this.dirTree();
		this.previousProject = this.currentProject;
		this.previousRoot = this.items;
	}
});
	

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),

/***/ 1587:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProjectsLibrary_vue_vue_type_template_id_ea475eaa_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1588);
/* harmony import */ var _ProjectsLibrary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1590);
/* empty/unused harmony star reexport *//* harmony import */ var _ProjectsLibrary_vue_vue_type_style_index_0_id_ea475eaa_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1603);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ProjectsLibrary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ProjectsLibrary_vue_vue_type_template_id_ea475eaa_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ProjectsLibrary_vue_vue_type_template_id_ea475eaa_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "ea475eaa",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/projects/projects/views/ProjectsLibrary.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1588:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProjectsLibrary_vue_vue_type_template_id_ea475eaa_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1589);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProjectsLibrary_vue_vue_type_template_id_ea475eaa_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProjectsLibrary_vue_vue_type_template_id_ea475eaa_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1589:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    { staticClass: "library-box", attrs: { id: "projectsLibrary" } },
    [
      _c(
        "v-card-title",
        { attrs: { small: "" } },
        [
          _c("span", { staticClass: "headline" }, [
            _vm._v(_vm._s(_vm.$t("PROJECT_LIBRARY_PROJECTS")))
          ]),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c("v-text-field", {
            staticClass: "projsearch",
            attrs: {
              autofocus: "",
              "hide-details": "",
              label: _vm.$t("PROJECT_LIBRARY_SEARCH"),
              "single-line": "",
              dark: "",
              "append-icon": "search"
            },
            model: {
              value: _vm.search,
              callback: function($$v) {
                _vm.search = $$v
              },
              expression: "search"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      !_vm.projects || _vm.projects.length === 0
        ? _c(
            "v-card-text",
            { staticClass: "projects-container" },
            [
              _vm.readonly
                ? _c(
                    "v-alert",
                    { staticClass: "mb-4", attrs: { type: "warning" } },
                    [
                      _vm._v(
                        "\n\t\t\t" +
                          _vm._s(_vm.$t("PROJECTS_READ_ONLY_FILE_SYSTEM")) +
                          "\n\t\t"
                      )
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              !_vm.projects
                ? _c(
                    "div",
                    [
                      _c("v-progress-circular", {
                        attrs: { indeterminate: "" }
                      })
                    ],
                    1
                  )
                : _c("div", { staticClass: "noprojmsg" }, [
                    _c("strong", [
                      _vm._v(_vm._s(_vm.$t("PROJECTS_NO_PROJECT")))
                    ]),
                    _vm._v(" "),
                    _c("br"),
                    _vm._v(" "),
                    _c("span", [
                      _vm._v(_vm._s(_vm.$t("PROJECTS_CREATE_APPLICATION")))
                    ])
                  ])
            ],
            1
          )
        : _c(
            "v-card-text",
            [
              _c(
                "v-layout",
                [
                  _c(
                    "v-list",
                    { staticClass: "itemlist" },
                    [
                      _vm._l(_vm.projectList, function(project) {
                        return [
                          _c(
                            "v-list-item",
                            {
                              key: project.name,
                              staticClass: "lib-app",
                              on: {
                                click: function($event) {
                                  return _vm.selectProject(project)
                                }
                              }
                            },
                            [
                              _c(
                                "v-list-item-avatar",
                                [
                                  _c("v-img", {
                                    attrs: {
                                      contain: "",
                                      src: _vm.projectIcon(project),
                                      avatar: ""
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-list-item-content",
                                [
                                  _c("v-list-item-title", [
                                    _c("span", { staticClass: "projtitle" }, [
                                      _vm._v(_vm._s(project.name))
                                    ]),
                                    _vm._v(" "),
                                    _c("span", { staticClass: "projlang" }, [
                                      _vm._v(_vm._s(project.language))
                                    ])
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "v-list-item-subtitle",
                                    {
                                      staticStyle: { "word-wrap": "break-word" }
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(_vm.formatDate(project.date))
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-list-item-subtitle",
                                    [
                                      _c(
                                        "v-btn",
                                        {
                                          staticClass: "lib-app-btn",
                                          attrs: {
                                            text: "",
                                            id: "export_button"
                                          },
                                          on: {
                                            click: function($event) {
                                              $event.stopPropagation()
                                              return _vm.exportProject(project)
                                            }
                                          }
                                        },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.$t("PROJECT_LIBRARY_EXPORT")
                                            )
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "v-menu",
                                        {
                                          attrs: {
                                            "offset-y": "",
                                            "close-on-content-click": "",
                                            "close-on-click": ""
                                          },
                                          scopedSlots: _vm._u(
                                            [
                                              {
                                                key: "activator",
                                                fn: function(ref) {
                                                  var on = ref.on
                                                  return [
                                                    _c(
                                                      "v-btn",
                                                      _vm._g(
                                                        {
                                                          staticClass:
                                                            "lib-app-btn",
                                                          attrs: { text: "" },
                                                          on: {
                                                            click: function(
                                                              $event
                                                            ) {
                                                              $event.stopPropagation()
                                                            }
                                                          }
                                                        },
                                                        on
                                                      ),
                                                      [
                                                        _vm._v(
                                                          _vm._s(
                                                            _vm.$t(
                                                              "PROJECT_LIBRARY_OPTIONS"
                                                            )
                                                          )
                                                        )
                                                      ]
                                                    )
                                                  ]
                                                }
                                              }
                                            ],
                                            null,
                                            true
                                          )
                                        },
                                        [
                                          _vm._v(" "),
                                          _c(
                                            "v-list",
                                            { staticClass: "menu" },
                                            [
                                              _c(
                                                "v-list-item",
                                                {
                                                  on: {
                                                    click: function($event) {
                                                      return _vm.renameDialog(
                                                        project
                                                      )
                                                    }
                                                  }
                                                },
                                                [
                                                  _c("v-list-item-title", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.$t(
                                                          "PROJECT_LIBRARY_RENAME"
                                                        )
                                                      )
                                                    )
                                                  ])
                                                ],
                                                1
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "v-list-item",
                                                {
                                                  on: {
                                                    click: function($event) {
                                                      return _vm.deleteProject(
                                                        project,
                                                        _vm.projects
                                                      )
                                                    }
                                                  }
                                                },
                                                [
                                                  _c("v-list-item-title", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.$t(
                                                          "PROJECT_LIBRARY_DELETE"
                                                        )
                                                      )
                                                    )
                                                  ])
                                                ],
                                                1
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "v-list-item",
                                                {
                                                  on: {
                                                    click: function($event) {
                                                      return _vm.cloneDialog(
                                                        project
                                                      )
                                                    }
                                                  }
                                                },
                                                [
                                                  _c("v-list-item-title", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.$t(
                                                          "PROJECT_LIBRARY_CLONE"
                                                        )
                                                      )
                                                    )
                                                  ])
                                                ],
                                                1
                                              )
                                            ],
                                            1
                                          )
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ]
                      })
                    ],
                    2
                  )
                ],
                1
              ),
              _vm._v(" "),
              _vm.readonly
                ? _c(
                    "v-alert",
                    { staticClass: "mb-4", attrs: { type: "warning" } },
                    [
                      _vm._v(
                        "\n\t\t\t" +
                          _vm._s(_vm.$t("PROJECTS_READ_ONLY_FILE_SYSTEM")) +
                          "\n\t\t"
                      )
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.persistent === "never"
                ? _c(
                    "v-alert",
                    { staticClass: "mb-4", attrs: { type: "error" } },
                    [
                      _vm._v(
                        "\n\t\t\t\t" +
                          _vm._s(_vm.$t("PROJECTS_STORAGE_NOT_PERSISTENT")) +
                          "\n\t\t"
                      )
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.persistent === "prompt"
                ? _c(
                    "v-alert",
                    { staticClass: "mb-4", attrs: { type: "warning" } },
                    [
                      _vm.notPersistent === false
                        ? _c(
                            "div",
                            [
                              _c(
                                "v-row",
                                { attrs: { align: "center" } },
                                [
                                  _c("v-col", { staticClass: "grow" }, [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$t(
                                          "PROJECTS_STORAGE_ASK_PERSISTENT"
                                        )
                                      )
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    { staticClass: "shrink" },
                                    [
                                      _c(
                                        "v-btn",
                                        { on: { click: _vm.askPersistent } },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.$t(
                                                "PROJECTS_STORAGE_BUTTON_ASK_PERSISTENT"
                                              )
                                            )
                                          )
                                        ]
                                      )
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        : _c(
                            "div",
                            [
                              _c(
                                "v-row",
                                { attrs: { align: "center" } },
                                [
                                  _c("v-col", { staticClass: "grow" }, [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$t("PROJECTS_STORAGE_BROWSER_ERROR")
                                      )
                                    )
                                  ])
                                ],
                                1
                              )
                            ],
                            1
                          )
                    ]
                  )
                : _vm._e()
            ],
            1
          ),
      _vm._v(" "),
      _c(
        "v-card-actions",
        [
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              staticClass: "newapp",
              attrs: { disabled: _vm.readonly, text: "" },
              on: {
                click: function($event) {
                  return _vm.addProjectDialog()
                }
              }
            },
            [_vm._v(_vm._s(_vm.$t("PROJECT_WELCOME_CREATE_NEW_APP")))]
          ),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              attrs: { disabled: _vm.readonly, text: "", id: "import_button" },
              on: {
                click: function($event) {
                  return _vm.importDialogOpen()
                }
              }
            },
            [_vm._v(_vm._s(_vm.$t("PROJECT_LIBRARY_IMPORT")))]
          ),
          _vm._v(" "),
          _c(
            "v-btn",
            { ref: "button", attrs: { text: "" }, on: { click: _vm.close } },
            [_vm._v(_vm._s(_vm.$t("PROJECT_LIBRARY_CLOSE")))]
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1590:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_ProjectsLibrary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1591);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_ProjectsLibrary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1591:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var _dialogs_AddProjectDialog_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1592);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1600);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(294);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'ProjectsLibrary',
	data ()
	{
		return {
			dialog: false,
			exportDialog:false,
			importDialog:false,
			filePath:'',
			projects:null,
			search:'',
			notPersistent: false
		};
	},
	components: {
	},
	computed:{
		projectList(){
			if (!this.projects) return this.projects;
			else
				return this.projects.filter(project => {
					return project.name.toLowerCase().includes(this.search.toLowerCase());
				});
		},
		readonly ()
		{
			return this.persistent === 'notavailable';
		}
	},
	asyncComputed: {
		persistent ()
		{
			return this.studio.filesystem.isPersistent ();
		}
	},
	async created ()
	{
		this.projects = await this.studio.projects.loadProjects(false);
	},
	methods: {
		esc() {
			this.close();
		},
		close ()
		{
			this.$root.$emit ('submit');
		},
		formatDate(date){
			// return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');
			return moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()(date).tz(moment_timezone__WEBPACK_IMPORTED_MODULE_1___default.a.tz.guess()).add(3, 'hours').format('LLLL');
		},
		async addProjectDialog ()
		{
			this.close ();
			await this.studio.workspace.showDialog(_dialogs_AddProjectDialog_vue__WEBPACK_IMPORTED_MODULE_0__["default"],{width:800});
			this.studio.projects.showProjectsLibrary ();
			
		},
		async cloneDialog(project)
		{
			this.close ();
			let clone = await this.studio.workspace.showPrompt('PROJECT_CLONE_PROJECT', 'PROJECT_NAME_PROMPT', project.name, 'PROJECT_NEW_NAME');
			if (clone)
			{
				await this.studio.projects.cloneProject(project,clone);
			}
			this.studio.projects.showProjectsLibrary ();
		},
		async renameDialog(project)
		{
			this.close ();
			let rename = await this.studio.workspace.showPrompt('PROJECT_RENAME_PROJECT', 'PROJECT_NAME_PROMPT',project.name, 'PROJECT_NEW_NAME');
			if (rename)
			{
				await this.studio.projects.renameProject(project, rename);
			}
			this.studio.projects.showProjectsLibrary ();
		},
		projectLanguage (project)
		{
			// TODO check if language is known, not only that it exists
			if (project.language){
				if(this.studio.projects.getLanguage(project.language)){
					return project.language;
				} else return 'unknown';
			}
			this.studio.projects.showProjectsLibrary ();
		},
		projectIcon (project)
		{
			let language = this.studio.projects.getLanguage(project.language);
			if (language && language.projectIcon) return language.projectIcon;
			else return 'plugins/projects/projects/data/img/languages/project/unknown.png';
		},
		async selectProject (project)
		{
			if(await this.studio.projects.selectCurrentProject(project,true)){
				this.close ();
			}
		},
		async deleteProject (project, /* projects */)
		{
			this.close ();
			let localProject = project;
			let allow = await this.studio.workspace.showConfirmationPrompt ('PROJECT_DELETE_PROJECT', 'PROJECT_PROJECT_SURE');
			if(allow && await this.studio.projects.deleteProject(project))
			{
				let currentProject = this.studio.workspace.getFromStore('projects','currentProject');

				if(currentProject && localProject.name === currentProject.name)
				{
					this.studio.workspace.dispatchToStore('projects', 'currentProject', null);
					this.studio.workspace.dispatchToStore('projects', 'currentFile', null);
					await new Promise ((resolve) =>
					{
						process.nextTick (() => 
						{
							resolve ();
						});
					});
						
				}
			}
			this.studio.projects.showProjectsLibrary ();
		},
		async exportProject (project)
		{
			if(await this.studio.projects.exportProject(project))
			{
				this.projects=await this.studio.projects.loadProjects(false);
				return true;
			}
			return false;
		},
		async importDialogOpen() {
			let files = await this.studio.filesystem.openImportDialog({
				title:'Import',
				filetypes:['zip','tar','wylioapp']
			});
			if (files.length > 0)
			{
				// use first file
				let fileData = await this.studio.filesystem.readImportFile (files[0]);
				let type = '';
				if(files) {
					if(path__WEBPACK_IMPORTED_MODULE_2___default.a.extname(files[0].name) === 'wylioapp'){
						type = 'json'; 
					} else {
						type = 'archive';
					}
					let name = path__WEBPACK_IMPORTED_MODULE_2___default.a.basename(files[0].name).split('.').slice(0, -1).join('.');
					if(this.projects.find(x => x.name === name) === undefined) {
						if(await this.importProject(files[0].name,fileData,type))
						{
							this.projects=await this.studio.projects.loadProjects(false);
							return true;
						}
					} else {
						await this.studio.workspace.showNotification ('PROJECT_EXISTS_PROMPT');
						return false;
					}
					
				}
				
			}
			return false;
		},
		async importProject (fileName,fileData,type)
		{
			if(await this.studio.projects.importProject(fileName,fileData,type)){
				this.projects=await this.studio.projects.loadProjects(false);
				return true;
			}
			return false;
		},
		
		async askPersistent ()
		{
			await this.studio.filesystem.isPersistent ();
			
			let persistent = await this.studio.filesystem.setPersistent ();

			if (persistent === false)
				this.notPersistent = true;

			this.$asyncComputed.persistent.update ();
		}
	}
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),

/***/ 1592:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AddProjectDialog_vue_vue_type_template_id_4f6a9d2a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1593);
/* harmony import */ var _AddProjectDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1595);
/* empty/unused harmony star reexport *//* harmony import */ var _AddProjectDialog_vue_vue_type_style_index_0_id_4f6a9d2a_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1597);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AddProjectDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AddProjectDialog_vue_vue_type_template_id_4f6a9d2a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AddProjectDialog_vue_vue_type_template_id_4f6a9d2a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4f6a9d2a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "source/plugins/projects/projects/views/dialogs/AddProjectDialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1593:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddProjectDialog_vue_vue_type_template_id_4f6a9d2a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1594);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddProjectDialog_vue_vue_type_template_id_4f6a9d2a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddProjectDialog_vue_vue_type_template_id_4f6a9d2a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1594:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    [
      _c("v-card-title", [
        _c("span", { staticClass: "headline" }, [
          _vm._v(_vm._s(_vm.$t("PROJECT_WELCOME_CREATE_NEW_APP")))
        ])
      ]),
      _vm._v(" "),
      _c(
        "v-card-text",
        [
          _c(
            "v-layout",
            [
              _c("v-text-field", {
                attrs: {
                  autofocus: "",
                  "hide-details": "",
                  label: _vm.$t("PROJECT_LIBRARY_NAME"),
                  required: ""
                },
                model: {
                  value: _vm.projectName,
                  callback: function($$v) {
                    _vm.projectName = $$v
                  },
                  expression: "projectName"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-layout",
            [
              _c(
                "v-radio-group",
                {
                  staticClass: "project-lang-box",
                  attrs: { row: "" },
                  model: {
                    value: _vm.languageID,
                    callback: function($$v) {
                      _vm.languageID = $$v
                    },
                    expression: "languageID"
                  }
                },
                _vm._l(_vm.ProgLanguages, function(language) {
                  return _c(
                    "label",
                    { key: language.id, staticClass: "project-lang" },
                    [
                      _c("v-radio", {
                        attrs: { label: language.title, value: language.id }
                      }),
                      _vm._v(" "),
                      _c("v-img", { attrs: { src: language.logo } })
                    ],
                    1
                  )
                }),
                0
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("br"),
          _c("br")
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-card-actions",
        [
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              staticClass: "newapp",
              attrs: { text: "" },
              on: {
                click: function($event) {
                  return _vm.newProject()
                }
              }
            },
            [_vm._v(_vm._s(_vm.$t("PROJECT_LIBRARY_NEW_PROJECT")))]
          ),
          _vm._v(" "),
          _c("v-btn", { attrs: { text: "" }, on: { click: _vm.close } }, [
            _vm._v(_vm._s(_vm.$t("PROJECT_LIBRARY_CLOSE")))
          ])
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1595:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_AddProjectDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1596);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_AddProjectDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 1596:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'AddProjectDialog',
	data () {
		return {
			projectName: '',
			ProgLanguages:[],
			languageID:'',
			projects:[]
		};
	},
	methods: {
		enter() {
			this.newProject();
		}, 
		async newProject()
		{
			if(this.projectName === '') {
				await this.studio.workspace.showNotification ('PROJECT_NAME_PROMPT');
			} else if(this.projects.find(x => x.name === this.projectName) !== undefined) {
				await this.studio.workspace.showNotification ('PROJECT_EXISTS_PROMPT');
			} else {
				let project = await this.studio.projects.createEmptyProject(this.projectName,this.languageID);
				if (project)
				{
					this.languageID='';
					this.projectName='';				
				}
				this.close();
			}
			

			
		},
		esc() {
			this.close();
		}, 
		close ()
		{
			this.$root.$emit ('submit', undefined);
		}
	},
	async created()
	{
		this.projects = await this.studio.projects.loadProjects(false);
		this.ProgLanguages = this.studio.projects.languages;
		this.languageID = this.ProgLanguages[0].id;
	},
});


/***/ }),

/***/ 1597:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddProjectDialog_vue_vue_type_style_index_0_id_4f6a9d2a_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1598);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddProjectDialog_vue_vue_type_style_index_0_id_4f6a9d2a_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddProjectDialog_vue_vue_type_style_index_0_id_4f6a9d2a_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddProjectDialog_vue_vue_type_style_index_0_id_4f6a9d2a_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddProjectDialog_vue_vue_type_style_index_0_id_4f6a9d2a_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddProjectDialog_vue_vue_type_style_index_0_id_4f6a9d2a_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1598:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1599);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("40b48330", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 1599:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".w-100[data-v-4f6a9d2a] {\n  width: 100%;\n}\n.w-90[data-v-4f6a9d2a] {\n  width: 90%;\n}\n.w-80[data-v-4f6a9d2a] {\n  width: 80%;\n}\n.w-70[data-v-4f6a9d2a] {\n  width: 70%;\n}\n.w-60[data-v-4f6a9d2a] {\n  width: 60%;\n}\n.w-50[data-v-4f6a9d2a] {\n  width: 50%;\n}\n.w-40[data-v-4f6a9d2a] {\n  width: 40%;\n}\n.w-30[data-v-4f6a9d2a] {\n  width: 30%;\n}\n.w-20[data-v-4f6a9d2a] {\n  width: 20%;\n}\n.w-10[data-v-4f6a9d2a] {\n  width: 10%;\n}\n.hs-0[data-v-4f6a9d2a] {\n  height: 0% !important;\n}\n.hs-35[data-v-4f6a9d2a] {\n  height: 35% !important;\n}\n.hs-65[data-v-4f6a9d2a] {\n  height: 65% !important;\n}\n.hs-100[data-v-4f6a9d2a] {\n  height: calc(100vh - 158px) !important;\n}\n.rel[data-v-4f6a9d2a] {\n  position: relative;\n}\n.text-center[data-v-4f6a9d2a] {\n  text-align: center;\n}\n.text-left[data-v-4f6a9d2a] {\n  text-align: left;\n}\n.text-right[data-v-4f6a9d2a] {\n  text-align: right;\n}\n.h-top[data-v-4f6a9d2a] {\n  height: calc(100vh - 90px);\n}\n.h-top2[data-v-4f6a9d2a] {\n  height: calc(100vh - 158px);\n}\n.left[data-v-4f6a9d2a] {\n  float: left !important;\n}\n.right[data-v-4f6a9d2a] {\n  float: right !important;\n}\n.p-20[data-v-4f6a9d2a] {\n  padding: 20px;\n}\n.library-box[data-v-4f6a9d2a] {\n  overflow: hidden;\n}\n.library-box .itemlist[data-v-4f6a9d2a] {\n  width: 100%;\n}\n.library-box .v-card__text[data-v-4f6a9d2a] {\n  height: 55vh !important;\n  overflow-y: scroll;\n  overflow-x: hidden;\n}\n.library-box .v-avatar[data-v-4f6a9d2a] {\n  width: initial !important;\n  height: initial !important;\n  border-radius: 0;\n}\n.library-box a[data-v-4f6a9d2a] {\n  min-height: 130px !important;\n  height: 130px !important;\n}\n.library-box .v-list-item__title[data-v-4f6a9d2a] {\n  cursor: pointer;\n  color: #000000;\n  font-size: 16px;\n  font-weight: bold;\n  padding: 0px 0 5px 0;\n}\n.library-box .v-list-item__subtitle[data-v-4f6a9d2a] {\n  cursor: pointer;\n  color: #000000 !important;\n  padding-TOP: 5px;\n  font-size: 13px;\n}\n.library-box .projlang[data-v-4f6a9d2a] {\n  padding: 3px;\n  font-size: 10px;\n  color: #333333;\n  background: #ffffff;\n  border-radius: 4px;\n  border: #cccccc 1px solid;\n  display: inline;\n  margin: 0 0 0 5px;\n  font-weight: normal;\n  top: -5px;\n  position: relative;\n}\n.library-box .projects-container[data-v-4f6a9d2a] {\n  min-height: 400px;\n  position: relative;\n}\n.library-box .noprojmsg[data-v-4f6a9d2a] {\n  position: absolute;\n  margin: auto;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  text-align: center;\n  max-width: 300px;\n  max-height: 50px;\n}\n.library-box .noprojmsg strong[data-v-4f6a9d2a] {\n  color: #868686;\n  font-size: 21px;\n}\n.library-box .noprojmsg span[data-v-4f6a9d2a] {\n  color: #e54225;\n  font-size: 14px;\n}\n.lib-app[data-v-4f6a9d2a] {\n  padding: 15px 20px;\n  width: 33%;\n  float: left;\n}\n.lib-app .v-list-item__content[data-v-4f6a9d2a],\n.lib-app .v-list-item__title[data-v-4f6a9d2a],\n.lib-app .v-list-item__subtitle[data-v-4f6a9d2a] {\n  overflow: visible;\n}\n.lib-app[data-v-4f6a9d2a]  .v-list-item {\n  height: 75px !important;\n}\n.lib-app .projtitle[data-v-4f6a9d2a] {\n  text-overflow: ellipsis;\n  overflow: hidden !important;\n  max-width: 70%;\n  text-align: left;\n  white-space: nowrap;\n  display: inline-block;\n}\n.newapp[data-v-4f6a9d2a] {\n  border: #e54225 2px solid;\n  background: #ffffff;\n  color: #000000;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n.newapp[data-v-4f6a9d2a]:hover {\n  border: #e54225 2px solid;\n  background: #e54225;\n  color: #ffffff;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n.lib-app-btn[data-v-4f6a9d2a] {\n  background: #ffffff;\n  border: #cccccc 1px solid;\n  font-size: 12px;\n  line-height: 28px;\n  min-height: 28px;\n  padding: 0 10px;\n  margin: auto !important;\n  height: 30px !important;\n}\n.lib-app-btn[data-v-4f6a9d2a]:hover,\n.dash-btn[data-v-4f6a9d2a]:hover {\n  background: #e54225;\n  color: #ffffff;\n  border: #e54225 1px solid;\n}\n.project-lang-box[data-v-4f6a9d2a] {\n  display: block;\n  width: 100%;\n  max-height: 250px;\n  overflow: auto;\n}\n.project-lang-box .project-lang[data-v-4f6a9d2a] {\n  float: left;\n  width: 20%;\n}\n.project-lang-box .v-image[data-v-4f6a9d2a] {\n  height: 48px;\n  width: 48px;\n  margin: 10px auto;\n  position: absolute;\n  top: 40px;\n  left: 0;\n  right: 0;\n  cursor: pointer;\n}\n.project-lang-box label[data-v-4f6a9d2a] {\n  position: relative;\n}\n.project-lang-box label .v-radio[data-v-4f6a9d2a] {\n  padding: 16px 16px 70px 16px;\n  border-radius: 6px;\n  min-width: 91px;\n}\n.project-lang-box label .v-radio[data-v-4f6a9d2a]  .v-label {\n  right: 0 !important;\n  margin: auto;\n}\n.project-lang-box label .v-item--active[data-v-4f6a9d2a] {\n  background: #eaeaea;\n}\n.project-lang-box label .v-item--active[data-v-4f6a9d2a]  .v-label {\n  color: #e54225 !important;\n}\n.project-lang-box label .v-label[data-v-4f6a9d2a] {\n  justify-content: center;\n}\n.project-lang-box .v-radio[data-v-4f6a9d2a] {\n  margin: 0px !important;\n}\n.project-lang-box[data-v-4f6a9d2a]  .v-input--selection-controls__input {\n  display: none !important;\n}\n.projects-msg[data-v-4f6a9d2a] {\n  text-align: center;\n}\n.projects-msg button[data-v-4f6a9d2a] {\n  margin-top: 20%;\n  box-shadow: none;\n  background: transparent;\n  border: 2px #e54225 solid;\n  color: #000000;\n  border-radius: 6px;\n  padding: 20px 30px !important;\n  height: initial !important;\n}\n.projects-msg button[data-v-4f6a9d2a]:hover,\n.projects-msg button[data-v-4f6a9d2a]:focus,\n.projects-msg button[data-v-4f6a9d2a]:active {\n  background: #e54225 !important;\n  color: #ffffff;\n}\n.projsearch[data-v-4f6a9d2a] {\n  font-weight: 300;\n  color: #000000;\n  padding: 5px 10px 0 0 !important;\n  max-width: 250px;\n}\n.projsearch[data-v-4f6a9d2a]:hover,\n.projsearch[data-v-4f6a9d2a]:focus {\n  outline: none;\n}\n.fm-actions[data-v-4f6a9d2a] {\n  height: 60px;\n}\n.fm-actions button:hover .v-icon[data-v-4f6a9d2a] {\n  color: #e54225 !important;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 1603:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProjectsLibrary_vue_vue_type_style_index_0_id_ea475eaa_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1604);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProjectsLibrary_vue_vue_type_style_index_0_id_ea475eaa_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProjectsLibrary_vue_vue_type_style_index_0_id_ea475eaa_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProjectsLibrary_vue_vue_type_style_index_0_id_ea475eaa_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProjectsLibrary_vue_vue_type_style_index_0_id_ea475eaa_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProjectsLibrary_vue_vue_type_style_index_0_id_ea475eaa_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1604:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1605);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("bd64abf0", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 1605:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".w-100[data-v-ea475eaa] {\n  width: 100%;\n}\n.w-90[data-v-ea475eaa] {\n  width: 90%;\n}\n.w-80[data-v-ea475eaa] {\n  width: 80%;\n}\n.w-70[data-v-ea475eaa] {\n  width: 70%;\n}\n.w-60[data-v-ea475eaa] {\n  width: 60%;\n}\n.w-50[data-v-ea475eaa] {\n  width: 50%;\n}\n.w-40[data-v-ea475eaa] {\n  width: 40%;\n}\n.w-30[data-v-ea475eaa] {\n  width: 30%;\n}\n.w-20[data-v-ea475eaa] {\n  width: 20%;\n}\n.w-10[data-v-ea475eaa] {\n  width: 10%;\n}\n.hs-0[data-v-ea475eaa] {\n  height: 0% !important;\n}\n.hs-35[data-v-ea475eaa] {\n  height: 35% !important;\n}\n.hs-65[data-v-ea475eaa] {\n  height: 65% !important;\n}\n.hs-100[data-v-ea475eaa] {\n  height: calc(100vh - 158px) !important;\n}\n.rel[data-v-ea475eaa] {\n  position: relative;\n}\n.text-center[data-v-ea475eaa] {\n  text-align: center;\n}\n.text-left[data-v-ea475eaa] {\n  text-align: left;\n}\n.text-right[data-v-ea475eaa] {\n  text-align: right;\n}\n.h-top[data-v-ea475eaa] {\n  height: calc(100vh - 90px);\n}\n.h-top2[data-v-ea475eaa] {\n  height: calc(100vh - 158px);\n}\n.left[data-v-ea475eaa] {\n  float: left !important;\n}\n.right[data-v-ea475eaa] {\n  float: right !important;\n}\n.p-20[data-v-ea475eaa] {\n  padding: 20px;\n}\n.library-box[data-v-ea475eaa] {\n  overflow: hidden;\n}\n.library-box .itemlist[data-v-ea475eaa] {\n  width: 100%;\n}\n.library-box .v-card__text[data-v-ea475eaa] {\n  height: 55vh !important;\n  overflow-y: scroll;\n  overflow-x: hidden;\n}\n.library-box .v-avatar[data-v-ea475eaa] {\n  width: initial !important;\n  height: initial !important;\n  border-radius: 0;\n}\n.library-box a[data-v-ea475eaa] {\n  min-height: 130px !important;\n  height: 130px !important;\n}\n.library-box .v-list-item__title[data-v-ea475eaa] {\n  cursor: pointer;\n  color: #000000;\n  font-size: 16px;\n  font-weight: bold;\n  padding: 0px 0 5px 0;\n}\n.library-box .v-list-item__subtitle[data-v-ea475eaa] {\n  cursor: pointer;\n  color: #000000 !important;\n  padding-TOP: 5px;\n  font-size: 13px;\n}\n.library-box .projlang[data-v-ea475eaa] {\n  padding: 3px;\n  font-size: 10px;\n  color: #333333;\n  background: #ffffff;\n  border-radius: 4px;\n  border: #cccccc 1px solid;\n  display: inline;\n  margin: 0 0 0 5px;\n  font-weight: normal;\n  top: -5px;\n  position: relative;\n}\n.library-box .projects-container[data-v-ea475eaa] {\n  min-height: 400px;\n  position: relative;\n}\n.library-box .noprojmsg[data-v-ea475eaa] {\n  position: absolute;\n  margin: auto;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  text-align: center;\n  max-width: 300px;\n  max-height: 50px;\n}\n.library-box .noprojmsg strong[data-v-ea475eaa] {\n  color: #868686;\n  font-size: 21px;\n}\n.library-box .noprojmsg span[data-v-ea475eaa] {\n  color: #e54225;\n  font-size: 14px;\n}\n.lib-app[data-v-ea475eaa] {\n  padding: 15px 20px;\n  width: 33%;\n  float: left;\n}\n.lib-app .v-list-item__content[data-v-ea475eaa],\n.lib-app .v-list-item__title[data-v-ea475eaa],\n.lib-app .v-list-item__subtitle[data-v-ea475eaa] {\n  overflow: visible;\n}\n.lib-app[data-v-ea475eaa]  .v-list-item {\n  height: 75px !important;\n}\n.lib-app .projtitle[data-v-ea475eaa] {\n  text-overflow: ellipsis;\n  overflow: hidden !important;\n  max-width: 70%;\n  text-align: left;\n  white-space: nowrap;\n  display: inline-block;\n}\n.newapp[data-v-ea475eaa] {\n  border: #e54225 2px solid;\n  background: #ffffff;\n  color: #000000;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n.newapp[data-v-ea475eaa]:hover {\n  border: #e54225 2px solid;\n  background: #e54225;\n  color: #ffffff;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n.lib-app-btn[data-v-ea475eaa] {\n  background: #ffffff;\n  border: #cccccc 1px solid;\n  font-size: 12px;\n  line-height: 28px;\n  min-height: 28px;\n  padding: 0 10px;\n  margin: auto !important;\n  height: 30px !important;\n}\n.lib-app-btn[data-v-ea475eaa]:hover,\n.dash-btn[data-v-ea475eaa]:hover {\n  background: #e54225;\n  color: #ffffff;\n  border: #e54225 1px solid;\n}\n.project-lang-box[data-v-ea475eaa] {\n  display: block;\n  width: 100%;\n  max-height: 250px;\n  overflow: auto;\n}\n.project-lang-box .project-lang[data-v-ea475eaa] {\n  float: left;\n  width: 20%;\n}\n.project-lang-box .v-image[data-v-ea475eaa] {\n  height: 48px;\n  width: 48px;\n  margin: 10px auto;\n  position: absolute;\n  top: 40px;\n  left: 0;\n  right: 0;\n  cursor: pointer;\n}\n.project-lang-box label[data-v-ea475eaa] {\n  position: relative;\n}\n.project-lang-box label .v-radio[data-v-ea475eaa] {\n  padding: 16px 16px 70px 16px;\n  border-radius: 6px;\n  min-width: 91px;\n}\n.project-lang-box label .v-radio[data-v-ea475eaa]  .v-label {\n  right: 0 !important;\n  margin: auto;\n}\n.project-lang-box label .v-item--active[data-v-ea475eaa] {\n  background: #eaeaea;\n}\n.project-lang-box label .v-item--active[data-v-ea475eaa]  .v-label {\n  color: #e54225 !important;\n}\n.project-lang-box label .v-label[data-v-ea475eaa] {\n  justify-content: center;\n}\n.project-lang-box .v-radio[data-v-ea475eaa] {\n  margin: 0px !important;\n}\n.project-lang-box[data-v-ea475eaa]  .v-input--selection-controls__input {\n  display: none !important;\n}\n.projects-msg[data-v-ea475eaa] {\n  text-align: center;\n}\n.projects-msg button[data-v-ea475eaa] {\n  margin-top: 20%;\n  box-shadow: none;\n  background: transparent;\n  border: 2px #e54225 solid;\n  color: #000000;\n  border-radius: 6px;\n  padding: 20px 30px !important;\n  height: initial !important;\n}\n.projects-msg button[data-v-ea475eaa]:hover,\n.projects-msg button[data-v-ea475eaa]:focus,\n.projects-msg button[data-v-ea475eaa]:active {\n  background: #e54225 !important;\n  color: #ffffff;\n}\n.projsearch[data-v-ea475eaa] {\n  font-weight: 300;\n  color: #000000;\n  padding: 5px 10px 0 0 !important;\n  max-width: 250px;\n}\n.projsearch[data-v-ea475eaa]:hover,\n.projsearch[data-v-ea475eaa]:focus {\n  outline: none;\n}\n.fm-actions[data-v-ea475eaa] {\n  height: 60px;\n}\n.fm-actions button:hover .v-icon[data-v-ea475eaa] {\n  color: #e54225 !important;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 1607:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Application_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1608);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Application_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Application_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Application_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Application_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Application_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1608:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1609);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("1cb8dbe8", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 1609:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@charset \"utf-8\";\n.w-100 {\n  width: 100%;\n}\n.w-90 {\n  width: 90%;\n}\n.w-80 {\n  width: 80%;\n}\n.w-70 {\n  width: 70%;\n}\n.w-60 {\n  width: 60%;\n}\n.w-50 {\n  width: 50%;\n}\n.w-40 {\n  width: 40%;\n}\n.w-30 {\n  width: 30%;\n}\n.w-20 {\n  width: 20%;\n}\n.w-10 {\n  width: 10%;\n}\n.hs-0 {\n  height: 0% !important;\n}\n.hs-35 {\n  height: 35% !important;\n}\n.hs-65 {\n  height: 65% !important;\n}\n.hs-100 {\n  height: calc(100vh - 158px) !important;\n}\n.rel {\n  position: relative;\n}\n.text-center {\n  text-align: center;\n}\n.text-left {\n  text-align: left;\n}\n.text-right {\n  text-align: right;\n}\n.h-top {\n  height: calc(100vh - 90px);\n}\n.h-top2 {\n  height: calc(100vh - 158px);\n}\n.left {\n  float: left !important;\n}\n.right {\n  float: right !important;\n}\n.p-20 {\n  padding: 20px;\n}\n.blocklyTreeLabel {\n  cursor: default;\n  font-family: arial, sans-serif;\n  font-size: 14px !important;\n  color: #000000;\n}\n.blocklyTreeRow {\n  height: 26px !important;\n  border-bottom: #cccccc dotted 1px !important;\n}\n.blocklyToolboxDiv {\n  background-color: #fff !important;\n  border-right: #cccccc solid 4px !important;\n  z-index: 1;\n}\n.blocklyTreeRoot {\n  padding-left: 2px !important;\n}\n.blocklyFlyoutBackground {\n  fill: #cccccc !important;\n}\n.blocklyTreeSelected {\n  border-bottom: #000000 solid 1px !important;\n}\n.blocklyTreeIconOpen {\n  background-position: -16px -1px;\n}\n.blocklyTreeSelected > .blocklyTreeIconClosedLtr {\n  background-position: -32px -17px;\n}\n.blocklyTreeIcon {\n  height: 16px;\n  vertical-align: middle;\n  width: 16px;\n}\n.blocklyTreeRow {\n  height: 22px;\n  line-height: 22px;\n  margin-bottom: 3px;\n  padding-right: 8px;\n  white-space: nowrap;\n}\n.blocklyTreeSeparator {\n  border-bottom: none !important;\n}\n#visualPanel > .ace_editor {\n  width: 30% !important;\n  float: right !important;\n  z-index: 0 !important;\n}\n.library-box {\n  overflow: hidden;\n}\n.library-box .itemlist {\n  width: 100%;\n}\n.library-box .v-card__text {\n  height: 55vh !important;\n  overflow-y: scroll;\n  overflow-x: hidden;\n}\n.library-box .v-avatar {\n  width: initial !important;\n  height: initial !important;\n  border-radius: 0;\n}\n.library-box a {\n  min-height: 130px !important;\n  height: 130px !important;\n}\n.library-box .v-list-item__title {\n  cursor: pointer;\n  color: #000000;\n  font-size: 16px;\n  font-weight: bold;\n  padding: 0px 0 5px 0;\n}\n.library-box .v-list-item__subtitle {\n  cursor: pointer;\n  color: #000000 !important;\n  padding-TOP: 5px;\n  font-size: 13px;\n}\n.library-box .projlang {\n  padding: 3px;\n  font-size: 10px;\n  color: #333333;\n  background: #ffffff;\n  border-radius: 4px;\n  border: #cccccc 1px solid;\n  display: inline;\n  margin: 0 0 0 5px;\n  font-weight: normal;\n  top: -5px;\n  position: relative;\n}\n.library-box .projects-container {\n  min-height: 400px;\n  position: relative;\n}\n.library-box .noprojmsg {\n  position: absolute;\n  margin: auto;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  text-align: center;\n  max-width: 300px;\n  max-height: 50px;\n}\n.library-box .noprojmsg strong {\n  color: #868686;\n  font-size: 21px;\n}\n.library-box .noprojmsg span {\n  color: #e54225;\n  font-size: 14px;\n}\n.lib-app {\n  padding: 15px 20px;\n  width: 33%;\n  float: left;\n}\n.lib-app .v-list-item__content,\n.lib-app .v-list-item__title,\n.lib-app .v-list-item__subtitle {\n  overflow: visible;\n}\n.lib-app ::v-deep .v-list-item {\n  height: 75px !important;\n}\n.lib-app .projtitle {\n  text-overflow: ellipsis;\n  overflow: hidden !important;\n  max-width: 70%;\n  text-align: left;\n  white-space: nowrap;\n  display: inline-block;\n}\n.newapp {\n  border: #e54225 2px solid;\n  background: #ffffff;\n  color: #000000;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n.newapp:hover {\n  border: #e54225 2px solid;\n  background: #e54225;\n  color: #ffffff;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n.lib-app-btn {\n  background: #ffffff;\n  border: #cccccc 1px solid;\n  font-size: 12px;\n  line-height: 28px;\n  min-height: 28px;\n  padding: 0 10px;\n  margin: auto !important;\n  height: 30px !important;\n}\n.lib-app-btn:hover,\n.dash-btn:hover {\n  background: #e54225;\n  color: #ffffff;\n  border: #e54225 1px solid;\n}\n.project-lang-box {\n  display: block;\n  width: 100%;\n  max-height: 250px;\n  overflow: auto;\n}\n.project-lang-box .project-lang {\n  float: left;\n  width: 20%;\n}\n.project-lang-box .v-image {\n  height: 48px;\n  width: 48px;\n  margin: 10px auto;\n  position: absolute;\n  top: 40px;\n  left: 0;\n  right: 0;\n  cursor: pointer;\n}\n.project-lang-box label {\n  position: relative;\n}\n.project-lang-box label .v-radio {\n  padding: 16px 16px 70px 16px;\n  border-radius: 6px;\n  min-width: 91px;\n}\n.project-lang-box label .v-radio ::v-deep .v-label {\n  right: 0 !important;\n  margin: auto;\n}\n.project-lang-box label .v-item--active {\n  background: #eaeaea;\n}\n.project-lang-box label .v-item--active ::v-deep .v-label {\n  color: #e54225 !important;\n}\n.project-lang-box label .v-label {\n  justify-content: center;\n}\n.project-lang-box .v-radio {\n  margin: 0px !important;\n}\n.project-lang-box ::v-deep .v-input--selection-controls__input {\n  display: none !important;\n}\n.projects-msg {\n  text-align: center;\n}\n.projects-msg button {\n  margin-top: 20%;\n  box-shadow: none;\n  background: transparent;\n  border: 2px #e54225 solid;\n  color: #000000;\n  border-radius: 6px;\n  padding: 20px 30px !important;\n  height: initial !important;\n}\n.projects-msg button:hover,\n.projects-msg button:focus,\n.projects-msg button:active {\n  background: #e54225 !important;\n  color: #ffffff;\n}\n.projsearch {\n  font-weight: 300;\n  color: #000000;\n  padding: 5px 10px 0 0 !important;\n  max-width: 250px;\n}\n.projsearch:hover,\n.projsearch:focus {\n  outline: none;\n}\n.fm-actions {\n  height: 60px;\n}\n.fm-actions button:hover .v-icon {\n  color: #e54225 !important;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 1610:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Application_vue_vue_type_style_index_1_id_63bdaecc_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1611);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Application_vue_vue_type_style_index_1_id_63bdaecc_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Application_vue_vue_type_style_index_1_id_63bdaecc_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Application_vue_vue_type_style_index_1_id_63bdaecc_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Application_vue_vue_type_style_index_1_id_63bdaecc_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_1_0_node_modules_css_loader_dist_cjs_js_ref_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Application_vue_vue_type_style_index_1_id_63bdaecc_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1611:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1612);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(49).default
var update = add("38753fdd", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 1612:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(47);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".folder-open[data-v-63bdaecc] {\n  background: url('plugins/projects/projects/data/img/icons/32px.png') no-repeat 0px -32px !important;\n  width: 32px;\n  height: 32px;\n}\n.folder-closed[data-v-63bdaecc] {\n  background: url('plugins/projects/projects/data/img/icons/32px.png') no-repeat -64px 0px !important;\n  width: 32px;\n  height: 32px;\n}\n.file[data-v-63bdaecc] {\n  background: url('plugins/projects/projects/data/img/icons/32px.png') no-repeat -32px 0px !important;\n  width: 32px;\n  height: 32px;\n}\n.project[data-v-63bdaecc] {\n  background: url('imgs/32px.png') no-repeat -32px -64px !important;\n  width: 32px;\n  height: 32x;\n}\n.v-treeview-node__content[data-v-63bdaecc] {\n  width: 100% !important;\n  min-height: 40px !important;\n  padding-left: 0px !important;\n  padding-right: 0px !important;\n}\n.v-treeview-node__root[data-v-63bdaecc] {\n  width: 100% !important;\n  min-height: 40px !important;\n  padding-left: 0px !important;\n  padding-right: 0px !important;\n}\n.v-treeview--dense .v-treeview-node__root[data-v-63bdaecc] {\n  width: 100% !important;\n}\n.v-treeview-node--leaf > .v-treeview-node__root[data-v-63bdaecc] {\n  padding-left: 0px !important;\n  padding-right: 0px !important;\n}\n.v-treeview-node__root .v-treeview-node--active .primary--text[data-v-63bdaecc] {\n  width: 100% !important;\n  min-height: 40px !important;\n  padding-left: 0px !important;\n  padding-right: 0px !important;\n}\n.multipane.foo.layout-v .multipane-resizer[data-v-63bdaecc] {\n  margin: 0;\n  left: 0;\n  /* reset default styling */\n  width: 15px;\n  background: blue;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 1614:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
	namespaced: true,
	state:
	{
		currentProject: '',
		currentFile: '',
		editors:[],
		currentEditor:'',
	},
	getters:
	{
		currentProject: (state) => state.currentProject,
		currentFile: (state) => state.currentFile,
		editors: (state) => state.editors,
		currentEditor: (state) => state.currentEditor
	},
	actions:
	{
		currentProject: ({commit}, currentProject) => commit ('currentProject', currentProject),
		currentFile: ({commit}, currentFile) => commit ('currentFile', currentFile),
		editors: ({commit}, editors) => commit ('editors', [...editors]),
		currentEditor: ({commit}, currentEditor) => commit ('currentEditor', currentEditor)
	},
	mutations:
	{
		currentProject: (state, value) => state.currentProject = value,
		currentFile: (state, value) => state.currentFile = value,
		editors: (state, value) => state.editors = value,
		currentEditor: (state, value) => state.currentEditor = value
	}
});

/***/ })

}]);