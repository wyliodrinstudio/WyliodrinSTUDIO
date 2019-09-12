<template>
	<v-card class="manager-box">
		<v-card-title>
			<span class="headline">/wyliodrin (aici vine calea)</span>
			<v-spacer></v-spacer>
			<v-tooltip bottom>
				<template #activator="data">
					<v-btn text class="icon-btn-lg" aria-label="Refresh">
						<v-img src="img/icons/refresh-icon.svg" aria-label="Refreshr" v-on="data.on"></v-img>
					</v-btn>
				</template>
				<span>{{$t('DEVICE_WYAPP_REFRESH')}}</span>
			</v-tooltip>
		</v-card-title>
		<v-card-text>
			<div :class="projectTree" class="project-tree-on">
			<template>
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
							<v-img contain :src="getPictogram(item.path)" avatar ></v-img>
						</p>
						<p v-else-if="open && item.name" class="folder-open" text @contextmenu="fileItem = item,showFolder($event)">
							
						</p>
						<p v-else-if="item.name" class="folder-closed" text @contextmenu="fileItem = item,showFolder($event)">

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
			</template>
			</div>
			<div :class="editorBox" class="hs-100">
				<p>The project has no files, create one</p>	
			</div>
		</v-card-text>
		<v-card-actions>
			<div class="onofftoggle">
				<v-switch v-model="switch1"  label="Show Hidden"></v-switch>
			</div>
			<v-spacer></v-spacer>
			<!-- <div class="file-manager-actions">
				<v-tooltip top>
					<template #activator="data">
						<v-btn text class="fileexplorer-actions" aria-label="New Folder">
							<v-img src="img/icons/new-folder-icon.svg" aria-label="New Folder" v-on="data.on"></v-img>
						</v-btn>
					</template>
					<span>{{$t('DEVICE_WYAPP_RENAME')}}</span>
				</v-tooltip>
				<v-tooltip top>
					<template #activator="data">
						<v-btn text class="fileexplorer-actions" aria-label="Upload Here">
							<v-img src="img/icons/upload-icon.svg" aria-label="Upload Here" v-on="data.on"></v-img>
						</v-btn>
					</template>
					<span>{{$t('DEVICE_WYAPP_NEW_FIRMWARE')}}</span>
				</v-tooltip>
			</div> -->
			<v-btn text @click="close">{{$t('CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
const mapGetters = require ('vuex').mapGetters;
module.exports = {
	name: 'FileManager',
	props: ['show'],
	data () {
		return {
			open: ['public'],
			files: {
				html: 'mdi-language-html5',
				js: 'mdi-nodejs',
				json: 'mdi-json',
				md: 'mdi-markdown',
				pdf: 'mdi-file-pdf',
				png: 'mdi-file-image',
				txt: 'mdi-file-document-outline',
				xls: 'mdi-file-excel'
			},
			tree: [],
			items: [
				{
					name: '.git'
				},
				{
					name: 'node_modules'
				},
				{
					name: 'public',
					children: [
						{
							name: 'static',
							children: [{
								name: 'logo.png',
								file: 'png'
							}]
						},
						{
							name: 'favicon.ico',
							file: 'png'
						},
						{
							name: 'index.html',
							file: 'html'
						}
					]
				},
				{
					name: '.gitignore',
					file: 'txt'
				},
				{
					name: 'babel.config.js',
					file: 'js'
				},
				{
					name: 'package.json',
					file: 'json'
				},
				{
					name: 'README.md',
					file: 'md'
				},
				{
					name: 'vue.config.js',
					file: 'js'
				},
				{
					name: 'yarn.lock',
					file: 'txt'
				}
			],
			switch1:false,
			fileMenu: false,
			folderMenu:false,
			fileItem: null
		};
	},
	computed: {
		...mapGetters ({
			device: 'link/device'//,
			//connection: 'link/connection'
		}),
	},
	created () {
		
	},
	destroyed ()
	{
		
	},
	methods: {
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
		close ()
		{
			this.$root.$emit ('submit');
		},
		esc() {
			this.close();
		}, 
	}
};
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
</style>
