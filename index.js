var taskInput = document.getElementById('taskInput');
var list = document.getElementsByTagName('ul')[0];


function deleteTask() {
    var listItem = this.parentNode;
    list.removeChild(listItem);
}

function taskCompleted() {
    var listItem = this.parentNode;
    listItem.classList.toggle('completed');
}

function editTask() {
    var listItem = this.parentNode;
    var editInput = listItem.querySelector('input[type=text]');
    var label = listItem.querySelector("label");
    var containsClass = listItem.classList.contains("editMode");

    if (containsClass) label.innerText = editInput.value;
     else editInput.value = label.innerText;

    listItem.classList.toggle("editMode");
}

function addEdit(listItem) {
    var editInput = document.createElement('input');
    var editButton = document.createElement('span');

    editButton.innerText = "edit";
    editInput.type = "text";
    editButton.className = "editBtn";
    editButton.onclick = editTask;
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
}

function addDelete(listItem) {
    var deleteButton = document.createElement('span');

    deleteButton.innerText = "delete";
    deleteButton.className = "deleteBtn";
    deleteButton.onclick = deleteTask;
    listItem.appendChild(deleteButton);
}

function createNewTask(taskString) {
    var listItem = document.createElement('li');
    var checkBox = document.createElement('input');
    var label = document.createElement('label');
    var deleteCheckbox = document.getElementById('deleteCheckbox').checked;
    var editCheckbox = document.getElementById('editCheckbox').checked;

    label.innerText = taskString;

    if (editCheckbox) addEdit(listItem);
    if (deleteCheckbox) addDelete(listItem);

    checkBox.type = "checkbox";
    checkBox.onchange = taskCompleted;
    listItem.appendChild(checkBox);
    listItem.appendChild(label);

    return listItem;
}

function addTask () {
    if (taskInput.value !== '') {
        var listItem = createNewTask(taskInput.value);
        list.appendChild(listItem);
        taskInput.value = "";
    } else {
        alert("There is no task");

    }
}

taskInput.onkeydown = function (e) {
    e = e || window.event;
    if (e.keyCode === 13) {
        addTask();
    }
};