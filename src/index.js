import reset from "./styles/reset.css";
import css from "./styles/style.css";
// import Controls from './components/Controls';
const { fieldView } = require("./components/GameFieldTable");
const { init } = require("./components/Controls");
(() => console.log("hello world!"))();
window.game = fieldView([]);
window.controls = init(game);
// controls
// -- state=idle ?
// ---- rewind runs through gameHistory to current state - 1 step
// ---- forward adds 1 step to game
// ---- play sets state to playing, each cell runs through logic below with timeout = speed
// ---- speed sets timeout
// ---- reset restores initial gameState
// ------ form
// -------- type to load handles
// ---------- dynamic autofill after x characters (select els)
// -------- "seed" to submit handle and request contribCalender

// game-board
// -- sections of board
// ---- cells
// ------ state=idle ? onClick=changeCell : onClick=()=>{}
// ------ state=playing && cell=live ? dispatchToNeighbors(liveNeighbors++)
// -------- when playing all live cells dispatch, then all cells determine life
// -- load sections of board
// ---- onDispatch from neighboring section load square around all sections (eg 1x1 dispatch loads frame of sections around 1x1 to form new 3x3 )
