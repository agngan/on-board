import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import "../stylesheets/CustomButtons.css"

class Login extends Component {

    onLoginClick = () => {

    };

    render() {
        return (
            <div>
                <div className="login-background">
                    <Form>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username"/>
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password"/>
                        </Form.Group>
                        <div className="login-button">
                            <Button className="custom-button" type="submit" onClick={this.onLoginClick}><span
                                className="custom-button-text">LOG IN</span></Button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;