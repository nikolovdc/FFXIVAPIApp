//public/services/registerPanel.js
import { registerUser } from './authServices.js';
import { BuildModal } from '../components/modal.js';

function CreateRegisterPanel() {
	const registerForm = document.getElementById("register-form");

	//Assign event listener for the register form
	registerForm.addEventListener("submit", async (e) => {
	  e.preventDefault(); 
	  
	  //Grabbing all the values from the form
	  const username = document.getElementById("username").value;
	  const password = document.getElementById("password").value;
	  const email = document.getElementById("email").value;
	  const newUser = { username, password, email };
	  const result = await registerUser(newUser);
	  console.log("This is the result", result);
	  if (result instanceof Error) {
		BuildModal({ title: "Register Error", children: `${result.message}` });
	  }  
	});
};

document.addEventListener("DOMContentLoaded", (e) => CreateRegisterPanel());
