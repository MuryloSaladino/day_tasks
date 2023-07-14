import { renderTasks, taskList } from "./render.js";
import { v4 as uuidv4 } from "../../node_modules/uuid/dist/esm-browser/index.js";

function getPreviousTasks() {
    const previousTasks = JSON.parse(localStorage.getItem("taskList"))
    previousTasks ? previousTasks.forEach(task => taskList.push(task)) : null
}

function createTask() {
    const taskForm = document.getElementById("task-form");
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault()

        const taskTitle = document.getElementById("task-title");
        const taskSelect = document.getElementById("importance-level");
        const taskDescription  = document.getElementById("task-description")

        let newTask = {
            id: uuidv4(),
            title: taskTitle.value,
            priority: Number(taskSelect.value),
            description: taskDescription.value
        };

        taskList.push(newTask)
        localStorage.setItem("taskList", JSON.stringify(taskList))
        Array.from([taskTitle, taskDescription]).forEach(input => input.value = "")
        taskTitle.focus()
        renderTasks()
    })
}

getPreviousTasks()
renderTasks()
createTask()