import React from "react";


// props.x, props.y - position of cell
class Cell extends React.Component {

  render() {
    const colors = {
      1: "blue", 2: "red", 3: "green", 4: "yellow", 5: "purple", 6: "aqua", 7: "orange", 8: "pink"
    };
    return <div 
            className={this.props.cell.getClasses()}
            onClick={() => {this.props.onClick()}}
            onContextMenu={this.props.onContextMenu}
            style={{color : colors[this.props.cell.minesAroundNumber]}}>
         {this.props.cell.minesAroundNumber}</div>
  }
}

export default Cell;