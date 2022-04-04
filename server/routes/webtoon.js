const express = require('express');
const mongoose = require('mongoose');
const Webtoon = require('../model/Webtoon');
const addWebtoon = require('../controller/webtoons/addWebtoon');
const listWebtoons = require('../controller/webtoons/listWebtoons');
const findWebtoonById = require('../controller/webtoons/findWebtoonById');
const updateWebtoonById = require('../controller/webtoons/updateWebtoonById');
const deleteWebtoonById = require('../controller/webtoons/deleteWebtoonById');

// Instance of the Express router (which controls the requests)
// We use this to define our roles
const webtoonRoutes = express.Router();
const dbo = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;

// Get a list of the webtoons
webtoonRoutes.route('/webtoon').get((req, res) => {
	listWebtoons(res);
});

// Get a single webtoon by id
webtoonRoutes.route('/webtoon/:id').get((req, res) => {
	let myQuery = { _id: ObjectId( req.params.id )};
	findWebtoonById(res, myQuery);
});

// Create a new webtoon entry
webtoonRoutes.route('/webtoon/add').post((req, response) => {
	let title = req.body.title;
	let score = req.body.score;
	let progress = req.body.progress;
	let tags = req.body.tags;

	addWebtoon(title, score, progress, tags);
});

// Update a webtoon entry by id
webtoonRoutes.route('/update/:id').post((req, res) => {
	let myId = { _id: ObjectId( req.params.id )};
	let newValues = {
		$set: {
			title: req.body.title,
			score: req.body.score,
			progress: req.body.progress,
			tags: req.body.tags,
		},
	};

	updateWebtoonById(res, myId, newValues);
});

// Delete a webtoon by id
webtoonRoutes.route('/:id').delete((req, res) => {
	let myId = { _id: ObjectId( req.params.id )};
	deleteWebtoonById(res, myId);
});

// Create a new user
webtoonRoutes.route('/user/add').post((req, response) => {
	let db_connect = dbo.getDb('webtoons');
	let myObj = {
		name_first: req.body.name_first,
		name_last: req.body.name_last,
		username: req.body.username,
		pass: req.body.pass,
	};

	db_connect.collection('users').insertOne(myObj, (err, res) => {
		if (err) throw err;
		console.log('1 user added');
		response.json(res);
	});
});

// Update a user entry by id
webtoonRoutes.route('/users/update/:id').post((req, response) => {
	let db_connect = dbo.getDb('webtoons');
	let myquery = { _id: ObjectId( req.params.id )};
	let newvalues = {
		$set: {
			title: req.body.title,
			score: req.body.score,
			progress: req.body.progress,
			tags: req.body.tags,
		},
	};

	db_connect
		.collection('users')
		.updateOne(myquery, newvalues, (err, res) => {
			if (err) { throw err; }
			console.log('1 user updated');
			response.json(res);
		});
});


module.exports = webtoonRoutes;
