<template>
	<v-card class="about-box">
		<v-card-title>
			<div class="about-logo">
				<v-img src="plugins/studio/workspace/data/img/logo/wyliodrin-studio-about-logo.png"></v-img>
				<span>{{ $t('ABOUT_VERSION') }} {{ studio.workspace.version }}</span>
			</div>
		</v-card-title>
		
		<v-card-text>

			<div class="developers">
				<h3>{{$t('ABOUT_DEVELOPED_BY')}}</h3>

				<p><strong>Alexandru Radovici</strong> - {{$t('ABOUT_MAINTAINER')}}</p>
				<p><strong>Ovidiu Stoica</strong> - {{$t('ABOUT_UI_UX')}}</p>
				<p><strong>Ioana Culic</strong> - Development Manager</p>
				<p><strong>Marius-Andrei Aluculesei</strong> - Projects, Application</p>
				<p><strong>Cosmin-Daniel Radu</strong> - Embedded Software</p>
				<p><strong>Liviu-Nicolae Moraru</strong> - Embedded Software</p>
				<p><strong>Calin Dumitru</strong> - Simulators</p>
				<p><strong>Diana Ghindaoanu</strong> - Notebook, Dashboard, Documentation, Emulator</p>
				<p><strong>Teona Severin</strong> - Web File System</p>
				<p><strong>Iulia Andreea Luta</strong> - Docker</p>
        <p><strong>Andrei-Paul Zamfir</strong> - MicroPython</p>
				<p><strong>Ana Marinescu</strong> - Pin Layout</p>
				<p><strong>Andrei Deatcu</strong> - Resistor Color Code, Schematics</p>
				<p><strong>Roberta-Alexandra Craciun</strong> - Tutorials</p>
				<p><strong>Alexandra-Gabriela State</strong> - Tutorials</p>
				<p><strong>Serban Andrei</strong> - GitLab Download</p>

				<br>
			
				<h3>{{$t('ABOUT_TRANSLATE')}}</h3>
				<p><strong>Diana Ghindaoanu</strong> - Romanian, French</p>
				<p><strong>Simao Gomes Viana</strong> - German</p>
				<p><strong>Csongor Hegedüs</strong> - Hungarian</p>
				<p><strong>Ana Marinescu</strong> - Japaneese</p>
				<p><strong>Veronika Uhrinová</strong> - Slovak</p>
				<p><strong>Sorina Goran</strong> - Spanish</p>
			</div>

			<div class="consent">
				<v-checkbox dark hide-details dense v-model="feedback" :label="$t('ABOUT_FEEDBACK')"></v-checkbox>
			</div>

		</v-card-text>

		<v-card-actions>

			<div class="provided">
				<p>{{$t('ABOUT_PROVIDED_BY')}} <a target="_blank" @click="openLink">Wyliodrin SRL</a></p>
			</div>
			<v-spacer></v-spacer>
			<v-btn text @click="openLicense">{{$t('ABOUT_LICENSE')}}</v-btn>
			<v-btn text @click="close">{{$t('CLOSE')}}</v-btn>
		</v-card-actions>
	
	</v-card>
	
</template>

<script>
import LicenseDialog from './LicenseDialog.vue';

export default {
	name:'AboutDialog',
	data() {
		return {
			feedback: this.studio.settings.loadValue ('workspace', 'feedback', true)
		};
	},
	methods: 
	{
		openLink() {
			this.studio.system.openLink('https://wyliodrin.com/');
		},
		openLicense() {
			// console.log('license');
			this.$root.$emit('submit', undefined);
			this.studio.workspace.showDialog(LicenseDialog,{width:800});
		},
		close() {
			this.$root.$emit('submit', undefined);
		}
	},
	watch: {
		feedback (newfeedback)
		{
			this.studio.settings.storeValue ('workspace', 'feedback', newfeedback);
		}
	}
};
</script>


