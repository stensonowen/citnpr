
class Category {
  constructor(name, values) {
    this.name = name;
    this.values = values;
  }
  random_prompts(dir, len) {
    const pool = shuffle(this.values).slice(1, len);
    return pool.map( v => new Prompt(v, dir) );
  }
}

class Opposites {
  constructor( catL, catR ) {
    this.left = catL;
    this.right = catR;
  }
}

const Politics = new Opposites(
  new Category(
    "Conservative",
    [ "c1"
    , "c2"
    ]),
  new Category(
    "Liberal",
    [ "lib1"
    , "lib2"
    ])
);

const Music = new Opposites(
  new Category(
    "Punk",
    [ "punk"
    , "also punk"
    ]),
  new Category(
    "Not punk",
    [ "not punk"
    , "not punk at all"
    ])
);

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
  constructor(catL, catR, len) {
    this.labelL = catL.name;
    this.labelR = catR.name;
    const prompts = catL.random_prompts(Dir.LEFT, len/2)
      .concat(catR.random_prompts(Dir.RIGHT, len - len/2));
    this.prompts = shuffle(prompts);
  }
}

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default { Stage, Politics, Music };
