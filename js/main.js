const canvas = document.querySelector(".first-canvas");
const ctx = canvas.getContext("2d");
const gameObjects = [];

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 20;

let player = new Ship(shipTypes.drakir);
gameObjects.push(player);

function refresh() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  
  gameObjects.forEach(element => {
    element.drawMe();
    element.movement();
  });


  requestAnimationFrame(() => {
    refresh();
  });
}

refresh();