const express = require('express');
const router = express.Router();

module.exports = (pg, bcrypt) => {
	router.post('/', async (req, res) => {
		try {
			const hash = await bcrypt.hash(req.body.password, 10);
			const data = await pg.insert({
					name: req.body.name,
					hash
				}).table('user').returning('id');
			res.send(data);
		} catch (err) {
			console.error(err);
		}
	});
	return router;
};
