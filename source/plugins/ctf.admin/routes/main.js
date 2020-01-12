import express from 'express';
import vm from 'vm';
import crypto from 'crypto';
import os from 'os';

import db from '../functions/database';

const router = express.Router();

router.get('/getIP', (req, res) => {
	var ifaces = os.networkInterfaces();
	
	Object.keys(ifaces).forEach(function (ifname) {
		var alias = 0;
	
		ifaces[ifname].forEach(function (iface) {
			if ('IPv4' !== iface.family || iface.internal !== false) {
				return;
			}
	
			if (ifname === 'eno1') {
				res.send(iface.address).sendStatus(200);
				return
			}
			++alias;
		});
	});

	res.send({
		err: 'IP not found'
	});
})

router.get('/', (req, res) => {
	res.send('Testare ruta').sendStatus(200);
});

router.get('/questions', async (req, res) => {
	try {
		let questions = [];
		
		(await db.getAll('Questions')).map(({ID, Parent, Question}) => {
			questions.push({
				id: ID,
				parent: Parent,
				question: Question
			});
		})

		res.send(questions);
	} catch (err) {
		console.error(err);
		res.send({
			err: "There was a problem fetching the questions from database"
		})
	} 
});

router.get('/teams', async (req, res) => {
	try {
		let teams = [];
		
		(await db.getAll('Teams')).map(({ID, Name, BoardID}) => {
			teams.push({
				id: ID,
				name: Name,
				boardID: BoardID
			});
		})

		let answers = [];

		(await db.getAll(`Answers`)).map(({ID, TeamID, QuestionID, Started, Finished, Score}) => {
			answers.push({
				id: ID,
				teamID: TeamID,
				questionID: QuestionID,
				started: Started,
				finished: Finished,
				score: Score
			})
		});

		teams.map((team) => {
			let score = 0;
			
			let filteredAnswers = (answers.filter((answer) => {
				return answer.teamID === team.id && answer.finished
			}))

			filteredAnswers.forEach((answer) => {
				score += answer.score;
			})

			team.score = score;
			team.solvedTasks = filteredAnswers.length;

			return team;
		})

		res.send(teams);
	} catch (err) {
		console.error(err);
		res.send({
			err: "There was a problem fetching the teams from database"
		})
	} 
});

router.get('/answers', async (req, res) => {
	try {
		let answers = [];

		(await db.getAll(`Answers`)).map(({ID, TeamID, QuestionID, Started, Finished, Score}) => {
			answers.push({
				id: ID,
				teamID: TeamID,
				questionID: QuestionID,
				started: Started,
				finished: Finished,
				score: Score
			})
		});

		res.send(answers);
	} catch (err) {
		console.error(err);
		res.send({
			err: "There was a problem fetching the answers from database"
		})
	}
})

router.post('/team/add', async (req, res) => {
	let {teamName, boardID} = req.body;
	
	let team = await db.getFirstRow('Teams', [
		{
			column: 'Name',
			value: teamName
		}
	])

	if (!team) {
		await db.runSQLCMD("INSERT INTO `Teams` (`Name`,`BoardID`) VALUES ($teamName, $boardID);", {
			$teamName: teamName,
			$boardID: boardID
		})

		team = await db.getFirstRow('Teams', [
			{
				column: 'Name',
				value: teamName
			}
		])

		res.send({
			teamID: team.ID
		});
	} else {
		res.send({
			err: 'Team name is already in use'
		})
	}
});

router.post('/answer/start', async (req, res) => {
	let {teamID, questionID} = req.body;

	let team = await db.getFirstRow('Teams', [
		{
			column: 'ID',
			value: teamID
		}
	])
	let question = await db.getFirstRow('Questions', [
		{
			column: 'ID',
			value: questionID
		}
	])

	
	if (team) {
		if (question) {
			let answer = await db.getFirstRow('Answers', [
				{
					column: 'TeamID',
					value: team.ID
				},
				{
					column: 'QuestionID',
					value: question.ID
				}
			])
			
			if (!answer) {

				await db.runSQLCMD("INSERT INTO `Answers`(`QuestionID`,`TeamID`,`Started`) VALUES ($questionID,$teamID,$startMoment);", {
					$questionID: question.ID,
					$teamID: team.ID,
					$startMoment: Date.now().toString()
				})

				res.sendStatus(200);
			} else {
				res.send({
					err: 'Question already started'
				})
			}
		} else {
			res.send({
				err: 'Missing question'
			})
		}
	} else {
		res.send({
			err: 'Missing team'
		})
	}
});

router.post('/answer/finish', async (req, res) => {
	let { teamID, questionID, teamAnswer } = req.body;

	let team = await db.getFirstRow('Teams', [
		{
			column: 'ID',
			value: teamID
		}
	])
	let question = await db.getFirstRow('Questions', [
		{
			column: 'ID',
			value: questionID
		}
	])
	
	if (team) {
		if (question) {	
			let answer = await db.getFirstRow('Answers', [
				{
					column: 'TeamID',
					value: team.ID
				},
				{
					column: 'QuestionID',
					value: question.ID
				}
			])
		

			if (answer) {
				if (!answer.Finished) {
					const sandbox = { 
						boardID: team.BoardID,
						crypto: crypto,
						Date: Date
					 };
					vm.createContext(sandbox);
					let code = '';
					if (question.AnswerType === 0) {
						code = 'function myFunc () {\nreturn "' + question.Answer + '" \n}'; 
					} else {
						code = 'function myFunc () {\n' + question.Answer + ' \n}';
					}
	
					try {
						vm.runInContext(code, sandbox);
					} catch (err) {
						console.log(err);
					}
					
					console.log(sandbox.myFunc());
	
					if (sandbox.myFunc() === teamAnswer) {
						let answers = (await db.getAll(`Answers`)).filter((item) => {
							return item.QuestionID === question.ID && item.Finished;
						})

						switch(answers.length) {
							case 0:
								question.Score *= 1;
								break;
							case 1:
								question.Score *= 0.8;
								break;
							default:
								question.Score *= 0.6;
						  }
	
						await db.runSQLCMD("UPDATE `Answers` SET `Finished`=$finishMoment, `Score`=$questionScore WHERE ID=$answerID;", {
							$finishMoment: Date.now().toString(),
							$questionScore: question.Score,
							$answerID: answer.ID
						});
	
						res.sendStatus(200);
					} else {
						res.send({
							err: 'Wrong answer'
						})
					}
				} else {
					res.send({
						err: 'Question already answered'
					})
				}
			} else {
				res.send({
					err: 'Question didn\'t started yet'
				})
			}
		} else {
			res.send({
				err: 'Missing question'
			})
		}
	} else {
		res.send({
			err: 'Missing team'
		})
	}
});

export default router;