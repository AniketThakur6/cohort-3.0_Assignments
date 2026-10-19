// ==========================================
// THEME TOGGLE LOGIC
// ==========================================
const themeToggle = document.querySelector("#theme-toggle");
const htmlElement = document.documentElement;
const knob = document.querySelector("#theme-toggle-knob");

function updateToggleKnob(isDark) {
  if (!knob) return;
  if (isDark) {
    knob.style.transform = "translateX(20px)";
  } else {
    knob.style.transform = "translateX(0px)";
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    htmlElement.classList.toggle("dark");
    const isDark = htmlElement.classList.contains("dark");
    updateToggleKnob(isDark);
  });
}

updateToggleKnob(htmlElement.classList.contains("dark"));

// ==========================================
// LOCATION LOGIC
// ==========================================
function getLocationAndPermission() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetchCityName(latitude, longitude);
        fetchWeather(latitude, longitude);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("You have denied the location permission.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information unavailable.");
            break;
          case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        }
      },
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function fetchCityName(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const address = data.address;
      const city =
        address.city ||
        address.town ||
        address.village ||
        address.county ||
        "Unknown Location";
      const state = address.state_district || address.state || "";

      const locationBox = document.querySelector(".badge-pill");
      if (locationBox) locationBox.innerText = `${city}, ${state}`;
    })
    .catch((error) => {
      console.error("Error fetching city name:", error);
      const locationBox = document.querySelector(".badge-pill");
      if (locationBox) locationBox.innerText = `Lon: ${lon.toFixed(2)}`;
    });
}

window.onload = function () {
  getLocationAndPermission();
  loadDailyMotivation();
  loadDataFromLocalStorage();
};

const locationBadge = document.querySelector(".badge-pill");
if (locationBadge) {
  locationBadge.addEventListener("click", () => {
    locationBadge.innerText = "Locating...";
    getLocationAndPermission();
  });
}

// ==========================================
// PAGE NAVIGATION LOGIC (Sidebar → Content Switch)
// ==========================================
const navLinks = document.querySelectorAll(".nav-link");
const contentArea = document.querySelector("#content-area");

const defaultTasksHTML = `
    <div class="task-item group">
      <div class="task-left">
        <input class="custom-checkbox" type="checkbox" />
        <span class="task-text">Review design system updates</span>
      </div>
      <div class="task-actions">
        <button class="action-icon-btn edit-btn" aria-label="Edit task">
          <span class="material-symbols-outlined text-18">edit</span>
        </button>
        <button class="action-icon-btn delete-btn" aria-label="Delete task">
          <span class="material-symbols-outlined text-18">delete</span>
        </button>
      </div>
      <span class="status-badge bg-rose">PENDING</span>
    </div>
    <div class="task-item group">
      <div class="task-left">
        <input class="custom-checkbox" type="checkbox" />
        <span class="task-text">Update team on project status</span>
      </div>
      <div class="task-actions">
        <button class="action-icon-btn edit-btn" aria-label="Edit task">
          <span class="material-symbols-outlined text-18">edit</span>
        </button>
        <button class="action-icon-btn delete-btn" aria-label="Delete task">
          <span class="material-symbols-outlined text-18">delete</span>
        </button>
      </div>
      <span class="status-badge bg-blue">RUNNING</span>
    </div>
    <div class="task-item group">
      <div class="task-left">
        <input class="custom-checkbox" type="checkbox" checked />
        <span class="task-text" style="text-decoration: line-through; opacity: 0.7">Approve timesheets</span>
      </div>
      <div class="task-actions">
        <button class="action-icon-btn edit-btn" aria-label="Edit task">
          <span class="material-symbols-outlined text-18">edit</span>
        </button>
        <button class="action-icon-btn delete-btn" aria-label="Delete task">
          <span class="material-symbols-outlined text-18">delete</span>
        </button>
      </div>
      <span class="status-badge bg-emerald">COMPLETE</span>
    </div>
`;

const defaultGoalsHTML = `
    <div class="task-item group">
      <div class="task-left">
        <input class="custom-checkbox goal-checkbox" type="checkbox" />
        <span class="task-text">Complete dashboard UI styling</span>
      </div>
      <div class="task-actions">
        <button class="action-icon-btn delete-goal-btn" aria-label="Delete goal" style="color: #f43f5e; background: none; border: none; cursor: pointer;">
          <span class="material-symbols-outlined text-18">delete</span>
        </button>
      </div>
    </div>
`;

const defaultEventsHTML = `
    <div class="timeline-item">
      <div class="timeline-bullet"></div>
      <div class="timeline-time">09:00 AM - 10:00 AM</div>
      <div class="timeline-content-box" style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h4 class="event-title">Team Standup</h4>
          <p class="event-subtitle">Zoom Room A</p>
        </div>
        <button class="action-icon-btn delete-event-btn" style="color: #f43f5e; background: none; border: none; cursor: pointer;"><span class="material-symbols-outlined text-18">delete</span></button>
      </div>
    </div>
    <div class="timeline-item">
      <div class="timeline-bullet bg-blue-dot"></div>
      <div class="timeline-time text-blue-time">10:30 AM - 12:00 PM</div>
      <div class="timeline-content-box gradient-box" style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h4 class="event-title text-white">Deep Work Session</h4>
          <p class="event-subtitle opacity-9">Focus on report drafting</p>
        </div>
        <button class="action-icon-btn delete-event-btn" style="color: white; background: none; border: none; cursor: pointer;"><span class="material-symbols-outlined text-18">delete</span></button>
      </div>
    </div>
    <div class="timeline-item">
      <div class="timeline-bullet"></div>
      <div class="timeline-time">01:00 PM - 02:00 PM</div>
      <div class="timeline-content-box" style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h4 class="event-title">Lunch Break</h4>
        </div>
        <button class="action-icon-btn delete-event-btn" style="color: #f43f5e; background: none; border: none; cursor: pointer;"><span class="material-symbols-outlined text-18">delete</span></button>
      </div>
    </div>
`;

const pageContents = {
  dashboard: contentArea ? contentArea.innerHTML : "",

  tasks: `
        <div class="widget-card">
  <div class="widget-header">
    <h3 class="widget-title text-teal">Action Items</h3>
    <button class="icon-btn">
      <span class="material-symbols-outlined">more_horiz</span>
    </button>
  </div>
  <div class="progress-section">
    <div class="progress-info">
      <span class="sub-text">Task Progress</span>
      <span class="sub-text" id="task-counter">1/3 Completed</span>
    </div>
    <div class="progress-bar-bg">
      <div
        class="progress-bar-fill"
        id="progress-bar"
        style="width: 33%"
      ></div>
    </div>
  </div>
  <div class="input-wrapper" style="display: flex; gap: 8px; margin-bottom: 24px;">
    <div style="position: relative; flex: 1;">
      <span class="material-symbols-outlined input-icon">add</span>
      <input
        class="custom-input"
        id="task-input"
        placeholder="Add a new task... (Press Enter)"
        type="text"
      />
    </div>
    <select id="task-status-select" class="custom-input" style="width: 130px; padding: 12px; cursor: pointer;">
      <option value="PENDING">Pending</option>
      <option value="RUNNING">Running</option>
    </select>
  </div>
  <div class="task-list" id="task-list">
    ${defaultTasksHTML}
  </div>
</div>`,

  schedule: `
    <div class="bento-grid">
      <div class="left-column" style="grid-column: span 12 / span 12;">
        <div class="widget-card timeline-card">
          <div class="widget-header border-bottom">
            <h3 class="widget-title text-blue">Schedule</h3>
            <button class="action-icon-btn" id="add-event-btn" title="Add Event" style="background: rgba(59, 130, 246, 0.1); padding: 6px 12px; border-radius: 6px; color: #3b82f6; font-size: 12px; font-weight: 600; cursor: pointer; border: none;">+ Add Event</button>
          </div>
          
          <div id="event-form-container" style="display: none; margin-bottom: 16px; padding: 12px; background: rgba(0,0,0,0.02); border-radius: 8px; border: 1px solid var(--border-color);">
            <input type="text" id="event-title-input" class="custom-input" placeholder="Event Title (e.g. Team Meeting)" style="margin-bottom: 8px; font-size: 14px; padding: 8px 12px;" />
            
            <div style="display: flex; gap: 8px; margin-bottom: 8px;">
              <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                <label style="font-size: 10px; font-weight: 600; color: var(--text-secondary);">START TIME</label>
                <input type="time" id="event-start-time" class="custom-input" style="font-size: 14px; padding: 8px 12px; cursor: pointer;" />
              </div>
              <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                <label style="font-size: 10px; font-weight: 600; color: var(--text-secondary);">END TIME</label>
                <input type="time" id="event-end-time" class="custom-input" style="font-size: 14px; padding: 8px 12px; cursor: pointer;" />
              </div>
            </div>

            <input type="text" id="event-loc-input" class="custom-input" placeholder="Location / Subtitle (e.g. Room 402)" style="margin-bottom: 8px; font-size: 14px; padding: 8px 12px;" />
            <button id="save-event-btn" style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px;">Save Event</button>
          </div>

          <div class="timeline-container custom-scrollbar">
            <div class="time-indicator-line">
              <div class="time-indicator-dot"></div>
            </div>
            <div class="timeline-events" id="timeline-events-list">
              ${defaultEventsHTML}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  focus: `
    <div class="bento-grid">
      <div class="left-column" style="grid-column: span 12 / span 12;">
        <div class="widget-card text-center-box">
          <div class="widget-header-full">
            <h3 class="widget-title text-indigo sub-title-uppercase">
              Focus Timer
            </h3>
            <span class="material-symbols-outlined text-indigo-light text-sm">timer</span>
          </div>
          <div class="timer-circle-container">
            <svg class="timer-svg" viewBox="0 0 100 100">
              <circle class="timer-track" cx="50" cy="50" fill="none" r="45" stroke-width="6"></circle>
              <circle class="timer-progress" cx="50" cy="50" fill="none" r="45" stroke-dasharray="283"
                stroke-dashoffset="40" stroke-width="6"></circle>
            </svg>
            <div class="timer-inner-content">
              <span class="timer-countdown">25:00</span>
              <span class="timer-phase">Focus Phase</span>
            </div>
          </div>
          <div class="timer-btns">
            <button class="btn-primary-custom">Start Focus</button>
            <button aria-label="Reset Timer" class="btn-outline-custom">
              <span class="material-symbols-outlined">restart_alt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,

  goal: `
    <div class="bento-grid">
      <div class="left-column" style="grid-column: span 12 / span 12;">
        <div class="widget-card">
          <div class="widget-header">
            <h3 class="widget-title text-amber">Daily Goal</h3>
          </div>
          <div class="input-wrapper" style="display: flex; gap: 8px; margin-bottom: 20px;">
            <div style="position: relative; flex: 1;">
              <span class="material-symbols-outlined input-icon">add</span>
              <input
                class="custom-input"
                id="goal-input"
                placeholder="Add today's main objective... (Press Enter)"
                type="text"
              />
            </div>
          </div>
          <div class="task-list" id="goal-list">
            ${defaultGoalsHTML}
          </div>
        </div>
      </div>
    </div>
  `,

  motivation: `
    <div class="bento-grid">
      <div class="left-column" style="grid-column: span 12 / span 12;">
        <div class="quote-card" id="quote-card-box">
          <div class="quote-shape-1"></div>
          <div class="quote-shape-2"></div>
          <span class="material-symbols-outlined quote-icon">format_quote</span>
          <blockquote class="quote-text" id="quote-text">
            "Success is not final, failure is not fatal: it is the courage to continue that counts."
          </blockquote>
          <cite class="quote-author" id="quote-author">— WINSTON CHURCHILL</cite>
        </div>
      </div>
    </div>
  `,
};

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const pageName = link.getAttribute("data-page");

    if (pageContents[pageName] && contentArea) {
      contentArea.innerHTML = pageContents[pageName];
      updateTaskProgress();
      if (pageName === "motivation") {
        loadDailyMotivation();
      }
      loadDataFromLocalStorage();
    }

    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// ==========================================
// LOCAL STORAGE FUNCTIONS
// ==========================================
function saveDataToLocalStorage() {
  const taskList = document.querySelector("#task-list");
  const goalList = document.querySelector("#goal-list");
  const eventsList = document.querySelector("#timeline-events-list");

  if (taskList) {
    localStorage.setItem("aether_tasks", taskList.innerHTML);
  }
  if (goalList) {
    localStorage.setItem("aether_goals", goalList.innerHTML);
  }
  if (eventsList) {
    localStorage.setItem("aether_events", eventsList.innerHTML);
  }
}

function loadDataFromLocalStorage() {
  const taskList = document.querySelector("#task-list");
  const goalList = document.querySelector("#goal-list");
  const eventsList = document.querySelector("#timeline-events-list");

  if (taskList && localStorage.getItem("aether_tasks")) {
    taskList.innerHTML = localStorage.getItem("aether_tasks");
  }
  if (goalList && localStorage.getItem("aether_goals")) {
    goalList.innerHTML = localStorage.getItem("aether_goals");
  }
  if (eventsList && localStorage.getItem("aether_events")) {
    eventsList.innerHTML = localStorage.getItem("aether_events");
  }
  updateTaskProgress();
}

// ==========================================
// MOTIVATION QUOTES LOGIC
// ==========================================
const motivationQuotes = [
  {
    text: "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
    author: "Stephen Covey",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
  },
  {
    text: "Hardships often prepare an ordinary person for an extraordinary destiny.",
    author: "C.S. Lewis",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    text: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair",
  },
  {
    text: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe",
  },
];

function loadDailyMotivation() {
  const quoteText = document.querySelector("#quote-text");
  const quoteAuthor = document.querySelector("#quote-author");

  if (!quoteText || !quoteAuthor) return;

  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24),
  );
  const quoteIndex = dayOfYear % motivationQuotes.length;

  const selectedQuote = motivationQuotes[quoteIndex];
  quoteText.innerText = `"${selectedQuote.text}"`;
  quoteAuthor.innerText = `— ${selectedQuote.author.toUpperCase()}`;
}

// ==========================================
// WEATHER LOGIC
// ==========================================
const weatherBadge = document.querySelector("#weather-badge");
if (weatherBadge) {
  weatherBadge.addEventListener("click", () => {
    const weatherTextSpan = document.querySelector("#weather-text");
    const weatherIcon = weatherBadge.querySelector(
      ".material-symbols-outlined",
    );

    if (weatherTextSpan) weatherTextSpan.innerText = "Loading...";
    if (weatherIcon) weatherIcon.style.animation = "spin 1s linear infinite";

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
        if (weatherIcon) weatherIcon.style.animation = "none";
      });
    }
  });
}

function fetchWeather(lat, lon) {
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
      const tempC = Math.round(data.current_weather.temperature);
      const weatherTextSpan = document.querySelector("#weather-text");
      if (weatherTextSpan) weatherTextSpan.innerText = `${tempC}°C · Clear`;
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
    });
}

// ==========================================
// TIME LOGIC
// ==========================================
function updateRealTimeClock() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedTime = `${String(hours).padStart(2, "0")}:${minutes}:${seconds} ${ampm}`;

  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = now.toLocaleDateString("en-US", options);

  const timeElement = document.querySelector("#live-time");
  const dateElement = document.querySelector("#live-date");
  const headerDateElement = document.querySelector("#current-date");

  if (timeElement) timeElement.innerText = formattedTime;
  if (dateElement) dateElement.innerText = formattedDate;
  if (headerDateElement) headerDateElement.innerText = formattedDate;
}

setInterval(updateRealTimeClock, 1000);
updateRealTimeClock();

// ==========================================
// DYNAMIC TASK MANAGER LOGIC
// ==========================================
function updateTaskProgress() {
  const taskList = document.querySelector("#task-list");
  const progressBar = document.querySelector("#progress-bar");
  const taskCounter = document.querySelector("#task-counter");
  const pendingCountEl = document.querySelector("#pending-tasks-count");
  const runningCountEl = document.querySelector("#running-tasks-count");

  if (!taskList) return;

  const tasks = taskList.querySelectorAll(".task-item");
  const totalTasks = tasks.length;
  let completedTasks = 0;
  let pendingTasks = 0;
  let runningTasks = 0;

  tasks.forEach((task) => {
    const checkbox = task.querySelector(".custom-checkbox");
    const badge = task.querySelector(".status-badge");

    if (checkbox && checkbox.checked) {
      completedTasks++;
    } else if (badge) {
      const statusText = badge.innerText.trim();
      if (statusText === "PENDING") {
        pendingTasks++;
      } else if (statusText === "RUNNING") {
        runningTasks++;
      }
    }
  });

  const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  if (progressBar) progressBar.style.width = `${percentage}%`;
  if (taskCounter)
    taskCounter.innerText = `${completedTasks}/${totalTasks} Completed`;

  if (pendingCountEl) pendingCountEl.innerText = pendingTasks;
  if (runningCountEl) runningCountEl.innerText = runningTasks;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    // Task Input Add Logic
    const taskInput = document.querySelector("#task-input");
    if (document.activeElement === taskInput && taskInput.value.trim() !== "") {
      const taskText = taskInput.value.trim();
      const taskStatusSelect = document.querySelector("#task-status-select");
      const selectedStatus = taskStatusSelect
        ? taskStatusSelect.value
        : "PENDING";
      const taskList = document.querySelector("#task-list");

      let badgeClass = "bg-rose";
      if (selectedStatus === "RUNNING") {
        badgeClass = "bg-blue";
      }

      const newTaskHTML = `
        <div class="task-item group">
          <div class="task-left">
            <input class="custom-checkbox" type="checkbox" />
            <span class="task-text">${taskText}</span>
          </div>
          <div class="task-actions">
            <button class="action-icon-btn edit-btn" aria-label="Edit task">
              <span class="material-symbols-outlined text-18">edit</span>
            </button>
            <button class="action-icon-btn delete-btn" aria-label="Delete task">
              <span class="material-symbols-outlined text-18">delete</span>
            </button>
          </div>
          <span class="status-badge ${badgeClass}">${selectedStatus}</span>
        </div>
      `;

      if (taskList) {
        taskList.insertAdjacentHTML("afterbegin", newTaskHTML);
        taskInput.value = "";
        updateTaskProgress();
        saveDataToLocalStorage();
      }
    }

    // Daily Goal Input Add Logic
    const goalInput = document.querySelector("#goal-input");
    if (document.activeElement === goalInput && goalInput.value.trim() !== "") {
      const goalText = goalInput.value.trim();
      const goalList = document.querySelector("#goal-list");

      const newGoalHTML = `
        <div class="task-item group">
          <div class="task-left">
            <input class="custom-checkbox goal-checkbox" type="checkbox" />
            <span class="task-text">${goalText}</span>
          </div>
          <div class="task-actions">
            <button class="action-icon-btn delete-goal-btn" aria-label="Delete goal" style="color: #f43f5e; background: none; border: none; cursor: pointer;">
              <span class="material-symbols-outlined text-18">delete</span>
            </button>
          </div>
        </div>
      `;

      if (goalList) {
        goalList.insertAdjacentHTML("afterbegin", newGoalHTML);
        goalInput.value = "";
        saveDataToLocalStorage();
      }
    }
  }
});

// ==========================================
// FOCUS TIMER INTERACTIVITY LOGIC
// ==========================================
let focusInterval = null;
let totalSeconds = 25 * 60;
let isRunning = false;

document.addEventListener("click", (e) => {
  // Focus Timer Start / Pause Button
  const startBtn = e.target.closest(".btn-primary-custom");
  const resetBtn = e.target.closest(".btn-outline-custom");

  if (startBtn) {
    const timerDisplay = document.querySelector(".timer-countdown");
    const progressCircle = document.querySelector(".timer-progress");
    const circumference = 283;

    if (!isRunning) {
      isRunning = true;
      startBtn.innerText = "Pause Focus";

      focusInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          let minutes = Math.floor(totalSeconds / 60);
          let seconds = totalSeconds % 60;

          if (timerDisplay) {
            timerDisplay.innerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
          }

          if (progressCircle) {
            let offset =
              circumference - (totalSeconds / (25 * 60)) * circumference;
            progressCircle.style.strokeDashoffset = offset;
          }
        } else {
          clearInterval(focusInterval);
          isRunning = false;
          alert("Focus session completed!");
          startBtn.innerText = "Start Focus";
          totalSeconds = 25 * 60;
        }
      }, 1000);
    } else {
      clearInterval(focusInterval);
      isRunning = false;
      startBtn.innerText = "Resume Focus";
    }
  }

  // Focus Timer Reset Button
  if (resetBtn) {
    clearInterval(focusInterval);
    isRunning = false;
    totalSeconds = 25 * 60;

    const timerDisplay = document.querySelector(".timer-countdown");
    const startBtn = document.querySelector(".btn-primary-custom");
    const progressCircle = document.querySelector(".timer-progress");

    if (timerDisplay) timerDisplay.innerText = "25:00";
    if (startBtn) startBtn.innerText = "Start Focus";
    if (progressCircle) progressCircle.style.strokeDashoffset = "40";
  }

  // Task Delete & Edit
  if (e.target.closest(".delete-btn")) {
    const taskItem = e.target.closest(".task-item");
    if (taskItem) {
      taskItem.remove();
      updateTaskProgress();
      saveDataToLocalStorage();
    }
  }

  if (e.target.closest(".edit-btn")) {
    const taskItem = e.target.closest(".task-item");
    if (taskItem) {
      const taskTextSpan = taskItem.querySelector(".task-text");
      const currentText = taskTextSpan.innerText;
      const taskInput = document.querySelector("#task-input");

      if (taskInput) {
        taskInput.value = currentText;
        taskInput.focus();
        taskItem.remove();
        updateTaskProgress();
        saveDataToLocalStorage();
      }
    }
  }

  // Goal Delete Button
  if (e.target.closest(".delete-goal-btn")) {
    const goalItem = e.target.closest(".task-item");
    if (goalItem) {
      goalItem.remove();
      saveDataToLocalStorage();
    }
  }

  // Toggle Add Event Form
  if (e.target.closest("#add-event-btn")) {
    const formContainer = document.querySelector("#event-form-container");
    if (formContainer) {
      formContainer.style.display =
        formContainer.style.display === "none" ? "block" : "none";
    }
  }

  // Save New Event with Inbuilt Time Pickers
  if (e.target.closest("#save-event-btn")) {
    const titleInput = document.querySelector("#event-title-input");
    const startTimeInput = document.querySelector("#event-start-time");
    const endTimeInput = document.querySelector("#event-end-time");
    const locInput = document.querySelector("#event-loc-input");
    const eventsList = document.querySelector("#timeline-events-list");

    if (
      titleInput &&
      startTimeInput &&
      eventsList &&
      titleInput.value.trim() !== ""
    ) {
      const title = titleInput.value.trim();
      const location = locInput ? locInput.value.trim() : "";

      function formatAMPM(timeStr) {
        if (!timeStr) return "";
        let [hours, minutes] = timeStr.split(":");
        hours = parseInt(hours, 10);
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
      }

      const startTimeFormatted = formatAMPM(startTimeInput.value);
      const endTimeFormatted = formatAMPM(endTimeInput.value);

      let timeDisplay = "All Day";
      if (startTimeFormatted && endTimeFormatted) {
        timeDisplay = `${startTimeFormatted} - ${endTimeFormatted}`;
      } else if (startTimeFormatted) {
        timeDisplay = startTimeFormatted;
      }

      const newEventHTML = `
        <div class="timeline-item">
          <div class="timeline-bullet"></div>
          <div class="timeline-time">${timeDisplay}</div>
          <div class="timeline-content-box" style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h4 class="event-title">${title}</h4>
              ${location ? `<p class="event-subtitle">${location}</p>` : ""}
            </div>
            <button class="action-icon-btn delete-event-btn" style="color: #f43f5e; background: none; border: none; cursor: pointer;">
              <span class="material-symbols-outlined text-18">delete</span>
            </button>
          </div>
        </div>
      `;

      eventsList.insertAdjacentHTML("beforeend", newEventHTML);

      titleInput.value = "";
      startTimeInput.value = "";
      endTimeInput.value = "";
      if (locInput) locInput.value = "";
      const formContainer = document.querySelector("#event-form-container");
      if (formContainer) formContainer.style.display = "none";
      saveDataToLocalStorage();
    } else {
      alert("Please enter at least the Event Title and select a Start Time!");
    }
  }

  // Delete Event from Timeline
  if (e.target.closest(".delete-event-btn")) {
    const timelineItem = e.target.closest(".timeline-item");
    if (timelineItem) {
      timelineItem.remove();
      saveDataToLocalStorage();
    }
  }
});

document.addEventListener("change", (e) => {
  // Task Checkbox Logic
  if (
    e.target.classList.contains("custom-checkbox") &&
    !e.target.classList.contains("goal-checkbox")
  ) {
    const taskItem = e.target.closest(".task-item");
    if (taskItem) {
      const taskTextSpan = taskItem.querySelector(".task-text");
      const statusBadge = taskItem.querySelector(".status-badge");

      if (e.target.checked) {
        if (taskTextSpan) {
          taskTextSpan.style.textDecoration = "line-through";
          taskTextSpan.style.opacity = "0.7";
        }
        if (statusBadge) {
          statusBadge.className = "status-badge bg-emerald";
          statusBadge.innerText = "COMPLETE";
        }
      } else {
        if (taskTextSpan) {
          taskTextSpan.style.textDecoration = "none";
          taskTextSpan.style.opacity = "1";
        }
        if (statusBadge) {
          statusBadge.className = "status-badge bg-rose";
          statusBadge.innerText = "PENDING";
        }
      }
      updateTaskProgress();
      saveDataToLocalStorage();
    }
  }

  // Goal Checkbox Logic
  if (e.target.classList.contains("goal-checkbox")) {
    const goalItem = e.target.closest(".task-item");
    if (goalItem) {
      const goalTextSpan = goalItem.querySelector(".task-text");
      if (e.target.checked) {
        if (goalTextSpan) {
          goalTextSpan.style.textDecoration = "line-through";
          goalTextSpan.style.opacity = "0.7";
        }
      } else {
        if (goalTextSpan) {
          goalTextSpan.style.textDecoration = "none";
          goalTextSpan.style.opacity = "1";
        }
      }
      saveDataToLocalStorage();
    }
  }
});

updateTaskProgress();
loadDataFromLocalStorage();
