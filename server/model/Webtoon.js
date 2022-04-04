const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const webtoonSchema = new Schema(
	{
		title: String,
		score: String,
		progress: String,
		tags: String,
	}
);

module.exports = mongoose.model('webtoons', webtoonSchema);
