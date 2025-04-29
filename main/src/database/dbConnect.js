const db = require('./db');

function dbConnect() {
	db.connect( (error) => {
		if (error) {
			console.log(error);
		} else {
			console.log("MySQL is connected!!!");
		}
	});
};

module.exports = dbConnect;