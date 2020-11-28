<template>
	<v-toolbar class="titlebar">
		<!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
		<v-toolbar-title>
			<v-img src="plugins/studio/workspace/data/img/logo/wyliodrin-small-logo.png" alt="Wyliodrin" title="Wyliodrin" class="logo"></v-img>
		</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-toolbar-items class="hidden-sm-and-down titlebar-buttons">
			<LanguageMenu></LanguageMenu>
			<v-tooltip v-for="toolbarButton in toolbarButtons" :key="toolbarButton.name" bottom v-show="toolbarButton.visible()" :disabled="!toolbarButton.enabled()">
				<template v-slot:activator="{ on }">
					<v-btn @click.stop="toolbarButton.action" v-on="on" v-show="toolbarButton.visible()" :disabled="!toolbarButton.enabled()">
						<img :src="toolbarButton.iconURL" :alt="$t(toolbarButton.name)" hspace="50">
					</v-btn>
				</template>
				<span>{{$t(toolbarButton.name)}}</span>
			</v-tooltip>
			<Menu></Menu>
			<!-- <v-btn text slot="activator" @click.stop="/*studio.showProjectsLibrary*/">
				<v-img src="img/icons/projects-icon.svg"></v-img>
			</v-btn> -->
			<!-- <ProjectsLibrary></ProjectsLibrary> -->
			<div class="toggle-connection">
				<DeviceTools></DeviceTools>
				<div class="status label c-status" :class="'label-'+status.toLowerCase ()" >{{$t('WORKSPACE_STATUS_'+status)}}</div>
				<div class="triangle"></div>
			</div>
			<div class="window-control">
				<v-tooltip left>
					<template #activator="data">
						<v-btn text class="window-button" @click="exit">
							<v-img src="plugins/studio/workspace/data/img/icons/closeapp-icon.svg" v-on="data.on" :aria-label="$t('WORKSPACE_TOOLBAR_EXIT')" ></v-img>
						</v-btn>
					</template>
					<span>{{$t('WORKSPACE_TOOLBAR_EXIT')}}</span>
				</v-tooltip>
                <!--<v-tooltip left>
					<template #activator="data">
						<v-btn text class="window-button">
							<v-img src="img/icons/restoredown-icon.svg" v-on="data.on" aria-label="Restore" ></v-img>
						</v-btn>
					</template>
					<span>Restore</span>-->
                <v-tooltip left>
					<template #activator="data">
						<v-btn text class="window-button" @click="fullscreen">
							<v-img src="plugins/studio/workspace/data/img/icons/maximize-icon.svg" v-on="data.on" :aria-label="$t('WORKSPACE_TOOLBAR_FULLSCREEN')" ></v-img>
						</v-btn>
					</template>
					<span>{{$t('WORKSPACE_TOOLBAR_FULLSCREEN')}}</span>
				</v-tooltip>
				<v-tooltip left>
					<template #activator="data">
						<v-btn text class="window-button" @click="minimize">
							<v-img src="plugins/studio/workspace/data/img/icons/minimize-icon.svg" v-on="data.on" :aria-label="$t('WORKSPACE_TOOLBAR_MINIMIZE')" ></v-img>
						</v-btn>
					</template>
					<span>{{$t('WORKSPACE_TOOLBAR_MINIMIZE')}}</span>
				</v-tooltip>
			</div>

		</v-toolbar-items>
	</v-toolbar>
</template>

<script>
import Vue from 'vue';
import LanguageMenu from './LanguageMenu.vue';
import Menu from './Menu.vue';
import { mapGetters } from 'vuex';
import DeviceTools from './DeviceTools.vue';

// import { remote } from 'electron';
export default Vue.extend ({
	name: 'Toolbar',
	components: {
		LanguageMenu,
		DeviceTools,
		// ProjectsLibrary,
		Menu
	},
	computed: {
		...mapGetters ({
			toolbarButtons: 'workspace/toolbarButtons',
			device: 'workspace/device',
			status: 'workspace/status',
		})
	},
	methods: {
		minimize ()
		{
			this.studio.system.minimize ();
		},
		fullscreen ()
		{
			this.studio.system.fullscreen ();
		},
		exit ()
		{
			this.studio.workspace.close ();
		}
	}
});
</script>

