import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import "./WinValidationBox.css"

class WinValidationBox extends Component {

    state = {
        id: this.props.id,
        validation: {
            username: "",
            secretCode: ""
        }
    };

    onChange = event => {
        const newState = this.state;
        newState.validation = {...this.state.validation, [event.target.id]: event.target.value};
        this.setState(newState);
        this.props.onChange(newState);
    };

    render() {
        return (
            <div className="validation-box">
                <Form>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="secretCode">
                        <Form.Label>Secret code</Form.Label>
                        <Form.Control type="text" placeholder="Enter secret code" onChange={this.onChange}/>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default WinValidationBox;