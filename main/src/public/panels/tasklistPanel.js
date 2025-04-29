import { ToggleDisplay } from "../components/displayUtil.js";
function ShowTaskList() {
    ToggleDisplay('#tasklist-container', true);
};

document.addEventListener("DOMContentLoaded", (e) => {
    ShowTaskList();
});
