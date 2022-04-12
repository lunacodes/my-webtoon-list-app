const express = require('express');
const mongoose = require('mongoose');
const Gallery = require('../models/Gallery');
const galleryRoutes = new express.Router();
const listGallery = require('../controller/gallery/listGallery');

// Get a list of the webtoons
galleryRoutes.route('/webtoonGallery').get((req, res) => {
	listGallery(res);
});

module.exports = galleryRoutes;
