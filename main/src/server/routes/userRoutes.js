/* eslint-disable no-undef */
// src/server/routes/userRoutes.js
const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();

const { getUserName } = require('../controllers/userControllers');

app.use(cors({ origin: 'http://localhost:6003' }));

router.get('/name', getUserName);

module.exports = router;
