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
        alreadySolved: false,
        serverError: ''
    },
    mounted() {
        this.$http.get('/api/v1/questions').then(response => {
            this.questions = response.data;
            this.questions.map((item) => {
                item.alreadySolved = false;

                return item;
            })
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
                            this.finishedQuestions.push(element.questionID);
                        }
                    }
                });
            }  
        }, response => {
            console.log(response);
        });
        this.$http.get('/api/v1/teams').then(response => {
            // get body data
            if (response.data.err) {
                console.log(response.data.err)
            } else {
                console.log(response.data);
                if (localStorage.saveData) {
                    var loggedIn = false;
                    response.data.forEach(element => {
                        if (element.id == localStorage.saveData) {
                            loggedIn = true;
                        }
                    });
                    if (!loggedIn) {
                        window.location.replace('/');
                    }
                } else {
                    window.location.replace('/');
                }
            }
        });
    },
    methods: {
        submit: function () {
            this.questionDialog = false;
            this.$http.post('/api/v1/answer/finish', { teamID: localStorage.saveData, questionID: this.currentQuestionID, teamAnswer: this.teamResponse }).then(response => {
                if (response.data.err) {
                    this.serverError = response.data.err;
                    this.snackbar1 = true;
                } else {
                    this.serverResponse = response.data;
                    this.snackbar1 = true;
                    this.finishedQuestions.push(this.currentQuestionID);
                }
            });

            this.teamResponse = '';
            this.serverResponse = '';
        },
        taskFunction: function (questionID) {
            this.serverResponse = '';
            this.snackbar1 = false;
            if (this.finishedQuestions.includes(questionID)) {
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
            this.canStartTask = false;
            this.serverResponse = '';
        },
        startTask() {
            if (this.canStartTask) {
                this.$http.post('/api/v1/answer/start', { teamID: localStorage.saveData, questionID: this.currentQuestionID }).then(response => {
                    if (response.data.err) {
                        this.teamNameUsed = true;
                        this.serverError = response.data.err;
                    } else {
                        this.serverResponse = '';
                    }
                });
            } else {
                this.snackbar1 = true;
            }
        }
    }
});