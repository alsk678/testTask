import React from 'react';
import { Nav, Form, NavLink } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboard } from '@fortawesome/free-solid-svg-icons';


function SideMenu({ isChecked, onFilterChange, sortOrder, onSortOrderChange }) {
    return (
        <Nav className="flex-column side-menu col-md-12 p-3">
            <LinkContainer to="/home">
                <NavLink className="nav-link-custom"><FontAwesomeIcon icon={faHome} /> Home</NavLink>
            </LinkContainer>
            <LinkContainer to="/activity">
                <NavLink className="nav-link-custom"><FontAwesomeIcon icon={faClipboard} /> Activity</NavLink>
            </LinkContainer>
            <hr/>
            <h3>Filters</h3>
            <Form>
                <Form.Check
                    type="switch"
                    id="completed-switch"
                    label="Show pending"
                    checked={isChecked}
                    onChange={(e) => onFilterChange(e.target.checked)}
                />
                <Form.Check
                    type="switch"
                    id="sort-switch"
                    label="Sort estimations"
                    checked={sortOrder === 'ascending'}
                    onChange={() => onSortOrderChange(sortOrder === 'ascending' ? 'descending' : 'ascending')}
                />
            </Form>
        </Nav>
    );
}

export default SideMenu;
