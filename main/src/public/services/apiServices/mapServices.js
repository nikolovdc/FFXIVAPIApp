import { 
        getLocalMaps, 
        getLocalSelectHTML 
    } from '../../utils/apiUtils.js';
import api from '../config/apiConfig.js';

/**
 * fetchMapImage
 * @param {string} territory
 * @param {string} id
 */
async function fetchMapImageURL(territory, id) {
  try {
    const response = await api.get(
      `/api/map/image/${territory}/${id}`,
      { responseType: 'blob' }
    );
    const blob = response.data;
    const imageURL = URL.createObjectURL(blob);
    return imageURL;
  } catch (error) {
    console.error("Error fetching map image:", territory, error);
  }
};

/**
 * getAllMapListID
 * @param {number} limit 
 * @returns 
 */
async function getAllMapRowID(limit) {
  try {
    let response;
    if (typeof limit === "number")
      response = await api.get(`/api/map?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching map list:", error);
    return [];
  }
};

/**
 * getMapFields
 * @param {string} id 
 * @returns 
 */
async function getMapFields(id) {
  try {
    let response =
      await api.get(`/api/map/row/${id}`);
    if (response.data) {
      return response.data.fields;
    }
  } catch (error) {
    console.error("Error fetching map row: ", error);
    return [];
  }
};

/**
 * getOneMap
 * @param {object} data 
 * @returns 
 */
async function getOneMapID(data) {
  try {
    const idField = data.Id;
    const [ territory, id ] = idField.split('/');
    return { territory, id };
  } catch (error) {
    console.error("Error fetching terrotoryID: ", error);
    return null;
  }
};

/**
 * parseAndReduceMap
 * @param {string} row_id 
 * @param {object} data
 * @returns {object} mapObj - {row_id, territory, id, name}
 */
async function parseAndReduceMap(row_id, data) {
  const { territory, id } = await getOneMapID(data);
  const imageURL = await fetchMapImageURL(territory, id);
  const name = data.PlaceName.fields.Name ?? "Unknown Map";
  const mapObj = { row_id, territory, id, name, imageURL};
  return mapObj;
};

async function lazyLoadMaps() {
  const rowIDs = await getAllMapRowID(20);
  for (const row of rowIDs) {
    let row_id = row.row_id;
    let field = await getMapFields(row_id);
    let mapObj = await parseAndReduceMap(row_id, field);
    await cacheNewMap(mapObj);
  }
};

/**
 * loadLocationSelect
 * 
 */
async function loadLocationSelectHTML() {
  const selectHTML = getLocalSelectHTML();
  if (!selectHTML) {
      const mapObjs = getLocalMaps();
      const select = CreateSelectHTML(mapObjs);
      await cacheMapSelect(select.innerHTML);
  }
};

export {
  fetchMapImageURL,
  getAllMapRowID,
  getMapFields, 
  getOneMapID,
  parseAndReduceMap,
  lazyLoadMaps,
  loadLocationSelectHTML,
};