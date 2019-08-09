import React from 'react';
import logo from './logo.svg';
import './App.css';
import sw from './stopwatch.js';
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
      stopwatch : {
        last_update : Date.now(),
        elapsed_ms  : 0,
      },
    };

    // register keypresses
    const board = this;
    window.addEventListener('keydown', function(e) {
      if (e.metaKey || e.altKey || e.ctrlKey || e.repeat) { return; }
      else if (e.code === "KeyQ") { board.selectSide(Grid.Column.LEFT);  }
      else if (e.code === "KeyP") { board.selectSide(Grid.Column.RIGHT); }
    });
    window.addEventListener('mouseup', (_) => {
      board.highlightSide(null);
    });
    window.addEventListener('keyup', (_) => board.highlightSide(null) );

    // register timer callbacks
    ["start_stopwatch", "reset_stopwatch"].forEach((f) => {
      this[f] = this[f].bind(this);
    });

    //this.start_stopwatch();
  }

  highlightSide(side) { // Grid.Column
    let newstate = this.state;
    newstate.side_highlight = side;
    this.setState(newstate);

    this.reset_stopwatch();
  }

  selectSide(side) { // Grid.Column
    this.highlightSide(side);
    this.state.row_active = (this.state.row_active === 3) ? 5 : 3;
    console.log(" select " + side );
    this.reset_stopwatch();
    //this.start_stopwatch();
  }

  set_stopwatch(target) {
    let newstate = this.state;
    newstate.stopwatch = {
      last_update : Date.now(),
      elapsed_ms  : target,
    };
  }

  incr_stopwatch(delta) {
    const target = this.state.stopwatch.elapsed_ms + delta;
    this.set_stopwatch(target);
  }

  update_stopwatch() {
    console.log(this);
    let newstate = this.state;
    let oldstopwatch = newstate.stopwatch;
    newstate.stopwatch = {
      last_update : Date.now(),
      elapsed_ms  : Date.now() - oldstopwatch.last_update + oldstopwatch.elapsed_ms,
    };
    this.setState(newstate);
    //this.incr_stopwatch(this.state.stopwatch.last_update - Date.now());
  }

  start_stopwatch() {
    this.set_stopwatch(0);
    this.timer = setInterval(this.update_stopwatch, 100);
  }

  reset_stopwatch() {
    clearInterval(this.timer);
  }

  get_stopwatch_elapsed() {
    const total_millis = this.state.stopwatch.elapsed_ms;
    const seconds = Math.floor(total_millis / 1000);
    const millis = total_millis - seconds * 1000;
    console.log(total_millis);
    console.log(seconds);
    console.log(millis);
    return {
      seconds : (seconds > 9 ? '' : '0') + seconds,
      millis  : (millis + '000').substr(0, 3),
    };
  }

  renderStopwatch() {
    const { seconds, millis } = this.get_stopwatch_elapsed();
    console.log(seconds + "_" + millis);
    return (
      <div className="stopwatch">
        <span>{ seconds }</span>
        <span>:{ millis }</span>
      </div>
    );
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

  render() {
    const circleRow = (row) => this.state.row_active === row;
    const circledStyle = (row) => circleRow(row) ? "circled" : "";
    const time = "00:00";
    return (
      <div>

      <div className="stageLabel">
        Stage { this.state.stage + 1 } of { this.num_stages }
      </div>

      <table className="gameboard">
      <tbody>

        <tr className={ circledStyle(Grid.Row.TOP) }>
          { this.renderLabel( Grid.Names.NW ) }
          { this.renderLabel( Grid.Names.NE ) }
        </tr>
        <tr className={ circledStyle(Grid.Row.BOTTOM) }>
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
      <div className="stopwatch" id="timer">
        { this.renderStopwatch() }
      </div>

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
