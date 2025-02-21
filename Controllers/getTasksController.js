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
        const { id } = req.params;
        const { task_title, task_description, task_status } = req.body;

        const updateTaskQuery = await pool.query(
            `UPDATE Tasks 
             SET task_title = $2, 
                 task_description = $3, 
                 task_status = $4 
             WHERE task_id = $1 
             RETURNING *`,
            [id, task_title, task_description, task_status]
        );

        if (updateTaskQuery.rowCount === 0) {
            return res.status(404).json({ message: 'Task not found!' });
        }

        res.status(200).json({
            message: 'Task updated successfully!',
            result: updateTaskQuery.rows[0]
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const patchTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { task_status } = req.body;
        console.log(task_status);

        const patchTaskStatusQuery = await pool.query(`
        UPDATE Tasks
        SET task_status = $2
        WHERE task_id = $1
        RETURNING *
        `,
            [id, task_status]);

        res.status(200).json({
            message: 'Task status updated successfully!',
            result: patchTaskStatusQuery.rows[0]
        });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    };
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTaskQuery = await pool.query(`
            DELETE FROM Tasks
            WHERE task_id = $1
            RETURNING *`,
            [id]);

        if (deleteTaskQuery.rowCount === 0) {
            return res.status(404).json({ message: 'Task not found!' });
        };

        res.status(200).json({
            message: 'Task deleted!',
            result: deleteTaskQuery.rows[0]
        });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    };
};

module.exports = { getAllTasks, getSingleTask, createNewTask, updateTask, patchTaskStatus, deleteTask };
