
import React from 'react';

import grid from './grid.js';
const Grid = grid.Grid;


function Button(props) {
  return (
    <th>
    <button className="button" 
      onMouseDown={props.onDown} onMouseUp={props.onUp}
    >
    Press '{props.key_}'
    </button>
    </th>
  );
}

function Label(props) {
  const style = props.loud ? "labelLoud" : "labelQuiet";
  return (
    <td>
    <span className={ style }>
    { props.name }
    </span>
    </td>
  );
}

class View {
  constructor(app, num_stages = 7) {
    this.num_stages = num_stages;
    this.app = app; // model + controller
  }

  clear_selection() {
    let display = this.app.state.display;
    display.side_highlight = null;
    this.app.setState({ display });
  }

  renderButton(column) { // LEFT
    const key = column === Grid.Column.LEFT ? 'q' : 'p';
    const onUp = this.clear_selection.bind(this);
    const onDown = () => this.app.choose(column);
    return (
      <Button key_={key} onDown={onDown} onUp={onUp} />
    );
  }

  renderBanner(banner) { // app.state.display.banner
    return (
      <button>
      { banner.cont }
      </button>
    );
  }

  renderBannerOrPrompt() {
    const b = this.app.state.display.banner;
    const p = (
      <div className="prompt" id="prompt">
      { this.fmt_prompt() }
      </div>
    );
    const reset_cb = this.app.dismiss_banner.bind(this.app);
    if (b && b.text && b.cont) {
      return (
        <div className="bannerButton">
        { p }
        <button
          className="bannerButton"
          onClick={reset_cb}
        > { b.cont } </button>
        </div>
      );
    } else {
      return p;
    }
  }

  fmt_prompt() {
    const b = this.app.state.display.banner.text;
    if (b) { return b; }

    const p = this.app.state.board.prompt_text;
    if (p === null) {
      return "<null>"; // ?
    }
    return p;
  }

  render(board, display) {
    const lc = board.row_active * display.side_highlight;
    const G = Grid.Cell;
    const L = board.labels;
    const dark = (this.app.state.display.banner.cont != null);
    const darkened = dark ? "darkened" : "";

    return (
      <div>

      <div className="stageLabel">
      Stage { board.stage + 1 } of { this.num_stages }
      </div>

      <div className={darkened}>
      <table className="gameboard">
      <tbody>
      <tr>
      <Label name={L.NW} loud={G.NW===lc} />
      <Label name={L.NE} loud={G.NE===lc} />
      </tr>
      <tr>
      <Label name={L.SW} loud={G.SW===lc} />
      <Label name={L.SE} loud={G.SE===lc} />
      </tr>
      <tr>
      { this.renderButton(Grid.Column.LEFT) }
      { this.renderButton(Grid.Column.RIGHT) }
      </tr>
      </tbody>
      </table>
      </div>

      <div className="timer">
      { display.time_elapsed || "⏱️" /* ? */ }
      </div>

      { this.renderBannerOrPrompt() }

      </div>
    );
  }
}


export default { View };

