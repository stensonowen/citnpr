
import stage from './stage.js';

class Category {
  constructor(name, values) {
    this.name = name;
    this.values = values;
  }
  random_prompts(dir, len) {
    const pool = shuffle(this.values).slice(1, len);
    return pool.map( v => new stage.Prompt(v, dir) );
  }
}

const Politics = {
  Conservatism : new Category( "Conservative", [
    "The nuclear family",
    "Defunding public radio",
    "Facts and Logic™",
    "Supporting the Military",
    "Supporting the Police",
    "Paul Ryan",
    "William F Buckley",
    "As a libertarian...",
    "Voting how your priest says to",
    ]),
  Liberalism: new Category( "Liberal", [
    "Public art",
    "LGBTQ+ Community",
    "Reproductive rights",
    "Unions",
    "Social welfare",
    "Environmentalism",
    ])
};

const Music = {
  Punk : new Category( "Punk", [
    "Anti-establishment",
    "Drugs",
    "the Anarchy symbol",
    "Subversive art",
    "Weird sex stuff",
    "Deliberately offensive t-shirts",
    "Rebellion",
    "Nihilism",
    "Colorful hair",
    "zines",
    "Throwing milkshakes at Nazis",
    ]),
  "Not Punk" : new Category( "Not punk", [
    "Longstanding social hierarchies",
    "William F Buckley's haircut",
    "Conformity",
    "Authoritarianism",
    "Greed",
    "Selling Out",
    "Consumerism",
    "Corporatism",
    ])
};


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

export default { Category, Politics, Music, shuffle };
