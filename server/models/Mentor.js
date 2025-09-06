const mongoose = require("mongoose");
const MentorSchema = new mongoose.Schema({
  name: String,
  profession: String,
  tasks: Number,
  rating: Number,
  reviews: Number,
  avatar: String,
  followed: { type: Boolean, default: false }
});
module.exports = mongoose.model("Mentor", MentorSchema);

