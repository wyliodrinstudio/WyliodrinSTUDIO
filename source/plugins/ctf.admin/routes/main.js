import express from 'express';

import db from '../functions/database';

const router = express.Router();

router.get('/', (req, res) => {
	res.send('Testare ruta').sendStatus(200);
});

router.post('/team/add', async (req, res) => {
	let {teamName} = req.body;

	if (await db.getFirstRow('Teams', 'Name', teamName)) {
		await db.runSQLCMD("INSERT INTO `Teams`(`Name`) VALUES ('" + teamName + "');")
		res.sendStatus(200);
	} else {
		res.send({
			err: 'Team name is already in use'
		})
	}
})

router.post('/answer/start', async (req, res) => {
	let {teamName, questionText} = req.body;

	let team = await db.getFirstRow('Teams', 'Name', teamName)
	let question = await db.getFirstRow('Questions', 'Question', questionText)
	
	if (team) {
		if (question) {
			await db.runSQLCMD("INSERT INTO `Answers`(`QuestionID`, `TeamID`, `Started`) VALUES (" + question.ID + "," + team.ID + "," + Date.now().toString() + ");")
			console.log("test");
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
})


export default router;