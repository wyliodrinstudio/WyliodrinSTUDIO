<template>
	<v-card class="manager-box emulator-box">
		<v-card-title>
			<span class="headline">{{$t('DEVICE_EMULATOR')}}</span>
			<v-spacer></v-spacer>
		</v-card-title>
		<v-card-text>
			<v-tabs v-model="active" persistent left class="tabs-box">
				<v-tab :key="'this.'" ripple >{{$t('EMULATOR_AVAILABLE_IMAGES')}}</v-tab>
				<v-tab :key="'emulators'" ripple>{{$t('EMULATOR_AVAILABLE_EMULATORS')}}</v-tab>
			</v-tabs>
			<v-tabs-items v-model="active">
				<v-tab-item :key="'image'">
					<v-list>
						<v-list-item v-for="item in images" :key="item.title">
							<v-list-item-avatar>
								<v-img :src="item.icon"></v-img>
							</v-list-item-avatar>
							<v-list-item-content>
								<v-list-item-title v-text="item.title"></v-list-item-title>
								<v-list-item-subtitle v-text="item.qemu.mem"></v-list-item-subtitle>
							</v-list-item-content>
							<v-list-item-action>
								<div v-if="item.loadingEmulator === 'no'">
									<div v-if="item.progress === 100">
										<v-btn :disabled="qemuCheck" @click="runEmulator(item)">{{$t('EMULATOR_CREATE_NEW')}}</v-btn>
										<v-btn :disabled="qemuCheck" @click="deleteImage(item)">{{$t('EMULATOR_DELETE_IMAGE')}}</v-btn>
									</div>
									<div v-else>
										<div v-if="item.progress <= 0">
											<v-btn :disabled="qemuCheck" @click="downloadImage(item)">{{$t('EMULATOR_DOWNLOAD_IMAGE')}}</v-btn>
										</div>
										<div v-else-if="item.progress>0 && item.progress < 100">
											<v-progress-circular
												:rotate="360"
												:size="25"
												:width="5"
												:value="item.progress"
												color="green"
											>
											<span style="margin-left: 25px; position: absolute; width: 80px; top: 2px;">{{ item.progress }} %</span>
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
					<v-alert tile v-if="qemuCheck === true" type="error">
						{{$t('EMULATOR_NO_QEMU_ERROR')}}
						<v-btn  @click="downloadQemu()" class="ml-4">{{$t('EMULATOR_DOWNLOAD_QEMU')}}</v-btn> 
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
								<v-tooltip top v-if="emulator.running === 1">
									<template v-slot:activator="{ on }">
										<v-btn text :disabled="qemuCheck" @click="stopEmulator(emulator)" v-on="on" class="emu-btn">
											<v-img src="plugins/notebook/data/img/icons/stop-icon.png"></v-img>
										</v-btn>
									</template>
									<span>{{$t('EMULATOR_STOP')}}</span>
								</v-tooltip>
								<v-tooltip top v-else>
									<template v-slot:activator="{ on }">
										<v-btn text :disabled="qemuCheck" @click="restartEmulator(emulator)" v-on="on" class="emu-btn">
											<v-img src="plugins/notebook/data/img/icons/run-icon.png"></v-img>
										</v-btn>
									</template>
									<span>{{$t('EMULATOR_RESTART')}}</span>
								</v-tooltip>
								<v-tooltip top>
									<template v-slot:activator="{ on }">
										<v-btn text :disabled="qemuCheck" @click="deleteEmulator(emulator)" v-on="on" class="emu-btn">
											<v-img src="plugins/notebook/data/img/icons/delete-icon.png"></v-img>
										</v-btn>
									</template>
									<span>{{$t('EMULATOR_DELETE')}}</span>
								</v-tooltip>
							</v-list-item-action>
						</v-list-item>
					</v-list>
					<v-alert tile v-if="qemuCheck === true" type="error">
						{{$t('EMULATOR_NO_QEMU_ERROR')}}
						<v-btn  @click="downloadQemu()" class="ml-4">{{$t('EMULATOR_DOWNLOAD_QEMU')}}</v-btn> 
					</v-alert>
				</v-tab-item>
			</v-tabs-items>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn text @click="close">{{$t('CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<style lang="less" scoped>
	@import '../style/emulator.less';
</style>

<script>
import { mapGetters } from 'vuex';
export default {
	data () {
		return {
			active: 0
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
		},
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
		async deleteImage(image)
		{
			this.studio.emulator.deleteImage(image);
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