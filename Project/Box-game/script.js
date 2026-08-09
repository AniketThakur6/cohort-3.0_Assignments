const startBtn = document.querySelector(".start");
const box = document.createElement("div");
const main = document.querySelector("main");
const timer = document.querySelector(".timer");
const scoree = document.querySelector(".score");
const overlay = document.querySelector(".overlay");
let clock;
let overTime;
box.classList.add("box");

let time = 0;
let score = 0;
let gameStarted = false;
// let clicked = false;
// timer.textContent = " helo";
timer.textContent = "0";
scoree.textContent = "0";

const randomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r},${g},${b})`;
};

const randomBox = () => {
  // clicked = false;
   box.dataset.clicked = "false";
  box.style.backgroundColor = randomColor();
  main.append(box);

  let mainH = main.clientHeight - box.offsetHeight;
  let mainW = main.clientWidth - box.offsetWidth;

  const rX = Math.random() * mainW;
  const rY = Math.random() * mainH;

  box.style.top = `${rY}px`;
  box.style.left = `${rX}px`;
};

// const overScreen = () => {
//   setTimeout(() => {
//     overlay.style.display = "none";
//   }, 3000);
// };

randomBox();

startBtn.addEventListener("click", () => {
  clearInterval(clock);
  clearTimeout(overTime);
  gameStarted = true;

  time = 0;

  clock = setInterval(() => {
    time += 1;
    timer.textContent = time;
    randomBox();
  }, 1000);

  overTime = setTimeout(() => {
    overlay.style.display = "flex";
    time = 0;
    score = 0;
    timer.textContent = time;
    gameStarted = false;
    clearInterval(clock);
  }, 10000);
});

overlay.addEventListener("click", () => {
  overlay.style.display = "none";
});

box.addEventListener("click", () => {
  // if (!gameStarted) return
  
  if( box.dataset.clicked === "false"){  
    score++;
    scoree.textContent = score;
    box.dataset.clicked = "true";
    // clicked = true;
  }
  
});
