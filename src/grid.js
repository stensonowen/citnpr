
/* Grid.Row * Grid.Column
 *  using primes because I'm noided about this type system
 *
 *      +----+----+
 *      | 21 | 33 |
 *      +----+----+
 *      | 35 | 55 |
 *      +----+----+
 */
const Grid = {
  Row    : { TOP  : 3, BOTTOM : 5 },
  Column : { LEFT : 7, RIGHT  : 11},
  Cell   : { NE : 33, NW : 21, SE : 55, SW : 35, },
  Vals   : { 33 : 'NE', 21 : 'NW', 55 : 'SE', 35 : 'SW' },
  Names  : { NE : 'NE', NW : 'NW', SE : 'SE', SW : 'SW' },
};

export default { Grid };
