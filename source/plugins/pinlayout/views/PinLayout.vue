<template>
	<div class="pin-box" align="center">
		<v-img :src="changeBoardPinsImage" aspect-ratio="3.11" contain height="100%" width="100%" max-height="874px"></v-img>
	</div>
</template>
<script>

import path from 'path';
import { mapGetters } from 'vuex';

export default {
	name: 'PinLayout',
	data() {
		return {
			
		};
	},
	computed: {
		...mapGetters ({
			device: 'workspace/device',
			status: 'workspace/status',
		}),
		changeBoardPinsImage () {
			return this.studio.pin_layout._pinsLayoutImage (this.device.type, this.device.board) || '';
		}
	},
	methods: {
	}
}
</script>

<style lang="less" scoped>
	@import '../style/pinLayout.less';
</style>