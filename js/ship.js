const shipTypes = Object.freeze({
  vaisseau: 1
});

/**
 * Constructor function to create ships
 * 
 * @param {string} type type of ship, ship's caracteritics will depend on this
 */
function Ship(type) {
  switch(type) {
    case shipTypes.vaisseau:
      this.HP = 200;
      break;
    default:
      this.HP = 3;
  }
}