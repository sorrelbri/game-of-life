import Cell from "./Cell";

export default class GameField {
  constructor(seed) {
    // seed = [ [] ]
    this.map = {};
    seed.forEach((subArray, majorIndex) =>
      subArray.forEach((value, minorIndex) => {
        if (value > 0) {
          this.map[`${majorIndex}-${minorIndex}`] = new Cell(true);
        }
      })
    );
    // instead of implementing multiple GameFields, clear irrelevant keys and expand Game Field as needed
  }
}

// as a stream -> fieldStream => Stream(GameField, () => Stream(GameField.computeNeighbors(), () => Stream(GameField.setLiving()))
