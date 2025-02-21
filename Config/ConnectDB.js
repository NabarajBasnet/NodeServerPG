const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    password: "nabaraj",
    host: "localhost",
    port: 5432,
    database: "postgres",
});

// db.quffvzojwewwquzkobvj.supabase.co      // Supabase host
// ssl: { rejectUnauthorized: false }

pool.connect()
    .then(() => console.log('Database connected!'))
    .catch((err) => console.log('Error: ', err));

module.exports = pool;
