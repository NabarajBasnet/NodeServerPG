const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    password: "nabaraj",
    host: "db.quffvzojwewwquzkobvj.supabase.co",
    port: 5432,
    database: "postgres",
    ssl: { rejectUnauthorized: false }
});


pool.connect()
    .then(() => console.log('Database connected!'))
    .catch((err) => console.log('Error: ', err));

module.exports = pool;
