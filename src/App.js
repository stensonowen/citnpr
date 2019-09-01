import React from 'react';
//import logo from './logo.svg';
import './App.css';

import sw from './stopwatch.js';
import view from './view.js';
import ctrl from './control.js';
import grid from './grid.js';
import model from './model.js';

const Grid = grid.Grid;

const IntroBanner = "Quickly classify the prompts as Left or Right";

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
        row_active : Grid.Row.TOP, // TODO highlight correctly
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

    this.data = {
      // arrays of milliseconds
      times_pro : [],
      times_con : [],
    };

  }

  choose(side) { // Grid.Column.LEFT
    if (this.state.display.banner.cont) {
      // banner covering
      return;
    }
    let display = this.state.display;
    display.side_highlight = side;
    this.setState({ display });

    const time = this.stopwatch.elapsed();
    this.stopwatch.reset();

    const p = this.model.promp;
    const correct = p.answer % side === 0;

    this.get_new_prompt();
    this.record(correct, !this.model.null, time);
  }

  /*
   * correct - boolean, whether they chose right
   * supports- boolean, iff Conservatism and Punk Rock are aligned
   * time    - number, ms it took them to choose
   */
  record(correct, supports, time) {
    const sanitized = Math.max(300, Math.min(time, 3000));
    if (correct) {
      if (supports) {
        this.data.times_pro.push(sanitized);
      } else {
        this.data.times_con.push(sanitized);
      }
    } else {
      // ???
      // TODO read the paper
      console.warn("TODO score mistakes ?");
    }
  }

  refresh_row_active() {
    const answer = this.model.promp.answer;
    this.state.board.row_active = null;
    if (answer % Grid.Row.TOP === 0) {
      console.log("Active is the top");
      this.state.board.row_active = Grid.Row.TOP;
    } else if (answer % Grid.Row.BOTTOM === 0) {
      console.log("Active is the bottom");
      this.state.board.row_active = Grid.Row.BOTTOM;
    }
  }

  get_new_prompt() {
    const success = this.model.next_prompt_in_stage();
    if (success === true) {
      this.refresh_row_active();
      this.stopwatch.start();
      return; // done
    }

    const next_stage = this.state.board.stage + 1;
    if (next_stage < this.num_stages) {
      this.state.board.stage = next_stage;
      this.model.make_stage(next_stage);
      this.refresh_row_active();
      this.set_banner({
        text : "Next stage: the categories have moved around",
        cont : "Continue",
      });
    } else {
      this.set_banner({
        text : this.give_it_to_me_straight_doc(),
        cont : "Restart",
      });
    }
  }

  give_it_to_me_straight_doc() {
    const sum = (a,b) => a+b;
    const pro = this.data.times_pro.reduce(sum, 0);
    const con = this.data.times_con.reduce(sum, 0);
    if (pro >= con) {
      // TODO fraction
      return "You are a libtard";
    } else {
      return "You might not be a libtard";
    }
  }

  set_prompt(p) {
    let state = this.state;
    state.board.prompt_text = p;
    this.setState(state);
  }

  set_time(elapsed) {
    let display = this.state.display;
    display.time_elapsed = elapsed;
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

  dismiss_banner() {
    const banner = this.state.display.banner;
    if (banner.cont === null) {
      // maybe a keystroke or sthg
      return;
    }
    else if (banner.cont === "Continue") {
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
    // TODO won't reset this.state
    this.view = new view.View(this, this.num_stages);
    this.model = new model.Model(this);
    this.state.board.stage = 0;
    this.model.make_stage(0);
    this.get_new_prompt();
    this.set_banner({ text: null, cont: null });
  }

  render() {
    return this.view.render(this.state.board, this.state.display);
  }
}

export default { App, };

