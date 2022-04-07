const express = require('express');
const addWebtoon = require('../controller/webtoons/addWebtoon');
const listWebtoons = require('../controller/webtoons/listWebtoons');
const findWebtoonById = require('../controller/webtoons/findWebtoonById');
const updateWebtoonById = require('../controller/webtoons/updateWebtoonById');
const deleteWebtoonById = require('../controller/webtoons/deleteWebtoonById');

// Instance of the Express router (which controls the requests)
// We use this to define our roles
const webtoonRoutes = express.Router();
const ObjectId = require('mongodb').ObjectId;

// Get a list of the webtoons
webtoonRoutes.route('/webtoon').get((req, res) => {
  listWebtoons(res);
});

// Get a single webtoon by id
webtoonRoutes.route('/webtoon/:id').get((req, res) => {
  let myQuery = { _id: ObjectId(req.params.id) };
  findWebtoonById(res, myQuery);
});

// Create a new webtoon entry
webtoonRoutes.route('/webtoon/add').post((req, res) => {
  let title = req.body.title;
  let score = req.body.score;
  let progress = req.body.progress;
  let tags = req.body.tags;

  addWebtoon(res, title, score, progress, tags);
});

// Update a webtoon entry by id
webtoonRoutes.route('/update/:id').post((req, res) => {
  let myId = { _id: ObjectId(req.params.id) };
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
  let myId = { _id: ObjectId(req.params.id) };
  deleteWebtoonById(res, myId);
});

module.exports = webtoonRoutes;
