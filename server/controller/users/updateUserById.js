const mongoose = require('mongoose');
const User = require('../../model/User');

/**
 * Return the id of a newly created user
 */
module.exports = async function updateUserById(res, id, newValues) {
	const options = { dbName: 'users' };
	mongoose.connect(process.env.ATLAS_URI, options);

	User.findByIdAndUpdate(id, newValues, (err, user) => {
		if (err) {
			console.log(err);
		} else {
			res.json(user);
			console.log(`Updated user: ${user}`);
		}
	});
};
