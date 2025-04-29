// public/components/header.js

/**
 * InitHeader 
 * Initiate header in html, include:
 * logo, 
 * title,
 * auth section, 
 * user icon.
 */
function InitHeader() {
	const headerEle = document.createElement("div");
	headerEle.id = "header";
	headerEle.innerHTML = `
		<div class="logo"></div>
		<div id="auth-section" class="hide"></div>
		<div id="user-dropdown" class="hide"></div>
	`;
	document.body.appendChild(headerEle);
};

export {
	InitHeader
};