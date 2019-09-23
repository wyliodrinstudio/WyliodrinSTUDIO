<template>
	<v-tooltip bottom>
		<template v-slot:activator="{ on: menu }">
			<v-menu offset-y close-on-content-click close-on-click>
				<template v-slot:activator="{ on: tooltip }">
					<v-btn slot="activator" v-on="{ ...tooltip, ...menu }" class="cucu">
						<v-img src="plugins/workspace/data/img/icons/menu-icon.svg" aria-label="Menu" ></v-img>
					</v-btn>
				</template>
				<v-list>
					<v-list-item v-for="menuItem in menuItems" :key="menuItem.name" v-show="menuItem.visible()" :disabled="!menuItem.enabled()" @click="runMenuItem (menuItem)">
						<v-list-item-title>{{$t(menuItem.name)}}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</template>
		<span>Menu</span>
	</v-tooltip>
</template>

<script>
import { mapGetters } from 'vuex';
const ResistorColorCodeDialog = require('./../../documentation.resistorcolorcodes/views/ResistorColorCodeDialog.vue');
export default {
	name: 'Menu',
	data ()
	{
		return {
			// setupDialog:false,
			 colorCodeDialog:false,
			// aboutDialog:false
		};
	},
	components: 
	{
		// SetupDialog,
		// AboutDialog,
		 ResistorColorCodeDialog
	},
	computed: mapGetters ({
		menuItems: 'workspace/menuItems'
	}),
	methods: 
	{
		runMenuItem (menuItem)
		{
			menuItem.action ();
		}
	}
};
</script>

