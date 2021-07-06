<template>
	<v-card>
		<v-card-title>
			<span class="headline">Flash MicroPython</span>
		</v-card-title>
		<v-card-text justify="center">

		</v-card-text>
		<v-card-actions>
			<esp-web-install-button manifest="plugins/devices/mp/data/micropython.json">
				<v-btn slot="activate" text>START</v-btn>
			</esp-web-install-button>
			<v-spacer/>
			<v-btn text @click="close">{{$t('CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import MicroPythonConnectionDialog from './MicroPythonConnectionDialog.vue';

export default {
	name: 'FlashMicropython',
	props: ['device'],
	mounted() {
		let webToolsScript = document.createElement('script');
		webToolsScript.setAttribute('src', 'https://unpkg.com/esp-web-tools@3.4.2/dist/web/install-button.js?module');
		webToolsScript.setAttribute('type', 'module');
		document.head.appendChild(webToolsScript);

		document.getElementsByTagName('esp-web-install-button')[0].addEventListener(
			"state-changed", (ev) => { 
				if(ev.detail.state == "initializing") {
					let log = document.getElementsByTagName('esp-web-install-button')[0].shadowRoot.querySelector('esp-web-flash-progress');
					log.parentNode.removeChild(log);
					document.getElementsByClassName('v-card__text')[0].appendChild(log);
				} else if(ev.detail.state == "finished") {
					this.close();
					this.studio.workspace.showDialog (MicroPythonConnectionDialog, {
							device: this.device,
							width: '500px'
					});
				}
			}
		);
	},
	methods: {
		close ()
		{
			this.$root.$emit ('submit');
		}
	}
};
</script>