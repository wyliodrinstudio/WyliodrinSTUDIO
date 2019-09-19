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
			<v-tooltip bottom v-for="deviceToolButton in deviceToolButtons" :key="deviceToolButton.name" v-if="deviceToolButton.type === device.type && deviceToolButton.visible()">
				<template #activator="data">
					<v-btn text :class="deviceToolButton.buttonType+'-bt'" @click.stop="deviceToolButton.action()" :disabled="!deviceToolButton.enabled()">
						<v-img :src="deviceToolButton.iconURL" v-on="data.on" :aria-label="$t(deviceToolButton.name)" ></v-img>
					</v-btn>
				</template>
				<span>{{$t(deviceToolButton.name)}}</span>
			</v-tooltip>
			<v-tooltip bottom>
				<template #activator="data">
					<v-btn text @click="disconnect">
						<v-img src="plugins/workspace/data/img/icons/turn-off-icon.svg" v-on="data.on" :aria-label="$t('WORKSPACE_DEVICE_DISCONNECT')" ></v-img>
					</v-btn>
				</template>
				<span>{{$t('WORKSPACE_DEVICE_DISCONNECT')}}</span>
			</v-tooltip>
			<!-- <PackageManager v-if="packageManager" :show="packageManager" @close="studio.hidePackageManager()"></PackageManager>
			<TaskManager v-if="taskManager" :show="taskManager" @close="studio.hideTaskManager()"></TaskManager>
			<NetworkManager v-if="networkManager" :show="networkManager" @close="closeNetworkManager"></NetworkManager>
			<DeviceManager></DeviceManager>
			<FileManager v-if="fileManager" :show="fileManager" @close="closeFileManager"></FileManager> -->
		</div>
	</div>
	<v-layout v-else row justify-center>
		<v-btn dark @click="showConnectionSelectionDialog">{{$t('WORKSPACE_DEVICE_CONNECT')}}</v-btn>
	</v-layout>
</template>

<script>
// const PackageManager = require ('../../managers/PackageManager.vue');
// const TaskManager = require ('../../managers/TaskManager.vue');
// const NetworkManager = require ('../../managers/NetworkManager.vue');
// const DeviceManager = require ('../../managers/DeviceManager.vue');
// const FileManager = require ('../../managers/FileManager.vue');
import { mapGetters } from 'vuex';
// const ConnectionModal = require ('../../ConnectionModal.vue');
// const Devices = require ('../../../../plugins/devices/devices.json');
export default {
	name: 'DeviceTools',
	data () {
		return {
			// dialog: false,
			// packageManager: false,
			// networkManager: false,
			// taskManager: false,
			// deviceManager: false,
			// fileManager: false,
			// connectionModal: false,
			// selectedDevice: null,
		};
	},
	components: {
		// PackageManager,
		// TaskManager,
		// NetworkManager,
		// DeviceManager,
		// FileManager,
		// ConnectionModal,
		// Devices
	},
	computed: {
		...mapGetters ({
		// 	devices: 'devices/devices',
		// 	link: 'link/connection',
		// 	connected: 'link/connected',
			deviceToolButtons: 'workspace/deviceToolButtons',
			device: 'workspace/device',
			status: 'workspace/status',
		// 	DEVICE_TYPES: 'devices/DEVICE_TYPES'
		}),
		offline () {
			return this.status === 'DISCONNECTED';
		},
		// deviceToolButtons ()
		// {
		// 	return this.allDeviceToolButtons.filter ((button) => button.type === this.device.type && button.visible())
		// }
	},
	methods: {
		async showConnectionSelectionDialog ()
		{
			let device = await this.studio.workspace.showConnectionSelectionDialog ();
			console.log ('device');
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
}
</script>

