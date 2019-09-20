<template>
	<v-tooltip bottom>
		<template v-slot:activator="{ on: menu }">
			<v-menu offset-y close-on-click>
				<template v-slot:activator="{ on: tooltip }">
					<v-btn v-on="{ ...tooltip, ...menu }">
						<v-img :src="'plugins/workspace/data/img/flags/'+$i18n.locale+'.png'" aria-label="Language" ></v-img>
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
		console.log (Vue.translation);
		return {
			LANGUAGES: Vue.translation.LANGUAGES
		};
	},
	methods: {
		setLanguage (languageId)
		{
			this.$i18n.locale = languageId;
			// Trigger resize to make sure UI elements get updated
			this.studio.settings.storeValue('workspace','language',languageId);
			$(window).trigger ('resize');
		}
	}
}
</script>
