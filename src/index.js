import React from "react";
import ReactDOM from "react-dom";

import {
  BrowserRouter,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import "./index.scss";

import TicTac from "./TicTac/TicTac.js";
import Minesweeper from "./Minesweeper/Minesweeper.js";
import PyramidBuild from "./PyramidBuild/PyramidBuild.tsx";

function Home() {
  return <div>
      <h1>Welcome to games gallery</h1>
      <p>You can play in different games. This site created using React framework.</p>
    </div>;
}

function NotFound() {
  return <div>
    <h1>Page not found!</h1>
  </div>;
}

class MinesweeperManager extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      col: 12,
      row: 10,
      minesQnt: 10,
      flags: 0,
    };
  }

  changeHandler(e, prop) {
    this.setState({
      id: Math.random(),
      [prop]: e.target.value
    });
  }

  onChangeData(data) {
    this.setState({flags: data.flags});
  }

  render() {
    return <div id="minesweeper-manager">
      <div>
        <label>Columns<input type="number" value={this.state.col} onChange={e => this.changeHandler(e, "col")}/></label>
        <label>Rows<input type="number" value={this.state.row} onChange={e => this.changeHandler(e, "row")}/></label>
        <label>Mines quantity<input type="number" value={this.state.minesQnt} onChange={e => this.changeHandler(e, "minesQnt")}/></label>
        <label>Flags: {this.state.flags}</label>
      </div>
      <Minesweeper
        key={this.state.id}
        col={this.state.col}
        row={this.state.row}
        minesQnt={this.state.minesQnt}
        onChangeData={(data) => this.onChangeData(data)}
      />
    </div>;
  }
}

class PyramidBuildManager extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      level: 1,
    };
  }

  onFail = () => {
    console.log("fail");
  }

  onWin = () => {
    console.log("win");
    this.setState(prevState => ({
      id: Math.random(),
      level: prevState.level + 1
    }));
  }

  onLost = () => {
    console.log("lost");
    this.setState(prevState => ({
      id: Math.random(),
      level: prevState.level > 1 ? prevState.level - 1 : prevState.level,
    }));
  }

  render() {
    return <div>
      <PyramidBuild key={this.state.id} level={this.state.level} onFail={this.onFail} onLost={this.onLost} onWin={this.onWin}/>
    </div>;
  }
}

ReactDOM.render((
  <BrowserRouter>
    <div>
      <nav>
        <ul>
          <li><NavLink exact={true} activeClassName={"selected"} to="/">Home</NavLink></li>
          <li><NavLink activeClassName={"selected"} to="/tic-tac">Tic Tac</NavLink></li>
          <li><NavLink activeClassName={"selected"} to="/minesweeper">Minesweeper</NavLink></li>
          <li><NavLink activeClassName={"selected"} to="/pyramid-build">Pyramid Build</NavLink></li>
        </ul>
      </nav>
      <div className="main">
      <Switch>
        <Route exact path="/"      component={Home}/>
        <Route path="/tic-tac"     component={TicTac}/>
        <Route path="/minesweeper">
          <MinesweeperManager/>
        </Route>
        <Route path="/pyramid-build">
          <PyramidBuildManager/>
        </Route>
        <Route component={NotFound}/>
      </Switch>
      </div>
    </div>
  </BrowserRouter>),
  document.getElementById("root")
);
