import React, {Component} from 'react';
import GameInfo from "../components/GameInfo/GameInfo";
import GameInfoSearch from "../components/HomePageSearchForm/GameInfoSearch";
import GameNameSearch from "../components/HomePageSearchForm/GameNameSearch";
import "./HomePage.css";
import "../stylesheets/CustomButtons.css";


class HomePage extends Component {

    state = {
        error: null,
        isLoaded: false,
        searchStarted: false,
        games: []
    };

    setSearchStarted = () => {
        const newState = this.state;
        newState.searchStarted = true;
        this.setState(newState);
    };

    processGames = games => {
        const newState = this.state;
        newState.isLoaded = true;
        newState.games = games;
        this.setState(newState);
    };

    handleError = error => {
        const newState = this.state;
        newState.isLoaded = true;
        newState.error = error;
        console.log(error);
    };

    render() {
        return (
            <div>
                <GameInfoSearch processGames={this.processGames} handleError={this.handleError} setSearchStarted={this.setSearchStarted}/>
                <GameNameSearch processGames={this.processGames} handleError={this.handleError} setSearchStarted={this.setSearchStarted}/>

                {!this.state.searchStarted &&
                <div className="title">Thousands of games are waiting to be found!</div>}

                {this.renderGames()}
            </div>
        );
    }

    renderGames() {
        // TODO: make error and loading messages look good
        if (this.state.error) {
            return <span>Error</span>
        } else if (this.state.searchStarted && !this.state.isLoaded) {
            return <span>Loading...</span>
        } else {
            return this.state.games.map(game => <GameInfo key={game.name} game={game}/>);
        }
    }
}

export default HomePage;