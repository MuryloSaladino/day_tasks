import { openEditModal } from "./index.js";

export let taskList = [];
export const priorityCategories = [0,1,2,3]

export function noTaskRender() {
    const taskDiv = document.getElementById("task-list")
    taskDiv.innerHTML = "";
    taskDiv.insertAdjacentHTML("beforeend", `<h3>Nenhuma tarefa adicionada</h3>`)
}

export function renderTasks(){

    const taskDiv = document.getElementById("task-list")
    taskDiv.innerHTML = "";

    taskList.length > 0 ?
    priorityCategories.forEach(priority => {
        renderByPriority(taskList.filter(element => element.priority === priority))
    })
    : noTaskRender()
}

function renderByPriority(priorityArray) {
    const taskUl = document.getElementById("task-list")
    priorityArray.forEach(element => {
        taskUl.insertAdjacentHTML(
            "beforeend",
            `
            <li id="${element.id}" class="tasks">
                <i class="material-symbols-outlined priority-level level-${element.priority}">priority_high</i>
                <h3>${element.title}</h3>
                ${element.description.length > 0 ? `<p>${element.description}</p>` : ""}
                <div>
                    <i id="edit-${element.id}" class="material-symbols-outlined edit">edit</i>
                    <i id="trash-${element.id}" class="material-symbols-outlined trash">delete</i>
                </div>
            </li>
            `
        )
        const currentTrash = document.getElementById(`trash-${element.id}`)
        const currentEdit = document.getElementById(`edit-${element.id}`)
        currentTrash.addEventListener("click", (e) => deleteTask(e.target.parentElement.parentElement.id))
        currentEdit.addEventListener("click", (e) => editTask(e.target.parentElement.parentElement.id))
    })
}

function deleteTask(id) {
    taskList = taskList.filter(task => task.id != id);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    renderTasks();
}

function editTask(id) {
    const taskTitle = document.getElementById("edit-task-title");
    const taskSelect = document.getElementById("edit-importance-level");
    const taskDescription  = document.getElementById("edit-task-description");
    const task = taskList.find(task => task.id == id);

    taskTitle.value = task.title;
    taskDescription.value = task.description;
    taskSelect.value = task.priority;
    openEditModal()

    deleteTask(id)
}