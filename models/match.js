const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
  notice there is no ID. That's because Mongoose will assign
  an ID by default to all schemas
*/

const MatchSchema = new Schema({
  name: String,
  place: String,
  dob: Date,
  caste: String,
  verificationId: Number,
});

module.exports = mongoose.model('Match', MatchSchema);
