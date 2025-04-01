
function UserRegistration() {
	const registerForm = document.getElementById("register-form");
	registerForm.addEventListener("submit", (e) => {
		e.preventDefault();
		 fetch('/register', {
            method: 'POST',
            body: formData
        })
		.then(response => response.json())
		.then(data => {
			
		})
	});
};