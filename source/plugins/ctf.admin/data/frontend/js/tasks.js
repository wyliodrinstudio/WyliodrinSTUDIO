new Vue({
    el: '#tasks-app',
    vuetify: new Vuetify(),
    data: {
        multiLine: false,
        teamResponse: '',
        questionDialog: false,
        questions: [],
        currentQuestion: '',
        currentQuestionID: null,
        flag: '',
        teams: [],
        serverResponse: '',
        snackbar1: false
    },
    mounted() {
        this.$http.get('/api/v1/questions').then(response => {
            this.questions = response.data;
            console.log(this.questions.length)
        }, response => {
            console.log(response);
        });
    },
    methods: {
        submit: function () {
            this.questionDialog = false;
            let teamNameUsed = 'salut';
            this.$http.post('/api/v1/answer/finish', { teamID: localStorage.saveData, questionID: this.currentQuestionID, teamAnswer: this.teamResponse }).then(response => {
                if (response.data.err) {
                    this.serverResponse = response.data.err;
                    this.snackbar1 = true;
                } else {
                    this.serverResponse = response.data;
                    this.snackbar1 = true;
                }
                console.log(response.data);
            });

            this.teamResponse = '';
        },
        taskFunction: function (questionID) {
            this.currentQuestionID = questionID;
            this.currentQuestion = this.questions[questionID].question;
            this.teamResponse = '';
            this.questionDialog = true;
        },
        closeDialog: function () {
            this.questionDialog = false;
        },
        startTask() {
            let teamNameUsed = 'salut';
            this.$http.post('/api/v1/answer/start', { teamID: localStorage.saveData, questionID: this.currentQuestionID }).then(response => {
                if (response.data.err) {
                    this.teamNameUsed = true;
                    this.serverResponse = response.data.err;
                }
            });
        }
    }
});