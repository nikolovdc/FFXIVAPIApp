// public/components/mainContents.js


/**
 * InitMainContents
 * Init the main-contents div in html
 */
function InitMainContents() {
    const mainContentDiv = document.createElement('div');
    mainContentDiv.id = "main-contents";
    document.body.appendChild(mainContentDiv);
};

export {
    InitMainContents
};