<template>
	<v-card id="projectsLibrary" class="library-box">
		<v-card-title small>
			<span class="headline">{{$t('PROJECT_LIBRARY_PROJECTS')}}</span>
			<v-spacer></v-spacer>
			<v-text-field autofocus hide-details :label="$t('PROJECT_LIBRARY_SEARCH')" v-model="search" single-line dark class="projsearch" append-icon="search"></v-text-field>
		</v-card-title>
		<v-card-text v-if="!projects || projects.length === 0" class="projects-container">
			<v-alert v-if="readonly" type="warning" class="mb-4">
				{{$t('PROJECTS_READ_ONLY_FILE_SYSTEM')}}
			</v-alert>
			<div v-if="!projects">
				<v-progress-circular indeterminate></v-progress-circular>
			</div>
			<div v-else class="noprojmsg">
				<strong>{{$t('PROJECTS_NO_PROJECT')}}</strong>
				<br>
				<span>{{$t('PROJECTS_CREATE_APPLICATION')}}</span>
			</div>
		</v-card-text>
		<v-card-text v-else>
			<v-layout>
				<v-list class="itemlist">
					<template v-for="project in projectList"  >
						<v-list-item :key="project.name" class="lib-app" @click="selectProject(project)">
							<v-list-item-avatar>
								<v-img contain :src="projectIcon (project)" avatar ></v-img>
							</v-list-item-avatar>

							<v-list-item-content>
								<v-list-item-title>
									<span class="projtitle">{{project.name}}</span>
									<span class="projlang">{{project.language}}</span>
								</v-list-item-title>
								<v-list-item-subtitle style="word-wrap: break-word">{{formatDate(project.date)}}</v-list-item-subtitle>

								<v-list-item-subtitle>
									<v-btn text id="export_button" class="lib-app-btn" @click.stop="exportProject(project)">{{$t('PROJECT_LIBRARY_EXPORT')}}</v-btn>
									<v-menu offset-y close-on-content-click close-on-click>
										<template v-slot:activator="{ on }">
											<v-btn text class="lib-app-btn" v-on="on" @click.stop="">{{$t('PROJECT_LIBRARY_OPTIONS')}}</v-btn>
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
			<v-alert v-if="readonly" type="warning" class="mb-4">
				{{$t('PROJECTS_READ_ONLY_FILE_SYSTEM')}}
			</v-alert>
			<v-alert v-if="persistent === 'never'" type="error" class="mb-4">
					{{$t('PROJECTS_STORAGE_NOT_PERSISTENT')}}
			</v-alert>
			<v-alert v-if="persistent === 'prompt'" type="warning" class="mb-4">
				<div v-if="notPersistent === false">
					<v-row align="center">
						<v-col class="grow">{{$t('PROJECTS_STORAGE_ASK_PERSISTENT')}}</v-col>
						<v-col class="shrink">
							<v-btn @click="askPersistent">{{$t('PROJECTS_STORAGE_BUTTON_ASK_PERSISTENT')}}</v-btn>
						</v-col>
					</v-row>
				</div>
				<div v-else>
					<v-row align="center">
						<v-col class="grow">{{$t('PROJECTS_STORAGE_BROWSER_ERROR')}}</v-col>
					</v-row>
				</div>
			</v-alert>
		</v-card-text>
		<v-card-actions>
			<!-- <v-btn text>{{$t('PROJECT_LIBRARY_LOAD_EXAMPLE')}}</v-btn> -->
			<v-spacer></v-spacer>
			<!--<v-btn text slot="activator" @click.stop="console.log('this')">
				<v-img src="plugins/projects/projects/data/img/icons/projects-icon.svg"></v-img>
			</v-btn> ce e asta? -->
			<v-btn :disabled="readonly" text @click ="addProjectDialog()" class="newapp">{{$t('PROJECT_WELCOME_CREATE_NEW_APP')}}</v-btn>
			<v-btn :disabled="readonly" text id="import_button" @click="importDialogOpen()">{{$t('PROJECT_LIBRARY_IMPORT')}}</v-btn>
			<v-btn text @click="close" ref="button">{{$t('PROJECT_LIBRARY_CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import AddProjectDialog from './dialogs/AddProjectDialog.vue';
import moment from 'moment-timezone';
import path from 'path';
export default {
	name: 'ProjectsLibrary',
	data ()
	{
		return {
			dialog: false,
			exportDialog:false,
			importDialog:false,
			filePath:'',
			projects:null,
			search:'',
			notPersistent: false
		};
	},
	components: {
	},
	computed:{
		projectList(){
			if (!this.projects) return this.projects;
			else
				return this.projects.filter(project => {
					return project.name.toLowerCase().includes(this.search.toLowerCase());
				});
		},
		readonly ()
		{
			return this.persistent === 'notavailable';
		}
	},
	asyncComputed: {
		persistent ()
		{
			return this.studio.filesystem.isPersistent ();
		}
	},
	async created ()
	{
		this.projects = await this.studio.projects.loadProjects(false);
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
			this.close ();
			await this.studio.workspace.showDialog(AddProjectDialog,{width:800});
			this.studio.projects.showProjectsLibrary ();
			
		},
		async cloneDialog(project)
		{
			this.close ();
			let clone = await this.studio.workspace.showPrompt('PROJECT_CLONE_PROJECT', 'PROJECT_NAME_PROMPT', project.name, 'PROJECT_NEW_NAME');
			if (clone)
			{
				await this.studio.projects.cloneProject(project,clone);
			}
			this.studio.projects.showProjectsLibrary ();
		},
		async renameDialog(project)
		{
			this.close ();
			let rename = await this.studio.workspace.showPrompt('PROJECT_RENAME_PROJECT', 'PROJECT_NAME_PROMPT',project.name, 'PROJECT_NEW_NAME');
			if (rename)
			{
				await this.studio.projects.renameProject(project, rename);
			}
			this.studio.projects.showProjectsLibrary ();
		},
		projectLanguage (project)
		{
			// TODO check if language is known, not only that it exists
			if (project.language){
				if(this.studio.projects.getLanguage(project.language)){
					return project.language;
				} else return 'unknown';
			}
			this.studio.projects.showProjectsLibrary ();
		},
		projectIcon (project)
		{
			let language = this.studio.projects.getLanguage(project.language);
			if (language && language.projectIcon) return language.projectIcon;
			else return 'plugins/projects/projects/data/img/languages/project/unknown.png';
		},
		async selectProject (project)
		{
			if(await this.studio.projects.selectCurrentProject(project,true)){
				this.close ();
			}
		},
		async deleteProject (project, /* projects */)
		{
			this.close ();
			let localProject = project;
			let allow = await this.studio.workspace.showConfirmationPrompt ('PROJECT_DELETE_PROJECT', 'PROJECT_PROJECT_SURE');
			if(allow && await this.studio.projects.deleteProject(project))
			{
				let currentProject = this.studio.workspace.getFromStore('projects','currentProject');

				if(currentProject && localProject.name === currentProject.name)
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
			}
			this.studio.projects.showProjectsLibrary ();
		},
		async exportProject (project)
		{
			if(await this.studio.projects.exportProject(project))
			{
				this.projects=await this.studio.projects.loadProjects(false);
				return true;
			}
			return false;
		},
		async importDialogOpen() {
			let files = await this.studio.filesystem.openImportDialog({
				title:'Import',
				filetypes:['zip','tar','wylioapp']
			});
			if (files.length > 0)
			{
				// use first file
				let fileData = await this.studio.filesystem.readImportFile (files[0]);
				let type = '';
				if(files) {
					if(path.extname(files[0].name) === 'wylioapp'){
						type = 'json'; 
					} else {
						type = 'archive';
					}
					let name = path.basename(files[0].name).split('.').slice(0, -1).join('.');
					if(this.projects.find(x => x.name === name) === undefined) {
						if(await this.importProject(files[0].name,fileData,type))
						{
							this.projects=await this.studio.projects.loadProjects(false);
							return true;
						}
					} else {
						await this.studio.workspace.showNotification ('PROJECT_EXISTS_PROMPT');
						return false;
					}
					
				}
				
			}
			return false;
		},
		async importProject (fileName,fileData,type)
		{
			if(await this.studio.projects.importProject(fileName,fileData,type)){
				this.projects=await this.studio.projects.loadProjects(false);
				return true;
			}
			return false;
		},
		
		async askPersistent ()
		{
			await this.studio.filesystem.isPersistent ();
			
			let persistent = await this.studio.filesystem.setPersistent ();

			if (persistent === false)
				this.notPersistent = true;

			this.$asyncComputed.persistent.update ();
		}
	}
};
</script>

<style lang="less" scoped>
	@import '../style/projectlibrary.less';
</style>