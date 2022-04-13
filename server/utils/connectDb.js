const mongoose = require('mongoose');
const url = process.env.ATLAS_URI;
const connect = mongoose.connect(url, {
	dbName: 'webtoons',
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

connect
	.then((db) => {
		console.log('connected to db');
	})
	.catch((err) => {
		console.log(err);
	});
