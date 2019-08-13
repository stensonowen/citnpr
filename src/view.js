
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
    console.log("up");
    this.app.setState({ display : { side_highlight : null } });
  }

  renderButton(column) { // LEFT
    const key = column === Grid.Column.LEFT ? 'q' : 'p';
    const onUp = this.clear_selection.bind(this);
    const onDown = () => this.app.choose(column);
    return (
      <Button key_={key} onDown={onDown} onUp={onUp} />
    );
  }

  render(board, display) {
    const lc = board.row_active * display.side_highlight;
    const G = Grid.Cell;
    const L = board.labels;

    return (
      <div>

      <div className="stageLabel">
      Stage { board.stage + 1 } of { this.num_stages }
      </div>

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

      <div className="timer">
      { display.time_elapsed }
      </div>

      <div className="prompt" id="prompt">
      p r o m t p
      </div>

      </div>
    );
  }
}


export default { View };

