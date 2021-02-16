import React from "react";
import PropTypes from "prop-types";


// props.x, props.y - position of cell
class Cell extends React.Component {

  static propTypes = {
    cell: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    onContextMenu: PropTypes.func.isRequired,
  }

  render() {
    const colors = {
      1: "#22a", 2: "#a22", 3: "#2a2", 4: "#2aa", 5: "#a2a", 6: "#fa2", 7: "yellow", 8: "#e2a"
    };
    return <div
            className={this.props.cell.getClasses()}
            onClick={this.props.onClick}
            onContextMenu={this.props.onContextMenu}
            style={{color : colors[this.props.cell.minesAroundNumber]}}>
         {this.props.cell.minesAroundNumber}</div>;
  }
}

export default Cell;
