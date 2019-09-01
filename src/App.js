import React from 'react';
//import logo from './logo.svg';
import './App.css';

import sw from './stopwatch.js';
import view from './view.js';
import ctrl from './control.js';
import grid from './grid.js';
import model from './model.js';

const Grid = grid.Grid;

const IntroBanner = "TODO banner start";

class App extends React.Component {
  constructor(props) {
    super(props);
    // constants
    this.num_stages = 2;
    this.stopwatch = new sw.Stopwatch(this);

    this.view = new view.View(this, this.num_stages);
    ctrl.register_keystrokes(this);

    this.state = {
      // model
      board : {
        row_active : Grid.Row.TOP,
        stage      : 0,
        labels     : {
          NE : "Political Ideology 2",
          NW : "Political Ideology 1",
          SW : "Cultural Ideology 1",
          SE : "Cultural Ideology 2",
        },
        prompt_text : null,
      },
      // view
      display : {
        side_highlight : null,
        time_elapsed   : "00:00",
        banner : {
          text : IntroBanner, // text over prompt
          cont : "Start",     // button label
        },
      },
    };

  }

  choose(side) { // Grid.Column.LEFT
    let display = this.state.display;
    display.side_highlight = side;
    this.setState({ display });

    this.stopwatch.reset();

    const correct = 0;
    // TODO check if right

    this.get_new_prompt();
  }

  get_new_prompt() {
    const success = this.model.next_prompt_in_stage();
    if (success === true) {
      // done
      this.stopwatch.start();
      return;
    }

    const next_stage = this.state.board.stage + 1;
    if (next_stage < this.num_stages) {
      this.state.board.stage = next_stage;
      this.model.make_stage(next_stage);
      const banner = {
        text : "Next stage - Note categories have moved around",
        cont : "Continue",
      };
      this.set_banner(banner);
    } else {
      const banner = {
        text : "All done. TODO math",
        cont : "Restart",
      };
      this.set_banner(banner);
    }
  }

  get_new_prompt_() {
    const more = this.model.next_prompt();
    if (more === false) {
      const banner = {
        text : "All done. TODO math",
        cont : "Restart",
      };
      this.set_banner(banner);
    } else {
      this.stopwatch.start();
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

  set_banner(banner) { // state.display.banner
    let state = this.state;
    state.display.banner = banner;
    this.setState(state);
  }

  on_banner_dismiss() {
    const banner = this.state.display.banner;
    if (banner.cont === "Continue") {
      // next stage
      const empty = {
        text : null,
        cont : null,
      };
      this.set_banner(empty);
      this.get_new_prompt();
    } else {
      this.reset();
    }
  }

  reset() {
    this.model = new model.Model(this);
    this.model.make_stage(0);
    this.set_banner({ text: null, cont: null });
    this.get_new_prompt();
  }

  render() {
    return this.view.render(this.state.board, this.state.display);
  }
}

export default { App, };

