const express = require('express');

// Instance of the Express router (which controls the requests)
// We use this to define our roles
const webtoonRoutes = express.Router();
const dbo = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;

// Get a list of the webtoons
webtoonRoutes.route('/webtoon').get(function (req, res){
	let db_connect = dbo.getDb('webtoons');
	db_connect
		.collection('webtoons')
		.find({})
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// Get a single webtoon by id
webtoonRoutes.route('/webtoon/:id').get(function (req, res) {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId( req.params.id )};
	db_connect
		.collection('webtoons')
		.findOne(myquery, function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// Create a new webtoon entry
webtoonRoutes.route('/webtoon/add').post(function (req, response) {
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
webtoonRoutes.route('/update/:id').post(function (req, response) {
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
		.updateOne(myquery, newvalues, function (err, res) {
			if (err) throw err;
			console.log('1 webtoon updated');
			response.json(res);
		});
});

// Delete a webtoon by id
webtoonRoutes.route('/:id').delete(function (req, response) {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId( req.params.id )};
	db_connect.collection('webtoons').deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		console.log('1 webtoon deleted');
		response.json(obj);
	});
});

module.exports = webtoonRoutes;
