new Vue({
	el: '#login-app',
	vuetify: new Vuetify(),
	data: {
		hashTag: ''
	},
	mounted(){

	},
	methods: {
		login: function(){
			localStorage.saveData = this.hashTag;
			window.location.replace('/tasks.html');
		}
	}
});