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
				<div v-if="progress.started">
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
	props: ['repository', 'tutorials'],
	data ()
	{
		return  {
			downloading: false,
			progress: {started: false}
		};
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
			let project = {project: null};

			this.studio.githubdownloader.createProject(this.repository, tutorial, project);
			this.downloading = true;


			let downloadingClock = setInterval(() => {
				this.progress = this.studio.githubdownloader.progress;
				this.downloading = this.studio.githubdownloader.downloading;

				if(this.downloading == false) {
					clearInterval(downloadingClock);
					if(project.project != null) {
						this.close();
						this.studio.projects.selectCurrentProject(project.project, true);
					}
				}
			}, 10);
		}
	}
};
</script>