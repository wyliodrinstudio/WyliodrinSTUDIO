<template>
	<v-card id="conference-setup">
		<v-card-title>
			<span class="headline">{{$t('JITSI_CONFERENCE_SETUP')}}</span>
		</v-card-title>
		<v-card-text>
			<v-form v-model="isFormValid">
				<v-text-field required label="Name" v-model="userName" :rules="[rules.required, rules.counter]"></v-text-field>
				<v-text-field required label="Email" v-model="userEmail" :rules="[rules.required, rules.testEmail]"></v-text-field>
				<v-text-field required label="Room Name" v-model="roomName" :rules="[rules.required, rules.counter]"></v-text-field>
			</v-form>			
		</v-card-text>
		<v-card-actions>
			<v-btn :disabled="checkConferenceConditions()" text @click="createConference()" class="newapp">{{$t('JITSI_CREATE_NEW_CONFERENCE')}}</v-btn>
			<v-spacer></v-spacer>
			<v-btn text @click="close" ref="button">{{$t('JITSI_CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>
<script>
const electron = require("electron");

export default {
	data ()
	{
		return {
			domain: 'meet.jit.si',
			userName: '',
			userEmail: '',
			roomName: '',
			rules: {
				required: value => !!value || 'Required.',
				counter: value => value.length <= 30 || 'Maximum 30 characters allowed.',
				testEmail: value => {
					const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					return pattern.test(value) || 'Invalid e-mail.'
				},
			},
			isFormValid: false
		};
	},
	mounted ()
	{
	},
	methods: {
		esc() {
			this.close();
		},
		close ()
		{
			this.$root.$emit ('submit');
		},
		checkConferenceConditions() {
			let runningMeetings = this.studio.workspace.getFromStore('jitsi', 'runningMeetings');
			if(runningMeetings.length == 0 && this.isFormValid)
				return false;
			return true;
		},
		createConference() {
			/**Dispatch new meeting to jitsi store */
			this.studio.workspace.dispatchToStore('jitsi', 'userName', this.userName);
			this.studio.workspace.dispatchToStore('jitsi', 'userEmail', this.userEmail);
			this.studio.workspace.dispatchToStore('jitsi', 'roomName', this.roomName);
			this.studio.workspace.dispatchToStore('jitsi', 'checkExistingConference', true);
			let runningMeetings = this.studio.workspace.getFromStore('jitsi', 'runningMeetings');
			runningMeetings.push({conferenceId: this.roomName});
			this.studio.workspace.dispatchToStore('jitsi', 'runningMeetings', runningMeetings);

			/**Create new meeting in Conference Tab */
			
			let reference = document.querySelectorAll("div#meet")[0];
			const options = {
				roomName: this.roomName,
				width: '90%',
				height: '90%',
				parentNode: reference,
				userInfo: {
					email: this.userEmail,
					displayName: this.userName,
				}	
			};
			// const {
			// 	setupAlwaysOnTopRender,
			// 	setupScreenSharingRender,
			// 	RemoteControl
			// } = require("jitsi-meet-electron-utils");
			const api = new JitsiMeetExternalAPI(this.domain, options);
			// const alwaysOnTop = setupAlwaysOnTopRender(api);
			
			// setupScreenSharingRender(api);
			// alwaysOnTop.on('will-close', handleAlwaysOnTopClose);
			// const api = new JitsiMeetExternalAPI(this.domain, options);
			// const iframe = api.getIFrame();
			// new RemoteControl(iframe);
			

			// console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
			// console.log(api);
			// console.log(iframe);

			
			// api.addEventListener('toggleShareScreen',(event) => {
			// 	console.log('click');
			// 	let shareOptions = {
			// 		enabled: true
			// 	};
			// 	api.executeCommand('toggleShareScreen', shareOptions);
			// });

			api.addEventListener ('videoConferenceLeft', (event) => {
				api.dispose ();
				let updatedMeetings = runningMeetings.filter(meet => meet.conferenceId !== this.roomName);
				this.studio.workspace.dispatchToStore('jitsi', 'runningMeetings', updatedMeetings);
				this.studio.workspace.dispatchToStore('jitsi', 'checkExistingConference', false);
			});
			
			this.$root.$emit ('submit');
		}
	}
}
</script>

<style lang="less" scoped>
	@import '../style/jitsiconference.less';
</style>