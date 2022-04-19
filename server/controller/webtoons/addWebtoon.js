const mongoose = require('mongoose');
const Webtoon = require('@models/Webtoon');

/**
 * Return the id of a newly created webtoon
 */
module.exports = async function addWebtoon(res, title, score, progress, tags) {
	const options = { dbName: 'webtoons' };
	mongoose.connect(process.env.ATLAS_URI, options);
	const webtoon = new Webtoon({ title, score, progress, tags });
	webtoon.save((err, toon) => {
		if (err) {
			console.log(err);
		} else {
			res.json(toon);
			console.log(`Added webtoon: ${toon}`);
		}
	});
};
