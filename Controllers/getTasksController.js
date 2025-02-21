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
        console.log('ID: ', id);
    } catch (err) {
        console.log('Error: ', err);
    };
};

const createNewTask = async (req, res) => {
    try {

    } catch (err) {
        console.log('Error: ', err);
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
