import { 
        getAllLocalMaps, 
        cacheNewMap,
        cacheMapSelect 
    } from '../../utils/apiUtils.js';
import { CreateSelectHTML } from '../../components/select.js';
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
async function getAllMapRowID(limit, after = null) {
  try {
    if (typeof limit !== "number" || limit <= 0) {
        throw new Error("Invalid limit");
      }
  
      let url = `/api/map?limit=${limit}`;
      if (after !== null && !isNaN(after)) {
        url += `&after=${after}`;
      }
  
      const response = await api.get(url);
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
  if (!data.PlaceName.fields.Name || data.PlaceName.fields.Name === "") {
    return null;
  }
  const { territory, id } = await getOneMapID(data);
  const name = data.PlaceName.fields.Name;
  const mapObj = { row_id, territory, id, name};
  return mapObj;
};

async function lazyLoadMaps() {
    const maps = getAllLocalMaps();
    if (maps.length === 0) {
        const rowIDs = await getAllMapRowID(20);
        for (const row of rowIDs) {
            let row_id = row.row_id;
            let field = await getMapFields(row_id);
            let mapObj = await parseAndReduceMap(row_id, field);
            if (mapObj) cacheNewMap(mapObj);
        }
    }
};

async function loadAllMaps() {
    const cached = getAllLocalMaps();
    let lastRowId = cached.length > 0
        ? Math.max(...cached.map(m => parseInt(m.row_id, 10)))
        : 21;
    const limit = 20;
    const interval = 5 * 1000;
    async function loadBatch() {
        const newMaps = await getAllMapRowID(limit, lastRowId);

        if (newMaps.length === 0) {
            console.log("No new maps to load.");
            return;
        }
        let maxSeenRowId = lastRowId;

        for (const row of newMaps) {
            const row_id = row.row_id;
            const fields = await getMapFields(row_id);
            const mapObj = await parseAndReduceMap(row_id, fields);
            if (mapObj) cacheNewMap(mapObj);
            maxSeenRowId = Math.max(lastRowId, row_id); // update after every item
        }
        lastRowId = maxSeenRowId;
    };

    // Then keep loading more every interval
    setInterval(loadBatch, interval);
}

/**
 * loadLocationSelect
 * 
 */
async function loadLocationSelectHTML() {
  const mapObjs = getAllLocalMaps();
  const select = CreateSelectHTML(mapObjs);
  cacheMapSelect(select.innerHTML);
};

export {
  fetchMapImageURL,
  getAllMapRowID,
  getMapFields, 
  getOneMapID,
  parseAndReduceMap,
  lazyLoadMaps,
  loadLocationSelectHTML,
  loadAllMaps,
};