import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import "./GameInfo.css"
import "../../stylesheets/CustomButtons.css"


class GameInfo extends Component {

    render() {
        return (
            <div className="game-info-background">
                <div className="p-1 overflow-auto scrollbar" style={{height:'310px'}}>
                    <div className="picture-box">
                        <img
                            src={this.props.game.imagePath}
                            alt={this.props.game.name}
                            style={{height: '100%', width: '100%', objectFit: 'contain'}}/>
                    </div>

                    <div className="game-title">{this.props.game.name}</div>

                    <div className="game-info-left">
                        <span>Players: {this.props.game.numberOfPlayers[0]} - {this.props.game.numberOfPlayers[1]}</span><br/>
                        <span>Playtime: {this.props.game.playtimeRange[0]} - {this.props.game.playtimeRange[1]} min</span><br/>
                        <span>Minimum age: {this.props.game.minAge}</span><br/>
                        <span>Year published: {this.props.game.yearPublished}</span><br/>
                        <span>Primary publisher: {this.props.game.primaryPublisher}</span><br/>

                        <Button className="custom-button mt-2"><span
                            className="custom-button-text">Add to my games</span></Button>
                        <Link to={{
                            pathname: "/ranking",
                            state: {gameId: this.props.game.id, gameName: this.props.game.name}
                        }}>
                            <Button className="custom-button mt-2"><span
                                className="custom-button-text">See ranking</span></Button>
                        </Link>
                    </div>

                    <div className="game-info-right">
                        <span>Description:</span><br/>
                        <div className="description-box overflow-auto scrollbar"
                             dangerouslySetInnerHTML={{__html: this.props.game.description}}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameInfo;