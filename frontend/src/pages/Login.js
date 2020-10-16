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
        AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
                const page = AuthenticationService.lastPage == null || AuthenticationService.lastPage === "" || AuthenticationService.lastPage === '/login' ? '/' : AuthenticationService.lastPage;
                window.location.replace(page);
            })
            .catch(() => this.setState({hasLoginFailed: true}))
    };

    onKeyDown = event => {
      if (event.key ==='Enter') {
          this.onLoginClick();
      }
    };

    render() {
        return (
            <div>
                <div className="login-background">
                    {this.state.hasLoginFailed &&
                    <div className="alert alert-warning">Incorrect username or password</div>}
                    <Form>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" onChange={this.onChange} onKeyDown={this.onKeyDown}/>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" onChange={this.onChange} onKeyDown={this.onKeyDown}/>
                        </Form.Group>
                    </Form>
                    <div className="login-button">
                        <Button className="custom-button" type="submit" onClick={this.onLoginClick}><span
                            className="custom-button-text">LOG IN</span></Button>
                    </div>
                    <small>New here? Register <a href={"/register"}>here</a>!</small>
                </div>
            </div>
        );
    }
}

export default Login;