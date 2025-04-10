// src/components/header.js

/**
 * BuildHeader 
 * Builds a consistent header, include userProfile/Authentication section, logo, 
 * and other TBD elements  
 */
function BuildHeader() {
	const headerEle = document.getElementById("header");
	const logoDiv = document.createElement("div");
	logoDiv.className = "logo";
	headerEle.appendChild(logoDiv);
	const userProfileDiv = document.createElement("div");
	userProfileDiv.id = "auth-section";
	headerEle.appendChild(userProfileDiv);
};


function AuthSection(headerEle) {
	const authDiv = document.createElement('div');
	authDiv.id = "signin";
	authDiv.innerHTML = `
		<ul>
			<li><a href="/auth/login">Login</a></li>
			<li><a href="/auth/create">Create Account</a></li>
		</ul>`;
	headerEle.appendChild(title);
	headerEle.appendChild(authDiv);
	return;
};

export {
	BuildHeader
};