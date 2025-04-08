// src/server/routes/index.js
const express = require('express');
const authRoutes = require('./authRoutes');
const router = express.Router();

// Attach different route files
router.use('/auth', authRoutes);        // Routes for authentication (e.g., /auth/login)
router.get('/', (req, res) => {
	res.render('main');
});
module.exports = router;
