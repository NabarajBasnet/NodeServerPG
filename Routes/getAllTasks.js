const express = require('express');
const ConnectDB = require('../Config/ConnectDB');

const router = express.Router();

router.route('/').get(async (req, res) => {
    console.log(`Hello world!`);
    await ConnectDB();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Hello World!');
    res.end();
});

module.exports = router;