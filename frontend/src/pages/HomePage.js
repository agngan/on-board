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
        gameName: ""
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
                        <Button className="custom-button" onClick={this.onSearchClick}><span className="custom-button-text">SEARCH!</span></Button>
                    </div>
                </div>

                <div className="search-form">
                    <div className="search-text">Are you looking for something specific?</div>
                    <Form className="search-bar">
                        <Form.Row>
                            <Col>
                                <Form.Control type="text" placeholder="Find a game by its name" onChange={this.onGameNameChange} onKeyDown={this.onKeyDown} />
                            </Col>
                            <Col>
                                <Button className="custom-button" type="submit" onClick={this.onFindClick}><span className="custom-button-text">FIND</span></Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </div>

                <GameInfo/>
                <GameInfo/>
            </div>
        );
    }
}

export default HomePage;