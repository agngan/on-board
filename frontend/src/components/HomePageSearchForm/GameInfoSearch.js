import React, {Component} from 'react';
import CustomSlider from "../CustomSlider";
import CategoriesDropdown from "../CategoriesDropdown/CategoriesDropdown";
import Button from "react-bootstrap/Button";
import AxiosClient from "../Authentication/AxiosClient";


const initialNumberOfPlayers = [2, 4];
const initialPlaytimeRange = [30, 90];
const initialMinAge = [13];

class GameInfoSearch extends Component {

    state = {
        numberOfPlayers: initialNumberOfPlayers,
        playtimeRange: initialPlaytimeRange,
        minAge: initialMinAge,
        category: {
            name: "",
            id: ""
        }
    };

    onNumberOfPlayersChange = playersNumber => {
        const newState = this.state;
        newState.numberOfPlayers = playersNumber;
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

    onSearchClick = () => {
        this.getGames().then(this.processGames(), this.handleError());
    };

    getGames() {
        const params = new URLSearchParams([
            ['numberOfPlayers', this.state.numberOfPlayers],
            ["playtimeRange", this.state.playtimeRange],
            ["minAge", this.state.minAge[0]],
            ["category", this.state.category.id]]);
        return AxiosClient.get("bga/searchByDetails", { params })
            .then(res => res.data);
    }

    processGames() {
        return games => {
            this.props.processGames(games);
        };
    }

    handleError() {
        return error => {
            this.props.handleError(error);
        }
    }

    render() {
        return (
            <div>
                <div className="title">Find a game perfect for you!</div>

                <div className="box-left">
                    <span className="form-title">Number of players:</span>
                    <CustomSlider
                        domain={[1, 20]}
                        defaultValues={initialNumberOfPlayers}
                        onChange={this.onNumberOfPlayersChange}
                        left={false}
                        right={false}/>
                </div>

                <div className="box-right">
                    <span className="form-title">Playtime in minutes:</span>
                    <CustomSlider
                        domain={[0, 300]}
                        defaultValues={initialPlaytimeRange}
                        onChange={this.onPlaytimeRangeChange}
                        left={false}
                        right={false}/>
                </div>

                <div className="box-left" style={{paddingTop: '10px'}}>
                    <span className="form-title">Min. age:</span>
                    <CustomSlider
                        domain={[0, 21]}
                        defaultValues={initialMinAge}
                        onChange={this.onMinAgeChange}
                        left={true}
                        right={false}/>
                </div>

                <div className="box-right" style={{paddingTop: '10px'}}>
                    <span className="form-title">Category:</span>
                    <CategoriesDropdown onCategoryChange={this.onCategoryChange}/>
                </div>

                <div className="center">
                    <div style={{width: '200px'}}>
                        <Button className="custom-button" onClick={this.onSearchClick}><span
                            className="custom-button-text">SEARCH!</span></Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameInfoSearch;