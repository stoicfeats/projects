const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  frequency: { type: String, required: true }, // e.g., "Daily", "Weekly"
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Habit', habitSchema);