const shipTypes = Object.freeze({
  drakir: 1,
  terran: 2,
  hestar: 3
});

/**
 * Constructor function to create ships
 * 
 * @param {object} type type of ship (shipTypes), ship's caracteritics will depend on this
 */
function Ship(type) {
  switch(type) {
    case shipTypes.drakir:
      this.HP = 200;
      this.x = 200;
      this.y = 300;
      this.width = 114;
      this.height = 82;
      this.degrees = 0;
      this.currentSpeed = 0;
      this.xSpeed = 0;
      this.ySpeed = 0;
      this.maxSpeed = 7;
      this.shootType = "";
      this.shootBaseDmg = 15;
      this.steering = 2;
      this.acceleration = 3;
      this.image = new Image();
      this.image.src = "./images/Spaceship-Drakir7.png";
      break;

    case shipTypes.hestar: 
      this.HP = 250;
      this.x = 600;
      this.y = 300;
      this.width = 114;
      this.height = 86;
      this.degrees = 0;
      this.maxSpeed = 6;
      this.currentSpeed = 0;
      this.xSpeed = 0;
      this.ySpeed = 0;
      this.shootType = "";
      this.shootBaseDmg = 11;
      this.steering = 0.8;
      this.acceleration = 3;
      this.image = new Image();
      this.image.src = "./images/ospaceship-main.png";
      break;

      case shipTypes.terran: 
      this.HP = 250;
      this.x = 850;
      this.y = 300;
      this.width = 114;
      this.height = 84;
      this.degrees = 0;
      this.maxSpeed = 6.5;
      this.currentSpeed = 0;
      this.xSpeed = 0;
      this.ySpeed = 0;
      this.shootType = "";
      this.shootBaseDmg = 11;
      this.steering = 0.8;
      this.acceleration = 3;
      this.image = new Image();
      this.image.src = "./images/blueships1.png";
      break;

    default:
      this.HP = 1;
  }
}  

Ship.prototype.drawMe = function() {
  // using context save and restore functions to apply changes only to the currently being drawn object
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.degrees*Math.PI/180);
  ctx.translate(-this.x, -this.y);
  ctx.drawImage(this.image, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
  ctx.restore();
} 

Ship.prototype.movement = function() {
  let convertedDeg; //degrees converted to remain between 0 and 90
  let xPart;  //percentage of speed allowed to x axis movement
  let yPart;  //percentage of speed allowed to y axis movement

  if(this.degrees > 90 && this.degrees <= 180) {
    convertedDeg = this.degrees - 90;
    xPart = (90 - convertedDeg) / 90;
    yPart = convertedDeg / 90;
    if(Math.abs(this.xSpeed) + Math.abs(this.ySpeed) < this.maxSpeed) {
      this.xSpeed = -this.currentSpeed * xPart;
      this.ySpeed = -this.currentSpeed * yPart;
    } else {
      this.xSpeed = -this.maxSpeed * xPart;
      this.ySpeed = -this.maxSpeed * yPart;
    }
  } else if (this.degrees > 180 && this.degrees <= 270) {
    convertedDeg = this.degrees - 180;
    xPart = convertedDeg / 90;
    yPart = (90 - convertedDeg) / 90;
    if(Math.abs(this.xSpeed) + Math.abs(this.ySpeed) < this.maxSpeed) {
      this.xSpeed = this.currentSpeed * xPart;
      this.ySpeed = -this.currentSpeed * yPart;
    } else {
      this.xSpeed = this.maxSpeed * xPart;
      this.ySpeed = -this.maxSpeed * yPart;
    }
  } else if (this.degrees > 270 && this.degrees <= 360) {
    convertedDeg = this.degrees - 270; 
    xPart = (90 - convertedDeg) / 90;
    yPart = convertedDeg / 90;
    if(Math.abs(this.xSpeed) + Math.abs(this.ySpeed) < this.maxSpeed) {
      this.xSpeed = this.currentSpeed * xPart;
      this.ySpeed = this.currentSpeed * yPart;
    } else {
      this.xSpeed = this.maxSpeed * xPart;
      this.ySpeed = this.maxSpeed * yPart;
    }
  } else {
    convertedDeg = this.degrees;
    xPart = convertedDeg / 90;
    yPart = (90 - convertedDeg) / 90;
    if(Math.abs(this.xSpeed) + Math.abs(this.ySpeed) < this.maxSpeed) {
      this.xSpeed = -this.currentSpeed * xPart;
      this.ySpeed = this.currentSpeed * yPart;
    } else {
      this.xSpeed = -this.maxSpeed * xPart;
      this.ySpeed = this.maxSpeed * yPart;
    }
  }
  
  this.x += this.xSpeed;
  this.y += this.ySpeed;
}