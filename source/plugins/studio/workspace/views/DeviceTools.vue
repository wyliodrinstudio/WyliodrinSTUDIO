<template>
	<div v-if="!offline">
		<div class="connected-menu">
			<div class="left connected-device-box" @click.stop="settings">
				<span class="device-title">{{device.name}}</span>
				<span class="device-port">{{device.address}}</span>
				<div class="device">
					<v-img :src="device.icon"></v-img>
				</div>
			</div>
			<v-tooltip bottom v-for="deviceToolButton in deviceToolButtonsFilter" :key="deviceToolButton.name" v-show="deviceToolButton.visible()">
				<template #activator="data">
					<v-btn text :class="deviceToolButton.buttonType+'-bt'" @click.stop="deviceToolButton.action()" :disabled="!deviceToolButton.enabled()" v-show="deviceToolButton.visible()">
						<v-img :src="deviceToolButton.iconURL" v-on="data.on" :aria-label="$t(deviceToolButton.name)" ></v-img>
					</v-btn>
				</template>
				<span>{{$t(deviceToolButton.name)}}</span>
			</v-tooltip>
			<v-tooltip bottom>
				<template #activator="data">
					<v-btn text @click="disconnect">
						<v-img src="plugins/studio/workspace/data/img/icons/turn-off-icon.svg" v-on="data.on" :aria-label="$t('WORKSPACE_DEVICE_DISCONNECT')" ></v-img>
					</v-btn>
				</template>
				<span>{{$t('WORKSPACE_DEVICE_DISCONNECT')}}</span>
			</v-tooltip>
		</div>
	</div>
	<v-layout v-else row justify-center>
		<v-btn dark @click="showConnectionSelectionDialog">{{$t('WORKSPACE_DEVICE_CONNECT')}}</v-btn>
	</v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'DeviceTools',
	data () {
		return {
			
		};
	},
	computed: {
		...mapGetters ({
			deviceToolButtons: 'workspace/deviceToolButtons',
			device: 'workspace/device',
			status: 'workspace/status',
		}),
		offline () {
			return this.status === 'DISCONNECTED';
		},
		deviceToolButtonsFilter () {
			return this.deviceToolButtons.filter (deviceToolButton => deviceToolButton.type === this.device.type);
		}
	},
	methods: {
		async showConnectionSelectionDialog ()
		{
			let device = await this.studio.workspace.showConnectionSelectionDialog ();
			if (device)
			{
				this.studio.workspace.connect (device);
			}
		},
		settings ()
		{
			this.studio.workspace.showDeviceSettingsDialog ();
		},
		disconnect ()
		{
			this.studio.workspace.disconnect ();
		}
	}
};
</script>

