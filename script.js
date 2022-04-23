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

const canvas4 = document.getElementById("canvas4");
const canctx4 = canvas4.getContext("2d");
canvas4.width = window.innerWidth;
canvas4.height = window.innerHeight;

// Global Variables
const brain = document.getElementById("brain");
const badBrain = document.getElementById("badBrain");
const cloud = document.getElementById("cloud");
const obsessoImage = document.getElementById("obsesso");
const logician = document.getElementById("logician");
const house = document.getElementById("house");
const playground = document.getElementById("playground");
const forest = document.getElementById("forest");
const pup = document.getElementById("pup");

var mouse = {
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
var houseHeight = document.getElementById("house").height;
var houseWidth = document.getElementById("house").width;
var logicianHeight = document.getElementById("logician").height;
var logicianWidth = document.getElementById("logician").width;
var playHeight = document.getElementById("playground").height;
var playWidth = document.getElementById("playground").width;
var forestHeight = document.getElementById("forest").height;
var forestWidth = document.getElementById("forest").width;
var pupHeight = document.getElementById("pup").height;
var pupWidth = document.getElementById("pup").width;

var brainLocX = 0.5 * canvas.width - 0.5 * brainWidth;
var brainLocY = 0.5 * canvas.height - 0.5 * brainHeight;
var badBrainLocX = 0.5 * canvas.width - 0.5 * badBrainWidth;
var badBrainLocY = 0.5 * canvas.height - 0.5 * badBrainHeight;

// Class Constructors (More Coming Soon)
class Enemy {
  constructor(name, value, speed) {
    this.name = name;
    this.value = value;
    this.speed = speed;
  }
  draw(point) {
    canctx2.clearRect(0, 0, canvas.width, canvas.height);
    canctx4.clearRect(0, 0, canvas.width, canvas.height);
    canctx2.beginPath();
    canctx2.arc(point[0], point[1], 10, 0, 360);
    canctx2.stroke();
    canctx2.closePath();
  }
}

// MORE ENEMIES COMING
const obsesso = new Enemy("Obsess-O", 300, 2);

// TOWER CONSTRUCTOR COMING

class Sound {
  // NEED TO STOP SOUNDS
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

// Functions
// Making and Drawing the Two Brains
function drawBrain() {
  var badBrainLocX = 0.5 * canvas.width - 0.5 * badBrainWidth;
  var badBrainLocY = 0.5 * canvas.height - 0.5 * badBrainHeight;
  setTimeout(() => {
    canctx.drawImage(badBrain, badBrainLocX, badBrainLocY);
  }, 2500);
}

function brainMaker() {
  var brainLocX = 0.5 * canvas.width - 0.5 * brainWidth;
  var brainLocY = 0.5 * canvas.height - 0.5 * brainHeight;
  canctx.drawImage(brain, brainLocX, brainLocY);
  document.addEventListener("click", drawBrain);
  if (obsesso.value <= 0) {
    canctx4.drawImage(brain, brainLocX, brainLocY);
  }
}

// Idyllic Opening Scene
function idyllMaker() {
  house.onload = function () {
    // House
    canctx4.drawImage(
      house,
      0.1 * canvas.width - 0.5 * houseWidth,
      0.5 * canvas.height - 0.5 * houseHeight
    );
  };
  playground.onload = function () {
    // Playground
    canctx4.drawImage(
      playground,
      0.7 * canvas.width - 0.5 * playWidth,
      0.8 * canvas.height - 0.5 * playHeight
    );
  };
  forest.onload = function () {
    // Forest
    canctx4.drawImage(
      forest,
      0.8 * canvas.width - 0.5 * forestWidth,
      0.43 * canvas.height - 0.5 * forestHeight
    );
  };

  pup.onload = function () {
    // Playing Pup
    canctx4.drawImage(
      pup,
      0.15 * canvas.width - 0.5 * pupWidth,
      0.75 * canvas.height - 0.5 * pupHeight
    );
  };

  var earth = canctx2.createLinearGradient(
    // Radiant Ground
    0.5 * canvas.width,
    0.5 * canvas.height,
    0.5 * canvas.width,
    canvas.height
  );
  earth.addColorStop(0, "darkgreen");
  earth.addColorStop(0.4, "green");
  earth.addColorStop(1, "yellowgreen");
  canctx.fillStyle = earth;
  canctx.fillRect(0, (1 / 2) * canvas.height, canvas.width, canvas.height);

  var sky = canctx.createLinearGradient(
    // Radiant Sky
    0.5 * canvas.width,
    0,
    0.5 * canvas.width,
    0.5 * canvas.height
  );
  sky.addColorStop(0, "navy");
  sky.addColorStop(0.5, "blue");
  sky.addColorStop(1, "skyblue");
  canctx.fillStyle = sky;
  canctx.fillRect(0, 0, canvas.width, (1 / 2) * canvas.height);

  var sun = canctx2.createRadialGradient(
    // Radiant Sun
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

// Title and Transition Page Text
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

// Resize Title Screen
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

// Title and Transition Screen
function transitionScreen() {
  idyllMaker();
  brainMaker();
  transitionText();
}

// Creating next level (ONLY ONE FOR NOW)
function levelUp() {
  cloudMaker();
  boltMaker();
  makeEnemies();
  if (obsesso.value <= 0) {
    return;
  }
  document.addEventListener("mousemove", towerMaker);
  document.removeEventListener("click", levelUp);
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
  towerRange();
  document.addEventListener("click", towerPlacer);

  // EVENTUAL TOWER PAYMENT
  // coin = 500;
  // if (coin >= 100) {
  //   coin = coin - 100;
  //   document.addEventListener("mousemove", towerMaker);
  //   towerPlacer();
  // }
}

// Storm Moving In
function cloudMaker() {
  canctx4.clearRect(0, 0, canvas.width, canvas.height);
  for (let x = -350; x < canvas.width; x += 120) {
    for (let y = -350; y < canvas.height; y += 120) {
      setTimeout(() => {
        canctx.drawImage(cloud, x, y);
        canctx2.clearRect(0, 0, canvas.height, canvas.width);
      }, 500);
    }
  }
  document.removeEventListener("click", levelUp);
  document.removeEventListener("click", drawBrain);
}

// Get Points on a Line
function allPoints(i) {
  let distance = Math.sqrt(
    // Distance Between Two Points
    (coords[i - 1][1] - coords[i][1]) ** 2 +
      (coords[i - 1][0] - coords[i][0]) ** 2
  );
  let rate = (1 / distance) * 0.03;
  for (let progress = 0; progress <= 1; progress += rate) {
    x = coords[i - 1][0] + (coords[i][0] - coords[i - 1][0]) * progress;
    y = coords[i - 1][1] + (coords[i][1] - coords[i - 1][1]) * progress;
    points.push([x, y, false]);
  }
}

// Random Paths for Baddies
function boltMaker() {
  let xRan = Math.random() * canvas.width;
  let yRan = Math.random() * canvas.height;
  let sideRan = Math.floor(Math.random() * 4);
  let turnRan = Math.floor(Math.random() * 4 + 3);

  canctx.lineWidth = 45;
  canctx.strokeStyle = `rgb(255,255,235`;

  setTimeout(() => {
    // Setting a Random Edge for Bolt
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

    canctx.lineTo(coords[1][0], coords[1][1]); // Attempt to Control Bolt by Quadrant
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
    canctx.lineJoin = "bevel";
    canctx.stroke(); // Draw Bolt
    allPoints(coords.length - 1);
    var strike = new Sound("assets/strike.wav");
    strike.play();
  }, 2450);
}

// Only Making One Enemy for Now
function makeEnemies() {
  var sunny = new Sound(`assets/storm.mp3`);
  sunny.play();
  setTimeout(() => {
    points.forEach((point) => {
      setTimeout(() => {
        if (point[2]) {
          // If in Tower Radius:
          canctx2.strokeStyle = "#ff0000";
          obsesso.draw(point);
          shootPoints(point);
          obsesso.value = obsesso.value - 0.05;

          // WORKING ON MORE ENEMIES (NOT VERY DRY OR DYNAMIC YET)
          // canctx4.strokeStyle = "#000000";
          // canctx4.beginPath();
          // canctx4.moveTo(mouse.x, mouse.y);
          // canctx4.lineTo(point[0], point[1]);
          // canctx4.stroke();
          // canctx4.closePath();

          // if (points.indexOf(point) > 10000) {
          //   canctx2.beginPath();
          //   canctx2.arc(
          //     points[points.indexOf(point) - 10000][0],
          //     points[points.indexOf(point) - 10000][1],
          //     10,
          //     0,
          //     360
          //   );
          //   canctx2.stroke();
          //   canctx2.closePath();
          // }

          // if (points.indexOf(point) === points.length - 1) {
          //   for (let i = 0; i < 10000; i++) {
          //     setTimeout(() => {
          //       canctx2.clearRect(0, 0, canvas.width, canvas.height);
          //       canctx2.beginPath();
          //       canctx2.arc(
          //         points[points.indexOf(point) - (10000 - i)][0],
          //         points[points.indexOf(point) - (10000 - i)][1],
          //         10,
          //         0,
          //         360
          //       );
          //       canctx2.stroke();
          //       canctx2.closePath();
          //     }, 1);
          //   }
          // }
        } else if (!point[2]) {
          // If Outside Tower Radius
          canctx2.strokeStyle = "#000000";
          obsesso.draw(point);
        }

        if (points.indexOf(point) >= points.length - 1) {
          // Losing Conditions
          lose();
          return makeEnemies;
        }
        if (obsesso.value <= 0) {
          // Winning Conditions
          win();
          return makeEnemies;
        }
      }, 5);
    });
  }, 3000);
}

// Places Tower
function towerPlacer() {
  canctx3.clearRect(0, 0, canvas.width, canvas.height);
  aim();
  canctx3.drawImage(
    logician,
    mouse.x - logicianWidth * 0.5,
    mouse.y - logicianHeight * 0.5
  );
  document.removeEventListener("mousemove", towerMaker);
  document.removeEventListener("click", towerPlacer);
}

// Creating Tower Range
function towerRange() {
  canctx3.beginPath();
  canctx3.arc(mouse.x, mouse.y, 125, 0, 360);
  canctx3.fillColor = "yellow";
  canctx3.globalAlpha = 0.3;
  canctx3.closePath();
  canctx3.fill();
}

// Manipulating Points Array (False for Outside Tower Radius / True for Inside)
function aim() {
  points.forEach((point) => {
    distance = Math.sqrt((point[1] - mouse.y) ** 2 + (point[0] - mouse.x) ** 2);
    if (distance > 125) {
      point[2] = false;
    } else {
      point[2] = true;
    }
  });
}

// Points Between Tower and Enemy
function shootPoints(point) {
  let rate = 0.5;
  for (let progress = 0; progress <= 1; progress += rate) {
    x = mouse.x + (point[0] - mouse.x) * progress;
    y = mouse.y + (point[1] - mouse.y) * progress;
    canctx4.clearRect(0, 0, canvas.width, canvas.height);
    var shoot = canctx4.createLinearGradient(
      mouse.x,
      mouse.y,
      point[0],
      point[1]
    );
    shoot.addColorStop(0, "indigo"); // Lazer Beam
    shoot.addColorStop(0.125, "purple");
    shoot.addColorStop(0.25, "red");
    shoot.addColorStop(0.375, "orange");
    shoot.addColorStop(0.5, "indigo");
    shoot.addColorStop(0.625, "purple");
    shoot.addColorStop(0.75, "red");
    shoot.addColorStop(1, "orange");
    canctx4.strokeStyle = shoot;
    canctx4.beginPath();
    canctx4.moveTo(mouse.x, mouse.y);
    canctx4.lineTo(point[0], point[1]);
    canctx4.stroke();
    canctx4.closePath();
  }
}

// Win Function
function win() {
  canctx.clearRect(0, 0, canvas.width, canvas.height);
  canctx2.clearRect(0, 0, canvas.width, canvas.height);
  canctx3.clearRect(0, 0, canvas.width, canvas.height);
  canctx4.clearRect(0, 0, canvas.width, canvas.height);
  var sky = canctx4.createLinearGradient(
    0.5 * canvas.width,
    0,
    0.5 * canvas.width,
    0.5 * canvas.height
  );
  sky.addColorStop(0, "navy");
  sky.addColorStop(0.5, "blue");
  sky.addColorStop(1, "skyblue");
  canctx4.fillStyle = sky;
  canctx4.fillRect(0, 0, canvas.width, canvas.height);
  brainMaker();
  canctx4.font = "100px Cursive";
  canctx4.fillStyle = "black";
  canctx4.textAlign = "center";
  canctx4.fillText("You win!", canvas.width / 2, canvas.height / 5);
}

// Lose Function
function lose() {
  canctx.clearRect(0, 0, canvas.width, canvas.height);
  canctx2.clearRect(0, 0, canvas.width, canvas.height);
  canctx3.clearRect(0, 0, canvas.width, canvas.height);
  canctx4.clearRect(0, 0, canvas.width, canvas.height);
  var sky = canctx4.createLinearGradient(
    0.5 * canvas.width,
    0,
    0.5 * canvas.width,
    0.5 * canvas.height
  );
  sky.addColorStop(0, "darkred");
  sky.addColorStop(0.5, "red");
  sky.addColorStop(1, "pink");
  canctx4.fillStyle = sky;
  canctx4.fillRect(0, 0, canvas.width, canvas.height);
  canctx4.drawImage(badBrain, badBrainLocX, badBrainLocY);
  canctx4.font = "100px Cursive";
  canctx4.fillStyle = "black";
  canctx4.textAlign = "center";
  canctx4.fillText("You lose!", canvas.width / 2, canvas.height / 5);
}

// Engine
transitionScreen();
resize();
document.addEventListener("click", levelUp);

// FUTURE WORK

// game board const menu / const stats / info bar

// projectiles

// Towers
//    Dopa-mines
//    Posi-titans
//    Logicians (shoot bullets)
//    Hero: BFF (can be placed on any path until death, timed refresh)
//    consider: speed, strength, special powers, cost

// Enemies
//    Obsess-O's
//    Depressers (slow down towers)
//    Anxie-T's (fly)
//    X's (mean dialogue, super strong)
//    Moodies (replicating beers)
//    Bosses (actual bosses - mean dialogue)
//    consider: speed, strength, special powers, value
