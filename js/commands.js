var body = document.querySelector("body");

body.onkeydown = function() {
  switch(event.keyCode) {
    case 90: // Z key
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
      console.log(player.currentSpeed);
      break;

    case 81: // Q key
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