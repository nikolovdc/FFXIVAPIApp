// src/server/controllers/authControllers.js
const { passQuery } = require('../utils/queryUtils');
const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const { setUser } = require('../helpers/userHelpers');

/**
 * 
 * @param {string} accountName 
 * @param {string} password 
 * @param {string} email 
 * @param {*} res 
 * @returns 
 */
const createNewUser = async (accountName, password, email, res) => {
  try {
	const hashedPW = await hashPassword(password);
	await passQuery(
	  `INSERT INTO user (username, password, email) VALUES (?, ?, ?)`,
	  [accountName, hashedPW, email]
	);
	res.status(200).json({ message: 'User created successfully', redirect: '/auth/login' });
  } catch (error) {
	console.error('Error creating new user:', error);
	return res.status(500).json({ error: error });		
  } 
};

/**
 * userLogin
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function userLogin(req, res) {
  const { email, password } = req.body;
  try {
	const results = await passQuery('SELECT * FROM user WHERE email = ?', [email]);	
	if (results.length === 0) {
	  return res.status(401).json({ error: 'Invalid login credentials, user not found' });
	}				
	const user = results[0];
	let hashed_password = user.password.toString();
	if (typeof user.password !== "string") hashed_password = user.password.toString(); 
	const isMatch = await comparePassword(password, hashed_password);
	if (!isMatch) {
	  return res.status(412).json({ error: 'Password are wrong.' });
	}
	// Generate a JWT token and store the user in session
	
	setUser(req, user);
	return res.status(200);						
  } catch (error) {
	console.error('Login error: ', error);
	return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * userRegister
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function userRegister(req, res) {
  const { username, password, email } = req.body;
  const currentDate = new Date();
  const registeredDate = currentDate.toISOString().slice(0, 10);
  try {
	const results = await passQuery('SELECT * FROM user WHERE email = ?', [email]);
	if (results.length === 0) {
	  await createNewUser(username, password, email, res);
	} else {
	  return res.status(409).json({ error: "Email already exist, unable to create new user, please login." });
	}
  } catch (error) {	
	console.error(error);
	return res.status(500).json({ error: error });
  }
};

module.exports = {
  userLogin,
  userRegister
};
