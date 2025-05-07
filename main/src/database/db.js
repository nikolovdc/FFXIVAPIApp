const mysql = require('mysql2');

const db = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  socketPath: process.env.DB_SOCKET_PATH, // e.g., /cloudsql/project:region:instance
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Optional: test the connection
db.getConnection((err, conn) => {
  if (err) {
    console.error("❌ MySQL connection error:", err);
  } else {
    console.log("✅ MySQL connected via pool!");
    conn.release();
  }
});

module.exports = db;
