// src/server/routes/authRoutes.js
const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();

const { userLogin, userRegister } = require('../controllers/authControllers');

app.use(cors({ origin: 'http://localhost:6003' }));

// PATCH Route to handle customer login requests
router.patch('/login', userLogin); 

// POST Route to handle customer register requests
router.post('/create', userRegister);

// GET Route that renders the register page
router.get('/create', (req, res) => {
	res.render("create");
});

// GET Route that renders the login page
router.get('/login', (req, res) => {
	res.render("login");
});

module.exports = router;

