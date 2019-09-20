<template>
	<v-card class="about-box">
		<v-card-title>
			<div class="about-logo">
				<v-img src="plugins/first.run/data/img/logo/wyliodrin-studio-about-logo.png"></v-img>
				<span>{{ $t('ABOUT_VERSION') }} {{ studio.workspace.version }}</span>
			</div>
		</v-card-title>
		<v-card-text>
			<div class="welcome">
				<h3>{{ $t('WELCOME_TEXT') }}</h3>
				<p class="welcome-text">{{ $t('WELCOME_START_WORK') }}</p>
				
				<p>
					<v-btn @click="openLibrary" class="welcome-btn">{{ $t('WELCOME_CREATE_APP') }}</v-btn>
					<v-btn @click="setupBoard" class="welcome-btn">{{ $t('WELCOME_CONNECT_BOARD') }}</v-btn>
				</p>
				
			</div>
		</v-card-text>

		<v-card-actions>
			<div class="provided">
				<p>{{$t('ABOUT_PROVIDED_BY')}} <a target="_blank" @click="openLink">Wyliodrin SRL</a></p>
			</div>
			<v-spacer></v-spacer>
			<v-btn text @click="exit">{{ $t('EXIT') }}</v-btn>
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