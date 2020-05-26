import reset from "./styles/reset.css";
import css from "./styles/style.css";
const { fieldView } = require("./components/GameFieldTable");
const { init } = require("./components/Controls");
(() => console.log("hello world!"))();
window.game = fieldView([]);
window.controls = init(game);
