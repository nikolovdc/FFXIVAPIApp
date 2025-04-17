// src/server/routes/index.js
const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');

// Attach different route files
router.use('/auth', authRoutes);        // Routes for authentication (e.g., /auth/login)
router.use('/user', authMiddleware, userRoutes);
router.get('/', authMiddleware, (req, res) => {
	res.render("main");
});
module.exports = router;
