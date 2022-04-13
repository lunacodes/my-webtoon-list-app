const express = require('express');
const userRoutes = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
// const ObjectId = require('mongodb').ObjectId;

const {
	getToken,
	COOKIE_OPTIONS,
	getRefreshToken,
	verifyUser,
} = require('../authenticate');

// console.log(COOKIE_OPTIONS);

userRoutes.get('/me', verifyUser, (req, res, next) => {
	res.send(req.user);
});

userRoutes.get('/logout', verifyUser, (req, res, next) => {
	const { signedCookies = {} } = req;
	const { refreshToken } = signedCookies;
	User.findById(req.user._id).then(
		(user) => {
			const tokenIndex = user.refreshToken.findIndex(
				(item) => item.refreshToken === refreshToken
			);

			if (tokenIndex !== -1) {
				user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
			}

			user.save((err, user) => {
				if (err) {
					res.statusCode = 500;
					res.send(err);
				} else {
					// console.log(COOKIE_OPTIONS);
					res.clearCookie('refreshToken', COOKIE_OPTIONS);
					res.send({ success: true });
				}
			});
		},
		(err) => next(err)
	);
});

userRoutes.post('/signup', (req, res, next) => {
	// Verify that first name is not empty
	if (!req.body.firstName) {
		res.statusCode = 500;
		res.send({
			name: 'FirstNameError',
			message: 'The first name is required',
		});
	} else {
		User.register(
			new User({ username: req.body.username }),
			req.body.password,
			(err, user) => {
				if (err) {
					res.statusCode = 500;
					res.send(err);
				} else {
					user.firstName = req.body.firstName;
					user.lastName = req.body.lastName || '';
					const token = getToken({ _id: user._id });
					const refreshToken = getRefreshToken({ _id: user._id });
					user.refreshToken.push({ refreshToken });
					// console.log(COOKIE_OPTIONS);
					user.save((err, user) => {
						if (err) {
							res.statusCode = 500;
							res.send(err);
						} else {
							res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
							res.send({ success: true, token });
						}
					});
				}
			}
		);
	}
});

userRoutes.post('/login', passport.authenticate('local'), (req, res, next) => {
	const token = getToken({ _id: req.user._id });
	const refreshToken = getRefreshToken({ _id: req.user._id });
	User.findById(req.user._id).then((user) => {
		user.refreshToken.push({ refreshToken });
		user.save((err, user) => {
			// console.log(COOKIE_OPTIONS);
			if (err) {
				res.statusCode = 500;
				res.send(err);
			} else {
				// console.log(COOKIE_OPTIONS);
				res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
				res.send({ success: true, token });
			}
		});
	}),
		(err) => next(err);
});

userRoutes.post('/refreshToken', (req, res, next) => {
	const { signedCookies = {} } = req;
	const { refreshToken } = signedCookies;

	if (refreshToken) {
		try {
			const payload = jwt.verify(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET
			);
			const userId = payload._id;
			User.findOne({ _id: userId }).then(
				(user) => {
					// Couldn't I rewrite this as if (user && !(tokenIndex === -1))?
					if (user) {
						// Find the refresh token against the user record in database
						const tokenIndex = user.refreshToken.findIndex(
							(item) => item.refreshToken === refreshToken
						);

						if (tokenIndex === -1) {
							res.statusCode = 401;
							res.send('Unauthorized');
						} else {
							const token = getToken({ _id: userId });
							// If refresh token exists, create new one and replace it
							const newRefreshToken = getRefreshToken({ _id: userId });
							user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
							user.save((err, user) => {
								if (err) {
									res.statusCode = 500;
									res.send(err);
								} else {
									res.cookie('refreshToken', newRefreshToken, COOKIE_OPTIONS);
									res.send({ success: true, token });
								}
							});
						}
					} else {
						res.statusCode = 401;
						res.send('Unauthorized');
					}
				},
				(err) => {
					next(err);
				}
			);
		} catch (err) {
			res.statusCode = 401;
			res.send('Unauthorized');
		}
	} else {
		res.statusCode = 401;
		res.send('Unauthorized');
	}
});

module.exports = userRoutes;

// Original User Routes
// const addUser = require('../controller/users/addUser');
// const updateUserById = require('../controller/users/updateUserById');

// // Create a new user
// userRoutes.route('/user/add').post((req, res) => {
// 	let name_first = req.body.name_first;
// 	let name_last = req.body.name_last;
// 	let username = req.body.username;
// 	let pass = req.body.pass;
//
// 	addUser(res, name_first, name_last, username, pass);
// });
//
// // Update a user entry by id
// userRoutes.route('/users/update/:id').post((req, res) => {
// 	let myId = { _id: ObjectId(req.params.id) };
// 	let newValues = {
// 		$set: {
// 			name_first: req.body.name_first,
// 			name_last: req.body.name_last,
// 			username: req.body.username,
// 			pass: req.body.pass,
// 		},
// 	};
//
// 	updateUserById(res, myId, newValues);
// });

// module.exports = userRoutes;
