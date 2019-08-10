
import model from './model.js';
import grid from './grid.js';

class Controller {
  constructor(m, v) {
    this.m = m; // model
    this.v = v; // view
  }

  on_select(side) { // nullable
    this.m.select(side);
  }

  on_deselect() {
    this.v.clear_highlight();
  }

}

export default { Controller };
