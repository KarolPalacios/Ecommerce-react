import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand className="nav-title" as={Link} to="/">E-comerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/login">
                                <i className="fa-solid fa-user"></i>
                            </Nav.Link>

                            <Nav.Link as={Link} to="/purchases">
                                <i className="fa-solid fa-shop"></i>
                            </Nav.Link>

                            <Nav.Link>
                                <i className="fa-solid fa-cart-shopping"></i>
                            </Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;