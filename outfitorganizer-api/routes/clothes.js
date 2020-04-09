const express = require('express');
const router = express.Router();

module.exports = (pg) => {
	router.get('/', async (req, res) => {
		const currentUser = req.decoded;
		try {
			const clothes = await pg('clothes')
				.select('name', 'description', 'path')
				.where('userid', currentUser.id);
			return res.json({ clothes });
		} catch (err) {
			console.error(err);
			return res
				.status(500)
				.json('Something went wrong, please try again');
		}
	});

	router.post('/', async (req, res) => {
		const currentUser = req.decoded;
		const { name, description, path } = req.body;
		try {
			await pg
				.insert({
					userid: currentUser.id,
					name,
					description,
					path,
				})
				.table('clothes');
			return res.status(200).send();
		} catch (err) {
			console.error(err);
			return res
				.status(500)
				.json({ msg: 'Something went wrong, please try again' });
		}
	});
	return router;
};
