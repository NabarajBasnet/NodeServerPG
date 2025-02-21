const pool = require('../Config/ConnectDB');

const createTaskTable = async () => {
    try {
        await pool.query(`
        CREATE TABLE IF NOT EXISTS Tasks (
              task_id SERIAL PRIMARY KEY,
              task_title VARCHAR(255) NOT NULL,
              task_description VARCHAR(255),
              task_status BOOLEAN NOT NULL DEFAULT false
          )`);
    } catch (err) {
        console.log(err);
    };
};
module.exports = createTaskTable;
