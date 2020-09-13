import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AuthenticationService from "../components/Authentication/AuthenticationService";
import "./Login.css";
import "../stylesheets/CustomButtons.css"

class Login extends Component {

    state = {
        username: '',
        password: '',
        hasLoginFailed: false
    };

    onChange = event => {
        this.setState({[event.target.id]: event.target.value });
    };

    onLoginClick = () => {
        console.log(this.state);
        AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
                const page = AuthenticationService.lastPage == null || AuthenticationService.lastPage === '/login' ? '/' : AuthenticationService.lastPage;
                console.log(page);
                window.location.replace(page);
            })
            .catch(() => this.setState({hasLoginFailed: true}))
    };

    render() {
        return (
            <div>
                <div className="login-background">
                    <Form>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" onChange={this.onChange}/>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" onChange={this.onChange}/>
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