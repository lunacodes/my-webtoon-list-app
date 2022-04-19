const passport = require('passport');
const jwt = require('jsonwebtoken');
const dev = process.env.NODE_ENV !== 'production';

exports.COOKIE_OPTIONS = {
	'Access-Control-Allow-Origin': '${ALLOWED_DOMAIN}',
	'Access-Control-Allow-Headers': 'Accept',
	'Access-Control-Allow-Credentials': true,
	'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
	httpOnly: true,
	// Since localhost is not having https protocol,
	// secure cookies do not work correctly (in postman)
	secure: false,
	signed: true,
	maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
	sameSite: false,
};

exports.getToken = (user) => {
	return jwt.sign(user, process.env.JWT_SECRET, {
		expiresIn: eval(process.env.SESSION_EXPIRY),
	});
};

exports.getRefreshToken = (user) => {
	const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY),
	});
	return refreshToken;
};

exports.verifyUser = passport.authenticate('jwt', { session: false });
