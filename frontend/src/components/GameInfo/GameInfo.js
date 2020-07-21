import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import "./GameInfo.css"

class GameInfo extends Component {
    render() {
        return (
            <div className="game-info-background">
                <div className="picture-box"> picture </div>

                <div className="game-title">Bohnanza</div>

                <div className="game-info-left">
                    <span>Players: 2-7</span><br/>
                    <span>Playtime: 45-60 min</span><br/>
                    <span>Minimum age: 13</span><br/>
                    <span>Year published: 1997</span><br/>
                    <span>Top player: Agnieszka</span><br/><br/>
                    <Button className="game-info-button">See ranking</Button>
                    <Button className="game-info-button">Add to my games</Button>
                </div>

                <div className="game-info-right">
                    <span>Description:</span><br/>
                    <span>
                        This great card game is about planting, trading, and selling beans - 11 kinds of beans (this English version includes all the cards from the original game and the first expansion).
                        Players try to collect large sets of beans to sell for gold. There is limited growing space and always new beans to plant. To avoid planting unwanted beans, players trade them to other players who want them for their bean fields.
                    </span>
                </div>
            </div>
        );
    }
}

export default GameInfo;