// src/server/routes/authRoutes.js
const express = require('express');
const cors = require('cors');
const { userLogin, userRegister } = require('../controllers/authControllers');
const app = express();
const router = express.Router();

app.use(cors({ origin: 'http://localhost:6003' }));

// POST Route to handle customer login requests
router.post('/login', userLogin); 

// POST Route to handle customer register requests
router.post('/create', userRegister);


// GET Route that renders the register page
router.get('/create', (req, res) => {
	res.render("create");
});

router.get('/login', (req, res) => {
	res.render("login");
})

router.get('/tasks', (req, res) => {
	res.render("main");
})
// GET Route that renders the login page



module.exports = router;

