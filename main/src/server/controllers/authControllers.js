// src/server/controllers/authControllers.js
const secretKey = process.env.JWT_SECRET || 'default_key';
const { passQuery } = require('../utils/queryUtils');
const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const { checkIfUserExists, setUser } = require('../utils/userUtils');

//Helper function
async function createNewUser(accountName, password, email, res) {
  try {
	const hashedPW = await hashPassword(password);
	const results = await passQuery(
	  `INSERT INTO user (username, password, email) VALUES (?, ?, ?)`,
	  [accountName, hashedPW, email]
	);
	res.status(200).json({ message: 'User created successfully', redirect: '/auth/login' });
  } catch (error) {
	console.error('Error creating new user:', error);
	return res.status(500).json({ error: error });		
  } 
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
	const results = await passQuery('SELECT * FROM user WHERE email = ?', [email]);	
	if (results.length === 0) {
	  return res.status(401).json({ error: 'Invalid login credentials, user not found' });
	}				
	const user = results[0];			
	const isMatch = await comparePassword(password, user.hashed_password);
	if (!isMatch) {
	  return res.status(401).json({ error: 'Password are wrong.' });
	}
	// Generate a JWT token and store the user in session
	setUser(req, user);
	return res.status(200).json(user.username);						
  } catch (error) {
	console.error('Login error: ', error);
	return res.status(500).json({ error: 'Internal server error' });
  }
};

const userRegister = async (req, res) => {
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
