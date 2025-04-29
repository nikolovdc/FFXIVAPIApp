// src/server/middleware/authMiddleware.js
const { getUsername } = require("../helpers/userHelpers.js");


/**
 * MIDDLEWARE authOrCreateGuest - verifies if it is guest or user
 */
const authMiddleware = async (req, res, next) => {
  const username = getUsername(req);
  if (!username) {
	console.log('No user found, creating guest user.');
	return next();
  } else {
	console.log('Authenticate user/guest request received at: ', new Date().toISOString());
	req.username = username;
	return next();
  }
};

module.exports = authMiddleware;