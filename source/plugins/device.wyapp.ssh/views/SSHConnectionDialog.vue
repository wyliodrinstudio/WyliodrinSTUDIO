<template>
	<v-card >
		<v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{$t('NETWORK_CONNECTION')}}</h3>
            </div>
          </v-card-title>
		<v-card-text>
			<v-layout class="input-container" wrap>
				<v-text-field :autofocus="!hasAddress" :label="$t('NETWORK_AUTHENTICATE_IP')" required v-model="address">{{$t('NETWORK_AUTHENTICATE_IP')}}</v-text-field>
				<v-text-field :label="$t('NETWORK_PORT')" required v-model="port">{{$t('NETWORK_PORT')}}</v-text-field>
				<v-text-field :autofocus="hasAddress && !hasUser" :label="$t('NETWORK_USERNAME')" required v-model="user">{{$t('NETWORK_USERNAME')}}</v-text-field>
				<v-text-field :autofocus="hasUser" :label="$t('NETWORK_PASSWORD')" required :type="showPassword?'text':'password'" v-model="password">{{$t('NETWORK_PASSWORD')}}</v-text-field>
			</v-layout>
		</v-card-text>
		<v-card-actions>
			<div class="onofftoggle">
				<v-switch v-model="showPassword" :label="$t('NETWORK_SHOWPASSWORD')"></v-switch>
			</div>
			<v-spacer></v-spacer>
			<v-btn text @click="connect">{{$t('DEVICE_CONNECT')}}</v-btn>
			<v-btn text @click="close">{{$t('EXIT')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
let optionsStore = {};
import _ from 'lodash';

export default {
	name: '',
	props: ['device'],
	data ()
	{
		let options = optionsStore[this.device.id] || {};
		return {
			showPassword: false,
			address: this.device.address || options.address || '',
			port: this.device.port || options.port || 22,

			user: this.device.properties.username || options.username || this.device.defaultUsername || '' ,
			password: this.device.properties.password || options.password || ''
		};
	},
	methods: {
		enter() {
			this.connect();
		}, 
		esc() {
			this.close();
		}, 
		connect ()
		{
			optionsStore[this.device.id] = {
				address: this.address,
				port: this.port,
				username: this.user,
				password: this.password
			};

			let username = null;
			let password = null;

			let boardDriver = this.studio.device_wyapp.getBoardDriver (this.device.board);

			console.log(this.device);

			if (boardDriver) username = this.device.defaultUsername;
			if (boardDriver) password = this.device.defaultPassword;

			console.log(username + ' ' + this.user);
			console.log(password + ' ' + this.password);


			if(username && password && ( this.password === password && this.user === username))
				this.studio.workspace.showNotification('DEVICE_WYAPP_CHANGE_CREDENTIALS', {}, 'warning');
			
			this.$root.$emit ('submit', {
				address: this.address,
				port: this.port,
				username: this.user,
				password: this.password
			});
		},
		close ()
		{
			this.$root.$emit('submit');
		}
	},
	computed: {
		hasAddress(){
			return this.address.trim() !== '';
		},
		hasUser(){
			if(this.device.defaultUsername)
				return this.device.defaultUsername.trim() !== '';
		}
	}
};
</script>