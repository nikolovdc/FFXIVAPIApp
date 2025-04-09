//public/services/loginPanel.js
import { loginValidate } from './authServices.js';

function CreateLoginPanel() {
	const loginForm = document.getElementById("loginForm");

	//Assign event listener for the register form
	loginForm.addEventListener("submit", (e) => {
	  e.preventDefault(); 
	  
	  //Grabbing all the values from the form
	  const email = document.getElementById("emailInputLog").value;
	  const password = document.getElementById("passLog").value;
	  loginValidate(email, password);  
	});
};

document.addEventListener("DOMContentLoaded", (e) => CreateLoginPanel());
