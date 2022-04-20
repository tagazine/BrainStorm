// Creating canvases

const canvas = document.getElementById("canvas1");
const canctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvas2 = document.getElementById("canvas2");
const canctx2 = canvas2.getContext("2d");
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

const canvas3 = document.getElementById("canvas3");
const canctx3 = canvas3.getContext("2d");
canvas3.width = window.innerWidth;
canvas3.height = window.innerHeight;

// Global Variables
const brain = document.getElementById("brain");
const badBrain = document.getElementById("badBrain");
const cloud = document.getElementById("cloud");
const obsessoImage = document.getElementById("obsesso");
const logician = document.getElementById("logician");
const mouse = {
  x: null,
  y: null,
};

var coin = 0;
var coords = [];
var points = [];

var brainHeight = document.getElementById("brain").height;
var brainWidth = document.getElementById("brain").width;
var badBrainHeight = document.getElementById("badBrain").height;
var badBrainWidth = document.getElementById("badBrain").width;
var obsessoHeight = document.getElementById("obsesso").height;
var obsessoWidth = document.getElementById("obsesso").width;
var logicianHeight = document.getElementById("logician").height;
var logicianWidth = document.getElementById("logician").width;

var brainLocX = 0.5 * canvas.width - 0.5 * brainWidth;
var brainLocY = 0.5 * canvas.height - 0.5 * brainHeight;
var badBrainLocX = 0.5 * canvas.width - 0.5 * badBrainWidth;
var badBrainLocY = 0.5 * canvas.height - 0.5 * badBrainHeight;

// enemies
class Enemy {
  constructor(name, value, offense, defense, speed) {
    this.name = name;
    this.value = value;
    this.offense = offense;
    this.defense = defense;
    this.speed = speed;
  }
}
var obsesso = new Enemy("Obsess-O", 5, 2, 2, 1);

// Functions
class Sound {
  constructor(src) {
    this.Sound = document.createElement("audio");
    this.Sound.src = src;
    this.Sound.setAttribute("preload", "auto");
    this.Sound.setAttribute("controls", "none");
    this.Sound.style.display = "none";
    document.body.appendChild(this.Sound);
    this.play = function () {
      this.Sound.play();
    };
    this.stop = function () {
      this.Sound.pause();
    };
  }
}
function drawBrain() {
  setTimeout(() => {
    canctx.drawImage(badBrain, badBrainLocX, badBrainLocY);
  }, 2500);
}

function brainMaker() {
  var brainLocX = 0.5 * canvas.width - 0.5 * brainWidth;
  var brainLocY = 0.5 * canvas.height - 0.5 * brainHeight;
  var badBrainLocX = 0.5 * canvas.width - 0.5 * badBrainWidth;
  var badBrainLocY = 0.5 * canvas.height - 0.5 * badBrainHeight;
  canctx.drawImage(brain, brainLocX, brainLocY);
  document.addEventListener("click", drawBrain);
}

function idyllMaker() {
  // Earth
  var earth = canctx2.createLinearGradient(0, 0, 800, canvas.height);
  earth.addColorStop(0, "greenyellow");
  earth.addColorStop(1, "darkgreen");
  canctx.fillStyle = earth;
  canctx.fillRect(0, (1 / 2) * canvas.height, canvas.width, canvas.height);

  // Sky
  var sky = canctx.createLinearGradient(0, 0, 100, canvas.height);
  sky.addColorStop(0, "navy");
  sky.addColorStop(1, "skyblue");
  canctx.fillStyle = sky;
  canctx.fillRect(0, 0, canvas.width, (1 / 2) * canvas.height);

  // Sun
  var sun = canctx2.createRadialGradient(
    canvas.width,
    0,
    10,
    canvas.width,
    20,
    250
  );
  sun.addColorStop(0, "orange");
  sun.addColorStop(1, "yellow");
  canctx2.arc(canvas.width, 0, 250, 0, 2 * Math.PI);
  canctx2.fillStyle = sun;
  canctx2.fill();
}

// Clouds
function cloudMaker() {
  for (let x = -350; x < canvas.width; x += 120) {
    for (let y = -350; y < canvas.height; y += 120) {
      setTimeout(() => {
        canctx.drawImage(cloud, x, y);
        canctx2.clearRect(0, 0, canvas.height, canvas.width);
      }, 1000);
    }
  }
  document.removeEventListener("click", levelUp);
  document.removeEventListener("click", drawBrain);
}

// Get points on a line
function allPoints(i) {
  let distance = Math.sqrt(
    (coords[i - 1][1] - coords[i][1]) ** 2 +
      (coords[i - 1][0] - coords[i][0]) ** 2
  );
  let rate = (1 / distance) * 0.01;
  for (let progress = 0; progress <= 1; progress += rate) {
    x = coords[i - 1][0] + (coords[i][0] - coords[i - 1][0]) * progress;
    y = coords[i - 1][1] + (coords[i][1] - coords[i - 1][1]) * progress;
    points.push([x, y]);
  }
}

// Random paths for baddies
function boltMaker() {
  let xRan = Math.random() * canvas.width;
  let yRan = Math.random() * canvas.height;
  let sideRan = Math.floor(Math.random() * 4);
  let turnRan = Math.floor(Math.random() * 4 + 3);

  canctx.lineWidth = 45;

  canctx.strokeStyle = `rgb(255,255,240`;

  setTimeout(() => {
    if (sideRan === 0) {
      coords.push([-110, yRan]);
    } else if (sideRan === 1) {
      coords.push([xRan, -110]);
    } else if (sideRan === 2) {
      coords.push([canvas.width + 110, yRan]);
    } else if (sideRan === 3) {
      coords.push([xRan, canvas.height + 110]);
    }

    canctx.moveTo(coords[0][0], coords[0][1]);
    xRan = Math.random() * canvas.width;
    yRan = Math.random() * canvas.height;
    coords.push([xRan, yRan]);
    allPoints(1);

    canctx.lineTo(coords[1][0], coords[1][1]);
    for (let i = 2; i < turnRan; i++) {
      if (
        coords[i - 1][0] < 0.5 * canvas.width &&
        coords[i - 1][1] < 0.5 * canvas.height
      ) {
        xRan = Math.random() * (canvas.width * 0.5);
        yRan = Math.random() * (canvas.height * 0.5);
        coords.push([xRan, yRan]);

        canctx.lineTo(coords[i][0], coords[i][1]);
      } else if (
        coords[i - 1][0] < 0.5 * canvas.width &&
        coords[i - 1][1] > 0.5 * canvas.height
      ) {
        xRan = Math.random() * (canvas.width * 0.5);
        yRan = Math.random() * (0.5 / canvas.height);
        coords.push([xRan, yRan]);

        canctx.lineTo(coords[i][0], coords[i][1]);
      } else if (
        coords[i - 1][0] > 0.5 * canvas.width &&
        coords[i - 1][1] > 0.5 * canvas.height
      ) {
        xRan = Math.random() * (0.5 / canvas.width);
        yRan = Math.random() * (0.5 / canvas.height);
        coords.push([xRan, yRan]);

        canctx.lineTo(coords[i][0], coords[i][1]);
      } else if (
        coords[i - 1][0] > 0.5 * canvas.width &&
        coords[i - 1][1] < 0.5 * canvas.height
      ) {
        xRan = Math.random() * (0.5 / canvas.width);
        yRan = Math.random() * (canvas.height * 0.5);
        coords.push([xRan, yRan]);

        canctx.lineTo(coords[i][0], coords[i][1]);
      }
      allPoints(i);
    }

    coords.push([0.5 * canvas.width, 0.5 * canvas.height]);

    canctx.lineTo(0.5 * canvas.width, 0.5 * canvas.height);
    canctx.stroke();
    allPoints(coords.length - 1);
    var strike = new Sound("assets/strike.wav");
    strike.play();
  }, 2450);

  // return coords;
}

function makeEnemies() {
  var sunny = new Sound(`assets/storm.mp3`);
  sunny.play();
  setTimeout(() => {
    points.forEach((point) => {
      setTimeout(() => {
        canctx2.clearRect(0, 0, canvas.width, canvas.height);
        canctx2.drawImage(
          obsessoImage,
          point[0] - 0.5 * obsessoWidth,
          point[1] - 0.5 * obsessoHeight
        );
      }, 1);
    });
  }, 3000);
}

// Title and transition page text
function transitionText() {
  canctx.font = "100px Cursive";
  canctx.fillStyle = "black";
  canctx.textAlign = "center";
  canctx.fillText("Brain Storm", canvas.width / 2, canvas.height / 5);
  canctx.font = "17px Times New Roman";
  canctx.fillText(
    "(Click Anywhere to Start)",
    canvas.width / 2,
    canvas.height / 1.2
  );
}

// Title and transition screen
function transitionScreen() {
  idyllMaker();
  brainMaker();
  transitionText();
}

// Creating next level
function levelUp() {
  cloudMaker();
  boltMaker();
  makeEnemies();
  document.addEventListener("mousemove", towerMaker);
}

// Placing Tower
function towerMaker(event) {
  mouse.x = event.x;
  mouse.y = event.y;
  canctx3.clearRect(0, 0, canvas.width, canvas.height);
  canctx3.drawImage(
    logician,
    mouse.x - logicianWidth * 0.5,
    mouse.y - logicianHeight * 0.5
  );
  coin = 500;
  if (coin >= 100) {
    towerPlacer();
    coin = coin - 100;
    document.addEventListener("mousemove", towerMaker);
    towerPlacer();
  }
}
function towerPlacer() {
  document.addEventListener("click", function () {
    canctx3.drawImage(
      logician,
      mouse.x - logicianWidth * 0.5,
      mouse.y - logicianHeight * 0.5
    );
    document.removeEventListener("mousemove", towerMaker);
  });
}

// Resize title screen
function resize() {
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;
    canvas3.width = window.innerWidth;
    canvas3.height = window.innerHeight;
    transitionScreen();
  });
  window.removeEventListener("resize", resize);
}
// Engine
transitionScreen();

resize();
document.addEventListener("click", levelUp);

// game board const menu / const stats / info bar

// projectiles

// towers
// Dopa-mines
// Posi-titans
// Logicians (shoot bullets)
// Hero: BFF (can be placed on any path until death, timed refresh)

// consider: speed, strength, special powers, cost

// Obsess-O's

// Depressers (slow down towers)
// Anxie-T's (fly)
// X's (mean dialogue, super strong)
// Moodies (replicating beers)
// Bosses (actual bosses - mean dialogue)

// consider: speed, strength, special powers, value

// resources

// utilities
