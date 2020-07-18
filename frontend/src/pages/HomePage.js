import React, {Component} from 'react';
import CustomSlider from "../components/CustomSlider";
import CategoriesDropdown from "../components/CategoriesDropdown";
import "./HomePage.css";

const initialMinNumberOfPlayers = [4];
const initialPlaytimeRange = [30,90];
const initialMinAge = [13];

class HomePage extends Component {

    state = {
        minNumberOfPlayers: [initialMinNumberOfPlayers],
        playtimeRange: initialPlaytimeRange,
        minAge : initialMinAge,
        category: ""
    };

    onMinNumberOfPlayersChange = playersNumber => {
        const newState = this.state;
        newState.minNumberOfPlayers = playersNumber;
        this.setState(newState);
        console.log(this.state);
    };

    onPlaytimeRangeChange = playtimeRange => {
        const newState = this.state;
        newState.playtimeRange = playtimeRange;
        this.setState(newState);
        console.log(this.state);
    };

    onMinAgeChange = age => {
        const newState = this.state;
        newState.minAge = age;
        this.setState(newState);
        console.log(this.state);
    };

    onCategoryChange = category => {
        if (this.state.category === category) return;
        const newState = this.state;
        newState.category = category;
        this.setState(newState);
        console.log(this.state);
    };

    render() {
        return (
            <div>
                <div className="title" >Find a game perfect for you!</div>

                <div className="box-left">
                    <span className="form-title">Min. number of players:</span>
                    <CustomSlider
                        domain={[1,50]}
                        defaultValues={initialMinNumberOfPlayers}
                        onChange={this.onMinNumberOfPlayersChange}
                        left={true}
                        right={false} />
                </div>

                <div className="box-right">
                    <span className="form-title">Playtime in minutes:</span>
                    <CustomSlider
                        domain={[0, 300]}
                        defaultValues={initialPlaytimeRange}
                        onChange={this.onPlaytimeRangeChange}
                        left={false}
                        right={false} />
                </div>

                <div className="box-left" style={{paddingTop: '10px'}}>
                    <span className="form-title">Min. age:</span>
                    <CustomSlider
                        domain={[0,21]}
                        defaultValues={initialMinAge}
                        onChange={this.onMinAgeChange}
                        left={true}
                        right={false} />
                </div>

                <div className="box-right" style={{paddingTop: '10px'}}>
                    <span className="form-title">Category:</span>
                    <CategoriesDropdown onCategoryChange={this.onCategoryChange}/>
                </div>

            </div>
        );
    }
}

export default HomePage;