const canvas = document.querySelector(".first-canvas");


canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 20;

var vaisseau = new Ship(shipTypes.vaisseau);
console.log(vaisseau.HP);