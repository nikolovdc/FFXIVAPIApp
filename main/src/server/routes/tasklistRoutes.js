// src/server/routes/tasklistRoutes.js
const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();

const { getAllTasks, 
    deleteTask, 
    updateTaskDesc, 
    addTask, 
    completeTask } = require('../controllers/tasklistControllers');

app.use(cors({ origin: 'http://localhost:6003' }));

// GET route that fetches all items in the db
router.get('/items', getAllTasks);

// POST route that add a single task to the db
router.post('/add', addTask);

// DELETE route that delete a single task in db
router.delete('/delete', deleteTask);

// PATCH route that update complete status of task in db
router.patch('/complete', completeTask);

// PATCH route that update description of task in db
router.patch('/updatedesc', updateTaskDesc);

module.exports = router;
