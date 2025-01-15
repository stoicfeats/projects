const express = require('express');
const Task = require('../models/taskModel');
const router = express.Router();

// Create a task
router.post("/", async (req, res) => {
    try {
      const task = await Task.create(req.body);
      res.status(201).json(task);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ message: "Error creating task", error });
    }
  });
  

    // Read all tasks
    router.get("/", async(req, res) => {
        try{
            const tasks = await Task.find();
            res.status(200).json(tasks);
        }catch(err){
            res.status(500).json({ message: "Error reading tasks", error });
        }
    });


// Update a task
router.put("/:id", async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: "Error updating task", error });
    }
  });
  
  // Delete a task
  router.delete("/:id", async (req, res) => {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Task deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting task", error });
    }
  });
  
  module.exports = router;