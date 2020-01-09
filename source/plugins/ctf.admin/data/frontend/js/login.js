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
			localStorage.data = this.hashTag;
			window.location.replace('/tasks.html');
		}
	}
});