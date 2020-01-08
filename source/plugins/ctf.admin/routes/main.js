import express from 'express';
import vm from 'vm';
import util from 'util';

import db from '../functions/database';

const router = express.Router();

router.get('/', (req, res) => {
	res.send('Testare ruta').sendStatus(200);
});

router.get('/questions', async (req, res) => {
	try {
		let questions = [];
		
		(await db.getAll('Questions')).map(({ID, LockedBy, Question}) => {
			questions.push({
				id: ID,
				lockedBy: LockedBy,
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
		await db.runSQLCMD("INSERT INTO `Teams`(`Name`,`BoardID`) VALUES ($teamNAme, $boardID;", {
			$teamName: teamName,
			$boardID: boardID
		})
		res.sendStatus(200);
	} else {
		res.send({
			err: 'Team name is already in use'
		})
	}
});

router.post('/answer/start', async (req, res) => {
	let {teamName, questionText} = req.body;

	let team = await db.getFirstRow('Teams', [
		{
			column: 'Name',
			value: teamName
		}
	])
	let question = await db.getFirstRow('Questions', [
		{
			column: 'Question',
			value: questionText
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

				await db.runSQLCMD("INSERT INTO `Answers`(`QuestionID`, `TeamID`, `Started`) VALUES ($questionID,$teamID,$startMoment);", {
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
	let { teamName, questionText, teamAnswer } = req.body;

	let team = await db.getFirstRow('Teams', [
		{
			column: 'Name',
			value: teamName
		}
	])
	let question = await db.getFirstRow('Questions', [
		{
			column: 'Question',
			value: questionText
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
				const sandbox = { boardID: team.BoardID };
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


				if (sandbox.myFunc() === teamAnswer) {
					await db.runSQLCMD("UPDATE `Answers` SET `Finished`=$finishMoment, `Score`=$questionScore WHERE ID=$answerID';", {
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