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
			<v-alert v-if="devicesWithoutPlaceholders === 0"
				type="success"
				class="mb-4"
				>
					<v-row align="center">
						<v-col class="grow">{{$t('WORKSPACE_DEVICE_SETUP_TEXT')}}</v-col>
						<v-col class="shrink">
							<v-btn @click="setup">{{$t('WORKSPACE_DEVICE_SETUP')}}</v-btn>
						</v-col>
					</v-row>
			</v-alert>
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
		}),
		devicesWithoutPlaceholders ()
		{
			if (!this.devices) return 0;
			else 
			{
				return this.devices.reduce ((nr, device) => { return nr + (device.placeholder?0:1); }, 0);
			}
		}
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
		},
		setup ()
		{
			this.studio.system.openLink ('https://wyliodrinstudio.readthedocs.io/en/latest/boards');
		}
	}
};
</script>

