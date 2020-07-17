import React, {Component} from 'react';
import CustomSlider from "../components/CustomSlider";
import "./HomePage.css";

const initialMinNumberOfPlayers = 4;
const initialPlaytimeRange = [30,90];

class HomePage extends Component {

    state = {
        minNumberOfPlayers: [initialMinNumberOfPlayers],
        playtimeRange: initialPlaytimeRange
    };

    onNumberOfPlayersChange = values => {
        const newState = this.state;
        newState.minNumberOfPlayers = values;
        this.setState(newState);
        console.log(this.state);
    };

    onPlaytimeRangeChange = values => {
        const newState = this.state;
        newState.playtimeRange = values;
        this.setState(newState);
        console.log(this.state);
    };

    render() {
        return (
            <div>
                <div className="title" >Find a game perfect for you!</div>
                <div className="slider-left">
                    <span className="form-title">Min. number of players:</span>
                    <CustomSlider
                        key={1}
                        domain={[1,50]}
                        defaultValues={[initialMinNumberOfPlayers]}
                        onChange={this.onNumberOfPlayersChange}
                        left={false}
                        right={true} />
                </div>

                <div className="slider-right">
                    <span className="form-title">Playtime in minutes:</span>
                    <CustomSlider
                        key={2}
                        domain={[0, 300]}
                        defaultValues={initialPlaytimeRange}
                        onChange={this.onPlaytimeRangeChange}
                        left={false}
                        right={false} />
                </div>
            </div>
        );
    }
}

export default HomePage;