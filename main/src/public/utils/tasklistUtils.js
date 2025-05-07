import { getLocal, removeLocal, setLocal } from "./localUtils.js";

/**
 * getLocalTasks
 * Get all local tasklist items
 * @returns 
 */
function getLocalTasks() {
	const raw = getLocal('tasklist_item');
	return raw ? JSON.parse(raw) : [];
};

/**
 * saveLocalTasks
 * Save task list to localStorage
 * @param {array} taskArray
 */
function saveLocalTasks(taskArray) {
    setLocal('tasklist_item', JSON.stringify(taskArray));
};

/**
 * addLocalTask
 * Add a task to localStorage
 * @param {string} taskText
 */
function addLocalTask(taskText) {
    const currentTasks = getLocalTasks();
	const uuid = crypto.randomUUID();
    const newTask = {
        id: uuid, 
        text: taskText,
        completed: false
    };
    currentTasks.push(newTask);
    saveLocalTasks(currentTasks);
    return newTask;
};

/**
 * Delete a task by ID
 */
function deleteLocalTask(taskId) {
    const currentTasks = getLocalTasks().filter(task => task.id !== taskId);
    if (currentTasks.length === 0) {
        clearLocalTasks();
        return;
    }
    saveLocalTasks(currentTasks);
};

/**
 * Update a task's text by ID
 */
function updateLocalTask(taskId, newText) {
    const currentTasks = getLocalTasks().map(task =>
        task.id === taskId ? { ...task, text: newText } : task
    );
    saveLocalTasks(currentTasks);
};

/**
 * Toggle completion status of task
 */
function toggleLocalTask(taskId) {
    const currentTasks = getLocalTasks().map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    saveLocalTasks(currentTasks);
};

/**
 * sortItems
 * Sort items in linked list style
 * @param { Array } items 
 * @returns { Array } ordered
 */
function sortItems(items) {
    try {
        const itemMap = new Map();
        let head = null;
        const ordered = [];

        for (const item of items) {
            itemMap.set(item.item_id, item);
            if (!item.prev_item_id) head = item;
        }

        while (head) {
            ordered.push(head);
            head = [...itemMap.values()].find(i => i.prev_item_id === head.item_id);
        }
        return ordered;
    } catch (error) {
        console.warn(error);
        return null;
    }
};

/**
 * clearLocalTasks
 * Clear the local tasks in local storage
 */
function clearLocalTasks() {
    removeLocal('tasklist_item');
}

export {
    getLocalTasks, 
    saveLocalTasks,
    addLocalTask,
    deleteLocalTask,
    updateLocalTask,
    toggleLocalTask,
    sortItems,
};