<template>
	<div class="h-top">
		<div class="projname">{{title}}</div>
		<v-tabs v-model="active" right class="tabs-box" ref="tabs">
			<v-tab v-for="tab in tabs" :key="tab.name" ripple v-show="tab.visible()" :disabled="!tab.enabled()">
				{{$t(tab.name)}}
			</v-tab>
		</v-tabs>
		<v-tabs-items v-model="active">
			<v-tab-item v-for="tab in tabs" eager :key="tab.name" class="h-top2" :transition="false" :reverse-transition="false">
				<component :is="tab.component" :active="isActive(tab)"></component>
				<!-- <v-card flat>
					<v-card-text>{{ text }}</v-card-text>
				</v-card> -->
			</v-tab-item>
		</v-tabs-items>
		<!-- <Notebook></Notebook> -->
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'Workspace',
	data () {
		return {
			
		};
	},
	components: {
		
	},
	computed: {
		active: {
			get ()
			{
				return this.$store.getters['workspace/activeTab'];
			},
			set (value)
			{
				this.$store.dispatch('workspace/activeTab', value);
			} 	
		},
		...mapGetters ({
			tabs: 'workspace/tabs',
			title: 'workspace/title'
		})
	},
	methods: {
		isActive (tab)
		{
			return tab.name === this.tabs[this.active].name;
		}
	},
	updated ()
	{
		this.$refs.tabs.callSlider ();
	}
};
</script>

