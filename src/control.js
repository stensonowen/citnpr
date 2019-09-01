
import grid from './grid.js';


function register_keystrokes(board) {
  const C = grid.Grid.Column;
  window.addEventListener('keydown', function(e) {
    if (e.metaKey || e.altKey || e.ctrlKey || e.repeat) { return; }
    else if (e.code === "KeyQ") { board.choose(C.LEFT); }
    else if (e.code === "KeyP") { board.choose(C.RIGHT); }
    else if (e.code === "Space") { board.dismiss_banner(); }
  });
  const clear = (_) => board.view.clear_selection();
  window.addEventListener('mouseup', clear);
  window.addEventListener('keyup',   clear);
}

export default { register_keystrokes };


/*

class Controller {
  constructor(m, v) {
    this.m = m; // model
    this.v = v; // view
  }

  on_select(side) { // nullable
    console.log("on select - side = ", side);
    this.m.select_side(side);
  }

  on_deselect() {
    this.v.clear_highlight();
  }

}

export default { Controller };
*/
