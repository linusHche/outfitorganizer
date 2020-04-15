const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
	const token = req.headers['authorization'].split(' ')[1];
	jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
		if (err) {
			return res.status(403).json('Unauthorized Access');
		} else {
			req.decoded = decoded;
			next();
		}
	});
};

module.exports = {
	verifyToken: verifyToken,
};
