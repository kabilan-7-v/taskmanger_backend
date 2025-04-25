const express = require('express');
const router = express.Router();
const { addTask, getTasks } = require('../controllers.js/taskcontroller');
const Task = require('../models/Task')

// Add a new task
router.post('/', addTask);

// Get all tasks
router.get('/', getTasks);

// Update task status to 'complete'
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    console.error('Error in PUT request:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error('Error in DELETE request:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
