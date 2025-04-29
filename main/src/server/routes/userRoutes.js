// src/server/routes/userRoutes.js
const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();

const { getUserName } = require('../controllers/userControllers');

app.use(cors({ origin: 'http://localhost:6003' }));

// GET route that get user name
router.get('/name', getUserName);

module.exports = router;
