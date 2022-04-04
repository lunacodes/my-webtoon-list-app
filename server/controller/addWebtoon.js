const mongoose = require('mongoose');
const Webtoon = require('../model/Webtoon');

/**
 * Return the id of a newly created webtoon
 */
module.exports = async function addWebtoon(title, score, progress, tags) {

	const options = {dbName: 'webtoons'};
	mongoose.connect(process.env.ATLAS_URI, options);
	const webtoon = new Webtoon({title, score, progress, tags });
	webtoon.save().then(() => console.log(`webtoon added: ${webtoon}`));
};
