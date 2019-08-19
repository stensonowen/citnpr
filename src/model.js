

//import grid from './grid.js';
import cats from './categories.js';
import stage from './stage.js';

//const Grid = grid.Grid;

class Model {
  constructor(app) {
    this.app = app;
  }
}

/*
class Stage {
  constructor(app, num, opp1, oppA) {
    this.app = app;

    // stage 1 - Punk Rock vs Non Punk Rock
    // stage 2 - Liberalism vs Conservatism
  }
}
*/

/*
class Model {
  constructor() {
    this.v = null; // view

    // state
    this.labels = {
      NE : "Cccc",
      NW : "Llll",
      SW : "Pppp",
      SE : "Nnn Pppp",
    };
    this.row_active = Grid.Row.TOP;
    this.stage = 1;
  }

  select_side(side) {
    this.v.highlight_side(side);

    if (this.row_active === Grid.Row.TOP) {
      this.row_active = Grid.Row.BOTTOM;
    } else {
      this.row_active = Grid.Row.TOP;
    }

    this.v.repaint(this);
  }


}

export default { Model };
*/
