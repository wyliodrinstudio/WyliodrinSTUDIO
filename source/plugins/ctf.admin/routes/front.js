import express from 'express';

import db from '../functions/database';

const router = express.Router();

router.get('/', (req, res) => {
	res.send('Testare ruta front').sendStatus(200);
});


export default router;