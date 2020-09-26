import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Cookies from "universal-cookie";
import AxiosClient from "../components/Authentication/AxiosClient";
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
        const cookies = new Cookies();
        const csrfToken = cookies.get('XSRF-TOKEN');
        console.log(csrfToken);
        console.log(this.state);
        AxiosClient.post("register", this.state,
            {withCredentials: true},
            {headers: {'X-XSRF-TOKEN': csrfToken}})
            .then(() => console.log("registration successful"))
            .catch(() => console.log("registration failed"));
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