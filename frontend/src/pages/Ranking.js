import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './Ranking.css';

class Ranking extends Component {

    state = {
      gameName: "Bohnanza",
      scores: [
          {
              user: "Agnieszka",
              score: "150"
          },
          {
              user: "Andrzej",
              score: "150"
          },
          {
              user: "Ania",
              score: "150"
          },
          {
              user: "Agata",
              score: "150"
          },
          {
              user: "Iga",
              score: "150"
          },
          {
              user: "Szymon",
              score: "150"
          }
      ]
    };

    render() {
        return (
            <div>
                <div className="title">Ranking</div>

                <div className="ranking-table-header" >
                    <Row>
                        <Col>#</Col>
                        <Col>Username</Col>
                        <Col>Score</Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Ranking;