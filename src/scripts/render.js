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
                <i id="trash-${element.id}" class="material-symbols-outlined trash">delete</i>
            </li>
            `
        )
        const currentTrash = document.getElementById(`trash-${element.id}`)
        currentTrash.addEventListener("click", (e) => deleteTask(e.target.parentElement.id))
    })
}

function deleteTask(id) {
    taskList = taskList.filter(task => task.id !== id)
    localStorage.setItem("taskList", JSON.stringify(taskList))
    renderTasks()
}