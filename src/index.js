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
          <Minesweeper col={9} row={7} minesCount={10}/>
        </Route>
      </Switch>
      </div>
    </div>
  </BrowserRouter>),
  document.getElementById("root")
);