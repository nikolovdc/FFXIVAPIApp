// src/server/middleware/authMiddleware.js
const { verifyToken } = require('../utils/tokenUtils.js');
const { getTokenFromSession } = require('../utils/sessionUtils.js');

/**
 * MIDDLEWARE authOrCreateGuest - verifies if it is guest or user
 */
const authMiddleware = async (req, res, next) => {
  const token = getTokenFromSession(req);
  if (!token) {
	console.log('No user found, creating guest user.');
	return next();
  } else {
	try {
	  const decoded = await verifyToken(token);
	  req.username = { username: decoded.username };
	  console.log('Authenticate user/guest request received at: ', new Date().toLocaleTimeString());
	  return next();
	} catch (error) {
	  console.error('Token verification failed:', error);
	  return res.status(401).json({ error: 'Invalid or expired token' });
	}
  }
};

module.exports = authMiddleware;