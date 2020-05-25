const html = require("./controls.html");
const css = require("../styles/contols.css");

const init = (gameField) => {
  const controlsEl = document.getElementById("controls");
  controlsEl.innerHTML += html;
  const rateEl = document.getElementById("rate");
  const forwardEl = document.getElementById("forward");
  const playEl = document.getElementById("play");
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
    reset() {
      this.pause();
      gameField.reset();
    },
    forward() {
      gameField.advance();
    },
    rate: 50,
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
    controls.interval ? controls.pause() : controls.play();
  });
  return controls;
};

module.exports = {
  init,
};
