<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t("SETUP YOUR GOOGLE FLAG")}}</span>
		</v-card-title>
		<v-card-text>
			<div>
				{{$t("1. Accesati in browser chrome://flas")}}
			</div>
			<div>
				{{$t("2. Cautati in bara de search: #enable-experimental-web-platform-features")}}
			</div>
			<div>
				{{$t("3. Dati ENABLE flag-ului respectiv.")}}
			</div>
			<div>
				{{$t("ATENTIE! Pentru a functiona trebuie sa fiti pe o conexiune securizata.")}}
			</div>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn text @click="flash" v-show="binary">{{$t('DEVICE_ESP_FLASH')}}</v-btn>
			<v-btn text @click="close">{{$t('CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: 'ChromeFlagSetup',
	props: ['token', 'binary', 'filename'],
	data () {
		return {
			value: ''
		};
	},
	computed: {
		json ()
		{
			return JSON.stringify ({token: this.token, id: this.value.trim (), server: window.location.href+'socket/remote'}, null, 2);
		},
		nameValid ()
		{
			return (this.value.trim ().length > 0);
		}
	},
	methods: {
		flash ()
		{
			this.studio.filesystem.openExportDialog (this.binary, {filename: this.filename+'.bin', type:'application/binary'});
		},
		close ()
		{
			this.$root.$emit ('submit');
		}
	}
}
</script>