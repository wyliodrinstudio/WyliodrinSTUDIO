<template>
	<v-tooltip bottom>
		<template v-slot:activator="{ on: menu }">
			<v-menu offset-y close-on-click>
				<template v-slot:activator="{ on: tooltip }">
					<v-btn v-on="{ ...tooltip, ...menu }">
						<v-img :src="languageImage" aria-label="Language" eager="true"></v-img>
					</v-btn>
				</template>
				<v-list>
					<v-list-item v-for="(languageName, languageId) in LANGUAGES" :key="languageId" @click="setLanguage (languageId)">
						<v-list-item-avatar item size="20">
							<v-img :src="'plugins/workspace/data/img/flags/'+languageId+'.png'"></v-img>
						</v-list-item-avatar>
						<v-list-item-title>{{ languageName }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</template>
		<span>Language</span>
	</v-tooltip>
	
</template>

<script>
import Vue from 'vue';
import $ from 'jquery';



export default {
	name: 'LanguageMenu',
	data () {
		return {
			LANGUAGES: Vue.translation.LANGUAGES
		};
	},
	computed: {
		languageImage ()
		{
			return 'plugins/workspace/data/img/flags/'+this.$i18n.locale+'.png';
		}
	},
	methods: {
		setLanguage (languageId)
		{
			// TODO
			this.$i18n.locale = languageId;
			// Trigger resize to make sure UI elements get updated
			$(window).trigger ('resize');
			this.studio.workspace.setLanguage(languageId);
		}
	}
}
</script>
