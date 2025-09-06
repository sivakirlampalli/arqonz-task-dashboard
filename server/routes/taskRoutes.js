const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks, with optional search/sort
router.get('/', async (req, res) => {
  const { search, sort, category } = req.query;
  let query = {};
  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }
  if (category) {
    query.job = category;
  }
  let tasksQuery = Task.find(query);

  if (sort === 'deadline') {
    tasksQuery = tasksQuery.sort({ deadline: 1 }); // Ascending
  } else if (sort === 'deadline_desc') {
    tasksQuery = tasksQuery.sort({ deadline: -1 }); // Descending
  }
  const tasks = await tasksQuery.exec();

  res.json(tasks);
});

// ... (rest of your routes unchanged)

// Get summary for dashboard
router.get('/summary', async (req, res) => {
  try {
    const runningTasks = await Task.find({ status: 'running' }, 'progress');
    const completed = await Task.countDocuments({ status: 'completed' });

    let averageProgress = 0;
    if (runningTasks.length) {
      const totalProgress = runningTasks.reduce((sum, task) => sum + task.progress, 0);
      averageProgress = totalProgress / runningTasks.length;
    }

    res.set('Cache-Control', 'no-store');

    res.json({
      runningCount: runningTasks.length,
      completedCount: completed,
      averageProgress: Math.round(averageProgress),
      totalCount: runningTasks.length + completed
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


// Get upcoming tasks (nearest deadlines)
router.get('/upcoming', async (req, res) => {
  const upcoming = await Task.find({ deadline: { $gte: new Date() } })
    .sort({ deadline: 1 }).limit(5);
  res.json(upcoming);
});

// Get today task (closest upcoming task)
// This route must be declared before '/:id' to prevent route conflicts
router.get('/today', async (req, res) => {
  try {
    const todayTask = await Task.findOne({ deadline: { $gte: new Date() } })
      .sort({ deadline: 1 }).exec();
    if (!todayTask) {
      return res.status(404).json({ message: "No today task found" });
    }
    res.json(todayTask);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get('/by-date', async (req, res) => {
  try {
    const date = req.query.date;
    if (!date) return res.status(400).json({ error: "Date parameter missing" });

    const start = new Date(date);
    start.setUTCHours(0, 0, 0, 0); // start of UTC day

    const end = new Date(date);
    end.setUTCHours(23, 59, 59, 999); // end of UTC day

    console.log("Querying tasks deadline between", start.toISOString(), "and", end.toISOString());

    const task = await Task.findOne({
      deadline: { $gte: start, $lte: end }
    });

    if (!task) return res.status(404).json(null);

    res.json(task);
  } catch (error) {
    console.error("Error fetching task by date:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// Get task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID", error });
  }
});

// Create new task
router.post('/', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(400).json({ message: "Failed to create task", error });
  }
});

// Update existing task
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found for update" });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: "Failed to update task", error });
  }
});

// Get details of a single task by ID
router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});


// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Task not found for deletion" });
    }
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete task", error });
  }
});

module.exports = router;
