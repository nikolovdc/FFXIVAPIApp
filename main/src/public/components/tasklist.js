import { checkTask, createTask, deleteTask, editTaskDesc } from '../services/tasklistServices.js';
import { ToggleDisplay } from './displayUtil.js';

/**
 * InitTaskList
 * Initiate the task list
 */
function InitTaskList() {
    // Creating the tasklist div
    const tasklistDiv = document.createElement("div");
    tasklistDiv.id = "tasklist-container";
    tasklistDiv.className = "hide";

    // Creating the fold button in the tasklist
    const foldButton = document.createElement("img");
    foldButton.className = "tasklist-display-button";
    foldButton.classList.add("expand");
    foldButton.alt = "Tasklist Fold Button";
    
    // Creating the header of the task list
    const tasklistHeader = document.createElement("div");
    tasklistHeader.id = "tasklist-header";
    tasklistHeader.innerHTML = `
        <h2>Task List</h2>
    `;
    
    /**             TASKLIST            **/
    const tasklist = document.createElement("ul");
    tasklist.className = "taskList";
    tasklist.id = "taskBullets";
    //Check the task list by clicking task item
    tasklist.addEventListener('click', function (ev) {
        if (ev.target.tagName === 'LI' || ev.target.classList.contains('taskText')) {
            let item_id = ev.target.dataset.id;
            let is_completed = (ev.target.classList.contains('checked'));
            
            checkTask(item_id, is_completed);    // Sync in the database

            ev.target.classList.toggle('checked'); //For style purposes
        }
    }, false);

    //Add task section
    const addTaskListDiv = document.createElement("div");
    addTaskListDiv.id = "tasklist-add-task-container";
    //The add task list button
    const addTaskListIcon = document.createElement("img");
    addTaskListIcon.alt = "Add Task Icon";
    addTaskListIcon.className = "tasklist-add-task-icon";
    //The task input box container
    const taskTextBoxDiv = document.createElement("div");
    taskTextBoxDiv.id = "tasklist-add-task-text-box";
    taskTextBoxDiv.className = "hide";  //Hide the task text container initially
    //Create the actual input box
    const taskTextBox = document.createElement("input");
    taskTextBox.type = "text";
    taskTextBox.className = "tasklist-add-task-text-input";
    //The enter button for the task input
    const enterTaskButton = document.createElement("img");
    enterTaskButton.alt = "Enter Tasklist Icon";
    enterTaskButton.className = "tasklist-add-task-enter";
    //The enter button will add a new task in the task list
    enterTaskButton.onclick = (e) => {
        AddTaskToTaskList(taskTextBox.value);
        taskTextBox.value = "";
    };
    //Allow user to enter the input using keyboard
    taskTextBox.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            AddTaskToTaskList(taskTextBox.value);
            taskTextBox.value = "";
        }
    });
    

    //Ensure that everytime the add task icon is clicked,
    //the input container will show and expand the container
    addTaskListIcon.onclick = (e) => {
        if (taskTextBoxDiv.classList.contains("hide")) {
            ToggleDisplay(taskTextBoxDiv, true);
            taskTextBox.focus();
        } else {
            ToggleDisplay(taskTextBoxDiv, false);
        }
    };
    //Append the input box and button to the container
    taskTextBoxDiv.appendChild(taskTextBox);
    taskTextBoxDiv.appendChild(enterTaskButton);
    
    //Append the add task icon and task text box to the container
    addTaskListDiv.appendChild(addTaskListIcon);
    addTaskListDiv.appendChild(taskTextBoxDiv);
    
    //Append the fold button, header, tasklist, and add task div to the container
    tasklistDiv.appendChild(foldButton);
    tasklistDiv.appendChild(tasklistHeader);
    tasklistDiv.appendChild(tasklist);
    tasklistDiv.appendChild(addTaskListDiv);

    //Append the tasklist to the body
    document.body.appendChild(tasklistDiv);
};

/**
 * AddTaskToTaskList
 * @param { string } taskText 
 */
async function AddTaskToTaskList(taskText) {
    if (!taskText.trim()) return;
    // Add the data to the database first
    const item_id = await createTask(taskText);
    console.log("Item id: ", item_id);
    const taskBullet = CreateTaskElement(taskText, item_id);
    const tasklist = document.getElementById('taskBullets');
    tasklist.appendChild(taskBullet); 
};

/**
 * AddTaskElement
 * create a single task list in the task list
 * @param {string} taskText - the text input of a single task list
 * @param {number} item_id - the id of the item
 * @returns {Node} taskBullet
 */
function CreateTaskElement(taskText, item_id) {
    if (!taskText.trim()) return;
    // Init a task bullet 
    const taskBullet = document.createElement("li");
    taskBullet.dataset.id = item_id; //Sets the id in the class name
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskSpan.className = "taskText";

    // Sets up the misc functionality that 
    // can edit or delete the bullet
    const miscDiv = document.createElement("div");
    const miscSpan = document.createElement("span");
    miscSpan.textContent = "...";

    // The dropdown for misc
    const miscDropdownDiv = document.createElement("div");
    miscDropdownDiv.className = "task-item-misc-dropdown";
    miscDropdownDiv.classList.add("hide");
    const deleteSpan = document.createElement("div");
    deleteSpan.textContent = "delete";
    deleteSpan.onclick = async (e) => {
        await DeleteTaskInTaskList(item_id);
    };
    const editSpan = document.createElement("div");
    editSpan.onclick = async (e) => {
        await InitUpdateBox(item_id);
    };
    editSpan.textContent = "edit";
    miscDropdownDiv.appendChild(deleteSpan);
    miscDropdownDiv.appendChild(editSpan);

    // Give the misc span the event listener
    // that everytime it is open up, others will close
    // And the dropdown will toggle display
    miscSpan.onclick = (e) => {
        // Close all other open dropdowns first
        document.querySelectorAll(".task-item-misc-dropdown")
        .forEach(dropdown => {
            if (dropdown !== miscDropdownDiv) 
                ToggleDisplay(dropdown, false);
        });
        (miscDropdownDiv.classList.contains("hide")) ? 
            ToggleDisplay(miscDropdownDiv, true) : 
            ToggleDisplay(miscDropdownDiv, false);
    };
    taskBullet.appendChild(taskSpan);
    miscDiv.appendChild(miscSpan);
    miscDiv.appendChild(miscDropdownDiv);
    taskBullet.appendChild(miscDiv);
    return taskBullet;
};

/**
 * DeleteTaskInTaskList
 * Delete a single task in the tasklist
 * @param {number} item_id 
 */
async function DeleteTaskInTaskList(item_id) {
    const taskBullet = document.querySelector(`[data-id="${item_id}"]`);
    taskBullet.remove();
    await deleteTask(item_id);
};

/**
 * UpdateTaskInTaskList
 * Init the input box to allow updating task
 * @param {number} item_id 
 */
async function InitUpdateBox(item_id) {
    const taskBullet = document.querySelector(`[data-id="${item_id}"]`);
    
    // Create input box for update
    const updateInput = document.createElement("input");
    updateInput.type = "text";
    updateInput.className = "task-item-input-update";
    
    // Assume focus out means the edit is finished
    updateInput.addEventListener("focusout", async (e) => {
        let description = updateInput.value;
        if (!description.trim()) return;
        await editTaskDesc(item_id, description); //Sync the update in database
        const updatedEle = CreateTaskElement(description, item_id); //Create new element of tasklist
        updateInput.replaceWith(updatedEle); //Replace the input box with the updated ele
    });

    // Assume enter means the edit is finished
    updateInput.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            let description = updateInput.value;
            if (!description.trim()) return;
            await editTaskDesc(item_id, description); //Sync the update in database
            const updatedEle = CreateTaskElement(description, item_id); //Create new element of tasklist
            updateInput.replaceWith(updatedEle);
        }
    });
    
    //Change the taskbullet to the input box
    taskBullet.replaceWith(updateInput);    
};

export {
    InitTaskList,
};