import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Alert, Container, Card, Spinner, FloatingLabel, Modal, Button } from 'react-bootstrap';
import './Login.css';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);

            const hardcodedUsername = 'user';
            const hardcodedPassword = 'pass';

            if (username === hardcodedUsername && password === hardcodedPassword) {
                onLogin(true);
                navigate('/home');
            } else {
                setError('Invalid username or password');
            }
        }, 4000);
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Card style={{ maxWidth: "400px", width: "100%" }} className="p-4">
                <Card.Body>
                    <h2 className="text-center mb-5">Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicUsername">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Username"
                                className="mb-3"
                            >
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Password"
                                className="mb-3"
                            >
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            </FloatingLabel>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
                            {loading ? (
                                <>
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    <span className="sr-only">Loading...</span>
                                </>
                            ) : (
                                'Login'
                            )}
                        </Button>
                    </Form>
                    {error && <Alert variant="danger" className="w-100 mt-3">{error}</Alert>}
                </Card.Body>
            </Card>
        </Container>
    );


}

export default Login;
