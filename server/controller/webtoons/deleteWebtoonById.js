const mongoose = require('mongoose');
const Webtoon = require('../../model/Webtoon');

/**
 * Return the id of a newly created webtoon
 */
module.exports = async function deleteWebtoonById(res, id) {
	const options = {dbName: 'webtoons'};
	mongoose.connect(process.env.ATLAS_URI, options);

	Webtoon.findByIdAndDelete(id, (err, webtoon) => {
		if (err) {
			console.log(err);
		} else {
			res.json(webtoon);
			console.log(`Deleted webtoon: ${webtoon}`);
		}
	});
};
