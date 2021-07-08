<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('FLASH_ESP')}}</span>
		</v-card-title>
		<v-card-text>
			<div>
				<v-row align="center" justify="center">
					<p>{{ progress.text }}</p>
					<v-progress-linear
						rounded
						striped
						:value="progress.value"
						height="15"
						:color="progress.color"
					></v-progress-linear>
				</v-row>
			</div>
		</v-card-text>
		<v-card-actions>
			<esp-web-install-button manifest="plugins/flash/data/micropython.json" hide-progress erase-first>
				<v-btn :disabled="progress.started" slot="activate" text>{{$t('START')}}</v-btn>
			</esp-web-install-button>
			<v-spacer/>
			<v-btn :disabled="progress.started" text @click="close">{{$t('BACK')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import FlashSelectDevice from './FlashSelectDevice.vue';

export default {
	name: 'FlashMicropythonESP',
	data ()
	{
		return  {
			webToolsScript: null,
			progress: {
				value: 0,
				text: 'Press START to begin.',
				color: 'teal',
				started: false
			}
		};
	},
	mounted() {
		this.webToolsScript = document.createElement('script');
		this.webToolsScript.setAttribute('src', 'https://unpkg.com/esp-web-tools@3.4.2/dist/web/install-button.js?module');
		this.webToolsScript.setAttribute('type', 'module');
		document.head.appendChild(this.webToolsScript);

		document.getElementsByTagName('esp-web-install-button')[0].addEventListener(
			'state-changed', (ev) => { 
				this.progress.text = ev.detail.message;

				if(ev.detail.state == 'initializing') {
					this.progress.started = true;
					this.progress.color = 'teal';
				} else if(ev.detail.state == 'writing') {
					this.progress.value = ev.detail.details.percentage;
				} else if(ev.detail.state == 'finished') {
					this.progress.color = 'red';
					this.progress.started = false;
				} else if(ev.detail.state == 'error') {
					this.progress.started = false;
					this.progress.color = 'red';
				}
			}
		);
	},
	methods: {
		close ()
		{
			this.$root.$emit ('submit');
			document.head.removeChild(this.webToolsScript);
			this.studio.workspace.showDialog (FlashSelectDevice, {
				width: 500
			});
		}
	}
};
</script>