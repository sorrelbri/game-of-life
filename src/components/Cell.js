class Cell {
  constructor(living = false, liveNeighbors = 0) {
    this.living = living;
    this.liveNeighbors = liveNeighbors;
  }
  toggleLiving() {
    this.living = !this.living;
  }
  addLiveNeighbor() {
    this.liveNeighbors++;
  }
  setLiving() {
    if (this.living && this.liveNeighbors !== 2 && this.liveNeighbors !== 3) {
      return (this.living = false);
    }
    if (this.liveNeighbors === 3) {
      return (this.living = true);
    }
  }
}

// as a stream -> cellStream = Stream(Cell, () => Cell(cellStream.isLiving()))
// in this case GameField = { [x-y]: cellStream }
// communicating with neighbors = filter for (Boolean(Cell.living)) -> Cell neighbors.addLivingNeighbor
// controlling whether to call or not: filter for (Boolean(Cell.living) || Boolean(cell.liveNeighbors)) -> cellStream.next

module.exports = Cell;
