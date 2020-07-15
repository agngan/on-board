import React from 'react';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MyGames from "./pages/MyGames";
import Ranking from "./pages/Ranking";

function App() {
  return (
    <div className="App">
      <NavBar/>
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/my-games" component={MyGames} />
                <Route exact path="/ranking" component={Ranking} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
