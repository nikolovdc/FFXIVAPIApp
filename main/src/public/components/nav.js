function InitNav() {
    const navDiv = document.createElement('div');
    navDiv.id = "nav";
    navDiv.innerHTML = `
        <li><a href = "/">Tasks</a></li>
		<li><a href = "/quests">Quests</a></li>
		<li><a href = "/items">Items</a></li>
		<li><a href = "/api/locations">Map Locations</a></li>
		<li><a href = "/profile">View Profile</a></li>
    `;
    document.body.appendChild(navDiv);
};

export {
    InitNav
};