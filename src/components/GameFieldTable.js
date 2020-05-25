const css = require("../styles/gameField.css");
const { fieldStream } = require("./GameField");

const tableEl = document.getElementById("game-field");
const majorAxis = 55;
const minorAxis = 7;

const constructTd = (key, alive) => `<td id=${key} data-alive=${alive}></td>`;

const generateTable = (horizontal = false) => {
  new Array(minorAxis).fill("").forEach((_, x) => {
    const rowEl = document.createElement("tr");
    new Array(majorAxis)
      .fill("")
      .forEach((_, y) => (rowEl.innerHTML += constructTd(`${x},${y}`, false)));
    tableEl.appendChild(rowEl);
  });
};

const parseSeed = (seed) => ({
  fieldArray: [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1],
  ],
});
const fieldView = (seed) => {
  fieldArray = parseSeed(seed);
  generateTable(true);
  const field = fieldStream(fieldArray);
  return {
    field,
    view: Object.entries(field.map)
      .map(([key, cell]) => [key, document.getElementById(key), cell.living])
      .reduce((obj, [key, el, living]) => {
        obj[key] = el;
        el.dataset.alive = living;
        return obj;
      }, {}),
    updateView() {
      // if !view[key] expandView()
      // for all cells update `#${key}` with data-alive=`${living}`
    },
    reset() {},
    advance() {
      // this.field.next.next;
      // this.updateView();
    },
    play(rate) {
      // loop with timeout based on rate
    },
    handleClick(e) {
      // toggle single cell
    },
  };
};

module.exports = {
  fieldView,
};
