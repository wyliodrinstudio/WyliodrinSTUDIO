export default {
	namespaced: true,
	state: 
	{
		runningMeetings: [],
		userName: '',
		userEmail: '',
		roomName: '',
		checkExistingConference: false
	},
	getters: 
	{
		runningMeetings: (state) => state.runningMeetings,
		userName: (state) => state.userName,
		userEmail: (state) => state.userEmail,
		roomName: (state) => state.roomName,
		checkExistingConference: (state) => state.checkExistingConference,
	},
	actions:
	{
		runningMeetings: ({commit}, runningMeetings) => commit('runningMeetings', runningMeetings),
		userName: ({commit}, userName) => commit('userName', userName),
		userEmail: ({commit}, userEmail) => commit('userEmail', userEmail),
		roomName: ({commit}, roomName) => commit('roomName', roomName),
		checkExistingConference: ({commit}, checkExistingConference) => commit('checkExistingConference', checkExistingConference),
	},
	mutations:
	{
		runningMeetings: (state, value) => state.runningMeetings = value,
		userName: (state, value) => state.userName = value,
		userEmail: (state, value) => state.userEmail = value,
		roomName: (state, value) => state.roomName = value,
		checkExistingConference: (state, value) => state.checkExistingConference = value,
	}
};