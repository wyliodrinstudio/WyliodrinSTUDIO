<template>

	<div v-if="!registered">

		<v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
          	<v-progress-circular indeterminate color="red"></v-progress-circular>
          	<v-btn small @click="cancel"> {{ $t('CHAT_CHANNEL') }} </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

	</div>
	<div v-else>
  	<v-container fluid grid-list-md>

   		<v-layout row wrap>
      	<v-flex d-flex xs12 sm6 md3>
        	<v-layout row wrap>
        
          	<v-flex d-flex>
              <v-card>
                <blockquote class="blockquote">
            			{{ nickName }}
            		</blockquote>
              	<blockquote class="blockquote" v-if="joined">
              		{{ channelName }}
              	</blockquote>
              	
              </v-card>
            </v-flex>
          
      
       	  	<v-flex d-flex xs12>
       	  		<v-card>
                <v-card-text>
                		<v-btn @click="disconnect"> {{ $t('CHAT_DISCONNECT') }} </v-btn>
                </v-card-text>
              </v-card>
            </v-flex>
	          
	          <v-layout row wrap>
       	  		<v-flex d-flex xs12>
       	  			<v-card>
						<v-card-text>
							<ul>
								<li v-for="channel in allConversations" :key="channel">
									<div v-if="messages[channel.toLowerCase()].unreadMessages">
										<v-btn color="red" @click="changeContext(channel)"> {{ channel }} </v-btn>
									</div>
									<div v-else>
										<v-btn @click="changeContext(channel)"> {{ channel }} </v-btn>
									</div>
								</li>
											</ul>
						</v-card-text>
						<v-btn fab   @click="addChatDialog()">
							<v-icon dark>add</v-icon>
						</v-btn>
            		</v-card>
          		</v-flex>
        	  </v-layout>
      
            
          

          </v-layout>
        </v-flex>
      </v-layout>

        

      <div v-if="joined">
	      <div style="position: absolute; top: 0; bottom: 0; right: 0; width: 70%; overflow-y:auto;">
	        <v-card>
	          <v-card-text >
	          	<v-list three-line background-color="#e5edef" ref="messages">
					<template v-for="message in currentChannel.conversation">

						<v-list-item :key="message.id">
							
							<v-list-item-content>

								<v-list-item-title>{{message.from}} - {{message.time}}</v-list-item-title>
              					<v-list-item-subtitle > 
									  	<a v-if="message.link" :href="message.message" @click.prevent="openLink (message.message)"> {{message.message}} </a>  
										<div v-else> {{ message.message }} </div>
								</v-list-item-subtitle>

								<v-flex xs5>
									<v-layout column>
										<div class="subheading">{{ message.preview.description }}</div>
            							<v-img v-if="message.preview.image" width="200px" aspect-ration="1" :src="message.preview.image"></v-img>
									</v-layout>
								</v-flex>

							</v-list-item-content>

						</v-list-item>

					</template>
	          	</v-list>
	          </v-card-text>
	          
	        </v-card>
	      </div>
      	<v-text-field v-on:keyup.enter="sendMessage" :label="$t('CHAT_TYPE_MESSAGE')"  required v-model="writeMessage"></v-text-field>
		<v-btn @click="sendMessage"> <v-icon dark>send</v-icon></v-btn>
		<v-btn @click="partChannel">{{ $t('CHAT_PART_CHANNEL') }}</v-btn>

		<v-card-text>
			<ul>
				<li v-for="user in localUsers" :key="user.id" @click="sendPrivateMessage(user)">
					<div>
						<v-btn> {{ user }} </v-btn>
					</div>
				</li>
			</ul>
        </v-card-text>		

	</div>
  </v-container>
</div>
</template>


<script>
import AddChannelDialog from './AddChannelDialog.vue';
import grabity from 'grabity';
import { shell } from 'electron';

var irc = require('irc-upd');
import path from 'path';
let settings = {
	workspace: {
		path: path.join (require('os').homedir(), 'WyliodrinSTUDIO')
	}
};


export default {
	name: 'Chat',
	props: ['nickName', 'ircServer', 'password'],
	data() {
		return {
			client: '',
			channelName: '#',
			registered: false,
			joinReceived: false,
			pageNumber: 0,
			connected: false,
			joinedChannels: [],
			completeChannelList: [],
			channelList: [],
			forListing: false,
			listed: false,
			joined: false,
			userName: 'user',
			realName: 'real',
			portNumber: 6697,
			newChannel: '',
			messages: [],
			currentChannel: [],
			channelsJoined: [],
			allConversations: [],
			writeMessage: '',
			completeUsersList: [],
			urlRegex: '',
			urlRegexRaw: /(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm
		}
	},
	created() {
		this.urlRegex = new RegExp(this.urlRegexRaw);
		this.client = new irc.Client(this.ircServer, this.nickName, {
				userName: this.userName,
				realName: this.realName,
				showErrors: true,
				port: this.portNumber,
				secure: true
			});
		this.client.addListener('registered', (message) => {
			this.registered = true;
		})
		this.client.addListener('message', async (from, to, message) => {
			from = from.toLowerCase();
			if (!this.channelsJoined.includes(from) && to == this.nickName) {
				// nu este initiata conversatie cu acel nick
				if (!this.messages[from]) {
					this.allConversations.push(from);
					this.messages[from] = {conversation: [], unreadMessages: 0};
				}
				let linkValue = false;
				let grab = '';
				let response = '';
				let matching = message.match(this.urlRegex);
				if (matching) {
					linkValue = true;
					if (!matching[0].startsWith('http'))
						response = await this.linkInChannel('https://' + matching[0], grab);
					else
						response = await this.linkInChannel(matching[0], grab);
				}
				this.messages[from].conversation.push({from: from, message: message, time: this.getTime(), link: linkValue, preview: response});
				let bigList = this.messages;
				this.messages.splice(0);
				this.messages.push(...bigList);
				if (from != this.channelName)
					this.messages[from].unreadMessages += 1;
				
			}
		});

		this.client.addListener('message#', async (from, to, message) => {
			to = to.toLowerCase();
			if (to != this.channelName.toLowerCase())
				this.messages[to].unreadMessages += 1;
			let linkValue = false;
			let grab = '';
			let response = '';
			let matching = message.match(this.urlRegex);
			if (matching) {
				linkValue = true;
				if (!matching[0].startsWith('http'))
					response = await this.linkInChannel('https://' + matching[0], grab);
				else
					response = await this.linkInChannel(matching[0], grab);
			}
			this.messages[to].conversation.push({from: from, message: message, time: this.getTime(), link: linkValue, preview: response});
			
			this.currentChannel = this.messages[this.channelName.toLowerCase()];
			let bigList = this.messages;
			this.messages.splice(0);
			this.messages.push(...bigList);
			this.$forceUpdate();	
		});
		this.client.addListener('names', (channel, nicks) => {
			channel = channel.toLowerCase();
			if(!this.completeUsersList[channel]) {
				let nicknames = Object.keys(nicks);
				this.completeUsersList[channel] = nicknames;
				this.localUsers = this.completeUsersList[channel];
			}
		});
    	this.client.addListener('join', (channel, who) => {
			let myNewName = false;
			if(!(this.channelsJoined.filter((channelItem) => 
				channel.toLowerCase() == channelItem.toLowerCase()).length)) {
					this.channelName = channel;
				}
			if (!this.joinReceived) {
				this.joinReceived = true;
				if (!this.messages[this.channelName.toLowerCase()]) {
  					this.messages[this.channelName.toLowerCase()] = {conversation: [], unreadMessages: 0};
  				}
				this.changeContext(this.channelName.toLowerCase());
				this.channelsJoined.push(this.channelName);
				this.allConversations.push(this.channelName);
		 		this.joined = true;
				if (who != this.nickName) {
					myNewName = true;
					this.$emit('changedNickName', who);
					this.studio.workspace.showNotification('CHAT_TAKEN_NAME', {
						nickName: who
					});
				}	
			}
			if (who != this.nickName && !myNewName) {
				this.completeUsersList[this.channelName].push(who);
				let list = this.completeUsersList;
				this.completeUsersList.splice(0);
				this.completeUsersList.push(...list);
			}
    		this.messages[channel].conversation.push({from: ' /// ' + who, message: ' has joined ' + this.channelName, time: this.getTime(), link: false, preview: ''});
    		this.currentChannel = this.messages[this.channelName];
    	});

		this.client.addListener('part', (channel, who) => {
			channel = channel.toLowerCase();
			this.messages[channel].conversation.push({from: ' \\\\\\ ' + who , message: ' has quit ' + this.channelName, time: this.getTime(), link: false, preview: ''});
			this.currentChannel = this.messages[this.channelName];
			var list = this.completeUsersList[channel];
			var index = list.indexOf(who);
			list.splice(index, 1);
			this.completeUsersList[channel] = list;
			let bigList = this.completeUsersList;

			this.completeUsersList.splice(0);
			this.completeUsersList.push(...bigList);
			this.$forceUpdate();
    	});
		this.client.addListener('error', (message) => {
			if (message.command == 477)
				this.studio.workspace.showNotification('CHAT_COULD_NOT_JOIN_CHANNEL');
		});
		this.client.addListener('channellist', (channelList) => {
			this.completeChannelList.splice (0);
			this.completeChannelList.push (...channelList.sort((a, b) => (Number(a.users) < Number(b.users)) ? 1 : -1));
			this.channelList = this.completeChannelList.slice(0, 5);
			this.forListing = false;
		});
	},
	computed: {
		localUsers: {
			get: function() {
				let i = [];
				if (this.completeUsersList[this.channelName.toLowerCase()]) {
					i = this.completeUsersList[this.channelName.toLowerCase()].filter((user) => {
						return this.nickName != user;
					});
				}
				return i;
			},
			set: function() {}
		}
	},
	methods: {
		openLink (link)
		{
			shell.openExternal (link);
		},
		async linkInChannel(matchLink, grab) {
			console.log(matchLink);
			grab = await grabity.grabIt(matchLink);
			return grab;
		},
		getTime() {
			var today = new Date();
			return today.getHours() + ":" + today.getMinutes();
		},
		cancel() {
			this.$emit('submit');
		},
		async disconnect() {
			let value = await this.studio.workspace.showConfirmationPrompt('CHAT_TITLE_DISCONNECT', 'CHAT_TEXT_DISCONNECT');
			if (value)
				this.client.disconnect(() => {
					this.$emit('submit');
				});
		},
		changeContext(channelName) {
			if (this.messages[channelName.toLowerCase()])
				this.messages[channelName.toLowerCase()].unreadMessages = 0;
			this.channelName = channelName;
			this.currentChannel = this.messages[this.channelName.toLowerCase()];
		},
		sendPrivateMessage(user) {
			console.log(this.completeUsersList[this.channelName.toLowerCase()]);
			if (!this.allConversations.includes(user)) {
				this.allConversations.push(user);
				this.messages[user] = {conversation: [], unreadMessages: 0};
				this.changeContext(user);
			}
		},
		async sendMessage() {
			if (this.writeMessage.trim()) {
				let toBeSent = this.writeMessage.trim();
				this.writeMessage = '';
				let linkValue = false;
				let grab = '';
				let response = '';
				let matching = toBeSent.match(this.urlRegex);
				if (matching) {
					linkValue = true;
					if (!matching[0].startsWith('http'))
						response = await this.linkInChannel('https://' + matching[0], grab);
					else
						response = await this.linkInChannel(matching[0], grab);
				}
				this.messages[this.channelName.toLowerCase()].conversation.push({from: this.nickName, message: toBeSent, time: this.getTime(), link: linkValue, preview: response});
				this.currentChannel = this.messages[this.channelName.toLowerCase()];
				let bigList = this.messages;
				this.messages.splice(0);
				this.messages.push(...bigList);
				this.client.say(this.channelName.toLowerCase(), toBeSent);
			} else {
				this.studio.workspace.showNotification('CHAT_INSERT_CHANNEL_MESSAGE');
			}
		},
		async partChannel() {

			let value = await this.studio.workspace.showConfirmationPrompt('CHAT_TITLE_WARNING', 'CHAT_TEXT_PART_CHANNEL');
    		
			if (value) {
				this.client.part(this.channelName, () => {
					delete this.messages[this.channelName.toLowerCase()];
					delete this.completeUsersList[this.channelName.toLowerCase()];
					var index = this.channelsJoined.indexOf(this.channelName.toLowerCase());
					this.channelsJoined.splice(index, 1);
					index = this.allConversations.indexOf(this.channelName.toLowerCase());
					this.allConversations.splice(index, 1);
					if (!this.channelsJoined.length)
						this.joined = false;
					this.changeContext(this.channelsJoined[0]);
				});
			}
		},
		async addChatDialog() {
			this.client.list();
			this.joinReceived = false;
			let value = await this.studio.workspace.showDialog(AddChannelDialog, {
					'client': this.client,
					'completeChannelList': this.completeChannelList
			});
			if (value)
				this.client.join(value.channelName.toLowerCase());	
		}
	}
};
</script>


