import React from 'react';
import logo from './logo.svg';
import './App.css';
import cat from './categories.js';

function Label(props, loud=false) {
  return (
    <td className={props.className}>
      { props.name }
    </td>
  );
}

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
  //RowMult: 13,
  Row    : { TOP  : 3, BOTTOM : 5 },
  Column : { LEFT : 7, RIGHT  : 11},
  Cell   : { NE : 33, NW : 21, SE : 55, SW : 35, },
  Names  : { NE : 'NE', NW : 'NW', SE : 'SE', SW : 'SW' },
  Index  : { 33 : 'NE', 21 : 'NW', 55 : 'SE', 35 : 'SW' },
};

class Board extends React.Component {

  constructor(props) {
    super(props);

    const C = Grid.Cell;
    const [NE, NW, SW, SE] = [C.NE, C.NW, C.SW, C.SE];
    this.state = {
      row_active     : Grid.Row.TOP,
      side_highlight : null, // or Grid.Column
      stage          : 0,
      labels : {
        NE : "Cons",
        NW : "Libs",
        SW : "Punk",
        SE : "Not punk",
      },
    };
  }

  renderLabel(cell) { // int
    const label = this.state.labels[cell];

    // lol
    let className = "labelQuiet";
    if (cell === Grid.Names.NW
      && this.state.row_active === Grid.Row.TOP
      && this.state.side_highlight === Grid.Column.LEFT)
    {
      className = "labelLoud";
    }
    else if (cell === Grid.Names.NE
      && this.state.row_active === Grid.Row.TOP
      && this.state.side_highlight === Grid.Column.RIGHT)
    {
      className = "labelLoud";
    }
    else if (cell === Grid.Names.SE
      && this.state.row_active === Grid.Row.BOTTOM
      && this.state.side_highlight === Grid.Column.RIGHT)
    {
      className = "labelLoud";
    }
    else if (cell === Grid.Names.SW
      && this.state.row_active === Grid.Row.BOTTOM
      && this.state.side_highlight === Grid.Column.LEFT)
    {
      className = "labelLoud";
    }

    return (
      <Label
        name={label}
        className={className}
      />
    );
  }

  highlightSide(side) { // Grid.Column.*
    let newstate = this.state;
    newstate.side_highlight = side;
    this.setState(newstate);
  }

  selectLeft() {
    this.highlightSide(Grid.Column.LEFT);
  }

  selectRight() {
    this.highlightSide(Grid.Column.RIGHT);
  }

  render() {
    return (
      <div>
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
          <th>
            <button className="button" id="buttonQ" onClick={ () => this.selectLeft() }>
              Press 'q'
            </button>
          </th>
          <th>
            <button className="button" id="buttonP" onClick={ () => this.selectRight() }>
              Press 'p'
            </button>
          </th>
        </tr>

      </tbody>
      </table>

      <div className="prompt" id="prompt"> proimtp </div>
      </div>
    )
  }

  reset(cat1, cat2) {
    //this.state.
  }

}

function Category(label) {
  return (
    <td>
    </td>
  )
}

function renderStage(stage) {
  return (
    <div>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          lol Learn React
        </a>
      </header>
    </div>
  );
}

export default { App, Board };
