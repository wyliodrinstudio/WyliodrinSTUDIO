<template>
	<div ref="jitsi" id="meet">
		
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import $ from 'jquery';
window.$ = $;
export default {
	name: 'Jitsi',
	props: ['active'],
	data ()
	{
		return {
			videoTracks: [],
			audioTracks: [],
			// options: {
			// 	hosts: {
			// 		domain: 'jitsi-meet.example.com',
			// 		muc: 'conference.jitsi-meet.example.com' // FIXME: use XEP-0030
			// 	},
			// 	bosh: '//jitsi-meet.example.com/http-bind', // FIXME: use xep-0156 for that

			// 	// The name of client node advertised in XEP-0115 'c' stanza
			// 	clientNode: 'http://jitsi.org/jitsimeet'
			// }
			  
		};
	},
	computed: {
		...mapGetters ({
			runningMeetings: 'jitsi/runningMeetings',
			userName: 'jitsi/userName',
			userEmail: 'jitsi/userEmail',
			roomName: 'jitsi/roomName',
		}),
		forceUpdate ()
		{
			return true;
		},
	},
	watch: {
		roomName: function() {
			if(this.roomName !== '') {
				// JitsiMeetJS.init();
				// JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.INFO);

				// this.connect().then(connection => {
				// 	return this.createAndJoinRoom(connection, this.roomName);
				// })
				// .then(room => {
				// 	room.on(JitsiMeetJS.events.conference.TRACK_ADDED, track => this.addTrack(track));
				// 	this.createTracksAndAddToRoom(room);
				// })
				// .catch(error => console.error(error));
			}
		}
	},
	mounted ()
	{
		
	},
	methods: {
	// 	addTrack(track) {
	// 		if (track.getType() === 'video') {
	// 			this.videoTracks.push(track);
	// 		} else if (track.getType() === 'audio') {
	// 			this.audioTracks.push(track);
	// 		}
	// 		this.$nextTick().then(() => {
	// 			track.attach(this.$refs[track.getId()][0]);
	// 		})
	// 	},
	// 	createTracksAndAddToRoom(room) {
	// 		JitsiMeetJS.createLocalTracks({
	// 			devices: ['video', 'audio']
	// 		}).then((tracks) => {
	// 			tracks.forEach(track => {
	// 				room.addTrack(track);
	// 			});
	// 		}).catch(error => {
	// 				console.error('There was an error creating the local tracks:', error);
	// 			}
	// 		);
	// 	},

	// 	createAndJoinRoom(connection, roomName) {
	// 		return new Promise((resolve) => {
	// 			const room = connection.initJitsiConference(roomName, {});
	// 			room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, () => {
	// 				resolve(room);
	// 			});
	// 			room.join();
	// 		});
	// 	},

	// 	connect() {
	// 		return new Promise(((resolve, reject) => {
	// 			const connection = new JitsiMeetJS.JitsiConnection(null, null, this.options);

	// 			connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, () => {
	// 				resolve(connection);
	// 			});
	// 			connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, () => {
	// 				reject('The connection failed.');
	// 			});
	// 			connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, () => {
	// 				console.log("Connection disconnected");
	// 			});

	// 			connection.connect();
	// 		}))
	// 	}
	}
};
</script>

<style lang="less" scoped>
	@import '../style/jitsiconference.less';
</style>

