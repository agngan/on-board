import React, {Component} from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class RankingTableElement extends Component {
    render() {
        return (
            <Row className="ranking-table-element">
                <Col>{this.props.score.id}</Col>
                <Col>{this.props.score.user}</Col>
                <Col>{this.props.score.points}</Col>
            </Row>
        );
    }
}

export default RankingTableElement;