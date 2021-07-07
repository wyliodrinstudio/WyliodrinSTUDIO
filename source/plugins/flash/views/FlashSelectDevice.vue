<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('FLASH_SELECT_BOARD')}}</span>
		</v-card-title>
		<v-card-text>
			<div>
				<v-row align="center" justify="center">
					<v-btn text @click="showDialog('esp')">ESP8266/ESP32</v-btn>
					<v-btn text @click="showDialog('micro')">Micro:bit</v-btn>
				</v-row>
			</div>
		</v-card-text>
		<v-card-actions>
			<v-spacer/>
			<v-btn text @click="close">{{$t('CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import FlashMicropythonESP from './FlashMicropythonESP.vue';
import FlashMicropythonMicrobit from './FlashMicropythonMicrobit.vue';

export default {
	name: 'FlashSelectDevice',
	methods: {
		close ()
		{
			this.$root.$emit ('submit');
		},
		showDialog (dialog)
		{
			this.close();
			if(dialog == 'esp')
				this.studio.workspace.showDialog (FlashMicropythonESP, {
					width: 500
				});
			else if(dialog == 'micro')
				this.studio.workspace.showDialog (FlashMicropythonMicrobit, {
					width: 500
				});
		}
	}
};
</script>