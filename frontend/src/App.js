import React from 'react';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MyGames from "./pages/MyGames";
import Ranking from "./pages/Ranking";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <NavBar/>
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/my-games" component={MyGames} />
                <Route exact path="/ranking" component={Ranking} />
                <Route exact path="/login" component={Login} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
