const express = require('express');
const router = express.Router();

module.exports = (pg, bcrypt, jwt) => {
	const signJWT = (name, id) => {
		return (
			'Bearer ' +
			jwt.sign({ name, id }, process.env.SECRET_KEY, { expiresIn: '1h' })
		);
	};
	router.post('/', async (req, res) => {
		const { username, password } = req.body;
		const loginUser = await pg('user').where('username', username).first();
		if (loginUser === undefined) {
			return res.status(404).json('User not found');
		}
		const result = await bcrypt.compare(password, loginUser.hash);
		if (result === true) {
			loginUser.hash = '';
			const token = signJWT(username, loginUser.id);
			return res.json({
				token,
				user: loginUser,
				dropbox_token: process.env.DROPBOX_ACCESS_TOKEN,
			});
		}
		return res.status(403).json({ msg: 'Incorrect username or password' });
	});
	return router;
};
