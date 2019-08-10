
import React from 'react';

import model from './model.js'; // don't need ?
import ctrl from './control.js';
import grid from './grid.js';
const Grid = grid.Grid;

class View {
  constructor(m) {
    // consts
    this.num_stages = 7;

    this.state = {
      // data
      model          : m,
      // display
      side_highlight : null,
    }
  }

  highlight_side(side_highlight) {
    this.setState({ side_highlight });
  }

  clear_highlight() {
    this.highlight_side(null);
  }

  repaint(model) {
    this.setState({ model });
  }

  render() {
  }

  renderLabel(cell) { // 'NW'
    const label = this.state.model.labels[cell];
    const [row,col] = [this.state.model.row_active,this.state.side_highlight];
    const loud = Grid.Cell[cell] === row * col;
    const style = loud ? "labelLoud" : "labelQuiet";
    return (
      <td>
      <span className={ style }>
      { label }
      </span>
      </td>
    );
  }

  renderButton(column) { // LEFT
    const label = column === Grid.Column.LEFT ? 'q' : 'p';
    return (
      <th>
      <button className="button" id={label}
        onMouseUp={   () => this.c.on_select( column )  }
        onMouseDown={ () => this.c.on_deselect() }
      >
      Press '{ label }'
      </button>
      </th>
    );
  }

  render() {
    return (
      <div>

      <div className="stageLabel">
      Stage { this.state.model.stage + 1 } of { this.num_stages }
      </div>

      <table className="gameboard">
      <tbody>
      <tr>
      { this.renderLabel( Grid.Names.NW ) }
      { this.renderLabel( Grid.Names.NE ) }
      </tr>
      <tr>
      { this.renderLabel( Grid.Names.SW ) }
      { this.renderLabel( Grid.Names.SE ) }
      </tr>
      <tr>
      { this.renderButton( Grid.Column.LEFT ) }
      { this.renderButton( Grid.Column.RIGHT) }
      </tr>
      </tbody>
      </table>

      <div className="prompt" id="prompt">
      p r o m t p
      </div>

      </div>
    );
  }

}

//function Label(props) {
//  return (
//    <td>
//      <span className={props.className}>
//        { props.name }
//      </span>
//    </td>
//  );
//}

export default { View };

