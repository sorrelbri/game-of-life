import { cellStream } from "./Cell";

export default class GameField {
  constructor({ fieldArray = [], fieldMap = {} }) {
    // seed = [ [] ]
    this.map = {};
    fieldArray.forEach((subArray, majorIndex) =>
      subArray.forEach((value, minorIndex) => {
        if (value > 0) {
          this.map[`${majorIndex}-${minorIndex}`] = cellStream(true, 0);
        }
      })
    );
    for (let key in fieldMap) {
      this.map[key] = cellStream(true, 0);
    }
    // instead of implementing multiple GameFields, clear irrelevant keys and expand Game Field as needed
    // discrete Field expansion should only happen in View (to keep view fields centered)
  }
}

// as a stream -> fieldStream => Stream(GameField, () => Stream(fieldStream.computeNeighbors(), () => Stream(fieldStream.setLiving()))

// instantiate table (orientation of major and minor axis dependent on viewport)
// const gameFields = new Array(1).fill(new GameField({}));
// const container = document.getElementById("game-field");
