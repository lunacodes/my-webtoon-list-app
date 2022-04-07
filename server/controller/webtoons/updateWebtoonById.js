const mongoose = require('mongoose');
const Webtoon = require('../../model/Webtoon');

/**
 * Return the id of a newly created webtoon
 */
module.exports = async function updateWebtoonById(res, id, newValues) {
  const options = { dbName: 'webtoons' };
  mongoose.connect(process.env.ATLAS_URI, options);

  Webtoon.findByIdAndUpdate(id, newValues, (err, webtoon) => {
    if (err) {
      console.log(err);
    } else {
      res.json(webtoon);
      console.log(`Updated webtoon: ${webtoon}`);
    }
  });
};
