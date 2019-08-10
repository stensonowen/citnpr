
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
  Names  : { NE : 'NE', NW : 'NW', SE : 'SE', SW : 'SW' },
};

export default { Grid };
