// stat updation
let allTransaction = JSON.parse(localStorage.getItem("transaction")) || [];
let currency = JSON.parse(localStorage.getItem("currency")) || "₹";

const profileForm = document.querySelector("#profile-form");
const currentBal = document.querySelector(".current-bal");
const income = document.querySelector(".income");
const expense = document.querySelector(".expense");
const count = document.querySelector(".transaction");
const transTable = document.querySelector(".table-data");
const canvas = document.querySelector("#myChart");

let cashFlowChart;

function updateStats() {
  let totalExpense = allTransaction
    .filter((elem) => elem.type === "expense")
    .reduce((total, curr) => total + curr.amount, 0);

  let totalIncome = allTransaction
    .filter((elem) => elem.type === "income")
    .reduce((total, curr) => total + curr.amount, 0);

  let currbal = totalIncome - totalExpense;

  currentBal.textContent = `${currency} ${currbal}`;
  income.textContent = `${currency} ${totalIncome}`;
  expense.textContent = `${currency} ${totalExpense}`;
  count.textContent = allTransaction.length;

  if (cashFlowChart) {
    cashFlowChart.destroy();
  }

  cashFlowChart = new Chart(canvas, {
    type: "bar",

    data: {
      labels: ["Cash Flow"],

      datasets: [
        {
          label: "Income",
          data: [totalIncome],
          backgroundColor: "#4ae176",
        },
        {
          label: "Expense",
          data: [totalExpense],
          backgroundColor: "#e34230",
        },
      ],
    },

    options: {
      responsive: true,

      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  renderTableUi(allTransaction);
}

updateStats();

function renderTableUi(array) {
  transTable.innerHTML = "";

  transTable.innerHTML = array
    .map((elem, idx) => {
      const date = elem.date.split("-").reverse().splice(0, 2).join("/");

      return ` <tr>
                  <td>${date}</td>
                  <td>${elem.description.length > 7 ? elem.description.split("").slice(0, 7).join("") + "..." : elem.description}</td>
                  <td>${elem.category.length > 11 ? elem.category.split("").slice(0, 12).join("") + "..." : elem.category}</td>
                  <td class="${elem.type}">${currency}${elem.amount}</td>
                  <td>
                    <button onclick={deleteTransaction(${idx})} class="delete">
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </td>
                </tr>     `;
    })
    .join("");
}

// theme logic

const themeToggle = document.querySelector(".toggle-theme input");
const deviceTheme = window.matchMedia("(prefers-color-scheme: dark)");
const theme = localStorage.getItem("theme") || "dark";

setTheme(theme);

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  themeToggle.checked = theme === "dark";
}

themeToggle.checked = document.documentElement.dataset.theme === "dark";

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
});

// login and signup logic

const signupPage = document.querySelector(".signup-page");
const loginPage = document.querySelector(".login-page");

const toSignup = document.querySelector("#to-signup-page");
const toLogin = document.querySelector("#to-login-page");
let registerUser = JSON.parse(localStorage.getItem("registerUser")) || [];
let currentUser = JSON.parse(localStorage.getItem("currUser")) || null;

if (!currentUser) {
  loginPage.style.display = "flex";
}

toSignup.addEventListener("click", (e) => {
  loginPage.style.display = "none";
  signupPage.style.display = "flex";
});

toLogin.addEventListener("click", (e) => {
  loginPage.style.display = "flex";
  signupPage.style.display = "none";
});

//form submission

const signupForm = document.querySelector("#signup-form");
const loginForm = document.querySelector("#login-form");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let username = signupForm[0].value.trim();
  let fullName = signupForm[1].value.trim();
  let password = signupForm[2].value.trim();

  if (!username || !fullName || !password) {
    alert("all field required");
    return;
  }

  const user = {
    username,
    fullName,
    password,
  };

  let isUserExist = null;
  isUserExist = registerUser.find((elem) => elem.username === username);

  if (isUserExist) {
    alert("this username already exisit");
    return;
  }

  registerUser.push(user);

  localStorage.setItem("registerUser", JSON.stringify(registerUser));

  console.log(registerUser);

  signupForm[0].value = "";
  signupForm[1].value = "";
  signupForm[2].value = "";

  loginPage.style.display = "flex";
  signupPage.style.display = "none";
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let username = loginForm[0].value.trim();
  let password = loginForm[1].value.trim();

  if (!username || !password) {
    alert("all field required");
    return;
  }

  let user = null;
  user = registerUser.find(
    (elem) => elem.username === username && elem.password === password,
  );

  if (!user) {
    alert(`invalid username and password`);
    return;
  }

  currentUser = user;
  localStorage.setItem("currUser", JSON.stringify(user));

  profileForm[0].value = currentUser.username;
  profileUpdate();
  loginForm.reset();
  loginPage.style.display = "none";
});

// toggle eye of password

const passwordGroups = document.querySelectorAll(".password-input");

passwordGroups.forEach((group) => {
  const passwordInput = group.querySelector("input");
  const eye = group.querySelector("i");

  eye.addEventListener("click", () => {
    const showPassword = passwordInput.type === "password";

    passwordInput.type = showPassword ? "text" : "password";

    eye.className = showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
  });
});

// add transaction

const transactionFormScreen = document.querySelector(".add-transaction-form");
const transactionForm = document.querySelector(".transaction-form");
const addTransactionBtn = document.querySelector("#add-transaction");
const cancelButton = transactionForm.querySelector(".cancel");

addTransactionBtn.addEventListener("click", () => {
  transactionFormScreen.style.display = "flex";
});

cancelButton.addEventListener("click", () => {
  transactionForm.reset();
  transactionFormScreen.style.display = "none";
});

transactionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const transaction = {
    type: transactionForm[0].value.trim(),
    description: transactionForm[1].value.trim(),
    amount: Number(transactionForm[2].value.trim()),
    date: transactionForm[3].value.trim(),
    category: transactionForm[4].value.trim(),
  };

  allTransaction.push(transaction);
  localStorage.setItem("transaction", JSON.stringify(allTransaction));
  transactionFormScreen.style.display = "none";
  transactionForm.reset();
  updateStats();
});

function deleteTransaction(idx) {
  allTransaction = allTransaction.filter((_, index) => index !== idx);
  localStorage.setItem("transaction", JSON.stringify(allTransaction));
  updateStats();
}

// filter transaction

const filterBtn = document.querySelectorAll(".filter .fil-btn");

filterBtn.forEach((button) => {
  button.addEventListener("click", () => {
    filterBtn.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    let filter = button.dataset.filter;

    if (filter === "all") {
      renderTableUi(allTransaction);
    } else {
      let arr = allTransaction.filter((elem) => elem.type === filter);
      renderTableUi(arr);
    }
  });
});

// nav activation

const navLinks = document.querySelector(".links");
const settingPage = document.querySelector(".profile-setting");

navLinks.addEventListener("click", (e) => {
  const clickedLink = e.target.closest("a");
  if (!clickedLink) return;

  navLinks.querySelectorAll("a").forEach((links) => {
    links.classList.remove("active");
  });
  clickedLink.classList.add("active");

  if (clickedLink.id === "setting") {
    settingPage.style.display = "flex";
  }
});

// profile setting

const hideProfile = document.querySelector("#profile-cancel");
hideProfile.addEventListener("click", () => {
  settingPage.style.display = "none";
  const link = navLinks.querySelectorAll("a");
  link.forEach((links) => {
    links.classList.remove("active");
  });
  link[0].classList.add("active");
});



profileForm[0].value = currentUser?.username || "";
profileForm[1].value = currency;

profileForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const olderUser = currentUser.username;

  currentUser.username = profileForm[0].value.trim();
  currency = profileForm[1].value;

  registerUser = registerUser.filter((elem) => elem.username !== olderUser);

  registerUser.push(currentUser);

  localStorage.setItem("registerUser", JSON.stringify(registerUser));
  localStorage.setItem("currency", JSON.stringify(currency));
  localStorage.setItem("currUser", JSON.stringify(currentUser));

  updateStats();
  profileUpdate();
});

const reset = document.querySelector(".clear-all");

reset.addEventListener("click", () => {
  allTransaction = [];
  currency = "₹";

  localStorage.removeItem("transaction");
  localStorage.removeItem("currency");

  updateStats();
});

// user-profile

const userProfileBtn = document.querySelector("#user-profile");
let showProfile = false;

const fullProfile = document.querySelector(".full-profile");

userProfileBtn.addEventListener("click", () => {
  fullProfile.style.display = showProfile ? "none" : "flex";
  showProfile = showProfile ? false : true;
});

const logout = document.querySelector("#logout");

logout.addEventListener("click", () => {
  currentUser = null;
  if (!currentUser) {
    loginPage.style.display = "flex";
  }
  localStorage.removeItem("currUser");
});

// username display

function profileUpdate() {
  const userName = document.querySelector(".user-name");

  userProfileBtn.textContent = currentUser?.username.charAt(0).toUpperCase();
  userName.textContent = currentUser?.username;
}

profileUpdate();
