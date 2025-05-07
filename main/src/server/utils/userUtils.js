/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// src/server/utils/userUtils.js
const { getTokenFromSession, setTokenInSession, setUserInSession } = require('./sessionUtils');
const { createToken, verifyToken } = require('./tokenUtils');

/**
 * checkIfUserExists
 * Fetch from token to see if user is already in the session
 * If exists, it will return the user token.
 * @return {string} token 
 */
const checkIfUserExists = async (req) => {
  try {
	const token = await getTokenFromSession(req);
	if (token) {
	  return token;
	} 
	return false;
  } catch (error) {
	throw new Error(error);
  }
};

/**
 * setUser
 * Create token for newly login user, set this token in the session, 
 * also set user name in the session.
 */
const setUser = async (req, user) => {
  try {
	const token = createToken(user.username, user.user_id);
	setTokenInSession(req, token);
	setUserInSession(req, user);
  } catch (error) {
	throw new Error(error);
  }
};

module.exports = {
  checkIfUserExists,
  setUser
};