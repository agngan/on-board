import React, {Component} from 'react';
import AuthenticationService from "../components/Authentication/AuthenticationService";
import "./MyProfile.css"

class MyProfile extends Component {
    render() {
        return (
            <div>
                <div className="info">Hello <span className="value">Agnieszka</span>!</div>
                <div className="info">You have won <span className="value">10</span> games in total</div>
                <div className="info">Your game with highest score is <span className="value">Bohnanza</span></div>
                <div className="info">Your one time use secret code for validating your friend's win: <span className="value">eIhwmVwMHI</span> </div>
            </div>
        );
    }
}

export default MyProfile;