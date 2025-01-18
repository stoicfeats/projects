const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

// Create a Habit
router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const newHabit = new Habit(req.body);
    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get All Habits when all request is made
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find();
    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a Habit
router.put('/:id', async (req, res) => {
  try {
    const updatedHabit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedHabit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a Habit
router.delete('/:id', async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Habit deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;