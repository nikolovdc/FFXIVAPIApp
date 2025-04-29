// src/server/routes/authRoutes.js
const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();

const { userLogin, userRegister } = require('../controllers/authControllers');

app.use(cors({ origin: 'http://localhost:6003' }));

app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url || !url.startsWith('https://xivapi.com/')) {
	return res.status(400).send('Invalid or missing URL');
  }

  try {
	const response = await axios.get(url, {
	  headers: {
		'User-Agent': 'FFXIV-Map-Viewer (localhost)',
		'Accept': 'application/json',
	  }
	});
	
	res.setHeader('Content-Type', 'application/json');
	res.send(response.data);
  } catch (err) {
	console.error('Proxy fetch error:', err.message);
	console.error('Full error:', err.response?.data || err.toJSON());
	res.status(500).send('Error fetching external data');
  }
});

// POST Route to handle customer login requests
router.post('/login', userLogin); 

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

app.use(express.static("public"));
// Serve static images
app.use('/uploads', express.static("uploads"));

app.get('/locations', (req, res) => {
	res.render('locations');
});

module.exports = router;

