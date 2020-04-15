const app = require('express')();
const bodyParser = require('body-parser');
require('dotenv').config();
const pg = require('knex')({
	client: 'pg',
	connection: process.env.DB_CONNECTION_STRING,
});
const bcrypt = require('bcrypt');
require('isomorphic-fetch');
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/api', require('./server')(pg, bcrypt));
app.listen(3000, () => console.log('Server has started!'));
