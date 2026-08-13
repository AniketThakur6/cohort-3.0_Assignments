const Tasks = JSON.parse(localStorage.getItem("nitro_task")) || [];
const form = document.querySelector("form");
const taskList = document.querySelector("#task-list");
const titleError = document.querySelector("#title-error");
const emptyState = document.querySelector(".empty-state");
const allCount = document.querySelector("#count-all-sidebar");
const workCount = document.querySelector("#count-work-sidebar");
const personalCount = document.querySelector("#count-personal-sidebar");
const shoppingCount = document.querySelector("#count-shopping-sidebar");
const urgentCount = document.querySelector("#count-urgent-sidebar");
const pendingCount = document.querySelector("#counter-pending");
const completedCount = document.querySelector("#counter-completed");
const themeBtn = document.querySelector("#theme-toggle-btn");

const savetheme =
  localStorage.getItem("nitro-theme") ||
  window.matchMedia("(prefers-color-scheme:light)").matches
    ? "light"
    : "dark";

setTheme(savetheme);

function setTheme(theme) {
  localStorage.setItem("nitro_theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
  return;
}

themeBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const nextTheme = currentTheme === "light" ? "dark" : "light";
  setTheme(nextTheme);
});

const ui = (arr) => {
  if (!arr.length) {
    taskList.innerHTML = `<div id="empty-state" class="empty-state">
              <div class="empty-illustration">
                <i class="fa-solid fa-circle-check"></i>
              </div>
              <h3>All caught up</h3>
              <p>
                No active tasks found. Go ahead and add some tasks to organize
                your schedule.
              </p>
            </div>`;
    return;
  }

  taskList.innerHTML = arr
    .map(
      (task, idx) => `
  <div class="task-card"  data-status="${task.status}" data-category="${task.category}" data-starred="${task.starred}">
              <button onclick="changeStatus(${idx})" class="task-status-btn">
                <i class=" ${task.status === "pending" ? "fa-regular fa-circle" : "fa-solid fa-circle-check"} "> </i>
              </button>

              <div class="task-card-content">
                ${
                  task.editStats === true
                    ? `<input type="text" class="task-title-edit-input">`
                    : `<span class="task-title-text">${task.tname}</span>`
                }
                <div class="task-card-meta">
                  <span class="badge-category" data-category="${task.category}">${task.category}</span>
                  <span class="task-date-badge">
                    <i class="fa-regular fa-clock"> </i> ${task.time}
                  </span>
                </div>
              </div>

              <div class="task-actions">
                
                <button onClick="toStarred(${idx})" class="action-btn star-btn">

                  <i class=" ${task.starred === true ? "fa-solid fa-star" : "fa-regular fa-star"} "></i>
                  
                </button> 
                <button onClick="swapUp(${idx})" class="action-btn move-up-btn"> 
                  <i class="fa-solid fa-chevron-up"></i> </button>
                <button onClick="swapDown(${idx})" class="action-btn move-down-btn"> 
                  <i class="fa-solid fa-chevron-down"></i> </button>
                <button onclick="editTask(${idx})" class="action-btn edit-btn">
                   <i class=" ${task.editStats === false ? "fa-regular fa-pen-to-square" : "fa-solid fa-check text-success"}"></i>  
                  <!-- <i class="fa-regular fa-pen-to-square"></i>-->
                </button>
                <button onclick="deleteTask(${idx})" class="action-btn delete-btn"> 
                  <i class="fa-regular fa-trash-can"></i></button>
              
              </div>

            </div>
  `,
    )
    .reverse()
    .join("");
};

ui(Tasks);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let tname = form[0].value;
  let category = form[1].value;

  if (tname.trim() === "") {
    titleError.style.display = "flex";
    return;
  } else {
    titleError.style.display = "none";
  }

  const time = new Date().toLocaleTimeString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  let obj = {
    tname,
    category,
    status: "pending",
    starred: false,
    editStats: false,
    time,
  };

  Tasks.push(obj);

  ui(Tasks);
  localStorage.setItem("nitro_task", JSON.stringify(Tasks));
  updateCategoryCounters();
  form[0].value = "";
});

const changeStatus = (idx) => {
  Tasks[idx].status =
    Tasks[idx].status === "completed" ? "pending" : "completed";

  ui(Tasks);
  localStorage.setItem("nitro_task", JSON.stringify(Tasks));
  updateCategoryCounters();
};

const toStarred = (idx) => {
  Tasks[idx].starred = Tasks[idx].starred === false ? true : false;
  ui(Tasks);
  localStorage.setItem("nitro_task", JSON.stringify(Tasks));
};

const swapUp = (idx) => {
  if (idx === Tasks.length - 1) return;
  [Tasks[idx], Tasks[idx + 1]] = [Tasks[idx + 1], Tasks[idx]];
  ui(Tasks);
  localStorage.setItem("nitro_task", JSON.stringify(Tasks));
};

const swapDown = (idx) => {
  if (idx === 0) return;
  [Tasks[idx], Tasks[idx - 1]] = [Tasks[idx - 1], Tasks[idx]];
  ui(Tasks);
  localStorage.setItem("nitro_task", JSON.stringify(Tasks));
};

const editTask = (idx) => {
  let inp = document.querySelector(".task-title-edit-input");
  if (Tasks[idx].editStats === false) {
    Tasks[idx].editStats = true;
    ui(Tasks);
    localStorage.setItem("nitro_task", JSON.stringify(Tasks));
    let inp = document.querySelector(".task-title-edit-input");
    inp.value = `${Tasks[idx].tname}`;
  } else {
    Tasks[idx].time = new Date().toLocaleTimeString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    Tasks[idx].tname = inp.value;
    inp.value = "";
    Tasks[idx].editStats = false;
    ui(Tasks);
    localStorage.setItem("nitro_task", JSON.stringify(Tasks));
  }
};

const deleteTask = (idx) => {
  Tasks.splice(idx, 1);
  updateCategoryCounters();
  ui(Tasks);
  localStorage.setItem("nitro_task", JSON.stringify(Tasks));
};

const search = document.querySelector("#search-input");
const clearAll = document.querySelector("#clear-all-btn");

clearAll.addEventListener("click", () => {
  if (!confirm(`Remove all tasks from "All Tasks"?`)) return;
  Tasks.length = 0;
  updateCategoryCounters();
  ui(Tasks);
  localStorage.setItem("nitro_task", JSON.stringify(Tasks));
});

search.addEventListener("input", () => {
  const filterTask = Tasks.filter((elem) =>
    elem.tname.includes(`${search.value}`),
  );
  ui(filterTask);
});

const categoryFilter = document.querySelector("#category-filter-container");

categoryFilter.addEventListener("click", (e) => {
  const clickItem = e.target.closest(".nav-item");
  if (!clickItem) return;

  const activeItem = categoryFilter.querySelector(".nav-item.active");

  if (activeItem) {
    activeItem.classList.remove("active");
  }

  clickItem.classList.add("active");

  if (clickItem.getAttribute("data-filter") === "all") {
    ui(Tasks);
    return;
  }

  const filterTask = Tasks.filter((elem) =>
    elem.category.includes(clickItem.getAttribute("data-filter")),
  );

  ui(filterTask);
});

const updateCategoryCounters = () => {
  let allTaskCount = Tasks.length;
  let completedTaskCount = Tasks.filter(
    (elem) => elem.status === "completed",
  ).length;
  pendingTaskCount = allTaskCount - completedTaskCount;

  allCount.textContent = Tasks.length;
  completedCount.textContent = completedTaskCount;
  pendingCount.textContent = pendingTaskCount;

  if (workCount) {
    workCount.textContent = Tasks.filter((t) => t.category === "work").length;
  }

  if (personalCount) {
    personalCount.textContent = Tasks.filter(
      (t) => t.category === "personal",
    ).length;
  }

  if (shoppingCount) {
    shoppingCount.textContent = Tasks.filter(
      (t) => t.category === "shopping",
    ).length;
  }

  if (urgentCount) {
    urgentCount.textContent = Tasks.filter(
      (t) => t.category === "urgent",
    ).length;
  }
};

updateCategoryCounters();
