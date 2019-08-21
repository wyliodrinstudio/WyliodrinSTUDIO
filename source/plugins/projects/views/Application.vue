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
					>
					
					<template v-slot:label="{item, open}">        
						<v-btn v-if="!item.file" text @contextmenu="fileItem = item,showFolder($event)"> 
							<v-icon>
							{{ open ? 'mdi-folder-open' : 'mdi-folder' }}
							</v-icon>
							{{item.name}}                  
						</v-btn>
						<v-btn v-else text @click="fileItem = item,changeSource(item)" @contextmenu="fileItem = item,showFile($event)">
							<v-icon>
							{{ files[item.file] }}
							</v-icon>
							{{item.name}} 
						</v-btn>
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
		</div>
	</div>
	<div v-else>
		<div class="projects-msg">
			<v-btn>{{$t('PROJECT_LOAD_PROJECT')}}</v-btn>
		</div>
	</div>
</template>

<style lang="less">
	@import "../style/blockly-style.less";
	@import "../style/projectlibrary.less";
</style>

<script>
import { mapGetters } from 'vuex';
import path from 'path';
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
				html: 'mdi-language-html5',
				js: 'mdi-nodejs',
				json: 'mdi-json',
				md: 'mdi-markdown',
				pdf: 'mdi-file-pdf',
				png: 'mdi-file-image',
				txt: 'mdi-file-document-outline',
				xls: 'mdi-file-excel',
				visual: 'mdi-file-visual'
			},
			tree: [],
			items:[],
			type:null,
			fileMenu: false,
			folderMenu:false,
			x: 0,
			y: 0,
			menuItems: ['create file', 'create directory','delete file','delete directory'],

			showConsole: false
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
			if (this.currentFile)
			{
				let extension = path.extname (this.currentFile).substring (1);
				for (let editor of this.editors) {
					for (let lang of editor.languages) {
						if (lang === extension) {
							return editor.component;
						}
					}
				}
			}
			return null;
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
		_clickAction(item){
			
		},
		async _spatiu(){
			await this.studio.projects.getCurrentFileCode();	
		},
		showFile(e) {
			this.fileMenu = false;
			this.folderMenu = false;
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
			e.preventDefault();
			this.folderMenu = false;
			this.x = e.clientX;
			this.y = e.clientY;
			this.$nextTick(() => {
				this.folderMenu = true;
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

