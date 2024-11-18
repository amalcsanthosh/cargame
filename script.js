const gameArea = document.querySelector(".game-area");
const road = document.querySelector(".road");
const playerCar = document.querySelector(".player-car");
const enemyCar = document.querySelector(".enemy-car");
const startButton = document.getElementById("start-game");
const restartButton = document.getElementById("restart-game");

let roadWidth = gameArea.offsetWidth;
let isGameRunning = false;
let playerSpeed = 7;
let enemySpeed = 6;
let gameLoopInterval;
document.addEventListener("keydown", (e) => {
  if (!isGameRunning) return;
  const carLeft = playerCar.offsetLeft;
  if (e.key === "ArrowLeft" && carLeft > 20) {
    playerCar.style.left = carLeft - 15 + "px";
  } else if (e.key === "ArrowRight" && carLeft < roadWidth - 70) {
    playerCar.style.left = carLeft + 15 + "px";
  }
});
function moveEnemyCar() {
  const enemyTop = enemyCar.offsetTop;
  const playerTop = playerCar.offsetTop;
  const playerLeft = playerCar.offsetLeft;
  const enemyLeft = enemyCar.offsetLeft;

  if (enemyTop > gameArea.offsetHeight) {
    enemyCar.style.top = "-150px";
    enemyCar.style.left = Math.random() * (roadWidth - 50) + "px";
  } else {
    enemyCar.style.top = enemyTop + enemySpeed + "px";
  }
  if (
    enemyTop + 100 >= playerTop &&
    enemyTop <= playerTop + 100 &&
    enemyLeft + 50 >= playerLeft &&
    enemyLeft <= playerLeft + 50
  ) {
    endGame();
    alert("Game Over!");
  }
}
function gameLoop() {
  moveEnemyCar();
}
function startGame() {
  isGameRunning = true;
  startButton.disabled = true;
  restartButton.disabled = false;
  gameLoopInterval = setInterval(gameLoop, 30);
}
function endGame() {
  isGameRunning = false;
  clearInterval(gameLoopInterval);
  restartButton.disabled = false;
}
function restartGame() {
  isGameRunning = false;
  clearInterval(gameLoopInterval);
  enemyCar.style.top = "-150px";
  playerCar.style.left = "calc(50% - 25px)";
  startGame();
}
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);
