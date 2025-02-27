const express = require('express');
const createTaskTable = require('./Models/TasksModel');
const dotenv = require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

// Global middlewares
app.use(express.json());

app.use('/api/tasks', require('./Routes/getAllTasks'));

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
