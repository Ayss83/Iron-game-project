const canvas = document.querySelector(".first-canvas");
const ctx = canvas.getContext("2d");
const gamePhases = Object.freeze({
  start: 1,
  select: 2,
  play: 3,
  gameOver: 4,
  win: 5,
});
const gameObjects = [];  // array for every object in game scene
const startingXPos = []; // array keeping starting x positions of ships
const startingYPos = []; // array keeping starting y positions of ships
let currentPhase = gamePhases.play;
let loop = true;
let currentAlpha = 1;

//blinking rate for subtext on title screen
/* 
setInterval(() => {
  if(loop) {
    currentAlpha -= 0.1;
  } else {
    currentAlpha += 0.1;
  }

  if(currentAlpha < 0) {
    loop = false;
    currentAlpha = 0;
  } else if (currentAlpha >= 1) {
    loop = true;
    currentAlpha = 1;
  }
}, 1000/15);
*/

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 20;
let player = new Ship(shipTypes.drakir, randomCoords("x"), randomCoords("y"), randomOrientation());
gameObjects.push(player);
let adversary = new Ship(shipTypes.hestar, randomCoords("x"), randomCoords("y"), randomOrientation("AI"));
adversary.AI = new AI(adversary);
gameObjects.push(adversary);
let adversary2 = new Ship(shipTypes.terran, randomCoords("x"), randomCoords("y"), randomOrientation("AI"));
adversary2.AI = new AI(adversary2);
gameObjects.push(adversary2);

function randomCoords(axis) {
  if (axis = "x") {
    let testedPos;
    let isUnique = false;

    function choosePos() {
      testedPos = Math.ceil(Math.random() * (canvas.width - 114));
    }

    while(!isUnique) {
      choosePos();
      startingXPos.forEach(coord => {
        if(testedPos > coord - 220 && testedPos < coord + 220) {
          isUnique = false;
        } else {
          isUnique = true;
        }
      });
      isUnique = true;
    }
    startingXPos.push(testedPos);
    return testedPos;

  } else if(axis = "y") {
    let testedPos;
    let isUnique = false;

    function choosePos() {
      testedPos = Math.ceil(Math.random() * (canvas.height - 114));
    }

    while(!isUnique) {
      choosePos();
      startingYPos.forEach(coord => {
        if(testedPos > coord - 220 && testedPos < coord + 220) {
          isUnique = false;
        } else {
          isUnique = true;
        }
      });
      isUnique = true;
    }
    startingYPos.push(testedPos);
    return testedPos;
    
  }
}

function randomOrientation(AI) {
  let orientation = Math.floor(Math.random() * 361);

  if(AI && orientation > 180) {
    orientation -= 360;
  }

  return orientation;
}

setInterval(function() {
  gameObjects.forEach(element => {
    if(element !== player && !(element instanceof Shoot)) {
      element.AI.orient();
    }
  });
}, 17);

if(currentPhase === gamePhases.start) {
  setInterval(() => {
    startScreen();
  }, 1000/25)
} else if(currentPhase === gamePhases.play) {
  refresh();

  setInterval(function() {
    gameObjects.forEach((element, index) => {
      if(element !== player && !(element instanceof Shoot)) {
        element.AI.shoot();
      }
  
      if(element instanceof Ship) {
        if(element.currentSpeed < 0) {
          element.currentSpeed += 0.5;
        }
      }
  })
  }, 500);
} else if(currentPhase === gamePhases.select) {
  setInterval(() => {
    selectScreen();
  }, 1000/25);
}

function refresh() {
  if(canvas.style.backgroundImage !== "url('./images/background/back.png')") {
    canvas.style.backgroundImage = "url('./images/background/back.png')";
  }

  const shipsInGame = [];
  ctx.clearRect(0,0, canvas.width, canvas.height);

  gameObjects.forEach((element, index) => {
    if(element instanceof Ship && element.HP <= 0) {
      gameObjects.splice(index, 1);
    }
  });

  gameObjects.forEach((element, index) => {
    
    if(element instanceof Ship) {
      shipsInGame.push(element);
    }

    if(element !== player && !(element instanceof Shoot) && shipsInGame.length !== 1) {
      element.AI.targeting();
      // if(!element.AI.avoid()) {
        element.AI.move();
      // }
    }

    if(element instanceof Shoot) {
      gameObjects.forEach(aShip => {
        if(aShip instanceof Ship && aShip !== element.firingShip) {
          if(element.collision(aShip)) {
            gameObjects.splice(index, 1);
          }
        }
      });
    }

    element.drawMe();
    element.movement();

    // getting rid of shoots which went out of canvas
    if(element instanceof Shoot && 
      (element.x <= 0 || 
        element.x >= canvas.width + element.width || 
        element.y <= 0 || 
        element.y >= canvas.height + element.height)
      ) {
        gameObjects.splice(index, 1);
    }
  });

  // call of function to test collisions between ships
  shipsInGame.forEach(ship1 => {
    shipsInGame.forEach(ship2 => {
      if(ship1 !== ship2) {
        ship1.collision(ship2);
      }
    })
  });

  barBackground();
  thrustContainer();
  if(player.HP > 0) {
    playerLifeBar();
    thrustBar();
  }

  //winning condition
  if(shipsInGame.length === 1 && shipsInGame[0] === player) {
    won();
  }
  
  // gameover condition
  if(!shipsInGame.includes(player)) {
    gameOver();
  }

  requestAnimationFrame(() => {
    refresh();
  });
}

