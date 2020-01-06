import express from 'express';

import db from '../functions/database';
import { render } from 'katex';
import Vue from 'vue';

const router = express.Router();

router.get('/', (req, res) => {
	res.send('Testare ruta front').sendStatus(200);
});



export default router;