const css = require("../styles/gameField.css");
const { fieldStream } = require("./GameField");

const canvasEl = document.getElementById("game-field");
const canvas2D = canvasEl.getContext("2d");
canvas2D.fillStyle = "white";

const parseSeed = (seed) => {
  if (seed && Array.isArray(seed)) {
    return {
      fieldArray: seed,
    };
  }
  return seed;
};

const fieldView = (seed) => {
  seed = parseSeed(seed);
  const field = fieldStream(seed);
  const view = {
    draw(x, y) {
      const { scale, offset } = this.dimension;
      canvas2D.fillRect(x * scale + offset, y * scale + offset, scale, scale);
    },
    dimension: { x0: 0, y0: 0, x1: 500, y1: 300, scale: 6, offset: 100 },
    field,
    updateView() {
      canvas2D.clearRect(0, 0, this.dimension.x1, this.dimension.y1);
      Object.entries(this.field.map)
        .filter(([key, cell]) => cell.living)
        .map(([key]) => key.split(","))
        .forEach(([x, y]) => this.draw(x, y));
    },
    clear() {
      return fieldView({});
    },
    reset() {
      const newField = fieldView(seed);
      newField.updateView();
      return newField;
    },
    seed(seed) {
      return fieldView(seed);
    },
    advance() {
      this.field = this.field.next.next;
      this.updateView();
    },
    toggleCell(x, y) {
      const { scale, offset } = this.dimension;
      x = Math.floor((x - offset) / scale);
      y = Math.floor((y - offset) / scale);
      const fieldMap = Object.entries(this.field.map)
        .map(([key, cell]) => [key, cell.living])
        .reduce((map, [key, living]) => {
          map[key] = [living];
          return map;
        }, {});
      fieldMap[`${x},${y}`] = !!fieldMap[`${x},${y}`]
        ? [!fieldMap[`${x},${y}`][0]]
        : [true];
      return new fieldView({ fieldMap });
    },
  };
  view.updateView();
  return view;
};

module.exports = {
  fieldView,
};
