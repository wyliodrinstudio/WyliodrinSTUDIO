<template>
	<v-card class="library-box">
		<v-card-title>
			<span class="headline">{{$t('CHAT_WELCOME_ADD_CHANNEL')}}</span>
		</v-card-title>
		<v-card-text>
          	<v-text-field autofocus v-on:keyup.enter="joinChannel" :label="$t('CHAT_NEW_CHANNEL')"  required v-model="channelName"></v-text-field>

          	<v-list shaped>
        		<v-subheader>{{ $t('CHAT_AVAILABLE_CHANNELS') }}</v-subheader>
    			<v-list v-if="!waiting">
    				<v-list-item v-for="channel in channelList" :key="channel.id" @click="joinChannelList(channel.name)">

      					<v-list-item-action>
            				<v-icon color="red">dot</v-icon>
          				</v-list-item-action>

        				<v-list-item-content>
          					<v-list-item-title> {{ channel.name }} + ' - ' + {{ channel.users }} + {{ $t('CHAT_USERS') }}</v-list-item-title>
        				</v-list-item-content>
      				</v-list-item>
      			</v-list>
				<v-list v-else>
					<v-progress-circular indeterminate color="red"></v-progress-circular>
				</v-list>
      		</v-list>
      			
        </v-card-text>
        <v-card-actions>
        	<v-btn @click="joinChannel">{{ $t('CHAT_JOIN_CHANNEL') }}</v-btn>
			<v-btn @click="esc">{{ $t('CHAT_CANCEL') }}</v-btn>
        </v-card-actions>

	</v-card>
</template>

<script>
	

export default {
	name: 'AddChannelDialog',
	props: ['client', 'completeChannelList'],
	data() {
		return {
			dap: 1,
			channelName: '#',
			filteredChannelList: [],
			waiting: false,
		}
	},
	created() {
		if (!this.completeChannelList.length)
			this.waiting = true;
		else {
			this.channelList = this.completeChannelList.slice(0, 100);
		}
	},
	watch: {
		completeChannelList: function(newC, oldC) {
			this.waiting = false;
		}
	},
	computed: {
		channelList: {
			get: function() {
				if (this.channelName.length > 1) {
					this.filteredChannelList = this.completeChannelList.filter((currentChannel) => {
						return (currentChannel.name.search(this.channelName) != -1);
					});
						return this.filteredChannelList.slice(0, 100);
				}
				else {
					return this.completeChannelList.slice(0, 100);
				}
			},
			set: function(newValue) {}		
		}
	},
	methods: {
		joinChannel() {
			if (this.channelName != '#') {
				this.$root.$emit('submit', {
					channelName: this.channelName
				});
			} else {
				this.studio.workspace.showNotification('CHAT_INSERT_CHANNEL_NAME');
			}
		},
		joinChannelList(channelName) {
			this.channelName = channelName;
			this.joinChannel();
		},
		esc() {
			this.$root.$emit('submit');
		}
	}
};
</script>