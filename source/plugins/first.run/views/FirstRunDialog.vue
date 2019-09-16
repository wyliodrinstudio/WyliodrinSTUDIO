<template>
	<v-card aria-label="Wyliodrin App" class="about-box" style="width: 550px; height:550px;">
		<v-card-text class="pre-box">
			<div class="about-logo">
				<v-img src="plugins/first.run/data/img/wyliodrin-studio-about-logo.png" />
				<span>{{ $t('ABOUT_Version') }} {{ '2.0.3-beta' }}</span>
			</div>
			<div class="welcome">
				<h3>{{ $t('WELCOME_TEXT') }}</h3>
				<p>{{ $t('WELCOME_START_WORK') }}</p>
				
				<p>
					<v-btn @click="openLibrary" class="welcome-btn">{{ $t('WELCOME_CREATE_APP') }}</v-btn>
					<v-btn @click="setupBoard" class="welcome-btn">{{ $t('WELCOME_CONNECT_BOARD') }}</v-btn>
				</p>

				<span>
					<v-btn @click="importProjects" class="import-btn">{{ $t('WELCOME_IMPORT') }}</v-btn>
				</span>
				
			</div>
		</v-card-text>

		<v-card-actions layout="row">
			<div class="provided">
				<p>{{$t('ABOUT_PROVIDED_BY')}} <a target="_blank" @click="openLink">Wyliodrin SRL</a></p>
			</div>
			<v-btn @click="exit">{{ $t('EXIT') }}</v-btn>
		</v-card-actions>

	</v-card>
</template>
<script>

import ProjectsLibrary from '../../projects/views/ProjectsLibrary.vue';
export default {
	data() {
		return {
			
		}
	},
	methods: {
		openLibrary() 
		{
			console.log('open library');
			this.studio.projects.showProjectsLibrary();
		},
		setupBoard()
		{
			this.studio.system.openLink('https://wyliodrinstudio.readthedocs.io/en/latest/boards.html');
		},
		importProjects()
		{
			console.log('import');
			this.studio.projects.showProjectsLibrary();
		},
		exit()
		{
			this.$root.$emit('submit', undefined);
		},
		openLink()
		{
			this.studio.system.openLink('https:/wyliodrin.com')
		}
	}
}
</script>