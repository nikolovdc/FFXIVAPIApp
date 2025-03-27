// src/server/server.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require("path");
const cors = require('cors');
//const routes = require('./routes');
const dotenv = require('dotenv');

dotenv.config({path: './.env'})

const app = express();
const port = 6003;
app.set('view engine', 'ejs');
app.use(express.static("public"));

// set up sql
const mysql = require('mysql')
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: process.env.DATABASE
});

db.connect( (error) => {
  if (error) {
    console.log(error);
  }
  else {
    console.log("MySQL is connected!");
  }
})



// Set up session
app.use(session({
  secret: 'mayym',
  resave: false,
  saveUninitialized: true,
  cookie: { 
	secure: true,
	sameSite: 'none'
  }
}));

app.use(bodyParser.json()); // Parse JSON bodies

// Enable CORS for all routes
app.use(cors({ origin: 'http://localhost:6003', credentials: true }));

// Serve static images
app.use('/uploads', express.static(path.join(__dirname, "uploads")));

// Mount routes
//app.use('/', routes);

app.get('/', (req, res) => {
	res.render('main');
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

app.get('/create', (req, res) => {
  res.render("create");
})
