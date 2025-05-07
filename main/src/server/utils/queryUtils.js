/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// src/server/utils/queryUtils.js
const db = require('../../database/db.js');
/** Function to pass query to database
 * @param { string } query - the database query
 * @param {  } params - the parameters being inserted in the query
 * @return { Promise || error } Return results of the query or error 
 */
const passQuery = (query, params) => {
  console.log("Executing query:", query, "with params:", params);
  return new Promise((resolve, reject) => {
	db.query(query, params, (err, results, fields) => {
	  if (err) {
		reject(err);
	  } else {
		resolve(results);
	  }
	});
  });
};

module.exports = { passQuery };