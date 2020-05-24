const { cellStream } = require("./Cell");
const { Stream } = require("../utils");

class GameField {
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

class FieldStream extends Stream {
  constructor(head, next) {
    super(head, next);
  }
  get map() {
    return this.head.map;
  }
}

const fieldStream = ({ fieldArray, fieldMap }) => {
  return new FieldStream(new GameField({ fieldArray, fieldMap }), function () {
    // calculate liveNeighbors for all cells on first next call

    new FieldStream({}, function () {
      // call .next on all Cells on second next call
    });
  });
};

// as a stream -> fieldStream => Stream(GameField, () => Stream(fieldStream.computeNeighbors(), () => Stream(fieldStream.setLiving()))

// instantiate table (orientation of major and minor axis dependent on viewport)
// const gameFields = new Array(1).fill(new GameField({}));
// const container = document.getElementById("game-field");

module.exports = {
  GameField,
  fieldStream,
};
