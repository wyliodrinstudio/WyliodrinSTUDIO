<template>
	<v-card >
		<v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{$t('CLASSROOM_CONNECT')}}</h3>
            </div>
          </v-card-title>
		<v-card-text>
			<v-select :items="roles" v-model="role" :label="$t('CLASSROOM_ROLE')">

			</v-select>
			<v-layout class="input-container" wrap>
				<v-text-field :autofocus="!hasServer" :label="$t('CLASSROOM_SERVER')" :rules="serverRules" v-model="server">{{$t('CLASSROOM_SERVER')}}</v-text-field>
			</v-layout>
			<v-layout v-if="isStudent" class="input-container" wrap>
				<v-text-field :autofocus="hasServer && !hasUser" :label="$t('CLASSROOM_USER_NAME')" required v-model="name">{{$t('CLASSROOM_USER_NAME')}}</v-text-field>
				<v-text-field :autofocus="hasUser" :label="$t('CLASSROOM_SECRET')" required type="text" v-model="secret">{{$t('CLASSROOM_SECRET')}}</v-text-field>
			</v-layout>
			<v-layout v-if="!isStudent" class="input-container" wrap>
				<v-text-field :autofocus="hasServer && !hasUser" :label="$t('CLASSROOM_USERNAME')" required v-model="user">{{$t('CLASSROOM_USERNAME')}}</v-text-field>
				<v-text-field :autofocus="hasUser" :label="$t('CLASSROOM_PASSWORD')" required type="password" v-model="password">{{$t('CLASSROOM_PASSWORD')}}</v-text-field>
			</v-layout>
		</v-card-text>
		<v-card-actions>
			<div class="onofftoggle">
				<v-switch v-show="isStudent" v-model="allowDeviceAccess" :label="$t('CLASSROOM_ALLOW_DEVICE_ACCESS')"></v-switch>
			</div>
			<v-spacer></v-spacer>
			<v-btn text @click="connect">{{$t('CLASSROOM_JOIN')}}</v-btn>
			<v-btn text @click="close">{{$t('EXIT')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import { isURL } from "validator";

let usedSecret = '';
let usedPassword = '';

export default {
	name: 'ClassroomConnect',
	data ()
	{
		const ROLES = [{
				value: 'student', 
				text: this.$t('CLASSROOM_ROLE_STUDENT')
			},
			{
				value: 'instructor',
				text: this.$t('CLASSROOM_ROLE_INSTRUCTOR')
			}];
		return {
			roles: ROLES,
			role: this.studio.settings.loadValue ('classroom', 'role', 'student'),
			server: this.studio.settings.loadValue ('classroom', 'server', ''),
			name: this.studio.settings.loadValue ('classroom', 'name', ''),
			secret: usedSecret,
			allowDeviceAccess: false,
			user: this.studio.settings.loadValue ('classroom', 'user', ''),
			password: usedPassword
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
			if (isURL (this.server))
			{
				this.studio.settings.storeValue ('classroom', 'role', this.role);
				this.studio.settings.storeValue ('classroom', 'server', this.server);
				if (this.isStudent)
				{
					this.studio.settings.storeValue ('classroom', 'name', this.name);
					usedSecret = this.secret;
					this.$root.$emit('submit', {
						role: this.role,
						server: this.server,
						name: this.name,
						secret: this.secret,
						allowDeviceAccess: this.allowDeviceAccess,
					});
				}
				else
				{
					this.studio.settings.storeValue ('classroom', 'username', this.username);
					usedPassword = this.password;
					this.$root.$emit('submit', {
						role: this.role,
						server: this.server,
						username: this.username,
						password: this.password,
					});
				}
				
			}
		},
		close ()
		{
			this.$root.$emit('submit');
		}
	},
	computed: {
		hasServer(){
			return this.server.trim() !== '';
		},
		hasName () {
			return this.name.trim() !== '';
		},
		hasUser () {
			return this.user.trim() !== '';
		},
		isStudent () {
			console.log (this.role);
			return this.role === 'student';
		},
		serverRules () {
			const rules = [
				v => isURL (v) || this.$t('CLASSROOM_REQUIRES_SERVER')
			];
			return rules;
		}
	}
};
</script>