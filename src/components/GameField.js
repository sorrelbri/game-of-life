import Cell from "./Cell";

export default class GameField {
  constructor({ fieldArray = [], fieldMap = {} }) {
    // seed = [ [] ]
    this.map = {};
    fieldArray.forEach((subArray, majorIndex) =>
      subArray.forEach((value, minorIndex) => {
        if (value > 0) {
          this.map[`${majorIndex}-${minorIndex}`] = new Cell(true);
        }
      })
    );
    for (let key in fieldMap) {
      this.map[key] = new Cell(true);
    }
    // instead of implementing multiple GameFields, clear irrelevant keys and expand Game Field as needed
    // discrete Field expansion should only happen in View (to keep view fields centered)
  }
}

// as a stream -> fieldStream => Stream(GameField, () => Stream(fieldStream.computeNeighbors(), () => Stream(fieldStream.setLiving()))
