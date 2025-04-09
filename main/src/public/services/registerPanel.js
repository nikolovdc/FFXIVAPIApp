//public/services/registerPanel.js
import { registerUser } from './authServices.js';

async function CreateRegisterPanel() {
	const registerForm = document.getElementById("register-form");

	//Assign event listener for the register form
	registerForm.addEventListener("submit", (e) => {
	  e.preventDefault(); 
	  
	  //Grabbing all the values from the form
	  const username = document.getElementById("username").value;
	  const password = document.getElementById("password").value;
	  const email = document.getElementById("email").value;
	  const newUser = { username, password, email };
	  const result = await registerUser(newUser);
	  if (result)  
});
};

document.addEventListener("DOMContentLoaded", (e) => CreateRegisterPanel());
