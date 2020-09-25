import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Registration.css";
import "../stylesheets/CustomButtons.css";

class Registration extends Component {

    state = {
      username: '',
        email: '',
        password: '',
        repeatedPassword:''
    };

    onChange = event => {
        this.setState({[event.target.id]: event.target.value });
    };

    onRegisterClick = () => {
        console.log(this.state);
    };

    render() {
        return (
            <div className="registration-background">
                <Form>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="repeatedPassword">
                        <Form.Label>Repeat password</Form.Label>
                        <Form.Control type="password" placeholder="Repeat password" onChange={this.onChange}/>
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