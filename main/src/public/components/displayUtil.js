function ToggleDisplay(selector, onShow) {
    try {
        console.log(`This is the passed in selector: ${selector} and the onShow value: ${onShow}`);
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
            console.warn("The passed in element in ToggleDisplay is empty.");
            return;
        }
        for (const ele of elements) {
            if (!ele.classList.contains("hide") && !ele.classList.contains("show")) {
                ele.classList.add((onShow) ? "show" : "hide");
            } else {
                ele.classList.replace((onShow) ? "hide" : "show", (onShow) ? "show" : "hide"); 
            }
        }
    } catch (err) {
        console.warn("Error occured: ", err);
        return;
    }
};

export {
    ToggleDisplay,
};