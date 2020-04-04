const express = require('express');
const router = express.Router();

module.exports = (pg, bcrypt, jwt) => {
	const signJWT = (name) => {
		return (
			'Bearer ' +
			jwt.sign({ name }, process.env.SECRET_KEY, { expiresIn: '1h' })
		);
	};

	router.post('/', async (req, res) => {
		const { username, password } = req.body;
		try {
			const exists = await pg('user').count('*').where({ username });
			const hash = await bcrypt.hash(password, 10);
			await pg
				.insert({
					username,
					hash,
				})
				.table('user');
			const token = signJWT(username);
			return res.json({ token });
		} catch (err) {
			console.error(err);
			return res
				.status(500)
				.json('Something went wrong, please try again');
		}
	});
	return router;
};
