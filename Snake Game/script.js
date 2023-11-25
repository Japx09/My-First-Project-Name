document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("snakeCanvas");
  const ctx = canvas.getContext("2d");

  const boxSize = 20;
  let snake = [{ x: 10, y: 10 }];
  let food = {};
  let direction = "right";
  let score = 0;
  let speed = 200; // Initial speed in milliseconds

  function init() {
    createFood();
    setTimeout(draw, speed);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    checkCollision();
    updateScore();
    moveSnake();
    setTimeout(draw, speed);
  }

  function drawSnake() {
    ctx.fillStyle = "green";
    snake.forEach(segment => {
      ctx.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
    });
  }

  function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);
  }

  function createFood() {
    food = {
      x: Math.floor(Math.random() * (canvas.width / boxSize)),
      y: Math.floor(Math.random() * (canvas.height / boxSize))
    };
  }

  function moveSnake() {
    let newHead = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
      case "up": newHead.y--; break;
      case "down": newHead.y++; break;
      case "left": newHead.x--; break;
      case "right": newHead.x++; break;
    }
    snake.unshift(newHead);

    // Check for collision with food
    if (newHead.x === food.x && newHead.y === food.y) {
      score++;
      createFood();
      increaseSpeed();
    } else {
      snake.pop();
    }
  }

  function checkCollision() {
    const head = snake[0];
    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= canvas.width / boxSize ||
      head.y >= canvas.height / boxSize ||
      isCollidingWithItself()
    ) {
      gameOver();
    }
  }

  function isCollidingWithItself() {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }
    return false;
  }

  function updateScore() {
    document.getElementById("score").textContent = `Score: ${score}`;
  }

  function gameOver() {
    alert(`Game Over! Your score is ${score}.`);
    snake = [{ x: 10, y: 10 }];
    direction = "right";
    score = 0;
    speed = 200;
    createFood();
  }

  function increaseSpeed() {
    // Increase speed as score goes up
    if (score % 5 === 0 && speed > 50) {
      speed -= 10;
    }
  }

  document.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "w": direction = "up"; break;
      case "s": direction = "down"; break;
      case "a": direction = "left"; break;
      case "d": direction = "right"; break;
    }
  });

  init();
});
