const express = require('express');
// const mongoose = require('mongoose');
// const Gallery = require('../models/Gallery');
const galleryRoutes = new express.Router();
const listGallery = require('@gallery_controls/listGallery');

// Get a list of the webtoons
galleryRoutes.route('/webtoonGallery').get((req, res) => {
	// console.log(req);
	listGallery(res);
});

module.exports = galleryRoutes;
