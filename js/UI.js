function barBackground() {
  ctx.fillStyle = "#f00";
  ctx.fillRect(canvas.width - 500, 15, 450, 25);
}

function playerLifeBar() {
  var lifePercent = player.HP / player.maxHP;
  ctx.fillStyle = "#0f0";
  ctx.fillRect(canvas.width -500, 15, 450 * lifePercent, 25);
}