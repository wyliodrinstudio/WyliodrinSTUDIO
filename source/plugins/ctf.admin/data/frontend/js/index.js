new Vue({
	el: '#questions-app',
	vuetify: new Vuetify(),
	data: {
		teamName: '',
		boardID: '',
		// enterTeamName: false,
		// enterBoardID: false,
		multiLine: true,
		snackbar1: false,
		snackbar2: false,
		teamNameUsed: false,
		response: ''
	},
	methods: {
		post: function(){
			if (!this.teamName) {
				this.snackbar1 = true;
			}
			if (!this.boardID) {
				this.snackbar2 = true;
			}
			if (this.teamName && this.boardID) {
				this.$http.post('/api/v1/team/add', { teamName: this.teamName, boardID: this.boardID} ).then ( response => {
					const {teamID, err} = response.data;

					if (err) {
						this.teamNameUsed = true;
						this.response = err;
					} else {
						localStorage.saveData = teamID;
						window.location.replace('/tasks.html');
					}
					
				})
			}
		}
	}
});