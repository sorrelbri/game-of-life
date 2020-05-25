const css = require("../styles/gameField.css");
const { fieldStream } = require("./GameField");

const canvasEl = document.getElementById("game-field");
const canvas2D = canvasEl.getContext("2d");
canvas2D.fillStyle = "white";

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
    draw(x, y) {
      const { scale, offset } = this.dimension;
      canvas2D.fillRect(x * scale + offset, y * scale + offset, scale, scale);
    },
    dimension: { x0: 0, y0: 0, x1: 500, y1: 300, scale: 6, offset: 100 },
    field,
    updateView(field) {
      canvas2D.clearRect(0, 0, this.dimension.x1, this.dimension.y1);
      Object.entries(field.map)
        .filter(([key, cell]) => cell.living)
        .map(([key]) => key.split(","))
        .forEach(([x, y]) => this.draw(x, y));
    },
    reset() {
      return fieldView(seed);
      this.updateView(this.field);
    },
    advance() {
      this.field = this.field.next.next;
      this.updateView(this.field);
    },
    handleClick(e) {
      // toggle single cell
    },
  };
};

module.exports = {
  fieldView,
};
