/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// src/server/server.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const routes = require('./routes');
const app = express();
const port = process.env.PORT || 6003;


app.set('view engine', 'ejs');
app.use(express.static("public"));
// Serve static images
app.use('/uploads', express.static("uploads"));

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


app.use(bodyParser.json()); // Parse JSON bodies

// Enable CORS for all routes
app.use(cors({ origin: 'https://ffxiv-api-app-150199820340.us-central1.run.app', credentials: true }));

// Mount routes
app.use('/', routes);


app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
