// src/server/server.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const dbConnect = require('../database/dbConnect');
const authMiddleware = require("./middleware/authMiddleware");
const routes = require('./routes');

const app = express();
const port = 6003;

// Connect to the database
dbConnect();

app.set('view engine', 'ejs');
app.use(express.static("public"));
// Serve static images
app.use('/uploads', express.static("uploads"));

// Enable CORS for all routes
app.use(cors({ origin: 'http://localhost:6003', credentials: true }));

// Set up session
app.use(session({
  secret: 'MARKHILLSWASAMONGUS',
  resave: false,
  saveUninitialized: true,
  cookie: { 
	  secure: false,
	  sameSite: 'lax'
  }
}));

//Storage for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

app.use(bodyParser.json()); // Parse JSON bodies

// Mount routes
app.use('/', authMiddleware, routes);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
