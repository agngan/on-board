import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AxiosClient from "../components/Authentication/AxiosClient";
import RankingTableElement from "../components/RankingTable/RankingTableElement";
import './Ranking.css';

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
        console.log(this.props.location.state.gameName);
        console.log(this.state);
        if (this.props.location.state.gameHasRanking) {
            this.getRanking().then(this.processScores(), this.handleError());
        }
    }

    getRanking() {
        console.log(this.state);
        console.log("game id: " + this.props.location.state.gameId);
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
            console.log(score);
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
                    <div className="title">There is no ranking for this game because no players have claimed any victories yet.</div>}
                {/*{this.renderScores()}*/}
            </div>
        );
    }

    renderScores() {
        // TODO: make error and loading messages look good
        if (this.state.error) {
            return <span>Error</span>
        } else if (!this.state.isLoaded) {
            return <span>Loading...</span>
        } else {
            return this.state.scores.map(score => <RankingTableElement key={score.id} score={score}/>);
        }
    }
}

export default Ranking;