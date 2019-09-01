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

    //this.model = new model.Model(this);

    this.state = {
      // model
      board : {
        row_active : Grid.Row.TOP,
        stage      : 0,
        labels     : {
          NE : "Conservatism",
          NW : "Progressivism",
          SW : "Punk Rock",
          SE : "Not Punk",
        },
        prompt_text : null,
      },
      // view
      display : {
        side_highlight : null,
        time_elapsed   : "none",
        banner : {
          text : "text", // text to display instead of prompt
          cont : "cont", // button to press
        },
      },
    };

    //this.model.make_stage(0);
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

    //const correct = (side 

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

  set_banner(banner) {
    let state = this.state;
    state.display.banner = banner;
    this.setState(state);
    console.log(banner);
  }

  on_banner_dismiss() {
    /*
    const button = this.state.display.banner.cont;
    if (button === "Start") {
      // start
    }
    */
    // For now, the only thing we do is reset
    this.model = new model.Model(this);
    this.model.make_stage(0);
    this.set_banner({ text: null, cont: null });
  }

  render() {
    return this.view.render(this.state.board, this.state.display);
  }
}

export default { App, };

