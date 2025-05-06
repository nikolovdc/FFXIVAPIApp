import { fetchMapImageURL } from "../services/apiServices/mapServices.js";
/**
 * updateMapImage
 * @param {string} imageURL 
 */
function UpdateMapImage(mapObj) {
    const mapImage = document.getElementById('map_img');
    let imageURL;
    Promise.resolve()
    .then(async () => { imageURL = await fetchMapImageURL(mapObj.territory, mapObj.id);})
    .then(() => {mapImage.src = imageURL;});
};

export {
    UpdateMapImage,

};