const mongoose = require('mongoose');
const Webtoon = require('../../models/Webtoon');

/**
 * Return the id of a newly created webtoon
 */
module.exports = async function addWebtoon(res, title, score, progress, tags) {
	const options = { dbName: 'webtoons' };
	mongoose.connect(process.env.ATLAS_URI, options);
	const webtoon = new Webtoon({ title, score, progress, tags });
	webtoon.save((err, webtoon) => {
		if (err) {
			console.log(err);
		} else {
			res.json(webtoon);
			console.log(`Added webtoon: ${webtoon}`);
		}
	});
};
