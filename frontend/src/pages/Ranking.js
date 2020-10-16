import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import AxiosClient from "../components/Authentication/AxiosClient";
import RankingTableElement from "../components/RankingTable/RankingTableElement";
import './Ranking.css';
import "../stylesheets/StatusMessages.css";

class Ranking extends Component {

    state = {
        error: null,
        isLoaded: false,
        scores: []
    };

    componentDidMount() {
        const newState = this.state;
        newState.gameName = this.props.location.state.gameName;
        this.setState(newState);
        if (this.props.location.state.gameHasRanking) {
            this.getRanking().then(this.processScores(), this.handleError());
        }
    }

    getRanking() {
        return AxiosClient.get("rankings/" + this.props.location.state.gameId)
            .then(res => res.data.scores);
    }

    processScores() {
        return scores => {
            scores.forEach(this.formatScore());
            const newState = this.state;
            newState.isLoaded = true;
            newState.scores = scores;
            this.setState(newState);
        };
    }

    formatScore() {
        return (score, i) => {
            score.id = i + 1;
        }
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
        return (
            <div>
                <div className="title">{this.state.gameName} ranking</div>

                <Row className="ranking-table-header">
                    <Col>#</Col>
                    <Col>USERNAME</Col>
                    <Col>SCORE</Col>
                </Row>
                {this.props.location.state.gameHasRanking ?
                    this.renderScores() :
                    <div className="title">There is no ranking for this game because no players have claimed any
                        victories yet.</div>}
            </div>
        );
    }

    renderScores() {
        if (this.state.error) {
            return <div className="error-message">Error</div>
        } else if (!this.state.isLoaded) {
            return <div className="status-field d-flex align-items-center">
                <Spinner className="spinner" animation="border" variant="light"/>
                <span className="loading-message">Loading...</span>
            </div>
        } else {
            return this.state.scores.map(score => <RankingTableElement key={score.id} score={score}/>);
        }
    }
}

export default Ranking;