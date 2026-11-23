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
  tasksListContainer.className = "w-full flex flex-col gap-3 cursor-pointer";

  for (const task of TASKS_DATA) {
    const item = document.createElement("li");
    item.className = "w-full h-fit p-4 bg-gray-100 rounded-xl";

    const title = document.createElement("h2");
    title.className = "font-medium text-2xl text-gray-600 capitalize";
    title.textContent = task.task;

    const createdAt = document.createElement("small");
    createdAt.className = "font-light text-base text-gray-500";
    createdAt.textContent = task.createdAt;

    item.append(title, createdAt);
    tasksListContainer.append(item);
  }

  article.append(tasksListContainer);
  mainElement.replaceChildren(article);
};
