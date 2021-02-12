import React from "react";
import ReactDOM from "react-dom";

import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import "./index.scss";

import TicTac from "./TicTac/TicTac.js";
import Minesweeper from "./Minesweeper/Minesweeper.js";

function Home() {
  return <div>
      <h1>Welcome to games gallery</h1>
      <p>You can play in different games. This site created using React framework.</p>
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
    </div>
  }
}

ReactDOM.render((
  <BrowserRouter>
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tic-tac">Tic Tac</Link></li>
          <li><Link to="/minesweeper">Minesweeper</Link></li>
        </ul>
      </nav>
      <div className="main">
      <Switch>
        <Route exact path="/"      component={Home}/>
        <Route path="/tic-tac"     component={TicTac}/>
        <Route path="/minesweeper">
          <MinesweeperManager/>
        </Route>
      </Switch>
      </div>
    </div>
  </BrowserRouter>),
  document.getElementById("root")
);