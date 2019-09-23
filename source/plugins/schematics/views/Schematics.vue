<template>
	<div class="schematics-box fill-height">
		<div v-if="encodedImage === null" class="schematics-msg">
			<span>{{$t('SCHEMATICS_IMPORT')}}</span>
		</div>
		<v-img v-else :src="encodedImage"  contain></v-img>
		<v-btn v-if="encodedImage===null" @click="selectFile" class="svg-btn">{{$t('ADD_SCHEMATIC')}}</v-btn>
		<v-btn v-else  @click="deleteSchematic" class="svg-btn">{{$t('DELETE_SCHEMATIC')}}</v-btn>
		
	</div>
</template>
<script>

import path from 'path';
import { mapGetters } from 'vuex';
var $ = require('jquery');
export default {
	name: 'Schematics',
	data() {
		return {
			encodedImage: null, 
			fileName:null,
			pathToFile:null
		};
	},
	computed: {
		...mapGetters ({
			currentProject: 'projects/currentProject',
		}),
	},
	methods: {
		async selectFile() {
			let files = await this.studio.filesystem.openImportDialog({
				title:'Select a file',
				filetypes:['png', 'jpg', 'jpeg', 'gif', 'svg', 'tiff', 'bmp', 'ppm', 'pgm', 'pbm', 'pnm', 'bat', 'bpg']
			});
			if (files.length > 0)
			{
				// use first file
				let fileData = await this.studio.filesystem.readImportFile (files[0]);
				if(files) {
					this.fileName = path.basename(files[0].name);
					this.pathToFile = path.join(this.currentProject.folder,'.project',path.basename(files[0].name));
					let extension = this.fileName.substring(this.fileName.lastIndexOf('.')).substring(1);
					
					try 
					{
						let content = await this.studio.filesystem.readFile(files[0].name);
						var encoded = content.toString ('base64');
						await this.studio.projects.saveSpecialFile(this.currentProject,this.fileName,content)
						if(extension === 'svg')
							this.encodedImage = 'data:image/svg+xml;base64,' + encoded;
						else
							this.encodedImage = 'data:image/' + extension +';base64,' + encoded;
					}
					catch(e)
					{
						console.error(e.message);
					}
				}
				
			}
			return false;
		},
		async deleteSchematic() {
			let value = await this.studio.workspace.showConfirmationPrompt('DELETE_CONFIRMATION', 'DELETE_MESSAGE');
			if (value) {
				console.log('delete');
				console.log(this.pathToFile);
				await this.studio.projects.deleteFile(this.currentProject,this.pathToFile.replace(this.currentProject.folder,''));
				this.pathToFile=null;
				this.fileName=null;
				this.encodedImage=null;
			}
		}
	},
}
</script>

<style lang="less" scoped>
	@import '../style/schematics.less';
</style>