const canvas = document.querySelector(".first-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 20;

var player = new Ship(shipTypes.drakir);
var hestar = new Ship(shipTypes.hestar);
var terran = new Ship(shipTypes.terran);

function refresh() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  player.drawMe();
  // hestar.drawMe();
  // terran.drawMe();
  player.movement();
  // hestar.degrees += 0.8;
  // terran.degrees -= 0.8;


  requestAnimationFrame(function() {
    refresh();
  });
}

refresh();