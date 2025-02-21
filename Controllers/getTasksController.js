const pool = require("../Config/ConnectDB");

const getAllTasks = async (req, res) => {
    try {
        const fetchTasksQuery = await pool.query('SELECT * FROM tasks');
        const results = fetchTasksQuery.rows;
        res.status(200).json({
            results
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
        const { id } = req.params;
        const getTaskQuery = await pool.query(`SELECT * FROM Tasks
        WHERE task_id = ${id}`)
        const result = getTaskQuery.rows
        return res.status(200).json({
            result
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
        const { task_title, task_description, task_status } = req.body;
        const insertTaskQuery = await pool.query(`
            INSERT INTO Tasks (task_title, task_description, task_status)
            VALUES ($1, $2, $3) RETURNING *`,
            [task_title, task_description, task_status]
        );
        const result = insertTaskQuery.rows;
        res.status(200).json({
            message: 'Task created successfully!',
            result
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

    } catch (err) {
        console.log('Error: ', err);
    };
};

const patchTaskStatus = async (req, res) => {
    try {

    } catch (err) {
        console.log('Error: ', err);
    };
};

const deleteTask = async (req, res) => {
    try {

    } catch (err) {
        console.log('Error: ', err);
    };
};

module.exports = { getAllTasks, getSingleTask, createNewTask, updateTask, patchTaskStatus, deleteTask };
