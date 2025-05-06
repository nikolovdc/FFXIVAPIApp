// public/components/select.js

/**
 * CreateOption
 * @param {string} name 
 * @param {string} row_id 
 * @returns 
 */
function CreateOption(name, row_id) {
    const option = document.createElement('option');
    option.value = row_id;
    option.textContent = name;
    return option;
};

/**
 * InitSelect
 * @param {string} selectDiv_id 
 * @param {string} selectDivInnerHTML 
 * @param {function} changeHandler 
 */
function InitSelect(selectDiv_id, children = []) {
    const mainSection = document.getElementById("main-contents");
    const selectDiv = document.createElement("div");
    selectDiv.id = selectDiv_id;
    children.forEach(child => {
        if (child instanceof HTMLElement) {
            selectDiv.appendChild(child);
        }
    });
    mainSection.appendChild(selectDiv);
};

/**
 * CreateSelectHTML
 * @param {object[]} objArray 
 * @returns 
 */
function CreateSelectHTML(objArray) {
    const select = document.createElement('select');
    for (const obj of objArray) {
        const option = CreateOption(obj.name, obj.row_id);
        select.appendChild(option);
    }
    return select;
};

export {
    InitSelect,
    CreateSelectHTML
};