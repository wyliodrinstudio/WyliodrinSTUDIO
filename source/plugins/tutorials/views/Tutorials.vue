<template>
	<v-card class="manager-box emulator-box">
		<v-card-title>
			<span class="headline">{{$t('TUTORIALS_NAME')}}</span>
			<v-spacer></v-spacer>
		</v-card-title>

		<v-card-text>
			<div v-if="!tutorials">
				<v-progress-circular indeterminate></v-progress-circular>
			</div>
			<div v-else>
				<div v-if="downloading">
					<v-row align="center" justify="center">
							Downloading ...

						<v-progress-circular
							:rotate="-90"
							:size="100"
							:width="15"
							:value="progress.value"
							color="teal"
						>
							{{ progress.text }}
						</v-progress-circular>
					</v-row>
				</div>
				<v-list v-else three-line>
					<v-list-item
					v-for="tutorial in tutorials"
					@click="createProject(tutorial)"
					:key="tutorial.title"	
					:disabled="!available (tutorial.language)"
					>
						<v-list-item-avatar>
							<v-img :src="boardIcon (tutorial.type, tutorial.board)"></v-img>
						</v-list-item-avatar>
						<v-list-item-content >
								<v-list-item-title v-text="tutorial.title"></v-list-item-title>
								<v-list-item-subtitle v-text="tutorial.description"></v-list-item-subtitle>
						</v-list-item-content>
						<v-list-item-avatar>
							<v-img :src="languageIcon (tutorial.language)"></v-img>
						</v-list-item-avatar>
					</v-list-item>
				</v-list>
			</div>
		</v-card-text>					
		<v-card-actions> 
			<v-spacer/>
			<v-btn text @click="close">CLOSE</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import axios from 'axios';
export default {
	name: 'Tutorials',
	props: ['repository'],
	data ()
	{
		return  {
			tutorials: null,	
			downloading: false,
			progress: {}
		};
	},
	async created () {
		let response = await axios.get(`https://api.github.com/repos/${this.repository}/contents`);
		
		let dirs =[];
		let tutorials = [];
		for (let list of response.data) {
			if (list.type === 'dir') {
				dirs.push(list.path);
			}
		}
		
		for (let dir of dirs) {
			let tutorialData = await axios.get (`https://raw.githubusercontent.com/${this.repository}/master/${dir}/.project/tutorial.json`);
			let tutorial = tutorialData.data;
			tutorials.push(tutorial);
			tutorial['path'] = dir;
		}	
		
		this.tutorials = tutorials;
	},
	methods: {	
		close ()
		{
			this.$root.$emit ('submit');
		},
		boardIcon (type, board) {
			let icon =  this.studio.workspace.getBoardIcon (type, board);
			if (!icon) icon = 'plugins/tutorials/data/img/unknown_board.png';
			return icon;
		},
		languageIcon (languageId) {
			let language = this.studio.projects.getLanguage (languageId);
			if (language)
			{
				return language.icon;
			}
			else
			{
				return 'plugins/tutorials/data/img/toque.png';
			}
		},
		available (languageId) {
			return this.studio.projects.getLanguage (languageId) != null;
		},
		async createProject(tutorial) {
			let nameProject = await this.studio.workspace.showPrompt('TUTORIALS_IMPORT', 'TUTORIALS_IMPORT_PROJECT_NAME', tutorial.title, 'TUTORIALS_IMPORT', {title: tutorial.title});
			if (nameProject !== null) 
			{				
				this.downloading = true;	
				let createProject = await this.studio.projects.createEmptyProject(nameProject, tutorial.language);
				if (createProject) {
					let dirInfos = {};
					await this.getDirListOfFiles(tutorial.path, dirInfos);
					let numberOfFiles = 0;
					for (let key in dirInfos) {
						numberOfFiles += dirInfos[key].length;
					}
					let downloadedFiles = 0;
									
					for (let key in dirInfos) {
						let folderPath = key.replace(tutorial.path, '');
						if (folderPath !== '') {
							
							await this.studio.projects.newFolder(createProject, folderPath);
						}
						for (let file of dirInfos[key]) {
						
							let filePath = file.replace(tutorial.path, '');
							let fileData = await this.downloadFile(file);
							
							await this.studio.projects.newFile(createProject, filePath, Buffer.from (fileData));
							downloadedFiles++;
							this.progress.value = (downloadedFiles/numberOfFiles)*100;
							this.progress.text = this.progress.value.toFixed(2)+'%';
						}
						
					}	 
					this.close ();
					this.studio.projects.selectCurrentProject (createProject, true);
				}
				else
				{
					this.studio.workspace.showNotification ('TUTORIALS_PROJECT_EXISTS', {name: nameProject});
				}
				this.downloading = false;
			}	
		},
		async getDirListOfFiles (path, dirInfos) {
			
			let response = await axios.get (`https://api.github.com/repos/${this.repository}/contents/${path}`);
			
			for(let item of response.data) {
				if (item.type === 'file') {
					if (dirInfos[path] === undefined) {
						dirInfos[path] = [];
					}
					dirInfos[path].push(item.path);
				}
				else if (item.type === 'dir') {
					await this.getDirListOfFiles(item.path, dirInfos);
				}
			}	
		},
		async downloadFile (path) {
			let file = await axios.get (`https://raw.githubusercontent.com/${this.repository}/master/${path}`, {responseType: 'arraybuffer',});
			return file.data;
		}
	}
};
</script>