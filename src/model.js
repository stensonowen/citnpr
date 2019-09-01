

//import grid from './grid.js';
import cats from './categories.js';
import stage from './stage.js';

//const Grid = grid.Grid;

const LEN = 1;

class Model {
  constructor(app) {
    this.app = app;
    this.stage = null;
    this.cells = {};
    this.promp = null;
  }

  make_stage(num_stage) { // -> Stage
    this.cells = {
      NE : cats.Politics.Conservatism,
      NW : cats.Politics.Progressivism,
    };
    const [punk, notpunk] = [cats.Music.Punk, cats.Music["Not Punk"]];
    if (num_stage === 0) {
      this.cells["SW"] = punk;
      this.cells.SE = notpunk;
    } else if (num_stage === 1) {
      this.cells.SW = notpunk;
      this.cells.SE = punk;
    } else {
      console.error("Error - invalid stage - ", num_stage);
    }
    this.stage = new stage.Stage(this.cells, LEN);
    this.app.set_labels({
      NE : this.cells.NE.name,
      NW : this.cells.NW.name,
      SW : this.cells.SW.name,
      SE : this.cells.SE.name,
    });
  }

  next_prompt_in_stage() {
    const p = this.stage.pop();
    if (p != undefined) {
      // success
      this.promp = p;
      this.app.set_prompt(p.msg);
      return true;
    }
    // stage is done
    return false;
  }

  next_prompt() { // -> prompt
    const p = this.stage.pop();
    if (p === undefined) {
      const new_num = this.app.state.board.stage + 1;
      if (new_num < this.app.num_stages) {
        this.make_stage(new_num);
        this.app.state.board.stage = new_num;
        return this.next_prompt();
      } else {
        return false; // done
      }
    }
    this.promp = p;
    this.app.set_prompt(p.msg);
    return true;
  }

  done() { // -> bool
  }


}

export default { Model };

