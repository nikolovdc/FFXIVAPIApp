// public/components/auth.js

function BuildAuthSection() {
	const authDiv = document.getElementById("auth-section");
	authDiv.innerHTML = `
		<ul>
			<li><a href="/auth/login">Login</a></li>
			<li><a href="/auth/create">Create Account</a></li>
		</ul>
	`;
};



export { 
    BuildAuthSection, 
};