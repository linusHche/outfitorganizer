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
		const loginUser = await pg('user')
			.where('name', req.body.username)
			.first();
		if (loginUser === undefined) {
			return res.status(404).json('User not found');
		}
		const result = await bcrypt.compare(req.body.password, loginUser.hash);
		if (result === true) {
			const token = signJWT(req.body.username);
			return res.json({ token });
		}
		return res.status(403).json('Incorrect password');
	});
	return router;
};
