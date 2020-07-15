import React from 'react';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <NavBar/>
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
