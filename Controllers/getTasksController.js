const os = require('os');
const fs = require('fs');

const getAllTasks = async (req, res) => {
    try {
        fs.readFile('./db.json', (err, data) => {
            if (err) {
                return res.status(500).json({
                    err,
                    message: 'Internal server error!'
                });
            };
            const result = JSON.parse(data);
            return res.status(200).json({
                result
            });
        });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).json({
            error: err
        });
        throw err;
    };
};

const getSingleTask = async (req, res) => {
    try {
        const { id } = req.params
        fs.readFile('./db.json', 'utf8', (err, data) => {
            const tasks = JSON.parse(data);
            const singleTask = tasks.find(task => task.task_id === id);
            if (err) {
                return res.status(500).json({
                    err
                });
            };
            return res.status(200).json({
                singleTask,
            });
        });
    } catch (err) {
        console.log('Error: ', err);
        return res.status(500).json({
            err
        });
    };
};

const createNewTask = async (req, res) => {
    try {
        const task_id = 'N-' + Date.now().toString();
        const { task_title, task_description, task_status } = req.body;
        const newTaskObj = { task_id, task_title, task_description, task_status };

        fs.readFile('./db.json', 'utf8', (err, data) => {
            let tasks = [];
            if (!err && data) {
                try {
                    tasks = JSON.parse(data);
                    if (!Array.isArray(tasks)) tasks = [];
                } catch (err) {
                    console.log(err);
                };
            };
            tasks.push(newTaskObj);

            fs.writeFile('./db.json', JSON.stringify(tasks, null, 2), (err) => {
                if (!err) {
                    console.log(newTaskObj, 'File saved');
                };
                return res.status(200).json({
                    newTaskObj
                })
            });
        });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).json({
            err
        });
    };
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params
        const { task_title, task_description, task_status } = req.body;
        const newTaskObj = { task_id: id, task_title, task_description, task_status };
        fs.readFile('./db.json', 'utf8', (err, data) => {
            let tasks = JSON.parse(data);

            let taskIndex = tasks.findIndex(task => task.task_id === id.toString());
            if (taskIndex === -1) {
                return res.status(404).json({ error: 'Task not found!' });
            };
            tasks[taskIndex] = newTaskObj;
            fs.writeFile('./db.json', JSON.stringify(tasks, null, 2), (err) => {
                if (err) return res.status(500).json({ error: err })
                return res.status(200).json({
                    task: tasks[taskIndex],
                    message: 'Task updated!'
                });
            });
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    };
};

const patchTaskStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { task_title, task_description, task_status } = req.body;
        // Read all the task objects in array 
        fs.readFile('./db.json', 'utf8', (err, data) => {
            let tasks = JSON.parse(data);

            // Find task with id
            let taskIndex = tasks.findIndex(task => task.task_id === id.toString());
            if (taskIndex === -1) {
                return res.status(404).json({ error: 'Task not found!' });
            };

            // Change status of selected task
            tasks[taskIndex].task_status = task_status;

            // Write whole task array in file after changing status
            fs.writeFile('./db.json', JSON.stringify(tasks, null, 2), (err) => {
                if (err) return res.status(500).json({ error: err });
                // Save and return 
                return res.status(200).json({
                    task: tasks[taskIndex],
                    message: `Task status is updated to ${task_status}`
                });
            });
            console.log(tasks);
        });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    };
};

const deleteTask = async (req, res) => {
    try {

    } catch (err) {
        console.log('Error: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    };
};

module.exports = { getAllTasks, getSingleTask, createNewTask, updateTask, patchTaskStatus, deleteTask };
