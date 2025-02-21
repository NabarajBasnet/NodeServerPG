const express = require('express');
const { getAllTasks, createNewTask, updateTask, patchTaskStatus, deleteTask, getSingleTask } = require('../Controllers/getTasksController');

const router = express.Router();

router.route('/').get(getAllTasks);
router.route('/:id').get(getSingleTask);
router.route('/').post(createNewTask);
router.route('/:id').put(updateTask);
router.route('/:id').patch(patchTaskStatus);
router.route('/:id').delete(deleteTask);

module.exports = router;
