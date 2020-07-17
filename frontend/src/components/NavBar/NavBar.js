import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
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
                        <Nav.Link>
                        <Button className="nav-login-button btn-dark"><span className="nav-login-button-text">LOGIN</span></Button>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        );
    }
}

export default NavBar;