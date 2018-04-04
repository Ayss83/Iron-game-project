const canvas = document.querySelector(".first-canvas");
const ctx = canvas.getContext("2d");
const gameObjects = [];

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 20;

let player = new Ship(shipTypes.drakir);
gameObjects.push(player);
let adversary = new Ship(shipTypes.hestar);
adversary.AI = new AI(adversary);
gameObjects.push(adversary);
let adversary2 = new Ship(shipTypes.terran);
adversary2.AI = new AI(adversary2);
gameObjects.push(adversary2);

function refresh() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  
  gameObjects.forEach((element, index) => {
    if(element !== player && !(element instanceof Shoot)) {
      element.AI.targeting();
      element.AI.orient();
      // element.AI.move();
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
})
}, 500);