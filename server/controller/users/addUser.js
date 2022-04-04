const mongoose = require('mongoose');
const User = require('../../model/User');

/**
 * Return the id of a newly created user
 */
module.exports = async function addUser(res, name_first, name_last, username, pass) {

	const options = {dbName: 'webtoons'};
	mongoose.connect(process.env.ATLAS_URI, options);
	const user = new User({ name_first, name_last, username, pass });
	user.save((err, user) => {
		if (err) {
			console.log(err);
		} else {
			res.json(user);
			console.log(`Added user: ${user}`);
		}
	});
};
