<template>
	<v-system-bar dark color="light">
		<v-spacer></v-spacer>
		<span class="status-btn" v-for="(statusButton, index) in statusButtons" :key="statusButton.name" v-show="statusButton.visible()" :disabled="!statusButton.enabled()" @click="action (statusButton)">
			<v-tooltip top>
				<template v-slot:activator="{ on }">
					<v-btn v-on="on">
						<v-img :src="statusButton.iconURL"></v-img>
					</v-btn>
				</template>
				<span>{{$t(statusButton.name)}}</span>
			</v-tooltip>
			<v-bottom-sheet @keydown.esc="close(index)" :value="activeStatusButton === statusButton.name" persistent :hide-overlay="!statusButton.overlay()" :inset="statusButton.inset()" :retain-focus="false">
				<v-sheet class="text-center" :height="statusButton.height()">
					<component ref="statusButton" :is="statusButton.component"></component>
				</v-sheet>
			</v-bottom-sheet>
		</span>
	</v-system-bar>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
	name: 'Status',
	data () {
		return {
			
		};
	},
	computed: {
		...mapGetters ({
			statusButtons: 'workspace/statusButtons',
			activeStatusButton: 'workspace/activeStatusButton'
		})
	},
	methods: {
		action (statusButton)
		{
			if (this.activeStatusButton !== statusButton.name)
			{
				this.$store.dispatch ('workspace/activeStatusButton', statusButton.name);
			}
			else
			{
				this.$store.dispatch ('workspace/activeStatusButton', '');
			}
		},
		close (position)
		{
			if (_.isFunction (this.$refs.statusButton[position].esc)) this.$refs.statusButton[position].esc ();
		}
	}
}
</script>
