<template>
	<v-card class="manager-box" style="width:500px;height:600px;">
		<v-card-title>
			<span class="headline">{{$t('DEVICE_EMULATOR')}}</span>
			<v-spacer></v-spacer>
		</v-card-title>
		<v-card-text>
			<v-tabs v-model="active" left class="tabs-box">
				<v-tab :key="'this.'" ripple >{{$t('EMULATOR_AVAILABLE_IMAGES')}}</v-tab>
				<v-tab :key="'emulators'" ripple>{{$t('EMULATOR_AVAILABLE_EMULATORS')}}</v-tab>
			</v-tabs>
		</v-card-text>

		<v-tabs-items v-model="active">
			<v-tab-item :key="'image'">
				<v-list>
					<v-list-item v-for="item in images" :key="item.title">
						<v-list-item-avatar>
							<v-img :src="item.icon"></v-img>
						</v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-title v-text="item.title"></v-list-item-title>
						</v-list-item-content>
						<v-list-item-action>
							<div v-if="item.loadingEmulator === 'no'">
								<div v-if="item.progress === 100">
									<v-btn :disabled="qemuCheck" @click="runEmulator(item)">{{$t('EMULATOR_CREATE_NEW')}}</v-btn>
								</div>
								<div v-else>
									<div v-if="item.progress <= 0">
										<v-btn :disabled="qemuCheck" @click="downloadImage(item)">{{$t('EMULATOR_DOWNLOAD_IMAGE')}}</v-btn>
									</div>
									<div v-else-if="item.progress>0 && item.progress < 100">
										<v-progress-circular
											:rotate="360"
											:size="100"
											:width="15"
											:value="item.progress"
											color="teal"
										>
											{{ item.progress }} %
										</v-progress-circular>
										<v-btn :disabled="qemuCheck" @click="stopDownload(item)">{{$t('EMULATOR_STOP_DOWNLOAD')}}</v-btn>
									</div>
								</div>
							</div>
							<div v-else-if="item.loadingEmulator=== 'yes'">
								<v-img src="plugins/emulator/data/img/icons/loading-emulator.gif" style="width:50px;height:50px"></v-img>
							</div>
						</v-list-item-action>
					</v-list-item>
				</v-list>
					<v-alert v-if="qemuCheck === true" type="error" class="mb-4">
						descarca
						<v-btn  @click="downloadQemu()">{{$t('EMULATOR_DOWNLOAD_QEMU')}}</v-btn> 
					</v-alert>
					
			</v-tab-item>
			<v-tab-item :key="'emulator'">
				<v-list>
					<v-list-item v-for="emulator in runningEmulatorsArray" :key="emulator.id">
						<v-list-item-avatar>
							<v-img :src="emulator.icon"></v-img>
						</v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-title v-text="emulator.name"></v-list-item-title>
						</v-list-item-content>
						<v-list-item-action>
							<div v-if="emulator.running === 1">
								<v-btn :disabled="qemuCheck" @click="stopEmulator(emulator)">{{$t('EMULATOR_STOP')}}</v-btn>
							</div>
							<div v-else>
								<v-btn :disabled="qemuCheck" @click="restartEmulator(emulator)">{{$t('EMULATOR_RESTART')}}</v-btn>
							</div>
							<v-btn :disabled="qemuCheck" @click="deleteEmulator(emulator)">{{$t('EMULATOR_DELETE')}}</v-btn>
						</v-list-item-action>
					</v-list-item>
				</v-list>
				<v-alert v-if="qemuCheck === true" type="error" class="mb-4">
					{{$t('EMULATOR_NO_QEMU_ERROR')}}
					<v-btn  @click="downloadQemu()">{{$t('EMULATOR_DOWNLOAD_QEMU')}}</v-btn> 
				</v-alert>
			</v-tab-item>
		</v-tabs-items>

		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn text @click="close">{{$t('CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	data () {
		return {
			active: 1,
		}
	},
	computed: {
		...mapGetters ({
			runningEmulators: 'emulator/runningEmulators',
			images: 'emulator/images',
			qemuCheck: 'emulator/qemuCheck',
		}),
		forceUpdate ()
		{
			return true;
		},
		runningEmulatorsArray() {
			console.log(this.runningEmulators);
			let array = [];
			for(let emulatorName in this.runningEmulators) {
				array.push(this.runningEmulators[emulatorName]);
			}
			return array;
		}
	},
	methods: {
		downloadImage(image) 
		{
			this.studio.emulator.downloadImage(image);
		},
		async runEmulator(type)
		{
			this.studio.emulator.runEmulator(type);
		},
		stopEmulator(emulator)
		{
			this.studio.emulator.stopEmulator(emulator);
		},
		deleteEmulator(emulator)
		{
			this.studio.emulator.deleteEmulator(emulator);
		},
		restartEmulator(emulator)
		{
			this.studio.emulator.restartEmulator(emulator);
		},
		stopDownload(image)
		{
			this.studio.emulator.stopDownload(image);
		},
		downloadQemu()
		{
			this.studio.system.openLink('https://www.qemu.org/download/');
		},
		esc() {
			this.close();
		},
		close ()
		{
			this.$root.$emit('submit');
		}
		
	}
}
</script>