const express = require('express');
const router = express.Router();

module.exports = db => {
	router.get('/', (req, res) => {
		res.send('user page');
	});

	router.get('/:userId', (req, res) => {
		res.send(req.params.userId);
	});
	return router;
};
