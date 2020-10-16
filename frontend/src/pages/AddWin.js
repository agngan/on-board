import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import WinValidationBox from "../components/WinValidationBox/WinValidationBox";
import AxiosClient from "../components/Authentication/AxiosClient";
import AuthenticationService from "../components/Authentication/AuthenticationService";
import "../stylesheets/CustomButtons.css"
import "./AddWin.css"

class AddWin extends Component {

    state = {
        numberOfValidators: 0,
        validations: []
    };

    onRadioClick = event => {
        const newState = this.state;
        newState.numberOfValidators = event.target.value;
        while (this.state.validations.length > newState.numberOfValidators) {
            newState.validations.pop();
        }
        this.setState(newState);
    };

    onValidationChange = validationBox => {
        let newState = this.state;
        if (this.state.validations.length > Number(validationBox.id)) {
            newState.validations[Number(validationBox.id)] = validationBox.validation;
        } else {
            newState.validations.push(validationBox.validation);
        }
        this.setState(newState);
    };

    onKeyDown = event => {
        if (event.key === 'Enter') {
            this.onAddWinClick();
        }
    };

    onAddWinClick = () => {
        console.log(this.state);
        const postData = {
            gameId: this.props.location.state.gameId,
            validations: this.state.validations
        };
        AxiosClient.post("/addWin/" + AuthenticationService.getLoggedInUser(),
            postData,
            {withCredentials: true},
            {headers: AuthenticationService.getPostHeaders()})
            .then(() => {
                console.log("post successful");
                this.props.history.push({
                    pathname: "/ranking",
                    state: {
                        gameId: this.props.location.state.gameId,
                        gameName: this.props.location.state.gameName,
                        gameHasRanking: true
                    }
                });
            })
            .catch(errors => this.setState({errors: errors.response.data}));
    };

    render() {
        return (
            <div>
                <div className="add-win-title">How many registered players have you conquered?</div>
                <div className="add-win-info">To validate your win at least one of your opponents must share their
                    secret code with you.
                </div>
                <Form className="checkboxes">
                    <Form.Check className="checkbox" type='radio' name="numberOfValidators" label='1' value={1}
                                onClick={this.onRadioClick}/>
                    <Form.Check className="checkbox" type='radio' name="numberOfValidators" label='2' value={2}
                                onClick={this.onRadioClick}/>
                    <Form.Check className="checkbox" type='radio' name="numberOfValidators" label='3' value={3}
                                onClick={this.onRadioClick}/>
                </Form>

                {this.state.errors &&
                <div className="alert alert-warning errors-box">
                    {this.state.errors.map((error, id) => <div className="error-text" key={id}>{error}<br/></div>)}
                </div>}

                {Array.from(Array(Number(this.state.numberOfValidators))).map((x, i) => <WinValidationBox key={i} id={i}
                                                                                                          onChange={this.onValidationChange}
                                                                                                          onKeyDown={this.onKeyDown}/>)}

                <div className="add-win-button">
                    <Button className="custom-button" type="submit" onClick={this.onAddWinClick}><span
                        className="custom-button-text">ADD&nbsp;WIN</span></Button>
                </div>

            </div>
        );
    }
}

export default AddWin;