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
}

AI.prototype.orient = function() {
  if(this.target) {

    let angleToTarget = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x) * 180 / Math.PI;
    let limit;

    if(this.ship.degrees + 180 > 180) {
      limit = this.ship.degrees - 180;
    } else {
      limit = this.ship.degrees + 180;
    }
    
    if(angleToTarget > this.ship.degrees) {
      this.ship.degrees += this.ship.steering; //rotate clockwise
      if(this.ship.degrees > 180) {
        this.ship.degrees -= 360;
      }
    } else if(angleToTarget < this.ship.degrees) {
      this.ship.degrees -= this.ship.steering; // rotate counter clockwise
      if(this.ship.degrees <= -180) {
        this.ship.degrees += 360;
      }
    }
    
  }
}