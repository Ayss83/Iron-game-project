var body = document.querySelector("body");

body.onkeydown = function() {
  switch(event.keyCode) {
    case 90: // Z key
    case 87: // W key for qwerty keyboards
      if(player.currentSpeed + player.acceleration < player.maxSpeed) {
        player.currentSpeed += player.acceleration;
      } else {
        player.currentSpeed = player.maxSpeed;
      }
      break;
      
      case 83 : // S key
      if(player.currentSpeed - player.acceleration >= 0) {
        player.currentSpeed -= player.acceleration;
      } else {
        player.currentSpeed = 0;
      }
      break;

    case 81: // Q key
    case 65: // A key for qwerty keyboards
      if (player.degrees > 0) {
        player.degrees -= player.steering;
      } else {
        player.degrees = player.degrees - player.steering + 360;
      }
      break;

    case 68: // D key
      if(player.degrees + player.steering > 360) {
        player.degrees = player.degrees + player.steering - 360;
      } else {
        player.degrees += player.steering;
      }
      break;
  }
}

body.onkeyup = function() {
  switch(event.keyCode) {
    case 13:
      player.shooting(player.shipType, "player");
      break;
  }
}