// src/components/header.js

/**
 * BuildHeader 
 * Builds a consistent header, include userProfile/Authentication section, logo, 
 * and other TBD elements  
 */
async function BuildHeader() {
	const headerEle = document.getElementById("header");
	const logoDiv = document.createElement("div");
	logoDiv.className = "logo";
	headerEle.appendChild(logoDiv);
	const userProfileDiv = document.createElement("div");
	userProfileDiv.id = "auth-section";
	headerEle.appendChild(userProfileDiv);
	//Should involke other build functions included in the header layout later on
	await Header();
};


function Header(headerEle) {
	const title = document.createElement('h1');
	title.textContent = "FFIXV Guide";
	const authDiv = document.createElement('div');
	authDiv.id = "signin";
	authDiv.innerHTML = `
		<ul>
			<li><a href="/login">Login</a></li>
			<li><a href="/create">Create Account</a></li>
		</ul>`;
	headerEle.appendChild(title);
	headerEle.appendChild(authDiv);
	return;
};

export {
	BuildHeader
};