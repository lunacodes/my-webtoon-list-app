const express = require('express');
const mongoose = require('mongoose');
const Gallery = require('../model/Gallery');
const galleryRoutes = express.Router();

// Get a list of the webtoons
galleryRoutes.route('/gallery').get((req, res) => {
	// listGallery(res);
	const options = { dbName: 'webtoons' };
	mongoose.connect(process.env.ATLAS_URI, options);
	Gallery.find({}, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.json(result);
		}
	});
});

module.exports = galleryRoutes;
