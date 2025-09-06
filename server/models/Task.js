const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  job: String,
  progress: Number,
  time: String,             // e.g., "1 Hour"
  daysLeft: Number,         // for upcoming tasks
  status: String,           // 'running' or 'completed'
  avatars: [String],        // array of img urls/paths
  image: String,
  deadline: Date,
  url: String,
  details: [String] 
});

module.exports = mongoose.model("Task", TaskSchema);
