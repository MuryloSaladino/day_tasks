import { renderTasks, taskList } from "./render.js";

function getPreviousTasks() {
    const previousTasks = JSON.parse(localStorage.getItem("taskList"))
    previousTasks ? previousTasks.forEach(task => taskList.push(task)) : null
}

function formEvents() {
    const taskForm = document.getElementById("task-form");
    const modalTaskForm = document.getElementById("edit-task-form");
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const taskTitle = document.getElementById("task-title");
        const taskSelect = document.getElementById("importance-level");
        const taskDescription  = document.getElementById("task-description");
        saveTask(taskTitle, taskDescription, taskSelect)
    })
    modalTaskForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const taskTitle = document.getElementById("edit-task-title");
        const taskSelect = document.getElementById("edit-importance-level");
        const taskDescription  = document.getElementById("edit-task-description");
        saveTask(taskTitle, taskDescription, taskSelect)
    })
}

function saveTask(input, textarea, select) {
    let newTask = {
        id: new Date().getTime(),
        title: input.value,
        priority: Number(select.value),
        description: textarea.value
    };

    taskList.push(newTask)
    localStorage.setItem("taskList", JSON.stringify(taskList))
    Array.from([input, textarea]).forEach(input => input.value = "")
    input.focus()
    renderTasks()
    closeEditModal()
}

export function openEditModal() {
    const modal = document.getElementById("edit-task");
    modal.showModal()
}
export function closeEditModal() {
    const modal = document.getElementById("edit-task");
    modal.close()
}
function modalEvents() {
    const modal = document.getElementById("edit-task");
    const modalTaskForm = document.getElementById("edit-task-form");
    const modalCloser = document.getElementById("close-modal")
    
    modal.addEventListener("click", () => closeEditModal())
    modalTaskForm.addEventListener("click", (e) => e.stopPropagation())
    modalCloser.addEventListener("click", () => closeEditModal())
}

getPreviousTasks()
renderTasks()
formEvents()
modalEvents()