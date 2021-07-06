<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('FLASH_ESP')}}</span>
		</v-card-title>
		<v-card-text justify="center">

		</v-card-text>
		<v-card-actions>
			<esp-web-install-button manifest="plugins/flash/data/micropython.json">
				<v-btn slot="activate" text>{{$t('START')}}</v-btn>
			</esp-web-install-button>
			<v-spacer/>
			<v-btn text @click="close">{{$t('BACK')}}</v-btn>
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
			webToolsScript: null
		};
	},
	mounted() {
		this.webToolsScript = document.createElement('script');
		this.webToolsScript.setAttribute('src', 'https://unpkg.com/esp-web-tools@3.4.2/dist/web/install-button.js?module');
		this.webToolsScript.setAttribute('type', 'module');
		document.head.appendChild(this.webToolsScript);

		document.getElementsByTagName('esp-web-install-button')[0].addEventListener(
			'state-changed', (ev) => { 
				if(ev.detail.state == 'initializing') {
					let log = document.getElementsByTagName('esp-web-install-button')[0].shadowRoot.querySelector('esp-web-flash-progress');
					log.parentNode.removeChild(log);
					document.getElementsByClassName('v-card__text')[0].appendChild(log);
				}
			}
		);
	},
	methods: {
		close ()
		{
			this.$root.$emit ('submit');
			this.studio.workspace.showDialog (FlashSelectDevice, {
				width: 500
			});
		}
	}
};
</script>