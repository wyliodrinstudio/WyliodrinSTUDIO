<template>
	<v-card id="projectsLibrary" class="library-box">
		<v-card-title small>
			<span class="headline">{{$t('PROJECT_LIBRARY_PROJECTS')}}</span>
			<v-spacer></v-spacer>
			<v-text-field autofocus hide-details :label="$t('PROJECT_LIBRARY_SEARCH')" v-model="search" single-line dark class="projsearch" append-icon="search"></v-text-field>
		</v-card-title>
		<v-card-text v-if="!projects || projects.length === 0" class="projects-container">
		</v-card-text>
		<v-card-text v-else>
			<v-layout>
				<v-list class="itemlist">
					<template v-for="project in projectList"  >
						<v-list-item :key="project.name" class="lib-app">
							<v-list-item-avatar @click="selectProject(project)">
								<img :src="'plugins/projects/data/img/languages/project/'+projectLanguage (project)+'.png'" avatar >
							</v-list-item-avatar>

							<v-list-item-content>
								<v-list-item-title>
									{{project.name}}
									<span class="projlang">{{project.language}}</span>
								</v-list-item-title>
								<v-list-item-subtitle style="word-wrap: break-word">{{formatDate(project.date)}}</v-list-item-subtitle>

								<v-list-item-subtitle>
									<div id="export_button">
										<v-btn text class="lib-app-btn" @click="exportProject(project)">{{$t('PROJECT_LIBRARY_EXPORT')}}</v-btn>

									</div>
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
			<div id="import_button">
				<v-btn text @click="importDialogOpen()">{{$t('PROJECT_LIBRARY_IMPORT')}}</v-btn>
			</div>
			<v-btn text @click="close" ref="button">{{$t('PROJECT_LIBRARY_CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import AddProjectDialog from './dialogs/AddProjectDialog.vue';
import moment from 'moment-timezone';
import path from 'path';
import $ from 'jquery';
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
			search:'',
		};
	},
	components: {
	},
	computed:{
		projectList(){
			return this.projects.filter(project => {
				return project.name.toLowerCase().includes(this.search.toLowerCase());
			})
		}
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
		formatDate(date){
			// return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');
			return moment(date).tz(moment.tz.guess()).add(3, 'hours').format('LLLL');
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
			let basePath = settings.workspace.path;
			if(await this.studio.projects.exportProject(project,basePath))
			{
				return true;
			}
			return false;
		},
		async importDialogOpen() {
			let file = await this.studio.projects.importDialog();
			console.log(file);
			if(event !=null){
				this.importProject(file);
				return true;
			}
			return false;
		},
		async importProject (file)
		{
			if(await this.studio.projects.importProject(file)){
				this.projects=await this.studio.projects.loadProjects(false);
				return true;
			}
			return false;
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