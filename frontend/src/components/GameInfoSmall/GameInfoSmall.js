import React, {Component} from 'react';
import "./GameInfoSmall.css";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

class GameInfoSmall extends Component {
    render() {
        return (
            <div className="game-info-small-background">
                <div className="picture-box-small">
                    <img
                        src={this.props.game.image}
                        alt={this.props.game.name}
                        style={{height: '100%', width: '100%', objectFit: 'contain'}}/>
                </div>

                <div className="game-title-small">{this.props.game.name}</div>

                <div className="game-info-small">
                    <span>My score: {this.props.game.userScore}</span><br/>
                    <span>Best score overall: {this.props.game.bestScore}</span><br/>
                    <span>Top player: {this.props.game.topPlayer}</span><br/>
                    <span>Last win: {this.props.game.lastWin}</span><br/>

                    <div className="game-info-small-buttons">
                        <Button className="custom-button mt-2"><span
                            className="custom-button-text">I won!</span></Button>
                        <Link to={{pathname: "/ranking", state: {gameId: this.props.game.id, gameName: this.props.game.name}}}>
                            <Button className="custom-button mt-2"><span
                            className="custom-button-text">See ranking</span></Button>
                        </Link>
                    </div>
                </div>


            </div>
        );
    }
}

export default GameInfoSmall;