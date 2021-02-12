import React from "react";
import "./Minesweeper.scss";
import Cell from "./Cell.js";
import CellModel from "./CellModel.js";
import SplashScreen from "./SplashScreen.js";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** 
  * @param props.col - number of columns; row - number of rows; minesQnt 
  */
class Minesweeper extends React.Component {

  constructor(props) {
    super(props);

    const splash = {
      size: {},
      show: false,
      color: "",
      title: "",
    };

    this.state = {
      mineField : undefined,
      cellsNeedToOpen: props.col * props.row - props.minesQnt,
      outputData: {flags: 0},
      lastX: 0, lastY: 0,
      splash,
    };

    this.fieldRef = React.createRef();
    this.createCellRefs(props);
  }

  updateCell(cell, x, y) {
    this.cellRefs[x][y].current.setState({cell});
  }

  createMineField(props, skipX, skipY) {
    const mineField = [];
    for (let x = 0; x < props.col; x++) {
      const column = [];
      for (let y = 0; y < props.row; y++) {
        column.push(new CellModel(CellModel.EMPTY));
      }
      mineField.push(column);
    }

    let i = 0;
    while (i < props.minesQnt) {
      const x = randomInt(0, props.col - 1);
      const y = randomInt(0, props.row - 1);
      if (x === skipX && y === skipY) continue;
      const cell = mineField[x][y];
      if (cell.isEmpty()) {
        cell.value = CellModel.MINE;
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

  showSplash(splashStatus) {
    const splash = {
      size: this.state.splash.size,
      show: true,
      color: splashStatus.color,
      title: splashStatus.title,
    }
    this.setState({
      splash
    });
  }

  clickHandler(originX, originY) {
    this.setState({lastX: originX, lastY: originY});
    if (this.state.mineField === undefined) {
      this.setState({mineField: this.createMineField(this.props, originX, originY)});
      return;
    } 
    const cell = this.state.mineField[originX][originY];
    if (cell.flag) {

    }
    else if (cell.hasMine()) {
      cell.opened = true;
      this.updateCell(cell, originX, originY);
      this.showSplash(SplashScreen.LOST);
    }
    else {
      this.goAround(originX, originY);
    }
  }

  rightClickHandler(event, x, y) {
    event.preventDefault();
    const cell = this.state.mineField[x][y];
    cell.flag = !cell.flag;
    this.updateCell(cell, x, y);
    const outputData = {
      flags: this.state.outputData.flags + (cell.flag ? 1 : -1)
    };
    this.setState({outputData});
  }

  restart() {
    const mineField = undefined;
    const splash = this.state.splash;
    splash.show = false;
    this.setState({
      mineField,
      cellsNeedToOpen: this.props.col * this.props.row - this.props.minesQnt,
      outputData: {flags: 0},
      splash
    });
  }

  openCell(cell) {
    if (!cell.opened) {
      this.setState((prevState, props) => ({cellsNeedToOpen: prevState.cellsNeedToOpen - 1}));
    }
    cell.opened = true;
  }

  goAround(originX, originY) {
    let minesQnt = 0;
    const cellsNeedToCheck = [];
    const maxX = Math.min(originX+1, this.props.col-1);
    const maxY = Math.min(originY+1, this.props.row-1);
    const originCell = this.state.mineField[originX][originY];
    this.openCell(originCell);
    for (let x = Math.max(0,originX-1); x <= maxX; x++) {
      for (let y = Math.max(0,originY-1); y <= maxY; y++) {
        const cell = this.state.mineField[x][y];
        if (cell.opened) {
          continue;
        }
        cellsNeedToCheck.push([x,y]);
        if (cell.hasMine()) {
          minesQnt++;
        }
      }
    }
    if (minesQnt === 0) {
      cellsNeedToCheck.map((xy) => this.goAround(xy[0],xy[1]));
    }
    originCell.minesAroundNumber = minesQnt > 0 ? minesQnt.toString() : "";
    this.updateCell(originCell, originX, originY);
  }

  componentDidMount() {
    const splash = {
      size: {
        width: this.fieldRef.current.clientWidth,
        height: this.fieldRef.current.clientHeight
      },
      show: this.state.show,
      color: this.state.color,
      title: this.state.title,
    }
    this.setState({splash});
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.cellsNeedToOpen !== prevState.cellsNeedToOpen) {
      if (this.state.cellsNeedToOpen === 0) {
        this.showSplash(SplashScreen.WIN);
      }
    }
    if (this.state.outputData !== prevState.outputData) {
      this.props.onChangeData(this.state.outputData);
    }
    if (this.state.mineField !== prevState.mineField && prevState.mineField === undefined) {
      this.clickHandler(this.state.lastX, this.state.lastY);
    }
  }

  render() {

    const xs = [];
    for (let x = 0; x < this.props.col; x++) {
      xs.push(x);
    }
    const ys = [];
    for (let y = 0; y < this.props.row; y++) {
      ys.push(y);
    }

    return (
      <div className="minesweeper" onContextMenu={e => e.preventDefault()}><div className="field" ref={this.fieldRef}>
      <SplashScreen splash={this.state.splash} restart={() => this.restart()}/>
      {
        xs.map(x => {
          return <div key={x} className="col">
          {
            ys.map(y => {
              return <Cell 
                key={[x,y]}
                cell={this.state.mineField === undefined ? CellModel.PLUG : this.state.mineField[x][y]}
                ref={this.cellRefs[x][y]}
                onClick={() => this.clickHandler(x,y)}
                onContextMenu={e => this.rightClickHandler(e,x,y)}
              />
            })
          }
          </div>
        })
      }
      </div></div>
    );
  }
}

export default Minesweeper;