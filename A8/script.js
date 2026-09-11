// stat updation
let allTransaction = JSON.parse(localStorage.getItem("transaction")) || [];

console.log(allTransaction);

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

  currentBal.textContent = `$ ${currbal}`;
  income.textContent = `$ ${totalIncome}`;
  expense.textContent = `$ ${totalExpense}`;
  count.textContent = allTransaction.length;

  console.log(totalExpense);

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

  rederTableUi(allTransaction);

}

updateStats();

function rederTableUi(array) {
  transTable.innerHTML = "";

  transTable.innerHTML = array
    .map((elem, idx) => {
      const date = elem.date.split("-").reverse().splice(0, 2).join("/");

      return ` <tr>
                  <td>${date}</td>
                  <td>${elem.description.length > 7 ? elem.description.split("").slice(0, 7).join("") + "..." : elem.description}</td>
                  <td>${elem.category.length > 11 ? elem.category.split("").slice(0, 12).join("") + "..." : elem.category}</td>
                  <td class="${elem.type}">$${elem.amount}</td>
                  <td>
                    <button onclick={deleteTransaction(${idx})} class="delete">
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </td>
                </tr>     `;
    })
    .join("");
}

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

const filterBtn = document.querySelectorAll('.filter .fil-btn');

filterBtn.forEach((button)=>{
  button.addEventListener('click',()=>{
    let filter = button.dataset.filter;

    if(filter === "all"){
      
    }

  })
})

console.dir(filterBtn);