function Shoot(shootType, x, y, degrees) {
  this.x = x;
  this.y = y;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.degrees = degrees;
  this.image = new Image();
  this.width = 9;   //max 9
  this.height = 54;  //max 54
  this.velocity = 30;

  if(shootType === shootTypes.blue) {
    this.image.src = "./images/particles/laserBlue.png";
    this.shootBaseDmg = 11;    
  } else if(shootType === shootTypes.green) {
    this.image.src = "./images/particles/laserGreen.png";
    this.shootBaseDmg = 15;     
  } else if(shootType === shootTypes.red) {
    this.image.src = "./images/particles/laserRed.png";
    this.shootBaseDmg = 19;       
  }
}

Shoot.prototype.drawMe = function() {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.degrees*Math.PI/180);
  ctx.translate(-this.x, -this.y);
  ctx.drawImage(this.image, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
  ctx.restore();
}

Shoot.prototype.movement = function() {
  let convertedDeg;
  let xPart;
  let yPart;

  if(this.degrees > 90 && this.degrees <= 180) {
    convertedDeg = this.degrees - 90;
    xPart = (90 - convertedDeg) / 90;
    yPart = convertedDeg / 90;

    this.xSpeed = -this.velocity * xPart;
    this.ySpeed = - this.velocity * yPart;

  } else if (this.degrees > 180 && this.degrees <= 270) {
    convertedDeg = this.degrees - 180;
    xPart = convertedDeg / 90;
    yPart = (90 - convertedDeg) / 90;

    this.xSpeed = this.velocity * xPart;
    this.ySpeed = -this.velocity * yPart;
  
  } else if (this.degrees > 270 && this.degrees <= 360) {
    convertedDeg = this.degrees - 270; 
    xPart = (90 - convertedDeg) / 90;
    yPart = convertedDeg / 90;

    this.xSpeed = this.velocity * xPart;
    this.ySpeed = this.velocity * yPart;
   
  } else {
    convertedDeg = this.degrees;
    xPart = convertedDeg / 90;
    yPart = (90 - convertedDeg) / 90;

    this.xSpeed = -this.velocity * xPart;
    this.ySpeed = this.velocity * yPart;
  }

  this.x += this.xSpeed;
  this.y += this.ySpeed;
}