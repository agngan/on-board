import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GameInfoSmall from "../components/GameInfoSmall/GameInfoSmall";
import "./MyGames.css";

class MyGames extends Component {

    state = {
        myGames: [
            {
                id: 1,
                name: "Bohnanza",
                image: "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559254186139-51cXhVYYHwL.jpg",
                userScore: "100",
                bestScore: "120",
                topPlayer: "Agnieszka",
                lastWin: "14-08-20"
            },
            {
                id: 2,
                name: "Saboteur",
                image: "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559253385911-51SYQdt0ZPL.jpg",
                userScore: "150",
                bestScore: "170",
                topPlayer: "Agnieszka",
                lastWin: "23-08-20"
            },
            {
                id: 3,
                name: "Agricola (Revised Edition)",
                image: "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559254915322-61vm3wX33lL.jpg",
                userScore: "37",
                bestScore: "57",
                topPlayer: "Agnieszka",
                lastWin: "24-08-20"
            }
        ]
    };

    render() {
        return (
            <div>
                <div className="title">My games:</div>
                <Row sm={1} md={2} className="my-games-row">
                    {this.state.myGames.map(game => <Col key={game.id}><GameInfoSmall key={game.id} game={game}/></Col>)}
                </Row>
            </div>
        );
    }
}

export default MyGames;