// public/components/nav.js

/**
 * InitNav
 * Initiate navigation section in the page
 */
function InitNav() {
    const navDiv = document.createElement('div');
    navDiv.id = "nav";
    navDiv.innerHTML = `
		<li><a href = "/quests">Quests</a></li>
		<li><a href = "/items">Items</a></li>
		<li><a href = "/locations">Map Locations</a></li>
    `;
    document.body.appendChild(navDiv);
};

export {
    InitNav
};