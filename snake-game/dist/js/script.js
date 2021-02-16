const bestScore = document.getElementById("best-score");
const currentScore = document.getElementById("current-score");
const canvas = document.getElementById("game");

const ctx = canvas.getContext("2d");
const bg = new Image(400, 400);
bg.src = '../static/img/field.png';
const blockSize = 25;

let score = 0;
let speed = 150; // ms, for interval
let direction;

bestScore.textContent = `Your best score is ${localStorage.getItem("bestScore")}`;

const foodTypes = [];
for (let i = 1; i <= 3; i++){
  let foodImg = new Image(25, 25);
  foodImg.src = `../static/img/food${i}.png`;
  foodTypes.push(foodImg);
}

let food = {
  x: Math.floor((Math.random() * 16)),
  y: Math.floor((Math.random() * 16)),
  img: foodTypes[Math.floor(Math.random() * foodTypes.length)]
};

const snake = [];
snake[0] = {
  x: 8,
  y: 8
};

function generateFood(){
  let generatedFood = {
    x: Math.floor((Math.random() * 16)),
    y: Math.floor((Math.random() * 16)),
    img: foodTypes[Math.floor(Math.random() * foodTypes.length)]
  };
  console.log(generatedFood.x, generatedFood.y);
  if (emptySpaceCheck(generatedFood.x, generatedFood.y)) return generatedFood;
  else return generateFood();
}

function emptySpaceCheck(x, y){
  for(let i = 0; i < snake.length; i++){
    if(x == snake[i].x && y == snake[i].y) return false;
  }
  return true;
}


function move(){
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "left") {
    if(wallChecking(direction)){
      snakeX = 15;
    } else {
      snakeX -= 1;
    }
  }

  if (direction === "up") {
    if(wallChecking(direction)){
      snakeY = 15;
    } else {
      snakeY -= 1;
    }
  }

  if (direction === "right") {
    if(wallChecking(direction)){
      snakeX = 0;
    } else {
      snakeX += 1;
    }
  }

  if (direction === "down") {
    if(wallChecking(direction)){
      snakeY = 0;
    } else {
      snakeY += 1;
    }
  }

  snake.pop();

  let head = {
    x: snakeX,
    y: snakeY
  };

  snake.unshift(head);
}

function wallChecking(direction){
  switch (direction){
    case "left":
      if (snake[0].x === 0) return true;
      break;

    case "up":
      if (snake[0].y === 0) return true;
      break;

    case "right":
      if (snake[0].x === 15) return true;
      break;

    case "down":
      if (snake[0].y === 15) return true;
      break;
  }
}

function snakeGrow(){
  snake.push({});
}

function eat(){
  if (snake[0].x === food.x && snake[0].y === food.y){
    score += 1;
    food = generateFood();
    snakeGrow();
    updateScore();
  }
}

function updateScore(){
  currentScore.textContent = `Score: ${score}`;
}

function deathCheck() {
  for(let i = 1; i<=snake.length - 1; i++){
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y){
      gameOver();
    }
  }
}

function gameOver() {
  clearInterval(game);
  if(localStorage.getItem("bestScore") < score) {
    localStorage.setItem('bestScore', score);
  }
  
  ctx.fillStyle = "#8B0000";
	ctx.font = "48px Roboto";
	ctx.fillText("Game over", 4 * blockSize, 6 * blockSize);
	ctx.fillText(`Your score: ${score}`, 3 * blockSize, 10 * blockSize);
}

function drawGame() {
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(food.img, food.x * blockSize + 1, food.y * blockSize, blockSize - 3, blockSize - 3);

  for(let i = 0; i < snake.length; i++){
    ctx.fillStyle = "blue";
    ctx.fillRect(snake[i].x * blockSize, snake[i].y * blockSize, blockSize - 1, blockSize - 1);
  }
  move();
  eat();
  deathCheck();
}

document.addEventListener("keydown", e => {
  switch (e.key){
    case "ArrowLeft": 
      if (direction !== "right") direction = "left";
      break;
    case "ArrowUp":
      if (direction !== "down") direction = "up";
      break;
    case "ArrowRight":
      if (direction !== "left") direction = "right";
      break;
    case "ArrowDown":
      if (direction !== "up") direction = "down";
      break;
  } 
});

let game = setInterval(drawGame, speed);