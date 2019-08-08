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

    this.num_stages = 7;
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
  }

  renderLabel(cell) { // e.g. 'NW'
    const is_loud = (cell) => {
      const idxLoud = this.state.row_active * this.state.side_highlight;
      return Grid.Cell[cell] === idxLoud;
    };

    return (
      <Label
        name={ this.state.labels[cell] }
        className={ is_loud(cell) ? "labelLoud" : "labelQuiet" }
      />
    );
  }

  highlightSide(side) { // Grid.Column
    let newstate = this.state;
    newstate.side_highlight = side;
    if (side != null) { newstate.row_active = (newstate.row_active === 3) ? 5 : 3; } // just for testing
    this.setState(newstate);
  }

  renderButton(column, label) { // Grid.Column
    const id = "button_" + label;
    return (
      <th>
        <button
          className="button"
          id={id}
          onMouseDown={ () => this.highlightSide(column) }
          onMouseUp={   () => this.highlightSide(null)   }
        >
        Press '{label}'
        </button>
      </th>
    );
  }

  render() {
    return (
      <div>

      <div className="stageLabel">
        Stage { this.state.stage + 1 } of { this.num_stages }
      </div>

      <table className="gameboard">
      <tbody>

        <tr>
          { this.renderLabel( Grid.Names.NW ) }
          { this.renderLabel( Grid.Names.NE ) }
        </tr>
        <tr>
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
