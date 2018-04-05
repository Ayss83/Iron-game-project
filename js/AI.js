function AI(ship) {
  this.ship = ship;
  this.target = null;
}

AI.prototype.targeting = function() {
  const possibleTargets = [];
  let closestTargetDist;
  let closestTarget;

  gameObjects.forEach(element => {
    if(element instanceof Ship && element !== this.ship) {
      possibleTargets.push(element);
    }
  });

  if(possibleTargets.length === 1) {
    this.target = possibleTargets[0];
  } else {
    possibleTargets.forEach(oneTarget => {
      let distance = Math.sqrt((oneTarget.x - this.ship.x) ** 2 + (oneTarget.y - this.ship.y) ** 2);
  
      if(distance < closestTargetDist || !closestTargetDist) {
        closestTarget = oneTarget;
        closestTargetDist = distance;
      }
    });
    
    this.target = closestTarget;
  }

  if(this.target.HP <= 0) {
    this.target = null;
  }
}

AI.prototype.orient = function() {
  if(this.target) {

    let angleToTarget = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x) * 180 / Math.PI;
    
    if((angleToTarget > this.ship.degrees && !(angleToTarget > this.ship.degrees +180)) || angleToTarget < this.ship.degrees - 180) {
      this.ship.degrees += this.ship.steering; //rotate clockwise
      if(this.ship.degrees > 180) {
        this.ship.degrees -= 360;
      }
    } else if(angleToTarget < this.ship.degrees || angleToTarget > this.ship.degrees + 180) {
      this.ship.degrees -= this.ship.steering; // rotate counter clockwise
      if(this.ship.degrees < -180) {
        this.ship.degrees += 360;
      }
    }
  }
}

AI.prototype.move = function() {
  let distance = Math.sqrt((this.target.x - this.ship.x) ** 2 + (this.target.y - this.ship.y) ** 2);

  if(distance > 200 && this.ship.currentSpeed < this.ship.maxSpeed) {
    this.ship.currentSpeed += this.ship.acceleration;
  } else if(distance < 200 && this.ship.currentSpeed > 0) {
    this.ship.currentSpeed -= this.ship.acceleration;
  }
}

AI.prototype.shoot = function() {
  if(this.target.HP > 0) {
    let angleToTarget = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x) * 180 / Math.PI;

    if((angleToTarget < this.ship.degrees + 10) && (angleToTarget > this.ship.degrees - 10)) {
      this.ship.shooting(this.ship.shipType);
    }
  }
}

AI.prototype.avoid = function() {
  const angleTowardSelf = Math.atan2(this.ship.y - this.target.y, this.ship.x - this.target.x) * 180 / Math.PI;
  let correctedAngle;

  // Adjustment if the target is the player ship since it has a 0°/360° basis instead of -180°/180° one
  if(this.target === player) {
    if(this.target.degrees > 180) {
      correctedAngle = this.target.degrees - 360;
    } else {
      correctedAngle = this.target.degrees;
    }
  } else {
    correctedAngle = this.target.degrees;
  }

  if(angleTowardSelf > correctedAngle - 10 && angleTowardSelf < correctedAngle + 10) {
    console.log("Je suis dans la ligne de mire de ma cible, je dois bouger");
    this.ship.degrees += this.ship.steering;
    if(this.ship.currentSpeed < this.ship.maxSpeed) {
      this.ship.currentSpeed += this.ship.acceleration;
    } else {
      this.ship.currentSpeed = this.ship.maxSpeed;
    }

    return true;
  }

  return false;
}