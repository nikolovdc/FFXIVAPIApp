const mysql = require('mysql2');

const db = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "root6666",
	port: 3306,
	database: "login"
});

module.exports = db;