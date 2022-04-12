const mongoose = require('mongoose');
const Webtoon = require('../../models/Webtoon');

/**
 * Return the id of a newly created webtoon
 */
module.exports = async function findWebtoonById(res, id) {
	const options = { dbName: 'webtoons' };
	mongoose.connect(process.env.ATLAS_URI, options);

	Webtoon.findById(id, (err, webtoon) => {
		if (err) {
			console.log(err);
		} else {
			res.json(webtoon);
		}
	});

	// const filter = query; // Match all options
	// commented out filter, since it's not working rn
	// Webtoon.find({}, (err, result) => {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		res.json(result);
	// 	}
	// });
};
