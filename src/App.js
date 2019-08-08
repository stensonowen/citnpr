import React from 'react';
import logo from './logo.svg';
import './App.css';
//import cat from './categories.js';

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

function Label(props) {
  return (
    <td>
      <span className={props.className}>
        { props.name }
      </span>
    </td>
  );
}

class Board extends React.Component {

  constructor(props) {
    super(props);

    // constants
    this.num_stages = 7;

    // state
    this.state = {
      row_active     : Grid.Row.TOP,
      side_highlight : null,    // Grid.Column
      stage          : 0,
      labels : {
        NE : "Cons",
        NW : "Libs",
        SW : "Punk",
        SE : "Not punk",
      },
    };

    // register keypresses
    const board = this;
    window.addEventListener('keydown', function(e) {
      if (e.metaKey || e.altKey || e.ctrlKey) { return; }
      else if (e.code === "KeyQ") { board.selectSide(Grid.Column.LEFT);  }
      else if (e.code === "KeyP") { board.selectSide(Grid.Column.RIGHT); }
    });
    window.addEventListener('keyup', (_) => board.highlightSide(null) );

  }

  highlightSide(side) { // Grid.Column
    let newstate = this.state;
    newstate.side_highlight = side;
    if (side != null) {
      // just for testing
      newstate.row_active = (newstate.row_active === 3) ? 5 : 3;
    }
    this.setState(newstate);
  }

  selectSide(side) { // Grid.Column
    this.highlightSide(side);
    console.log(" select " + side );
  }

  renderLabel(cell) { // e.g. 'NW'
    const idxLoud = this.state.row_active * this.state.side_highlight;
    const isLoud = Grid.Cell[cell] === idxLoud;
    return (
      <Label
        name={ this.state.labels[cell] }
        className={ isLoud ? "labelLoud" : "labelQuiet" }
      />
    );
  }

  renderButton(column, label) { // Grid.Column
    const id = "button_" + label;
    return (
      <th>
        <button
          className="button"
          id={id}
          onMouseDown={ () => this.selectSide(column) }
          onMouseUp={   () => this.highlightSide(null)   }
        >
        Press '{label}'
        </button>
      </th>
    );
  }

  //const circleTop = this.state.row_active === Grid.Row.TOP;
  //const circleBottom = this.state.row_active === Grid.Row.TOP;
  render() {
    const circleRow = (row) => this.state.row_active === row;
    return (
      <div>

      <div className="stageLabel">
        Stage { this.state.stage + 1 } of { this.num_stages }
      </div>

      <table className="gameboard">
      <tbody>

        <tr className={ circleRow(Grid.Row.TOP) && "circled" }>
          { this.renderLabel( Grid.Names.NW ) }
          { this.renderLabel( Grid.Names.NE ) }
        </tr>
        <tr className={ circleRow(Grid.Row.BOTTOM) && "circled" }>
          { this.renderLabel( Grid.Names.SW ) }
          { this.renderLabel( Grid.Names.SE ) }
        </tr>

        <tr>
          { this.renderButton(Grid.Column.LEFT,  "q") }
          { this.renderButton(Grid.Column.RIGHT, "p") }
        </tr>

      </tbody>
      </table>

      <div className="prompt" id="prompt"> proimtp </div>
      </div>
    )
  }

  reset(cat1, cat2) {
    console.log("lol");
  }

}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> Edit <code>src/App.js</code> and save to reload.  </p>
        <a className="App-link"
           href="https://reactjs.org"
           target="_blank"
           rel="noopener noreferrer" >
          lol Learn React
        </a>
      </header>
    </div>
  );
}

export default { App, Board };
