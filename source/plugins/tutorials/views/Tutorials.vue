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
export default {
	name: 'Tutorials',
	props: ['owner', 'repository', 'platformData'],
	data ()
	{
		return  {
			tutorials: null,	
			downloading: false,
			platform: null,
			progress: {}
		};
	},
	async created () {
		if(this.platformData.platform == 'github') this.platform = this.studio.github;
		else this.platform = this.studio.gitlab;

		if(this.platformData.token)
			this.platform.authenticate(this.platformData.token);
		if(this.platformData.gitlabURL)
			this.platform.changeURL(this.platformData.gitlabURL);

		let response = await this.platform.getContentOfDir('', this.owner, this.repository, this.platformData.branch);
		
		let tutorials = [];
		for (let dir of response.dirs) {
			let tutorial = await this.platform.downloadFile(`${dir}/.project/tutorial.json`, this.owner, this.repository, this.platformData.branch);

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
					await this.platform.getDirListOfFiles(tutorial.path, dirInfos, this.owner, this.repository, this.platformData.branch);
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
							let fileData = await this.platform.downloadFile(file, this.owner, this.repository, this.platformData.branch, 'arraybuffer');

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
		}
	}
};
</script>