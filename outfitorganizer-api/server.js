const express = require('express');
const router = express.Router();
require('dotenv').config();
const pg = require('knex')({
	client: 'pg',
	connection: process.env.DB_CONNECTION_STRING
});
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('isomorphic-fetch');
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });
router.use('/user', require('./routes/user'));
router.get('/', (req, res) => {
	pg.select()
		.table('user')
		.count('*')
		.then(data => console.log(data));
});

router.post('/signin', (req, res) => {
	pg('user')
		.where('name', req.body.name)
		.first()
		.then(data =>
			bcrypt.compare(req.body.password, data.hash, (err, result) => {
				if (result === true) {
					res.json(data.id);
				} else {
					res.status(403).json('Incorrect Password');
				}
			})
		);
});

router.post('/register', (req, res) => {
	bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
		pg.insert({
			name: req.body.name,
			hash: hash
		})
			.table('user')
			.returning('id')
			.then(data => res.send(data))
			.catch(err => console.error(err));
	});
});

router.get('/upload', (req, res) => {
	dbx.filesGetTemporaryLink({
		path: '/testfolder/test-image.jpg'
	}).then(response => res.json({ link: response.link }));
});

module.exports = router;
