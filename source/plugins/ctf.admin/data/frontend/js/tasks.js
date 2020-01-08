new Vue({
    el: '#tasks-app',
    vuetify: new Vuetify(),
    data: {
        multiLine: false,
        response: '',
        questionDialog: false,
        questions: [],
        currentQuestion: null,
        flag: '',
        teams: [],
        serverResponse: '',
        snackbar1: false
    },
    mounted() {
        this.$http.get('/api/v1/questions').then(response => {
            // get body data
            this.questions = response.data;
            console.log(this.questions.length)
        }, response => {
            // error callback
            console.log('get error');
        });
    },
    methods: {
        submit: function () {
            this.questionDialog = false;
            let teamNameUsed = 'salut';
            this.$http.post('/api/v1/answer/finish', { teamName: teamNameUsed, questionText: this.currentQuestion, teamAnswer: this.response }).then(response => {
                if (response.data.err) {
                    this.serverResponse = response.data.err;
                    this.snackbar1 = true;
                } else {
                    this.snackbar1 = true;
                }
                console.log(response.data);
            });

            this.response = '';
        },
        taskFunction: function (question) {
            this.currentQuestion = question;
            this.response = '';
            this.questionDialog = true;
        },
        closeDialog: function () {
            this.questionDialog = false;
        },
        startTask() {
            let teamNameUsed = 'salut';
            this.$http.post('/api/v1/answer/start', { teamName: teamNameUsed, questionText: this.currentQuestion }).then(response => {
                if (response.data.err) {
                    this.teamNameUsed = true;
                    this.serverResponse = response.data.err;
                }
                //                console.log(response.data);
            });
        }
    }
});