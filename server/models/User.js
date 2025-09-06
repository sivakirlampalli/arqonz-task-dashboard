const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // hashed recommended
  avatar: String,
  settings: {
    language: { type: String, default: "English (Default)" },
    timezone: { type: String, default: "English (Default)" },
    timeFormat: { type: String, default: "24 Hours" }
  }
});

module.exports = mongoose.model('User', UserSchema);
