const express = require('express');
const router = express.Router();

module.exports = (pg, bcrypt, jwt) => {
	const signJWT = (username, id) => {
		return (
			'Bearer ' +
			jwt.sign({ username, id }, process.env.SECRET_KEY, {
				expiresIn: '1h',
			})
		);
	};

	router.post('/', async (req, res) => {
		const { username, password } = req.body;
		try {
			const exists = await pg('user').count('*').where({ username });
			if (exists[0].count > 0) {
				return res.status(400).json({ msg: 'Username already exist' });
			}
			const hash = await bcrypt.hash(password, 10);
			const response = await pg
				.insert({ username, hash })
				.table('user')
				.returning('*');
			const user = response[0];
			const token = signJWT(username, user.id);
			user.hash = '';
			return res.json({
				token,
				user,
				dropbox_token: process.env.DROPBOX_ACCESS_TOKEN,
			});
		} catch (err) {
			console.error(err);
			return res
				.status(500)
				.json('Something went wrong, please try again');
		}
	});
	return router;
};
