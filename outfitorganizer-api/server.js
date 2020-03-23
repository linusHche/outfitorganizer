const express = require('express');
const router = express.Router();
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });
const jwt = require('jsonwebtoken');

module.exports = (pg, bcrypt) => {
	router.use('/user', require('./routes/user')(pg));
	router.use('/signin', require('./routes/signin')(pg, bcrypt, jwt));
	router.use('register', require('./routes/register')(pg, bcrypt));
	router.get('/', (req, res) => {
		pg.select()
			.table('user')
			.count('*')
			.then(data => console.log(data));
	});

	router.get('/upload', (req, res) => {
		dbx.filesGetTemporaryLink({
			path: '/testfolder/test-image.jpg'
		}).then(response => res.json({ link: response.link }));
	});
	return router;
};
