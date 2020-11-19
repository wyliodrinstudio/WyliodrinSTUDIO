<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_TITLE')}}</span>
		</v-card-title>
		<v-card-text>
			<v-select
				:label="$t('DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_TYPE')"
				:items="boards"
				item-text="name"
				item-value="board"
				v-model="board"
			>
			</v-select>
			<v-text-field autofocus :label="$t('DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_NAME')" required v-model="value"></v-text-field>
			<pre v-show="nameValid">{{json}}</pre>
			<div v-show="!nameValid">{{$t('DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_NAME_NOT_VALID')}}</div>
			<div v-show="nameValid && setupPath">
				<a :href="'data:text/plain;charset=utf-8, '+ encodeURIComponent(json)" download="wyliodrin.json">{{$t('DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_DOWNLOAD')}}</a> <i>wyliodrin.json</i> {{$t('DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_DOWNLOAD_PART2')}} <i>{{setupPath}}</i>
			</div>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn text v-show="wifiLink" @click="wifi">{{$t('DEVICE_WYAPP_WEBSOCKET_SETUP_WIFI')}}</v-btn>
			<v-btn text @click="more">{{$t('DEVICE_WYAPP_WEBSOCKET_MORE_INFO')}}</v-btn>
			<v-btn text @click="close">{{$t('CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: 'DeviceSetup',
	props: ['token'],
	data () {
		return {
			value: '',
			boards: this.studio.device_wyapp.listBoards (),
			board: this.studio.device_wyapp.listBoards ()[0].board
		};
	},
	computed: {
		json ()
		{
			let server = window.location.href;
			if (server.startsWith('file://')) server = 'https://beta.wyliodrin.studio/';
			return JSON.stringify ({token: this.token, id: this.value.trim (), server: server+'socket/remote'}, null, 2);
		},
		nameValid ()
		{
			return (this.value.trim ().length > 0);
		},
		wifiLink ()
		{
			let wifiLink = null;
			let board = this.boards.find ((board) => board.board === this.board);
			if (board && board.setupOptions) wifiLink = board.setupOptions.wifiLink;
			return wifiLink;
		},
		setupPath ()
		{
			let setupPath = null;
			let board = this.boards.find ((board) => board.board === this.board);
			if (board && board.setupOptions) setupPath = board.setupOptions.path;
			return setupPath;
		},
	},
	methods: {
		wifi ()
		{
			let board = this.boards.find ((board) => board.board === this.board);
			this.studio.system.openLink (this.wifiLink);
		},
		more ()
		{
			let board = this.boards.find ((board) => board.board === this.board);
			this.studio.system.openLink (board && board.setupOptions?board.setupOptions.link:'https://wyliodrinstudio.readthedocs.io/en/latest/boards.html');
		},
		close ()
		{
			this.$root.$emit ('submit');
		}
	}
};
</script>