<template>
	<div class="schematics-box fill-height">
		<v-btn v-if="url===null" @click="select" class="svg-btn">{{$t('ADD_SCHEMATIC')}}</v-btn>
		<v-btn v-else  @click="deleteSchematic" class="svg-btn">{{$t('DELETE_SCHEMATIC')}}</v-btn>
		<input type="file" id="picture" @change="fileSelect" v-show="false" accept="image/*, .svg">
		<div v-if="url === null" class="schematics-msg">
			<span>{{$t('SCHEMATICS_IMPORT')}}</span>
		</div>
		<v-img v-else :src="url" aspect-ratio="1.7" contain></v-img>
	</div>
</template>
<script>

import path from 'path';

var $ = require('jquery');
export default {
	name: 'Schematics',
	data() {
		return {
			url: null,	
			picture: null,
			file: null, 
			file_ext:'',
		};
	},
	methods: {
		select() {
			$(this.$el).find('#picture').trigger('click');
		}, 
		async deleteSchematic() {
			let value = await this.studio.workspace.showConfirmationPrompt('DELETE_CONFIRMATION', 'DELETE_MESSAGE');
			if (value) {
				this.url = null;
			}
		},
		fileSelect(e) {
			this.file = e.target.files[0];
			this.url = URL.createObjectURL(this.file);
			this.file_ext = path.extname(this.file.name);
		}
	},
}
</script>

<style lang="less" scoped>
	@import '../style/schematics.less';
</style>