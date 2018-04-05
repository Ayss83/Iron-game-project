/**
 * Draw player HP bar red background in canvas and indicates HP
 */
function barBackground() {
  ctx.fillStyle = "#f00";
  ctx.fillRect(canvas.width - 500, 15, 450, 25);
  ctx.font = "25px calibri";
  ctx.fillStyle = "#fff";
  ctx.fillText("HP", canvas.width - 550, 35);
}

/**
 * Draw player current HP level over the red background
 */
function playerLifeBar() {
  var lifePercent = player.HP / player.maxHP;
  ctx.fillStyle = "#0f0";
  ctx.fillRect(canvas.width -500, 15, 450 * lifePercent, 25);
}

/**
 * Write congratulations on screen with a black and partly transparent background
 */
function won() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
  ctx.fillRect(0,0,canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.font = "180px calibri";
  ctx.fillText("Congratulations!", 130, 470);
}

/**
 * Write game over on screen with a black and partly transparent background
 */
function gameOver() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
  ctx.fillRect(0,0,canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.font = "180px calibri";
  ctx.fillText("Game Over...", 280, 470);
}

/**
 * Draw player thrust empty container and indicates Thruster level
 */
function thrustContainer() {
  ctx.strokeStyle = "#888";
  ctx.strokeRect(canvas.width - 500, 65, 450, 25);
  ctx.font = "25px calibri";
  ctx.fillStyle = "#fff";
  ctx.fillText("Thruster level", canvas.width - 650, 85);
}

/**
 * Draw the player thrust level bar in the container
 */
function thrustBar() {
  var thrustPercent = player.currentSpeed / player.maxSpeed;

  ctx.fillStyle = "#555";
  if(thrustPercent > 0) {
    ctx.fillRect(canvas.width - 499, 66, 448 * thrustPercent, 23);
  }
}