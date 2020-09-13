import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import AuthenticationService from "../Authentication/AuthenticationService";
import "./NavBar.css"

class NavBar extends Component {
    render() {
        return (
            <Navbar className="shadow-sm nav-bar navbar-light">
                <Navbar.Brand href="/"><span className="nav-brand-text">OnBoard</span></Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Item>
                        <Nav.Link href="/my-games"><span className="nav-item-text">My&nbsp;games</span></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        {AuthenticationService.isUserLoggedIn() ?
                            <Nav.Link href="/">
                                <Button className="nav-login-button btn-dark" onClick={AuthenticationService.logout()}>
                                    <span className="nav-login-button-text">LOG&nbsp;OUT</span>
                                </Button>
                            </Nav.Link> :
                            <Nav.Link href="/login">
                                <Button className="nav-login-button btn-dark">
                                    <span className="nav-login-button-text">LOG&nbsp;IN</span>
                                </Button>
                            </Nav.Link>
                        }
                    </Nav.Item>
                </Nav>
            </Navbar>
        );
    }
}

export default NavBar;