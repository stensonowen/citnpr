
import cats from './categories.js';

const Dir = {
  LEFT: 0,
  RIGHT: 1,
};

class Prompt {
  constructor(msg, answer) {
    this.msg = msg;
    this.answer = answer;
  }
}

class Stage {
  constructor(num, catL, catR, len) {
    this.labelL = catL.name;
    this.labelR = catR.name;
    const prompts = catL.random_prompts(Dir.LEFT, len/2)
      .concat(catR.random_prompts(Dir.RIGHT, len - len/2));
    this.prompts = cats.shuffle(prompts);
  }
}


export default { Stage, Prompt, Dir };
