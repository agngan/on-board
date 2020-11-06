import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AuthenticatedRoute from "./components/Authentication/AuthenticatedRoute";
import AxiosClient from "./components/Authentication/AxiosClient";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage";
import MyGames from "./pages/MyGames";
import Ranking from "./pages/Ranking";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import MyProfile from "./pages/MyProfile";
import AddWin from "./pages/AddWin";
import './App.css';

function App() {

    // get method sent to server to ensure that XSRF-TOKEN cookie exists
    AxiosClient.get("", {withCredentials: true});

    return (
        <div className="App">
            <NavBar/>
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <AuthenticatedRoute exact path="/my-games" component={MyGames}/>
                    <Route exact path="/ranking" component={Ranking}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Registration}/>
                    <AuthenticatedRoute exact path="/my-profile" component={MyProfile}/>
                    <AuthenticatedRoute exact path="/add-win" component={AddWin}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
