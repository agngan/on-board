import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AxiosClient from "../components/Authentication/AxiosClient";
import AuthenticationService from "../components/Authentication/AuthenticationService";
import GameInfoSmall from "../components/GameInfoSmall/GameInfoSmall";
import "./MyGames.css";
import RankingTableElement from "../components/RankingTable/RankingTableElement";

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
            .then(res => res.data.myGamesRecords);
    }

    processGames() {
        return games => {
            const newState = this.state;
            newState.isLoaded = true;
            newState.myGames = games;
            this.setState(newState);
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
                <Row sm={1} md={2} className="my-games-row">
                    {this.renderGames()}
                </Row>
            </div>
        );
    }

    renderGames() {
        // TODO: make error and loading messages look good
        if (this.state.error) {
            return <span>Error</span>
        } else if (!this.state.isLoaded) {
            return <span>Loading...</span>
        } else {
            return this.state.myGames.map(game => <Col key={game.id}><GameInfoSmall key={game.id} game={game}/></Col>);
        }
    }
}

export default MyGames;