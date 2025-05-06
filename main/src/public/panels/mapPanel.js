// public/panels/mapPanel.js
import { InitSelect } from "../components/select.js";
import { cacheMapSelect, getAllMapRowID, getMapFields, parseAndReduceMap } from "../services/apiServices/apiServices.js";
import { getLocalMap, getLocalSelectHTML } from "../utils/apiUtils.js";

/**
 * updateMapImage
 * @param {string} imageURL 
 */
function updateMapImage(imageURL) {
    const mapImage = document.getElementById('map_img');
    mapImage.src = imageURL;
};

/**
 * InitLocationSelect
 */
function InitLocationSelect() {
    const locationSelectHandler = (e) => {
        const selected_row_id = e.target.getAttribute("data-id");
        const mapObj = getLocalMap(selected_row_id);
        updateMapImage(mapObj.imageURL); // adjust field name as needed
        document.getElementById("mapTitle").innerText = mapObj.name;
    };
    const locationDivID = "location-select-container";
    const locationDivHTML =  `
    <h1>FFXIV Map Viewer</h1>
    <label for="mapSelect">Select a map:</label>
    <select name="maps" id="mapSelect"></select>
    <div id="mapImg"><h2 id="mapTitle"></h2><img id="map_img" alt="map"></img></div>
    `;
    InitSelect(locationDivID, locationDivHTML, locationSelectHandler);
};

async function AppendLocationSelect() {
    const selectHTML = getLocalSelectHTML();
    const select = document.getElementById("mapSelect");
    select.innerHTML = selectHTML;
};


document.addEventListener("DOMContentLoaded", async (e) => {
    InitLocationSelect();
    await AppendLocationSelect();
});