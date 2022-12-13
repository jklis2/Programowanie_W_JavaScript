let numBalls = document.querySelector("#numBalls");
let numBallsvalue 

function GetDist(){
  return Number(document.getElementById("dist").value);
}

let balls = [];

let startBtn = document.getElementById("startBtn");
let resetBtn = document.getElementById("resetBtn");

const createCanvas = document.createElement ("canvas")
createCanvas.classList.add("canvas")

createCanvas.setAttribute("width", `${window.innerWidth * 0.97}`)
createCanvas.setAttribute("height", "600")

const body =  document.querySelector("body")
body.appendChild(createCanvas)
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
startBtn.addEventListener("click", start);
resetBtn.addEventListener("click", reset);

function start() {
  numBallsvalue = numBalls.value
  if (balls.length === 0) {
    for (let i = 0; i < numBallsvalue; i++) {
      let radius = random(10, 20)
      balls.push(
        new Ball(random(radius, canvas.width-radius), random(radius, canvas.height-radius), radius)
      );
    }
  }
  animate();
}

function reset() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls = [];
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < numBallsvalue; i++) {
    for (let j = 0; j < numBallsvalue; j++) {
      if (i !== j && distance(balls[i], balls[j]) < GetDist()) {
        connect(balls[i], balls[j]);
      }
    }
    balls[i].move();
    balls[i].draw();
  }
  requestAnimationFrame(animate);
}

function Ball(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.vx = Math.random() * 3 - 1.5;
  this.vy = Math.random() * 3 - 1.5;
  
  this.color = randomColor();
  
  this.draw = function () {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fill();
  };
  this.move = function () {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.vx = -this.vx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.vy = -this.vy;
    }
  };
}

function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return "#" + r.toString(16) + g.toString(16) + b.toString(16);
}

function random(min, max) {

  return Math.floor(Math.random() * (max - min + 1)) + min;

}

function distance(b1, b2) {
  let xDist = b1.x - b2.x;
  let yDist = b1.y - b2.y;
  return Math.sqrt(xDist * xDist + yDist * yDist);
}

function connect(b1, b2) {
  ctx.beginPath();
  ctx.strokeStyle = "#000";
  ctx.moveTo(b1.x, b1.y);
  ctx.lineTo(b2.x, b2.y);
  ctx.stroke();
}