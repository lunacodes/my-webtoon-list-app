const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const webtoonSchema = new Schema({
  name_first: String,
  name_last: String,
  username: String,
  pass: String,
});

module.exports = mongoose.model('users', webtoonSchema);
