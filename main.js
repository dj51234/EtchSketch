const $board = document.querySelector("#board");
const $screen = $board.getContext("2d");
const $clearBtn = document.querySelector(".clear");
const $startBtn = document.querySelector(".start");
const $wrapper = document.querySelector("#wrapper");

// grab height and width of board //
const { width, height } = $board;

// calculate random starting point //
let positionWidth = Math.floor(Math.random() * (width - 50));
let positionHeight = Math.floor(Math.random() * (height - 50));
let hslValue = 0;

function init(canvas) {
  canvas.lineWidth = 15;
  canvas.lineJoin = "square";
  canvas.lineCap = "square";
  canvas.beginPath();
  canvas.moveTo(positionWidth, positionHeight);
  canvas.lineTo(positionWidth, positionHeight);
  canvas.strokeStyle = `hsl(${hslValue}, 100%, 50%)`;
  canvas.stroke();
}

function draw(keyPressed) {
  hslValue += 30;
  $screen.strokeStyle = `hsl(${hslValue}, 100%, 50%)`;
  $screen.beginPath();
  $screen.moveTo(positionWidth, positionHeight);
  if (keyPressed == "ArrowUp") {
    positionHeight -= 15;
  } else if (keyPressed == "ArrowDown") {
    positionHeight += 15;
  } else if (keyPressed == "ArrowRight") {
    positionWidth += 15;
  } else if (keyPressed == "ArrowLeft") {
    positionWidth -= 15;
  }
  $screen.lineTo(positionWidth, positionHeight);
  $screen.stroke();
}

function whenArrowKeyPressed(event) {
  if (event.key.includes("Arrow")) {
    event.preventDefault();
  }
  draw(event.key);
}

function clearScreen() {
  $wrapper.classList.add("shake");
  $screen.clearRect(0, 0, width, height);
  init($screen);
  $wrapper.addEventListener("animationend", () => {
    $wrapper.classList.remove("shake");
  });
}

window.addEventListener("keydown", whenArrowKeyPressed);
$startBtn.addEventListener("click", function () {
  init($screen);
});
$clearBtn.addEventListener("click", clearScreen);
