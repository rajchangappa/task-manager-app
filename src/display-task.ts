import { handleDeleteButton, handleEditButton } from "./handle-buttons";
import { type Task } from "./main";

export const displayTasks = (TASKS_DATA: Task[]) => {
  const mainElement = document.querySelector<HTMLElement>("#main");

  if (!mainElement) {
    throw new Error("Main task container is missing.");
  }

  if (TASKS_DATA.length === 0) {
    mainElement.innerHTML = `
      <article class="min-h-[70vh] mx-4 my-6 flex justify-center items-center rounded-xl">
        <h1 class="text-lg font-normal text-gray-400">
          Add a task to display.
        </h1>
      </article>
    `;
    return;
  }

  const article = document.createElement("article");
  article.className = "flex flex-col gap-2 mx-4 my-6";

  const tasksListContainer = document.createElement("ul");
  tasksListContainer.className = "w-full flex flex-col gap-3";

  for (const task of TASKS_DATA) {
    const taskContainer = document.createElement("li");
    taskContainer.className =
      "w-full flex items-center gap-4 p-4 rounded-xl bg-gray-100";

    // Task Content
    const taskContentContainer = document.createElement("div");
    taskContentContainer.className = "flex flex-1 flex-col gap-1";

    const title = document.createElement("h2");
    title.className = "font-medium text-2xl text-gray-600 capitalize";
    title.textContent = task.task;

    const createdAt = document.createElement("small");
    createdAt.className = "font-light text-base text-gray-500";
    createdAt.textContent = task.createdAt;

    // Task events
    const taskButtonsContainer = document.createElement("div");
    taskButtonsContainer.className = "flex flex-col items-center gap-1";

    const deleteButton = document.createElement("button");
    deleteButton.className =
      "w-[64px] h-fit flex py-0.5 px-2 text-lg items-center justify-center rounded-lg bg-gray-300 cursor-pointer";
    deleteButton.textContent = "delete";
    deleteButton.addEventListener("click", handleDeleteButton);

    const editButton = document.createElement("button");
    editButton.className =
      "w-[64px] h-fit flex py-0.5 px-2 text-lg items-center justify-center rounded-lg bg-gray-300 cursor-pointer";
    editButton.textContent = "edit";
    editButton.addEventListener("click", handleEditButton);

    taskContentContainer.append(title, createdAt);
    taskButtonsContainer.append(editButton, deleteButton);

    taskContainer.append(taskContentContainer, taskButtonsContainer);
    tasksListContainer.append(taskContainer);
  }

  article.append(tasksListContainer);
  mainElement.replaceChildren(article);
};
