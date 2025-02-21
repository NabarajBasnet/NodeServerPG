const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING
});

pool.connect()
    .then(() => console.log('Database connected!'))
    .catch((err) => console.log('Error: ', err));

module.exports = pool;
