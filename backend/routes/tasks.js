/*const express = require('express');
const router = express.Router();
const { readTasks, writeTasks } = require('../utils/fileHelper');

// Get all tasks
router.get('/', async (req, res) => {
  const tasks = await readTasks();
  res.json(tasks);
});

// Add new task
router.post('/', async (req, res) => {
  const tasks = await readTasks();
  const newTask = { id: Date.now(), text: req.body.text, done: false };
  tasks.push(newTask);
  await writeTasks(tasks);
  res.json(newTask);
});

module.exports = router;*/


const express = require('express');
const router = express.Router();
const { readTasks, writeTasks } = require('../utils/fileHelper');

// Get all tasks
router.get('/', async (req, res) => {
  const tasks = await readTasks();
  res.json(tasks);
});

// Add a new task
router.post('/', async (req, res) => {
  const tasks = await readTasks();
  const newTask = { id: Date.now(), text: req.body.text, done: false };
  tasks.push(newTask);
  await writeTasks(tasks);
  res.json(newTask);
});

// Edit a task
router.put('/:id', async (req, res) => {
  const tasks = await readTasks();
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });

  tasks[taskIndex].text = req.body.text;
  await writeTasks(tasks);
  res.json(tasks[taskIndex]);
});

// Mark task as done/undone
router.patch('/:id/done', async (req, res) => {
  const tasks = await readTasks();
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) return res.status(404).json({ message: 'Task not found' });

  task.done = req.body.done; // true or false
  await writeTasks(tasks);
  res.json(task);
});

// Delete a task
router.delete('/:id', async (req, res) => {
  const tasks = await readTasks();
  const taskId = parseInt(req.params.id);
  const newTasks = tasks.filter(t => t.id !== taskId);

  if (newTasks.length === tasks.length) {
    return res.status(404).json({ message: 'Task not found' });
  }

  await writeTasks(newTasks);
  res.json({ message: 'Task deleted' });
});

module.exports = router;

