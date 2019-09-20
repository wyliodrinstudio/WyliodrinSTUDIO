<template>
	<v-card class="about-box">
		<v-card-title>
			<div class="about-logo">
				<v-img src="plugins/workspace/data/img/logo/wyliodrin-studio-about-logo.png"></v-img>
				<span>{{ $t('ABOUT_VERSION') }} {{ studio.workspace.version }}</span>
			</div>
		</v-card-title>
		
		<v-card-text>
			<div class="developers">
				<h3>{{$t('ABOUT_DEVELOPED_BY')}}</h3>

				<p><strong>Alexandru Radovici</strong> - {{$t('ABOUT_MAINTAINER')}}</p>
				<p><strong>Marius-Andrei Aluculesei</strong> - {{$t('ABOUT_DEVELOPMENT')}}</p>
				<p><strong>Ovidiu Stoica</strong> - {{$t('ABOUT_UI_UX')}}</p>
				<p><strong>Ioana Culic</strong> - {{$t('ABOUT_DEVELOPMENT')}}</p>
				<p><strong>Cosmin-Daniel Radu</strong> - {{$t('ABOUT_DEVELOPMENT')}}</p>
				<p><strong>Diana Ghindaoanu</strong> - {{$t('ABOUT_DEVELOPMENT')}}</p>
				<p><strong>Teona Severin</strong> - {{$t('ABOUT_DEVELOPMENT')}}</p>
				<p><strong>Liviu-Nicolae Moraru</strong> - {{$t('ABOUT_DEVELOPMENT')}}</p>
				<p><strong>Ana Marinescu</strong> - {{$t('ABOUT_DEVELOPMENT')}}</p>
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

		}
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
	}
}
</script>


