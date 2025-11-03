const express = require('express');
const app = express();
const PORT = 5000;
const tasksRouter = require('./routes/tasks');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/tasks', tasksRouter);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
