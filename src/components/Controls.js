const html = require("./controls.html");
const css = require("../styles/controls.css");
const { getCalendar } = require("../utils/index");

const init = (gameField) => {
  const controlsEl = document.getElementById("controls");
  controlsEl.innerHTML += html;
  const rateEl = document.getElementById("rate");
  const forwardEl = document.getElementById("forward");
  const playEl = document.getElementById("play");
  const resetEl = document.getElementById("reset");
  const clearEl = document.getElementById("clear");
  const canvasEl = document.getElementById("game-field");
  const calendarFormEl = document.getElementById("calendar-form");
  const controls = {
    interval: null,
    play() {
      const gameLoop = () => gameField.advance();
      this.interval = setInterval(gameLoop, 1000 / this.rate);
    },
    pause() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    clear() {
      gameField = gameField.clear();
    },
    reset() {
      this.pause();
      gameField = gameField.reset();
    },
    forward() {
      gameField.advance();
    },
    rate: 10,
    updateField(x, y) {
      gameField = gameField.toggleCell(x, y);
    },
    updateRate(rate) {
      console.log("updating rate");
      console.log(rate);
      console.log(this.interval);
      controls.rate = rate;
      if (this.interval) {
        clearInterval(this.interval);
        this.play();
      }
    },
  };
  rateEl.addEventListener("change", (e) => {
    e.preventDefault();
    controls.updateRate(e.target.value);
  });
  forwardEl.addEventListener("click", (e) => {
    e.preventDefault();
    controls.forward();
  });
  playEl.addEventListener("click", (e) => {
    e.preventDefault();
    if (controls.interval) {
      controls.pause();
      return (forwardEl.disabled = false);
    }
    controls.play();
    forwardEl.disabled = true;
  });
  resetEl.addEventListener("click", (e) => {
    e.preventDefault();
    controls.reset();
  });
  clearEl.addEventListener("click", (e) => {
    e.preventDefault();
    controls.clear();
  });
  canvasEl.addEventListener("click", (e) => {
    e.preventDefault();
    if (controls.interval) return;
    const { offsetX, offsetY } = e;
    controls.updateField(offsetX, offsetY);
  });
  calendarFormEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = e.target[0].value;
    console.log(getCalendar(user));
  });
  return controls;
};

module.exports = {
  init,
};
