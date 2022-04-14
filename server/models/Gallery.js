const mongoose = require('mongoose');
const { Schema } = mongoose;

const gallerySchema = new Schema({
	likeitCount: String,
	representGenreSeoCode: String,
	starScoreCount: String,
	title: String,
});

module.exports = mongoose.model('webtoons_galleries', gallerySchema);
