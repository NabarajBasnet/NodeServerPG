const { Pool } = require('pg');

const ConnectDB = async () => {
    try {

        const pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
            password: 'nabaraj',
            port: 5432,
        });

        pool.connect()
            .then(() => console.log('Database connected!'))
            .catch((err) => console.log('Error: ', err));

    } catch (err) {
        console.log('Error: ', err);
        throw err;
    };
};

module.exports = ConnectDB;
