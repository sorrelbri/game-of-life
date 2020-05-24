class Cell {
  constructor() {
    this.living = false;
  }
  toggleLiving() {
    this.living = !this.living;
  }
}

module.exports = Cell;
