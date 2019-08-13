import React from 'react';
//import logo from './logo.svg';
import './App.css';

import sw from './stopwatch.js';
import view from './view.js';
import grid from './grid.js';

const Grid = grid.Grid;


function register_keystrokes(board) {
  const C = Grid.Column;
  window.addEventListener('keydown', function(e) {
    if (e.metaKey || e.altKey || e.ctrlKey || e.repeat) { return; }
    else if (e.code === "KeyQ") { board.choose(C.LEFT); }
    else if (e.code === "KeyP") { board.choose(C.RIGHT); }
  });
  const clear = (_) => board.view.clear_selection();
  window.addEventListener('mouseup', clear);
  window.addEventListener('keyup',   clear);
}



class App extends React.Component {
  constructor(props) {
    super(props);
    this.view = new view.View(this);
    register_keystrokes(this);

    // constants
    this.num_stages = 7;
    this.stopwatch = new sw.Stopwatch(this);


    this.state = {

      // controlled by the Model
      board : {
        row_active : Grid.Row.TOP,
        stage      : 0,
        labels     : {
          NE : "Cccc",
          NW : "Llll",
          SW : "Pppp",
          SE : "Nnn Pppp",
        },
      },

      // controlled by the View
      display : {
        side_highlight : null,
        time_elapsed   : null,
      },

    };

  }

  choose(side_highlight) { // LEFT
    console.log("chose ", side_highlight);
    this.setState({ display : { side_highlight }, });
    if (side_highlight === Grid.Column.LEFT) {
      console.log("sw start");
      this.stopwatch.start();
    } else if (side_highlight === Grid.Column.RIGHT) {
      console.log("sw stop");
      console.log(this.state.display.time_elapsed);
      this.stopwatch.reset();
    }
  }

  set_time(time_elapsed) {
    this.setState({ display : { time_elapsed } });
  }

  render() {
    return this.view.render(this.state.board, this.state.display);
  }
}

export default { App, };

