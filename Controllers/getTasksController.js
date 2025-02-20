const pool = require("../Config/ConnectDB");

const getAllTasks = async (req, res) => {
    try {
        const getTasksQuery = await pool.query('SELECT * FROM users');
        const results = getTasksQuery.rows
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

module.exports = { getAllTasks };
