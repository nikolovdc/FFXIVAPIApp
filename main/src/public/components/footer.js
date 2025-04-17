// public/components/footer.js

function InitFooter() {
    const footerDiv = document.createElement("div");
    footerDiv.id = "footer";
    footerDiv.innerHTML = `
        <div id="footer-contact"></div>
    `;
    document.body.appendChild(footerDiv);
};

export {
    InitFooter,
};