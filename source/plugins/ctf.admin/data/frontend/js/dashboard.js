new Vue({
	el: '#dashboard-app',
	vuetify: new Vuetify(),
	data: {
		teams: []
	},
	mounted() {
		setInterval(() => {
			this.$http.get('/api/v1/teams').then(response => {
				// get body data
				if (response.data.err) {
					console.log(response.data.err)
				} else {
					this.teams = response.data;
					console.log(this.teams);
				}
			}, response => {
				console.log(response);
			})}, 500);
	}
});