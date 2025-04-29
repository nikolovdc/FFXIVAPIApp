// src/api/services/authServices.js
import api from './config/apiConfig.js';
	
/**
 * loginValidate - POST FUNCTION to handle user login validation
 * @param {string} email - used to validate user's account name
 * @param {string} password - used to validate user's password
 * @return {Promise<Object>|Error} Return user data or throw errors accordingly
 */
const loginValidate = async (email, password) => {
  try {
	const response = await api.patch('/auth/login', { email, password });
	if (response.data) {
	  return response.data;
	} else {
	  return new Error(response.data.error.message);
	}
  } catch (error) {
	return new Error(`User login error occured! ${error}`, { cause: error });
  }
};

/**
 * registerUser - POST FUNCTION to handle user registration
 * @param {object} newUser - contains all input information
 * @return {Promise<object>|Error} Return user data or throw errors accordingly
 */
const registerUser = async (newUser) => {
  const username = newUser.username;
  const password = newUser.password;
  const email = newUser.email;
  try {  
	const response = await api.post('/auth/create', { username, password, email });
	if (response.data) {
		return response.data;
	} else {
		return new Error(response.data.error.message);
	}
  } catch (error) {
	if (error.response.status === 409) {
	  return new Error('Email already in use, try logging in or resetting password.', { cause: error });
	} else {
		return new Error(`User register error occured! ${error}`, { cause: error });
	}
  }
};

export { 
  loginValidate,
  registerUser
};