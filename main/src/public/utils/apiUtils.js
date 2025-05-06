import { getLocal, removeLocal, setLocal } from "./localUtils.js";

/**
 * getLocalMaps
 * Get all local tasklist items
 * @returns 
 */
function getAllLocalMaps() {
	const raw = getLocal('maps');
	return raw ? JSON.parse(raw) : [];
};

/**
 * saveLocalMaps
 * Save task list to localStorage
 * @param {array} mapArray
 */
function saveLocalMaps(mapArray) {
    setLocal('maps', JSON.stringify(mapArray));
};

/**
 * addLocalTask
 * Add a task to localStorage
 * @param {object} mapObject
 */
function addLocalMap(mapObject) {
    const currentMaps = getLocalMaps();
    currentMaps.push(mapObject);
    saveLocalMaps(currentMaps);
};

/**
 * getLocalMap
 */
function getLocalMap(row_id) {
    const map = getAllLocalMaps().find(map => map.row_id === row_id);
    return map;
}

/**
 * deleteLocalMap
 * Delete a task by ID
 */
function deleteLocalMap(row_id) {
    const currentMaps = getLocalMaps().filter(map => map.row_id !== row_id);
    if (currentMaps.length === 0) {
        clearLocalMaps();
        return;
    }
    saveLocalMaps(currentMaps);
};

/**
 * updateLocalMap
 * Update a task's text by ID
 */
function updateLocalMap(row_id, mapObject) {
    const currentMaps = getLocalMaps().map(map =>
        map.row_id === row_id ? { ...map, territory: mapObject.territory, row_id, name: mapObject.name } : map
    );
    saveLocalMaps(currentMaps);
};

/**
 * clearLocalTasks
 * Clear the local tasks in local storage
 */
function clearLocalMaps() {
    removeLocal('maps');
};

function getLocalSelectHTML() {
    return getLocal('mapSelectHTML');
};

function saveLocalSelectHTML(newHTML) {
    setLocal("mapSelectHTML", newHTML);
};

/**
 * cacheNewMap
 * 
 */
function cacheNewMap(newMap) {
    let localMaps = getAllLocalMaps();
    if (localMaps) {
      addLocalMap(newMap);
    } else {
      saveLocalMaps([newMap]);
    }
};

/**
 * 
 * @param {string} selectHTML 
 */
function cacheMapSelect(selectHTML) {
  let localSelectHTML = getLocalSelectHTML();
  if (localSelectHTML) {
    if (localSelectHTML !== selectHTML) {
      saveLocalSelectHTML(selectHTML);
    }
  } else {
    saveLocalSelectHTML(selectHTML);
  }
};

export {
    getAllLocalMaps, 
    saveLocalMaps,
    addLocalMap,
    deleteLocalMap,
    updateLocalMap,
    getLocalSelectHTML,
    saveLocalSelectHTML,
    getLocalMap,
};