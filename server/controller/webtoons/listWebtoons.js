const mongoose = require('mongoose');
const Webtoon = require('../../model/Webtoon');

// List the webtoons
module.exports = async function listWebtoons(res) {
	const options = {dbName: 'webtoons'};
	mongoose.connect(process.env.ATLAS_URI, options);
	Webtoon.find({}, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.json(result);
		}
	});
};
