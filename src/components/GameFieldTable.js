const css = require("../styles/gameField.css");
const { fieldStream } = require("./GameField");

const tableEl = document.getElementById("game-field");
// const majorAxis = 55;
// const minorAxis = 7;

const constructTd = (key, alive) => `<td id=${key} data-alive=${alive}></td>`;

// const generateTable = (horizontal = false) => {
//   new Array(minorAxis).fill("").forEach((_, x) => {
//     const rowEl = document.createElement("tr");
//     new Array(majorAxis)
//       .fill("")
//       .forEach((_, y) => (rowEl.innerHTML += constructTd(`${x},${y}`, false)));
//     tableEl.appendChild(rowEl);
//   });
// };

const addRowsToTable = ({ x0, x1, y0, y1 }) => {
  console.log({ x0, x1, y0, y1 });
  // range from x0 to x1 generating new tr els
  const firstRow = document.getElementById(`${x1 + 1},y`);
  let x = x0;
  while (x <= x1) {
    let y = y0;
    const rowEl = document.createElement("tr");
    rowEl.id = `${x},y`;
    while (y <= y1) {
      rowEl.innerHTML += constructTd(`${x},${y}`, false);
      y++;
    }
    console.log(firstRow);
    if (x0 < 0) {
      tableEl.insertBefore(rowEl, firstRow);
    } else {
      tableEl.appendChild(rowEl);
    }
    x++;
  }
  // forEach row range from y0 to y1 generating new td els
};

const addToRows = ({ x0, x1, y0, y1 }) => {
  let x = x0;
  while (x <= x1) {
    let y = y0;
    const rowEl = document.getElementById(`${x},y`);
    let newHTML = "";
    while (y <= y1) {
      newHTML += constructTd(`${x},${y}`, false);
      y++;
    }
    if (y0 < 0) {
      rowEl.innerHTML = newHTML += rowEl.innerHTML;
    } else {
      rowEl.innerHTML += newHTML;
    }
    // console.log(firstRow);
    // if (x0 < 0) tableEl.insertBefore(rowEl, firstRow);
    x++;
  }
  // range form x0 to x1 selecting tr els
  // forEach row range from y0 to y1 generating new td els
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
  // generateTable(true);
  const field = fieldStream(fieldArray);
  return {
    dimension: { x0: 0, x1: 6, y0: 0, y1: 55 },
    field,
    view: Object.entries(field.map)
      .map(([key, cell]) => [key, document.getElementById(key), cell.living])
      .reduce((obj, [key, el, living]) => {
        obj[key] = el;
        el.dataset.alive = living;
        return obj;
      }, {}),
    expandView() {
      const { x0, x1, y0, y1 } = this.dimension;
      addRowsToTable({ x0: x0 - 7, x1: x0 - 1, y0: y0 - 25, y1: y1 + 25 });
      addRowsToTable({ x0: x1 + 1, x1: x1 + 6, y0: y0 - 25, y1: y1 + 25 });
      addToRows({ x0, x1, y0: y0 - 25, y1: y0 - 1 });
      addToRows({ x0, x1, y0: y1, y1: y1 + 25 });
      this.dimension = { x0: x0 - 7, x1: x1 + 6, y0: y0 - 25, y1: y1 + 25 };
    },
    updateView(field) {
      // if !view[key] expandView()
      Object.entries(field.map).forEach(([key, cell]) => {
        // for all cells update `#${key}` with data-alive=`${living}`
        let el = document.getElementById(key);
        if (!el) {
          this.expandView();
          el = document.getElementById(key);
        }
        this.view[key] = el;
        this.view[key].dataset.alive = cell.living;
      });
    },
    reset() {},
    advance() {
      this.field = this.field.next.next;
      console.log(this.field);
      this.updateView(this.field);
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
