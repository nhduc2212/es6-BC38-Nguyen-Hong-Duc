import Task from "./task.js";
var taskList = [];
var completedTaskList = [];

const createNewTask = () => {
  const taskName = document.getElementById("newTask").value;
  taskList.push(new Task(taskName, false));
  console.log(taskList);
  renderTaskList();
};

const renderTaskList = () => {
  const todo = document.getElementById("todo");
  let toDoList = "";
  for (let i = 0; i < taskList.length; i++) {
    toDoList += `<li>${taskList[i].taskName}<i data-remove-button-id="remove${taskList[i].taskName}" class="fa-regular fa-trash-can"></i><i data-check-button-id="check${taskList[i].taskName}" class="fa-regular fa-circle-check"></i></li>`;
  }
  todo.innerHTML = toDoList;
  for (let k = 0; k < taskList.length; k++) {
    document
      .querySelector(`[data-remove-button-id="remove${taskList[k].taskName}"]`)
      .addEventListener("click", () => deleteTask(taskList[k].taskName));
    document
      .querySelector(`[data-check-button-id="check${taskList[k].taskName}"]`)
      .addEventListener("click", () => {
        checkTask(taskList[k].taskName);
        renderCompletedTaskList();
      });
  }
};

var deleteTask = (taskName) => {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].taskName == taskName) {
      taskList.splice(i, 1);
      renderTaskList();
    }
  }
};

var deleteCompletedTask = (taskName) => {
  for (let i = 0; i < completedTaskList.length; i++) {
    if (completedTaskList[i].taskName == taskName) {
      completedTaskList.splice(i, 1);
      renderCompletedTaskList();
    }
  }
};

const checkTask = (taskName) => {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].taskName == taskName) {
      completedTaskList.push(taskList[i]);
      deleteTask(taskName);
    }
    renderTaskList();
  }
};

const uncheckTask = (taskName) => {
  for (let i = 0; i < completedTaskList.length; i++) {
    if (completedTaskList[i].taskName == taskName) {
      taskList.push(completedTaskList[i]);
      deleteCompletedTask(taskName);
    }
    renderTaskList();
    renderCompletedTaskList();
  }
};

const renderCompletedTaskList = () => {
  let completed = document.getElementById("completed");
  let completedList = "";
  for (let i = 0; i < completedTaskList.length; i++) {
    completedList += `<li>${completedTaskList[i].taskName}<i data-remove-completed-button-id="remove${completedTaskList[i].taskName}" class="fa-regular fa-trash-can"></i><i data-check-completed-button-id="check${completedTaskList[i].taskName}" class="fa-regular fa-circle-check"></i></li>`;
  }
  completed.innerHTML = completedList;
  for (let k = 0; k < completedTaskList.length; k++) {
    document
      .querySelector(
        `[data-remove-completed-button-id="remove${completedTaskList[k].taskName}"]`
      )
      .addEventListener("click", () =>
        deleteCompletedTask(completedTaskList[k].taskName)
      );
    document
      .querySelector(
        `[data-check-completed-button-id="check${completedTaskList[k].taskName}"]`
      )
      .addEventListener("click", () =>
        uncheckTask(completedTaskList[k].taskName)
      );
  }
};

const sortDesc = () => {
  taskList = taskList.sort(function (a, b) {
    if (a.taskName < b.taskName) {
      return -1;
    }
    if (a.taskName > b.taskName) {
      return 1;
    }
    return 0;
  });
  completedTaskList = completedTaskList.sort(function (a, b) {
    if (a.taskName < b.taskName) {
      return -1;
    }
    if (a.taskName > b.taskName) {
      return 1;
    }
    return 0;
  });
  renderTaskList();
  renderCompletedTaskList();
};
const sortIncr = () => {
  taskList = taskList.sort(function (a, b) {
    if (a.taskName > b.taskName) {
      return -1;
    }
    if (a.taskName < b.taskName) {
      return 1;
    }
    return 0;
  });
  completedTaskList = completedTaskList.sort(function (a, b) {
    if (a.taskName > b.taskName) {
      return -1;
    }
    if (a.taskName < b.taskName) {
      return 1;
    }
    return 0;
  });

  renderTaskList();
  renderCompletedTaskList();
};

document.getElementById("two").addEventListener("click", () => sortDesc());
document.getElementById("three").addEventListener("click", () => sortIncr());
document
  .getElementById("addItem")
  .addEventListener("click", () => createNewTask());
