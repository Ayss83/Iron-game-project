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
  ctx.font = "160px calibri";
  var text = "Congratulations!";
  var textWidth = ctx.measureText(text).width;
  ctx.fillText(text, canvas.width / 2 - textWidth / 2, 480);
}

/**
 * Write game over on screen with a black and partly transparent background
 */
function gameOver() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
  ctx.fillRect(0,0,canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.font = "160px calibri";
  var text = "Game Over...";
  var textWidth = ctx.measureText(text).width;
  ctx.fillText(text, canvas.width / 2 - textWidth / 2, 480);
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

/**
 * Start screen (title, text and background)
 */
function startScreen() {
  if(canvas.style.backgroundImage !== "url('./images/background/startBack.jpg')") {
    canvas.style.backgroundImage = "url('./images/background/startBack.jpg')";
  }
  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
  ctx.fillRect(0,0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255, 255, 255, 1";
  ctx.font = "180px serif";
  const titleText = "Space Shooter";
  const titleTextWidth = ctx.measureText(titleText).width;
  ctx.fillText(titleText, canvas.width/2 - titleTextWidth/2, canvas.height / 2.5 + 45);

  ctx.fillStyle = "rgba(255, 255, 255, " + currentAlpha + ")";
  ctx.font = "25px calibri";
  const text = "Press start button (enter key will do)";
  const textWidth = ctx.measureText(text).width;
  ctx.fillText(text, canvas.width/2 - textWidth/2, canvas.height / 1.5);

}

function selectScreen() {
  if(canvas.style.backgroundImage !== "url('./images/background/startBack.jpg')") {
    canvas.style.backgroundImage = "url('./images/background/startBack.jpg')";
  }
  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
  ctx.fillRect(0,0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255, 255, 255, 1";
  ctx.font = "180px serif";
  const titleText = "Space Shooter";
  const titleTextWidth = ctx.measureText(titleText).width;
  ctx.fillText(titleText, canvas.width/2 - titleTextWidth/2, canvas.height / 2.5 + 45);

  ctx.font = "35px calibri";
  const option1Text = "1 player";
  const option1Width = ctx.measureText(option1Text).width;
  ctx.fillText(option1Text, canvas.width / 2 - option1Width - 50, canvas.height / 1.7);
  const option2Text = "2 players";
  const options2Width = ctx.measureText(option2Text).width;
  ctx.fillText(option2Text, canvas.width / 2 - options2Width + 220, canvas.height / 1.7);
}