const cvs = document.querySelector('#canvas');
const ctx = cvs.getContext('2d');
const btn = document.querySelector('.play-btn');
const scoreText = document.querySelector('.lost-text');
const lost = document.querySelector('.lost');


const ground = new Image();
ground.src = "./img/ground.png";

const food = new Image();
food.src = "./img/food.png";

const box = 32;
let score = 0;

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
}
let foodItem = {
  x: (Math.ceil(Math.random() * 16) + 1) * box,
  y: (Math.ceil(Math.random() * 14) + 3) * box
}
let dir;


const direction = (event) => {
  //урпавление
  if ((event.keyCode == 65) && dir != 'right') {
    dir = 'left';
  }
  else if ((event.keyCode == 87) && dir != 'down') {
    dir = 'up';
  }
  else if ((event.keyCode == 68) && dir != 'left') {
    dir = 'right';
  }
  else if ((event.keyCode == 83) && dir != 'up') {
    dir = 'down';
  }
}

document.addEventListener('keydown', direction);

//проверка на то, чтоб змейка не заходила на саму себя
const eatTail = (head, arr) => {
  for (let i in arr) {
    (head.x == arr[i].x && head.y == arr[i].y) ? clearInterval(game) : true
  }

}

const draw = () => {

  ctx.drawImage(ground, 0, 0);
  //увеличиваем змейку
  for (let i in snake) {
    ctx.fillStyle = (i == 0) ? 'black' : 'green';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }


  ctx.drawImage(food, foodItem.x, foodItem.y);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //змейка сьела еду
  if (snakeX === foodItem.x && snakeY === foodItem.y) {
    score++;
    foodItem = {
      x: (Math.ceil(Math.random() * 16) + 1) * box,
      y: (Math.ceil(Math.random() * 14) + 3) * box
    }
  }
  else {
    snake.pop()
  }
  //проигрыш при выходе за поле
  if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box) {
    clearInterval(game)
    scoreText.innerHTML = `Ваш счет: ${score}`;
    lost.classList.add('lost-block');

  }

  //передвижение змейки
  if (dir === 'left') snakeX -= box;
  else if (dir === 'right') snakeX += box;
  else if (dir === 'up') snakeY -= box;
  else if (dir === 'down') snakeY += box;


  let newHead = {
    x: snakeX,
    y: snakeY
  }

  eatTail(newHead, snake);
  snake.unshift(newHead);
  //счет
  ctx.fillStyle = "white";
  ctx.font = "45px Changa one";
  ctx.fillText(score, 2 * box, 1.6 * box);
}

let game = setInterval(draw, 100);

btn.onclick = () => {
  location.reload();
}