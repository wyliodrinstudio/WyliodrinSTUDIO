<template>
	<v-layout row justify-center>
		<v-dialog :value="show" persistent content-class="library-box">
			<v-card class="manager-box">
				<v-card-title>
					<span class="headline">{{$t('WYLIODRIN_USERINTERFACE_devicename')}}</span>
					<v-spacer></v-spacer>
				</v-card-title>
				<v-card-text>
					
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn text @click="studio.hideDeviceManager">{{$t('TOOLBAR_CLOSE')}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-layout>
</template>

<script>
const mapGetters = require ('vuex').mapGetters;
module.exports = {
	name: 'DeviceManager',
	data () {
		return {
			
		};
	},
	computed: {
		...mapGetters ({
			show: 'managers/device',
			device: 'link/device',
			connection: 'link/connection'
		}),
	},
	created () {
		
	},
	destroyed ()
	{
		
	}
};
</script>

