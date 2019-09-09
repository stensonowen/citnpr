
import cats from './categories.js';
import stage from './stage.js';

const LEN = 6;

class Model {
  constructor(app) {
    this.app = app;
    this.stage = null;
    this.cells = {};
    this.promp = null;
    this.null = null; // whether the null hypothesis is pro or con
  }

  make_stage(num_stage) {
    this.cells = {
      NE : cats.Politics.Conservatism,
      NW : cats.Politics.Liberalism,
    };
    const [punk, notpunk] = [cats.Music.Punk, cats.Music["Not Punk"]];
    if (num_stage === 0) {
      this.cells["SW"] = punk;
      this.cells.SE = notpunk;
      // Punk and Liberalism on left
      this.null = false;
    } else if (num_stage === 1) {
      this.cells.SW = notpunk;
      this.cells.SE = punk;
      // Punk and Conservatism on right
      this.null = true;
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
    if (p !== undefined) {
      // success
      this.promp = p;
      this.app.set_prompt(p.msg);
      return true;
    }
    // stage is done
    return false;
  }

}

export default { Model };

