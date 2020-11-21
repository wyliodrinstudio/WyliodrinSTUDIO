<template>
	<div class="schematics-box fill-height">
		<div v-if="encodedImage === null" class="schematics-msg">
			<span>{{$t('SCHEMATICS_IMPORT')}}</span>
		</div>
		<v-img v-else :src="encodedImage"  contain></v-img>
		<v-btn v-if="encodedImage===null" @click="selectFile" class="svg-btn">{{$t('ADD_SCHEMATIC')}}</v-btn>
		<v-btn v-else  @click="deleteSchematics" class="svg-btn">{{$t('DELETE_SCHEMATIC')}}</v-btn>
		
	</div>
</template>
<script>

import { mapGetters } from 'vuex';
export default {
	name: 'Schematics',
	data() {
		return {
			data: null, 
		};
	},
	computed: {
		...mapGetters ({
			currentProject: 'projects/currentProject',
		}),
		encodedImage () {
			if (this.data) 
			{
				var encoded = this.data.toString ('base64');	
				return 'data:image/svg+xml;base64,' + encoded;
			}
			else
			{
				return null;
			}
		},
	},
	watch:{
		async currentProject() {
			if (this.currentProject)
			{
				this.data = await this.studio.schematics.getSchematics (this.currentProject);
			}
			else
			{
				this.data = null;
			}
		}
	},
	methods: {
		async selectFile() {
			let files = await this.studio.filesystem.openImportDialog({
				title:'Select a file',
				filetypes:['svg']
			});
			if (files.length > 0)
			{
				if(files) {
					try 
					{
						let content = await this.studio.filesystem.readImportFile (files[0]);
						if (await this.studio.schematics.setSchematics (this.currentProject, content)) {
							this.data = content;
						}
					}
					catch(e)
					{
						this.studio.workspace.showError('SCHEMATICS_IMPORT_ERROR',  {error: e.message});
					}
				}
				
			}
			return false;
		},
		async deleteSchematics() {
			let value = await this.studio.workspace.showConfirmationPrompt('DELETE_CONFIRMATION', 'DELETE_MESSAGE');
			if (value) {
				if (await this.studio.schematics.deleteSchematics (this.currentProject))
				{
					this.data = null;
				}
			}
		}
	},
};
</script>

<style lang="less" scoped>
	@import '../style/schematics.less';
</style>