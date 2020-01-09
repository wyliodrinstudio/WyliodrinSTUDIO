new Vue({
	el: '#dashboard-app',
	vuetify: new Vuetify(),
	data: {
		teams: [],
		answers: []
	},
	mounted() {
		setInterval(() => {
			this.$http.get('/api/v1/teams').then(response => {
				// get body data
				if (response.data.err) {
					console.log(response.data.err)
				} else {
					this.teams = response.data;
					this.teams.sort((a, b) => (a.score < b.score) ? 1 : -1);
					console.log(this.teams);
				}
			});
		}, 2500);
	}
});