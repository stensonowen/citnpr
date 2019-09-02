
import React from 'react';

import grid from './grid.js';
const Grid = grid.Grid;


function Button(props) {
  return (
    <th>
    <button className="button" 
      onMouseDown={props.onDown} onMouseUp={props.onUp}
    >
    Press '<code>{props.key_}</code>'
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

function Prompt(props) {
  const style = props.style;
  return (
    <div className={style} id={style} >
    { props.text }
    </div>
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
    this.app.refresh_row_active();
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

  renderBanner() {
    const b = this.app.state.display.banner;
    const reset_cb = this.app.dismiss_banner.bind(this.app);
    return (
      <div className="bannerButton">
      <Prompt style="banner" text={ b.text } />
      <button className="bannerButton" onClick={reset_cb}>
      { b.cont }
      </button>
      </div>
    );
  }

  renderPrompt() {
    const pt = this.app.state.board.prompt_text;
    return (
      <Prompt style="prompt" text={ pt } />
    );
  }

  renderBannerOrPrompt() {
    const b = this.app.state.display.banner;
    if (b.text && b.cont) {
      return this.renderBanner();
    } else {
      return this.renderPrompt();
    }
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

