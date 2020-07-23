import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class GameNameSearch extends Component {

    state = {
        gameName: ""
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
        console.log(this.state);
        // TODO: Send request to backend
        this.props.setGames([]);
    };

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
                            <Button className="custom-button" type="submit" onClick={this.onFindClick}><span
                                className="custom-button-text">FIND</span></Button>
                        </Col>
                    </Form.Row>
                </Form>
            </div>
        );
    }
}

export default GameNameSearch;