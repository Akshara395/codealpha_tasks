let taskForm = document.getElementById("taskForm");
let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");

// Load data from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
displayTasks();

/* --------------------
   CREATE (Add Task)
--------------------- */
taskForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Event handling

    let text = taskInput.value.trim();
    if (text === "") return;

    tasks.push({ text: text, completed: false });
    updateStorage();
    taskInput.value = "";
});

/* --------------------
   READ (Display Tasks)
--------------------- */
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        // Checkbox → Mark completed
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            updateStorage();
        });

        // Task text
        let span = document.createElement("span");
        span.innerText = task.text;
        if (task.completed) span.classList.add("completed");

        // Buttons (Edit / Delete)
        let actions = document.createElement("div");
        actions.className = "actions";

        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.onclick = () => editTask(index);

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.onclick = () => deleteTask(index);

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(actions);

        taskList.appendChild(li);
    });
}

/* --------------------
   UPDATE (Edit Task)
--------------------- */
function editTask(index) {
    let newTask = prompt("Edit task:", tasks[index].text);
    if (newTask && newTask.trim() !== "") {
        tasks[index].text = newTask;
        updateStorage();
    }
}

/* --------------------
   DELETE (Remove Task)
--------------------- */
function deleteTask(index) {
    tasks.splice(index, 1);
    updateStorage();
}

/* --------------------
   localStorage Update
--------------------- */
function updateStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}
