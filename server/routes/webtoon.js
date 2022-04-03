const express = require('express');

// Instance of the Express router (which controls the requests)
// We use this to define our roles
const webtoonRoutes = express.Router();
const dbo = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;

// Get a list of the webtoons
webtoonRoutes.route('/webtoon').get((req, res) => {
	let db_connect = dbo.getDb('webtoons');
	db_connect
		.collection('webtoons')
		.find({})
		.toArray((err, result) => {
			if (err) throw err;
			res.json(result);
		});
});

// Get a single webtoon by id
webtoonRoutes.route('/webtoon/:id').get((req, res) => {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId( req.params.id )};
	db_connect
		.collection('webtoons')
		.findOne(myquery, (err, result) => {
			if (err) throw err;
			res.json(result);
		});
});

// Create a new webtoon entry
webtoonRoutes.route('/webtoon/add').post((req, response) => {
	let db_connect = dbo.getDb();
	let myObj = {
		title: req.body.title,
		score: req.body.score,
		progress: req.body.progress,
		tags: req.body.tags,
	};

	db_connect.collection('webtoons').insertOne(myObj, (err, res) => {
		if (err) throw err;
		response.json(res);
	});
});

// Update a webtoon entry by id
webtoonRoutes.route('/update/:id').post((req, response) => {
	let db_connect = dbo.getDb();
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
		.collection('webtoons')
		.updateOne(myquery, newvalues, (err, res) => {
			if (err) throw err;
			console.log('1 webtoon updated');
			response.json(res);
		});
});

// Delete a webtoon by id
webtoonRoutes.route('/:id').delete((req, response) => {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId( req.params.id )};
	db_connect.collection('webtoons').deleteOne(myquery, (err, obj) => {
		if (err) throw err;
		console.log('1 webtoon deleted');
		response.json(obj);
	});
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
