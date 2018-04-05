const shipTypes = Object.freeze({
  drakir: 1,
  terran: 2,
  hestar: 3
});

const shootTypes = Object.freeze({
  blue: 1,
  red: 2,
  green: 3
});

/**
 * Constructor function to create ships
 * 
 * @param {object} type type of ship (shipTypes), ship's caracteritics will depend on this
 * @param {number} x x coordinate for the ship to be spawned at
 * @param {number} y y coordinate for the ship to be spawned at
 */
function Ship(type, x, y) {
  switch(type) {
    case shipTypes.drakir:
      this.HP = 200;
      this.maxHP = 200;
      this.x = x;
      this.y = y;
      this.width = 114;
      this.height = 55;
      this.degrees = 0;
      this.currentSpeed = 0;
      this.xSpeed = 0;
      this.ySpeed = 0;
      this.maxSpeed = 7;
      this.shipType = shipTypes.drakir;
      this.shootType = shootTypes.blue;
      this.steering = 3.4;
      this.acceleration = 0.6;
      this.image = new Image();
      this.image.src = "./images/ships/redshipr.png";
      break;

    case shipTypes.hestar: 
      this.HP = 300;
      this.maxHP = 300;
      this.x = x;
      this.y = y;
      this.width = 114;
      this.height = 86;
      this.degrees = 0;
      this.maxSpeed = 4;
      this.currentSpeed = 0;
      this.xSpeed = 0;
      this.ySpeed = 0;
      this.shipType = shipTypes.hestar;
      this.shootType = shootTypes.red;
      this.steering = 1.25;
      this.acceleration = 3;
      this.image = new Image();
      this.image.src = "./images/ships/hestar.png";
      break;

      case shipTypes.terran: 
      this.HP = 250;
      this.maxHP = 250;
      this.x = x;
      this.y = y;
      this.width = 114;
      this.height = 84;
      this.degrees = 0;
      this.maxSpeed = 4.5;
      this.currentSpeed = 0;
      this.xSpeed = 0;
      this.ySpeed = 0;
      this.shipType = shipTypes.terran;
      this.shootType = shootTypes.green;
      this.steering = 1.25;
      this.acceleration = 3;
      this.image = new Image();
      this.image.src = "./images/ships/terran.png";
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

/**
 * Makes the ship moves depending on its direction and speed
 */
Ship.prototype.movement = function() {
  let convertedDeg; //degrees converted to remain between 0 and 90
  let xPart;  //percentage of speed allowed to x axis movement
  let yPart;  //percentage of speed allowed to y axis movement

  if(!this.AI) {
    if(this.degrees > 90 && this.degrees <= 180) {
      convertedDeg = this.degrees - 90;
      xPart = convertedDeg / 90;
      yPart = (90 - convertedDeg) / 90;
      
      this.xSpeed = -this.currentSpeed * xPart;
      this.ySpeed = this.currentSpeed * yPart;
  
    } else if (this.degrees > 180 && this.degrees <= 270) {
      convertedDeg = this.degrees - 180;
      xPart = (90 - convertedDeg) / 90;
      yPart = convertedDeg / 90;
  
      this.xSpeed = -this.currentSpeed * xPart;
      this.ySpeed = -this.currentSpeed * yPart;
    
    } else if (this.degrees > 270 && this.degrees <= 360) {
      convertedDeg = this.degrees - 270; 
      xPart = convertedDeg / 90;
      yPart = (90 - convertedDeg) / 90;
  
      this.xSpeed = this.currentSpeed * xPart;
      this.ySpeed = -this.currentSpeed * yPart;
     
    } else {
      convertedDeg = this.degrees;
      xPart = (90 - convertedDeg) / 90;
      yPart = convertedDeg / 90;
  
      this.xSpeed = this.currentSpeed * xPart;
      this.ySpeed = this.currentSpeed * yPart;
    }
  } else {
    if(this.degrees >= 0 && this.degrees < 90) {
      convertedDeg = this.degrees;
      xPart = (90 - convertedDeg) / 90;
      yPart = convertedDeg / 90;

      this.xSpeed = this.currentSpeed * xPart;
      this.ySpeed = this.currentSpeed * yPart;
    } else if(this.degrees >= 90 && this.degrees <= 180) {
      convertedDeg = this.degrees - 90;
      xPart = convertedDeg / 90;
      yPart = (90 - convertedDeg) / 90;

      this.xSpeed = -this.currentSpeed * xPart;
      this.ySpeed = this.currentSpeed * yPart;
    } else if(this.degrees < 0 && this.degrees >= -90) {
      convertedDeg = this.degrees + 90;
      xPart = convertedDeg / 90;
      yPart = (90 - convertedDeg) / 90;

      this.xSpeed = this.currentSpeed * xPart;
      this.ySpeed = -this.currentSpeed * yPart;
    } else {
      convertedDeg = this.degrees + 180;
      xPart = (90 - convertedDeg) / 90;
      yPart = convertedDeg / 90;

      this.xSpeed = -this.currentSpeed * xPart;
      this.ySpeed = -this.currentSpeed * yPart;
    }
  }
  this.boundaryBounce();
  this.x += this.xSpeed;
  this.y += this.ySpeed;
}

/**
 * Avoid the ship from wandering outside of canvas
 */
Ship.prototype.boundaryBounce = function () {
  if(this.x <= 0 + this.width/2) {
    this.x = 0 + this.width/2;
  }
  if(this.x >= canvas.width - this.width/2) {
    this.x = canvas.width - this.width/2;
  }
  if(this.y <= 0 + this.height/2) {
    this.y = 0 + this.height/2;
  }
  if(this.y >= canvas.height - this.height/2) {
    this.y = canvas.height - this.height/2;
  }
}

Ship.prototype.shooting = function(shipType, source) {
  if(shipType === shipTypes.drakir) {
    gameObjects.push(new Shoot(this.shootType, this.x, this.y, this.degrees-90, source, this));
  } else if(shipType === shipTypes.terran || shipType === shipTypes.hestar) {
    gameObjects.push(new Shoot(this.shootType, this.x, this.y, this.degrees-90, source, this));  
  }
}

Ship.prototype.collision = function(ship) {
  if(this.y + this.height >= ship.y && 
    this.y <= ship.y + ship.height && 
    this.x + this.width >= ship.x &&
    this.x <= ship.x + ship.width) {
      this.currentSpeed -= 5;
      ship.currentSpeed -= 5;
    }
}