// src/server/utils/userUtils.js
const { 
	getTokenFromSession, 
	setTokenInSession, 
	setUserInSession,
	getUserFromSession 
} = require('../utils/sessionUtils');
const { createToken, verifyToken } = require('../utils/tokenUtils');

/**
 * checkIfUserExists
 * Fetch from token to see if user is already in the session.
 * @return { Boolean } result  
 */
const checkIfUserExists = (req) => {
  try {
	const token = getTokenFromSession(req);
	if (token) return true;
	return false;
  } catch (error) {
	console.warn(error);
	return false;
  }
};

/**
 * setUser
 * Set username and a token with user id in session, 
 */
const setUser = (req, user) => {
  try {
	const token = createToken(user.user_id);
	setTokenInSession(req, token);
	setUserInSession(req, user.username);
  } catch (error) {
	throw new Error(error);
  }
};

/**
 * getUser
 * Fetch user token from session data and return if found
 * @return {object|NULL} user
 */
const getUsername = (req) => {
	const user = getUserFromSession(req);
	return user;
};

const getUserid = async (req) => {
	const token = getTokenFromSession(req);
	const user_id = await verifyToken(token);
	return user_id.user_id;	
};

module.exports = {
  checkIfUserExists,
  setUser,
  getUsername,
  getUserid,
};