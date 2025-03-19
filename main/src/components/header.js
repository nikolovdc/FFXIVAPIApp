// src/components/header.js

/**
 * BuildHeader - builds a consistent header
 * The header include userProfile/Authentication section, logo, and other TBD elements  
 */
export function BuildHeader() {
	const headerEle = document.getElementById("header");
	const logoDiv = document.createElement("div");
	logoDiv.className = "logo";
	headerEle.appendChild(logoDiv);
	const userProfileDiv = document.createElement("div");
	userProfileDiv.id = "auth-section";
	headerEle.appendChild(userProfileDiv);
	//Should involke other build functions included in the header layout later on
};

