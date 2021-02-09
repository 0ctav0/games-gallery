import React from "react";
import "./Minesweeper.scss";
import Cell from "./Cell.js";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



const EMPTY = 0;
const MINE = 1;
class CellModel {

  constructor(value) {
    this.value = value;
    this.opened = false;
    this.minesAroundNumber = "";
  }

  hasMine() {
    return this.value === MINE;
  }

  isEmpty() {
    return this.value === EMPTY;
  }

  isOpened() {
    return this.opened;
  }

  getClasses() {
    return "cell " + (this.isOpened() ? "opened " : "") + (this.hasMine() ? "mine " : "");
  }
}

/** 
  * @param props.col - number of columns; row - number of rows 
  */
class Minesweeper extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mineField : this.initMineField(props)
    };
  }

  initMineField(props) {
    let mineField = [];
    for (let x = 0; x < props.col; x++) {
      let column = new Array(props.row).fill(new CellModel(EMPTY));
      mineField.push(column);
    }

    let i = 0;
    while (i < props.minesCount) {
      const randomX = randomInt(0, props.col - 1);
      const randomY = randomInt(0, props.row - 1);
      if (mineField[randomX][randomY].isEmpty()) {
        mineField[randomX][randomY] = new CellModel(MINE);
        i++;
      }
    }

    return mineField;
  }

  hasMine(x, y) {
    return this.state.mineField[x][y].hasMine();
  }

  isOpened(x, y) {

  }

  goAround(originX, originY) {
    const maxX = Math.min(originX+1, this.props.col-1);
    const maxY = Math.min(originY+1, this.props.row-1);
    let minesCount = 0;
    // console.log("begin ", maxX, maxY, originX);
    for (let x = Math.max(0,originX-1); x <= maxX; x++) {
      for (let y = Math.max(0,originY-1); y <= maxY; y++) {
        // console.log(x, " - ", y, " = ", this.state.mineField[x][y]);
        if (x === originX && y === originY) continue;
        const cell = this.state.mineField[x][y];
        if (cell.hasMine()) {
          minesCount++;
        } else if (!cell.isOpened()) {
          cell.opened = true;
          this.goAround(x,y);
        }
        cell.minesAroundNumber = minesCount;
        // console.log("minesCount", minesCount, this, this.props.c);
      }
    }
  }

  openAround(cell, originX, originY) {
    console.log("openAround");
    console.log(this.props.children);
    console.log(React.Children.count(this.props.children));
    this.goAround(originX, originY);


    // const minesAroundNumber = minesCount > 0 ? minesCount.toString() : "";
    // cell.setState({minesAroundNumber});
  }

  render() {
    return (
      <div className="minesweeper"><div className="field">
      {[...Array(this.props.col).keys()].map((x) => {
        return <div key={x} className="col">
        {[...Array(this.props.row).keys()].map((y) => {
          return <Cell 
            key={[x,y]}
            cell={this.state.mineField[x][y]}
            // classes={this.hasMine(x,y) ? "opened mine" : ""}
            //minesAroundNumber={() => this.openAround(x,y)}
            onClick={(cell) => this.openAround(cell,x,y)}
            />
        })}
        </div>
      })}
      </div></div>
    );
  }
}

export default Minesweeper;