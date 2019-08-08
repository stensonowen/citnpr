import React from 'react';
import logo from './logo.svg';
import './App.css';
import cat from './categories.js';

function Label(props, loud=false) {
  const className = loud ? "labelLoud" : "labelQuiet";
  return (
    <td className={className}>
      { props.name }
    </td>
  );
}

/*
class Label extends React.Component {
  //constructor(name, loud=false) {
    //this.name = name;
  constructor(props) {
    super(props);
    //this.state = { loud };
  }

  render(loud2) {
    //const className = this.state.loud ? "labelLoud" : "labelQuiet";
    const className = (this.state.loud || loud2) ? "labelLoud" : "labelQuiet";
    return (
      <td className={className}>
      { this.name }
      </td>
    )
  }
}
*/

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
  Index  : { 33 : 'NE', 21 : 'NW', 55 : 'SE', 35 : 'SW' },
  //findN : function(col, row) { return col*row; },
  //findC : function(col, row) { return Grid.Cell[Grid.findN(col, row)]; },
};

class Board extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      row_active     : Grid.Row.TOP,
      side_highlight : null, // or Grid.Column
      stage          : 0,
    };

    this.state = {
      labels : {
        21 : "Cons",
        Grid.Cell.NW : "Libs",
        Grid.Cell.SW : "Punk",
        Grid.Cell.SE : "Not punk",
      },
    };
    /*
    this.state = {
      labelNE : new Label("Cons"), // q1
      labelNW : new Label("Libs"), // q2
      labelSW : new Label("Punk"), // q3
      labelSE : new Label("Not Punk"), // q4
    };
    */
    //this.labelNE = new Label("Cons"); // q1
    //this.labelNW = new Label("Libs"); // q2
    //this.labelSW = new Label("Punk"); // q3
    //this.labelSE = new Label("Not Punk"); // q4
    //this.labelNE = "Con";
  }

  renderLabel(cell) { // int
    const label = this.state.labels[cell];
    return (
      <Label
        name={label}
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
    //const highlightNW = (this.state.row_active === Grid.Row.TOP && this.state.side_highlight === Grid.Column.LEFT);
    //this.labelNE.state.loud = (this.state.row_active === Grid.Row.TOP && this.state.side_highlight === Grid.Column.RIGHT);
    //this.labelNE.setState( { loud : (this.state.row_active === Grid.Row.TOP && this.state.side_highlight === Grid.Column.RIGHT) });
    return (
      <div>
      <table className="gameboard">
      <tbody>

        <tr>
          { this.renderLabel( Grid.Cell.NW ) }
          { this.renderLabel( Grid.Cell.NE ) }
        </tr>
        <tr>
          { this.renderLabel( Grid.Row.BOTTOM, Grid.Column.LEFT ) }
          { this.renderLabel( Grid.Row.BOTTOM, Grid.Column.RIGHT ) }
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
