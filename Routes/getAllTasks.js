const express = require('express');
const { getAllTasks } = require('../Controllers/getTasksController');

const router = express.Router();

router.route('/').get(getAllTasks);

module.exports = router;
