<template>
	<div v-if="currentProject">
		<div>
			<div layout="row">
				<div :class="treeShow" class="tree-show" v-if="advanced">
					<v-btn text @click="changeClassHide">
						<img src="plugins/projects/data/img/filem-hide.png" >
					</v-btn>
				</div>
				<div :class="treeHide" class="tree-hide" v-if="advanced">
					<v-btn text @click="changeClassShow">
						<img src="plugins/projects/data/img/filem-show.png" >
					</v-btn>
				</div>
				
				<div :class="projectTree" class="project-tree-on" v-if="advanced">
					<v-app id="inspire">
					<v-treeview
					v-model="tree"
					:open="open"
					:items="items"
					item-key="name"
					:open-on-click="true"
					>
					<template v-slot:prepend="{item, open}">
						<p v-if="item.name === currentProject.name" @contextmenu="fileItem = item,showProject($event)">
							<v-img contain :src="languageImage()" avatar ></v-img>
						</p>
						<p v-else-if="item.file !== undefined" @click="fileItem = item,changeSource(item)" @contextmenu="fileItem = item,showFile($event)">
							<v-img contain :src="getPictogram(item.name)" avatar ></v-img>
						</p>
						<p v-else-if="open && item.name !== currentProject.name" class="folder-open" text @contextmenu="fileItem = item,showFolder($event)">
							
						</p>
						<p v-else-if="item.name !== currentProject.name" class="folder-closed" text @contextmenu="fileItem = item,showFolder($event)">

						</p>
						<v-menu
							v-model="projectMenu"
							:position-x="x"
							:position-y="y"
							absolute
							offset-y
							>
								<v-list>
									<v-list-item @click="newFolder(fileItem)">
										<v-list-item-title>{{$t('PROJECT_NEW_FOLDER')}}</v-list-item-title>
									</v-list-item>
									<v-list-item @click="newFile(fileItem)">
										<v-list-item-title>{{$t('PROJECT_NEW_FILE')}}</v-list-item-title>
									</v-list-item>
									<v-list-item @click="importFile(fileItem)">
										<v-list-item-title>{{$t('PROJECT_IMPORT_FILE')}}</v-list-item-title>
									</v-list-item>
								</v-list>
							</v-menu>

						<v-menu
							v-model="folderMenu"
							:position-x="x"
							:position-y="y"
							absolute
							offset-y
							>
								<v-list>
									<v-list-item @click="deleteFolder(fileItem)">
										<v-list-item-title>{{$t('PROJECT_DELETE_FOLDER')}}</v-list-item-title>
									</v-list-item>
									<v-list-item @click="renameObject(fileItem)">
										<v-list-item-title>{{$t('PROJECT_RENAME_FOLDER')}}</v-list-item-title>
									</v-list-item>
									<v-list-item @click="newFolder(fileItem)">
										<v-list-item-title>{{$t('PROJECT_NEW_FOLDER')}}</v-list-item-title>
									</v-list-item>
									<v-list-item @click="newFile(fileItem)">
										<v-list-item-title>{{$t('PROJECT_NEW_FILE')}}</v-list-item-title>
									</v-list-item>
									<v-list-item @click="importFile(fileItem)">
										<v-list-item-title>{{$t('PROJECT_IMPORT_FILE')}}</v-list-item-title>
									</v-list-item>
								</v-list>
							</v-menu>

							<v-menu
							v-model="fileMenu"
							:position-x="x"
							:position-y="y"
							absolute
							offset-y
							>
								<v-list>
									<v-list-item @click="deleteFile(fileItem)">
										<v-list-item-title>{{$t('PROJECT_DELETE_FILE')}}</v-list-item-title>
									</v-list-item>
									<v-list-item @click="renameObject(fileItem)">
										<v-list-item-title>{{$t('PROJECT_RENAME_FILE')}}</v-list-item-title>
									</v-list-item>
									<v-list-item @click="exportFile(fileItem)">
										<v-list-item-title>{{$t('PROJECT_EXPORT_FILE')}}</v-list-item-title>
									</v-list-item>
								</v-list>
							</v-menu>
					</template>
					<template v-slot:label="{item, open}">
						<p style="width:100%;" v-if="item.file  === undefined && item.name === currentProject.name" text @contextmenu="fileItem = item,showProject($event)"> 
							{{item.name}}                  
						</p>
						<p style="width:100%;" v-else-if="item.file  === undefined && item.name !== currentProject.name" text @contextmenu="fileItem = item,showFolder($event)"> 
							{{item.name}}                  
						</p>
						<p v-else style="width:100%;" text @click="fileItem = item,changeSource(item)" @contextmenu="fileItem = item,showFile($event)">
							{{item.name}} 
						</p>
						<v-menu
							v-model="projectMenu"
							:position-x="x"
							:position-y="y"
							absolute
							offset-y
							>
								<v-list>
									<v-list-item @click="newFolder(fileItem)">
										<v-list-item-title>{{$t('PROJECT_NEW_FOLDER')}}</v-list-item-title>
									</v-list-item>
									<v-list-item @click="newFile(fileItem)">
										<v-list-item-title>{{$t('PROJECT_NEW_FILE')}}</v-list-item-title>
									</v-list-item>
									<v-list-item @click="importFile(fileItem)">
										<v-list-item-title>{{$t('PROJECT_IMPORT_FILE')}}</v-list-item-title>
									</v-list-item>
								</v-list>
							</v-menu>

						<v-menu
							v-model="folderMenu"
							:position-x="x"
							:position-y="y"
							absolute
							offset-y
							>
								<v-list>
									<v-list-item @click="deleteFolder(fileItem)">
										<v-list-item-title>{{$t('PROJECT_DELETE_FOLDER')}}</v-list-item-title>
									</v-list-item>
									<v-list-item @click="renameObject(fileItem)">
										<v-list-item-title>{{$t('PROJECT_RENAME_FOLDER')}}</v-list-item-title>
									</v-list-item>
									<v-list-item @click="newFolder(fileItem)">
										<v-list-item-title>{{$t('PROJECT_NEW_FOLDER')}}</v-list-item-title>
									</v-list-item>
									<v-list-item @click="newFile(fileItem)">
										<v-list-item-title>{{$t('PROJECT_NEW_FILE')}}</v-list-item-title>
									</v-list-item>
									<v-list-item @click="importFile(fileItem)">
										<v-list-item-title>{{$t('PROJECT_IMPORT_FILE')}}</v-list-item-title>
									</v-list-item>
								</v-list>
							</v-menu>

							<v-menu
							v-model="fileMenu"
							:position-x="x"
							:position-y="y"
							absolute
							offset-y
							>
								<v-list>
									<v-list-item @click="deleteFile(fileItem)">
										<v-list-item-title>{{$t('PROJECT_DELETE_FILE')}}</v-list-item-title>
									</v-list-item>
									<v-list-item @click="renameObject(fileItem)">
										<v-list-item-title>{{$t('PROJECT_RENAME_FILE')}}</v-list-item-title>
									</v-list-item>
									<v-list-item @click="exportFile(fileItem)">
										<v-list-item-title>{{$t('PROJECT_EXPORT_FILE')}}</v-list-item-title>
									</v-list-item>
								</v-list>
							</v-menu>
					</template>
					
					</v-treeview>
						
				</v-app>
				</div> 
			</div>
			<!--  -->
		</div>
		<div :class="editorBox" class="hs-100">
			<component v-if="currentEditor && currentFile" :is="currentEditor" :project="currentProject" :filename="currentFile" :active="active"></component>
			<p v-else-if="currentFile === null">The project has no files, create one</p>	
		</div>
	</div>
	<div v-else>
		<div class="projects-msg">
			<v-btn @click="projectLibrary()">{{$t('PROJECT_LOAD_PROJECT')}}</v-btn>
		</div>
	</div>
</template>

<style lang="less">
	@import "../style/blockly-style.less";
	@import "../style/projectlibrary.less";
</style>

<script>
//is file function in care sa fie logica
// de trimis ace even
import { mapGetters } from 'vuex';
import path from 'path';
import ProjectsLibrary from './ProjectsLibrary.vue';

export default {
	name: 'Application',
	props: ['active'],
	data () {
		return {
			extension: '',
			source: '',
			folder:'',

			fileItem:'',
			tabs:[],
			tabItem:null,

			previous:[],

			showTree: this.advanced,

			open: ['public'],
			files: {
				html: 'mdi_language_html5',
				js: 'mdi_nodejs',
				json: 'mdi_json',
				md: 'mdi_markdown',
				pdf: 'mdi_file_pdf',
				png: 'mdi_file_image',
				txt: 'mdi_file_document_outline',
				xls: 'mdi_file_excel',
				visual: 'mdi_file_visual'
			},
			tree: [],
			items:[],
			type:null,
			fileMenu: false,
			folderMenu:false,
			projectMenu:false,
			x: 0,
			y: 0,
			menuItems: ['create file', 'create directory','delete file','delete directory'],

			showConsole: false,
			baseFileIcon:'plugins/projects/data/img/icons/file.png',
		};
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
		
		...mapGetters ({
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
				let extension = path.extname (this.currentFile).substring (1);
				for (let editor of this.editors) {
					for (let lang of editor.languages) {
						if( lang === 'js' ){
							baseEditor = editor.component;
						}
						if (lang === extension) {
							return editor.component;
						}
					}
				}
			}
			return baseEditor;
		}
	},
	watch: {
		currentFile ()
		{
			this.dirTree(this.currentProject);
		},
		async source ()
		{
			await this.studio.projects.saveFile(this.currentProject,this.currentFile,this.source);
		},
		async mode()
		{
			// if(this.mode===true){
			// 	await this.changeSource({
			// 		name:('main'+this.extension),
			// 		file:this.extension,
			// 		path:('main'+this.extension)
			// 	})
			// }
			this.showTree = this.advanced;
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
		languageImage ()
		{
			// TODO check if language is known, not only that it exists
			let language = this.studio.projects.getLanguage(this.currentProject.language);
			let addons = language.addons;
			let device = this.studio.workspace.getDevice ();
			let type = device.type;
			let board = device.board;
			if(type !== 'none' && board !== 'none' && addons[type + ':' + board] && addons[type + ':' + board].icon) {
				return addons[type + ':' + board].icon;
			} else if (addons && board !== 'none' && addons['*:' + board] && addons['*:' + board].icon) {
				return addons['*:' + board].icon;
			} else if (addons && type !== 'none' && addons[type + ':*'] && addons[type + ':*'].icon) {
				return addons[type + ':*'].icon;
			} else if (this.currentProject.language && type === 'none' && board === 'none' ){
				return language.icon;
			} else return 'unknown';
		},
		iteratePictograms(pictograms, filename) {
			if(pictograms && pictograms.length > 0) {
				for( let pict of pictograms) {
					if(pict.extension && ext === pict.extension) {
						return pict.icon;
					} else if(pict.filename && filename.split('.').slice(0, -1).join('.').match(pict.filename)) {
						return pict.icon;
					}
				}
				return this.baseFileIcon;
			}
		},
		getPictogram(filename)
		{
			let language = this.studio.projects.getLanguage(this.currentProject.language);
			let addons = language.addons;
			let pictograms = language.pictograms;
			
			let ext = path.extname(filename);
			let device = this.studio.workspace.getDevice ();
			let type = device.type;
			let board = device.board;
			if(type !== 'none' && board !== 'none' && addons[type + ':' + board]) {
				let addonPictograms = addons[type + ':' + board].pictograms;
				if(addonPictograms && addonPictograms.length > 0) {
					for( let pict of addonPictograms) {
						if(pict.extension && ext === pict.extension) {
							return pict.icon;
						} else if(pict.filename && filename.match(pict.filename)) {
							return pict.icon;
						}
					}
				}
				
			} else if (addons && board !== 'none' && addons['*:' + board]) {
				let addonPictograms = addons['*:' + board].pictograms;
				if(addonPictograms && addonPictograms.length > 0) {
					for( let pict of addonPictograms) {
						if(pict.extension && ext === pict.extension) {
							return pict.icon;
						} else if(pict.filename && filename.match(pict.filename)) {
							
							return pict.icon;
						}
					}
				}
			} else if (addons && type !== 'none' && addons[type + ':*']) {
				let addonPictograms = addons[type + ':*'].pictograms;
				if(addonPictograms && addonPictograms.length > 0) {
					for( let pict of addonPictograms) {
						if(pict.extension && ext === pict.extension) {
							return pict.icon;
						} else if(pict.filename && filename.match(pict.filename)) {
					
							return pict.icon;
						}
					}
				}
			} else if(type === 'none' && board === 'none') {
				if(pictograms && pictograms.length > 0) {
					for( let pict of pictograms) {
						if(pict.extension && ext === pict.extension) {
							return pict.icon;
						} else if(pict.filename && filename.match(pict.filename)) {
							return pict.icon;
						}
					}
				}
			}
			return this.baseFileIcon;
			
		},
		showFile(e) {
			this.fileMenu = false;
			this.folderMenu = false;
			this.projectMenu = false;
			e.preventDefault();
			this.fileMenu = false;
			this.x = e.clientX;
			this.y = e.clientY;
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
			this.y = e.clientY;
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
			this.y = e.clientY;
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
			this.changed=true;
			await this.studio.projects.changeFile(item.path);
		},
		async dirTree() 
		{
			if (this.currentProject)
			{
				let filename = this.currentProject.folder;
				if(this.items != this.previous){
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
				let root = [{
					name:path.basename(filename),
					children:files,
					path:filename.replace(this.currentProject.folder, '')
				}];
				this.items = root;
				this.previous = this.items;
				console.log(this.items);
			}
		},
		async newFolder (item)
		{
			let folderName = await this.studio.workspace.showPrompt ('PROJECT_NEW_FOLDER', 'PROJECT_NEW_FOLDER_NAME', '', 'PROJECT_NEW_NAME');
			if (folderName)
			{
				await this.studio.projects.newFolder(this.currentProject,path.join(item.path,folderName));
				await this.refresh();
			}
		},
		async newFile (item)
		{
			let fileName = await this.studio.workspace.showPrompt ('PROJECT_NEW_FILE', 'PROJECT_NEW_FILE_NAME', '', 'PROJECT_NEW_NAME');
			if (fileName)
			{
				await this.studio.projects.newFile(this.currentProject,path.join(item.path,fileName));
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
				filetypes:[]
			});
			if (files.length > 0)
			{
				// use first file
				let fileData = await this.studio.filesystem.readImportFile (files[0]);
				if(files) {
					let filePath = path.join(item.path,path.basename(files[0].name));
					console.log(files[0].name);
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
					await this.studio.projects.renameObject(this.currentProject,newName,item.path);
					await this.refresh();
				}
			}
			else
			{
				let newName = await this.studio.workspace.showPrompt ('PROJECT_RENAME_FILE', 'PROJECT_NEW_FILE_NAME', item.name, 'PROJECT_NEW_NAME');
				if (newName)
				{
					await this.studio.projects.renameObject(this.currentProject,newName,item.path);
					await this.refresh();
				}
			}
		},
		async deleteFile (item)
		{
			let allow = await this.studio.workspace.showConfirmationPrompt ('PROJECT_DELETE_FILE', 'PROJECT_FILE_SURE');
			if (allow)
			{
				await this.studio.projects.deleteFile(this.currentProject,item.path);
				await this.refresh();
			}
		},
		async deleteFolder (item)
		{
			let allow = await this.studio.workspace.showConfirmationPrompt ('PROJECT_DELETE_FOLDER', 'PROJECT_FOLDER_SURE');
			if (allow)
			{
				await this.studio.projects.deleteFolder(this.currentProject,item.path);
				await this.refresh();
			}
		},
		/////
		async refresh(){
			await this.dirTree(this.currentProject.folder);
		},
		projectLibrary(){
			this.studio.workspace.showDialog(ProjectsLibrary, {
				width: 1000
			});
		}
		
		// async newFirmware(){

		// }
	},
	async created ()
	{
		await this.studio.projects.loadPreviousSelectedCurrentProject();
		// await this.dirTree(this.currentFile);
		
	}
}
	
</script>

<style lang="less" scoped>

.folder-open {
background: url('plugins/projects/data/img/icons/32px.png') no-repeat 0px -32px !important;
	width: 32px;
	height: 32px;
}

.folder-closed {
background: url('plugins/projects/data/img/icons/32px.png') no-repeat -64px 0px !important;
	width: 32px;
	height: 32px;
}
.file {
background: url('plugins/projects/data/img/icons/32px.png') no-repeat -32px 0px !important;
	width: 32px;
	height: 32px;
}
.project {
	background: url('imgs/32px.png') no-repeat -32px -64px !important;
	width: 32px;
	height: 32x;
}

</style>

