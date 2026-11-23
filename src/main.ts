import { displayTasks } from "./display-task";
import "./style.css";
import { generateTimeStamp } from "./timestamp";

export interface Task {
  id: string;
  task: string;
  createdAt: string;
}

const addTaskForm = document.querySelector<HTMLFormElement>("#task-input-form");
const formInputElement = document.querySelector<HTMLInputElement>(
  "#task-input-element",
);

// Load Saved data
const savedTasks = localStorage.getItem("all-tasks-data");
export const TASKS_DATA: Task[] = savedTasks ? JSON.parse(savedTasks) : [];

// Save To Local Storage
export function saveTaskState() {
  localStorage.setItem("all-tasks-data", JSON.stringify(TASKS_DATA));
}

if (!addTaskForm || !formInputElement) {
  throw new Error("Task form elements are missing.");
}

// Add New Task
addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userInput = formInputElement.value.trim();

  if (userInput === "") {
    alert("Please enter a task to add.");
    return;
  }

  const newTask: Task = {
    id: crypto.randomUUID(),
    task: userInput,
    createdAt: generateTimeStamp(),
  };

  TASKS_DATA.push(newTask);
  saveTaskState();

  addTaskForm.reset();
  displayTasks(TASKS_DATA);
});

displayTasks(TASKS_DATA);
