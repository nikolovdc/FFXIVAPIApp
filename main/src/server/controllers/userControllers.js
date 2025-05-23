/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// server/controllers/userControllers.js
const { getTokenFromSession } = require('../utils/sessionUtils');
const { verifyToken } = require('../utils/tokenUtils');

const getUserName = async (req, res) => {
  try {
	if (!req.username) {
		return res.status(401).json({ error: 'Unauthorized - user not found' });
	}
	res.status(200).json(req.username);
  } catch (error) {
	console.error('Error getting user info from session:', error);
	return res.status(500).json({ error: `Error getting user info from session: ${error}`});
  }
};

module.exports = {
  getUserName,
};