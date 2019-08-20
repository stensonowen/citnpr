import React from 'react';
//import logo from './logo.svg';
import './App.css';

import sw from './stopwatch.js';
import view from './view.js';
import ctrl from './control.js';
import grid from './grid.js';
import model from './model.js';

const Grid = grid.Grid;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.view = new view.View(this);
    ctrl.register_keystrokes(this);

    // constants
    this.num_stages = 2;
    this.stopwatch = new sw.Stopwatch(this);

    this.model = new model.Model(this);

    this.state = {
      // model
      board : {
        row_active : Grid.Row.TOP,
        stage      : 0,
        labels     : {
          NE : "Cccc",
          NW : "Llll",
          SW : "Pppp",
          SE : "Nnn Pppp",
        },
        prompt_text : null,
      },
      // view
      display : {
        side_highlight : null,
        time_elapsed   : "none",
      },
    };

    this.model.make_stage(0);
  }

  choose(side) { // Grid.Column.LEFT
    let display = this.state.display;
    display.side_highlight = side;
    this.setState({ display });

    const more = this.model.next_prompt();
    if (more === false) {
      console.log("DONE");
      this.set_prompt("DONE");
    }

    if (side === Grid.Column.LEFT) {
      this.stopwatch.start();
    } else if (side === Grid.Column.RIGHT) {
      this.stopwatch.reset();
    }
  }

  set_prompt(p) {
    let state = this.state;
    state.board.prompt_text = p;
    this.setState(state);
  }

  set_time(elapsed) {
    let display = this.state.display;
    display.time_elapsed = elapsed || "none";
    this.setState({ display });
  }

  set_labels(labels) {
    // 'NE' : "text", ...
    this.state.board.labels = labels;
  }

  render() {
    return this.view.render(this.state.board, this.state.display);
  }
}

export default { App, };

