<template>
	<div>
		<div class="terminal-btns">
			<v-tooltip top>
				<template v-slot:activator="{ on }">
					<v-btn small @click="close" v-on="on">
						<v-img src="plugins/mqtt/data/img/icons/close-icon.svg"></v-img>
					</v-btn>
				</template>
				<span>{{$t('CLOSE')}}</span>
			</v-tooltip>
		</div>
		<div class="terminal-actions">
			<span v-if="status === 'running'">MQTT Server {{status}} port {{port}}</span>
			<span v-else>MQTT Server {{status}}</span>
			<span v-if="status !== 'running'">
				<v-text-field color="primary"
					required v-model="port"
					label="Port number"
					single-line
					hide-details
					dark
					flat
				></v-text-field>
			</span>	
			<div class="terminal-btns">
				<v-tooltip top v-if="status !== 'running'">
					<template v-slot:activator="{ on }">
						<v-btn small @click="start" v-on="on">
							<v-img src="plugins/mqtt/data/img/icons/run-icon.svg"></v-img>
						</v-btn>
					</template>
					<span>Start</span>
				</v-tooltip>
				<v-tooltip top v-else>
					<template v-slot:activator="{ on }">
						<v-btn small @click="stop" v-on="on">
							<v-img src="plugins/mqtt/data/img/icons/stop-icon.svg"></v-img>
						</v-btn>
					</template>
					<span>Stop</span>
				</v-tooltip>
			</div>
		</div>
		<div>
			<v-text-field color="primary"
					required v-model="username"
					label="Username"
					single-line
					hide-details
					dark
					flat
			></v-text-field>
			<v-text-field color="primary"
				:type="'password'"
				required v-model="password"
				label="Password"
				single-line
				hide-details
				dark
				flat
			></v-text-field>
		</div>
	</div>
</template>

<style lang="less" scoped>
	@import '../style/mqtt.less';
</style>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'MQTTServer',
	data() {
		return {
			port: 1884,
			username: '',
			password: ''
		}
	},
	computed: {
		...mapGetters ({
			status: 'mqtt/status'
		})
	},
	methods:
	{
		start ()
		{
			this.studio.mqtt.start (this.port, this.username, this.password);
			// let settings = {
			// 	port: 1883
			// };
			
		},
		stop ()
		{
			this.studio.mqtt.stop ();
		},
		close ()
		{
			this.studio.workspace.closeStatusButton ()
		},
		esc ()
		{
			this.close ();
		}
	}
}
</script>