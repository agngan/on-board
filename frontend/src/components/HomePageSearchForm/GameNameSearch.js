import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import AxiosClient from "../Authentication/AxiosClient";
import AuthenticationService from "../Authentication/AuthenticationService";

class GameNameSearch extends Component {

    state = {
        gameName: ""
    };

    onGameNameChange = event => {
        const newState = this.state;
        newState.gameName = event.target.value;
        this.setState(newState);
    };

    onKeyDown = event => {
        if (event.key === 'Enter')
            this.onFindClick();
    };

    onFindClick = () => {
        this.props.setSearchStarted();
        // TODO: Handle sending empty name
        this.getGames().then(this.processGames(), this.handleError());
    };

    getGames() {
        const params = new URLSearchParams([['name', this.state.gameName]]);
        if (AuthenticationService.isUserLoggedIn()){
            return AxiosClient.get("bga/searchByName/" + AuthenticationService.getLoggedInUser(), { params })
                .then(res => res.data);
        }
        return AxiosClient.get("bga/searchByName", { params })
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
            <div className="search-form">
                <div className="search-text">Are you looking for something specific?</div>
                <Form className="search-bar">
                    <Form.Row>
                        <Col>
                            <Form.Control type="text" placeholder="Find a game by its name"
                                          onChange={this.onGameNameChange} onKeyDown={this.onKeyDown}/>
                        </Col>
                        <Col>
                            <Button className="custom-button" onClick={this.onFindClick}><span
                                className="custom-button-text">FIND</span></Button>
                        </Col>
                    </Form.Row>
                </Form>

            </div>
        );
    }
}

export default GameNameSearch;