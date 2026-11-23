import { displayTasks } from "./display-task";
import "./style.css";
import { generateTimeStamp } from "./timestamp";

export interface Task {
  id: string;
  task: string;
  createdAt: string;
}

export const TASKS_DATA: Task[] = [];

const addTaskForm = document.querySelector<HTMLFormElement>("#task-input-form");
const formInputElement = document.querySelector<HTMLInputElement>(
  "#task-input-element",
);

if (!addTaskForm || !formInputElement) {
  throw new Error("Task form elements are missing.");
}

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
  console.log("New task added!", newTask);

  addTaskForm.reset();
  displayTasks(TASKS_DATA);
});
