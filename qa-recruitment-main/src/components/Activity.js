import React, { useState } from 'react';
import { Table, Form, InputGroup, Button } from 'react-bootstrap';

function Activity({ activities }) {
    const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
    const [searchQuery, setSearchQuery] = useState('');

    const sortedActivities = [...activities]
        .filter(activity =>
            activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.action.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            const order = sortOrder === 'asc' ? 1 : -1;
            return order * (new Date(a.date) - new Date(b.date));
        });

    function formatDate(isoString) {
        const date = new Date(isoString);
        return date.toLocaleString();
    }

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div className="activity-table">
            <InputGroup className="mb-3 activity-search">
                <Form.Control
                    type="text"
                    placeholder="Search activities..."
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </InputGroup>
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th onClick={toggleSortOrder} style={{ cursor: 'pointer' }}>
                        Date {sortOrder === 'asc' ? '↑' : '↓'}
                    </th>
                    <th>Task Title</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {sortedActivities.map((activity, index) => (
                    <tr key={index}>
                        <td>{formatDate(activity.date)}</td>
                        <td>{activity.title}</td>
                        <td>{activity.action}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Activity;
