<template>
	<v-card class="library-box">
		<v-card-title small>
			<span class="headline">{{$t('PROJECT_LIBRARY_PROJECTS')}}</span>
			<v-spacer></v-spacer>
		</v-card-title>
		<v-card-text v-if="!projects || projects.length === 0" class="projects-container">
		</v-card-text>
		<v-card-text v-else>
			<v-layout>
				<v-list class="itemlist">
					<template v-for="project in projects"  >
						<v-list-item :key="project.name" class="lib-app">
							<v-list-item-avatar @click="selectProject(project)">
								<img :src="'plugins/projects/data/img/languages/project/'+projectLanguage (project)+'.png'" avatar >
							</v-list-item-avatar>

							<v-list-item-content>
								<v-list-item-title>
									{{project.name}}
									<span class="projlang">{{project.language}}</span>
								</v-list-item-title>
								<v-list-item-subtitle>February 16, 2019 @ 18:02</v-list-item-subtitle>

								<v-list-item-subtitle>
									<v-btn text class="lib-app-btn" @click="exportProject(project)">{{$t('PROJECT_LIBRARY_EXPORT')}}</v-btn>
									<v-menu offset-y>
										<template v-slot:activator="{ on }">
											<v-btn text class="lib-app-btn" v-on="on">{{$t('PROJECT_LIBRARY_OPTIONS')}}</v-btn>
										</template>
										<v-list>
											<v-list-item @click="renameDialog(project)">
												<v-list-item-title >{{$t('PROJECT_LIBRARY_RENAME')}}</v-list-item-title>
											</v-list-item>
											<v-list-item  @click="deleteProject(project, projects)">
												<v-list-item-title>{{$t('PROJECT_LIBRARY_DELETE')}}</v-list-item-title>
											</v-list-item>
											<v-list-item @click="cloneDialog(project)">
												<v-list-item-title >{{$t('PROJECT_LIBRARY_CLONE')}}</v-list-item-title>
											</v-list-item>
										</v-list>
									</v-menu>
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</template>
				</v-list>
			</v-layout>
		</v-card-text>
		<v-card-actions>
			<v-btn text>{{$t('PROJECT_LIBRARY_LOAD_EXAMPLE')}}</v-btn>
			<v-spacer></v-spacer>
			<!--<v-btn text slot="activator" @click.stop="console.log('this')">
				<v-img src="plugins/projects/data/img/icons/projects-icon.svg"></v-img>
			</v-btn> ce e asta? -->
			<v-btn text @click ="addProjectDialog()" class="newapp">{{$t('PROJECT_WELCOME_CREATE_NEW_APP')}}</v-btn>
			<v-btn text @click="importProject()">{{$t('PROJECT_LIBRARY_IMPORT')}}</v-btn>
			<v-btn text @click="close" ref="button">{{$t('PROJECT_LIBRARY_CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import AddProjectDialog from './dialogs/AddProjectDialog.vue';
// import { remote } from 'electron';
// const dialog = remote.dialog;
import path from 'path';
let settings = {
	workspace: {
		path: path.join (require('os').homedir(), 'WyliodrinSTUDIO')
	}
};
export default {
	name: 'ProjectsLibrary',
	data ()
	{
		return {
			dialog: false,
			exportDialog:false,
			importDialog:false,
			rename:'',
			filePath:'',
			projects:[],
		};
	},
	components: {
	},

	async created ()
	{
		this.projects = await this.studio.projects.loadProjects(false);
	},
	mounted() {
		this.$refs.button.$el.focus();
	}, 
	methods: {
		esc() {
			this.close();
		},
		close ()
		{
			this.$root.$emit ('submit');
		},
		async addProjectDialog ()
		{
			let value = await this.studio.workspace.showDialog(AddProjectDialog,{width:512});
			if(value === undefined){
				this.projects=await this.studio.projects.loadProjects(false);
			}
			
		},
		async cloneDialog(project)
		{
			this.rename = await this.studio.workspace.showPrompt('PROJECT_CLONE_PROJECT', 'PROJECT_NAME_PROMPT','', 'PROJECT_NEW_NAME');
			console.log(this.rename);
			if(this.rename === undefined)
			{
				this.rename = '';
			}
			if(await this.cloneProject(project,this.rename))
			{
				this.projects=await this.studio.projects.loadProjects(false);
			}
			this.rename = '';
		},
		async renameDialog(project)
		{
			this.rename = await this.studio.workspace.showPrompt('PROJECT_RENAME_PROJECT', 'PROJECT_NAME_PROMPT','', 'PROJECT_NEW_NAME');
			if(await this.renameProject(project,this.rename))
			{
				this.projects=await this.studio.projects.loadProjects(false);
			}
			this.rename = '';
		},
		projectLanguage (project)
		{
			// TODO check if language is known, not only that it exists
			if (project.language) return project.language;
			else return 'unknown';
		},
		async selectProject (project)
		{
			if(await this.studio.projects.selectCurrentProject(project)){
				this.close ();
			}
		},
		async deleteProject (project, projects)
		{
			let allow = await this.studio.workspace.showConfirmationPrompt ('PROJECT_DELETE_PROJECT', 'PROJECT_PROJECT_SURE');
			if(allow && await this.studio.projects.deleteProject(project))
			{
				let currentProject = this.studio.workspace.getFromStore('projects','currentProject');

				if(project.name === currentProject.name)
				{
					this.studio.workspace.dispatchToStore('projects', 'currentProject', null);
					this.studio.workspace.dispatchToStore('projects', 'currentFile', null);
					await new Promise ((resolve) =>
						{
							process.nextTick (() => 
							{
								resolve ();
							});
						});
						
				}
				let index = projects.indexOf(project);
				projects.splice(index, 1);
				this.projects=await this.studio.projects.loadProjects(false);
			}
			return true;
		},
		async exportProject (project)
		{
			// const options = {
			// 	title:project.name,
			// 	defaultPath: settings.workspace.path,
			// 	filters: [
			// 		{name:'zip', extensions: ['zip']}
			// 	]
			// };
			// let savePath = dialog.showSaveDialog(null, options);
			// if(await this.studio.projects.exportProject(project,savePath))
			// {
			// 	return true;
			// }
			// return false;
		},
		async importProject ()
		{
			// const options = {
			// 	title:'Select a project to import',
			// 	defaultPath: settings.workspace.path,
			// 	filters: [
			// 		{name:'imports', extensions: ['zip','wylioapp']}
			// 	]
			// };
			// let openPath = dialog.showOpenDialog(null, options);

			// if(await this.studio.projects.importProject(openPath[0],path.extname(openPath[0]))){
			// 	this.projects=await this.studio.projects.loadProjects(false);
			// 	return true;
			// }
			// return false;
		},
		async renameProject (project)
		{
			if(this.rename==''){
				return false;
			}
			if (await this.studio.projects.renameProject(project,this.rename))
			{
				this.rename=='';
				this.projects=await this.studio.projects.loadProjects(false);
				return true;
			}
			this.rename=='';
		},
		async cloneProject (project)
		{
			if (await this.studio.projects.cloneProject(project,this.rename))
			{
				this.rename=='';
				this.projects=await this.studio.projects.loadProjects(false);
				return true;
			}
			this.rename=='';
		},
	}
}
</script>

<style lang="less" scoped>
	@import '../style/projectlibrary.less';
</style>