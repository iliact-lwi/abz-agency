import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';

import logo from '../images/logo.svg';

const NavbarComponent: React.FunctionComponent = () => {
    return (
        <Navbar bg="light" variant="light" expand="lg" collapseOnSelect className="navbar-styles">
            <div className="media-bg">
                <Navbar.Brand className="navbar-align-items-center media-padding-left" href="#home">
                    <img src={logo} alt="Logo" className="d-inline-block align-center"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            </div>
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav className="navbar-nav-mobile-width">
                    <Nav.Link href="#reg" className="navbar-font-opensans" id="first-nav-link">About me</Nav.Link>
                    <Nav.Link href="#reg" className="navbar-font-opensans">Relationships</Nav.Link>
                    <Nav.Link href="#reg" className="navbar-font-opensans">Requirements</Nav.Link>
                    <Nav.Link href="#reg" className="navbar-font-opensans">Users</Nav.Link>
                    <Nav.Link href="#reg" className="navbar-font-opensans" id="last-nav-link">Sign Up</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarComponent;