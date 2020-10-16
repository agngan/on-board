import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AxiosClient from "../components/Authentication/AxiosClient";
import AuthenticationService from "../components/Authentication/AuthenticationService";
import "./Registration.css";
import "../stylesheets/CustomButtons.css";

class Registration extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        repeatedPassword: ''
    };

    componentDidMount() {
        // get method sent to server to ensure that XSRF-TOKEN cookie exists
        AxiosClient.get("", {withCredentials: true});
    }

    onChange = event => {
        this.setState({[event.target.id]: event.target.value});
    };

    onRegisterClick = () => {
        AxiosClient.post("register", this.state,
            {withCredentials: true},
            {headers: AuthenticationService.getPostHeaders()})
            .then(() => {
                console.log("Registration successful");
                window.location.replace("/login");
            })
            .catch(errors => this.setState({errors: errors.response.data}));
    };

    onKeyDown = event => {
        if (event.key === 'Enter') {
            this.onRegisterClick();
        }
    };

    render() {
        return (
            <div className="registration-background">
                {this.state.errors &&
                <div className="alert alert-warning">
                    {this.state.errors.map((error, id) => <div className="error-text" key={id}>{error}<br/></div>)}
                </div>}
                <Form>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={this.onChange}
                                      onKeyDown={this.onKeyDown}/>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={this.onChange}
                                      onKeyDown={this.onKeyDown}/>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" onChange={this.onChange}
                                      onKeyDown={this.onKeyDown}/>
                    </Form.Group>
                    <Form.Group controlId="repeatedPassword">
                        <Form.Label>Repeat password</Form.Label>
                        <Form.Control type="password" placeholder="Repeat password" onChange={this.onChange}
                                      onKeyDown={this.onKeyDown}/>
                    </Form.Group>
                </Form>
                <div className="register-button">
                    <Button className="custom-button" type="submit" onClick={this.onRegisterClick}><span
                        className="custom-button-text">REGISTER</span></Button>
                </div>
            </div>
        );
    }
}

export default Registration;