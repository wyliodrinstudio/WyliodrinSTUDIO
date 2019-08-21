<template>
  <div v-if="!in_use">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="library-box">
              <v-toolbar dark color="primary">
								<span class="headline"> {{$t('CHAT_LOGIN_TITLE')}} </span>
              </v-toolbar>
              <v-card-text>
                <v-form>
                	<v-text-field prepend-icon="dns" v-model="server" label="Server" type="text"></v-text-field>
                  <v-text-field prepend-icon="person" v-model="nickName" label="Login" v-on:keyup.enter="openChat" type="text"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" v-model="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="openChat" color="primary">{{ $t('CHAT_LOGIN_BUTTON') }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
  <div v-else>
  	<Chat @submit="reinit()" @changedNickName="rename" :nickName="nickName" :ircServer="server" :password="password">
  	</Chat>
  </div>


</template>

<script>
import Chat from './Chat.vue';
export default {
	name: 'Login',
	data() {
		return {
			in_use: false,
			server: 'tolkien.freenode.net',
			nickName: '',
			password: ''
		}
	},
	components: {
		Chat
	},
	methods: {
		openChat() {
			this.in_use = true;
		},
		reinit: function () {
      		this.nickName = '';
			this.in_use = false;
		},
		rename(nickName) {
			this.nickName = nickName;
		}
	}
};

</script>