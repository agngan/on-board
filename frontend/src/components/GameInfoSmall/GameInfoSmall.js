import React, {Component} from 'react';
import "./GameInfoSmall.css";

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
            </div>
        );
    }
}

export default GameInfoSmall;