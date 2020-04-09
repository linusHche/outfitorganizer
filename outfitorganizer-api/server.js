const express = require('express');
const router = express.Router();
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');

module.exports = (pg, bcrypt) => {
	router.use('/user', require('./routes/user')(pg));
	router.use('/signin', require('./routes/signin')(pg, bcrypt, jwt));
	router.use('/register', require('./routes/register')(pg, bcrypt, jwt));
	router.use(
		'/clothes',
		middleware.verifyToken,
		require('./routes/clothes')(pg)
	);
	router.get('/', (req, res) => {
		pg.select()
			.table('user')
			.count('*')
			.then((data) => console.log(data));
	});

	router.get('/upload', (req, res) => {
		dbx.sharingCreateSharedLinkWithSettings({
			path: '/testfolder/test-image.jpg',
		}).then((response) => console.log(response.url));
	});
	return router;
};
