let taskList = [[],[],[],[]];
const taskDiv = document.getElementById('task-list')
const taskForm = document.getElementById('task-form');

taskForm.addEventListener('submit', function(event){
    event.preventDefault()

    const taskTitle = document.getElementById('task-title');
    const taskSelect = document.getElementById("importance-level");

    let newTask = {};

    newTask.name = taskTitle.value;
    newTask.importance = taskSelect.value;

    if(newTask.importance == 1)    {
        taskList[3].push(newTask)
    }else if(newTask.importance == 2)    {
        taskList[2].push(newTask)
    }else if(newTask.importance == 3)    {
        taskList[1].push(newTask)
    }else if(newTask.importance == 4)    {
        taskList[0].push(newTask)
    }

    showTasks()
})



function showTasks(){

    taskDiv.innerHTML = '';

    let count = 0;

    for(let i = 0; i < taskList.length; i++)    {
        for(let j = 0; j < taskList[i].length; j++) {
            taskDiv.insertAdjacentHTML(
            'beforeend',
            `<div id="div-${count}" class='tasks importance${i}'>
            <span class="span-${i}">!</span><span>${taskList[i][j].name}</span><img id="trash-${count}" class="trash" src="./images/trash.png">
            </div>`
            )

            const trashImage = document.getElementById(`trash-${count}`)
            const currentDiv = document.getElementById(`div-${count}`)

            trashImage.addEventListener('click', function() {
                currentDiv.remove();
                taskList[i].splice([j], 1);
            })
    
            count++
        }
    }
}

