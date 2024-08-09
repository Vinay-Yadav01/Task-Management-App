let task = [];

document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("task"));
  if (savedTasks) {
    task = savedTasks;
    updateTaskList();
    updateStats();
  }
});

const savedTasks = () => {
  localStorage.setItem("task", JSON.stringify(task));
};

function addTask() {
  const taskName = document.querySelector("#task").value.trim();
  if (taskName === "") {
    alert("Please enter a task");
    return;
  }
  task.push({ text: taskName, isCompleted: false });
  document.querySelector("#task").value = "";
  updateTaskList();
  updateStats();
  savedTasks();
}

function deleteTask(index) {
  task.splice(index, 1);
  updateTaskList();
  updateStats();
  savedTasks();
}

function toggleTaskCompleted(index) {
  task[index].isCompleted = !task[index].isCompleted;
  updateTaskList();
  updateStats();
  savedTasks();
}

function editTask(index) {
  const newTask = prompt("Enter new task");
  if (newTask === "") {
    alert("Please enter a task");
    return;
  }
  task[index].text = newTask;
  updateTaskList();
  updateStats();
  savedTasks();
}

function updateStats() {
  const totalTasks = task.length;
  const completedTasks = task.filter((task) => task.isCompleted).length;
  const progress = (completedTasks / totalTasks) * 100;
  const progressElement = document.querySelector(".progress");
  progressElement.style.width = `${progress}%`;

  document.getElementById(
    "numbers"
  ).innerText = `${completedTasks} / ${totalTasks}`;

  if (progress === 100) {
    blastConfitti();
  }
}

function updateTaskList() {
  const taskList = document.querySelector(".task-list");
  taskList.innerHTML = "";
  task.forEach((task, index) => {
    const taskElement = document.createElement("li");
    taskElement.innerHTML = `
    <div class="taskItem">
        <div class="task ${task.isCompleted ? "completed" : ""}">
            <input type="checkbox" class="checkbox" ${
              task.isCompleted ? "checked" : ""
            } />
            <p>${task.text}</p>
        </div>
        <div class="icons">
            <img src="img/edit.png" onClick="editTask(${index})" alt="">
            <img src="img/bin.png" onClick="deleteTask(${index})" alt="">
        </div>
    </div>
     `;
    taskElement.addEventListener("change", (e) => {
      toggleTaskCompleted(index);
    });
    taskList.appendChild(taskElement);
  });
}

document.querySelector("#addTask").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});

const blastConfitti = () => {
  const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};
