const express = require('express');
const userRoutes = express.Router();
const ObjectId = require('mongodb').ObjectId;
const addUser = require('../controller/users/addUser');
const updateUserById = require('../controller/users/updateUserById');

// Create a new user
userRoutes.route('/user/add').post((req, res) => {
	let name_first = req.body.name_first;
	let name_last = req.body.name_last;
	let username = req.body.username;
	let pass = req.body.pass;

	addUser(res, name_first, name_last, username, pass);
});

// Update a user entry by id
userRoutes.route('/users/update/:id').post((req, res) => {
	let myId = { _id: ObjectId(req.params.id) };
	let newValues = {
		$set: {
			name_first: req.body.name_first,
			name_last: req.body.name_last,
			username: req.body.username,
			pass: req.body.pass,
		},
	};

	updateUserById(res, myId, newValues);
});

module.exports = userRoutes;
