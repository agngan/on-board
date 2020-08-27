import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RankingTableElement from "../components/RankingTable/RankingTableElement";
import './Ranking.css';

class Ranking extends Component {

    state = {
        gameName: "Bohnanza",
        scores: [
            {
                id: 1,
                user: "Agnieszka",
                points: "150"
            },
            {
                id: 2,
                user: "Andrzej",
                points: "150"
            },
            {
                id:3,
                user: "Ania",
                points: "150"
            },
            {
                id: 4,
                user: "Agata",
                points: "150"
            },
            {
                id: 5,
                user: "Iga",
                points: "150"
            },
            {
                id: 6,
                user: "Szymon",
                points: "150"
            }
        ]
    };

    render() {
        return (
            <div>
                <div className="title">{this.state.gameName} ranking</div>

                <Row className="ranking-table-header">
                    <Col>#</Col>
                    <Col>USERNAME</Col>
                    <Col>SCORE</Col>
                </Row>

                {this.state.scores.map(score => <RankingTableElement key={score.id} score={score}/>)}
            </div>
        );
    }
}

export default Ranking;