import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AuthenticatedRoute from "./components/Authentication/AuthenticatedRoute";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage";
import MyGames from "./pages/MyGames";
import Ranking from "./pages/Ranking";
import Login from "./pages/Login";
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar/>
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <AuthenticatedRoute exact path="/my-games" component={MyGames} />
                <Route exact path="/ranking" component={Ranking} />
                <Route exact path="/login" component={Login} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
