const { cellStream } = require("./Cell");
const { Stream, getNeighbors } = require("../utils");

class GameField {
  constructor({ fieldArray = [], fieldMap = {} }) {
    // seed = [ [] ]
    this.map = {};
    fieldArray.forEach((subArray, majorIndex) =>
      subArray.forEach((value, minorIndex) => {
        if (value > 0) {
          this.map[`${majorIndex},${minorIndex}`] = cellStream(true, 0);
        }
      })
    );
    Object.entries(fieldMap).forEach(
      ([key, [live, neighbors]]) =>
        (this.map[key] = cellStream(live, neighbors))
    );
  }
}

class FieldStream extends Stream {
  constructor(head, next) {
    super(head, next);
  }
  get map() {
    return this.head.map;
  }
  addLiveNeighbor(key) {
    if (this.map[key] === undefined) {
      this.map[key] = cellStream(false);
    }
    this.map[key].addLiveNeighbor();
  }
}

const seedMap = (map, [key, seed]) => {
  map[key] = seed;
  return map;
};
const isLiving = ([key, cell]) => cell.living === true;
const incrementLiveNeighbors = (field) => ([key]) =>
  getNeighbors(key).forEach((neighbor) => field.addLiveNeighbor(neighbor));
const makeSeed = ([key, cell]) => [key, [cell.living, cell.liveNeighbors]];
const makeSeedNextGen = ([key, cell]) => {
  cell.setLiving();
  return [key, [cell.living, 0]];
};

const fieldStream = ({ fieldArray, fieldMap }) => {
  return new FieldStream(new GameField({ fieldArray, fieldMap }), function () {
    // calculate liveNeighbors for all cells on first next call
    Object.entries(this.map)
      .filter(isLiving)
      .forEach(incrementLiveNeighbors(this));
    // generate seed for next Stream with liveNeighbors
    const mapWithLiveNeighbors = Object.entries(this.map)
      .map(makeSeed)
      .reduce(seedMap, {});
    // return next stream
    return new FieldStream(
      new GameField({ fieldMap: mapWithLiveNeighbors }),
      function () {
        // determine living cells for next generation
        const nextGeneration = Object.entries(this.map)
          .map(makeSeedNextGen)
          .reduce(seedMap, {});
        // seed next Stream
        return fieldStream({ fieldMap: nextGeneration });
      }
    );
  });
};

// wrapper for fieldStream
// -- .reset => instantiates new fieldStream
// -- .toggle(cell) => manually toggles cell state

// instantiate table (orientation of major and minor axis dependent on viewport)
// const gameFields = new Array(1).fill(new GameField({}));

module.exports = {
  GameField,
  fieldStream,
};
