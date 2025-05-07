/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'default_key';

const createToken= (username, user_id) => {
	if (username && user_id) 
		return jwt.sign({
		  username: username,
		  user_id: user_id
		},
		secretKey,
	{ expiresIn: '1h' });
};

/**
* verifyToken - Verifies and decodes the jwt token from the request headers
* @param { string } token
* @return { Object } Decoded User
*/
const verifyToken = (token) => {
	try {
		if (token)
			return jwt.verify(token, secretKey);
		else {
			return null;
		}
	} catch(error) {
		return null;
	}
};
module.exports = {
	createToken,
	verifyToken,
};