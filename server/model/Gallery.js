const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gallerySchema = new Schema({
  title: String,
  starScoreCount: String,
  likeitCount: String,
  representGenreSeoCode: String,
});

module.exports = mongoose.model('webtoons_galleries', gallerySchema);
