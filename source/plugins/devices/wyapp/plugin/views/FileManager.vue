<template>
	<v-card class="manager-box">
		<v-card-title>
			<span class="headline" v-if="menuItem===null">{{$t('DEVICE_WYAPP_NO_DIRECTORY')}}</span>
			<span class="headline" v-else>{{menuItem.path}}</span>
			<v-spacer></v-spacer>
			<v-tooltip bottom>
				<!-- eslint-disable-next-line vue/no-unused-vars -->
				<template #activator="data">
					<v-btn text class="title-icon-btn" aria-label="Refresh" >
						<v-img contain src="plugins/devices/wyapp/plugin/data/img/icons/refresh-icon.svg"></v-img>
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
					dense
					:items="items"
					:load-children="fetchContent"
					:open.sync="open"
					open-on-click		
					item-key="key"
					>
					
					<template v-slot:label="{item, open}"	>
						<div v-if="item.name === 'DEVICE_WYAPP_FILESYSTEM'">
							<p style="width:100%;" @click="menuItem = item, fileItem = item" v-if="item.file  === undefined && open" text @contextmenu="fileItem = item,showFolder($event)"> 
								<v-icon>mdi-folder-open</v-icon>{{$t(item.name)}}          
							</p>
							<p style="width:100%;" @click="menuItem = item, fileItem = item" v-else-if="item.file  === undefined" text @contextmenu="fileItem = item,showFolder($event)"> 
								<v-icon>mdi-folder</v-icon>{{$t(item.name)}}
							</p>
							<p v-else style="width:100%;" @click="fileItem = item" text @contextmenu="fileItem = item,showFile($event)">
								<v-icon>mdi-file</v-icon>{{item.name}}
							</p>
						</div>
						<div v-else>
							<p style="width:100%;" @click="menuItem = item, fileItem = item" v-if="item.file  === undefined && open" text @contextmenu="fileItem = item,showFolder($event)"> 
								<v-icon>mdi-folder-open</v-icon>{{item.name}}          
							</p>
							<p style="width:100%;" @click="menuItem = item, fileItem = item" v-else-if="item.file  === undefined" text @contextmenu="fileItem = item,showFolder($event)"> 
								<v-icon>mdi-folder</v-icon>{{item.name}}
							</p>
							<p v-else style="width:100%;" @click="fileItem = item" text @contextmenu="fileItem = item,showFile($event)">
								<v-icon>mdi-file</v-icon>{{item.name}}
							</p>
						</div>
					</template>
					
					</v-treeview>
			</template>
			</div>
			<div :class="editorBox" class="hs-100">
				<v-list>
					<v-list-item-group v-if="menuItem !== null && menuItem.children !== undefined" v-model="item" color="primary">
						<v-list-item v-for="item in menuItem.children" :key="item.key">
							<v-list-item-icon>
								<p v-if="item.file !== undefined" @click="fileItem = item" @contextmenu="fileItem = item,showFile($event)">
									<v-icon>mdi-file</v-icon>
								</p>
								<p v-else-if="item.name" @click="menuItem = item" text @contextmenu="fileItem = item,showFolder($event)">
									<v-icon>mdi-folder</v-icon>
								</p>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title v-if="item.file !== undefined" v-text="item.name" @click="fileItem = item" @contextmenu="fileItem = item,showFile($event)"></v-list-item-title>
								<v-list-item-title v-else-if="item.name" v-text="item.name" @click="menuItem = item, fetchContent(item)" text @contextmenu="fileItem = item,showFolder($event)"></v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-item-group>
				</v-list>
			</div>
		</v-card-text>
		<v-card-actions>
			<!-- <div class="onofftoggle">
				<v-switch v-model="switch1"  label="Show Hidden"></v-switch>
			</div> -->
			<span v-if="fileItem !== null" >{{fileItem.name}}</span>
			<v-spacer></v-spacer>
			<v-btn v-if="fileItem !== null && fileItem.children !== undefined && fileItem.name !== $t('DEVICE_WYAPP_FILESYSTEM')" text class="fileexplorer-actions" @click="deleteObject">
				{{$t('PROJECT_DELETE_FOLDER')}}
			</v-btn>
			<v-btn v-if="fileItem !== null && fileItem.children !== undefined && fileItem.name !== $t('DEVICE_WYAPP_FILESYSTEM')" text class="fileexplorer-actions" @click="rename">
				{{$t('PROJECT_RENAME_FOLDER')}}
			</v-btn>
			<v-btn v-if="fileItem !== null && fileItem.children !== undefined && fileItem.name !== $t('DEVICE_WYAPP_FILESYSTEM')" text class="fileexplorer-actions" @click="newFolder">
				{{$t('PROJECT_NEW_FOLDER')}}
			</v-btn>
			<v-btn v-if="fileItem !== null && fileItem.children !== undefined && fileItem.name !== $t('DEVICE_WYAPP_FILESYSTEM')" text class="fileexplorer-actions" @click="upload">
				{{$t('PROJECT_IMPORT_FILE')}}
			</v-btn>

			<v-btn v-else-if="fileItem !== null && fileItem.file !== undefined" text class="fileexplorer-actions" @click="deleteObject">
				{{$t('PROJECT_DELETE_FILE')}}
			</v-btn>
			<v-btn v-else-if="fileItem !== null && fileItem.file !== undefined" text class="fileexplorer-actions" @click="rename">
				{{$t('PROJECT_RENAME_FILE')}}
			</v-btn>
			<v-btn v-else-if="fileItem !== null && fileItem.file !== undefined" text class="fileexplorer-actions" @click="download">
				{{$t('PROJECT_EXPORT_FILE')}}
			</v-btn>
			
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
import path from 'path';
export default {
	name: 'FileManager',
	props: ['connection'],
	data () {
		return {
			open: ['public'],
			tree: [],
			items: [{
				name:'DEVICE_WYAPP_FILESYSTEM',
				children:[],
				path:'/',
				size:0,
				key:'FILESYSTEM'+0+'root'

			}],
			switch1:false,
			fileMenu: false,
			folderMenu:false,
			fileItem:null,
			menuItem:null,
			newData:null,
			cwdArray:[],
			resolve:null,
			cwd:'/',
			x: 0,
			y: 0,
			item:1,
		};
	},
	computed: {
		...mapGetters ({
			device: 'link/device'//,
			//connection: 'link/connection'
		}),
		projectTree ()
		{
			return 'project-tree-on';
		},
		editorBox ()
		{
			return 'project-box-1';
		},
	},
	watch: {
		async newData(){
			await this.updateFileTree(this.newData,this.fileItem);
		},
		// fileItem() {
		// 	console.log(this.fileItem);
		// }

	},
	async created () {

		this.connection.on('tag:fe1',this.update);
		this.connection.on('tag:fe3',await this.saveFileDialog);
		this.connection.on('tag:fe6',this.error);
		this.connection.on('tag:fe7',this.error);
	},
	mounted() {
		this.items[0].name = this.$t(this.items[0].name);
	},
	async destroyed ()
	{
		this.connection.removeListener('tag:fe1',this.update);
		this.connection.removeListener('tag:fe3',await this.saveFileDialog);
		this.connection.removeListener('tag:fe6',this.error);
		this.connection.removeListener('tag:fe7',this.error);
	},
	methods: {
		list(cwd){
			this.connection.send('fe', {
				a: 'ls',
				b:cwd
			});
		},
		async saveFileDialog(data){
			let newData1 = Buffer.from(data.f);
			await this.studio.projects.downloadFile(this.fileItem.name,newData1);
		},
		download() {
			//downlaod in fereastra glisanta
			//max 3000 biti ~= 32kb MAXKPACKET
			//
			this.connection.send('fe', {
				a:'down',
				b:this.cwd,
				c:this.fileItem.name,
				z:0,
				size:this.fileItem.size
			});
		},
		async upload(){
			let files = await this.studio.filesystem.openImportDialog({
				title:'Import',
				filetypes:[]
			});
			if (files.length > 0)
			{
				// use first file
				let fileData = await this.studio.filesystem.readImportFile (files[0]);
				let name = files[0].name;
				this.connection.send('fe',{
					a:'up',
					b:this.cwd,
					c:path.basename(name),
					d:fileData,
					t:'w',
					end:true
				});
			}
			this.connection.send('fe', {
				a: 'ls',
				b:this.cwd
			});
			
		},
		refresh(){
			//TODO optimize file changes
			this.items[0].children = [];
			this.fileItem=this.items[0];
			this.cwd='/';
			this.cwdArray=[];
			this.menuItem = null;
			this.connection.send('fe', {
				a: 'ls',
				b:'/'
			});	
		},
		async deleteObject(){
			//SHOW YOU SURE POPUP
			let allow = await this.studio.workspace.showConfirmationPrompt ('PROJECT_DELETE_FILE', 'PROJECT_FILE_SURE');
			let parent = path.dirname(this.fileItem.path);
			if(allow){
				this.connection.send('fe',{
					a:'del',
					b:parent,
					c:this.fileItem.name,
				});
				this.refresh();
			}			
		},
		async rename(){
			let parent = path.dirname(this.fileItem.path);
			if (this.fileItem.children)
			{
				let newName = await this.studio.workspace.showPrompt ('PROJECT_RENAME_FOLDER', 'PROJECT_NEW_FOLDER_NAME', this.fileItem.name, 'PROJECT_NEW_NAME');
				
				if (newName)
				{
					this.connection.send('fe',{
						a:'ren',
						b:parent,
						c:this.fileItem.name,
						d:newName
					});
					this.refresh();
				}
			}
			else
			{

				let newName = await this.studio.workspace.showPrompt ('PROJECT_RENAME_FILE', 'PROJECT_NEW_FILE_NAME', this.fileItem.name, 'PROJECT_NEW_NAME');
				if (newName)
				{
					this.connection.send('fe',{
						a:'ren',
						b:parent,
						c:this.fileItem.name,
						d:newName
					});
					this.refresh();
				}
			}
			

		},
		async newFolder(){
			let folderName = await this.studio.workspace.showPrompt ('PROJECT_NEW_FOLDER', 'PROJECT_NEW_FOLDER_NAME', '', 'PROJECT_NEW_NAME');
			if (folderName)
			{
				this.connection.send('fe',{
					a:'newf',
					b:this.fileItem.path,
					c:folderName,
				});
				this.refresh();

			}			

		},
		update(data){
			this.newData=data;			
		},
		error(data){
			//TODO show notification
			this.studio.error (data);
		},
		updateFileTree(data, tree){
			tree.children = [];
			if(data) {
				for(let item of data) {
					if(item.isdir) {
						tree.children.push({
							name: item.name,
							children:[],
							path:this.cwd+item.name+'/',
							size:item.size,
							key: item.name+item.size+'folder',
						});
					} else if(item.isfile) {
						tree.children.push({
							name:item.name,
							file:path.extname(item.name),
							path:this.cwd+item.name+'/',
							size:item.size,
							key:item.name+item.size+'file',
						});
					} else if(item.islink) {
						tree.children.push({
							name:item.name,
							link:true,
							path:this.cwd+item.name+'/',
							size:item.size,
							key:item.name+item.size+'link',
						});
					}	
				}
				this.studio.projects.sort(tree.children);
				if(this.resolve){
					this.resolve();
					this.resolve = null;
				}
				
			}
		},
		_isChildOf(child,parent) {
			if (child === parent) return false;
			const parentTokens = parent.split(path.sep).filter(i => i.length);
			return parentTokens.every((t, i) => child.split(path.sep)[i] === t);
		},
		fetchContent(item){
			this.cwd=item.path;
			if(!this.cwdArray.includes(this.cwd)){
				this.cwdArray.push(this.cwd);
				this.fileItem=item;
				this.connection.send('fe', {
					a: 'ls',
					b:this.cwd
				});
				let p = new Promise((resolve) => {this.resolve = resolve;});
				return p;
			}

			
		},
		showFile(e) {
			this.cwd = path.dirname(this.fileItem.path);
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
background: url('plugins/devices/wyapp/plugin/data/img/icons/32px.png') no-repeat 0px -32px !important;
	width: 32px;
	height: 32px;
}

.folder-closed {
background: url('plugins/devices/wyapp/plugin/data/img/icons/32px.png') no-repeat -64px 0px !important;
	width: 32px;
	height: 32px;
}
.file {
background: url('plugins/devices/wyapp/plugin/data/img/icons/32px.png') no-repeat -32px 0px !important;
	width: 32px;
	height: 32px;
}
</style>
