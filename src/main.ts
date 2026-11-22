import "./style.css";
import { generateTimeStamp } from "./timestamp";

interface Task {
  id: string;
  task: string | undefined;
  createdAt: string;
}

const TASKS_DATA: Task[] = [];

const addTaskForm = document.querySelector<HTMLFormElement>("#task-input-form");
const formInputElement = document.querySelector<HTMLInputElement>(
  "#task-input-element",
);

addTaskForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  let userInput = formInputElement?.value.trim();

  if (userInput === "") {
    alert("Please enter a task to add.");
    return;
  }

  let newTask: Task = {
    id: crypto.randomUUID(),
    task: userInput,
    createdAt: generateTimeStamp(),
  };

  TASKS_DATA.push(newTask);
  console.log("New task added!", newTask);

  addTaskForm.reset();
});
