let tasks = [];
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
    <span>${taskText}</span>
    <div>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    </div>
`;

    taskList.appendChild(li);
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
   
    taskInput.value = "";
}
taskList.addEventListener("click", function(event) {

    if (event.target.classList.contains("delete-btn")) {
        event.target.parentElement.parentElement.remove();
    }

    if (event.target.classList.contains("edit-btn")) {

        const span = event.target.parentElement.previousElementSibling;

        const newText = prompt("Edit Task:", span.textContent);

        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText;
        }
    }

    if (event.target.tagName === "SPAN") {
        event.target.parentElement.classList.toggle("completed");
    }

});
window.onload = function() {

    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(task => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${task}</span>
            <div>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });

    tasks = savedTasks;
};
const filterButtons = document.querySelectorAll(".filters button");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        document.querySelectorAll("#taskList li").forEach(task => {

            if (filter === "all") {
                task.style.display = "flex";
            }

            else if (filter === "active") {
                task.style.display =
                    task.classList.contains("completed")
                    ? "none"
                    : "flex";
            }

            else if (filter === "completed") {
                task.style.display =
                    task.classList.contains("completed")
                    ? "flex"
                    : "none";
            }

        });
    });
});