<template>
	<v-card class="connection-box">
		<v-card-title>
			<span class="headline">{{$t('WORKSPACE_BOARD_CONNECT')}}</span>
		</v-card-title>
		<v-card-text>
			<v-list two-line class="itemlist">
				<template v-for="device in devices">
					<v-list-item :key="device.id" @click="connect(device)">
						<v-list-item-avatar>
							<img :src="device.icon">
						</v-list-item-avatar>

						<v-list-item-content>
							<v-list-item-title class="board-connect-title">{{device.name}}</v-list-item-title>
							<v-list-item-subtitle class="board-connect-type">{{device.description}}</v-list-item-subtitle>
							<v-list-item-subtitle class="board-connect-address">{{device.address}}</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</template>
			</v-list>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn ref="close" text @click="close">{{$t('CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'ConnectionSelectionDialog',
	data () 
	{
		return {

		};
	},
	computed: {
		...mapGetters ({
			devices: 'workspace/devices'
		})
	},
	mounted () {
		this.$refs.close.$el.focus ();
	},
	methods:
	{
		connect (device)
		{
			this.$root.$emit ('submit', device);
		},
		close ()
		{
			this.$root.$emit ('submit', undefined);
		},
		esc ()
		{
			this.close ();
		}
	}
}
</script>

