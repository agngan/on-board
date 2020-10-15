import React, {Component} from 'react';
import Spinner from "react-bootstrap/Spinner";
import AxiosClient from "../components/Authentication/AxiosClient";
import AuthenticationService from "../components/Authentication/AuthenticationService";
import "./MyProfile.css"
import "../stylesheets/StatusMessages.css";

class MyProfile extends Component {

    state = {
        error: null,
        isLoaded: false,
        profileInfo: ""
    };

    componentDidMount() {
        this.getProfileInfo().then(this.processProfileInfo(), this.handleError());
    }

    getProfileInfo() {
        return AxiosClient.get("myProfile/" + AuthenticationService.getLoggedInUser())
            .then(res => res.data);
    }

    processProfileInfo() {
        return info => {
            const newState = this.state;
            newState.isLoaded = true;
            newState.profileInfo = info;
            this.setState(newState);
            console.log(newState);
        };
    }

    handleError() {
        return error => {
            const newState = this.state;
            newState.isLoaded = true;
            newState.error = error;
            this.setState(newState);
            console.log(error);
        }
    }

    render() {
        return (this.renderProfileInfo());
    }

    renderProfileInfo() {
        if (this.state.error) {
            return <div className="error-message">Error</div>
        } else if (!this.state.isLoaded) {
            return <div className="status-field d-flex align-items-center">
                <Spinner className="spinner" animation="border" variant="light"/>
                <span className="loading-message">Loading...</span>
            </div>
        } else {
            return <div>
                <div className="info">Hello <span className="value">{AuthenticationService.getLoggedInUser()}</span>!
                </div>
                <div className="info">You have won <span
                    className="value">{this.state.profileInfo.totalWins}</span> games in total
                </div>
                <div className="info">Your game with highest score is <span
                    className="value">{this.state.profileInfo.gameWithHighestScore}</span></div>
                <div className="info">Your one time use secret code for validating your friend's win: <span
                    className="value">{this.state.profileInfo.secretCode}</span></div>
            </div>
        }
    }
}

export default MyProfile;