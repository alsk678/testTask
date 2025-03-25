import React from 'react';
import { Navbar, Nav, NavDropdown, Button, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck, faXmark} from '@fortawesome/free-solid-svg-icons';

function Header({ onLogout, onAddItem, activeTasksCount, inactiveTasksCount, totalActiveEstimation, totalInActiveEstimation }) {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/home" className="centered-badge ms-3">
                <img
                    src="/logoplannister.png"
                    width="200"
                    height="50"
                />{' '}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip id="tooltip-bottom">Number of active items</Tooltip>}
                    >
                        <Badge pill bg="info" className="centered-badge me-3" >
                            <FontAwesomeIcon icon={faXmark}/> {activeTasksCount} in {totalActiveEstimation} hours
                        </Badge>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip id="tooltip-bottom">Number of done items</Tooltip>}
                    >
                        <Badge pill bg="dark" className="centered-badge me-3" >
                            <FontAwesomeIcon icon={faCheck}/>{inactiveTasksCount} in {totalInActiveEstimation} hours
                        </Badge>
                    </OverlayTrigger>
                    <NavDropdown title="Actions" id="basic-nav-dropdown" className="me-5">
                        <NavDropdown.Item onClick={onAddItem}>Add</NavDropdown.Item>
                        <NavDropdown.Item disabled>Proposal</NavDropdown.Item>
                    </NavDropdown>
                    <Button variant="outline-danger" className="me-3" onClick={onLogout}>Logout</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
