function InitNav() {
    const navDiv = document.createElement('div');
    navDiv.id = "nav";
    navDiv.innerHTML = `
        <li><a href = "/tasks">Tasks</a></li>
		<li><a href = "/quests">Quests</a></li>
		<li><a href = "/items">Items</a></li>
		<li><a href = "/locations">Map Locations</a></li>
		<li><a href = "/profile">View Profile</a></li>
    `;
    document.body.appendChild(navDiv);
};

export {
    InitNav
};