const express = require('express');
const userRoutes = express.Router();
const User = require('../models/user');
const ObjectId = require('mongodb').ObjectId;

const {
	getToken,
	COOKIE_OPTIONS,
	getRefreshToken,
} = require('../authenticate');

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
