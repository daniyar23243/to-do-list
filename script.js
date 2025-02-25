// Retrive todo from local storage and initialize an empty array

let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoCount = document.getElementById("todoCount");
const todoList = document.getElementById("todoList");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");
const delay = 500;
const deleteMarked = document.getElementById("deleteMarked");

//initialize 

document.addEventListener("DOMContentLoaded", 
    function () {
    addButton.addEventListener("click", addTask);
    todoInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    }); 
    deleteButton.addEventListener("click", deleteAllTasks );
    displayTasks();
});

function addTask() {
    const newTask = todoInput.value.trim();
    if (newTask !== "") {
        todo.push({
            text: newTask, 
            disabled: false,
        });
        saveToLocalStorage();
        todoInput.value = "";
        displayTasks();
    }
}


function  displayTasks  () {
    todoList.innerHTML = "";
    todo.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML = `
        <div class="todo-container">
            <input type="checkbox" class = "todo-checkbox"
            id ="input-${index}" ${ item.disabled ? "checked" : ""
            }>
            <p id = "todo-${index}" class = "${item.disabled ? "disabled" : ""}"
            onclick="editTask(${index})">${item.text}
            </p>
        </div>    
        `;
        p.querySelector(".todo-checkbox").addEventListener("change", () => {
            toggleTask(index);
        });
        todoList.appendChild(p);
    });
    todoCount.textContent = todo.length;
}



function editTask(index){
    const todoItem= document.getElementById(`todo-${index}`);
    const existingText = todo[index].text;
    const inputElement = document.createElement("input");
    inputElement.value = existingText;
    todoItem.replaceWith(inputElement);
    inputElement.focus();
    function update() {
        const updatedText = inputElement.value.trim();
        if (updatedText) {
            todo[index].text = updatedText;
            saveToLocalStorage();
        }
        displayTasks();
    }

    inputElement.addEventListener("blur", function (){
        const updatedText = inputElement.value.trim();   
        if (updatedText) {
            todo[index].text = updatedText;
            saveToLocalStorage();
        }
            displayTasks();
        })
        inputElement.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                update();
            }
        });         


}
function toggleTask(index) {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}


function deleteAllTasks() {
    todo = [];
    saveToLocalStorage();
    displayTasks();
    paintRed();
}
function paintRed(){
    document.querySelectorAll(".bin").forEach(element => {
        element.classList.add("colored");
    });
    setTimeout(function() {
        document.querySelectorAll(".bin").forEach(element => {
            element.classList.remove("colored");})
      }, delay);
}


function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
};

deleteMarked.addEventListener("click", function () {
    todo = todo.filter(item => !item.disabled);
    saveToLocalStorage();
    displayTasks();
    document.getElementById("deleteMarked").classList.add("marked");
    setTimeout(function() {
        document.getElementById("deleteMarked").classList.remove("marked");
      }, delay);
});