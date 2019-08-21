<template>
	<v-layout row justify-center>
		<v-dialog :value="show" persistent content-class="library-box">
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
						<span>{{'Refresh' | translate}}</span>
					</v-tooltip>
				</v-card-title>
				<v-card-text>
					<template>
						<v-treeview
							v-model="tree"
							:open="open"
							:items="items"
							activatable
							item-key="name"
							open-on-click
						>
							<template v-slot:prepend="{ item, open }" v-if="item">
								<v-icon v-if="!item.file">
									{{ open ? 'mdi-folder-open' : 'mdi-folder' }}
								</v-icon>
								<v-icon v-else>
									{{ files[item.file] }}
								</v-icon>
							</template>
						</v-treeview>
					</template>
				</v-card-text>
				<v-card-actions>
					<div class="onofftoggle">
						<v-switch v-model="switch1"  label="Show Hidden"></v-switch>
					</div>
					<v-spacer></v-spacer>
					<div class="file-manager-actions">
						<v-tooltip top>
							<template #activator="data">
								<v-btn text class="fileexplorer-actions" aria-label="New Folder">
									<v-img src="img/icons/new-folder-icon.svg" aria-label="New Folder" v-on="data.on"></v-img>
								</v-btn>
							</template>
							<span>{{'Rename' | translate}}</span>
						</v-tooltip>
						<v-tooltip top>
							<template #activator="data">
								<v-btn text class="fileexplorer-actions" aria-label="Upload Here">
									<v-img src="img/icons/upload-icon.svg" aria-label="Upload Here" v-on="data.on"></v-img>
								</v-btn>
							</template>
							<span>{{'New_firmware' | translate}}</span>
						</v-tooltip>
					</div>
					<v-btn text @click="close">{{$t('TOOLBAR_CLOSE')}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-layout>
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
			]
		};
	},
	computed: {
		...mapGetters ({
			device: 'link/device',
			connection: 'link/connection'
		}),
	},
	created () {
		
	},
	destroyed ()
	{
		
	},
	methods: {
		close ()
		{
			this.$root.$emit ('close');
		}
	}
};
</script>

