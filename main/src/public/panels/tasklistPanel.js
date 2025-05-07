/* eslint-disable no-unused-vars */
import { ToggleDisplay } from "../components/displayUtil.js";
function ShowTaskList() {
    ToggleDisplay('#tasklist-container', false);
};

document.addEventListener("DOMContentLoaded", (e) => {
    ShowTaskList();
});