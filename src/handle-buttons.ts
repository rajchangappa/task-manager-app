import { saveTaskState, TASKS_DATA } from "./main";

export function handleDeleteButton(id: string) {
  const updatedTaskList = TASKS_DATA.filter((task) => task.id !== id);
  TASKS_DATA.splice(0, TASKS_DATA.length, ...updatedTaskList);
  saveTaskState();
}

export function handleEditButton(id: string, updatedTask: string) {
  const task = TASKS_DATA.find((task) => task.id === id);
  if (!task) return;

  if (!updatedTask) {
    alert("Task cannot be empty.");
    return false;
  }

  task.task = updatedTask;
  saveTaskState();
  return true;
}
