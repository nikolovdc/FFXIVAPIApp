// src/server/routes/userRoutes.js
const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();

const { getUserName } = require('../controllers/userControllers');

app.use(cors({ origin: 'https://ffxiv-api-app-150199820340.us-central1.run.app' }));

router.get('/name', getUserName);

module.exports = router;
