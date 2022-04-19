const mongoose = require('mongoose');
const Gallery = require('@models/Gallery');

// List the webtoons
module.exports = async function listGallery(res) {
	const options = { dbName: 'webtoons' };
	mongoose.connect(process.env.ATLAS_URI, options);
	Gallery.find({}, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.json(result);
		}
	});
};
