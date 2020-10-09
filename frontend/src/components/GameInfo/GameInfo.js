import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import AxiosClient from "../Authentication/AxiosClient";
import AuthenticationService from "../Authentication/AuthenticationService";
import "./GameInfo.css"
import "../../stylesheets/CustomButtons.css"


class GameInfo extends Component {

    state = {
        gameAdded: this.props.game.added
    };

    onAddGameClick = () => {
        if (AuthenticationService.isUserLoggedIn()) {
            const postData = {
                id: this.props.game.id,
                name: this.props.game.name
            };
            AxiosClient.post("/myGames/add/" + AuthenticationService.getLoggedInUser(),
                postData,
                {withCredentials: true},
                {headers: AuthenticationService.getPostHeaders()})
                .then(() => {
                    console.log("post successful");
                    // window.location.replace("/my-games");
                    const newState = this.state;
                    newState.gameAdded = true;
                    this.setState(newState);
                    console.log(this.state);
                });
        } else {
            window.location.replace("/login");
        }
    };

    render() {
        return (
            <div className="game-info-background">
                <div className="p-1 overflow-auto scrollbar" style={{height: '310px'}}>
                    <div className="picture-box">
                        <img
                            src={this.props.game.imagePath}
                            alt={this.props.game.name}
                            style={{height: '100%', width: '100%', objectFit: 'contain'}}/>
                    </div>

                    <div className="game-title">{this.props.game.name}</div>

                    <div className="game-info-left">
                        <span><span className="info-title">Players: </span>
                            {this.props.game.numberOfPlayers[0]} - {this.props.game.numberOfPlayers[1]}</span><br/>
                        <span><span className="info-title">Playtime: </span>
                            {this.props.game.playtimeRange[0]} - {this.props.game.playtimeRange[1]} min</span><br/>
                        <span><span className="info-title">Minimum age: </span>
                            {this.props.game.minAge}</span><br/>
                        <span><span className="info-title">Year published: </span>
                            {this.props.game.yearPublished}</span><br/>
                        <span><span className="info-title">Primary publisher: </span>
                            {this.props.game.primaryPublisher}</span><br/>

                        <Button className="custom-button mt-2" onClick={this.onAddGameClick}
                                disabled={this.state.gameAdded}>
                            <span className="custom-button-text">{this.state.gameAdded ? "Added" : "Add to my games"}</span>
                        </Button>
                        <Link to={{
                            pathname: "/ranking",
                            state: {
                                gameId: this.props.game.id,
                                gameName: this.props.game.name,
                                gameHasRanking: this.props.game.hasRanking
                            }
                        }}>
                            <Button className="custom-button mt-2"><span
                                className="custom-button-text">See ranking</span></Button>
                        </Link>
                    </div>

                    <div className="game-info-right">
                        <span className="info-title">Description:</span><br/>
                        <div className="description-box overflow-auto scrollbar"
                             dangerouslySetInnerHTML={{__html: this.props.game.description}}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameInfo;