<template>
	<v-card class="manager-box">
		<v-card-title>
			<span class="headline">/wyliodrin (aici vine calea)</span>
			<v-spacer></v-spacer>
			<v-tooltip bottom>
				<template #activator="data">
					<v-btn text class="icon-btn" aria-label="Refresh">
						<!-- <v-img contain src="plugins/device.wyapp/data/img/icons/refresh-icon.svg" aria-label="Refreshr" v-on="data.on"></v-img> -->
						Refresh
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
					
					:items="items"
					:load-children="fetchContent"
            		:open.sync="open"
					open-on-click
          			transition
					item-key="name"
					>
					
					<template v-slot:label="{item, open}"	>
						<p style="width:100%;" @click="fileItem = item" v-if="item.file  === undefined" text @contextmenu="fileItem = item,showFolder($event)"> 
							{{item.name}}                  
						</p>
						<p v-else style="width:100%;" text  @click="fileItem = item" @contextmenu="fileItem = item,showFile($event)">
							{{item.name}} 
						</p>

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
				<v-list>
					<v-subheader v-if="fileItem !== null">{{fileItem.name}}</v-subheader>

					<v-list-item-group v-if="fileItem !== null" v-model="item" color="primary">
						<v-list-item v-for="item in fileItem.children" :key="item.key">
							<v-list-item-icon>
								<p v-if="item.file !== undefined" class="file" @click="fileItem = item" @contextmenu="fileItem = item,showFile($event)">
								</p>
								<p v-else-if="item.name" class="folder-open" @click="fileItem = item" text @contextmenu="fileItem = item,showFolder($event)">
								</p>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title v-text="item.name"></v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-item-group>
					<p v-else>No folder selected</p>
				</v-list>
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
import path from 'path';
export default {
	name: 'FileManager',
	props: ['connection'],
	data () {
		return {
			open: ['public'],
			tree: [],
			items: [{
				name:'Raspberry',
				children:[],
				path:'/',
				size:0,
				key:'Raspberry'+0+'root'

			}],
			switch1:false,
			fileMenu: false,
			folderMenu:false,
			fileItem:null,
			newData:null,
			cwdArray:[],
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
			return 'project-tree-on hs-100';
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

	},
	created () {

		this.connection.on('tag:fe1',this.update);
	},
	destroyed ()
	{
		this.connection.removeListener('tag:fe1',this.update);
	},
	methods: {
		list(cwd){
			this.connection.send('fe',
			{
				a: 'ls',
				l:cwd
			})
		},
		update(data){
			this.newData=data;
			console.log(data);
		},
		updateFileTree(data, tree){
			if(data) {
				for(let item of data) {
					if(item.isdir) {
						tree.children.push({
							name: item.name,
							children:[],
							path:this.cwd+item.name+'/',
							size:item.size,
							key: item.name+item.size+'folder'
						});
					} else if(item.isfile) {
						tree.children.push({
							name:item.name,
							file:path.extname(item.name),
							path:this.cwd+item.name+'/',
							size:item.size,
							key:item.name+item.size+'file'
						});
					} else if(item.islink) {
						tree.children.push({
							name:item.name,
							link:true,
							path:this.cwd+item.name+'/',
							size:item.size,
							key:item.name+item.size+'link'
						})
					}
				}
			}
			console.log(tree);
		},
		_isChildOf(child,parent) {
			if (child === parent) return false;
			const parentTokens = parent.split(path.sep).filter(i => i.length);
			return parentTokens.every((t, i) => child.split(path.sep)[i] === t);
		},
		async fetchContent(item){
			this.cwd=item.path;
			console.log(this.cwdArray);
			console.log(this.cwdArray.includes(this.cwd))
			if(!this.cwdArray.includes(this.cwd)){
				this.cwdArray.push(this.cwd);
				this.fileItem=item;
				await setTimeout( ()=> {
					this.connection.send('fe', {
						a: 'ls',
						b:this.cwd
					});
				},1500);
			}
			return this.items;
			
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
background: url('plugins/device.wyapp/data/img/icons/32px.png') no-repeat 0px -32px !important;
	width: 32px;
	height: 32px;
}

.folder-closed {
background: url('plugins/device.wyapp/data/img/icons/32px.png') no-repeat -64px 0px !important;
	width: 32px;
	height: 32px;
}
.file {
background: url('plugins/device.wyapp/data/img/icons/32px.png') no-repeat -32px 0px !important;
	width: 32px;
	height: 32px;
}
</style>
