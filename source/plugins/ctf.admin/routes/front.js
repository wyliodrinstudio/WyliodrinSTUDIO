import express from 'express';

import db from '../functions/database';
import qs from '../views/QuestionsFront.vue';
import { render } from 'katex';

const router = express.Router();

router.get('/', (req, res) => {
	res.send('Testare ruta front').sendStatus(200);
});

router.get('/questions', (req, res) => {
	try {
		console.log(qs);
		//res.send(qs).sendStatus(200);
		res.render(qs);
	} catch (err) {
		res.send({
			err: "There was a problem fetching the questions from database"
		})
	}
}); 

export default router;