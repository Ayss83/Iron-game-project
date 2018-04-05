const canvas = document.querySelector(".first-canvas");
const ctx = canvas.getContext("2d");
const gameObjects = [];

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 20;
let player = new Ship(shipTypes.drakir, randomCoords("x"), randomCoords("y"));
gameObjects.push(player);
let adversary = new Ship(shipTypes.hestar, randomCoords("x"), randomCoords("y"));
adversary.AI = new AI(adversary);
gameObjects.push(adversary);
let adversary2 = new Ship(shipTypes.terran, randomCoords("x"), randomCoords("y"));
adversary2.AI = new AI(adversary2);
gameObjects.push(adversary2);

function randomCoords(axis) {
  if (axis = "x") {
    return Math.ceil(Math.random() * (canvas.width - 114) + 50);
  } else if(axis = "y") {
    return Math.ceil(Math.random() * (canvas.height - 114) - 50);
  }
}

setInterval(function() {
  gameObjects.forEach(element => {
    if(element !== player && !(element instanceof Shoot)) {
      element.AI.orient();
    }
  });
}, 17);

function refresh() {
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

  if(shipsInGame.length === 1 && shipsInGame[0] === player) {
    won();
  }
  
  if(!shipsInGame.includes(player)) {
    gameOver();
  }

  requestAnimationFrame(() => {
    refresh();
  });
}

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