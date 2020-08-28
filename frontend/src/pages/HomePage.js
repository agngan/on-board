import React, {Component} from 'react';
import GameInfo from "../components/GameInfo/GameInfo";
import GameInfoSearch from "../components/HomePageSearchForm/GameInfoSearch";
import GameNameSearch from "../components/HomePageSearchForm/GameNameSearch";
import "./HomePage.css";
import "../stylesheets/CustomButtons.css";


class HomePage extends Component {

    state = {
        games: [
            {
                id: 1,
                name: "Bohnanza",
                image: "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559254186139-51cXhVYYHwL.jpg",
                players: "2-7",
                playtime: "45-60",
                minAge: "13",
                yearPublished: "1997",
                topPlayer: "Agnieszka",
                description: "This great card game is about planting, trading, and selling beans - 11 kinds of beans (this English version includes all the cards from the original game and the first expansion).\n" +
                    "Players try to collect large sets of beans to sell for gold. There is limited growing space and always new beans to plant. To avoid planting unwanted beans, players trade them to other players who want them for their bean fields."
            },
            {
                id: 2,
                name: "Saboteur",
                image: "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559253385911-51SYQdt0ZPL.jpg",
                players: "3-10",
                playtime: "30-45",
                minAge: "8",
                yearPublished: "2004",
                topPlayer: "Agnieszka",
                description: "You and your fellow dwarves are digging for gold in a maze of mining tunnels. But, beware! Some of the miners are saboteurs trying to foil your efforts and steal all your hard-earned gold! Now you must overcome cave-ins, broken lanterns, and busted pick-axes to find the mother lode!"
            }
        ]
    };

    setGames = games => {
        this.setState({games});
        console.log(this.state)
    };

    render() {
        return (
            <div>
                <GameInfoSearch setGames={this.setGames}/>
                <GameNameSearch setGames={this.setGames}/>

                {this.state.games.map(game => <GameInfo key={game.name} game={game}/>)}
            </div>
        );
    }
}

export default HomePage;