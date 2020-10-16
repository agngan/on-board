import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import AxiosClient from "../components/Authentication/AxiosClient";
import AuthenticationService from "../components/Authentication/AuthenticationService";
import GameInfoSmall from "../components/GameInfoSmall/GameInfoSmall";
import "./MyGames.css";
import "../stylesheets/StatusMessages.css";

class MyGames extends Component {

    state = {
        error: null,
        isLoaded: false,
        myGames: []
    };

    componentDidMount() {
        this.getMyGames().then(this.processGames(), this.handleError());
    }

    getMyGames() {
        return AxiosClient.get("myGames/" + AuthenticationService.getLoggedInUser())
            .then(res => res.data);
    }

    processGames() {
        return games => {
            const newState = this.state;
            newState.isLoaded = true;
            newState.myGames = games;
            this.setState(newState);
            console.log(this.state.myGames)
        }
    }

    handleError() {
        return error => {
            const newState = this.state;
            newState.isLoaded = true;
            newState.error = error;
            console.log(error);
        }
    }

    render() {
        return (
            <div>
                <div className="title">My games:</div>
                {this.renderGames()}
            </div>
        );
    }

    renderGames() {
        if (this.state.error) {
            return <div className="error-message">Error</div>
        } else if (!this.state.isLoaded) {
            return <div className="status-field d-flex align-items-center">
                <Spinner className="spinner" animation="border" variant="light"/>
                <span className="loading-message">Loading...</span>
            </div>
        } else if (this.state.isLoaded && this.state.myGames.length === 0) {
            return <div className="title">You don't have any games at the moment. Go to Home Page and add some to start
                playing!</div>
        } else {
            return <Row sm={1} md={2} className="my-games-row">{this.state.myGames.map(game => <Col
                key={game.gameId}><GameInfoSmall key={game.id}
                                                 game={game}/></Col>)}</Row>
        }
    }
}

export default MyGames;