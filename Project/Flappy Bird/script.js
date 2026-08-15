const bird = document.querySelector(".bird");
const gameWindow = document.querySelector("#game-window");

const score = document.querySelector(".score");
const highScore = document.querySelector(".high-score");
const gameOverDiv = document.querySelector(".game-over");
const gameStateName = document.querySelector(".game-state");
const startText = document.querySelector(".start-text");

let highScoreCount = Number(localStorage.getItem("high-score")) || 0;
highScore.textContent = `${highScoreCount}`;
let scoreCount = 0;
score.textContent = `${scoreCount}`;

const pipeAnimations = new Set();
let birdAnimation;
let pipeAppear;
let gameOverBool = false;
let gameRunning = false;

startText.textContent = `start game`;

function playGame() {
  function play(event) {
    if (event.code === "Space") {
      document.removeEventListener("keydown", play);
      gameOverDiv.style.display = "none";
      startGame();
      return;
    }
    return;
  }

  document.addEventListener("keydown", play);
}

if (!gameRunning) {
  playGame();
  gameRunning = true;
}

function startGame() {
  if (!gameRunning) return;

  //clear old pipe in ui
  document.querySelectorAll(".pipe").forEach((pipe) => pipe.remove());

  let y = 0;
  let velocity = 100;
  const gravity = 400;
  const jumpStrength = -220;

  let lastTime = 0;

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      velocity = jumpStrength;
    }
  });

  // bird moving logic
  function birdMove(currentTime) {
    if (gameOverBool) return;

    const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.05);
    lastTime = currentTime;

    velocity += gravity * deltaTime;
    y += velocity * deltaTime;

    bird.style.transform = `translateY(${y}px)`;

    birdAnimation = requestAnimationFrame(birdMove);
  }

  let pipevelocity = 200;

  function pipeDraw() {
    if (gameOverBool) return;

    const pipeUp = document.createElement("div");
    const pipeDown = document.createElement("div");

    const pipeImg = document.createElement("img");
    const pipeImg1 = document.createElement("img");

    pipeImg.classList.add("pipe-img");
    pipeImg.setAttribute("src", "pipe.png");

    pipeImg1.classList.add("pipe-img");
    pipeImg1.setAttribute("src", "pipe.png");

    pipeUp.classList.add("pipe", "up");

    pipeDown.classList.add("pipe", "down");

    pipeDown.append(pipeImg);
    pipeUp.append(pipeImg1);

    // pipeHeight logic
    const gameH = gameWindow.clientHeight - 160 - 100;

    const pipeUpHeight = Math.floor((gameH - 50) * Math.random() + 50);

    const pipeDownHeight = gameH - pipeUpHeight + 50;

    // console.log(pipeUpHeight, pipeDownHeight)

    pipeUp.style.height = `${pipeUpHeight}px`;
    pipeDown.style.height = `${pipeDownHeight}px`;

    let x = 0;
    let move;
    let pipeLastTime = 0;

    gameWindow.append(pipeUp, pipeDown);

    let scoreBool = false;

    // pipe moving logic
    const pipeMove = (currentTime) => {
      if (gameOverBool) return;

      if (!pipeLastTime) pipeLastTime = currentTime;

      const deltaTime = Math.min((currentTime - pipeLastTime) / 1000, 0.05);

      pipeLastTime = currentTime;

      x -= pipevelocity * deltaTime;

      pipeDown.style.transform = `translateX(${x}px)`;
      pipeUp.style.transform = `translateX(${-x}px)`;

      const CBPipeUp = pipeUp.getBoundingClientRect();
      const CBPipeDown = pipeDown.getBoundingClientRect();
      const CBBird = bird.getBoundingClientRect();
      const gameWin = gameWindow.getBoundingClientRect();

      // collision logic cb is collision box and game over logic
      if (
        CBPipeUp.left < CBBird.right &&
        CBPipeUp.right > CBBird.left &&
        (CBBird.top < CBPipeUp.bottom || CBBird.bottom > CBPipeDown.top)
      ) {
        gameOverBool = true;
        gameRunning = false;
        gameOver();
      }

      //if get out of game window
      if (
        CBBird.top < (gameWin.top - 10) ||
        CBBird.bottom > (gameWin.bottom + 10)
      ) {
        gameOverBool = true;
        gameRunning = false;
        gameOver();
      }

      // score logic
      if (CBPipeUp.right < CBBird.left && !scoreBool) {
        scoreCount += 10;
        scoreBool = true;
        if (scoreCount > highScoreCount) {
          highScore.textContent = scoreCount;
          localStorage.setItem("high-score", scoreCount);
        }
        score.textContent = scoreCount;
      }

      // pipe remove logic
      if (CBPipeUp.right < gameWin.left) {
        cancelAnimationFrame(move);
        cancelAnimationFrame(move1);
        pipeDown.remove();
        pipeUp.remove();
        return;
      }
      move = requestAnimationFrame(pipeMove);
      pipeAnimations.add(move);
      return;
    };

    move1 = requestAnimationFrame(pipeMove);
    pipeAnimations.add(move1);
    return;
  }

  pipeAppear = setInterval(pipeDraw, 2000);

  requestAnimationFrame(birdMove);
}

function gameOver() {
  if (!gameOverBool) return;
  gameOverDiv.style.display = "flex";
  startText.textContent = `game over`;
  gameStateName.textContent = `Restart game`;
  //clear pipecreation
  clearInterval(pipeAppear);
  //bird move
  cancelAnimationFrame(birdAnimation);

  //clear animation forach pipe
  pipeAnimations.forEach((id) => {
    cancelAnimationFrame(id);
  });
  pipeAnimations.clear();

  setTimeout(() => {
    gameOverBool = false;
  }, 100);

  if (!gameRunning) {
    playGame();
    gameRunning = true;
  }
}
