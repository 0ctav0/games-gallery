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
    this.flag = false;
    this.opened = false;
    this.minesAroundNumber = "";
  }

  hasMine() {
    return this.value === MINE;
  }

  isEmpty() {
    return this.value === EMPTY;
  }

  getClasses() {
    return "cell " 
    + (this.opened ? "opened " : "")
    + (this.opened && this.hasMine() ? "mine " : "")
    + (!this.opened && this.flag ? "flag " : "")
    ;
  }
}

class SplashScreen extends React.Component {
  render() {
    return (
      <div className="splash-screen" style={{...this.props.size, ...{display: this.props.show ? "" : "none"}}}/>
    );
  }
}

/** 
  * @param props.col - number of columns; row - number of rows 
  */
class Minesweeper extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mineField : this.initMineField(props),
      splashSize: {},
      splashShow: false,
    };

    this.fieldRef = React.createRef();
    this.createCellRefs(props);
  }

  updateCell(cell, x, y) {
    this.cellRefs[x][y].current.setState({cell});
  }

  initMineField(props) {
    const mineField = [];
    for (let x = 0; x < props.col; x++) {
      const column = [];
      for (let y = 0; y < props.row; y++) {
        column.push(new CellModel(EMPTY));
      }
      mineField.push(column);
    }

    let i = 0;
    while (i < props.minesCount) {
      const x = randomInt(0, props.col - 1);
      const y = randomInt(0, props.row - 1);
      const cell = mineField[x][y];
      if (cell.isEmpty()) {
        cell.value = MINE;
        i++;
      }
    }

    return mineField;
  }

  createCellRefs(props) {
    this.cellRefs = [];
    for (let x = 0; x < props.col; x++) {
      const column = [];
      for (let y = 0; y < props.row; y++) {
        column.push(React.createRef());
      }
      this.cellRefs.push(column);
    }
  }

  clickHandler(originX, originY) {
    const cell = this.state.mineField[originX][originY];
    if (cell.hasMine()) {
      cell.opened = true;
      this.updateCell(cell, originX, originY);
      this.setState({splashShow: true});
    }
    else if (!cell.flag) {
      this.goAround(originX, originY);
    }
  }

  rightClickHandler(event, x, y) {
    event.preventDefault();
    const cell = this.state.mineField[x][y];
    cell.flag = true;
    this.updateCell(cell, x, y);
  }

  goAround(originX, originY) {
    let minesCount = 0;
    const cellsNeedToCheck = [];
    const maxX = Math.min(originX+1, this.props.col-1);
    const maxY = Math.min(originY+1, this.props.row-1);
    const originCell = this.state.mineField[originX][originY];
    originCell.opened = true;
    for (let x = Math.max(0,originX-1); x <= maxX; x++) {
      for (let y = Math.max(0,originY-1); y <= maxY; y++) {
        const cell = this.state.mineField[x][y];
        if (cell.opened) {
          continue;
        }
        cellsNeedToCheck.push([x,y]);
        if (cell.hasMine()) {
          minesCount++;
        }
      }
    }
    if (minesCount === 0) {
      cellsNeedToCheck.map((xy) => this.goAround(xy[0],xy[1]));
    }
    originCell.minesAroundNumber = minesCount > 0 ? minesCount.toString() : "";
    this.updateCell(originCell, originX, originY);
  }

  componentDidMount() {
    this.setState({splashSize: {
      width: this.fieldRef.current.clientWidth,
      height: this.fieldRef.current.clientHeight
    }});
  }

  render() {
    return (
      <div className="minesweeper"><div className="field" ref={this.fieldRef}>
      <SplashScreen size={this.state.splashSize} show={this.state.splashShow}/>
      {[...Array(this.props.col).keys()].map((x) => {
        return <div key={x} className="col">
        {[...Array(this.props.row).keys()].map((y) => {
          return <Cell 
            key={[x,y]}
            cell={this.state.mineField[x][y]}
            ref={this.cellRefs[x][y]}
            onClick={() => this.clickHandler(x,y)}
            onContextMenu={e => this.rightClickHandler(e,x,y)}
            />
        })}
        </div>
      })}
      </div></div>
    );
  }
}

export default Minesweeper;