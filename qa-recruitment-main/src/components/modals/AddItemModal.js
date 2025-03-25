import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import '../../styles/AddItemModal.css';

function AddItemModal({ show, onHide, onAdd }) {
    const [itemTitle, setItemTitle] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemEstimate, setItemEstimate] = useState('');
    const [itemPriority, setItemPriority] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [titleError, setTitleError] = useState('');
    const [priorityError, setPriorityError] = useState('');
    const [estimateError, setEstimateError] = useState('');

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        if (newTitle.length > 25) {
            setTitleError('Title cannot exceed 25 characters');
        } else {
            setTitleError('');
            setItemTitle(newTitle);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTitleError('');
        setPriorityError('');
        setEstimateError('');

        if (!itemTitle.trim()) {
            setTitleError('Title cannot be empty');
            return;
        }
        if (itemTitle.length > 25) {
            setTitleError('Title cannot exceed 25 characters');
            return;
        }
        if (!itemEstimate.trim() || !Number.isInteger(Number(itemEstimate))) {
            setEstimateError('Please enter a valid integer estimate');
            return;
        }
        if (!itemPriority) {
            setPriorityError('Please select a priority');
            return;
        }

        const newItem = {
            title: itemTitle,
            description: itemDescription,
            estimate: itemEstimate,
            priority: itemPriority,
            imageUrl
        };
        onAdd(newItem);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add New Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label className="custom-form-label">Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={itemTitle}
                            onChange={handleTitleChange}
                            placeholder="Enter title"
                            isInvalid={!!titleError}
                        />
                        <Form.Control.Feedback type="invalid">
                            {titleError}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="custom-form-label">Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={itemDescription}
                            onChange={(e) => {
                                if (e.target.value.length <= 100) {
                                    setItemDescription(e.target.value);
                                }
                            }}
                            placeholder="Enter description"
                            maxLength="100"
                        />
                        <Form.Text className="text-muted">
                            Max 100 characters.
                        </Form.Text>
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label className="custom-form-label">Estimate (hours)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={itemEstimate}
                                    onChange={(e) => setItemEstimate(e.target.value)}
                                    placeholder="Enter estimate"
                                    isInvalid={!!estimateError}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {estimateError}
                                </Form.Control.Feedback>
                            </Form.Group>

                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label className="custom-form-label">Priority</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={itemPriority}
                                    onChange={(e) => setItemPriority(e.target.value)}
                                    isInvalid={!!priorityError}>
                                    <option value="">Select Priority</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                    <option value="Critical">Critical</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {priorityError}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/*<Form.Group>*/}
                            {/*    <Form.Label className="custom-form-label">Priority</Form.Label>*/}
                            {/*    <Form.Control as="select" value={itemPriority} onChange={(e) => setItemPriority(e.target.value)}>*/}
                            {/*        <option value="">Select Priority</option>*/}
                            {/*        {[...Array(5).keys()].map(num => (*/}
                            {/*            <option key={num + 1} value={num + 1}>{num + 1}</option>*/}
                            {/*        ))}*/}
                            {/*    </Form.Control>*/}
                            {/*</Form.Group>*/}
                        </Col>
                    </Row>
                    <Form.Group>
                        <Form.Label className="custom-form-label">Image URL</Form.Label>
                        <Form.Control
                            type="url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="Enter image URL" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>Add Item</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddItemModal;