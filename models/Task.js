const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  _id: String,
  title: String,
  description: String,
  status: String,
  priority: String,
  expectedFinishTime: String,
});

module.exports = mongoose.model('Task', taskSchema);
