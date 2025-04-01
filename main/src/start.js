const { startServer } = require('./database/dev.js');

startServer();
const mysql = require('mysql');

const db = mysql.createConnection({
	  host: process.env.INSTANCE_HOST,
	  user: process.env.DB_USER,
	  password: process.env.DB_PASS,
	  port: process.env.DB_PORT,
	});

db.connect((error) => {
	  if (error) {
		console.log(error);
	  }
	  else {
		console.log("MySQL is connected!!!");
	  }
});
