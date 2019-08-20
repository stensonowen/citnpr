
import cats from './categories.js';
import grid from './grid.js';

class Prompt {
  constructor(msg, answer) { 
    this.msg = msg;
    this.answer = answer; // Grid.Cell
  }
}

class Stage {
  constructor(dirs) {
    const g = grid.Grid.Cell;
    const p = {
      NE : dirs.NE.random_prompts(g.NE),
      NW : dirs.NW.random_prompts(g.NW),
      SW : dirs.SW.random_prompts(g.SW),
      SE : dirs.SE.random_prompts(g.SE),
    };
    const all = p.NE.concat(p.NW).concat(p.SW).concat(p.SE);
    this.prompts = cats.shuffle(all);
  }
  pop() { // ret Undefined on empty
    return this.prompts.pop();
  }
}


export default { Stage, Prompt };
