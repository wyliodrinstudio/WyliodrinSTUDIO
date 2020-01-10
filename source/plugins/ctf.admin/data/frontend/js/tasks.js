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
        snackbar1: false,
        finishedQuestions: [],
        canStartTask: false,
        unfinishedQuestion: '',
        alreadySolved: false
    },
    mounted() {
        this.$http.get('/api/v1/questions').then(response => {
            this.questions = response.data;
        }, response => {
            console.log(response);
        });

        this.$http.get('/api/v1/answers').then(response => {
            console.log(response.data);
            if (response.data.err) {
                console.log(response.data.err);
            } else {
                response.data.forEach(element => {
                    if (element.teamID == localStorage.saveData) {
                        console.log(this.questions[element.questionID].question);
                        if (element.finished != undefined) {
                            this.finishedQuestions.push(this.questions[element.questionID].question);
                        }
                    }
                });
            }  
        }, response => {
            console.log(response);
        });
    },
    methods: {
        submit: function () {
            this.questionDialog = false;
            this.$http.post('/api/v1/answer/finish', { teamID: localStorage.saveData, questionID: this.currentQuestionID, teamAnswer: this.teamResponse }).then(response => {
                if (response.data.err) {
                    this.serverResponse = response.data.err;
                    this.snackbar1 = true;
                } else {
                    this.serverResponse = response.data;
                    this.snackbar1 = true;
                    this.finishedQuestions.push(this.questions[this.currentQuestionID].question);
                }
            });

            this.teamResponse = '';
            this.serverResponse = '';
        },
        taskFunction: function (questionID) {
            if (this.finishedQuestions.includes(this.questions[questionID].question)) {
                this.alreadySolved = true;
                this.canStartTask = false;
            } else {
                this.alreadySolved = false;
                let parent = this.questions[questionID].parent;
                if (this.finishedQuestions.includes(parent) || parent === -1) {
                    this.canStartTask = true;
                    this.currentQuestionID = questionID;
                    this.currentQuestion = this.questions[questionID].question;
                    this.teamResponse = '';
                    this.questionDialog = true;
                } else {
                    this.unfinishedQuestion = parent;
                    this.canStartTask = false;
                }
            }

        },
        closeDialog: function () {
            this.questionDialog = false;
        },
        startTask() {
            if (this.canStartTask) {
                this.$http.post('/api/v1/answer/start', { teamID: localStorage.saveData, questionID: this.currentQuestionID }).then(response => {
                    if (response.data.err) {
                        this.teamNameUsed = true;
                        this.serverResponse = response.data.err;
                    }
                });
            } else {
                this.snackbar1 = true;
            }
        }
    }
});