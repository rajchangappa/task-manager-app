import { handleDeleteButton, handleEditButton } from "./handle-buttons";
import { type Task } from "./main";

export const displayTasks = (TASKS_DATA: Task[]) => {
  const mainElement = document.querySelector<HTMLElement>("#main");

  if (!mainElement) {
    throw new Error("Main task container is missing.");
  }

  if (TASKS_DATA.length === 0) {
    mainElement.innerHTML = `
      <article class="mx-4 my-6 flex min-h-[70vh] items-center justify-center rounded-xl px-2">
        <h1 class="text-center text-base font-normal text-gray-400 md:text-lg">
          Add a task to display.
        </h1>
      </article>
    `;
    return;
  }

  const article = document.createElement("article");
  article.className =
    "mx-auto my-4 w-full max-w-3xl px-3 md:my-6 md:px-4 lg:max-w-4xl";

  const tasksListContainer = document.createElement("ul");
  tasksListContainer.className = "flex w-full flex-col gap-3";

  for (const task of TASKS_DATA) {
    const taskContainer = document.createElement("li");
    taskContainer.className =
      "flex w-full items-center gap-3 rounded-xl bg-gray-100 px-4 py-10 md:gap-4 md:p-4";
    taskContainer.dataset.id = task.id;

    // Task Content
    const taskContentContainer = document.createElement("div");
    taskContentContainer.className = "flex min-w-0 flex-1 flex-col gap-1";

    const title = document.createElement("h2");
    title.className =
      "break-words text-lg font-medium text-gray-600 capitalize md:text-xl lg:text-2xl";
    title.textContent = task.task;

    const createdAt = document.createElement("small");
    createdAt.className =
      "text-xs font-light text-gray-500 md:text-sm lg:text-base";
    createdAt.textContent = task.createdAt;

    // Task events
    const taskButtonsContainer = document.createElement("div");
    taskButtonsContainer.className =
      "flex shrink-0 flex-col items-center gap-1";

    const deleteButton = document.createElement("button");
    deleteButton.className =
      "flex h-fit w-14 cursor-pointer items-center justify-center rounded-lg bg-gray-300 px-2 py-1 text-base capitalize md:w-20 md:text-base lg:text-lg";
    deleteButton.textContent = "delete";

    deleteButton.addEventListener("click", () => {
      handleDeleteButton(task.id);
      displayTasks(TASKS_DATA);
    });

    const editButton = document.createElement("button");
    editButton.className =
      "flex h-fit w-14 cursor-pointer items-center justify-center rounded-lg bg-gray-300 px-2 py-1 text-base capitalize md:w-20 md:text-base lg:text-lg";
    editButton.textContent = "edit";

    editButton.addEventListener("click", () => {
      const editInput = taskContentContainer
        .querySelector<HTMLInputElement>("input")
        ?.value.trim();

      if (editInput) {
        if (handleEditButton(task.id, editInput)) {
          displayTasks(TASKS_DATA);
        }
        return;
      }

      const input = document.createElement("input");
      input.type = "text";
      input.className =
        "w-full min-w-0 rounded-lg border border-gray-300 p-2 text-base md:text-lg";
      input.value = task.task;
      title.replaceWith(input);
      editButton.textContent = "save";
      input.focus();
    });

    taskContentContainer.append(title, createdAt);
    taskButtonsContainer.append(editButton, deleteButton);

    taskContainer.append(taskContentContainer, taskButtonsContainer);
    tasksListContainer.append(taskContainer);
  }

  article.append(tasksListContainer);
  mainElement.replaceChildren(article);
};
