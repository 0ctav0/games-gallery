import React from "react";
import "./Minesweeper.scss";

// props.x, props.y - position of cell
function Cell(props) {
  return <div className="cell"></div>
}

/** 
  * @param props.col - number of columns; row - number of rows 
  */
function Minesweeper(props) {
  return (
    <div className="minesweeper"><div className="field">
    {[...Array(props.col).keys()].map((x) => {
      return <div key={x} className="row">
      {[...Array(props.row).keys()].map((y) => {
        return <Cell key={[x,y]} x={x} y={y}/>
      })}
      </div>
    })}
    </div></div>
  );
}

export default Minesweeper;