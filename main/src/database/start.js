const { startServer } = require('./dev.js');
require('dotenv').config();
const mysql = require('mysql2');

startServer();

const db = mysql.createConnection({
	  host: "127.0.0.1",
	  user: "root",
	  password: "root6666",
	  port: 3306,
});

db.connect((error) => {
	if (error) {
		console.log(error);
	}
	else {
		console.log("MySQL is connected!!!");
	}
});
