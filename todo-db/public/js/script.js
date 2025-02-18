const signInContent = document.getElementById("sign-in");
const signUpContent = document.getElementById("sign-up");
const switcher = document.getElementById("switcher");
const signInSwitch = document.getElementById("in-switch");
const signUpSwitch = document.getElementById("up-switch");

//Modal window
switcher.addEventListener("click", ({ target }) => {
    if (target.classList.contains("activated")) return;
    target.classList.add("activated");

    if (target == signInSwitch){
        signUpSwitch.classList.toggle("activated");
    }
    else {
        signInSwitch.classList.toggle("activated");
    }
    if (signInSwitch.classList.contains("activated")){
        signUpContent.classList.toggle("invisible")
        signInContent.classList.toggle("invisible");
    }
    else {
        signInContent.classList.toggle("invisible");
        signUpContent.classList.toggle("invisible");
    }
})


const taskList = document.getElementById("data-list");
const app = document.getElementById("main");

app.addEventListener("click", ({ target }) => {
    if (target.tagName !== "BUTTON") return;

    const { action } = target.dataset;

    if (action) {
        switch(action) {
            case "add":
                if (getValue("main__input")) {
                    addTask(task);
                }    
                break;
            case "check":
                completeTask(target);
                break;
            case "delete":
                deleteTask(target.parentNode);
                break;
            case "highlight":
                highlightTask(target)
                break;
        }
    }

})

document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
})

function getValue(elem) {
    return task = document.getElementById(elem).value;
}

function addTask(data) {
    const task = document.createElement("li");

    task.className = "main__data-item";
    task.innerHTML = `<button class="btn btn-checkbox" data-action="check">&#10004</button>
                      <p class="main__todo-task">${data}</p>
                      <button class="btn btn-important" data-action="highlight">&#9733</button>
                      <button class="btn btn-delete" data-action="delete">&times</button>`;
    taskList.prepend(task);
    saveTasks();
    document.getElementById("main__input").value = "";                
}

function deleteTask(target) {
    target.remove();
    saveTasks();
}

function completeTask(target){
    toggleClass(target, "btn-checkbox_active");
    toggleClass(target.parentNode, "completed")
}

function highlightTask(target){
    toggleClass(target, "highlighted")
    toggleClass(target.previousElementSibling, "bold")
}

function toggleClass(target, className) {
    target.classList.toggle(className);
    saveTasks();
}

function saveTasks() {
    localStorage.setItem('list', taskList.innerHTML)
}

function loadTasks() {
    taskList.innerHTML = localStorage.getItem('list');
}
