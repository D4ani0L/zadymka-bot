const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  joinedAt: {
    type: Date,
  },
  messages: {
    type: Number
  }
});

module.exports = User = mongoose.model('user', UserSchema);
