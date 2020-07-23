import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import CustomSlider from "../components/CustomSlider";
import CategoriesDropdown from "../components/CategoriesDropdown/CategoriesDropdown";
import GameInfo from "../components/GameInfo/GameInfo";
import "./HomePage.css";
import "../stylesheets/CustomButtons.css"

const initialMinNumberOfPlayers = [4];
const initialPlaytimeRange = [30, 90];
const initialMinAge = [13];

class HomePage extends Component {

    state = {
        minNumberOfPlayers: [initialMinNumberOfPlayers],
        playtimeRange: initialPlaytimeRange,
        minAge: initialMinAge,
        category: "",
        gameName: "",
        games: [
            {
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

    onSearchClick = () => {
        console.log(this.state)
        // TODO: Send request to backend
    };

    onGameNameChange = event => {
        const newState = this.state;
        newState.gameName = event.target.value;
        this.setState(newState);
        console.log(this.state)
    };

    onKeyDown = event => {
        if (event.key === 'Enter')
            this.onFindClick();
    };

    onFindClick = () => {
        console.log(this.state)
        // TODO: Send request to backend
    };

    render() {
        return (
            <div>
                <div className="title">Find a game perfect for you!</div>

                <div className="box-left">
                    <span className="form-title">Min. number of players:</span>
                    <CustomSlider
                        domain={[1, 50]}
                        defaultValues={initialMinNumberOfPlayers}
                        onChange={this.onMinNumberOfPlayersChange}
                        left={true}
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

                <div className="search-form">
                    <div className="search-text">Are you looking for something specific?</div>
                    <Form className="search-bar">
                        <Form.Row>
                            <Col>
                                <Form.Control type="text" placeholder="Find a game by its name"
                                              onChange={this.onGameNameChange} onKeyDown={this.onKeyDown}/>
                            </Col>
                            <Col>
                                <Button className="custom-button" type="submit" onClick={this.onFindClick}><span
                                    className="custom-button-text">FIND</span></Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </div>

                {this.state.games.map(game => <GameInfo key={game.name} game={game}/>)}
            </div>
        );
    }
}

export default HomePage;