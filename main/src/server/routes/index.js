// src/server/routes/index.js
const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const tasklistRoutes = require('./tasklistRoutes');
const router = express.Router();

// Attach different route files
router.use('/auth', authRoutes);        // Routes for authentication (e.g., /auth/login)
router.use('/user', userRoutes);
router.use('/tasklist', tasklistRoutes);

router.get('/', (req, res) => {
	res.render("main");
});

module.exports = router;
