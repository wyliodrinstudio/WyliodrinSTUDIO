new Vue({
	el: '#questions-app',
	data: {
		randomText: 10
	},
	methods: {
		changeText: function(){
			this.randomText = 15;
		}
	}
});