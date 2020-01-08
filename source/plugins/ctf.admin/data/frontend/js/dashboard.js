new Vue({
	el: '#dashboard-app',
	vuetify: new Vuetify(),
	data: {
		teams: []
	},
	mounted() {
		//
			this.$http.get('/api/v1/answers').then(response => {
				// get body data
				if (response.data.err) {

				} else {
					this.teams = JSON.parse(response.data);
					console.log(this.teams)
				}
			}, response => {
				// error callback
				console.log('get error');
			})//, 5000);
	}
});